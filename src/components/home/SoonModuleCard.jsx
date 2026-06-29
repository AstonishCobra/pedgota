import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PALETTES } from '@/modules/registry';
import ModuleIcon from './ModuleIcon';

export default function SoonModuleCard({ module }) {
  const cfg = PALETTES[module.palette];

  return (
    <div className={`border flex items-center gap-4 p-5 opacity-60 ${cfg.cardBorder} ${cfg.cardBg}`}>
      <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
        <ModuleIcon name={module.iconName} size={20} className={cfg.accent} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-200 text-base leading-tight">{module.label}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-slate-700 text-slate-400 border border-slate-600 leading-none">
            Em breve
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 hidden">{module.subtitle}</p>
      </div>
      <ChevronRight size={16} className="text-slate-700 flex-shrink-0" />
    </div>);

}