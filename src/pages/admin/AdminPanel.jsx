import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Plus, Pencil, Trash2, Download, Upload,
  RotateCcw, LogOut, Search, X, AlertTriangle,
} from 'lucide-react';
import { DRUG_CATEGORIES } from '@/data/drugs';
import {
  getDrugs, addDrug, updateDrug, deleteDrug,
  exportJSON, importJSON, resetToBuiltin,
} from '@/lib/drugStore';
import DrugForm from './DrugForm';
import BackupsPanel from './BackupsPanel';

const CATEGORY_LABELS = {
  [DRUG_CATEGORIES.VASOACTIVE]: { label: 'Vasoativa', color: 'text-amber-600 bg-amber-500/10 border-amber-500/30' },
  [DRUG_CATEGORIES.SEDATIVE]: { label: 'Sedação', color: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30' },
  [DRUG_CATEGORIES.ANALGESIA]: { label: 'Analgesia', color: 'text-violet-600 bg-violet-500/10 border-violet-500/30' },
  [DRUG_CATEGORIES.BNM]: { label: 'BNM', color: 'text-red-600 bg-red-500/10 border-red-500/30' },
};

const TABS = ['Medicamentos', 'Backups'];

export default function AdminPanel({ user, onLogout }) {
  const [drugs, setDrugs] = useState(getDrugs);
  const [tab, setTab] = useState('Medicamentos');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);  // drug object or 'new'
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [importError, setImportError] = useState('');
  const fileRef = useRef();

  const filtered = drugs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave(drug) {
    let updated;
    if (editing === 'new') {
      updated = addDrug(drug);
    } else {
      updated = updateDrug(drug.id, drug);
    }
    setDrugs(updated);
    setEditing(null);
  }

  function handleDelete(id) {
    const updated = deleteDrug(id);
    setDrugs(updated);
    setConfirmDelete(null);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const updated = importJSON(ev.target.result);
        setDrugs(updated);
        setImportError('');
        alert(`${updated.length} medicamentos importados com sucesso.`);
      } catch (err) {
        setImportError(err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleReset() {
    if (!confirm('Restaurar todos os medicamentos para os dados originais do app? Esta ação criará um backup antes.')) return;
    const updated = resetToBuiltin();
    setDrugs(updated);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">Painel Administrativo</h1>
            <p className="text-xs text-muted-foreground">
              {drugs.length} medicamentos · {user?.email || 'admin'}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-muted-foreground border border-border hover:border-primary px-3 py-1.5 transition-colors"
          >
            <LogOut size={13} /> Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 flex gap-0">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* ── TAB: MEDICAMENTOS ── */}
        {tab === 'Medicamentos' && (
          <div className="space-y-4">
            {/* Barra de ações */}
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar medicamento..."
                  className="w-full bg-card border border-border pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground">
                    <X size={13} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setEditing('new')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-colors"
              >
                <Plus size={15} /> Novo Medicamento
              </button>
            </div>

            {/* Import / Export / Reset */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportJSON}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <Download size={13} /> Exportar JSON
              </button>
              <button
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <Upload size={13} /> Importar JSON
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <RotateCcw size={13} /> Restaurar Padrão
              </button>
              <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            </div>
            {importError && (
              <div className="flex items-center gap-2 text-red-600 text-xs border border-red-500/30 bg-red-500/10 px-3 py-2">
                <AlertTriangle size={13} /> {importError}
              </div>
            )}

            {/* Lista de medicamentos */}
            <div className="border border-border divide-y divide-border">
              {filtered.length === 0 && (
                <div className="py-10 text-center text-muted-foreground text-sm">Nenhum resultado encontrado.</div>
              )}
              {filtered.map((drug) => {
                const cat = CATEGORY_LABELS[drug.category] ?? { label: drug.category, color: 'text-muted-foreground bg-muted border-border' };
                return (
                  <div key={drug.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-card/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">{drug.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 border leading-none ${cat.color}`}>
                          {cat.label}
                        </span>
                        {drug.alerts?.length > 0 && (
                          <span className="text-[10px] bg-red-500/15 text-red-700 border border-red-500/30 px-1.5 py-0.5 font-bold leading-none">⚠ ALERTA</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{drug.presentation} · {drug.doseMin}–{drug.doseMax} {drug.doseUnit}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => setEditing(drug)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(drug)}
                        className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB: BACKUPS ── */}
        {tab === 'Backups' && (
          <BackupsPanel onRestore={() => setDrugs(getDrugs())} />
        )}

      </div>

      {/* Modal: Formulário de edição/criação */}
      {editing !== null && (
        <DrugForm
          initial={editing === 'new' ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Modal: Confirmação de exclusão */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-card border border-border p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-600" />
              <h3 className="font-bold text-foreground">Excluir Medicamento</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tem certeza que deseja excluir <strong className="text-foreground">{confirmDelete.name}</strong>?
              Um backup automático será criado antes.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm border border-border text-muted-foreground hover:text-foreground transition-colors">
                Cancelar
              </button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="px-4 py-2 text-sm font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-colors">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}