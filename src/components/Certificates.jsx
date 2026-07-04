import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiDownload, FiX, FiAward, FiExternalLink, FiZoomIn } from 'react-icons/fi';
import { certificates } from '../data/certificates';
import ScrollRevealText from './ScrollRevealText';

const CertCard = ({ cert, index, visible, onOpen }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cert-card glass-card"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      onClick={() => onOpen(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(cert)}
      aria-label={`View ${cert.title} certificate`}
    >
      <div className="cert-visual">
        {cert.image ? (
          <>
            <img
              src={cert.image}
              alt={cert.title}
              className="cert-img"
              loading="lazy"
            />
            <div className="cert-img-overlay">
              <FiZoomIn size={28} className="cert-zoom-icon" />
            </div>
          </>
        ) : (
          <>
            <div className="cert-icon-bg">
              <FiAward size={40} className="cert-icon" />
            </div>
            <div className="cert-glow" />
          </>
        )}
      </div>
      <div className="cert-info">
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        <p className="cert-date">{cert.date}</p>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="section certs-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Achievements</p>
          <ScrollRevealText className="section-title">Certificates</ScrollRevealText>
          <p className="section-subtitle">
            Continuous professional expansion and skill validation through accredited courses.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="certs-grid">
          {certificates.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              visible={inView}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={`cert-modal-box glass-card ${selected.image ? 'has-image' : ''}`}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              {/* Certificate Media Preview */}
              {selected.image ? (
                <div className="modal-image-wrap">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="modal-cert-img"
                  />
                </div>
              ) : (
                <div className="modal-cert-visual">
                  <FiAward size={60} className="modal-cert-icon" />
                </div>
              )}

              {/* Certificate Info */}
              <div className="modal-cert-info">
                <h3>{selected.title}</h3>
                <p className="modal-issuer">{selected.issuer}</p>
                <p className="modal-date">Issued: {selected.date}</p>
              </div>

              {/* Actions */}
              <div className="modal-actions">
                {selected.credential && selected.credential !== '#' && (
                  <a
                    href={selected.credential}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <FiExternalLink size={15} /> View Credential
                  </a>
                )}
                {selected.image && (
                  <a href={selected.image} download className="btn-outline">
                    <FiDownload size={15} /> Download Image
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
