import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Table2 } from 'lucide-react';
import { MODULE_REGISTRY, MODULE_TYPES } from '@/modules/registry';
import InfusionModuleCard from '@/components/home/InfusionModuleCard';

// Página própria da Infusão Contínua — antes esse conteúdo (subcategorias
// + Tabela Comparativa) ficava embutido direto na Home; agora Home é só
// um hub de 3 botões (Infusão Contínua / Drogas / Emergências) e cada um
// leva pra sua própria página.
export default function InfusaoContinua() {
  const infusionModule = MODULE_REGISTRY.find((m) => m.type === MODULE_TYPES.INFUSION);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">Infusão Contínua</h1>
            <p className="text-xs text-muted-foreground">{infusionModule?.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-4">
        {infusionModule && <InfusionModuleCard module={infusionModule} />}

        <Link
          to="/comparative"
          className="flex items-center gap-4 p-5 border border-border bg-card hover:bg-muted hover:border-primary/40 transition-all"
        >
          <div className="w-11 h-11 bg-muted flex items-center justify-center flex-shrink-0">
            <Table2 size={18} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground text-base leading-tight">Tabela Comparativa</div>
            <div className="text-xs text-muted-foreground mt-0.5">Indicações, doses e efeitos adversos lado a lado</div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}