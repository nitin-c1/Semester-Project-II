import { motion } from 'framer-motion';
import { AlertTriangle, BadgeCheck, ExternalLink, Globe, Info, Radar, ShieldAlert } from 'lucide-react';

export default function HomeSection({ stats, scrollToSection }) {
  return (
    <section id="home" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] border border-brand-navy/10 bg-white/60 p-7 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-brand-softblue)_0%,_transparent_28%),radial-gradient(circle_at_bottom_left,_var(--color-brand-teal)_0%,_transparent_22%)] opacity-30 dark:opacity-5 mix-blend-plus-lighter" />
        <div className="relative space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-softblue/40 bg-brand-softblue/20 px-4 py-2 text-sm font-medium text-brand-navy dark:border-dark-border dark:bg-dark-bg dark:text-dark-text">
            <Radar className="h-4 w-4" />
            Detect phishing URLs instantly
          </span>
          <div className="space-y-4">
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-brand-navy dark:text-dark-text sm:text-5xl lg:text-6xl">
              Modern URL risk detection with a calm, intelligent security dashboard.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-brand-teal/80 dark:text-dark-subtext sm:text-lg">
              Analyze suspicious links in seconds using a polished phishing detection interface with mock AI scoring,
              SSL checks, keyword inspection, and scan history tracking.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection('scan')}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-3.5 text-sm font-semibold text-brand-light shadow-lg shadow-brand-navy/15 transition hover:-translate-y-0.5 hover:bg-brand-darkteal dark:bg-dark-text dark:text-[#121212] dark:hover:bg-white dark:shadow-none cursor-pointer"
            >
              Check URL Now
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-brand-navy/10 bg-white/50 px-4 py-3 text-sm text-brand-navy/80 backdrop-blur dark:border-dark-border dark:bg-dark-bg/60 dark:text-dark-subtext">
              <Info className="h-4 w-4 text-brand-teal dark:text-dark-accent" />
              Tip: Paste a full URL or domain and let the engine simulate risk signals.
            </div>
          </div>

          <div className="grid gap-4 pt-2 sm:grid-cols-3">
            {[
              ['Threat Signals', 'Keyword, protocol, and structure analysis'],
              ['Risk Score', 'Visual confidence indicator with severity bands'],
              ['Scan History', 'Quick review of previous URL checks'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-navy/10 bg-white/45 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/60 dark:border-dark-border dark:bg-[#1E1E1E] dark:hover:bg-[#2A2A2A] cursor-pointer"
              >
                <p className="text-sm font-semibold text-brand-navy dark:text-dark-text">{title}</p>
                <p className="mt-2 text-sm leading-6 text-brand-teal/80 dark:text-dark-subtext">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid gap-5"
      >
        <div className="rounded-[2rem] border border-brand-navy/10 bg-white/60 p-6 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-teal dark:text-dark-accent">System overview</p>
              <h3 className="mt-1 text-xl font-semibold text-brand-navy dark:text-dark-text">Live posture snapshot</h3>
            </div>
            <div className="rounded-2xl bg-emerald-400/15 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200">
              Operational
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Safe', value: stats.safe, icon: BadgeCheck, tone: 'text-emerald-500' },
              { label: 'Suspicious', value: stats.suspicious, icon: AlertTriangle, tone: 'text-amber-500' },
              { label: 'Phishing', value: stats.phishing, icon: ShieldAlert, tone: 'text-rose-500' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-navy/10 bg-white/55 p-4 text-center transition hover:-translate-y-1 hover:bg-white/70 dark:border-dark-border dark:bg-[#1E1E1E] dark:hover:bg-[#2A2A2A] cursor-pointer"
                >
                  <Icon className={`mx-auto h-5 w-5 ${item.tone}`} />
                  <p className="mt-3 text-2xl font-semibold text-brand-navy dark:text-dark-text">{item.value}</p>
                  <p className="text-sm text-brand-teal/80 dark:text-dark-subtext">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-brand-navy/10 bg-white/60 p-6 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-softblue/20 p-3 text-brand-teal dark:bg-[#222222] dark:text-dark-text">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-brand-teal/80 dark:text-dark-accent">How it works</p>
              <h3 className="text-lg font-semibold text-brand-navy dark:text-dark-text">Fast phishing heuristics</h3>
            </div>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-6 text-brand-teal/80 dark:text-dark-subtext">
            <p>1. Validate URL structure and protocol before analysis begins.</p>
            <p>2. Inspect length, risky keywords, SSL presence, and suspicious domain patterns.</p>
            <p>3. Return a severity level with a visual risk score and traceable history entry.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
