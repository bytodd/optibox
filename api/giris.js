module.exports = function handler(req, res) {
  // Sadece POST isteklerine izin ver
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, mesaj: 'Geçersiz istek.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { rol, sifre } = body;

  // Şifreler Vercel'in gizli ayarlarından (Environment Variables) okunur
  const adminSifre = process.env.ADMIN_SIFRE;
  const editorSifre = process.env.EDITOR_SIFRE;

  if (!adminSifre || !editorSifre) {
    return res.status(500).json({ ok: false, mesaj: 'Sunucu şifre ayarları eksik.' });
  }

  if (rol === 'admin' && sifre === adminSifre) {
    return res.status(200).json({ ok: true, rol: 'admin' });
  }

  if (rol === 'editor' && sifre === editorSifre) {
    return res.status(200).json({ ok: true, rol: 'editor' });
  }

  return res.status(401).json({ ok: false, mesaj: 'Şifre hatalı.' });
};
