/* SayCheer motion: hero printer sequence (once per visit), CHEERS soap bubbles while scrolling, smoothness guard.
   Vanilla JS, plain strings only (no template literals), no library, no globals. First-party, builds no link or address.
   Storage keys (sessionStorage, no personal data): sc_hero_v1, sc_cheers_v1, sc_still_v1.
   CC_SESSION_saycheer_motion_seo_v1, 2026-11-12. */
(function () {
  'use strict';

  var root = document.documentElement;
  var K_HERO = 'sc_hero_v1';
  var K_CHEERS = 'sc_cheers_v1';
  var K_STILL = 'sc_still_v1';
  var isThai = String(root.lang || '').toLowerCase().indexOf('th') === 0;
  var SKIP_LABEL = isThai ? 'ข้าม' : 'Skip';
  var LETTERS = ['C', 'H', 'E', 'E', 'R', 'S'];
  var MAX_RUNS = 3;

  // Original cartoon printer (teal body, peach lid, eyes, smile, slot); viewBox 0 0 300 260, the slot is the dark bar near the bottom
  var PRINTER_SVG = [
    '<svg viewBox="0 0 300 260" aria-hidden="true" focusable="false">',
    '<rect x="70" y="4" width="160" height="46" rx="8" fill="#fff" stroke="#1F2D3A" stroke-width="5"/>',
    '<rect x="10" y="40" width="280" height="180" rx="32" fill="#5BB8B0" stroke="#1F2D3A" stroke-width="5"/>',
    '<rect x="26" y="52" width="248" height="22" rx="11" fill="#FDE3D3" stroke="#1F2D3A" stroke-width="4"/>',
    '<circle cx="252" cy="63" r="6" fill="#F2A07F" stroke="#1F2D3A" stroke-width="3"/>',
    '<circle cx="105" cy="118" r="17" fill="#fff" stroke="#1F2D3A" stroke-width="4"/>',
    '<circle cx="195" cy="118" r="17" fill="#fff" stroke="#1F2D3A" stroke-width="4"/>',
    '<circle cx="108" cy="121" r="7" fill="#1F2D3A"/><circle cx="198" cy="121" r="7" fill="#1F2D3A"/>',
    '<ellipse cx="66" cy="146" rx="16" ry="9" fill="#F2A07F" opacity=".75"/>',
    '<ellipse cx="234" cy="146" rx="16" ry="9" fill="#F2A07F" opacity=".75"/>',
    '<path d="M128 144 Q150 168 172 144" fill="none" stroke="#1F2D3A" stroke-width="6" stroke-linecap="round"/>',
    '<rect x="44" y="190" width="212" height="14" rx="7" fill="#1F2D3A"/>',
    '<rect x="40" y="218" width="40" height="22" rx="8" fill="#1F2D3A"/>',
    '<rect x="220" y="218" width="40" height="22" rx="8" fill="#1F2D3A"/>',
    '</svg>'
  ].join('');

  var heroEnded = false;
  var guardStarted = false;

  // Changed: sessionStorage read; any storage error counts as "not set" 2026-11-12
  function readKey(k) {
    try { return window.sessionStorage.getItem(k); } catch (e) { return null; }
  }

  // Changed: sessionStorage write; a storage error is ignored (the flag then lasts for this page only) 2026-11-12
  function writeKey(k, v) {
    try { window.sessionStorage.setItem(k, v); } catch (e) { /* storage unavailable */ }
  }

  // Changed: true when the visitor asked the system for less motion 2026-11-12
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // Changed: one small helper to make an element with a class, add it to a parent and give it text 2026-11-12
  function mk(cls, parent, text) {
    var el = document.createElement('div');
    el.className = cls;
    if (text) { el.textContent = text; }
    if (parent) { parent.appendChild(el); }
    return el;
  }

  // Changed: Web Animations call that does nothing on a browser without it 2026-11-12
  function play(el, frames, opts) {
    if (!el || !el.animate) { return null; }
    try { return el.animate(frames, opts); } catch (e) { return null; }
  }

  // Changed: random number between a and b 2026-11-12
  function rnd(a, b) {
    return a + Math.random() * (b - a);
  }

  // ---------- smoothness guard ----------

  // Changed: after load and the hero sequence, sample 60 idle frames; slow frames stop the drifting words (class bg-still) 2026-11-12
  function startGuard() {
    if (guardStarted || root.classList.contains('bg-still') || !window.requestAnimationFrame) { return; }
    guardStarted = true;
    var attempts = 0;

    function sample() {
      attempts++;
      var n = 0;
      var sum = 0;
      var last = 0;
      var disturbed = false;
      function mark() { disturbed = true; }
      window.addEventListener('scroll', mark, { passive: true });
      document.addEventListener('visibilitychange', mark);

      function tick(t) {
        if (last) {
          var d = t - last;
          if (d < 250) { sum += d; n++; } else { disturbed = true; }
        }
        last = t;
        if (disturbed) {
          window.removeEventListener('scroll', mark);
          document.removeEventListener('visibilitychange', mark);
          if (attempts < 3) { window.setTimeout(sample, 2000); }
          return;
        }
        if (n >= 60) {
          window.removeEventListener('scroll', mark);
          document.removeEventListener('visibilitychange', mark);
          if (sum / n > 30) {
            root.classList.add('bg-still');
            writeKey(K_STILL, '1');
          }
          return;
        }
        window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    }

    if (document.readyState === 'complete') {
      sample();
    } else {
      window.addEventListener('load', function () { window.setTimeout(sample, 300); });
    }
  }

  // ---------- CHEERS bubbles ----------
  var cheers = { runs: 0, acc: 0, lastY: 0, need: 600, lastRun: 0, running: false, layer: null };

  // Changed: true when something on the page says "not now" (hidden tab, cookie bar, open menu, less motion, still mode) 2026-11-12
  function cheersBlocked() {
    if (document.hidden || reducedMotion() || root.classList.contains('bg-still')) { return true; }
    var bar = document.querySelector('.cookie-bar');
    if (bar && !bar.hidden) { return true; }
    if (document.querySelector('details.menu[open]')) { return true; }
    return false;
  }

  // Changed: the fixed, click-through layer that holds the bubbles (under the sticky bar and the cookie bar) 2026-11-12
  function getLayer() {
    if (!cheers.layer) {
      cheers.layer = mk('fx-layer', document.body);
      cheers.layer.setAttribute('aria-hidden', 'true');
    }
    return cheers.layer;
  }

  // Changed: pick where the effect goes: centre of a wide side gutter (190 px or more), else a screen edge at 60 % scale 2026-11-12
  function pickSpot() {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var wrap = document.querySelector('.wrap');
    var r = wrap ? wrap.getBoundingClientRect() : null;
    var gutters = [];
    if (r && r.left >= 190) { gutters.push({ cx: r.left / 2, w: r.left }); }
    if (r && vw - r.right >= 190) { gutters.push({ cx: (r.right + vw) / 2, w: vw - r.right }); }
    var cy = vh * rnd(0.25, 0.7);
    if (gutters.length) {
      var g = gutters[Math.floor(Math.random() * gutters.length)];
      return { cx: g.cx, cy: cy, s: Math.min(1, (g.w - 16) / 272) };
    }
    var s = 0.6;
    var half = 136 * s + 8;
    return { cx: Math.random() < 0.5 ? half : vw - half, cy: cy, s: s };
  }

  // Changed: one soap bubble that floats up with a wobble, then pops: ring bursts, 8 droplets fly, the letter scatters 2026-11-12
  function makeBubble(spot, ch, i, timers) {
    var delay = 2200 + i * 60;
    var rise = 750;
    var g = mk('fx-dot fx-c' + (i + 1), spot);
    g.style.left = ((i - 2.5) * 44) + 'px';
    g.style.top = '0px';
    var ring = mk('fx-bubble', g);
    var letter = mk('fx-letter', g, ch);
    play(g, [
      { transform: 'translate(0px, 40px) scale(0.2)', opacity: 0 },
      { transform: 'translate(6px, -10px) scale(1)', opacity: 1, offset: 0.25 },
      { transform: 'translate(-6px, -46px) scale(1)', opacity: 1, offset: 0.6 },
      { transform: 'translate(4px, -78px) scale(1)', opacity: 1 }
    ], { duration: rise, delay: delay, easing: 'ease-in-out', fill: 'both' });
    timers.push(window.setTimeout(function () {
      play(ring, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 200, fill: 'forwards' });
      for (var k = 0; k < 8; k++) {
        var a = k * 0.785;
        var d = mk('fx-drop', g);
        play(d, [
          { transform: 'translate(0px, 0px)', opacity: 1 },
          { transform: 'translate(' + (Math.cos(a) * 44) + 'px, ' + (Math.sin(a) * 44) + 'px)', opacity: 0 }
        ], { duration: 500, easing: 'ease-out', fill: 'forwards' });
      }
      play(letter, [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(calc(-50% + ' + rnd(-120, 120) + 'px), calc(-50% + ' + rnd(-100, 60) + 'px)) rotate(' + rnd(-200, 200) + 'deg) scale(0.3)', opacity: 0 }
      ], { duration: 800, delay: 150, easing: 'ease-out', fill: 'forwards' });
    }, delay + rise));
  }

  // Changed: one CHEERS run: count 3, 2, 1 (each fades off), then six rainbow bubbles C H E E R S rise and pop; every node is removed afterwards 2026-11-12
  function runCheers() {
    cheers.running = true;
    cheers.runs++;
    cheers.lastRun = Date.now();
    writeKey(K_CHEERS, String(cheers.runs));
    var where = pickSpot();
    var layer = getLayer();
    var spot = mk('fx-spot', layer);
    spot.style.left = where.cx + 'px';
    spot.style.top = where.cy + 'px';
    spot.style.transform = 'scale(' + where.s + ')';
    var timers = [];
    var count = mk('fx-count', spot);
    for (var n = 0; n < 3; n++) {
      (function (num) {
        timers.push(window.setTimeout(function () {
          count.textContent = String(3 - num);
          play(count, [
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: 1, transform: 'scale(1.08)', offset: 0.25 },
            { opacity: 1, transform: 'scale(1)', offset: 0.62 },
            { opacity: 0, transform: 'scale(1)' }
          ], { duration: 800, fill: 'both' });
        }, num * 800));
      })(n);
    }
    for (var i = 0; i < LETTERS.length; i++) { makeBubble(spot, LETTERS[i], i, timers); }
    timers.push(window.setTimeout(function () {
      for (var t = 0; t < timers.length; t++) { window.clearTimeout(timers[t]); }
      if (spot.parentNode) { spot.parentNode.removeChild(spot); }
      if (cheers.layer && !cheers.layer.firstChild && cheers.layer.parentNode) {
        cheers.layer.parentNode.removeChild(cheers.layer);
        cheers.layer = null;
      }
      cheers.running = false;
      if (cheers.runs >= MAX_RUNS) { window.removeEventListener('scroll', onScroll); }
    }, 4300));
  }

  // Changed: passive scroll listener: counts scroll distance, rolls a 50 % chance when armed, respects the 10 s gap and the guards 2026-11-12
  function onScroll() {
    var y = window.pageYOffset || 0;
    cheers.acc += Math.abs(y - cheers.lastY);
    cheers.lastY = y;
    if (cheers.running || cheers.acc < cheers.need) { return; }
    if (cheers.runs > 0 && Date.now() - cheers.lastRun < 10000) { return; }
    if (cheersBlocked()) { return; }
    cheers.acc = 0;
    cheers.need = 700;
    if (Math.random() < 0.5) { runCheers(); }
  }

  // Changed: arm the bubbles once the hero sequence ended or was skipped (never with less motion, never beyond 3 runs per visit) 2026-11-12
  function armCheers() {
    var done = parseInt(readKey(K_CHEERS) || '0', 10);
    if (isNaN(done) || done < 0) { done = 0; }
    cheers.runs = done;
    if (reducedMotion() || done >= MAX_RUNS || !document.body.animate) { return; }
    cheers.lastY = window.pageYOffset || 0;
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- hero sequence ----------

  // Changed: called once when the hero sequence is over (or was never needed): arm the bubbles, start the smoothness guard 2026-11-12
  function heroDone() {
    if (heroEnded) { return; }
    heroEnded = true;
    armCheers();
    startGuard();
  }

  // Changed: the printer prints the hero picture: cover is the CSS layer on .hero-pic, the stage holds printer, number, flash and card 2026-11-12
  function startHero() {
    var pic = document.querySelector('.hero-pic');
    var img = pic ? pic.querySelector('img') : null;
    if (!root.classList.contains('hp')) { heroDone(); return; }
    if (!pic || !img || !pic.animate || reducedMotion()) {
      root.classList.remove('hp');
      heroDone();
      return;
    }

    var stage = null;
    var skip = null;
    var timers = [];
    var finished = false;
    var started = false;

    // Changed: end the sequence (finished or skipped): remove the nodes, uncover the picture, remember it was played 2026-11-12
    function finish(played) {
      if (finished) { return; }
      finished = true;
      for (var t = 0; t < timers.length; t++) { window.clearTimeout(timers[t]); }
      document.removeEventListener('keydown', onKey);
      if (stage && stage.parentNode) { stage.parentNode.removeChild(stage); }
      if (skip && skip.parentNode) { skip.parentNode.removeChild(skip); }
      root.classList.remove('hp');
      if (played) { writeKey(K_HERO, '1'); }
      heroDone();
    }

    // Changed: Esc skips the sequence 2026-11-12
    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') { finish(true); }
    }

    // Changed: run the timeline (about 5.2 s) once the picture has loaded 2026-11-12
    function begin() {
      if (started || finished) { return; }
      started = true;
      try {
        stage = mk('hp-stage', pic);
        stage.setAttribute('aria-hidden', 'true');
        var printer = mk('hp-printer', stage);
        printer.innerHTML = PRINTER_SVG;
        var num = mk('hp-num', stage);
        var flash = mk('hp-flash', stage);
        var card = mk('hp-card', stage);
        var photo = document.createElement('img');
        photo.src = img.currentSrc || img.src;
        photo.alt = '';
        photo.setAttribute('aria-hidden', 'true');
        photo.setAttribute('decoding', 'async');
        card.appendChild(photo);

        // The Skip button sits beside the stage (not inside it) so no focusable element is hidden from assistive technology
        skip = document.createElement('button');
        skip.type = 'button';
        skip.className = 'hp-skip';
        skip.setAttribute('aria-label', SKIP_LABEL);
        skip.textContent = SKIP_LABEL;
        skip.addEventListener('click', function () { finish(true); });
        pic.appendChild(skip);
        document.addEventListener('keydown', onKey);

        var svg = printer.firstChild;
        // 0: printer pops in
        play(printer, [{ transform: 'scale(0.55)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'both' });
        // 400, 1100, 1800: numbers 3, 2, 1, each pops in and fades off
        var starts = [400, 1100, 1800];
        for (var n = 0; n < 3; n++) {
          (function (num2, at) {
            timers.push(window.setTimeout(function () {
              num.textContent = String(3 - num2);
              play(num, [
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1.08)', offset: 0.25 },
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1)', offset: 0.62 },
                { opacity: 0, transform: 'translate(-50%, -50%) scale(1)' }
              ], { duration: 700, fill: 'both' });
            }, at));
          })(n, starts[n]);
        }
        // 2500: flash
        timers.push(window.setTimeout(function () {
          play(flash, [{ opacity: 0 }, { opacity: 0.9, offset: 0.3 }, { opacity: 0 }], { duration: 400, fill: 'both' });
        }, 2500));
        // 2800: the card slides out of the slot in 20 steps; the printer shakes 1.5 px
        timers.push(window.setTimeout(function () {
          play(photo, [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0%)' }], { duration: 1600, easing: 'steps(20, end)', fill: 'both' });
          play(svg, [
            { transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(-1.5px)' },
            { transform: 'translateX(1.5px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(1.5px)' },
            { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }
          ], { duration: 1600, iterations: 1 });
        }, 2800));
        // 4400: the card grows to the full box while the printer fades
        timers.push(window.setTimeout(function () {
          play(card, [
            { left: '25%', top: '47%', width: '50%', height: '50%', borderRadius: '6px' },
            { left: '0%', top: '0%', width: '100%', height: '100%', borderRadius: '0px' }
          ], { duration: 800, easing: 'ease-in-out', fill: 'forwards' });
          play(printer, [{ opacity: 1 }, { opacity: 0 }], { duration: 800, fill: 'forwards' });
        }, 4400));
        // 5200: done
        timers.push(window.setTimeout(function () { finish(true); }, 5200));
      } catch (e) {
        finish(false);
      }
    }

    if (img.complete && img.naturalWidth > 0) {
      begin();
    } else {
      img.addEventListener('load', begin);
      // not loaded within 3 s: no sequence, the page is shown as it is
      timers.push(window.setTimeout(function () { if (!started) { finish(false); } }, 3000));
    }
  }

  // Changed: start: bg-still memory first, then the hero sequence 2026-11-12
  function init() {
    try {
      if (readKey(K_STILL) === '1') { root.classList.add('bg-still'); }
      startHero();
    } catch (e) {
      root.classList.remove('hp');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
