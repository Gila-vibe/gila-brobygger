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
