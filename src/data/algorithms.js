// Algoritmos de cálculo de infusão (fórmulas reutilizáveis por vários medicamentos)
export const ALGORITHMS = {
  VASOACTIVE_STANDARD: { id: 'VASOACTIVE_STANDARD', formula: 'dose*weight*1.44' },
  SEDATION_STANDARD: { id: 'SEDATION_STANDARD', formula: 'dose*weight*24' },
  VASOPRESSIN: { id: 'VASOPRESSIN', formula: 'custom' },
  DEXMEDETOMIDINE: { id: 'DEXMEDETOMIDINE', formula: 'custom' },
};