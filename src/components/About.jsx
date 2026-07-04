import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline, stats } from '../data/certificates';
import ScrollRevealText from './ScrollRevealText';

const StatCounter = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start = Math.min(start + increment, value);
      setCount(Math.floor(start));
      if (start >= value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="stat-card">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const profilePhotoUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80';

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About Me</p>
          <ScrollRevealText className="section-title">Who I Am</ScrollRevealText>
          <p className="section-subtitle">
            An engineering student specializing in Artificial Intelligence and Machine Learning, motivated to bridge algorithms and physical hardware.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Bio Description Card */}
          <motion.div
            className="about-bio glass-card"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bio-top">
              <div className="bio-avatar">
                <img
                  src="/ProfilePhoto.jpg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80';
                  }}
                  alt="Shreyas Jadhav"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <div>
                <h3 className="bio-name">Shreyas Jadhav</h3>
                <p className="bio-role">AI / ML & Robotics Developer</p>
                <p className="bio-location">📍 Pune, Maharashtra, India</p>
              </div>
            </div>

            <p className="bio-text">
              I am pursuing a <strong>B.E. in Computer Engineering</strong> under Savitribai Phule Pune University. My core focus lies in training neural architectures, computer vision models, and building data processing pipelines.
            </p>
            <p className="bio-text">
              Beyond digital code, I enjoy designing drone telemetry setups and configuring ESP32 nodes. I enjoy combining machine learning systems with physical microcontrollers to build autonomous robotics projects.
            </p>

            <div className="bio-details">
              <div className="bio-detail">
                <span className="detail-label">🎓 Education</span>
                <span className="detail-value">B.E. Computer Engineering — Savitribai Phule Pune University</span>
              </div>
              <div className="bio-detail">
                <span className="detail-label">💼 Status</span>
                <span className="detail-value available">Open to Collaboration</span>
              </div>
              <div className="bio-detail">
                <span className="detail-label">🌐 Languages</span>
                <span className="detail-value">English, Hindi, Marathi</span>
              </div>
            </div>

            <div className="bio-actions">
              <a href="/Shreyas Jadhav Resume New.pdf" target="_blank" rel="noreferrer" className="btn-primary">
                View Resume
              </a>
              <a href="#contact" className="btn-outline">
                Let's Talk
              </a>
            </div>
          </motion.div>

          {/* Vertical Timeline Journey */}
          <motion.div
            className="about-timeline"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="timeline-title">My Journey</h3>
            <div className="timeline">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className={`timeline-item timeline-${item.type}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <div className="timeline-dot">
                    <span>{item.icon}</span>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-heading">{item.title}</h4>
                    <p className="timeline-org">{item.org}</p>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* GitHub Performance stats */}
        <motion.div
          className="github-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <img
            src="https://github-readme-stats-sigma-five.vercel.app/api?username=shreyas035&show_icons=true&theme=transparent&hide_border=true&text_color=94a3b8&icon_color=00f2fe&title_color=9d4edd"
            alt="GitHub Stats"
            className="github-stat-img"
            loading="lazy"
          />
          <img
            src="https://streak-stats.demolab.com?user=shreyas035&theme=transparent&hide_border=true&stroke=9d4edd&ring=00f2fe&fire=f72585&currStreakLabel=94a3b8&sideLabels=94a3b8"
            alt="GitHub Streak"
            className="github-stat-img"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;