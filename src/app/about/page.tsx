export default function AboutPage() {
  return (
    <div className="container fade-up" style={{ padding: '60px 0', maxWidth: '800px' }}>
      <h1 className="section-title" style={{ marginBottom: '24px', fontSize: '36px', color: 'var(--accent)' }}>Sobre o Portal do Sion</h1>
      <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '16px' }}>
        <p style={{ marginBottom: '16px' }}>
          O <strong>Portal do Sion</strong> nasceu com um propósito claro: conectar os moradores do bairro Sion, em Belo Horizonte, fortalecendo a economia local e facilitando a troca, compra e venda de produtos entre vizinhos.
        </p>
        <p style={{ marginBottom: '16px' }}>
          Acreditamos que o comércio local é a alma de qualquer bairro. Ao comprar de quem está perto de você, além de economizar com fretes e deslocamentos, você incentiva o crescimento da nossa própria comunidade.
        </p>
        <p style={{ marginBottom: '16px' }}>
          Aqui, você pode anunciar aquele "trem" que não usa mais, descobrir prestadores de serviços confiáveis na região e valorizar as lojinhas do bairro. Tudo isso em um ambiente seguro e pensado exclusivamente para quem vive ou trabalha no Sion.
        </p>
        <p>
          Sinta-se em casa, sô! Faça bons rolos e ajude o nosso bairro a prosperar.
        </p>
      </div>
    </div>
  );
}
