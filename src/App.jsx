import React, { useState, useEffect } from "react";
import { setupMockFetch, mockFetchConfig, requestLog, clearRequestLog } from "./mockApi";
import { ProductSearchBuggy } from "./ProductSearchBuggy";
import { ProductSearchFixed } from "./ProductSearchFixed";
import { ProductSearchPractice } from "./ProductSearchPractice";
import "./index.css";

export function App() {
  const [selectedVersion, setSelectedVersion] = useState("fixed"); // "fixed" | "buggy" | "practice"
  const [category, setCategory] = useState("phones");
  const [latency, setLatency] = useState(400);
  const [simulateError, setSimulateError] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const cleanup = setupMockFetch();
    const interval = setInterval(() => {
      setLogs([...requestLog]);
    }, 150);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    mockFetchConfig.latencyMs = Number(latency);
    mockFetchConfig.shouldFail = simulateError;
  }, [latency, simulateError]);

  return (
    <div className="app-container">
      <header>
        <h1>Interview Practice: React Product Search</h1>
        <p className="subtitle">
          Debug live debounce, race conditions, AbortController cancellation, and category prop changes in real time.
        </p>
      </header>

      <div className="layout-grid">
        <main>
          <div className="card">
            <div className="tab-group">
              <button
                className={`tab-btn ${selectedVersion === "buggy" ? "active" : ""}`}
                onClick={() => setSelectedVersion("buggy")}
              >
                1. Original Buggy Version
              </button>
              <button
                className={`tab-btn ${selectedVersion === "fixed" ? "active" : ""}`}
                onClick={() => setSelectedVersion("fixed")}
              >
                2. Corrected & Optimized Version
              </button>
              <button
                className={`tab-btn ${selectedVersion === "practice" ? "active" : ""}`}
                onClick={() => setSelectedVersion("practice")}
              >
                3. Your Practice Playground
              </button>
            </div>

            <h2>
              Live Component Preview
              <span className={`badge badge-${selectedVersion}`}>{selectedVersion}</span>
            </h2>

            <div className="control-panel">
              <div className="form-row">
                <label>Category (Prop):</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="phones">phones</option>
                  <option value="audio">audio</option>
                  <option value="laptops">laptops</option>
                  <option value="accessories">accessories</option>
                  <option value="">all</option>
                </select>
              </div>

              <div className="form-row">
                <label>Simulated Latency (ms):</label>
                <input
                  type="number"
                  min="0"
                  max="3000"
                  step="100"
                  value={latency}
                  onChange={(e) => setLatency(Number(e.target.value))}
                />
              </div>

              <div className="form-row">
                <label>Simulate Server 500:</label>
                <input
                  type="checkbox"
                  checked={simulateError}
                  onChange={(e) => setSimulateError(e.target.checked)}
                />
                <span style={{ fontSize: 13, color: simulateError ? "#ff7b72" : "#8b949e" }}>
                  {simulateError ? "API calls will return HTTP 500" : "API calls healthy (HTTP 200)"}
                </span>
              </div>
            </div>

            {selectedVersion === "buggy" && <ProductSearchBuggy key="buggy" category={category} />}
            {selectedVersion === "fixed" && <ProductSearchFixed key="fixed" category={category} />}
            {selectedVersion === "practice" && <ProductSearchPractice key="practice" category={category} />}

            <div className="code-hint">
              <strong>Tip to verify race condition in Buggy mode:</strong> Set latency to 1000ms. Type "phone", then quickly change the category dropdown to "audio". Notice that the buggy version does not cancel the phone fetch and never fetches the new audio category! In Fixed mode, the first fetch aborts and the audio category results appear.
            </div>
          </div>
        </main>

        <aside>
          <div className="card">
            <h2>
              Network Request Monitor
              <button
                onClick={clearRequestLog}
                style={{
                  background: "#21262d",
                  border: "1px solid #30363d",
                  color: "#c9d1d9",
                  borderRadius: 4,
                  fontSize: 11,
                  padding: "2px 8px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </h2>

            <div className="network-inspector">
              {logs.length === 0 && (
                <div style={{ color: "#8b949e", fontStyle: "italic", padding: 8 }}>
                  No requests made yet. Type in the search box above.
                </div>
              )}
              {logs.slice().reverse().map((entry) => (
                <div key={entry.id} className={`network-entry ${entry.status.split(" ")[0]}`}>
                  <span className={`status status-${entry.status.split(" ")[0]}`}>
                    {entry.status}
                  </span>
                  <div><strong>GET</strong> /api/products</div>
                  <div style={{ color: "#8b949e" }}>
                    q="{entry.q}" | cat="{entry.category || 'all'}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default App;
