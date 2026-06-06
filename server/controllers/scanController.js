import { checkSafeBrowsing } from '../services/safeBrowsingService.js';
import { analyzeUrlWithAi, testOpenRouterConnection } from '../services/aiService.js';

export const checkUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid URL string.' });
    }

    let isPhishing = false;
    let finalScore = 0;
    let reasons = [];

    // --- Heuristic Rules Check ---
    const suspiciousKeywords = ['login', 'verify', 'update', 'secure', 'account', 'banking', 'auth', 'wallet', 'confirm', 'password'];
    const lowerUrl = url.toLowerCase();
    
    let heuristicScore = 0;

    // Rule 1: IP Address instead of domain
    const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    if (ipPattern.test(url)) {
      heuristicScore += 40;
      reasons.push("Uses an IP address instead of a domain name.");
    }

    // Rule 2: Too long URL
    if (url.length > 75) {
      heuristicScore += 10;
      reasons.push("URL is unusually long.");
    }

    // Rule 3: Missing HTTPS
    if (url.startsWith('http://')) {
      heuristicScore += 15;
      reasons.push("Uses unencrypted HTTP connection.");
    }

    // Rule 4: Suspicious Keywords
    const foundKeywords = suspiciousKeywords.filter(kw => lowerUrl.includes(kw));
    if (foundKeywords.length > 0) {
      heuristicScore += 15 * foundKeywords.length;
      reasons.push(`Contains suspicious keywords: ${foundKeywords.join(', ')}.`);
    }

    // Rule 5: '@' symbol in URL
    if (url.includes('@')) {
      heuristicScore += 50;
      reasons.push("Contains '@' symbol, often used to hide the real domain.");
    }
    
    // Rule 6: Multiple subdomains
    try {
      let urlStr = url;
      if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
        urlStr = 'http://' + urlStr;
      }
      const urlObj = new URL(urlStr);
      const hostParts = urlObj.hostname.split('.');
      if (hostParts.length > 3) {
        heuristicScore += 20;
        reasons.push("Uses multiple subdomains which is typical in phishing.");
      }
    } catch (e) {
      heuristicScore += 10;
      reasons.push("URL has an irregular structure.");
    }

    finalScore = Math.min(100, heuristicScore);
    if (finalScore >= 50) {
      isPhishing = true;
    }

    // --- Google Safe Browsing API check ---
    const safeBrowsingResult = await checkSafeBrowsing(url);
    if (safeBrowsingResult.isPhishing) {
      isPhishing = true;
      finalScore = 100; // Automatic 100 score for API matches
      if (!reasons.includes("Flagged by Google Safe Browsing as malicious.")) {
        reasons.push("Flagged by Google Safe Browsing as malicious.");
      }
    } else if (safeBrowsingResult.error) {
      reasons.push(`Heuristic scan used (Safe Browsing unavailable).`);
    }

    if (reasons.length === 0) {
        reasons.push("No suspicious elements found.");
    }

    // Determine Status
    let status = "Safe";
    if (finalScore >= 70) {
      status = "Phishing";
    } else if (finalScore >= 30) {
      status = "Suspicious";
    }

    const summary = status === "Phishing" 
      ? 'Critical phishing indicators detected.' 
      : status === "Suspicious" 
      ? 'Some suspicious indicators found.' 
      : 'No immediate threats detected.';

    // Construct response matching what frontend expects
    const result = {
      id: Date.now(),
      url: url,
      status: status.toLowerCase(),
      riskScore: finalScore,
      risk_score: finalScore, // Included for backward compatibility if needed
      reasons,
      timestamp: new Date().toLocaleString(),
      summary,
      urlLength: url.length,
      domainAge: '> 1 year (Simulated)',
      sslStatus: url.startsWith('https') ? 'Valid' : 'None',
      isAiAnalysis: false
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error("Error in checkUrl controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const analyzeUrlAi = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid URL string.' });
    }

    const aiAnalysis = await analyzeUrlWithAi(url);
    
    console.log("Raw AI Analysis Result:", aiAnalysis);

    let finalScore = Number(aiAnalysis.finalScore) || 0;
    const isPhishing = Boolean(aiAnalysis.isPhishing);
    const summary = aiAnalysis.summary || "AI analysis completed.";
    const reasons = Array.isArray(aiAnalysis.reasons) ? aiAnalysis.reasons : [];

    // Adjust score based on logic
    if (isPhishing === true && finalScore < 70) {
      finalScore = 85;
    }
    if (isPhishing === false && finalScore > 40) {
      finalScore = 20;
    }

    const summaryLower = summary.toLowerCase();
    if (summaryLower.includes("safe")) {
      finalScore -= 10;
    }
    if (summaryLower.includes("phishing")) {
      finalScore += 10;
    }

    // Normalize between 0 and 100
    finalScore = Math.max(0, Math.min(100, finalScore));

    let status = "Safe";
    if (finalScore >= 70) {
      status = "Phishing";
    } else if (finalScore >= 30) {
      status = "Suspicious";
    }

    const result = {
      id: Date.now(),
      url: url,
      status: status.toLowerCase(),
      riskScore: finalScore,
      risk_score: finalScore,
      reasons: reasons,
      timestamp: new Date().toLocaleString(),
      summary: summary,
      urlLength: url.length,
      domainAge: 'Analyzed by AI',
      sslStatus: url.startsWith('https') ? 'Valid' : 'None',
      isFallback: reasons.includes("AI unavailable") || reasons.includes("Parsing failed"),
      isAiAnalysis: true
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error("Error in analyzeUrlAi controller:", error);
    return res.status(500).json({ error: "AI analysis failed." });
  }
};

export const testAi = async (req, res) => {
  try {
    const result = await testOpenRouterConnection();
    const statusCode = result.status === "success" ? 200 : 500;
    return res.status(statusCode).json(result);
  } catch (error) {
    console.error("Error in testAi controller:", error);
    return res.status(500).json({ error: "Failed to test AI connectivity." });
  }
};

