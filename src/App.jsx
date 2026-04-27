import { useEffect, useMemo, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HistorySection from './components/HistorySection';
import HomeSection from './components/HomeSection';
import ScanSection from './components/ScanSection';
import { initialHistory } from './constants/mockData';
import { isValidUrl } from './utils/formatters';
import { simulateScan } from './utils/scanner';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true;
  });
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(initialHistory);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const stats = useMemo(() => {
    const safe = history.filter((item) => item.status === 'safe').length;
    const suspicious = history.filter((item) => item.status === 'suspicious').length;
    const phishing = history.filter((item) => item.status === 'phishing').length;
    return { safe, suspicious, phishing };
  }, [history]);

  const handleScan = () => {
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a URL to analyze.');
      return;
    }

    if (!isValidUrl(url.trim())) {
      setError('Enter a valid URL such as example.com or https://example.com.');
      return;
    }

    setLoading(true);
    setActiveSection('scan');

    window.setTimeout(() => {
      const scanned = simulateScan(url);
      setResult(scanned);
      setHistory((current) => [scanned, ...current].slice(0, 8));
      setLoading(false);
    }, 1400);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="relative min-h-screen bg-brand-light text-brand-navy transition-colors duration-500 dark:bg-dark-bg dark:text-dark-text">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_var(--color-brand-softblue)_0%,_transparent_35%),radial-gradient(circle_at_top_right,_var(--color-brand-teal)_0%,_transparent_35%)] opacity-30 dark:opacity-0 mix-blend-multiply dark:mix-blend-normal" />
        
        <Header
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <main className="space-y-8 pt-8 sm:space-y-10 sm:pt-10">
            <HomeSection stats={stats} scrollToSection={scrollToSection} />

            <ScanSection
              url={url}
              setUrl={setUrl}
              handleScan={handleScan}
              loading={loading}
              error={error}
              result={result}
            />

            <HistorySection history={history} setHistory={setHistory} />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
