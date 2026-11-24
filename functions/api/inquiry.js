const recipient = 'info@debutiques.com';
const limits = { name: 80, email: 120, company: 100, service: 80, brief: 1000, timing: 80 };
const reply = (status, sent = false) =>
  Response.json({ sent }, { status, headers: { 'Cache-Control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  if (request.headers.get('Origin') !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded')) return reply(415);
  const length = Number(request.headers.get('Content-Length'));
  if (!length || length > 16000) return reply(413);

  const form = new URLSearchParams(await request.text());
  if (form.get('bot-field')) return reply(400);
  const fields = {};
  for (const [key, max] of Object.entries(limits)) {
    fields[key] = (form.get(key) ?? '').trim();
    if (fields[key].length > max) return reply(400);
  }
  if (!fields.name || !fields.brief || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return reply(400);
  const {
    CF_EMAIL_TOKEN,
    CF_EMAIL_FROM = 'inquiries@forms.debutiques.com',
    CF_EMAIL_ACCOUNT_ID = 'b0c737922ad1baa3acc3701c54ca66e2',
  } = env;
  if (!CF_EMAIL_TOKEN || !CF_EMAIL_FROM || !/^[a-f0-9]{32}$/i.test(CF_EMAIL_ACCOUNT_ID ?? '')) return reply(503);

  try {
    const requestUrl = 'https://api.cloudflare.com/client/v4/accounts/' + CF_EMAIL_ACCOUNT_ID + '/email/sending/send';
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + CF_EMAIL_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CF_EMAIL_FROM,
        to: recipient,
        reply_to: fields.email,
        subject: 'New Debutiques website inquiry',
        text: [
          'Name: ' + fields.name, 'Email: ' + fields.email, 'Company: ' + fields.company,
          'Service: ' + fields.service, 'Timing: ' + fields.timing, '', fields.brief,
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(10000),
    });
    const outcome = await response.json();
    const accepted = outcome.result?.delivered?.includes(recipient) || outcome.result?.queued?.includes(recipient);
    if (response.ok && outcome.success === true && accepted) return reply(200, true);
  } catch {
    // Do not log visitor data or API credentials.
  }
  return reply(502);
}
