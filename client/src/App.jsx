import { useMemo, useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import HistorySection from './components/HistorySection';
import HomeSection from './components/HomeSection';
import ScanSection from './components/ScanSection';
import AnimatedBackground from './components/AnimatedBackground';

import { useScan } from './hooks/useScan';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return true;
  });

  const {
    url,
    setUrl,
    loading,
    error,
    result,
    history,
    clearHistory,
    handleScan,
    handleAiScan,
    loadingAi
  } = useScan();

  const stats = useMemo(() => {
    const safe = history.filter((item) => item.status === 'safe').length;
    const suspicious = history.filter((item) => item.status === 'suspicious').length;
    const phishing = history.filter((item) => item.status === 'phishing').length;
    return { safe, suspicious, phishing };
  }, [history]);

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
        
        <AnimatedBackground darkMode={darkMode} />

        <Header
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <main className="space-y-8 sm:space-y-10">

            <HomeSection stats={stats} scrollToSection={scrollToSection} />

            <ScanSection
              url={url}
              setUrl={setUrl}
              handleScan={handleScan}
              handleAiScan={handleAiScan}
              loading={loading}
              loadingAi={loadingAi}
              error={error}
              result={result}
            />

            <HistorySection history={history} setHistory={clearHistory} />

          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;