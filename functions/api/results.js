// Cloudflare Pages Function — store & retrieve test results
// POST /api/results — save completed test results
// GET  /api/results?key=SM2026structura — list all results

const DASHBOARD_KEY = 'SM2026structura';

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await request.json();
    const { compositeIQ, factorScores, subtestScores, testId, date, duration, verificationCode, lang } = data;

    if (!compositeIQ || !testId) {
      return new Response(JSON.stringify({ error: 'missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const timestamp = new Date().toISOString();
    const key = `result_${timestamp}_${testId}`;

    const record = {
      compositeIQ,
      factorScores,
      subtestScores,
      testId,
      date,
      duration,
      verificationCode,
      lang,
      timestamp,
      ip: request.headers.get('CF-Connecting-IP') || 'unknown',
      country: request.headers.get('CF-IPCountry') || 'unknown',
      userAgent: request.headers.get('User-Agent') || 'unknown',
    };

    // Store permanently (no TTL — we want these forever)
    await env.TRACKING.put(key, JSON.stringify(record));

    return new Response(JSON.stringify({ ok: true, key }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (key !== DASHBOARD_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const list = await env.TRACKING.list({ prefix: 'result_', limit: 1000 });
    const results = [];

    for (const k of list.keys) {
      const data = await env.TRACKING.get(k.name);
      if (data) results.push(JSON.parse(data));
    }

    // Sort by timestamp descending
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return new Response(JSON.stringify({
      total: results.length,
      results,
    }, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
