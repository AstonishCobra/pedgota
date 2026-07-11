import React from 'react';
import { Copy, Check, Zap } from 'lucide-react';

export default function PrescriptionBox({ lines, onCopy, copied, accentText, withTopBorder = false }) {
  return (
    <div className={`p-4 ${withTopBorder ? 'border-t border-slate-700' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap size={14} className={accentText} />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Prescrição
          </span>
        </div>
        <button
          onClick={onCopy}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
              : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
          }`}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <div className="bg-white rounded-lg p-4 border-l-4 border-slate-300">
        <pre className="font-mono text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
          {lines.join('\n')}
        </pre>
      </div>
    </div>
  );
}