import { jsPDF } from 'jspdf';
import { iqClassification, iqToPercentile } from './scoring';

export function generateCertificate(testResults) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  // Background — dark scholarly
  doc.setFillColor(13, 17, 23); // --bg-primary
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border — gold
  doc.setDrawColor(201, 168, 76); // --gold
  doc.setLineWidth(1.5);
  doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 3, 3, 'S');

  // Inner border
  doc.setDrawColor(139, 115, 85); // --gold-dim
  doc.setLineWidth(0.5);
  doc.roundedRect(12, 12, pageWidth - 24, pageHeight - 24, 2, 2, 'S');

  // Header accent line
  doc.setDrawColor(201, 168, 76);
  doc.setLineWidth(0.8);
  doc.line(40, 35, pageWidth - 40, 35);

  // Title — inscription style
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(232, 213, 160); // --gold-light
  doc.text('STRVCTVRA MENTIS', centerX, 28, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(168, 155, 126); // --text-secondary
  doc.text('Structural Cognitive Assessment \u2014 Certificate of Completion', centerX, 42, { align: 'center' });

  // Main score
  doc.setFontSize(14);
  doc.setTextColor(232, 213, 160);
  doc.text('Composite Cognitive Index (CCI)', centerX, 58, { align: 'center' });

  doc.setFontSize(52);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(201, 168, 76); // --gold
  doc.text(String(testResults.compositeIQ), centerX, 78, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(168, 155, 126);
  const classification = iqClassification(testResults.compositeIQ);
  const percentile = iqToPercentile(testResults.compositeIQ);
  doc.text(`${classification} | ${percentile}th Percentile`, centerX, 85, { align: 'center' });

  // Confidence interval
  if (testResults.compositeCI) {
    doc.setFontSize(10);
    doc.setTextColor(139, 115, 85);
    doc.text(`95% CI: ${testResults.compositeCI.lower}–${testResults.compositeCI.upper}`, centerX, 91, { align: 'center' });
  }

  // Divider
  doc.setDrawColor(139, 115, 85);
  doc.setLineWidth(0.3);
  doc.line(30, 93, pageWidth - 30, 93);

  // Factor scores
  const factors = testResults.factorScores;
  const factorOrder = ['Gf', 'Gf-WM', 'Gf-WMC', 'Gc', 'Gwm', 'Gq', 'Gs'];
  const factorLabels = {
    'Gf': 'Fluid Reasoning',
    'Gf-WM': 'Gf (WM)',
    'Gf-WMC': 'Gf (WMC)',
    'Gc': 'Crystallized',
    'Gwm': 'Working Memory',
    'Gq': 'Quantitative',
    'Gs': 'Speed',
  };

  let startX = 25;
  const colWidth = (pageWidth - 50) / factorOrder.length;
  const barY = 105;

  doc.setFontSize(8);
  for (let i = 0; i < factorOrder.length; i++) {
    const key = factorOrder[i];
    const factor = factors[key];
    if (!factor) continue;
    const x = startX + i * colWidth + colWidth / 2;

    // Label
    doc.setTextColor(168, 155, 126);
    doc.setFont('helvetica', 'normal');
    doc.text(factorLabels[key], x, barY, { align: 'center' });

    // Score
    doc.setTextColor(232, 213, 160);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(String(factor.iq), x, barY + 10, { align: 'center' });
    doc.setFontSize(8);

    // Bar
    const barWidth = 20;
    const maxBarHeight = 25;
    const normalizedScore = Math.max(0, Math.min(1, (factor.iq - 40) / 120));
    const barHeight = normalizedScore * maxBarHeight;

    // Background bar
    doc.setFillColor(19, 25, 32); // --bg-secondary
    doc.roundedRect(x - barWidth / 2, barY + 14, barWidth, maxBarHeight, 1, 1, 'F');

    // Score bar — gold gradient
    const intensity = Math.round(normalizedScore * 125);
    doc.setFillColor(201, 168, Math.min(76 + intensity, 160));
    doc.roundedRect(x - barWidth / 2, barY + 14 + (maxBarHeight - barHeight), barWidth, barHeight, 1, 1, 'F');
  }

  // Footer info
  const footerY = barY + 48;

  doc.setDrawColor(139, 115, 85);
  doc.line(30, footerY - 3, pageWidth - 30, footerY - 3);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 96, 80); // --text-muted

  // Left: test info
  doc.text(`Test ID: ${testResults.testId}`, 30, footerY + 4);
  doc.text(`Date: ${testResults.date}`, 30, footerY + 10);
  doc.text(`Duration: ${testResults.duration}`, 30, footerY + 16);

  // Center: verification
  doc.setTextColor(201, 168, 76);
  doc.setFont('helvetica', 'bold');
  doc.text(`Verification: ${testResults.verificationCode}`, centerX, footerY + 4, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 96, 80);
  doc.text('Verify at structuramentis.org/verify', centerX, footerY + 10, { align: 'center' });

  // Right: methodology
  doc.text('IRT 2PL Scoring Model', pageWidth - 30, footerY + 4, { align: 'right' });
  doc.text('Cross-Structural Assessment', pageWidth - 30, footerY + 10, { align: 'right' });
  doc.text('structuramentis.org/methodology', pageWidth - 30, footerY + 16, { align: 'right' });

  // Disclaimer
  doc.setFontSize(6.5);
  doc.setTextColor(107, 96, 80);
  doc.text(
    'This assessment provides a structural estimate of cognitive ability. It is not a clinical diagnosis. For clinical evaluation, consult a licensed psychologist.',
    centerX,
    pageHeight - 14,
    { align: 'center' }
  );

  return doc;
}
