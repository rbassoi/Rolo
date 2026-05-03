'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas as Categorias');
  const [condition, setCondition] = useState('Todas as Condições');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCondition = condition === 'Todas as Condições' ? true : p.condition === condition;
    // Categories are mocked or mapped here if they exist in DB
    const matchesCategory = category === 'Todas as Categorias' || category === 'Tudo' ? true : (p as any).category === category;
    
    return matchesSearch && matchesCondition && matchesCategory;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, condition, category]);

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getConditionBadge = (cond: string) => {
    if (cond === 'Novo') return <span className="listing-badge badge-novo">Novo</span>;
    if (cond === 'Semi-novo') return <span className="listing-badge badge-semi">Semi-novo</span>;
    if (cond === 'Usado') return <span className="listing-badge badge-usado">Usado</span>;
    return <span className="listing-badge badge-usado">{cond}</span>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="container">

      {/* Promo banner */}
      <div className="promo-banner fade-up">
        <strong>Quer anunciar sua lojinha ou serviço aqui de destaque?</strong>
        <p>Entre em contato com o <Link href="/contact">administrador do portal</Link>! Clique para saber mais.</p>
      </div>

      {/* Hero */}
      <section className="hero fade-up">
        <h1>Bão demais ter você aqui no<br/>Portal do Sion!</h1>
        <p>Aquele cantinho da internet feito pra gente fazer uns rolos bons e apoiar quem é da vizinhança. Quer comprar, vender ou <Link href="/marketplace/new">trocar um trem</Link>? Tá no lugar certo, sô!</p>
      </section>

      {/* ── MERCADO ──────────────────────────────────────── */}
      <section id="mercado">
        <div className="section-header">
          <h2 className="section-title">Mercado (Os Rolos)</h2>
          <Link href="/marketplace/new" className="btn btn-primary btn-lg">Anunciar um Trem</Link>
        </div>

        {/* Search & filter */}
        <div className="search-row">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar rolos…" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="filter-select" value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option>Todas as Condições</option>
            <option>Novo</option>
            <option>Semi-novo</option>
            <option>Usado</option>
          </select>
          <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Todas as Categorias</option>
            <option>Eletrônicos</option>
            <option>Móveis</option>
            <option>Roupas</option>
            <option>Esportes</option>
            <option>Serviços</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="cat-chips">
          {['Tudo', 'Eletrônicos', 'Móveis', 'Roupas', 'Esportes', 'Cozinha', 'Crianças', 'Livros', 'Serviços', 'Outros'].map(c => (
            <div 
              key={c}
              className={`chip ${category === c || (category === 'Todas as Categorias' && c === 'Tudo') ? 'active' : ''}`}
              onClick={() => setCategory(c === 'Tudo' ? 'Todas as Categorias' : c)}
            >
              {c}
            </div>
          ))}
        </div>

        {/* Listing grid */}
        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text2)' }}>Carregando os rolos...</p>
        ) : (
          <div className="listing-grid">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="listing-card fade-up" style={{ animationDelay: '0.05s' }}>
                <Link href={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="listing-img">
                    <div className="listing-img-ph">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="32" height="24" rx="3" stroke="#8a90a0" strokeWidth="1.5"/><circle cx="20" cy="20" r="6" stroke="#8a90a0" strokeWidth="1.5"/><circle cx="32" cy="10" r="2" fill="#8a90a0"/></svg>
                      <span>{product.title.toLowerCase()}</span>
                    </div>
                    {getConditionBadge(product.condition)}
                  </div>
                  <div className="listing-body">
                    <div className="listing-title-row">
                      <span className="listing-name">{product.title}</span>
                      <span className="listing-price">{formatPrice(product.price)}</span>
                    </div>
                    <p className="listing-desc">{product.description}</p>
                    <div className="listing-meta">
                      <div className="listing-seller">Vendido por <strong>{product.sellerName}</strong></div>
                      <div className="listing-loc">📍 {product.district}, {product.city}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text2)' }}>
                Nenhum rolo encontrado pra essa busca.
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="show-more" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
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
      </section>

      {/* ── LOJINHAS ─────────────────────────────────────── */}
      <section id="lojinhas">
        <div className="lojas-banner">
          <h2>E as lojinhas do bairro?</h2>
          <p>Não esquece de prestigiar o comércio local, viu? Aqui você encontra as lojas e prestadores de serviço do Sion e região. Compra de quem é daqui!</p>
          <div className="loja-grid">

            <div className="loja-card">
              <div className="loja-avatar">M</div>
              <div>
                <div className="loja-name">Mercearia do Tonho</div>
                <div className="loja-info">Quitandas, hortifruti e mercearia em geral. Entrega no bairro.</div>
              </div>
              <span className="loja-tag">Alimentação</span>
            </div>

            <div className="loja-card">
              <div className="loja-avatar">B</div>
              <div>
                <div className="loja-name">Bazar da Dona Zezé</div>
                <div className="loja-info">Roupas, calçados e utilidades pra casa. Tudo bom e barato.</div>
              </div>
              <span className="loja-tag">Bazar</span>
            </div>

            <div className="loja-card">
              <div className="loja-avatar">E</div>
              <div>
                <div className="loja-name">Elétrica do Zé Luís</div>
                <div className="loja-info">Reparos elétricos, instalação e manutenção. Atende aos finais de semana.</div>
              </div>
              <span className="loja-tag">Serviços</span>
            </div>

            <div className="loja-card">
              <div className="loja-avatar">P</div>
              <div>
                <div className="loja-name">Pet Shop Patinhas</div>
                <div className="loja-info">Banho, tosa e produtos pra seu animal. Agendamento pelo WhatsApp.</div>
              </div>
              <span className="loja-tag">Pet</span>
            </div>

            <Link href="/shops" style={{ textDecoration: 'none' }}>
              <div className="loja-card" style={{ border: '1px dashed rgba(62,207,142,0.3)', background: 'transparent', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '120px', gap: '6px' }}>
                <div style={{ fontSize: '28px', color: 'var(--text3)' }}>＋</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>Ver diretório completo</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)' }}>Ou cadastre a sua</div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="how-section">
        <div className="section-header">
          <h2 className="section-title">Como funciona?</h2>
        </div>
        <div className="how-grid">
          <div className="how-card">
            <div className="how-icon">📝</div>
            <h3>Cadastre-se</h3>
            <p>Crie sua conta de graça em menos de um minuto. Sem complicação nenhuma, sô.</p>
          </div>
          <div className="how-card">
            <div className="how-icon">📦</div>
            <h3>Anuncie seu trem</h3>
            <p>Tire umas fotos, bota o preço e descreve direito. Fica fácil de vender!</p>
          </div>
          <div className="how-card">
            <div className="how-icon">🤝</div>
            <h3>Faz o rolo</h3>
            <p>Combina com o comprador pelo portal e fecha o negócio direto, sem intermediário.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="cta-strip">
        <h2>Tem algum trem pra vender?</h2>
        <p>Cadastra de graça e anuncia em menos de 5 minutos. Sem taxa, sem complicação.</p>
        <div className="btn-row">
          <Link href="/marketplace/new" className="btn btn-primary btn-lg">Anunciar agora</Link>
          <Link href="#mercado" className="btn btn-ghost btn-lg">Ver os rolos</Link>
        </div>
      </div>

    </div>
  );
}
