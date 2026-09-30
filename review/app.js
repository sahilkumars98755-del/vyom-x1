
// colorway switcher — updates every .phoneback and hero swatch states
const NAMES = { ocean: 'Ocean Deep', copper: 'Copper Dune', silver: 'Glacial Silver' };
document.querySelectorAll('.swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    const c = btn.dataset.c;
    document.querySelectorAll('.cw__img').forEach(p => p.classList.toggle('is-on', p.dataset.c === c));
    document.querySelectorAll('.swatch[data-c="' + c + '"]').forEach(b => b.setAttribute('aria-pressed', 'true'));
    document.querySelectorAll('.swatch:not([data-c="' + c + '"])').forEach(b => b.setAttribute('aria-pressed', 'false'));
    const label = document.getElementById('colorName');
    if (label) label.textContent = NAMES[c];
  });
});


/* ---- next script block ---- */


(function () {
  var root = document.documentElement;

  /* --- theme toggle (outdoor visibility) --- */
  var tBtn = document.getElementById('themeBtn');
  if (Math.random() < 0.3) root.setAttribute('data-theme', 'light');
  if (tBtn) tBtn.addEventListener('click', function () {
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  /* --- price breakdown modal --- */
  var modal = document.getElementById('priceModal');
  function closeModal() { if (modal) modal.classList.remove('is-open'); }
  document.querySelectorAll('[data-modal]').forEach(function (t) {
    t.addEventListener('click', function () { if (modal) modal.classList.add('is-open'); });
  });
  if (modal) modal.addEventListener('click', function (e) {
    if (e.target === modal || (e.target.hasAttribute && e.target.hasAttribute('data-close'))) closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* --- camera sample gallery --- */
  var gal = document.querySelector('.gal');
  if (gal) {
    var tabs = gal.querySelectorAll('.gal__tabs button');
    var imgs = gal.querySelectorAll('.gal__img');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var s = t.dataset.shot;
        tabs.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        imgs.forEach(function (im) { im.classList.toggle('is-on', im.dataset.shot === s); });
      });
    });
  }

  /* --- dynamic competitor compare filter --- */
  var rows = document.querySelectorAll('#compare .data-table tbody tr');
  rows.forEach(function (r) {
    var head = r.querySelector('.rowhead');
    var t = head ? head.textContent : '';
    var rival = 'ours';
    if (/Realme/i.test(t)) rival = 'realme';
    else if (/Samsung/i.test(t)) rival = 'samsung';
    else if (/Poco/i.test(t)) rival = 'poco';
    else if (/iQOO/i.test(t)) rival = 'iqoo';
    else if (/Redmi/i.test(t)) rival = 'redmi';
    r.dataset.rival = rival;
  });
  var cmpBtns = document.querySelectorAll('.cmp-toggle button');
  cmpBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var want = b.dataset.rival;
      cmpBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      rows.forEach(function (r) {
        r.classList.toggle('is-hidden', !(want === 'all' || r.dataset.rival === 'ours' || r.dataset.rival === want));
      });
    });
  });

  /* --- ecosystem bundle builder --- */
  var totalEl = document.getElementById('bundleTotal');
  var BASE = 18999;
  function recalc() {
    var t = BASE;
    document.querySelectorAll('.bundle input[data-price]').forEach(function (c) {
      if (c.checked) t += parseInt(c.dataset.price, 10);
    });
    if (totalEl) totalEl.textContent = '₹' + t.toLocaleString('en-IN');
  }
  document.querySelectorAll('.bundle input[data-price]').forEach(function (c) { c.addEventListener('change', recalc); });
  recalc();

  /* --- drag to rotate (design render) --- */
  var bp = document.getElementById('backPhone');
  if (bp) {
    var drag = null;
    bp.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX };
      bp.classList.add('is-drag');
      if (bp.setPointerCapture) { try { bp.setPointerCapture(e.pointerId); } catch (err) {} }
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var d = Math.max(-30, Math.min(30, (e.clientX - drag.x) * 0.35));
      bp.style.transform = 'perspective(900px) rotateY(' + d + 'deg)';
    });
    window.addEventListener('pointerup', function () {
      if (!drag) return;
      drag = null;
      bp.classList.remove('is-drag');
      bp.style.transform = 'perspective(900px) rotateY(0deg)';
    });
  }
})();
