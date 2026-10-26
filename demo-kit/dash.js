/* KnowMinds demo kit — owner dashboard overlay. Usage: KMDash.open(cfg) */
(function () {
  var css = '\
.kmd-ov{position:fixed;inset:0;z-index:9000;background:rgba(10,12,20,.55);backdrop-filter:blur(6px);display:flex;justify-content:flex-end;opacity:0;transition:opacity .25s}\
.kmd-ov.on{opacity:1}\
.kmd{--a:var(--kd-accent,#4f46e5);--bg:var(--kd-bg,#f7f7fb);--pa:var(--kd-paper,#fff);--ink:var(--kd-ink,#14141f);--mu:var(--kd-muted,#6b6b80);--ln:var(--kd-line,#e7e7ef);width:min(980px,100%);height:100%;background:var(--bg);color:var(--ink);overflow:auto;transform:translateX(40px);transition:transform .35s cubic-bezier(.2,.8,.2,1);font-family:var(--kd-font,inherit);box-shadow:-20px 0 60px rgba(0,0,0,.25)}\
.kmd-ov.on .kmd{transform:none}\
.kmd *{box-sizing:border-box}\
.kmd-h{position:sticky;top:0;z-index:2;background:var(--pa);border-bottom:1px solid var(--ln);padding:16px 22px;display:flex;justify-content:space-between;align-items:center;gap:12px}\
.kmd-h b{font-size:1.15rem;display:block}\
.kmd-h small{color:var(--mu);font-size:.8rem}\
.kmd-tag{display:inline-block;font-size:.66rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--a);background:color-mix(in srgb,var(--a) 12%,transparent);padding:3px 8px;border-radius:999px;margin-bottom:4px}\
.kmd-x{border:1px solid var(--ln);background:var(--pa);color:var(--ink);width:38px;height:38px;border-radius:10px;cursor:pointer;font-size:1rem}\
.kmd-b{padding:20px 22px 40px;display:grid;gap:16px}\
.kmd-range{display:flex;gap:6px;flex-wrap:wrap}\
.kmd-range button{border:1px solid var(--ln);background:var(--pa);color:var(--ink);border-radius:999px;padding:6px 12px;font:inherit;font-size:.8rem;font-weight:600;cursor:pointer}\
.kmd-range button[aria-pressed=true]{background:var(--a);border-color:var(--a);color:#fff}\
.kmd-k{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}\
@media(max-width:760px){.kmd-k{grid-template-columns:repeat(2,1fr)}}\
.kmd-c{background:var(--pa);border:1px solid var(--ln);border-radius:16px;padding:16px}\
.kmd-c small{color:var(--mu);font-size:.78rem;display:block}\
.kmd-c .v{font-size:1.55rem;font-weight:800;letter-spacing:-.02em;margin-top:4px;display:block}\
.kmd-c .d{font-size:.76rem;font-weight:700;margin-top:2px;display:inline-block}\
.kmd-c .d.up{color:#16a34a}.kmd-c .d.dn{color:#dc2626}\
.kmd-g{display:grid;grid-template-columns:1.6fr 1fr;gap:16px}\
@media(max-width:860px){.kmd-g{grid-template-columns:1fr}}\
.kmd-c h4{margin:0 0 12px;font-size:.95rem;display:flex;justify-content:space-between;align-items:center}\
.kmd-c h4 span{font-size:.75rem;color:var(--mu);font-weight:500}\
.kmd-ch{width:100%;height:220px;display:block}\
.kmd-ch .ln{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1500;stroke-dashoffset:1500;animation:kmdl 1.2s .1s forwards}\
@keyframes kmdl{to{stroke-dashoffset:0}}\
.kmd-ch .ar{opacity:0;animation:kmdf .8s .5s forwards}\
@keyframes kmdf{to{opacity:1}}\
.kmd-ch .bar{transform-origin:bottom;transform-box:fill-box;animation:kmdb .7s cubic-bezier(.2,.8,.2,1) both}\
@keyframes kmdb{from{transform:scaleY(0)}}\
.kmd-ch text{fill:var(--mu);font-size:10px}\
.kmd-lg{display:flex;gap:14px;font-size:.78rem;color:var(--mu);margin-top:6px;flex-wrap:wrap}\
.kmd-lg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}\
.kmd-dn{display:flex;gap:16px;align-items:center}\
.kmd-dn svg{width:140px;height:140px;flex:none}\
.kmd-dn .lgd{display:grid;gap:8px;font-size:.84rem;flex:1}\
.kmd-dn .lgd div{display:flex;justify-content:space-between;gap:8px}\
.kmd-t{width:100%;border-collapse:collapse;font-size:.86rem}\
.kmd-t th{text-align:left;color:var(--mu);font-weight:600;font-size:.74rem;text-transform:uppercase;letter-spacing:.06em;padding:8px 10px;border-bottom:1px solid var(--ln)}\
.kmd-t td{padding:10px;border-bottom:1px solid var(--ln);vertical-align:middle}\
.kmd-t tr:last-child td{border-bottom:0}\
.kmd-pill{display:inline-block;border-radius:999px;padding:3px 9px;font-size:.72rem;font-weight:700;white-space:nowrap}\
.kmd-act{border:1px solid var(--ln);background:var(--pa);color:var(--ink);border-radius:8px;padding:5px 10px;font:inherit;font-size:.76rem;font-weight:600;cursor:pointer;white-space:nowrap}\
.kmd-act:hover{border-color:var(--a);color:var(--a)}\
.kmd-scroll{overflow:auto}\
.kmd-live{display:inline-flex;align-items:center;gap:6px;font-size:.74rem;color:#16a34a;font-weight:700}\
.kmd-live i{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.5);animation:kmdp 1.6s infinite}\
@keyframes kmdp{70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}\
.kmd-feed{display:grid;gap:8px;max-height:260px;overflow:auto}\
.kmd-feed div{display:flex;gap:10px;align-items:flex-start;font-size:.84rem;padding:8px 10px;border-radius:10px;background:var(--bg);animation:kmdi .4s}\
.kmd-feed small{color:var(--mu);display:block;font-size:.74rem}\
@keyframes kmdi{from{opacity:0;transform:translateY(-6px)}}\
.kmd-note{font-size:.76rem;color:var(--mu);text-align:center}\
@media (prefers-reduced-motion:reduce){.kmd-ch .ln,.kmd-ch .ar,.kmd-ch .bar{animation:none;stroke-dashoffset:0;opacity:1}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function line(ch) {
    var W = 600, H = 220, P = 30, n = ch.labels.length, max = 0;
    ch.series.forEach(function (s) { s.values.forEach(function (v) { if (v > max) max = v; }); });
    max = max * 1.15 || 1;
    var x = function (i) { return P + i * (W - P * 2) / Math.max(1, n - 1); }, y = function (v) { return H - 24 - v / max * (H - 44); };
    var g = '';
    for (var k = 0; k <= 4; k++) { var yy = 20 + k * (H - 44) / 4; g += '<line x1="' + P + '" x2="' + (W - P) + '" y1="' + yy + '" y2="' + yy + '" stroke="currentColor" opacity=".08"/>'; }
    var step = Math.ceil(n / 8);
    ch.labels.forEach(function (l, i) { if (i % step === 0 || i === n - 1) g += '<text x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(l) + '</text>'; });
    ch.series.forEach(function (s, si) {
      var d = s.values.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' ');
      if (si === 0) g += '<path class="ar" d="' + d + ' L' + x(n - 1) + ' ' + (H - 24) + ' L' + x(0) + ' ' + (H - 24) + 'Z" fill="' + s.color + '" opacity=".12"/>';
      g += '<path class="ln" d="' + d + '" stroke="' + s.color + '"' + (s.dash ? ' stroke-dasharray="5 5" style="animation:none;stroke-dashoffset:0;opacity:.7"' : '') + '/>';
      var last = s.values[n - 1]; g += '<circle cx="' + x(n - 1) + '" cy="' + y(last) + '" r="4" fill="' + s.color + '"/>';
    });
    return '<svg class="kmd-ch" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" style="color:var(--ink)">' + g + '</svg>' +
      '<div class="kmd-lg">' + ch.series.map(function (s) { return '<span><i style="background:' + s.color + '"></i>' + esc(s.name) + '</span>'; }).join('') + '</div>';
  }
  function bars(ch) {
    var W = 600, H = 220, P = 30, n = ch.labels.length, max = Math.max.apply(0, ch.values) * 1.15 || 1, bw = (W - P * 2) / n;
    var g = '';
    ch.values.forEach(function (v, i) {
      var h = v / max * (H - 44), xx = P + i * bw + bw * .18;
      g += '<rect class="bar" style="animation-delay:' + (i * 40) + 'ms" x="' + xx + '" y="' + (H - 24 - h) + '" width="' + bw * .64 + '" height="' + h + '" rx="5" fill="' + (ch.color || 'var(--a)') + '" opacity="' + (i === n - 1 ? 1 : .55) + '"/>';
      g += '<text x="' + (xx + bw * .32) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(ch.labels[i]) + '</text>';
    });
    return '<svg class="kmd-ch" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" style="color:var(--ink)">' + g + '</svg>';
  }
  function donut(dn) {
    var tot = dn.items.reduce(function (a, b) { return a + b.value; }, 0) || 1, off = 25, s = '<circle cx="21" cy="21" r="15.9" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="5"/>';
    dn.items.forEach(function (it) { var p = it.value / tot * 100; s += '<circle cx="21" cy="21" r="15.9" fill="none" stroke="' + it.color + '" stroke-width="5" stroke-dasharray="' + p + ' ' + (100 - p) + '" stroke-dashoffset="' + off + '"/>'; off -= p; });
    s += '<text x="21" y="22" text-anchor="middle" font-size="6" font-weight="800" fill="currentColor">' + esc(dn.center || '') + '</text>';
    return '<div class="kmd-dn"><svg viewBox="0 0 42 42" style="color:var(--ink)">' + s + '</svg><div class="lgd">' + dn.items.map(function (it) { return '<div><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:' + it.color + ';margin-right:6px"></i>' + esc(it.label) + '</span><b>' + esc(it.display || it.value) + '</b></div>'; }).join('') + '</div></div>';
  }

  var cur = null, feedTimer = null;
  function render(cfg, range) {
    var data = cfg.data(range);
    var h = '<div class="kmd-h"><div><span class="kmd-tag">Owner dashboard · demo</span><b>' + esc(cfg.title) + '</b><small>' + esc(cfg.subtitle || '') + '</small></div><div style="display:flex;gap:10px;align-items:center"><span class="kmd-live"><i></i>Live</span><button class="kmd-x" aria-label="Close dashboard">✕</button></div></div><div class="kmd-b">';
    h += '<div class="kmd-range">' + ['Today', '7 days', '30 days'].map(function (r) { return '<button data-r="' + r + '" aria-pressed="' + (r === range) + '">' + r + '</button>'; }).join('') + '</div>';
    h += '<div class="kmd-k">' + data.kpis.map(function (k) { return '<div class="kmd-c"><small>' + esc(k.label) + '</small><span class="v">' + esc(k.value) + '</span>' + (k.delta ? '<span class="d ' + (String(k.delta).charAt(0) === '-' ? 'dn' : 'up') + '">' + esc(k.delta) + '</span>' : '') + '</div>'; }).join('') + '</div>';
    h += '<div class="kmd-g"><div class="kmd-c"><h4>' + esc(data.chart.title) + '<span>' + esc(data.chart.note || '') + '</span></h4>' + (data.chart.type === 'bar' ? bars(data.chart) : line(data.chart)) + '</div>';
    h += '<div class="kmd-c">' + (data.donut ? '<h4>' + esc(data.donut.title) + '</h4>' + donut(data.donut) : '') + (data.feed ? '<h4 style="margin-top:' + (data.donut ? 16 : 0) + 'px">Live activity</h4><div class="kmd-feed" id="kmdFeed">' + data.feed.map(feedRow).join('') + '</div>' : '') + '</div></div>';
    h += '<div class="kmd-c"><h4>' + esc(data.table.title) + '<span>' + esc(data.table.note || '') + '</span></h4><div class="kmd-scroll"><table class="kmd-t"><tr>' + data.table.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' + data.table.rows.map(function (r, ri) { return '<tr>' + r.map(function (c) { return '<td>' + (c && c.html !== undefined ? c.html : esc(c)) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div></div>';
    h += '<p class="kmd-note">Sample data for demonstration. Your real dashboard would connect to your orders, bookings and payments.</p></div>';
    return h;
  }
  function feedRow(f) { return '<div><span>' + (f.icon || '•') + '</span><span>' + esc(f.text) + '<small>' + esc(f.time || 'just now') + '</small></span></div>'; }

  window.KMDash = {
    open: function (cfg) {
      cur = cfg; var range = '7 days';
      var ov = document.createElement('div'); ov.className = 'kmd-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
      var panel = document.createElement('div'); panel.className = 'kmd';
      if (cfg.theme) Object.keys(cfg.theme).forEach(function (k) { panel.style.setProperty('--kd-' + k, cfg.theme[k]); });
      panel.innerHTML = render(cfg, range); ov.appendChild(panel); document.body.appendChild(ov);
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(function () { ov.classList.add('on'); });
      function close() { ov.classList.remove('on'); clearInterval(feedTimer); document.documentElement.style.overflow = ''; setTimeout(function () { ov.remove(); }, 260); document.removeEventListener('keydown', esc2); }
      function esc2(e) { if (e.key === 'Escape') close(); }
      document.addEventListener('keydown', esc2);
      ov.addEventListener('click', function (e) {
        if (e.target === ov || e.target.closest('.kmd-x')) return close();
        var r = e.target.closest('[data-r]'); if (r) { range = r.dataset.r; panel.innerHTML = render(cfg, range); return; }
        var a = e.target.closest('[data-kact]'); if (a && cfg.onAction) { cfg.onAction(a.dataset.kact, a.dataset.kid); panel.innerHTML = render(cfg, range); }
      });
      clearInterval(feedTimer);
      if (cfg.liveFeed) feedTimer = setInterval(function () { var f = document.getElementById('kmdFeed'); if (!f) return; var item = cfg.liveFeed(); if (!item) return; f.insertAdjacentHTML('afterbegin', feedRow(item)); if (f.children.length > 12) f.lastElementChild.remove(); }, 3500);
    },
    pill: function (text, bg, fg) { return { html: '<span class="kmd-pill" style="background:' + bg + ';color:' + fg + '">' + esc(text) + '</span>' }; },
    btn: function (label, act, id) { return { html: '<button class="kmd-act" data-kact="' + esc(act) + '" data-kid="' + esc(id) + '">' + esc(label) + '</button>' }; },
    series: function (n, base, spread, seed) { var out = [], v = base, s = seed || 7; for (var i = 0; i < n; i++) { s = (s * 9301 + 49297) % 233280; v = Math.max(base * .35, v + (s / 233280 - .45) * spread); out.push(Math.round(v)); } return out; },
    days: function (n) { var out = []; for (var i = n - 1; i >= 0; i--) { var d = new Date(); d.setDate(d.getDate() - i); out.push(n <= 7 ? d.toLocaleDateString('en-IN', { weekday: 'short' }) : d.getDate() + '/' + (d.getMonth() + 1)); } return out; },
    hours: function () { var out = []; for (var h = 9; h <= 21; h++) out.push((h > 12 ? h - 12 : h) + (h >= 12 ? 'p' : 'a')); return out; }
  };
})();
