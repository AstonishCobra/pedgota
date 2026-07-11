/**
 * PediDrip — Dicionário de Alertas Clínicos
 * ===========================================
 *
 * Os campos `alerts` das drogas guardam CÓDIGOS internos (ex.:
 * "black_box_respiratory_depression"), não texto pronto para exibição.
 * Este módulo mapeia cada código para uma mensagem legível em
 * português, com um nível de severidade para permitir estilização
 * diferenciada na UI (ex.: tarja preta em vermelho mais forte).
 *
 * Uso típico no componente de alerta:
 *
 *   import { ALERT_MESSAGES } from './alertMessages';
 *
 *   drug.alerts.map(code => {
 *     const alert = ALERT_MESSAGES[code];
 *     return alert
 *       ? <AlertItem severity={alert.severity} text={alert.message} />
 *       : <AlertItem severity="unknown" text={code} />; // fallback de segurança
 *   });
 */

const ALERT_MESSAGES = {
  // ---- Tarja preta / black box -------------------------------------------
  black_box_respiratory_depression: {
    severity: "black_box",
    message: "Tarja preta: risco de depressão/parada respiratória.",
  },
  black_box_addiction_abuse_misuse: {
    severity: "black_box",
    message: "Tarja preta: risco de dependência, abuso e uso indevido.",
  },
  black_box_cyp3a4_interaction: {
    severity: "black_box",
    message: "Tarja preta: interação com inibidores/indutores de CYP3A4.",
  },
  black_box_cns_depressant_interaction: {
    severity: "black_box",
    message: "Tarja preta: risco grave com depressores do SNC (álcool, benzodiazepínicos).",
  },
  black_box_opioid_concomitant_use: {
    severity: "black_box",
    message: "Tarja preta: uso concomitante com opioides pode causar sedação profunda, depressão respiratória, coma e morte.",
  },

  // ---- Risco de vida / eventos graves -------------------------------------
  mortality_signal_rct_shock_dose: {
    severity: "critical",
    message: "Único RCT duplo-cego mostrou tendência a MAIOR mortalidade nessa faixa de dose — sem benefício de eficácia demonstrado.",
  },
  malignant_hyperthermia_risk: {
    severity: "critical",
    message: "Risco de hipertermia maligna.",
  },
  anaphylaxis_cross_reactivity_risk: {
    severity: "critical",
    message: "Risco de reação anafilática grave, com possível reatividade cruzada a outros fármacos da mesma classe.",
  },
  paralysis_without_sedation_analgesia_risk: {
    severity: "critical",
    message: "Paralisa sem sedar ou analgesiar — sempre associar sedação/analgesia adequada.",
  },
  vlbw_neonate_avoid_kids_list: {
    severity: "critical",
    message: "Evitar em neonatos de muito baixo peso — risco de hemorragia intraventricular grave, leucomalácia periventricular ou morte.",
  },
  no_rapid_iv_push_in_neonates: {
    severity: "critical",
    message: "Não administrar em bólus/injeção rápida em neonatos — risco de hipotensão grave e convulsões.",
  },

  // ---- Cardiovascular ------------------------------------------------------
  bradycardia_hypotension_sinus_arrest: {
    severity: "warning",
    message: "Pode causar bradicardia, hipotensão ou parada sinusal, especialmente com infusão rápida.",
  },
  transient_hypertension_loading_dose: {
    severity: "info",
    message: "Hipertensão transitória pode ocorrer durante a dose de ataque.",
  },
  qtc_prolongation_with_general_anesthetics: {
    severity: "warning",
    message: "Pode prolongar o intervalo QTc quando usado com anestésicos gerais.",
  },
  chest_wall_rigidity: {
    severity: "warning",
    message: "Risco de rigidez torácica (reversível com naloxona).",
  },

  // ---- Vesicante / acesso venoso --------------------------------------------
  vesicant_central_access_required: {
    severity: "warning",
    message: "Medicamento vesicante — acesso venoso central obrigatório.",
  },
  vesicant_concentration_dependent_access: {
    severity: "warning",
    message: "Medicamento vesicante — via periférica só é aceitável até a concentração máxima definida; acima disso, exige acesso central.",
  },

  // ---- Incompatibilidades químicas -------------------------------------------
  incompatible_with_alkaline_solutions: {
    severity: "warning",
    message: "Incompatível com soluções alcalinas (ex.: bicarbonato de sódio).",
  },
  incompatible_with_barbiturates: {
    severity: "warning",
    message: "Incompatível com barbitúricos — não misturar na mesma seringa (formação de precipitado).",
  },
  incompatible_with_furosemide_bumetanide: {
    severity: "warning",
    message: "Incompatível com furosemida e bumetanida na mesma via (formação de precipitado).",
  },
  incompatible_with_sodium_bicarbonate: {
    severity: "warning",
    message: "Incompatível com bicarbonato de sódio.",
  },
  y_site_incompatibilities: {
    severity: "info",
    message: "Possui incompatibilidades específicas em Y com outros medicamentos — conferir ficha técnica antes de coadministrar.",
  },
  potentiated_by_diazepam: {
    severity: "info",
    message: "Ação potencializada pelo diazepam — administrar separadamente.",
  },

  // ---- Toxicidade / metabolismo ------------------------------------------
  cyanide_thiocyanate_toxicity_risk: {
    severity: "warning",
    message: "Risco de toxicidade por cianeto/tiocianato, especialmente em uso prolongado ou insuficiência renal.",
  },
  benzyl_alcohol_gasping_syndrome_risk: {
    severity: "warning",
    message: "Formulações com álcool benzílico (conservante) podem causar síndrome do gasping em neonatos/baixo peso.",
  },
  photosensitive_protect_from_light: {
    severity: "info",
    message: "Fotossensível — proteger da luz durante preparo e infusão.",
  },
  thrombocytopenia_risk: {
    severity: "info",
    message: "Trombocitopenia relatada com uso — monitorar plaquetas.",
  },
  myopathy_risk_prolonged_icu_use: {
    severity: "warning",
    message: "Risco de miopatia com uso prolongado em UTI, especialmente se associado a corticosteroide.",
  },

  // ---- Renal / hepático -----------------------------------------------------
  renal_dose_adjustment_required: {
    severity: "info",
    message: "Ajuste de dose necessário em insuficiência renal.",
  },
  renal_dose_adjustment_caution: {
    severity: "info",
    message: "Considerar ajuste de dose em insuficiência renal.",
  },

  // ---- Tolerância / abstinência --------------------------------------------
  rapid_tolerance_development: {
    severity: "info",
    message: "Tolerância pode se desenvolver rapidamente com infusão contínua constante.",
  },
  tolerance_development_chronic_icu_use: {
    severity: "info",
    message: "Tolerância pode se desenvolver com administração crônica em UTI.",
  },
  tolerance_withdrawal_prolonged_use: {
    severity: "warning",
    message: "Tolerância, taquifilaxia e síndrome de abstinência podem ocorrer com uso prolongado (>24h).",
  },
  withdrawal_syndrome_prolonged_infusion: {
    severity: "warning",
    message: "Síndrome de abstinência pode ocorrer após infusão prolongada — reduzir gradualmente, não suspender abruptamente.",
  },

  // ---- Uso neonatal / pediátrico específico --------------------------------
  neonatal_use_expert_caution: {
    severity: "info",
    message: "Especialistas não recomendam o uso rotineiro em neonatos — avaliar risco-benefício.",
  },
  pediatric_safety_not_formally_established: {
    severity: "info",
    message: "Segurança e eficácia em pacientes pediátricos não formalmente estabelecidas pelo fabricante (uso off-label bem documentado na prática).",
  },
  not_for_rapid_sequence_lack_of_studies_not_inefficacy: {
    severity: "info",
    message: "Bula não recomenda para sequência rápida de intubação em pediatria por falta de estudos — não por ineficácia demonstrada.",
  },
  label_confusion_hemitartarato_vs_base: {
    severity: "critical",
    message: "Atenção ao rótulo do fabricante: dose pode estar expressa em hemitartarato, não em base — sempre calcular pela base.",
  },

  // ---- Dose / protocolo -----------------------------------------------------
  dose_dependent_receptor_effects: {
    severity: "info",
    message: "Efeitos dose-dependentes — a faixa de dose determina qual receptor predomina clinicamente.",
  },
  indication_dependent_dose_range: {
    severity: "info",
    message: "A dose ideal varia conforme a indicação clínica — a faixa usada aqui é uma simplificação.",
  },
  non_standard_extreme_dose_case_report_only: {
    severity: "info",
    message: "O teto de dose do Guia é um valor extremo relatado em caso isolado, não a faixa usual de uso.",
  },
  no_fixed_concentration_engine: {
    severity: "info",
    message: "Não há concentração-padrão fixa definida pelas fontes consultadas para esta droga — Protocolo Padrão não disponível.",
  },

  // ---- Códigos legados (já existentes no drugs.js antes do cruzamento de fontes) ----
  photoprotection: {
    severity: "info",
    message: "Fotossensível — proteger da luz durante preparo e infusão.",
  },
  cyanide_toxicity_risk: {
    severity: "warning",
    message: "Risco de toxicidade por cianeto, especialmente em uso prolongado ou altas doses.",
  },
  no_loading_dose: {
    severity: "info",
    message: "Evitar dose de ataque em crianças — risco de bradicardia e hipotensão.",
  },
  mandatory_sedation: {
    severity: "critical",
    message: "Uso obrigatoriamente associado a sedação e analgesia adequadas.",
  },
  no_sedative_effect: {
    severity: "info",
    message: "Não possui efeito sedativo ou analgésico — paralisa sem sedar.",
  },
};

export { ALERT_MESSAGES };