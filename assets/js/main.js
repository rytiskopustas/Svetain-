// Mobilus meniu
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('meniu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  }
})();

// Artėjantys renginiai: paslepiame tuos, kurie praėjo po paskutinio svetainės atnaujinimo
(function () {
  var d = new Date();
  var today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  document.querySelectorAll('[data-upcoming]').forEach(function (list) {
    var limit = parseInt(list.getAttribute('data-limit') || '0', 10);
    var shown = 0;
    list.querySelectorAll('.event').forEach(function (ev) {
      var visible = ev.getAttribute('data-date') >= today && (!limit || shown < limit);
      ev.hidden = !visible;
      if (visible) shown++;
    });
    var note = list.nextElementSibling;
    if (note && note.classList.contains('empty-note')) note.hidden = shown > 0;
  });
})();

// Naujienų filtravimas pagal temą
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  var items = document.querySelectorAll('[data-filterable] > [data-tags]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
      items.forEach(function (it) {
        it.hidden = f && it.getAttribute('data-tags').split(',').indexOf(f) === -1;
      });
    });
  });
})();

// Išteklių paieška
(function () {
  var input = document.getElementById('paieska');
  if (!input) return;
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var any = false;
    document.querySelectorAll('.res-group').forEach(function (group) {
      var groupAny = false;
      group.querySelectorAll('li[data-search]').forEach(function (li) {
        var match = !q || li.getAttribute('data-search').indexOf(q) !== -1;
        li.hidden = !match;
        if (match) groupAny = true;
      });
      group.hidden = q ? !groupAny : false;
      if (groupAny) any = true;
    });
    document.getElementById('nieko').hidden = any;
  });
})();

// Kontaktų forma (Web3Forms): siunčiama neišeinant iš puslapio
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');

  function show(text, ok) {
    status.textContent = text;
    status.className = 'form-status ' + (ok ? 'is-ok' : 'is-error');
    status.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var data = new FormData(form);
    data.set('message', 'Tema: ' + data.get('tema') + '\n\n' + data.get('message'));
    button.disabled = true;
    button.textContent = 'Siunčiama…';
    status.hidden = true;

    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message);
        form.reset();
        show('Ačiū! Žinutė išsiųsta – atsakysime kaip galima greičiau.', true);
      })
      .catch(function () {
        show('Nepavyko išsiųsti žinutės. Pabandykite dar kartą po kelių minučių.', false);
      })
      .then(function () {
        button.disabled = false;
        button.textContent = 'Siųsti žinutę';
      });
  });
})();

// Renginių kalendorius (mėnesio tinklelis)
(function () {
  var cal = document.querySelector('.calendar');
  var dataEl = document.getElementById('renginiu-duomenys');
  if (!cal || !dataEl) return;

  var events = JSON.parse(dataEl.textContent);
  var MENESIAI = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
  var MEN_KILM = ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'];
  var SAVAITE = ['Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št', 'Sk'];

  var grid = cal.querySelector('.cal-grid');
  var title = cal.querySelector('.cal-title');
  var dialog = document.querySelector('.cal-dialog');

  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
  var now = new Date();
  var today = iso(now.getFullYear(), now.getMonth(), now.getDate());
  var year = now.getFullYear(), month = now.getMonth();

  var byDate = {};
  events.forEach(function (e) { (byDate[e.data] = byDate[e.data] || []).push(e); });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function render() {
    title.textContent = MENESIAI[month] + ' ' + year;
    grid.innerHTML = '';
    SAVAITE.forEach(function (d) { grid.appendChild(el('div', 'cal-dow', d)); });

    var first = new Date(year, month, 1);
    var offset = (first.getDay() + 6) % 7;          // savaitė prasideda pirmadienį
    var days = new Date(year, month + 1, 0).getDate();
    for (var i = 0; i < offset; i++) grid.appendChild(el('div', 'cal-cell is-empty'));

    for (var d = 1; d <= days; d++) {
      var key = iso(year, month, d);
      var list = byDate[key] || [];
      var cell = el(list.length ? 'button' : 'div', 'cal-cell');
      if (key === today) cell.classList.add('is-today');
      if (key < today) cell.classList.add('is-past');
      cell.appendChild(el('span', 'cal-day', String(d)));
      if (list.length) {
        cell.type = 'button';
        cell.classList.add('has-events');
        cell.setAttribute('aria-label', d + ' ' + MEN_KILM[month] + ': ' + list.map(function (e) { return e.pavadinimas; }).join('; '));
        list.forEach(function (e) {
          var chip = el('span', 'cal-event');
          chip.appendChild(el('span', 'cal-event-text', e.pavadinimas));
          cell.appendChild(chip);
        });
        cell.addEventListener('click', open.bind(null, key, list));
      }
      grid.appendChild(cell);
    }
  }

  function open(key, list) {
    var p = key.split('-');
    dialog.querySelector('h3').textContent = p[0] + ' m. ' + MEN_KILM[+p[1] - 1] + ' ' + (+p[2]) + ' d.';
    var body = dialog.querySelector('.cal-dialog-body');
    body.innerHTML = '';
    list.forEach(function (e) {
      var item = el('article', 'cal-dialog-item');
      item.appendChild(el('h4', '', e.pavadinimas));
      var meta = [e.laikas, e.vieta].filter(Boolean).join(' · ');
      if (meta) item.appendChild(el('p', 'meta', meta));
      if (e.aprasymas) item.appendChild(el('p', '', e.aprasymas));
      if (e.nuoroda) {
        var a = el('a', 'btn', 'Daugiau informacijos');
        a.href = e.nuoroda; a.target = '_blank'; a.rel = 'noopener';
        item.appendChild(a);
      }
      body.appendChild(item);
    });
    dialog.showModal();
  }

  // uždaryti paspaudus šalia lango
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });

  cal.querySelectorAll('.cal-nav').forEach(function (b) {
    b.addEventListener('click', function () {
      month += +b.getAttribute('data-cal');
      if (month < 0) { month = 11; year--; }
      if (month > 11) { month = 0; year++; }
      render();
    });
  });
  cal.querySelector('.cal-today-btn').addEventListener('click', function () {
    year = now.getFullYear(); month = now.getMonth(); render();
  });

  render();
})();
