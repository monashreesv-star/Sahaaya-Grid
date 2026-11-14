/* ==========================================================================
   SAHAAYA GRID — Volunteer Responder Client Logic
   Trilingual (EN, ML, TA), High-Precision 30s Countdown Timer,
   Audio Chime Alert, Dynamic Responders List, Zero-Flicker State Rendering
   ========================================================================== */

const translations = {
  en: {
    responder_auth: 'FIELD RESPONDER PORTAL',
    volunteer_login_title: 'Volunteer Login',
    volunteer_login_desc: 'Sign in with your assigned volunteer credentials to receive live incident dispatches.',
    username_label: 'Username / Volunteer ID:',
    password_label: 'Password / Security PIN:',
    signin_btn: 'Sign In to Shift',
    quick_demo_login: 'QUICK DEMO RESPONDERS:',
    logout_btn: 'Logout ⏻',
    responder_active_shift: 'ACTIVE SHIFT · FIELD RESPONSE',
    hi_prefix: 'Hi,',
    active_responder_title: 'ACTIVE RESPONDER:',
    dispatch_status: 'DISPATCH STATUS',
    no_active_tasks: 'No active tasks',
    ready_for_dispatch: 'You are marked AVAILABLE. When an incident occurs near your sector, it will appear here immediately.',
    shift_summary: 'YOUR SHIFT ACTIVITY',
    stat_resolved: 'Incidents Resolved',
    stat_dispatched: 'Total Dispatched',
    stat_presence: 'Presence',
    response_protocol: 'EMERGENCY PROTOCOL',
    step_1: 'Accept Dispatch: Respond within 30 seconds when an incident is assigned.',
    step_2: 'Arrive On Scene: Click "Start Response" upon reaching the attendee.',
    step_3: 'Resolve Safely: Provide first-aid/assistance, enter a resolution note, and mark resolved.',
    decline_task_title: 'Decline Assignment',
    decline_task_desc: 'Please select a reason for declining this emergency dispatch:',
    cancel_btn: 'Cancel',
    confirm_decline_btn: 'Decline & Escalate',
    resolve_task_title: 'Resolve Incident',
    resolve_task_desc: 'Provide an optional resolution summary for the Command Center and attendee:',
    confirm_resolve_btn: 'Mark Resolved ✓',
    command_center_link: '← Command Center',
    civilian_report_link: 'Civilian Report Page',
    task_incoming: '🚨 EMERGENCY DISPATCH ASSIGNED',
    accept_task_btn: 'ACCEPT ASSIGNMENT →',
    decline_task_btn: 'Cannot Accept',
    start_response_btn: 'ARRIVED ON SCENE (START RESPONSE) →',
    mark_resolved_btn: 'MARK RESOLVED ✓',
    open_map_btn: 'Open Venue Map 📍',
    timer_expired: 'EXPIRED',
    avail_status: 'AVAILABLE',
    offline_status: 'OFFLINE',
    presence_avail: 'Available',
    presence_busy: 'On Task'
  },
  ml: {
    responder_auth: 'ഫീൽഡ് വളണ്ടിയർ പോർട്ടൽ',
    volunteer_login_title: 'വളണ്ടിയർ ലോഗിൻ',
    volunteer_login_desc: 'അടിയന്തര രക്ഷാദൗത്യങ്ങൾ ലഭിക്കുന്നതിന് നിങ്ങളുടെ യൂസർ വിവരങ്ങൾ നൽകി പ്രവേശിക്കുക.',
    username_label: 'യൂസർനെയിം / വളണ്ടിയർ ഐഡി:',
    password_label: 'പാസ്‌വേഡ് / സുരക്ഷാ പിൻ:',
    signin_btn: 'ഡ്യൂട്ടി ആരംഭിക്കുക',
    quick_demo_login: 'ഡെമോ വളണ്ടിയർമാർ:',
    logout_btn: 'പുറത്തുകടക്കുക ⏻',
    responder_active_shift: 'സജീവ ഡ്യൂട്ടി · ഫീൽഡ് റെസ്‌പോൺസ്',
    hi_prefix: 'നമസ്കാരം,',
    active_responder_title: 'നിലവിലെ വളണ്ടിയർ:',
    dispatch_status: 'ദൗത്യ നില',
    no_active_tasks: 'നിലവിൽ പുതിയ ചുമതലകളില്ല',
    ready_for_dispatch: 'നിങ്ങൾ ലഭ്യമാണ്. നിങ്ങളുടെ മേഖലയിൽ അടിയന്തര സാഹചര്യം ഉണ്ടായാൽ ഇവിടെ ഉടനടി കാണിക്കും.',
    shift_summary: 'ഇന്നത്തെ സേവന വിവരങ്ങൾ',
    stat_resolved: 'പരിഹരിച്ചവ',
    stat_dispatched: 'ആകെ ലഭിച്ചവ',
    stat_presence: 'ലഭ്യത',
    response_protocol: 'അടിയന്തര നടപടിക്രമങ്ങൾ',
    step_1: 'ദൗത്യം സ്വീകരിക്കുക: കോൾ വന്ന് 30 സെക്കൻഡിനകം സ്വീകരിക്കുക.',
    step_2: 'സ്ഥലത്തെത്തുക: സ്ഥലത്ത് എത്തുമ്പോൾ "പ്രവർത്തനം ആരംഭിക്കുക" ക്ലിക്ക് ചെയ്യുക.',
    step_3: 'സുരക്ഷിതമായി പൂർത്തിയാക്കുക: പ്രഥമശുശ്രൂഷ/സഹായം നൽകി "പരിഹരിച്ചു" എന്ന് രേഖപ്പെടുത്തുക.',
    decline_task_title: 'ദൗത്യം നിരസിക്കുക',
    decline_task_desc: 'ഈ അടിയന്തര കോൾ നിരസിക്കുന്നതിനുള്ള കാരണം തിരഞ്ഞെടുക്കുക:',
    cancel_btn: 'റദ്ദാക്കുക',
    confirm_decline_btn: 'നിരസിച്ചു കൈമാറുക',
    resolve_task_title: 'ദൗത്യം പൂർത്തിയാക്കുക',
    resolve_task_desc: 'കൺട്രോൾ റൂമിനും സഹായം തേടിയ ആൾക്കുമുള്ള പരിഹാര വിവരങ്ങൾ നൽകുക:',
    confirm_resolve_btn: 'പരിഹരിച്ചു എന്ന് രേഖപ്പെടുത്തുക ✓',
    command_center_link: '← കൺട്രോൾ റൂം',
    civilian_report_link: 'പൊതുജന സഹായ പേജ്',
    task_incoming: '🚨 അടിയന്തര ദൗത്യം നിയോഗിക്കപ്പെട്ടു',
    accept_task_btn: 'ദൗത്യം സ്വീകരിക്കുക →',
    decline_task_btn: 'സ്വീകരിക്കാൻ കഴിയില്ല',
    start_response_btn: 'സ്ഥലത്തെത്തി (പ്രവർത്തനം ആരംഭിക്കുക) →',
    mark_resolved_btn: 'പരിഹരിച്ചു എന്ന് രേഖപ്പെടുത്തുക ✓',
    open_map_btn: 'വേദി മാപ്പ് തുറക്കുക 📍',
    timer_expired: 'കാലാവധി കഴിഞ്ഞു',
    avail_status: 'ലഭ്യമാണ്',
    offline_status: 'ഓഫ്‌ലൈൻ',
    presence_avail: 'ലഭ്യമാണ്',
    presence_busy: 'ഡ്യൂട്ടിയിൽ'
  },
  ta: {
    responder_auth: 'கள மீட்பாளர் தளம்',
    volunteer_login_title: 'தன்னார்வலர் உள்நுழைவு',
    volunteer_login_desc: 'அவசர சம்பவ பணிகளைப் பெற உங்கள் உள்நுழைவு விவரங்களை உள்ளிடவும்.',
    username_label: 'பயனர் பெயர் / அடையாள எண்:',
    password_label: 'கடவுச்சொல் / பின்:',
    signin_btn: 'பணியைத் தொடங்குக',
    quick_demo_login: 'டெமோ தன்னார்வலர்கள்:',
    logout_btn: 'வெளியேறு ⏻',
    responder_active_shift: 'செயலில் உள்ள பணி · அவசர மீட்பு',
    hi_prefix: 'வணக்கம்,',
    active_responder_title: 'செயலில் உள்ள தன்னார்வலர்:',
    dispatch_status: 'அழைப்பு நிலை',
    no_active_tasks: 'தற்போது புதிய பணிகள் இல்லை',
    ready_for_dispatch: 'நீங்கள் தயார் நிலையில் உள்ளீர்கள். உங்கள் பகுதியில் அவசரநிலை ஏற்பட்டால் உடனடியாக இங்கு தோன்றும்.',
    shift_summary: 'இன்றைய பணி விவரம்',
    stat_resolved: 'தீர்க்கப்பட்டவை',
    stat_dispatched: 'மொத்த அழைப்புகள்',
    stat_presence: 'தற்போதைய நிலை',
    response_protocol: 'அவசர கால வழிமுறைகள்',
    step_1: 'பணியை ஏற்கவும்: அழைப்பு வந்த 30 வினாடிகளுக்குள் ஏற்கவும்.',
    step_2: 'களத்திற்கு செல்லவும்: பாதிக்கப்பட்டவரை அடைந்ததும் "பணியைத் தொடங்கு" என்பதை அழுத்தவும்.',
    step_3: 'பாதுகாப்பாக முடிக்கவும்: முதலுதவி/உதவி வழங்கி, குறிப்பை உள்ளிட்டு "தீர்க்கப்பட்டது" என குறிக்கவும்.',
    decline_task_title: 'பணியை நிராகரித்தல்',
    decline_task_desc: 'இந்த அழைப்பை நிராகரிப்பதற்கான காரணத்தைத் தேர்ந்தெடுக்கவும்:',
    cancel_btn: 'ரத்துசெய்',
    confirm_decline_btn: 'நிராகரித்து மாற்று',
    resolve_task_title: 'அவசரநிலையை முடித்தல்',
    resolve_task_desc: 'கட்டுப்பாட்டு அறைக்கான தீர்வு குறிப்பை உள்ளிடவும்:',
    confirm_resolve_btn: 'தீர்க்கப்பட்டது என குறிக்கவும் ✓',
    command_center_link: '← கட்டுப்பாட்டு அறை',
    civilian_report_link: 'பொதுமக்கள் அறிக்கை பக்கம்',
    task_incoming: '🚨 அவசர மீட்புப் பணி ஒதுக்கப்பட்டுள்ளது',
    accept_task_btn: 'பணியை ஏற்கவும் →',
    decline_task_btn: 'ஏற்க இயலாது',
    start_response_btn: 'களத்தில் உள்ளேன் (பணியைத் தொடங்கு) →',
    mark_resolved_btn: 'தீர்க்கப்பட்டது என குறிக்கவும் ✓',
    open_map_btn: 'வரைபடத்தை திற 📍',
    timer_expired: 'காலாவதியானது',
    avail_status: 'தயார் நிலை',
    offline_status: 'அணைப்பில்',
    presence_avail: 'தயார்',
    presence_busy: 'பணியில்'
  }
};

let currentLang = localStorage.getItem('sahaaya_lang') || 'en';
let token = localStorage.getItem('sahaaya_vol_token') || null;
let currentUser = null;
let state = { incidents: [], volunteers: [], assignments: [], events: [] };
let countdownInterval = null;
let activeAssignmentId = null;
let activeIncidentId = null;
let sseSource = null;
let lastRenderedStateKey = '';
let activeExpiresAt = null;

// --- Sound Alert via Web Audio API ---
function playAlertChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15); // E6
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // AudioContext blocked until user gesture
  }
}

// --- i18n ---
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sahaaya_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.id === `lang-${lang}`));
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  lastRenderedStateKey = ''; // force re-render with new language strings
  render();
}

document.querySelector('#lang-en')?.addEventListener('click', () => setLanguage('en'));
document.querySelector('#lang-ml')?.addEventListener('click', () => setLanguage('ml'));
document.querySelector('#lang-ta')?.addEventListener('click', () => setLanguage('ta'));

// --- API Wrapper ---
async function api(url, options = {}) {
  const headers = options.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && !url.includes('/api/auth/login')) {
      logout();
    }
    throw new Error(data.error || 'Server request failed');
  }
  return data;
}

// --- Check Auth Status on Init ---
async function checkAuth() {
  if (!token) {
    await switchResponder('anjali');
    return;
  }
  try {
    const res = await api('/api/auth/me');
    currentUser = res.user;
    showConsole();
    await refreshState();
  } catch {
    await switchResponder('anjali');
  }
}

function showLogin() {
  document.querySelector('#login-screen').classList.remove('hidden');
  document.querySelector('#console-screen').classList.add('hidden');
  document.querySelector('#logout-btn').classList.add('hidden');
  updateActivePill(null);
}

function showConsole() {
  document.querySelector('#login-screen').classList.add('hidden');
  document.querySelector('#console-screen').classList.remove('hidden');
  document.querySelector('#logout-btn').classList.remove('hidden');

  if (currentUser) {
    document.querySelector('#user-name').textContent = currentUser.name;
    document.querySelector('#user-skills').textContent = currentUser.skills?.join(', ') || 'Volunteer Responder';
    document.querySelector('#user-zone').textContent = currentUser.zone || 'General Venue';
    updateActivePill(currentUser.username);
  }
}

function updateActivePill(username) {
  document.querySelectorAll('.resp-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.user === username);
  });
}

function renderResponderPills() {
  const container = document.querySelector('#responder-pills-list');
  if (!container || !state.volunteers.length) return;

  const currentVolUsername = currentUser?.username;
  container.innerHTML = state.volunteers.map(v => {
    const isAct = v.username === currentVolUsername || v.id === currentVolUsername;
    const skillSummary = (v.skills && v.skills[0]) || 'General';
    return `
      <button type="button" class="resp-pill ${isAct ? 'active' : ''}" data-user="${v.username || v.id}">
        ${v.name.split(' ')[0]} (${skillSummary})
      </button>
    `;
  }).join('');

  container.querySelectorAll('.resp-pill').forEach(btn => {
    btn.addEventListener('click', () => switchResponder(btn.dataset.user));
  });
}

// --- Quick Responder Switcher ---
async function switchResponder(username) {
  try {
    const res = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password: 'vol123' })
    });
    token = res.token;
    currentUser = res.user;
    localStorage.setItem('sahaaya_vol_token', token);
    showConsole();
    lastRenderedStateKey = '';
    await refreshState();
  } catch (err) {
    console.warn(`Switch responder failed for ${username}:`, err);
    showLogin();
  }
}

// --- Login Form ---
document.querySelector('#volunteer-login-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value;
  const errorEl = document.querySelector('#login-error');
  errorEl.classList.add('hidden');

  try {
    const res = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    token = res.token;
    currentUser = res.user;
    localStorage.setItem('sahaaya_vol_token', token);
    showConsole();
    lastRenderedStateKey = '';
    await refreshState();
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  }
});

function logout() {
  if (token) {
    api('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }
  token = null;
  currentUser = null;
  localStorage.removeItem('sahaaya_vol_token');
  if (countdownInterval) clearInterval(countdownInterval);
  lastRenderedStateKey = '';
  showLogin();
}

document.querySelector('#logout-btn')?.addEventListener('click', logout);

// --- Fetch & Render State ---
async function refreshState() {
  try {
    state = await api('/api/state');
    render();
  } catch (e) {
    console.warn('State refresh error:', e);
  }
}

function render() {
  if (!currentUser) return;

  renderResponderPills();

  const myId = currentUser.id;
  const myUsername = currentUser.username;

  const me = state.volunteers.find(v => v.id === myId || v.username === myUsername) || currentUser;
  const isAvailable = Boolean(me.available);

  // Update Availability Button
  const availBtn = document.querySelector('#availability-btn');
  const availText = document.querySelector('#avail-text');
  if (availBtn && availText) {
    availBtn.className = `availability-btn ${isAvailable ? 'available' : 'offline'}`;
    availText.textContent = isAvailable ? translations[currentLang].avail_status : translations[currentLang].offline_status;
  }

  // Find active task assigned to this volunteer
  const task = state.incidents.find(i => 
    (i.assignedVolunteerId === myId || i.assignedVolunteerId === myUsername) &&
    i.state !== 'resolved' && i.state !== 'cancelled'
  );

  // Match assignment
  let asg = null;
  if (task && task.assignmentId) {
    asg = state.assignments.find(a => a.id === task.assignmentId);
  }
  if (!asg && task) {
    asg = state.assignments.find(a => 
      (a.volunteerId === myId || a.volunteerId === myUsername) &&
      a.incidentId === task.id &&
      (a.status === 'pending' || a.status === 'accepted' || a.status === 'in_progress')
    );
  }
  if (task && !asg) {
    asg = {
      id: task.assignmentId || ('ASG-' + task.id),
      incidentId: task.id,
      volunteerId: myId,
      status: task.state === 'in_progress' ? 'in_progress' : task.state === 'accepted' ? 'accepted' : 'pending',
      expiresAt: task.updatedAt ? (task.updatedAt + 30000) : (Date.now() + 30000)
    };
  }

  // Update Shift stats
  const resolvedCount = state.incidents.filter(i => (i.assignedVolunteerId === myId || i.assignedVolunteerId === myUsername) && i.state === 'resolved').length;
  const totalAssigned = state.assignments.filter(a => a.volunteerId === myId || a.volunteerId === myUsername).length;

  document.querySelector('#stat-resolved').textContent = resolvedCount;
  document.querySelector('#stat-dispatched').textContent = totalAssigned;
  document.querySelector('#stat-status').textContent = isAvailable ? translations[currentLang].presence_avail : translations[currentLang].presence_busy;

  const taskPanel = document.querySelector('#task-panel');

  if (!task) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    const stateKey = 'empty_' + currentLang;
    if (lastRenderedStateKey !== stateKey) {
      lastRenderedStateKey = stateKey;
      taskPanel.className = 'task-card empty';
      taskPanel.innerHTML = `
        <div class="empty-state">
          <span class="radar-icon">📡</span>
          <p class="eyebrow">${translations[currentLang].dispatch_status}</p>
          <h2>${translations[currentLang].no_active_tasks}</h2>
          <p>${translations[currentLang].ready_for_dispatch}</p>
        </div>
      `;
    }
    return;
  }

  const effectiveStatus = (asg && asg.status) || task.state;
  const stateKey = `${task.id}_${effectiveStatus}_${currentLang}`;

  // Only rewrite innerHTML if state actually changed to avoid destroying countdown timer DOM
  if (lastRenderedStateKey !== stateKey) {
    lastRenderedStateKey = stateKey;

    if (effectiveStatus === 'pending' || task.state === 'assigned') {
      playAlertChime();
    }

    activeAssignmentId = asg ? asg.id : ('ASG-' + task.id);
    activeIncidentId = task.id;
    activeExpiresAt = asg ? asg.expiresAt : (Date.now() + 30000);

    taskPanel.className = `task-card active-task priority-${task.priority}`;

    let actionHtml = '';
    let timerHtml = '';

    if (effectiveStatus === 'pending' || task.state === 'assigned') {
      timerHtml = `<div class="timer-badge" id="countdown-display">⏱ 00:30</div>`;
      actionHtml = `
        <div class="task-actions">
          <button id="decline-btn" class="btn decline-btn">${translations[currentLang].decline_task_btn}</button>
          <button id="accept-btn" class="btn accept-btn">${translations[currentLang].accept_task_btn}</button>
        </div>
      `;
    } else if (effectiveStatus === 'accepted' || task.state === 'accepted') {
      timerHtml = `<div class="status-pill accepted">ACCEPTED ✓</div>`;
      actionHtml = `
        <div class="task-actions single">
          <button id="start-resp-btn" class="btn start-btn">${translations[currentLang].start_response_btn}</button>
          <button id="open-map-btn" class="btn secondary map-btn">${translations[currentLang].open_map_btn}</button>
        </div>
      `;
    } else if (effectiveStatus === 'in_progress' || task.state === 'in_progress') {
      timerHtml = `<div class="status-pill in-progress">ON SCENE ⚡</div>`;
      actionHtml = `
        <div class="task-actions single">
          <button id="resolve-btn" class="btn resolve-btn">${translations[currentLang].mark_resolved_btn}</button>
          <button id="open-map-btn" class="btn secondary map-btn">${translations[currentLang].open_map_btn}</button>
        </div>
      `;
    }

    taskPanel.innerHTML = `
      <div class="task-header">
        <span class="badge ${task.priority}">${(task.priority || 'HIGH').toUpperCase()}</span>
        ${timerHtml}
      </div>

      <h2 class="task-title">${task.type} Emergency</h2>
      <p class="task-zone">📍 <b>${task.zone}</b> · ${task.zoneName || 'Event Zone'}</p>

      <div class="task-details-box">
        ${task.note ? `<p class="task-note">"${task.note}"</p>` : '<p class="task-note muted">No extra notes provided by civilian.</p>'}
        ${task.callback ? `<p class="task-callback">📞 <b>Callback:</b> <a href="tel:${task.callback}">${task.callback}</a></p>` : ''}
      </div>

      ${actionHtml}
    `;

    // Attach Action Handlers
    document.querySelector('#accept-btn')?.addEventListener('click', () => acceptTask(activeAssignmentId));
    document.querySelector('#decline-btn')?.addEventListener('click', () => openDeclineModal(activeAssignmentId));
    document.querySelector('#start-resp-btn')?.addEventListener('click', () => startResponse(activeAssignmentId));
    document.querySelector('#resolve-btn')?.addEventListener('click', () => openResolveModal(activeAssignmentId));
    document.querySelector('#open-map-btn')?.addEventListener('click', () => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.zone + ' Venue')}`, '_blank');
    });

    // Start precision countdown if in pending state
    if (effectiveStatus === 'pending' || task.state === 'assigned') {
      startPrecisionCountdown(activeExpiresAt);
    } else if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }
}

// --- High-Precision 30-Second Countdown Timer ---
function startPrecisionCountdown(expiresAt) {
  if (countdownInterval) clearInterval(countdownInterval);

  const tick = () => {
    const display = document.querySelector('#countdown-display');
    if (!display) return;

    const remainingMs = expiresAt - Date.now();
    const seconds = Math.max(0, Math.ceil(remainingMs / 1000));

    if (seconds > 0) {
      display.textContent = `⏱ 00:${String(seconds).padStart(2, '0')}`;
      display.classList.toggle('urgent', seconds <= 10);
    } else {
      display.textContent = `⏱ ${translations[currentLang].timer_expired}`;
      display.classList.add('urgent');
      clearInterval(countdownInterval);
      countdownInterval = null;

      // Disable accept button and notify backend of expiration
      const acceptBtn = document.querySelector('#accept-btn');
      if (acceptBtn) {
        acceptBtn.disabled = true;
        acceptBtn.textContent = translations[currentLang].timer_expired;
      }
      if (activeAssignmentId) {
        api(`/api/assignments/${activeAssignmentId}/timeout`, { method: 'POST' }).catch(() => {});
      }
      setTimeout(refreshState, 800);
    }
  };

  tick();
  countdownInterval = setInterval(tick, 250); // 250ms tick for smooth second changes
}

// --- Assignment Operations ---
async function acceptTask(assignmentId) {
  if (countdownInterval) clearInterval(countdownInterval);
  try {
    await api(`/api/assignments/${assignmentId}/accept`, { method: 'POST', body: '{}' });
    lastRenderedStateKey = '';
    await refreshState();
  } catch (err) {
    alert(`Failed to accept: ${err.message}`);
  }
}

function openDeclineModal(assignmentId) {
  activeAssignmentId = assignmentId;
  document.querySelector('#decline-modal').classList.add('open');
}

document.querySelector('#cancel-decline')?.addEventListener('click', () => {
  document.querySelector('#decline-modal').classList.remove('open');
});

document.querySelector('#confirm-decline')?.addEventListener('click', async () => {
  const reason = document.querySelector('#decline-reason').value;
  try {
    await api(`/api/assignments/${activeAssignmentId}/decline`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
    document.querySelector('#decline-modal').classList.remove('open');
    lastRenderedStateKey = '';
    await refreshState();
  } catch (err) {
    alert(`Failed to decline: ${err.message}`);
  }
});

async function startResponse(assignmentId) {
  try {
    await api(`/api/assignments/${assignmentId}/start`, { method: 'POST', body: '{}' });
    lastRenderedStateKey = '';
    await refreshState();
  } catch (err) {
    alert(`Failed to start response: ${err.message}`);
  }
}

function openResolveModal(assignmentId) {
  activeAssignmentId = assignmentId;
  document.querySelector('#resolve-modal').classList.add('open');
}

document.querySelector('#cancel-resolve')?.addEventListener('click', () => {
  document.querySelector('#resolve-modal').classList.remove('open');
});

document.querySelector('#confirm-resolve')?.addEventListener('click', async () => {
  const resolutionNote = document.querySelector('#resolution-note').value.trim();
  try {
    await api(`/api/assignments/${activeAssignmentId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ resolutionNote })
    });
    document.querySelector('#resolve-modal').classList.remove('open');
    document.querySelector('#resolution-note').value = '';
    lastRenderedStateKey = '';
    await refreshState();
  } catch (err) {
    alert(`Failed to resolve: ${err.message}`);
  }
});

// --- Availability Toggle ---
document.querySelector('#availability-btn')?.addEventListener('click', async () => {
  if (!currentUser) return;
  const me = state.volunteers.find(v => v.id === currentUser.id || v.username === currentUser.username) || currentUser;
  const target = !me.available;
  try {
    await api(`/api/volunteers/${currentUser.id}/availability`, {
      method: 'POST',
      body: JSON.stringify({ available: target })
    });
    await refreshState();
  } catch (err) {
    alert(`Failed to update availability: ${err.message}`);
  }
});

// --- Realtime SSE & Polling ---
function initRealtime() {
  if (sseSource) sseSource.close();
  try {
    sseSource = new EventSource('/api/events');
    sseSource.addEventListener('state', e => {
      try {
        state = JSON.parse(e.data);
        render();
      } catch (err) {
        console.warn('SSE parse error:', err);
      }
    });
  } catch (e) {
    console.warn('SSE connection error:', e);
  }

  // Active polling fallback
  setInterval(refreshState, 1500);
}

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  checkAuth();
  initRealtime();
});
