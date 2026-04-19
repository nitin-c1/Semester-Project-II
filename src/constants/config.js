import { History, Home, ScanSearch, ShieldAlert, ShieldCheck, TriangleAlert } from 'lucide-react';

export const statusConfig = {
  safe: {
    label: 'Safe',
    badge: 'bg-emerald-400/10 text-emerald-700 ring-1 ring-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
    icon: ShieldCheck,
    progress: 'from-emerald-300 to-teal-400',
    glow: 'shadow-[0_0_60px_rgba(16,185,129,0.06)] dark:shadow-[0_0_60px_rgba(16,185,129,0.12)]',
    text: 'text-emerald-600 dark:text-emerald-300',
  },
  suspicious: {
    label: 'Suspicious',
    badge: 'bg-amber-400/10 text-amber-700 ring-1 ring-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
    icon: TriangleAlert,
    progress: 'from-amber-200 to-orange-300',
    glow: 'shadow-[0_0_60px_rgba(251,191,36,0.06)] dark:shadow-[0_0_60px_rgba(251,191,36,0.12)]',
    text: 'text-amber-600 dark:text-amber-300',
  },
  phishing: {
    label: 'Phishing',
    badge: 'bg-rose-400/10 text-rose-700 ring-1 ring-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
    icon: ShieldAlert,
    progress: 'from-rose-300 to-red-400',
    glow: 'shadow-[0_0_60px_rgba(244,63,94,0.06)] dark:shadow-[0_0_60px_rgba(244,63,94,0.12)]',
    text: 'text-rose-600 dark:text-rose-300',
  },
};

export const sectionMeta = {
  home: { label: 'Home', icon: Home },
  scan: { label: 'Scan', icon: ScanSearch },
  history: { label: 'History', icon: History },
};
