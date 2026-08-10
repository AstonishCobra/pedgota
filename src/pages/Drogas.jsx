import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DRUG_HUB_ITEMS, PALETTES } from '@/modules/registry';
import ModuleIcon from '@/components/home/ModuleIcon';
import ModuleSoonCard from '@/components/home/ModuleSoonCard';

// Hub "Drogas" (/drogas) — reúne as classes farmacológicas do app.
// Hoje só Antibióticos está ativo; "Outras Drogas" é um placeholder
// visual (status 'soon') até que novas classes sejam construídas.
export default function Drogas() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">Drogas</h1>
            <p className="text-xs text-muted-foreground">Antibióticos e outras classes</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-2">
        {DRUG_HUB_ITEMS.map((item) => {
          if (item.status !== 'active') {
            return <ModuleSoonCard key={item.id} item={item} />;
          }
          const cfg = PALETTES[item.palette];
          return (
            <Link
              key={item.id}
              to={item.route}
              className={`flex items-center gap-4 p-5 border transition-all ${cfg.cardBorder} ${cfg.cardBg} ${cfg.cardHover}`}
            >
              <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
                <ModuleIcon name={item.iconName} size={20} className={cfg.accent} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground text-base leading-tight">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}