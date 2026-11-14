/* ==========================================================================
   SAHAAYA GRID — Civilian Emergency Reporting Client Logic
   Trilingual (EN, ML, TA), QR Auto-Zone, Realtime Stepper Tracking
   ========================================================================== */

const translations = {
  en: {
    event_banner: 'TECHX KERALA 2026 · EMERGENCY DISPATCH',
    need_help_title: 'Need immediate help?',
    need_help_desc: 'Scan the nearest QR code or select your venue zone to report an emergency.',
    camera_ready: 'Point Camera at Zone QR',
    camera_tip: 'QR codes are posted on pillars, stalls, and gates',
    open_camera: 'Open Camera & Scan QR',
    camera_privacy: 'Camera is used only inside your browser to read zone location.',
    or_choose_zone: 'OR CHOOSE YOUR CURRENT ZONE',
    select_zone_label: 'Select Event Zone:',
    choose_zone_placeholder: '-- Choose your location --',
    proceed_with_zone: 'Confirm Location & Proceed →',
    your_location: 'YOUR LOCATION',
    change_location: 'Change',
    zone_verified: 'Location verified. Nearest responders will be alerted.',
    what_happening: 'What is happening?',
    type_medical: 'Medical Emergency',
    type_medical_desc: 'Injury, faintness, collapse, illness',
    type_crowding: 'Unsafe Crowding',
    type_crowding_desc: 'Severe congestion, surge, blocked exit',
    type_fire: 'Fire / Smoke',
    type_fire_desc: 'Flames, heavy smoke, explosion risk',
    type_security: 'Security / Threat',
    type_security_desc: 'Fight, theft, harassment, perimeter breach',
    type_missing: 'Missing Person',
    type_missing_desc: 'Lost child, separated group member',
    type_infra: 'Infrastructure Hazard',
    type_infra_desc: 'Broken barrier, electrical fault, spill',
    extra_details: 'Extra details / Landmark',
    optional_tag: '(Optional)',
    callback_number: 'Callback Phone Number',
    photo_evidence: 'Photo Evidence',
    take_upload_photo: 'Take / Upload Photo',
    send_emergency_btn: '🚨 SUBMIT EMERGENCY REPORT',
    submitting_btn: 'Submitting Report...',
    privacy_guarantee: '🔒 Zero install · No account needed · Handled directly by on-site safety coordinators.',
    report_dispatched: 'REPORT DISPATCHED TO COMMAND CENTER',
    help_is_coming: 'Help is being coordinated.',
    stay_safe_message: 'Your emergency report has been prioritized. Please stay in a safe spot if possible.',
    incident_id_label: 'INCIDENT ID',
    type_label: 'TYPE',
    location_label: 'LOCATION',
    live_status: 'REAL-TIME DISPATCH STATUS',
    status_reported: 'Reported',
    status_reported_desc: 'Received at Command Center',
    status_assigned: 'Responder Assigned',
    status_assigned_desc: 'Nearest volunteer dispatched',
    status_inprogress: 'Responder On Scene',
    status_inprogress_desc: 'Actively managing the situation',
    status_resolved: 'Resolved',
    status_resolved_desc: 'Incident safely handled',
    resolution_note: 'Resolution Note:',
    report_another: 'Report Another Incident',
    call_112: 'Immediate Danger? Call 112',
    call_firstaid: 'Event First Aid: +91 98765 43210',
    organizer_login_link: 'Organizer Command Center →',
    volunteer_login_link: 'Volunteer Console →'
  },
  ml: {
    event_banner: 'ടെക്എക്സ് കേരള 2026 · അടിയന്തര സഹായം',
    need_help_title: 'അടിയന്തര സഹായം ആവശ്യമുണ്ടോ?',
    need_help_desc: 'അടുത്തുള്ള QR കോഡ് സ്കാൻ ചെയ്യുകയോ വേദി ലൊക്കേഷൻ തിരഞ്ഞെടുക്കുകയോ ചെയ്യുക.',
    camera_ready: 'ക്യാമറ QR കോഡിലേക്ക് തിരിക്കുക',
    camera_tip: 'പില്ലറുകളിലും സ്റ്റാളുകളിലും ഗേറ്റുകളിലും QR കോഡുകൾ പതിപ്പിച്ചിട്ടുണ്ട്',
    open_camera: 'ക്യാമറ തുറന്ന് QR സ്കാൻ ചെയ്യുക',
    camera_privacy: 'ലൊക്കേഷൻ തിരിച്ചറിയാൻ മാത്രമേ ക്യാമറ ഉപയോഗിക്കൂ.',
    or_choose_zone: 'അല്ലെങ്കിൽ നിങ്ങളുടെ വേദി ലൊക്കേഷൻ തിരഞ്ഞെടുക്കുക',
    select_zone_label: 'വേദി മേഖല തിരഞ്ഞെടുക്കുക:',
    choose_zone_placeholder: '-- ലൊക്കേഷൻ തിരഞ്ഞെടുക്കുക --',
    proceed_with_zone: 'ലൊക്കേഷൻ ഉറപ്പാക്കി മുന്നോട്ട് പോകുക →',
    your_location: 'നിങ്ങളുടെ ലൊക്കേഷൻ',
    change_location: 'മാറ്റുക',
    zone_verified: 'ലൊക്കേഷൻ സ്ഥിരീകരിച്ചു. അടുത്തുള്ള രക്ഷാപ്രവർത്തകർക്ക് വിവരം ലഭിക്കും.',
    what_happening: 'എന്താണ് അടിയന്തര സാഹചര്യം?',
    type_medical: 'വൈദ്യസഹായം (Medical)',
    type_medical_desc: 'പരുക്ക്, അബോധാവസ്ഥ, ശ്വാസതടസ്സം, അസുഖം',
    type_crowding: 'ജനത്തിരക്ക് / തിക്കുംതിരക്കും (Crowding)',
    type_crowding_desc: 'അമിതമായ തിരക്ക്, വഴി തടസ്സപ്പെടൽ',
    type_fire: 'തീപിടുത്തം / പുക (Fire / Smoke)',
    type_fire_desc: 'തീ, പുക, ഷോർട്ട് സർക്യൂട്ട് അപായം',
    type_security: 'സുരക്ഷാ പ്രശ്നം (Security)',
    type_security_desc: 'കയ്യാങ്കളി, മോഷണം, ശല്യപ്പെടുത്തൽ',
    type_missing: 'ആളെ കാണാതായി (Missing Person)',
    type_missing_desc: 'കുട്ടികളെയോ കൂടെയുള്ളവരെയോ കാണാതായാൽ',
    type_infra: 'തകരാറുകൾ (Infrastructure)',
    type_infra_desc: 'തകർന്ന ബാരിക്കേഡ്, ഇലക്ട്രിക്കൽ തകരാർ',
    extra_details: 'കൂടുതൽ വിവരങ്ങൾ / ലാൻഡ്മാർക്ക്',
    optional_tag: '(ഓപ്ഷണൽ)',
    callback_number: 'തിരിച്ചുവിളിക്കേണ്ട ഫോൺ നമ്പർ',
    photo_evidence: 'ഫോട്ടോ തെളിവ്',
    take_upload_photo: 'ഫോട്ടോ എടുക്കുക / അപ്‌ലോഡ് ചെയ്യുക',
    send_emergency_btn: '🚨 അടിയന്തര റിപ്പോർട്ട് സമർപ്പിക്കുക',
    submitting_btn: 'റിപ്പോർട്ട് അയക്കുന്നു...',
    privacy_guarantee: '🔒 ആപ്പ് ഇൻസ്റ്റാളേഷൻ ആവശ്യമില്ല · നേരിട്ട് കൺട്രോൾ റൂമിലേക്ക്.',
    report_dispatched: 'റിപ്പോർട്ട് കൺട്രോൾ റൂമിലേക്ക് അയച്ചു',
    help_is_coming: 'സഹായം ലഭ്യമാക്കിക്കൊണ്ടിരിക്കുന്നു.',
    stay_safe_message: 'നിങ്ങളുടെ റിപ്പോർട്ടിന് മുൻഗണന നൽകിയിട്ടുണ്ട്. ദയവായി സുരക്ഷിതമായ സ്ഥലത്ത് നിൽക്കുക.',
    incident_id_label: 'ഇൻസിഡന്റ് ഐഡി',
    type_label: 'വിഭാഗം',
    location_label: 'ലൊക്കേഷൻ',
    live_status: 'തത്സമയ സഹായ നില',
    status_reported: 'റിപ്പോർട്ട് ലഭിച്ചു',
    status_reported_desc: 'കൺട്രോൾ റൂമിൽ ലഭിച്ചു',
    status_assigned: 'വളണ്ടിയറെ നിയോഗിച്ചു',
    status_assigned_desc: 'അടുത്തുള്ള രക്ഷാപ്രവർത്തകനെ അയച്ചു',
    status_inprogress: 'സ്ഥലത്തെത്തി',
    status_inprogress_desc: 'സഹായം നൽകിക്കൊണ്ടിരിക്കുന്നു',
    status_resolved: 'പരിഹരിച്ചു',
    status_resolved_desc: 'പ്രശ്നം സുരക്ഷിതമായി കൈകാര്യം ചെയ്തു',
    resolution_note: 'പരിഹാര കുറിപ്പ്:',
    report_another: 'മറ്റൊരു റിപ്പോർട്ട് സമർപ്പിക്കുക',
    call_112: 'അടിയന്തര ഭീഷണിയോ? 112 വിളിക്കുക',
    call_firstaid: 'ഇവന്റ് ഫസ്റ്റ് എയ്ഡ്: +91 98765 43210',
    organizer_login_link: 'ഓർഗനൈസർ കൺട്രോൾ റൂം →',
    volunteer_login_link: 'വളണ്ടിയർ കൺസോൾ →'
  },
  ta: {
    event_banner: 'டெக்எக்ஸ் கேரளா 2026 · அவசர உதவி',
    need_help_title: 'உடனடி உதவி தேவையா?',
    need_help_desc: 'அருகிலுள்ள QR குறியீட்டை ஸ்கேன் செய்யவும் அல்லது உங்கள் பகுதியை தேர்ந்தெடுக்கவும்.',
    camera_ready: 'கேமராவை QR குறியீட்டின் மீது காட்டவும்',
    camera_tip: 'தூண்கள், கடைகள் மற்றும் நுழைவாயில்களில் QR குறியீடுகள் உள்ளன',
    open_camera: 'கேமராவை திறந்து QR ஸ்கேன் செய்யவும்',
    camera_privacy: 'பகுதியை அறிய மட்டுமே கேமரா பயன்படுத்தப்படுகிறது.',
    or_choose_zone: 'அல்லது உங்கள் தற்போதைய பகுதியை தேர்ந்தெடுக்கவும்',
    select_zone_label: 'அரங்க பகுதியை தேர்ந்தெடுக்கவும்:',
    choose_zone_placeholder: '-- பகுதியை தேர்ந்தெடுக்கவும் --',
    proceed_with_zone: 'உறுதி செய்து தொடரவும் →',
    your_location: 'உங்கள் இருப்பிடம்',
    change_location: 'மாற்றுக',
    zone_verified: 'இருப்பிடம் சரிபார்க்கப்பட்டது. அருகிலுள்ள மீட்பாளர்கள் விரைந்து வருவார்கள்.',
    what_happening: 'என்ன பிரச்சனை?',
    type_medical: 'மருத்துவ அவசரம் (Medical)',
    type_medical_desc: 'காயம், மயக்கம், மூச்சுத்திணறல், உடல்நலக்குறைவு',
    type_crowding: 'பாதுகாப்பற்ற நெரிசல் (Crowding)',
    type_crowding_desc: 'கடுமையான நெரிசல், வழி அடைப்பு',
    type_fire: 'தீ / புகை (Fire / Smoke)',
    type_fire_desc: 'தீப்பிழம்புகள், அதிக புகை, வெடிப்பு அபாயம்',
    type_security: 'பாதுகாப்பு அச்சுறுத்தல் (Security)',
    type_security_desc: 'சண்டை, திருட்டு, எல்லை மீறல்',
    type_missing: 'காணாமல் போன நபர் (Missing Person)',
    type_missing_desc: 'காணாமல் போன குழந்தை அல்லது நபர்',
    type_infra: 'கட்டமைப்பு ஆபத்து (Infrastructure)',
    type_infra_desc: 'உடைந்த தடுப்பு, மின்கோளாறு, கசிவு',
    extra_details: 'கூடுதல் விவரங்கள் / அடையாளம்',
    optional_tag: '(விருப்பத்தேர்வு)',
    callback_number: 'தொடர்பு கொள்ள வேண்டிய எண்',
    photo_evidence: 'புகைப்பட ஆதாரம்',
    take_upload_photo: 'படம் எடுக்க / பதிவேற்ற',
    send_emergency_btn: '🚨 அவசர அறிக்கையை சமர்ப்பிக்கவும்',
    submitting_btn: 'அறிக்கை அனுப்பப்படுகிறது...',
    privacy_guarantee: '🔒 செயலி தேவையில்லை · கணக்கு தேவையில்லை · நேரடியாக கட்டுப்பாட்டு அறைக்கு.',
    report_dispatched: 'அறிக்கை கட்டுப்பாட்டு அறைக்கு அனுப்பப்பட்டது',
    help_is_coming: 'உதவி ஒருங்கிணைக்கப்படுகிறது.',
    stay_safe_message: 'உங்கள் அவசர அறிக்கை முன்னுரிமை பெற்றுள்ளது. பாதுகாப்பான இடத்தில் இருக்கவும்.',
    incident_id_label: 'சம்பவ எண்',
    type_label: 'வகை',
    location_label: 'இருப்பிடம்',
    live_status: 'நேரலை உதவி நிலை',
    status_reported: 'அறிக்கை பெறப்பட்டது',
    status_reported_desc: 'கட்டுப்பாட்டு அறையில் பெறப்பட்டது',
    status_assigned: 'மீட்பாளர் நியமிக்கப்பட்டார்',
    status_assigned_desc: 'அருகிலுள்ள தன்னார்வலர் புறப்பட்டார்',
    status_inprogress: 'மீட்பாளர் களத்தில்',
    status_inprogress_desc: 'உதவி வழங்கப்படுகிறது',
    status_resolved: 'தீர்க்கப்பட்டது',
    status_resolved_desc: 'சம்பவம் பாதுகாப்பாக கையாளப்பட்டது',
    resolution_note: 'தீர்வு குறிப்பு:',
    report_another: 'மற்றொரு அறிக்கையை சமர்ப்பிக்கவும்',
    call_112: 'உடனடி ஆபத்தா? 112 அழைக்கவும்',
    call_firstaid: 'முதலுதவி எண்: +91 98765 43210',
    organizer_login_link: 'கட்டுப்பாட்டு அறை →',
    volunteer_login_link: 'தன்னார்வலர் திரை →'
  }
};

let currentLang = localStorage.getItem('sahaaya_lang') || 'en';
let selectedZone = null;
let selectedType = 'Medical';
let attachedPhotoBase64 = null;
let activeIncidentId = null;
let sseSource = null;

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
}

document.querySelector('#lang-en')?.addEventListener('click', () => setLanguage('en'));
document.querySelector('#lang-ml')?.addEventListener('click', () => setLanguage('ml'));
document.querySelector('#lang-ta')?.addEventListener('click', () => setLanguage('ta'));

// --- Screen Switcher ---
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.querySelector(`#${screenId}`)?.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Zone Resolution ---
const zoneNames = {
  'FOOD-07': 'Food Court East (Stalls 1-8)',
  'FOOD-08': 'Food Court West (Seating)',
  'AUD-02': 'Main Auditorium Hall',
  'GATE-01': 'Main Entrance Gate',
  'PARK-03': 'East Parking Area',
  'STAGE-01': 'Main Concert Stage',
  'FIRST-AID-01': 'Medical Tent 1'
};

function selectZone(code) {
  selectedZone = code.toUpperCase();
  const name = zoneNames[selectedZone] || `Zone ${selectedZone}`;
  document.querySelector('#zone-display').textContent = `${selectedZone} · ${name}`;
  showScreen('report-screen');
}

// Check URL Params for Zone (QR Scan entry point)
function checkUrlZone() {
  const params = new URLSearchParams(window.location.search);
  const zoneParam = params.get('zone') || params.get('z');
  if (zoneParam) {
    selectZone(zoneParam);
  } else {
    showScreen('scan-screen');
  }
}

// Rescan / Change Zone Button
document.querySelector('#rescan-btn')?.addEventListener('click', () => {
  showScreen('scan-screen');
});

// Manual Zone Dropdown Confirm
document.querySelector('#confirm-manual-zone')?.addEventListener('click', () => {
  const val = document.querySelector('#manual-zone').value;
  if (val) selectZone(val);
  else alert('Please select a zone from the dropdown list.');
});

// Camera Scanner
let videoStream = null;
const cameraBtn = document.querySelector('#start-camera');
const cameraVideo = document.querySelector('#camera');
const cameraWrap = document.querySelector('#camera-wrap');

cameraBtn?.addEventListener('click', async () => {
  if (videoStream) {
    // stop camera
    videoStream.getTracks().forEach(t => t.stop());
    videoStream = null;
    cameraWrap.classList.remove('active');
    cameraBtn.innerHTML = `<span>${translations[currentLang].open_camera}</span> <span>⌖</span>`;
    return;
  }

  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    cameraVideo.srcObject = videoStream;
    cameraVideo.play();
    cameraWrap.classList.add('active');
    cameraBtn.innerHTML = `<span>Close Camera</span> <span>✕</span>`;

    // Simulated fast barcode detection
    setTimeout(() => {
      if (videoStream) {
        videoStream.getTracks().forEach(t => t.stop());
        videoStream = null;
        cameraWrap.classList.remove('active');
        cameraBtn.innerHTML = `<span>${translations[currentLang].open_camera}</span> <span>⌖</span>`;
        selectZone('FOOD-07');
      }
    }, 2500);
  } catch (err) {
    alert('Camera permission denied or camera unavailable. Please select your zone manually below.');
  }
});

// --- Incident Category Selection ---
document.querySelectorAll('.help-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.help-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedType = btn.getAttribute('data-type');
  });
});

// --- Photo Upload with Compression ---
const photoInput = document.querySelector('#photo-input');
const photoPreviewWrap = document.querySelector('#photo-preview-wrap');
const photoPreview = document.querySelector('#photo-preview');
const removePhotoBtn = document.querySelector('#remove-photo');
const photoLabelText = document.querySelector('#photo-label-text');

photoInput?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      attachedPhotoBase64 = canvas.toDataURL('image/jpeg', 0.7);

      photoPreview.src = attachedPhotoBase64;
      photoPreviewWrap.classList.remove('hidden');
      photoLabelText.textContent = 'Photo Attached ✓';
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

removePhotoBtn?.addEventListener('click', () => {
  attachedPhotoBase64 = null;
  photoInput.value = '';
  photoPreviewWrap.classList.add('hidden');
  photoLabelText.textContent = translations[currentLang].take_upload_photo;
});

// --- Emergency Report Submission ---
const sendBtn = document.querySelector('#send-report-btn');

sendBtn?.addEventListener('click', async () => {
  if (!selectedZone) {
    alert('Please confirm your zone location first.');
    showScreen('scan-screen');
    return;
  }

  const note = document.querySelector('#description').value.trim();
  const callback = document.querySelector('#callback').value.trim();

  sendBtn.disabled = true;
  sendBtn.querySelector('#send-text').textContent = translations[currentLang].submitting_btn;

  try {
    const payload = {
      zone: selectedZone,
      zoneName: zoneNames[selectedZone] || `Zone ${selectedZone}`,
      type: selectedType,
      note,
      callback,
      photo: attachedPhotoBase64
    };

    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Submission failed');

    const incident = data.incident;
    activeIncidentId = incident.id;

    // Populate Success & Tracking Screen
    document.querySelector('#track-incident-id').textContent = incident.id;
    document.querySelector('#track-type').textContent = `${incident.type} Emergency`;
    document.querySelector('#track-zone').textContent = `${incident.zone} (${incident.zoneName || 'Venue'})`;
    
    const prioBadge = document.querySelector('#track-priority-badge');
    prioBadge.className = `badge ${incident.priority}`;
    prioBadge.textContent = incident.priority.toUpperCase();

    updateStepper(incident.state, incident.resolutionNote);
    showScreen('success-screen');

    // Subscribe to SSE updates for this incident
    initTrackingStream(incident.id);
  } catch (err) {
    alert(`Emergency submission error: ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    sendBtn.querySelector('#send-text').textContent = translations[currentLang].send_emergency_btn;
  }
});

// --- Stepper Progression ---
function updateStepper(state, resolutionNote) {
  const steps = ['reported', 'assigned', 'in_progress', 'resolved'];
  const stateIndex = steps.indexOf(state);

  steps.forEach((stepName, idx) => {
    const el = document.querySelector(`#step-${stepName}`);
    if (!el) return;

    el.classList.remove('active', 'completed');
    if (idx < stateIndex) {
      el.classList.add('completed');
    } else if (idx === stateIndex) {
      el.classList.add('active');
    }
  });

  const resBox = document.querySelector('#resolution-box');
  const resText = document.querySelector('#resolution-text');
  if (state === 'resolved' && resolutionNote) {
    resText.textContent = resolutionNote;
    resBox.classList.remove('hidden');
  } else {
    resBox.classList.add('hidden');
  }
}

// --- Tracking SSE Stream & Polling ---
function initTrackingStream(incidentId) {
  if (sseSource) sseSource.close();
  try {
    sseSource = new EventSource('/api/events');
    sseSource.addEventListener('state', e => {
      try {
        const fullState = JSON.parse(e.data);
        const myInc = fullState.incidents.find(i => i.id === incidentId);
        if (myInc) {
          updateStepper(myInc.state, myInc.resolutionNote);
        }
      } catch (err) {
        console.warn('SSE tracking parse error:', err);
      }
    });
  } catch (e) {
    console.warn('SSE connection error:', e);
  }

  // Active polling fallback
  setInterval(() => {
    if (activeIncidentId) {
      fetchIncidentTracking(activeIncidentId);
    }
  }, 3000);
}

async function fetchIncidentTracking(incidentId) {
  try {
    const res = await fetch(`/api/incidents/${incidentId}/track`);
    if (res.ok) {
      const data = await res.json();
      updateStepper(data.state, data.resolutionNote);
    }
  } catch (e) {
    // offline or network error
  }
}

// --- Initial Boot ---
window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  checkUrlZone();
});
