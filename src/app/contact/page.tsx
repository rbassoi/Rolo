export default function ContactPage() {
  return (
    <div className="container fade-up" style={{ padding: '60px 0', maxWidth: '800px' }}>
      <h1 className="section-title" style={{ marginBottom: '24px', fontSize: '36px', color: 'var(--accent)' }}>Contato</h1>
      <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '16px' }}>
        <p style={{ marginBottom: '24px' }}>
          Precisa falar com a gente? Seja para tirar uma dúvida, relatar um problema ou dar uma sugestão bacana para melhorarmos o portal, estamos aqui para ouvir!
        </p>
        
        <div style={{ background: 'var(--bg2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '12px' }}>Nossos Canais</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>E-mail:</strong> contato@portaldosion.com.br</li>
            <li style={{ marginBottom: '12px' }}><strong>WhatsApp:</strong> (31) 99999-9999</li>
            <li><strong>Instagram:</strong> @portaldosion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
