/*
 * Stripe webhook — conferma affidabile degli ordini.
 *
 * Su `checkout.session.completed`:
 *   1. registra l'ordine nei log di Vercel (sempre);
 *   2. invia via SMTP (IONOS) una email di conferma al CLIENTE
 *      e una notifica di pagamento al NEGOZIO, entrambe da info@ikaritokyo.it.
 *
 * A differenza del redirect a success.html, questo arriva SEMPRE quando il
 * pagamento va a buon fine, anche se il cliente chiude il browser.
 *
 * Email disattivate automaticamente finché SMTP_PASS non è configurata:
 * in quel caso l'ordine viene solo loggato.
 *
 * Richiede la verifica della firma sul body RAW: per questo disabilitiamo il
 * body parser di default di Vercel e leggiamo lo stream grezzo.
 */
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/* --- Config SMTP (IONOS) --- */
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.ionos.it';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || 'info@ikaritokyo.it';
const SMTP_PASS = process.env.SMTP_PASS; // password della casella — se assente, niente email
const MAIL_FROM = process.env.ORDER_EMAIL_FROM || 'IkariTokyo <info@ikaritokyo.it>';
const OWNER_TO  = process.env.ORDER_EMAIL_TO  || 'info@ikaritokyo.it';

/* Stripe verifica la firma sui byte esatti del body: niente parsing automatico. */
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

/* --- Brand --- */
const BRAND = {
  red: '#c41230',
  dark: '#0c0c0c',
  mid: '#666666',
  line: '#ececec',
  bg: '#f4f4f2',
  logo: 'https://www.ikaritokyo.it/assets/logo.png',
  site: 'https://www.ikaritokyo.it',
  serif: "'PT Serif', Georgia, 'Times New Roman', serif",
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Wrapper email comune (header logo + card bianca + footer), robusto sui client di posta. */
function emailShell(innerHtml, preheader) {
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"><title>IkariTokyo</title></head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BRAND.bg};font-size:1px;line-height:1px">${esc(preheader || '')}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${BRAND.line}">
      <tr><td style="background:#ffffff;padding:30px 0 24px;text-align:center">
        <img src="${BRAND.logo}" alt="IkariTokyo" height="48" style="height:48px;display:inline-block;border:0">
      </td></tr>
      <tr><td style="height:4px;background:${BRAND.red};font-size:0;line-height:0">&nbsp;</td></tr>
      <tr><td style="padding:36px 40px 40px 40px;font-family:${BRAND.sans};color:${BRAND.dark}">
        ${innerHtml}
      </td></tr>
    </table>
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%">
      <tr><td style="padding:22px 40px;text-align:center;font-family:${BRAND.sans};color:${BRAND.mid};font-size:12px;line-height:1.6">
        <strong style="color:${BRAND.dark}">IkariTokyo</strong> — Abbigliamento Anime Streetwear<br>
        <a href="${BRAND.site}" style="color:${BRAND.mid};text-decoration:underline">ikaritokyo.it</a> ·
        <a href="mailto:info@ikaritokyo.it" style="color:${BRAND.mid};text-decoration:underline">info@ikaritokyo.it</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function itemsTable(order, { showLine = true } = {}) {
  const rows = order.items.map((i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BRAND.line};font-size:15px">${esc(i.name)}<span style="color:${BRAND.mid}">  ×${i.qty}</span></td>
      <td style="padding:12px 0;border-bottom:1px solid ${BRAND.line};font-size:15px;text-align:right;white-space:nowrap">€${i.amount}</td>
    </tr>`).join('');
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:${showLine ? '1px solid ' + BRAND.line : 'none'}">
    ${rows}
    <tr>
      <td style="padding:16px 0 0;font-size:17px;font-weight:bold">Totale</td>
      <td style="padding:16px 0 0;font-size:17px;font-weight:bold;text-align:right;color:${BRAND.red}">€${order.total} ${order.currency}</td>
    </tr>
  </table>`;
}

function customerEmailHtml(order) {
  const greet = order.customerName ? `Ciao ${esc(order.customerName.split(' ')[0])},` : 'Ciao,';
  const inner = `
    <h1 style="font-family:${BRAND.serif};font-size:26px;line-height:1.2;margin:0 0 6px;font-weight:normal">Grazie per il tuo ordine</h1>
    <p style="color:${BRAND.mid};font-size:15px;line-height:1.6;margin:0 0 28px">${greet} abbiamo ricevuto il tuo pagamento e stiamo preparando il tuo pacco. Ecco il riepilogo:</p>
    ${itemsTable(order)}
    ${order.shipHtml ? `
    <p style="font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:${BRAND.mid};margin:32px 0 8px">Spedizione a</p>
    <p style="font-size:15px;line-height:1.6;margin:0">${order.shipHtml}</p>` : ''}
    <div style="margin:34px 0 30px"><a href="${BRAND.site}" style="display:inline-block;background:${BRAND.dark};color:#ffffff;text-decoration:none;font-size:14px;letter-spacing:.04em;text-transform:uppercase;padding:14px 28px">Continua lo shopping</a></div>
    <p style="color:${BRAND.mid};font-size:14px;line-height:1.7;margin:0;border-top:1px solid ${BRAND.line};padding-top:22px">
      Ti aggiorneremo via email quando il pacco sarà spedito. Per qualsiasi domanda rispondi pure a questa email o scrivici a <a href="mailto:info@ikaritokyo.it" style="color:${BRAND.red}">info@ikaritokyo.it</a>.<br><br>
      <span style="color:#aaa;font-size:12px">Ordine ${esc(order.id)}</span>
    </p>`;
  return emailShell(inner, `Grazie per il tuo ordine IkariTokyo — €${order.total} ${order.currency}`);
}

function ownerEmailHtml(order) {
  const inner = `
    <h1 style="font-family:${BRAND.serif};font-size:24px;margin:0 0 6px;font-weight:normal">Nuovo ordine</h1>
    <p style="font-size:28px;font-weight:bold;color:${BRAND.red};margin:0 0 24px">€${order.total} ${order.currency}</p>
    <p style="font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:${BRAND.mid};margin:0 0 6px">Cliente</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 22px">${esc(order.customerName) || '—'}<br><a href="mailto:${esc(order.customerEmail)}" style="color:${BRAND.red}">${esc(order.customerEmail) || 'no email'}</a></p>
    ${itemsTable(order)}
    <p style="font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:${BRAND.mid};margin:28px 0 6px">Spedizione</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px">${order.shipHtml || 'Non fornito'}</p>
    <p style="color:#aaa;font-size:12px;margin:0;border-top:1px solid ${BRAND.line};padding-top:18px">Stripe session: ${esc(order.id)}</p>`;
  return emailShell(inner, `Nuovo ordine €${order.total} — ${order.customerEmail || ''}`);
}

/* Versione testo (deliverability + client senza HTML) */
function orderText(order, forOwner) {
  const lines = order.items.map((i) => `  - ${i.qty}x ${i.name}  EUR ${i.amount}`).join('\n');
  const ship = (order.shipHtml || 'Non fornito').replace(/<br\s*\/?>/gi, ', ');
  if (forOwner) {
    return `Nuovo ordine IkariTokyo\n\nTotale: EUR ${order.total} ${order.currency}\nCliente: ${order.customerName || '-'} <${order.customerEmail || 'no email'}>\n\nArticoli:\n${lines}\n\nSpedizione: ${ship}\n\nStripe session: ${order.id}`;
  }
  return `Grazie per il tuo ordine IkariTokyo!\n\nAbbiamo ricevuto il tuo pagamento. Riepilogo:\n${lines}\n\nTotale: EUR ${order.total} ${order.currency}\nSpedizione a: ${ship}\n\nTi aggiorneremo quando il pacco sarà spedito.\nDomande? Scrivici a info@ikaritokyo.it\n\nOrdine ${order.id}\nikaritokyo.it`;
}

async function sendOrderEmails(order) {
  if (!SMTP_PASS) {
    console.log('[webhook] SMTP_PASS non impostata — ordine solo loggato, nessuna email');
    return;
  }
  let nodemailer;
  try {
    nodemailer = require('nodemailer');
  } catch (e) {
    console.error('[webhook] nodemailer non disponibile:', e.message);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // Notifica al negozio (sempre)
  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: OWNER_TO,
      subject: `🛒 Nuovo ordine — €${order.total} ${order.currency}`,
      html: ownerEmailHtml(order),
      text: orderText(order, true),
    });
    console.log('[webhook] Notifica negozio inviata a', OWNER_TO);
  } catch (err) {
    console.error('[webhook] Invio notifica negozio fallito:', err.message);
  }

  // Conferma al cliente (se abbiamo la sua email)
  if (order.customerEmail) {
    try {
      await transporter.sendMail({
        from: MAIL_FROM,
        to: order.customerEmail,
        subject: 'Conferma del tuo ordine IkariTokyo',
        html: customerEmailHtml(order),
        text: orderText(order, false),
      });
      console.log('[webhook] Conferma cliente inviata a', order.customerEmail);
    } catch (err) {
      console.error('[webhook] Invio conferma cliente fallito:', err.message);
    }
  }
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!ENDPOINT_SECRET) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET non configurata');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, sig, ENDPOINT_SECRET);
  } catch (err) {
    console.error('[webhook] Verifica firma fallita:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      const items = lineItems.data.map((li) => ({
        name: li.description,
        qty: li.quantity,
        amount: (li.amount_total / 100).toFixed(2),
      }));

      const details  = session.customer_details || {};
      const shipping = session.shipping_details
        || (session.collected_information && session.collected_information.shipping_details)
        || null;
      const addr = shipping && shipping.address;

      const order = {
        id: session.id,
        total: (session.amount_total / 100).toFixed(2),
        currency: (session.currency || 'eur').toUpperCase(),
        customerEmail: details.email || session.customer_email || '',
        customerName: (shipping && shipping.name) || details.name || '',
        items,
        shipHtml: addr
          ? [
              (shipping && shipping.name) || details.name || '',
              `${addr.line1 || ''}${addr.line2 ? ' ' + addr.line2 : ''}`,
              `${addr.postal_code || ''} ${addr.city || ''}`,
              `${addr.state || ''} ${addr.country || ''}`,
            ].filter((l) => l && l.trim()).join('<br>')
          : '',
      };

      /* Record durevole nei log Vercel (recuperabile con `vercel logs`) */
      console.log('[ORDER] ' + JSON.stringify({ ...order, shipHtml: undefined, shipping }));

      await sendOrderEmails(order);
    } catch (err) {
      /* Logghiamo ma rispondiamo 200: l'evento è valido, evitiamo retry infiniti per un errore interno. */
      console.error('[webhook] Errore elaborazione ordine:', err.message);
    }
  }

  res.status(200).json({ received: true });
};

handler.config = { api: { bodyParser: false } };

module.exports = handler;
module.exports.config = { api: { bodyParser: false } };
