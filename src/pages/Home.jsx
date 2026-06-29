import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { drugs, DRUG_CATEGORIES } from '@/data/drugs';
import { Table2, Search, Activity } from 'lucide-react';

const categoryConfig = {
  [DRUG_CATEGORIES.VASOACTIVE]: {
    label: 'Drogas Vasoativas',
    icon: '❤️',
    accent: 'text-amber-400',
    border: 'border-amber-500/20 hover:border-amber-500/50',
    bg: 'hover:bg-amber-500/5',
    badge: 'bg-amber-500/15 text-amber-300',
    dot: 'bg-amber-400'
  },
  [DRUG_CATEGORIES.SEDATIVE]: {
    label: 'Sedativos / Analgésicos',
    icon: '🧠',
    accent: 'text-indigo-400',
    border: 'border-indigo-500/20 hover:border-indigo-500/50',
    bg: 'hover:bg-indigo-500/5',
    badge: 'bg-indigo-500/15 text-indigo-300',
    dot: 'bg-indigo-400'
  },
  [DRUG_CATEGORIES.BNM]: {
    label: 'Bloqueadores Neuromusculares',
    icon: '⚡',
    accent: 'text-red-400',
    border: 'border-red-500/20 hover:border-red-500/50',
    bg: 'hover:bg-red-500/5',
    badge: 'bg-red-500/15 text-red-300',
    dot: 'bg-red-400'
  }
};

const categoryOrder = [
DRUG_CATEGORIES.VASOACTIVE,
DRUG_CATEGORIES.SEDATIVE,
DRUG_CATEGORIES.BNM];


export default function Home() {
  const [search, setSearch] = useState('');

  const filteredDrugs = drugs.filter((d) =>
  d.name.toLowerCase().includes(search.toLowerCase()) ||
  d.therapeuticClass.toLowerCase().includes(search.toLowerCase())
  );

  const groupedDrugs = categoryOrder.reduce((acc, cat) => {
    const list = filteredDrugs.filter((d) => d.category === cat);
    if (list.length > 0) acc[cat] = list;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Activity size={18} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">PedDrip</h1>
              <p className="text-xs text-slate-500">Infusões Contínuas em Pediatria</p>
            </div>
          </div>
          

          

          {/* Search */}
          <div className="relative mt-4">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar droga..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500" />
            
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Grupos de drogas */}
        {Object.entries(groupedDrugs).map(([cat, drugList]) => {
          const cfg = categoryConfig[cat];
          return (
            <section key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <span>{cfg.icon}</span>
                <h2 className={`text-xs font-bold uppercase tracking-widest ${cfg.accent}`}>
                  {cfg.label}
                </h2>
              </div>
              <div className="space-y-2">
                {drugList.map((drug) =>
                <Link
                  key={drug.id}
                  to={`/drug/${drug.id}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border bg-slate-800/40 transition-all duration-150 ${cfg.border} ${cfg.bg}`}>
                  
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-100">{drug.name}</span>
                        {drug.alerts.length > 0 &&
                      <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.5 rounded font-medium">
                            ⚠ Alerta
                          </span>
                      }
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{drug.presentation}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-xs font-medium ${cfg.accent}`}>
                        {drug.doseMin}–{drug.doseMax}
                      </div>
                      <div className="text-xs text-slate-600">{drug.doseUnit}</div>
                    </div>
                  </Link>
                )}
              </div>
            </section>);

        })}

        {filteredDrugs.length === 0 &&
        <div className="text-center py-12">
            <p className="text-slate-600">Nenhuma droga encontrada para "{search}"</p>
          </div>
        }

        {/* Tabela comparativa */}
        <div className="border-t border-slate-800 pt-6">
          <Link
            to="/comparative"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-700 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600 transition-all">
            
            <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
              <Table2 size={17} className="text-slate-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-300 text-sm">Tabela Comparativa</div>
              <div className="text-xs text-slate-600">Comparar indicações, doses e efeitos adversos</div>
            </div>
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-700 text-center pb-4 leading-relaxed">
          Baseado no Guia de Infusão Contínua em Pediatria.{' '}
          Confirme sempre com protocolos institucionais e julgamento clínico.
        </p>
      </div>
    </div>);

}