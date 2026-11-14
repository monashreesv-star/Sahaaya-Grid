/* ==========================================================================
   SAHAAYA GRID — Organizer Command Center JavaScript
   Features: Multi-view Navigation, Secure Auth, Real-time SSE + Polling,
             Instant Smart Dispatch, Live Map, Volunteers (+ Add Volunteer),
             Zones, QRs, Analytics, Audit Logs, Trilingual (EN, ML, TA)
   ========================================================================== */

const translations = {
  en: {
    nav_command: 'Command Center',
    nav_map: 'Live Venue Map',
    nav_volunteers: 'Volunteers',
    nav_zones: 'Zones & QR',
    nav_analytics: 'Analytics',
    nav_audit: 'Audit Logs',
    nav_report: 'Civilian Report Page ↗',
    nav_volunteer_app: 'Volunteer Console ↗',
    live_event: 'LIVE EVENT',
    event_name: 'TechX Kerala 2026',
    venue_location: '1,842 attendees · Main Ground',
    event_command: 'EVENT COMMAND & DISPATCH',
    page_title: 'Sahaaya Grid Command Center',
    emergency_contacts_btn: '🚨 Emergency Contacts',
    stat_active_incidents: 'ACTIVE INCIDENTS',
    stat_volunteers_online: 'VOLUNTEERS READY',
    stat_avg_response: 'AVG. DISPATCH TIME',
    stat_resolved_today: 'RESOLVED TODAY',
    target_met: 'Target: < 30s',
    safe_resolution: '100% attendance safe',
    live_queue: 'LIVE INCIDENT QUEUE',
    needs_attention: 'Needs Attention',
    venue_overview: 'VENUE SECTORS',
    live_zone_status: 'Live Zone Status',
    open_full_map: 'Full Map →',
    live_audit_feed: 'DISPATCH & SECURITY TIMELINE',
    realtime_stream: 'Realtime Event Stream',
    view_all_logs: 'View All →',
    filter_all: 'All Active',
    filter_unassigned: 'Unassigned',
    filter_high: 'High / Crit',
    filter_in_progress: 'In Progress',
    filter_resolved: 'Resolved',
    map_title: 'Main Grounds & Sector Grid',
    live_feed: '● Live Telemetry',
    volunteers_roster_title: 'Active Field Responders Roster',
    register_vol_btn: '+ Register Volunteer',
    th_responder: 'Responder',
    th_skills: 'Skills / Specialization',
    th_sector: 'Sector Zone',
    th_presence: 'Presence Status',
    th_assignment: 'Current Assignment',
    th_actions: 'Actions',
    venue_zones_title: 'Venue Physical Zones',
    print_qrs_btn: '🖨 Print QR Sheets',
    create_zone_btn: '+ Create New Zone',
    an_total_reports: 'TOTAL REPORTS',
    an_res_rate: 'RESOLUTION RATE',
    an_avg_response: 'AVG. DISPATCH TIME',
    an_avg_resolution: 'AVG. RESOLUTION TIME',
    an_by_type: 'Incidents by Category',
    an_by_prio: 'Incidents by Priority',
    an_by_zone: 'Incidents by Zone',
    an_vol_leaderboard: 'Volunteer Response Leaderboard',
    audit_trail_title: 'Immutable Event Trail',
    smart_dispatch_title: 'SMART VOLUNTEER DISPATCH ENGINE',
    ranked_match_title: 'Ranked Volunteer Match (Skill + Proximity + Availability)',
    incident_details_title: 'Incident Dossier',
    emergency_hotlines_title: 'Venue Emergency Hotlines',
    create_zone_title: 'Create New Venue Zone',
    zone_code_label: 'Zone Code (e.g. AUD-03):',
    zone_name_label: 'Zone Name:',
    zone_sector_label: 'Sector Category:',
    zone_desc_label: 'Location Description:',
    create_zone_submit: 'Create Zone & Generate QR',
    register_volunteer_title: 'Register New Field Volunteer',
    vol_fullname_label: 'Full Name:',
    vol_username_label: 'Username / Login ID:',
    vol_password_label: 'Password / Security PIN:',
    vol_phone_label: 'Phone Number:',
    vol_zone_label: 'Assigned Sector / Zone:',
    vol_skills_label: 'Specialization Skills:',
    register_vol_submit: 'Register Volunteer Responder',
    role_lead: 'Lead Organizer (Admin)'
  },
  ml: {
    nav_command: 'കൺട്രോൾ റൂം',
    nav_map: 'വേദി മാപ്പ്',
    nav_volunteers: 'വളണ്ടിയർമാർ',
    nav_zones: 'മേഖലകളും ക്യുആറും',
    nav_analytics: 'അനലിറ്റിക്സ്',
    nav_audit: 'ഓഡിറ്റ് ലോഗുകൾ',
    nav_report: 'പൊതുജന സഹായ പേജ് ↗',
    nav_volunteer_app: 'വളണ്ടിയർ കൺസോൾ ↗',
    live_event: 'തത്സമയ ഇവന്റ്',
    event_name: 'ടെക്എക്സ് കേരള 2026',
    venue_location: '1,842 ആളുകൾ · പ്രധാന വേദി',
    event_command: 'കൺട്രോൾ റൂം & ഡിസ്പാച്ച്',
    page_title: 'സഹായ ഗ്രിഡ് കമാൻഡ് സെന്റർ',
    emergency_contacts_btn: '🚨 അടിയന്തര നമ്പറുകൾ',
    stat_active_incidents: 'സജീവ സംഭവങ്ങൾ',
    stat_volunteers_online: 'തയ്യാറായ വളണ്ടിയർമാർ',
    stat_avg_response: 'ശരാശരി നിയോഗ സമയം',
    stat_resolved_today: 'ഇന്ന് പരിഹരിച്ചവ',
    target_met: 'ലക്ഷ്യം: < 30 സെക്കൻഡ്',
    safe_resolution: '100% സന്ദർശക സുരക്ഷ',
    live_queue: 'അടിയന്തര സംഭവ നിര',
    needs_attention: 'ശ്രദ്ധിക്കുക',
    venue_overview: 'വേദി മേഖലകൾ',
    live_zone_status: 'മേഖലാ തത്സമയ വിവരങ്ങൾ',
    open_full_map: 'പൂർണ്ണ മാപ്പ് →',
    live_audit_feed: 'രക്ഷാപ്രവർത്തന സമയരേഖ',
    realtime_stream: 'തത്സമയ വിവരങ്ങൾ',
    view_all_logs: 'എല്ലാം കാണുക →',
    filter_all: 'എല്ലാം',
    filter_unassigned: 'നിയോഗിക്കാത്തവ',
    filter_high: 'തീവ്രമായവ',
    filter_in_progress: 'നടക്കുന്നവ',
    filter_resolved: 'പരിഹരിച്ചവ',
    map_title: 'പ്രധാന വേദിയും മേഖലകളും',
    live_feed: '● തത്സമയ ടെലിമെട്രി',
    volunteers_roster_title: 'വളണ്ടിയർമാരുടെ പട്ടിക',
    register_vol_btn: '+ പുതിയ വളണ്ടിയറെ ചേർക്കുക',
    th_responder: 'വളണ്ടിയർ',
    th_skills: 'നൈപുണ്യം / വൈദഗ്ധ്യം',
    th_sector: 'നിയോഗിച്ച മേഖല',
    th_presence: 'ലഭ്യതാ നില',
    th_assignment: 'നിലവിലെ ചുമതല',
    th_actions: 'നടപടികൾ',
    venue_zones_title: 'വേദിയുടെ മേഖലകൾ',
    print_qrs_btn: '🖨 QR ഷീറ്റുകൾ പ്രിന്റ് ചെയ്യുക',
    create_zone_btn: '+ പുതിയ മേഖല ഉണ്ടാക്കുക',
    an_total_reports: 'ആകെ റിപ്പോർട്ടുകൾ',
    an_res_rate: 'പരിഹാര നിരക്ക്',
    an_avg_response: 'ശരാശരി പ്രതികരണ സമയം',
    an_avg_resolution: 'ശരാശരി പരിഹാര സമയം',
    an_by_type: 'വിഭാഗം തിരിച്ചുള്ളവ',
    an_by_prio: 'മുൻഗണന തിരിച്ചുള്ളവ',
    an_by_zone: 'മേഖല തിരിച്ചുള്ളവ',
    an_vol_leaderboard: 'വളണ്ടിയർ സേവന പട്ടിക',
    audit_trail_title: 'സുരക്ഷാ ഓഡിറ്റ് വിവരങ്ങൾ',
    smart_dispatch_title: 'സ്മാർട്ട് വളണ്ടിയർ ഡിസ്പാച്ച് എഞ്ചിൻ',
    ranked_match_title: 'അനുയോജ്യരായ വളണ്ടിയർമാർ (നൈപുണ്യം + സാമീപ്യം + ലഭ്യത)',
    incident_details_title: 'സംഭവ വിവരങ്ങൾ',
    emergency_hotlines_title: 'അടിയന്തര ഹെൽപ്‌ലൈൻ നമ്പറുകൾ',
    create_zone_title: 'പുതിയ വേദി മേഖല ഉണ്ടാക്കുക',
    zone_code_label: 'മേഖലാ കോഡ് (ഉദാ: AUD-03):',
    zone_name_label: 'മേഖലയുടെ പേര്:',
    zone_sector_label: 'വിഭാഗം:',
    zone_desc_label: 'വിവരണം:',
    create_zone_submit: 'മേഖലയും QR കോഡും ഉണ്ടാക്കുക',
    register_volunteer_title: 'പുതിയ ഫീൽഡ് വളണ്ടിയറെ രജിസ്റ്റർ ചെയ്യുക',
    vol_fullname_label: 'പൂർണ്ണ നാമം:',
    vol_username_label: 'യൂസർനെയിം / ലോഗിൻ ഐഡി:',
    vol_password_label: 'പാസ്‌വേഡ് / സുരക്ഷാ പിൻ:',
    vol_phone_label: 'ഫോൺ നമ്പർ:',
    vol_zone_label: 'മേഖല:',
    vol_skills_label: 'പ്രത്യേക കഴിവുകൾ:',
    register_vol_submit: 'വളണ്ടിയറെ രജിസ്റ്റർ ചെയ്യുക',
    role_lead: 'ലീഡ് ഓർഗനൈസർ (Admin)'
  },
  ta: {
    nav_command: 'கட்டுப்பாட்டு அறை',
    nav_map: 'நேரலை வரைபடம்',
    nav_volunteers: 'தன்னார்வலர்கள்',
    nav_zones: 'மண்டலங்கள் & QR',
    nav_analytics: 'புள்ளிவிவரங்கள்',
    nav_audit: 'பாதுகாப்பு பதிவுகள்',
    nav_report: 'பொதுமக்கள் அறிக்கை பக்கம் ↗',
    nav_volunteer_app: 'தன்னார்வலர் திரை ↗',
    live_event: 'நிகழ்வு நேரலை',
    event_name: 'டெக்எக்ஸ் கேரளா 2026',
    venue_location: '1,842 பார்வையாளர்கள் · மைதானம்',
    event_command: 'நிகழ்வு கட்டளை & அவசர உதவி',
    page_title: 'சஹாயா கிரிட் கட்டளை மையம்',
    emergency_contacts_btn: '🚨 அவசர தொடர்புகள்',
    stat_active_incidents: 'நடப்பு அவசரநிலைகள்',
    stat_volunteers_online: 'தயார் நிலை மீட்பாளர்கள்',
    stat_avg_response: 'சராசரி ஒதுக்கீட்டு நேரம்',
    stat_resolved_today: 'இன்று தீர்க்கப்பட்டவை',
    target_met: 'இலக்கு: < 30 வினாடி',
    safe_resolution: '100% பார்வையாளர்கள் பாதுகாப்பு',
    live_queue: 'அவசர சம்பவ வரிசை',
    needs_attention: 'கவனம் தேவை',
    venue_overview: 'நிகழ்வு பகுதிகள்',
    live_zone_status: 'பகுதி நேரலை நிலை',
    open_full_map: 'முழு வரைபடம் →',
    live_audit_feed: 'மீட்பு மற்றும் பாதுகாப்பு பதிவு',
    realtime_stream: 'நிகழ்நேர நிகழ்வு ஓட்டம்',
    view_all_logs: 'அனைத்தையும் காண்க →',
    filter_all: 'அனைத்தும்',
    filter_unassigned: 'ஒதுக்கப்படாதவை',
    filter_high: 'தீவிரமானவை',
    filter_in_progress: 'நடப்பவை',
    filter_resolved: 'தீர்க்கப்பட்டவை',
    map_title: 'முக்கிய மைதானம் & பகுதிகள்',
    live_feed: '● நேரலை தொலை அளவியல்',
    volunteers_roster_title: 'தன்னார்வலர் பட்டியல்',
    register_vol_btn: '+ புதிய தன்னார்வலரைச் சேர்',
    th_responder: 'தன்னார்வலர்',
    th_skills: 'திறன்கள் / சிறப்பு',
    th_sector: 'ஒதுக்கப்பட்ட பகுதி',
    th_presence: 'இருப்பு நிலை',
    th_assignment: 'தற்போதைய பணி',
    th_actions: 'செயல்கள்',
    venue_zones_title: 'அரங்க பகுதிகள்',
    print_qrs_btn: '🖨 QR தாள்களை அச்சிடுக',
    create_zone_btn: '+ புதிய பகுதியை உருவாக்கு',
    an_total_reports: 'மொத்த அறிக்கைகள்',
    an_res_rate: 'தீர்வு விகிதம்',
    an_avg_response: 'சராசரி ஒதுக்கீட்டு நேரம்',
    an_avg_resolution: 'சராசரி தீர்வு நேரம்',
    an_by_type: 'வகை வாரியாக',
    an_by_prio: 'முன்னுரிமை வாரியாக',
    an_by_zone: 'பகுதி வாரியாக',
    an_vol_leaderboard: 'தன்னார்வலர் சேவை பட்டியல்',
    audit_trail_title: 'பாதுகாப்பு தணிக்கை வரலாறு',
    smart_dispatch_title: 'ஸ்மார்ட் தன்னார்வலர் ஒதுக்கீட்டு அமைப்பு',
    ranked_match_title: 'பரிந்துரைக்கப்பட்ட தன்னார்வலர்கள் (திறன் + தூரம் + இருப்பு)',
    incident_details_title: 'சம்பவ விவரங்கள்',
    emergency_hotlines_title: 'அரங்க அவசர எண்கள்',
    create_zone_title: 'புதிய பகுதியை உருவாக்கு',
    zone_code_label: 'பகுதி குறியீடு (उदा: AUD-03):',
    zone_name_label: 'பகுதியின் பெயர்:',
    zone_sector_label: 'வகை:',
    zone_desc_label: 'விளக்கம்:',
    create_zone_submit: 'பகுதி மற்றும் QR-ஐ உருவாக்கு',
    register_volunteer_title: 'புதிய தன்னார்வலரை பதிவு செய்க',
    vol_fullname_label: 'முழுப் பெயர்:',
    vol_username_label: 'பயனர் பெயர் / ஐடி:',
    vol_password_label: 'கடவுச்சொல் / பின்:',
    vol_phone_label: 'தொலைபேசி எண்:',
    vol_zone_label: 'ஒதுக்கப்பட்ட பகுதி:',
    vol_skills_label: 'சிறப்பு திறன்கள்:',
    register_vol_submit: 'தன்னார்வலரை பதிவு செய்க',
    role_lead: 'முதன்மை அமைப்பாளர் (Admin)'
  }
};

let currentLang = localStorage.getItem('sahaaya_lang') || 'en';
let token = localStorage.getItem('sahaaya_admin_token') || null;
let currentUser = null;
let currentView = 'command';
let currentFilter = 'all';
let state = { incidents: [], volunteers: [], zones: [], assignments: [], events: [] };
let sseSource = null;
let selectedIncidentId = null;

// --- Helper: Icon Map ---
const categoryIcons = {
  'Medical': '🚑',
  'Crowding': '🏃',
  'Fire / Smoke': '🔥',
  'Security': '🛡️',
  'Missing person': '🔍',
  'Infrastructure': '⚠️',
  'Other': '📢'
};

// --- Language Switcher ---
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
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

// --- Authentication ---
async function checkAuth() {
  if (!token) {
    document.querySelector('#org-username').value = 'admin';
    document.querySelector('#org-password').value = 'admin123';
    showLogin();
    return;
  }
  try {
    const res = await api('/api/auth/me');
    if (res.user.role !== 'ORGANIZER' && res.user.role !== 'ADMIN') {
      throw new Error('Unauthorized role');
    }
    currentUser = res.user;
    showApp();
    await refreshState();
  } catch {
    logout();
  }
}

function showLogin() {
  document.querySelector('#login-overlay').classList.remove('hidden');
  document.querySelector('#app-shell').classList.add('hidden');
}

function showApp() {
  document.querySelector('#login-overlay').classList.add('hidden');
  document.querySelector('#app-shell').classList.remove('hidden');
  if (currentUser) {
    document.querySelector('#org-user-name').textContent = currentUser.name;
  }
}

document.querySelector('#organizer-login-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.querySelector('#org-username').value.trim();
  const password = document.querySelector('#org-password').value;
  const errEl = document.querySelector('#org-login-error');
  errEl.classList.add('hidden');

  try {
    const res = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (res.user.role !== 'ORGANIZER' && res.user.role !== 'ADMIN') {
      throw new Error('Account does not have Organizer privileges.');
    }
    token = res.token;
    currentUser = res.user;
    localStorage.setItem('sahaaya_admin_token', token);
    showApp();
    await refreshState();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  }
});

document.querySelector('#quick-admin-login')?.addEventListener('click', () => {
  document.querySelector('#org-username').value = 'admin';
  document.querySelector('#org-password').value = 'admin123';
  document.querySelector('#organizer-login-form').requestSubmit();
});

function logout() {
  if (token) {
    api('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }
  token = null;
  currentUser = null;
  localStorage.removeItem('sahaaya_admin_token');
  if (sseSource) sseSource.close();
  showLogin();
}

document.querySelector('#org-logout-btn')?.addEventListener('click', logout);

// --- View Switcher ---
function switchView(viewName) {
  currentView = viewName;
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });
  document.querySelectorAll('.view').forEach(viewEl => {
    viewEl.classList.toggle('active', viewEl.id === `view-${viewName}`);
  });

  if (viewName === 'analytics') renderAnalytics();
  if (viewName === 'volunteers') renderVolunteers();
  if (viewName === 'zones') renderZones();
  if (viewName === 'audit') renderAuditLogs();
}

document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.getAttribute('data-view')));
});

document.querySelectorAll('[data-switch]').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.getAttribute('data-switch')));
});

document.querySelector('#nav-civilian')?.addEventListener('click', () => window.open('civilian.html?zone=FOOD-07', '_blank'));
document.querySelector('#nav-volunteer-console')?.addEventListener('click', () => window.open('volunteer.html', '_blank'));

// --- Fetch State & Refresh Views ---
async function refreshState() {
  try {
    state = await api('/api/state');
    render();
  } catch (e) {
    console.warn('Refresh state failed:', e);
  }
}

function render() {
  renderStats();
  renderQueue();
  renderMiniZoneStatus();
  renderMiniTimeline();
  renderLiveMap();
  if (currentView === 'volunteers') renderVolunteers();
  if (currentView === 'zones') renderZones();
  if (currentView === 'analytics') renderAnalytics();
  if (currentView === 'audit') renderAuditLogs();
}

// --- Render Stats ---
function renderStats() {
  const activeIncidents = state.incidents.filter(i => i.state !== 'resolved' && i.state !== 'cancelled');
  const criticalCount = activeIncidents.filter(i => i.priority === 'critical' || i.priority === 'high').length;
  const readyVolunteers = state.volunteers.filter(v => v.available);
  const resolvedCount = state.incidents.filter(i => i.state === 'resolved').length;

  document.querySelector('#stat-active-count').textContent = activeIncidents.length;
  document.querySelector('#stat-critical-count').textContent = `${criticalCount} high/crit`;
  document.querySelector('#stat-vol-ready').innerHTML = `${readyVolunteers.length} <b>/ ${state.volunteers.length}</b>`;
  document.querySelector('#stat-vol-busy').textContent = `${state.volunteers.length - readyVolunteers.length} on assignment`;
  document.querySelector('#stat-resolved-count').textContent = resolvedCount;
  document.querySelector('#queue-number').textContent = activeIncidents.length;
  document.querySelector('#vol-ready-badge').textContent = readyVolunteers.length;
}

// --- Render Incident Queue ---
function renderQueue() {
  const listEl = document.querySelector('#incident-list');
  let list = state.incidents.filter(i => i.state !== 'cancelled');

  if (currentFilter === 'reported') list = list.filter(i => i.state === 'reported');
  else if (currentFilter === 'high') list = list.filter(i => (i.priority === 'high' || i.priority === 'critical') && i.state !== 'resolved');
  else if (currentFilter === 'in_progress') list = list.filter(i => (i.state === 'assigned' || i.state === 'accepted' || i.state === 'in_progress'));
  else if (currentFilter === 'resolved') list = list.filter(i => i.state === 'resolved');
  else list = list.filter(i => i.state !== 'resolved'); // default 'all' shows active

  if (!list.length) {
    listEl.innerHTML = `
      <div class="empty-queue">
        <p>✓ All quiet. No incidents matching the selected filter.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = list.map(inc => {
    const icon = categoryIcons[inc.type] || '🚨';
    const assignedVol = state.volunteers.find(v => v.id === inc.assignedVolunteerId);
    const isClustered = inc.reportCount > 1;

    let actionBtn = '';
    if (inc.state === 'reported') {
      actionBtn = `<button class="btn primary small dispatch-trigger-btn" data-id="${inc.id}">⚡ SMART ASSIGN</button>`;
    } else if (inc.state === 'assigned') {
      actionBtn = `<button class="btn secondary small details-trigger-btn" data-id="${inc.id}">Pending (${assignedVol ? assignedVol.name.split(' ')[0] : 'Vol'})</button>`;
    } else if (inc.state === 'accepted') {
      actionBtn = `<button class="btn secondary small accepted-pill details-trigger-btn" data-id="${inc.id}">Accepted (${assignedVol ? assignedVol.name.split(' ')[0] : 'Vol'})</button>`;
    } else if (inc.state === 'in_progress') {
      actionBtn = `<button class="btn secondary small in-prog-btn details-trigger-btn" data-id="${inc.id}">On Scene ⚡</button>`;
    } else if (inc.state === 'resolved') {
      actionBtn = `<span class="resolved-check">Resolved ✓</span>`;
    }

    return `
      <article class="incident-card-item priority-${inc.priority} state-${inc.state}" data-id="${inc.id}">
        <div class="inc-icon-wrap priority-${inc.priority}">${icon}</div>
        <div class="inc-main-info">
          <div class="inc-top-line">
            <h3>${inc.type} Emergency</h3>
            <span class="badge ${inc.priority}">${inc.priority.toUpperCase()}</span>
            ${isClustered ? `<span class="clustered-badge">Clustered (${inc.reportCount})</span>` : ''}
          </div>
          <p class="inc-meta">
            📍 <b>${inc.zone}</b> (${inc.zoneName || 'Zone'}) · 
            <span class="inc-time">${Math.max(1, Math.floor((Date.now() - inc.createdAt) / 60000))}m ago</span>
            ${inc.callback ? ` · 📞 ${inc.callback}` : ''}
          </p>
          ${inc.note ? `<p class="inc-snippet">"${inc.note.slice(0, 75)}${inc.note.length > 75 ? '...' : ''}"</p>` : ''}
        </div>
        <div class="inc-actions">
          ${actionBtn}
          <button class="btn-icon view-details-btn" data-id="${inc.id}" title="View Details">🔍</button>
        </div>
      </article>
    `;
  }).join('');

  // Attach handlers
  document.querySelectorAll('.dispatch-trigger-btn').forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      openSmartDispatch(b.dataset.id);
    });
  });

  document.querySelectorAll('.details-trigger-btn, .view-details-btn, .incident-card-item').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.dispatch-trigger-btn')) return;
      openIncidentDetails(el.dataset.id);
    });
  });
}

// Queue filter buttons
document.querySelectorAll('.filter-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderQueue();
  });
});

// --- Mini Zone Status Grid ---
function renderMiniZoneStatus() {
  const container = document.querySelector('#zone-status-grid');
  if (!container) return;

  container.innerHTML = state.zones.map(z => {
    const activeInZone = state.incidents.filter(i => i.zone === z.code && i.state !== 'resolved');
    const hasCrit = activeInZone.some(i => i.priority === 'critical' || i.priority === 'high');
    const hasMed = activeInZone.some(i => i.priority === 'medium');
    const colorClass = hasCrit ? 'crit' : hasMed ? 'med' : activeInZone.length ? 'low' : 'ok';

    return `
      <div class="zone-pill-item ${colorClass}" data-zone="${z.code}">
        <b>${z.code}</b>
        <span>${activeInZone.length ? `${activeInZone.length} active` : 'Normal'}</span>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.zone-pill-item').forEach(el => {
    el.addEventListener('click', () => {
      switchView('map');
    });
  });
}

// --- Mini Timeline ---
function renderMiniTimeline() {
  const tl = document.querySelector('#live-timeline');
  if (!tl) return;
  const recentEvents = state.events.slice(0, 5);

  if (!recentEvents.length) {
    tl.innerHTML = '<p class="text-muted" style="padding: 12px;">No logged events yet.</p>';
    return;
  }

  tl.innerHTML = recentEvents.map(e => `
    <div class="timeline-row">
      <span class="tl-time">${Math.max(1, Math.floor((Date.now() - e.at) / 60000))}m ago</span>
      <i class="tl-dot ${e.type.includes('RESOLVED') ? 'green' : e.type.includes('EXPIRED') ? 'red' : 'amber'}"></i>
      <div class="tl-content">
        <p><b>${e.actorName}:</b> ${e.message}</p>
      </div>
    </div>
  `).join('');
}

// --- Live Venue Map ---
function renderLiveMap() {
  const mapPinsInc = document.querySelector('#map-incident-pins');
  const mapPinsVol = document.querySelector('#map-volunteer-pins');
  if (!mapPinsInc || !mapPinsVol) return;

  // Render incident counts on zone boxes
  document.querySelectorAll('.map-zone').forEach(zEl => {
    const zoneCode = zEl.dataset.zone;
    const activeInZone = state.incidents.filter(i => i.zone === zoneCode && i.state !== 'resolved');
    const badge = zEl.querySelector('.zone-badge-count');

    zEl.classList.remove('has-critical', 'has-medium', 'has-low');
    if (activeInZone.length) {
      if (activeInZone.some(i => i.priority === 'critical' || i.priority === 'high')) zEl.classList.add('has-critical');
      else if (activeInZone.some(i => i.priority === 'medium')) zEl.classList.add('has-medium');
      else zEl.classList.add('has-low');

      if (badge) badge.textContent = `${activeInZone.length} INCIDENT${activeInZone.length > 1 ? 'S' : ''}`;
    } else {
      if (badge) badge.textContent = 'CLEAR ✓';
    }

    zEl.onclick = () => {
      currentFilter = 'all';
      switchView('command');
    };
  });
}

// --- Volunteers View ---
function renderVolunteers() {
  const tbody = document.querySelector('#volunteers-table-body');
  if (!tbody) return;

  tbody.innerHTML = state.volunteers.map(v => {
    const currentTask = state.incidents.find(i => i.id === v.currentIncidentId);
    return `
      <tr>
        <td>
          <b>${v.name}</b> <small class="text-muted">(@${v.username || v.id})</small><br>
          <small class="text-muted">${v.phone || '+91 98765 00000'}</small>
        </td>
        <td>
          <div class="skill-tags">
            ${v.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </td>
        <td><b>${v.zone || 'General'}</b></td>
        <td>
          <span class="status-badge ${v.available ? 'available' : 'busy'}">
            ${v.available ? '● AVAILABLE' : '● BUSY / ON TASK'}
          </span>
        </td>
        <td>
          ${currentTask ? `<span class="task-link" data-id="${currentTask.id}">⚡ ${currentTask.type} at ${currentTask.zone}</span>` : '<span class="text-muted">— None —</span>'}
        </td>
        <td>
          <button class="btn secondary small toggle-vol-btn" data-id="${v.id}" data-avail="${v.available}">
            ${v.available ? 'Set Offline' : 'Set Available'}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.toggle-vol-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const volId = btn.dataset.id;
      const curAvail = btn.dataset.avail === 'true';
      try {
        await api(`/api/volunteers/${volId}/availability`, {
          method: 'POST',
          body: JSON.stringify({ available: !curAvail })
        });
        await refreshState();
      } catch (err) {
        alert(err.message);
      }
    });
  });

  tbody.querySelectorAll('.task-link').forEach(link => {
    link.addEventListener('click', () => openIncidentDetails(link.dataset.id));
  });
}

// --- Add Volunteer Modal & Logic ---
document.querySelector('#add-vol-btn')?.addEventListener('click', () => {
  // Populate zones in modal dropdown
  const zoneSelect = document.querySelector('#new-vol-zone');
  if (zoneSelect) {
    zoneSelect.innerHTML = `
      <option value="General">General / All Sectors</option>
      ${state.zones.map(z => `<option value="${z.code}">${z.code} — ${z.name}</option>`).join('')}
    `;
  }
  document.querySelector('#create-volunteer-modal').classList.add('open');
});

document.querySelector('#create-volunteer-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.querySelector('#new-vol-name').value.trim();
  const username = document.querySelector('#new-vol-username').value.trim().toLowerCase();
  const password = document.querySelector('#new-vol-password').value.trim();
  const phone = document.querySelector('#new-vol-phone').value.trim();
  const zone = document.querySelector('#new-vol-zone').value;

  const skills = [];
  document.querySelectorAll('input[name="vol-skill"]:checked').forEach(cb => {
    skills.push(cb.value);
  });

  try {
    await api('/api/volunteers', {
      method: 'POST',
      body: JSON.stringify({ name, username, password, phone, zone, skills })
    });
    document.querySelector('#create-volunteer-modal').classList.remove('open');
    document.querySelector('#create-volunteer-form').reset();
    await refreshState();
    switchView('volunteers');
    alert(`✅ Volunteer "${name}" registered successfully! They can now log in to the Volunteer Console using username "${username}".`);
  } catch (err) {
    alert(`Failed to register volunteer: ${err.message}`);
  }
});

// --- Zones & QR View ---
function renderZones() {
  const container = document.querySelector('#zones-card-grid');
  if (!container) return;

  const appHost = window.location.origin;

  container.innerHTML = state.zones.map(z => {
    const reportUrl = `${appHost}/civilian.html?zone=${z.code}`;
    const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(reportUrl)}`;

    return `
      <div class="zone-qr-card">
        <div class="zone-qr-header">
          <div>
            <h3>${z.code}</h3>
            <small>${z.name}</small>
          </div>
          <span class="sector-tag">${z.sector || 'Sector'}</span>
        </div>
        <img class="qr-preview-img" src="${qrImgUrl}" alt="${z.code} QR Code" />
        <p class="qr-target-url">${reportUrl}</p>
        <div class="zone-card-actions">
          <button class="btn secondary small copy-url-btn" data-url="${reportUrl}">Copy Link</button>
          <a class="btn primary small" href="${qrImgUrl}" download="${z.code}-QR.png" target="_blank">Download QR</a>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.copy-url-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.url);
      btn.textContent = 'Copied! ✓';
      setTimeout(() => { btn.textContent = 'Copy Link'; }, 2000);
    });
  });
}

// Create Zone Form
document.querySelector('#create-zone-btn')?.addEventListener('click', () => {
  document.querySelector('#create-zone-modal').classList.add('open');
});

document.querySelector('#create-zone-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const code = document.querySelector('#new-zone-code').value.trim().toUpperCase();
  const name = document.querySelector('#new-zone-name').value.trim();
  const sector = document.querySelector('#new-zone-sector').value;
  const description = document.querySelector('#new-zone-desc').value.trim();

  try {
    await api('/api/zones', {
      method: 'POST',
      body: JSON.stringify({ code, name, sector, description })
    });
    document.querySelector('#create-zone-modal').classList.remove('open');
    document.querySelector('#create-zone-form').reset();
    await refreshState();
    switchView('zones');
  } catch (err) {
    alert(`Failed to create zone: ${err.message}`);
  }
});

// Print QRs
document.querySelector('#print-all-qrs-btn')?.addEventListener('click', () => {
  window.print();
});

// --- Analytics View ---
async function renderAnalytics() {
  try {
    const data = await api('/api/analytics');
    document.querySelector('#an-total').textContent = data.total;
    const resRate = data.total ? Math.round((data.resolved / data.total) * 100) : 100;
    document.querySelector('#an-res-rate').textContent = `${resRate}%`;
    document.querySelector('#an-avg-resp').textContent = `${data.avgResponseTimeSec}s`;
    document.querySelector('#an-avg-resol').textContent = `${Math.floor(data.avgResolutionTimeSec / 60)}m ${data.avgResolutionTimeSec % 60}s`;

    // Chart by Type
    const typeChart = document.querySelector('#chart-by-type');
    typeChart.innerHTML = Object.entries(data.byType || {}).map(([type, count]) => {
      const pct = data.total ? Math.round((count / data.total) * 100) : 0;
      return `
        <div class="chart-bar-row">
          <span class="bar-label">${type}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${pct}%;"></div></div>
          <span class="bar-value">${count} (${pct}%)</span>
        </div>
      `;
    }).join('') || '<p class="text-muted">No data</p>';

    // Chart by Priority
    const prioChart = document.querySelector('#chart-by-priority');
    prioChart.innerHTML = Object.entries(data.byPriority || {}).map(([prio, count]) => {
      const pct = data.total ? Math.round((count / data.total) * 100) : 0;
      return `
        <div class="chart-bar-row">
          <span class="bar-label">${prio.toUpperCase()}</span>
          <div class="bar-track"><div class="bar-fill priority-${prio}" style="width: ${pct}%;"></div></div>
          <span class="bar-value">${count} (${pct}%)</span>
        </div>
      `;
    }).join('') || '<p class="text-muted">No data</p>';

    // Chart by Zone
    const zoneChart = document.querySelector('#chart-by-zone');
    zoneChart.innerHTML = Object.entries(data.byZone || {}).map(([zone, count]) => {
      const pct = data.total ? Math.round((count / data.total) * 100) : 0;
      return `
        <div class="chart-bar-row">
          <span class="bar-label">${zone}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${pct}%;"></div></div>
          <span class="bar-value">${count}</span>
        </div>
      `;
    }).join('') || '<p class="text-muted">No data</p>';

    // Volunteer Leaderboard
    const lb = document.querySelector('#volunteer-leaderboard');
    lb.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Volunteer</th>
            <th>Sector</th>
            <th>Resolved Tasks</th>
            <th>Total Dispatched</th>
          </tr>
        </thead>
        <tbody>
          ${(data.volunteerStats || []).map(v => `
            <tr>
              <td><b>${v.name}</b></td>
              <td>${v.zone || 'General'}</td>
              <td><b>${v.resolvedCount}</b></td>
              <td>${v.totalAssigned}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.warn('Analytics fetch failed:', err);
  }
}

// --- Audit Logs View ---
async function renderAuditLogs() {
  const listEl = document.querySelector('#audit-log-list');
  const query = (document.querySelector('#audit-search')?.value || '').toLowerCase();
  if (!listEl) return;

  try {
    const res = await api('/api/audit-logs');
    let events = res.events || [];
    if (query) {
      events = events.filter(e => e.message.toLowerCase().includes(query) || e.actorName.toLowerCase().includes(query));
    }

    listEl.innerHTML = events.map(e => `
      <div class="audit-card">
        <div class="audit-meta">
          <span class="audit-tag">${e.type}</span>
          <small>${new Date(e.at).toLocaleTimeString()} · ${new Date(e.at).toLocaleDateString()}</small>
        </div>
        <p class="audit-msg">${e.message}</p>
        <small class="audit-actor">Actor: <b>${e.actorName}</b> (${e.actorId})</small>
      </div>
    `).join('') || '<p class="text-muted" style="padding: 16px;">No audit events match your search.</p>';
  } catch (err) {
    console.warn('Audit fetch failed:', err);
  }
}

document.querySelector('#audit-search')?.addEventListener('input', renderAuditLogs);

// --- Smart Dispatch Flow ---
async function openSmartDispatch(incidentId) {
  selectedIncidentId = incidentId;
  const inc = state.incidents.find(i => i.id === incidentId);
  if (!inc) return;

  document.querySelector('#dispatch-modal-title').textContent = `Assign: ${inc.type} at ${inc.zone}`;
  document.querySelector('#dispatch-incident-summary').innerHTML = `
    <p><b>Type:</b> ${inc.type} · <b>Priority:</b> <span class="badge ${inc.priority}">${inc.priority.toUpperCase()}</span></p>
    <p><b>Zone:</b> ${inc.zone} (${inc.zoneName || 'Venue'})</p>
    ${inc.note ? `<p><b>Details:</b> "${inc.note}"</p>` : ''}
  `;

  const suggestionsList = document.querySelector('#dispatch-suggestions-list');
  suggestionsList.innerHTML = '<p class="text-muted">Calculating closest skill match & responder availability...</p>';
  document.querySelector('#smart-dispatch-modal').classList.add('open');

  try {
    const res = await api(`/api/incidents/${incidentId}/suggestions`);
    const suggestions = res.suggestions || [];

    if (!suggestions.length) {
      suggestionsList.innerHTML = '<p class="text-muted">No volunteers registered in the system.</p>';
      return;
    }

    suggestionsList.innerHTML = suggestions.map((v, idx) => `
      <div class="suggestion-card ${v.available ? 'available' : 'unavailable'} ${idx === 0 && v.available ? 'top-match' : ''}">
        <div class="sugg-info">
          <div class="sugg-name-row">
            <b>${v.name}</b>
            ${idx === 0 && v.available ? '<span class="top-match-badge">★ Recommended</span>' : ''}
            <span class="status-badge ${v.available ? 'available' : 'busy'}">${v.available ? 'Available' : 'Busy'}</span>
          </div>
          <small class="sugg-match-reason">${v.matchReason}</small>
          <small class="sugg-skills">Skills: ${v.skills.join(', ') || 'General'}</small>
        </div>
        <button class="btn ${v.available ? 'primary' : 'secondary'} small dispatch-now-btn" data-vol="${v.id}" data-name="${v.name}" ${!v.available ? 'disabled' : ''}>
          ${v.available ? 'Dispatch Now →' : 'Unavailable'}
        </button>
      </div>
    `).join('');

    suggestionsList.querySelectorAll('.dispatch-now-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const volId = btn.dataset.vol;
        btn.disabled = true;
        btn.textContent = 'Dispatching...';
        try {
          await api(`/api/incidents/${selectedIncidentId}/assign`, {
            method: 'POST',
            body: JSON.stringify({ volunteerId: volId })
          });
          document.querySelector('#smart-dispatch-modal').classList.remove('open');
          await refreshState();
        } catch (err) {
          alert(`Dispatch failed: ${err.message}`);
          btn.disabled = false;
          btn.textContent = 'Dispatch Now →';
        }
      });
    });
  } catch (err) {
    suggestionsList.innerHTML = `<p class="text-danger">Failed to load suggestions: ${err.message}</p>`;
  }
}

// --- Incident Details Modal ---
function openIncidentDetails(incidentId) {
  selectedIncidentId = incidentId;
  const inc = state.incidents.find(i => i.id === incidentId);
  if (!inc) return;

  const assignedVol = state.volunteers.find(v => v.id === inc.assignedVolunteerId);
  const body = document.querySelector('#detail-modal-body');

  body.innerHTML = `
    <div class="detail-top-grid">
      <div>
        <small class="field-label">INCIDENT ID</small>
        <strong>${inc.id}</strong>
      </div>
      <div>
        <small class="field-label">PRIORITY</small>
        <span class="badge ${inc.priority}">${inc.priority.toUpperCase()}</span>
      </div>
      <div>
        <small class="field-label">CURRENT STATUS</small>
        <b class="status-badge ${inc.state}">${inc.state.toUpperCase()}</b>
      </div>
      <div>
        <small class="field-label">LOCATION</small>
        <b>${inc.zone} · ${inc.zoneName || 'Venue'}</b>
      </div>
    </div>

    <hr class="detail-divider" />

    <div class="detail-section">
      <h4>Reporter Details</h4>
      <p><b>Callback Number:</b> ${inc.callback ? `<a href="tel:${inc.callback}">${inc.callback}</a>` : 'Not provided'}</p>
      <p><b>Description:</b> ${inc.note || 'No notes provided by reporter.'}</p>
      ${inc.photo ? `
        <div class="detail-photo-wrap">
          <b>Attached Photo Evidence:</b><br>
          <img src="${inc.photo}" class="detail-photo-preview" alt="Incident evidence photo" />
        </div>
      ` : ''}
    </div>

    <hr class="detail-divider" />

    <div class="detail-section">
      <h4>Assigned Volunteer</h4>
      <p>${assignedVol ? `<b>${assignedVol.name}</b> (${assignedVol.skills.join(', ')}) · Status: <b>${inc.state.toUpperCase()}</b>` : '<span class="text-muted">No volunteer assigned yet.</span>'}</p>
    </div>

    <hr class="detail-divider" />

    <div class="detail-section">
      <h4>Incident Audit Timeline</h4>
      <div class="timeline">
        ${(inc.timeline || []).map(t => `
          <div class="timeline-row">
            <span class="tl-time">${new Date(t.at).toLocaleTimeString()}</span>
            <i class="tl-dot green"></i>
            <div class="tl-content"><p>${t.text}</p></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="detail-actions">
      ${inc.state === 'reported' ? `<button class="btn primary assign-from-detail-btn" data-id="${inc.id}">⚡ Smart Assign Volunteer</button>` : ''}
      ${inc.state !== 'resolved' ? `<button class="btn secondary close-incident-btn" data-id="${inc.id}">Mark Manually Resolved ✓</button>` : ''}
    </div>
  `;

  document.querySelector('#incident-detail-modal').classList.add('open');

  body.querySelector('.assign-from-detail-btn')?.addEventListener('click', () => {
    document.querySelector('#incident-detail-modal').classList.remove('open');
    openSmartDispatch(inc.id);
  });

  body.querySelector('.close-incident-btn')?.addEventListener('click', async () => {
    try {
      await api(`/api/incidents/${inc.id}/status`, {
        method: 'POST',
        body: JSON.stringify({ state: 'resolved', resolutionNote: 'Resolved manually by Command Center Lead.' })
      });
      document.querySelector('#incident-detail-modal').classList.remove('open');
      await refreshState();
    } catch (err) {
      alert(`Failed to close: ${err.message}`);
    }
  });
}

// --- Close Modals ---
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-close');
    document.querySelector(`#${modalId}`)?.classList.remove('open');
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
  });
});

// Emergency contacts modal triggers
document.querySelector('#open-contacts-bell')?.addEventListener('click', () => {
  document.querySelector('#contacts-modal').classList.add('open');
});
document.querySelector('#emergency-contacts-btn')?.addEventListener('click', () => {
  document.querySelector('#contacts-modal').classList.add('open');
});

// --- Mobile Navigation Menu ---
document.querySelector('#mobile-menu-btn')?.addEventListener('click', () => {
  document.querySelector('.sidebar')?.classList.toggle('open');
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

  // Active polling fallback every 2s
  setInterval(refreshState, 2000);
}

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  checkAuth();
  initRealtime();
});
