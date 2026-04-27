import React, { useState } from 'react';
import './App.css';
import { analyzeURLPattern } from './DetectionLogic';

function App() {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState({ isSuspicious: false, reasons: [], score: 0 });
  const [hasScanned, setHasScanned] = useState(false);
  const [activeTab, setActiveTab] = useState('About');

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('phishGuardHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleScan = () => {
    if (!url) return;
    const result = analyzeURLPattern(url);
    setAnalysis(result);
    setHasScanned(true);

    setHistory(prev => {
      const updated = [
        { 
          url, 
          status: result.isSuspicious ? 'Danger' : 'Safe', 
          time: new Date().toLocaleTimeString() 
        }, 
        ...prev
      ].slice(0, 5);
      localStorage.setItem('phishGuardHistory', JSON.stringify(updated));
      return updated;
    });
    setActiveTab('Scan');
  };

  const clearHistory = () => {
    localStorage.removeItem('phishGuardHistory');
    setHistory([]);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={() => setActiveTab('About')} style={{cursor: 'pointer'}}>
          🛡️ <strong>PhishGuard AI</strong>
        </div>
        <div className="nav-links">
          <span className={activeTab === 'About' ? 'active' : ''} onClick={() => setActiveTab('About')}>About</span>
          <span className={activeTab === 'Scan' ? 'active' : ''} onClick={() => setActiveTab('Scan')}>Scan</span>
          <span className={activeTab === 'History' ? 'active' : ''} onClick={() => setActiveTab('History')}>History</span>
          <button className="btn-small" onClick={() => alert("Connecting AI Engine...")}>Mock AI Analysis</button>
        </div>
      </nav>

      {/* --- ABOUT / INTRO PAGE --- */}
      {activeTab === 'About' && (
        <section className="intro-page">
          <div className="intro-content">
            <h1>Protecting your digital identity from <span className="highlight">Modern Threats.</span></h1>
            <p>Advanced heuristic analysis and real-time AI patterns to identify malicious links before you click.</p>
            
            {/* Direct Redirect Button instead of Input Bar */}
            <div className="intro-btns">
              <button className="cta-btn" onClick={() => setActiveTab('Scan')}>
                Get Started & Scan →
              </button>
            </div>

            <div className="intro-features">
              <div className="feature-item"><span>🛡️</span> Real-time</div>
              <div className="feature-item"><span>🧠</span> AI Patterns</div>
              <div className="feature-item"><span>📊</span> Risk Analysis</div>
            </div>
          </div>
          
          <div className="intro-visual">
             <div className="shield-glow"></div>
          </div>
        </section>
      )}

      {/* --- DASHBOARD GRID --- */}
      {activeTab !== 'About' && (
        <main className="main-grid">
          <div className="left-col">
            {activeTab === 'Scan' && (
              <div className="card">
                <h3>PhishGuard Scanner</h3>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Enter URL to analyze..." 
                    value={url} 
                    onChange={(e)=>setUrl(e.target.value)} 
                  />
                  <button onClick={handleScan}>Analyze Now</button>
                </div>

                {hasScanned && (
                  <div className={`result-box ${analysis.isSuspicious ? 'danger' : 'safe'}`}>
                    <div className="result-header">
                       <h4>Analysis Result: {analysis.isSuspicious ? 'Suspicious' : 'Safe'}</h4>
                       <span>{analysis.score}% Risk Score</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{width: `${analysis.score}%`, backgroundColor: analysis.isSuspicious ? '#ef4444' : '#10b981'}}></div>
                    </div>
                    {analysis.isSuspicious && (
                      <ul className="reasons-list">
                        {analysis.reasons.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'History' && (
              <div className="card">
                <div className="flex-between">
                  <h4>Threat History Log</h4>
                  {history.length > 0 && <button className="clear-btn" onClick={clearHistory}>Clear All</button>}
                </div>
                <div className="history-list">
                  {history.length > 0 ? history.map((item, index) => (
                    <div key={index} className="history-item">
                      <span className={item.status === 'Safe' ? 'safe-dot' : 'danger-dot'}>●</span>
                      <span className="history-url">{item.url}</span>
                      <span className="history-time">{item.time}</span>
                    </div>
                  )) : <p className="empty-text">No scans found.</p>}
                </div>
              </div>
            )}
          </div>

          <div className="right-col">
            <div className="card">
              <div className="flex-between">
                <h4>System Status</h4>
                <span className="operational-tag">Operational</span>
              </div>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-val">{history.filter(h => h.status === 'Safe').length}</div>
                  <div className="stat-label">Safe</div>
                </div>
                <div className="stat-box">
                  <div className="stat-val">{history.filter(h => h.status === 'Danger').length}</div>
                  <div className="stat-label">Phish</div>
                </div>
              </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
              <h5>Security Checkpoints</h5>
              <ul className="how-it-works">
                <li>SSL Protocol Check</li>
                <li>Homograph Detection</li>
                <li>TLD Reputation Analysis</li>
              </ul>
            </div>
          </div>
        </main>
      )}

      <footer>
        <p>&copy; 2026 PhishGuard AI - Developed by Umesh, Nitin, Pushkar, and Mayur</p>
      </footer>
    </div>
  );
}

export default App;