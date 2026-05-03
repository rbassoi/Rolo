export default function TermsPage() {
  return (
    <div className="container fade-up" style={{ padding: '60px 0', maxWidth: '800px' }}>
      <h1 className="section-title" style={{ marginBottom: '24px', fontSize: '36px', color: 'var(--accent)' }}>Termos de Uso</h1>
      <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '16px' }}>
        <p style={{ marginBottom: '16px' }}>
          Ao acessar ao site Portal do Sion, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
        </p>
        <h3 style={{ color: 'var(--text)', margin: '24px 0 12px' }}>1. Uso do Portal</h3>
        <p style={{ marginBottom: '16px' }}>
          O Portal do Sion atua como uma vitrine e intermediador de contatos entre moradores. Não nos responsabilizamos pela entrega, pagamento ou qualidade dos produtos e serviços anunciados. As negociações são de inteira responsabilidade dos usuários.
        </p>
        <h3 style={{ color: 'var(--text)', margin: '24px 0 12px' }}>2. Regras de Conduta</h3>
        <p style={{ marginBottom: '16px' }}>
          É proibido usar o portal para fins ilegais ou publicar anúncios de itens proibidos por lei. Anúncios que violem estas regras poderão ser removidos sem aviso prévio pela nossa equipe de moderação.
        </p>
        <h3 style={{ color: 'var(--text)', margin: '24px 0 12px' }}>3. Modificações</h3>
        <p>
          O Portal do Sion pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
        </p>
      </div>
    </div>
  );
}
