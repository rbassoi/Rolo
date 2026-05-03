'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="logo">Portal do Sion</Link>
        <div className="nav-links">
          <Link href="/#mercado" className="active">Mercado</Link>
          <Link href="/shops">Lojinhas</Link>
          <div className="nav-divider"></div>
          {!loading && (
            user ? (
              <>
                <span style={{ fontSize: '14px', color: 'var(--text2)', alignSelf: 'center' }}>
                  Olá, {user.user_metadata?.full_name?.split(' ')[0] || 'sô'}!
                </span>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ cursor: 'pointer' }}>Sair</button>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary">Entrar / Cadastrar</Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
