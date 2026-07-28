import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, Lock, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import AdminPanel from './admin/AdminPanel';

export default function Admin() {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin, logout } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Lock size={22} className="text-primary" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-1">Acesso restrito</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Você precisa estar autenticado como administrador para acessar o painel.
          </p>
          <button
            onClick={navigateToLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-sm transition-colors rounded-lg"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 bg-destructive/15 border border-destructive/30 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={22} className="text-destructive" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-1">Permissão negada</h1>
          <p className="text-sm text-muted-foreground mb-1">
            Sua conta não tem privilégios de administrador.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Usuário: {user?.email || '—'} · Papel: {user?.role || '—'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors rounded-lg"
          >
            <Activity size={14} /> Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return <AdminPanel user={user} onLogout={() => logout(true)} />;
}