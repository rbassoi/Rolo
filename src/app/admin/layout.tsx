'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== 'admin@portaldosion.com.br') {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== 'admin@portaldosion.com.br') {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text2)' }}>Verificando credenciais de administrador...</div>;
  }

  return (
    <div className="container" style={{ display: 'flex', gap: '32px', padding: '40px 24px', minHeight: 'calc(100vh - 150px)', alignItems: 'flex-start' }}>
      <aside style={{ width: '240px', flexShrink: 0, position: 'sticky', top: '100px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px' }}>Painel Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/admin" style={{ padding: '10px 14px', borderRadius: '8px', background: pathname === '/admin' ? 'var(--accent-glow)' : 'transparent', color: pathname === '/admin' ? 'var(--accent)' : 'var(--text2)', textDecoration: 'none', fontWeight: pathname === '/admin' ? 700 : 500 }}>Resumo</Link>
          <Link href="/admin/users" style={{ padding: '10px 14px', borderRadius: '8px', background: pathname === '/admin/users' ? 'var(--accent-glow)' : 'transparent', color: pathname === '/admin/users' ? 'var(--accent)' : 'var(--text2)', textDecoration: 'none', fontWeight: pathname === '/admin/users' ? 700 : 500 }}>Usuários</Link>
          <Link href="/admin/shops" style={{ padding: '10px 14px', borderRadius: '8px', background: pathname === '/admin/shops' ? 'var(--accent-glow)' : 'transparent', color: pathname === '/admin/shops' ? 'var(--accent)' : 'var(--text2)', textDecoration: 'none', fontWeight: pathname === '/admin/shops' ? 700 : 500 }}>Lojinhas</Link>
          <Link href="/admin/categories" style={{ padding: '10px 14px', borderRadius: '8px', background: pathname === '/admin/categories' ? 'var(--accent-glow)' : 'transparent', color: pathname === '/admin/categories' ? 'var(--accent)' : 'var(--text2)', textDecoration: 'none', fontWeight: pathname === '/admin/categories' ? 700 : 500 }}>Categorias</Link>
          <Link href="/admin/banners" style={{ padding: '10px 14px', borderRadius: '8px', background: pathname === '/admin/banners' ? 'var(--accent-glow)' : 'transparent', color: pathname === '/admin/banners' ? 'var(--accent)' : 'var(--text2)', textDecoration: 'none', fontWeight: pathname === '/admin/banners' ? 700 : 500 }}>Banners</Link>
        </nav>
      </aside>
      <div style={{ flex: 1, background: 'var(--bg2)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px' }}>
        {children}
      </div>
    </div>
  );
}
