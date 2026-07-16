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
    var hero = document.querySelector('.hero');
    if (hero) hero.classList.add('reveal-in'); // entrada escalonada do hero após o loader
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, 260); });
  setTimeout(hideLoader, 3200); // fallback

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
  // Âncoras (inclusive as do menu) são tratadas pelo scroll suave — ver bloco Smooth abaixo.

  /* ---------- Reveal on scroll + "Como funciona" (scroll-driven, robusto) ----------
     Dirigido por scroll (Lenis + nativo) em vez de IntersectionObserver — garante que
     as entradas suaves e a timeline animem de forma confiável em qualquer ambiente. */
  var revEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  // escalona irmãos do mesmo container (ex.: cards de um grid entram em sequência)
  revEls.forEach(function (el) {
    var p = el.parentNode; var i = p.__ri || 0; p.__ri = i + 1;
    if (i > 0) el.style.transitionDelay = Math.min(i * 0.1, 0.55) + 's';
  });
  var howto = document.getElementById('howto');
  function revealCheck() {
    var trigger = window.innerHeight * 0.88;
    for (var i = revEls.length - 1; i >= 0; i--) {
      if (revEls[i].getBoundingClientRect().top < trigger) {
        revEls[i].classList.add('in'); revEls.splice(i, 1); // revela uma vez e remove da lista
      }
    }
    if (howto && !howto.classList.contains('in') && howto.getBoundingClientRect().top < trigger) {
      howto.classList.add('in'); // dispara o "desenho" da timeline (1 → 3)
    }
  }

  /* ---------- Parallax (faixas de imagem) ---------- */
  var parEls = document.querySelectorAll('[data-parallax]');
  function updateParallax() {
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
    resumeMomentum(); // retoma o Lenis
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  // guarda: só liga a lightbox nas páginas que a possuem (index) — evita erro nas subpáginas
  if (lb) {
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
  }

  /* ---------- Scroll listeners (header + parallax, throttle rAF) ---------- */
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateHeader(); updateParallax(); revealCheck(); ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', revealCheck, { passive: true }); // direto (não depende de rAF)
  window.addEventListener('resize', function () { updateParallax(); revealCheck(); }, { passive: true });
  updateParallax();
  revealCheck();
  window.addEventListener('load', revealCheck);

  /* ---------- Smooth scroll premium (Lenis) ---------- */
  var lenis = null;
  var stopMomentum = function () {};
  var resumeMomentum = function () {};
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.4,   // PESO DO SCROLL: aumente p/ mais "delay" (ex.: 2.0) ou diminua p/ mais leve (ex.: 1.0)
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true // suave no mouse; toque permanece nativo (padrão do Lenis)
    });
    (function lenisRaf(time) { lenis.raf(time); window.requestAnimationFrame(lenisRaf); })(0);
    window.__lenis = lenis; // acesso p/ debug/ajuste fino
    stopMomentum = function () { lenis.stop(); };
    resumeMomentum = function () { lenis.start(); };
    // mantém header/parallax em sincronia com o Lenis
    lenis.on('scroll', function () { updateHeader(); updateParallax(); revealCheck(); });
  }

  /* ---------- Navegação por âncora (coesa com o Lenis) ---------- */
  var NAV_OFFSET = 82;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeNav();
      if (lenis) lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.6 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: 'smooth' });
    });
  });

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
