/* ── CHECKOUT PAGE ──────────────────────────────────────── */

const cart = JSON.parse(localStorage.getItem('ikari-cart') || '[]');

const ckItems     = document.getElementById('ckItems');
const ckSubtotal  = document.getElementById('ckSubtotal');
const ckShipping  = document.getElementById('ckShipping');
const ckTotal     = document.getElementById('ckTotal');
const mobileTotal = document.getElementById('summaryMobileTotal');

const SHIPPING_RATES = { standard: 5.90, express: 12.90 };
let shippingCost = 5.90;

/* ── RENDER ITEMS ───────────────────────────────────────── */
function renderItems() {
  if (!cart.length) {
    ckItems.innerHTML = '<p style="font-size:13px;color:#888;padding:20px 0">Il carrello è vuoto.</p>';
    return;
  }

  ckItems.innerHTML = cart.map(item => `
    <div class="ck-sum-item">
      <div class="ck-sum-img">
        <img src="${item.img || ''}" alt="${item.name}">
        <span class="ck-sum-qty">${item.qty}</span>
      </div>
      <div class="ck-sum-info">
        <p class="ck-sum-name">${item.name}</p>
        <p class="ck-sum-meta">Taglia: ${item.size}</p>
      </div>
      <span class="ck-sum-price">€${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');
}

/* ── TOTALS ─────────────────────────────────────────────── */
function updateTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total    = subtotal + shippingCost;

  ckSubtotal.textContent  = `€${subtotal.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
  ckShipping.textContent  = `€${shippingCost.toFixed(2).replace('.', ',')}`;
  ckTotal.textContent     = `€${total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
  if (mobileTotal) mobileTotal.textContent = `€${total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
}

/* ── SHIPPING TOGGLE ────────────────────────────────────── */
document.querySelectorAll('.ck-shipping-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.ck-shipping-option').forEach(o => o.classList.remove('is-selected'));
    opt.classList.add('is-selected');
    const val = opt.querySelector('input')?.value || 'standard';
    shippingCost = SHIPPING_RATES[val] ?? 5.90;
    updateTotals();
  });
});

/* ── MOBILE SUMMARY TOGGLE ──────────────────────────────── */
const summaryToggle = document.getElementById('summaryToggle');
const summaryBody   = document.getElementById('summaryBody');
if (summaryToggle && summaryBody) {
  summaryToggle.addEventListener('click', () => {
    const open = summaryBody.classList.toggle('is-open');
    summaryToggle.querySelector('.ck-toggle-arrow')?.classList.toggle('is-open', open);
    const label = summaryToggle.querySelector('span');
    if (label) label.textContent = open ? 'Nascondi riepilogo ordine' : 'Mostra riepilogo ordine';
  });
}

/* ── DISCOUNT ───────────────────────────────────────────── */
document.getElementById('discountApply')?.addEventListener('click', () => {
  const code = document.getElementById('discountInput')?.value.trim().toUpperCase();
  if (!code) return;
  alert(`Codice "${code}" non valido o già utilizzato.`);
});

/* ── CARD NUMBER FORMAT ─────────────────────────────────── */
document.getElementById('cardNumber')?.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 16);
  e.target.value = v.match(/.{1,4}/g)?.join(' ') || v;
});

/* ── CHECKOUT REDIRECT ──────────────────────────────────── */
async function startCheckout(btn, loadingLabel) {
  if (!cart.length) {
    alert('Il carrello è vuoto.');
    return;
  }
  const email = document.querySelector('input[type="email"]')?.value.trim() || '';
  const originalHTML = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.textContent = loadingLabel;
  }
  try {
    const res  = await fetch('/api/create-checkout-session', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ items: cart, email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Errore del server');
    window.location.href = data.url;
  } catch (err) {
    alert('Errore durante il pagamento: ' + err.message);
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHTML;
    }
  }
}

document.getElementById('ckSubmit')?.addEventListener('click', e => {
  startCheckout(e.currentTarget, 'Reindirizzamento...');
});

/* Express buttons (Apple Pay / Google Pay / PayPal) → Stripe Checkout */
document.querySelectorAll('.ck-express-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    startCheckout(e.currentTarget, '...');
  });
});

/* ── INIT ───────────────────────────────────────────────── */
renderItems();
updateTotals();
