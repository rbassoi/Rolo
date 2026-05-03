export default function AdminDashboard() {
  return (
    <div className="fade-up">
      <h1 className="section-title" style={{ fontSize: '28px', color: 'var(--accent)', marginBottom: '8px' }}>Resumo do Portal</h1>
      <p style={{ color: 'var(--text2)', marginBottom: '32px' }}>Visão geral do que tá rolando no Sion.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '12px', fontWeight: 600 }}>Total de Usuários</h3>
          <p style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text)' }}>142</p>
        </div>
        <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '12px', fontWeight: 600 }}>Lojinhas Ativas</h3>
          <p style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text)' }}>4</p>
        </div>
        <div style={{ background: 'var(--card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '12px', fontWeight: 600 }}>Rolos (Anúncios)</h3>
          <p style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text)' }}>28</p>
        </div>
      </div>
    </div>
  );
}
