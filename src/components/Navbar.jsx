import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'console', label: 'Console' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section spy algorithm
      const scrollPos = window.scrollY + 120;
      for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i];
        const sec = document.getElementById(link.id);
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger scroll calculations initially
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="nav-container">
          {/* Logo */}
          <button className="nav-logo" onClick={() => scrollTo('home')}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">SJ</span>
            <span className="logo-bracket">/&gt;</span>
          </button>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${active === link.id ? 'active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      className="nav-active-dot"
                      layoutId="active-dot"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href="/Shreyas Jadhav Resume New.pdf"
              target="_blank"
              rel="noreferrer"
              className="nav-resume-btn"
            >
              Resume
            </a>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    className={`mobile-link ${active === link.id ? 'active' : ''}`}
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li>
                <a
                  href="/Shreyas Jadhav Resume New.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-link"
                  style={{ color: 'var(--accent-purple)', fontWeight: '600' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;