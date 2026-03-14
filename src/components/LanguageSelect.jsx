export default function LanguageSelect({ onSelect }) {
  return (
    <div className="lang-select">
      <div className="lang-select-inner">
        {/* Decorative line */}
        <div className="lang-ornament">&#x2726;</div>

        <h1 className="lang-select-title">STRVCTVRA MENTIS</h1>
        <p className="lang-select-subtitle">Zihnin Yapısı</p>

        <div className="lang-divider">
          <span className="lang-divider-line" />
          <span className="lang-divider-text">Select Language</span>
          <span className="lang-divider-line" />
        </div>

        <div className="lang-options">
          <button className="lang-option" onClick={() => onSelect('en')}>
            <span className="lang-option-name">English</span>
            <span className="lang-option-sub">International Edition</span>
          </button>

          <button className="lang-option" onClick={() => onSelect('tr')}>
            <span className="lang-option-name">Türkçe</span>
            <span className="lang-option-sub">Türkiye Edisyonu</span>
          </button>
        </div>

        <div className="lang-select-footer">
          <span>IRT 2PL</span>
          <span className="lang-footer-dot">&#xB7;</span>
          <span>CHC Framework</span>
          <span className="lang-footer-dot">&#xB7;</span>
          <span>Cross-Structural Isomorphism</span>
        </div>
        <div className="copyright">&copy; 2026 Muhammet Barış Akdağ. All rights reserved.</div>
      </div>
    </div>
  );
}
