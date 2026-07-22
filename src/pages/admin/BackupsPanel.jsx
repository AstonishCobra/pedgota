import React, { useState } from 'react';
import { RotateCcw, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { getBackups, restoreBackup, deleteBackup } from '@/lib/drugStore';

export default function BackupsPanel({ onRestore }) {
  const [backups, setBackups] = useState(getBackups);
  const [expanded, setExpanded] = useState(null);

  function handleRestore(ts) {
    if (!confirm('Restaurar este backup? O estado atual será salvo como um novo backup antes.')) return;
    restoreBackup(ts);
    setBackups(getBackups());
    onRestore();
  }

  function handleDelete(ts) {
    if (!confirm('Excluir este backup permanentemente?')) return;
    deleteBackup(ts);
    setBackups(getBackups());
  }

  function fmt(ts) {
    return new Date(ts).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  }

  if (backups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-sm">Nenhum backup automático salvo ainda.</p>
        <p className="text-muted-foreground/70 text-xs mt-1">Backups são criados automaticamente a cada alteração.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-4">
        {backups.length} backup{backups.length !== 1 ? 's' : ''} disponível{backups.length !== 1 ? 'is' : ''} · máx. 20
      </p>
      {backups.map((b) => (
        <div key={b.timestamp} className="border border-border bg-card rounded-lg">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => setExpanded(expanded === b.timestamp ? null : b.timestamp)}
              className="text-muted-foreground hover:text-foreground"
            >
              {expanded === b.timestamp ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-mono text-foreground">{fmt(b.timestamp)}</span>
              <span className="text-xs text-muted-foreground ml-3">{b.data.length} medicamentos</span>
            </div>
            <button
              onClick={() => handleRestore(b.timestamp)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors rounded-lg"
            >
              <RotateCcw size={12} /> Restaurar
            </button>
            <button
              onClick={() => handleDelete(b.timestamp)}
              className="text-muted-foreground hover:text-destructive px-2"
            >
              <Trash2 size={14} />
            </button>
          </div>
          {expanded === b.timestamp && (
            <div className="border-t border-border px-4 py-3 bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">Medicamentos neste backup:</p>
              <div className="flex flex-wrap gap-1.5">
                {b.data.map((d) => (
                  <span key={d.id} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{d.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}