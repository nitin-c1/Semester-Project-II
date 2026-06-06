import { useState, useEffect } from 'react';
import { checkUrlApi, analyzeUrlAiApi } from '../api/scanApi';
import { isValidUrl } from '../utils/formatters';

export const useScan = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = () => {
      const savedHistory = localStorage.getItem('phishguard_history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Failed to parse history from localStorage", e);
          setHistory([]);
        }
      } else {
        setHistory([]);
      }
    };
    fetchHistory();
  }, []);

  const handleScan = async () => {
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a URL to analyze.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    setLoading(true);

    try {
      // Simulate slight network delay for better user experience
      await new Promise(resolve => setTimeout(resolve, 800));

      const scanResult = await checkUrlApi(url);
      setResult(scanResult);

      setHistory((prev) => {
        const newHistory = [scanResult, ...prev].slice(0, 10);
        localStorage.setItem('phishguard_history', JSON.stringify(newHistory));
        return newHistory;
      });

    } catch (err) {
      console.error(err);
      setError("Something went wrong while scanning.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiScan = async () => {
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a URL to analyze.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    setLoadingAi(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const scanResult = await analyzeUrlAiApi(url);
      setResult(scanResult);

      setHistory((prev) => {
        const newHistory = [scanResult, ...prev].slice(0, 10);
        localStorage.setItem('phishguard_history', JSON.stringify(newHistory));
        return newHistory;
      });

    } catch (err) {
      console.error(err);
      setError("Something went wrong while scanning with AI.");
    } finally {
      setLoadingAi(false);
    }
  };

  const clearHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem('phishguard_history', JSON.stringify(newHistory));
  };

  return {
    url,
    setUrl,
    loading,
    error,
    result,
    history,
    clearHistory,
    handleScan,
    handleAiScan,
    loadingAi
  };
};
