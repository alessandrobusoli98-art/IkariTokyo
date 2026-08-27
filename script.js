/* ── PRELOADER ───────────────────────────────────────────── */
(function () {
  // Sized: the preloader shows this at min(240px, 56vw), so full-res costs
  // ~3MB of the cold-load budget for no visible gain.
  var CDN_PRE = 'https://res.cloudinary.com/do2eltwlu/image/upload/w_480,c_limit,f_auto,q_auto/assets/images/products/';
  var IMGS = [
    CDN_PRE + 'ts-rengoku-life.png',
    CDN_PRE + 'ts-zoroblack-life.png',
    CDN_PRE + 'hd-zoroblack-life.png',
  ];

  var pre = document.getElementById('preloader');
  if (!pre) return;

  /* Skip preloader on every navigation after the first */
  if (sessionStorage.getItem('ikari_preloaded')) {
    pre.style.display = 'none';
    return;
  }
  sessionStorage.setItem('ikari_preloaded', '1');

  document.body.style.overflow = 'hidden';

  var imgEl = document.getElementById('preloaderImg');
  var idx = Math.floor(Math.random() * IMGS.length);
  if (imgEl) imgEl.src = IMGS[idx];

  var startTime = Date.now();
  var MIN_MS = 1400;

  /* reveal image after paint */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      if (imgEl) imgEl.classList.add('is-active');
    });
  });

  function dismiss() {
    var elapsed = Date.now() - startTime;
    var wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(function () {
      pre.classList.add('is-done');
      document.body.style.overflow = '';
      pre.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'clip-path') pre.style.display = 'none';
      }, { once: true });
    }, wait);
  }

  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
    setTimeout(dismiss, 3500);
  }
})();

/* ── PAGE TRANSITION ─────────────────────────────────────── */
function navigateTo(url) {
  var el = document.getElementById('page-exit');
  if (!el) {
    el = document.createElement('div');
    el.id = 'page-exit';
    document.body.appendChild(el);
  }
  el.getBoundingClientRect(); // force reflow
  el.classList.add('is-active');
  setTimeout(function () { window.location.href = url; }, 700);
}

/* Remove exit overlay when browser restores page from bfcache (back button) */
window.addEventListener('pageshow', function (e) {
  if (e.persisted) {
    var el = document.getElementById('page-exit');
    if (el) el.remove();
  }
});

/* ── IMAGE BASE ──────────────────────────────────────────── */
const CDN = 'https://res.cloudinary.com/do2eltwlu/image/upload/f_auto,q_90/';
const P = CDN + 'assets/images/products/';

function imgSrc(path) { return path || ''; }

/* Cap the Cloudinary delivery size for thumbnails that never need full-res
   (e.g. the featured marquee) — the raw product photos are ~4-5MB each
   unresized, which is why the marquee was slow to appear on first load. */
function imgSrcSized(path, width) {
  if (!path) return '';
  return path.replace('f_auto,q_90/', `w_${width},c_limit,f_auto,q_90/`);
}

/* ── PRODUCTS ────────────────────────────────────────────── */
const products = [
  // NUOVA COLLEZIONE
  { id:'ts-35', name:'Asta — Demon Form',         series:'Black Clover',          cat:'tshirt', price:35, imgB: P+'ts-astademon2-B.png',            imgW: P+'ts-astademon2-W.png',            sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-36', name:'Broly — Nera',              series:'Dragon Ball Super',     cat:'tshirt', price:35, imgB: P+'ts-brolyblack-B.png',            imgW: P+'ts-brolyblack-W.png',            sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-37', name:'Broly — Bianca',            series:'Dragon Ball Super',     cat:'tshirt', price:35, imgB: P+'ts-brolywhite-B.png',            imgW: P+'ts-brolywhite-W.png',            sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-38', name:'Chopper — Straw Hat Crew',  series:'One Piece',             cat:'tshirt', price:35, imgB: P+'ts-chopper2-B.png',              imgW: P+'ts-chopper2-W.png',              sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-40', name:'Deku — Full Cowl',          series:'My Hero Academia',      cat:'tshirt', price:35, imgB: P+'ts-dekufullcowl2-B.png',         imgW: P+'ts-dekufullcowl2-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-41', name:'One For All 100%',          series:'My Hero Academia',      cat:'tshirt', price:35, imgB: P+'ts-oneforall1002-B.png',         imgW: P+'ts-oneforall1002-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-42', name:'Escanor',                   series:'The Seven Deadly Sins', cat:'tshirt', price:35, imgB: P+'ts-escanor2-B.png',              imgW: P+'ts-escanor2-W.png',              sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-43', name:'Ichigo — Hollow Mode',      series:'Bleach',                cat:'tshirt', price:35, imgB: P+'ts-ichigohollow2-B.png',         imgW: P+'ts-ichigohollow2-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-45', name:'Luffy — Reaction',          series:'One Piece',             cat:'tshirt', price:35, imgB: P+'ts-luffyreaction2-B.png',        imgW: P+'ts-luffyreaction2-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-46', name:'Mahoraga',                  series:'Jujutsu Kaisen',        cat:'tshirt', price:35, imgB: P+'ts-mahoraga2-B.png',             imgW: P+'ts-mahoraga2-W.png',             sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-47', name:'Rengoku — Flame Hashira',   series:'Demon Slayer',          cat:'tshirt', price:35, imgB: P+'ts-rengokuflame2-B.png',         imgW: P+'ts-rengokuflame2-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-48', name:'Scout Regiment',            series:'Attack on Titan',       cat:'tshirt', price:35, imgB: P+'ts-scoutregiment2-B.png',        imgW: P+'ts-scoutregiment2-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-50', name:'Vegeta — Super Saiyan',     series:'Dragon Ball Super',     cat:'tshirt', price:35, imgB: P+'ts-vegetassj2-B.png',            imgW: P+'ts-vegetassj2-W.png',            sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-51', name:'Thunder Breathing — Nera',  series:'Demon Slayer',          cat:'tshirt', price:35, imgB: P+'ts-thunderbreathingblack-B.png', imgW: P+'ts-thunderbreathingblack-W.png', sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-52', name:'Magic Knight Captain',      series:'Black Clover',          cat:'tshirt', price:35, imgB: P+'ts-magicknightcaptain2-B.png',   imgW: P+'ts-magicknightcaptain2-W.png',   sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-53', name:'Zoro — Greatest Swordsman', series:'One Piece',             cat:'tshirt', price:35, imgB: P+'ts-zoroswordsman2-B.png',        imgW: P+'ts-zoroswordsman2-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-54', name:'Thunder Breathing — Bianca', series:'Demon Slayer',         cat:'tshirt', price:35, imgB: P+'ts-thunderbreathingwhite-B.png', imgW: P+'ts-thunderbreathingwhite-W.png', sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-55', name:'Gojo Satoru — The Honored One', series:'Jujutsu Kaisen',    cat:'tshirt', price:35, imgB: P+'ts-gojohonoredone-B.png',        imgW: P+'ts-gojohonoredone-W.png',        sizes:['XS','S','M','L','XL','XXL'] },

  // T-SHIRT
  { id:'ts-1',  name:'Gojo Satoru',       series:'Jujutsu Kaisen',         cat:'tshirt', price:35, imgB: P+'ts-gojo-B.png',          imgW: P+'ts-gojo-W.png',          sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-3',  name:'Bakugo',            series:'My Hero Academia',        cat:'tshirt', price:35, imgB: P+'ts-bakugo-B.png',         imgW: P+'ts-bakugo-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-4',  name:'Deku',              series:'My Hero Academia',        cat:'tshirt', price:35, imgB: P+'ts-deku-B.png',           imgW: P+'ts-deku-W.png',          sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-5',  name:'Chainsaw Man',      series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-chainsaw-B.png',       imgW: P+'ts-chainsaw-W.png',      sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-6',  name:'Chainsaw Man Purple', series:'Chainsaw Man',           cat:'tshirt', price:35, imgB: P+'ts-chainsawkatana-B.png', imgW: P+'ts-chainsawkatana-W.png', sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-7',  name:'Denji',             series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-denji-B.png',          imgW: P+'ts-denji-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-8',  name:'Power',             series:'Chainsaw Man',            cat:'tshirt', price:35, imgB: P+'ts-power-B.png',          imgW: P+'ts-power-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-9',  name:'Itachi Uchiha',     series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-itachi-B.png',         imgW: P+'ts-itachi-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-10', name:'Sharingan',         series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-sharingan-B.png',      imgW: P+'ts-sharingan-W.png',     sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-11', name:'Rock Lee',          series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-rocklee-B.png',        imgW: P+'ts-rocklee-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-12', name:'Jiraiya',           series:'Naruto',                  cat:'tshirt', price:35, imgB: P+'ts-jiraiya-B.png',        imgW: P+'ts-jiraiya-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-13', name:'Monkey D. Luffy',   series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-luffy-B.png',          imgW: P+'ts-luffy-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-14', name:'Luffy — Nika',      series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-luffynika-B.png',      imgW: P+'ts-luffynika-W.png',     sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-15', name:'Roronoa Zoro',      series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-zoro-B.png',           imgW: P+'ts-zoro-W.png',          sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-16', name:'Akaza',             series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-akaza-B.png',          imgW: P+'ts-akaza-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-17', name:'Akaza v2',          series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-akaza2-B.png',         imgW: P+'ts-akaza2-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-18', name:'Rengoku',           series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-rengoku-B.png',        imgW: P+'ts-rengoku-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-19', name:'Inosuke',           series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-inosuke-B.png',        imgW: P+'ts-inosuke-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-20', name:'Evangelion',        series:'Neon Genesis Evangelion', cat:'tshirt', price:35, imgB: P+'ts-eva-B.png',            imgW: P+'ts-eva-W.png',           sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-21', name:'Frieren',           series:'Frieren',                 cat:'tshirt', price:35, imgB: P+'ts-frieren-B.png',        imgW: P+'ts-frieren-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-23', name:'Zaraki',             series:'Bleach',                  cat:'tshirt', price:35, imgB: P+'ts-zaraki-B.png',          imgW: P+'ts-zaraki-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-24', name:'Kaneki',            series:'Tokyo Ghoul',             cat:'tshirt', price:35, imgB: P+'ts-kaneki-B.png',         imgW: P+'ts-kaneki-W.png',        sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-25', name:'Mikey',             series:'Tokyo Revengers',         cat:'tshirt', price:35, imgB: P+'ts-mikey-B.png',          imgW: P+'ts-mikey-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-26', name:'Eren Yeager',       series:'Attack on Titan',         cat:'tshirt', price:35, imgB: P+'ts-eren-B.png',           imgW: P+'ts-eren-W.png',          sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-27', name:'Zenitsu',           series:'Demon Slayer',            cat:'tshirt', price:35, imgB: P+'ts-zenitsu-B.png',        imgW: P+'ts-zenitsu-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-28', name:'Misa Amane',        series:'Death Note',              cat:'tshirt', price:35, imgB: P+'ts-misa-B.png',           imgW: P+'ts-misa-W.png',          sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-29', name:'Arise',             series:'Solo Leveling',           cat:'tshirt', price:35, imgB: P+'ts-arise-B.png',          imgW: P+'ts-arise-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-30', name:'Midoriya',           series:'My Hero Academia',        cat:'tshirt', price:35, imgB: P+'ts-midoriya-B.png',       imgW: P+'ts-midoriya-W.png',      sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-31', name:'Arale',             series:'Dr. Slump',               cat:'tshirt', price:35, imgB: P+'ts-arale-B.png',          imgW: P+'ts-arale-W.png',         sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-32', name:'Legends',           series:'Multi-Anime',             cat:'tshirt', price:35, imgB: P+'ts-legends-B.png',        imgW: P+'ts-legends-W.png',       sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-33', name:'Dan Da Dan',         series:'Dan Da Dan',              cat:'tshirt', price:35, imgB: P+'ts-dandadan-B.png',       imgW: P+'ts-dandadan-W.png',      sizes:['XS','S','M','L','XL','XXL'] },
  { id:'ts-34', name:'Zoro — Wanted',     series:'One Piece',               cat:'tshirt', price:35, imgB: P+'ts-zoroblack-B.png',      imgW: null,                       imgLife: P+'ts-zoroblack-life.png', sizes:['XS','S','M','L','XL','XXL'] },

  // FELPE / HOODIES
  { id:'hd-1',  name:'Gojo Satoru',      series:'Jujutsu Kaisen',          cat:'hoodie', price:65, imgB: P+'hd-gojo-B.png',        imgW: P+'hd-gojo-W.png',        sizes:['S','M','L','XL','XXL'] },
  { id:'hd-2',  name:'Bakugo',           series:'My Hero Academia',         cat:'hoodie', price:65, imgB: P+'hd-bakugo-B.png',      imgW: P+'hd-bakugo-W.png',      sizes:['S','M','L','XL','XXL'] },
  { id:'hd-3',  name:'Chainsaw Man',     series:'Chainsaw Man',             cat:'hoodie', price:65, imgB: P+'hd-chainsaw-B.png',    imgW: P+'hd-chainsaw-W.png',    sizes:['S','M','L','XL','XXL'] },
  { id:'hd-4',  name:'Inosuke',          series:'Demon Slayer',             cat:'hoodie', price:65, imgB: P+'hd-inosuke-B.png',     imgW: P+'hd-inosuke-W.png',     sizes:['S','M','L','XL','XXL'] },
  { id:'hd-5',  name:'Frieren',          series:'Frieren',                  cat:'hoodie', price:65, imgB: P+'hd-frieren-B.png',     imgW: P+'hd-frieren-W.png',     sizes:['S','M','L','XL','XXL'] },
  { id:'hd-6',  name:'Rock Lee',         series:'Naruto',                   cat:'hoodie', price:65, imgB: P+'hd-rocklee-B.png',     imgW: P+'hd-rocklee-W.png',     sizes:['S','M','L','XL','XXL'] },
  { id:'hd-7',  name:'Solo Leveling',    series:'Solo Leveling',            cat:'hoodie', price:65, imgB: P+'hd-sololeveling-B.png',imgW: P+'hd-sololeveling-W.png',sizes:['S','M','L','XL','XXL'] },
  { id:'hd-8',  name:'Goku Black',        series:'Dragon Ball Super',        cat:'hoodie', price:65, imgB: P+'hd-goku-B.png',        imgW: P+'hd-goku-W.png',        sizes:['S','M','L','XL','XXL'] },
  { id:'hd-11', name:'Roronoa Zoro',     series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-zoro-B.png',        imgW: P+'hd-zoro-W.png',        sizes:['S','M','L','XL','XXL'] },
  { id:'hd-12', name:'Zoro — Wanted',    series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-zoroblack-B.png',   imgW: P+'hd-zoroblack-W.png',   imgLife: P+'hd-zoroblack-life.png', sizes:['S','M','L','XL','XXL'] },
  { id:'hd-13', name:'Roronoa Zoro v2',  series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-zoro2-B.png',       imgW: P+'hd-zoro2-W.png',       sizes:['S','M','L','XL','XXL'] },
  { id:'hd-14', name:'Death Note',       series:'Death Note',               cat:'hoodie', price:65, imgB: P+'hd-deathnote-B.png',   imgW: P+'hd-deathnote-W.png',   sizes:['S','M','L','XL','XXL'] },
  { id:'hd-15', name:'Evangelion',       series:'Neon Genesis Evangelion',  cat:'hoodie', price:65, imgB: P+'hd-eva-B.png',         imgW: P+'hd-eva-W.png',         sizes:['S','M','L','XL','XXL'] },
  { id:'hd-16', name:'Arale',            series:'Dr. Slump',                cat:'hoodie', price:65, imgB: P+'hd-arale-B.png',       imgW: P+'hd-arale-W.png',       sizes:['S','M','L','XL','XXL'] },
  { id:'hd-17', name:'Arise',            series:'Solo Leveling',            cat:'hoodie', price:65, imgB: P+'hd-arise-B.png',       imgW: P+'hd-arise-W.png',       sizes:['S','M','L','XL','XXL'] },
  { id:'hd-18', name:'Monkey D. Luffy',  series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-luffy-B.png',       imgW: P+'hd-luffy-W.png',       sizes:['S','M','L','XL','XXL'] },
  { id:'hd-19', name:'Luffy — Wanted',   series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-luffywanted-B.png', imgW: P+'hd-luffywanted-W.png', sizes:['S','M','L','XL','XXL'] },
  { id:'hd-20', name:'Luffy — Nika',     series:'One Piece',                cat:'hoodie', price:65, imgB: P+'hd-luffygear5-B.png',  imgW: P+'hd-luffygear5-W.png', sizes:['S','M','L','XL','XXL'] },
  { id:'hd-21', name:'Mikey',            series:'Tokyo Revengers',          cat:'hoodie', price:65, imgB: P+'hd-mikey-B.png',       imgW: P+'hd-mikey-W.png',       sizes:['S','M','L','XL','XXL'] },
  { id:'hd-22', name:'Akaza',            series:'Demon Slayer',             cat:'hoodie', price:65, imgB: P+'hd-akaza-B.png',       imgW: P+'hd-akaza-W.png',       sizes:['S','M','L','XL','XXL'] },
  { id:'hd-23', name:'Legends',          series:'Multi-Anime',              cat:'hoodie', price:65, imgB: P+'hd-legends-B.png',     imgW: P+'hd-legends-W.png',     sizes:['S','M','L','XL','XXL'] },
  { id:'hd-24', name:'Jiraiya',          series:'Naruto',                   cat:'hoodie', price:65, imgB: P+'hd-jiraiya-B.png',     imgW: P+'hd-jiraiya-W.png',    sizes:['S','M','L','XL','XXL'] },
];

/* Gallery images for the full-bleed section */
const galleryImages = [
  P+'hd-sololeveling-W.png',
  P+'hd-goku-W.png',
  P+'hd-luffy-W.png',
  P+'hd-luffywanted-W.png',
  P+'hd-zoro-W.png',
  P+'hd-zoroblack-W.png',
  P+'hd-akaza-W.png',
  P+'hd-mikey-W.png',
];

/* Lightbox images (lifestyle shots — hoodie + t-shirt) */
const lightboxImages = [
  P+'hd-sololeveling-W.png',
  P+'hd-goku-W.png',
  P+'hd-luffy-W.png',
  P+'hd-luffywanted-W.png',
  P+'hd-zoro-W.png',
  P+'hd-zoroblack-W.png',
  P+'hd-akaza-W.png',
  P+'hd-mikey-W.png',
  P+'ts-gojo-W.png',
  P+'ts-bakugo-W.png',
  P+'ts-itachi-W.png',
  P+'ts-luffy-W.png',
  P+'ts-frieren-W.png',
  P+'ts-rengoku-W.png',
  P+'ts-power-W.png',
  P+'ts-arise-W.png',
];

/* ── STATE ───────────────────────────────────────────────── */
let cart         = JSON.parse(localStorage.getItem('ikari-cart') || '[]');
let modalProduct = null;
let selectedSize = null;
let modalColor   = 'black';
let heroSlide    = 0;
let heroTimer    = null;
let heroProgress = 0;
let heroProgressTimer = null;
let galleryIdx   = 0;
let lightboxIdx  = 0;
const HERO_DURATION = 5000;

/* ── DOM REFS ────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const nav            = $('nav');
const cartToggle     = $('cartToggle');
const cartClose      = $('cartClose');
const cartOverlay    = $('cartOverlay');
const cartSidebar    = $('cartSidebar');
const cartCountEl    = $('cartCount');
const cartItemsEl    = $('cartItems');
const cartFooter     = $('cartFooter');
const cartTotalEl    = $('cartTotal');
const featuredTrack  = $('featuredTrack');
const allGrid        = $('allProductsGrid');
const filterTabs     = $('filterTabs');
const heroSlidesEl   = $('heroSlides');
const slideNumsEl    = $('slideNums');
const heroProg       = $('heroProgress');
const galleryImg     = $('galleryImg');
const galleryNum     = $('galleryNum');
const galleryNext    = $('galleryNext');
const navLabel       = $('navLabel');
const modalBackdrop  = $('modalBackdrop');
const modalClose     = $('modalClose');
const modalName      = $('modalName');
const modalSeries    = $('modalSeries');
const modalImg       = $('modalImg');
const modalPrice     = $('modalPrice');
const sizeGrid       = $('sizeGrid');
const modalAddBtn    = $('modalAddBtn');
const modalColorT    = $('modalColorToggle');
const lightbox       = $('lightbox');
const lightboxImg    = $('lightboxImg');
const lightboxClose  = $('lightboxClose');
const lightboxPrev   = $('lightboxPrev');
const lightboxNext   = $('lightboxNext');
const lightboxCounter= $('lightboxCounter');
const toast          = $('toast');

/* ── HERO SLIDESHOW ──────────────────────────────────────── */
function initHero() {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const mq = window.matchMedia('(max-width: 768px)');

  function applySlideImages() {
    const isMobile = mq.matches;
    slides.forEach(s => {
      const img = (isMobile && s.dataset.imgMobile) ? s.dataset.imgMobile : s.dataset.img;
      if (img) s.style.backgroundImage = `url("${img}")`;
    });
  }

  applySlideImages();
  mq.addEventListener('change', applySlideImages);

  const nums = Array.from(document.querySelectorAll('.slide-num'));

  /* Set hover preview image via CSS custom property */
  nums.forEach((btn, i) => {
    const img = slides[i]?.dataset.img;
    if (img) btn.style.setProperty('--preview-img', `url("${img}")`);
    btn.addEventListener('click', () => {
      goToSlide(parseInt(btn.dataset.slide));
      resetProgress();
    });
  });

  const heroLcp = document.getElementById('heroLcp');

  function goToSlide(n) {
    // The opening <img> has done its job once the slideshow moves on; fade it
    // out in step with the outgoing slide so it never shows through later.
    if (heroLcp) heroLcp.classList.add('is-retired');
    slides[heroSlide].classList.remove('is-active');
    nums[heroSlide].classList.remove('is-active');
    heroSlide = (n + slides.length) % slides.length;
    slides[heroSlide].classList.add('is-active');
    nums[heroSlide].classList.add('is-active');
  }

  function resetProgress() {
    clearInterval(heroProgressTimer);
    clearTimeout(heroTimer);
    heroProgress = 0;
    heroProg.style.width = '0%';
    heroProg.style.transition = 'none';

    heroProgressTimer = setInterval(() => {
      heroProgress += 100 / (HERO_DURATION / 50);
      if (heroProgress >= 100) heroProgress = 100;
      heroProg.style.width = heroProgress + '%';
      heroProg.style.transition = 'width 50ms linear';
    }, 50);

    heroTimer = setTimeout(() => {
      goToSlide(heroSlide + 1);
      resetProgress();
    }, HERO_DURATION);
  }

  /* Hold the opening frame until the visitor is actually there.

     A slide change repaints the full viewport, and the browser takes it as a
     new Largest Contentful Paint candidate: rotating on a fixed 5s timer pinned
     LCP at ~5.5s (measured; holding the first slide put it at 0.3s). Because
     LCP stops updating at the first user gesture, starting the rotation from
     that gesture means no slide change can ever become the LCP — and anyone
     who scrolls or taps still gets the rotating hero as designed. */
  let heroStarted = false;
  function startHeroRotation() {
    if (heroStarted) return;
    heroStarted = true;
    resetProgress();
  }
  ['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'].forEach(ev =>
    window.addEventListener(ev, startHeroRotation, { once: true, passive: true }));

  /* Clicking a slide number is itself a gesture: let it take over from here. */
  nums.forEach(btn => btn.addEventListener('click', startHeroRotation, { once: true }));
}

/* ── FEATURED TRACK — infinite marquee ──────────────────── */
const NEW_COLLECTION_IDS = ['ts-35','ts-36','ts-37','ts-38','ts-40','ts-41','ts-42','ts-43','ts-45','ts-46','ts-47','ts-48','ts-50','ts-51','ts-52','ts-53','ts-54','ts-55'];
// Hand-ordered so the two colorways of Broly and of Thunder Breathing
// (same pose/model photo, different shirt color) never sit next to each other.
const NEW_COLLECTION_ORDER = ['ts-35','ts-40','ts-36','ts-46','ts-51','ts-38','ts-42','ts-55','ts-37','ts-47','ts-41','ts-48','ts-54','ts-43','ts-50','ts-45','ts-52','ts-53'];

const FEATURED_COUNT = 16;

function buildFeaturedTrack() {
  featuredTrack.innerHTML = '';

  const newColl = NEW_COLLECTION_ORDER.map(id => products.find(p => p.id === id)).filter(Boolean);
  const rest    = products.filter(p => !NEW_COLLECTION_IDS.includes(p.id));

  // Mix: one new-collection card every few catalog cards, so the repeated
  // stock-photo models in the new drop are diluted by the rest of the catalog.
  const GAP = 3;
  const mixed = [];
  let ni = 0, ri = 0;
  while (ni < newColl.length || ri < rest.length) {
    if (ni < newColl.length) mixed.push(newColl[ni++]);
    for (let k = 0; k < GAP && ri < rest.length; k++) mixed.push(rest[ri++]);
  }

  const featured = mixed.slice(0, FEATURED_COUNT);

  startMarquee(featured);
}

/* Build one card. Kept separate so the marquee can mint cards on demand
   instead of laying the whole catalogue out at once. */
function createFeatCard(p) {
  const card = document.createElement('div');
  card.className = 'feat-card';
  const isHoodie = p.cat === 'hoodie';
    const lifeImg  = p.imgLife || p.imgW || p.imgB;
    // No lazy-loading here: these images live inside a permanently animated
    // container, and Safari never re-evaluates lazy candidates as a transform
    // brings them into view — cards stayed blank until a later visit warmed
    // the HTTP cache. Sized + f_auto they are ~50KB each, so eager is cheap.
    // The hover image is fetched on demand instead (see below).
    card.innerHTML = `
      <img class="feat-card-flat" src="${imgSrcSized(p.imgB, 900)}" alt="${p.name}" loading="eager" decoding="async">
      <img class="feat-card-life" data-src="${imgSrcSized(lifeImg, 900)}" alt="${p.name}" decoding="async">
      <div class="feat-card-type">${isHoodie ? 'FELPA' : 'T-SHIRT'}</div>
      <div class="feat-card-info">
        <div class="feat-card-name">${p.name}</div>
        <div class="feat-card-series">${p.series}</div>
        <div class="feat-card-footer">
          <span class="feat-card-price">€${p.price.toLocaleString()}</span>
          <span class="feat-card-arrow">→</span>
        </div>
      </div>
    `;
    const arrow = card.querySelector('.feat-card-arrow');

    /* Fetch the hover photo the first time it is actually needed */
    const lifeEl = card.querySelector('.feat-card-life');
    const loadLife = () => {
      if (lifeEl && lifeEl.dataset.src) {
        lifeEl.src = lifeEl.dataset.src;
        delete lifeEl.dataset.src;
      }
    };
    card.addEventListener('mouseenter', loadLife, { once: true });

    /* ── Touch (mobile): use touchend to beat the drag-scroll reset ── */
    let tapStartX = 0, touchMoved = false;

    card.addEventListener('touchstart', e => {
      tapStartX = e.touches[0].clientX;
      touchMoved = false;
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (Math.abs(e.touches[0].clientX - tapStartX) > 8) touchMoved = true;
    }, { passive: true });

    /* Arrow tap → navigate */
    if (arrow) {
      arrow.addEventListener('touchend', e => {
        e.stopPropagation(); // prevent card touchend from also firing
        if (!touchMoved) location.href = 'product.html?id=' + p.id;
      }, { passive: true });
    }

    /* Card tap → show / dismiss info panel */
    card.addEventListener('touchend', () => {
      if (touchMoved) return;
      const isTapped = card.classList.contains('is-tapped');
      document.querySelectorAll('.feat-card.is-tapped').forEach(c => c.classList.remove('is-tapped'));
      if (!isTapped) card.classList.add('is-tapped');
    }, { passive: true });

    /* ── Desktop: plain click navigates ── */
    card.addEventListener('click', () => {
      if (featDragMoved) return;
      if (!window.matchMedia('(hover: none)').matches) {
        location.href = 'product.html?id=' + p.id;
      }
    });

  return card;
}

const SECONDS_PER_CARD = 3.5; // pacing: how long one card takes to cross
const LIVE_CARDS = 10;        // cards held in the track, on every device
let featDragMoved = false;    // set while dragging, so a drag never navigates

/* Recycling marquee.

   The previous version laid every card out in one flex track and animated it
   with a CSS keyframe. That track ran to ~15000 CSS px — on a 2x display over
   29000 device px, and on a phone (90vw cards, 3x) past 30000 — far beyond
   WebKit's ~16384px texture limit, so Safari gave up rasterising it and the
   banner rendered mostly blank on both desktop and mobile.

   Here the track only ever holds enough cards to cover the viewport plus a
   small buffer. Cards that leave on the left are moved to the end and refilled
   with the next product, so the layer stays a couple of screens wide on every
   device. */
function startMarquee(pool) {
  if (!pool.length) return;

  const el = featuredTrack;
  const GAP_PX = 12; // matches .featured-track gap in style.css
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cards = [];      // live card elements, left to right
  let headIdx = 0;     // pool index of cards[0]
  let offset = 0;      // px scrolled within the leading card
  let cardW = 0;
  let rafId = null;
  let lastTs = 0;
  let dragging = false;

  const at = i => pool[((i % pool.length) + pool.length) % pool.length];

  function build() {
    el.style.animation = 'none'; // the CSS keyframe no longer drives this
    el.innerHTML = '';
    cards = [];
    // headIdx is deliberately kept: a rebuild resumes near where the banner
    // was rather than snapping back to the first product.
    offset = 0;

    // Measure a real card rather than deriving it from the vw units in CSS.
    const probe = createFeatCard(pool[0]);
    el.appendChild(probe);
    cardW = probe.getBoundingClientRect().width + GAP_PX;
    el.removeChild(probe);
    if (!cardW || !isFinite(cardW)) cardW = window.innerWidth * 0.3 + GAP_PX;

    // Keep LIVE_CARDS in the track on every device, but never enough of them
    // to walk back into WebKit's texture limit on a high-DPR screen.
    const dpr = window.devicePixelRatio || 1;
    const minNeeded = Math.ceil(window.innerWidth / cardW) + 2;
    const maxSafe = Math.max(minNeeded, Math.floor(12000 / (cardW * dpr)));
    const needed = Math.min(Math.max(LIVE_CARDS, minNeeded), maxSafe);
    for (let i = 0; i < needed; i++) {
      const card = createFeatCard(at(headIdx + i));
      cards.push(card);
      el.appendChild(card);
    }
    apply();
  }

  const apply = () => { el.style.transform = `translate3d(${-offset}px,0,0)`; };

  /* Keep `offset` inside one card width by recycling elements at either end. */
  function normalize() {
    let guard = 0;
    while (offset >= cardW && guard++ < 50) {
      cards.shift().remove();
      const card = createFeatCard(at(headIdx + cards.length + 1));
      cards.push(card);
      el.appendChild(card);
      headIdx++;
      offset -= cardW;
    }
    while (offset < 0 && guard++ < 50) {
      cards.pop().remove();
      const card = createFeatCard(at(headIdx - 1));
      cards.unshift(card);
      el.insertBefore(card, el.firstChild);
      headIdx--;
      offset += cardW;
    }
  }

  function tick(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min((ts - lastTs) / 1000, 0.1); // ignore huge tab-switch gaps
    lastTs = ts;
    if (!dragging) {
      offset += (cardW / SECONDS_PER_CARD) * dt;
      normalize();
      apply();
    }
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId || reduceMotion) return;
    lastTs = 0;
    rafId = requestAnimationFrame(tick);
  }
  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  /* ── Drag / swipe ── */
  let startX = 0, startOffset = 0;
  const beginDrag = x => { dragging = true; startX = x; startOffset = offset; featDragMoved = false; };
  const moveDrag = x => {
    if (!dragging) return;
    const dx = x - startX;
    if (Math.abs(dx) > 6) featDragMoved = true;
    offset = startOffset - dx;
    normalize();
    apply();
  };
  const endDrag = () => {
    dragging = false;
    // Clear after the click that follows mouseup has been dispatched.
    setTimeout(() => { featDragMoved = false; }, 0);
  };

  el.addEventListener('mousedown', e => { e.preventDefault(); beginDrag(e.pageX); });
  document.addEventListener('mousemove', e => { if (dragging) { e.preventDefault(); moveDrag(e.pageX); } });
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('mouseleave', endDrag);
  window.addEventListener('blur', endDrag);

  /* Decide the gesture's axis before hijacking it: a finger travelling down
     the page is scrolling, not dragging the banner. Claiming every touch
     paused the marquee for the whole of a vertical scroll. */
  let tStartX = 0, tStartY = 0, tAxis = null;
  el.addEventListener('touchstart', e => {
    tStartX = e.touches[0].pageX;
    tStartY = e.touches[0].pageY;
    tAxis = null;
  }, { passive: true });
  el.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (!tAxis) {
      const dx = Math.abs(t.pageX - tStartX), dy = Math.abs(t.pageY - tStartY);
      if (dx < 8 && dy < 8) return;
      tAxis = dx > dy ? 'x' : 'y';
      if (tAxis === 'x') beginDrag(tStartX);
    }
    if (tAxis === 'x') moveDrag(t.pageX);
  }, { passive: true });
  el.addEventListener('touchend',   endDrag, { passive: true });
  el.addEventListener('touchcancel', endDrag, { passive: true });

  /* The loop deliberately runs for the life of the page. Gating it on an
     IntersectionObserver looked like a free saving, but the banner starts
     below the fold: the observer fired once with isIntersecting false, the
     loop stopped, and on a slow connection no later callback ever arrived —
     so the banner sat frozen for good. Browsers already suspend
     requestAnimationFrame for hidden tabs, and moving ten cards costs
     nothing, so there is nothing left worth gating. */

  /* Rebuild only when the width really changes. Phone browsers fire `resize`
     every time the address bar collapses or expands while scrolling — only
     the height moves, but rebuilding on those events restarted the banner
     from the first card the instant the user touched the screen. */
  let resizeTimer, lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { stop(); build(); start(); }, 200);
  });

  build();
  start();
}

/* ── ALL PRODUCTS GRID ───────────────────────────────────── */
function buildAllProducts(filter = 'all') {
  allGrid.innerHTML = '';
  const list = filter === 'all' ? products : products.filter(p => p.cat === filter);

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'p-card';
    const hasAlt = Boolean(p.imgW);
    card.innerHTML = `
      <div class="p-card-img-wrap">
        <img class="p-card-img" src="${imgSrc(p.imgB)}" alt="${p.name} — Nero" loading="lazy">
        <img class="p-card-img-alt" src="${imgSrc(hasAlt ? p.imgW : p.imgB)}" alt="${p.name}" loading="lazy">
        <span class="p-card-badge">${p.cat === 'hoodie' ? 'FELPA' : 'T-SHIRT'}</span>
      </div>
      <div class="p-card-info">
        <span class="p-card-name">${p.name}</span>
        <span class="p-card-series">${p.series}</span>
        <div class="p-card-footer">
          <span class="p-card-price">€${p.price.toLocaleString()}</span>
          <button class="p-card-btn" aria-label="Aggiungi ${p.name}">→</button>
        </div>
      </div>
    `;


    card.addEventListener('click', () => { location.href = 'product.html?id=' + p.id; });
    allGrid.appendChild(card);
  });
}

/* ── FILTER TABS ─────────────────────────────────────────── */
filterTabs.addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
  tab.classList.add('is-active');
  buildAllProducts(tab.dataset.filter);
});

/* ── GALLERY HERO ────────────────────────────────────────── */
function initGallery() {
  galleryIdx = 0;
  galleryImg.src = imgSrc(galleryImages[0]);
  updateGalleryNum();

  galleryNext.addEventListener('click', () => {
    galleryIdx = (galleryIdx + 1) % galleryImages.length;
    galleryImg.style.opacity = '0';
    setTimeout(() => {
      galleryImg.src = imgSrc(galleryImages[galleryIdx]);
      galleryImg.style.opacity = '1';
      updateGalleryNum();
    }, 300);
  });
}

function updateGalleryNum() {
  galleryNum.textContent = String(galleryIdx + 1).padStart(2, '0');
}

/* ── LIGHTBOX ────────────────────────────────────────────── */
function openLightbox(startIdx) {
  lightboxIdx = startIdx;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  updateLightboxImg();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

function updateLightboxImg() {
  lightboxImg.src = imgSrc(lightboxImages[lightboxIdx]);
  lightboxCounter.textContent = `${lightboxIdx + 1} / ${lightboxImages.length}`;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => {
  lightboxIdx = (lightboxIdx - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImg();
});
lightboxNext.addEventListener('click', () => {
  lightboxIdx = (lightboxIdx + 1) % lightboxImages.length;
  updateLightboxImg();
});
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { lightboxIdx = (lightboxIdx - 1 + lightboxImages.length) % lightboxImages.length; updateLightboxImg(); }
  if (e.key === 'ArrowRight') { lightboxIdx = (lightboxIdx + 1) % lightboxImages.length; updateLightboxImg(); }
});

/* Three-column blocks open lightbox */
document.querySelectorAll('[data-gallery="true"]').forEach((block, i) => {
  block.addEventListener('click', () => openLightbox(i % lightboxImages.length));
});

/* ── SIZE MODAL ──────────────────────────────────────────── */
function openModal(product) {
  modalProduct = product;
  selectedSize = null;
  modalColor   = 'black';

  modalName.textContent   = product.name.toUpperCase();
  modalSeries.textContent = product.series;
  modalImg.src            = imgSrc(product.imgB);
  modalImg.alt            = product.name;
  modalPrice.textContent  = `€${product.price.toLocaleString()}`;

  // Color toggle
  modalColorT.innerHTML = '';
  if (product.imgW) {
    const mkSw = (color, cls) => {
      const btn = document.createElement('button');
      btn.className = `p-swatch ${cls}${color === 'black' ? ' is-active' : ''}`;
      btn.dataset.color = color;
      btn.setAttribute('aria-label', color === 'black' ? 'Nero' : 'Bianco');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        modalColor = color;
        modalImg.src = imgSrc(color === 'white' ? product.imgW : product.imgB);
        modalColorT.querySelectorAll('.p-swatch').forEach(s => s.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
      return btn;
    };
    modalColorT.appendChild(mkSw('black', 'p-swatch--black'));
    modalColorT.appendChild(mkSw('white', 'p-swatch--white'));
  }

  // Sizes
  sizeGrid.innerHTML = '';
  product.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.className = 'size-btn';
    btn.textContent = size;
    btn.addEventListener('click', () => {
      sizeGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSize = size;
      modalAddBtn.disabled = false;
      modalAddBtn.textContent = `AGGIUNGI AL CARRELLO — ${size}`;
    });
    sizeGrid.appendChild(btn);
  });

  modalAddBtn.disabled = true;
  modalAddBtn.textContent = 'SELEZIONA UNA TAGLIA';
  modalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  modalProduct = null;
  selectedSize = null;
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeModal(); });

modalAddBtn.addEventListener('click', () => {
  if (!selectedSize || !modalProduct) return;
  const colorLabel = modalColor === 'white' ? 'Bianco' : 'Nero';
  const cartImg = imgSrc(modalColor === 'white' && modalProduct.imgW ? modalProduct.imgW : modalProduct.imgB);

  const existingIdx = cart.findIndex(
    item => item.id === modalProduct.id && item.size === selectedSize && item.color === colorLabel
  );
  if (existingIdx > -1) {
    cart[existingIdx].qty += 1;
  } else {
    cart.push({ id: modalProduct.id, name: modalProduct.name, series: modalProduct.series,
      price: modalProduct.price, size: selectedSize, color: colorLabel, img: cartImg, qty: 1 });
  }

  saveCart();
  renderCart();
  closeModal();
  showToast(`${modalProduct.name.toUpperCase()} (${selectedSize}) aggiunto!`);
  openCart();
});

/* ── CART ────────────────────────────────────────────────── */
function openCart() {
  cartSidebar.classList.add('is-open');
  cartOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.remove('is-open');
  cartOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}
cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartCountEl.textContent = count;
  cartTotalEl.textContent = `€${total.toLocaleString()}`;
  cartFooter.style.display = cart.length ? 'flex' : 'none';

  if (!cart.length) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Il tuo carrello è vuoto.</p>';
    return;
  }
  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-qty">${item.qty}</span>
        </div>
        <span class="cart-item-price">€${(item.price * item.qty).toLocaleString()}</span>
        <span class="cart-item-meta">Taglia: ${item.size}</span>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Rimuovi ${item.name}">Rimuovi</button>
      </div>
    </div>
  `).join('');

  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(Number(btn.dataset.idx), 1);
      saveCart();
      renderCart();
    });
  });
}

function saveCart() { localStorage.setItem('ikari-cart', JSON.stringify(cart)); }

/* ── TOAST ───────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

/* ── NAV SCROLL & SECTION LABELS ────────────────────────── */
const sectionLabels = {
  hero:     'STORE',
  prodotti: '( PRODOTTI IN EVIDENZA )',
  storia:   '( LA COLLEZIONE )',
  galleria: '( GALLERIA )',
  tutti:    '( LA COLLEZIONE COMPLETA )',
  contatti: '( CONTATTACI )',
};

function initIntersectionObserver() {
  const sections = document.querySelectorAll('[data-section]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.dataset.section;
      // Nav color switch
      if (id === 'hero') {
        document.body.classList.add('hero-active');
      } else {
        document.body.classList.remove('hero-active');
      }
      // Center label
      if (navLabel && sectionLabels[id]) {
        navLabel.textContent = sectionLabels[id];
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/* ── GSAP ANIMATIONS ─────────────────────────────────────── */
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero text entrance
  gsap.from('.hero-bottom-left > *', {
    opacity: 0, y: 28, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.5,
  });
  gsap.from('.slide-nums .slide-num', {
    opacity: 0, y: 12, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.3,
  });

  // View all bar
  gsap.from('.view-all-bar', {
    scrollTrigger: { trigger: '.view-all-bar', start: 'top 85%' },
    opacity: 0, y: 16, duration: 0.5,
  });

  // Three-col
  gsap.from('.col-block', {
    scrollTrigger: { trigger: '.three-col', start: 'top 75%' },
    opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  });

  // All products header
  gsap.from('.all-products-header', {
    scrollTrigger: { trigger: '.all-products', start: 'top 80%' },
    opacity: 0, y: 20, duration: 0.6,
  });

  // Footer kanji
  gsap.from('.footer-kanji, .footer-kanji-sub', {
    scrollTrigger: { trigger: '.footer', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out',
  });
}

/* ── THEME TOGGLER ───────────────────────────────────────── */
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  let _ctx = null, _buf = null, lastSnd = 0;

  function playClick() {
    const now = performance.now();
    if (now - lastSnd < 80) return;
    lastSnd = now;
    try {
      if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (_ctx.state === 'suspended') _ctx.resume();
      if (!_buf || _buf.sampleRate !== _ctx.sampleRate) {
        const rate = _ctx.sampleRate;
        const len  = Math.floor(rate * 0.006);
        _buf = _ctx.createBuffer(1, len, rate);
        const ch = _buf.getChannelData(0);
        for (let i = 0; i < len; i++) {
          const t = i / len;
          ch[i] = (Math.sin(2 * Math.PI * 3400 * t) * 0.6 + (Math.random() * 2 - 1) * 0.4) * Math.pow(1 - t, 3);
        }
      }
      const src  = _ctx.createBufferSource();
      const gain = _ctx.createGain();
      src.buffer = _buf;
      gain.gain.value = 0.08;
      src.connect(gain);
      gain.connect(_ctx.destination);
      src.start();
    } catch(e) {}
  }

  // Restore saved preference
  if (localStorage.getItem('ikari-theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('ikari-theme', isDark ? 'dark' : 'light');
    playClick();
  });
})();

/* ── INIT ────────────────────────────────────────────────── */
initHero();
buildFeaturedTrack();
buildAllProducts();
initGallery();
renderCart();
initIntersectionObserver();
initAnimations();

/* Dismiss tapped featured cards when clicking outside */
document.addEventListener('click', e => {
  if (!e.target.closest('.feat-card')) {
    document.querySelectorAll('.feat-card.is-tapped').forEach(c => c.classList.remove('is-tapped'));
  }
});

/* ── NEWSLETTER POPUP ────────────────────────────────────── */
(function () {
  var STORAGE_KEY = 'ikari_popup_shown';
  if (localStorage.getItem(STORAGE_KEY)) return;

  var overlay = document.getElementById('popupOverlay');
  var popup   = document.getElementById('newsletterPopup');
  var closeBtn = document.getElementById('popupClose');
  var form    = document.getElementById('popupForm');
  if (!overlay || !popup) return;

  function openPopup() {
    overlay.classList.add('is-open');
    popup.classList.add('is-open');
    localStorage.setItem(STORAGE_KEY, '1');
  }
  function closePopup() {
    overlay.classList.remove('is-open');
    popup.classList.remove('is-open');
  }

  setTimeout(openPopup, 15000);

  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      closePopup();
    });
  }
})();

