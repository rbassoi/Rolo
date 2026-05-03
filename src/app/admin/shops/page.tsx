import { shops } from '@/lib/mockData';
import styles from '../admin.module.css';

export default function AdminShops() {
  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Lojinhas</h1>
          <p className={styles.pageSubtitle}>Gerencie os comércios locais cadastrados.</p>
        </div>
        <button className={styles.actionButton}>+ Nova Lojinha</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {shops.map(shop => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>{shop.category}</td>
              <td>{shop.address}</td>
              <td>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold' }}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
