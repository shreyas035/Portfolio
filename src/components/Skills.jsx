import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { skillCategories } from '../data/skills';
import NeuralNetwork from './NeuralNetwork';
import PhysicsSandbox from './PhysicsSandbox';
import ScrollRevealText from './ScrollRevealText';

const SkillBar = ({ skill, index, visible }) => (
  <motion.div
    className="skill-item"
    initial={{ opacity: 0, x: -20 }}
    animate={visible ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <div className="skill-info">
      <div className="skill-icon-name">
        <skill.icon size={18} color={skill.color} />
        <span className="skill-name">{skill.name}</span>
      </div>
      <span className="skill-percent">{skill.level}%</span>
    </div>
    <div className="skill-bar-bg">
      <motion.div
        className="skill-bar-fill"
        style={{ background: skill.color }}
        initial={{ width: 0 }}
        animate={visible ? { width: `${skill.level}%` } : {}}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.06, ease: 'easeOut' }}
      />
    </div>
  </motion.div>
);

const radarData = [
  { subject: 'ML & Deep Learning', value: 85, fullMark: 100 },
  { subject: 'Python Development', value: 90, fullMark: 100 },
  { subject: 'Computer Vision', value: 85, fullMark: 100 },
  { subject: 'Robotics & Hardware', value: 82, fullMark: 100 },
  { subject: 'Frontend (React)', value: 72, fullMark: 100 },
  { subject: 'Databases & Tools', level: 78, value: 78, fullMark: 100 },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [visualization, setVisualization] = useState('radar');

  const displayed = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === activeCategory);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Technical Skills</p>
          <ScrollRevealText className="section-title">My Tech Stack</ScrollRevealText>
          <p className="section-subtitle">
            A comprehensive set of technologies I use to train intelligent models and write efficient systems.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="skills-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Stack
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span> {cat.title.split(' ')[0]}
            </button>
          ))}
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          <AnimatePresence mode="wait">
            {displayed.map((cat, ci) => (
              <motion.div
                key={cat.id}
                className="skill-category-card glass-card"
                style={{ '--cat-color': cat.color }}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.4, delay: ci * 0.08 }}
              >
                <div className="cat-header">
                  <span className="cat-icon">{cat.icon}</span>
                  <h3 className="cat-title">{cat.title}</h3>
                  <span className="cat-count">{cat.skills.length}</span>
                </div>
                <div className="cat-divider" style={{ background: cat.gradient }} />
                <div className="skill-list">
                  {cat.skills.map((skill, si) => (
                    <SkillBar key={skill.name} skill={skill} index={si} visible={inView} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Recharts Radar Chart / Neural Network Toggle */}
        <motion.div
          className="skills-chart-section"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Toggle Tabs */}
          <div className="skills-filter" style={{ marginBottom: '28px' }}>
            <button
              className={`filter-btn ${visualization === 'radar' ? 'active' : ''}`}
              onClick={() => setVisualization('radar')}
            >
              📊 Skills Radar
            </button>
            <button
              className={`filter-btn ${visualization === 'neural' ? 'active' : ''}`}
              onClick={() => setVisualization('neural')}
            >
              🧠 Neural Net Live
            </button>
            <button
              className={`filter-btn ${visualization === 'physics' ? 'active' : ''}`}
              onClick={() => setVisualization('physics')}
            >
              ☄️ Physics Sandbox
            </button>
          </div>

          <div className="radar-chart-container" style={{ minHeight: '380px', width: '100%' }}>
            {visualization === 'radar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)' }} />
                  <Radar
                    name="Shreyas"
                    dataKey="value"
                    stroke="#00f2fe"
                    fill="#9d4edd"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : visualization === 'neural' ? (
              <NeuralNetwork />
            ) : (
              <PhysicsSandbox />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;