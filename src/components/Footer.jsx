export default function Footer() {
  return (
    <footer className="mt-10 rounded-[2rem] border border-brand-navy/10 bg-white/55 px-6 py-5 shadow-[0_20px_60px_rgba(32,47,90,0.06)] backdrop-blur-2xl dark:border-dark-border dark:bg-[#1A1A1A]/90 dark:shadow-black/50 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-navy dark:text-dark-text">Phishing URL Detection System</p>
          <p className="mt-1 text-sm text-brand-teal/80 dark:text-dark-subtext">
            Smart phishing detection for a safer web experience.
          </p>
        </div>
        <div className="text-sm text-brand-teal/60 dark:text-dark-subtext/70">Detect. Analyze. Protect.</div>
      </div>
    </footer>
  );
}
