'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';
import styles from './page.module.css';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: string, text: string}[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
      
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [resolvedParams.id]);

  const handleOpenChat = () => {
    if (!user) {
      alert('Você precisa fazer login para enviar mensagens!');
      router.push('/login');
      return;
    }
    setChatOpen(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newHistory = [...chatHistory, { sender: 'Você', text: message }];
    setChatHistory(newHistory);
    setMessage('');

    // Simulate seller reply
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: product?.sellerName || 'Vendedor', text: 'Olá! Ainda está disponível sim. Tem interesse?' }]);
    }, 1500);
  };

  if (loading) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Carregando anúncio...</div>;
  }

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
            <h3>Vendido por {product.seller_name}</h3>
            <p className={styles.sellerSubtitle}>Mora aqui na região do Sion.</p>
            
            <div className={styles.actionButtons}>
              {user ? (
                <>
                  <a href={`mailto:contato@exemplo.com?subject=Interesse no anúncio: ${product.title}`} className={styles.emailButton}>
                    📧 Entrar em Contato (Email)
                  </a>
                  <button onClick={handleOpenChat} className={styles.chatButton}>
                    💬 Chamar no Chat
                  </button>
                </>
              ) : (
                <Link href="/login" className={styles.loginRequiredButton}>
                  Faça login para falar com o vendedor
                </Link>
              )}
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
              {chatHistory.length === 0 ? (
                <p className={styles.systemMessage}>Mande uma mensagem para começar a negociar este trem!</p>
              ) : (
                <div className={styles.messagesList}>
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={msg.sender === 'Você' ? styles.msgSelf : styles.msgOther}>
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.chatFooter}>
              <input 
                type="text" 
                placeholder="Escreva sua mensagem..." 
                className={styles.chatInput} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className={styles.chatSend}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
