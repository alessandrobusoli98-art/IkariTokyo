const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { items, email, skipShipping } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrello vuoto' });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: `Taglia: ${item.size}`,
          ...(item.img ? { images: [item.img.startsWith('http') ? item.img : `${origin}/${item.img}`] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      ...(email ? { customer_email: email } : {}),
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout.html`,
      // La spedizione è inclusa di default; `skipShipping: true` la omette (es. test).
      ...(skipShipping ? {} : {
        shipping_address_collection: {
          allowed_countries: ['IT', 'FR', 'DE', 'ES', 'GB', 'US', 'JP'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 590, currency: 'eur' },
              display_name: 'Spedizione Standard',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 8 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 1290, currency: 'eur' },
              display_name: 'Spedizione Express',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 2 },
                maximum: { unit: 'business_day', value: 3 },
              },
            },
          },
        ],
      }),
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
