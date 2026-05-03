import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          Portal do Sion
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Mercado</Link>
          <Link href="/shops" className={styles.navLink}>Lojinhas</Link>
        </nav>
      </div>
    </header>
  );
}
