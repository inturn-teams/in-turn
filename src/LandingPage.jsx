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

  html, body { overflow-x: hidden; }
  .lp {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    color: var(--text);
    overflow-x: hidden;
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
    cursor: pointer;
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    font-family: var(--font);
  }
  .lp-nav-logo:hover .lp-logo-text { opacity: 0.7; }
  .lp-nav-logo .lp-logo-text { transition: opacity 0.2s; }
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

  /* ── WAITLIST COUNTER ── */
  .lp-waitlist-social {
    display: flex; align-items: center; gap: 10px;
    justify-content: center; margin-top: 20px;
    animation: heroTextIn 0.7s 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-waitlist-avatars { display: flex; }
  .lp-waitlist-avatar {
    width: 24px; height: 24px; border-radius: 50%;
    border: 2px solid var(--bg); margin-left: -6px; font-size: 10px;
    font-weight: 700; color: white; display: flex; align-items: center; justify-content: center;
  }
  .lp-waitlist-avatars .lp-waitlist-avatar:first-child { margin-left: 0; }
  .lp-waitlist-text { font-size: 13px; color: var(--muted); letter-spacing: -0.01em; }
  .lp-waitlist-text strong { color: var(--text); font-weight: 600; }

  /* ── FAQ ── */
  .lp-faq-section {
    max-width: 680px; margin: 0 auto; padding: 90px 40px;
  }
  .lp-faq-header { margin-bottom: 40px; }
  .lp-faq-item {
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }
  .lp-faq-q {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 0; cursor: pointer; gap: 16px;
    font-size: 15px; font-weight: 600; color: var(--text);
    letter-spacing: -0.02em; user-select: none;
    transition: color 0.2s;
  }
  .lp-faq-q:hover { color: var(--green); }
  .lp-faq-icon {
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--bg); display: flex; align-items: center;
    justify-content: center; font-size: 14px; font-weight: 400;
    color: var(--muted); flex-shrink: 0; transition: background 0.2s, color 0.2s;
  }
  .lp-faq-item.open .lp-faq-icon { background: var(--green-dim); color: var(--green); }
  .lp-faq-a {
    font-size: 14px; color: var(--muted); line-height: 1.7;
    letter-spacing: -0.01em; padding-bottom: 18px;
    animation: lpFadeUp 0.25s ease both;
  }

  /* ── FOOTER SOCIAL ── */
  .lp-footer-social { display: flex; align-items: center; gap: 12px; }
  .lp-social-link {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--bg); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); transition: background 0.2s, color 0.2s; text-decoration: none;
  }
  .lp-social-link:hover { background: var(--green-dim); color: var(--green); border-color: transparent; }
  .lp-footer-email {
    font-size: 13px; color: var(--muted); text-decoration: none;
    transition: color 0.2s; letter-spacing: -0.01em;
  }
  .lp-footer-email:hover { color: var(--green); }

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
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    position: relative;
    will-change: transform;
  }
  .lp-feature-shine {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .lp-feature:hover .lp-feature-shine {
    opacity: 1;
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

  /* ── MODAL ── */
  .lp-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: lpFadeUp 0.2s ease both;
  }
  .lp-modal {
    background: var(--white);
    border-radius: 24px;
    padding: 40px;
    width: 100%;
    max-width: 460px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.18);
    position: relative;
    animation: heroTextIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lp-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(0,0,0,0.06);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--muted);
    transition: background 0.2s;
  }
  .lp-modal-close:hover { background: rgba(0,0,0,0.1); }
  .lp-modal-icon {
    width: 52px;
    height: 52px;
    background: var(--green-dim);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .lp-modal h2 {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--text);
    margin-bottom: 8px;
  }
  .lp-modal-sub {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 28px;
  }

  /* ── DEMO SECTIONS ── */
  .lp-demos { border-top: 1px solid var(--border); }
  .lp-demo-section {
    max-width: 1060px;
    margin: 0 auto;
    padding: 90px 40px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 64px;
    align-items: center;
  }
  .lp-demo-section.rev { grid-template-columns: 1.2fr 1fr; }
  .lp-demo-section.rev .lp-demo-text { order: 2; }
  .lp-demo-section.rev .lp-demo-ui  { order: 1; }
  .lp-demo-section + .lp-demo-section { border-top: 1px solid var(--border); }
  .lp-demo-label {
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--green); margin-bottom: 10px;
  }
  .lp-demo-title {
    font-size: 30px; font-weight: 800; letter-spacing: -0.04em;
    line-height: 1.1; color: var(--text); margin-bottom: 14px;
  }
  .lp-demo-desc { font-size: 15px; color: var(--muted); line-height: 1.7; letter-spacing: -0.01em; }

  /* App window chrome */
  .lp-app-window {
    background: var(--white); border-radius: 14px;
    border: 1px solid var(--border);
    box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05);
    overflow: hidden;
  }
  .lp-demo-badge-wrap { margin-bottom: 10px; }
  .lp-demo-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; color: var(--green);
    background: var(--green-dim); padding: 4px 10px 4px 8px;
    border-radius: 99px; letter-spacing: 0.02em;
  }
  .lp-demo-badge-dot {
    width: 6px; height: 6px; background: var(--green);
    border-radius: 50%; animation: lpPulse 1.8s infinite;
  }
  .lp-demo-hint {
    font-size: 11px; color: var(--muted); margin-top: 8px;
    display: flex; align-items: center; gap: 5px; letter-spacing: -0.01em;
  }
  .lp-at-hint {
    font-size: 11px; color: var(--muted); text-align: center;
    padding: 6px 12px 10px; letter-spacing: -0.01em;
  }

  .lp-app-bar {
    background: #f0f0f2; padding: 9px 12px;
    display: flex; align-items: center; gap: 5px;
    border-bottom: 1px solid var(--border);
  }
  .lp-app-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .lp-app-bar-title { margin-left: 8px; font-size: 11px; font-weight: 600; color: var(--muted); }

  /* Resume Tailor */
  .lp-rt-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 5px; }
  .lp-rt-box {
    font-size: 12px; color: var(--text); line-height: 1.55;
    background: var(--bg); border-radius: 8px; padding: 10px 12px;
    border: 1px solid var(--border); min-height: 60px;
  }
  .lp-rt-btn {
    width: 100%; font-family: var(--font); font-size: 13px; font-weight: 600;
    padding: 10px; border-radius: 9px; border: none;
    background: var(--green); color: white; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: background 0.2s;
  }
  .lp-rt-btn:hover { background: var(--green-light); }
  .lp-rt-btn:disabled { opacity: 0.7; cursor: default; }
  .lp-rt-result { margin-top: 12px; background: var(--bg); border-radius: 10px; padding: 12px; border: 1px solid var(--border); animation: lpFadeUp 0.4s ease both; }
  .lp-rt-result-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--green); margin-bottom: 8px; }
  .lp-rt-result-text { font-size: 12px; line-height: 1.65; color: var(--text); margin-bottom: 10px; }
  .lp-rt-highlight { background: rgba(29,185,84,0.15); color: var(--green); border-radius: 3px; padding: 1px 3px; font-style: normal; font-weight: 600; }
  .lp-rt-chips { display: flex; flex-wrap: wrap; gap: 5px; }
  .lp-rt-chip { font-size: 10px; font-weight: 600; background: rgba(29,185,84,0.1); color: var(--green); padding: 3px 8px; border-radius: 99px; }
  .lp-rt-reset { font-size: 11px; color: var(--muted); background: none; border: none; cursor: pointer; margin-top: 8px; text-decoration: underline; font-family: var(--font); }

  /* Internship Finder */
  .lp-if-window { display: flex; height: 340px; overflow: hidden; }
  .lp-if-desktop { display: flex; height: 340px; overflow: hidden; }
  .lp-if-mobile { display: none; }
  .lp-if-list { width: 210px; border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; }
  .lp-if-tabs { display: flex; gap: 4px; padding: 8px; border-bottom: 1px solid var(--border); }
  .lp-tab-btn {
    font-family: var(--font); font-size: 11px; font-weight: 600;
    padding: 4px 9px; border-radius: 6px; border: none;
    background: transparent; color: var(--muted); cursor: pointer; transition: all 0.15s;
  }
  .lp-tab-btn.active { background: var(--green); color: white; }
  .lp-if-jobs { overflow-y: auto; flex: 1; }
  .lp-job-row {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 10px; cursor: pointer; border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }
  .lp-job-row:hover { background: var(--bg); }
  .lp-job-row.active { background: var(--green-dim); }
  .lp-job-avatar {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: white;
  }
  .lp-job-avatar.lg { width: 36px; height: 36px; border-radius: 9px; font-size: 14px; }
  .lp-job-row-title { font-size: 11px; font-weight: 600; color: var(--text); letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .lp-job-row-co { font-size: 10px; color: var(--muted); }
  .lp-job-score { font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .lp-if-detail { flex: 1; padding: 14px; overflow-y: auto; }
  .lp-detail-chip {
    font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 99px;
    background: var(--bg); color: var(--muted); white-space: nowrap;
  }
  .lp-detail-chip.green { background: var(--green-dim); color: var(--green); }
  .lp-match-bar { height: 5px; background: rgba(0,0,0,0.07); border-radius: 99px; overflow: hidden; }
  .lp-match-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.16,1,0.3,1); }

  /* Application Tracker */
  .lp-at-board { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; padding: 12px; }
  .lp-col-header {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 11px; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.01em;
  }
  .lp-col-count {
    width: 18px; height: 18px; border-radius: 50%; background: var(--bg);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: var(--muted);
  }
  .lp-app-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 9px;
    padding: 9px 10px; margin-bottom: 6px; cursor: pointer;
    transition: box-shadow 0.15s, transform 0.15s;
  }
  .lp-app-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.09); transform: translateY(-1px); }
  .lp-app-card-co { font-size: 12px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
  .lp-app-card-role { font-size: 10px; color: var(--muted); margin-top: 1px; }
  .lp-app-card-date { font-size: 10px; color: var(--muted); margin-top: 5px; opacity: 0.7; }
  .lp-tracker-overlay {
    position: absolute; inset: 0; background: rgba(0,0,0,0.35);
    backdrop-filter: blur(4px); border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    animation: lpFadeUp 0.2s ease both; z-index: 10;
  }
  .lp-tracker-modal {
    background: white; border-radius: 14px; padding: 18px 20px;
    width: 220px; box-shadow: 0 16px 40px rgba(0,0,0,0.16);
    animation: heroTextIn 0.25s cubic-bezier(0.16,1,0.3,1) both; position: relative;
  }
  .lp-tracker-modal-co { font-size: 15px; font-weight: 800; letter-spacing: -0.03em; }
  .lp-tracker-modal-role { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .lp-tracker-advance-btn {
    width: 100%; margin-top: 12px; font-family: var(--font); font-size: 12px; font-weight: 600;
    padding: 9px; border-radius: 8px; border: none; background: var(--green);
    color: white; cursor: pointer; transition: background 0.2s;
  }
  .lp-tracker-advance-btn:hover { background: var(--green-light); }
  .lp-tracker-close {
    position: absolute; top: 10px; right: 10px; width: 22px; height: 22px;
    border-radius: 50%; border: none; background: var(--bg); cursor: pointer;
    font-size: 12px; color: var(--muted); display: flex; align-items: center; justify-content: center;
    font-family: var(--font);
  }

  @media (max-width: 768px) {
    .lp-demo-section,
    .lp-demo-section.rev { grid-template-columns: 1fr !important; padding: 56px 24px; gap: 32px; }
    .lp-demo-section.rev .lp-demo-text { order: -1 !important; }
    .lp-if-window { flex-direction: column; height: auto; }
    .lp-if-list { width: 100%; height: 180px; border-right: none; border-bottom: 1px solid var(--border); }
    .lp-if-desktop { display: none; }
    .lp-if-mobile { display: block; }
    .lp-demo-section.rev .lp-demo-text { order: -1 !important; }
    .lp-at-board { grid-template-columns: repeat(2,1fr); }
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
    .lp-submit { width: 100%; justify-content: center; }
    .lp-app-window { max-width: 100%; overflow-x: hidden; }
    .lp-faq-section { padding: 56px 24px; }
    .lp-demo-title { font-size: 24px; }
    .lp-at-board { grid-template-columns: repeat(2, 1fr); gap: 6px; padding: 10px; }
    .lp-modal { padding: 28px 20px; }
    .lp-waitlist-social { flex-direction: column; gap: 6px; }
  }
`;

/* ── FAQ ── */
const FAQS = [
  { q: "Is In Turn free to use?", a: "Yes. In Turn will be free to use at launch. We're building this for Canadian students and new grads, and we want access to be as open as possible. We may introduce optional premium features down the road, but the core tools will always be free." },
  { q: "When exactly does it launch?", a: "We're targeting January 2027. Sign up for the waitlist and you'll be the first to know the exact date, plus you'll get early access before we open to the public." },
  { q: "Is In Turn only for Canadian students?", a: "For now, yes. We're starting with the Canadian market because the internship and co-op landscape here has unique challenges we want to solve well. International expansion is on the roadmap after launch." },
  { q: "How does the AI resume tailor work?", a: "You paste your existing resume bullet and the job description. Our AI analyzes the language, keywords, and tone the employer is using and rewrites your bullet to match, while keeping it truthful to your experience. It takes under 15 seconds." },
  { q: "What makes In Turn different from LinkedIn or Indeed?", a: "LinkedIn and Indeed are built for everyone. In Turn is built specifically for Canadian students and new grads. The match scores, resume tailoring, and application tracker are all designed around the co-op and internship cycle, not senior job searches." },
  { q: "How do I get early access?", a: "Join the waitlist above. We'll reach out to waitlist members first when we start our early access program before the January 2027 launch." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div className="lp-faq-section">
        <div className="lp-faq-header lp-fade-up">
          <div className="lp-section-label">FAQ</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text)', marginTop: 8 }}>Common questions</h2>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} className={`lp-faq-item${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="lp-faq-q">
              <span>{faq.q}</span>
              <span className="lp-faq-icon">{open === i ? '−' : '+'}</span>
            </div>
            {open === i && <div className="lp-faq-a">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── RESUME TAILOR DEMO ── */
function ResumeTailorDemo() {
  const [phase, setPhase] = useState('idle');
  const handle = () => { setPhase('loading'); setTimeout(() => setPhase('done'), 1600); };
  return (
    <div className="lp-app-window lp-demo-ui">
      <div className="lp-app-bar">
        <div className="lp-app-dot" style={{background:'#FF5F57'}}/><div className="lp-app-dot" style={{background:'#FFBD2E'}}/><div className="lp-app-dot" style={{background:'#28CA42'}}/>
        <span className="lp-app-bar-title">Resume Tailor · In Turn</span>
      </div>
      <div style={{padding:14, display:'flex', flexDirection:'column', gap:10}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:10}}>
          <div>
            <div className="lp-rt-label">Your Resume Bullet</div>
            <div className="lp-rt-box">Helped run social media accounts and responded to customer comments.</div>
          </div>
          <div>
            <div className="lp-rt-label">Job Description</div>
            <div className="lp-rt-box" style={{fontSize:11, color:'var(--muted)'}}>Marketing Intern at Shopify. Grow our social presence, engage our community, and drive measurable brand results across platforms...</div>
          </div>
        </div>
        <button className="lp-rt-btn" onClick={handle} disabled={phase !== 'idle'}>
          {phase === 'loading' ? '✦  Tailoring your bullet...' : phase === 'done' ? '✓  Done' : '✦  Tailor with AI'}
        </button>
        {phase === 'done' && (
          <div className="lp-rt-result">
            <div className="lp-rt-result-label">✦ Tailored Result</div>
            <div className="lp-rt-result-text">
              Managed brand presence across <mark className="lp-rt-highlight">3 social platforms</mark>, driving a{' '}
              <mark className="lp-rt-highlight">28% engagement increase</mark> through{' '}
              <mark className="lp-rt-highlight">community-driven content</mark> strategies aligned with{' '}
              <mark className="lp-rt-highlight">Shopify's growth goals</mark>.
            </div>
            <div className="lp-rt-chips">
              {['28% engagement','community-driven','Shopify','3 platforms','content strategy'].map(k => <span key={k} className="lp-rt-chip">{k}</span>)}
            </div>
            <button className="lp-rt-reset" onClick={() => setPhase('idle')}>Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── INTERNSHIP FINDER DEMO ── */
const IF_JOBS = [
  { id:1, co:'Shopify', role:'Product Manager Intern', loc:'Toronto, ON', score:92, salary:'$28/hr', color:'#96BF48', init:'S', desc:'Join Shopify\'s product team to define the roadmap for merchant-facing tools. Work directly with PMs, designers, and engineers.' },
  { id:2, co:'RBC', role:'Data Analyst Intern', loc:'Toronto, ON', score:78, salary:'$24/hr', color:'#003168', init:'R', desc:'Analyze financial datasets to surface insights for the retail banking division. Strong SQL and Excel skills required.' },
  { id:3, co:'Stripe', role:'Software Engineer Intern', loc:'Remote', score:71, salary:'$35/hr', color:'#635BFF', init:'S', desc:'Build and ship features on Stripe\'s core payments platform. Experience with TypeScript and distributed systems preferred.' },
  { id:4, co:'Hootsuite', role:'UX Design Intern', loc:'Vancouver, BC', score:64, salary:'$22/hr', color:'#F5851F', init:'H', desc:'Design user flows and prototypes for our social media management dashboard. Figma proficiency required.' },
];
function scoreColor(s) { return s >= 80 ? 'var(--green)' : s >= 70 ? '#CC7700' : 'var(--muted)'; }

function InternshipFinderDemo() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('all');
  const jobs = tab === 'high' ? IF_JOBS.filter(j => j.score >= 80) : IF_JOBS;
  const toggle = (j) => setSelected(selected?.id === j.id ? null : j);
  return (
    <div className="lp-app-window lp-demo-ui">
      <div className="lp-app-bar">
        <div className="lp-app-dot" style={{background:'#FF5F57'}}/><div className="lp-app-dot" style={{background:'#FFBD2E'}}/><div className="lp-app-dot" style={{background:'#28CA42'}}/>
        <span className="lp-app-bar-title">Internship Finder · In Turn</span>
      </div>
      {/* Desktop: side-by-side */}
      <div className="lp-if-desktop">
        <div className="lp-if-list" style={{width:210,borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',flexShrink:0}}>
          <div className="lp-if-tabs">
            {[['all','All'],['high','High Match']].map(([k,l]) => (
              <button key={k} className={`lp-tab-btn${tab===k?' active':''}`} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <div className="lp-if-jobs" style={{overflowY:'auto',flex:1}}>
            {jobs.map(j => (
              <div key={j.id} className={`lp-job-row${selected?.id===j.id?' active':''}`} onClick={() => setSelected(j)}>
                <div className="lp-job-avatar" style={{background:j.color}}>{j.init}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="lp-job-row-title">{j.role}</div>
                  <div className="lp-job-row-co">{j.co}</div>
                </div>
                <div className="lp-job-score" style={{color:scoreColor(j.score)}}>{j.score}</div>
              </div>
            ))}
          </div>
        </div>
        {(selected || IF_JOBS[0]) && (() => { const s = selected || IF_JOBS[0]; return (
          <div className="lp-if-detail">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
              <div className="lp-job-avatar lg" style={{background:s.color}}>{s.init}</div>
              <div>
                <div style={{fontWeight:700,fontSize:13,letterSpacing:'-0.02em'}}>{s.role}</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>{s.co} · {s.loc}</div>
              </div>
            </div>
            <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:12}}>
              <span className="lp-detail-chip green">Match: {s.score}%</span>
              <span className="lp-detail-chip">{s.salary}</span>
              <span className="lp-detail-chip">{s.loc}</span>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.65,marginBottom:12}}>{s.desc}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginBottom:4,display:'flex',justifyContent:'space-between'}}>
              <span>Match score</span><span style={{fontWeight:600,color:scoreColor(s.score)}}>{s.score}/100</span>
            </div>
            <div className="lp-match-bar"><div className="lp-match-fill" style={{width:`${s.score}%`,background:scoreColor(s.score)}}/></div>
          </div>
        );})()}
      </div>
      {/* Mobile: stacked expandable list */}
      <div className="lp-if-mobile">
        <div className="lp-if-tabs" style={{padding:'8px 12px',borderBottom:'1px solid var(--border)',display:'flex',gap:4}}>
          {[['all','All'],['high','High Match']].map(([k,l]) => (
            <button key={k} className={`lp-tab-btn${tab===k?' active':''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        {jobs.map(j => (
          <div key={j.id}>
            <div className={`lp-job-row${selected?.id===j.id?' active':''}`} onClick={() => toggle(j)} style={{padding:'12px 14px'}}>
              <div className="lp-job-avatar" style={{background:j.color}}>{j.init}</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="lp-job-row-title">{j.role}</div>
                <div className="lp-job-row-co">{j.co} · {j.loc}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div className="lp-job-score" style={{color:scoreColor(j.score)}}>{j.score}</div>
                <span style={{fontSize:10,color:'var(--muted)'}}>{selected?.id===j.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {selected?.id===j.id && (
              <div style={{padding:'10px 14px 14px',background:'var(--bg)',borderBottom:'1px solid var(--border)',animation:'lpFadeUp 0.2s ease both'}}>
                <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:10}}>
                  <span className="lp-detail-chip green">Match: {j.score}%</span>
                  <span className="lp-detail-chip">{j.salary}</span>
                </div>
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.65,marginBottom:10}}>{j.desc}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:4,display:'flex',justifyContent:'space-between'}}>
                  <span>Match score</span><span style={{fontWeight:600,color:scoreColor(j.score)}}>{j.score}/100</span>
                </div>
                <div className="lp-match-bar"><div className="lp-match-fill" style={{width:`${j.score}%`,background:scoreColor(j.score)}}/></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── APPLICATION TRACKER DEMO ── */
const STAGES = ['applied','interviewing','offer','rejected'];
const STAGE_LABELS = {applied:'Applied',interviewing:'Interviewing',offer:'Offer 🎉',rejected:'Rejected'};
const STAGE_COLORS = {applied:'#0066CC',interviewing:'#CC7700',offer:'var(--green)',rejected:'#CC2200'};
const INIT_APPS = {
  applied:[{id:1,co:'Shopify',role:'Product Intern',date:'Mar 10'},{id:2,co:'Stripe',role:'Data Intern',date:'Mar 12'}],
  interviewing:[{id:3,co:'Google',role:'SWE Intern',date:'Mar 5'}],
  offer:[{id:4,co:'Wealthsimple',role:'Design Intern',date:'Feb 28'}],
  rejected:[{id:5,co:'Meta',role:'UX Intern',date:'Mar 1'}],
};

function AppTrackerDemo() {
  const [apps, setApps] = useState(INIT_APPS);
  const [sel, setSel] = useState(null);
  const advance = (app, stage) => {
    const next = STAGES[STAGES.indexOf(stage)+1];
    if (!next) return;
    setApps(prev => ({...prev,[stage]:prev[stage].filter(a=>a.id!==app.id),[next]:[...prev[next],app]}));
    setSel(null);
  };
  return (
    <div className="lp-app-window lp-demo-ui" style={{position:'relative'}}>
      <div className="lp-app-bar">
        <div className="lp-app-dot" style={{background:'#FF5F57'}}/><div className="lp-app-dot" style={{background:'#FFBD2E'}}/><div className="lp-app-dot" style={{background:'#28CA42'}}/>
        <span className="lp-app-bar-title">Application Tracker · In Turn</span>
      </div>
      <div className="lp-at-board">
        {STAGES.map(stage => (
          <div key={stage}>
            <div className="lp-col-header">
              <span style={{color:STAGE_COLORS[stage]}}>{STAGE_LABELS[stage]}</span>
              <span className="lp-col-count">{apps[stage].length}</span>
            </div>
            {apps[stage].map(app => (
              <div key={app.id} className="lp-app-card" onClick={() => setSel({app,stage})}>
                <div className="lp-app-card-co">{app.co}</div>
                <div className="lp-app-card-role">{app.role}</div>
                <div className="lp-app-card-date">{app.date}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {sel && (
        <div className="lp-tracker-overlay" onClick={() => setSel(null)}>
          <div className="lp-tracker-modal" onClick={e => e.stopPropagation()}>
            <button className="lp-tracker-close" onClick={() => setSel(null)}>✕</button>
            <div className="lp-tracker-modal-co">{sel.app.co}</div>
            <div className="lp-tracker-modal-role">{sel.app.role}</div>
            <div style={{display:'flex',gap:5,marginTop:8,flexWrap:'wrap'}}>
              <span className="lp-detail-chip" style={{background:`${STAGE_COLORS[sel.stage]}18`,color:STAGE_COLORS[sel.stage]}}>{STAGE_LABELS[sel.stage]}</span>
              <span className="lp-detail-chip">{sel.app.date}</span>
            </div>
            {STAGES.indexOf(sel.stage) < STAGES.length-1 && (
              <button className="lp-tracker-advance-btn" onClick={() => advance(sel.app,sel.stage)}>
                Move to {STAGE_LABELS[STAGES[STAGES.indexOf(sel.stage)+1]]} →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const shineRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)`;
    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18) 0%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    card.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow = '';
  };

  const handleMouseEnter = () => {
    ref.current.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
  };

  return (
    <div ref={ref} className={className} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
      <div ref={shineRef} className="lp-feature-shine" />
      {children}
    </div>
  );
}

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
    <form className="lp-form" onSubmit={handleSubmit}>
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

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.lp-fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="lp">

        {/* NAV */}
        <nav className="lp-nav">
          <button className="lp-nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="lp-logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 18 L7 10 Q7 6 11 6 L17 6"/>
                <polyline points="14,3 17,6 14,9"/>
              </svg>
            </div>
            <span className="lp-logo-text">In Turn</span>
          </button>
          <button className="lp-nav-cta" onClick={() => setShowModal(true)}>Join the Waitlist</button>
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
                  <div className="lp-float-score-sub">Shopify, Product Intern</div>
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
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}>
                  <path d="M7 18 L7 10 Q7 6 11 6 L17 6"/>
                  <polyline points="14,3 17,6 14,9"/>
                </svg>
              </div>
            </div>
            <div className="lp-eyebrow">
              <span className="lp-eyebrow-dot" />
              Launching January 2027
            </div>
            <h1>Everything you need<br />to <span>land your first</span><br />opportunity.</h1>
            <p className="lp-hero-p">In Turn is the all-in-one career platform built for Canadian students and new grads. Tailor your resume, find the right roles, and track every application in one place.</p>
            <div className="lp-hero-form-wrap">
              <EmailForm
                inputClass="lp-input"
                submitClass="lp-submit"
                successClass="lp-success"
                privacyClass="lp-privacy"
              />
              <div className="lp-privacy">No spam. We'll only reach out with launch updates.</div>
              <div className="lp-waitlist-social">
                <div className="lp-waitlist-avatars">
                  <div className="lp-waitlist-avatar" style={{background:'#1DB954'}}>A</div>
                  <div className="lp-waitlist-avatar" style={{background:'#635BFF'}}>J</div>
                  <div className="lp-waitlist-avatar" style={{background:'#FF9500'}}>S</div>
                  <div className="lp-waitlist-avatar" style={{background:'#003168'}}>M</div>
                </div>
                <span className="lp-waitlist-text">Join <strong>500+</strong> students already on the waitlist</span>
              </div>
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
        <div className="lp-features-section">
          <div className="lp-section-header lp-fade-up">
            <div className="lp-section-label">What's coming</div>
            <h2>Three tools. One platform. One goal.</h2>
          </div>

          <div className="lp-features-grid">

            {/* Feature 1 - Resume Tailor */}
            <TiltCard className="lp-feature lp-fade-up" style={{ transitionDelay: '0.1s' }}>
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
            </TiltCard>

            {/* Feature 2 - Internship Finder */}
            <TiltCard className="lp-feature lp-fade-up" style={{ transitionDelay: '0.2s' }}>
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
                    <div className="lp-score-label">Match score: Product Intern, Shopify</div>
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
            </TiltCard>

            {/* Feature 3 - Application Tracker */}
            <TiltCard className="lp-feature lp-fade-up" style={{ transitionDelay: '0.3s' }}>
              <div className="lp-feature-top">
                <div className="lp-feature-icon">
                  <svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <span className="lp-badge lp-badge-soon">January 2027</span>
              </div>
              <h3>Application Tracker</h3>
              <p>Keep every application organised in one place. Track where you stand across every stage: applied, interviewing, offer, or rejected. Nothing falls through the cracks.</p>
              <div className="lp-preview">
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Shopify, Product Intern</span>
                  <span className="lp-status-pill lp-status-interview">Interviewing</span>
                </div>
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Stripe, Data Intern</span>
                  <span className="lp-status-pill lp-status-applied">Applied</span>
                </div>
                <div className="lp-preview-row">
                  <span className="lp-preview-label">Meta, UX Intern</span>
                  <span className="lp-status-pill lp-status-rejected">Rejected</span>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>

        {/* DEMO SECTIONS */}
        <div className="lp-demos">

          {/* Resume Tailor */}
          <div className="lp-demo-section">
            <div className="lp-demo-text lp-fade-up">
              <div className="lp-demo-label">Resume Tailor</div>
              <h2 className="lp-demo-title">Turn any bullet into a perfect match.</h2>
              <p className="lp-demo-desc">Paste your resume bullet and a job description. In Turn rewrites it in seconds, matching the exact keywords, tone, and language the employer is looking for.</p>
            </div>
            <div className="lp-fade-up" style={{transitionDelay:'0.15s'}}>
              <div className="lp-demo-badge-wrap">
                <span className="lp-demo-badge"><span className="lp-demo-badge-dot"/>Interactive Demo</span>
                <div className="lp-demo-hint"><strong>Click "Tailor with AI" to see it in action</strong></div>
              </div>
              <ResumeTailorDemo />
            </div>
          </div>

          {/* Internship Finder */}
          <div className="lp-demo-section rev">
            <div className="lp-demo-text lp-fade-up">
              <div className="lp-demo-label">Internship Finder</div>
              <h2 className="lp-demo-title">Find the roles most likely to say yes.</h2>
              <p className="lp-demo-desc">Upload your resume once and get matched to internships by relevance. Every listing gets a 1–100 match score so you always know where to focus.</p>
            </div>
            <div className="lp-fade-up" style={{transitionDelay:'0.15s'}}>
              <div className="lp-demo-badge-wrap">
                <span className="lp-demo-badge"><span className="lp-demo-badge-dot"/>Interactive Demo</span>
                <div className="lp-demo-hint"><strong>Click a job to see its match details</strong></div>
              </div>
              <InternshipFinderDemo />
            </div>
          </div>

          {/* Application Tracker */}
          <div className="lp-demo-section">
            <div className="lp-demo-text lp-fade-up">
              <div className="lp-demo-label">Application Tracker</div>
              <h2 className="lp-demo-title">Never lose track of where you stand.</h2>
              <p className="lp-demo-desc">Every application in one place. Move cards through stages as things progress: Applied, Interviewing, Offer, or Rejected. Click a card below to try it.</p>
            </div>
            <div className="lp-fade-up" style={{transitionDelay:'0.15s'}}>
              <div className="lp-demo-badge-wrap">
                <span className="lp-demo-badge"><span className="lp-demo-badge-dot"/>Interactive Demo</span>
                <div className="lp-demo-hint"><strong>Click any card to move it to the next stage</strong></div>
              </div>
              <AppTrackerDemo />
            </div>
          </div>

        </div>

        {/* FAQ */}
        <FAQSection />

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


      </div>

      {/* WAITLIST MODAL */}
      {showModal && (
        <div className="lp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="lp-modal" onClick={e => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="lp-modal-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 18 L7 10 Q7 6 11 6 L17 6"/>
                <polyline points="14,3 17,6 14,9"/>
              </svg>
            </div>
            <h2>Join the Waitlist</h2>
            <p className="lp-modal-sub">Be the first to know when In Turn launches in January 2027. No spam. Just one email when we go live.</p>
            <EmailForm
              inputClass="lp-input"
              submitClass="lp-submit"
              successClass="lp-success"
              privacyClass="lp-privacy"
            />
          </div>
        </div>
      )}
    </>
  );
}
