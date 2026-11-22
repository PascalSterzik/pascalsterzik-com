(function () {
  'use strict';
  var ENDPOINT = 'https://brvebfxaexxjghvwyidy.supabase.co/functions/v1/site-inquiry';
  // Booking link (Cal.com, Calendly, ...). Empty = the last screen says Pascal will email a time.
  var BOOKING_URL = '';

  // One question per screen. affirmation = short reaction shown on arrival, {name} = first name.
  var STEPS = [
    { id: 'intro', type: 'intro' },
    { id: 'name', type: 'text', required: true, prompt: "First, what's your name?", placeholder: 'Your name', autocomplete: 'name' },
    { id: 'email', type: 'email', required: true, affirmation: 'Nice to meet you, {name}.', prompt: "What's your email?", helper: 'So I can send you the call details.', placeholder: 'you@yourbrand.com', autocomplete: 'email' },
    { id: 'company', type: 'text', required: true, affirmation: 'Thanks.', prompt: 'What brand or company are you with?', placeholder: 'Brand name or website', autocomplete: 'organization' },
    { id: 'role', type: 'cards', required: true, affirmation: 'Got it.', prompt: 'Which one fits you best?', options: [
      ['I run a brand', 'Founder or marketing team'], ['I work at an agency', 'We run ads for brands'], ["I'm hiring", 'Recruiter or hiring manager']] },
    { id: 'looking_for', type: 'cards', required: true, affirmation: 'Okay.', prompt: 'What are you looking for?', options: [
      ['Full-time creative strategist'], ['Freelance or project work'], ['Not sure yet']] },
    { id: 'monthly_ad_spend', type: 'cards', required: true, affirmation: 'Makes sense.', prompt: 'How much do you spend on ads each month?', options: [
      ['Under $10k'], ['$10k to $50k'], ['$50k to $250k'], ['$250k+'], ["I'd rather not say"]] },
    { id: 'help_with', type: 'multi', required: true, affirmation: 'Good to know.', prompt: 'What do you want help with?', helper: 'Pick all that fit.', options: [
      ['New angles and hooks'], ['Static ads'], ['Video ad scripts and briefs'], ['Creative testing and analysis'], ['A full creative strategy']] },
    { id: 'start_when', type: 'cards', required: true, affirmation: 'Almost done.', prompt: 'When do you want to start?', options: [
      ['Right away'], ['In the next month'], ['In 1 to 3 months'], ['Just looking for now']] },
    { id: 'notes', type: 'textarea', affirmation: 'Last one, {name}.', prompt: 'Anything else I should know?', helper: 'Optional.', placeholder: 'Your current ads, what is working, what is not...' },
  ];

  var stage = document.getElementById('stage'), nav = document.getElementById('book-nav'), next = document.getElementById('next'),
      back = document.getElementById('back'), dots = document.getElementById('dots'), err = document.getElementById('form-error'),
      progress = document.getElementById('progress'), form = document.getElementById('book-form');
  var answers = {}, i = 0, lastShown = {}, sending = false;
  var Q = STEPS.length - 1; // questions after intro

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function first() { return (answers.name || '').trim().split(/\s+/)[0] || ''; }
  function fill(t) { return (t || '').replace('{name}', esc(first())); }

  dots.innerHTML = STEPS.slice(1).map(function () { return '<li></li>'; }).join('') + '<li></li>';
  function paintDots() {
    [].forEach.call(dots.children, function (d, k) { d.className = k < i - 1 ? 'done' : (k === i - 1 ? 'now' : ''); });
    dots.hidden = i === 0;
  }

  function render(dir) {
    var s = STEPS[i];
    err.hidden = true;
    paintDots();
    if (s.type === 'intro') {
      nav.hidden = true;
      stage.innerHTML = '<div class="screen intro"><p class="kicker">Book a call</p><h1>Let\'s talk about your ads</h1>' +
        '<p class="lead">Answer 9 quick questions. It takes about a minute. Then we set up a call.</p>' +
        '<button type="button" class="btn btn-primary btn-big" id="start">Get started</button></div>';
      document.getElementById('start').onclick = function () { go(1); };
      progress.textContent = '';
      return;
    }
    nav.hidden = false;
    back.hidden = false;
    next.textContent = i === STEPS.length - 1 ? 'Send' : 'Continue';
    progress.textContent = 'Question ' + i + ' of ' + Q;
    var val = answers[s.id];
    var showAff = s.affirmation && dir > 0 && lastShown[s.id] !== JSON.stringify(answers[STEPS[i - 1].id]);
    var h = '<div class="screen' + (dir < 0 ? ' from-left' : '') + '">';
    if (showAff) h += '<p class="aff">' + fill(s.affirmation) + '</p>';
    h += '<label class="prompt" for="f-' + s.id + '">' + fill(s.prompt) + '</label>';
    if (s.helper) h += '<p class="helper">' + esc(s.helper) + '</p>';
    if (s.type === 'text' || s.type === 'email') {
      h += '<input class="field" id="f-' + s.id + '" type="' + s.type + '" placeholder="' + esc(s.placeholder) + '" autocomplete="' + (s.autocomplete || 'off') + '" value="' + esc(val || '') + '"' + (s.type === 'email' ? ' inputmode="email"' : '') + '>';
    } else if (s.type === 'textarea') {
      h += '<textarea class="field" id="f-' + s.id + '" rows="4" placeholder="' + esc(s.placeholder) + '">' + esc(val || '') + '</textarea>';
    } else {
      var multi = s.type === 'multi';
      h += '<div class="options' + (multi ? ' multi' : '') + '" role="' + (multi ? 'group' : 'radiogroup') + '" id="f-' + s.id + '">' + s.options.map(function (o) {
        var on = multi ? (val || []).indexOf(o[0]) > -1 : val === o[0];
        return '<button type="button" class="opt" role="' + (multi ? 'checkbox' : 'radio') + '" aria-checked="' + on + '" data-v="' + esc(o[0]) + '">' +
          '<span class="tick" aria-hidden="true"></span><span class="o-main">' + esc(o[0]) + '</span>' + (o[1] ? '<span class="o-sub">' + esc(o[1]) + '</span>' : '') + '</button>';
      }).join('') + '</div>';
    }
    h += '</div>';
    stage.innerHTML = h;
    lastShown[s.id] = JSON.stringify(answers[STEPS[i - 1].id]);
    var input = stage.querySelector('.field');
    if (input) setTimeout(function () { input.focus(); }, 30);
    var opts = stage.querySelectorAll('.opt');
    [].forEach.call(opts, function (b) {
      b.onclick = function () {
        if (s.type === 'multi') {
          var arr = answers[s.id] || [], v = b.dataset.v, k = arr.indexOf(v);
          if (k > -1) arr.splice(k, 1); else arr.push(v);
          answers[s.id] = arr; b.setAttribute('aria-checked', k === -1);
        } else {
          answers[s.id] = b.dataset.v;
          [].forEach.call(opts, function (x) { x.setAttribute('aria-checked', x === b); });
          setTimeout(function () { go(1); }, 220); // single choice moves on by itself
        }
      };
    });
    if (opts.length && s.type !== 'multi') { var sel = stage.querySelector('.opt[aria-checked="true"]') || opts[0]; setTimeout(function () { sel.focus(); }, 30); }
  }

  function save() {
    var s = STEPS[i], input = stage.querySelector('.field');
    if (input) answers[s.id] = input.value.trim();
  }
  function valid() {
    var s = STEPS[i], v = answers[s.id];
    if (!s.required) return true;
    if (s.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '')) return 'Please add a valid email.';
    if (s.type === 'multi' && !(v && v.length)) return 'Pick at least one.';
    if (!v) return s.type === 'cards' ? 'Pick one to continue.' : 'Please fill this in.';
    return true;
  }
  function go(d) {
    if (d > 0 && i > 0) { save(); var ok = valid(); if (ok !== true) { err.textContent = ok; err.hidden = false; return; } }
    if (d < 0) save();
    if (d > 0 && i === STEPS.length - 1) return send();
    i = Math.max(0, Math.min(STEPS.length - 1, i + d));
    render(d);
  }

  function send() {
    if (sending) return;
    sending = true; next.disabled = true; next.textContent = 'Sending...';
    var payload = { website_url: form.website_url.value, source_page: document.referrer || location.href };
    STEPS.forEach(function (s) { if (s.type !== 'intro') payload[s.id] = answers[s.id] == null ? null : answers[s.id]; });
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.j && res.j.error || 'Something went wrong.');
        done();
      })
      .catch(function (e) {
        sending = false; next.disabled = false; next.textContent = 'Send';
        err.textContent = (e && e.message ? e.message + ' ' : '') + 'You can also email me at pascal@pascalsterzik.com.'; err.hidden = false;
      });
  }
  function done() {
    nav.hidden = true; dots.hidden = true; progress.textContent = 'Sent';
    var book = BOOKING_URL
      ? '<p class="lead">Last step: pick a time that works for you.</p><a class="btn btn-primary btn-big" href="' + esc(BOOKING_URL) + '" target="_blank" rel="noopener">Pick a time</a>'
      : '<p class="lead">I got your answers and I read every one myself. I\'ll email you soon to set up a call.</p><a class="btn btn-ghost btn-big" href="/portfolio">Back to the portfolio</a>';
    stage.innerHTML = '<div class="screen intro"><p class="kicker">Done</p><h1>Thanks, ' + esc(first()) + '!</h1>' + book + '</div>';
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); go(1); });
  back.addEventListener('click', function () { go(-1); });
  render(1);
})();
