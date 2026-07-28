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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Activity size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-none">PediDrip</h1>
            <p className="text-xs text-muted-foreground">Painel Administrativo</p>
          </div>
        </div>

        <div className="border border-border bg-card p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-primary" />
            <h2 className="text-base font-bold text-foreground">Acesso Restrito</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => { setPass(e.target.value); setError(''); }}
                  placeholder="Digite a senha"
                  autoFocus
                  className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 pr-10 placeholder:text-muted-foreground/60"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p className="text-destructive text-xs mt-1.5">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={!pass}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-bold py-3 text-sm transition-colors rounded-lg"
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}