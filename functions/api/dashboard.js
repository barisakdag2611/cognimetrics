// Cloudflare Pages Function — simple analytics dashboard
// GET /api/dashboard?key=SM2026 — returns all tracking data

const DASHBOARD_KEY = 'SM2026structura';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (key !== DASHBOARD_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // List all keys
    const list = await env.TRACKING.list({ limit: 1000 });
    const results = {
      total_events: list.keys.length,
      sessions: {},
      events: [],
    };

    // Get session data
    const sessionKeys = list.keys.filter(k => k.name.startsWith('session_'));
    const eventKeys = list.keys.filter(k => !k.name.startsWith('session_') && !k.name.startsWith('result_'));

    for (const sk of sessionKeys) {
      const data = await env.TRACKING.get(sk.name);
      if (data) {
        const sessionId = sk.name.replace('session_', '');
        results.sessions[sessionId] = JSON.parse(data);
      }
    }

    // Get all events (was slice(-100), missing older events)
    for (const ek of eventKeys) {
      const data = await env.TRACKING.get(ek.name);
      if (data) {
        results.events.push(JSON.parse(data));
      }
    }

    // Get submitted test results (stored via /api/results)
    const resultKeys = list.keys.filter(k => k.name.startsWith('result_'));
    const testResults = [];
    for (const rk of resultKeys) {
      const data = await env.TRACKING.get(rk.name);
      if (data) testResults.push(JSON.parse(data));
    }
    testResults.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Summary stats
    const allEvents = results.events;
    results.summary = {
      total_sessions: Object.keys(results.sessions).length,
      total_events: eventKeys.length,
      test_starts: allEvents.filter(e => e.event === 'test_start').length,
      test_completes: allEvents.filter(e => e.event === 'test_complete').length,
      subtest_completes: allEvents.filter(e => e.event === 'subtest_complete').length,
      submitted_results: testResults.length,
      countries: [...new Set(allEvents.map(e => e.country))],
    };

    results.test_results = testResults;

    return new Response(JSON.stringify(results, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
