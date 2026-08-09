/**
 * REGISTRO CENTRAL DE MÓDULOS — PediDrip
 *
 * Para adicionar um novo módulo:
 *   1. Crie o arquivo de dados em src/data/<modulo>.js  (opcional)
 *   2. Crie a página em src/pages/<Modulo>.jsx
 *   3. Adicione a rota em src/App.jsx
 *   4. Registre o módulo aqui — apenas uma entrada no array MODULE_REGISTRY
 *
 * status:
 *   'active'   → visível e acessível
 *   'soon'     → aparece na home com badge "Em breve", sem link clicável
 *   'hidden'   → não aparece na home
 */

// ─── Tipos de módulo ───────────────────────────────────────────────────────────
export const MODULE_TYPES = {
  INFUSION: 'infusion',       // calculadora de infusão contínua (modelo atual)
  ANTIBIOTIC: 'antibiotic',   // antibióticos
  BOLUS: 'bolus',             // drogas em bolus
  EMERGENCY: 'emergency',     // emergências pediátricas
  VOLUME: 'volume',           // reposição volêmica
  INTUBATION: 'intubation',   // intubação
  CALCULATOR: 'calculator',   // calculadoras pediátricas gerais
  OTHER: 'other',             // outras classes medicamentosas
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
};

// ─── REGISTRO CENTRAL DE MÓDULOS ──────────────────────────────────────────────
//
// Cada módulo de tipo INFUSION possui `getDrugs()` e `getRoute(drug)`
// para a lógica de listagem expansível existente.
// Módulos de outros tipos usam apenas `route` para navegação direta.
//
export const MODULE_REGISTRY = [
  // ── Módulo 1: Infusões Contínuas ─────────────────────────────────────────
  {
    id: 'infusoes-continuas',
    type: MODULE_TYPES.INFUSION,
    label: 'Infusões Contínuas',
    subtitle: 'Vasoativas, sedativos e BNM',
    iconName: 'Droplets',
    palette: 'amber',
    status: 'active',
    // Subcategorias internas (o módulo de infusão mantém estrutura de drug categories)
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

  // ── Módulo 2: Antibióticos ────────────────────────────────────────────────
  {
    id: 'antibioticos',
    type: MODULE_TYPES.ANTIBIOTIC,
    label: 'Antibióticos',
    subtitle: 'Doses por peso e função renal',
    iconName: 'Shield',
    palette: 'green',
    status: 'active',
    route: '/antibioticos',
  },

  // ── Módulo 3: Drogas em Bolus (em breve) ──────────────────────────────────
  {
    id: 'bolus',
    type: MODULE_TYPES.BOLUS,
    label: 'Drogas em Bolus',
    subtitle: 'Doses únicas por peso',
    iconName: 'Syringe',
    palette: 'orange',
    status: 'soon',
    route: '/bolus',
  },

  // ── Módulo 4: Emergências Pediátricas (em breve) ──────────────────────────
  {
    id: 'emergencias',
    type: MODULE_TYPES.EMERGENCY,
    label: 'Emergências Pediátricas',
    subtitle: 'PCR, anafilaxia, convulsão',
    iconName: 'AlertOctagon',
    palette: 'red',
    status: 'soon',
    route: '/emergencias',
  },

  // ── Módulo 5: Reposição Volêmica (em breve) ───────────────────────────────
  {
    id: 'reposicao-volemica',
    type: MODULE_TYPES.VOLUME,
    label: 'Reposição Volêmica',
    subtitle: 'Cristaloides e coloides',
    iconName: 'Droplet',
    palette: 'cyan',
    status: 'soon',
    route: '/reposicao-volemica',
  },

  // ── Módulo 6: Intubação (em breve) ────────────────────────────────────────
  {
    id: 'intubacao',
    type: MODULE_TYPES.INTUBATION,
    label: 'Intubação',
    subtitle: 'Sequência rápida e parâmetros ventilatórios',
    iconName: 'Wind',
    palette: 'violet',
    status: 'soon',
    route: '/intubacao',
  },

  // ── Módulo 7: Calculadoras Pediátricas (em breve) ─────────────────────────
  {
    id: 'calculadoras',
    type: MODULE_TYPES.CALCULATOR,
    label: 'Calculadoras Pediátricas',
    subtitle: 'Peso ideal, superfície corporal, clearance',
    iconName: 'Calculator',
    palette: 'rose',
    status: 'soon',
    route: '/calculadoras',
  },

  // ── Módulo 8: Outras Classes (em breve) ───────────────────────────────────
  {
    id: 'outras-classes',
    type: MODULE_TYPES.OTHER,
    label: 'Outras Classes',
    subtitle: 'Diuréticos, corticoides e mais',
    iconName: 'Pill',
    palette: 'indigo',
    status: 'soon',
    route: '/outras-classes',
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