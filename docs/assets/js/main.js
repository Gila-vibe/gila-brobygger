/* ==========================================================================
   Gila Brobygger – shared behaviour
   - Accessible mobile navigation
   - Local, privacy-safe information chatbot (no network requests)
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */

  var menuButton = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  if (menuButton && nav) {
    var setMenu = function (open) {
      menuButton.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      var label = menuButton.querySelector('.sr-only');
      if (label) label.textContent = open ? 'Luk menu' : 'Åbn menu';
    };

    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        menuButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  /* ----------------------------------------------------------------------
     Autoplay muted video when it scrolls into view
     Privacy-safe: no network requests, no storage. Respects reduced motion.
     ---------------------------------------------------------------------- */

  (function () {
    var videos = document.querySelectorAll('video[data-autoplay-on-view]');
    if (!videos.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    videos.forEach(function (video) {
      video.muted = true;
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(function () { /* autoplay blocked; controls remain */ });
            }
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.5 });
      observer.observe(video);
    });
  })();

  /* ----------------------------------------------------------------------
     Copy-to-clipboard for [data-copy] buttons (e.g. e-mail address)
     Privacy-safe: uses the Clipboard API, no network, no storage.
     ---------------------------------------------------------------------- */

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy') || '';
      var feedback = button.parentElement && button.parentElement.querySelector('.copy-feedback');
      var done = function () {
        if (feedback) feedback.textContent = 'Kopieret!';
        button.textContent = 'Kopieret ✓';
        setTimeout(function () {
          if (feedback) feedback.textContent = '';
          button.textContent = 'Kopier e-mailadresse';
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function () {
          fallbackCopy(value, done);
        });
      } else {
        fallbackCopy(value, done);
      }
    });
  });

  function fallbackCopy(value, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) { /* ignore */ }
  }

  /* ----------------------------------------------------------------------
     Quote request template (mailto-based, no data collection)
     Builds a pre-filled e-mail from the quote fields and opens the
     visitor's own e-mail client. Nothing is sent or stored by the site.
     ---------------------------------------------------------------------- */

  (function () {
    var sendBtn = document.getElementById('q-send');
    var copyBtn = document.getElementById('q-copy');
    var feedback = document.getElementById('q-feedback');
    if (!sendBtn) return;

    var CONTACT = 'kontakt@gila-brobygger.dk';
    var MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    var ALLOWED_TYPES = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 'image/png', 'text/plain'];
    var ALLOWED_EXT = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'];
    var selectedFiles = [];
    var isSubmitting = false;
    var bookingSection = document.getElementById('booking-section');
    var startInput = document.getElementById('q-start');
    var endInput = document.getElementById('q-end');
    var bookingServices = ['Fremmedtolkning', 'Telefontolkning', 'Videotolkning'];

    function fieldValue(id) {
      var el = document.getElementById(id);
      return el ? String(el.value || '').trim() : '';
    }

    function updateBookingSection() {
      if (!bookingSection || !startInput || !endInput) return;
      var selected = fieldValue('q-service');
      var needsBooking = bookingServices.indexOf(selected) !== -1;
      bookingSection.hidden = !needsBooking;
      startInput.disabled = !needsBooking;
      endInput.disabled = !needsBooking;
      startInput.required = needsBooking;
      endInput.required = needsBooking;
      if (!needsBooking) {
        startInput.value = '';
        endInput.value = '';
      }
    }

    function validateBookingTime() {
      if (!bookingSection || bookingSection.hidden) return true;
      if (!startInput.value || !endInput.value) {
        showError('Vælg venligst både start- og sluttidspunkt.');
        return false;
      }
      var startDate = new Date(startInput.value);
      var endDate = new Date(endInput.value);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        showError('Kontrollér de valgte datoer og tidspunkter.');
        return false;
      }
      if (endDate <= startDate) {
        showError('Sluttidspunktet skal være senere end starttidspunktet.');
        return false;
      }
      return true;
    }

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function getFileIcon(name) {
      var ext = name.slice(name.lastIndexOf('.')).toLowerCase();
      if (ext === '.pdf') return '📄';
      if (ext === '.doc' || ext === '.docx') return '📝';
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') return '🖼';
      if (ext === '.txt') return '📃';
      return '📎';
    }

    function renderFileList() {
      var list = document.getElementById('file-list');
      if (!list) return;
      list.innerHTML = '';
      selectedFiles.forEach(function (file, index) {
        var li = document.createElement('li');
        li.className = 'file-item';
        var icon = document.createElement('span');
        icon.className = 'file-icon';
        icon.textContent = getFileIcon(file.name);
        icon.setAttribute('aria-hidden', 'true');
        var info = document.createElement('span');
        info.className = 'file-info';
        var nameSpan = document.createElement('span');
        nameSpan.className = 'file-name';
        nameSpan.textContent = file.name;
        var sizeSpan = document.createElement('span');
        sizeSpan.className = 'file-size';
        sizeSpan.textContent = formatSize(file.size);
        info.appendChild(nameSpan);
        info.appendChild(sizeSpan);
        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'file-remove';
        removeBtn.setAttribute('aria-label', 'Fjern ' + file.name);
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', function () {
          selectedFiles.splice(index, 1);
          renderFileList();
        });
        li.appendChild(icon);
        li.appendChild(info);
        li.appendChild(removeBtn);
        list.appendChild(li);
      });
    }

    function validateFile(file) {
      var ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      if (ALLOWED_EXT.indexOf(ext) === -1) {
        return 'Filtypen ' + ext + ' er ikke tilladt.';
      }
      if (file.size > MAX_FILE_SIZE) {
        return file.name + ' er for stor (maks. 10 MB).';
      }
      return null;
    }

    function addFiles(files) {
      var errors = [];
      Array.prototype.forEach.call(files, function (file) {
        var err = validateFile(file);
        if (err) {
          errors.push(err);
          return;
        }
        // avoid duplicates
        var exists = selectedFiles.some(function (f) {
          return f.name === file.name && f.size === file.size;
        });
        if (!exists) {
          selectedFiles.push(file);
        }
      });
      renderFileList();
      if (errors.length) {
        if (feedback) feedback.textContent = errors.join(' ');
      }
    }

    // Drag-and-drop + click to select
    var uploadArea = document.getElementById('upload-area');
    var fileInput = document.getElementById('q-files');
    if (uploadArea && fileInput) {
      uploadArea.addEventListener('click', function () { fileInput.click(); });
      uploadArea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInput.click();
        }
      });
      fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files.length) {
          addFiles(fileInput.files);
          fileInput.value = '';
        }
      });
      uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('drag-over');
      });
      uploadArea.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('drag-over');
      });
      uploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
          addFiles(e.dataTransfer.files);
        }
      });
    }

    function fieldValue(id) {
      var el = document.getElementById(id);
      return el ? String(el.value || '').trim() : '';
    }

    function buildBody() {
      var navn = fieldValue('q-navn');
      var virk = fieldValue('q-virksomhed');
      var email = fieldValue('q-email');
      var service = fieldValue('q-service');
      var noter = fieldValue('q-noter');
      var deadline = fieldValue('q-deadline');
      var lines = [
        'Navn: ' + (navn || '-'),
        'Virksomhedsnavn/CVR: ' + (virk || '-'),
        'E-mail: ' + (email || '-'),
        'Service: ' + (service || '-'),
      ];
      if (bookingSection && !bookingSection.hidden) {
        lines.push('Fra (start): ' + (fieldValue('q-start') || '-'));
        lines.push('Til (slut): ' + (fieldValue('q-end') || '-'));
      }
      lines.push('Bemærkninger/noter: ' + (noter || '-'));
      lines.push('Evt. deadline: ' + (deadline || '-'));
      if (selectedFiles.length) {
        lines.push('');
        lines.push('Vedhæftede filer (skal vedhæftes manuelt i e-mail-klienten):');
        selectedFiles.forEach(function (f) {
          lines.push('  - ' + f.name + ' (' + formatSize(f.size) + ')');
        });
      }
      lines.push('');
      lines.push('---');
      lines.push('Sendt via gila-brobygger.dk (tilbudsskabelon).');
      return lines.join('\n');
    }

    function buildSubject() {
      var service = fieldValue('q-service');
      var navn = fieldValue('q-navn');
      return 'Tilbudshenvendelse' + (service ? ' – ' + service : '') + (navn ? ' (' + navn + ')' : '');
    }

    function setLoading(loading) {
      var icon = sendBtn.querySelector('.btn-icon');
      var text = sendBtn.querySelector('.btn-text');
      var spinner = sendBtn.querySelector('.btn-spinner');
      if (loading) {
        sendBtn.disabled = true;
        if (icon) icon.hidden = true;
        if (text) text.textContent = 'Åbner e-mail-klient…';
        if (spinner) spinner.hidden = false;
      } else {
        sendBtn.disabled = false;
        if (icon) icon.hidden = false;
        if (text) text.textContent = 'Send forespørgsel';
        if (spinner) spinner.hidden = true;
      }
    }

    function showError(msg) {
      if (feedback) {
        feedback.textContent = msg;
        feedback.style.color = '#b91c1c';
      }
    }

    function showSuccess(msg) {
      if (feedback) {
        feedback.textContent = msg;
        feedback.style.color = 'var(--green-700)';
      }
    }

    // Booking section toggle on service change
    var serviceSelect = document.getElementById('q-service');
    if (serviceSelect) {
      serviceSelect.addEventListener('change', function () {
        updateBookingSection();
        if (feedback) feedback.textContent = '';
      });
    }
    updateBookingSection();

    sendBtn.addEventListener('click', function () {
      if (isSubmitting) return;
      var navn = fieldValue('q-navn');
      var email = fieldValue('q-email');
      var service = fieldValue('q-service');
      // validate
      if (!navn) { showError('Udfyld venligst navn (obligatorisk).'); return; }
      if (!email) { showError('Udfyld venligst e-mail (obligatorisk).'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('Indtast en gyldig e-mailadresse.'); return;
      }
      if (!service) { showError('Vælg venligst en service (obligatorisk).'); return; }
      if (!validateBookingTime()) return;

      isSubmitting = true;
      setLoading(true);
      showSuccess('');

      setTimeout(function () {
        var subject = encodeURIComponent(buildSubject());
        var body = encodeURIComponent(buildBody());
        window.location.href = 'mailto:' + CONTACT + '?subject=' + subject + '&body=' + body;
        showSuccess('Din e-mail-klient åbnes med en forberedt besked. Vedhæft eventuelle filer der og send.');
        setLoading(false);
        isSubmitting = false;
      }, 600);
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var text = buildBody();
        var done = function () {
          showSuccess('Skabelon kopieret til udklipsholder!');
          setTimeout(function () { if (feedback) feedback.textContent = ''; }, 2500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      });
    }

    function fallbackCopy(value, done) {
      try {
        var ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
      } catch (e) { /* ignore */ }
    }
  })();

  /* ----------------------------------------------------------------------
     Current year
     ---------------------------------------------------------------------- */

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------------------------------------
     Local information chatbot
     All text stays in the browser. No messages are sent or stored.
     ---------------------------------------------------------------------- */

  if (document.getElementById('gb-chatbot')) return;

  var CONTACT_EMAIL = 'kontakt@gila-brobygger.dk';
  var CONTACT_PHONE = '+45 31 84 70 40';

  var GREETING =
    'Hej! Jeg er en automatisk guide på Gila Brobyggers hjemmeside. ' +
    'Jeg kan give kort information om tjenesterne og henvise til kontakt. ' +
    'Hvad vil du vide?';

  function botReply(raw) {
    var t = (raw || '').toLowerCase();

    if (/(pris|koster|kost|tilbud|honorar|betaling)/.test(t)) {
      return 'Pris og tid aftales ud fra opgavens art og omfang. Kontakt os på ' +
        CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + ', så får du et konkret svar.';
    }
    if (/(cpr|helse|sygdom|diagnose|journal|fortrolig|følsom)/.test(t)) {
      return 'Skriv ikke CPR-nummer, helseoplysninger eller følsomme familieoplysninger i chatten. ' +
        'Kontakt os i stedet direkte på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '.';
    }
    if (/(book|bestil|aftale|møde|tid|dato|ledig)/.test(t)) {
      return 'Du booker ved at skrive eller ringe. Fortæl kort om opgaven, sproget, dato og sted, ' +
        'så vender vi tilbage med en aftale. E-mail: ' + CONTACT_EMAIL + ' · Telefon: ' + CONTACT_PHONE + '.';
    }
    if (/(telefon|ring|nummer|kontakt|email|e-mail|mail)/.test(t)) {
      return 'Du kan kontakte Gila Brobygger på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '.';
    }
    if (/(familie|familier|konflikt|barn|sag|myndighed)/.test(t)) {
      return 'Familiekonsulent tilbyder støtte og vejledning til familier – blandt andet kommunikation, ' +
        'konflikthåndtering og samarbejde med myndigheder. Læs mere under Tjenester → Familiekonsulent.';
    }
    if (/(mentor|integration|jobsøgning|cv|system|hverdag)/.test(t)) {
      return 'Social Mentor er individuel støtte, møde- og systemvejledning og hverdagsrådgivning. ' +
        'Mentorforløb kan foregå på tigrinya. Læs mere under Tjenester → Social Mentor.';
    }
    if (/(oversæt|oversættelse|skriftlig|dokument|brev|papir)/.test(t)) {
      return 'Skriftlig oversættelse omfatter breve, dokumenter og officielle papirer – fra og til tigrinya. ' +
        'Læs mere under Tjenester → Skriftlig oversættelse.';
    }
    if (/(video|online|skærm)/.test(t)) {
      return 'Videotolkning foregår online og passer til møder og samtaler, hvor I har brug for visuel kontakt. ' +
        'Læs mere under Tjenester → Videotolkning.';
    }
    if (/(tolk|tolkning|sprog|tigrinya|fremmed|telefon)/.test(t)) {
      return 'Gila Brobygger tilbyder fremmedtolkning, telefontolkning, videotolkning og skriftlig oversættelse. ' +
        'Fortæl kort om situationen, eller kontakt os på ' + CONTACT_EMAIL + ' / ' + CONTACT_PHONE + '.';
    }
    if (/(hej|halløj|godmorgen|goddag|tak)/.test(t)) {
      return 'Hej! Hvad kan jeg hjælpe med – tolkning, oversættelse, mentorforløb eller familiekonsulent?';
    }
    return 'Jeg kan svare kort om tolkning, oversættelse, mentorforløb, familiekonsulent og kontakt. ' +
      'Skriv gerne et nøgleord, eller kontakt os direkte på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '.';
  }

  var root = document.createElement('div');
  root.id = 'gb-chatbot';

  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'gb-fab';
  fab.setAttribute('aria-label', 'Åbn chat');
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-controls', 'gb-chat-panel');
  fab.textContent = '💬';

  var panel = document.createElement('section');
  panel.id = 'gb-chat-panel';
  panel.className = 'gb-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'gb-chat-title');
  panel.setAttribute('aria-describedby', 'gb-chat-disclaimer');
  panel.innerHTML =
    '<div class="gb-head">' +
      '<span class="gb-title" id="gb-chat-title">Gila Brobygger – guide</span>' +
      '<button type="button" class="gb-close" aria-label="Luk chat">✕</button>' +
    '</div>' +
    '<div class="gb-messages" id="gb-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>' +
    '<form class="gb-form" id="gb-chat-form">' +
      '<label class="sr-only" for="gb-chat-input">Skriv en besked</label>' +
      '<input class="gb-input" id="gb-chat-input" name="message" type="text" ' +
        'placeholder="Skriv en besked…" autocomplete="off" maxlength="500">' +
      '<button class="gb-send" type="submit">Send</button>' +
    '</form>' +
    '<p class="gb-disclaimer" id="gb-chat-disclaimer">' +
      'Automatisk guide. Chatten kører kun i din browser, og beskeder gemmes eller sendes ikke. ' +
      'Skriv ikke CPR-nummer, helseoplysninger eller andre følsomme oplysninger.' +
    '</p>';

  root.appendChild(fab);
  root.appendChild(panel);
  document.body.appendChild(root);

  var messages = panel.querySelector('#gb-chat-messages');
  var input = panel.querySelector('#gb-chat-input');
  var form = panel.querySelector('#gb-chat-form');
  var closeButton = panel.querySelector('.gb-close');

  function addMessage(text, who) {
    var item = document.createElement('div');
    item.className = 'gb-msg ' + who;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function openChat() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    fab.setAttribute('aria-label', 'Luk chat');
    if (!messages.childElementCount) addMessage(GREETING, 'bot');
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-label', 'Åbn chat');
    fab.focus();
  }

  fab.addEventListener('click', function () {
    if (panel.hidden) openChat(); else closeChat();
  });

  closeButton.addEventListener('click', closeChat);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    addMessage(botReply(text), 'bot');
    input.focus();
  });

  panel.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeChat();
      return;
    }
    if (event.key !== 'Tab') return;
    var focusable = panel.querySelectorAll('button, input, a[href]');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
