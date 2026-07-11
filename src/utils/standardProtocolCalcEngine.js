/**
 * PediDrip — Motor de Cálculo do Protocolo Padrão
 * ==================================================
 *
 * Este módulo NÃO substitui o motor "Guia" já existente no app
 * (algorithms: VASOACTIVE_STANDARD, SEDATION_STANDARD, VASOPRESSIN,
 * DEXMEDETOMIDINE). Ele é um motor complementar, único e genérico,
 * que serve para TODAS as drogas que têm `standardProtocol` preenchido.
 *
 * "Protocolo Padrão" = concentração-padrão FIXA de preparo, baseada em
 * literatura internacional (NeoFax/Micromedex e/ou Lexicomp, confirmada
 * por HSL quando aplicável — a fonte exata varia por droga e está sempre
 * identificada no campo `standardProtocol.source`).
 *
 * Fórmula geral (velocidade):
 *   velocidade (mL/h) = dose × peso × fatorTempo × fatorConversãoMassa
 *                        ÷ concentração.value
 */

// ---------------------------------------------------------------------------
// 1. Conversão de unidades
// ---------------------------------------------------------------------------

const MASS_FACTORS = {
  mcg: 1,
  mg: 1000,
  g: 1000000,
};

const UNIT_FAMILY = {
  mcg: "mass",
  mg: "mass",
  g: "mass",
  ui: "ui",
  UI: "ui",
};

function parseDoseUnit(doseUnit) {
  const parts = doseUnit.split("/");
  if (parts.length !== 3 || parts[1].toLowerCase() !== "kg") {
    throw new Error(
      `Unidade de dose não reconhecida: "${doseUnit}". Esperado formato "<massa>/kg/<tempo>".`
    );
  }
  const [massUnit, , timeUnit] = parts;
  return { massUnit, timeUnit };
}

function parseConcentrationUnit(concentrationUnit) {
  const parts = concentrationUnit.split("/");
  if (parts.length !== 2 || parts[1].toLowerCase() !== "ml") {
    throw new Error(
      `Unidade de concentração não reconhecida: "${concentrationUnit}". Esperado formato "<massa>/ml".`
    );
  }
  return parts[0];
}

function massConversionFactor(fromUnit, toUnit) {
  if (fromUnit === toUnit) return 1;

  const fromFamily = UNIT_FAMILY[fromUnit] ?? UNIT_FAMILY[fromUnit?.toUpperCase()];
  const toFamily = UNIT_FAMILY[toUnit] ?? UNIT_FAMILY[toUnit?.toUpperCase()];

  if (!fromFamily || !toFamily) {
    throw new Error(`Unidade de massa desconhecida: "${fromUnit}" ou "${toUnit}".`);
  }
  if (fromFamily !== toFamily) {
    throw new Error(
      `Não é possível converter entre unidades incompatíveis: "${fromUnit}" (${fromFamily}) e "${toUnit}" (${toFamily}).`
    );
  }
  if (fromFamily === "ui") return 1;

  const fromFactor = MASS_FACTORS[fromUnit];
  const toFactor = MASS_FACTORS[toUnit];
  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error(`Unidade de massa não suportada: "${fromUnit}" ou "${toUnit}".`);
  }
  return fromFactor / toFactor;
}

function timeConversionFactor(timeUnit) {
  const unit = timeUnit.toLowerCase();
  if (unit === "min") return 60;
  if (unit === "h") return 1;
  throw new Error(`Unidade de tempo não reconhecida: "${timeUnit}". Use "min" ou "h".`);
}

// ---------------------------------------------------------------------------
// 2. Validação de faixa de dose
// ---------------------------------------------------------------------------

function validateDoseRange(dose, doseMin, doseMax) {
  if (dose < doseMin) {
    return {
      inRange: false,
      severity: "warning",
      message: `Dose informada (${dose}) está ABAIXO da faixa usual do protocolo (${doseMin}–${doseMax}).`,
    };
  }
  if (dose > doseMax) {
    return {
      inRange: false,
      severity: "warning",
      message: `Dose informada (${dose}) está ACIMA da faixa usual do protocolo (${doseMin}–${doseMax}).`,
    };
  }
  return { inRange: true, severity: "ok", message: null };
}

// ---------------------------------------------------------------------------
// 3. Cálculo principal — Protocolo Padrão (concentração fixa)
// ---------------------------------------------------------------------------

function calcStandardConcentration(dose, weightKg, doseUnit, standardProtocol, decimalPlaces = 2) {
  if (standardProtocol.type !== "standard_concentration") {
    throw new Error(
      `calcStandardConcentration só deve ser usado com protocolos do tipo "standard_concentration". Recebido: "${standardProtocol.type}".`
    );
  }
  if (dose == null || weightKg == null || dose <= 0 || weightKg <= 0) {
    throw new Error("Dose e peso devem ser números positivos.");
  }

  const concentration = standardProtocol.standardConcentration;
  const { massUnit: doseMassUnit, timeUnit } = parseDoseUnit(doseUnit);
  const concMassUnit = parseConcentrationUnit(concentration.unit);

  const timeFactor = timeConversionFactor(timeUnit);
  const massFactor = massConversionFactor(doseMassUnit, concMassUnit);

  const amountPerHour = dose * weightKg * timeFactor * massFactor;

  const rateMlPerHourRaw = amountPerHour / concentration.value;
  const rateMlPerHour = Number(rateMlPerHourRaw.toFixed(decimalPlaces));

  const doseValidation = validateDoseRange(dose, standardProtocol.doseMin, standardProtocol.doseMax);

  const formulaUsed =
    `${dose} ${doseUnit} × ${weightKg} kg` +
    (timeFactor !== 1 ? ` × ${timeFactor} (min→h)` : "") +
    (massFactor !== 1 ? ` × ${massFactor} (conversão ${doseMassUnit}→${concMassUnit})` : "") +
    ` ÷ ${concentration.value} ${concentration.unit} = ${rateMlPerHour} mL/h`;

  return {
    rateMlPerHour,
    doseValidation,
    formulaUsed,
    concentrationUsed: concentration,
  };
}

// ---------------------------------------------------------------------------
// 4. Prescrição completa — volume de fármaco + diluente
// ---------------------------------------------------------------------------

const DILUENT_FULL_NAMES = {
  "SF 0,9%": "Soro Fisiológico 0,9%",
  "SG 5%": "Soro Glicosado 5%",
};

function diluentFullName(diluentName) {
  return DILUENT_FULL_NAMES[diluentName] || diluentName;
}

/**
 * Calcula a prescrição completa do Protocolo Padrão: velocidade de
 * infusão (mL/h) + quanto de fármaco puro e quanto de diluente usar
 * para preparar `totalVolumeMl` na concentração-padrão da droga.
 *
 * A concentração da AMPOLA (`drug.concentration`, o mesmo campo já usado
 * pelo protocolo Guia) é usada para calcular a diluição necessária.
 *
 * Caso especial: quando a concentração-padrão é IGUAL à da ampola
 * (ex.: rocurônio, que usa sem diluir), o resultado naturalmente vem
 * com drugVolumeMl = totalVolumeMl e diluentVolumeMl = 0.
 */
function calculatePrescription(drug, dose, weightKg, totalVolumeMl = 50, decimalPlaces = 2) {
  const rateResult = calcStandardConcentration(
    dose,
    weightKg,
    drug.doseUnit,
    drug.standardProtocol,
    decimalPlaces
  );

  const standardConc = drug.standardProtocol.standardConcentration;
  const ampouleConc = drug.concentration;

  const standardMassUnit = parseConcentrationUnit(standardConc.unit);
  const ampouleMassUnit = parseConcentrationUnit(ampouleConc.unit);
  const factor = massConversionFactor(ampouleMassUnit, standardMassUnit);
  const ampouleConcInStandardUnit = ampouleConc.value * factor;

  const drugVolumeMlRaw = (standardConc.value * totalVolumeMl) / ampouleConcInStandardUnit;
  const drugVolumeMl = Number(drugVolumeMlRaw.toFixed(decimalPlaces));
  const diluentVolumeMl = Number((totalVolumeMl - drugVolumeMl).toFixed(decimalPlaces));

  if (drugVolumeMl > totalVolumeMl) {
    throw new Error(
      `Volume de fármaco necessário (${drugVolumeMl} mL) excede o volume total de preparo (${totalVolumeMl} mL) para atingir ${standardConc.value} ${standardConc.unit}. Aumente o volume total ou revise a concentração-padrão.`
    );
  }
  if (diluentVolumeMl < 0) {
    throw new Error("Volume de diluente calculado ficou negativo — revise os parâmetros de entrada.");
  }

  const diluentName = drug.preparation?.diluent ?? "diluente compatível";

  const prescriptionLines = [
    `${drug.name} (${drug.presentation}) ----------- ${drugVolumeMl} ml`,
    `${diluentFullName(diluentName)} ---------- ${diluentVolumeMl} ml`,
    `Infundir ${rateResult.rateMlPerHour} ml/h, EV, em bomba de infusão contínua (BIC)`,
    `Nesta solução: ${rateResult.rateMlPerHour} ml/h = ${dose} ${drug.doseUnit}`,
  ];

  return {
    ...rateResult,
    drugVolumeMl,
    diluentVolumeMl,
    totalVolumeMl,
    prescriptionLines,
  };
}

// ---------------------------------------------------------------------------
// 5. Função de entrada — a partir do registro completo da droga
// ---------------------------------------------------------------------------

/**
 * Retorna `available: false` se a droga não tiver `standardProtocol`
 * (caso de vasopressina e nitroprussiato, por decisão de prudência).
 */
function calculateStandardProtocol(drug, dose, weightKg, totalVolumeMl = 50) {
  if (!drug.standardProtocol) {
    return {
      available: false,
      reason:
        "Esta droga não possui Protocolo Padrão com concentração-padrão fixa. " +
        "Consulte o campo 'referenceOnly' para dados de dose/concentração de referência.",
    };
  }

  const result = calculatePrescription(drug, dose, weightKg, totalVolumeMl);

  return {
    available: true,
    ...result,
    source: drug.standardProtocol.source,
    notes: drug.standardProtocol.notes,
  };
}

// ---------------------------------------------------------------------------
// 6. Exports
// ---------------------------------------------------------------------------

export {
  calcStandardConcentration,
  calculatePrescription,
  calculateStandardProtocol,
  validateDoseRange,
  massConversionFactor,
  timeConversionFactor,
  parseDoseUnit,
  parseConcentrationUnit,
};