'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';

export default function NewProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'Usado',
    sellerName: '',
    image: null as File | null
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);

    const { error } = await supabase.from('products').insert([
      {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        condition: formData.condition,
        seller_name: formData.sellerName,
        seller_id: user.id
      }
    ]);

    setSubmitting(false);

    if (error) {
      alert('Deu ruim: ' + error.message);
    } else {
      alert('Bão demais! Seu anúncio foi publicado com sucesso no banco de dados.');
      router.push('/');
    }
  };

  if (loading || !user) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Anunciar um Trem</h1>
        <p className={styles.subtitle}>Preencha os dados pra fazer negócio no Sion.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>O que é o trem? (Título)</label>
            <input 
              required
              type="text" 
              className={styles.input} 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Conta mais sobre ele (Descrição)</label>
            <textarea 
              required
              className={styles.textarea} 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Qual o valor? (R$)</label>
              <input 
                required
                type="number" 
                className={styles.input} 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Condição</label>
              <select 
                className={styles.input}
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
              >
                <option value="Novo">Novo</option>
                <option value="Semi-novo">Semi-novo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Seu Nome</label>
            <input 
              required
              type="text" 
              className={styles.input} 
              value={formData.sellerName}
              onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fotos do Trem</label>
            <input 
              type="file" 
              accept="image/*"
              className={styles.input} 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({...formData, image: e.target.files[0]});
                }
              }}
            />
            <p className={styles.helpText}>Coloque umas fotos bonitas pro pessoal ver o estado do trem.</p>
          </div>

          <button type="submit" disabled={submitting} className={styles.submitButton}>
            {submitting ? 'Publicando...' : 'Publicar Anúncio'}
          </button>
        </form>
      </div>
    </div>
  );
}
