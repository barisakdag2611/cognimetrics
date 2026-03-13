import { iqClassification, iqToPercentile } from '../utils/scoring';
import { generateCertificate } from '../utils/pdfCertificate';
import { subtests } from '../data/itemBank';

export default function ResultsPage({ results, onHome, onMethodology }) {
  const { compositeIQ, factorScores, subtestScores, testId, date, duration, verificationCode } = results;
  const classification = iqClassification(compositeIQ);
  const percentile = iqToPercentile(compositeIQ);

  function downloadCertificate() {
    const doc = generateCertificate(results);
    doc.save(`CogniMetrics_Certificate_${testId}.pdf`);
  }

  return (
    <div className="results">
      <div className="results-header">
        <div className="results-brand">COGNIMETRICS</div>
        <div className="results-iq">{compositeIQ}</div>
        <div className="results-classification">{classification}</div>
        <div className="results-percentile">{percentile}th percentile</div>
      </div>

      {/* Factor Scores */}
      <div className="results-section">
        <div className="results-section-title">Factor Scores</div>
        <div className="results-factors">
          {Object.entries(factorScores).map(([key, factor]) => (
            <div key={key} className="factor-card">
              <div className="factor-label">{key}</div>
              <div className="factor-score">{factor.iq}</div>
              <div className="factor-name">{factor.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtest Breakdown */}
      <div className="results-section">
        <div className="results-section-title">Subtest Breakdown</div>
        <div className="results-subtests">
          {subtests.map(st => {
            const score = subtestScores[st.id];
            if (!score) return null;
            const barWidth = Math.max(5, ((score.iq - 40) / 120) * 100);
            return (
              <div key={st.id} className="subtest-result">
                <div className="subtest-result-left">
                  <span style={{ fontSize: 20 }}>{st.icon}</span>
                  <div>
                    <div className="subtest-result-name">{st.name}</div>
                    <div className="subtest-result-factor">{st.factor}</div>
                  </div>
                </div>
                <div className="subtest-result-right">
                  <div className="subtest-result-bar">
                    <div className="subtest-result-bar-fill" style={{ width: `${barWidth}%` }} />
                  </div>
                  <div className="subtest-result-score">{score.iq}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification */}
      <div className="results-verification">
        <div className="verification-code">{verificationCode}</div>
        <div className="verification-label">Verification Code &middot; Test ID: {testId}</div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button className="btn-primary" onClick={downloadCertificate}>
          Download PDF Certificate
        </button>
        <button className="btn-secondary" onClick={onMethodology}>
          View Methodology
        </button>
        <button className="btn-secondary" onClick={onHome}>
          Home
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: 'var(--text-muted)' }}>
        <p>
          This assessment provides a structural estimate of cognitive ability.
          It is not a clinical diagnosis.
        </p>
        <p style={{ marginTop: 8 }}>
          Date: {date} &middot; Duration: {duration}
        </p>
      </div>
    </div>
  );
}
