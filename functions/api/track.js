// Cloudflare Pages Function — tracking endpoint
// POST /api/track — stores test events in KV

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await request.json();
    const { event, sessionId, payload } = data;

    if (!event || !sessionId) {
      return new Response(JSON.stringify({ error: 'missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const timestamp = new Date().toISOString();
    const key = `${timestamp}_${sessionId}_${event}`;

    const record = {
      event,
      sessionId,
      timestamp,
      ip: request.headers.get('CF-Connecting-IP') || 'unknown',
      country: request.headers.get('CF-IPCountry') || 'unknown',
      userAgent: request.headers.get('User-Agent') || 'unknown',
      ...payload,
    };

    // Store in KV — expires after 90 days
    await env.TRACKING.put(key, JSON.stringify(record), {
      expirationTtl: 90 * 24 * 60 * 60,
    });

    // Also maintain a session index for easy lookup
    const sessionKey = `session_${sessionId}`;
    let sessionEvents = [];
    try {
      const existing = await env.TRACKING.get(sessionKey);
      if (existing) sessionEvents = JSON.parse(existing);
    } catch (e) {}
    sessionEvents.push({ event, timestamp, key });
    await env.TRACKING.put(sessionKey, JSON.stringify(sessionEvents), {
      expirationTtl: 90 * 24 * 60 * 60,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
