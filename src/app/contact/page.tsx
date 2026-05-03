'use client';

export default function ContactPage() {
  return (
    <div className="container fade-up" style={{ padding: '60px 0', maxWidth: '900px' }}>
      <h1 className="section-title" style={{ marginBottom: '24px', fontSize: '36px', color: 'var(--accent)' }}>Contato</h1>
      <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '16px' }}>
        <p style={{ marginBottom: '32px' }}>
          Precisa falar com a gente ou entrar em contato com um administrador? Preencha o formulário abaixo ou nos chame em um de nossos canais!
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          <form style={{ background: 'var(--bg2)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '4px', fontSize: '20px', fontFamily: 'var(--font-display)' }}>Mande sua mensagem</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>Nome Completo</label>
              <input type="text" placeholder="Seu nome..." style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', color: 'var(--text)', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>E-mail ou Telefone</label>
              <input type="text" placeholder="Para podermos responder..." style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', color: 'var(--text)', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text2)' }}>Sua Mensagem</label>
              <textarea placeholder="Como podemos ajudar?" rows={5} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', color: 'var(--text)', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="button" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '8px', padding: '14px' }} onClick={() => alert('Mensagem enviada com sucesso! Em breve o administrador entrará em contato.')}>
              Enviar Mensagem
            </button>
          </form>

          <div style={{ background: 'var(--card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '20px', fontSize: '20px', fontFamily: 'var(--font-display)' }}>Nossos Canais Diretos</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '4px' }}>E-mail:</strong>
                contato@portaldosion.com.br
              </li>
              <li>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '4px' }}>WhatsApp:</strong>
                (31) 99999-9999
              </li>
              <li>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '4px' }}>Instagram:</strong>
                @portaldosion
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
