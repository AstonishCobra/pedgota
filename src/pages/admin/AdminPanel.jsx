import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Plus, Pencil, Trash2, Download, Upload,
  RotateCcw, Shield, Search, X, KeyRound, AlertTriangle,
} from 'lucide-react';
import { DRUG_CATEGORIES } from '@/data/drugs';
import {
  getDrugs, addDrug, updateDrug, deleteDrug,
  exportJSON, importJSON, resetToBuiltin,
  changePassword,
} from '@/lib/drugStore';
import DrugForm from './DrugForm';
import BackupsPanel from './BackupsPanel';

const CATEGORY_LABELS = {
  [DRUG_CATEGORIES.VASOACTIVE]: { label: 'Vasoativa', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  [DRUG_CATEGORIES.SEDATIVE]: { label: 'Sedativo/Analgésico', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  [DRUG_CATEGORIES.BNM]: { label: 'BNM', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
};

const TABS = ['Medicamentos', 'Backups', 'Configurações'];

export default function AdminPanel({ onLock }) {
  const [drugs, setDrugs] = useState(getDrugs);
  const [tab, setTab] = useState('Medicamentos');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);  // drug object or 'new'
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [importError, setImportError] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');
  const [passMsg, setPassMsg] = useState('');
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

  function handleChangePass(e) {
    e.preventDefault();
    if (!newPass) return;
    if (newPass !== newPass2) { setPassMsg('As senhas não coincidem.'); return; }
    if (newPass.length < 6) { setPassMsg('Mínimo 6 caracteres.'); return; }
    changePassword(newPass);
    setNewPass(''); setNewPass2('');
    setPassMsg('Senha alterada com sucesso!');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 sticky top-0 z-10 bg-slate-900/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-slate-200 transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold text-slate-100">Painel Administrativo</h1>
            <p className="text-xs text-slate-500">{drugs.length} medicamentos cadastrados</p>
          </div>
          <button
            onClick={onLock}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 border border-slate-700 hover:border-slate-500 px-3 py-1.5 transition-colors"
          >
            <Shield size={13} /> Sair
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
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
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
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar medicamento..."
                  className="w-full bg-slate-800 border border-slate-700 pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    <X size={13} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setEditing('new')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold transition-colors"
              >
                <Plus size={15} /> Novo Medicamento
              </button>
            </div>

            {/* Import / Export / Reset */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportJSON}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
              >
                <Download size={13} /> Exportar JSON
              </button>
              <button
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
              >
                <Upload size={13} /> Importar JSON
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <RotateCcw size={13} /> Restaurar Padrão
              </button>
              <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            </div>
            {importError && (
              <div className="flex items-center gap-2 text-red-300 text-xs border border-red-500/30 bg-red-500/10 px-3 py-2">
                <AlertTriangle size={13} /> {importError}
              </div>
            )}

            {/* Lista de medicamentos */}
            <div className="border border-slate-800 divide-y divide-slate-800">
              {filtered.length === 0 && (
                <div className="py-10 text-center text-slate-600 text-sm">Nenhum resultado encontrado.</div>
              )}
              {filtered.map((drug) => {
                const cat = CATEGORY_LABELS[drug.category] ?? { label: drug.category, color: 'text-slate-400 bg-slate-700 border-slate-600' };
                return (
                  <div key={drug.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-slate-800/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-200">{drug.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 border leading-none ${cat.color}`}>
                          {cat.label}
                        </span>
                        {drug.alerts?.length > 0 && (
                          <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.5 font-bold leading-none">⚠ ALERTA</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{drug.presentation} · {drug.doseMin}–{drug.doseMax} {drug.doseUnit}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => setEditing(drug)}
                        className="p-2 text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(drug)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
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

        {/* ── TAB: CONFIGURAÇÕES ── */}
        {tab === 'Configurações' && (
          <div className="max-w-sm space-y-6">
            <div className="border border-slate-700 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <KeyRound size={16} className="text-amber-400" />
                <h3 className="font-bold text-slate-200 text-sm">Alterar Senha</h3>
              </div>
              <form onSubmit={handleChangePass} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Nova senha</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => { setNewPass(e.target.value); setPassMsg(''); }}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Confirmar senha</label>
                  <input
                    type="password"
                    value={newPass2}
                    onChange={(e) => { setNewPass2(e.target.value); setPassMsg(''); }}
                    placeholder="Repita a senha"
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600"
                  />
                </div>
                {passMsg && (
                  <p className={`text-xs ${passMsg.includes('sucesso') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {passMsg}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 transition-colors"
                >
                  Alterar Senha
                </button>
              </form>
            </div>
          </div>
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
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-slate-800 border border-slate-700 p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" />
              <h3 className="font-bold text-slate-200">Excluir Medicamento</h3>
            </div>
            <p className="text-sm text-slate-400">
              Tem certeza que deseja excluir <strong className="text-slate-200">{confirmDelete.name}</strong>?
              Um backup automático será criado antes.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                Cancelar
              </button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="px-4 py-2 text-sm font-bold bg-red-500 hover:bg-red-400 text-white transition-colors">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}