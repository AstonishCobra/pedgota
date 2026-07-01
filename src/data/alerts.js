// Registro central de alertas críticos — medicamentos referenciam pelo id
export const ALERTS = {
  central_access: {
    id: 'central_access',
    title: 'Preferir acesso central',
    description: 'Preferência por acesso venoso central',
  },
  photoprotection: {
    id: 'photoprotection',
    title: 'Proteger da luz',
    description: 'Fotossensível — proteger da luz com equipo fotoprotetor',
  },
  cyanide_toxicity_risk: {
    id: 'cyanide_toxicity_risk',
    title: 'Risco de toxicidade por cianeto',
    description: 'Dose máxima 10 mcg/kg/min por curto período (toxicidade por cianeto)',
  },
  no_loading_dose: {
    id: 'no_loading_dose',
    title: 'Evitar dose de ataque',
    description: 'Evitar dose de ataque em crianças — risco de bradicardia e hipotensão',
  },
  mandatory_sedation: {
    id: 'mandatory_sedation',
    title: 'Sedação obrigatória',
    description: 'NUNCA ADMINISTRAR SEM SEDAÇÃO E ANALGESIA ASSOCIADAS',
  },
  no_sedative_effect: {
    id: 'no_sedative_effect',
    title: 'Sem efeito sedativo',
    description: 'Não possui ação sedativa nem analgésica',
  },
};

export function getAlert(id) {
  return ALERTS[id] ?? { id, title: id, description: id };
}