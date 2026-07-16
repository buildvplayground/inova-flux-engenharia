/* =====================================================================
   Inova Flux Engenharia — app.js
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- WhatsApp (número centralizado) ---------- */
  var WA_NUMBER = '5517996065834'; // (17) 9 9606-5834 — trocar aqui se mudar
  var WA_MSG = {
    orcamento: 'Olá! Gostaria de solicitar um orçamento de engenharia com a Inova Flux.',
    disciplinas: 'Olá! Gostaria de falar com um engenheiro sobre as disciplinas de projeto.',
    default: 'Olá! Gostaria de mais informações sobre os serviços da Inova Flux.'
  };
  function waHref(key) {
    var msg = WA_MSG[key] || WA_MSG.default;
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }
  document.querySelectorAll('.js-wa').forEach(function (el) {
    el.setAttribute('href', waHref(el.getAttribute('data-wa-btn')));
  });

  /* ---------- Ano no footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  function hideLoader() {
    var l = document.getElementById('loader');
    if (l) l.classList.add('hide');
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, 300); });
  setTimeout(hideLoader, 3500); // fallback

  /* ---------- Header scrolled ---------- */
  var header = document.getElementById('header');
  function updateHeader() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  updateHeader();

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('burger');
  var scrim = document.getElementById('navScrim');
  function closeNav() {
    document.body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  }
  function toggleNav() {
    var open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  if (burger) burger.addEventListener('click', toggleNav);
  if (scrim) scrim.addEventListener('click', closeNav);
  document.querySelectorAll('#nav a').forEach(function (a) {
    a.addEventListener('click', function () { closeNav(); stopMomentum(); });
  });

  /* ---------- Reveal on scroll ---------- */
  var revEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revEls.forEach(function (el) { io.observe(el); });
  } else {
    revEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- "Como funciona" (linha + passos escalonados) ---------- */
  var howto = document.getElementById('howto');
  if (howto) {
    if ('IntersectionObserver' in window && !reduce) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      io2.observe(howto);
    } else { howto.classList.add('in'); }
  }

  /* ---------- Parallax (faixas de imagem) ---------- */
  var parEls = document.querySelectorAll('[data-parallax]');
  function updateParallax() {
    if (reduce) return;
    for (var i = 0; i < parEls.length; i++) {
      var el = parEls[i], band = el.parentElement;
      var r = band.getBoundingClientRect();
      if (r.bottom < -40 || r.top > window.innerHeight + 40) continue;
      var progress = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0..1
      var shift = (progress - 0.5) * 14; // % de deslocamento
      el.style.transform = 'translate3d(0,' + shift.toFixed(2) + '%,0)';
    }
  }

  /* ---------- Lightbox (galeria do projeto) ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.pf-card'));
  var gallery = cards.map(function (c) {
    var img = c.querySelector('img');
    return { src: img.getAttribute('src'), cap: img.getAttribute('alt') };
  });
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCaption');
  var lbCount = document.getElementById('lbCounter');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var cur = 0;
  var lastFocus = null;

  function renderLb(i) {
    cur = (i + gallery.length) % gallery.length;
    lbImg.setAttribute('src', gallery[cur].src);
    lbImg.setAttribute('alt', gallery[cur].cap);
    lbCap.textContent = gallery[cur].cap;
    lbCount.textContent = (cur + 1) + ' / ' + gallery.length;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    renderLb(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden'; // trava scroll + sinaliza p/ o momentum
    stopMomentum();
    document.getElementById('lbClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  // some as setas se houver só 1 imagem
  if (gallery.length <= 1) { lbPrev.style.display = 'none'; lbNext.style.display = 'none'; }

  cards.forEach(function (c) {
    c.addEventListener('click', function () {
      openLb(parseInt(c.getAttribute('data-index'), 10) || 0);
    });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lbPrev.addEventListener('click', function () { renderLb(cur - 1); });
  lbNext.addEventListener('click', function () { renderLb(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') renderLb(cur - 1);
    else if (e.key === 'ArrowRight') renderLb(cur + 1);
  });

  /* ---------- Scroll listeners (header + parallax, throttle rAF) ---------- */
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateHeader(); updateParallax(); ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();

  /* ---------- Momentum smooth scroll (tipo Lenis) ---------- */
  var stopMomentum = function () {};
  (function initMomentum() {
    if (reduce) return;                                   // respeita reduced-motion
    if (window.matchMedia('(hover: none)').matches) return; // touch/mobile -> nativo
    var target = window.scrollY, current = window.scrollY, running = false, raf = null;
    var EASE = 0.09;
    function maxScroll() { return Math.max(0, document.documentElement.scrollHeight - window.innerHeight); }
    function clamp(v) { return Math.max(0, Math.min(v, maxScroll())); }
    function loop() {
      var diff = target - current;
      current += diff * EASE;
      if (Math.abs(diff) < 0.4) {
        current = target; window.scrollTo(0, Math.round(current)); running = false; return;
      }
      window.scrollTo({ top: current, behavior: 'instant' }); // não conflita com o smooth do CSS
      raf = window.requestAnimationFrame(loop);
    }
    window.addEventListener('wheel', function (e) {
      if (document.body.style.overflow === 'hidden') return; // modal/lightbox aberto -> nativo
      if (e.ctrlKey) return;                                 // pinch-zoom
      e.preventDefault();
      var dy = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
      target = clamp(target + dy);
      if (!running) { running = true; current = window.scrollY; raf = window.requestAnimationFrame(loop); }
    }, { passive: false });
    // ressincroniza quando o scroll vem de outra fonte (teclado, âncora, barra)
    window.addEventListener('scroll', function () {
      if (!running) { target = window.scrollY; current = window.scrollY; }
    }, { passive: true });
    window.addEventListener('resize', function () { target = clamp(target); });
    stopMomentum = function () {
      running = false; if (raf) window.cancelAnimationFrame(raf);
      target = window.scrollY; current = window.scrollY;
    };
  })();

  /* ---------- Cookie banner (LGPD) ---------- */
  var cookie = document.getElementById('cookie');
  var CK = 'ifx_cookie_consent';
  function pushConsent(v) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'cookie_consent', consent: v }); // tags respeitam a LGPD
  }
  function showCookie() { if (cookie) setTimeout(function () { cookie.classList.add('show'); }, 1200); }
  function decide(v) {
    try { localStorage.setItem(CK, v); } catch (e) {}
    if (cookie) cookie.classList.remove('show');
    pushConsent(v);
  }
  try {
    var saved = localStorage.getItem(CK);
    if (saved) pushConsent(saved); else showCookie();
  } catch (e) { showCookie(); }
  var ca = document.getElementById('cookieAccept'), cr = document.getElementById('cookieReject');
  if (ca) ca.addEventListener('click', function () { decide('accepted'); });
  if (cr) cr.addEventListener('click', function () { decide('rejected'); });

})();
