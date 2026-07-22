import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { vasoactiveComparativeData, sedativeComparativeData } from '@/data/drugs';

const COLS = ['name', 'presentation', 'dose', 'indications', 'adverseEffects'];
const COL_LABELS = {
  name: 'Droga',
  presentation: 'Apresentação',
  mechanism: 'Mecanismo',
  dose: 'Dose',
  indications: 'Principais Indicações',
  adverseEffects: 'Efeitos Adversos',
};

export default function ComparativeTable() {
  const [activeTab, setActiveTab] = useState('vasoactive');
  const data = activeTab === 'vasoactive' ? vasoactiveComparativeData : sedativeComparativeData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Tabela Comparativa</h1>
            <p className="text-xs text-muted-foreground">Comparação rápida entre drogas</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {[
            { id: 'vasoactive', label: '💛 Vasoativas' },
            { id: 'sedative', label: '🟣 Sedativos / BNM' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? tab.id === 'vasoactive'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Mobile: cards */}
        <div className="block md:hidden space-y-4">
          {data.map((row) => (
            <div key={row.name} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-foreground text-base">{row.name}</h3>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{row.presentation}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Dose</span>
                <p className="text-primary font-semibold text-sm mt-0.5">{row.dose}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Indicações</span>
                <p className="text-foreground text-sm mt-0.5 leading-relaxed">{row.indications}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Efeitos Adversos</span>
                <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{row.adverseEffects}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {COL_LABELS[col]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row, i) => (
                <tr key={row.name} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                  <td className="px-4 py-4 font-bold text-foreground whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-4 text-muted-foreground font-mono text-xs whitespace-nowrap">{row.presentation}</td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold text-sm ${activeTab === 'vasoactive' ? 'text-amber-600' : 'text-indigo-600'}`}>
                      {row.dose}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground leading-relaxed max-w-xs">{row.indications}</td>
                  <td className="px-4 py-4 text-muted-foreground leading-relaxed max-w-xs">{row.adverseEffects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}