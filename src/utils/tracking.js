// Lightweight tracking — sends events to /api/track
// Fires and forgets, never blocks the UI

const SESSION_ID = generateSessionId();

function generateSessionId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `${ts}-${rand}`;
}

function send(event, payload = {}) {
  try {
    const body = JSON.stringify({ event, sessionId: SESSION_ID, payload });
    // Always use fetch with proper Content-Type (sendBeacon sends text/plain which can fail)
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    // Never throw — tracking must not break the test
  }
}

export function trackTestStart(lang) {
  send('test_start', { lang });
}

export function trackSubtestStart(subtestId, lang) {
  send('subtest_start', { subtestId, lang });
}

export function trackSubtestComplete(subtestId, result) {
  send('subtest_complete', {
    subtestId,
    iq: result.iq,
    theta: result.theta,
    correct: result.correct,
    total: result.total,
    percentage: result.percentage,
  });
}

export function trackTestComplete(results) {
  send('test_complete', {
    compositeIQ: results.compositeIQ,
    factorScores: Object.fromEntries(
      Object.entries(results.factorScores).map(([k, v]) => [k, v.iq])
    ),
    subtestScores: Object.fromEntries(
      Object.entries(results.subtestScores).map(([k, v]) => [k, { iq: v.iq, correct: v.correct, total: v.total }])
    ),
    duration: results.duration,
    lang: results.lang,
  });
}

export function trackTestQuit(currentSubtest, completedSubtests) {
  send('test_quit', {
    quitAt: currentSubtest,
    completedSubtests,
  });
}

export function trackPageView(page) {
  send('page_view', { page });
}
