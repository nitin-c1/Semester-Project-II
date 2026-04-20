import { Moon, Shield, Sparkles, SunMedium } from 'lucide-react';
import { sectionMeta } from '../constants/config';

export default function Header({ activeSection, scrollToSection, darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-navy/10 bg-white/70 shadow-sm backdrop-blur-xl transition dark:border-dark-border dark:bg-[#121212]/80 dark:shadow-black/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-brand-light/50 dark:hover:bg-dark-accent/10"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal to-brand-softblue text-white shadow-lg shadow-brand-softblue/25 dark:text-[#121212]">
            <Shield />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-brand-teal dark:text-dark-accent">AI Security Suite</p>
            <h1 className="text-base font-semibold sm:text-lg">Phishing URL Detection System</h1>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {Object.keys(sectionMeta).map((section) => {
            const item = sectionMeta[section];
            const Icon = item.icon;
            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  activeSection === section
                    ? 'bg-brand-navy text-brand-light shadow-lg shadow-brand-navy/15 dark:bg-dark-text dark:text-[#121212]'
                    : 'text-brand-navy/60 hover:bg-white/70 dark:text-dark-subtext dark:hover:bg-dark-accent/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-2xl border border-brand-navy/10 bg-white/45 px-3 py-2 text-xs text-brand-navy/70 backdrop-blur dark:border-dark-border dark:bg-dark-accent/10 dark:text-dark-text sm:flex sm:items-center sm:gap-2">
            <Sparkles className="h-4 w-4 text-brand-softblue dark:text-dark-accent" />
            Mock AI analysis
          </div>
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-2xl border border-brand-navy/10 bg-white/60 p-3 text-brand-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-dark-border dark:bg-dark-accent/10 dark:text-dark-text dark:hover:bg-dark-accent/20"
          >
            {darkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
