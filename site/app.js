(function () {
  const ADS = (window.ADS || []).slice();
  const STAGES = { unaware: 'Unaware', problem_aware: 'Problem aware', solution_aware: 'Solution aware', product_aware: 'Product aware', most_aware: 'Most aware' };
  const STAGE_ORDER = Object.keys(STAGES);
  const FORMATS = { image: 'Static', video: 'Video', carousel: 'Carousel' };
  const LANGS = { en: 'English', de: 'German' };
  const AVATAR = ['#1F6F5C', '#8A3B2E', '#5A3E8C', '#2D5B8F', '#8C6A1F', '#3C6E2E', '#7A2F5B'];
  const brands = [...new Set(ADS.map(a => a.brand_name))].sort();
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const ratio = r => { const [w, h] = String(r || '4:5').split(':').map(Number); return h / w; };
  const initials = n => n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const color = n => AVATAR[brands.indexOf(n) % AVATAR.length];
  // Design phase: logos from each brand's own site. In the build this is portfolio_ads.brand_logo_url.
  const LOGOS = { 'Fussy': '/logos/fussy.svg', 'Kindred Bravely': '/logos/kindred-bravely.png', 'Legendairy Milk': '/logos/legendairy-milk.png', 'Smithey Ironware': '/logos/smithey.png', 'Xero Shoes': '/logos/xero-shoes.png' };
  const avatar = a => {
    const src = a.brand_logo_url || LOGOS[a.brand_name];
    return src ? `<img class="avatar" src="${esc(src)}" alt="${esc(a.brand_name)} logo">`
      : `<span class="avatar" style="background:${color(a.brand_name)}">${esc(initials(a.brand_name))}</span>`;
  };

  function cardHTML(a, i) {
    const first = (a.primary_text || '').split('\n')[0];
    return `<button class="ad-card" data-slug="${esc(a.slug)}" style="animation-delay:${Math.min(i, 12) * 60}ms" aria-label="${esc(a.brand_name)}: ${esc(a.headline)}. Open ad details">
      <div class="post-head">${avatar(a)}
        <span><span class="post-brand">${esc(a.brand_name)}</span><br><span class="post-sponsored">Sponsored</span></span></div>
      <p class="post-text">${esc(first)}</p>
      <div class="post-media" style="aspect-ratio:${String(a.aspect_ratio).replace(':', '/')}"><img src="${esc(a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}" loading="${i < 8 ? 'eager' : 'lazy'}"></div>
      <div class="post-foot"><div class="meta"><div class="post-domain">${esc(a.brand_domain)}</div><div class="post-headline">${esc(a.headline)}</div></div><span class="post-cta">${esc(a.cta)}</span></div>
    </button>`;
  }

  // Masonry: each card goes to the shortest column, so reading order stays left to right
  function layout(el, list) {
    const w = el.clientWidth;
    const n = w > 1100 ? 4 : w > 780 ? 3 : w > 440 ? 2 : 1;
    const cols = Array.from({ length: n }, () => ({ h: 0, html: [] }));
    list.forEach((a, i) => {
      const c = cols.reduce((m, x) => x.h < m.h ? x : m, cols[0]);
      c.html.push(cardHTML(a, i));
      c.h += ratio(a.aspect_ratio) + 0.42;
    });
    el.innerHTML = cols.map(c => `<div class="col">${c.html.join('')}</div>`).join('');
    el.dataset.cols = n;
  }
  function bindLayout(el, getList) {
    let last = 0;
    const run = () => layout(el, getList());
    run();
    addEventListener('resize', () => {
      const w = el.clientWidth;
      const n = w > 1100 ? 4 : w > 780 ? 3 : w > 440 ? 2 : 1;
      if (n !== Number(el.dataset.cols)) run();
    });
    return run;
  }

  // ---------- Modal ----------
  const modal = document.getElementById('ad-modal');
  let modalList = ADS, modalIdx = 0, lastFocus = null;
  function openAd(slug, list) {
    modalList = list || modalList;
    modalIdx = Math.max(0, modalList.findIndex(a => a.slug === slug));
    renderModal();
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('locked');
    history.replaceState(null, '', '#ad=' + encodeURIComponent(modalList[modalIdx].slug));
    modal.querySelector('[data-close]').focus();
  }
  function closeAd() {
    modal.hidden = true;
    document.body.classList.remove('locked');
    history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }
  function step(d) { modalIdx = (modalIdx + d + modalList.length) % modalList.length; renderModal(); history.replaceState(null, '', '#ad=' + encodeURIComponent(modalList[modalIdx].slug)); }
  function renderModal() {
    const a = modalList[modalIdx];
    modal.querySelector('.post').innerHTML = `
      <div class="post-head">${avatar(a)}
        <span><span class="post-brand">${esc(a.brand_name)}</span><br><span class="post-sponsored">Sponsored</span></span></div>
      <div class="post-copy"><p class="post-text clamp" id="pt">${esc(a.primary_text)}</p><button class="more" data-more hidden aria-controls="pt" aria-expanded="false">Show more</button></div>
      <div class="post-media" style="aspect-ratio:${String(a.aspect_ratio).replace(':', '/')}"><img src="${esc(a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}"></div>
      <div class="post-foot"><div class="meta"><div class="post-domain">${esc(a.brand_domain)}</div><div class="post-headline" style="white-space:normal">${esc(a.headline)}</div><div class="post-sponsored">${esc(a.description)}</div></div><span class="post-cta">${esc(a.cta)}</span></div>`;
    modal.querySelector('.details-body').innerHTML = `
      <h2 id="ad-title">${esc(a.brand_name)}</h2>
      <p class="product">${esc(a.product)}</p>
      <dl class="facts">
        <dt>Niche</dt><dd>${esc(a.niche)}</dd>
        <dt>Ad type</dt><dd>${esc(cap(a.ad_type))}</dd>
        <dt>Format</dt><dd>${esc(FORMATS[a.format] || a.format)}</dd>
        <dt>Awareness stage</dt><dd>${esc(STAGES[a.awareness_stage] || a.awareness_stage)}</dd>
        <dt>Size</dt><dd>${esc(a.aspect_ratio)}</dd>
      </dl>`;
    modal.querySelector('.pos').textContent = `${modalIdx + 1} / ${modalList.length}`;
    const pt = modal.querySelector('#pt'), more = modal.querySelector('[data-more]');
    more.hidden = true;
    requestAnimationFrame(() => { more.hidden = pt.scrollHeight <= pt.clientHeight + 1; }); // measure once visible
  }
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target.closest('[data-close]') || e.target.classList.contains('scrim')) closeAd();
      if (e.target.closest('[data-prev]')) step(-1);
      if (e.target.closest('[data-next]')) step(1);
      const mb = e.target.closest('[data-more]');
      if (mb) {
        const open = modal.querySelector('#pt').classList.toggle('clamp') === false;
        mb.textContent = open ? 'Show less' : 'Show more';
        mb.setAttribute('aria-expanded', open);
      }
      const cp = e.target.closest('[data-copy]');
      if (cp) {
        const url = location.href;
        (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => {
          cp.querySelector('span').textContent = 'Link copied';
          setTimeout(() => cp.querySelector('span').textContent = 'Copy link', 1600);
        }).catch(() => {});
      }
    });
    addEventListener('keydown', e => {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeAd();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'Tab') { // keep focus inside the dialog
        const f = [...modal.querySelectorAll('button, a[href]')].filter(x => x.offsetParent);
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }
  function bindCards(el, getList) {
    el.addEventListener('click', e => { const c = e.target.closest('.ad-card'); if (c) openAd(c.dataset.slug, getList()); });
  }

  // ---------- Homepage wall ----------
  const stack = document.getElementById('hero-stack');
  if (stack) {
    const seen = new Set();
    const three = ADS.filter(a => a.aspect_ratio === '4:5' && !seen.has(a.brand_name) && seen.add(a.brand_name)).slice(1, 4);
    stack.innerHTML = three.map(a => `<img src="${esc(a.media)}" alt="">`).join('');
  }
  const wall = document.getElementById('wall');
  if (wall) {
    const pick = ADS.filter(a => a.aspect_ratio !== '9:16').slice(0, 12);
    bindLayout(wall, () => pick);
    bindCards(wall, () => pick);
  }

  // ---------- Homepage reel (Atria-style carousel) ----------
  // Video ads go here once they exist; until then the 4:5 statics fill it.
  const reel = document.getElementById('reel');
  if (reel) {
    const vids = ADS.filter(a => a.format === 'video');
    const list = (vids.length >= 5 ? vids : ADS.filter(a => a.aspect_ratio === '4:5')).slice(0, 14);
    const track = reel.querySelector('.reel-track');
    track.innerHTML = list.map(a => `<button class="reel-card" data-slug="${esc(a.slug)}" aria-label="${esc(a.brand_name)}: ${esc(a.headline)}">
      <img src="${esc(a.poster_url || a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}" loading="lazy"></button>`).join('');
    const cards = [...track.children];
    const S0 = 1.08, R = 0.82, LNR = Math.log(R);
    let raf = 0;
    const paint = () => {
      raf = 0;
      const mid = track.clientWidth / 2, gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      cards.forEach(c => {
        // distance from the center in card steps, from layout (not the transformed box)
        const w = c.offsetWidth, d = (c.offsetLeft - track.scrollLeft + w / 2 - mid) / (w + gap);
        // Atria: cards sit on a gentle curve; the center card is biggest and every step out is smaller again
        const a = Math.abs(d);
        const s = S0 * Math.pow(R, a);
        // pull shrunken cards inward so the gaps stay even (integral of the scale change)
        const I = S0 * (Math.pow(R, a) - 1) / LNR - a;
        const x = Math.sign(d) * w * I;
        c.style.transform = 'translateX(' + x.toFixed(1) + 'px) perspective(1100px) rotateY(' + (Math.max(-1.5, Math.min(1.5, d)) * 6).toFixed(2) + 'deg) scale(' + s.toFixed(3) + ')';
        c.style.zIndex = String(10 - Math.min(9, Math.round(a * 2)));
        c.style.opacity = '1';
        c.classList.toggle('is-center', Math.abs(d) < 0.5);
      });
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
    track.addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    // start in the middle so cards show on both sides
    requestAnimationFrame(() => { const c = cards[Math.floor(cards.length / 2)]; track.scrollLeft = c.offsetLeft - (track.clientWidth - c.clientWidth) / 2; paint(); });
    // a side card slides to the center; the center card does nothing
    const centerOn = c => track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.clientWidth) / 2, behavior: 'smooth' });
    // mouse drag on desktop: grab and swipe left or right, then snap to the nearest card
    let drag = null, moved = false;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, id: e.pointerId }; moved = false;
      track.classList.add('dragging');
    });
    addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = drag.left - dx;
    });
    const endDrag = () => {
      if (!drag) return;
      drag = null; track.classList.remove('dragging');
      // snap: the card closest to the middle slides to the center
      const mid = track.scrollLeft + track.clientWidth / 2;
      const near = cards.reduce((b, c) => Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(b.offsetLeft + b.offsetWidth / 2 - mid) ? c : b, cards[0]);
      centerOn(near);
    };
    addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
    track.addEventListener('dragstart', e => e.preventDefault());
    track.addEventListener('click', e => {
      if (moved) { moved = false; return; } // a drag is not a click
      const c = e.target.closest('.reel-card'); if (c && !c.classList.contains('is-center')) centerOn(c);
    });
  }

  // ---------- Homepage statics rows (two marquees, opposite directions) ----------
  const rows = document.querySelectorAll('.marquee[data-row]');
  if (rows.length) {
    const used = new Set(reel ? [...reel.querySelectorAll('.reel-card')].map(c => c.dataset.slug) : []);
    const pool = ADS.filter(a => !used.has(a.slug));
    const half = Math.ceil(pool.length / 2);
    rows.forEach((row, k) => {
      const items = k === 0 ? pool.slice(0, half) : pool.slice(half);
      // display only: not clickable, no hover effect
      const html = items.map(a => `<div class="mq-card"><img src="${esc(a.media)}" alt="${esc(a.brand_name)} ad" loading="lazy" draggable="false" style="aspect-ratio:${String(a.aspect_ratio).replace(':', '/')}"></div>`).join('');
      row.querySelector('.mq-track').innerHTML = html + html.replace(/<div class="mq-card">/g, '<div class="mq-card" aria-hidden="true">');
    });
  }

  // ---------- Portfolio library ----------
  const lib = document.getElementById('lib');
  if (lib) {
    const state = { tab: 'all', lang: 'all', q: '', sort: 'featured', f: { niche: new Set(), ad_type: new Set(), format: new Set(), awareness_stage: new Set(), brand_name: new Set(), language: new Set() } };
    const FILTERS = [
      ['niche', 'Niche', v => v],
      ['ad_type', 'Ad type', v => cap(v)],
      ['format', 'Format', v => FORMATS[v] || v],
      ['awareness_stage', 'Awareness stage', v => STAGES[v] || v],
      ['brand_name', 'Brand', v => v],
      ['language', 'Language', v => LANGS[v] || v],
    ];
    // Tabs: only formats that have ads
    const tabsEl = document.getElementById('tabs');
    const tabDefs = [['all', 'All', ADS.length], ['image', 'Statics'], ['video', 'Videos'], ['carousel', 'Carousels']]
      .map(([k, l, n]) => [k, l, n ?? ADS.filter(a => a.format === k).length]).filter(([k, , n]) => k === 'all' || n > 0);
    tabsEl.innerHTML = tabDefs.map(([k, l, n]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${k === 'all'}">${l}<span class="count">${n}</span></button>`).join('');
    tabsEl.addEventListener('click', e => { const t = e.target.closest('.tab'); if (!t) return; state.tab = t.dataset.tab; tabsEl.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x === t)); render(); });

    // Filter chips: only filters with 2+ values
    const chipsEl = document.getElementById('chips');
    const chevron = '<svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m1 1.5 5 5 5-5"/></svg>';
    // Language has its own switch (All languages / English / German), always shown
    const langEl = document.getElementById('langs');
    const langDefs = [['all', 'All<span class="wide"> languages</span>', ADS.length], ['en', 'English'], ['de', 'German']]
      .map(([k, l, n]) => [k, l, n ?? ADS.filter(a => a.language === k).length]);
    langEl.innerHTML = langDefs.map(([k, l, n]) => `<button class="tab" role="tab" data-lang="${k}" aria-selected="${k === 'all'}"${n ? '' : ' disabled'}>${l}<span class="count">${n}</span></button>`).join('');
    langEl.addEventListener('click', e => { const t = e.target.closest('.tab'); if (!t || t.disabled) return; state.lang = t.dataset.lang; langEl.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x === t)); render(); });

    const active = FILTERS.filter(([k]) => k !== 'language' && new Set(ADS.map(a => a[k])).size > 1);
    chipsEl.innerHTML = active.map(([k, label, fmt]) => {
      let vals = [...new Set(ADS.map(a => a[k]))];
      vals.sort(k === 'awareness_stage' ? (x, y) => STAGE_ORDER.indexOf(x) - STAGE_ORDER.indexOf(y) : (x, y) => fmt(x).localeCompare(fmt(y)));
      return `<div class="chip-wrap"><button class="chip" data-chip="${k}" aria-expanded="false" aria-haspopup="true">${label}<span class="n" hidden></span>${chevron}</button>
        <div class="pop" hidden data-pop="${k}">${vals.map(v => `<label><input type="checkbox" value="${esc(v)}" data-f="${k}">${esc(fmt(v))}<span class="c">${ADS.filter(a => a[k] === v).length}</span></label>`).join('')}</div></div>`;
    }).join('') + `<button class="clear" id="clear-all" hidden>Clear all</button><span class="result-count" id="count"></span>`;
    chipsEl.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (chip) {
        const pop = chip.nextElementSibling, open = pop.hidden;
        closePops(); pop.hidden = !open; chip.setAttribute('aria-expanded', open);
        e.stopPropagation();
      }
      if (e.target.id === 'clear-all') clearAll();
    });
    chipsEl.addEventListener('change', e => {
      const i = e.target; if (!i.dataset.f) return;
      i.checked ? state.f[i.dataset.f].add(i.value) : state.f[i.dataset.f].delete(i.value);
      render();
    });
    function closePops() { chipsEl.querySelectorAll('.pop').forEach(p => p.hidden = true); chipsEl.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-expanded', 'false')); }
    document.addEventListener('click', e => { if (!e.target.closest('.chip-wrap')) closePops(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') closePops(); });
    function clearAll() {
      Object.values(state.f).forEach(s => s.clear()); state.q = ''; document.getElementById('q').value = '';
      state.lang = 'all'; langEl.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x.dataset.lang === 'all'));
      chipsEl.querySelectorAll('input').forEach(i => i.checked = false); render();
    }
    document.getElementById('q').addEventListener('input', e => { state.q = e.target.value.trim().toLowerCase(); render(); });
    document.getElementById('sort').addEventListener('change', e => { state.sort = e.target.value; render(); });

    function current() {
      let list = ADS.filter(a => (state.tab === 'all' || a.format === state.tab)
        && (state.lang === 'all' || a.language === state.lang)
        && Object.entries(state.f).every(([k, s]) => !s.size || s.has(a[k]))
        && (!state.q || [a.brand_name, a.product, a.niche, a.ad_type, a.headline, a.primary_text].join(' ').toLowerCase().includes(state.q)));
      if (state.sort === 'brand') list = list.slice().sort((x, y) => x.brand_name.localeCompare(y.brand_name) || x.sort_order - y.sort_order);
      if (state.sort === 'newest') list = list.slice().sort((x, y) => y.sort_order - x.sort_order);
      return list;
    }
    const empty = document.getElementById('empty');
    const draw = bindLayout(lib, current);
    function render() {
      const list = current();
      const nFilters = Object.values(state.f).reduce((n, s) => n + s.size, 0);
      chipsEl.querySelectorAll('.chip').forEach(c => { const n = state.f[c.dataset.chip].size; const b = c.querySelector('.n'); b.hidden = !n; b.textContent = n; c.classList.toggle('active', !!n); });
      document.getElementById('clear-all').hidden = !(nFilters || state.q || state.lang !== 'all');
      document.getElementById('count').textContent = `${list.length} ${list.length === 1 ? 'ad' : 'ads'}`;
      empty.hidden = list.length > 0;
      draw();
    }
    bindCards(lib, current);
    empty.querySelector('.clear').addEventListener('click', clearAll);
    render();
    const m = location.hash.match(/^#ad=(.+)$/);
    if (m) openAd(decodeURIComponent(m[1]), ADS);
  }
})();

// Brief parts: open one at a time and swap the preview
(function () {
  const list = document.querySelector('.bp-list'), img = document.getElementById('bp-img');
  if (!list || !img) return;
  const preview = img.parentElement, grid = preview.parentElement, mq = matchMedia('(max-width: 860px)');
  // phones: the preview sits inside the open item, under its text
  const place = () => { const open = list.querySelector('.bp-item.open .bp-body'); if (mq.matches && open) open.appendChild(preview); else if (preview.parentElement !== grid) grid.appendChild(preview); };
  mq.addEventListener('change', place); place();
  list.addEventListener('click', e => {
    const head = e.target.closest('.bp-head'); if (!head) return;
    list.querySelectorAll('.bp-item').forEach(li => { const on = li.contains(head); li.classList.toggle('open', on); li.querySelector('.bp-head').setAttribute('aria-expanded', on); });
    place();
    if (img.getAttribute('src') !== head.dataset.img) {
      img.style.opacity = '0';
      const pre = new Image(); pre.onload = () => { img.src = head.dataset.img; img.alt = head.dataset.alt; img.style.opacity = '1'; img.parentElement.scrollTop = 0; }; pre.src = head.dataset.img;
    }
  });
})();
