import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { statusConfig } from '../constants/config';

export default function HistorySection({ history, setHistory }) {
  return (
    <section id="history" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="rounded-[2rem] border border-brand-navy/10 bg-white/60 p-6 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:p-8"
      >
        <p className="text-sm text-brand-teal dark:text-dark-accent">History section</p>
        <h3 className="mt-1 text-2xl font-semibold text-brand-navy dark:text-dark-text">Previous scans at a glance</h3>
        <p className="mt-4 text-sm leading-6 text-brand-teal/80 dark:text-dark-subtext">
          Keep track of recent URL checks, review timestamps, and clear the queue whenever you want a fresh workspace.
        </p>

        <div className="mt-6 space-y-4">
          {[
            { label: 'Total scans', value: history.length.toString().padStart(2, '0') },
            { label: 'Latest action', value: history[0]?.timestamp ?? 'No activity' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-brand-navy/10 bg-white/50 p-4 dark:border-dark-border dark:bg-[#1E1E1E]"
            >
              <p className="text-sm text-brand-teal/80 dark:text-dark-subtext">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-brand-navy dark:text-dark-text">{item.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setHistory([])}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-brand-navy/10 bg-brand-navy/5 px-4 py-3 text-sm font-medium text-brand-navy transition hover:bg-brand-navy/10 dark:border-dark-border dark:bg-dark-accent/10 dark:text-dark-text dark:hover:bg-dark-accent/20"
        >
          <X className="h-4 w-4" />
          Clear history
        </button>
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
            <p className="text-sm text-brand-teal dark:text-dark-accent">Recent activity</p>
            <h3 className="mt-1 text-2xl font-semibold text-brand-navy dark:text-dark-text">Scanned URLs</h3>
          </div>
          <div className="rounded-2xl border border-brand-navy/10 bg-white/55 px-3 py-2 text-xs text-brand-navy/60 dark:border-dark-border dark:bg-[#1E1E1E] dark:text-dark-subtext">
            {history.length} entries
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {history.length ? (
            history.map((item) => {
              const config = statusConfig[item.status];
              const Icon = config.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-brand-navy/10 bg-white/50 p-4 transition hover:-translate-y-1 hover:bg-white/80 dark:border-dark-border dark:bg-[#2A2A2A] dark:hover:bg-[#333333]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-transparent dark:border-dark-border ${config.badge}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {config.label}
                      </div>
                      <p className="mt-3 break-all text-sm font-medium text-brand-navy dark:text-dark-text sm:text-base">{item.url}</p>
                      <p className="mt-2 text-sm leading-6 text-brand-teal/80 dark:text-dark-subtext">{item.summary}</p>
                    </div>
                    <div className="space-y-2 text-sm text-brand-teal/60 dark:text-dark-subtext/70 sm:text-right">
                      <p>{item.timestamp}</p>
                      <p>Risk score: {item.riskScore}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-brand-navy/20 bg-white/35 px-6 py-12 text-center text-sm text-brand-navy/50 dark:border-dark-border dark:bg-[#1E1E1E] dark:text-dark-subtext">
              History is empty. Scan a URL to populate recent activity.
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
