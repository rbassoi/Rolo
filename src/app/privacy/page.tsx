export default function PrivacyPage() {
  return (
    <div className="container fade-up" style={{ padding: '60px 0', maxWidth: '800px' }}>
      <h1 className="section-title" style={{ marginBottom: '24px', fontSize: '36px', color: 'var(--accent)' }}>Política de Privacidade</h1>
      <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '16px' }}>
        <p style={{ marginBottom: '16px' }}>
          Sua privacidade é importante para nós. É política do Portal do Sion respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.
        </p>
        <h3 style={{ color: 'var(--text)', margin: '24px 0 12px' }}>Coleta de Dados</h3>
        <p style={{ marginBottom: '16px' }}>
          Solicitamos informações pessoais, como seu nome, e-mail e endereço (CEP), apenas quando realmente precisamos delas para lhe fornecer um serviço (como segurança nas negociações locais). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
        </p>
        <h3 style={{ color: 'var(--text)', margin: '24px 0 12px' }}>Uso das Informações</h3>
        <p style={{ marginBottom: '16px' }}>
          Os dados coletados são usados exclusivamente para garantir o funcionamento da plataforma, como a verificação de pertencimento ao bairro Sion e a intermediação segura dos seus contatos.
        </p>
        <p>
          Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
        </p>
      </div>
    </div>
  );
}
