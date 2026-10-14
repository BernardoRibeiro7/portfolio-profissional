const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validateContact(body = {}) {
  const name = clean(body.name, 80);
  const email = clean(body.email, 140).toLowerCase();
  const message = clean(body.message, 3000);
  const website = clean(body.website, 200);

  if (website) return { ok: false, status: 200, error: 'Solicitação recebida.' };
  if (name.length < 2) return { ok: false, status: 400, error: 'Informe seu nome.' };
  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, error: 'Informe um e-mail válido.' };
  if (message.length < 10) return { ok: false, status: 400, error: 'A mensagem deve ter pelo menos 10 caracteres.' };

  return { ok: true, data: { name, email, message } };
}

async function sendContact(data) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'ribeiromachadobernardo@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Bernardo <onboarding@resend.dev>';

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      code: 'CONFIG_REQUIRED',
      error: 'Envio direto ainda não foi configurado. Use o fallback de e-mail.'
    };
  }

  const html = `
    <h2>Nova mensagem pelo portfólio</h2>
    <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Portfólio - mensagem de ${data.name}`,
      html
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('Resend error:', response.status, detail);
    return { ok: false, status: 502, error: 'Não foi possível enviar a mensagem agora.' };
  }

  return { ok: true, status: 200 };
}

module.exports = { validateContact, sendContact };
