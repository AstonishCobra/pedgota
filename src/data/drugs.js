export const DRUG_CATEGORIES = {
  VASOACTIVE: 'vasoativa',
  SEDATIVE: 'sedativa',
  BNM: 'bnm',
};

export const drugs = [
  // ─── VASOATIVAS ───────────────────────────────────────────────────────────
  {
    id: 'adrenalina',
    name: 'Adrenalina',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Ampola 1 mg/ml',
    therapeuticClass: 'Simpaticomimético, agonista adrenérgico',
    mechanism:
      'Agonista alfa e beta-adrenérgico. Doses baixas → efeito β1 e β2 (↑contratilidade, FC e broncodilatação). Doses altas → efeito α1 (vasoconstrição intensa e ↑PA).',
    indications: [
      'Parada cardiorrespiratória',
      'Anafilaxia e choque anafilático',
      'Choque séptico com disfunção miocárdica',
      'Edema de vias aéreas',
      'Suporte hemodinâmico em casos refratários',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 0.05,
    doseMax: 1,
    doseStep: 0.01,
    doseDefault: 0.1,
    adverseEffects: ['Arritmias', 'Hipertensão', 'Isquemia miocárdica', 'Tremores, ansiedade, hiperglicemia'],
    specialConsiderations: [
      'Preferência por acesso venoso central',
      'Em uso periférico: monitorar rigorosamente para evitar necrose',
      'Monitorar FC, PA, ECG e perfusão periférica continuamente',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    // Fórmula: Dose × Peso × 1,44 = ml do fármaco (para 24h a 1ml/h)
    calcType: 'standard_1_44',
    concentration_mg_per_ml: 1, // 1 mg/ml
    doseUnitIsMilligram: false, // dose em mcg → sem divisão extra
    // "doseUnitIsMilligram: false" e concentration_mg_per_ml = 1 significa:
    //   volume_farmaco = dose(mcg/kg/min) × peso × 1.44   [ml]
    //   (adrenalina: 1 mg/ml, dose em mcg → resultado direto em ml)
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
  },
  {
    id: 'noradrenalina',
    name: 'Noradrenalina',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Ampola 4 mg/4 ml (1 mg/ml)',
    therapeuticClass: 'Simpaticomimético, vasopressor',
    mechanism:
      'Agonista predominante de receptores α1-adrenérgicos (vasoconstrição intensa e ↑PA). Leve ação β1 (↑discreto de contratilidade miocárdica).',
    indications: [
      'Choque séptico com hipotensão refratária à reposição volêmica',
      'Choque distributivo (neurogênico, anafilático refratário)',
      'Hipotensão grave em estados de choque com resistência vascular reduzida',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 0.05,
    doseMax: 2,
    doseStep: 0.01,
    doseDefault: 0.1,
    adverseEffects: ['Hipertensão', 'Isquemia periférica', 'Taquicardia, arritmias (efeito β1 leve)'],
    specialConsiderations: [
      'Preferência por acesso venoso central',
      'Se acesso periférico: usar veia calibrosa e monitorar local de infusão',
      'Monitorar extremidades para sinais de isquemia',
      'Garantir reposição volêmica adequada antes do início',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'standard_1_44',
    concentration_mg_per_ml: 1,
    doseUnitIsMilligram: false,
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
  },
  {
    id: 'dopamina',
    name: 'Dopamina',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Ampola 5 mg/ml',
    therapeuticClass: 'Inotrópico e vasopressor dose-dependente',
    mechanism:
      'Receptores D1/D2 e β1 em doses baixas (vasodilatação renal e inotrópico). Em doses altas ativa α1 (vasoconstrição).',
    indications: [
      'Choque séptico com disfunção miocárdica',
      'Choque cardiogênico',
      'Suporte hemodinâmico com necessidade de efeito inotrópico e perfusão renal',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 2,
    doseMax: 20,
    doseStep: 0.5,
    doseDefault: 5,
    doseTips: [
      { range: '2–5 mcg/kg/min', effect: 'Dopaminérgico (vasodilatação renal)' },
      { range: '5–10 mcg/kg/min', effect: 'β1 (inotrópico)' },
      { range: '>10 mcg/kg/min', effect: 'α1 (vasoconstritor)' },
    ],
    adverseEffects: ['Taquicardia', 'Arritmias', 'Náuseas', 'Vasoconstrição em doses altas'],
    specialConsiderations: [
      'Preferir acesso venoso central; periférico de curto prazo é tolerado',
      'Monitorizar frequência cardíaca e perfusão',
      'Evitar uso prolongado em altas doses (risco de isquemia)',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'mg_divided',
    concentration_mg_per_ml: 5, // 5 mg/ml
    doseUnitIsMilligram: false, // dose em mcg → converte: ×1,44 → mg → ÷ conc
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 5 (mg/ml) = ml do fármaco',
  },
  {
    id: 'dobutamina',
    name: 'Dobutamina',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Ampola 250 mg/20 ml (12,5 mg/ml)',
    therapeuticClass: 'Inotrópico β1-adrenérgico',
    mechanism:
      'Estimula receptores β1 (↑contratilidade cardíaca — inotrópico positivo) com leve efeito vasodilatador periférico (β2). Mínimo efeito sobre FC e RVS.',
    indications: [
      'Choque cardiogênico',
      'Disfunção miocárdica em choque séptico',
      'Insuficiência cardíaca com baixo débito',
      'Situações que requerem aumento da contratilidade com redução da pós-carga',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 5,
    doseMax: 20,
    doseStep: 0.5,
    doseDefault: 10,
    adverseEffects: ['Taquicardia', 'Arritmias', 'Hipotensão (efeito vasodilatador)', 'Dor torácica em pacientes suscetíveis'],
    specialConsiderations: [
      'Uso preferencial em pacientes com disfunção de bomba (coração)',
      'Cuidado em hipotensão grave — pode ser necessário associar vasopressor',
      'Monitorar FC, PA e sinais de perfusão',
      'Pode ser usada em acesso periférico de curto prazo; preferir acesso central',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'mg_divided',
    concentration_mg_per_ml: 12.5,
    doseUnitIsMilligram: false,
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 12,5 (mg/ml) = ml do fármaco',
  },
  {
    id: 'vasopressina',
    name: 'Vasopressina',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Ampola 20 UI/1 ml',
    therapeuticClass: 'Hormônio antidiurético sintético, vasopressor',
    mechanism:
      'Agonista dos receptores V1 (vasoconstrição potente, útil em choque distributivo refratário) e V2 (retenção de água nos túbulos renais).',
    indications: [
      'Choque séptico refratário à noradrenalina',
      'Suporte em choque vasodilatado (anafilaxia grave, pós-cardiotomia)',
      'Parada cardiorrespiratória (em alguns protocolos)',
    ],
    doseUnit: 'UI/kg/h',
    doseMin: 0.01,
    doseMax: 0.6,
    doseStep: 0.01,
    doseDefault: 0.05,
    adverseEffects: ['Isquemia periférica e mesentérica', 'Bradicardia', 'Hiponatremia', 'Hipoperfusão renal'],
    specialConsiderations: [
      'Preferir uso com acesso venoso central',
      'Monitorar perfusão e eletrólitos',
      'Desmame gradual para evitar hipotensão rebote',
      'Associar à noradrenalina na maioria dos casos; não substitui o vasopressor principal',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'vasopressina',
    // Diluição padrão: 1ml (20UI) + 49ml SF = 50ml → concentração 0,4 UI/ml
    // volume = dose × peso × 24 / 0.4   → velocidade = volume / 24
    calcNote: 'Dose × Peso × 24 = UI totais → ÷ 0,4 (UI/ml) = volume para 24h → velocidade em ml/h',
  },
  {
    id: 'milrinona',
    name: 'Milrinona',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Frasco-Ampola 10 mg/10 ml (1 mg/ml)',
    therapeuticClass: 'Inibidor da fosfodiesterase III, inotrópico e vasodilatador',
    mechanism:
      'Inibe a fosfodiesterase III → ↑AMPc no músculo cardíaco e vascular → ↑contratilidade (inotrópico positivo) + vasodilatação sistêmica e pulmonar → ↑débito cardíaco.',
    indications: [
      'Insuficiência cardíaca aguda',
      'Choque cardiogênico com aumento da resistência vascular',
      'Disfunção ventricular pós-operatória',
      'Hipertensão pulmonar',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 0.1,
    doseMax: 1,
    doseStep: 0.05,
    doseDefault: 0.5,
    adverseEffects: ['Hipotensão (efeito vasodilatador)', 'Arritmias ventriculares ou supraventriculares', 'Trombocitopenia (menos comum)'],
    specialConsiderations: [
      'Evitar em pacientes com hipotensão não controlada',
      'Ajuste de dose em insuficiência renal (eliminação renal)',
      'Uso exclusivo com bomba de infusão para controle preciso',
      'Monitorar pressão arterial de forma contínua',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'standard_1_44',
    concentration_mg_per_ml: 1,
    doseUnitIsMilligram: false,
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
  },
  {
    id: 'nitroprussiato',
    name: 'Nitroprussiato de Sódio',
    category: DRUG_CATEGORIES.VASOACTIVE,
    presentation: 'Ampola 50 mg/2 ml (25 mg/ml)',
    therapeuticClass: 'Vasodilatador arterial e venoso de ação direta',
    mechanism:
      'Libera óxido nítrico → relaxamento do músculo liso vascular → vasodilatação arterial e venosa → ↓pré-carga, ↓pós-carga e ↓RVS. Controle rápido da PA.',
    indications: [
      'Crises hipertensivas (emergência hipertensiva)',
      'Insuficiência cardíaca aguda com pós-carga elevada',
      'Controle da pressão arterial em cirurgias',
      'Edema agudo de pulmão associado à hipertensão',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 0.3,
    doseMax: 10,
    doseStep: 0.1,
    doseDefault: 1,
    doseTips: [
      { range: '0,3–0,5 mcg/kg/min', effect: 'Dose inicial — titular a cada 5 min' },
      { range: '3–4 mcg/kg/min', effect: 'Dose usual de manutenção' },
      { range: '10 mcg/kg/min', effect: 'Dose máxima (curto período — risco de cianeto)' },
    ],
    adverseEffects: [
      'Hipotensão severa',
      'Toxicidade por cianeto ou tiocianato (infusões prolongadas ou altas doses)',
      'Náuseas, vômitos, sudorese, confusão mental',
    ],
    specialConsiderations: [
      '⚠ Sempre proteger da luz (fotossensível) — usar equipo fotoprotetor',
      'Monitorizar PA de forma contínua',
      'Evitar infusão >72h',
      'Cautela em insuficiência renal ou hepática (↑risco de toxicidade)',
    ],
    alerts: ['FOTOSSENSÍVEL — proteger da luz com equipo fotoprotetor', 'Dose máxima 10 mcg/kg/min por curto período (toxicidade por cianeto)'],
    diluent: 'SG 5%',
    calcType: 'mg_divided',
    concentration_mg_per_ml: 25,
    doseUnitIsMilligram: false,
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 25 (mg/ml) = ml do fármaco. Diluente: SG 5%',
  },

  // ─── SEDATIVOS / ANALGÉSICOS ──────────────────────────────────────────────
  {
    id: 'fentanil',
    name: 'Fentanil',
    category: DRUG_CATEGORIES.SEDATIVE,
    presentation: 'Ampola 0,05 mg/ml (50 mcg/ml)',
    therapeuticClass: 'Opioide analgésico potente',
    mechanism:
      'Age nos receptores opioides μ (mu) → analgesia intensa e sedação. Início rápido e curta duração em bolus — ideal para dor e sedação contínua em VM.',
    indications: [
      'Sedação contínua em pacientes críticos (ventilação mecânica)',
      'Controle de dor aguda intensa',
      'Procedimentos invasivos',
    ],
    doseUnit: 'mcg/kg/h',
    doseMin: 1,
    doseMax: 5,
    doseStep: 0.5,
    doseDefault: 2,
    adverseEffects: ['Depressão respiratória', 'Rigidez muscular (em bolus rápido)', 'Bradicardia, hipotensão', 'Constipação (uso prolongado)'],
    specialConsiderations: [
      'Monitorizar continuamente FR e sedação',
      'Associar a benzodiazepínico para evitar rigidez torácica',
      'Ajustar dose em insuficiência hepática',
      'Retirar gradualmente se uso prolongado (risco de abstinência)',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'fentanil',
    // Dose × Peso × 24 = mcg totais → ÷ 50 (mcg/ml) = ml
    concentration_mcg_per_ml: 50,
    calcNote: 'Dose × Peso × 24 = mcg totais → ÷ 50 (mcg/ml) = ml do fármaco',
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    category: DRUG_CATEGORIES.SEDATIVE,
    presentation: 'Ampola 5 mg/ml',
    therapeuticClass: 'Benzodiazepínico, sedativo-hipnótico',
    mechanism:
      'Agonista dos receptores GABA-A → ↑atividade inibitória do SNC → sedação, amnésia anterógrada, relaxamento muscular. Em doses elevadas: depressão respiratória.',
    indications: [
      'Sedação contínua em crianças sob ventilação mecânica',
      'Pré-medicação para procedimentos invasivos',
      'Controle de agitação em pacientes graves',
    ],
    doseUnit: 'mg/kg/h',
    doseMin: 0.06,
    doseMax: 0.6,
    doseStep: 0.01,
    doseDefault: 0.1,
    doseTips: [
      { range: '0,06–0,1 mg/kg/h', effect: 'Sedação leve' },
      { range: '0,1–0,3 mg/kg/h', effect: 'Sedação moderada' },
      { range: '0,3–0,6 mg/kg/h', effect: 'Sedação profunda (máx 15 mg/h)' },
    ],
    adverseEffects: ['Depressão respiratória', 'Hipotensão', 'Bradicardia', 'Sedação excessiva'],
    specialConsiderations: [
      'Monitorar continuamente nível de sedação, oximetria e sinais vitais',
      'Acúmulo em infusões prolongadas com disfunção hepática',
      'Fazer desmame gradual para evitar abstinência',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'midazolam',
    // Dose × Peso × 24 = mg → ÷ 5 (mg/ml) = ml
    concentration_mg_per_ml: 5,
    calcNote: 'Dose × Peso × 24 = mg → ÷ 5 (mg/ml) = ml do fármaco',
  },
  {
    id: 'cetamina',
    name: 'Cetamina',
    category: DRUG_CATEGORIES.SEDATIVE,
    presentation: 'Ampola 50 mg/ml',
    therapeuticClass: 'Anestésico dissociativo, analgésico',
    mechanism:
      'Bloqueia receptores NMDA → dissociação entre consciência e percepção sensorial → analgesia, sedação e amnésia com preservação dos reflexos de via aérea e estímulo cardiovascular.',
    indications: [
      'Sedação contínua em crianças graves com risco de hipotensão',
      'Intubação e procedimentos invasivos',
      'Sedação e analgesia em dor intensa ou trauma',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 10,
    doseMax: 60,
    doseStep: 1,
    doseDefault: 20,
    doseTips: [
      { range: '10–20 mcg/kg/min', effect: 'Analgesia e sedação leve' },
      { range: '20–40 mcg/kg/min', effect: 'Sedação + efeito broncodilatador' },
      { range: '40–60 mcg/kg/min', effect: 'Sedação profunda' },
    ],
    adverseEffects: ['Aumento de PA e FC', 'Hipersalivação', 'Alucinações ou agitação (especialmente no despertar)', 'Náuseas e vômitos'],
    specialConsiderations: [
      'Excelente opção em instabilidade hemodinâmica',
      'Usar com cautela em hipertensão intracraniana ou glaucoma',
      'Pode ser associada ao midazolam para reduzir efeitos psíquicos',
      'Monitorização rigorosa da via aérea e nível de sedação',
    ],
    alerts: [],
    diluent: 'SF 0,9%',
    calcType: 'cetamina',
    // Dose × Peso × 1,44 = mg → ÷ 50 = ml
    concentration_mg_per_ml: 50,
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 50 (mg/ml) = ml do fármaco',
  },
  {
    id: 'dexmedetomidina',
    name: 'Dexmedetomidina',
    category: DRUG_CATEGORIES.SEDATIVE,
    presentation: 'Frasco-ampola 100 mcg/ml',
    therapeuticClass: 'Sedativo alfa-2 adrenérgico seletivo',
    mechanism:
      'Agonista seletivo dos receptores α2 adrenérgicos centrais → ↓liberação de noradrenalina no SNC → sedação com mínimo comprometimento respiratório. Leve efeito ansiolítico e analgésico.',
    indications: [
      'Sedação contínua em ventilação mecânica',
      'Instabilidade hemodinâmica em que se deseja evitar depressão respiratória',
      'Alternativa ao midazolam/fentanil para sedação com vigilância e cooperação',
    ],
    doseUnit: 'mcg/kg/h',
    doseMin: 0.2,
    doseMax: 1,
    doseStep: 0.1,
    doseDefault: 0.4,
    doseTips: [
      { range: '0,2 mcg/kg/h', effect: 'Dose inicial' },
      { range: '0,2–0,7 mcg/kg/h', effect: 'Faixa habitual de ajuste' },
      { range: 'até 1 mcg/kg/h', effect: 'Situações específicas' },
    ],
    adverseEffects: ['Bradicardia', 'Hipotensão (especialmente em doses altas ou infusão rápida)', 'Boca seca', 'Náuseas (menos comum)'],
    specialConsiderations: [
      '⚠ Evitar dose de ataque em crianças (risco de bradicardia e hipotensão)',
      'Raramente causa depressão respiratória — vantagem sobre midazolam',
      'Monitorar FC e PA continuamente',
      'Evitar em bradicardia importante ou bloqueios AV grau 2 ou 3',
      'Boa opção para sedação leve a moderada em UTI pediátrica',
    ],
    alerts: ['Evitar dose de ataque em crianças — risco de bradicardia e hipotensão'],
    diluent: 'SF 0,9%',
    calcType: 'dexmedetomidina',
    // Diluição padrão fixa: 2ml (200mcg) + 48ml SF = 50ml → 4 mcg/ml
    // Velocidade = Dose × Peso ÷ 4 ml/h
    calcNote: 'Diluição padrão: 2 ml (200 mcg) + 48 ml SF 0,9% = 50 ml (4 mcg/ml). Velocidade = Dose × Peso ÷ 4 = ml/h',
  },

  // ─── BNM ──────────────────────────────────────────────────────────────────
  {
    id: 'rocuronio',
    name: 'Rocurônio',
    category: DRUG_CATEGORIES.BNM,
    presentation: 'Ampola 10 mg/ml',
    therapeuticClass: 'Bloqueador neuromuscular não despolarizante',
    mechanism:
      'Compete com a acetilcolina nos receptores nicotínicos da junção neuromuscular → paralisia muscular. Não possui ação sedativa nem analgésica.',
    indications: [
      'Intubação orotraqueal em sequência rápida (IOT-SR): 0,6–1,2 mg/kg IV em dose única',
      'Manutenção de bloqueio neuromuscular em ventilação mecânica (sempre com sedação e analgesia)',
    ],
    doseUnit: 'mcg/kg/min',
    doseMin: 5,
    doseMax: 12,
    doseStep: 0.5,
    doseDefault: 7,
    adverseEffects: ['Paralisia prolongada', 'Apneia com necessidade de suporte ventilatório contínuo', 'Bradicardia (raro)', 'Reações alérgicas (incomum)'],
    specialConsiderations: [
      '⚠ NUNCA administrar sem sedação e analgesia associadas',
      'Monitorar sinais vitais continuamente',
      'Usar preferencialmente após sedação eficaz',
      'Pode ser revertido com sugamadex (2 mg/kg), se necessário',
    ],
    alerts: ['NUNCA ADMINISTRAR SEM SEDAÇÃO E ANALGESIA ASSOCIADAS', 'Não possui ação sedativa nem analgésica'],
    diluent: 'SF 0,9%',
    calcType: 'rocuronio',
    // Dose × Peso × 1,44 = mg → ÷ 10 = ml
    concentration_mg_per_ml: 10,
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 10 (mg/ml) = ml do fármaco',
  },
];

// ─── FÓRMULAS DE CÁLCULO ──────────────────────────────────────────────────────
export function calculateDrug(drug, weightKg, dose, totalVolumeMl = 24) {
  let drugVolumeMl = 0;
  let infusionRateMlH = 0;
  let equivalenceStr = '';
  let diluentVolumeMl = 0;

  switch (drug.calcType) {
    case 'standard_1_44': {
      // Adrenalina, Noradrenalina, Milrinona
      // volume_farmaco = dose × peso × 1,44   [ml direto, pois conc = 1 mg/ml e dose em mcg]
      drugVolumeMl = dose * weightKg * 1.44;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${infusionRateMlH.toFixed(1)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'mg_divided': {
      // Dopamina (÷5), Dobutamina (÷12.5), Nitroprussiato (÷25)
      const mgTotal = dose * weightKg * 1.44; // mcg × kg × 1.44 = mg (pois 1440 min/24h ÷ 1000)
      // Na verdade: dose(mcg/kg/min) × peso × 1440min/24h = total mcg/24h
      // Para obter mg: ÷1000
      // Mas o guia usa a fórmula direta sem divisão por 1000 porque a dose está em mcg
      // e o resultado é em mg: dose(mcg/kg/min) × peso × 1440/1000 ≈ × 1.44
      drugVolumeMl = mgTotal / drug.concentration_mg_per_ml;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${infusionRateMlH.toFixed(1)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'vasopressina': {
      // Dose × Peso × 24 = UI totais → ÷ 0.4 = volume para 24h
      // Solução: 1ml (20UI) + 49ml SF = 50ml (0,4 UI/ml)
      const totalUI = dose * weightKg * 24;
      const totalVolForDrug = totalUI / 0.4; // volume em ml para 24h
      infusionRateMlH = totalVolForDrug / 24;
      // Prescrição sempre fixa: 1ml vasopressina + 49ml SF = 50ml
      drugVolumeMl = 1; // 1ml = 20UI
      diluentVolumeMl = 49;
      equivalenceStr = `${infusionRateMlH.toFixed(2)} ml/h = ${dose} UI/kg/h`;
      return {
        drugVolumeMl: Math.round(drugVolumeMl * 10) / 10,
        diluentVolumeMl: 49,
        totalVolumeMl: 50,
        infusionRateMlH: Math.round(infusionRateMlH * 100) / 100,
        equivalenceStr,
        prescriptionLines: [
          `Vasopressina --------- 1 ml (20 UI)`,
          `SF 0,9% --------------- 49 ml`,
          `Infundir ${infusionRateMlH.toFixed(2)} ml/h, EV, em bomba de infusão contínua (BIC)`,
          `Nesta solução: ${infusionRateMlH.toFixed(2)} ml/h = ${dose} UI/kg/h`,
        ],
      };
    }
    case 'fentanil': {
      // Dose × Peso × 24 = mcg totais → ÷ 50 (mcg/ml) = ml
      const totalMcg = dose * weightKg * 24;
      drugVolumeMl = totalMcg / drug.concentration_mcg_per_ml;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${infusionRateMlH.toFixed(1)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'midazolam': {
      // Dose × Peso × 24 = mg → ÷ 5 = ml
      const mgTotalMid = dose * weightKg * 24;
      drugVolumeMl = mgTotalMid / drug.concentration_mg_per_ml;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${infusionRateMlH.toFixed(1)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'cetamina': {
      // Dose × Peso × 1,44 = mg → ÷ 50 = ml
      const mgTotalCet = dose * weightKg * 1.44;
      drugVolumeMl = mgTotalCet / drug.concentration_mg_per_ml;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${infusionRateMlH.toFixed(1)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'dexmedetomidina': {
      // Solução padrão fixa: 2ml fármaco + 48ml SF = 50ml (4 mcg/ml)
      // Velocidade: Dose × Peso ÷ 4 = ml/h
      infusionRateMlH = (dose * weightKg) / 4;
      drugVolumeMl = 2;
      diluentVolumeMl = 48;
      equivalenceStr = `${infusionRateMlH.toFixed(2)} ml/h = ${dose} ${drug.doseUnit}`;
      return {
        drugVolumeMl: 2,
        diluentVolumeMl: 48,
        totalVolumeMl: 50,
        infusionRateMlH: Math.round(infusionRateMlH * 100) / 100,
        equivalenceStr,
        prescriptionLines: [
          `Dexmedetomidina ---- 2 ml (200 mcg)`,
          `SF 0,9% ------------ 48 ml`,
          `Infundir ${infusionRateMlH.toFixed(2)} ml/h, EV, em bomba de infusão contínua (BIC)`,
          `Nesta solução: ${infusionRateMlH.toFixed(2)} ml/h = ${dose} mcg/kg/h`,
        ],
      };
    }
    case 'rocuronio': {
      // Dose × Peso × 1,44 = mg → ÷ 10 = ml
      const mgTotalRoc = dose * weightKg * 1.44;
      drugVolumeMl = mgTotalRoc / drug.concentration_mg_per_ml;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${infusionRateMlH.toFixed(1)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    default:
      break;
  }

  // Arredondar volume do fármaco para 1 casa decimal
  const drugVolumeRounded = Math.round(drugVolumeMl * 10) / 10;
  diluentVolumeMl = totalVolumeMl - drugVolumeRounded;

  const prescriptionLines = [
    `${drug.name} ----------- ${drugVolumeRounded} ml`,
    `${drug.diluent} ---------- ${diluentVolumeMl.toFixed(1)} ml`,
    `Infundir ${infusionRateMlH.toFixed(1)} ml/h, EV, em bomba de infusão contínua (BIC)`,
    `Nesta solução: ${equivalenceStr}`,
  ];

  return {
    drugVolumeMl: drugVolumeRounded,
    diluentVolumeMl: Math.round(diluentVolumeMl * 10) / 10,
    totalVolumeMl,
    infusionRateMlH: Math.round(infusionRateMlH * 10) / 10,
    equivalenceStr,
    prescriptionLines,
  };
}

export const vasoactiveComparativeData = [
  { name: 'Adrenalina', presentation: '1 mg/ml', mechanism: 'Agonista α e β. Dose-dependente: β em baixas, α em altas', dose: '0,05–1 mcg/kg/min', indications: 'Parada cardíaca, choque séptico, anafilaxia, edema de glote', adverseEffects: 'Arritmias, hipertensão, isquemia miocárdica' },
  { name: 'Noradrenalina', presentation: '1 mg/ml', mechanism: 'Agonista α1 (vasoconstrição), β1 discreto', dose: '0,05–2 mcg/kg/min', indications: 'Choque séptico, distributivo, hipotensão refratária', adverseEffects: 'Isquemia periférica, hipertensão, arritmias' },
  { name: 'Dopamina', presentation: '5 mg/ml', mechanism: 'Dose-dependente: D1 (renal) → β1 (inotrópico) → α1 (vasoconstrição)', dose: '2–20 mcg/kg/min', indications: 'Choque séptico, cardiogênico, suporte inotrópico', adverseEffects: 'Taquicardia, arritmias, náuseas, vasoconstrição excessiva' },
  { name: 'Dobutamina', presentation: '12,5 mg/ml', mechanism: 'Agonista β1 (inotrópico) com leve β2 (vasodilatação)', dose: '5–20 mcg/kg/min', indications: 'Choque cardiogênico, disfunção miocárdica em sepse, IC baixo débito', adverseEffects: 'Hipotensão, arritmias, taquicardia' },
  { name: 'Vasopressina', presentation: '20 UI/ml', mechanism: 'Agonista V1 (vasoconstrição) e V2 (reabsorção de água)', dose: '0,01–0,6 UI/kg/h', indications: 'Choque refratário à noradrenalina, anafilaxia grave, pós-cirúrgico', adverseEffects: 'Isquemia, bradicardia, hiponatremia' },
  { name: 'Milrinona', presentation: '1 mg/ml', mechanism: 'Inibe fosfodiesterase III (↑AMPc), inotrópico + vasodilatador', dose: '0,1–1 mcg/kg/min', indications: 'Choque cardiogênico, hipertensão pulmonar, disfunção ventricular', adverseEffects: 'Hipotensão, arritmias, trombocitopenia' },
  { name: 'Nitroprussiato', presentation: '25 mg/ml', mechanism: 'Libera NO (vasodilatação arterial + venosa), reduz pré e pós-carga', dose: '0,3–10 mcg/kg/min', indications: 'Crise hipertensiva, IC pós-carga elevada, controle hemodinâmico cirúrgico', adverseEffects: 'Hipotensão severa, toxicidade por cianeto, náuseas, confusão' },
];

export const sedativeComparativeData = [
  { name: 'Fentanil', presentation: '50 mcg/ml', mechanism: 'Agonista μ-opioide. Analgesia intensa e sedação', dose: '1–5 mcg/kg/h', indications: 'Dor aguda intensa, sedação em VM, procedimentos invasivos', adverseEffects: 'Depressão respiratória, bradicardia, rigidez muscular, constipação' },
  { name: 'Midazolam', presentation: '5 mg/ml', mechanism: 'Agonista GABA-A. Sedação, amnésia, relaxamento muscular', dose: '0,06–0,6 mg/kg/h', indications: 'Sedação em VM, agitação psicomotora, procedimentos', adverseEffects: 'Depressão respiratória, hipotensão, bradicardia, acúmulo prolongado' },
  { name: 'Cetamina', presentation: '50 mg/ml', mechanism: 'Antagonista NMDA. Dissociação sensorial e analgesia', dose: '10–60 mcg/kg/min', indications: 'Dor grave, sedação em choque, procedimentos traumáticos', adverseEffects: 'Hipertensão, taquicardia, alucinações, hipersalivação' },
  { name: 'Dexmedetomidina', presentation: '100 mcg/ml (diluído: 4 mcg/ml)', mechanism: 'Agonista alfa-2. Sedação com mínima depressão respiratória', dose: '0,2–1 mcg/kg/h', indications: 'Sedação leve a moderada em VM, pacientes instáveis hemodinamicamente', adverseEffects: 'Bradicardia, hipotensão, boca seca' },
  { name: 'Rocurônio', presentation: '10 mg/ml', mechanism: 'Bloqueador neuromuscular (não sedativo/analgésico)', dose: '5–12 mcg/kg/min', indications: 'Paralisia muscular em VM, IOT em sequência rápida', adverseEffects: 'Apneia, paralisia prolongada, bradicardia (raro)' },
];