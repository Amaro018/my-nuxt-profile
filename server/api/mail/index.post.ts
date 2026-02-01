import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';

import env from '../../lib/env';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, email, subject, message } = body;

  // Plain-text fallback
  const text = `
*** MESSAGE FROM YOUR PORTFOLIO ***
From: ${name} (${email})

${message}

*******************************
`;

  // Retro HTML version
  const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body style="margin:0;padding:24px;background:#0b1020;font-family: 'Courier New', Courier, monospace;color:#e6f0ff;">
    <div style="max-width:600px;margin:0 auto;background:#071028;border:6px solid #0f1724;border-radius:8px;padding:16px;box-shadow: 0 6px 0 #0b2140;">
      <!-- header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="font-family: 'Press Start 2P', monospace; font-size:12px; color:#ffd166; letter-spacing:1px;">
          ▶ JUN PROFILE — INCOMING MESSAGE
        </div>
        <div style="font-size:11px;color:#8fb0ff;">8-BIT MAIL</div>
      </div>

      <!-- message box -->
      <div style="background:linear-gradient(180deg,#071a3a,#03101f);border:3px solid #14243a;padding:12px;border-radius:4px;color:#dbeeff;">
        <div style="font-size:11px;color:#9fdcff;margin-bottom:8px;">
          <strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;
        </div>

        <pre style="white-space:pre-wrap;font-family: 'Courier New', Courier, monospace;font-size:13px;line-height:1.4;color:#e6f0ff;margin:0;padding:8px;background:#001022;border:2px solid #073049;border-radius:3px;">
${escapeHtml(message)}
        </pre>
      </div>

      <!-- footer / action -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;">
        <div style="font-size:11px;color:#8fb0ff">Received: ${new Date().toLocaleString()}</div>
      </div>

      <div style="margin-top:12px;font-size:10px;color:#7ea7ff;opacity:0.9">
        <span style="font-family:'Press Start 2P',monospace">★</span>
        This is an automated copy of the message sent via the contact form.
      </div>
    </div>
  </body>
</html>
`;

  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // configure transporter (example uses Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER, // your email
      pass: env.EMAIL_PASS, // your app password (not raw Gmail password)
    },
  });

  try {
    // use in transporter.sendMail:
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: env.EMAIL_USER,
      subject: subject || 'No Subject',
      text,
      html,
    });

    return { success: true, message: 'Email sent successfully!' };
  }
  catch (error: any) {
    console.error(error);
    return { success: false, message: 'Failed to send email.' };
  }
});
