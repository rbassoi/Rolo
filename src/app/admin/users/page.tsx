import styles from '../admin.module.css';

const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Vendedor' },
  { id: 2, name: 'Maria Mendonça', email: 'maria@email.com', role: 'Comprador' },
  { id: 3, name: 'Carlos Antônio', email: 'carlos@email.com', role: 'Vendedor' },
  { id: 4, name: 'Ana Paula', email: 'ana@email.com', role: 'Admin' },
];

export default function AdminUsers() {
  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Usuários</h1>
          <p className={styles.pageSubtitle}>Gerencie quem acessa o portal.</p>
        </div>
        <button className={styles.actionButton}>+ Novo Usuário</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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
