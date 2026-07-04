import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FiAward,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiTarget,
  FiZap,
  FiChevronDown,
  FiChevronUp,
  FiGithub,
  FiExternalLink,
} from 'react-icons/fi';
import { ecoTrack } from '../data/hackathon';
import ScrollRevealText from './ScrollRevealText';

const HackathonSpotlight = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);

  const meta = [
    { icon: <FiAward size={16} />, label: 'Result', value: ecoTrack.result },
    { icon: <FiCalendar size={16} />, label: 'Event', value: ecoTrack.event },
    { icon: <FiTarget size={16} />, label: 'Track', value: ecoTrack.track },
    { icon: <FiUsers size={16} />, label: 'Team', value: ecoTrack.team },
    { icon: <FiMapPin size={16} />, label: 'Institution', value: ecoTrack.institution },
  ];

  return (
    <section id="hackathon" className="section hackathon-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">National Hackathon</p>
          <ScrollRevealText className="section-title">Hackathon Spotlight</ScrollRevealText>
          <p className="section-subtitle">
            Building under pressure — from idea to working prototype in a national competition.
          </p>
        </motion.div>

        {/* Spotlight Card */}
        <motion.div
          className="hack-spotlight glass-card"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Result Badge */}
          <div className="hack-result-badge">
            <FiAward size={18} />
            <span>{ecoTrack.result}</span>
          </div>

          {/* Hero Header */}
          <div className="hack-hero">
            <div className="hack-hero-text">
              <span className="hack-event-tag">{ecoTrack.event}</span>
              <h3 className="hack-title">{ecoTrack.title}</h3>
              <p className="hack-tagline">{ecoTrack.tagline}</p>
            </div>
            <div className="hack-hero-glow" />
          </div>

          {/* Meta Grid */}
          <div className="hack-meta-grid">
            {meta.map((item, i) => (
              <motion.div
                key={item.label}
                className="hack-meta-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              >
                <span className="hack-meta-icon">{item.icon}</span>
                <div>
                  <span className="hack-meta-label">{item.label}</span>
                  <span className="hack-meta-value">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className="hack-description">
            <p>{ecoTrack.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="hack-tech-row">
            <span className="hack-tech-label">
              <FiZap size={14} /> Tech Stack
            </span>
            <div className="hack-tech-pills">
              {ecoTrack.techStack.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Expandable Detail Sections */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                className="hack-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Problem */}
                <div className="hack-detail-block">
                  <h4 className="hack-detail-heading">
                    <span className="hack-detail-marker" /> The Problem
                  </h4>
                  <p>{ecoTrack.problem}</p>
                </div>

                {/* Approach */}
                <div className="hack-detail-block">
                  <h4 className="hack-detail-heading">
                    <span className="hack-detail-marker approach" /> Our Approach
                  </h4>
                  <p>{ecoTrack.approach}</p>
                </div>

                {/* Highlights */}
                <div className="hack-detail-block">
                  <h4 className="hack-detail-heading">
                    <span className="hack-detail-marker highlights" /> Highlights
                  </h4>
                  <ul className="hack-highlights-list">
                    {ecoTrack.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="hack-highlight-dot" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* My Role */}
                <div className="hack-detail-block">
                  <h4 className="hack-detail-heading">
                    <span className="hack-detail-marker role" /> My Role
                  </h4>
                  <p>{ecoTrack.myRole}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="hack-actions">
            <button
              className="hack-expand-btn"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? 'Show less' : 'Read more'}
            >
              {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              {expanded ? 'Show Less' : 'Read the Full Story'}
            </button>
            <div className="hack-links">
              {ecoTrack.links.github && ecoTrack.links.github !== '#' && (
                <a
                  href={ecoTrack.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  <FiGithub size={16} /> Code
                </a>
              )}
              {ecoTrack.links.demo && ecoTrack.links.demo !== '#' && (
                <a
                  href={ecoTrack.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link live"
                >
                  <FiExternalLink size={16} /> Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonSpotlight;
