import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { getDrugs } from '@/lib/drugStore';
const drugs = getDrugs();
import { antibiotics, ANTIBIOTIC_CATEGORIES, getAntibioticCategoryLabel } from '@/data/antibiotics';
import { MODULE_REGISTRY, MODULE_TYPES, PALETTES } from '@/modules/registry';
import ModuleLinkCard from '@/components/home/ModuleLinkCard';
import ModuleSoonCard from '@/components/home/ModuleSoonCard';

// Busca global — abrange drogas de Infusão Contínua e de Drogas
// (Antibióticos), independente de qual página cada uma mora.
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

  // Busca em antibióticos — droga por droga (não por indicação), já
  // que o resultado leva pra tela de detalhe da droga, onde o usuário
  // escolhe a indicação se houver mais de uma.
  const matchedAntibiotics = antibiotics.filter(
    (d) =>
    d.name.toLowerCase().includes(lower) ||
    d.therapeuticClass.toLowerCase().includes(lower)
  );
  const antibioticCategoryOrder = [
  ANTIBIOTIC_CATEGORIES.PENICILINAS,
  ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS,
  ANTIBIOTIC_CATEGORIES.MACROLIDEOS,
  ANTIBIOTIC_CATEGORIES.SULFONAMIDAS,
  ANTIBIOTIC_CATEGORIES.AMINOGLICOSIDEOS];

  const antibioticGroups = antibioticCategoryOrder.
  map((categoryId) => ({
    categoryId,
    list: matchedAntibiotics.filter((d) => d.category === categoryId)
  })).
  filter((g) => g.list.length > 0);

  const hasAnyResult = matched.length > 0 || matchedAntibiotics.length > 0;

  if (!hasAnyResult) {
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

      {antibioticGroups.length > 0 &&
      <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-emerald-600">
            Antibióticos
          </p>
          <div className="space-y-4">
            {antibioticGroups.map(({ categoryId, list }) =>
          <div key={categoryId}>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                  {getAntibioticCategoryLabel(categoryId)}
                </p>
                <div className="space-y-1.5">
                  {list.map((drug) =>
              <Link
                key={drug.id}
                to={`/antibioticos/${drug.id}`}
                className="flex items-center gap-3 px-4 py-3.5 border border-emerald-500/20 bg-card transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5">
                  
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-500" />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-sm text-foreground">{drug.name}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{drug.therapeuticClass}</p>
                      </div>
                      {drug.indications.length > 1 &&
                <span className="text-xs bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 px-1.5 py-0.5 font-medium leading-none">
                          {drug.indications.length} indicações
                        </span>
                }
                      <ChevronRight size={14} className="text-muted-foreground" />
                    </Link>
              )}
                </div>
              </div>
          )}
          </div>
        </div>
      }
    </div>);

}

export default function Home() {
  const [search, setSearch] = useState('');
  const isSearching = search.trim().length > 0;

  // Home simplificada: 3 módulos de topo — Infusão Contínua, Drogas e
  // Emergências (esta última 'soon', não construída ainda). Cada
  // módulo ativo leva pra sua própria página (nada fica embutido
  // aqui, diferente da arquitetura anterior).
  const visibleModules = MODULE_REGISTRY.filter((m) => m.status !== 'hidden');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="max-w-xl mx-auto px-4 pt-10 pb-2">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Guia Pediátrico</h1>
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

      <div className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-2">
        {isSearching ?
        <SearchResults search={search} /> :

        <>
            {visibleModules.map((module) =>
          module.status === 'active' ?
          <ModuleLinkCard key={module.id} module={module} /> :

          <ModuleSoonCard key={module.id} item={module} />

          )}
          </>
        }
      </div>
    </div>);

}