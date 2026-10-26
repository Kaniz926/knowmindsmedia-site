(function () {
  var header = document.querySelector('header');
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('nav ul');

  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var form = document.getElementById('demo-form');
  if (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var bad = !el.value.trim() || (el.pattern && !new RegExp('^' + el.pattern + '$').test(el.value.trim()));
        el.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      var em = form.querySelector('input[type=email]');
      if (em && em.value && !/^\S+@\S+\.\S+$/.test(em.value)) { em.classList.add('invalid'); ok = false; }
      if (!ok) { msg.className = 'form-msg err'; msg.textContent = 'Please fill in the highlighted fields.'; return; }
      var data = new FormData(form);
      var picks = data.getAll('Interested in');
      data.delete('Interested in');
      data.append('Interested in', picks.join(', ') || 'Not specified');
      btn.disabled = true; btn.textContent = 'Sending…';
      msg.className = 'form-msg'; msg.textContent = '';
      fetch('https://formsubmit.co/ajax/hello@knowmindsmedia.com', { method: 'POST', headers: { 'Accept': 'application/json' }, body: data })
        .then(function (r) { return r.json().then(function (d) { if (!r.ok || String(d.success) !== 'true') throw new Error(d.message || 'failed'); }); })
        .then(function () {
          form.reset();
          msg.className = 'form-msg ok';
          msg.textContent = 'Thank you! We\'ve got your request and will contact you within one business day.';
          btn.textContent = 'Request sent';
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Request my free demo';
          msg.className = 'form-msg err';
          msg.innerHTML = 'Sorry, that didn\'t go through. Please email us at <a href="mailto:hello@knowmindsmedia.com">hello@knowmindsmedia.com</a>.';
        });
    });
    form.addEventListener('input', function (e) { e.target.classList.remove('invalid'); });
  }

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
