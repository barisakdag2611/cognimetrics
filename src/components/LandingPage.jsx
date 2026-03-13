export default function LandingPage({ onStart, onMethodology }) {
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-brand">COGNIMETRICS</div>
        <h1 className="landing-title">Measure Your Mind</h1>
        <p className="landing-subtitle">
          A structurally rigorous cognitive assessment built on Item Response Theory
          and CHC framework. No norms needed — pure structural measurement.
        </p>

        <div className="landing-features">
          <div className="feature-card">
            <div className="feature-icon">&#x1F9E0;</div>
            <div className="feature-label">7 Cognitive Domains</div>
            <div className="feature-desc">Gf (WM + WMC), Gc, Gwm, Gs, Gq</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4CA;</div>
            <div className="feature-label">IRT 2PL Scoring</div>
            <div className="feature-desc">MLE theta estimation, no norm dependency</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4DC;</div>
            <div className="feature-label">Verified Certificate</div>
            <div className="feature-desc">PDF with HMAC-SHA256 verification code</div>
          </div>
        </div>

        <div className="landing-highlight">
          <div className="highlight-title">Why CogniMetrics?</div>
          <div className="highlight-grid">
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>Gf split into WM-weighted & WMC-weighted</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>Cross-structural isomorphism design</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>Ceiling at IQ 160 with calibrated hard items</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>Full methodology transparency</span>
            </div>
          </div>
        </div>

        <div className="landing-actions">
          <button className="btn-primary" onClick={onStart}>
            Start Assessment
          </button>
          <div className="landing-price">$9.99 &middot; ~45 minutes &middot; Up to IQ 160</div>
          <button className="btn-secondary" onClick={onMethodology}>
            View Methodology
          </button>
        </div>

        <div className="landing-footer">
          <div className="landing-stat">
            <div className="landing-stat-value">160</div>
            <div className="landing-stat-label">Max Ceiling</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">7</div>
            <div className="landing-stat-label">Subtests</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2PL</div>
            <div className="landing-stat-label">IRT Model</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">5</div>
            <div className="landing-stat-label">CHC Factors</div>
          </div>
        </div>

        <div className="landing-creator">
          Created by <strong>Muhammet Baris Akdag</strong>
        </div>
      </div>
    </div>
  );
}
