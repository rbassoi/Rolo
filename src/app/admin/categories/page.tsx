'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

export const initialCategories = [
  { id: 1, name: 'Padaria', type: 'Lojinhas', status: 'Ativo' },
  { id: 2, name: 'Petshop', type: 'Lojinhas', status: 'Ativo' },
  { id: 3, name: 'Oficina', type: 'Lojinhas', status: 'Ativo' },
  { id: 4, name: 'Eletrônicos', type: 'Rolos', status: 'Ativo' },
  { id: 5, name: 'Móveis', type: 'Rolos', status: 'Ativo' },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Lojinhas',
    status: 'Ativo'
  });

  const openModal = (category?: any) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ name: category.name, type: category.type, status: category.status });
    } else {
      setEditingId(null);
      setFormData({ name: '', type: 'Lojinhas', status: 'Ativo' });
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCategories(categories.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setCategories([...categories, { id: Date.now(), ...formData }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja apagar essa categoria?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Categorias</h1>
          <p className={styles.pageSubtitle}>Gerencie as categorias de Lojinhas e Rolos.</p>
        </div>
        <button onClick={() => openModal()} className={styles.actionButton}>+ Nova Categoria</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome da Categoria</th>
            <th>Tipo de Aplicação</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} style={{ opacity: cat.status === 'Pausado' ? 0.6 : 1 }}>
              <td style={{ fontWeight: 600 }}>{cat.name}</td>
              <td>
                <span style={{ 
                  backgroundColor: cat.type === 'Lojinhas' ? '#e0f2fe' : '#fef08a', 
                  color: cat.type === 'Lojinhas' ? '#0369a1' : '#854d0e',
                  padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                  {cat.type}
                </span>
              </td>
              <td>{cat.status}</td>
              <td>
                <button onClick={() => openModal(cat)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold', marginRight: '1rem' }}>Editar</button>
                <button onClick={() => handleDelete(cat.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--background-color)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nome da Categoria</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tipo de Aplicação</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  <option value="Lojinhas">Lojinhas</option>
                  <option value="Rolos">Rolos</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  <option value="Ativo">Ativo</option>
                  <option value="Pausado">Pausado</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--primary-color)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Salvar Categoria</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
