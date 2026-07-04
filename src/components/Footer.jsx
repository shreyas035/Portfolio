import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, href: 'https://github.com/shreyas035', label: 'GitHub', color: '#f1f5f9' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/shreyas-jadhav-5969b0362', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FiMail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shreyasj647@gmail.com', label: 'Email', color: '#EA4335' },
];

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">SJ</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        {/* Tagline */}
        <p className="footer-text" style={{ maxWidth: '400px', margin: '0 auto' }}>
          Building intelligent, data-driven systems with passion and precision.
        </p>

        {/* Socials */}
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              aria-label={s.label}
              title={s.label}
              style={{ '--social-color': s.color, width: '36px', height: '36px' }}
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>

        {/* Copyright & Scroll-up */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '20px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            © {new Date().getFullYear()} Shreyas Jadhav. Made with{' '}
            <FiHeart size={11} style={{ fill: 'var(--accent-pink)', stroke: 'var(--accent-pink)' }} /> using React &
            Vite
          </span>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            style={{
              cursor: 'pointer',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;