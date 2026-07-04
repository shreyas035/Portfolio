import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { projects, categories } from '../data/projects';
import ScrollRevealText from './ScrollRevealText';

const ProjectCard = ({ project, index, visible }) => {
  const [expanded, setExpanded] = useState(false);
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
      className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      {/* Top Bar */}
      <div className="project-top">
        <div className="project-num">
          {String(index + 1).padStart(2, '0')}
        </div>
        {project.featured && (
          <span className="project-featured-badge">
            <FiStar size={11} /> Featured
          </span>
        )}
      </div>

      {/* Visual Placeholder */}
      <div className="project-visual">
        <div className="project-icon-bg">
          <span className="project-icon-text">{project.shortTitle}</span>
        </div>
        <div className="project-visual-glow" />
      </div>

      {/* Content */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Tags */}
        <div className="project-tags">
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
          {project.tags.length > 5 && (
            <span className="tech-tag">+{project.tags.length - 5}</span>
          )}
        </div>

        {/* Expandable Features */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="project-features"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="features-title">Key Features</h4>
              <ul>
                {project.features.map((f, fi) => (
                  <li key={fi}>
                    <span className="feature-dot" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="project-actions">
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub">
                <FiGithub size={16} /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="project-link live" aria-label="Live Demo">
                <FiExternalLink size={16} /> Live
              </a>
            )}
          </div>
          <button
            className="expand-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            {expanded ? 'Less' : 'Details'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p => {
    const matchCat = activeFilter === 'all' || p.category.includes(activeFilter);
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">My Work</p>
          <ScrollRevealText className="section-title">Projects</ScrollRevealText>
          <p className="section-subtitle">
            A selection of software systems and robotics builds showcasing machine learning capabilities.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          className="projects-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="project-search"
            aria-label="Search projects"
          />
          <div className="projects-filter">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} visible={inView} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No projects found matching "{search}"</p>
            </motion.div>
          )}
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          className="projects-github-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="https://github.com/shreyas035"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            <FiGithub size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;