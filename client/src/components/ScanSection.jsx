import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Clock3, Globe, Info, Lock, ScanSearch, X } from 'lucide-react';
import { statusConfig } from '../constants/config';
import { demoUrls } from '../constants/demoUrls';

export default function ScanSection({ url, setUrl, handleScan, handleAiScan, loading, loadingAi, error, result }) {
  return (
    <section id="scan" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="rounded-[2rem] border border-brand-navy/10 bg-white/60 p-6 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-brand-teal dark:text-dark-accent">URL Scanner</p>
            <h3 className="mt-1 text-2xl font-semibold text-brand-navy dark:text-dark-text">Analyze a link before you click</h3>
          </div>
          <div className="group relative hidden sm:block">
            <button className="rounded-2xl border border-brand-navy/10 bg-white/55 p-3 text-brand-teal transition hover:bg-white/70 dark:border-dark-border dark:bg-[#1E1E1E] dark:text-dark-text dark:hover:bg-[#2A2A2A] cursor-pointer">
              <Info className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute right-0 top-14 w-64 rounded-2xl border border-brand-navy/10 bg-brand-navy px-4 py-3 text-xs leading-5 text-brand-light opacity-0 shadow-xl transition duration-200 group-hover:opacity-100 dark:border-dark-border dark:bg-[#1c1c1c] dark:text-dark-subtext">
              We simulate a phishing engine using URL heuristics like protocol, keywords, length, and suspicious patterns.
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-brand-navy/80 dark:text-dark-subtext">Enter URL</label>
          <div className="rounded-3xl border border-brand-navy/10 bg-white/75 p-2 shadow-inner shadow-brand-navy/5 dark:border-dark-border dark:bg-[#1E1E1E] dark:shadow-black/20">
            <div className="flex flex-col gap-3 sm:flex-row flex-wrap">
              <div className="flex flex-1 items-center gap-3 rounded-[1.4rem] bg-white/80 px-4 py-3 dark:bg-[#2A2A2A] w-full">
                <Globe className="h-5 w-5 text-brand-teal dark:text-dark-accent" />
                <input
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com/login"
                  className="w-full bg-transparent text-sm font-medium text-brand-navy outline-none placeholder:text-brand-navy/40 dark:text-dark-text dark:placeholder:text-dark-subtext/50"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const randomUrl = demoUrls[Math.floor(Math.random() * demoUrls.length)];
                    setUrl(randomUrl);
                  }}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-[1.4rem] border border-brand-navy/20 bg-transparent px-4 py-3.5 text-sm font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:bg-brand-navy/5 dark:border-dark-border dark:text-dark-text dark:hover:bg-white/5 cursor-pointer whitespace-nowrap"
                >
                  Select Demo URL
                </button>
                <button
                  onClick={handleScan}
                  disabled={loading || loadingAi}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-[1.4rem] bg-brand-navy px-5 py-3.5 text-sm font-semibold text-brand-light shadow-lg shadow-brand-navy/20 transition hover:-translate-y-0.5 hover:bg-brand-darkteal disabled:cursor-not-allowed disabled:opacity-70 dark:bg-dark-text dark:text-[#121212] dark:hover:bg-white dark:shadow-none cursor-pointer whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <ScanSearch className="h-4 w-4" />
                      Scan URL
                    </>
                  )}
                </button>
                <button
                  onClick={handleAiScan}
                  disabled={loading || loadingAi}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-[1.4rem] bg-brand-teal px-5 py-3.5 text-sm font-semibold text-brand-light shadow-lg shadow-brand-teal/20 transition hover:-translate-y-0.5 hover:bg-brand-teal/80 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#2A2A2A] dark:text-white dark:hover:bg-[#333333] dark:shadow-none cursor-pointer whitespace-nowrap border border-brand-teal dark:border-[#444444]"
                >
                  {loadingAi ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <ScanSearch className="h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {error ? (
            <div className="flex items-center gap-2 rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
              <X className="h-4 w-4" />
              {error}
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Lock,
              title: 'SSL awareness',
              text: 'Flags whether the URL uses HTTPS and a likely valid secure connection.',
            },
            {
              icon: AlertTriangle,
              title: 'Keyword analysis',
              text: 'Detects suspicious terms often used in phishing and impersonation campaigns.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-navy/10 bg-white/50 p-4 transition hover:-translate-y-1 hover:bg-white/70 dark:border-dark-border dark:bg-[#1E1E1E] dark:hover:bg-[#2A2A2A] cursor-pointer"
              >
                <Icon className="h-5 w-5 text-brand-teal dark:text-dark-text" />
                <p className="mt-3 font-semibold text-brand-navy dark:text-dark-text">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-brand-teal/80 dark:text-dark-subtext">{item.text}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="rounded-[2rem] border border-brand-navy/10 bg-white/60 p-6 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-brand-teal dark:text-dark-accent">Result visualization</p>
            <h3 className="mt-1 text-2xl font-semibold text-brand-navy dark:text-dark-text">Risk insight panel</h3>
          </div>
          <div className="rounded-2xl border border-brand-navy/10 bg-white/55 px-3 py-2 text-xs text-brand-navy/60 dark:border-dark-border dark:bg-[#1E1E1E] dark:text-dark-subtext">
            Animated output
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35 }}
              className={`mt-6 rounded-[1.8rem] border border-white/40 bg-white/70 p-5 backdrop-blur dark:border-dark-border dark:bg-[#1E1E1E] ${statusConfig[result.status].glow}`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium border border-transparent dark:border-dark-border ${statusConfig[result.status].badge}`}>
                    {(() => {
                      const Icon = statusConfig[result.status].icon;
                      return <Icon className="h-4 w-4" />;
                    })()}
                    {statusConfig[result.status].label}
                  </div>
                  <p className="mt-4 text-sm text-brand-teal/80 dark:text-dark-subtext">Scanned URL</p>
                  <p className="mt-1 break-all text-base font-medium text-brand-navy dark:text-dark-text sm:text-lg">{result.url}</p>
                  {result.isFallback && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-orange-100 px-3 py-2 text-sm text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50">
                      <AlertTriangle className="h-4 w-4" />
                      AI analysis unavailable, showing estimated result
                    </div>
                  )}
                  <div className="mt-4 max-w-xl text-sm leading-6 text-brand-navy/80 dark:text-dark-text/90">
                    <p className="font-medium text-brand-navy dark:text-dark-text mb-1">Analysis Summary:</p>
                    <p>{result.summary}</p>
                    {result.reasons && result.reasons.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-brand-navy/70 dark:text-dark-subtext">
                        {result.reasons.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-brand-navy/10 bg-white/50 p-4 text-center dark:border-dark-border dark:bg-[#2A2A2A]">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-navy/40 dark:text-dark-subtext">
                    {result.isAiAnalysis ? 'Phishing Probability' : 'Risk score'}
                  </p>
                  <p className={`mt-2 text-4xl font-semibold ${statusConfig[result.status].text}`}>
                    {result.riskScore}{result.isAiAnalysis ? '%' : ''}
                  </p>
                  <p className="text-xs text-brand-navy/50 dark:text-dark-subtext/70">
                    {result.isAiAnalysis ? 'chance of phishing' : 'out of 100'}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-3 overflow-hidden rounded-full bg-brand-navy/5 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.riskScore}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${statusConfig[result.status].progress}`}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'URL Length', value: `${result.urlLength} chars`, icon: Globe },
                  {
                    label: 'Suspicious Flags',
                    value: result?.reasons?.length
                      ? 'See analysis summary'
                      : 'None found',
                    icon: AlertTriangle,
                  },
                  { label: 'Domain Age', value: result.domainAge, icon: Clock3 },
                  { label: 'SSL Status', value: result.sslStatus, icon: Lock },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-brand-navy/10 bg-white/60 p-4 transition hover:-translate-y-1 hover:bg-white/70 dark:border-dark-border dark:bg-[#2A2A2A] dark:hover:bg-[#333333] cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-brand-teal/80 dark:text-dark-subtext">
                        <Icon className="h-4 w-4" />
                        <p className="text-xs uppercase tracking-[0.18em]">{item.label}</p>
                      </div>
                      <p className="mt-3 text-sm font-medium leading-6 text-brand-navy dark:text-dark-text">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex min-h-[360px] flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-brand-navy/20 bg-white/35 px-6 text-center dark:border-dark-border dark:bg-dark-bg/40"
            >
              <div className="rounded-full bg-brand-softblue/20 p-4 text-brand-teal dark:text-dark-accent dark:bg-[#1E1E1E]">
                <ScanSearch className="h-8 w-8" />
              </div>
              <h4 className="mt-5 text-xl font-semibold text-brand-navy dark:text-dark-text">No scan yet</h4>
              <p className="mt-3 max-w-md text-sm leading-6 text-brand-teal/80 dark:text-dark-subtext">
                Submit a URL to view its simulated phishing risk, supporting signals, and a polished visual summary.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
