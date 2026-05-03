'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/mockData';
import styles from './page.module.css';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  const [chatOpen, setChatOpen] = useState(false);

  if (!product) {
    return (
      <div className="container">
        <div className={styles.notFound}>
          <h2>Uai, não achamos esse trem!</h2>
          <p>O anúncio pode ter sido removido ou o rolo já foi feito.</p>
          <Link href="/" className={styles.backButton}>Voltar pro Mercado</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.backNav}>
        <Link href="/">&larr; Voltar pros rolos</Link>
      </div>

      <div className={styles.productLayout}>
        <div className={styles.imageSection}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.imageIcon}>📸</span>
            <p className={styles.imageText}>Foto do Produto</p>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{product.title}</h1>
            <span className={styles.price}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </span>
          </div>

          <div className={styles.tagsRow}>
            <span className={styles.conditionTag}>{product.condition}</span>
            <span className={styles.locationTag}>📍 {product.district}, {product.city}</span>
          </div>

          <div className={styles.descriptionBox}>
            <h3>Descrição do Trem</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.sellerBox}>
            <h3>Vendido por {product.sellerName}</h3>
            <p className={styles.sellerSubtitle}>Mora aqui na região do Sion.</p>
            
            <div className={styles.actionButtons}>
              <a href={`mailto:contato@exemplo.com?subject=Interesse no anúncio: ${product.title}`} className={styles.emailButton}>
                📧 Entrar em Contato (Email)
              </a>
              <button onClick={() => setChatOpen(true)} className={styles.chatButton}>
                💬 Chamar no Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {chatOpen && (
        <div className={styles.chatModalOverlay}>
          <div className={styles.chatModal}>
            <div className={styles.chatHeader}>
              <h3>Chat com {product.sellerName}</h3>
              <button onClick={() => setChatOpen(false)} className={styles.closeButton}>&times;</button>
            </div>
            <div className={styles.chatBody}>
              <p className={styles.systemMessage}>O chat ao vivo será implementado na Fase 4. Por enquanto, mande um email!</p>
            </div>
            <div className={styles.chatFooter}>
              <input type="text" placeholder="Escreva sua mensagem..." disabled className={styles.chatInput} />
              <button disabled className={styles.chatSend}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
