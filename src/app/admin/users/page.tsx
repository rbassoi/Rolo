'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

const initialUsers = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Vendedor' },
  { id: 2, name: 'Maria Mendonça', email: 'maria@email.com', role: 'Comprador' },
  { id: 3, name: 'Carlos Antônio', email: 'carlos@email.com', role: 'Vendedor' },
  { id: 4, name: 'Ana Paula', email: 'ana@email.com', role: 'Admin' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Comprador'
  });

  const openModal = (user?: any) => {
    if (user) {
      setEditingId(user.id);
      setFormData({ name: user.name, email: user.email, role: user.role });
    } else {
      setEditingId(null);
      setFormData({ name: '', email: '', role: 'Comprador' });
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...formData }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja apagar esse usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Usuários</h1>
          <p className={styles.pageSubtitle}>Gerencie quem acessa o portal (Modo Simulação).</p>
        </div>
        <button onClick={() => openModal()} className={styles.actionButton}>+ Novo Usuário</button>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => openModal(user)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold', marginRight: '1rem' }}>Editar</button>
                <button onClick={() => handleDelete(user.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--background-color)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{editingId ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nome</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Função</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  <option value="Comprador">Comprador</option>
                  <option value="Vendedor">Vendedor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--primary-color)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Salvar Usuário</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
