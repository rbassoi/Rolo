'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

export default function AdminBanners() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [displayTime, setDisplayTime] = useState(5); // seconds

  const [banners, setBanners] = useState([
    { id: 1, title: 'Padaria Sion - Pão Quente', status: 'Ativo', order: 1, img: '🍞' },
    { id: 2, title: 'Oficina do Zé', status: 'Ativo', order: 2, img: '🔧' },
    { id: 3, title: 'Petshop Cão Feliz', status: 'Pausado', order: 3, img: '🐶' }
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newBanners = [...banners];
    const temp = newBanners[index - 1];
    newBanners[index - 1] = newBanners[index];
    newBanners[index] = temp;
    
    // Update order property
    newBanners.forEach((b, i) => b.order = i + 1);
    setBanners(newBanners);
  };

  const moveDown = (index: number) => {
    if (index === banners.length - 1) return;
    const newBanners = [...banners];
    const temp = newBanners[index + 1];
    newBanners[index + 1] = newBanners[index];
    newBanners[index] = temp;
    
    // Update order property
    newBanners.forEach((b, i) => b.order = i + 1);
    setBanners(newBanners);
  };

  const toggleStatus = (id: number) => {
    setBanners(banners.map(b => 
      b.id === id ? { ...b, status: b.status === 'Ativo' ? 'Pausado' : 'Ativo' } : b
    ));
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Anúncios & Banners</h1>
          <p className={styles.pageSubtitle}>Gerencie os anúncios, a ordem de exibição e a troca automática.</p>
        </div>
        <button className={styles.actionButton}>+ Novo Banner</button>
      </div>

      <div style={{ backgroundColor: 'var(--background-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Configurações de Exibição</h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <input 
                type="checkbox" 
                checked={autoRotate} 
                onChange={(e) => setAutoRotate(e.target.checked)} 
                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-color)' }}
              />
              Ativar Troca Automática (Carrossel)
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              Tempo por banner:
              <input 
                type="number" 
                value={displayTime} 
                onChange={(e) => setDisplayTime(Number(e.target.value))}
                disabled={!autoRotate}
                style={{ width: '60px', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                min="1"
              />
              segundos
            </label>
          </div>
        </div>
        <button style={{ marginLeft: 'auto', backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Salvar Configurações</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ordem</th>
            <th>Arte</th>
            <th>Cliente / Campanha</th>
            <th>Status</th>
            <th>Ações de Ordenação</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={banner.id} style={{ opacity: banner.status === 'Pausado' ? 0.6 : 1 }}>
              <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>#{banner.order}</td>
              <td style={{ fontSize: '2rem' }}>{banner.img}</td>
              <td style={{ fontWeight: 600 }}>{banner.title}</td>
              <td>
                <button 
                  onClick={() => toggleStatus(banner.id)}
                  style={{ 
                    backgroundColor: banner.status === 'Ativo' ? '#dcfce7' : '#f1f5f9', 
                    color: banner.status === 'Ativo' ? '#166534' : '#64748b',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {banner.status}
                </button>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => moveUp(index)} 
                    disabled={index === 0}
                    style={{ background: 'var(--background-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '4px', cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    ⬆️ Subir
                  </button>
                  <button 
                    onClick={() => moveDown(index)} 
                    disabled={index === banners.length - 1}
                    style={{ background: 'var(--background-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '4px', cursor: index === banners.length - 1 ? 'not-allowed' : 'pointer' }}
                  >
                    ⬇️ Descer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
