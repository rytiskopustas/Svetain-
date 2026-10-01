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
      group.hidden = !groupAny;
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
