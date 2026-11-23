// Font preview for Pascal: open any page with ?fonts to get a switcher. Off for normal visitors.
(function () {
  var KEY = 'ps-font-preview';
  var on = /[?&]fonts\b/.test(location.search);
  try { if (on) localStorage.setItem(KEY, localStorage.getItem(KEY) || '{"i":0,"caps":true}'); else on = !!localStorage.getItem(KEY); } catch (e) {}
  if (!on) return;

  var FONTS = [
    ['Bricolage Grotesque 700 (now)', 'Bricolage Grotesque', 700, null],
    ['Bricolage Grotesque 800', 'Bricolage Grotesque', 800, 'Bricolage+Grotesque:opsz,wght@12..96,800'],
    ['Archivo Black', 'Archivo Black', 400, 'Archivo+Black'],
    ['Inter Tight Black', 'Inter Tight', 900, 'Inter+Tight:wght@900'],
    ['Inter Tight ExtraBold (logo name)', 'Inter Tight', 800, 'Inter+Tight:wght@800'],
    ['Montserrat Black', 'Montserrat', 900, 'Montserrat:wght@900'],
    ['Unbounded ExtraBold', 'Unbounded', 800, 'Unbounded:wght@800'],
    ['Syne ExtraBold', 'Syne', 800, 'Syne:wght@800'],
    ['Anton', 'Anton', 400, 'Anton'],
    ['Big Shoulders Display Black', 'Big Shoulders Display', 900, 'Big+Shoulders+Display:wght@900'],
    ['Goldman Bold (logo mark)', 'Goldman', 700, 'Goldman:wght@700']
  ];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?' + FONTS.filter(function (f) { return f[3]; }).map(function (f) { return 'family=' + f[3]; }).join('&') + '&display=swap';
  document.head.appendChild(link);

  var style = document.createElement('style');
  document.head.appendChild(style);
  var state; try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) { state = { i: 0, caps: true }; }

  var css = '#fp{position:fixed;right:12px;bottom:12px;z-index:200;width:290px;max-width:calc(100vw - 24px);background:#0D1B33;color:#F1F4F8;border:1px solid rgba(255,255,255,.18);border-radius:14px;box-shadow:0 20px 50px -12px rgba(0,0,0,.7);font:500 14px/1.3 "DM Sans",sans-serif}' +
    '#fp .h{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.1);font-weight:700}' +
    '#fp .h button{background:none;border:0;color:#A9B6C8;font:inherit;cursor:pointer;padding:4px 6px}' +
    '#fp .b{max-height:46vh;overflow:auto;padding:6px}' +
    '#fp .o{display:flex;gap:8px;align-items:center;width:100%;text-align:left;background:none;border:0;color:inherit;font:inherit;padding:8px;border-radius:8px;cursor:pointer}' +
    '#fp .o:hover{background:rgba(255,255,255,.07)}#fp .o.on{background:#F2A43A;color:#060C18}' +
    '#fp .n{min-width:1.4em;font-weight:700}' +
    '#fp .f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.1)}' +
    '#fp .f button{flex:1;min-height:36px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:none;color:inherit;font:inherit;cursor:pointer}' +
    '#fp .f button.on{background:#F1F4F8;color:#060C18}' +
    '#fp.min .b,#fp.min .f{display:none}';
  var base = document.createElement('style'); base.textContent = css; document.head.appendChild(base);

  function apply() {
    var f = FONTS[state.i] || FONTS[0];
    style.textContent = ':root{--font-display:"' + f[1] + '",sans-serif}h1,h2,h3{font-weight:' + f[2] + '}' +
      (state.caps ? '' : 'h1,h2{text-transform:none;letter-spacing:-0.03em}');
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    render();
  }
  var panel = document.createElement('div'); panel.id = 'fp';
  function render() {
    panel.innerHTML = '<div class="h">Font preview<span><button data-min>' + (panel.classList.contains('min') ? 'Open' : 'Hide') + '</button><button data-off title="Turn the preview off">Close</button></span></div>' +
      '<div class="b">' + FONTS.map(function (f, i) { return '<button class="o' + (i === state.i ? ' on' : '') + '" data-i="' + i + '"><span class="n">' + (i + 1) + '</span><span style="font-family:\'' + f[1] + '\';font-weight:' + f[2] + ';font-size:16px">' + f[0] + '</span></button>'; }).join('') + '</div>' +
      '<div class="f"><button data-caps="1" class="' + (state.caps ? 'on' : '') + '">ALL CAPS</button><button data-caps="0" class="' + (state.caps ? '' : 'on') + '">Normal case</button></div>';
  }
  panel.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-i')) state.i = +b.getAttribute('data-i');
    if (b.hasAttribute('data-caps')) state.caps = b.getAttribute('data-caps') === '1';
    if (b.hasAttribute('data-min')) { panel.classList.toggle('min'); render(); return; }
    if (b.hasAttribute('data-off')) { try { localStorage.removeItem(KEY); } catch (er) {} location.href = location.pathname; return; }
    apply();
  });
  function mount() { document.body.appendChild(panel); apply(); }
  if (document.body) mount(); else addEventListener('DOMContentLoaded', mount);
})();
