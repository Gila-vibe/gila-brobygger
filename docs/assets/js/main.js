/* =========================================
   Gila Brobygger – Chatbot widget
   Adds a floating chatbot to the site.
   ========================================= */
(function () {
    if (document.getElementById('gb-chatbot')) return;

    var BOT_NAME = 'Gila';
    var GREETING = 'Hej! 👋 Jeg er Gila Brobygger. Jeg kan hjælpe dig med spørgsmål om tolkning, oversættelse, mentorforløb og familiekonsulent. Hvad kan jeg hjælpe dig med i dag?';

    function botReply(text) {
        var t = (text || '').toLowerCase();
        if (/(pris|price|cost|øre|betalt|indkøb|pakke)/.test(t)) {
            return 'Vi tilbyder forskellige priser afhængigt af service og varighed. Tolk/telefon/videotolk starter typisk ved 89 kr/ord/45 min, skriftlig oversættelse ved 89 kr/time, mentorforløb og familiekonsulent efter aftale. Skriv ”Få et tilbud” for en personlig pris.';
        }
        if (/(telefon|ring|book|bestil|vedrørende telefon|telefonsøgning)/.test(t)) {
            return 'Du kan ringe mig direkte på +45 31 84 70 40, eller book via ”Bestil tolk” på forsiden. Jeg kan også sætte dig i kontakt med den rigtige tolk eller mentor.';
        }
        if (/(familie|familier|konflikt|hjælp til familien|barnet)/.test(t)) {
            return 'For familier kan jeg hjælpe med vejledning om konflikthåndtering, kommunikation med myndigheder og støtte i hjemmet. Klik på ”Familiekonsulent” under Service for at læse mere, eller brug kontaktformularen så laver jeg en indledende dialog.';
        }
        if (/(mentor|social mentor|integration)/.test(t)) {
            return 'Jeg kan fortælle mere om vores social mentorforløb – individuel støtte og vejledning til integration, møde- og systemvejledning. Findes under ”Social Mentor” under Service, eller skriv ”Få et tilbud”.';
        }
        if (/(sprog|tolk|tolkning|fremmed|beskyttet|migrant|migreret|eritrea)/.test(t)) {
            return 'Vi tilbyder fremmedtolkning, telefon- og videotolkning samt skriftlig oversættelse. Jeg kan hjælpe dig med at finde den rigtige løsning – skriv hvad situationen drejer, så foreslår jeg den bedste service.';
        }
        if (/(oversættelse|skriftlig|breve|dokumenter)/.test(t)) {
            return 'Vi tilbyder skriftlig oversættelse af breve, dokumenter og offentlige papirer – fra og til tyrkisk, med sprollig præcision. Læs mere under ”Skriftlig Oversættelse” eller bestil via ”Få et tilbud”.';
        }
        if (/(møde|video|videotolk|videoopkobling)/.test(t)) {
            return 'Vi tilbyder videotolkning for møder og akutte samtaler – online video med forbindelse til tolkken. Se ”Videotolkning” under Service eller bestil via ”Bestil tolk”.';
        }
        if (/(hej|halløj|hi|hello|godmorgen|godmorgen|godeftermiddag|godeftermiddag|tak|thank)/.test(t)) {
            return 'Hej! 😊 Tak for at kontakte mig. Hvad ved du om vores tolkning eller støtte? Jeg kan hjælpe med at finde den rette løsning.';
        }
        return 'Jeg forstår. Jeg kan hjælpe dig med at finde den rigtige tolkning, oversættelse, mentorforløb eller støtte. Skriv mere om din situation, eller brug kontaktformularen / telefon +45 31 84 70 40 så sørger jeg for en menneskelig samtale.';
    }

    var style = document.createElement('style');
    style.textContent = [
        '#gb-chat-fab{position:fixed;right:22px;bottom:22px;width:58px;height:58px;border-radius:50%;',
        'background:#00a86b;border:none;color:#fff;font-size:26px;cursor:pointer;z-index:12000;',
        'box-shadow:0 10px 26px rgba(0,0,0,.25);transition:transform .2s;}',
        '#gb-chat-fab:hover{transform:scale(1.06);}',
        '#gb-chat-panel{position:fixed;right:22px;bottom:92px;width:360px;max-width:calc(100vw - 32px);height:480px;max-height:calc(100vh - 120px);',
        'background:#fff;border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.28);z-index:12001;',
        'display:none;flex-direction:column;overflow:hidden;font-family:inherit;}',
        '#gb-chat-panel.open{display:flex;}',
        '#gb-chat-head{background:linear-gradient(120deg,#2e8b57,#66bb6a);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px;}',
        '#gb-chat-head .gb-title{font-weight:700;flex:1;}',
        '#gb-chat-head button{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;}',
        '#gb-chat-body{padding:14px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:8px;}',
        '.gb-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:.92rem;line-height:1.45;white-space:pre-wrap;}',
        '.gb-msg.bot{background:#f1f5f3;color:#333;align-self:flex-start;border-bottom-left-radius:4px;}',
        '.gb-msg.user{background:#00a86b;color:#fff;align-self:flex-end;border-bottom-right-radius:4px;}',
        '#gb-chat-form{display:flex;gap:8px;padding:10px;border-top:1px solid #e5e7f0;}',
        '#gb-chat-input{flex:1;border:1px solid #d6eae0;border-radius:20px;padding:10px 14px;font-size:.92rem;font-family:inherit;outline:none;}',
        '#gb-chat-send{background:#00a86b;color:#fff;border:none;border-radius:20px;padding:10px 16px;font-weight:700;cursor:pointer;}'
    ].join('\n');

    var el = document.createElement('div');
    el.id = 'gb-chatbot';
    var fab = document.createElement('button');
    fab.id = 'gb-chat-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Start chat');
    fab.innerHTML = '💬';
    var panel = document.createElement('div');
    panel.id = 'gb-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with Gila Brobygger');
    panel.innerHTML =
        '<div class="gb-head" style="display:flex;align-items:center;gap:10px;padding:14px 16px;background:linear-gradient(120deg,#2e8b57,#66bb6a);color:#fff;">' +
            '<div style="font-weight:700;flex:1;">💬 Chat med Gila</div>' +
            '<button type="button" id="gb-chat-close" aria-label="Close chat" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;">✕</button>' +
        '</div>' +
        '<div class="gb-body" id="gb-chat-body"></div>' +
        '<form class="gb-form" id="gb-chat-form">' +
            '<input class="gb-input" id="gb-chat-input" type="text" placeholder="Skriv besked..." autocomplete="off" />' +
            '<button class="gb-send" id="gb-chat-send" type="submit">Send</button>' +
        '</form>';
    document.head.appendChild(style);
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    var body = panel.querySelector('#gb-chat-body');
    var input = panel.querySelector('#gb-chat-input');
    var form = panel.querySelector('#gb-chat-form');
    var fabEl = fab;

    function addMsg(text, who) {
        var d = document.createElement('div');
        d.className = 'gb-msg ' + who;
        d.textContent = text;
        body.appendChild(d);
        body.scrollTop = body.scrollHeight;
        return d;
    }

    function open() {
        panel.classList.add('open');
        fabEl.setAttribute('aria-label', 'Close chat');
        fabEl.innerHTML = '✕';
        if (!body.childElementCount) addMsg(GREETING, 'bot');
    }

    function close() {
        panel.classList.remove('open');
        fabEl.setAttribute('aria-label', 'Start chat');
        fabEl.innerHTML = '💬';
    }

    fabEl.addEventListener('click', function () {
        if (panel.classList.contains('open')) close(); else open();
    });

    panel.querySelector('#gb-chat-close').addEventListener('click', close);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var txt = input.value.trim();
        if (!txt) return;
        addMsg(txt, 'user');
        input.value = '';
        var reply = botReply(txt);
        setTimeout(function () { addMsg(reply, 'bot'); }, 650);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && panel.classList.contains('open')) close();
    });
})();
