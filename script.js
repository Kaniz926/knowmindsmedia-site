(function () {
  var root = document.documentElement;
  var tbtn = document.querySelector('.theme-btn');
  if (tbtn) {
    tbtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
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


  // Live n8n-style workflow preview (sample data)
  var live = document.getElementById('live-wf');
  if (live) {
    var I = {
      phone:'<svg viewBox="0 0 24 24" fill="none" stroke="#ff6d5a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
      wa:'<svg viewBox="0 0 24 24" fill="none" stroke="#25d366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1 1 21 12Z"/></svg>',
      ai:'<svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 7V3M9 13h.01M15 13h.01M9 16h6"/></svg>',
      sheet:'<svg viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/></svg>',
      bell:'<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
      form:'<svg viewBox="0 0 24 24" fill="none" stroke="#ff6d5a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
      wait:'<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      check:'<svg viewBox="0 0 24 24" fill="none" stroke="#ff6d5a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      ifn:'<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9"/></svg>',
      star:'<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'
    };
    var WF = [
      [ {i:'form',t:'Form submitted',s:'Website webhook',trig:1,log:'New enquiry: “Need a clinic website”'},
        {i:'bell',t:'Alert owner',s:'WhatsApp',log:'Owner alerted with lead details'},
        {i:'wa',t:'Thank customer',s:'WhatsApp',log:'Thank-you message sent to customer'},
        {i:'wait',t:'Wait 2 days',s:'Wait node',log:'Waiting 2 days… (sped up for preview)'},
        {i:'ifn',t:'Replied?',s:'IF node',log:'No reply yet → send follow-up'},
        {i:'wa',t:'Follow-up',s:'WhatsApp',log:'Follow-up sent'} ],
      [ {i:'form',t:'New booking',s:'Form / Google Calendar',trig:1,log:'Booking: Sat 11:00 AM, “Consultation”'},
        {i:'wa',t:'Confirm',s:'WhatsApp',log:'Confirmation sent to customer'},
        {i:'wait',t:'Wait',s:'Until 24h before',log:'Waiting until 24h before… (sped up for preview)'},
        {i:'wa',t:'Reminder',s:'WhatsApp',log:'Reminder sent with reschedule link'},
        {i:'sheet',t:'Update sheet',s:'Google Sheets',log:'Booking status: reminded'} ],
      [ {i:'check',t:'Visit complete',s:'Booking updated',trig:1,log:'Appointment marked complete'},
        {i:'wait',t:'Wait 3 hours',s:'Wait node',log:'Waiting 3 hours… (sped up for preview)'},
        {i:'wa',t:'Ask feedback',s:'WhatsApp',log:'“How was your visit today?” sent'},
        {i:'ifn',t:'Happy?',s:'IF node',log:'Customer replied “Very good 😊” → positive'},
        {i:'star',t:'Review link',s:'Google review',log:'Google review link sent'} ]
    ];
    var nodesEl = live.querySelector('.nodes'), logEl = live.querySelector('.log-list'), footEl = live.querySelector('.log-foot');
    var tabs = live.querySelectorAll('.live-tabs button');
    var cur = 0, timer = null, runId = 0, visible = false;
    function now(){ var d=new Date(); return d.toTimeString().slice(0,8); }
    function render(k){
      var h='';
      WF[k].forEach(function(n,idx){
        if(idx) h+='<div class="edge"><i></i></div>';
        h+='<div class="node-w"><div class="nd'+(n.trig?' trigger':'')+'">'+I[n.i]+'<span class="st"></span></div><div><b>'+n.t+'</b><small>'+n.s+'</small></div></div>';
      });
      nodesEl.innerHTML=h; logEl.innerHTML=''; footEl.textContent='';
    }
    function run(k){
      var my=++runId; render(k);
      var nds=nodesEl.querySelectorAll('.nd'), eds=nodesEl.querySelectorAll('.edge'), step=0, t0=Date.now();
      function next(){
        if(my!==runId) return;
        if(step>=nds.length){
          footEl.textContent='✓ Execution succeeded in '+((Date.now()-t0)/1000).toFixed(1)+'s';
          timer=setTimeout(function(){ if(my===runId){ cur=(cur+1)%WF.length; select(cur); } },3800);
          return;
        }
        var nd=nds[step]; nd.classList.add('run');
        timer=setTimeout(function(){
          if(my!==runId) return;
          nd.classList.remove('run'); nd.classList.add('ok');
          var li=document.createElement('li'); li.className='ok';
          li.innerHTML='<time>'+now()+'</time><span>'+WF[k][step].log+'</span>'; logEl.appendChild(li);
          if(eds[step]){ eds[step].classList.add('flow');
            timer=setTimeout(function(){ if(my!==runId) return; eds[step].classList.add('done'); step++; next(); },550);
          } else { step++; next(); }
        },650+Math.random()*350);
      }
      next();
    }
    function select(k){
      cur=k; clearTimeout(timer);
      tabs.forEach(function(b,i){ b.setAttribute('aria-selected', i===k?'true':'false'); });
      if(visible) run(k); else render(k);
    }
    tabs.forEach(function(b,i){ b.addEventListener('click', function(){ select(i); }); });
    render(0);
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){ es.forEach(function(e){
        if(e.isIntersecting && !visible){ visible=true; run(cur); }
        else if(!e.isIntersecting && visible){ visible=false; runId++; clearTimeout(timer); }
      }); },{threshold:.25}).observe(live);
    } else { visible=true; run(0); }
  }


  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll progress bar
  var bar = document.querySelector('.progress');
  if (bar) {
    var upd = function(){ var h=document.documentElement; var p=h.scrollTop/((h.scrollHeight-h.clientHeight)||1); bar.style.transform='scaleX('+Math.min(1,Math.max(0,p))+')'; };
    window.addEventListener('scroll', upd, {passive:true}); upd();
  }

  // rotating word in hero tag
  var rw = document.querySelector('.rot-word');
  if (rw && !reduce) {
    var words=['websites','mobile apps','AI agents','n8n automations','WhatsApp bots','Google listings'], wi=0;
    setInterval(function(){
      rw.classList.add('out');
      setTimeout(function(){ wi=(wi+1)%words.length; rw.textContent=words[wi]; rw.classList.remove('out'); rw.classList.add('in'); void rw.offsetWidth; rw.classList.remove('in'); },450);
    },2200);
  }

  // hero toast messages
  var tt = document.querySelector('.toast-txt');
  if (tt && !reduce) {
    var msgs=['New booking confirmed','Lead saved to Google Sheet','Reminder sent on WhatsApp','Review request sent','New enquiry answered'], ti=0;
    setInterval(function(){ tt.classList.add('swap'); setTimeout(function(){ ti=(ti+1)%msgs.length; tt.textContent=msgs[ti]; tt.classList.remove('swap'); },300); },2600);
  }

  // mouse parallax on hero collage
  var col = document.getElementById('collage');
  if (col && !reduce && window.matchMedia('(pointer:fine)').matches) {
    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function(e){
      var r=hero.getBoundingClientRect(); var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      col.style.setProperty('--px',(x*14).toFixed(1)+'px'); col.style.setProperty('--py',(y*14).toFixed(1)+'px');
    });
    hero.addEventListener('mouseleave', function(){ col.style.setProperty('--px','0px'); col.style.setProperty('--py','0px'); });
  }

  // spotlight on cards
  document.querySelectorAll('.card,.wf').forEach(function(el){
    el.addEventListener('mousemove', function(e){ var r=el.getBoundingClientRect(); el.style.setProperty('--mx',(e.clientX-r.left)+'px'); el.style.setProperty('--my',(e.clientY-r.top)+'px'); });
  });

  // stagger reveal delays inside grids
  document.querySelectorAll('.grid,.steps,.wf-grid').forEach(function(g){
    Array.prototype.forEach.call(g.querySelectorAll(':scope > .reveal'), function(el,i){ el.style.setProperty('--i', i%3); });
  });

  // count-up numbers
  var counts = document.querySelectorAll('.count');
  if (counts.length && 'IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function(es){ es.forEach(function(en){
      if(!en.isIntersecting) return; cio.unobserve(en.target);
      var el=en.target, to=+el.dataset.to, t0=null;
      function step(ts){ if(!t0) t0=ts; var p=Math.min(1,(ts-t0)/1200); el.textContent=Math.round(to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); }
      el.textContent='0'; requestAnimationFrame(step);
    }); },{threshold:.6});
    counts.forEach(function(c){ cio.observe(c); });
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
