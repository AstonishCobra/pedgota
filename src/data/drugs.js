import { SETTINGS } from './settings';

export const DRUG_CATEGORIES = {
  VASOACTIVE: 'vasoativas',
  SEDATIVE: 'sedacao',
  ANALGESIA: 'analgesia',
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 1, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 10, "unit": "mcg/ml" },
      "doseMin": 0.1,
      "doseMax": 1,
      "notes": "Simplificado: NeoFax oferece tabela de concentrações (10 a 700 mcg/mL); adotado 10 mcg/mL (recomendação para neonatos) como valor único. Faixa de dose corresponde à indicação de ressuscitação/bradicardia grave; NeoFax também descreve 0,01-0,2 (low-dose) e 0,05-0,3 (choque séptico refratário), não incorporadas nesta versão.",
      "source": "NeoFax/Micromedex - EPINEPHrine Drug Monograph, DOSING/ADMINISTRATION, p.340-344"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "doseMin": 0.1,
        "doseMax": 1,
        "maxConcentration": { "value": 64, "unit": "mcg/ml", "population": "pediatria" },
        "notes": "HSL não define concentração-padrão de preparo, apenas concentração MÁXIMA permitida na diluição. Usado como fonte de validação/alerta, não como motor de cálculo independente.",
        "source": "Guia Farmacêutico HSL - EPINEFRINA, atualizado 13/04/2026, https://guiafarmaceutico.hsl.org.br/epinefrina"
      }
    ],
    alerts: ['vesicant_central_access_required'],
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 1, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 16, "unit": "mcg/ml" },
      "doseMin": 0.2,
      "doseMax": 2,
      "notes": "População de referência: neonatos >35 semanas gestacionais, contexto de choque séptico. Dose inicial 0,2-0,5 mcg/kg/min, titular a cada 30 min. Concentração ajustada de 100 para 16 mcg/mL: o monográfico NeoFax citava 100 mcg/mL, mas o Lexicomp cita recomendação do ISMP e Vermont Oxford Network de 16 mcg/mL para neonatos (faixa típica de prática: 4-16 mcg/mL) - também coincide com o teto definido pelo HSL. Decisão adotada por maior consenso entre fontes de segurança. Estudo observacional citado (Neofax) atingiu até 7,1 mcg/kg/min em casos extremos - não incorporado como limite padrão. Lexicomp cita ainda dose individual máxima registrada de 10,5 mcg/kg/min (Lampin 2012) em população pediátrica geral, também não incorporada como limite.",
      "source": "NeoFax/Micromedex - Norepinephrine Drug Monograph, p.687-693; concentração ajustada conforme Lexicomp Pediatric (citando ISMP 2011 e Vermont Oxford Network) e Lexicomp Neonatal"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "doseMin": 0.05,
        "doseMax": 2.5,
        "doseInitial": "0,05-0,1 mcg/kg/min (pediatria), ajustar conforme resposta",
        "maxConcentration": { "value": 16, "unit": "mcg/ml", "population": "pediatria" },
        "notes": "HSL não define concentração-padrão de preparo, apenas concentração MÁXIMA permitida. Usado como fonte de validação/alerta.",
        "source": "Guia Farmacêutico HSL - NORADRENALINA, atualizado 16/09/2025, https://guiafarmaceutico.hsl.org.br/noradrenalina"
      }
    ],
    alerts: ['vesicant_central_access_required', 'label_confusion_hemitartarato_vs_base', 'incompatible_with_alkaline_solutions'],
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 5, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 5 (mg/ml) = ml do fármaco',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 1600, "unit": "mcg/ml" },
      "doseMin": 2,
      "doseMax": 20,
      "notes": "Concentração de 1600 mcg/mL confirmada de forma convergente por NeoFax, Lexicomp (citando ISMP e Vermont Oxford Network) e coincide com o limiar de segurança do HSL para uso periférico. Para choque refratário a volume, iniciar com dose <10 mcg/kg/min.",
      "source": "NeoFax/Micromedex - DOPamine Drug Monograph, p.305-309; Lexicomp Pediatric/Neonatal (ISMP 2011, Vermont Oxford Network)"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "doseMin": 1,
        "doseMax": 20,
        "maxConcentration": { "value": 3200, "unit": "mcg/ml" },
        "peripheralAccessThreshold": { "value": 1600, "unit": "mcg/ml", "notes": "Acesso periférico (AVP) permitido apenas até esta concentração; acima, exige CVC." },
        "notes": "HSL não define concentração-padrão de preparo isolada, mas seu limiar operacional de segurança para via periférica (1600 mcg/mL) coincide com o valor-padrão de NeoFax/Lexicomp.",
        "source": "Guia Farmacêutico HSL - DOPAMINA, atualizado 13/05/2026, https://guiafarmaceutico.hsl.org.br/dopamina"
      }
    ],
    alerts: ['vesicant_concentration_dependent_access', 'incompatible_with_alkaline_solutions', 'dose_dependent_receptor_effects'],
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 12.5, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 12,5 (mg/ml) = ml do fármaco',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 2000, "unit": "mcg/ml" },
      "doseMin": 2,
      "doseMax": 25,
      "notes": "Concentração de 2000 mcg/mL confirmada de forma convergente por NeoFax e Lexicomp (citando ISMP e Vermont Oxford Network). HSL usa limiar mais conservador (1000 mcg/mL) para permitir via periférica, mas não contradiz o valor-padrão para preparo central.",
      "source": "NeoFax/Micromedex - DOBUTamine Drug Monograph, p.300-304; Lexicomp Pediatric/Neonatal (ISMP 2011, Vermont Oxford Network)"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "doseMin": 5,
        "doseMax": 20,
        "doseMaxAbsolute": 40,
        "maxConcentration": { "value": 5000, "unit": "mcg/ml" },
        "peripheralAccessThreshold": { "value": 1000, "unit": "mcg/ml", "notes": "Acesso periférico (AVP) permitido apenas até esta concentração; acima, exige CVC." },
        "notes": "HSL não define concentração-padrão de preparo isolada, apenas teto de segurança para via periférica. Dose min/max coincide exatamente com o Guia PediDrip.",
        "source": "Guia Farmacêutico HSL - DOBUTAMINA, atualizado 24/04/2023, https://guiafarmaceutico.hsl.org.br/dobutamina"
      }
    ],
    alerts: ['vesicant_concentration_dependent_access', 'incompatible_with_alkaline_solutions', 'y_site_incompatibilities'],
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
    algorithm: 'VASOPRESSIN',
    concentration: { value: 20, unit: 'UI/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 50 },
    references: ['guide2026'],
    // Diluição padrão: 1ml (20UI) + 49ml SF = 50ml → concentração 0,4 UI/ml
    calcNote: 'Dose × Peso × 24 = UI totais → ÷ 0,4 (UI/ml) = volume para 24h → velocidade em ml/h',
    referenceOnly: [
      {
        "sourceType": "lexicomp",
        "indication": "Choque vasodilatório/séptico refratário a volume e catecolaminas exógenas (pediatria geral)",
        "doseMin": 0.01,
        "doseMax": 0.48,
        "notes": "Faixa de uso relatado retrospectivamente: 0,17-8 milliunits/kg/minute = 0,01-0,48 UI/kg/h (Brierley 2009, Choong 2008, Meyer 2008 - dosing baseado em revisões retrospectivas e relatos de caso). ALERTA DE SEGURANÇA: o único ensaio duplo-cego, randomizado, placebo-controlado (Choong 2009, n=65, 3-14 anos) testou uma faixa mais estreita - 0,5-2 milliunits/kg/minute = 0,03-0,12 UI/kg/h - e não encontrou diferença significativa no tempo até estabilidade hemodinâmica, com tendência a MAIOR mortalidade no grupo vasopressina; os autores não recomendaram uso rotineiro. DECISÃO: não foi construído motor de cálculo 'neofax' com concentração-padrão fixa para esta droga - monografia própria do NeoFax/Micromedex não foi localizada nesta consulta (documento de referência disponível foi Lexicomp Pediatric), e o próprio Lexicomp não define concentração única recomendada (apenas faixa de diluição 0,1-1 unit/mL). Demais indicações pediátricas do Lexicomp, não incorporadas ao motor de cálculo (apenas contexto): hemorragia GI 2-10 milliunits/kg/min (0,12-0,6 UI/kg/h); PCR/FV/TV refratária 0,4 UI/kg dose única (bolus, não infusão contínua); cirurgia cardíaca neonatal 0,3-0,5 milliunits/kg/min (0,018-0,03 UI/kg/h); PPHN refratária neonatal 0,1-1,2 milliunits/kg/min (0,006-0,072 UI/kg/h).",
        "preparationRange": { "value": "0,1-1", "unit": "UI/ml", "notes": "Lexicomp não recomenda concentração única fixa - diluir em NS ou D5W a uma concentração final entre 0,1 e 1 unit/mL." },
        "source": "Lexicomp Pediatric, 2021 - VASOPRESSIN Drug Monograph, Dosing (Vasodilatory shock with hypotension unresponsive to fluid resuscitation and exogenous catecholamines)"
      },
      {
        "sourceType": "hsl",
        "doseMin": 0.6,
        "doseMax": 0.6,
        "maxConcentration": { "value": 1, "unit": "UI/ml" },
        "notes": "HSL pediatria não cobre a indicação de choque vasodilatório/séptico - apenas diabetes insipidus (2,5-5U IM/SC a cada 6-8h, não é infusão contínua EV) e hemorragia GI (0,01 U/kg/min EV contínuo = 0,6 UI/kg/h, valor único que coincide exatamente com o teto do Lexicomp para essa mesma indicação). Concentração máxima de 1 UI/mL coincide com o teto da faixa de diluição do Lexicomp (0,1-1 UI/mL). Vesicante - CVC obrigatório.",
        "source": "Guia Farmacêutico HSL - VASOPRESSINA, atualizado 13/04/2026, https://guiafarmaceutico.hsl.org.br/vasopressina"
      }
    ],
    alerts: ['vesicant_central_access_required', 'mortality_signal_rct_shock_dose', 'indication_dependent_dose_range', 'no_fixed_concentration_engine'],
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 1, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 200, "unit": "mcg/ml" },
      "doseMin": 0.25,
      "doseMax": 0.75,
      "notes": "Concentração de 200 mcg/mL confirmada de forma convergente por NeoFax/Micromedex (concentração máxima para infusão; também disponível como solução pré-misturada nessa mesma concentração) e pelo Guia Farmacêutico HSL (receita de preparo '20mg para 100mL' = 200 mcg/mL, e concentração máxima declarada também 200 mcg/mL). Primeira droga com convergência exata de receita de preparo entre as duas fontes. Faixa de dose de manutenção adotada é a do HSL (pediatria geral: 0,25-0,75 mcg/kg/min, dose máxima pediátrica declarada 0,75); NeoFax cita faixa um pouco mais estreita no contexto específico de baixo débito cardíaco pós-cirurgia (0,3-0,75 mcg/kg/min por até 35h). Dose de ataque (bolus, não incorporada ao motor de infusão contínua): 50-75 mcg/kg em 15-60min (NeoFax) ou 30-60min (HSL). Indicações adicionais do NeoFax não incorporadas nesta versão: PPHN refratária 0,33-0,99 mcg/kg/min; prevenção de baixo fluxo sistêmico em prematuros <30 semanas, esquema bifásico 0,75→0,20 mcg/kg/min.",
      "source": "NeoFax/Micromedex - Milrinone Drug Monograph, p.634-639; confirmado por Guia Farmacêutico HSL - MILRINONA, atualizado 10/06/2016, https://guiafarmaceutico.hsl.org.br/milrinona"
    },
    alerts: ['incompatible_with_furosemide_bumetanide', 'incompatible_with_sodium_bicarbonate', 'thrombocytopenia_risk', 'renal_dose_adjustment_caution'],
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
    alerts: ['photoprotection', 'cyanide_toxicity_risk'],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 25, unit: 'mg/ml' },
    preparation: { diluent: 'SG 5%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 25 (mg/ml) = ml do fármaco. Diluente: SG 5%',
    referenceOnly: [
      {
        "sourceType": "lexicomp",
        "indication": "Hipertensão aguda, incluindo crise hipertensiva (pediatria)",
        "doseInitial": "0,3-0,5 mcg/kg/min, titular a cada 5 minutos até efeito desejado",
        "doseUsual": "3-4 mcg/kg/min",
        "doseMax": 10,
        "notes": "Faixa de dose (0,3-10 mcg/kg/min) confirmada de forma convergente pelo Guia PediDrip e pelo HSL - melhor convergência entre as três fontes até agora. Indicação adicional não incorporada ao motor de cálculo: manutenção de débito cardíaco pós-ressuscitação (PALS) - inicial 0,5-1 mcg/kg/min, titular a efeito, máximo 8 mcg/kg/min. DECISÃO: não foi construído motor de cálculo 'neofax' com concentração-padrão fixa - Lexicomp não recomenda valor único, apenas faixa de diluição (solução concentrada 25mg/mL diluída a 50-200 mcg/mL, preferencialmente em D5W; até 1000 mcg/mL descrito em pacientes com restrição de fluidos). Ajuste por função renal: eGFR<30 mL/min/1,73m² - limitar taxa de infusão média a <3 mcg/kg/min; pacientes anúricos - limitar a <1 mcg/kg/min (risco de acúmulo de tiocianato). Uso prolongado (>72h) - alguns especialistas recomendam monitorar níveis de cianeto/tiocianato.",
        "source": "Lexicomp Pediatric, 2021 - Nitroprusside Drug Monograph, Dosing/Preparation for Administration"
      },
      {
        "sourceType": "hsl",
        "doseInitial": "0,3-0,5 mcg/kg/min, podendo ser aumentado a cada poucos minutos até efeito desejado",
        "doseMax": 10,
        "maxConcentration": { "value": 200, "unit": "mcg/ml", "population": "pediatria (400 mcg/mL em adultos)" },
        "notes": "HSL não define concentração-padrão de preparo fixa, apenas concentração MÁXIMA permitida (200 mcg/mL pediatria) - valor que coincide com o topo da faixa típica citada pelo Lexicomp (50-200 mcg/mL). Dose min/max (0,3-10) idêntica ao Guia PediDrip e ao Lexicomp. Diluir em SG 5%, cada frasco para 250-1000mL.",
        "source": "Guia Farmacêutico HSL - NITROPRUSSIATO, atualizado 10/06/2016, https://guiafarmaceutico.hsl.org.br/nitroprussiato"
      }
    ],
    alerts: ['photoprotection', 'cyanide_toxicity_risk', 'photosensitive_protect_from_light', 'cyanide_thiocyanate_toxicity_risk', 'renal_dose_adjustment_required', 'no_fixed_concentration_engine'],
  },

  // ─── ANALGESIA ─────────────────────────────────────────────────────────────
  {
    id: 'fentanil',
    name: 'Fentanil',
    category: DRUG_CATEGORIES.ANALGESIA,
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
    algorithm: 'SEDATION_STANDARD',
    concentration: { value: 50, unit: 'mcg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 24 = mcg totais → ÷ 50 (mcg/ml) = ml do fármaco',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 10, "unit": "mcg/ml" },
      "doseMin": 1,
      "doseMax": 5,
      "notes": "Faixa de dose adotada é a de SEDAÇÃO em infusão contínua (1-5 mcg/kg/h), que coincide exatamente com o Guia PediDrip já implementado. NeoFax também descreve uma faixa distinta para ANALGESIA em infusão contínua (0,5-2 mcg/kg/h) - não incorporada nesta versão, mesma lógica de simplificação usada em outras drogas (uma faixa única por droga). Concentração de 10 mcg/mL é a recomendação PRIMÁRIA e explícita do NeoFax para infusão contínua ('further dilute in compatible solution to a concentration of 10 mcg/mL'); alternativas descritas mas não adotadas: não diluído (50 mcg/mL, = concentração da ampola) ou diluído a 2, 4, 5, 10, 25 mcg/mL. Tolerância pode se desenvolver rapidamente com infusão constante.",
      "source": "NeoFax/Micromedex - FentaNYL Drug Monograph, p.394-400"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "notes": "HSL pediatria NÃO cobre infusão contínua - apenas esquema de bólus/dose intermitente para indução e manutenção anestésica (2-12 anos: 20-30mcg a cada 10-12kg de peso corporal, EV). Natureza diferente da infusão contínua do motor de cálculo - não é comparável diretamente, mantido apenas como referência de contexto clínico. Diluir se necessário em SF 0,9% ou SG 5%. Estabilidade pós-preparo: 24h TA.",
        "source": "Guia Farmacêutico HSL - FENTANILA (INJETÁVEL), atualizado 18/01/2022, https://guiafarmaceutico.hsl.org.br/fentanila-injetavel"
      }
    ],
    alerts: ['black_box_addiction_abuse_misuse', 'black_box_respiratory_depression', 'black_box_cyp3a4_interaction', 'black_box_cns_depressant_interaction', 'chest_wall_rigidity', 'withdrawal_syndrome_prolonged_infusion', 'rapid_tolerance_development'],
  },

  // ─── SEDAÇÃO ────────────────────────────────────────────────────────────────
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
    algorithm: 'SEDATION_STANDARD',
    concentration: { value: 5, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 24 = mg → ÷ 5 (mg/ml) = ml do fármaco',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 0.5, "unit": "mg/ml" },
      "doseMin": 0.01,
      "doseMax": 0.12,
      "notes": "Faixa de dose adotada é a UNIÃO das faixas de sedação em infusão contínua do NeoFax (0,01-0,06 mg/kg/h) e do HSL para pediatria geral >6 meses (0,06-0,12 mg/kg/h, dose inicial 0,05-0,2mg/kg). HSL também define doses fixas por faixa etária neonatal: <32 semanas = 0,03mg/kg/h; ≥32 semanas até 6 meses = 0,06mg/kg/h (não incorporadas como faixa, apenas contexto). NÃO incorporada: indicação de 'componente sedativo em combinação com anestesia' do HSL (0,03-0,1mg/kg/h) - EXPLICITAMENTE não indicada para crianças nessa fonte, apenas adultos. Também não incorporada: indicação anticonvulsivante do NeoFax (manutenção 0,06-0,4mg/kg/h) - indicação clínica diferente (crise convulsiva refratária, não sedação de rotina). Concentração de 0,5 mg/mL é a recomendação PRIMÁRIA e explícita do NeoFax para infusão contínua ('for continuous IV infusion, may dilute in NS or D5W to a concentration of 0.5 mg/mL'), diferente da concentração de bólus IV (1-5mg/mL, padrão neonatal 1mg/mL, não usada aqui). HSL não converge nesse valor - cita faixa ampla e aberta para infusão (15mg em 100-1000mL = 0,015-0,15mg/mL) e, separadamente, um protocolo institucional específico para ventilação mecânica que RECOMENDA EVITAR infusão contínua, preferindo bólus repetidos (2-5mg a cada 5min); se usado, diluição sugerida 1mg/mL, dose 0,04-0,2mg/kg/h. ⚠️ KIDs List (NeoFax): evitar em neonatos de muito baixo peso (VLBW) - risco de hemorragia intraventricular grave, leucomalácia periventricular ou morte.",
      "source": "NeoFax/Micromedex - Midazolam Drug Monograph, p.629-633; faixa complementada por Guia Farmacêutico HSL - MIDAZOLAM (INJETÁVEL), atualizado 23/01/2024, https://guiafarmaceutico.hsl.org.br/midazolam-(injetavel)"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "notes": "Tabela de dose HSL organizada por faixa etária/indicação, incorporada parcialmente ao protocolo neofax acima (ver notas). Protocolo institucional 'Qualidoc' para pacientes em ventilação mecânica recomenda EVITAR infusão contínua de midazolam, preferindo bólus de 2-5mg a cada 5min até controle da agitação; caso infusão seja a única opção, diluir 250mg em SG5% qsp 250mL (1mg/mL), mantendo a menor dose possível entre 0,04-0,2mg/kg/h.",
        "source": "Guia Farmacêutico HSL - MIDAZOLAM (INJETÁVEL), atualizado 23/01/2024, https://guiafarmaceutico.hsl.org.br/midazolam-(injetavel)"
      }
    ],
    alerts: ['black_box_respiratory_depression', 'black_box_opioid_concomitant_use', 'vlbw_neonate_avoid_kids_list', 'no_rapid_iv_push_in_neonates', 'benzyl_alcohol_gasping_syndrome_risk', 'withdrawal_syndrome_prolonged_infusion', 'rapid_tolerance_development'],
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 50, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 50 (mg/ml) = ml do fármaco',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 1, "unit": "mg/ml" },
      "doseMin": 5,
      "doseMax": 20,
      "notes": "ATENÇÃO NA FONTE: não há monografia própria do NeoFax/Micromedex para cetamina (droga não localizada nessa base) - dados desta faixa são do LEXICOMP Pediatric (seção 'Sedação/analgesia, pacientes críticos'), mantido na chave 'neofax' apenas por consistência estrutural do schema, mas a fonte real está identificada no campo 'source' abaixo. CONVERGÊNCIA FORTE com HSL, tanto em dose quanto em concentração (padrão semelhante ao caso da milrinona): Lexicomp - dose inicial IV 0,5-2mg/kg, então infusão contínua 5-20 mcg/kg/minuto (0,3-1,2 mg/kg/hora), iniciar na dosagem mais baixa e titular a efeito; HSL - infusão contínua pediátrica 5-20mcg/kg/min (dose máxima declarada: 20). Concentração: Lexicomp - diluir frascos de 50/100mg/mL em D5W ou NS para concentração final de 1mg/mL; em pacientes com restrição de fluidos, 2mg/mL pode ser usada; HSL - preparo '10mL (500mg) para 500mL' = 1mg/mL, concentração máxima declarada 2mg/mL (idêntico ao Lexicomp). Por decisão do usuário, adotado 1mg/mL como concentração-padrão. ⚠️ DIVERGÊNCIA COM O GUIA: o teto atual do Guia PediDrip (60mcg/kg/min) é MUITO mais alto que a faixa padrão convergente (5-20) - esse valor de 60 aparece nas duas fontes apenas como dose EXTREMA e não-padrão, relatada em caso isolado de broncoespasmo refratário (Youssef Ahmed 1996, citado pelo Lexicomp) - não é a faixa usual de sedação/analgesia contínua. Guia não alterado, apenas registrada a divergência.",
      "source": "Lexicomp Pediatric, 2021 - Ketamine Drug Monograph, Dosing (Sedation/analgesia, critically ill patients); confirmado por Guia Farmacêutico HSL - ESCETAMINA/CETAMINA, atualizado 17/01/2025, https://guiafarmaceutico.hsl.org.br/cetamina"
    },
    alerts: ['incompatible_with_barbiturates', 'potentiated_by_diazepam', 'neonatal_use_expert_caution', 'non_standard_extreme_dose_case_report_only'],
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
    alerts: ['no_loading_dose'],
    algorithm: 'DEXMEDETOMIDINE',
    concentration: { value: 100, unit: 'mcg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 50 },
    references: ['guide2026'],
    // Diluição padrão fixa: 2ml (200mcg) + 48ml SF = 50ml → 4 mcg/ml
    calcNote: 'Diluição padrão: 2 ml (200 mcg) + 48 ml SF 0,9% = 50 ml (4 mcg/ml). Velocidade = Dose × Peso ÷ 4 = ml/h',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 4, "unit": "mcg/ml" },
      "doseMin": 0.2,
      "doseMax": 0.5,
      "notes": "ATENÇÃO NA FONTE: não há monografia própria do NeoFax/Micromedex para dexmedetomidina - droga não localizada nessa base. Dados desta faixa são do LEXICOMP Pediatric/Neonatal, mantidos na chave 'neofax' apenas por consistência estrutural do schema (fonte real identificada no campo 'source'). CONVERGÊNCIA PERFEITA de concentração entre Lexicomp e HSL - receita de diluição idêntica, palavra por palavra: diluir 200mcg (2mL) em 48mL SF 0,9% para concentração final de 4mcg/mL; HSL inclusive comercializa bolsa pronta ('Dex Bolsa') nessa exata concentração. Dose adotada (0,2-0,5 mcg/kg/h) é a dose INICIAL de manutenção para lactentes/crianças/adolescentes em sedação de UTI, idêntica em ambas as fontes (Lexicomp: 'Maintenance dose: Continuous IV infusion: Initial 0.2 to 0.5 mcg/kg/hour'; HSL: 'Dose de manutenção: inicialmente 0,2 a 0,5 mcg/kg/h'). NÃO incorporadas nesta versão: (a) faixa usual relatada mais ampla do Lexicomp após titulação (0,4-0,7 mcg/kg/h, dose máxima 2,5mcg/kg/h); (b) faixas específicas para neonatos - Lexicomp inicial 0,1-0,3 (faixa relatada 0,2-0,6, máx 2,5mcg/kg/h), HSL inicial 0,1-0,3 (máximo declarado 1,5mcg/kg/h); (c) indicações de sedação para procedimentos não-invasivos (ataque 0,5-2mcg/kg/dose, manutenção 0,5-1mcg/kg/h) e pré-anestésico intranasal (1-2mcg/kg dose única). Segurança e eficácia em pacientes pediátricos <18 anos não formalmente estabelecidas pelo fabricante - uso amplamente descrito na literatura (off-label), mas com dados limitados.",
      "source": "Lexicomp Pediatric/Neonatal, 2021 - Dexmedetomidine Drug Monograph, Dosing (ICU sedation); confirmado por Guia Farmacêutico HSL - DEXMEDETOMIDINA, atualizado 27/01/2026, https://guiafarmaceutico.hsl.org.br/dexmedetomidina"
    },
    alerts: ['no_loading_dose', 'bradycardia_hypotension_sinus_arrest', 'transient_hypertension_loading_dose', 'pediatric_safety_not_formally_established', 'tolerance_withdrawal_prolonged_use'],
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
    alerts: ['mandatory_sedation', 'no_sedative_effect'],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 10, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    references: ['guide2026'],
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 10 (mg/ml) = ml do fármaco',
    neofaxProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 10, "unit": "mg/ml" },
      "doseMin": 7,
      "doseMax": 12,
      "notes": "Faixa de dose adotada é a faixa completa do Lexicomp Pediatric para manutenção de relaxamento muscular em infusão contínua (7-12 mcg/kg/min = 0,42-0,72 mg/kg/h), que engloba a faixa mais estreita do NeoFax neonatal (7-10 mcg/kg/min - menor exigência de dose em neonatos) e a faixa do HSL (8-12 mcg/kg/min em UTI, ou 10-12 mcg/kg/min para manutenção de IOT, dados extrapolados de adultos - HSL declara doses pediátricas 'similares às dos adultos'). Teto de 12 mcg/kg/min convergente nas três fontes, idêntico ao já usado no Guia PediDrip; o Lexicomp recomenda usar a extremidade inferior da faixa para lactentes e a superior para crianças >2 a ≤11 anos (doses mais altas relatadas em infusões prolongadas). CONCENTRAÇÃO: por decisão do usuário, adotado o 'Padrão HSL' - infusão contínua SEM diluição, na concentração da própria ampola (10mg/mL; HSL descreve preparo de 1000mg/100mL ou 500mg/50mL, ambos equivalentes a 10mg/mL). Isso difere da abordagem do NeoFax (concentração até 5mg/mL como teto para infusão contínua, com exemplo de preparo a 1mg/mL) e do Lexicomp (faixa de diluição 0,5-5mg/mL) - nenhuma das duas fontes recomenda usar sem diluir. Divergência de abordagem registrada; decisão institucional do usuário foi seguir a prática do HSL. Bólus de intubação (dose inicial, não faz parte do motor de infusão contínua): 0,45-0,6mg/kg (NeoFax/Lexicomp/HSL convergentes); doses de manutenção intermitente em bólus: 0,075-0,15mg/kg conforme monitorização com estimulador de nervo periférico.",
      "source": "NeoFax/Micromedex - Rocuronium Drug Monograph, p.828-831; Lexicomp Pediatric, 2021 - Rocuronium Drug Monograph, Dosing; confirmado por Guia Farmacêutico HSL - ROCURÔNIO, atualizado 30/11/2023, https://guiafarmaceutico.hsl.org.br/rocuronio"
    },
    alerts: ['mandatory_sedation', 'no_sedative_effect', 'paralysis_without_sedation_analgesia_risk', 'malignant_hyperthermia_risk', 'anaphylaxis_cross_reactivity_risk', 'incompatible_with_alkaline_solutions', 'qtc_prolongation_with_general_anesthetics', 'myopathy_risk_prolonged_icu_use', 'tolerance_development_chronic_icu_use', 'not_for_rapid_sequence_lack_of_studies_not_inefficacy'],
  },
];

// ─── FÓRMULAS DE CÁLCULO ──────────────────────────────────────────────────────
function round(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

const DILUENT_FULL_NAMES = {
  'SF 0,9%': 'Soro Fisiológico 0,9%',
  'SG 5%': 'Soro Glicosado 5%',
};

function diluentFullName(diluentName) {
  return DILUENT_FULL_NAMES[diluentName] || diluentName;
}

export function calculateDrug(drug, weightKg, dose, totalVolumeMl = 24) {
  const volDecimals = SETTINGS.rounding.volume_ml;
  const rateDecimals = SETTINGS.rounding.rate_ml_h;
  const diluentName = drug.preparation.diluent;

  let drugVolumeMl = 0;
  let infusionRateMlH = 0;
  let equivalenceStr = '';
  let diluentVolumeMl = 0;

  switch (drug.algorithm) {
    case 'VASOACTIVE_STANDARD': {
      // volume_farmaco = (dose × peso × 1,44) ÷ concentração
      drugVolumeMl = (dose * weightKg * 1.44) / drug.concentration.value;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${round(infusionRateMlH, rateDecimals)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'SEDATION_STANDARD': {
      // volume_farmaco = (dose × peso × 24) ÷ concentração
      drugVolumeMl = (dose * weightKg * 24) / drug.concentration.value;
      infusionRateMlH = totalVolumeMl / 24;
      equivalenceStr = `${round(infusionRateMlH, rateDecimals)} ml/h = ${dose} ${drug.doseUnit}`;
      break;
    }
    case 'VASOPRESSIN': {
      // Diluição padrão: 1ml (20UI) + 49ml SF = 50ml → concentração 0,4 UI/ml
      const totalUI = dose * weightKg * 24;
      const totalVolForDrug = totalUI / 0.4;
      infusionRateMlH = totalVolForDrug / 24;
      equivalenceStr = `${round(infusionRateMlH, rateDecimals)} ml/h = ${dose} UI/kg/h`;
      return {
        drugVolumeMl: 1,
        diluentVolumeMl: 49,
        totalVolumeMl: 50,
        infusionRateMlH: round(infusionRateMlH, rateDecimals),
        equivalenceStr,
        prescriptionLines: [
          `${drug.name} (${drug.presentation}) --------- 1 ml (20 UI)`,
          `${diluentFullName(diluentName)} --------------- 49 ml`,
          `Infundir ${round(infusionRateMlH, rateDecimals)} ml/h, EV, em bomba de infusão contínua (BIC)`,
          `Nesta solução: ${round(infusionRateMlH, rateDecimals)} ml/h = ${dose} UI/kg/h`,
        ],
      };
    }
    case 'DEXMEDETOMIDINE': {
      // Solução padrão fixa: 2ml fármaco + 48ml SF = 50ml (4 mcg/ml)
      infusionRateMlH = (dose * weightKg) / 4;
      return {
        drugVolumeMl: 2,
        diluentVolumeMl: 48,
        totalVolumeMl: 50,
        infusionRateMlH: round(infusionRateMlH, rateDecimals),
        equivalenceStr: `${round(infusionRateMlH, rateDecimals)} ml/h = ${dose} ${drug.doseUnit}`,
        prescriptionLines: [
          `${drug.name} (${drug.presentation}) ---- 2 ml (200 mcg)`,
          `${diluentFullName(diluentName)} ------------ 48 ml`,
          `Infundir ${round(infusionRateMlH, rateDecimals)} ml/h, EV, em bomba de infusão contínua (BIC)`,
          `Nesta solução: ${round(infusionRateMlH, rateDecimals)} ml/h = ${dose} mcg/kg/h`,
        ],
      };
    }
    default:
      break;
  }

  const drugVolumeRounded = round(drugVolumeMl, volDecimals);
  diluentVolumeMl = totalVolumeMl - drugVolumeRounded;

  const prescriptionLines = [
    `${drug.name} (${drug.presentation}) ----------- ${drugVolumeRounded} ml`,
    `${diluentFullName(diluentName)} ---------- ${diluentVolumeMl.toFixed(volDecimals)} ml`,
    `Infundir ${infusionRateMlH.toFixed(rateDecimals)} ml/h, EV, em bomba de infusão contínua (BIC)`,
    `Nesta solução: ${equivalenceStr}`,
  ];

  return {
    drugVolumeMl: drugVolumeRounded,
    diluentVolumeMl: round(diluentVolumeMl, volDecimals),
    totalVolumeMl,
    infusionRateMlH: round(infusionRateMlH, rateDecimals),
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