import axios from 'axios';

export const checkSafeBrowsing = async (url) => {
  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    if (!apiKey) {
      console.warn("Google Safe Browsing API Key is not set.");
      return { isPhishing: false, error: "API key missing" };
    }

    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
    
    const payload = {
      client: {
        clientId: "phishguard",
        clientVersion: "1.0.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [
          { url: url }
        ]
      }
    };

    const response = await axios.post(apiUrl, payload);
    
    // If matches array exists and is not empty, the URL is a threat
    if (response.data && response.data.matches && response.data.matches.length > 0) {
      return { isPhishing: true, details: response.data.matches };
    }
    
    return { isPhishing: false };
  } catch (error) {
    console.error("Error calling Google Safe Browsing API:", error.message);
    return { isPhishing: false, error: error.message };
  }
};
