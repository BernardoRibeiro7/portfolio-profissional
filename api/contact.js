const { validateContact, sendContact } = require('../lib/contact');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  const validation = validateContact(req.body || {});
  if (!validation.ok) {
    return res.status(validation.status).json({
      ok: false,
      error: validation.error,
      silent: validation.status === 200
    });
  }

  try {
    const result = await sendContact(validation.data);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: 'Erro interno ao enviar a mensagem.' });
  }
};
