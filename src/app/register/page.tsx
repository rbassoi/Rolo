'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import styles from '../login/page.module.css'; // Reusing login styles

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingCep, setFetchingCep] = useState(false);

  const handleCepBlur = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setFetchingCep(true);
    setError(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado.');
        setFetchingCep(false);
        return;
      }

      setAddressLine(data.logradouro);
      setDistrict(data.bairro);
      setCity(data.localidade);

      const normalizedDistrict = data.bairro.toLowerCase().trim().replace(/[áàãâ]/g, 'a').replace(/[íìî]/g, 'i').replace(/[éèê]/g, 'e').replace(/[óòôõ]/g, 'o').replace(/[úùû]/g, 'u');
      if (!normalizedDistrict.includes('sion')) {
        setError(`Seu endereço consta no bairro ${data.bairro}. O Portal é exclusivo para moradores do Sion!`);
      }
    } catch (err) {
      setError('Erro ao buscar o CEP.');
    }
    setFetchingCep(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const normalizedDistrict = district.toLowerCase().trim().replace(/[áàãâ]/g, 'a').replace(/[íìî]/g, 'i').replace(/[éèê]/g, 'e').replace(/[óòôõ]/g, 'o').replace(/[úùû]/g, 'u');
    
    if (!normalizedDistrict.includes('sion')) {
      setError('Poxa, infelizmente o Portal do Sion é exclusivo para moradores do bairro Sion!');
      setLoading(false);
      return;
    }

    // Register user in Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Usually you'd insert the user into a public.users table here, 
    // but Supabase auth handles basic user data.
    alert('Cadastro realizado com sucesso! Bão demais.');
    router.push('/');
    router.refresh();
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h1 className={styles.title}>Criar Conta</h1>
        <p className={styles.subtitle}>Junte-se à nossa comunidade no Sion.</p>
        
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input 
              type="text" 
              required 
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input 
              type="email" 
              required 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>CEP</label>
            <input 
              type="text" 
              required 
              placeholder="Ex: 30310-000"
              maxLength={9}
              className={styles.input}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={handleCepBlur}
            />
            {fetchingCep && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Buscando endereço...</span>}
          </div>

          {district && (
            <div style={{ backgroundColor: 'var(--background-secondary)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
              <p><strong>Rua:</strong> {addressLine}</p>
              <p><strong>Bairro:</strong> {district}</p>
              <p><strong>Cidade:</strong> {city}</p>
            </div>
          )}

          {district && district.toLowerCase().includes('sion') && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Número</label>
              <input 
                type="text" 
                required 
                className={styles.input}
                value={addressNumber}
                onChange={(e) => setAddressNumber(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha (min 6 caracteres)</label>
            <input 
              type="password" 
              required 
              minLength={6}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className={styles.footerText}>
          Já tem uma conta? <Link href="/login" className={styles.link}>Entrar aqui</Link>
        </p>
      </div>
    </div>
  );
}
