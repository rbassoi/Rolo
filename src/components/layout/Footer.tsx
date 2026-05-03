import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <p>&copy; {new Date().getFullYear()} Portal do Sion. Feito com carinho.</p>
        <p className={styles.tagline}>Apoiando o comércio local do nosso Sion, uai.</p>
      </div>
    </footer>
  );
}
