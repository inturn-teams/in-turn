import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #1DB954;
    --green-light: #17a347;
    --green-dim: rgba(29,185,84,0.1);
    --green-dim2: rgba(29,185,84,0.06);
    --bg: #F5F5F7;
    --white: #FFFFFF;
    --text: #1D1D1F;
    --muted: #6E6E73;
    --border: rgba(0,0,0,0.08);
    --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .lp {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    color: var(--text);
  }

  /* ── NAV ── */
  .lp-nav {
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
  .lp-nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lp-logo-mark {
    width: 32px;
    height: 32px;
    background: var(--green);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .lp-logo-text {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text);
  }
  .lp-nav-cta {
    background: var(--text);
    color: white;
    font-family: var(--font);
    font-size: 13px;
    font-weight: 600;
    padding: 9px 20px;
    border-radius: 980px;
    border: none;
    cursor: pointer;
    letter-spacing: -0.01em;
    transition: opacity 0.2s;
  }
  .lp-nav-cta:hover { opacity: 0.8; }

  /* ── HERO ── */
  .lp-hero {
    position: relative;
    min-height: calc(100vh - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 40px;
    overflow: hidden;
  }

  /* Dot grid background */
  .lp-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
    background-size: 26px 26px;
    -webkit-mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%);
    mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  /* Centered content */
  .lp-hero-content {
    position: relative;
    z-index: 1;
    max-width: 760px;
    width: 100%;
  }

  /* App icon */
  .lp-hero-icon-wrap {
    margin-bottom: 30px;
    animation: heroIconIn 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-hero-icon {
    width: 96px;
    height: 96px;
    background: linear-gradient(160deg, #2ddd72 0%, #1DB954 45%, #14823e 100%);
    border-radius: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.18) inset,
      0 -2px 0 rgba(0,0,0,0.12) inset,
      0 4px 12px rgba(0,0,0,0.14),
      0 12px 32px rgba(29,185,84,0.28),
      0 28px 56px rgba(29,185,84,0.12);
  }
  .lp-hero-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10%;
    right: -10%;
    height: 52%;
    background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 100%);
    border-radius: 50%;
    pointer-events: none;
  }
  .lp-hero-icon::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(0deg, rgba(0,0,0,0.12) 0%, transparent 100%);
    pointer-events: none;
  }

  .lp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 600;
    color: var(--green);
    background: var(--green-dim);
    padding: 5px 14px;
    border-radius: 99px;
    margin-bottom: 22px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    animation: heroTextIn 0.7s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-eyebrow-dot {
    width: 6px;
    height: 6px;
    background: var(--green);
    border-radius: 50%;
    animation: lpPulse 2s infinite;
  }
  .lp-hero h1 {
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1.0;
    margin-bottom: 20px;
    color: var(--text);
    animation: heroTextIn 0.7s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-hero h1 span { color: var(--green); }
  .lp-hero-p {
    font-size: 18px;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.65;
    letter-spacing: -0.01em;
    max-width: 500px;
    margin: 0 auto 40px;
    animation: heroTextIn 0.7s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-hero-form-wrap {
    animation: heroTextIn 0.7s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* Floating preview cards */
  .lp-floats {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }
  .lp-float-pos {
    position: absolute;
  }
  .lp-float-pos-left {
    left: 4%;
    top: 50%;
    margin-top: -80px;
    animation: heroTextIn 0.7s 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-float-pos-right {
    right: 4%;
    top: 50%;
    margin-top: -60px;
    animation: heroTextIn 0.7s 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-float-inner-a { animation: floatA 5s 1.4s ease-in-out infinite; }
  .lp-float-inner-b { animation: floatB 6s 1.4s ease-in-out infinite; }
  .lp-float-card {
    background: var(--white);
    border-radius: 16px;
    padding: 14px 16px;
    width: 200px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07), 0 8px 28px rgba(0,0,0,0.07);
    text-align: left;
  }
  .lp-float-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .lp-float-score {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--green);
    line-height: 1;
    margin-bottom: 2px;
  }
  .lp-float-score-sub {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .lp-float-bar {
    height: 4px;
    background: rgba(0,0,0,0.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .lp-float-bar-fill {
    height: 100%;
    width: 88%;
    background: var(--green);
    border-radius: 99px;
  }
  .lp-float-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid var(--border);
    font-size: 11px;
  }
  .lp-float-row:last-child { border-bottom: none; }
  .lp-float-row-label { color: var(--muted); max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .lp-float-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 6px;
  }
  .lp-float-dot-green { background: var(--green); }
  .lp-float-dot-orange { background: #FF9500; }
  .lp-float-dot-gray { background: #C7C7CC; }
  .lp-float-row-left { display: flex; align-items: center; }

  /* ── EMAIL FORM ── */
  .lp-form {
    display: flex;
    gap: 10px;
    max-width: 480px;
    margin: 0 auto;
  }
  .lp-input {
    flex: 1;
    font-family: var(--font);
    font-size: 15px;
    font-weight: 400;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--white);
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .lp-input:focus { border-color: var(--green); }
  .lp-input::placeholder { color: rgba(0,0,0,0.3); }
  .lp-submit {
    font-family: var(--font);
    font-size: 15px;
    font-weight: 600;
    padding: 14px 26px;
    border-radius: 12px;
    border: none;
    background: var(--green);
    color: white;
    cursor: pointer;
    letter-spacing: -0.02em;
    transition: all 0.2s;
    white-space: nowrap;
    box-shadow: 0 2px 12px rgba(29,185,84,0.25);
  }
  .lp-submit:hover { background: var(--green-light); transform: translateY(-1px); }
  .lp-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .lp-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    font-weight: 600;
    color: var(--green);
    animation: lpFadeUp 0.4s ease both;
  }
  .lp-success span {
    font-size: 13px;
    font-weight: 400;
    color: var(--muted);
  }
  .lp-privacy {
    font-size: 12px;
    color: var(--muted);
    margin-top: 14px;
    letter-spacing: -0.01em;
  }

  /* ── LAUNCH BANNER ── */
  .lp-launch {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--white);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 14px 40px;
    font-size: 13px;
    color: var(--muted);
    letter-spacing: -0.01em;
  }
  .lp-launch strong { color: var(--text); font-weight: 600; }
  .lp-launch-dot {
    width: 5px;
    height: 5px;
    background: var(--border);
    border-radius: 50%;
  }

  /* ── FEATURES ── */
  .lp-features-section {
    max-width: 1060px;
    margin: 0 auto;
    padding: 80px 40px 90px;
  }
  .lp-section-header {
    margin-bottom: 40px;
  }
  .lp-section-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 10px;
  }
  .lp-section-header h2 {
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--text);
    max-width: 520px;
  }
  .lp-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .lp-feature {
    background: var(--white);
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .lp-feature-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .lp-feature-icon {
    width: 44px;
    height: 44px;
    background: var(--green-dim);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lp-feature-icon svg {
    width: 20px;
    height: 20px;
    stroke: var(--green);
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .lp-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 99px;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .lp-badge-soon {
    background: rgba(0,0,0,0.05);
    color: var(--muted);
  }
  .lp-feature h3 {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 10px;
    color: var(--text);
  }
  .lp-feature > p {
    font-size: 14px;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.65;
    letter-spacing: -0.01em;
    flex: 1;
    margin-bottom: 20px;
  }

  /* ── FEATURE PREVIEWS ── */
  .lp-preview {
    background: var(--bg);
    border-radius: 12px;
    padding: 14px 16px;
    margin-top: auto;
  }
  .lp-preview-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 5px 0;
    border-bottom: 1px solid var(--border);
  }
  .lp-preview-row:last-child { border-bottom: none; }
  .lp-preview-label { color: var(--muted); }
  .lp-preview-value { font-weight: 600; color: var(--text); font-size: 12px; }
  .lp-score-bar {
    height: 4px;
    background: rgba(0,0,0,0.08);
    border-radius: 99px;
    margin-top: 10px;
    overflow: hidden;
  }
  .lp-score-fill {
    height: 100%;
    background: var(--green);
    border-radius: 99px;
    transition: width 1s ease;
  }
  .lp-score-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .lp-score-num {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--green);
  }
  .lp-score-label { font-size: 11px; color: var(--muted); }
  .lp-status-pill {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 99px;
  }
  .lp-status-applied { background: rgba(0,122,255,0.1); color: #0066CC; }
  .lp-status-interview { background: rgba(255,149,0,0.12); color: #CC7700; }
  .lp-status-rejected { background: rgba(255,59,48,0.1); color: #CC2200; }

  /* ── BOTTOM CTA ── */
  .lp-cta-section {
    background: var(--text);
    padding: 80px 40px;
    text-align: center;
  }
  .lp-cta-section h2 {
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: white;
    margin-bottom: 14px;
    line-height: 1.05;
  }
  .lp-cta-section p {
    font-size: 16px;
    color: rgba(255,255,255,0.6);
    margin-bottom: 36px;
    letter-spacing: -0.01em;
  }
  .lp-cta-form {
    display: flex;
    gap: 10px;
    max-width: 440px;
    margin: 0 auto;
  }
  .lp-cta-input {
    flex: 1;
    font-family: var(--font);
    font-size: 15px;
    padding: 14px 18px;
    border-radius: 12px;
    border: none;
    background: rgba(255,255,255,0.1);
    color: white;
    outline: none;
    transition: background 0.2s;
  }
  .lp-cta-input:focus { background: rgba(255,255,255,0.15); }
  .lp-cta-input::placeholder { color: rgba(255,255,255,0.4); }
  .lp-cta-submit {
    font-family: var(--font);
    font-size: 15px;
    font-weight: 600;
    padding: 14px 26px;
    border-radius: 12px;
    border: none;
    background: var(--green);
    color: white;
    cursor: pointer;
    letter-spacing: -0.02em;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .lp-cta-submit:hover { background: var(--green-light); }
  .lp-cta-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .lp-cta-success {
    font-size: 15px;
    font-weight: 500;
    color: var(--green);
  }
  .lp-cta-privacy {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    margin-top: 14px;
  }

  /* ── FOOTER ── */
  .lp-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    border-top: 1px solid var(--border);
    font-size: 13px;
    color: var(--muted);
    letter-spacing: -0.01em;
  }
  .lp-footer-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: var(--text);
    font-size: 14px;
    letter-spacing: -0.02em;
  }
  .lp-footer-logo-mark {
    width: 22px;
    height: 22px;
    background: var(--green);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  /* ── SCROLL ANIMATIONS ── */
  .lp-fade-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .lp-fade-up.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── ANIMATIONS ── */
  @keyframes lpFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lpPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes heroIconIn {
    from { opacity: 0; transform: scale(0.65) translateY(24px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes heroTextIn {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatA {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-7px); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .lp-nav { padding: 16px 20px; }
    .lp-hero { padding: 72px 24px 64px; min-height: auto; }
    .lp-hero h1 { font-size: 42px; }
    .lp-hero-p { font-size: 16px; }
    .lp-floats { display: none; }
    .lp-form { flex-direction: column; }
    .lp-features-section { padding: 56px 24px 64px; }
    .lp-features-grid { grid-template-columns: 1fr; }
    .lp-section-header h2 { font-size: 28px; }
    .lp-cta-section { padding: 56px 24px; }
    .lp-cta-section h2 { font-size: 30px; }
    .lp-cta-form { flex-direction: column; }
    .lp-footer { flex-direction: column; gap: 8px; padding: 20px 24px; text-align: center; }
    .lp-launch { padding: 12px 20px; font-size: 12px; flex-wrap: wrap; justify-content: center; }
  }
`;

function EmailForm({ inputClass, submitClass, successClass, privacyClass, darkInput }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Replace YOUR_FORM_ID with your Formspree ID: https://formspree.io
    try {
      await fetch("https://formspree.io/f/xojkdbpr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "inturn-waitlist" }),
      });
    } catch (_) {}
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className={successClass}>
        You're on the list.
        <span>We'll notify you when In Turn launches in January 2027.</span>
      </div>
    );
  }

  return (
    <form style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto" }} onSubmit={handleSubmit}>
      <input
        className={inputClass}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button className={submitClass} type="submit" disabled={loading}>
        {loading ? "Joining..." : "Notify Me at Launch"}
      </button>
    </form>
  );
}

export default function LandingPage({ onTryTool }) {
  const featuresRef = useRef(null);

  useEffect(() => {
    const section = featuresRef.current;
    if (!section) return;
    const items = section.querySelectorAll('.lp-fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="lp">

        {/* NAV */}
        <nav className="lp-nav">
          <div className="lp-nav-logo">
            <div className="lp-logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17 Q5 19 7 19 H16 V9"/>
                <polyline points="12,5 16,9 20,5"/>
              </svg>
            </div>
            <span className="lp-logo-text">In Turn</span>
          </div>
          <button className="lp-nav-cta" onClick={onTryTool}>Join the Waitlist</button>
        </nav>

        {/* HERO */}
        <div className="lp-hero">

          {/* Floating cards */}
          <div className="lp-floats">
            <div className="lp-float-pos lp-float-pos-left">
              <div className="lp-float-inner-a">
                <div className="lp-float-card">
                  <div className="lp-float-label">Match Score</div>
                  <div className="lp-float-score">88</div>
                  <div className="lp-float-score-sub">Shopify — Product Intern</div>
                  <div className="lp-float-bar"><div className="lp-float-bar-fill" /></div>
                </div>
              </div>
            </div>
            <div className="lp-float-pos lp-float-pos-right">
              <div className="lp-float-inner-b">
                <div className="lp-float-card">
                  <div className="lp-float-label">Applications</div>
                  <div className="lp-float-row">
                    <div className="lp-float-row-left">
                      <div className="lp-float-dot lp-float-dot-orange" />
                      <span className="lp-float-row-label">Shopify</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#CC7700' }}>Interview</span>
                  </div>
                  <div className="lp-float-row">
                    <div className="lp-float-row-left">
                      <div className="lp-float-dot lp-float-dot-green" />
                      <span className="lp-float-row-label">Stripe</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--green)' }}>Applied</span>
                  </div>
                  <div className="lp-float-row">
                    <div className="lp-float-row-left">
                      <div className="lp-float-dot lp-float-dot-gray" />
                      <span className="lp-float-row-label">Meta</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)' }}>Rejected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lp-hero-content">
            <div className="lp-hero-icon-wrap">
              <div className="lp-hero-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}>
                  <path d="M5 17 Q5 19 7 19 H16 V9"/>
                  <polyline points="12,5 16,9 20,5"/>
                </svg>
              </div>
            </div>
            <div className="lp-eyebrow">
              <span className="lp-eyebrow-dot" />
              Launching January 2027
            </div>
            <h1>Everything you need<br />to <span>land your first</span><br />opportunity.</h1>
            <p className="lp-hero-p">In Turn is the all-in-one career platform built for Canadian students and new grads — from tailoring your resume to finding and tracking the right roles.</p>
            <div className="lp-hero-form-wrap">
              <EmailForm
                inputClass="lp-input"
                submitClass="lp-submit"
                successClass="lp-success"
                privacyClass="lp-privacy"
              />
              <div className="lp-privacy">No spam. We'll only reach out with launch updates.</div>
            </div>
          </div>
        </div>

        {/* LAUNCH BANNER */}
        <div className="lp-launch">
          Full platform launching <strong>January 2027</strong>
          <span className="lp-launch-dot" />
          Resume Tailor · Internship Finder · Application Tracker
        </div>

        {/* FEATURES */}
        <div className="lp-features-section" ref={featuresRef}>
          <div className="lp-section-header lp-fade-up">
            <div className="lp-section-label">What's coming</div>
            <h2>Three tools. One platform. One goal.</h2>
          </div>

          <div className="lp-features-grid">

            {/* Feature 1 - Resume Tailor */}
            <div className="lp-feature lp-fade-up" style={{ transitionDelay: '0.1s' }}>
              <div className="lp-feature-top">
                <div className="lp-feature-icon">
                  <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <span className="lp-badge lp-badge-soon">January 2027</span>
              </div>
              <h3>Resume Tailor</h3>
              <p>Paste your resume and a job description. In Turn rewrites your bullet points to match the exact language, keywords, and tone employers are looking for.</p>
              <div className="lp-preview">
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Keyword match</span>
                  <span className="lp-preview-value">14 of 14 matched</span>
                </div>
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Bullets generated</span>
                  <span className="lp-preview-value">8 tailored bullets</span>
                </div>
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Time to complete</span>
                  <span className="lp-preview-value">Under 15 seconds</span>
                </div>
              </div>
            </div>

            {/* Feature 2 - Internship Finder */}
            <div className="lp-feature lp-fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="lp-feature-top">
                <div className="lp-feature-icon">
                  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </div>
                <span className="lp-badge lp-badge-soon">January 2027</span>
              </div>
              <h3>Internship Finder</h3>
              <p>Upload your resume once and get matched to internships ranked by relevance. Each listing gets a 1–100 match score so you always apply where it counts.</p>
              <div className="lp-preview">
                <div className="lp-score-row">
                  <div>
                    <div className="lp-score-num">92</div>
                    <div className="lp-score-label">Match score — Product Intern, Shopify</div>
                  </div>
                </div>
                <div className="lp-score-bar"><div className="lp-score-fill" style={{ width: "92%" }} /></div>
                <div style={{ marginTop: 10 }}>
                  <div className="lp-score-row" style={{ marginBottom: 4 }}>
                    <span className="lp-preview-label" style={{ fontSize: 12 }}>Data Analyst Intern, RBC</span>
                    <span className="lp-preview-value">78</span>
                  </div>
                  <div className="lp-score-row">
                    <span className="lp-preview-label" style={{ fontSize: 12 }}>Marketing Intern, Hootsuite</span>
                    <span className="lp-preview-value">61</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Application Tracker */}
            <div className="lp-feature lp-fade-up" style={{ transitionDelay: '0.3s' }}>
              <div className="lp-feature-top">
                <div className="lp-feature-icon">
                  <svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <span className="lp-badge lp-badge-soon">January 2027</span>
              </div>
              <h3>Application Tracker</h3>
              <p>Keep every application organised in one place. Track where you stand — applied, interviewing, offer, or rejected — so nothing falls through the cracks.</p>
              <div className="lp-preview">
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Shopify — Product Intern</span>
                  <span className="lp-status-pill lp-status-interview">Interviewing</span>
                </div>
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Stripe — Data Intern</span>
                  <span className="lp-status-pill lp-status-applied">Applied</span>
                </div>
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Meta — UX Intern</span>
                  <span className="lp-status-pill lp-status-rejected">Rejected</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="lp-cta-section">
          <h2>Be first in line<br />when we launch.</h2>
          <p>Join the waitlist and we'll notify you the moment In Turn goes live in January 2027.</p>
          <EmailForm
            inputClass="lp-cta-input"
            submitClass="lp-cta-submit"
            successClass="lp-cta-success"
            privacyClass="lp-cta-privacy"
            darkInput
          />
          <div className="lp-cta-privacy">No spam. Unsubscribe anytime.</div>
        </div>

        {/* FOOTER */}
        <div className="lp-footer">
          <div className="lp-footer-logo">
            <div className="lp-footer-logo-mark">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17 Q5 19 7 19 H16 V9"/>
                <polyline points="12,5 16,9 20,5"/>
              </svg>
            </div>
            In Turn
          </div>
          <span>© {new Date().getFullYear()} In Turn. Built for Canadian graduates.</span>
          <span>Launching January 2027</span>
        </div>

      </div>
    </>
  );
}
