/**
 * antibiotics.js — dados do módulo Antibióticos
 *
 * MODELO DE DADO (revisado):
 *
 *   - `route`: SEMPRE um array de chaves de `concentration` a
 *     renderizar como blocos de resultado, ex.: ['oral'],
 *     ['im','ev'], ['im500','im1000','ev']. Cada chave do array
 *     precisa existir em `concentration` (no nível da droga ou
 *     sobrescrita no nível da indicação).
 *
 *   - `concentration[chave]`: cada entrada tem:
 *       - value/unit: número usado pro cálculo (mg/mL ou UI/mL)
 *       - resultUnit: unidade do resultado exibido ('mL', 'gotas')
 *       - presentationLabel: rótulo em MG (não em concentração) pra
 *         exibição — ex.: "250mg/5mL", "Frasco 500mg". Esse é o texto
 *         que aparece na tela como "apresentação", não o value/unit.
 *       - reconstitution (opcional): receita de reconstituição —
 *         { diluent, diluentVolume, diluentUnit, finalVolume? } ou um
 *         array dessas receitas quando mais de um frasco leva à mesma
 *         concentração final (ex.: ceftriaxona EV). SEMPRE renderizada
 *         no bloco de resultado — não deve ser repetida em outro
 *         lugar (nem em specialConsiderations).
 *       - dilution (opcional): diluição adicional pra infusão EV —
 *         { volume/volumeMin/volumeMax, unit, diluent } + infusionTime
 *         ou infusionMin/infusionMax + infusionUnit. Também sempre no
 *         bloco de resultado.
 *
 *   - `doseUnit`: além de 'mg/kg/dia' | 'mg/kg/dose' | 'mg/kg' | 'UI',
 *     agora também aceita 'fixed-by-weight' — usado quando a dose não
 *     é calculada por peso × valor, e sim por FAIXA de peso com valor
 *     fixo (ex.: penicilina G benzatina). Indicações desse tipo têm um
 *     array `weightBrackets` em vez de doseMin/doseMax/doseDefault, e
 *     a tela NÃO mostra campo de dose editável — o valor é decidido
 *     automaticamente a partir do peso informado.
 *
 *   - `durationDays`: como antes — null quando a fonte não dá um
 *     número fixo (varia demais por gravidade/evolução).
 *
 * Onde havia divergência entre fontes, foi adotado o valor mais
 * conservador — o texto exibido mostra só o valor final usado no
 * cálculo, sem contrastar as fontes.
 *
 * Fontes: bulas profissionais nacionais (Anvisa) e/ou FDA quando a
 * nacional não estava disponível, cruzadas com o Guia Farmacêutico do
 * Hospital Sírio-Libanês (HSL).
 */

export const ANTIBIOTIC_CATEGORIES = {
  PENICILINAS: 'penicilinas',
  CEFALOSPORINAS: 'cefalosporinas',
  MACROLIDEOS: 'macrolideos',
  SULFONAMIDAS: 'sulfonamidas',
  AMINOGLICOSIDEOS: 'aminoglicosideos',
};

export function getAntibioticCategoryLabel(id) {
  const labels = {
    [ANTIBIOTIC_CATEGORIES.PENICILINAS]: 'Penicilinas',
    [ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS]: 'Cefalosporinas',
    [ANTIBIOTIC_CATEGORIES.MACROLIDEOS]: 'Macrolídeos',
    [ANTIBIOTIC_CATEGORIES.SULFONAMIDAS]: 'Sulfonamidas',
    [ANTIBIOTIC_CATEGORIES.AMINOGLICOSIDEOS]: 'Aminoglicosídeos',
  };
  return labels[id] ?? id;
}

export const antibiotics = [
  {
    id: 'amoxicilina',
    name: 'Amoxicilina',
    category: ANTIBIOTIC_CATEGORIES.PENICILINAS,
    presentation: ['Amoxil 500mg/cápsula', 'Amoxil pó para suspensão oral 250mg/5mL'],
    therapeuticClass: 'Antimicrobiano, Penicilina',
    routeOfAdministration: 'Oral',
    concentration: {
      oral: { value: 50, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '250mg/5mL' },
    },
    indications: [
      {
        name: 'Posologia geral (8/8h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 100,
        dosesPerDay: 3,
        doseDefault: 50,
        durationDays: null,
        route: ['oral'],
        ageWarning: 'Neonatos e lactentes ≤ 3 meses: não ultrapassar 30mg/kg/dia, dividida em 12/12h.',
        specialConsiderations: [
          'Fracionamento alternativo: 12/12h (2x/dia), mantendo a mesma dose diária total.',
          'Dose máxima: 500mg por tomada, independente do peso.',
          'Crianças < 10 anos: alternativa de dose fixa por idade — 125-250mg a cada 8 horas.',
          '≥ 40kg: usar dose de adulto (250-500mg a cada 8h, ou 500-875mg a cada 12h).',
          'Ajuste renal (< 40kg): insuficiência leve — sem alteração; moderada — 15mg/kg 2x/dia (máx. 500mg); grave — 15mg/kg 1x/dia (máx. 500mg), mesma dose após hemodiálise.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ nº de tomadas = dose por tomada — limitar a 500mg/dose',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
    ],
  },
  {
    id: 'amoxicilina-clavulanato',
    name: 'Amoxicilina + Clavulanato de Potássio',
    category: ANTIBIOTIC_CATEGORIES.PENICILINAS,
    presentation: ['Clavulin® 250mg+62,5mg/5mL', 'Novamox® 400mg+57mg/5mL'],
    therapeuticClass: 'Antimicrobiano, Penicilina + Inibidor de Beta-Lactamase',
    routeOfAdministration: 'Oral',
    indications: [
      {
        name: 'Clavulin® 250mg+62,5mg/5mL (8/8h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 60,
        dosesPerDay: 3,
        doseDefault: 50,
        durationDays: null,
        route: ['oral'],
        concentration: { oral: { value: 50, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '250mg+62,5mg/5mL' } },
        ageWarning: 'Sem dados acima de 40/10mg/kg/dia em menores de 2 anos. Neonatos e lactentes < 12 semanas: 30mg/kg/dia (componente amoxicilina), 12/12h.',
        specialConsiderations: [
          'Dose calculada pelo componente amoxicilina.',
          'Dose baixa (20-40mg/kg/dia): infecções leves/moderadas. Dose alta (40-60mg/kg/dia): infecções mais graves (otite média, sinusite, broncopneumonia, ITU).',
          'Duração recomendada para otite média aguda: 10 dias.',
          'Dose máxima: < 40kg → até 60mg/kg/dia; ≥ 40kg → dose de adulto.',
        ],
        alerts: [],
        calcNote: 'Dose (amoxicilina) × Peso ÷ 3 = dose por tomada',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Novamox® 400mg+57mg/5mL (12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 60,
        dosesPerDay: 2,
        doseDefault: 50,
        durationDays: null,
        route: ['oral'],
        concentration: { oral: { value: 80, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '400mg+57mg/5mL' } },
        ageWarning: 'Sem dados acima de 40/10mg/kg/dia em menores de 2 anos. Neonatos e lactentes < 12 semanas: 30mg/kg/dia (componente amoxicilina), 12/12h.',
        specialConsiderations: [
          'Dose calculada pelo componente amoxicilina.',
          'Dose baixa (20-40mg/kg/dia): infecções leves/moderadas. Dose alta (40-60mg/kg/dia): infecções mais graves (otite média, sinusite, broncopneumonia, ITU).',
          'Duração recomendada para otite média aguda: 10 dias.',
          'Dose máxima: < 40kg → até 60mg/kg/dia; ≥ 40kg → dose de adulto.',
        ],
        alerts: [],
        calcNote: 'Dose (amoxicilina) × Peso ÷ 2 = dose por tomada',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Ajuste renal pediátrico (< 40kg)',
        doseUnit: 'mg/kg/dose',
        doseMin: 18.75,
        doseMax: 18.75,
        dosesPerDay: 2,
        doseDefault: 18.75,
        durationDays: null,
        route: ['oral'],
        concentration: { oral: { value: 62.5, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '250mg+62,5mg/5mL (base Clavulin combinado)' } },
        ageWarning: null,
        specialConsiderations: [
          'Insuficiência renal leve: sem alteração — usar a posologia geral.',
          'Insuficiência renal moderada: 18,75mg/kg 2x/dia (máx. 625mg/dia).',
          'Insuficiência renal grave: 18,75mg/kg em dose única diária (máx. 625mg/dia).',
          'Insuficiência hepática: tratamento cauteloso, monitorar função hepática.',
        ],
        alerts: [],
        calcNote: '18,75mg × Peso = dose por tomada (moderada: 2x/dia; grave: 1x/dia)',
        source: 'Bula profissional',
      },
    ],
  },
  {
    id: 'azitromicina',
    name: 'Azitromicina',
    category: ANTIBIOTIC_CATEGORIES.MACROLIDEOS,
    presentation: ['Zitromax® pó para suspensão oral 200mg/5mL (reconstituído)'],
    therapeuticClass: 'Antimicrobiano, Macrolídeo (azalídeo)',
    routeOfAdministration: 'Oral',
    concentration: {
      oral: { value: 40, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '200mg/5mL' },
    },
    indications: [
      {
        name: 'Posologia geral (1x/dia)',
        doseUnit: 'mg/kg/dia',
        doseMin: 10,
        doseMax: 10,
        dosesPerDay: 1,
        doseDefault: 10,
        durationDays: 3,
        route: ['oral'],
        ageWarning: null,
        specialConsiderations: [
          'Regime alternativo de 5 dias: 10mg/kg no 1º dia, seguido de 5mg/kg/dia do 2º ao 5º dia.',
          'Faringite estreptocócica: alternativa de 20mg/kg/dia por 3 dias, sem exceder 500mg/dia.',
          'Administrar 1h antes ou 2h após as refeições.',
          'Dose máxima: 1500mg para o tratamento completo.',
          'Peso acima de 45 kg: usar dose de adulto — 500mg/dia por 3 dias.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso = dose diária única — limitar a 1500mg no tratamento',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Otite média aguda — dose única (alternativa)',
        doseUnit: 'mg/kg',
        doseMin: 30,
        doseMax: 30,
        dosesPerDay: 1,
        doseDefault: 30,
        durationDays: 1,
        route: ['oral'],
        ageWarning: null,
        specialConsiderations: [
          'Dose única para todo o tratamento — administrar uma vez e não repetir.',
        ],
        alerts: [
          'Não confundir com a posologia geral (10mg/kg/dia por 3 dias) — são esquemas diferentes.',
        ],
        calcNote: 'Dose × Peso = dose única — não repetir',
        source: 'Bula profissional',
      },
    ],
  },
  {
    id: 'cefalexina',
    name: 'Cefalexina',
    category: ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS,
    presentation: ['Cefalexina suspensão oral 250mg/5mL', 'Keflex® suspensão 250mg/5mL'],
    therapeuticClass: 'Antimicrobiano, Cefalosporina de 1ª geração',
    routeOfAdministration: 'Oral',
    concentration: {
      oral: { value: 50, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '250mg/5mL' },
    },
    indications: [
      {
        name: 'Posologia geral (6/6h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 50,
        doseMax: 50,
        dosesPerDay: 4,
        doseDefault: 50,
        durationDays: null,
        route: ['oral'],
        ageWarning: 'Uso a partir de 1 ano de idade.',
        specialConsiderations: [
          'Fracionamento alternativo em 2x/dia (12/12h) para casos leves — faringite, ITU não complicada, pele —, faixa 25-50mg/kg/dia.',
          'Infecções graves: dose pode ser dobrada (até 100mg/kg/dia).',
          'Faringite estreptocócica: tratamento mínimo de 10 dias.',
          'Dose máxima: 4g/dia.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ 4 = dose por tomada (6/6h)',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Otite média (dose elevada)',
        doseUnit: 'mg/kg/dia',
        doseMin: 75,
        doseMax: 100,
        dosesPerDay: 4,
        doseDefault: 100,
        durationDays: null,
        route: ['oral'],
        ageWarning: 'Uso a partir de 1 ano de idade.',
        specialConsiderations: [
          '75-100mg/kg/dia, fracionada em 4x/dia (6/6h) — dose superior à posologia geral.',
          'Dose máxima: 4g/dia.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ 4 = dose por tomada (6/6h)',
        source: 'Bula profissional',
      },
    ],
  },
  {
    id: 'sulfametoxazol-trimetoprima',
    name: 'Sulfametoxazol + Trimetoprima',
    category: ANTIBIOTIC_CATEGORIES.SULFONAMIDAS,
    presentation: ['Suspensão oral 200mg+40mg/5mL (Bactrim®/Infectrin®)'],
    therapeuticClass: 'Antimicrobiano, Sulfonamida + Inibidor da di-hidrofolato redutase',
    routeOfAdministration: 'Oral',
    concentration: {
      oral: { value: 8, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '200mg+40mg/5mL (componente trimetoprima: 40mg/5mL)' },
    },
    indications: [
      {
        name: 'Posologia geral (12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 6,
        doseMax: 8,
        dosesPerDay: 2,
        doseDefault: 8,
        durationDays: 5,
        route: ['oral'],
        ageWarning: 'Uso a partir de 6 semanas de vida.',
        specialConsiderations: [
          'Dose calculada pelo componente trimetoprima — o sulfametoxazol acompanha na proporção 1:5.',
          'Administrar de preferência após uma refeição.',
          'Duração mínima: 5 dias, ou até 2 dias assintomático. Reavaliar se não houver melhora em 7 dias.',
          'Ajuste renal: Clcr > 30 — sem ajuste; Clcr 15-30 — 50% da dose; Clcr < 15 — uso não recomendado.',
          'Dose máxima: 20mg/kg/dia de trimetoprima.',
        ],
        alerts: [
          'Infecções graves e pneumocistose: dose maior — 15-20mg/kg/dia de trimetoprima, fracionada em 4x/dia (6/6h).',
        ],
        calcNote: 'Dose (trimetoprima) × Peso ÷ 2 = dose por tomada (12/12h)',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
    ],
  },
  {
    id: 'penicilina-g-benzatina',
    name: 'Penicilina G Benzatina (Benzilpenicilina)',
    category: ANTIBIOTIC_CATEGORIES.PENICILINAS,
    presentation: ['Benzetacil® 600.000UI/frasco-ampola', 'Benzetacil® 1.200.000UI/frasco-ampola'],
    therapeuticClass: 'Antimicrobiano, Penicilina (ação prolongada/depot)',
    routeOfAdministration: 'IM',
    concentration: {
      im600k: {
        value: 150000,
        unit: 'UI/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 600.000UI',
        reconstitution: { diluent: 'água para injetáveis', diluentVolume: 3.6, diluentUnit: 'mL', finalVolume: 4, finalVolumeUnit: 'mL' },
      },
      im1200k: {
        value: 300000,
        unit: 'UI/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 1.200.000UI',
        reconstitution: { diluent: 'água para injetáveis', diluentVolume: 3.2, diluentUnit: 'mL', finalVolume: 4, finalVolumeUnit: 'mL' },
      },
    },
    indications: [
      {
        name: 'Infecções estreptocócicas / profilaxia de febre reumática',
        // SEM campo de dose editável — a dose é fixa por faixa de
        // peso (não é uma fórmula por kg). A tela oculta o input de
        // dose quando doseUnit === 'fixed-by-weight' e escolhe
        // automaticamente o valor certo a partir do peso informado.
        doseUnit: 'fixed-by-weight',
        weightBrackets: [
          { maxWeight: 27, doseUI: 600000, label: 'até 27kg' },
          { minWeight: 27, maxWeight: 40, doseUI: 900000, label: '27kg a 40kg (crianças maiores)' },
          { minWeight: 40, doseUI: 1200000, label: '≥ 40kg (dose de adulto)' },
        ],
        dosesPerDay: 1,
        durationDays: 1,
        route: ['im600k', 'im1200k'],
        ageWarning: null,
        specialConsiderations: [
          'Dose sempre única — não é uma dose diária repetida.',
          'Corte de peso entre "crianças maiores" (900.000UI) e "dose de adulto" (1.200.000UI) fixado em 40kg — mesmo critério usado nas outras drogas deste bloco; a fonte original não especifica esse corte explicitamente.',
          'Via IM profunda exclusivamente.',
          'Profilaxia de febre reumática/glomerulonefrite: repetir a mesma dose única a cada 4 semanas (uso periódico, não representado pelo campo de duração).',
          'Ajuste renal: Clcr 10-50 — 75% da dose; Clcr < 10 — 20-50% da dose. Administrar após hemodiálise.',
        ],
        alerts: [
          'Sífilis e bouba/bejel/pinta usam esquemas totalmente diferentes — não incluídos nesta entrada.',
        ],
        calcNote: 'Dose fixa por faixa de peso, escolhida automaticamente — não editável',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
    ],
  },
  {
    id: 'claritromicina',
    name: 'Claritromicina',
    category: ANTIBIOTIC_CATEGORIES.MACROLIDEOS,
    presentation: ['Klaricid® suspensão pediátrica 125mg/5mL'],
    therapeuticClass: 'Antimicrobiano, Macrolídeo',
    routeOfAdministration: 'Oral',
    concentration: {
      oral: { value: 25, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '125mg/5mL' },
    },
    indications: [
      {
        name: 'Posologia geral (12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 15,
        doseMax: 15,
        dosesPerDay: 2,
        doseDefault: 15,
        durationDays: 7,
        route: ['oral'],
        ageWarning: 'Uso a partir de 6 meses de vida.',
        specialConsiderations: [
          'Duração pode variar de 5 a 10 dias (7 dias usado como valor padrão) — ajustar conforme indicação clínica.',
          'Pode ser administrada com ou sem alimentos, inclusive com leite.',
          'Cautela em pacientes em uso de anticoagulantes — risco aumentado de sangramento.',
          'Ajuste renal: Clcr < 30 — reduzir a dose em 50%.',
          'Dose máxima: 500mg por tomada.',
        ],
        alerts: [
          'Infecções por micobactérias usam faixa de dose diferente (7-15mg/kg) — não incluída nesta entrada.',
        ],
        calcNote: 'Dose × Peso ÷ 2 = dose por tomada (12/12h) — limitar a 500mg/tomada',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
    ],
  },
  {
    id: 'cefuroxima',
    name: 'Cefuroxima (Axetilcefuroxima)',
    category: ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS,
    presentation: ['Zinnat® suspensão 250mg/5mL', 'Zinacef® frasco 750mg'],
    therapeuticClass: 'Antimicrobiano, Cefalosporina de 2ª geração',
    routeOfAdministration: 'Oral e IM/EV',
    concentration: {
      oral: { value: 50, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '250mg/5mL' },
      im: {
        value: 250,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 750mg',
        reconstitution: { diluent: 'água destilada', diluentVolume: 3, diluentUnit: 'mL' },
      },
      ev: {
        value: 125,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 750mg',
        reconstitution: { diluent: 'água destilada', diluentVolume: 6, diluentUnit: 'mL' },
        dilution: {
          volumeMin: 50,
          volumeMax: 100,
          unit: 'mL',
          diluent: 'SF 0,9%, SG 5%, SG 10% ou RL',
          infusionMin: 15,
          infusionMax: 30,
          infusionUnit: 'min',
        },
      },
    },
    indications: [
      {
        name: 'Posologia geral (via oral, 12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 20,
        dosesPerDay: 2,
        doseDefault: 20,
        durationDays: 7,
        route: ['oral'],
        ageWarning: 'Sem dados abaixo de 3 meses de idade.',
        specialConsiderations: [
          '20mg/kg/dia (10mg/kg/dose, 12/12h): amigdalite, faringite, sinusite, bronquite.',
          'Duração pode variar de 5 a 10 dias (7 dias usado como valor padrão).',
          'Ingerir preferencialmente após as refeições.',
          'Dose máxima: 250mg/dia.',
          'Ajuste renal: Clcr > 30 — sem ajuste; Clcr 10-29 — a cada 24h; Clcr < 10 — a cada 48h.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ 2 = dose por tomada (12/12h) — limitar a 250mg/dia',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Otite média, sinusite, pneumonia, ITU e pele (dose elevada, 12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 30,
        doseMax: 30,
        dosesPerDay: 2,
        doseDefault: 30,
        durationDays: 7,
        route: ['oral'],
        ageWarning: 'Otite média, pneumonia e piodermites: uso a partir de 2 anos.',
        specialConsiderations: [
          '30mg/kg/dia (15mg/kg/dose, 12/12h).',
          'Duração pode variar de 5 a 10 dias (7 dias usado como valor padrão).',
          'Dose máxima: 500mg/dia.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ 2 = dose por tomada (12/12h) — limitar a 500mg/dia',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Via parenteral (IM/EV, 8/8h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 75,
        doseMax: 240,
        dosesPerDay: 3,
        doseDefault: 150,
        durationDays: null,
        route: ['im', 'ev'],
        ageWarning: null,
        specialConsiderations: [
          'Dose real depende da gravidade da infecção.',
          'IM: aplicar em área de grande massa muscular.',
          'Ajuste renal: Clcr > 30 — sem ajuste; Clcr 10-20 — 0,75g a 1,5g a cada 12h.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ 3 = dose por tomada (8/8h)',
        source: 'Guia Farmacêutico HSL',
      },
    ],
  },
  {
    id: 'cefaclor',
    name: 'Cefaclor',
    category: ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS,
    presentation: ['Ceclor® suspensão 250mg/5mL'],
    therapeuticClass: 'Antimicrobiano, Cefalosporina de 2ª geração',
    routeOfAdministration: 'Oral',
    concentration: {
      oral: { value: 50, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '250mg/5mL' },
    },
    indications: [
      {
        name: 'Posologia geral (8/8h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 20,
        dosesPerDay: 3,
        doseDefault: 20,
        durationDays: null,
        route: ['oral'],
        ageWarning: 'Uso a partir de 1 mês de idade.',
        specialConsiderations: [
          'Trato respiratório inferior (incluindo pneumonia), pele, trato urinário.',
          'Faringite/amigdalite: mesma dose, pode ser fracionada em 12/12h.',
          'Faringite estreptocócica: tratamento mínimo de 10 dias.',
          'Penicilina continua sendo o fármaco de escolha para faringite estreptocócica — cefaclor é alternativa.',
          'Dose máxima: 1g/dia.',
          'Ajuste renal: Clcr 10-50 — 50-100% da dose; Clcr < 10 — 50% da dose.',
        ],
        alerts: [
          'Cepas de H. influenzae resistentes à ampicilina (BLNAR) devem ser consideradas resistentes ao cefaclor, mesmo com suscetibilidade aparente in vitro.',
        ],
        calcNote: 'Dose × Peso ÷ 3 = dose por tomada (8/8h)',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Dose elevada (otite média / infecções graves, 12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 40,
        doseMax: 40,
        dosesPerDay: 2,
        doseDefault: 40,
        durationDays: null,
        route: ['oral'],
        ageWarning: 'Uso a partir de 1 mês de idade.',
        specialConsiderations: [
          'Otite média aguda, e infecções respiratórias, de pele e urinárias mais graves.',
          'Dose máxima: 1g/dia.',
        ],
        alerts: [],
        calcNote: 'Dose × Peso ÷ 2 = dose por tomada (12/12h)',
        source: 'Bula profissional',
      },
    ],
  },
  {
    id: 'ceftriaxona',
    name: 'Ceftriaxona',
    category: ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS,
    presentation: ['Rocefin®/Keftron® frasco 500mg', 'Rocefin®/Keftron® frasco 1g'],
    therapeuticClass: 'Antimicrobiano, Cefalosporina de 3ª geração',
    routeOfAdministration: 'IM e EV',
    concentration: {
      // IM: os dois frascos NÃO dão a mesma concentração final —
      // 500mg/2mL = 250mg/mL; 1g/3,5mL = 285,7mg/mL. Por isso
      // precisam ser duas chaves separadas.
      im500: {
        value: 250,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 500mg',
        reconstitution: { diluent: 'lidocaína 1%', diluentVolume: 2, diluentUnit: 'mL' },
      },
      im1000: {
        value: 285.7,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 1g',
        reconstitution: { diluent: 'lidocaína 1%', diluentVolume: 3.5, diluentUnit: 'mL' },
      },
      // EV: os dois frascos, na proporção usada pelo HSL, dão a MESMA
      // concentração final (100mg/mL) — por isso é uma chave só, com
      // as duas receitas de reconstituição listadas (array).
      ev: {
        value: 100,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 500mg ou 1g',
        reconstitution: [
          { vialLabel: 'Frasco 500mg', diluent: 'água destilada', diluentVolume: 5, diluentUnit: 'mL' },
          { vialLabel: 'Frasco 1g', diluent: 'água destilada', diluentVolume: 10, diluentUnit: 'mL' },
        ],
        dilution: { volume: 100, unit: 'mL', diluent: 'SF 0,9%' },
        infusionTime: 60,
        infusionUnit: 'min',
      },
    },
    indications: [
      {
        name: 'Posologia geral (15 dias a 12 anos, < 50kg — 1x/dia)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 80,
        dosesPerDay: 1,
        doseDefault: 50,
        durationDays: null,
        route: ['im500', 'im1000', 'ev'],
        ageWarning: 'Recém-nascidos < 14 dias têm posologia própria — ver indicação separada. Crianças ≥ 50 kg: usar dose de adulto (1-2g dose única diária; casos graves, até 4g).',
        specialConsiderations: [
          'Doses EV ≥ 50mg/kg devem ser infundidas em período ≥ 30 minutos.',
          'Manter por, no mínimo, 48-72h após desaparecimento da febre ou erradicação bacteriana — duração total varia por indicação.',
          'IM: não injetar mais de 1g por sítio, em região glútea.',
          'Dose máxima: 4g/dia (2g/dia se houver disfunção hepática associada).',
        ],
        alerts: [
          'NÃO administrar com soluções contendo cálcio — risco de precipitação.',
          'Incompatível com aminoglicosídeos, vancomicina e fluconazol na mesma via — administrar em acessos separados.',
          'O diluente IM (lidocaína) nunca deve ser administrado por via EV.',
        ],
        calcNote: 'Dose × Peso = dose única diária — limitar a 4g/dia',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Recém-nascidos < 14 dias (CRÍTICO — 1x/dia)',
        doseUnit: 'mg/kg/dia',
        doseMin: 20,
        doseMax: 50,
        dosesPerDay: 1,
        doseDefault: 50,
        durationDays: null,
        route: ['im500', 'im1000', 'ev'],
        ageWarning: 'Restrito a recém-nascidos com menos de 14 dias. NÃO ultrapassar 50mg/kg.',
        specialConsiderations: [
          'Doses EV devem ser administradas durante 60 minutos, para reduzir o risco de encefalopatia bilirrubínica.',
        ],
        alerts: [
          'CONTRAINDICADA em neonatos prematuros com idade pós-menstrual até 41 semanas.',
          'CONTRAINDICADA em recém-nascidos ≤ 28 dias que necessitem (ou possam necessitar) de soluções EV com cálcio, incluindo nutrição parenteral — risco de precipitação fatal.',
          'Confirmar idade pós-menstrual > 41 semanas e ausência de necessidade de solução EV com cálcio antes de prescrever.',
        ],
        calcNote: 'Dose × Peso = dose única diária — não ultrapassar 50mg/kg',
        source: 'Bula profissional',
      },
    ],
  },
  {
    id: 'ampicilina',
    name: 'Ampicilina',
    category: ANTIBIOTIC_CATEGORIES.PENICILINAS,
    presentation: ['Amplacilina® frasco 1g'],
    therapeuticClass: 'Antimicrobiano, Penicilina',
    routeOfAdministration: 'IM e EV',
    concentration: {
      im: {
        value: 333.3,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 1g',
        reconstitution: { diluent: 'água destilada', diluentVolume: 3, diluentUnit: 'mL' },
      },
      ev: {
        value: 333.3,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: 'Frasco 1g',
        reconstitution: { diluent: 'água destilada', diluentVolume: 3, diluentUnit: 'mL' },
        dilution: {
          volumeMin: 50,
          volumeMax: 100,
          unit: 'mL',
          diluent: 'SF 0,9%, SG 5% ou Ringer-Lactato',
          infusionTime: 30,
          infusionUnit: 'min',
        },
      },
    },
    indications: [
      {
        name: 'Via EV/IM — crianças > 1 mês (6/6h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 100,
        doseMax: 400,
        dosesPerDay: 4,
        doseDefault: 200,
        durationDays: null,
        route: ['im', 'ev'],
        ageWarning: 'Acima de 1 mês. Recém-nascidos têm estrutura de dose própria — ver indicação separada.',
        specialConsiderations: [
          'Dose real depende da gravidade — meningite bacteriana usa 100-200mg/kg/dia, dentro desta faixa.',
          'Administração EV direta: 125-500mg em 3-5min; 1-2g em 10-15min. Administrações mais rápidas podem causar convulsões.',
          'Dose máxima: < 20kg — 300mg/kg/dia; ≥ 20kg — 12g/dia.',
          'Ajuste renal: Clcr 30-50 — 35-50mg/kg/dose a cada 6h; Clcr 10-29 — a cada 8-12h; Clcr < 10 — a cada 12h.',
        ],
        alerts: [
          'Incompatível com aminoglicosídeos (ex.: gentamicina) na mesma seringa — administrar em vias separadas, mesmo sendo combinação terapêutica comum.',
        ],
        calcNote: 'Dose × Peso ÷ 4 = dose por tomada (6/6h) — ajustar conforme gravidade',
        source: 'Guia Farmacêutico HSL',
      },
      {
        name: 'Via EV/IM — recém-nascidos > 2kg',
        doseUnit: 'mg/kg/dose',
        doseMin: 50,
        doseMax: 100,
        dosesPerDay: 4,
        doseDefault: 50,
        durationDays: null,
        route: ['im', 'ev'],
        ageWarning: 'Restrito a recém-nascidos com peso > 2kg.',
        specialConsiderations: [
          '> 7 dias, uso geral: 50mg/kg/dose a cada 6h.',
          '> 7 dias, sepse/meningite: 50-75mg/kg/dose a cada 6h.',
          '< 7 dias, uso geral: 50mg/kg/dose a cada 8h.',
          '< 7 dias, sepse/meningite: 50-100mg/kg/dose a cada 12h.',
          'Selecionar a combinação de idade e gravidade correta antes de calcular — ajustar o número de tomadas conforme a tabela acima.',
        ],
        alerts: [
          'Incompatível com aminoglicosídeos (ex.: gentamicina) na mesma seringa.',
        ],
        calcNote: 'Dose × Peso = dose por tomada — fracionamento depende da combinação idade × gravidade',
        source: 'Guia Farmacêutico HSL',
      },
    ],
  },
  {
    id: 'gentamicina',
    name: 'Gentamicina',
    category: ANTIBIOTIC_CATEGORIES.AMINOGLICOSIDEOS,
    presentation: ['Garamicina® frasco 60mg/1,5mL', 'Garamicina® frasco 80mg/2mL'],
    therapeuticClass: 'Antimicrobiano, Aminoglicosídeo',
    routeOfAdministration: 'IM e EV',
    concentration: {
      im: { value: 40, unit: 'mg/mL', resultUnit: 'mL', presentationLabel: '80mg/2mL (pronta para uso, sem reconstituir)' },
      ev: {
        value: 40,
        unit: 'mg/mL',
        resultUnit: 'mL',
        presentationLabel: '80mg/2mL (pronta para uso, sem reconstituir)',
        dilution: {
          volumeMin: 50,
          volumeMax: 200,
          unit: 'mL',
          diluent: 'SF 0,9%, SG 5% ou RL',
          infusionMin: 30,
          infusionMax: 120,
          infusionUnit: 'min',
        },
      },
    },
    indications: [
      {
        name: 'Via IM/EV — pediatria, função renal normal (8/8h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 6,
        doseMax: 7.5,
        dosesPerDay: 3,
        doseDefault: 7.5,
        durationDays: 7,
        route: ['im', 'ev'],
        ageWarning: 'Válida para crianças, lactentes e neonatos com mais de 1 semana. Neonatos ≤ 1 semana têm dose própria — ver indicação separada.',
        specialConsiderations: [
          'Duração pode variar de 7 a 10 dias. Cursos além de 10 dias exigem monitoramento renal, auditivo e vestibular.',
          'Alvos de concentração sérica: pico ≤ 12mcg/mL; vale ≤ 2mcg/mL.',
          'Calcular a dose sobre o peso ideal, não o peso real.',
          'Ajuste renal: Clcr 60-79 — 4mg/kg a cada 24h; Clcr 50 — 3,5mg/kg a cada 24h; Clcr 40 — 2,5mg/kg a cada 24h; Clcr < 30 — guiado por concentração sérica.',
        ],
        alerts: [
          'Incompatível com penicilinas (ex.: ampicilina) na mesma seringa — administrar em vias separadas, mesmo sendo combinação terapêutica comum.',
        ],
        calcNote: 'Dose × Peso IDEAL ÷ 3 = dose por tomada (8/8h) — limitar a 7,5mg/kg/dia',
        source: 'Bula profissional + Guia Farmacêutico HSL',
      },
      {
        name: 'Neonatos ≤ 1 semana de vida (12/12h)',
        doseUnit: 'mg/kg/dia',
        doseMin: 5,
        doseMax: 5,
        dosesPerDay: 2,
        doseDefault: 5,
        durationDays: 7,
        route: ['im', 'ev'],
        ageWarning: 'Restrito a neonatos com 1 semana de vida ou menos.',
        specialConsiderations: [
          'Duração pode variar de 7 a 10 dias.',
          'Mesmos alvos de concentração sérica e mesma orientação de peso ideal da indicação geral.',
        ],
        alerts: [
          'Incompatível com penicilinas (ex.: ampicilina) na mesma seringa.',
        ],
        calcNote: 'Dose × Peso IDEAL ÷ 2 = dose por tomada (12/12h) — limitar a 5mg/kg/dia',
        source: 'Bula profissional',
      },
    ],
  },
];