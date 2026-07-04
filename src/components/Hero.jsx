import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { SiPython, SiPytorch, SiOpencv } from 'react-icons/si';
import { FaRobot } from 'react-icons/fa';

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/shreyas035', label: 'GitHub', color: '#f1f5f9' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/shreyas-jadhav-5969b0362', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FiMail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shreyasj647@gmail.com', label: 'Gmail', color: '#EA4335' },
];

const Hero = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const profilePhotoUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80';

  return (
    <section id="home" className="hero-section">
      {/* Grid Lines & Glow Effects */}
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="container hero-container">
        {/* Left — Text Content */}
        <div className="hero-content">
          {/* Greeting */}
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
          >
            <span className="greeting-badge">
              <span className="greeting-dot" />
              Available for projects
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}
          >
            Hi, I'm
            <br />
            <span className="hero-name">Shreyas Jadhav</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            className="hero-typing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
          >
            <span className="typing-prefix">{'>'} </span>
            <TypeAnimation
              sequence={[
                'AI / ML Developer', 2000,
                'Computer Vision Enthusiast', 2000,
                'Robotics Hobbyist', 2000,
                'Python Specialist', 2000,
                'UAV Drone Designer', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }}
          >
            Building <strong>intelligent, data-driven systems</strong> utilizing Machine Learning and Computer Vision algorithms. Integrating advanced models with actual robotics hardware to create autonomous solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
          >
            <a href="/Shreyas Jadhav Resume New.pdf" target="_blank" rel="noreferrer" className="btn-primary hero-btn">
              <FiDownload size={16} />
              View Resume
            </a>
            <button className="btn-outline hero-btn" onClick={() => scrollTo('projects')}>
              View Projects
              <FiArrowRight size={16} />
            </button>
            <button className="btn-outline hero-btn hero-hire" onClick={() => scrollTo('contact')}>
              Hire Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.6 }}
          >
            <span className="socials-label">Connect:</span>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label={s.label}
                title={s.label}
                style={{ '--social-color': s.color }}
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Profile Photo & Holographic Sphere */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.3 }}
        >
          {/* Rotating Rings with revolving tech skill nodes */}
          <div className="profile-ring profile-ring-outer">
            <div className="orbit-node node-python" title="Python">
              <SiPython size={16} />
            </div>
            <div className="orbit-node node-opencv" title="OpenCV">
              <SiOpencv size={16} />
            </div>
            <div className="orbit-node node-pytorch" title="PyTorch">
              <SiPytorch size={16} />
            </div>
            <div className="orbit-node node-arduino" title="Arduino/Robotics">
              <FaRobot size={16} />
            </div>
          </div>
          <div className="profile-ring profile-ring-inner" />

          {/* Glowing central photo wrap */}
          <div className="profile-photo-wrap">
            <div className="profile-photo">
              <img
                src="/ProfilePhoto.jpg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80';
                }}
                alt="Shreyas Jadhav"
              />
            </div>
          </div>

          {/* Floating statistics widgets */}
          <motion.div
            className="float-badge badge-1"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="badge-icon">🧠</span>
            <div>
              <p className="badge-value">AI / ML</p>
              <p className="badge-label">Computer Vision</p>
            </div>
          </motion.div>

          <motion.div
            className="float-badge badge-2"
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="badge-icon">🤖</span>
            <div>
              <p className="badge-value">7+</p>
              <p className="badge-label">Total Projects</p>
            </div>
          </motion.div>

          <motion.div
            className="float-badge badge-3"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="badge-icon">🎓</span>
            <div>
              <p className="badge-value">B.E.</p>
              <p className="badge-label">Comp Eng</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
