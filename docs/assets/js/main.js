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
        var mailtoUrl = 'mailto:' + CONTACT + '?subject=' + subject + '&body=' + body;
        // Use a temporary link element for reliable cross-browser mailto triggering
        var link = document.createElement('a');
        link.href = mailtoUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showSuccess('Din e-mail-klient åbnes med en forberedt besked. Vedhæft eventuelle filer der og send. Hvis intet sker, brug "Kopier skabelon"-knappen.');
        setLoading(false);
        isSubmitting = false;
      }, 300);
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
  var QUOTE_URL = 'faa-et-tilbud.html';

  var GREETING =
    'Hej og velkommen til Gila Brobygger!\n\n' +
    'Jeg hedder Gila Brobyggers virtuelle assistent, og jeg vil gerne hjælpe dig.\n\n' +
    'Du kan spørge mig om vores tolkeservice, oversættelser, Social Mentor, ' +
    'Familiekonsulent, priser, booking eller andre spørgsmål.\n\n' +
    'Hvad kan jeg hjælpe dig med i dag?';

  var SUGGESTED = [
    'Jeg har brug for en tolk',
    'Jeg har brug for akut tolkning',
    'Jeg ønsker en certificeret oversættelse',
    'Jeg vil høre om telefontolkning',
    'Jeg vil høre om videotolkning',
    'Jeg vil høre om Social Mentor',
    'Jeg vil høre om Familiekonsulent',
    'Hvordan får jeg et tilbud?',
    'Hvilke sprog tilbyder I?'
  ];

  var FALLBACK =
    'Det vil jeg gerne hjælpe dig med at få afklaret. Kontakt os venligst på ' +
    CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '.';

  var ENGLISH_WORDS = /\b(hello|hi|hey|what|how|where|when|who|please|thank|thanks|interpret|translate|translation|language|price|cost|book|booking|contact|help|service|mentor|family|urgent)\b/i;

  function isEnglish(text) {
    return ENGLISH_WORDS.test(text || '');
  }

  function botReply(raw) {
    var t = (raw || '').toLowerCase();
    var en = isEnglish(raw);

    // Sensitive data guard
    if (/(cpr|helse|sygdom|diagnose|journal|fortrolig|følsom|medical|health|ssn)/.test(t)) {
      if (en) return 'Please do not share CPR numbers, health information or sensitive family details in the chat. Contact us directly at ' + CONTACT_EMAIL + ' or ' + CONTACT_PHONE + '.';
      return 'Skriv ikke CPR-nummer, helseoplysninger eller følsomme familieoplysninger i chatten. ' +
        'Kontakt os i stedet direkte på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '.';
    }

    // Price / quote
    if (/(pris|koster|kost|tilbud|honorar|betaling|price|cost|quote|rate)/.test(t)) {
      if (en) return 'Prices depend on the type and scope of the assignment. Contact us at ' + CONTACT_EMAIL + ' or ' + CONTACT_PHONE + ' for a specific quote. You can also use our quote form: ' + QUOTE_URL;
      return 'Pris og tid aftales ud fra opgavens art og omfang. Kontakt os på ' +
        CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + ', så får du et konkret svar. Du kan også bruge vores tilbudsskabelon: ' + QUOTE_URL;
    }

    // Urgent
    if (/(akut|haste|hurtig|urgent|emergency|asap|straks)/.test(t)) {
      if (en) return 'We accept urgent interpreting requests, but availability must always be confirmed. Please call us directly at ' + CONTACT_PHONE + ' for urgent requests.';
      return 'Vi tager imod akutte tolkeanmodninger, men tilgængelighed skal altid bekræftes. Ring direkte til os på ' + CONTACT_PHONE + ' ved akutte henvendelser.';
    }

    // Certified translations
    if (/(certificer|autoriser|bevilling|officiel oversættelse|certified|official translation|sworn)/.test(t)) {
      if (en) return 'Certified translations are available. Requirements depend on the document and the receiving authority. Contact us at ' + CONTACT_EMAIL + ' or ' + CONTACT_PHONE + ' for details.';
      return 'Certificerede oversættelser er tilgængelige. Kravene afhænger af dokumentet og den modtagende myndighed. Kontakt os på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + ' for detaljer.';
    }

    // Contact info
    if (/(telefon|ring|nummer|kontakt|email|e-mail|mail|phone|number|address|adresse|where|hvornår|åbningstid)/.test(t)) {
      if (en) return 'You can contact Gila Brobygger at ' + CONTACT_EMAIL + ' or ' + CONTACT_PHONE + '. We are located in Vojens, Denmark. Opening hours: Mon–Thu 08:00–16:00, Fri 08:00–15:00.';
      return 'Du kan kontakte Gila Brobygger på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '. Vi er beliggende i Vojens. Åbningstider: man–tor 08:00–16:00, fre 08:00–15:00.';
    }

    // What is Gila Brobygger
    if (/(hvad er gila|what is gila|om gila|about gila|who is gila|hvem er gila)/.test(t)) {
      if (en) return 'Gila Brobygger is a Danish organisation offering interpreting, written translation, social mentoring and family consultant services. We build bridges between people, cultures and systems. Visit ' + QUOTE_URL + ' to request a quote.';
      return 'Gila Brobygger er en dansk organisation, der tilbyder tolkning, skriftlig oversættelse, social mentor og familiekonsulentbistand. Vi bygger bro mellem mennesker, kulturer og systemer. Besøg ' + QUOTE_URL + ' for at få et tilbud.';
    }

    // Languages
    if (/(sprog|language|which language|hvilke sprog|tilbyder i)/.test(t)) {
      if (en) return 'We offer interpreting and translation in: Danish, English, Tigrinya, Arabic and Russian. In-person interpreting is available throughout Denmark.';
      return 'Vi tilbyder tolkning og oversættelse på: dansk, engelsk, tigrinya, arabisk og russisk. Fremmedtolkning tilbydes i hele Danmark.';
    }

    // In-person interpreting
    if (/(fremmedtolk|ansigt|personligt|in.person|face.to.face|physical)/.test(t)) {
      if (en) return 'In-person interpreting means the interpreter is physically present at meetings, home visits and institutions. It is ideal when visual contact and body language matter. Read more: fremmedtolkning.html';
      return 'Fremmedtolkning er tolkning med fysisk tilstedeværelse ved møder, hjemmebesøg og i institutioner. Det er velegnet, når visuel kontakt og kropsprog er vigtigt. Læs mere: fremmedtolkning.html';
    }

    // Telephone interpreting
    if (/(telefontolk|telefon|phone interpret)/.test(t)) {
      if (en) return 'Telephone interpreting is fast and flexible – ideal for short conversations and urgent situations. Read more: telefontolkning.html';
      return 'Telefontolkning er hurtig og fleksibel – velegnet til korte samtaler og akutte situationer. Læs mere: telefontolkning.html';
    }

    // Video interpreting
    if (/(videotolk|video|online|skærm|screen)/.test(t)) {
      if (en) return 'Video interpreting is done online with visual contact – great for meetings where you need to see each other. Read more: videotolkning.html';
      return 'Videotolkning foregår online og giver visuel kontakt – god til møder og samtaler, hvor I har brug for at se hinanden. Læs mere: videotolkning.html';
    }

    // Difference between interpreting types
    if (/(forskel|difference|difference between|hvad er forskellen)/.test(t)) {
      if (en) return 'In-person: interpreter physically present. Telephone: via phone, fast and flexible. Video: online with visual contact. Choose based on your situation and needs.';
      return 'Fremmedtolkning: tolk fysisk til stede. Telefontolkning: via telefon, hurtig og fleksibel. Videotolkning: online med visuel kontakt. Vælg ud fra situation og behov.';
    }

    // Written translation
    if (/(oversæt|oversættelse|skriftlig|dokument|brev|papir|translation|document|certified)/.test(t)) {
      if (en) return 'Written translation covers letters, documents and official papers – to and from Tigrinya. Certified translations are available; requirements depend on the document and receiving authority. Read more: skriftligoversaettelse.html';
      return 'Skriftlig oversættelse omfatter breve, dokumenter og officielle papirer – fra og til tigrinya. Certificerede oversættelser er tilgængelige; kravene afhænger af dokumentet og den modtagende myndighed. Læs mere: skriftligoversaettelse.html';
    }

    // Social Mentor
    if (/(mentor|integration|jobsøgning|cv|system|hverdag|mentorship)/.test(t)) {
      if (en) return 'Social Mentor provides individual support, meeting and system guidance, and everyday counselling. Mentoring can be in Tigrinya. Read more: mentorforloeb.html';
      return 'Social Mentor er individuel støtte, møde- og systemvejledning og hverdagsrådgivning. Mentorforløb kan foregå på tigrinya. Læs mere: mentorforloeb.html';
    }

    // Familiekonsulent
    if (/(familie|familier|konflikt|barn|sag|myndighed|family|children|conflict)/.test(t)) {
      if (en) return 'Family consultant provides support and guidance to families – communication, conflict resolution and cooperation with authorities. Read more: familiekonsulent.html';
      return 'Familiekonsulent tilbyder støtte og vejledning til familier – blandt andet kommunikation, konflikthåndtering og samarbejde med myndigheder. Læs mere: familiekonsulent.html';
    }

    // Støtteperson
    if (/(støtteperson|anbring|anbragt|§ ?75|support person|care)/.test(t)) {
      if (en) return 'Support person under Barnets Lov § 75 provides neutral, independent support to parents with children in care. Read more: stoetteperson.html';
      return 'Støtteperson under Barnets Lov § 75 yder neutral og uafhængig støtte til forældre med anbragte børn. Læs mere: stoetteperson.html';
    }

    // Customer groups
    if (/(kommune|skole|institution|virksomhed|forening|organisation|customer|client|who can|hvem kan)/.test(t)) {
      if (en) return 'Our services are used by municipalities, schools, public institutions, organisations and businesses. Contact us to discuss your needs.';
      return 'Vores ydelser bruges af kommuner, skoler og uddannelsesinstitutioner, offentlige institutioner, foreninger og virksomheder. Kontakt os for at drøfte dine behov.';
    }

    // Quote / booking
    if (/(tilbud|quote|request|book|bestil|aftale|møde|tid|dato|ledig|how to get)/.test(t)) {
      if (en) return 'You can request a quote here: ' + QUOTE_URL + '. Or contact us at ' + CONTACT_EMAIL + ' or ' + CONTACT_PHONE + '. Tell us about the task, language, date and location.';
      return 'Du kan anmode om et tilbud her: ' + QUOTE_URL + '. Eller kontakt os på ' + CONTACT_EMAIL + ' eller ' + CONTACT_PHONE + '. Fortæl kort om opgaven, sproget, dato og sted.';
    }

    // Greetings
    if (/(hej|halløj|godmorgen|goddag|hello|hi|hey|tak|thanks|thank you)/.test(t)) {
      if (en) return 'Hello! How can I help you – interpreting, translation, mentoring or family consultant services?';
      return 'Hej! Hvad kan jeg hjælpe med – tolkning, oversættelse, mentorforløb eller familiekonsulent?';
    }

    // Fallback
    if (en) return 'I would like to help you get that clarified. Please contact us at ' + CONTACT_EMAIL + ' or ' + CONTACT_PHONE + '.';
    return FALLBACK;
  }

  var root = document.createElement('div');
  root.id = 'gb-chatbot';

  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'gb-fab';
  fab.setAttribute('aria-label', 'Åbn chat');
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-controls', 'gb-chat-panel');
  fab.textContent = '\ud83d\udcac';

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
      '<button type="button" class="gb-close" aria-label="Luk chat">\u2715</button>' +
    '</div>' +
    '<div class="gb-messages" id="gb-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>' +
    '<div class="gb-suggestions" id="gb-chat-suggestions"></div>' +
    '<form class="gb-form" id="gb-chat-form">' +
      '<label class="sr-only" for="gb-chat-input">Skriv en besked</label>' +
      '<input class="gb-input" id="gb-chat-input" name="message" type="text" ' +
        'placeholder="Skriv en besked\u2026" autocomplete="off" maxlength="500">' +
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
  var suggestions = panel.querySelector('#gb-chat-suggestions');
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

  function addSuggestions() {
    if (!suggestions) return;
    suggestions.innerHTML = '';
    SUGGESTED.forEach(function (q) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gb-suggestion';
      btn.textContent = q;
      btn.addEventListener('click', function () {
        addMessage(q, 'user');
        addMessage(botReply(q), 'bot');
        input.focus();
      });
      suggestions.appendChild(btn);
    });
  }

  function openChat() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    fab.setAttribute('aria-label', 'Luk chat');
    if (!messages.childElementCount) {
      addMessage(GREETING, 'bot');
      addSuggestions();
    }
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
