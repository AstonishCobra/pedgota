import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, AlertTriangle, Info, Copy, Check } from 'lucide-react';
import { antibiotics, getAntibioticCategoryLabel } from '@/data/antibiotics';

// ─── Lógica de cálculo ──────────────────────────────────────────────────────
//
// Ver comentário no topo de antibiotics.js para a convenção de doseUnit,
// incluindo o modo especial 'fixed-by-weight' (dose fixa por faixa de
// peso, sem campo editável — ex.: penicilina G benzatina).

function resolveWeightBracket(weightBrackets, weight) {
  // maxWeight é INCLUSIVO, minWeight é EXCLUSIVO — evita que um peso
  // exatamente no limite caia em duas faixas ao mesmo tempo.
  return weightBrackets.find((b) => {
    const minOk = b.minWeight === undefined || weight > b.minWeight;
    const maxOk = b.maxWeight === undefined || weight <= b.maxWeight;
    return minOk && maxOk;
  });
}

function calculateDoseMg(indication, weight, doseValue) {
  const { doseUnit, dosesPerDay } = indication;

  if (doseUnit === 'fixed-by-weight') {
    const bracket = resolveWeightBracket(indication.weightBrackets, weight);
    if (!bracket) return null;
    return { mode: 'fixed-by-weight', perDose: bracket.doseUI, totalDaily: null, bracket };
  }

  const isPerKg = doseUnit.includes('/kg');
  if (!isPerKg) {
    const perDose = doseValue;
    return { mode: 'fixed', perDose, totalDaily: dosesPerDay > 1 ? perDose * dosesPerDay : null };
  }
  if (doseUnit.includes('/dose')) {
    const perDose = doseValue * weight;
    return { mode: 'per-dose', perDose, totalDaily: perDose * dosesPerDay };
  }
  if (!doseUnit.includes('/dia')) {
    const singleDose = doseValue * weight;
    return { mode: 'single', perDose: singleDose, totalDaily: null };
  }
  const totalDaily = doseValue * weight;
  const perDose = dosesPerDay > 0 ? totalDaily / dosesPerDay : totalDaily;
  return { mode: 'daily', perDose, totalDaily };
}

function round(n, decimals = 2) {
  if (n === null || n === undefined || Number.isNaN(n)) return null;
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

function volumeFor(mgOrUI, concentration) {
  if (!concentration || !concentration.value) return null;
  return mgOrUI / concentration.value;
}

function scheduleLabel(dosesPerDay) {
  if (!dosesPerDay || dosesPerDay <= 0) return '';
  const interval = Math.round(24 / dosesPerDay);
  return `${interval}/${interval}h`;
}

function tabLabel(name) {
  return name
    .replace(/\s*[—–,]\s*\d+x\/dia/g, '')
    .replace(/\s*[—–,]\s*\d+\/\d+h/g, '')
    .replace(/\s*\(\s*\d+x\/dia\s*\)/g, '')
    .replace(/\s*\(\s*\d+\/\d+h\s*\)/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+\)/g, ')')
    .trim();
}

function rangeLabel(single, min, max, unit) {
  if (single !== undefined && single !== null) return `${single}${unit}`;
  if (min !== undefined && max !== undefined) return `${min}-${max}${unit}`;
  return null;
}

// Deriva o "tipo" de via (pra rótulo/cor) a partir da chave de
// concentração — ex.: 'im500', 'im1000', 'im600k' todas viram 'im'.
function routeTypeFromKey(key) {
  if (key.startsWith('oral')) return 'oral';
  if (key.startsWith('im')) return 'im';
  if (key.startsWith('ev')) return 'ev';
  return key;
}

const ROUTE_NAME = { oral: 'Via Oral (VO)', im: 'Via Intramuscular (IM)', ev: 'Via Intravenosa (EV)' };

// ─── Preparo (reconstituição) — SEMPRE renderizado no resultado ────────────
function ReconstitutionBlock({ reconstitution }) {
  if (!reconstitution) return null;
  const items = Array.isArray(reconstitution) ? reconstitution : [reconstitution];
  return (
    <div className="text-sm text-muted-foreground border-t border-border/50 pt-2 mt-2 space-y-1">
      <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Preparo</p>
      {items.map((r, i) => (
        <p key={i}>
          {r.vialLabel ? <span className="font-medium text-foreground">{r.vialLabel}: </span> : null}
          Reconstituir em{' '}
          <span className="font-medium text-foreground">
            {r.diluentVolume}{r.diluentUnit} de {r.diluent}
          </span>
          {r.finalVolume ? ` (volume final: ${r.finalVolume}${r.finalVolumeUnit})` : ''}
        </p>
      ))}
    </div>
  );
}

// ─── Diluição pra infusão EV — SEMPRE renderizada no resultado ─────────────
function DilutionBlock({ dilution }) {
  if (!dilution) return null;
  const volLabel = rangeLabel(dilution.volume, dilution.volumeMin, dilution.volumeMax, dilution.unit);
  const infLabel = rangeLabel(dilution.infusionTime, dilution.infusionMin, dilution.infusionMax, dilution.infusionUnit);
  return (
    <p className="text-sm text-muted-foreground border-t border-border/50 pt-2 mt-2">
      Diluir em{' '}
      <span className="font-medium text-foreground">{volLabel} de {dilution.diluent}</span>
      {infLabel && (
        <>
          {' e infundir em '}
          <span className="font-medium text-foreground">{infLabel}</span>
        </>
      )}
      .
    </p>
  );
}

// ─── Bloco de resultado por via/apresentação ───────────────────────────────
function PrescriptionBlock({ concKey, drug, indication, resultValue, concentration, isSingleDose, durationDays, showUIEquivalent, uiValue }) {
  if (resultValue === null || resultValue === undefined) return null;
  const routeType = routeTypeFromKey(concKey);
  const schedule = isSingleDose ? 'Dose única' : scheduleLabel(indication.dosesPerDay);
  const resultUnit = concentration?.resultUnit ?? 'mL';

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-card/60 overflow-hidden">
      <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/20">
        <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">
          {ROUTE_NAME[routeType]}
        </span>
      </div>
      <div className="p-4 space-y-2.5">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Princípio (apresentação)</p>
          <p className="text-sm font-medium text-foreground">
            {drug.name} — {concentration?.presentationLabel}
          </p>
        </div>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-emerald-600">{round(resultValue)} {resultUnit}</span>
          <span className="text-sm text-muted-foreground">
            {isSingleDose ? 'dose única' : `a cada ${schedule.split('/')[0]}h`}
          </span>
          {showUIEquivalent && (
            <span className="text-sm text-muted-foreground">
              (equivalente a {uiValue?.toLocaleString('pt-BR')} UI)
            </span>
          )}
        </div>

        {!isSingleDose && (
          <p className="text-sm text-muted-foreground">
            Horário: <span className="font-medium text-foreground">{schedule}</span>
            {'  •  '}
            Duração:{' '}
            <span className="font-medium text-foreground">
              {durationDays ? `${durationDays} ${durationDays === 1 ? 'dia' : 'dias'}` : 'definir conforme quadro clínico'}
            </span>
          </p>
        )}

        <ReconstitutionBlock reconstitution={concentration?.reconstitution} />
        <DilutionBlock dilution={concentration?.dilution} />
      </div>
    </div>
  );
}

// ─── Componente ─────────────────────────────────────────────────────────────

export default function AntibioticDetail() {
  const { drugId } = useParams();
  const drug = antibiotics.find((d) => d.id === drugId);

  const [indicationIndex, setIndicationIndex] = useState(0);
  const indication = drug?.indications?.[indicationIndex];
  const isFixedByWeight = indication?.doseUnit === 'fixed-by-weight';

  const [weight, setWeight] = useState('');
  const [doseValue, setDoseValue] = useState(indication && !isFixedByWeight ? indication.doseDefault : '');
  const [durationDays, setDurationDays] = useState(indication ? indication.durationDays : null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (indication) {
      setDoseValue(indication.doseUnit === 'fixed-by-weight' ? '' : indication.doseDefault);
      setDurationDays(indication.durationDays);
    }
  }, [indicationIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const weightNum = parseFloat(weight);

  const doseResult = useMemo(() => {
    if (!indication || !weightNum || weightNum <= 0) return null;
    if (indication.doseUnit === 'fixed-by-weight') {
      return calculateDoseMg(indication, weightNum, null);
    }
    const d = parseFloat(doseValue);
    if (Number.isNaN(d)) return null;
    return calculateDoseMg(indication, weightNum, d);
  }, [indication, weightNum, doseValue]);

  const concentrations = useMemo(() => {
    if (!drug || !indication) return {};
    return indication.concentration ?? drug.concentration ?? {};
  }, [drug, indication]);

  const results = useMemo(() => {
    if (!doseResult || !indication) return {};
    const out = {};
    (indication.route ?? []).forEach((key) => {
      out[key] = volumeFor(doseResult.perDose, concentrations[key]);
    });
    return out;
  }, [doseResult, indication, concentrations]);

  const isSingleDose = doseResult && (
    doseResult.mode === 'single' ||
    doseResult.mode === 'fixed-by-weight' ||
    (doseResult.mode === 'fixed' && indication?.dosesPerDay === 1 && indication?.durationDays === 1)
  );

  // Pra drogas em UI (ex.: penicilina benzatina), mostrar o
  // equivalente em UI ao lado do resultado em mL.
  const showUIEquivalent = doseResult && (indication?.doseUnit === 'UI' || indication?.doseUnit === 'fixed-by-weight');

  const prescriptionText = useMemo(() => {
    if (!doseResult || !drug || !indication) return '';
    const lines = [`${drug.name} — ${indication.name}`];
    (indication.route ?? []).forEach((key) => {
      const val = results[key];
      if (val === null || val === undefined) return;
      const c = concentrations[key];
      const routeType = routeTypeFromKey(key);
      lines.push('');
      lines.push(`${ROUTE_NAME[routeType]} — ${c?.presentationLabel ?? ''}`);
      if (isSingleDose) {
        lines.push(`${round(val)} ${c?.resultUnit ?? 'mL'} — dose única${showUIEquivalent ? ` (equivalente a ${doseResult.perDose.toLocaleString('pt-BR')} UI)` : ''}`);
      } else {
        const schedule = scheduleLabel(indication.dosesPerDay);
        lines.push(`${round(val)} ${c?.resultUnit ?? 'mL'} a cada ${schedule.split('/')[0]}h, por ${durationDays ? `${durationDays} dias` : '___ dias'}`);
      }
      if (c?.reconstitution) {
        const items = Array.isArray(c.reconstitution) ? c.reconstitution : [c.reconstitution];
        items.forEach((r) => {
          lines.push(`Preparo${r.vialLabel ? ` (${r.vialLabel})` : ''}: reconstituir em ${r.diluentVolume}${r.diluentUnit} de ${r.diluent}${r.finalVolume ? ` (volume final ${r.finalVolume}${r.finalVolumeUnit})` : ''}.`);
        });
      }
      if (c?.dilution) {
        const volLabel = rangeLabel(c.dilution.volume, c.dilution.volumeMin, c.dilution.volumeMax, c.dilution.unit);
        const infLabel = rangeLabel(c.dilution.infusionTime, c.dilution.infusionMin, c.dilution.infusionMax, c.dilution.infusionUnit);
        lines.push(`Diluir em ${volLabel} de ${c.dilution.diluent}${infLabel ? ` e infundir em ${infLabel}` : ''}.`);
      }
    });
    return lines.join('\n');
  }, [doseResult, drug, indication, results, concentrations, isSingleDose, durationDays, showUIEquivalent]);

  const handleCopy = () => {
    if (!prescriptionText) return;
    navigator.clipboard.writeText(prescriptionText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!drug) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Antibiótico não encontrado.</p>
          <Link to="/antibioticos" className="text-emerald-600 hover:underline">← Voltar</Link>
        </div>
      </div>
    );
  }

  const doseVal = parseFloat(doseValue);
  const isDoseOutOfRange =
    !isFixedByWeight && !Number.isNaN(doseVal) && (doseVal < indication.doseMin || doseVal > indication.doseMax);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/antibioticos" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-foreground leading-tight">{drug.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                {getAntibioticCategoryLabel(drug.category)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{drug.therapeuticClass}</p>
          </div>
        </div>

        {drug.indications.length > 1 && (
          <div className="max-w-2xl mx-auto px-4 flex gap-1 pb-2 overflow-x-auto">
            {drug.indications.map((ind, i) => (
              <button
                key={i}
                onClick={() => setIndicationIndex(i)}
                className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap rounded-full border transition-colors ${
                  i === indicationIndex
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                    : 'bg-card border-border text-foreground/80 hover:border-emerald-500/40 hover:text-foreground'
                }`}
              >
                {tabLabel(ind.name)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Inputs */}
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5 space-y-4">
          <div className={`grid gap-3 ${isFixedByWeight ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Peso (kg)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
                className="w-full bg-card border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Campo de dose OCULTO quando a dose é fixa por faixa de
                peso (ex.: penicilina benzatina) — não editável. */}
            {!isFixedByWeight && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Dose ({indication.doseUnit})
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={doseValue}
                  onChange={(e) => setDoseValue(e.target.value)}
                  className={`w-full bg-card border px-3 py-2.5 text-sm text-foreground focus:outline-none transition-colors ${
                    isDoseOutOfRange ? 'border-orange-500' : 'border-border focus:border-emerald-500'
                  }`}
                />
                <p className="text-xs text-muted-foreground">
                  Faixa: {indication.doseMin}–{indication.doseMax} {indication.doseUnit}
                </p>
              </div>
            )}
          </div>

          {isFixedByWeight && doseResult?.bracket && (
            <div className="text-xs text-muted-foreground bg-card/50 border border-border px-3 py-2 rounded-lg">
              Faixa de peso aplicada: <span className="font-medium text-foreground">{doseResult.bracket.label}</span>
              {' → '}
              <span className="font-medium text-foreground">{doseResult.bracket.doseUI.toLocaleString('pt-BR')} UI</span>, dose única (não editável).
            </div>
          )}

          {!isSingleDose && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Duração do tratamento (dias)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={durationDays ?? ''}
                onChange={(e) => setDurationDays(e.target.value ? parseInt(e.target.value, 10) : null)}
                placeholder="definir conforme quadro clínico"
                className="w-full bg-card border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          )}

          {isDoseOutOfRange && (
            <div className="flex items-start gap-2 text-xs text-orange-700 bg-orange-500/10 border border-orange-500/30 px-3 py-2 rounded-lg">
              <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
              <span>Dose fora da faixa recomendada para esta indicação.</span>
            </div>
          )}
        </div>

        {/* Receita */}
        {doseResult ? (
          <div className="space-y-3">
            {(indication.route ?? []).map((key) => (
              <PrescriptionBlock
                key={key}
                concKey={key}
                drug={drug}
                indication={indication}
                resultValue={results[key]}
                concentration={concentrations[key]}
                isSingleDose={isSingleDose}
                durationDays={durationDays}
                showUIEquivalent={showUIEquivalent}
                uiValue={doseResult.perDose}
              />
            ))}

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-emerald-500/40 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? 'Copiado' : 'Copiar receita'}
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card/30 p-6 text-center">
            <p className="text-muted-foreground text-sm">Informe o peso para calcular</p>
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>{indication.calcNote}</span>
        </div>

        {indication.ageWarning && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm leading-snug">{indication.ageWarning}</p>
            </div>
          </div>
        )}

        {indication.alerts?.length > 0 && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">Atenção</span>
            </div>
            {indication.alerts.map((alert, i) => (
              <p key={i} className="text-red-700 text-sm leading-snug">{alert}</p>
            ))}
          </div>
        )}

        {indication.specialConsiderations?.length > 0 && (
          <InfoSection title="Considerações" icon="📋">
            <ul className="space-y-1.5">
              {indication.specialConsiderations.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">→</span> {c}
                </li>
              ))}
            </ul>
          </InfoSection>
        )}

        <InfoSection title="Apresentação" icon="💊">
          {Array.isArray(drug.presentation) ? (
            <ul className="space-y-1">
              {drug.presentation.map((p, i) => (
                <li key={i} className="text-sm text-muted-foreground">{p}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">{drug.presentation}</p>
          )}
        </InfoSection>

        <InfoSection title="Fonte" icon="📚">
          <p className="text-xs text-muted-foreground leading-relaxed">{indication.source}</p>
        </InfoSection>
      </div>
    </div>
  );
}

function InfoSection({ title, icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span>{icon}</span>
        <h3 className="flex-1 text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h3>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}