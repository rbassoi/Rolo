'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import styles from './Header.module.css';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          Portal do Sion
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Mercado</Link>
          <Link href="/shops" className={styles.navLink}>Lojinhas</Link>
          
          <div className={styles.authSection}>
            {!loading && (
              user ? (
                <>
                  <span className={styles.greeting}>Olá, {user.user_metadata?.full_name?.split(' ')[0] || 'sô'}!</span>
                  <button onClick={handleLogout} className={styles.logoutBtn}>Sair</button>
                </>
              ) : (
                <Link href="/login" className={styles.loginBtn}>Entrar / Cadastrar</Link>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
