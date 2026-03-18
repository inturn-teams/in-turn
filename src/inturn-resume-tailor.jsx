import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #1DB954;
    --green-light: #17a347;
    --green-pale: #E8FBF0;
    --green-dim: rgba(29,185,84,0.1);
    --dark: #F5F5F7;
    --mid: #FFFFFF;
    --surface: #F2F2F7;
    --border: rgba(0,0,0,0.08);
    --muted: #6E6E73;
    --soft: #F5F5F7;
    --white: #1D1D1F;
    --radius: 16px;
    --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  html, body, #root { height: 100%; }

  .app {
    min-height: 100vh;
    background: var(--dark);
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    color: var(--white);
  }

  /* ── NAV ── */
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: rgba(245,245,247,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 100;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-mark {
    width: 32px;
    height: 32px;
    background: var(--green);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }
  .logo-text {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--white);
  }
  .nav-badge {
    font-size: 11px;
    font-weight: 500;
    color: var(--green);
    background: var(--green-dim);
    padding: 4px 12px;
    border-radius: 99px;
    letter-spacing: 0.02em;
  }

  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 52px 40px 36px;
    max-width: 640px;
    margin: 0 auto;
    animation: fadeUp 0.5s ease both;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: var(--green);
    background: var(--green-dim);
    padding: 5px 14px;
    border-radius: 99px;
    margin-bottom: 18px;
    letter-spacing: 0.03em;
  }
  .hero-dot {
    width: 6px;
    height: 6px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  .hero h1 {
    font-size: 44px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.06;
    margin-bottom: 14px;
    color: var(--white);
  }
  .hero h1 span { color: var(--green); }
  .hero p {
    font-size: 16px;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.6;
    letter-spacing: -0.01em;
  }

  /* ── MAIN LAYOUT ── */
  .main {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 40px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    animation: fadeUp 0.5s 0.1s ease both;
  }

  /* ── ACTION COLUMN (unused) ── */
  .action-col { display: none; }

  /* ── CARDS ── */
  .card {
    background: var(--mid);
    border-radius: 18px;
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    padding: 22px 26px 18px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .card-title {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-icon {
    display: none;
  }
  .char-count {
    font-size: 12px;
    color: var(--muted);
    font-weight: 400;
    letter-spacing: -0.01em;
  }
  .card-body {
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* ── TEXTAREAS ── */
  textarea {
    width: 100%;
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    font-family: var(--font);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.75;
    color: rgba(0,0,0,0.82);
    padding: 20px 26px;
    min-height: 600px;
    letter-spacing: -0.01em;
  }
  textarea::placeholder {
    color: rgba(0,0,0,0.25);
  }
  textarea:focus { outline: none; }

  /* ── ACTION ROW ── */
  /* ── ACTION ROW ── */
  .action-row {
    max-width: 1200px;
    margin: 24px auto 0;
    padding: 0 40px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    animation: fadeUp 0.5s 0.2s ease both;
  }
  .btn-tailor {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--green);
    color: white;
    font-family: var(--font);
    font-size: 16px;
    font-weight: 600;
    padding: 16px 48px;
    border-radius: 980px;
    border: none;
    cursor: pointer;
    letter-spacing: -0.02em;
    transition: all 0.2s ease;
    box-shadow: 0 2px 16px rgba(29,185,84,0.25);
  }
  .btn-tailor:hover:not(:disabled) {
    background: var(--green-light);
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(29,185,84,0.35);
  }
  .btn-tailor:active:not(:disabled) { transform: translateY(0); }
  .btn-tailor:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .btn-clear {
    background: transparent;
    color: var(--muted);
    font-family: var(--font);
    font-size: 14px;
    font-weight: 500;
    padding: 16px 20px;
    border-radius: 980px;
    border: none;
    cursor: pointer;
    letter-spacing: -0.01em;
    transition: all 0.2s;
  }
  .btn-clear:hover { color: var(--white); background: var(--surface); }

  /* ── RESULT CARD ── */
  .result-card {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 48px;
    animation: fadeUp 0.5s ease both;
  }
  .result-inner {
    background: var(--mid);
    border-radius: 18px;
    border: none;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.05);
  }
  .result-header {
    padding: 22px 26px 18px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .result-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--white);
  }
  .result-actions {
    display: flex;
    gap: 8px;
  }
  .btn-copy {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--green-dim);
    color: var(--green);
    font-family: var(--font);
    font-size: 12px;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 99px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-copy:hover { background: rgba(29,185,84,0.2); }
  .btn-copy.copied { color: white; background: var(--green); }
  .result-body {
    padding: 24px;
  }

  /* ── BULLET ITEMS ── */
  .bullet-section {
    margin-bottom: 24px;
  }
  .bullet-section:last-child { margin-bottom: 0; }
  .bullet-section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }
  .bullet-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .bullet-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 12px 14px;
    background: var(--surface);
    border-radius: 10px;
    border: 1px solid transparent;
    transition: border-color 0.2s;
    animation: fadeUp 0.4s ease both;
  }
  .bullet-item:hover { border-color: rgba(29,185,84,0.2); }
  .bullet-dot {
    width: 6px;
    height: 6px;
    background: var(--green);
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px;
  }
  .bullet-text {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(0,0,0,0.8);
    letter-spacing: -0.005em;
    flex: 1;
  }

  /* ── LOADING ── */
  .loading-card {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px 40px;
  }
  .loading-inner {
    background: var(--mid);
    border-radius: 18px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.05);
    padding: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .loader-ring {
    width: 44px;
    height: 44px;
    border: 3px solid var(--surface);
    border-top-color: var(--green);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  .loading-text {
    font-size: 15px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: -0.01em;
  }
  .loading-steps {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
  }
  .loading-step {
    font-size: 13px;
    color: #C7C7CC;
    transition: color 0.4s;
  }
  .loading-step.active { color: var(--green); }
  .loading-step.done { color: var(--muted); }

  /* ── TIPS ROW ── */
  .tips-row {
    max-width: 1200px;
    margin: 0 auto 20px;
    padding: 0 40px;
    display: flex;
    gap: 8px;
    animation: fadeUp 0.5s 0.2s ease both;
  }
  .tip-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: none;
    border-radius: 99px;
    padding: 0;
    font-size: 12px;
    color: var(--muted);
    font-weight: 400;
    letter-spacing: -0.01em;
  }
  .tip-pill + .tip-pill::before {
    content: "·";
    margin-right: 8px;
    color: var(--border);
    font-size: 14px;
  }
  .tip-icon { display: none; }

  /* ── ERROR ── */
  .error-msg {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px 24px;
  }
  .error-inner {
    background: rgba(255,59,48,0.08);
    border: 1px solid rgba(255,59,48,0.2);
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 14px;
    color: #FF6B6B;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .hero h1 { font-size: 32px; }
    .hero { padding: 40px 20px 28px; }
    .nav { padding: 16px 20px; }
    .main { grid-template-columns: 1fr; padding: 0 20px; }
    .action-row { padding: 20px 20px 40px; }
    .result-card { padding: 0 20px 40px; }
    textarea { min-height: 360px; }
  }
`;

const LOADING_STEPS = [
  "Reading your resume...",
  "Analysing the job description...",
  "Matching your skills to requirements...",
  "Crafting tailored bullet points...",
  "Polishing final output...",
];

function parseResult(text) {
  // Try to extract structured bullets from the AI response
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const sections = [];
  let currentSection = null;

  for (const line of lines) {
    // Section headers: lines ending with ":" or starting with ##
    if ((line.endsWith(":") && line.length < 60) || line.startsWith("##")) {
      const title = line.replace(/^##\s*/, "").replace(/:$/, "").trim();
      currentSection = { title, bullets: [] };
      sections.push(currentSection);
    } else if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*") || /^\d+\./.test(line)) {
      const bullet = line.replace(/^[•\-*]\s*/, "").replace(/^\d+\.\s*/, "").trim();
      if (bullet) {
        if (!currentSection) {
          currentSection = { title: "Tailored Bullet Points", bullets: [] };
          sections.push(currentSection);
        }
        currentSection.bullets.push(bullet);
      }
    } else if (line.length > 20 && currentSection) {
      // Long non-header line, treat as bullet
      currentSection.bullets.push(line);
    }
  }

  // If no sections parsed, dump everything as one section
  if (sections.length === 0 || sections.every(s => s.bullets.length === 0)) {
    return [{ title: "Tailored Bullet Points", bullets: lines.filter(l => l.length > 15) }];
  }

  return sections.filter(s => s.bullets.length > 0);
}

export default function InTurnResumeTailor() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef(null);
  const stepInterval = useRef(null);

  useEffect(() => {
    if (loading) {
      setLoadingStep(0);
      stepInterval.current = setInterval(() => {
        setLoadingStep(s => Math.min(s + 1, LOADING_STEPS.length - 1));
      }, 900);
    } else {
      clearInterval(stepInterval.current);
    }
    return () => clearInterval(stepInterval.current);
  }, [loading]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleTailor = async () => {
    if (!resume.trim() || !jobDesc.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");

    const prompt = `You are an expert Canadian career coach specialising in helping university graduates land their first role.

A student has provided their resume and a job description. Your task is to rewrite their resume bullet points so they are perfectly tailored to this job — using the same language, keywords, and priorities from the job description.

INSTRUCTIONS:
- Rewrite 6-10 resume bullet points tailored to the job
- Start each bullet with a strong action verb
- Quantify achievements where possible (use realistic placeholders like [X%] if numbers aren't given)
- Mirror keywords directly from the job description
- Group bullets under 2-3 relevant sections (e.g. "Technical Skills", "Leadership & Collaboration", "Relevant Experience")
- Keep each bullet to 1-2 lines max
- Write in a confident, professional tone suited for a Canadian employer

Format your response like this:
Section Name:
- Bullet point here
- Bullet point here

Section Name:
- Bullet point here

---

STUDENT'S RESUME:
${resume}

---

JOB DESCRIPTION:
${jobDesc}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error.message || "Something went wrong. Please try again.");
      } else {
        const text = data.content?.map(b => b.text || "").join("") || "";
        const sections = parseResult(text);
        setResult(sections);
      }
    } catch (err) {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = result
      .map(s => `${s.title}\n${s.bullets.map(b => `• ${b}`).join("\n")}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setResume("");
    setJobDesc("");
    setResult(null);
    setError("");
  };

  const canTailor = resume.trim().length > 50 && jobDesc.trim().length > 50;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17 Q5 19 7 19 H16 V9"/>
                <polyline points="12,5 16,9 20,5"/>
              </svg>
            </div>
            <span className="logo-text">In Turn</span>
          </div>
          <span className="nav-badge">Resume Tailor · Beta</span>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            AI-Powered · Built for Canadian Grads
          </div>
          <h1>Your resume,<br /><span>tailored to the job.</span></h1>
          <p>Paste your resume and any job description. In Turn rewrites your bullet points to match — using the exact language employers are looking for.</p>
        </div>

        {/* INPUT CARDS */}
        <div className="main">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Your Resume</div>
              <span className="char-count">{resume.length > 0 ? `${resume.length} chars` : ""}</span>
            </div>
            <div className="card-body">
              <textarea
                value={resume}
                onChange={e => setResume(e.target.value)}
                placeholder={`Paste your resume here...`}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Job Description</div>
              <span className="char-count">{jobDesc.length > 0 ? `${jobDesc.length} chars` : ""}</span>
            </div>
            <div className="card-body">
              <textarea
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                placeholder={`Paste the job description here...`}
              />
            </div>
          </div>
        </div>

        {/* ACTION ROW */}
        <div className="action-row">
          <button
            className="btn-tailor"
            onClick={handleTailor}
            disabled={!canTailor || loading}
          >
            {loading ? (
              <>
                <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                Tailoring...
              </>
            ) : (
              <>Tailor My Resume</>
            )}
          </button>
          {(resume || jobDesc || result) && (
            <button className="btn-clear" onClick={handleClear}>Clear</button>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="error-msg">
            <div className="error-inner">⚠️ {error}</div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="loading-card">
            <div className="loading-inner">
              <div className="loader-ring" />
              <div className="loading-steps">
                {LOADING_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`loading-step ${i === loadingStep ? "active" : i < loadingStep ? "done" : ""}`}
                  >
                    {i < loadingStep ? "✓ " : i === loadingStep ? "→ " : "  "}{step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {result && !loading && (
          <div className="result-card" ref={resultRef}>
            <div className="result-inner">
              <div className="result-header">
                <div className="result-title">
                  Tailored Results
                </div>
                <div className="result-actions">
                  <button className={`btn-copy ${copied ? "copied" : ""}`} onClick={handleCopy}>
                    {copied ? "✓ Copied!" : "Copy All"}
                  </button>
                </div>
              </div>
              <div className="result-body">
                {result.map((section, si) => (
                  <div key={si} className="bullet-section">
                    <div className="bullet-section-title">{section.title}</div>
                    <div className="bullet-list">
                      {section.bullets.map((bullet, bi) => (
                        <div
                          key={bi}
                          className="bullet-item"
                          style={{ animationDelay: `${(si * 3 + bi) * 0.06}s` }}
                        >
                          <div className="bullet-dot" />
                          <div className="bullet-text">{bullet}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
