import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { galleryPhotos } from '../data/gallery';
import ScrollRevealText from './ScrollRevealText';

const GalleryCard = ({ photo, index, visible, onOpen }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 25;
    const rotateY = (x - centerX) / 25;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // Vary heights for masonry effect
  const sizeClass = index % 5 === 0 ? 'gallery-tall' : index % 3 === 0 ? 'gallery-wide' : '';

  return (
    <motion.div
      ref={cardRef}
      className={`gallery-item ${sizeClass}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(index)}
      aria-label={photo.caption || `Nature photo ${photo.id}`}
    >
      <img
        src={photo.src}
        alt={photo.caption || `Nature photo ${photo.id}`}
        className="gallery-img protect-img"
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      <div className="gallery-overlay">
        <FiCamera size={22} className="gallery-cam-icon" />
        {(photo.caption || photo.location) && (
          <div className="gallery-caption">
            {photo.caption && <span className="gallery-caption-text">{photo.caption}</span>}
            {photo.location && (
              <span className="gallery-location">
                <FiMapPin size={12} /> {photo.location}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback(
    (dir) => {
      setLightboxIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return galleryPhotos.length - 1;
        if (next >= galleryPhotos.length) return 0;
        return next;
      });
    },
    []
  );

  // Keyboard navigation & security
  const handleKeyDown = useCallback(
    (e) => {
      // Prevent browser save image combo (Ctrl+S or Cmd+S)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        toast.error("Downloads are disabled for these photos. 🔒");
      }
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    },
    [closeLightbox, navigate]
  );

  const currentPhoto = lightboxIndex !== null ? galleryPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">
            <FiCamera size={14} /> Beyond the Code
          </p>
          <ScrollRevealText className="section-title">Through My Lens</ScrollRevealText>
          <p className="section-subtitle">
            Away from the terminal, I pick up a camera — nature photography is where I unwind and find fresh perspective.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="gallery-grid">
          {galleryPhotos.map((photo, i) => (
            <GalleryCard
              key={photo.id}
              photo={photo}
              index={i}
              visible={inView}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            ref={(el) => el && el.focus()}
          >
            {/* Close */}
            <button
              className="gallery-lb-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <FiX size={22} />
            </button>

            {/* Navigation */}
            <button
              className="gallery-lb-nav gallery-lb-prev"
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              aria-label="Previous photo"
            >
              <FiChevronLeft size={28} />
            </button>

            <motion.div
              className="gallery-lb-content"
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gallery-lb-img-wrap" style={{ position: 'relative' }}>
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption || `Photo ${currentPhoto.id}`}
                  className="gallery-lb-img protect-img"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* Transparent overlay overlaying the image to completely prevent right click or long press select */}
                <div 
                  className="image-protection-overlay" 
                  onContextMenu={(e) => e.preventDefault()} 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'transparent',
                    zIndex: 2,
                  }}
                />
              </div>
              {(currentPhoto.caption || currentPhoto.location) && (
                <div className="gallery-lb-info">
                  {currentPhoto.caption && <p className="gallery-lb-caption">{currentPhoto.caption}</p>}
                  {currentPhoto.location && (
                    <p className="gallery-lb-location">
                      <FiMapPin size={13} /> {currentPhoto.location}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            <button
              className="gallery-lb-nav gallery-lb-next"
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              aria-label="Next photo"
            >
              <FiChevronRight size={28} />
            </button>

            {/* Counter */}
            <div className="gallery-lb-counter">
              {lightboxIndex + 1} / {galleryPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
