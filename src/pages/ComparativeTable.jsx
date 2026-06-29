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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 sticky top-0 z-10 bg-slate-900/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-slate-200 transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Tabela Comparativa</h1>
            <p className="text-xs text-slate-500">Comparação rápida entre drogas</p>
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
                    ? 'border-amber-500 text-amber-400'
                    : 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
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
            <div key={row.name} className="rounded-xl border border-slate-800 bg-slate-800/40 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-100 text-base">{row.name}</h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-700 px-2 py-0.5 rounded">{row.presentation}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Dose</span>
                <p className="text-amber-400 font-semibold text-sm mt-0.5">{row.dose}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Indicações</span>
                <p className="text-slate-300 text-sm mt-0.5 leading-relaxed">{row.indications}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Efeitos Adversos</span>
                <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{row.adverseEffects}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60">
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {COL_LABELS[col]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.map((row, i) => (
                <tr key={row.name} className={i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-800/20'}>
                  <td className="px-4 py-4 font-bold text-slate-100 whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono text-xs whitespace-nowrap">{row.presentation}</td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold text-sm ${activeTab === 'vasoactive' ? 'text-amber-400' : 'text-indigo-400'}`}>
                      {row.dose}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300 leading-relaxed max-w-xs">{row.indications}</td>
                  <td className="px-4 py-4 text-slate-400 leading-relaxed max-w-xs">{row.adverseEffects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}