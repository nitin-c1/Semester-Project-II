import { suspiciousTerms } from '../constants/mockData';
import { formatTimestamp, normalizeUrl } from './formatters';

export function simulateScan(rawUrl) {
  const url = normalizeUrl(rawUrl.trim());
  const lowerUrl = url.toLowerCase();
  const suspiciousKeywords = suspiciousTerms.filter((term) => lowerUrl.includes(term));
  const hasHttps = lowerUrl.startsWith('https://');
  const hasIpAddress = /https?:\/\/(\d{1,3}\.){3}\d{1,3}/.test(lowerUrl);
  const hasManyHyphens = (lowerUrl.match(/-/g) || []).length >= 3;
  const hasLongLength = url.length > 75;
  const hasSuspiciousTld = /\.(xyz|top|click|buzz|shop|gq)(\/|$)/.test(lowerUrl);
  const score = Math.min(
    100,
    10 +
      suspiciousKeywords.length * 18 +
      (hasHttps ? 0 : 18) +
      (hasIpAddress ? 20 : 0) +
      (hasManyHyphens ? 12 : 0) +
      (hasLongLength ? 14 : 0) +
      (hasSuspiciousTld ? 16 : 0),
  );

  let status = 'safe';
  if (score >= 70) status = 'phishing';
  else if (score >= 35) status = 'suspicious';

  const domainAge =
    status === 'safe' ? 'Established domain' : status === 'suspicious' ? 'Age unavailable' : 'Recently registered';
  const sslStatus = hasHttps ? 'Valid SSL' : 'Missing SSL';

  const summaryMap = {
    safe: 'Low-risk URL profile detected with limited phishing indicators.',
    suspicious: 'Some patterns resemble phishing attempts. Manual review is recommended.',
    phishing: 'High-risk phishing indicators detected. Avoid interacting with this URL.',
  };

  return {
    id: Date.now(),
    url,
    status,
    riskScore: score,
    urlLength: url.length,
    suspiciousKeywords,
    domainAge,
    sslStatus,
    timestamp: formatTimestamp(),
    summary: summaryMap[status],
  };
}
