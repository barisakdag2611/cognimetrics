import { iqClassification, iqToPercentile, formatIQ, iqConfidenceInterval } from '../utils/scoring';
import { generateCertificate } from '../utils/pdfCertificate';
import { subtests } from '../data/itemBank';
import { subtestTransKeys } from '../data/translations';

export default function ResultsPage({ t, results, onHome, onMethodology }) {
  const { compositeIQ, factorScores, subtestScores, testId, date, duration, verificationCode, compositeCI } = results;
  const classification = iqClassification(compositeIQ);
  const percentile = iqToPercentile(compositeIQ);

  function downloadCertificate() {
    const doc = generateCertificate(results);
    doc.save(`StructuraMentis_Certificate_${testId}.pdf`);
  }

  return (
    <div className="results">
      <div className="results-header">
        <div className="results-brand">{t.brand}</div>
        <div className="results-iq">{formatIQ(compositeIQ)}</div>
        <div className="results-classification">{classification}</div>
        <div className="results-percentile">{percentile}th percentile</div>
        {compositeCI && (
          <div className="results-ci" style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            95% CI: {compositeCI.lower}–{compositeCI.upper} (SEM: ±{compositeCI.marginIQ})
          </div>
        )}
      </div>

      <div className="results-section">
        <div className="results-section-title">{t.factorScores}</div>
        <div className="results-factors">
          {Object.entries(factorScores).map(([key, factor]) => (
            <div key={key} className="factor-card">
              <div className="factor-label">{key}</div>
              <div className="factor-score">{formatIQ(factor.iq)}</div>
              <div className="factor-name">{factor.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-section">
        <div className="results-section-title">{t.subtestBreakdown}</div>
        <div className="results-subtests">
          {subtests.map(st => {
            const score = subtestScores[st.id];
            if (!score) return null;
            const barWidth = Math.max(5, ((score.iq - 40) / 120) * 100);
            const transKey = subtestTransKeys[st.id];
            return (
              <div key={st.id} className="subtest-result">
                <div className="subtest-result-left">
                  <span style={{ fontSize: 20 }}>{st.icon}</span>
                  <div>
                    <div className="subtest-result-name">{t[transKey]?.name || st.name}</div>
                    <div className="subtest-result-factor">{st.factor}</div>
                  </div>
                </div>
                <div className="subtest-result-right">
                  <div className="subtest-result-bar">
                    <div className="subtest-result-bar-fill" style={{ width: `${barWidth}%` }} />
                  </div>
                  <div className="subtest-result-score">{formatIQ(score.iq)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="results-verification">
        <div className="verification-code">{verificationCode}</div>
        <div className="verification-label">{t.verificationCode} &middot; {t.testId}: {testId}</div>
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={downloadCertificate}>
          {t.downloadPdf}
        </button>
        <button className="btn-secondary" onClick={onMethodology}>
          {t.methodologyBtn}
        </button>
        <button className="btn-secondary" onClick={onHome}>
          {t.home}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: 'var(--text-muted)' }}>
        <p>{t.disclaimer}</p>
        <p style={{ marginTop: 8 }}>
          {t.date}: {date} &middot; {t.duration}: {duration}
        </p>
      </div>
    </div>
  );
}
