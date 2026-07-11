import React, { useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { calculateDrug, DRUG_CATEGORIES } from '@/data/drugs';
import { getDrugs } from '@/lib/drugStore';
const drugs = getDrugs();
import { ALERT_MESSAGES } from '@/utils/alertMessages';
import { calculateStandardProtocol } from '@/utils/standardProtocolCalcEngine';
import { getReferenceTitle } from '@/data/references';
import { ChevronLeft, AlertTriangle, Info } from 'lucide-react';
import PrescriptionBox from '@/components/PrescriptionBox';

const VOLUME_OPTIONS = [
  { label: '24 ml', value: 24, rate: '1 ml/h' },
  { label: '48 ml', value: 48, rate: '2 ml/h' },
  { label: '72 ml', value: 72, rate: '3 ml/h' },
];

const categoryColor = {
  [DRUG_CATEGORIES.VASOACTIVE]: {
    accent: '#F59E0B',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    label: 'Vasoativa',
  },
  [DRUG_CATEGORIES.SEDATIVE]: {
    accent: 'hsl(var(--secondary))',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    label: 'Sedação',
  },
  [DRUG_CATEGORIES.ANALGESIA]: {
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    label: 'Analgesia',
  },
  [DRUG_CATEGORIES.BNM]: {
    accent: 'hsl(var(--destructive))',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-300 border border-red-500/30',
    label: 'Bloqueador Neuromuscular',
  },
};

export default function DrugCalculator() {
  const { drugId } = useParams();
  const drug = drugs.find((d) => d.id === drugId);
  const colors = drug ? categoryColor[drug.category] : null;

  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState(drug ? drug.doseDefault : '');
  const [totalVolume, setTotalVolume] = useState(24);
  const [activeTab, setActiveTab] = useState('calc');
  const [copied, setCopied] = useState(false);
  const [protocolMode, setProtocolMode] = useState('guia');

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(dose);
    if (!drug || !w || !d || w <= 0 || d <= 0) return null;
    return calculateDrug(drug, w, d, totalVolume);
  }, [drug, weight, dose, totalVolume]);

  const standardResult = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(dose);
    if (!drug || !w || !d || w <= 0 || d <= 0) return null;
    try {
      return calculateStandardProtocol(drug, d, w);
    } catch (e) {
      return { available: false, reason: e.message };
    }
  }, [drug, weight, dose]);

  const doseValue = parseFloat(dose);
  const isDoseOutOfRange = drug && !isNaN(doseValue) && (doseValue < drug.doseMin || doseValue > drug.doseMax);

  const displayDoseMin = protocolMode === 'standard' && drug?.standardProtocol ? drug.standardProtocol.doseMin : drug.doseMin;
  const displayDoseMax = protocolMode === 'standard' && drug?.standardProtocol ? drug.standardProtocol.doseMax : drug.doseMax;

  const weightValue = parseFloat(weight);
  const isWeightUnusual = !isNaN(weightValue) && weightValue > 50;

  const criticalAlerts = (drug?.alerts || []).filter((code) => {
    const sev = ALERT_MESSAGES[code]?.severity;
    return sev === 'black_box' || sev === 'critical';
  });

  const activePrescriptionLines = protocolMode === 'standard'
    ? (standardResult?.available ? standardResult.prescriptionLines : null)
    : (result ? result.prescriptionLines : null);

  const handleCopy = useCallback(() => {
    if (!activePrescriptionLines) return;
    const text = activePrescriptionLines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activePrescriptionLines]);

  if (!drug) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Droga não encontrada.</p>
          <Link to="/" className="text-amber-400 hover:underline">← Voltar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className={`border-b border-slate-800 sticky top-0 z-10 bg-slate-900/95 backdrop-blur`}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-slate-200 transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-slate-100 leading-tight">{drug.name}</h1>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                {colors.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate">{drug.presentation}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 flex gap-1 pb-0">
          {[
            { id: 'calc', label: 'Calculadora' },
            { id: 'info', label: 'Ficha Técnica' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? `border-current ${colors.text}`
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {activeTab === 'calc' && (
          <>
            {/* Inputs */}
            <div className={`rounded-xl border ${colors.border} ${colors.bg} p-5 space-y-5`}>
              {/* Seletor de protocolo */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Protocolo de cálculo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setProtocolMode('guia')}
                    className={`rounded-lg py-2 text-sm font-semibold border transition-all ${
                      protocolMode === 'guia'
                        ? `${colors.bg} ${colors.border} ${colors.text}`
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    Guia
                  </button>
                  <button
                    onClick={() => setProtocolMode('standard')}
                    className={`rounded-lg py-2 text-sm font-semibold border transition-all ${
                      protocolMode === 'standard'
                        ? `${colors.bg} ${colors.border} ${colors.text}`
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    Protocolo Padrão
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Peso */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Peso do paciente
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.5"
                      max="150"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="0,0"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 text-xl font-bold text-slate-100 focus:outline-none focus:border-slate-500 pr-10 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">kg</span>
                  </div>
                </div>

                {/* Dose */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Dose desejada
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={drug.doseMin}
                      max={drug.doseMax}
                      step={drug.doseStep}
                      value={dose}
                      onChange={(e) => setDose(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 text-xl font-bold text-slate-100 focus:outline-none focus:border-slate-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {drug.doseUnit} &nbsp;·&nbsp; {displayDoseMin}–{displayDoseMax}
                  </p>
                </div>
              </div>

              {/* Alerta: dose fora da faixa */}
              {protocolMode === 'guia' && isDoseOutOfRange && (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3">
                  <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm leading-snug">
                    Dose de {dose} {drug.doseUnit} está fora da faixa recomendada ({drug.doseMin}–{drug.doseMax} {drug.doseUnit}).
                  </p>
                </div>
              )}

              {/* Alerta: peso incomum para pediatria */}
              {isWeightUnusual && (
                <div className="flex items-start gap-2 rounded-lg border border-orange-500/40 bg-orange-500/10 p-3">
                  <AlertTriangle size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  <p className="text-orange-300 text-sm leading-snug">
                    Peso de {weight} kg é incomum para a faixa pediátrica. Confira o peso informado.
                  </p>
                </div>
              )}

              {/* Dose tips */}
              {protocolMode === 'guia' && drug.doseTips && (
                <div className="space-y-1">
                  {drug.doseTips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={`font-mono font-semibold ${colors.text}`}>{tip.range}</span>
                      <span className="text-slate-500">→</span>
                      <span className="text-slate-400">{tip.effect}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Volume total */}
              {protocolMode === 'guia' && drug.algorithm !== 'VASOPRESSIN' && drug.algorithm !== 'DEXMEDETOMIDINE' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Volume total de preparo
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {VOLUME_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTotalVolume(opt.value)}
                        className={`rounded-lg py-2 text-sm font-semibold border transition-all ${
                          totalVolume === opt.value
                            ? `${colors.bg} ${colors.border} ${colors.text}`
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {opt.label}
                        <div className="text-xs font-normal opacity-70">{opt.rate}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resultado */}
            {protocolMode === 'standard' ? (
              standardResult ? (
                standardResult.available ? (
                  <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
                    <div className="p-5 text-center border-b border-slate-700">
                      <div className="text-3xl font-bold text-slate-100">{standardResult.rateMlPerHour}</div>
                      <div className="text-xs text-slate-500 mt-1">mL/h — bomba de infusão contínua</div>
                    </div>
                    <div className="p-4 space-y-3">
                      {!standardResult.doseValidation.inRange && (
                        <div className="flex items-start gap-2 rounded-lg border border-orange-500/40 bg-orange-500/10 p-3">
                          <AlertTriangle size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
                          <p className="text-orange-300 text-sm leading-snug">{standardResult.doseValidation.message}</p>
                        </div>
                      )}
                      <div className="text-xs space-y-1">
                        <p className="text-slate-400">
                          Concentração-padrão:{' '}
                          <span className={`font-semibold ${colors.text}`}>
                            {standardResult.concentrationUsed.value} {standardResult.concentrationUsed.unit}
                          </span>
                        </p>
                        <p className="text-slate-600 font-mono break-all">{standardResult.formulaUsed}</p>
                      </div>
                      {standardResult.source && (
                        <p className="text-[11px] text-slate-600 leading-snug">Fonte: {standardResult.source}</p>
                      )}
                    </div>
                    <PrescriptionBox
                      lines={standardResult.prescriptionLines}
                      onCopy={handleCopy}
                      copied={copied}
                      accentText={colors.text}
                      withTopBorder
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info size={15} className="text-slate-400 flex-shrink-0" />
                      <span className="text-slate-400 font-semibold text-sm uppercase tracking-wide">
                        Protocolo Padrão indisponível
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-snug">{standardResult.reason}</p>
                  </div>
                )
              ) : (
                <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-8 text-center">
                  <p className="text-slate-500 text-sm">Informe o peso e a dose para calcular</p>
                </div>
              )
            ) : result ? (
              <>
              {/* Aviso de volume insuficiente */}
              {result.diluentVolumeMl < 0 && (() => {
                const suggestedVol = VOLUME_OPTIONS.find((o) => o.value > result.drugVolumeMl);
                return (
                  <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 p-4 space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle size={15} className="text-orange-400 flex-shrink-0" />
                      <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Volume insuficiente</span>
                    </div>
                    <p className="text-orange-200 text-sm leading-snug">
                      O volume do fármaco ({result.drugVolumeMl} ml) excede o volume total de preparo ({totalVolume} ml).
                    </p>
                    {suggestedVol ? (
                      <p className="text-orange-300 text-sm font-semibold mt-1">
                        → Use o volume de preparo de <button
                          onClick={() => setTotalVolume(suggestedVol.value)}
                          className="underline underline-offset-2 hover:text-orange-100 transition-colors"
                        >{suggestedVol.label} ({suggestedVol.rate})</button> ou superior.
                      </p>
                    ) : (
                      <p className="text-orange-300 text-sm font-semibold mt-1">
                        → Considere reduzir a dose ou aumentar o volume de preparo além de {VOLUME_OPTIONS[VOLUME_OPTIONS.length - 1].label}.
                      </p>
                    )}
                  </div>
                );
              })()}

              <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
                {/* Números resumo */}
                <div className="grid grid-cols-3 divide-x divide-slate-700 border-b border-slate-700">
                  <div className="p-4 text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {result.drugVolumeMl}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">ml do fármaco</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className={`text-2xl font-bold ${result.diluentVolumeMl < 0 ? 'text-orange-400' : 'text-slate-300'}`}>
                      {result.diluentVolumeMl}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">ml de {drug.diluent}</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-slate-100">
                      {result.infusionRateMlH}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">ml/h (BIC)</div>
                  </div>
                </div>

                <PrescriptionBox
                  lines={result.prescriptionLines}
                  onCopy={handleCopy}
                  copied={copied}
                  accentText={colors.text}
                />
              </div>
              </>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-8 text-center">
                <p className="text-slate-500 text-sm">Informe o peso e a dose para calcular</p>
              </div>
            )}

            {/* Nota de cálculo */}
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <Info size={12} className="flex-shrink-0 mt-0.5" />
              <span>{drug.calcNote}</span>
            </div>

            {/* Alertas críticos (tarja preta / risco de vida) */}
            {criticalAlerts.length > 0 && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
                  <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">Atenção</span>
                </div>
                {criticalAlerts.map((code) => (
                  <p key={code} className="text-red-300 text-sm leading-snug">
                    {ALERT_MESSAGES[code]?.message || code}
                  </p>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            <InfoSection title="Apresentação" icon="💊">
              <p className="text-slate-300 text-sm">{drug.presentation}</p>
            </InfoSection>
            <InfoSection title="Classe Terapêutica" icon="🏷️">
              <p className="text-slate-300 text-sm">{drug.therapeuticClass}</p>
            </InfoSection>
            <InfoSection title="Mecanismo de Ação" icon="⚡">
              <p className="text-slate-300 text-sm leading-relaxed">{drug.mechanism}</p>
            </InfoSection>
            <InfoSection title="Indicações" icon="✅">
              <ul className="space-y-1">
                {drug.indications.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current ${colors.text}`} />
                    {ind}
                  </li>
                ))}
              </ul>
            </InfoSection>
            <InfoSection title={`Dose: ${drug.doseMin}–${drug.doseMax} ${drug.doseUnit}`} icon="📊">
              {drug.doseTips && (
                <div className="space-y-2">
                  {drug.doseTips.map((tip, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <span className={`text-sm font-semibold font-mono ${colors.text}`}>{tip.range}</span>
                      <span className="text-sm text-slate-400">{tip.effect}</span>
                    </div>
                  ))}
                </div>
              )}
            </InfoSection>
            <InfoSection title="Efeitos Adversos" icon="⚠️">
              <ul className="space-y-1">
                {drug.adverseEffects.map((ef, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span> {ef}
                  </li>
                ))}
              </ul>
            </InfoSection>
            <InfoSection title="Considerações Especiais" icon="📋">
              <ul className="space-y-1">
                {drug.specialConsiderations.map((c, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-slate-500 mt-0.5">→</span> {c}
                  </li>
                ))}
              </ul>
            </InfoSection>
            {drug.references?.length > 0 && (
              <p className="text-xs text-slate-600 px-1">
                Fonte: {drug.references.map((id) => getReferenceTitle(id)).join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoSection({ title, icon, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}