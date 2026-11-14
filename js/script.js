/* ==========================================================================
   AL NOOR CLOTHING — v2 storefront script (vanilla JS, no dependencies)
   Artwork is generated as inline SVG, so no external image files are needed.
   Demo only: no payments, accounts or orders are processed.
   ========================================================================== */
(() => {
  'use strict';

  /* ---------- Configuration ---------- */
  const KEYS = { cart: 'alnoor.v2.cart', wish: 'alnoor.v2.wishlist' };
  const BEST_SELLER_IDS = ['p4', 'p6', 'p1', 'p11', 'p10'];
  const LABELS = { men: 'Men', women: 'Women', casual: 'Casual', traditional: 'Traditional' };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const SLIDE_MS = 6500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Catalogue ----------
     kind: top | blazer | hoodie | kurta | dress | trouser
     fill / accent: garment colours; bg: card background colour. */
  const PRODUCTS = [
    { id: 'p1', name: 'Forest Linen Overshirt', tags: ['men', 'casual'], price: 7490, was: null, badge: 'New', sizes: ['S', 'M', 'L', 'XL'], kind: 'top', fill: '#3E4A2F', accent: '#F2EBDF', bg: '#C9D1BC', blurb: 'Breathable European linen in a relaxed, layered cut for warm evenings.' },
    { id: 'p2', name: 'Sage Relaxed Chinos', tags: ['men', 'casual'], price: 5990, was: 6990, badge: 'Sale', sizes: ['30', '32', '34', '36'], kind: 'trouser', fill: '#8E9A7E', accent: '#3E4A2F', bg: '#E9DFCF', blurb: 'Soft-touch cotton twill with a tapered leg and a comfortable mid-rise.' },
    { id: 'p3', name: 'Camel Tailored Blazer', tags: ['men'], price: 12990, was: null, badge: 'New', sizes: ['S', 'M', 'L', 'XL'], kind: 'blazer', fill: '#C9A77C', accent: '#2A1E19', bg: '#E9DFCF', blurb: 'Structured single-breasted blazer in a warm camel weave.' },
    { id: 'p4', name: 'Gold-Trim Embroidered Kurta', tags: ['men', 'traditional'], price: 8990, was: null, badge: 'Bestseller', sizes: ['M', 'L', 'XL', 'XXL'], kind: 'kurta', fill: '#2F3A24', accent: '#C5A46D', bg: '#C9D1BC', blurb: 'Festive kurta with fine gold-thread detailing on the placket and hem.' },
    { id: 'p5', name: 'Ivory Cotton Shalwar Kameez', tags: ['men', 'traditional'], price: 6490, was: 7490, badge: 'Sale', sizes: ['M', 'L', 'XL'], kind: 'kurta', fill: '#F2EBDF', accent: '#C2552D', bg: '#D9C3A5', blurb: 'Breathable cotton set for everyday comfort, family gatherings and Eid.' },
    { id: 'p6', name: 'Off-White Crepe Midi Dress', tags: ['women'], price: 8490, was: null, badge: 'New', sizes: ['XS', 'S', 'M', 'L'], kind: 'dress', fill: '#F2EBDF', accent: '#C2552D', bg: '#EBCFC0', blurb: 'Fluid crepe with a softly draped neckline and a concealed side zip.' },
    { id: 'p7', name: 'Sage Chiffon Dress', tags: ['women', 'traditional'], price: 11490, was: null, badge: '', sizes: ['S', 'M', 'L'], kind: 'dress', fill: '#A8B5A0', accent: '#F2EBDF', bg: '#C9D1BC', blurb: 'Layered chiffon with fine sleeve detailing and a flowing hemline.' },
    { id: 'p8', name: 'Sand Wide-Leg Trousers', tags: ['women', 'casual'], price: 5490, was: null, badge: '', sizes: ['XS', 'S', 'M', 'L'], kind: 'trouser', fill: '#A8967A', accent: '#17120F', bg: '#E9DFCF', blurb: 'High-waisted, fluid trousers that move easily from desk to dinner.' },
    { id: 'p9', name: 'Forest Knit Cardigan', tags: ['women', 'casual'], price: 6990, was: 8490, badge: 'Sale', sizes: ['S', 'M', 'L'], kind: 'top', fill: '#2F4B44', accent: '#C5A46D', bg: '#D9C3A5', blurb: 'Fine-gauge knit with mother-of-pearl buttons and a relaxed drape.' },
    { id: 'p10', name: 'Terracotta Lawn Suit', tags: ['women', 'traditional'], price: 13990, was: null, badge: 'New', sizes: ['S', 'M', 'L', 'XL'], kind: 'kurta', fill: '#C2552D', accent: '#C5A46D', bg: '#F6D3C2', blurb: 'Three-piece lawn suit with gold embroidery along the neckline and hem.' },
    { id: 'p11', name: 'Everyday Organic Cotton Tee', tags: ['men', 'women', 'casual'], price: 2490, was: null, badge: 'Bestseller', sizes: ['XS', 'S', 'M', 'L', 'XL'], kind: 'top', fill: '#F2EBDF', accent: '#C2552D', bg: '#D9C3A5', blurb: 'Heavyweight organic cotton with a clean crew neck and a relaxed fit.' },
    { id: 'p12', name: 'Minimal Hooded Sweatshirt', tags: ['men', 'women', 'casual'], price: 4990, was: null, badge: 'New', sizes: ['S', 'M', 'L', 'XL'], kind: 'hoodie', fill: '#3E4A2F', accent: '#2A1E19', bg: '#C9D1BC', blurb: 'Brushed fleece hoodie with a double-layer hood and tonal stitching.' }
  ];

  const INFO = {
    shipping: { title: 'Shipping', body: [
      'Orders are dispatched within 2 to 3 working days.',
      'Delivery across Pakistan usually takes 3 to 5 working days. Free delivery applies to orders over PKR 10,000.',
      'Placeholder policy text for the storefront prototype.'
    ] },
    returns: { title: 'Returns & exchanges', body: [
      'Unworn items with original tags can be returned or exchanged within 14 days of delivery.',
      'Sale items are eligible for exchange only.',
      'Placeholder policy text for the storefront prototype.'
    ] },
    size: { title: 'Size guide', body: [
      'Measure your chest, waist and hips at their fullest point, keeping the tape comfortably snug.',
      'If you fall between two sizes, we recommend choosing the larger size for a relaxed fit.',
      'Measurements shown here are for guidance only.'
    ] },
    faq: { title: 'Frequently asked questions', body: [
      'Are my payments secure? This is a test store. No payment is processed.',
      'Can I save items for later? Yes, tap the heart icon to add pieces to your wishlist.',
      'How do I choose a size? Open Quick View on any product and select your size before adding it to the bag.'
    ] }
  };

  /* ---------- State & helpers ---------- */
  const state = { filter: 'all', query: '', sort: 'featured' };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) => 'PKR ' + n.toLocaleString('en-US');
  const lineKey = (id, size) => `${id}|${size}`;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function load(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : fallback;
    } catch (err) {
      return fallback;
    }
  }

  let cart = load(KEYS.cart, []).filter((line) => {
    const p = line && byId(line.id);
    return p && p.sizes.includes(line.size) && Number.isInteger(line.qty) && line.qty > 0;
  });
  let wish = load(KEYS.wish, []).filter((id, i, arr) => byId(id) && arr.indexOf(id) === i);

  function persist() {
    try {
      localStorage.setItem(KEYS.cart, JSON.stringify(cart));
      localStorage.setItem(KEYS.wish, JSON.stringify(wish));
    } catch (err) {
      /* Storage unavailable (private mode): the session still works. */
    }
  }

  /* ---------- SVG artwork ---------- */
  const SHAPES = {
    top: 'M108 64 Q150 48 192 64 L246 104 L226 170 L206 162 L206 352 L94 352 L94 162 L74 170 L54 104 Z',
    blazer: 'M108 64 Q150 48 192 64 L246 104 L226 170 L206 162 L206 352 L94 352 L94 162 L74 170 L54 104 Z',
    hoodie: 'M108 80 Q150 58 192 80 L246 112 L226 176 L206 168 L206 352 L94 352 L94 168 L74 176 L54 112 Z',
    kurta: 'M114 60 Q150 46 186 60 L232 100 L220 170 L210 164 L210 384 L90 384 L90 164 L80 170 L68 100 Z',
    dress: 'M120 58 Q150 42 180 58 L206 110 L238 366 Q150 388 62 366 L94 110 Z',
    trouser: 'M92 56 H208 L218 362 H170 L150 176 L130 362 H82 Z'
  };

  const DETAILS = {
    top: (a) => `<path d="M108 64 Q150 92 192 64" fill="none" stroke="${a}" stroke-width="3"/>
      <circle cx="150" cy="150" r="2.6" fill="${a}"/><circle cx="150" cy="190" r="2.6" fill="${a}"/>`,
    blazer: (a) => `<path d="M150 90 L120 180 M150 90 L180 180" stroke="${a}" stroke-width="3" fill="none"/>
      <path d="M150 90 L134 130 L150 150 L166 130 Z" fill="${a}" opacity=".35"/>
      <circle cx="150" cy="250" r="3" fill="${a}"/><circle cx="150" cy="276" r="3" fill="${a}"/>`,
    hoodie: (a) => `<path d="M96 92 Q150 -2 204 92 Q150 118 96 92 Z" fill="${a}" opacity=".9"/>
      <path d="M122 290 H178 V336 H122 Z" fill="${a}" opacity=".35"/>
      <path d="M122 290 H178 V336 H122 Z" fill="none" stroke="${a}" stroke-width="2"/>`,
    kurta: (a) => `<path d="M114 60 Q150 84 186 60" fill="none" stroke="${a}" stroke-width="3"/>
      <path d="M150 64 V150" stroke="${a}" stroke-width="3"/>
      <path d="M90 352 H210" stroke="${a}" stroke-width="6" stroke-dasharray="2 8" stroke-linecap="round"/>
      <path d="M100 330 Q150 344 200 330" fill="none" stroke="${a}" stroke-width="1.6"/>`,
    dress: (a) => `<path d="M120 58 Q150 80 180 58" fill="none" stroke="${a}" stroke-width="3"/>
      <path d="M104 210 Q150 224 196 210" fill="none" stroke="${a}" stroke-width="2.5"/>
      <path d="M86 340 Q150 352 214 340" fill="none" stroke="${a}" stroke-width="1.6" opacity=".7"/>`,
    trouser: (a) => `<path d="M92 56 H208 V80 H92 Z" fill="${a}" opacity=".9"/>
      <path d="M150 176 V236" stroke="${a}" stroke-width="2" opacity=".6"/>
      <path d="M118 300 Q140 316 136 360" fill="none" stroke="${a}" stroke-width="1.6" opacity=".6"/>`
  };

  let gid = 0;
  function garment(kind, fill, accent) {
    const id = `g${++gid}`;
    const shape = SHAPES[kind] || SHAPES.top;
    const detail = (DETAILS[kind] || DETAILS.top)(accent);
    return `<svg viewBox="0 0 300 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${id}l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#000" stop-opacity=".22"/>
          <stop offset=".38" stop-color="#fff" stop-opacity=".18"/>
          <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".3"/>
        </linearGradient>
        <radialGradient id="${id}h" cx=".35" cy=".25" r=".6">
          <stop offset="0" stop-color="#fff" stop-opacity=".35"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>
        <pattern id="${id}w" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 2.5H5M2.5 0V5" stroke="#000" stroke-opacity=".07" stroke-width="1"/>
        </pattern>
        <filter id="${id}s" x="-25%" y="-15%" width="150%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="10" flood-color="#17120F" flood-opacity=".25"/>
        </filter>
      </defs>
      <ellipse cx="150" cy="390" rx="110" ry="11" fill="rgba(23,18,15,0.22)"/>
      <g filter="url(#${id}s)">
        <path d="${shape}" fill="${fill}"/>
        <path d="${shape}" fill="url(#${id}w)"/>
        <path d="${shape}" fill="url(#${id}l)"/>
        <path d="${shape}" fill="url(#${id}h)"/>
      </g>
      ${detail}
    </svg>`;
  }

  let patternCounter = 0;
  function texture(type, c1, c2) {
    const id = `pat${++patternCounter}`;
    const defs = {
      stripes: `<pattern id="${id}" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="36" height="36" fill="${c2}"/><rect width="16" height="36" fill="${c1}"/></pattern>`,
      dots: `<pattern id="${id}" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="${c2}"/><circle cx="15" cy="15" r="7" fill="${c1}"/></pattern>`,
      waves: `<pattern id="${id}" width="60" height="30" patternUnits="userSpaceOnUse">
        <rect width="60" height="30" fill="${c2}"/>
        <path d="M0 15 Q15 0 30 15 T60 15" fill="none" stroke="${c1}" stroke-width="6"/></pattern>`,
      checks: `<pattern id="${id}" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="${c2}"/><rect width="20" height="20" fill="${c1}" opacity=".9"/>
        <rect x="20" y="20" width="20" height="20" fill="${c1}" opacity=".9"/></pattern>`
    };
    return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>${defs[type] || defs.stripes}</defs>
      <rect width="400" height="400" fill="url(#${id})"/></svg>`;
  }

  function paintArt(root = document) {
    $$('[data-art]', root).forEach((el) => {
      el.innerHTML = garment(el.dataset.art, el.dataset.fill, el.dataset.accent);
    });
    $$('[data-bg-art]', root).forEach((el) => {
      el.style.setProperty('--bg-art', el.dataset.bgArt);
    });
    $$('.g-tile[data-texture]', root).forEach((el) => {
      el.innerHTML = texture(el.dataset.texture, el.dataset.c1, el.dataset.c2);
    });
  }

  /* ---------- Markup helpers ---------- */
  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-8.9-8.6C1.8 8.4 3.6 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.2 3.4 3.9 6.4C19 15.6 12 20 12 20z"/></svg>';
  const catLabel = (p) => p.tags.map((t) => LABELS[t]).join(' · ');

  function priceHTML(p) {
    return p.was
      ? `<span>${money(p.price)}</span><span class="was">${money(p.was)}</span>`
      : `<span>${money(p.price)}</span>`;
  }

  function photoTag(p, cls) {
    // Uses images/<id>.jpg when present; the onerror removes it so the illustration shows instead.
    return `<img class="${cls}" src="images/${p.id}.jpg" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`;
  }

  function cardHTML(p, index, rank) {
    const inWish = wish.includes(p.id);
    const tag = p.badge ? `<span class="tag tag-${esc(p.badge.toLowerCase())}">${esc(p.badge)}</span>` : '';
    const rankHTML = rank ? `<span class="rank" aria-hidden="true">${String(rank).padStart(2, '0')}</span>` : '';
    return `
      <div class="grid-item reveal" style="--d:${(index % 4) * 80}ms">
        <article class="card" data-id="${p.id}">
          <div class="card-media" style="--tone-bg:${p.bg}">
            ${tag}
            ${rankHTML}
            <button type="button" class="wish-btn${inWish ? ' is-on' : ''}" data-wish="${p.id}"
              aria-pressed="${inWish}" aria-label="Save ${esc(p.name)} to wishlist">${HEART}</button>
            ${photoTag(p, 'photo')}<div class="card-art">${garment(p.kind, p.fill, p.accent)}</div>
            <button type="button" class="quick-btn" data-quick="${p.id}">Quick view</button>
          </div>
          <div class="card-body">
            <p class="card-cat">${esc(catLabel(p))}</p>
            <h3 class="card-name">${esc(p.name)}</h3>
            <p class="price">${priceHTML(p)}</p>
            <button type="button" class="btn btn-ink btn-block btn-add" data-add="${p.id}">Add to bag</button>
          </div>
        </article>
      </div>`;
  }

  /* ---------- Reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    : null;

  function observeReveals(root = document) {
    $$('.reveal:not(.in)', root).forEach((el) => {
      if (io) io.observe(el);
      else el.classList.add('in');
    });
  }

  /* ---------- Catalogue ---------- */
  function visibleProducts() {
    let list = PRODUCTS.filter((p) => {
      const matchesCat = state.filter === 'all' || p.tags.includes(state.filter);
      const haystack = `${p.name} ${p.tags.join(' ')} ${p.blurb}`.toLowerCase();
      return matchesCat && (!state.query || haystack.includes(state.query));
    });
    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name)
    };
    if (sorters[state.sort]) list = list.slice().sort(sorters[state.sort]);
    return list;
  }

  function renderGrid() {
    const grid = $('#newGrid');
    const list = visibleProducts();
    grid.innerHTML = list.map((p, i) => cardHTML(p, i)).join('');
    $('#resultCount').textContent = `${list.length} ${list.length === 1 ? 'piece' : 'pieces'} found`;
    $('#emptyState').hidden = list.length > 0;
    observeReveals(grid);
  }

  function renderBest() {
    const track = $('#bestTrack');
    const list = BEST_SELLER_IDS.map(byId).filter(Boolean);
    track.innerHTML = list.map((p, i) => cardHTML(p, i, i + 1)).join('');
    observeReveals(track);
  }

  function setFilter(cat) {
    state.filter = cat;
    $$('.seg').forEach((seg) => {
      const on = seg.dataset.filter === cat;
      seg.classList.toggle('is-active', on);
      seg.setAttribute('aria-pressed', String(on));
    });
    renderGrid();
  }

  /* ---------- Wishlist ---------- */
  function refreshWishUI(id) {
    const on = wish.includes(id);
    $$(`[data-wish="${id}"]`).forEach((btn) => {
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function toggleWish(id) {
    const p = byId(id);
    if (!p) return;
    const index = wish.indexOf(id);
    if (index > -1) {
      wish.splice(index, 1);
      toast(`Removed ${p.name} from your wishlist.`);
    } else {
      wish.push(id);
      toast(`Saved ${p.name} to your wishlist.`);
    }
    persist();
    refreshWishUI(id);
    renderWish();
    updateCounts();
  }

  function renderWish() {
    const list = $('#wishItems');
    if (!wish.length) {
      list.innerHTML = '<li class="empty"><p>Nothing saved yet.</p><button type="button" class="btn btn-line btn-sm" data-close-drawer>Continue shopping</button></li>';
      return;
    }
    list.innerHTML = wish.map((id) => {
      const p = byId(id);
      return `
        <li class="cart-item">
          <div class="cart-art" style="--tone-bg:${p.bg}">${photoTag(p, 'photo')}${garment(p.kind, p.fill, p.accent)}</div>
          <div class="cart-info">
            <p class="cart-name">${esc(p.name)}</p>
            <p class="price">${priceHTML(p)}</p>
            <button type="button" class="btn btn-line" data-add="${p.id}">Add to bag</button>
          </div>
          <div class="cart-end">
            <button type="button" class="link-btn" data-wish="${p.id}">Remove</button>
          </div>
        </li>`;
    }).join('');
  }

  /* ---------- Cart ---------- */
  function findLine(key) {
    return cart.find((line) => lineKey(line.id, line.size) === key);
  }

  function addToCart(id, size) {
    const p = byId(id);
    if (!p) return;
    const line = cart.find((l) => l.id === id && l.size === size);
    if (line) line.qty += 1;
    else cart.push({ id, size, qty: 1 });
    persist();
    updateCounts();
    renderCart();
    bump();
    toast(`Added ${p.name} (size ${size}) to your bag.`);
  }

  function changeQty(key, delta) {
    const line = findLine(key);
    if (!line) return;
    line.qty += delta;
    if (line.qty < 1) cart = cart.filter((l) => l !== line);
    persist();
    updateCounts();
    renderCart();
  }

  function removeLine(key) {
    cart = cart.filter((l) => lineKey(l.id, l.size) !== key);
    persist();
    updateCounts();
    renderCart();
  }

  function cartTotal() {
    return cart.reduce((sum, l) => sum + byId(l.id).price * l.qty, 0);
  }

  function renderCart() {
    const list = $('#cartItems');
    if (!cart.length) {
      list.innerHTML = '<li class="empty"><p>Your bag is empty.</p><button type="button" class="btn btn-line btn-sm" data-close-drawer>Continue shopping</button></li>';
    } else {
      list.innerHTML = cart.map((l) => {
        const p = byId(l.id);
        const key = lineKey(l.id, l.size);
        return `
          <li class="cart-item">
            <div class="cart-art" style="--tone-bg:${p.bg}">${photoTag(p, 'photo')}${garment(p.kind, p.fill, p.accent)}</div>
            <div class="cart-info">
              <p class="cart-name">${esc(p.name)}</p>
              <p class="cart-meta">Size ${esc(l.size)}</p>
              <div class="qty" role="group" aria-label="Quantity for ${esc(p.name)}">
                <button type="button" data-qty="dec" data-key="${esc(key)}" aria-label="Decrease quantity" ${l.qty <= 1 ? 'disabled' : ''}>&minus;</button>
                <span aria-live="polite">${l.qty}</span>
                <button type="button" data-qty="inc" data-key="${esc(key)}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div class="cart-end">
              <p class="price">${money(p.price * l.qty)}</p>
              <button type="button" class="link-btn" data-remove="${esc(key)}">Remove</button>
            </div>
          </li>`;
      }).join('');
    }
    $('#cartSubtotal').textContent = money(cartTotal());
    $('#checkoutBtn').disabled = !cart.length;
  }

  function updateCounts() {
    const bagCount = cart.reduce((sum, l) => sum + l.qty, 0);
    $$('.bag-count').forEach((el) => {
      el.textContent = String(bagCount);
      el.hidden = bagCount === 0;
    });
    $$('.wish-count').forEach((el) => {
      el.textContent = String(wish.length);
      el.hidden = wish.length === 0;
    });
  }

  function bump() {
    $$('#bagBtn, #bnBag').forEach((el) => {
      el.classList.remove('bump');
      requestAnimationFrame(() => el.classList.add('bump'));
      setTimeout(() => el.classList.remove('bump'), 600);
    });
  }

  /* ---------- Dialogs ---------- */
  function openDialog(dlg) {
    if (!dlg || dlg.open) return;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  function closeDialog(dlg) {
    if (!dlg || !dlg.open) return;
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
  }

  function openQuickView(id) {
    const p = byId(id);
    if (!p) return;
    const inWish = wish.includes(p.id);
    $('#qvBody').innerHTML = `
      <div class="qv">
        <div class="qv-media" style="--tone-bg:${p.bg}">
          ${photoTag(p, 'photo')}<div class="qv-art">${garment(p.kind, p.fill, p.accent)}</div>
        </div>
        <div class="qv-info">
          <p class="card-cat">${esc(catLabel(p))}</p>
          <h2>${esc(p.name)}</h2>
          <p class="price big">${priceHTML(p)}</p>
          <p class="blurb">${esc(p.blurb)}</p>
          <fieldset class="sizes">
            <legend>Select size</legend>
            <div class="size-opts">
              ${p.sizes.map((s, i) => `
                <input type="radio" name="qvSize" id="qv-${p.id}-${i}" value="${esc(s)}">
                <label for="qv-${p.id}-${i}">${esc(s)}</label>`).join('')}
            </div>
            <p class="size-error" id="sizeError" hidden>Please choose a size to continue.</p>
          </fieldset>
          <div class="qv-actions">
            <button type="button" class="btn btn-ink" data-qv-add="${p.id}">Add to bag</button>
            <button type="button" class="btn btn-line${inWish ? ' is-on' : ''}" data-wish="${p.id}" aria-pressed="${inWish}">Wishlist</button>
          </div>
        </div>
      </div>`;
    openDialog($('#quickView'));
  }

  function handleQuickViewAdd(id) {
    const dlg = $('#quickView');
    const selected = dlg.querySelector('input[name="qvSize"]:checked');
    const error = dlg.querySelector('#sizeError');
    if (!selected) {
      if (error) error.hidden = false;
      return;
    }
    if (error) error.hidden = true;
    addToCart(id, selected.value);
    closeDialog(dlg);
  }

  function openCheckout() {
    if (!cart.length) {
      toast('Your bag is empty.');
      return;
    }
    const lines = cart.map((l) => {
      const p = byId(l.id);
      return `<li><span>${esc(p.name)} · size ${esc(l.size)} × ${l.qty}</span><span>${money(p.price * l.qty)}</span></li>`;
    }).join('');
    $('#checkoutBody').innerHTML = `
      <div class="demo-banner"><strong>Test checkout.</strong> This is a frontend prototype. No payment is processed and no order is sent.</div>
      <ul class="summary">${lines}</ul>
      <div class="totals"><span>Total</span><span>${money(cartTotal())}</span></div>`;
    closeDrawers();
    openDialog($('#checkoutDialog'));
  }

  function confirmDemoOrder() {
    cart = [];
    persist();
    updateCounts();
    renderCart();
    closeDialog($('#checkoutDialog'));
    toast('Test order confirmed. No payment was taken.');
  }

  function openInfo(key) {
    const info = INFO[key];
    if (!info) return;
    $('#infoTitle').textContent = info.title;
    const body = $('#infoBody');
    body.innerHTML = '';
    info.body.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      body.appendChild(p);
    });
    openDialog($('#infoDialog'));
  }

  /* ---------- Drawers & search ---------- */
  const overlay = $('#overlay');
  const menuToggle = $('#menuToggle');
  const DRAWERS = {
    mobileMenu: $('#mobileMenu'),
    cartDrawer: $('#cartDrawer'),
    wishDrawer: $('#wishDrawer')
  };

  function openDrawer(id) {
    closeDrawers();
    const drawer = DRAWERS[id];
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('show');
    document.body.classList.add('no-scroll');
    if (id === 'mobileMenu') menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDrawers() {
    $$('.drawer.open').forEach((d) => {
      d.classList.remove('open');
      d.setAttribute('aria-hidden', 'true');
    });
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  const searchPanel = $('#searchPanel');
  const searchInput = $('#searchInput');
  const searchToggle = $('#searchToggle');

  function toggleSearch(force) {
    const open = typeof force === 'boolean' ? force : searchPanel.hidden;
    searchPanel.hidden = !open;
    searchToggle.setAttribute('aria-expanded', String(open));
    if (open) searchInput.focus();
  }

  /* ---------- Toasts ---------- */
  function toast(message) {
    const wrap = $('#toasts');
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    wrap.appendChild(el);
    while (wrap.children.length > 3) wrap.firstElementChild.remove();
    setTimeout(() => el.remove(), 2900);
  }

  /* ---------- Hero slider (progress-synced autoplay, swipe, arrows, dots) ---------- */
  const hero = $('.hero');
  const slides = $$('.hero-slide');
  const dots = $$('.hero-dots [data-go]');
  const bar = $('#heroBar');
  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const on = i === current;
      slide.classList.toggle('is-active', on);
      slide.setAttribute('aria-hidden', String(!on));
      slide.toggleAttribute('inert', !on);
    });
    dots.forEach((dot, i) => {
      const on = i === current;
      dot.classList.toggle('is-active', on);
      dot.setAttribute('aria-selected', String(on));
    });
    restartProgress();
  }

  function restartProgress() {
    bar.classList.remove('run');
    if (reduceMotion) return;
    void bar.offsetWidth; // restart the CSS animation
    bar.classList.add('run');
  }

  function setPaused(paused) {
    hero.classList.toggle('paused', paused);
  }

  /* ---------- Best sellers carousel ---------- */
  function scrollCarousel(dir) {
    const track = $('#bestTrack');
    const card = track.querySelector('.card');
    const step = card ? card.parentElement.offsetWidth + 18 : 300;
    track.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function bindCarouselDrag() {
    const track = $('#bestTrack');
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) {
        moved = true;
        track.classList.add('dragging');
      }
      track.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('dragging');
      if (moved) {
        // Swallow the click that follows a drag, then clear the flag.
        track.dataset.justDragged = '1';
        setTimeout(() => { delete track.dataset.justDragged; }, 300);
      }
    });
    track.addEventListener('click', (e) => {
      if (track.dataset.justDragged) {
        e.preventDefault();
        e.stopPropagation();
        delete track.dataset.justDragged;
      }
    }, true);
  }

  /* ---------- Newsletter forms ---------- */
  function bindNewsletter(form) {
    const input = form.querySelector('input[type="email"]');
    const msg = form.querySelector('.form-msg');
    if (!input || !msg) return;

    input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      msg.textContent = '';
      msg.className = 'form-msg';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value.trim();
      if (!EMAIL_RE.test(value)) {
        input.setAttribute('aria-invalid', 'true');
        msg.textContent = 'Please enter a valid email address, for example name@example.com.';
        msg.className = 'form-msg error';
        input.focus();
        return;
      }
      input.value = '';
      msg.textContent = 'Thank you for subscribing. (Nothing is stored.)';
      msg.className = 'form-msg success';
      toast('Subscribed. Welcome to AL NOOR CLOTHING.');
    });
  }

  /* ---------- Cursor spotlight on product cards (mouse only) ---------- */
  function bindSpotlight() {
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------- Event wiring ---------- */
  function bindEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      const catLink = target.closest('[data-cat-link]');
      if (catLink) {
        e.preventDefault();
        setFilter(catLink.dataset.catLink);
        closeDrawers();
        const section = $('#new-arrivals');
        if (section) section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }

      const seg = target.closest('[data-filter]');
      if (seg) {
        setFilter(seg.dataset.filter);
        return;
      }

      const wishBtn = target.closest('[data-wish]');
      if (wishBtn) {
        toggleWish(wishBtn.dataset.wish);
        return;
      }

      const quickBtn = target.closest('[data-quick]');
      if (quickBtn) {
        openQuickView(quickBtn.dataset.quick);
        return;
      }

      const addBtn = target.closest('[data-add]');
      if (addBtn) {
        const p = byId(addBtn.dataset.add);
        if (p) addToCart(p.id, p.sizes[0]);
        return;
      }

      const qvAdd = target.closest('[data-qv-add]');
      if (qvAdd) {
        handleQuickViewAdd(qvAdd.dataset.qvAdd);
        return;
      }

      const qtyBtn = target.closest('[data-qty]');
      if (qtyBtn) {
        changeQty(qtyBtn.dataset.key, qtyBtn.dataset.qty === 'inc' ? 1 : -1);
        return;
      }

      const removeBtn = target.closest('[data-remove]');
      if (removeBtn) {
        removeLine(removeBtn.dataset.remove);
        return;
      }

      const goBtn = target.closest('[data-go]');
      if (goBtn) {
        showSlide(Number(goBtn.dataset.go));
        return;
      }

      const infoBtn = target.closest('[data-info]');
      if (infoBtn) {
        openInfo(infoBtn.dataset.info);
        return;
      }

      const toastBtn = target.closest('[data-toast]');
      if (toastBtn) {
        toast(toastBtn.dataset.toast);
        return;
      }

      const closeDrawerBtn = target.closest('[data-close-drawer]');
      if (closeDrawerBtn) {
        closeDrawers();
        return;
      }

      const closeDialogBtn = target.closest('[data-close-dialog]');
      if (closeDialogBtn) {
        const dlg = closeDialogBtn.closest('dialog');
        closeDialog(dlg);
        if (dlg && dlg.id === 'checkoutDialog' && closeDialogBtn.textContent.trim() === 'Back to bag') {
          openDrawer('cartDrawer');
        }
      }
    });

    $('#bagBtn').addEventListener('click', () => openDrawer('cartDrawer'));
    $('#bnBag').addEventListener('click', () => openDrawer('cartDrawer'));
    $('#wishlistBtn').addEventListener('click', () => openDrawer('wishDrawer'));
    $('#bnWish').addEventListener('click', () => openDrawer('wishDrawer'));
    $('#accountBtn').addEventListener('click', () => toast('Accounts coming soon.'));
    $('#bnAccount').addEventListener('click', () => toast('Accounts coming soon.'));
    menuToggle.addEventListener('click', () => openDrawer('mobileMenu'));
    overlay.addEventListener('click', closeDrawers);
    $('#checkoutBtn').addEventListener('click', openCheckout);
    $('#confirmDemo').addEventListener('click', confirmDemoOrder);

    searchToggle.addEventListener('click', () => toggleSearch());
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value.trim().toLowerCase();
      renderGrid();
    });
    $('#searchForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const section = $('#new-arrivals');
      if (section) section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });

    $('#sortSelect').addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderGrid();
    });

    $('#heroPrev').addEventListener('click', () => showSlide(current - 1));
    $('#heroNext').addEventListener('click', () => showSlide(current + 1));
    $('#bestPrev').addEventListener('click', () => scrollCarousel(-1));
    $('#bestNext').addEventListener('click', () => scrollCarousel(1));

    // Autoplay: the progress bar's end drives the next slide. Pause on hover or focus.
    bar.addEventListener('animationend', () => {
      if (!hero.classList.contains('paused')) showSlide(current + 1);
    });
    hero.addEventListener('mouseenter', () => setPaused(true));
    hero.addEventListener('mouseleave', () => setPaused(false));
    hero.addEventListener('focusin', () => setPaused(true));
    hero.addEventListener('focusout', () => setPaused(false));

    let touchStartX = null;
    hero.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    hero.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) showSlide(current + (dx < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });

    ['quickView', 'checkoutDialog', 'infoDialog'].forEach((id) => {
      const dlg = document.getElementById(id);
      if (!dlg) return;
      dlg.addEventListener('click', (e) => {
        if (e.target === dlg) closeDialog(dlg);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      closeDrawers();
      if (!searchPanel.hidden) toggleSearch(false);
    });

    const header = $('#siteHeader');
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* ---------- Init ---------- */
  function init() {
    paintArt();
    $$('.js-newsletter').forEach(bindNewsletter);
    renderGrid();
    renderBest();
    renderCart();
    renderWish();
    updateCounts();
    showSlide(0);
    observeReveals();
    bindCarouselDrag();
    bindSpotlight();
    bindEvents();
  }

  init();
})();
