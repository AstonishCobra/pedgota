import React from 'react';
import { PALETTES } from '@/modules/registry';
import ModuleIcon from './ModuleIcon';

// Card não-clicável pra módulos com status 'soon' — mostra o rótulo e
// um badge "Em breve", sem navegação. Usado tanto na Home (ex.:
// Emergências) quanto no hub Drogas (ex.: Outras Drogas).
export default function ModuleSoonCard({ item }) {
  const cfg = PALETTES[item.palette] ?? PALETTES.slate;
  return (
    <div className={`flex items-center gap-4 p-5 border ${cfg.cardBorder} ${cfg.cardBg} opacity-70 cursor-default`}>
      <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
        <ModuleIcon name={item.iconName} size={20} className={cfg.accent} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-foreground text-base leading-tight">{item.label}</div>
        {item.subtitle && <div className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</div>}
      </div>
      <span className={`text-xs font-semibold px-2 py-1 ${cfg.badge}`}>Em breve</span>
    </div>
  );
}