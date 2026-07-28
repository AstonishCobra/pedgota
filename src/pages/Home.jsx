import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ChevronRight, Table2, X, Settings } from 'lucide-react';
import { getDrugs } from '@/lib/drugStore';
const drugs = getDrugs();
import { MODULE_REGISTRY, MODULE_TYPES, PALETTES } from '@/modules/registry';
import InfusionModuleCard from '@/components/home/InfusionModuleCard';

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
  const groups = infusionModule.subcategories.
  map((sub) => ({
    sub,
    list: matched.filter((d) => d.category === sub.drugCategory)
  })).
  filter((g) => g.list.length > 0);

  if (matched.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">Nenhuma droga encontrada para "{search}"</p>
      </div>);

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
              {list.map((drug) =>
              <Link
                key={drug.id}
                to={`/drug/${drug.id}`}
                className={`flex items-center gap-3 px-4 py-3.5 border bg-card transition-colors ${cfg.rowBorder} ${cfg.rowHover}`}>
                
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-sm text-foreground">{drug.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{drug.presentation}</p>
                  </div>
                  <div className={`text-xs font-semibold ${cfg.accent}`}>
                    {drug.doseMin}–{drug.doseMax} {drug.doseUnit}
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </Link>
              )}
            </div>
          </div>);

      })}
    </div>);

}

export default function Home() {
  const [search, setSearch] = useState('');
  const isSearching = search.trim().length > 0;

  const visibleModules = MODULE_REGISTRY.filter((m) => m.status !== 'hidden');
  const activeModules = visibleModules.filter((m) => m.status === 'active');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="max-w-xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-6 hidden">
          

          
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight leading-none">in</h1>
            
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar droga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
          
          {search &&
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            
              <X size={15} />
            </button>
          }
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-4">
        {isSearching ?
        <SearchResults search={search} /> :

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
            className="flex items-center gap-4 p-5 border border-border bg-card hover:bg-muted hover:border-primary/40 transition-all">
            
              <div className="w-11 h-11 bg-muted flex items-center justify-center flex-shrink-0">
                <Table2 size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground text-base leading-tight">Tabela Comparativa</div>
                <div className="text-xs text-muted-foreground mt-0.5">Indicações, doses e efeitos adversos lado a lado</div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
            </Link>

          </>
        }
        {/* Link discreto para painel admin */}
        <div className="pt-4 text-center">
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors">
            <Settings size={11} /> Admin
          </Link>
        </div>

      </div>
    </div>);

}