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

  // Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border
  doc.setDrawColor(99, 102, 241); // indigo-500
  doc.setLineWidth(1.5);
  doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 3, 3, 'S');

  // Inner border
  doc.setDrawColor(55, 65, 81); // gray-700
  doc.setLineWidth(0.5);
  doc.roundedRect(12, 12, pageWidth - 24, pageHeight - 24, 2, 2, 'S');

  // Header accent line
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(0.8);
  doc.line(40, 35, pageWidth - 40, 35);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text('COGNIMETRICS', centerX, 28, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Structural Cognitive Assessment — Certificate of Completion', centerX, 42, { align: 'center' });

  // Main score
  doc.setFontSize(14);
  doc.setTextColor(199, 210, 254); // indigo-200
  doc.text('Composite Cognitive Index (CCI)', centerX, 58, { align: 'center' });

  doc.setFontSize(52);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(129, 140, 248); // indigo-400
  doc.text(String(testResults.compositeIQ), centerX, 78, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(148, 163, 184);
  const classification = iqClassification(testResults.compositeIQ);
  const percentile = iqToPercentile(testResults.compositeIQ);
  doc.text(`${classification} | ${percentile}th Percentile`, centerX, 87, { align: 'center' });

  // Divider
  doc.setDrawColor(55, 65, 81);
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
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.text(factorLabels[key], x, barY, { align: 'center' });

    // Score
    doc.setTextColor(199, 210, 254);
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
    doc.setFillColor(30, 41, 59); // slate-800
    doc.roundedRect(x - barWidth / 2, barY + 14, barWidth, maxBarHeight, 1, 1, 'F');

    // Score bar
    const intensity = Math.round(normalizedScore * 255);
    doc.setFillColor(99, 102, Math.min(241, 100 + intensity));
    doc.roundedRect(x - barWidth / 2, barY + 14 + (maxBarHeight - barHeight), barWidth, barHeight, 1, 1, 'F');
  }

  // Footer info
  const footerY = barY + 48;

  doc.setDrawColor(55, 65, 81);
  doc.line(30, footerY - 3, pageWidth - 30, footerY - 3);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139); // slate-500

  // Left: test info
  doc.text(`Test ID: ${testResults.testId}`, 30, footerY + 4);
  doc.text(`Date: ${testResults.date}`, 30, footerY + 10);
  doc.text(`Duration: ${testResults.duration}`, 30, footerY + 16);

  // Center: verification
  doc.setTextColor(129, 140, 248);
  doc.setFont('helvetica', 'bold');
  doc.text(`Verification: ${testResults.verificationCode}`, centerX, footerY + 4, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Verify at cognimetrics.app/verify', centerX, footerY + 10, { align: 'center' });

  // Right: methodology
  doc.text('IRT 2PL Scoring Model', pageWidth - 30, footerY + 4, { align: 'right' });
  doc.text('Cross-Structural Assessment', pageWidth - 30, footerY + 10, { align: 'right' });
  doc.text('cognimetrics.app/methodology', pageWidth - 30, footerY + 16, { align: 'right' });

  // Disclaimer
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'This assessment provides a structural estimate of cognitive ability. It is not a clinical diagnosis. For clinical evaluation, consult a licensed psychologist.',
    centerX,
    pageHeight - 14,
    { align: 'center' }
  );

  return doc;
}
