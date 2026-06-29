import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { drugs, DRUG_CATEGORIES } from '@/data/drugs';
import { Table2, ChevronRight, Activity, Heart, Brain, Zap, X } from 'lucide-react';

const categoryConfig = {
  [DRUG_CATEGORIES.VASOACTIVE]: {
    label: 'Drogas Vasoativas',
    subtitle: 'Vasopressores e inotrópicos',
    Icon: Heart,
    count: drugs.filter(d => d.category === DRUG_CATEGORIES.VASOACTIVE).length,
    accent: 'text-amber-400',
    accentHex: '#F59E0B',
    cardBorder: 'border-amber-500/25',
    cardBg: 'bg-gradient-to-br from-amber-500/10 to-amber-600/5',
    cardHover: 'hover:border-amber-500/50 hover:from-amber-500/15',
    iconBg: 'bg-amber-500/15',
    dot: 'bg-amber-400',
    rowBorder: 'border-amber-500/15 hover:border-amber-500/40',
    rowHover: 'hover:bg-amber-500/5',
  },
  [DRUG_CATEGORIES.SEDATIVE]: {
    label: 'Sedativos / Analgésicos',
    subtitle: 'Sedação e controle da dor',
    Icon: Brain,
    count: drugs.filter(d => d.category === DRUG_CATEGORIES.SEDATIVE).length,
    accent: 'text-indigo-400',
    accentHex: '#6366F1',
    cardBorder: 'border-indigo-500/25',
    cardBg: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/5',
    cardHover: 'hover:border-indigo-500/50 hover:from-indigo-500/15',
    iconBg: 'bg-indigo-500/15',
    dot: 'bg-indigo-400',
    rowBorder: 'border-indigo-500/15 hover:border-indigo-500/40',
    rowHover: 'hover:bg-indigo-500/5',
  },
  [DRUG_CATEGORIES.BNM]: {
    label: 'Bloqueadores Neuromusculares',
    subtitle: 'Paralisia muscular controlada',
    Icon: Zap,
    count: drugs.filter(d => d.category === DRUG_CATEGORIES.BNM).length,
    accent: 'text-red-400',
    accentHex: '#EF4444',
    cardBorder: 'border-red-500/25',
    cardBg: 'bg-gradient-to-br from-red-500/10 to-red-600/5',
    cardHover: 'hover:border-red-500/50 hover:from-red-500/15',
    iconBg: 'bg-red-500/15',
    dot: 'bg-red-400',
    rowBorder: 'border-red-500/15 hover:border-red-500/40',
    rowHover: 'hover:bg-red-500/5',
  },
};

const categoryOrder = [
  DRUG_CATEGORIES.VASOACTIVE,
  DRUG_CATEGORIES.SEDATIVE,
  DRUG_CATEGORIES.BNM,
];

function CategoryCard({ cat, drugList, cfg }) {
  const [expanded, setExpanded] = useState(false);
  const { Icon } = cfg;

  return (
    <div     className={`border transition-all duration-200 overflow-hidden ${cfg.cardBorder} ${cfg.cardBg} ${cfg.cardHover}`}>
      {/* Card header — clicável para expandir */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
          <Icon size={20} className={cfg.accent} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-slate-100 text-base leading-tight">{cfg.label}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{cfg.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cfg.iconBg} ${cfg.accent}`}>
            {drugList.length} {drugList.length === 1 ? 'droga' : 'drogas'}
          </span>
          <ChevronRight
            size={16}
            className={`text-slate-500 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* Lista de drogas expandida */}
      {expanded && (
        <div className="border-t border-slate-700/50 divide-y divide-slate-700/30">
          {drugList.map((drug) => (
            <Link
              key={drug.id}
              to={`/drug/${drug.id}`}
              className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${cfg.rowHover}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-slate-200">{drug.name}</span>
                  {drug.alerts.length > 0 && (
                    <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.5 rounded font-medium leading-none">
                      ⚠
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{drug.presentation}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-xs font-semibold ${cfg.accent}`}>
                  {drug.doseMin}–{drug.doseMax}
                </div>
                <div className="text-xs text-slate-600">{drug.doseUnit}</div>
              </div>
              <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');

  const isSearching = search.trim().length > 0;

  const filteredDrugs = drugs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.therapeuticClass.toLowerCase().includes(search.toLowerCase())
  );

  const groupedFiltered = categoryOrder.reduce((acc, cat) => {
    const list = filteredDrugs.filter((d) => d.category === cat);
    if (list.length > 0) acc[cat] = list;
    return acc;
  }, {});

  const allDrugsByCategory = categoryOrder.reduce((acc, cat) => {
    acc[cat] = drugs.filter((d) => d.category === cat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="max-w-xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-6">
          <div               className="w-10 h-10 bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Activity size={20} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-none">PediDrip</h1>
            <p className="text-xs text-slate-500 mt-0.5">Infusões Contínuas em Pediatria</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar droga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 pl-10 pr-10 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-4">

        {/* Resultados de busca */}
        {isSearching ? (
          <>
            {filteredDrugs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-600 text-sm">Nenhuma droga encontrada para "{search}"</p>
              </div>
            ) : (
              Object.entries(groupedFiltered).map(([cat, list]) => {
                const cfg = categoryConfig[cat];
                return (
                  <div key={cat}>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${cfg.accent}`}>{cfg.label}</p>
                    <div className="space-y-1.5">
                      {list.map((drug) => (
                        <Link
                          key={drug.id}
                          to={`/drug/${drug.id}`}
                          className={`flex items-center gap-3 px-4 py-3.5 border bg-slate-800/40 transition-colors ${cfg.rowBorder} ${cfg.rowHover}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-sm text-slate-200">{drug.name}</span>
                            <p className="text-xs text-slate-600 mt-0.5">{drug.presentation}</p>
                          </div>
                          <div className={`text-xs font-semibold ${cfg.accent}`}>
                            {drug.doseMin}–{drug.doseMax} {drug.doseUnit}
                          </div>
                          <ChevronRight size={14} className="text-slate-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </>
        ) : (
          <>
            {/* Cards por categoria */}
            {categoryOrder.map((cat) => (
              <CategoryCard
                key={cat}
                cat={cat}
                drugList={allDrugsByCategory[cat]}
                cfg={categoryConfig[cat]}
              />
            ))}

            {/* Tabela comparativa */}
            <Link
              to="/comparative"
              className="flex items-center gap-4 p-5 border border-slate-700/60 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600 transition-all"
            >
              <div className="w-11 h-11 bg-slate-700/60 flex items-center justify-center flex-shrink-0">
                <Table2 size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-200 text-base leading-tight">Tabela Comparativa</div>
                <div className="text-xs text-slate-500 mt-0.5">Indicações, doses e efeitos adversos lado a lado</div>
              </div>
              <ChevronRight size={16} className="text-slate-600 flex-shrink-0" />
            </Link>
          </>
        )}

        <p className="text-xs text-slate-700 text-center pt-2 leading-relaxed">
          Baseado no Guia de Infusão Contínua em Pediatria · Use com julgamento clínico
        </p>
      </div>
    </div>
  );
}