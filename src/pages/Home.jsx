import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ChevronRight, Table2, X } from 'lucide-react';
import { drugs } from '@/data/drugs';
import { MODULE_REGISTRY, MODULE_TYPES, PALETTES } from '@/modules/registry';
import InfusionModuleCard from '@/components/home/InfusionModuleCard';
import SoonModuleCard from '@/components/home/SoonModuleCard';

// Busca rápida por drogas de infusão contínua
function SearchResults({ search }) {
  const lower = search.toLowerCase();
  const matched = drugs.filter(
    (d) =>
      d.name.toLowerCase().includes(lower) ||
      d.therapeuticClass.toLowerCase().includes(lower)
  );

  // Agrupar por categoria usando subcategorias do módulo de infusão
  const infusionModule = MODULE_REGISTRY.find((m) => m.type === MODULE_TYPES.INFUSION);
  const groups = infusionModule.subcategories
    .map((sub) => ({
      sub,
      list: matched.filter((d) => d.category === sub.drugCategory),
    }))
    .filter((g) => g.list.length > 0);

  if (matched.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 text-sm">Nenhuma droga encontrada para "{search}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {groups.map(({ sub, list }) => {
        const cfg = PALETTES[sub.palette];
        return (
          <div key={sub.id}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${cfg.accent}`}>
              {sub.label}
            </p>
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
      })}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const isSearching = search.trim().length > 0;

  const visibleModules = MODULE_REGISTRY.filter((m) => m.status !== 'hidden');
  const activeModules = visibleModules.filter((m) => m.status === 'active');
  const soonModules = visibleModules.filter((m) => m.status === 'soon');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="max-w-xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
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
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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
        {isSearching ? (
          <SearchResults search={search} />
        ) : (
          <>
            {/* Módulos ativos */}
            {activeModules.map((module) => {
              if (module.type === MODULE_TYPES.INFUSION) {
                return <InfusionModuleCard key={module.id} module={module} />;
              }
              // Outros tipos ativos: link direto (ex: Antibióticos quando lançar)
              return null;
            })}

            {/* Tabela comparativa (específica do módulo de infusão) */}
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

            {/* Módulos em breve */}
            {soonModules.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600 px-1">
                  Próximos módulos
                </p>
                {soonModules.map((module) => (
                  <SoonModuleCard key={module.id} module={module} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}