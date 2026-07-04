import { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import HackathonSpotlight from './components/HackathonSpotlight';
import Certificates from './components/Certificates';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SoundManager from './components/SoundManager';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shreyas Jadhav | AI / ML Developer & Robotics Enthusiast</title>
        <meta
          name="description"
          content="Shreyas Jadhav — Computer Engineering Student specializing in Artificial Intelligence, Machine Learning, Computer Vision, and Robotics. Building intelligent systems from Pune, India."
        />
        <meta
          name="keywords"
          content="Shreyas Jadhav, AI Developer, ML Developer, Computer Vision, Robotics, ESP32, savitribai phule pune university, SPPU, Python, Portfolio, Pune India"
        />
        <meta name="author" content="Shreyas Jadhav" />
        <meta property="og:title" content="Shreyas Jadhav | AI / ML Developer & Robotics Enthusiast" />
        <meta
          property="og:description"
          content="Building intelligent systems using Machine Learning, Computer Vision, and Robotics hardware integrations."
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#9d4edd" />
      </Helmet>

      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Cursor />
          <ParticleBackground />
          <ScrollProgress />
          <SoundManager />
          <MusicPlayer />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Terminal />
            <Projects />
            <HackathonSpotlight />
            <Certificates />
            <Gallery />
            <Contact />
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0d1220',
                color: '#f1f5f9',
                border: '1px solid rgba(157, 78, 221, 0.25)',
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
              },
              success: {
                iconTheme: { primary: '#00f2fe', secondary: '#0d1220' },
              },
            }}
          />
        </>
      )}
    </HelmetProvider>
  );
};

export default App;