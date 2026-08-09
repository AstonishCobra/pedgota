import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, AlertTriangle, Info, Copy, Check } from 'lucide-react';
import { antibiotics, getAntibioticCategoryLabel } from '@/data/antibiotics';

// ─── Lógica de cálculo ──────────────────────────────────────────────────────
//
// Ver comentário no topo de antibiotics.js para a convenção de doseUnit.
function calculateDoseMg(indication, weight, doseValue) {
  const { doseUnit, dosesPerDay } = indication;
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

// "8/8h", "12/12h", "6/6h", "24/24h" a partir de dosesPerDay. Dose
// única (mode 'single' ou 'fixed' com 1x) não usa esse rótulo — é
// tratada separadamente como "dose única".
function scheduleLabel(dosesPerDay) {
  if (!dosesPerDay || dosesPerDay <= 0) return '';
  const interval = Math.round(24 / dosesPerDay);
  return `${interval}/${interval}h`;
}

// Rótulo curto pra aba de indicação — remove o horário (ex.: "8/8h",
// "1x/dia") do nome pra economizar espaço. O horário continua visível
// no bloco de receita, onde já aparece o intervalo real.
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

// Formata um valor único ("100") ou uma faixa ("50-100") — usado pra
// volume de diluição e tempo de infusão, que na fonte (HSL) às vezes
// vêm como valor único (padrão institucional) e às vezes como faixa
// (deixada a critério médico, não escolhemos um ponto fixo dentro
// dela).
function rangeLabel(single, min, max, unit) {
  if (single !== undefined && single !== null) return `${single}${unit}`;
  if (min !== undefined && max !== undefined) return `${min}-${max}${unit}`;
  return null;
}

const ROUTE_NAME = { oral: 'Via Oral (VO)', im: 'Via Intramuscular (IM)', ev: 'Via Intravenosa (EV)' };

// ─── Bloco de receita por via ───────────────────────────────────────────────
//
// Formato: Via de administração / Princípio (apresentação/concentração)
// / quantidade em mL, horários, quantidade de dias. Para EV, também
// mostra o volume de diluição.
function PrescriptionBlock({ routeKey, drug, indication, volumeMl, concentration, isSingleDose, durationDays }) {
  if (volumeMl === null || volumeMl === undefined) return null;
  const schedule = isSingleDose ? 'Dose única' : scheduleLabel(indication.dosesPerDay);

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-card/60 overflow-hidden">
      <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/20">
        <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">{ROUTE_NAME[routeKey]}</span>
      </div>
      <div className="p-4 space-y-2.5">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Princípio (apresentação/concentração)</p>
          <p className="text-sm font-medium text-foreground">
            {drug.name} — {concentration?.value}{concentration?.unit}
            {concentration?.note ? ` (${concentration.note})` : ''}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-emerald-600">{round(volumeMl)} mL</span>
          <span className="text-sm text-muted-foreground">
            {isSingleDose ? 'dose única' : `a cada ${schedule.split('/')[0]}h`}
          </span>
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

        {routeKey === 'ev' && concentration?.dilution && (
          <p className="text-sm text-muted-foreground border-t border-border/50 pt-2 mt-2">
            Diluir em{' '}
            <span className="font-medium text-foreground">
              {rangeLabel(concentration.dilution.volume, concentration.dilution.volumeMin, concentration.dilution.volumeMax, concentration.dilution.unit)} de {concentration.dilution.diluent}
            </span>
            {' e infundir em '}
            <span className="font-medium text-foreground">
              {rangeLabel(concentration.dilution.infusionTime, concentration.dilution.infusionMin, concentration.dilution.infusionMax, concentration.dilution.infusionUnit)}
            </span>
            .
          </p>
        )}
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

  const [weight, setWeight] = useState('');
  const [doseValue, setDoseValue] = useState(indication ? indication.doseDefault : '');
  const [durationDays, setDurationDays] = useState(indication ? indication.durationDays : null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (indication) {
      setDoseValue(indication.doseDefault);
      setDurationDays(indication.durationDays);
    }
  }, [indicationIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const doseResult = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(doseValue);
    if (!indication || !w || w <= 0 || Number.isNaN(d)) return null;
    return calculateDoseMg(indication, w, d);
  }, [indication, weight, doseValue]);

  const concentrations = useMemo(() => {
    if (!drug || !indication) return {};
    return indication.concentration ?? drug.concentration ?? {};
  }, [drug, indication]);

  const volumes = useMemo(() => {
    if (!doseResult) return {};
    const perDose = doseResult.perDose;
    const route = indication.route;
    if (route === 'oral') return { oral: volumeFor(perDose, concentrations.oral) };
    if (route === 'im') return { im: volumeFor(perDose, concentrations.im) };
    if (route === 'ev') return { ev: volumeFor(perDose, concentrations.ev) };
    if (route === 'im_ev') {
      return { im: volumeFor(perDose, concentrations.im), ev: volumeFor(perDose, concentrations.ev) };
    }
    return {};
  }, [doseResult, indication, concentrations]);

  const isSingleDose = doseResult && (doseResult.mode === 'single' || (doseResult.mode === 'fixed' && indication?.dosesPerDay === 1 && indication?.durationDays === 1));

  const prescriptionText = useMemo(() => {
    if (!doseResult || !drug || !indication) return '';
    const lines = [`${drug.name} — ${indication.name}`];
    ['oral', 'im', 'ev'].forEach((routeKey) => {
      const vol = volumes[routeKey];
      if (vol === null || vol === undefined) return;
      const c = concentrations[routeKey];
      lines.push('');
      lines.push(ROUTE_NAME[routeKey]);
      lines.push(`${drug.name} ${c?.value}${c?.unit}`);
      if (isSingleDose) {
        lines.push(`${round(vol)}mL — dose única`);
      } else {
        const schedule = scheduleLabel(indication.dosesPerDay);
        lines.push(`${round(vol)}mL a cada ${schedule.split('/')[0]}h, por ${durationDays ? `${durationDays} dias` : '___ dias'}`);
      }
      if (routeKey === 'ev' && c?.dilution) {
        const volLabel = rangeLabel(c.dilution.volume, c.dilution.volumeMin, c.dilution.volumeMax, c.dilution.unit);
        const infLabel = rangeLabel(c.dilution.infusionTime, c.dilution.infusionMin, c.dilution.infusionMax, c.dilution.infusionUnit);
        lines.push(`Diluir em ${volLabel} de ${c.dilution.diluent} e infundir em ${infLabel}.`);
      }
    });
    return lines.join('\n');
  }, [doseResult, drug, indication, volumes, concentrations, isSingleDose, durationDays]);

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
    !Number.isNaN(doseVal) && (doseVal < indication.doseMin || doseVal > indication.doseMax);

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
          <div className="grid grid-cols-2 gap-3">
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
          </div>

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
            <PrescriptionBlock routeKey="oral" drug={drug} indication={indication} volumeMl={volumes.oral} concentration={concentrations.oral} isSingleDose={isSingleDose} durationDays={durationDays} />
            <PrescriptionBlock routeKey="im" drug={drug} indication={indication} volumeMl={volumes.im} concentration={concentrations.im} isSingleDose={isSingleDose} durationDays={durationDays} />
            <PrescriptionBlock routeKey="ev" drug={drug} indication={indication} volumeMl={volumes.ev} concentration={concentrations.ev} isSingleDose={isSingleDose} durationDays={durationDays} />

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