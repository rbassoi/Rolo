'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';

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
    return <div className="container" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text2)' }}>Carregando anúncio...</div>;
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '16px' }}>Uai, não achamos esse trem!</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '24px' }}>O anúncio pode ter sido removido ou o rolo já foi feito.</p>
        <Link href="/" className="btn btn-primary">Voltar pro Mercado</Link>
      </div>
    );
  }

  const getConditionBadge = (cond: string) => {
    if (cond === 'Novo') return <span className="listing-badge badge-novo" style={{ position: 'relative', top: '0', left: '0' }}>Novo</span>;
    if (cond === 'Semi-novo') return <span className="listing-badge badge-semi" style={{ position: 'relative', top: '0', left: '0' }}>Semi-novo</span>;
    if (cond === 'Usado') return <span className="listing-badge badge-usado" style={{ position: 'relative', top: '0', left: '0' }}>Usado</span>;
    return <span className="listing-badge badge-usado" style={{ position: 'relative', top: '0', left: '0' }}>{cond}</span>;
  }

  return (
    <div className="container fade-up" style={{ paddingBottom: '60px' }}>
      <div style={{ padding: '24px 0', marginBottom: '16px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ color: 'var(--text2)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
          <span>&larr;</span> Voltar pros rolos
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Column: Image */}
        <div style={{ background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--text3)' }}>
            <svg width="80" height="80" viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="32" height="24" rx="3" stroke="var(--text3)" strokeWidth="1.5"/><circle cx="20" cy="20" r="6" stroke="var(--text3)" strokeWidth="1.5"/><circle cx="32" cy="10" r="2" fill="var(--text3)"/></svg>
            <span style={{ fontSize: '14px', fontFamily: 'monospace' }}>sem fotos do produto</span>
          </div>
        </div>

        {/* Right Column: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              {getConditionBadge(product.condition)}
              <span style={{ fontSize: '12px', color: 'var(--text2)' }}>📍 {product.district}, {product.city}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2, marginBottom: '16px' }}>
              {product.title}
            </h1>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent)' }}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </div>
          </div>

          <div style={{ background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '12px' }}>Descrição do Trem</h3>
            <p style={{ color: 'var(--text2)', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{product.description}</p>
          </div>

          <div style={{ background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--accent)' }}>
                {product.sellerName ? product.sellerName.charAt(0).toUpperCase() : 'V'}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>Vendido por {product.sellerName}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '12px' }}>Mora na região do Sion</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {user ? (
                <>
                  <a href={`mailto:contato@exemplo.com?subject=Interesse no anúncio: ${product.title}`} className="btn btn-outline" style={{ justifyContent: 'center', padding: '12px' }}>
                    📧 Entrar em Contato (Email)
                  </a>
                  <button onClick={handleOpenChat} className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }}>
                    💬 Chamar no Chat
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }}>
                  Faça login para falar com o vendedor
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {chatOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,29,36,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ width: '90%', maxWidth: '440px', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
            <div style={{ padding: '16px 20px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>Chat com {product.sellerName}</h3>
              <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: '24px', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: '20px', minHeight: '300px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatHistory.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '13px', margin: 'auto' }}>Mande uma mensagem para começar a negociar este trem!</p>
              ) : (
                chatHistory.map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.sender === 'Você' ? 'flex-end' : 'flex-start', background: msg.sender === 'Você' ? 'var(--accent)' : 'var(--bg2)', color: msg.sender === 'Você' ? '#0e1a14' : 'var(--text)', padding: '10px 14px', borderRadius: '12px', borderBottomRightRadius: msg.sender === 'Você' ? '4px' : '12px', borderBottomLeftRadius: msg.sender !== 'Você' ? '4px' : '12px', maxWidth: '85%', fontSize: '13px' }}>
                    <strong style={{ display: 'block', fontSize: '11px', marginBottom: '4px', opacity: 0.8 }}>{msg.sender}</strong>
                    {msg.text}
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Escreva sua mensagem..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
              />
              <button onClick={handleSendMessage} className="btn btn-primary" style={{ padding: '10px 16px' }}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
