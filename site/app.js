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
  const LOGOS = {
    'Kindred Bravely': '/logos/kindred-bravely.png', 'Legendairy Milk': '/logos/legendairy-milk.png', 'Smithey Ironware': '/logos/smithey.png', 'Xero Shoes': '/logos/xero-shoes.png',
    'Mars Men': '/logos/mars-men.png', 'Primals': '/logos/primals.png', 'Scandi Gum': '/logos/scandi-gum.png',
    'KittySupps': '/logos/kittysupps.png', 'Tradesman Nutrition': '/logos/tradesman-nutrition.png', 'Blissal': '/logos/blissal.png', 'The Odorless Cat': '/logos/the-odorless-cat.png',
    'Hello Klean': '/logos/hello-klean.png', 'Uromend': '/logos/uromend.png', 'Nero': '/logos/nero.png', 'Purely Nutrient': '/logos/purely-nutrient.png', 'Mirelia': '/logos/mirelia.png',
    'Deutsches Gesundheits Journal': '/logos/dgj.png', 'Tasty Dose': '/logos/tasty-dose.png', 'Ryer': '/logos/ryer.png', 'Vusilia': '/logos/vusilia.png', 'Fairment': '/logos/fairment.png',
    'Dr. Müller': '/logos/dr-mueller.png', 'Veluna': '/logos/veluna.png', 'TryMoin': '/logos/trymoin.png', 'TryJello': '/logos/tryjello.png', 'The Better Cat': '/logos/the-better-cat.png',
    "Men's Best Basics": '/logos/mens-best.png', 'GOTYU': '/logos/gotyu.png', 'Noreno': '/logos/noreno.png', 'Cozy Heaven': '/logos/cozy-heaven.png', 'Kuro': '/logos/kuro-heart.png', 'Ketorvex': '/logos/ketorvex.png', 'Elvetta': '/logos/elvetta.png', 'Ilyra': '/logos/ilyra.png' };
  // Video ads (Gumlet): the card shows the poster with a play badge, the popup plays the Gumlet player
  const PLAY = '<span class="play-badge" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></span>';
  const embedURL = u => u + (u.includes('?') ? '&' : '?') + 'autoplay=true&preload=true&loop=false';
  const avatar = a => {
    const src = a.brand_logo_url || LOGOS[a.brand_name];
    return src ? `<img class="avatar" src="${esc(src)}" alt="${esc(a.brand_name)} logo">`
      : `<span class="avatar" style="background:${color(a.brand_name)}">${esc(initials(a.brand_name))}</span>`;
  };

  function cardHTML(a, i) {
    const first = (a.primary_text || '').split('\n')[0];
    const head = `<div class="post-head">${avatar(a)}
        <span><span class="post-brand">${esc(a.brand_name)}</span><br><span class="post-sponsored">Sponsored</span></span></div>
      <p class="post-text">${esc(first)}</p>`;
    const foot = `<div class="post-foot"><div class="meta"><div class="post-domain">${esc(a.brand_domain)}</div><div class="post-headline">${esc(a.headline)}</div></div><span class="post-cta">${esc(a.cta)}</span></div>`;
    const ar = String(a.aspect_ratio).replace(':', '/');
    const img = `<img src="${esc(a.poster_url || a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}" loading="${i < 8 ? 'eager' : 'lazy'}">`;
    // video card: the video plays right in the card; the rest of the card (text, head, foot) opens the popup with the full copy
    if (a.video_embed) return `<div class="ad-card is-video" data-slug="${esc(a.slug)}" style="animation-delay:${Math.min(i, 12) * 60}ms" tabindex="0" role="group" aria-label="${esc(a.brand_name)}: ${esc(a.headline)}. Open ad details">
      ${head}
      <button type="button" class="post-media play-inline" data-play style="aspect-ratio:${ar}" aria-label="Play the ${esc(a.brand_name)} video here">${img}${PLAY}</button>
      ${foot}
    </div>`;
    return `<button class="ad-card" data-slug="${esc(a.slug)}" style="animation-delay:${Math.min(i, 12) * 60}ms" aria-label="${esc(a.brand_name)}: ${esc(a.headline)}. Open ad details">
      ${head}
      <div class="post-media" style="aspect-ratio:${ar}">${img}</div>
      ${foot}
    </button>`;
  }
  // inline video: swap the poster for the Gumlet player (sound on, the click allows it); only one plays at a time
  const inlineURL = u => u + (u.includes('?') ? '&' : '?') + 'autoplay=true&preload=true&loop=false&muted=false';
  function stopInline(root) {
    (root || document).querySelectorAll('.play-inline.playing').forEach(m => {
      const a = ADS.find(x => x.slug === m.closest('.ad-card').dataset.slug);
      m.classList.remove('playing');
      m.innerHTML = `<img src="${esc(a.poster_url || a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}">${PLAY}`;
    });
  }
  function playInline(m) {
    if (m.classList.contains('playing')) return;
    stopInline();
    mountGumlet(m, ADS.find(x => x.slug === m.closest('.ad-card').dataset.slug));
  }
  // puts the Gumlet player into el (portfolio card media or homepage carousel card) and turns the sound on
  function mountGumlet(el, a) {
    el.classList.add('playing');
    el.innerHTML = `<iframe src="${esc(inlineURL(a.video_embed))}" title="${esc(a.brand_name)} video ad" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
    const fr = el.querySelector('iframe');
    // Gumlet always autoplays muted: once playback has started, turn the sound on (player.js API; the click allows it).
    // Unmuting right at "ready" is too early (autoplay mutes again), so it waits for "play" and retries a few times.
    const send = (method, value) => fr.contentWindow && fr.contentWindow.postMessage(JSON.stringify({ context: 'player.js', version: '0.0.11', method, value }), '*');
    const unmute = () => { if (!fr.isConnected) return; send('unmute'); send('setVolume', 100); };
    const onMsg = e => {
      if (!fr.isConnected) { removeEventListener('message', onMsg); return; }
      if (e.source !== fr.contentWindow) return;
      let d = e.data; try { if (typeof d === 'string') d = JSON.parse(d); } catch (_) { return; }
      if (!d || d.context !== 'player.js') return;
      if (d.event === 'ready') { send('addEventListener', 'play'); [700, 1600, 3000].forEach(t => setTimeout(unmute, t)); }
      if (d.event === 'play') { unmute(); setTimeout(unmute, 300); removeEventListener('message', onMsg); }
    };
    addEventListener('message', onMsg);
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
    modal.querySelectorAll('.post iframe').forEach(f => f.remove()); // stop a playing video
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
      <div class="post-media" style="aspect-ratio:${String(a.aspect_ratio).replace(':', '/')}">${a.video_embed
        ? `<iframe src="${esc(embedURL(a.video_embed))}" title="${esc(a.brand_name)} video ad" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`
        : `<img src="${esc(a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}">`}</div>
      <div class="post-foot"><div class="meta"><div class="post-domain">${esc(a.brand_domain)}</div><div class="post-headline" style="white-space:normal">${esc(a.headline)}</div><div class="post-sponsored">${esc(a.description)}</div></div><span class="post-cta">${esc(a.cta)}</span></div>`;
    modal.querySelector('.details-body').innerHTML = `
      <h2 id="ad-title">${esc(a.brand_name)}</h2>
      <p class="product">${esc(a.product)}</p>
      <dl class="facts">
        <dt>Niche</dt><dd>${esc(a.niche)}</dd>
        <dt>Format</dt><dd>${esc(cap(a.ad_type))}</dd>
        <dt>Awareness stage</dt><dd>${esc(STAGES[a.awareness_stage] || a.awareness_stage)}</dd>
        <dt>Size</dt><dd>${esc(a.aspect_ratio)}</dd>
      </dl>`;
    modal.querySelector('.pos').textContent = `${modalIdx + 1} / ${modalList.length}`;
    // the Gumlet player takes focus when it loads, which would swallow Escape and the arrow keys: hand focus back
    const fr = modal.querySelector('.post iframe');
    if (fr) fr.addEventListener('load', () => [300, 1200].forEach(t => setTimeout(() => {
      if (document.activeElement === fr) modal.querySelector('[data-close]').focus({ preventScroll: true });
    }, t)));
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
    el.addEventListener('click', e => {
      const m = e.target.closest('[data-play]'); if (m) { playInline(m); return; }
      const c = e.target.closest('.ad-card'); if (c) { stopInline(); openAd(c.dataset.slug, getList()); }
    });
    el.addEventListener('keydown', e => {
      const c = e.target.classList && e.target.classList.contains('is-video') ? e.target : null;
      if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); stopInline(); openAd(c.dataset.slug, getList()); }
    });
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
  // The video ads fill it (9:16 cards); the center card plays its video in place. With fewer than 5 videos the 4:5 statics fill it.
  const reel = document.getElementById('reel');
  if (reel) {
    // all videos; English ones first (the site is in English), otherwise file order
    const vids = ADS.filter(a => a.format === 'video' && a.video_embed).map((a, i) => [a, i])
      .sort((x, y) => (x[0].language === 'en' ? 0 : 1) - (y[0].language === 'en' ? 0 : 1) || x[1] - y[1]).map(x => x[0]);
    const isVid = vids.length >= 5;
    const list = isVid ? vids : ADS.filter(a => a.aspect_ratio === '4:5').slice(0, 14);
    const track = reel.querySelector('.reel-track');
    if (isVid) track.classList.add('videos');
    const poster = a => `<img src="${esc(a.poster_url || a.media)}" alt="${esc(a.brand_name)} ad: ${esc(a.ad_type)}" loading="lazy">${isVid ? PLAY : ''}`;
    // endless loop: the list sits in the track three times; when you scroll far into an outer copy,
    // the track jumps back by exactly one copy, which looks the same, so you can scroll forever either way
    // (video cards are divs, not buttons, because the player iframe goes inside them)
    const tag = isVid ? 'div' : 'button';
    const one = copy => list.map(a => `<${tag} class="reel-card${isVid ? ' is-video' : ''}" data-slug="${esc(a.slug)}"${isVid ? ' role="button"' : ''}${copy === 1 ? (isVid ? ' tabindex="0"' : '') : ' tabindex="-1" aria-hidden="true"'} aria-label="${esc(a.brand_name)}: ${esc(a.headline)}${isVid ? '. Play video' : ''}">
      ${poster(a)}</${tag}>`).join('');
    // a playing card that leaves the center goes back to its poster
    const stopCard = c => { const a = ADS.find(x => x.slug === c.dataset.slug); c.classList.remove('playing'); c.innerHTML = poster(a); };
    track.innerHTML = one(0) + one(1) + one(2);
    const cards = [...track.children], n = list.length;
    const setW = () => cards[n].offsetLeft - cards[0].offsetLeft;
    const wrap = () => {
      const sw = setW(), pos = track.scrollLeft;
      if (pos < sw) track.scrollLeft = pos + sw;
      else if (pos >= sw * 2) track.scrollLeft = pos - sw;
    };
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
        if (Math.abs(d) >= 0.5 && c.classList.contains('playing')) stopCard(c);
      });
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
    // wrap once the scroll comes to rest (never mid-swipe, so momentum and snapping stay smooth)
    // snapping is done here, not with CSS scroll-snap: Chrome re-snaps to the card it remembered and would undo the loop jump
    let idle = 0, touching = false;
    const nearest = () => { const m = track.scrollLeft + track.clientWidth / 2; return cards.reduce((b, c) => Math.abs(c.offsetLeft + c.offsetWidth / 2 - m) < Math.abs(b.offsetLeft + b.offsetWidth / 2 - m) ? c : b, cards[0]); };
    let aim = null; // the card a tap/click is sliding to; settle() keeps going there instead of snapping back
    const settle = () => {
      if (drag || touching) return;
      if (aim) { const t = aim.offsetLeft - (track.clientWidth - aim.clientWidth) / 2; if (Math.abs(track.scrollLeft - t) > 1) return; aim = null; }
      wrap();
      const c = nearest(), target = c.offsetLeft - (track.clientWidth - c.clientWidth) / 2;
      if (Math.abs(track.scrollLeft - target) > 1) track.scrollTo({ left: target, behavior: 'smooth' });
      paint();
    };
    // touch: a real finger moves a little during a tap. Past ~15 px the browser treats it as a tiny swipe and sends no
    // click, so the carousel used to snap back to the old card. A short touch that barely moves counts as a tap here.
    let tap = null, tapAt = 0;
    track.addEventListener('touchstart', e => {
      touching = true; aim = null;
      const t = e.touches[0]; tap = e.touches.length === 1 ? { x: t.clientX, y: t.clientY, dx: 0, dy: 0, at: Date.now(), card: e.target.closest('.reel-card') } : null;
    }, { passive: true });
    track.addEventListener('touchmove', e => { if (tap) { const t = e.touches[0]; tap.dx = t.clientX - tap.x; tap.dy = t.clientY - tap.y; } }, { passive: true });
    track.addEventListener('touchend', () => {
      touching = false; clearTimeout(idle);
      const t = tap; tap = null;
      if (t && t.card && Math.hypot(t.dx, t.dy) < 30 && Date.now() - t.at < 500 && !t.card.querySelector('iframe')) {
        tapAt = Date.now();
        if (!t.card.classList.contains('is-center')) centerOn(t.card); else play(t.card);
        return;
      }
      idle = setTimeout(settle, 200);
    }, { passive: true });
    track.addEventListener('scroll', () => {
      queue();
      if (!('onscrollend' in window)) { clearTimeout(idle); idle = setTimeout(settle, 160); }
    }, { passive: true });
    track.addEventListener('scrollend', settle);
    addEventListener('resize', queue);
    // start in the middle copy so cards show on both sides
    requestAnimationFrame(() => { const c = cards[n + Math.floor(n / 2)]; track.scrollLeft = c.offsetLeft - (track.clientWidth - c.clientWidth) / 2; paint(); });
    // a side card slides to the center; the center card does nothing
    const centerOn = c => { aim = c; setTimeout(() => { if (aim === c) aim = null; }, 1500); track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.clientWidth) / 2, behavior: 'smooth' }); };
    // mouse drag on desktop: grab and swipe left or right, then snap to the nearest card
    let drag = null, moved = false;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, id: e.pointerId }; moved = false; aim = null;
      track.classList.add('dragging');
    });
    addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = drag.left - dx;
      // long drags wrap too: shift the drag origin by the same copy width
      const sw = setW(), pos = track.scrollLeft;
      if (pos < sw) { drag.left += sw; track.scrollLeft = pos + sw; }
      else if (pos >= sw * 2) { drag.left -= sw; track.scrollLeft = pos - sw; }
    });
    const endDrag = () => {
      if (!drag) return;
      drag = null; track.classList.remove('dragging');
      // snap: the card closest to the middle slides to the center
      centerOn(nearest());
    };
    addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
    track.addEventListener('dragstart', e => e.preventDefault());
    // a video card in the center plays in place (sound on); one at a time
    const play = c => {
      if (!c.classList.contains('is-video') || c.classList.contains('playing')) return;
      cards.forEach(x => x !== c && x.classList.contains('playing') && stopCard(x));
      mountGumlet(c, ADS.find(x => x.slug === c.dataset.slug));
    };
    track.addEventListener('click', e => {
      if (moved) { moved = false; return; } // a drag is not a click
      if (Date.now() - tapAt < 700) return; // the touch handler already took this tap
      const c = e.target.closest('.reel-card'); if (!c) return;
      if (!c.classList.contains('is-center')) centerOn(c); else play(c);
    });
    track.addEventListener('keydown', e => {
      const c = e.target.closest && e.target.closest('.reel-card.is-video');
      if (!c || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      if (!c.classList.contains('is-center')) centerOn(c); else play(c);
    });
  }

  // ---------- Homepage statics rows (two marquees, opposite directions) ----------
  const rows = document.querySelectorAll('.marquee[data-row]');
  if (rows.length) {
    const used = new Set(reel ? [...reel.querySelectorAll('.reel-card')].map(c => c.dataset.slug) : []);
    const pool = ADS.filter(a => !used.has(a.slug) && a.format !== 'video');
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
    const state = { tab: 'all', lang: 'all', q: '', rand: null, f: { niche: new Set(), ad_type: new Set(), format: new Set(), awareness_stage: new Set(), brand_name: new Set(), language: new Set() } };
    const FILTERS = [
      ['niche', 'Niche', v => v],
      ['ad_type', 'Format', v => cap(v)],
      ['awareness_stage', 'Awareness stage', v => STAGES[v] || v],
      ['brand_name', 'Brand', v => v],
      ['language', 'Language', v => LANGS[v] || v],
    ];
    // Tabs: only formats that have ads
    const tabsEl = document.getElementById('tabs');
    const tabDefs = [['all', 'All', ADS.length], ['image', 'Statics'], ['video', 'Videos'], ['carousel', 'Carousels']]
      .map(([k, l, n]) => [k, l, n ?? ADS.filter(a => a.format === k).length]).filter(([k, , n]) => k === 'all' || n > 0);
    tabsEl.innerHTML = tabDefs.map(([k, l]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${k === 'all'}">${l}</button>`).join('');
    tabsEl.addEventListener('click', e => { const t = e.target.closest('.tab'); if (!t) return; state.tab = t.dataset.tab; tabsEl.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x === t)); render(); });

    // Filter chips: only filters with 2+ values
    const chipsEl = document.getElementById('chips');
    const chevron = '<svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m1 1.5 5 5 5-5"/></svg>';
    // Language has its own switch (All languages / English / German), always shown
    const langEl = document.getElementById('langs');
    // phones show EN / DE so both toggles fit side by side
    const langDefs = [['all', 'All<span class="wide"> languages</span>', ADS.length], ['en', '<span class="full">English</span><span class="short">EN</span>'], ['de', '<span class="full">German</span><span class="short">DE</span>']]
      .map(([k, l, n]) => [k, l, n ?? ADS.filter(a => a.language === k).length]);
    langEl.innerHTML = langDefs.map(([k, l, n]) => `<button class="tab" role="tab" data-lang="${k}" aria-selected="${k === 'all'}"${n ? '' : ' disabled'}>${l}</button>`).join('');
    langEl.addEventListener('click', e => { const t = e.target.closest('.tab'); if (!t || t.disabled) return; state.lang = t.dataset.lang; langEl.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x === t)); render(); });

    const active = FILTERS.filter(([k]) => k !== 'language' && new Set(ADS.map(a => a[k])).size > 1);
    chipsEl.innerHTML = active.map(([k, label, fmt]) => {
      let vals = [...new Set(ADS.map(a => a[k]))];
      vals.sort(k === 'awareness_stage' ? (x, y) => STAGE_ORDER.indexOf(x) - STAGE_ORDER.indexOf(y) : (x, y) => fmt(x).localeCompare(fmt(y)));
      return `<div class="chip-wrap"><button class="chip" data-chip="${k}" aria-expanded="false" aria-haspopup="true">${label}<span class="n" hidden></span>${chevron}</button>
        <div class="pop" hidden data-pop="${k}">${vals.map(v => `<label><input type="checkbox" value="${esc(v)}" data-f="${k}">${esc(fmt(v))}<span class="c">${ADS.filter(a => a[k] === v).length}</span></label>`).join('')}</div></div>`;
    }).join('') + `<button class="clear" id="clear-all" hidden>Clear all</button>`;
    chipsEl.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (chip && narrow.matches) { closePops(); openSheet(chip.dataset.chip); e.stopPropagation(); return; }
      if (chip) {
        const pop = chip.nextElementSibling, open = pop.hidden;
        closePops(); pop.hidden = !open; chip.setAttribute('aria-expanded', open);
        if (open) placePop(chip, pop);
        e.stopPropagation();
      }
      if (e.target.id === 'clear-all') clearAll();
    });
    chipsEl.addEventListener('change', e => {
      const i = e.target; if (!i.dataset.f) return;
      i.checked ? state.f[i.dataset.f].add(i.value) : state.f[i.dataset.f].delete(i.value);
      render();
    });
    // the list opens under its button but never past the screen edges (fixed position, so the chip row can scroll sideways)
    function placePop(chip, pop) {
      const r = chip.getBoundingClientRect(), vw = document.documentElement.clientWidth, w = Math.min(pop.offsetWidth, vw - 16);
      pop.style.left = Math.max(8, Math.min(r.left, vw - w - 8)) + 'px';
      pop.style.top = (r.bottom + 8) + 'px';
      pop.style.maxHeight = Math.max(160, Math.min(380, innerHeight - r.bottom - 20)) + 'px';
    }
    // keep an open list under its button while the page or the chip row scrolls (phones fire scroll when the browser bar moves)
    const follow = () => { const pop = chipsEl.querySelector('.pop:not([hidden])'); if (pop) placePop(pop.previousElementSibling, pop); };
    addEventListener('scroll', follow, { passive: true });
    addEventListener('resize', follow);
    chipsEl.addEventListener('scroll', follow, { passive: true });
    function closePops() { chipsEl.querySelectorAll('.pop').forEach(p => p.hidden = true); chipsEl.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-expanded', 'false')); }
    document.addEventListener('click', e => { if (!e.target.closest('.chip-wrap')) closePops(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') closePops(); });
    // ---------- Phone bottom sheet (copy of the dashboard's BottomSheet) ----------
    // Covers the page, a tap outside or "Done" closes it, swipe down closes it, the page behind does not scroll,
    // rows are sized for a thumb. Picks apply right away, like the desktop list.
    const narrow = matchMedia('(max-width: 639px)');
    const sheet = document.createElement('div');
    sheet.className = 'sheet'; sheet.hidden = true;
    sheet.innerHTML = `<div class="sheet-scrim" data-sheet-close></div>
      <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div class="sheet-grip" aria-hidden="true"></div>
        <div class="sheet-head"><h4 id="sheet-title"></h4><div class="sheet-actions"><button type="button" class="sheet-clear">Clear</button><button type="button" class="sheet-done" data-sheet-close>Done</button></div></div>
        <div class="sheet-body"></div>
      </div>`;
    document.body.appendChild(sheet);
    const sheetPanel = sheet.querySelector('.sheet-panel'), sheetBody = sheet.querySelector('.sheet-body');
    let sheetKey = null, prevOverflow = '';
    function openSheet(k) {
      sheetKey = k;
      const [, label, fmt] = FILTERS.find(f => f[0] === k);
      let vals = [...new Set(ADS.map(a => a[k]))];
      vals.sort(k === 'awareness_stage' ? (x, y) => STAGE_ORDER.indexOf(x) - STAGE_ORDER.indexOf(y) : (x, y) => fmt(x).localeCompare(fmt(y)));
      sheet.querySelector('#sheet-title').textContent = label;
      sheetBody.innerHTML = vals.map(v => `<label class="sheet-row"><span>${esc(fmt(v))}</span><span class="c">${ADS.filter(a => a[k] === v).length}</span><input type="checkbox" value="${esc(v)}"${state.f[k].has(v) ? ' checked' : ''}></label>`).join('');
      sheetBody.scrollTop = 0;
      prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add('open'));
    }
    function closeSheet() {
      if (sheet.hidden) return;
      sheet.classList.remove('open'); sheetPanel.style.transform = '';
      document.body.style.overflow = prevOverflow;
      setTimeout(() => { sheet.hidden = true; }, 160);
      sheetKey = null;
    }
    sheet.addEventListener('click', e => {
      if (e.target.closest('[data-sheet-close]')) closeSheet();
      if (e.target.closest('.sheet-clear') && sheetKey) { state.f[sheetKey].clear(); sheetBody.querySelectorAll('input').forEach(i => i.checked = false); render(); }
    });
    sheetBody.addEventListener('change', e => {
      const i = e.target; if (!sheetKey || i.type !== 'checkbox') return;
      i.checked ? state.f[sheetKey].add(i.value) : state.f[sheetKey].delete(i.value);
      render();
    });
    addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
    narrow.addEventListener('change', () => { if (!narrow.matches) closeSheet(); });
    // swipe down to close; only starts when the list is scrolled to the top, so it never fights scrolling the list
    let sy = null, dy = 0;
    sheetPanel.addEventListener('touchstart', e => { sy = sheetBody.scrollTop > 0 && sheetBody.contains(e.target) ? null : e.touches[0].clientY; dy = 0; }, { passive: true });
    sheetPanel.addEventListener('touchmove', e => { if (sy === null) return; dy = Math.max(0, e.touches[0].clientY - sy); sheetPanel.style.transition = 'none'; sheetPanel.style.transform = dy ? `translateY(${dy}px)` : ''; }, { passive: true });
    const endSwipe = () => { if (sy === null) return; sy = null; sheetPanel.style.transition = ''; if (dy > 90) closeSheet(); else sheetPanel.style.transform = ''; dy = 0; };
    sheetPanel.addEventListener('touchend', endSwipe, { passive: true }); sheetPanel.addEventListener('touchcancel', endSwipe, { passive: true });

    function clearAll() {
      Object.values(state.f).forEach(s => s.clear()); state.q = ''; document.getElementById('q').value = '';
      state.lang = 'all'; langEl.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x.dataset.lang === 'all'));
      chipsEl.querySelectorAll('input').forEach(i => i.checked = false); render();
    }
    document.getElementById('q').addEventListener('input', e => { state.q = e.target.value.trim().toLowerCase(); render(); });
    // Shuffle: every click deals the ads in a new random order (filters still apply)
    document.getElementById('shuffle').addEventListener('click', () => {
      state.rand = new Map(ADS.map(a => [a.slug, Math.random()]));
      render();
    });

    function current() {
      let list = ADS.filter(a => (state.tab === 'all' || a.format === state.tab)
        && (state.lang === 'all' || a.language === state.lang)
        && Object.entries(state.f).every(([k, s]) => !s.size || s.has(a[k]))
        && (!state.q || [a.brand_name, a.product, a.niche, a.ad_type, a.headline, a.primary_text].join(' ').toLowerCase().includes(state.q)));
      if (state.rand) list = list.slice().sort((x, y) => state.rand.get(x.slug) - state.rand.get(y.slug));
      else list = list.slice().sort((x, y) => (x.rank ?? 9999) - (y.rank ?? 9999)); // best ads first (rank set from the quality scores), solid ones at the end
      return list;
    }
    const empty = document.getElementById('empty');
    const draw = bindLayout(lib, current);
    function render() {
      const list = current();
      const nFilters = Object.values(state.f).reduce((n, s) => n + s.size, 0);
      chipsEl.querySelectorAll('input[data-f]').forEach(i => { i.checked = state.f[i.dataset.f].has(i.value); });
      chipsEl.querySelectorAll('.chip').forEach(c => { const n = state.f[c.dataset.chip].size; const b = c.querySelector('.n'); b.hidden = !n; b.textContent = n; c.classList.toggle('active', !!n); });
      document.getElementById('clear-all').hidden = !(nFilters || state.q || state.lang !== 'all');
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
