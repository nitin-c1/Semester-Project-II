// This function handles the "Feature Extraction" part of your project [cite: 4, 10]
export const analyzeURLPattern = (url) => {
  const redFlags = [];

  // 1. Check URL Length [cite: 5]
  // Phishing URLs often use excessive length to hide malicious patterns [cite: 5]
  if (url.length > 75) {
    redFlags.push("Excessive URL length detected.");
  }

  // 2. Check for unusual symbols [cite: 5]
  // Unusual symbols like '@' can be used to trick domain structure recognition [cite: 5]
  if (url.includes('@')) {
    redFlags.push("Unusual symbol '@' found (potential credential theft attempt).");
  }

  // 3. Check for suspicious keywords [cite: 5]
  // Detection of suspicious keywords helps identify semantic irregularities [cite: 5]
  const keywords = ['login', 'verify', 'bank', 'secure', 'update', 'account', 'signin'];
  keywords.forEach(word => {
    if (url.toLowerCase().includes(word)) {
      redFlags.push(`Suspicious keyword found: "${word}"`);
    }
  });

  // 4. Check for IP address instead of domain [cite: 5]
  // Use of an IP address is a common indicator of an abnormal domain structure [cite: 5]
  const ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
  if (ipPattern.test(url)) {
    redFlags.push("URL uses an IP address instead of a verified domain name.");
  }

  // --- NEW RISK SCORE LOGIC ---
  // We assign a 25% risk weight to each critical indicator found [cite: 5]
  const score = Math.min(redFlags.length * 25, 100); 

  return {
    isSuspicious: redFlags.length > 0,
    reasons: redFlags,
    score: score // This new field will drive your UI's Risk Meter
  };
};