/* SayCheer cookie choice: Google Analytics loads only after the visitor taps Accept.
   Vanilla JS, plain strings only (no template literals). Choice is kept in localStorage (not a cookie).
   CC_SESSION_saycheer_cookie_v1, 2026-11-10. */
(function () {
  'use strict';

  var GA_ID = 'G-HB2ZXSZY0Z';
  var KEY = 'sc_consent_v1';
  var NOTICE_URL = 'https://docs.janishammer.com/cookie-notice';
  var isThai = String(document.documentElement.lang || '').toLowerCase().indexOf('th') === 0;
  var T = isThai
    ? {
        region: 'ตัวเลือกคุกกี้',
        text: 'เว็บไซต์นี้ใช้คุกกี้ของ Google Analytics เพื่อนับจำนวนผู้เข้าชมและดูว่าหน้าใดมีประโยชน์ โดยจะตั้งค่าเฉพาะเมื่อคุณกดยอมรับ',
        accept: 'ยอมรับ',
        decline: 'ไม่ยอมรับ',
        notice: 'ประกาศเกี่ยวกับคุกกี้'
      }
    : {
        region: 'Cookie choice',
        text: 'This site uses Google Analytics cookies to count visits and see which pages help. They are set only if you accept.',
        accept: 'Accept',
        decline: 'Decline',
        notice: 'Cookie notice'
      };

  var gaLoaded = false;
  var bar = null;

  // Changed: read the stored choice; any storage error counts as "no choice yet" 2026-11-10
  function readChoice() {
    try {
      var v = window.localStorage.getItem(KEY);
      if (v === 'accepted' || v === 'declined') { return v; }
    } catch (e) { /* storage unavailable */ }
    return null;
  }

  // Changed: store the choice; a storage error is ignored (the choice then lasts for this page only) 2026-11-10
  function saveChoice(v) {
    try { window.localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable */ }
  }

  // Changed: load Google Analytics once, after Accept (same measurement as before, only later) 2026-11-10
  function loadGA() {
    if (gaLoaded) { return; }
    gaLoaded = true;
    window['ga-disable-' + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  // Changed: best-effort removal of the two Google Analytics cookies on this host and on .janishammer.com 2026-11-10
  function deleteCookies() {
    var names = ['_ga', '_ga_' + GA_ID.replace('G-', '')];
    var domains = ['', '; domain=' + window.location.hostname, '; domain=.janishammer.com'];
    for (var i = 0; i < names.length; i++) {
      for (var j = 0; j < domains.length; j++) {
        document.cookie = names[i] + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domains[j];
      }
    }
  }

  // Changed: keep the page footer clear of the bar while it shows 2026-11-10
  function fixPadding() {
    if (!bar || bar.hidden) { return; }
    document.body.style.paddingBottom = bar.offsetHeight + 'px';
  }

  // Changed: show the bar again (first visit, or the footer button) 2026-11-10
  function showBar() {
    buildBar();
    bar.hidden = false;
    fixPadding();
  }

  // Changed: hide the bar and give the page its normal bottom padding back 2026-11-10
  function hideBar() {
    if (bar) { bar.hidden = true; }
    document.body.style.paddingBottom = '';
  }

  // Changed: Accept stores the choice, hides the bar and starts measurement 2026-11-10
  function onAccept() {
    saveChoice('accepted');
    hideBar();
    loadGA();
  }

  // Changed: Decline stores the choice, hides the bar and stops measurement 2026-11-10
  function onDecline() {
    saveChoice('declined');
    hideBar();
    window['ga-disable-' + GA_ID] = true;
    deleteCookies();
  }

  // Changed: one small helper for the two equal buttons 2026-11-10
  function makeButton(label, cls, handler) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn btn-outline cookie-btn ' + cls;
    b.textContent = label;
    b.addEventListener('click', handler);
    return b;
  }

  // Changed: build the bar once (not a modal, no focus change, buttons reachable by keyboard) 2026-11-10
  function buildBar() {
    if (bar) { return bar; }
    bar = document.createElement('div');
    bar.className = 'cookie-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', T.region);
    bar.hidden = true;

    var p = document.createElement('p');
    p.className = 'cookie-text';
    p.appendChild(document.createTextNode(T.text + ' '));
    var a = document.createElement('a');
    a.href = NOTICE_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = T.notice;
    p.appendChild(a);

    var row = document.createElement('div');
    row.className = 'cookie-btns';
    row.appendChild(makeButton(T.accept, 'cookie-accept', onAccept));
    row.appendChild(makeButton(T.decline, 'cookie-decline', onDecline));

    bar.appendChild(p);
    bar.appendChild(row);
    document.body.appendChild(bar);
    window.addEventListener('resize', fixPadding);
    window.addEventListener('load', fixPadding);
    // Changed: a web font loading later changes the bar height, so measure again when it changes 2026-11-10
    if (window.ResizeObserver) { new window.ResizeObserver(fixPadding).observe(bar); }
    return bar;
  }

  // Changed: start: accepted loads Google Analytics, no choice shows the bar, declined does nothing 2026-11-10
  function init() {
    var choice = readChoice();
    if (choice === 'accepted') {
      loadGA();
    } else if (choice === null) {
      showBar();
    }
    var openers = document.querySelectorAll('.cookie-open');
    for (var i = 0; i < openers.length; i++) {
      openers[i].addEventListener('click', showBar);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
