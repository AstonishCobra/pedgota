// Categorias de medicamentos (taxonomia central)
export const CATEGORIES = [
  { id: 'vasoativas', label: 'Vasoativa' },
  { id: 'sedacao', label: 'Sedação' },
  { id: 'analgesia', label: 'Analgesia' },
  { id: 'bnm', label: 'Bloqueador Neuromuscular' },
  { id: 'outras', label: 'Outras' },
];

export function getCategoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}