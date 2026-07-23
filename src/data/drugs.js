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
    doseMin: 0.1,
    doseMax: 1,
    doseStep: 0.01,
    doseDefault: 0.1,
    adverseEffects: ['Arritmias', 'Hipertensão', 'Isquemia miocárdica', 'Tremores, ansiedade, hiperglicemia'],
    specialConsiderations: [
      'Preferência por acesso venoso central',
      'Em uso periférico: monitorar rigorosamente para evitar necrose',
      'Monitorar FC, PA, ECG e perfusão periférica continuamente',
    ],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 1, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 10, "unit": "mcg/ml" },
      "doseMin": 0.1,
      "doseMax": 1,
      "notes": "Concentração 10 mcg/mL: recomendação NeoFax para neonatos, confirmada por Lexicomp (ISMP/Vermont Oxford Network). Dose 0,1-1 mcg/kg/min: ressuscitação/bradicardia grave (NeoFax) e choque/hipotensão fluido-resistente (Lexicomp). Teto de concentração 64 mcg/mL confirmado por HSL e Lexicomp. NeoFax também descreve doses mais baixas (low-dose 0,01-0,2; choque séptico 0,05-0,3), não incorporadas.",
      "source": "NeoFax/Micromedex - EPINEPHrine Drug Monograph, DOSING/ADMINISTRATION, p.340-344; confirmado por Lexicomp Pediatric, 2021, p.831-833 (indicação Hypotension/shock, fluid-resistant)"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "doseMin": 0.1,
        "doseMax": 1,
        "maxConcentration": { "value": 64, "unit": "mcg/ml", "population": "pediatria" },
        "notes": "HSL não define concentração-padrão de preparo, apenas concentração MÁXIMA permitida na diluição. Usado como fonte de validação/alerta, não como motor de cálculo independente.",
        "source": "Guia Farmacêutico HSL - EPINEFRINA, atualizado 13/04/2026, https://guiafarmaceutico.hsl.org.br/epinefrina"
      },
      {
        "sourceType": "lexicomp",
        "indication": "Hypotension/shock, fluid-resistant (Infants, Children, and Adolescents)",
        "doseMin": 0.1,
        "doseMax": 1,
        "maxConcentration": { "value": 64, "unit": "mcg/ml" },
        "notes": "Confirma de forma independente a dose (0,1-1 mcg/kg/min) e a concentração máxima (64 mcg/mL) já registradas via NeoFax/HSL. Concentração-padrão de 10 mcg/mL para neonatos citada como recomendação ISMP/Vermont Oxford Network, mesma dupla de fontes que confirmou a concentração-padrão de outras drogas do PediDrip (dopamina, dobutamina, noradrenalina).",
        "source": "Lexicomp Pediatric, 2021, p.831-833"
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
    doseMin: 0.2,
    doseMax: 2,
    doseStep: 0.01,
    doseDefault: 0.2,
    adverseEffects: ['Hipertensão', 'Isquemia periférica', 'Taquicardia, arritmias (efeito β1 leve)'],
    specialConsiderations: [
      'Preferência por acesso venoso central',
      'Se acesso periférico: usar veia calibrosa e monitorar local de infusão',
      'Monitorar extremidades para sinais de isquemia',
      'Garantir reposição volêmica adequada antes do início',
    ],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 1, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 16, "unit": "mcg/ml" },
      "doseMin": 0.2,
      "doseMax": 2,
      "notes": "Concentração ajustada de 100 para 16 mcg/mL: NeoFax citava 100, mas Lexicomp (ISMP/Vermont Oxford Network) recomenda 16 mcg/mL para neonatos - coincide com o teto do HSL. Dose inicial 0,2-0,5 mcg/kg/min, titular a cada 30 min.",
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 5, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 5 (mg/ml) = ml do fármaco',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 1600, "unit": "mcg/ml" },
      "doseMin": 2,
      "doseMax": 20,
      "notes": "Concentração 1600 mcg/mL confirmada por NeoFax, Lexicomp (ISMP/Vermont Oxford Network) e limiar de segurança do HSL. Para choque refratário a volume, iniciar com dose <10 mcg/kg/min.",
      "source": "NeoFax/Micromedex - DOPamine Drug Monograph, p.305-309; Lexicomp Pediatric/Neonatal (ISMP 2011, Vermont Oxford Network)"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "doseMin": 1,
        "doseMax": 20,
        "maxConcentration": { "value": 3200, "unit": "mcg/ml" },
        "peripheralAccessThreshold": { "value": 1600, "unit": "mcg/ml", "notes": "Acesso periférico (AVP) permitido apenas até esta concentração; acima, exige CVC." },
        "notes": "Limiar de segurança para via periférica (1600 mcg/mL) coincide com o valor-padrão de NeoFax/Lexicomp.",
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
    doseMin: 2,
    doseMax: 25,
    doseStep: 0.5,
    doseDefault: 10,
    adverseEffects: ['Taquicardia', 'Arritmias', 'Hipotensão (efeito vasodilatador)', 'Dor torácica em pacientes suscetíveis'],
    specialConsiderations: [
      'Uso preferencial em pacientes com disfunção de bomba (coração)',
      'Cuidado em hipotensão grave — pode ser necessário associar vasopressor',
      'Monitorar FC, PA e sinais de perfusão',
      'Pode ser usada em acesso periférico de curto prazo; preferir acesso central',
    ],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 12.5, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 12,5 (mg/ml) = ml do fármaco',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 2000, "unit": "mcg/ml" },
      "doseMin": 2,
      "doseMax": 25,
      "notes": "Concentração 2000 mcg/mL confirmada por NeoFax e Lexicomp (ISMP/Vermont Oxford Network). HSL usa limiar mais conservador (1000 mcg/mL) para via periférica, sem contradizer o padrão central.",
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
    algorithm: 'VASOPRESSIN',
    concentration: { value: 20, unit: 'UI/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 50 },
    // Diluição padrão: 1ml (20UI) + 49ml SF = 50ml → concentração 0,4 UI/ml
    calcNote: 'Dose × Peso × 24 = UI totais → ÷ 0,4 (UI/ml) = volume para 24h → velocidade em ml/h',
    referenceOnly: [
      {
        "sourceType": "lexicomp",
        "indication": "Choque vasodilatório/séptico refratário a volume e catecolaminas exógenas (pediatria geral)",
        "doseMin": 0.01,
        "doseMax": 0.48,
        "notes": "Faixa de uso retrospectivo: 0,01-0,48 UI/kg/h (Brierley 2009, Choong 2008, Meyer 2008). ALERTA: o único RCT duplo-cego (Choong 2009, n=65) testou 0,03-0,12 UI/kg/h e mostrou tendência a MAIOR mortalidade no grupo vasopressina, sem benefício - autores não recomendaram uso rotineiro. Sem Protocolo Padrão: nenhuma fonte define concentração única (Lexicomp só dá faixa de diluição 0,1-1 UI/mL).",
        "preparationRange": { "value": "0,1-1", "unit": "UI/ml", "notes": "Lexicomp não recomenda concentração única fixa - diluir em NS ou D5W a uma concentração final entre 0,1 e 1 unit/mL." },
        "source": "Lexicomp Pediatric, 2021 - VASOPRESSIN Drug Monograph, Dosing (Vasodilatory shock with hypotension unresponsive to fluid resuscitation and exogenous catecholamines)"
      },
      {
        "sourceType": "hsl",
        "doseMin": 0.6,
        "doseMax": 0.6,
        "maxConcentration": { "value": 1, "unit": "UI/ml" },
        "notes": "HSL não cobre choque vasodilatório/séptico - só diabetes insipidus e hemorragia GI (0,6 UI/kg/h, coincide com o teto do Lexicomp para essa indicação). Concentração máxima 1 UI/mL coincide com o teto de diluição do Lexicomp. Vesicante - CVC obrigatório.",
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
    doseMin: 0.25,
    doseMax: 0.75,
    doseStep: 0.05,
    doseDefault: 0.5,
    adverseEffects: ['Hipotensão (efeito vasodilatador)', 'Arritmias ventriculares ou supraventriculares', 'Trombocitopenia (menos comum)'],
    specialConsiderations: [
      'Evitar em pacientes com hipotensão não controlada',
      'Ajuste de dose em insuficiência renal (eliminação renal)',
      'Uso exclusivo com bomba de infusão para controle preciso',
      'Monitorar pressão arterial de forma contínua',
    ],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 1, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = ml do fármaco para 24h a 1 ml/h',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 200, "unit": "mcg/ml" },
      "doseMin": 0.25,
      "doseMax": 0.75,
      "notes": "Concentração 200 mcg/mL: convergência tripla entre NeoFax, HSL (receita '20mg/100mL') e Lexicomp ('usual concentration ≤200 mcg/mL'). Dose 0,25-0,75 mcg/kg/min: adotada do HSL, confirmada pelo RCT Hoffman 2003 (braços de baixa/alta dose exatamente 0,25 e 0,75). NeoFax cita faixa um pouco mais estreita (0,3-0,75) no contexto pós-cirurgia cardíaca.",
      "source": "NeoFax/Micromedex - Milrinone Drug Monograph, p.634-639; confirmado por Guia Farmacêutico HSL - MILRINONA, atualizado 10/06/2016, https://guiafarmaceutico.hsl.org.br/milrinona; confirmado por Lexicomp Pediatric/Neonatal, 2021, p.1506-1507"
    },
    referenceOnly: [
      {
        "sourceType": "lexicomp",
        "indication": "Hemodynamic support / prevenção de LCOS pós-cirurgia cardíaca (neonatal e pediátrica)",
        "doseMin": 0.25,
        "doseMax": 0.75,
        "maxConcentration": { "value": 200, "unit": "mcg/ml" },
        "notes": "Confirma dose (0,25-0,75, via RCT Hoffman 2003) e concentração (≤200 mcg/mL). Cita PPHN como indicação separada (0,3-0,5, máx 1 mcg/kg/min) - não incorporada.",
        "source": "Lexicomp Pediatric/Neonatal, 2021, p.1506-1507"
      }
    ],
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 25, unit: 'mg/ml' },
    preparation: { diluent: 'SG 5%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 25 (mg/ml) = ml do fármaco. Diluente: SG 5%',
    referenceOnly: [
      {
        "sourceType": "lexicomp",
        "indication": "Hipertensão aguda, incluindo crise hipertensiva (pediatria)",
        "doseInitial": "0,3-0,5 mcg/kg/min, titular a cada 5 minutos até efeito desejado",
        "doseUsual": "3-4 mcg/kg/min",
        "doseMax": 10,
        "notes": "Faixa 0,3-10 mcg/kg/min confirmada por Guia, HSL e Lexicomp. Sem Protocolo Padrão: Lexicomp não recomenda concentração única, só faixa de diluição (50-200 mcg/mL). Ajuste renal: eGFR<30 - limitar a <3 mcg/kg/min; anúricos - <1 mcg/kg/min (risco de acúmulo de tiocianato).",
        "source": "Lexicomp Pediatric, 2021 - Nitroprusside Drug Monograph, Dosing/Preparation for Administration"
      },
      {
        "sourceType": "hsl",
        "doseInitial": "0,3-0,5 mcg/kg/min, podendo ser aumentado a cada poucos minutos até efeito desejado",
        "doseMax": 10,
        "maxConcentration": { "value": 200, "unit": "mcg/ml", "population": "pediatria (400 mcg/mL em adultos)" },
        "notes": "Concentração máxima 200 mcg/mL (pediatria), coincide com o topo da faixa do Lexicomp. Dose 0,3-10 idêntica ao Guia e ao Lexicomp. Diluir em SG 5%.",
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
    algorithm: 'SEDATION_STANDARD',
    concentration: { value: 50, unit: 'mcg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 24 = mcg totais → ÷ 50 (mcg/ml) = ml do fármaco',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 10, "unit": "mcg/ml" },
      "doseMin": 1,
      "doseMax": 5,
      "notes": "Faixa de SEDAÇÃO em infusão contínua (1-5 mcg/kg/h), idêntica ao Guia. NeoFax também descreve ANALGESIA (0,5-2 mcg/kg/h), não incorporada. Concentração 10 mcg/mL: recomendação primária do NeoFax, confirmada por Lexicomp (ISMP/Vermont Oxford Network). Lexicomp sugere 1-3 como faixa usual em crianças, com 5 reservado a casos que exigem taxa mais alta - mantida a faixa 1-5 por decisão do usuário.",
      "source": "NeoFax/Micromedex - FentaNYL Drug Monograph, p.394-400; concentração confirmada por Lexicomp Pediatric/Neonatal, 2021, p.932-939"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "notes": "HSL pediatria não cobre infusão contínua - só bólus intermitente (2-12 anos: 20-30mcg a cada 10-12kg). Não comparável diretamente, mantido como contexto.",
        "source": "Guia Farmacêutico HSL - FENTANILA (INJETÁVEL), atualizado 18/01/2022, https://guiafarmaceutico.hsl.org.br/fentanila-injetavel"
      },
      {
        "sourceType": "lexicomp",
        "indication": "Sedação/analgesia contínua, várias faixas etárias (ver notas do standardProtocol para detalhamento completo)",
        "notes": "Confirma concentração-padrão (10 mcg/mL) via ISMP/Vermont Oxford Network. Sugere 1-3 mcg/kg/h como faixa usual, com 5 reservado a casos que exigem taxa mais alta - faixa adotada (1-5) não alterada.",
        "source": "Lexicomp Pediatric/Neonatal, 2021, p.932-939"
      }
    ],
    alerts: ['black_box_respiratory_depression', 'black_box_cyp3a4_interaction', 'black_box_cns_depressant_interaction', 'chest_wall_rigidity', 'withdrawal_syndrome_prolonged_infusion', 'rapid_tolerance_development'],
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
    doseMin: 0.01,
    doseMax: 0.12,
    doseStep: 0.01,
    doseDefault: 0.1,
    adverseEffects: ['Depressão respiratória', 'Hipotensão', 'Bradicardia', 'Sedação excessiva'],
    specialConsiderations: [
      'Monitorar continuamente nível de sedação, oximetria e sinais vitais',
      'Acúmulo em infusões prolongadas com disfunção hepática',
      'Fazer desmame gradual para evitar abstinência',
    ],
    algorithm: 'SEDATION_STANDARD',
    concentration: { value: 5, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 24 = mg → ÷ 5 (mg/ml) = ml do fármaco',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 0.5, "unit": "mg/ml" },
      "doseMin": 0.01,
      "doseMax": 0.12,
      "notes": "Faixa (0,01-0,12 mg/kg/h) é a união de NeoFax (0,01-0,06) e HSL >6 meses (0,06-0,12). Não incorporadas: indicação 'sedativo em anestesia' do HSL (só p/ adultos) e indicação anticonvulsivante do NeoFax/Lexicomp (0,06-0,4). Concentração 0,5 mg/mL: recomendação primária do NeoFax, confirmada pelo fabricante e ISMP/Vermont Oxford Network via Lexicomp - teto 0,12 bate nas três fontes. ⚠️ KIDs List: evitar em neonatos de muito baixo peso - risco de HIV grave/leucomalácia/morte. HSL recomenda EVITAR infusão contínua em ventilação mecânica, preferindo bólus.",
      "source": "NeoFax/Micromedex - Midazolam Drug Monograph, p.629-633; faixa complementada por Guia Farmacêutico HSL - MIDAZOLAM (INJETÁVEL), atualizado 23/01/2024, https://guiafarmaceutico.hsl.org.br/midazolam-(injetavel); confirmado por Lexicomp Pediatric/Neonatal, 2021, p.1502-1504"
    },
    referenceOnly: [
      {
        "sourceType": "hsl",
        "notes": "Protocolo institucional 'Qualidoc' recomenda EVITAR infusão contínua em ventilação mecânica, preferindo bólus de 2-5mg a cada 5min; se infusão for necessária, diluir a 1mg/mL, dose 0,04-0,2mg/kg/h.",
        "source": "Guia Farmacêutico HSL - MIDAZOLAM (INJETÁVEL), atualizado 23/01/2024, https://guiafarmaceutico.hsl.org.br/midazolam-(injetavel)"
      },
      {
        "sourceType": "lexicomp",
        "indication": "Sedação em UTI, ventilação mecânica (neonatal e pediátrica >6 meses)",
        "doseMin": 0.015,
        "doseMax": 0.12,
        "maxConcentration": { "value": 0.5, "unit": "mg/ml" },
        "notes": "Confirma concentração-padrão (0,5 mg/mL, fabricante + ISMP/Vermont Oxford Network) e teto de dose (0,12 mg/kg/h). Faixa neonatal (0,015-0,06 mg/kg/h) mais baixa - não incorporada. Confirma indicação anticonvulsivante (0,06-0,4) já excluída.",
        "source": "Lexicomp Pediatric/Neonatal, 2021, p.1502-1504"
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
    doseMin: 5,
    doseMax: 20,
    doseStep: 1,
    doseDefault: 20,
    adverseEffects: ['Aumento de PA e FC', 'Hipersalivação', 'Alucinações ou agitação (especialmente no despertar)', 'Náuseas e vômitos'],
    specialConsiderations: [
      'Excelente opção em instabilidade hemodinâmica',
      'Usar com cautela em hipertensão intracraniana ou glaucoma',
      'Pode ser associada ao midazolam para reduzir efeitos psíquicos',
      'Monitorização rigorosa da via aérea e nível de sedação',
    ],
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 50, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 50 (mg/ml) = ml do fármaco',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 1, "unit": "mg/ml" },
      "doseMin": 5,
      "doseMax": 20,
      "notes": "SEM MONOGRAFIA NEOFAX - dados são do LEXICOMP (fonte real em 'source'). Convergência forte com HSL em dose (5-20 mcg/kg/min) e concentração (1mg/mL, ambas as fontes). ⚠️ O teto do Guia (60 mcg/kg/min) é bem mais alto que a faixa padrão (5-20) - 60 aparece nas fontes só como dose extrema de caso isolado (broncoespasmo refratário), não é faixa usual. Guia não alterado.",
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
    doseMax: 0.5,
    doseStep: 0.1,
    doseDefault: 0.4,
    adverseEffects: ['Bradicardia', 'Hipotensão (especialmente em doses altas ou infusão rápida)', 'Boca seca', 'Náuseas (menos comum)'],
    specialConsiderations: [
      '⚠ Evitar dose de ataque em crianças (risco de bradicardia e hipotensão)',
      'Raramente causa depressão respiratória — vantagem sobre midazolam',
      'Monitorar FC e PA continuamente',
      'Evitar em bradicardia importante ou bloqueios AV grau 2 ou 3',
      'Boa opção para sedação leve a moderada em UTI pediátrica',
    ],
    algorithm: 'DEXMEDETOMIDINE',
    concentration: { value: 100, unit: 'mcg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 50 },
    // Diluição padrão fixa: 2ml (200mcg) + 48ml SF = 50ml → 4 mcg/ml
    calcNote: 'Diluição padrão: 2 ml (200 mcg) + 48 ml SF 0,9% = 50 ml (4 mcg/ml). Velocidade = Dose × Peso ÷ 4 = ml/h',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 4, "unit": "mcg/ml" },
      "doseMin": 0.2,
      "doseMax": 0.5,
      "notes": "SEM MONOGRAFIA NEOFAX - dados são do LEXICOMP (fonte real em 'source'). Convergência perfeita de concentração com HSL: receita idêntica (200mcg/2mL em 48mL SF = 4mcg/mL); HSL vende bolsa pronta nessa concentração. Dose (0,2-0,5 mcg/kg/h) é a dose inicial de manutenção, idêntica nas duas fontes. Não incorporadas: faixa mais ampla pós-titulação (0,4-0,7), faixas neonatais, e indicações de procedimento não-invasivo/intranasal.",
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
    doseMin: 7,
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
    algorithm: 'VASOACTIVE_STANDARD',
    concentration: { value: 10, unit: 'mg/ml' },
    preparation: { diluent: 'SF 0,9%', finalVolume: 24 },
    calcNote: 'Dose × Peso × 1,44 = mg → ÷ 10 (mg/ml) = ml do fármaco',
    standardProtocol: {
      "type": "standard_concentration",
      "standardConcentration": { "value": 10, "unit": "mg/ml" },
      "doseMin": 7,
      "doseMax": 12,
      "notes": "Faixa 7-12 mcg/kg/min (Lexicomp) engloba NeoFax neonatal (7-10) e HSL (8-12). Teto 12 convergente nas três fontes, idêntico ao Guia. CONCENTRAÇÃO: por decisão do usuário, adotado 'Padrão HSL' - infusão SEM diluir (10mg/mL, igual à ampola); NeoFax e Lexicomp recomendam diluir (teto 5mg/mL e faixa 0,5-5mg/mL, respectivamente) - divergência de abordagem institucional, decisão de seguir a prática do HSL.",
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
  { name: 'Adrenalina', presentation: '1 mg/ml', mechanism: 'Agonista α e β. Dose-dependente: β em baixas, α em altas', dose: '0,1–1 mcg/kg/min', indications: 'Parada cardíaca, choque séptico, anafilaxia, edema de glote', adverseEffects: 'Arritmias, hipertensão, isquemia miocárdica' },
  { name: 'Noradrenalina', presentation: '1 mg/ml', mechanism: 'Agonista α1 (vasoconstrição), β1 discreto', dose: '0,2–2 mcg/kg/min', indications: 'Choque séptico, distributivo, hipotensão refratária', adverseEffects: 'Isquemia periférica, hipertensão, arritmias' },
  { name: 'Dopamina', presentation: '5 mg/ml', mechanism: 'Dose-dependente: D1 (renal) → β1 (inotrópico) → α1 (vasoconstrição)', dose: '2–20 mcg/kg/min', indications: 'Choque séptico, cardiogênico, suporte inotrópico', adverseEffects: 'Taquicardia, arritmias, náuseas, vasoconstrição excessiva' },
  { name: 'Dobutamina', presentation: '12,5 mg/ml', mechanism: 'Agonista β1 (inotrópico) com leve β2 (vasodilatação)', dose: '2–25 mcg/kg/min', indications: 'Choque cardiogênico, disfunção miocárdica em sepse, IC baixo débito', adverseEffects: 'Hipotensão, arritmias, taquicardia' },
  { name: 'Vasopressina', presentation: '20 UI/ml', mechanism: 'Agonista V1 (vasoconstrição) e V2 (reabsorção de água)', dose: '0,01–0,6 UI/kg/h', indications: 'Choque refratário à noradrenalina, anafilaxia grave, pós-cirúrgico', adverseEffects: 'Isquemia, bradicardia, hiponatremia' },
  { name: 'Milrinona', presentation: '1 mg/ml', mechanism: 'Inibe fosfodiesterase III (↑AMPc), inotrópico + vasodilatador', dose: '0,25–0,75 mcg/kg/min', indications: 'Choque cardiogênico, hipertensão pulmonar, disfunção ventricular', adverseEffects: 'Hipotensão, arritmias, trombocitopenia' },
  { name: 'Nitroprussiato', presentation: '25 mg/ml', mechanism: 'Libera NO (vasodilatação arterial + venosa), reduz pré e pós-carga', dose: '0,3–10 mcg/kg/min', indications: 'Crise hipertensiva, IC pós-carga elevada, controle hemodinâmico cirúrgico', adverseEffects: 'Hipotensão severa, toxicidade por cianeto, náuseas, confusão' },
];

export const sedativeComparativeData = [
  { name: 'Fentanil', presentation: '50 mcg/ml', mechanism: 'Agonista μ-opioide. Analgesia intensa e sedação', dose: '1–5 mcg/kg/h', indications: 'Dor aguda intensa, sedação em VM, procedimentos invasivos', adverseEffects: 'Depressão respiratória, bradicardia, rigidez muscular, constipação' },
  { name: 'Midazolam', presentation: '5 mg/ml', mechanism: 'Agonista GABA-A. Sedação, amnésia, relaxamento muscular', dose: '0,01–0,12 mg/kg/h', indications: 'Sedação em VM, agitação psicomotora, procedimentos', adverseEffects: 'Depressão respiratória, hipotensão, bradicardia, acúmulo prolongado' },
  { name: 'Cetamina', presentation: '50 mg/ml', mechanism: 'Antagonista NMDA. Dissociação sensorial e analgesia', dose: '5–20 mcg/kg/min', indications: 'Dor grave, sedação em choque, procedimentos traumáticos', adverseEffects: 'Hipertensão, taquicardia, alucinações, hipersalivação' },
  { name: 'Dexmedetomidina', presentation: '100 mcg/ml (diluído: 4 mcg/ml)', mechanism: 'Agonista alfa-2. Sedação com mínima depressão respiratória', dose: '0,2–0,5 mcg/kg/h', indications: 'Sedação leve a moderada em VM, pacientes instáveis hemodinamicamente', adverseEffects: 'Bradicardia, hipotensão, boca seca' },
  { name: 'Rocurônio', presentation: '10 mg/ml', mechanism: 'Bloqueador neuromuscular (não sedativo/analgésico)', dose: '7–12 mcg/kg/min', indications: 'Paralisia muscular em VM, IOT em sequência rápida', adverseEffects: 'Apneia, paralisia prolongada, bradicardia (raro)' },
];