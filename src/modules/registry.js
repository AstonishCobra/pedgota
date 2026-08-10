/**
 * REGISTRO CENTRAL DE MÓDULOS — PediDrip
 *
 * ⚠️ ARQUITETURA SIMPLIFICADA (decisão do usuário, com desenho anexado
 * na conversa): apenas 3 módulos de topo — Infusão Contínua, Drogas e
 * Emergências. Os módulos anteriores (Bolus, Reposição Volêmica,
 * Intubação, Calculadoras Pediátricas, Outras Classes) foram REMOVIDOS
 * do registro — não fazem mais parte do plano do app.
 *
 * Diferente da arquitetura anterior, "Antibióticos" NÃO é mais um
 * módulo de topo — agora é um item dentro do hub "Drogas"
 * (ver DRUG_HUB_ITEMS abaixo), junto com "Outras Drogas" (futuro).
 *
 * status:
 *   'active'   → visível e acessível
 *   'soon'     → aparece na home com badge "Em breve", sem link clicável
 *   'hidden'   → não aparece na home
 */

// ─── Tipos de módulo ───────────────────────────────────────────────────────────
export const MODULE_TYPES = {
  INFUSION: 'infusion',   // calculadora de infusão contínua — página própria
  DRUGS: 'drugs',         // hub "Drogas" — reúne Antibióticos e (futuramente) outras classes
  EMERGENCY: 'emergency', // emergências pediátricas — futuro, não construído ainda
};

// ─── Paletas de cor disponíveis ────────────────────────────────────────────────
export const PALETTES = {
  amber: {
    accent: 'text-amber-600',
    cardBorder: 'border-amber-500/30',
    cardBg: 'bg-gradient-to-br from-amber-500/10 to-amber-600/5',
    cardHover: 'hover:border-amber-500/50 hover:from-amber-500/15',
    iconBg: 'bg-amber-500/15',
    dot: 'bg-amber-500',
    rowBorder: 'border-amber-500/20 hover:border-amber-500/50',
    rowHover: 'hover:bg-amber-500/5',
    badge: 'bg-amber-500/15 text-amber-700 border border-amber-500/30',
  },
  indigo: {
    accent: 'text-indigo-600',
    cardBorder: 'border-indigo-500/30',
    cardBg: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/5',
    cardHover: 'hover:border-indigo-500/50 hover:from-indigo-500/15',
    iconBg: 'bg-indigo-500/15',
    dot: 'bg-indigo-500',
    rowBorder: 'border-indigo-500/20 hover:border-indigo-500/50',
    rowHover: 'hover:bg-indigo-500/5',
    badge: 'bg-indigo-500/15 text-indigo-700 border border-indigo-500/30',
  },
  red: {
    accent: 'text-red-600',
    cardBorder: 'border-red-500/30',
    cardBg: 'bg-gradient-to-br from-red-500/10 to-red-600/5',
    cardHover: 'hover:border-red-500/50 hover:from-red-500/15',
    iconBg: 'bg-red-500/15',
    dot: 'bg-red-500',
    rowBorder: 'border-red-500/20 hover:border-red-500/50',
    rowHover: 'hover:bg-red-500/5',
    badge: 'bg-red-500/15 text-red-700 border border-red-500/30',
  },
  green: {
    accent: 'text-emerald-600',
    cardBorder: 'border-emerald-500/30',
    cardBg: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5',
    cardHover: 'hover:border-emerald-500/50 hover:from-emerald-500/15',
    iconBg: 'bg-emerald-500/15',
    dot: 'bg-emerald-500',
    rowBorder: 'border-emerald-500/20 hover:border-emerald-500/50',
    rowHover: 'hover:bg-emerald-500/5',
    badge: 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30',
  },
  cyan: {
    accent: 'text-cyan-600',
    cardBorder: 'border-cyan-500/30',
    cardBg: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/5',
    cardHover: 'hover:border-cyan-500/50 hover:from-cyan-500/15',
    iconBg: 'bg-cyan-500/15',
    dot: 'bg-cyan-500',
    rowBorder: 'border-cyan-500/20 hover:border-cyan-500/50',
    rowHover: 'hover:bg-cyan-500/5',
    badge: 'bg-cyan-500/15 text-cyan-700 border border-cyan-500/30',
  },
  orange: {
    accent: 'text-orange-600',
    cardBorder: 'border-orange-500/30',
    cardBg: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5',
    cardHover: 'hover:border-orange-500/50 hover:from-orange-500/15',
    iconBg: 'bg-orange-500/15',
    dot: 'bg-orange-500',
    rowBorder: 'border-orange-500/20 hover:border-orange-500/50',
    rowHover: 'hover:bg-orange-500/5',
    badge: 'bg-orange-500/15 text-orange-700 border border-orange-500/30',
  },
  violet: {
    accent: 'text-violet-600',
    cardBorder: 'border-violet-500/30',
    cardBg: 'bg-gradient-to-br from-violet-500/10 to-violet-600/5',
    cardHover: 'hover:border-violet-500/50 hover:from-violet-500/15',
    iconBg: 'bg-violet-500/15',
    dot: 'bg-violet-500',
    rowBorder: 'border-violet-500/20 hover:border-violet-500/50',
    rowHover: 'hover:bg-violet-500/5',
    badge: 'bg-violet-500/15 text-violet-700 border border-violet-500/30',
  },
  rose: {
    accent: 'text-rose-600',
    cardBorder: 'border-rose-500/30',
    cardBg: 'bg-gradient-to-br from-rose-500/10 to-rose-600/5',
    cardHover: 'hover:border-rose-500/50 hover:from-rose-500/15',
    iconBg: 'bg-rose-500/15',
    dot: 'bg-rose-500',
    rowBorder: 'border-rose-500/20 hover:border-rose-500/50',
    rowHover: 'hover:bg-rose-500/5',
    badge: 'bg-rose-500/15 text-rose-700 border border-rose-500/30',
  },
  slate: {
    accent: 'text-slate-500',
    cardBorder: 'border-slate-300',
    cardBg: 'bg-slate-50',
    cardHover: '',
    iconBg: 'bg-slate-200',
    dot: 'bg-slate-400',
    rowBorder: 'border-slate-200',
    rowHover: '',
    badge: 'bg-slate-200 text-slate-500 border border-slate-300',
  },
};

// ─── REGISTRO CENTRAL DE MÓDULOS (3 apenas) ───────────────────────────────────
export const MODULE_REGISTRY = [
  // ── Módulo 1: Infusão Contínua — página própria (/infusao-continua) ────────
  {
    id: 'infusao-continua',
    type: MODULE_TYPES.INFUSION,
    label: 'Infusão Contínua',
    subtitle: 'Vasoativas, sedativos e BNM',
    iconName: 'Droplets',
    palette: 'amber',
    status: 'active',
    route: '/infusao-continua',
    // Subcategorias internas, usadas pela página InfusaoContinua.jsx
    subcategories: [
      {
        id: 'vasoativas',
        label: 'Drogas Vasoativas',
        palette: 'amber',
        iconName: 'Heart',
        drugCategory: 'vasoativas',
      },
      {
        id: 'sedacao',
        label: 'Sedação',
        palette: 'indigo',
        iconName: 'Brain',
        drugCategory: 'sedacao',
      },
      {
        id: 'analgesia',
        label: 'Analgesia',
        palette: 'violet',
        iconName: 'Syringe',
        drugCategory: 'analgesia',
      },
      {
        id: 'bnm',
        label: 'Bloqueadores Neuromusculares',
        palette: 'red',
        iconName: 'Zap',
        drugCategory: 'bnm',
      },
    ],
  },

  // ── Módulo 2: Drogas — página própria (/drogas), hub de classes ────────────
  {
    id: 'drogas',
    type: MODULE_TYPES.DRUGS,
    label: 'Drogas',
    subtitle: 'Antibióticos e outras classes',
    iconName: 'Pill',
    palette: 'green',
    status: 'active',
    route: '/drogas',
  },

  // ── Módulo 3: Emergências — futuro, NÃO construir agora ─────────────────────
  {
    id: 'emergencias',
    type: MODULE_TYPES.EMERGENCY,
    label: 'Emergências',
    subtitle: 'Em breve',
    iconName: 'AlertOctagon',
    palette: 'slate',
    status: 'soon',
    route: '/emergencias',
  },
];

// ─── Itens do hub "Drogas" (/drogas) ───────────────────────────────────────────
// Análogo às subcategorias do módulo de Infusão, mas pro hub de Drogas.
// "Outras Drogas" é só um placeholder visual (status 'soon') até que
// novas classes farmacológicas sejam construídas.
export const DRUG_HUB_ITEMS = [
  {
    id: 'antibioticos',
    label: 'Antibióticos',
    subtitle: 'Doses por peso e função renal',
    iconName: 'Shield',
    palette: 'green',
    status: 'active',
    route: '/antibioticos',
  },
  {
    id: 'outras-drogas',
    label: 'Outras Drogas',
    subtitle: 'Em breve',
    iconName: 'Pill',
    palette: 'slate',
    status: 'soon',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getActiveModules() {
  return MODULE_REGISTRY.filter((m) => m.status === 'active');
}

export function getSoonModules() {
  return MODULE_REGISTRY.filter((m) => m.status === 'soon');
}

export function getVisibleModules() {
  return MODULE_REGISTRY.filter((m) => m.status !== 'hidden');
}