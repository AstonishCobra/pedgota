import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, Info } from 'lucide-react';
import { antibiotics, getAntibioticCategoryLabel } from '@/data/antibiotics';

// ─── Lógica de cálculo ──────────────────────────────────────────────────────
//
// Ver comentário no topo de antibiotics.js para a convenção de doseUnit.
// Aqui, além da dose em mg/UI, calculamos o VOLUME correspondente usando
// a concentração da droga (drug.concentration), que varia por via
// ('oral' | 'im' | 'ev'). Quando a indicação é 'im_ev', calculamos os
// dois volumes (IM e EV) — o resultado final mostrado ao usuário é
// sempre em mL, nunca só em mg.
function calculateDoseMg(indication, weight, doseValue) {
  const { doseUnit, dosesPerDay } = indication;
  const isPerKg = doseUnit.includes('/kg');

  if (!isPerKg) {
    // Dose fixa por faixa de peso — não multiplica (ex.: penicilina benzatina).
    const perDose = doseValue;
    return { mode: 'fixed', perDose, totalDaily: dosesPerDay > 1 ? perDose * dosesPerDay : null };
  }
  if (doseUnit.includes('/dose')) {
    const perDose = doseValue * weight;
    return { mode: 'per-dose', perDose, totalDaily: perDose * dosesPerDay };
  }
  if (!doseUnit.includes('/dia')) {
    // 'mg/kg' puro — dose única para o tratamento inteiro.
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

// Rótulos usados nos cartões de resultado, por via.
const ROUTE_LABEL = {
  oral: 'Via oral',
  im: 'Via IM',
  ev: 'Via EV',
};

function VolumeCard({ label, volumeMl, concentration, extra }) {
  if (volumeMl === null) return null;
  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-emerald-600">{round(volumeMl)}</span>
        <span className="text-sm text-muted-foreground">mL por tomada</span>
      </div>
      {concentration?.note && (
        <p className="text-xs text-muted-foreground mt-1">
          Concentração: {concentration.value}{concentration.unit} — {concentration.note}
        </p>
      )}
      {extra}
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

  useEffect(() => {
    if (indication) setDoseValue(indication.doseDefault);
  }, [indicationIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const doseResult = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(doseValue);
    if (!indication || !w || w <= 0 || Number.isNaN(d)) return null;
    return calculateDoseMg(indication, w, d);
  }, [indication, weight, doseValue]);

  // Concentração(ões) relevante(s) pra esta indicação, considerando
  // override no nível da indicação (ex.: ajuste renal do
  // amoxicilina-clavulanato usa concentração diferente da posologia geral).
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
      return {
        im: volumeFor(perDose, concentrations.im),
        ev: volumeFor(perDose, concentrations.ev),
      };
    }
    return {};
  }, [doseResult, indication, concentrations]);

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
      {/* Header */}
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
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-full border transition-colors ${
                  i === indicationIndex
                    ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/40'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Calculadora */}
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5 space-y-5">
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

          {isDoseOutOfRange && (
            <div className="flex items-start gap-2 text-xs text-orange-700 bg-orange-500/10 border border-orange-500/30 px-3 py-2 rounded-lg">
              <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
              <span>Dose fora da faixa recomendada para esta indicação.</span>
            </div>
          )}

          {doseResult ? (
            <div className="space-y-3">
              {volumes.oral !== undefined && volumes.oral !== null && (
                <VolumeCard
                  label={`${ROUTE_LABEL.oral} — suspensão`}
                  volumeMl={volumes.oral}
                  concentration={concentrations.oral}
                />
              )}
              {volumes.im !== undefined && volumes.im !== null && (
                <VolumeCard
                  label={`${ROUTE_LABEL.im} — aspirar e aplicar`}
                  volumeMl={volumes.im}
                  concentration={concentrations.im}
                />
              )}
              {volumes.ev !== undefined && volumes.ev !== null && (
                <VolumeCard
                  label={`${ROUTE_LABEL.ev} — diluir e infundir`}
                  volumeMl={volumes.ev}
                  concentration={concentrations.ev}
                  extra={
                    <p className="text-xs text-muted-foreground mt-1">
                      Volume da solução reconstituída antes de diluir — ver instruções de infusão nas considerações abaixo.
                    </p>
                  }
                />
              )}
              {doseResult.totalDaily !== null && (
                <div className="text-sm text-muted-foreground text-center">
                  Dose diária total: {round(doseResult.totalDaily)} {indication.doseUnit.includes('UI') ? 'UI' : 'mg'}
                  {' '}({indication.dosesPerDay}x/dia)
                </div>
              )}
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
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}