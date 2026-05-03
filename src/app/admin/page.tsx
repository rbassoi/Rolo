import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Resumo do Portal</h1>
      <p className={styles.pageSubtitle}>Visão geral do que tá rolando no Sion.</p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total de Usuários</h3>
          <p className={styles.statValue}>142</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Lojinhas Ativas</h3>
          <p className={styles.statValue}>4</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Rolos (Anúncios)</h3>
          <p className={styles.statValue}>28</p>
        </div>
      </div>
    </div>
  );
}
