// Referências bibliográficas — medicamentos referenciam pelo id
export const REFERENCES = [];

export function getReferenceTitle(id) {
  return REFERENCES.find((r) => r.id === id)?.title ?? id;
}