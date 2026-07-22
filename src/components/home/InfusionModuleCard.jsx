import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getDrugs } from '@/lib/drugStore';
const drugs = getDrugs();
import { PALETTES } from '@/modules/registry';
import ModuleIcon from './ModuleIcon';

function SubcategorySection({ sub }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = PALETTES[sub.palette];
  const drugList = drugs.filter((d) => d.category === sub.drugCategory);

  return (
    <div className={`border transition-all duration-200 overflow-hidden ${cfg.cardBorder} ${cfg.cardBg} ${cfg.cardHover}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
          <ModuleIcon name={sub.iconName} size={20} className={cfg.accent} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-foreground text-base leading-tight">{sub.label}</h2>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs font-semibold px-2 py-1 ${cfg.iconBg} ${cfg.accent}`}>
            {drugList.length} {drugList.length === 1 ? 'droga' : 'drogas'}
          </span>
          <ChevronRight
            size={16}
            className={`text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border/50 divide-y divide-border/30">
          {drugList.map((drug) => (
            <Link
              key={drug.id}
              to={`/drug/${drug.id}`}
              className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${cfg.rowHover}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground">{drug.name}</span>
                  {drug.alerts?.length > 0 && (
                    <span className="text-xs bg-red-500/15 text-red-700 border border-red-500/30 px-1.5 py-0.5 font-medium leading-none">
                      ⚠
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{drug.presentation}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-xs font-semibold ${cfg.accent}`}>
                  {drug.doseMin}–{drug.doseMax}
                </div>
                <div className="text-xs text-muted-foreground">{drug.doseUnit}</div>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InfusionModuleCard({ module }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1 mb-3">
        {module.label}
      </p>
      {module.subcategories.map((sub) => (
        <SubcategorySection key={sub.id} sub={sub} />
      ))}
    </div>
  );
}