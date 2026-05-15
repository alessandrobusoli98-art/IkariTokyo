/* ── CART PAGE ───────────────────────────────────────────── */

let cart = JSON.parse(localStorage.getItem('ikari-cart') || '[]');

const $ = id => document.getElementById(id);

const itemsEl     = $('cartPageItems');
const contentEl   = $('cartPageContent');
const emptyEl     = $('cartEmptyState');
const subtotalEl  = $('cartSubtotal');
const totalEl     = $('cartTotal');
const countNavEl  = $('cartCount');
const countPageEl = $('cartPageCount');
const checkoutBtn = $('cartCheckoutBtn');
const toast       = $('toast');

/* ── THEME ───────────────────────────────────────────────── */
(function initTheme() {
  if (localStorage.getItem('ikari-theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
  $('themeToggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('ikari-theme', isDark ? 'dark' : 'light');
  });
})();

/* ── TOAST ───────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
}

/* ── PERSIST ─────────────────────────────────────────────── */
function saveCart() {
  localStorage.setItem('ikari-cart', JSON.stringify(cart));
}

/* ── RENDER ─────────────────────────────────────────────── */
function render() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  countNavEl.textContent = count;

  if (!cart.length) {
    contentEl.style.display = 'none';
    emptyEl.style.display = 'block';
    countPageEl.textContent = '';
    return;
  }

  contentEl.style.display = 'grid';
  emptyEl.style.display = 'none';
  countPageEl.textContent = `${count} ${count === 1 ? 'articolo' : 'articoli'}`;

  itemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-page-item" data-idx="${idx}">
      <div class="cart-page-item-img">
        <img src="${item.img || ''}" alt="${item.name}">
      </div>
      <div class="cart-page-item-info">
        <p class="cart-page-item-name">${item.name}</p>
        <p class="cart-page-item-meta">Taglia: ${item.size}</p>
        <p class="cart-page-item-price-mobile">€${(item.price * item.qty).toLocaleString('it-IT')}</p>
        <div class="cart-page-item-actions">
          <div class="cart-qty-control">
            <button class="cart-qty-btn" data-act="dec" aria-label="Diminuisci">−</button>
            <span class="cart-qty-value">${item.qty}</span>
            <button class="cart-qty-btn" data-act="inc" aria-label="Aumenta">+</button>
          </div>
          <button class="cart-page-item-remove" data-act="rm">Rimuovi</button>
        </div>
      </div>
      <p class="cart-page-item-price">€${(item.price * item.qty).toLocaleString('it-IT')}</p>
    </div>
  `).join('');

  /* attach handlers */
  itemsEl.querySelectorAll('.cart-page-item').forEach(row => {
    const idx = Number(row.dataset.idx);
    row.querySelector('[data-act="inc"]').addEventListener('click', () => updateQty(idx, +1));
    row.querySelector('[data-act="dec"]').addEventListener('click', () => updateQty(idx, -1));
    row.querySelector('[data-act="rm"]').addEventListener('click', () => removeItem(idx));
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  subtotalEl.textContent = `€${subtotal.toLocaleString('it-IT')}`;
  totalEl.textContent    = `€${subtotal.toLocaleString('it-IT')}`;
}

function updateQty(idx, delta) {
  const item = cart[idx];
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  render();
}

function removeItem(idx) {
  const item = cart[idx];
  cart.splice(idx, 1);
  saveCart();
  render();
  if (item) showToast(`${item.name.toUpperCase()} rimosso`);
}

/* ── CHECKOUT ───────────────────────────────────────────── */
checkoutBtn?.addEventListener('click', async () => {
  if (!cart.length) return;
  const original = checkoutBtn.textContent;
  checkoutBtn.disabled = true;
  checkoutBtn.textContent = 'REINDIRIZZAMENTO...';
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Errore del server');
    window.location.href = data.url;
  } catch (err) {
    alert('Errore durante il pagamento: ' + err.message);
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = original;
  }
});

/* ── INIT ───────────────────────────────────────────────── */
render();
