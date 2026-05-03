import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Portal do Sion · Feito com 💚 no bairro</span>
        <div className="footer-links">
          <Link href="/about">Sobre</Link>
          <Link href="/contact">Contato</Link>
          <Link href="/privacy">Privacidade</Link>
          <Link href="/terms">Termos</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
