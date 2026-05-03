import Link from 'next/link';
import styles from './layout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`container ${styles.adminLayout}`}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Painel Admin</h2>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Resumo</Link>
          <Link href="/admin/users" className={styles.navLink}>Usuários</Link>
          <Link href="/admin/shops" className={styles.navLink}>Lojinhas</Link>
          <Link href="/admin/categories" className={styles.navLink}>Categorias</Link>
          <Link href="/admin/banners" className={styles.navLink}>Banners</Link>
        </nav>
      </aside>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
