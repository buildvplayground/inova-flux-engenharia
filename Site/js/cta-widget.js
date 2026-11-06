/* =====================================================================
   Inova Flux — todo [data-cta] abre o chat do CRM BuildV
   O widget renderiza .bv-launcher / .bv-panel dentro de um SHADOW ROOT,
   então document.querySelector('.bv-launcher') nunca acha nada.
   ===================================================================== */
(function () {
  'use strict';

  function findRoot() {
    var els = document.querySelectorAll('body > *');
    for (var i = els.length - 1; i >= 0; i--) {
      var sr = els[i].shadowRoot;
      if (sr && (sr.querySelector('.bv-launcher') || sr.querySelector('.bv-panel'))) return sr;
    }
    return null;
  }

  // .bv-panel existe mesmo fechado (display:none): testar a visibilidade
  function isOpen(sr) {
    var panel = sr.querySelector('.bv-panel');
    return !!panel && getComputedStyle(panel).display !== 'none';
  }

  function tryOpen() {
    var sr = findRoot();
    if (!sr) return false;
    if (isOpen(sr)) return true;
    var launcher = sr.querySelector('.bv-launcher');
    if (!launcher) return false;
    launcher.click();
    return true;
  }

  // clique antes do widget carregar: abre assim que ele aparecer (até 15 s)
  var waiting = null;
  function openWidget() {
    if (tryOpen()) return;
    if (waiting) return;
    var tries = 0;
    waiting = setInterval(function () {
      tries++;
      if (tryOpen() || tries > 60) { clearInterval(waiting); waiting = null; }
    }, 250);
  }

  // gatilhos são <a> sem href (não ancoram em nada): devolve cursor e teclado
  var st = document.createElement('style');
  st.textContent = '[data-cta]{cursor:pointer}';
  document.head.appendChild(st);

  function trigger(e, el) {
    e.preventDefault();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'cta_widget', cta_id: el.id || '', cta_origem: el.getAttribute('data-cta') || '' });
    openWidget();
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-cta]') : null;
    if (el) trigger(e, el);
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest ? e.target.closest('[data-cta]') : null;
    if (el) trigger(e, el);
  }, true);

  window.abrirWidgetBuildV = openWidget;
})();
