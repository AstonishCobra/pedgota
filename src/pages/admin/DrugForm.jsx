import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { DRUG_CATEGORIES } from '@/data/drugs';

const CALC_TYPES = [
  'standard_1_44',
  'mg_divided',
  'fentanil',
  'midazolam',
  'cetamina',
  'dexmedetomidina',
  'vasopressina',
  'rocuronio',
];

const EMPTY = {
  id: '',
  name: '',
  category: DRUG_CATEGORIES.VASOACTIVE,
  presentation: '',
  therapeuticClass: '',
  mechanism: '',
  indications: [''],
  doseUnit: 'mcg/kg/min',
  doseMin: 0,
  doseMax: 0,
  doseStep: 0.1,
  doseDefault: 0,
  doseTips: [],
  adverseEffects: [''],
  specialConsiderations: [''],
  alerts: [],
  diluent: 'SF 0,9%',
  calcType: 'standard_1_44',
  concentration_mg_per_ml: 1,
  doseUnitIsMilligram: false,
  calcNote: '',
};

function ListEditor({ label, items, onChange, placeholder }) {
  function update(i, val) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }
  function add() { onChange([...items, '']); }
  function remove(i) { onChange(items.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600"
            />
            <button onClick={() => remove(i)} className="text-slate-600 hover:text-red-400 px-2">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors mt-1">
          <Plus size={12} /> Adicionar
        </button>
      </div>
    </div>
  );
}

function DoseTipsEditor({ tips, onChange }) {
  function update(i, field, val) {
    const next = [...tips];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  }
  function add() { onChange([...tips, { range: '', effect: '' }]); }
  function remove(i) { onChange(tips.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dose Tips (opcional)</label>
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={tip.range}
              onChange={(e) => update(i, 'range', e.target.value)}
              placeholder="Ex: 5–10 mcg/kg/min"
              className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600"
            />
            <input
              value={tip.effect}
              onChange={(e) => update(i, 'effect', e.target.value)}
              placeholder="Efeito esperado"
              className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600"
            />
            <button onClick={() => remove(i)} className="text-slate-600 hover:text-red-400 px-2">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button onClick={add} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors">
          <Plus size={12} /> Adicionar faixa de dose
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, type = 'text', placeholder, step, min, max }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
      placeholder={placeholder}
      step={step}
      min={min}
      max={max}
      className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export default function DrugForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSave() {
    if (!form.name.trim()) return alert('Nome é obrigatório.');
    // Limpar arrays vazios
    const clean = {
      ...form,
      id: form.id || form.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
      indications: form.indications.filter(Boolean),
      adverseEffects: form.adverseEffects.filter(Boolean),
      specialConsiderations: form.specialConsiderations.filter(Boolean),
      alerts: form.alerts.filter(Boolean),
    };
    onSave(clean);
  }

  const isEdit = !!initial;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-slate-800 border border-slate-700">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <h2 className="font-bold text-slate-100 text-base">
              {isEdit ? `Editando: ${initial.name}` : 'Novo Medicamento'}
            </h2>
            <button onClick={onCancel} className="text-slate-500 hover:text-slate-200">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Identificação */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nome *">
                <Input value={form.name} onChange={(v) => set('name', v)} placeholder="Ex: Adrenalina" />
              </Field>
              <Field label="Categoria">
                <Select
                  value={form.category}
                  onChange={(v) => set('category', v)}
                  options={[
                    { value: DRUG_CATEGORIES.VASOACTIVE, label: 'Vasoativa' },
                    { value: DRUG_CATEGORIES.SEDATIVE, label: 'Sedativo/Analgésico' },
                    { value: DRUG_CATEGORIES.BNM, label: 'Bloqueador Neuromuscular' },
                  ]}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Apresentação">
                <Input value={form.presentation} onChange={(v) => set('presentation', v)} placeholder="Ex: Ampola 1 mg/ml" />
              </Field>
              <Field label="Classe Terapêutica">
                <Input value={form.therapeuticClass} onChange={(v) => set('therapeuticClass', v)} placeholder="Ex: Simpaticomimético" />
              </Field>
            </div>

            <Field label="Mecanismo de Ação">
              <textarea
                value={form.mechanism}
                onChange={(e) => set('mechanism', e.target.value)}
                rows={3}
                placeholder="Descreva o mecanismo de ação..."
                className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-600 resize-none"
              />
            </Field>

            {/* Dose */}
            <div className="border border-slate-700 p-4 space-y-4">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Dose</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Unidade de Dose">
                  <Input value={form.doseUnit} onChange={(v) => set('doseUnit', v)} placeholder="mcg/kg/min" />
                </Field>
                <Field label="Dose Padrão">
                  <Input type="number" value={form.doseDefault} onChange={(v) => set('doseDefault', v)} step={0.01} />
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Dose Mínima">
                  <Input type="number" value={form.doseMin} onChange={(v) => set('doseMin', v)} step={0.01} />
                </Field>
                <Field label="Dose Máxima">
                  <Input type="number" value={form.doseMax} onChange={(v) => set('doseMax', v)} step={0.01} />
                </Field>
                <Field label="Step">
                  <Input type="number" value={form.doseStep} onChange={(v) => set('doseStep', v)} step={0.001} />
                </Field>
              </div>
              <DoseTipsEditor tips={form.doseTips || []} onChange={(v) => set('doseTips', v)} />
            </div>

            {/* Fórmula de cálculo */}
            <div className="border border-slate-700 p-4 space-y-4">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Fórmula de Cálculo</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tipo de Cálculo">
                  <Select
                    value={form.calcType}
                    onChange={(v) => set('calcType', v)}
                    options={CALC_TYPES.map((t) => ({ value: t, label: t }))}
                  />
                </Field>
                <Field label="Concentração (mg/ml)">
                  <Input type="number" value={form.concentration_mg_per_ml ?? ''} onChange={(v) => set('concentration_mg_per_ml', v)} step={0.01} placeholder="mg/ml" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Diluente">
                  <Input value={form.diluent} onChange={(v) => set('diluent', v)} placeholder="SF 0,9%" />
                </Field>
              </div>
              <Field label="Nota de Cálculo">
                <Input value={form.calcNote} onChange={(v) => set('calcNote', v)} placeholder="Fórmula legível..." />
              </Field>
            </div>

            {/* Listas */}
            <ListEditor label="Indicações" items={form.indications} onChange={(v) => set('indications', v)} placeholder="Indicação clínica..." />
            <ListEditor label="Efeitos Adversos" items={form.adverseEffects} onChange={(v) => set('adverseEffects', v)} placeholder="Efeito adverso..." />
            <ListEditor label="Considerações Especiais" items={form.specialConsiderations} onChange={(v) => set('specialConsiderations', v)} placeholder="Consideração..." />
            <ListEditor label="Alertas Críticos" items={form.alerts} onChange={(v) => set('alerts', v)} placeholder="⚠ Alerta importante..." />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-700 bg-slate-800/80">
            <button onClick={onCancel} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 transition-colors">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-6 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 transition-colors">
              {isEdit ? 'Salvar Alterações' : 'Adicionar Medicamento'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}