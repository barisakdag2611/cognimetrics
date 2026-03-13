// Launch: 2026-03-13T17:00:00Z — 12 hour free window for TR
const LAUNCH_TIME = new Date('2026-03-13T17:00:00Z').getTime();
const FREE_WINDOW_MS = 12 * 60 * 60 * 1000;

function isFreeWindow() {
  return Date.now() < LAUNCH_TIME + FREE_WINDOW_MS;
}

function getRemainingFreeTime() {
  const remaining = (LAUNCH_TIME + FREE_WINDOW_MS) - Date.now();
  if (remaining <= 0) return null;
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}s ${mins}dk`;
}

export default function LandingPage({ t, onStart, onMethodology }) {
  const isFree = t.freePromo && isFreeWindow();
  const remaining = getRemainingFreeTime();

  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-brand">{t.brand}</div>
        <h1 className="landing-title">{t.title}</h1>
        <p className="landing-subtitle">{t.subtitle}</p>

        <div className="landing-features">
          <div className="feature-card">
            <div className="feature-icon">&#x1F9E0;</div>
            <div className="feature-label">{t.feature1Label}</div>
            <div className="feature-desc">{t.feature1Desc}</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4CA;</div>
            <div className="feature-label">{t.feature2Label}</div>
            <div className="feature-desc">{t.feature2Desc}</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4DC;</div>
            <div className="feature-label">{t.feature3Label}</div>
            <div className="feature-desc">{t.feature3Desc}</div>
          </div>
        </div>

        <div className="landing-highlight">
          <div className="highlight-title">{t.whyTitle}</div>
          <div className="highlight-grid">
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>{t.why1}</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>{t.why2}</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>{t.why3}</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check">&#x2713;</span>
              <span>{t.why4}</span>
            </div>
          </div>
        </div>

        <div className="landing-actions">
          <button className="btn-primary" onClick={onStart}>
            {t.startBtn}
          </button>
          {isFree ? (
            <div className="landing-promo">
              <div className="promo-badge">{t.freePromo}</div>
              {remaining && <div className="promo-countdown">Kalan süre: {remaining}</div>}
            </div>
          ) : (
            <div className="landing-price">{t.priceText}</div>
          )}
          <button className="btn-secondary" onClick={onMethodology}>
            {t.methodologyBtn}
          </button>
        </div>

        <div className="landing-footer">
          <div className="landing-stat">
            <div className="landing-stat-value">160</div>
            <div className="landing-stat-label">{t.statCeiling}</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">7</div>
            <div className="landing-stat-label">{t.statSubtests}</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2PL</div>
            <div className="landing-stat-label">{t.statModel}</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">5</div>
            <div className="landing-stat-label">{t.statFactors}</div>
          </div>
        </div>

        <div className="landing-creator">
          {t.createdBy} <strong>Muhammet Baris Akdag</strong>
        </div>
      </div>
    </div>
  );
}
