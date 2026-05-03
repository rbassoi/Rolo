'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Shop } from '@/types';
import Link from 'next/link';

export default function ShopsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchShops() {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .order('name');
      
      const dbShops = data || [];
      
      const mockShops: Shop[] = [
        {
          id: 'mock-1',
          name: 'Mercearia do Tonho',
          description: 'Quitandas, hortifruti e mercearia em geral. Entrega no bairro.',
          category: 'Alimentação',
          address: 'Rua do Ouro, 123',
          district: 'Sion',
          city: 'Belo Horizonte',
          phone: '(31) 9999-0001',
          hours: 'Seg-Sáb, 07:00 as 19:00',
        },
        {
          id: 'mock-2',
          name: 'Bazar da Dona Zezé',
          description: 'Roupas, calçados e utilidades pra casa. Tudo bom e barato.',
          category: 'Bazar',
          address: 'Av. Nossa Sra do Carmo, 456',
          district: 'Sion',
          city: 'Belo Horizonte',
          phone: '(31) 9999-0002',
          hours: 'Seg-Sex, 09:00 as 18:00',
        },
        {
          id: 'mock-3',
          name: 'Elétrica do Zé Luís',
          description: 'Reparos elétricos, instalação e manutenção. Atende aos finais de semana.',
          category: 'Serviços',
          address: 'Rua Grão Mogol, 789',
          district: 'Sion',
          city: 'Belo Horizonte',
          phone: '(31) 9999-0003',
          hours: 'Seg-Dom, 08:00 as 20:00',
        },
        {
          id: 'mock-4',
          name: 'Pet Shop Patinhas',
          description: 'Banho, tosa e produtos pra seu animal. Agendamento pelo WhatsApp.',
          category: 'Pet',
          address: 'Rua Patagônia, 101',
          district: 'Sion',
          city: 'Belo Horizonte',
          phone: '(31) 9999-0004',
          hours: 'Seg-Sáb, 08:00 as 18:00',
        }
      ];

      const finalShops = [...dbShops];
      mockShops.forEach(mock => {
        if (!finalShops.some(db => db.name === mock.name)) {
          finalShops.push(mock);
        }
      });
      
      setShops(finalShops.sort((a, b) => a.name.localeCompare(b.name)));
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const paginatedShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="container">
      <div className="promo-banner fade-up" style={{ marginTop: '40px' }}>
        <strong>Quer anunciar sua lojinha ou serviço aqui de destaque?</strong>
        <p>Entre em contato com o <Link href="/admin/banners">administrador do portal</Link>! Clique para saber mais.</p>
      </div>

      <div style={{ marginTop: '30px', marginBottom: '30px' }} className="fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, color: 'var(--accent)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Lojinhas Locais no Bairro Sion
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: '15px' }}>
          Descubra os melhores comércios locais bem pertinho de você, sô.
        </p>
      </div>

      <div className="search-row fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nome ou categoria..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Todas as Categorias</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text2)' }}>Carregando as lojinhas...</p>
      ) : (
        <div className="loja-grid fade-up" style={{ animationDelay: '0.2s', marginBottom: '40px' }}>
          {paginatedShops.map((shop) => (
            <div key={shop.id} className="loja-card">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="loja-avatar">{shop.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="loja-name">{shop.name}</div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                     <span className="loja-tag">{shop.category}</span>
                  </div>
                </div>
              </div>
              <div className="loja-info" style={{ marginTop: '8px', minHeight: '34px' }}>{shop.description}</div>
              <div className="loja-info" style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px' }}>📍</span> 
                  <span>{shop.address}, {shop.district}</span>
                </div>
                {shop.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>📞</span> 
                    {user ? <span>{shop.phone}</span> : <span style={{color:'var(--text3)', fontStyle:'italic'}}>Login para ver</span>}
                  </div>
                )}
                {shop.hours && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>⏰</span> 
                    <span>{shop.hours}</span>
                  </div>
                )}
              </div>
              <div style={{ marginTop: '12px' }}>
                <iframe
                  width="100%"
                  height="140"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: '8px', opacity: 0.8, filter: 'grayscale(0.5)' }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(shop.address + ', ' + shop.district + ', ' + shop.city)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
          {filteredShops.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text2)' }}>
              Nenhuma lojinha encontrada pra essa busca.
            </div>
          )}
        </div>
      )}
      
      {!loading && totalPages > 1 && (
        <div className="show-more" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            &larr; Anterior
          </button>
          <span style={{ fontSize: '14px', color: 'var(--text2)', fontWeight: 500 }}>
            Página {currentPage} de {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Próxima &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
