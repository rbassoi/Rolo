'use client';

import { useState } from 'react';
import { shops } from '@/lib/mockData';
import styles from './page.module.css';

export default function ShopsPage() {
  const [search, setSearch] = useState('');

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(search.toLowerCase()) || 
    shop.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container">
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
        </div>
      </div>
      
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
                  <p>{shop.phone}</p>
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
                src={`https://www.google.com/maps/embed/v1/place?key=API_KEY_HERE&q=${encodeURIComponent(shop.address + ', ' + shop.district + ', ' + shop.city)}`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
