'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Shop } from '@/types';
import styles from './page.module.css';

export default function ShopsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShops() {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .order('name');
      
      if (data) {
        setShops(data);
      }
      setLoading(false);
    }
    fetchShops();
  }, []);

  const categories = Array.from(new Set(shops.map(s => s.category))).sort();

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(search.toLowerCase()) || 
                          shop.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? shop.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <div className={styles.bannerContainer}>
        <a href="/admin" className={styles.banner}>
          <h3>Quer anunciar sua lojinha ou serviço aqui de destaque?</h3>
          <p>Entre em contato com o administrador do portal! Clique para saber mais.</p>
        </a>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Lojinhas Locais no Bairro Sion</h1>
        <p className={styles.subtitle}>Descubra os melhores comércios locais bem pertinho de você, sô.</p>
        
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Buscar por nome ou categoria..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.selectInput}
          >
            <option value="">Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando as lojinhas...</p>
      ) : (
        <div className={styles.grid}>
          {filteredShops.map((shop) => (
          <div key={shop.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.shopName}>{shop.name}</h2>
              <span className={styles.category}>{shop.category}</span>
            </div>
            <p className={styles.description}>{shop.description}</p>
            
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.icon}>📍</span>
                <div>
                  <p className={styles.address}>{shop.address}</p>
                  <p className={styles.location}>{shop.district}, {shop.city}</p>
                </div>
              </div>
              
              {shop.phone && (
                <div className={styles.detailItem}>
                  <span className={styles.icon}>📞</span>
                  {user ? (
                    <p>{shop.phone}</p>
                  ) : (
                    <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Faça login para ver o telefone</p>
                  )}
                </div>
              )}
              
              {shop.hours && (
                <div className={styles.detailItem}>
                  <span className={styles.icon}>⏰</span>
                  <p>{shop.hours}</p>
                </div>
              )}
            </div>

            <div className={styles.mapContainer}>
              <iframe
                width="100%"
                height="150"
                frameBorder="0"
                style={{ border: 0, borderRadius: '8px', marginTop: '1rem' }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(shop.address + ', ' + shop.district + ', ' + shop.city)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
