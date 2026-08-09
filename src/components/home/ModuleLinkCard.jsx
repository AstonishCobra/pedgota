import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PALETTES } from '@/modules/registry';
import ModuleIcon from './ModuleIcon';

// Card simples de navegação direta, para módulos ativos que NÃO usam o
// padrão de subcategorias expansíveis do módulo de Infusão (ver
// comentário em registry.js: "Módulos de outros tipos usam apenas
// `route` para navegação direta"). Reutilizável por qualquer módulo
// futuro que siga essa mesma convenção (ex.: Bolus, Emergências, etc.
// quando saírem do status 'soon').
export default function ModuleLinkCard({ module }) {
  const cfg = PALETTES[module.palette];
  return (
    <Link
      to={module.route}
      className={`flex items-center gap-4 p-5 border transition-all ${cfg.cardBorder} ${cfg.cardBg} ${cfg.cardHover}`}>
      
      <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
        <ModuleIcon name={module.iconName} size={20} className={cfg.accent} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-foreground text-base leading-tight">{module.label}</div>
        <div className="text-xs text-muted-foreground mt-0.5 hidden">{module.subtitle}</div>
      </div>
      <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
    </Link>);

}