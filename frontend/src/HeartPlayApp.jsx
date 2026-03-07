import { useState } from "react";

const API_URL = "https://heartplay-backend.onrender.com/generate-activities";

// ── Palette ──────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F7F3EE;
    --sand: #EDE4D8;
    --terracotta: #C4714A;
    --terra-light: #D4896A;
    --terra-pale: #F0DDD3;
    --sage: #7A8C72;
    --sage-pale: #DDE4DA;
    --blush: #D4A5A0;
    --blush-pale: #F5EAE8;
    --ink: #1E1B18;
    --ink-light: #4A4540;
    --ink-faint: #9A9088;
    --white: #FDFAF7;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Layout ── */
  .hp-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ── */
  .hp-header {
    padding: 2rem 2.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(196,113,74,0.12);
  }

  .hp-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .hp-logo-icon {
    width: 36px; height: 36px;
    background: var(--terracotta);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  .hp-logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.01em;
  }

  .hp-logo-text em {
    font-style: italic;
    color: var(--terracotta);
  }

  .hp-tagline-small {
    font-size: 0.75rem;
    color: var(--ink-faint);
    letter-spacing: 0.05em;
  }

  /* ── Hero ── */
  .hp-hero {
    text-align: center;
    padding: 3.5rem 2rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .hp-hero::before {
    content: '';
    position: absolute;
    top: -60px; left: 50%;
    transform: translateX(-50%);
    width: 500px; height: 300px;
    background: radial-gradient(ellipse, rgba(196,113,74,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .hp-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 6vw, 3.25rem);
    font-weight: 300;
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: 0.75rem;
  }

  .hp-hero h1 em {
    font-style: italic;
    color: var(--terracotta);
  }

  .hp-hero p {
    font-size: 0.95rem;
    color: var(--ink-faint);
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ── Steps indicator ── */
  .hp-steps {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 1.5rem 2rem 0;
  }

  .hp-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    position: relative;
  }

  .hp-step-dot {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1.5px solid rgba(0,0,0,0.12);
    background: var(--white);
    color: var(--ink-faint);
    transition: all 0.3s;
    z-index: 1;
  }

  .hp-step.active .hp-step-dot {
    background: var(--terracotta);
    border-color: var(--terracotta);
    color: white;
  }

  .hp-step.done .hp-step-dot {
    background: var(--sage);
    border-color: var(--sage);
    color: white;
  }

  .hp-step-label {
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .hp-step.active .hp-step-label { color: var(--terracotta); font-weight: 500; }
  .hp-step.done .hp-step-label { color: var(--sage); }

  .hp-step-line {
    width: 48px; height: 1px;
    background: rgba(0,0,0,0.1);
    margin-bottom: 1.4rem;
  }

  .hp-step-line.done { background: var(--sage); }

  /* ── Card ── */
  .hp-card {
    background: var(--white);
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 2px;
    padding: 2rem 2rem 2rem;
    margin: 1.5rem auto;
    max-width: 560px;
    width: calc(100% - 3rem);
    box-shadow: 0 2px 20px rgba(0,0,0,0.04);
    animation: slideUp 0.35s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hp-card-label {
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--terracotta);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .hp-card h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }

  .hp-card-sub {
    font-size: 0.83rem;
    color: var(--ink-faint);
    margin-bottom: 1.75rem;
    line-height: 1.5;
  }

  /* ── Age slider ── */
  .hp-age-display {
    text-align: center;
    margin-bottom: 1.25rem;
  }

  .hp-age-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    font-weight: 300;
    color: var(--terracotta);
    line-height: 1;
  }

  .hp-age-unit {
    font-size: 0.8rem;
    color: var(--ink-faint);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 0.2rem;
  }

  .hp-age-stage {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: var(--terra-pale);
    color: var(--terracotta);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .hp-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      var(--terracotta) 0%,
      var(--terracotta) var(--val, 20%),
      var(--sand) var(--val, 20%),
      var(--sand) 100%
    );
    outline: none;
    margin: 1rem 0 0.5rem;
    cursor: pointer;
  }

  .hp-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--terracotta);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(196,113,74,0.4);
    cursor: pointer;
    transition: transform 0.15s;
  }

  .hp-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }

  .hp-slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--ink-faint);
    margin-top: 0.25rem;
  }

  /* ── Interest chips ── */
  .hp-interest-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  .hp-chip {
    padding: 0.5rem 1rem;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: var(--white);
    color: var(--ink-light);
    font-size: 0.83rem;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 100px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    user-select: none;
  }

  .hp-chip:hover {
    border-color: var(--terracotta);
    color: var(--terracotta);
    background: var(--terra-pale);
  }

  .hp-chip.selected {
    background: var(--terracotta);
    border-color: var(--terracotta);
    color: white;
  }

  .hp-chip-custom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .hp-input-inline {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
  }

  .hp-input-inline:focus { border-color: var(--terracotta); }

  .hp-btn-add {
    padding: 0.5rem 1rem;
    background: var(--sage);
    color: white;
    border: none;
    font-size: 0.8rem;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .hp-btn-add:hover { background: var(--ink-light); }

  /* ── Setting cards ── */
  .hp-setting-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 0.25rem;
  }

  .hp-setting-card {
    padding: 1.25rem;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: var(--white);
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .hp-setting-card:hover {
    border-color: var(--terracotta);
    background: var(--terra-pale);
  }

  .hp-setting-card.selected {
    border-color: var(--terracotta);
    background: var(--terra-pale);
  }

  .hp-setting-icon { font-size: 1.75rem; }

  .hp-setting-label {
    font-size: 0.83rem;
    font-weight: 500;
    color: var(--ink-light);
  }

  .hp-setting-card.selected .hp-setting-label { color: var(--terracotta); }

  /* ── Time pills ── */
  .hp-time-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  .hp-time-pill {
    padding: 0.6rem 1.25rem;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: var(--white);
    color: var(--ink-light);
    font-size: 0.83rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    border-radius: 100px;
  }

  .hp-time-pill:hover {
    border-color: var(--sage);
    color: var(--sage);
    background: var(--sage-pale);
  }

  .hp-time-pill.selected {
    background: var(--sage);
    border-color: var(--sage);
    color: white;
  }

  /* ── Buttons ── */
  .hp-btn-primary {
    width: 100%;
    padding: 1rem;
    background: var(--terracotta);
    color: white;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    margin-top: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .hp-btn-primary:hover:not(:disabled) {
    background: var(--terra-light);
    transform: translateY(-1px);
  }

  .hp-btn-primary:disabled {
    background: var(--sand);
    color: var(--ink-faint);
    cursor: not-allowed;
    transform: none;
  }

  .hp-btn-secondary {
    padding: 0.6rem 1.25rem;
    background: transparent;
    color: var(--ink-faint);
    border: 1px solid rgba(0,0,0,0.12);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 100px;
  }

  .hp-btn-secondary:hover {
    border-color: var(--ink-light);
    color: var(--ink-light);
  }

  .hp-btn-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }

  /* ── Loading ── */
  .hp-loading {
    text-align: center;
    padding: 3rem 2rem;
  }

  .hp-spinner {
    width: 48px; height: 48px;
    border: 3px solid var(--sand);
    border-top-color: var(--terracotta);
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .hp-loading p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--ink-light);
  }

  .hp-loading-sub {
    font-family: 'DM Sans', sans-serif !important;
    font-size: 0.78rem !important;
    font-style: normal !important;
    color: var(--ink-faint) !important;
    margin-top: 0.4rem;
  }

  /* ── Result card ── */
  .hp-result {
    animation: slideUp 0.4s ease;
  }

  .hp-result-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--sage-pale);
    border-left: 3px solid var(--sage);
    margin-bottom: 1.5rem;
    font-size: 0.78rem;
    color: var(--sage);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .hp-result-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .hp-meta-tag {
    padding: 0.3rem 0.7rem;
    background: var(--terra-pale);
    color: var(--terracotta);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    font-weight: 500;
    border-radius: 100px;
  }

  .hp-meta-tag.sage {
    background: var(--sage-pale);
    color: var(--sage);
  }

  .hp-result-content {
    font-size: 0.95rem;
    color: var(--ink-light);
    line-height: 1.85;
    white-space: pre-wrap;
    padding: 1.5rem;
    background: var(--cream);
    border: 1px solid rgba(0,0,0,0.06);
    position: relative;
  }

  .hp-result-content::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    color: rgba(196,113,74,0.15);
    line-height: 1;
  }

  .hp-result-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .hp-btn-action {
    flex: 1;
    padding: 0.75rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    min-width: 120px;
  }

  .hp-btn-action.primary {
    background: var(--terracotta);
    color: white;
  }

  .hp-btn-action.primary:hover { background: var(--terra-light); }

  .hp-btn-action.outline {
    background: transparent;
    color: var(--ink-light);
    border: 1.5px solid rgba(0,0,0,0.12);
  }

  .hp-btn-action.outline:hover {
    border-color: var(--terracotta);
    color: var(--terracotta);
  }

  /* ── Error ── */
  .hp-error {
    padding: 1rem 1.25rem;
    background: var(--blush-pale);
    border-left: 3px solid var(--blush);
    color: var(--ink-light);
    font-size: 0.85rem;
    margin-top: 1rem;
  }

  /* ── Footer ── */
  .hp-footer {
    text-align: center;
    padding: 2rem;
    margin-top: auto;
    border-top: 1px solid rgba(0,0,0,0.06);
  }

  .hp-footer p {
    font-size: 0.72rem;
    color: var(--ink-faint);
    letter-spacing: 0.05em;
  }

  .hp-footer a {
    color: var(--terracotta);
    text-decoration: none;
  }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .hp-header { padding: 1.25rem 1.5rem; }
    .hp-hero { padding: 2rem 1.5rem 1rem; }
    .hp-card { margin: 1rem auto; padding: 1.5rem; width: calc(100% - 2rem); }
    .hp-setting-grid { grid-template-columns: 1fr 1fr; }
  }
`;

// ── Data ──────────────────────────────────────────────────
const INTERESTS = [
  { label: "Art & Drawing", emoji: "🎨" },
  { label: "Music", emoji: "🎵" },
  { label: "Outdoors", emoji: "🌿" },
  { label: "Building", emoji: "🧱" },
  { label: "Stories", emoji: "📚" },
  { label: "Animals", emoji: "🐾" },
  { label: "Movement", emoji: "🤸" },
  { label: "Science", emoji: "🔬" },
  { label: "Cooking", emoji: "🍳" },
  { label: "Pretend Play", emoji: "🎭" },
];

const SETTINGS = [
  { value: "indoor", label: "Indoors", emoji: "🏠" },
  { value: "outdoor", label: "Outdoors", emoji: "🌳" },
  { value: "both", label: "Either", emoji: "✨" },
  { value: "on the go", label: "On the Go", emoji: "🚗" },
];

const TIMES = [
  { value: "10", label: "10 min" },
  { value: "20", label: "20 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "90 min" },
];

function getAgeStage(age) {
  if (age <= 1) return "Infant";
  if (age <= 3) return "Toddler";
  if (age <= 5) return "Preschool";
  if (age <= 8) return "Early Childhood";
  if (age <= 12) return "Middle Childhood";
  return "Teen";
}

const STEPS = ["Child", "Interests", "Setup", "Activity"];

// ── Component ─────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(5);
  const [interests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [setting, setSetting] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sliderPct = `${((age - 1) / 17) * 100}%`;

  const toggleInterest = (label) => {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const addCustom = () => {
    const val = customInterest.trim();
    if (val && !interests.includes(val)) {
      setInterests((prev) => [...prev, val]);
      setCustomInterest("");
    }
  };

  const canAdvance = () => {
    if (step === 0) return true;
    if (step === 1) return interests.length > 0;
    if (step === 2) return setting && time;
    return false;
  };

  const generateActivity = async () => {
    setLoading(true);
    setError("");
    setStep(3);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: age.toString(),
          interests,
          time_available: time,
          setting,
        }),
      });
      const data = await res.json();
      setActivity(data.activities || "Something went wrong — please try again.");
    } catch (e) {
      setError("Couldn't reach the server. Please try again in a moment.");
      setActivity("");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setAge(5);
    setInterests([]);
    setSetting("");
    setTime("");
    setActivity("");
    setError("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hp-root">

        {/* Header */}
        <header className="hp-header">
          <div className="hp-logo">
            <div className="hp-logo-icon">💖</div>
            <span className="hp-logo-text">Heart<em>Play</em></span>
          </div>
          <span className="hp-tagline-small">AI-powered bonding activities</span>
        </header>

        {/* Hero */}
        {step === 0 && (
          <div className="hp-hero">
            <h1>Make playtime <em>matter.</em></h1>
            <p>Tell us about your child and we'll craft a developmentally-rich activity designed just for them — in seconds.</p>
          </div>
        )}

        {/* Step indicator */}
        <div className="hp-steps">
          {STEPS.map((label, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div className={`hp-step ${i === step ? "active" : i < step ? "done" : ""}`}>
                <div className="hp-step-dot">
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="hp-step-label">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`hp-step-line ${i < step ? "done" : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 0: Age ── */}
        {step === 0 && (
          <div className="hp-card">
            <p className="hp-card-label">Step 1 of 3</p>
            <h2>How old is your child?</h2>
            <p className="hp-card-sub">Slide to select your child's age — we'll tailor everything to their developmental stage.</p>

            <div className="hp-age-display">
              <div className="hp-age-num">{age}</div>
              <div className="hp-age-unit">{age === 1 ? "year old" : "years old"}</div>
              <div>
                <span className="hp-age-stage">{getAgeStage(age)}</span>
              </div>
            </div>

            <input
              type="range"
              min={1} max={18} value={age}
              className="hp-slider"
              style={{ "--val": sliderPct }}
              onChange={(e) => setAge(Number(e.target.value))}
            />
            <div className="hp-slider-labels">
              <span>1 yr</span>
              <span>6 yrs</span>
              <span>12 yrs</span>
              <span>18 yrs</span>
            </div>

            <button className="hp-btn-primary" onClick={() => setStep(1)}>
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 1: Interests ── */}
        {step === 1 && (
          <div className="hp-card">
            <p className="hp-card-label">Step 2 of 3</p>
            <h2>What does {age === 1 ? "your baby" : `your ${age}-year-old`} love?</h2>
            <p className="hp-card-sub">Pick as many as you like — or add your own. The more you share, the better the activity.</p>

            <div className="hp-interest-grid">
              {INTERESTS.map(({ label, emoji }) => (
                <button
                  key={label}
                  className={`hp-chip ${interests.includes(label) ? "selected" : ""}`}
                  onClick={() => toggleInterest(label)}
                >
                  <span>{emoji}</span> {label}
                </button>
              ))}
            </div>

            <div className="hp-chip-custom">
              <input
                className="hp-input-inline"
                placeholder="Add something else…"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
              />
              <button className="hp-btn-add" onClick={addCustom}>+ Add</button>
            </div>

            {interests.filter(i => !INTERESTS.map(x=>x.label).includes(i)).map(ci => (
              <div key={ci} style={{ marginTop: "0.5rem" }}>
                <button
                  className="hp-chip selected"
                  onClick={() => toggleInterest(ci)}
                >
                  ✦ {ci}
                </button>
              </div>
            ))}

            <div className="hp-btn-row">
              <button className="hp-btn-secondary" onClick={() => setStep(0)}>← Back</button>
              <button
                className="hp-btn-primary"
                style={{ width: "auto", padding: "0.75rem 2rem", marginTop: 0 }}
                disabled={!canAdvance()}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Setup ── */}
        {step === 2 && (
          <div className="hp-card">
            <p className="hp-card-label">Step 3 of 3</p>
            <h2>Where & how long?</h2>
            <p className="hp-card-sub">We'll match the activity to your setting and the time you have together.</p>

            <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "0.6rem", fontWeight: 500 }}>Setting</p>
            <div className="hp-setting-grid">
              {SETTINGS.map(({ value, label, emoji }) => (
                <div
                  key={value}
                  className={`hp-setting-card ${setting === value ? "selected" : ""}`}
                  onClick={() => setSetting(value)}
                >
                  <span className="hp-setting-icon">{emoji}</span>
                  <span className="hp-setting-label">{label}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "1.5rem 0 0.6rem", fontWeight: 500 }}>Time Available</p>
            <div className="hp-time-grid">
              {TIMES.map(({ value, label }) => (
                <button
                  key={value}
                  className={`hp-time-pill ${time === value ? "selected" : ""}`}
                  onClick={() => setTime(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hp-btn-row">
              <button className="hp-btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button
                className="hp-btn-primary"
                style={{ width: "auto", padding: "0.75rem 2rem", marginTop: 0 }}
                disabled={!canAdvance()}
                onClick={generateActivity}
              >
                Create Activity ✦
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Result ── */}
        {step === 3 && (
          <div className="hp-card hp-result">
            {loading ? (
              <div className="hp-loading">
                <div className="hp-spinner" />
                <p>Crafting something special…</p>
                <p className="hp-loading-sub">Tailored for your {age}-year-old {getAgeStage(age).toLowerCase()}</p>
              </div>
            ) : error ? (
              <>
                <div className="hp-error">{error}</div>
                <button className="hp-btn-primary" onClick={() => setStep(2)} style={{ marginTop: "1rem" }}>← Try Again</button>
              </>
            ) : (
              <>
                <div className="hp-result-badge">
                  ✦ &nbsp; Activity ready for your {getAgeStage(age).toLowerCase()}
                </div>

                <div className="hp-result-meta">
                  <span className="hp-meta-tag">Age {age}</span>
                  <span className="hp-meta-tag">{getAgeStage(age)}</span>
                  <span className="hp-meta-tag sage">{time} min · {setting}</span>
                  {interests.slice(0, 2).map(i => (
                    <span key={i} className="hp-meta-tag sage">{i}</span>
                  ))}
                </div>

                <div className="hp-result-content">{activity}</div>

                <div className="hp-result-actions">
                  <button className="hp-btn-action primary" onClick={generateActivity}>
                    Try Another ↺
                  </button>
                  <button className="hp-btn-action outline" onClick={reset}>
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="hp-footer">
          <p>Built with 💖 by <a href="https://eminatoric.github.io" target="_blank" rel="noreferrer">Emina Toric</a> · Child Development × AI</p>
        </footer>

      </div>
    </>
  );
}
