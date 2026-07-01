// Referências bibliográficas — medicamentos referenciam pelo id
export const REFERENCES = [{ id: 'guide2026', title: 'Guia da Infusão Contínua em Pediatria' }];

export function getReferenceTitle(id) {
  return REFERENCES.find((r) => r.id === id)?.title ?? id;
}