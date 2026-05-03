'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Shop } from '@/types';
import { initialCategories } from '../categories/page';
import styles from '../admin.module.css';

export default function AdminShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: initialCategories.filter(c => c.type === 'Lojinhas')[0]?.name || '',
    address: '',
    district: 'Sion',
    city: 'Belo Horizonte',
    phone: '',
    hours: ''
  });

  const fetchShops = async () => {
    setLoading(true);
    const { data } = await supabase.from('shops').select('*').order('created_at', { ascending: false });
    if (data) setShops(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const openModal = (shop?: Shop) => {
    if (shop) {
      setEditingId(shop.id);
      setFormData({
        name: shop.name,
        description: shop.description,
        category: shop.category,
        address: shop.address,
        district: shop.district || 'Sion',
        city: shop.city || 'Belo Horizonte',
        phone: shop.phone || '',
        hours: shop.hours || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', category: '', address: '', district: 'Sion', city: 'Belo Horizonte', phone: '', hours: '' });
    }
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('shops').update(formData).eq('id', editingId);
    } else {
      await supabase.from('shops').insert([formData]);
    }
    setModalOpen(false);
    fetchShops();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja apagar essa lojinha?')) {
      await supabase.from('shops').delete().eq('id', id);
      fetchShops();
    }
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Lojinhas</h1>
          <p className={styles.pageSubtitle}>Gerencie os comércios locais cadastrados.</p>
        </div>
        <button onClick={() => openModal()} className={styles.actionButton}>+ Nova Lojinha</button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
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
                  <button onClick={() => openModal(shop)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold', marginRight: '1rem' }}>Editar</button>
                  <button onClick={() => handleDelete(shop.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }}>Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--background-color)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{editingId ? 'Editar Lojinha' : 'Nova Lojinha'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nome</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoria</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  {initialCategories.filter(c => c.type === 'Lojinhas' && c.status === 'Ativo').map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Endereço Completo</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Descrição</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '80px' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Telefone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Horário (ex: 08h-18h)</label>
                  <input type="text" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--primary-color)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Salvar Lojinha</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
