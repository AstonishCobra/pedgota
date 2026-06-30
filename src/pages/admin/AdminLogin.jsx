import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Activity } from 'lucide-react';
import { checkPassword, setAdminSession } from '@/lib/drugStore';

export default function AdminLogin({ onSuccess }) {
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (checkPassword(pass)) {
      setAdminSession();
      onSuccess();
    } else {
      setError('Senha incorreta.');
      setPass('');
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Activity size={20} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 leading-none">PediDrip</h1>
            <p className="text-xs text-slate-500">Painel Administrativo</p>
          </div>
        </div>

        <div className="border border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-amber-400" />
            <h2 className="text-base font-bold text-slate-200">Acesso Restrito</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => { setPass(e.target.value); setError(''); }}
                  placeholder="Digite a senha"
                  autoFocus
                  className="w-full bg-slate-900 border border-slate-700 px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-amber-500/50 pr-10 placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
              <p className="text-slate-600 text-xs mt-1.5">Padrão: <span className="font-mono">pedidrip2024</span></p>
            </div>

            <button
              type="submit"
              disabled={!pass}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold py-3 text-sm transition-colors"
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}