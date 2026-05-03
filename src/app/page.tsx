'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/mockData';
import styles from './page.module.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? p.condition === category : true; // In mockData condition is used instead of category, I will filter by condition for now
    return matchesSearch && matchesCategory;
  });
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Bão demais ter você aqui no Portal do Sion!</h1>
          <p className={styles.subtitle}>
            Aquele cantinho da internet feito pra gente fazer uns rolos bons e apoiar quem é da vizinhança. 
            Quer comprar, vender ou trocar um trem? Tá no lugar certo, sô!
          </p>
        </div>
        
        <div className={styles.marketplaceHeader}>
          <div className={styles.headerTop}>
            <h2 className={styles.sectionTitle}>Mercado (Os Rolos)</h2>
            <Link href="/marketplace/new" className={styles.primaryButton}>Anunciar um Trem</Link>
          </div>
          
          <div className={styles.filters}>
            <input 
              type="text" 
              placeholder="Buscar rolos..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className={styles.selectInput}
            >
              <option value="">Todas as Condições</option>
              <option value="Novo">Novo</option>
              <option value="Semi-novo">Semi-novo</option>
              <option value="Usado">Usado</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link href={`/marketplace/${product.id}`} className={styles.cardLink}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.imageIcon}>📸</span>
                </div>
              </Link>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <Link href={`/marketplace/${product.id}`} className={styles.cardLink}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                  </Link>
                  <span className={styles.price}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                </div>
                <p className={styles.description}>{product.description}</p>
                
                <div className={styles.details}>
                  <div className={styles.detailRow}>
                    <span className={styles.conditionTag}>{product.condition}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.seller}>Vendido por {product.sellerName}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.location}>📍 {product.district}, {product.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>E as lojinhas do bairro?</h3>
          <p>Não esquece de prestigiar o comércio local, viu?</p>
          <Link href="/shops" className={styles.secondaryButton}>
            Ver as Lojinhas do Sion
          </Link>
        </div>
      </div>
    </div>
  );
}
