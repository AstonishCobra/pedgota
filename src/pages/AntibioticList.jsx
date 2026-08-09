import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { antibiotics, ANTIBIOTIC_CATEGORIES, getAntibioticCategoryLabel } from '@/data/antibiotics';

// Paleta própria do módulo Antibióticos — reaproveita a cor 'green' já
// registrada em modules/registry.js (PALETTES) para o card da Home,
// mas aqui cada classe farmacológica tem sua própria variação sutil de
// tom só pra diferenciar visualmente as seções nesta página.
const CATEGORY_ORDER = [
  ANTIBIOTIC_CATEGORIES.PENICILINAS,
  ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS,
  ANTIBIOTIC_CATEGORIES.MACROLIDEOS,
  ANTIBIOTIC_CATEGORIES.SULFONAMIDAS,
  ANTIBIOTIC_CATEGORIES.AMINOGLICOSIDEOS,
];

function CategorySection({ categoryId, drugs }) {
  const [expanded, setExpanded] = useState(false);
  if (drugs.length === 0) return null;

  return (
    <div className="border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 hover:border-emerald-500/50 transition-all duration-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-foreground text-base leading-tight">
            {getAntibioticCategoryLabel(categoryId)}
          </h2>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/15 text-emerald-700">
            {drugs.length} {drugs.length === 1 ? 'droga' : 'drogas'}
          </span>
          <ChevronRight
            size={16}
            className={`text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border/50 divide-y divide-border/30">
          {drugs.map((drug) => (
            <Link
              key={drug.id}
              to={`/antibioticos/${drug.id}`}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-emerald-500/5"
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-500" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground">{drug.name}</span>
                  {drug.indications.length > 1 && (
                    <span className="text-xs bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 px-1.5 py-0.5 font-medium leading-none">
                      {drug.indications.length} indicações
                    </span>
                  )}
                  {drug.indications.some((ind) => ind.alerts?.length > 0) && (
                    <span className="text-xs bg-red-500/15 text-red-700 border border-red-500/30 px-1.5 py-0.5 font-medium leading-none">
                      ⚠
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{drug.therapeuticClass}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AntibioticList() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return antibiotics;
    const lower = search.toLowerCase();
    return antibiotics.filter(
      (d) => d.name.toLowerCase().includes(lower) || d.therapeuticClass.toLowerCase().includes(lower)
    );
  }, [search]);

  const grouped = useMemo(() => {
    return CATEGORY_ORDER.map((categoryId) => ({
      categoryId,
      drugs: filtered.filter((d) => d.category === categoryId),
    }));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">Antibióticos</h1>
            <p className="text-xs text-muted-foreground">Doses por peso e função renal</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-4">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar antibiótico..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="space-y-2">
          {grouped.map(({ categoryId, drugs }) => (
            <CategorySection key={categoryId} categoryId={categoryId} drugs={drugs} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">Nenhum antibiótico encontrado para "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}