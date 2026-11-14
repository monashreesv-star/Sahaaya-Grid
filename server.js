/* ==========================================================================
   SAHAAYA GRID — Zero-Dependency Emergency Response Server
   Features: Role-Based Auth, Smart Dispatch, 30s Acceptance Timers,
             Spatiotemporal Clustering, Realtime SSE, Audit Logs, Analytics,
             Volunteer Registration
   ========================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'sahaaya-data.json');

// --- Helper for PBKDF2 Password Hashing ---
function hashPassword(password, salt = 'sahaaya_salt_2026') {
  return crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
}

// --- Initial Seed State ---
const defaultSeed = {
  users: [
    {
      id: 'usr-admin',
      username: 'admin',
      passwordHash: hashPassword('admin123'),
      name: 'Control Room Lead (Arun K.)',
      role: 'ORGANIZER',
      email: 'organizer@sahaayagrid.in',
      phone: '+91 98765 43210'
    },
    {
      id: 'anjali',
      username: 'anjali',
      passwordHash: hashPassword('vol123'),
      name: 'Anjali Menon',
      role: 'VOLUNTEER',
      skills: ['Medical', 'Missing person', 'First aid'],
      zone: 'AUD-01',
      available: true,
      currentIncidentId: null,
      phone: '+91 98765 00001'
    },
    {
      id: 'arun',
      username: 'arun',
      passwordHash: hashPassword('vol123'),
      name: 'Arun Kumar',
      role: 'VOLUNTEER',
      skills: ['Security', 'Crowding', 'Crowd control'],
      zone: 'GATE-01',
      available: true,
      currentIncidentId: null,
      phone: '+91 98765 00002'
    },
    {
      id: 'bala',
      username: 'bala',
      passwordHash: hashPassword('vol123'),
      name: 'Bala Murugan',
      role: 'VOLUNTEER',
      skills: ['Fire / Smoke', 'Infrastructure', 'General'],
      zone: 'STAGE-01',
      available: true,
      currentIncidentId: null,
      phone: '+91 98765 00003'
    },
    {
      id: 'divya',
      username: 'divya',
      passwordHash: hashPassword('vol123'),
      name: 'Divya Ramesh',
      role: 'VOLUNTEER',
      skills: ['General', 'Crowding', 'Missing person'],
      zone: 'PARK-03',
      available: true,
      currentIncidentId: null,
      phone: '+91 98765 00004'
    },
    {
      id: 'ravi',
      username: 'ravi',
      passwordHash: hashPassword('vol123'),
      name: 'Ravi Prakash',
      role: 'VOLUNTEER',
      skills: ['Crowding', 'Infrastructure'],
      zone: 'FOOD-05',
      available: false,
      currentIncidentId: null,
      phone: '+91 98765 00005'
    },
    {
      id: 'meera',
      username: 'meera',
      passwordHash: hashPassword('vol123'),
      name: 'Meera Nair',
      role: 'VOLUNTEER',
      skills: ['Infrastructure', 'Missing person'],
      zone: 'ENT-02',
      available: true,
      currentIncidentId: null,
      phone: '+91 98765 00006'
    }
  ],
  zones: [
    { id: 'zone-food-07', code: 'FOOD-07', name: 'Food Court East', sector: 'Food Court', active: true, description: 'Near food stall clusters 1-8' },
    { id: 'zone-food-08', code: 'FOOD-08', name: 'Food Court West', sector: 'Food Court', active: true, description: 'Beverage & seating pavilion' },
    { id: 'zone-aud-02', code: 'AUD-02', name: 'Main Auditorium', sector: 'Auditorium', active: true, description: 'Grand hall seating & exits' },
    { id: 'zone-gate-01', code: 'GATE-01', name: 'Main Entrance Gate', sector: 'Entrance', active: true, description: 'Security checkpoint & turnstiles' },
    { id: 'zone-park-03', code: 'PARK-03', name: 'East Parking Lot', sector: 'Parking', active: true, description: 'Attendee vehicle parking area' },
    { id: 'zone-stage-01', code: 'STAGE-01', name: 'Concert Stage', sector: 'Stage', active: true, description: 'Main stage front pit & backstage' },
    { id: 'zone-first-aid-01', code: 'FIRST-AID-01', name: 'Medical Tent 1', sector: 'First Aid', active: true, description: 'Primary triage station' }
  ],
  incidents: [
    {
      id: 'INC-20260819-0012',
      type: 'Medical',
      zone: 'AUD-02',
      zoneName: 'Main Auditorium',
      priority: 'high',
      state: 'resolved',
      note: 'Attendee feels faint near the west exit.',
      callback: '+91 98765 11111',
      photo: null,
      reportCount: 1,
      createdAt: 1787134590193,
      updatedAt: 1787141463571,
      assignedVolunteerId: 'anjali',
      assignmentId: 'ASG-SEED-01',
      resolvedAt: 1787141463571,
      resolvedBy: 'Anjali Menon',
      resolutionNote: 'Administered oral rehydration salts. Attendee resting comfortably in medical tent.',
      timeline: [
        { at: 1787134590193, text: 'Reported by civilian at AUD-02' },
        { at: 1787134620000, text: 'Assigned to Anjali Menon (Medical responder)' },
        { at: 1787134635000, text: 'Anjali Menon accepted emergency dispatch' },
        { at: 1787134800000, text: 'Anjali Menon arrived on scene (In progress)' },
        { at: 1787141463571, text: 'Incident resolved by Anjali Menon' }
      ]
    },
    {
      id: 'INC-20260819-0028',
      type: 'Crowding',
      zone: 'FOOD-07',
      zoneName: 'Food Court East',
      priority: 'medium',
      state: 'assigned',
      note: 'Long queues blocking passage between stalls 4 and 5.',
      callback: '',
      photo: null,
      reportCount: 2,
      createdAt: 1787141421576,
      updatedAt: 1787142686737,
      assignedVolunteerId: 'arun',
      assignmentId: 'ASG-SEED-02',
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null,
      timeline: [
        { at: 1787141421576, text: 'Reported by civilian at FOOD-07' },
        { at: 1787141480000, text: '2nd report clustered from FOOD-07. Priority: MEDIUM' },
        { at: 1787142686737, text: 'Assigned to Arun Kumar (Security & Crowd Control)' }
      ]
    }
  ],
  assignments: [
    {
      id: 'ASG-SEED-02',
      incidentId: 'INC-20260819-0028',
      volunteerId: 'arun',
      status: 'pending',
      assignedAt: 1787142686737,
      expiresAt: 1787142716737,
      acceptedAt: null,
      declinedAt: null,
      startedAt: null,
      completedAt: null
    }
  ],
  events: [
    {
      id: 'e-seed-01',
      type: 'AUTH_INIT',
      actorId: 'system',
      actorName: 'System',
      message: 'Sahaaya Grid Command Center initialized and secure.',
      incidentId: null,
      at: 1787134000000
    },
    {
      id: 'e-seed-02',
      type: 'INCIDENT_RESOLVED',
      actorId: 'anjali',
      actorName: 'Anjali Menon',
      message: 'Medical incident at AUD-02 marked RESOLVED by Anjali Menon.',
      incidentId: 'INC-20260819-0012',
      at: 1787141463571
    },
    {
      id: 'e-seed-03',
      type: 'TASK_ASSIGNED',
      actorId: 'usr-admin',
      actorName: 'Control Room Lead',
      message: 'Arun Kumar assigned to Crowding at FOOD-07.',
      incidentId: 'INC-20260819-0028',
      at: 1787142686737
    }
  ]
};

// --- In-Memory & File State Initialization ---
let state = defaultSeed;
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    state = {
      users: parsed.users && parsed.users.length ? parsed.users : defaultSeed.users,
      zones: parsed.zones && parsed.zones.length ? parsed.zones : defaultSeed.zones,
      incidents: parsed.incidents || [],
      assignments: parsed.assignments || [],
      events: parsed.events || []
    };
    // Ensure all default users exist with updated password hashes
    defaultSeed.users.forEach(defUser => {
      const existing = state.users.find(u => u.username === defUser.username);
      if (!existing) {
        state.users.push(defUser);
      } else {
        existing.passwordHash = defUser.passwordHash;
      }
    });
    // Ensure all default zones exist
    defaultSeed.zones.forEach(defZone => {
      if (!state.zones.find(z => z.code === defZone.code)) {
        state.zones.push(defZone);
      }
    });
  }
} catch (e) {
  console.warn('Error reading data file, using default seed:', e.message);
  state = defaultSeed;
}

// Active Sessions map: token -> { userId, username, name, role, expiresAt }
const sessions = new Map();
// SSE clients array
let sseClients = [];

// --- Persistence & Broadcast ---
function save() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    console.error('Failed to save data file:', e.message);
  }
  broadcast('state', getSanitizedState());
}

function broadcast(eventName, data) {
  const payload = `event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(res => {
    try {
      res.write(payload);
    } catch (e) {
      // client dropped
    }
  });
}

function logAudit(type, actor, message, incidentId = null, metadata = {}) {
  const entry = {
    id: crypto.randomUUID(),
    type,
    actorId: actor?.id || actor?.username || 'system',
    actorName: actor?.name || actor?.username || 'System',
    message,
    incidentId,
    metadata,
    at: Date.now()
  };
  state.events.unshift(entry);
  state.events = state.events.slice(0, 100);
}

// --- Priority Calculation Engine ---
function calculatePriority(type, note = '') {
  const text = (note + ' ' + type).toLowerCase();
  if (type === 'Fire / Smoke' || text.includes('fire') || text.includes('smoke') || text.includes('explosion') || text.includes('flames')) {
    return 'critical';
  }
  if (text.includes('unconscious') || text.includes('bleeding heavily') || text.includes('cardiac') || text.includes('stampede') || text.includes('breathing')) {
    return 'critical';
  }
  const defaults = {
    'Medical': 'high',
    'Missing person': 'high',
    'Security': 'high',
    'Fire / Smoke': 'critical',
    'Crowding': 'medium',
    'Infrastructure': 'low',
    'Other': 'medium'
  };
  return defaults[type] || 'medium';
}

// --- Smart Dispatch Engine ---
function scoreVolunteer(volunteer, incident) {
  if (!volunteer.available) return -1;
  let score = 50; // base score for available volunteer
  
  // Skill match
  const skills = volunteer.skills || [];
  const type = incident.type;
  if (type === 'Medical' && (skills.includes('Medical') || skills.includes('First aid'))) score += 100;
  else if (type === 'Crowding' && (skills.includes('Crowd control') || skills.includes('Crowding') || skills.includes('Security'))) score += 100;
  else if (type === 'Security' && (skills.includes('Security') || skills.includes('Crowd control'))) score += 100;
  else if (type === 'Missing person' && (skills.includes('Missing person') || skills.includes('General'))) score += 80;
  else if (type === 'Fire / Smoke' && (skills.includes('Fire / Smoke') || skills.includes('Fire response'))) score += 120;
  else if (skills.includes('General')) score += 30;

  // Zone match / proximity
  if (volunteer.zone && incident.zone) {
    if (volunteer.zone === incident.zone) {
      score += 50; // same exact zone
    } else if (volunteer.zone.split('-')[0] === incident.zone.split('-')[0]) {
      score += 25; // same sector (e.g. FOOD or AUD)
    }
  }

  return score;
}

function chooseBestVolunteer(incident) {
  const volunteers = state.users.filter(u => u.role === 'VOLUNTEER' && u.available);
  if (!volunteers.length) return null;

  const scored = volunteers.map(v => ({ volunteer: v, score: scoreVolunteer(v, incident) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.length ? scored[0].volunteer : null;
}

function getRankedVolunteerSuggestions(incident) {
  const volunteers = state.users.filter(u => u.role === 'VOLUNTEER');
  return volunteers.map(v => {
    const score = scoreVolunteer(v, incident);
    let matchReasons = [];
    if (v.skills?.some(s => s.toLowerCase().includes(incident.type.toLowerCase()) || (incident.type === 'Medical' && s === 'First aid'))) {
      matchReasons.push('Skill match');
    }
    if (v.zone === incident.zone) {
      matchReasons.push('In same zone (' + v.zone + ')');
    } else if (v.zone && incident.zone && v.zone.split('-')[0] === incident.zone.split('-')[0]) {
      matchReasons.push('Nearby sector (' + v.zone + ')');
    }
    if (!v.available) {
      matchReasons.push('Currently on assignment / offline');
    } else {
      matchReasons.push('Available now');
    }

    return {
      id: v.id,
      name: v.name,
      skills: v.skills || [],
      zone: v.zone || 'Unassigned',
      available: v.available,
      score: v.available ? score : -10,
      matchReason: matchReasons.join(' • ')
    };
  }).sort((a, b) => b.score - a.score);
}

// --- Spatiotemporal Clustering Engine ---
function checkAndClusterIncident(newReport) {
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const now = Date.now();

  const match = state.incidents.find(inc =>
    inc.state !== 'resolved' &&
    inc.zone === newReport.zone &&
    inc.type === newReport.type &&
    (now - inc.createdAt) <= windowMs
  );

  if (match) {
    match.reportCount = (match.reportCount || 1) + 1;
    match.updatedAt = now;
    // Escalate priority on multiple reports
    if (match.reportCount >= 3 && match.priority !== 'critical') {
      match.priority = match.type === 'Crowding' ? 'high' : 'critical';
    }
    if (newReport.note && !match.note.includes(newReport.note)) {
      match.note = match.note ? `${match.note} | [Addl report]: ${newReport.note}` : newReport.note;
    }
    if (newReport.callback && !match.callback.includes(newReport.callback)) {
      match.callback = match.callback ? `${match.callback}, ${newReport.callback}` : newReport.callback;
    }
    match.timeline = match.timeline || [];
    match.timeline.push({
      at: now,
      text: `Report #${match.reportCount} clustered for ${match.type} at ${match.zone}. Priority: ${match.priority.toUpperCase()}`
    });
    return { incident: match, clustered: true };
  }

  return { incident: null, clustered: false };
}

// --- 30-Second Volunteer Acceptance Timeout Engine ---
function checkAssignmentTimeouts() {
  const now = Date.now();
  let stateChanged = false;

  state.assignments.forEach(asg => {
    if (asg.status === 'pending' && asg.expiresAt && now > asg.expiresAt) {
      asg.status = 'expired';
      asg.expiredAt = now;

      const incident = state.incidents.find(i => i.id === asg.incidentId);
      const volunteer = state.users.find(u => u.id === asg.volunteerId);

      if (volunteer) {
        volunteer.available = true;
        volunteer.currentIncidentId = null;
      }

      if (incident && incident.state === 'assigned') {
        incident.state = 'reported';
        incident.assignedVolunteerId = null;
        incident.assignmentId = null;
        incident.timeline = incident.timeline || [];
        incident.timeline.push({
          at: now,
          text: `Assignment to ${volunteer?.name || 'volunteer'} expired after 30s timeout. Re-escalated to Command Center.`
        });
        logAudit(
          'TASK_EXPIRED',
          { id: 'system', name: 'Timeout Engine' },
          `30s acceptance timer expired for ${volunteer?.name || 'volunteer'} on incident ${incident.id} (${incident.type} at ${incident.zone}). Escalated to Organizer.`,
          incident.id
        );
      }
      stateChanged = true;
    }
  });

  if (stateChanged) {
    save();
  }
}

// Run timeout check every 1 second for precision
setInterval(checkAssignmentTimeouts, 1000);

// --- State Sanitization for Public & Client Views ---
function getSanitizedState() {
  return {
    incidents: state.incidents,
    volunteers: state.users.filter(u => u.role === 'VOLUNTEER').map(v => ({
      id: v.id,
      username: v.username,
      name: v.name,
      role: 'Volunteer Responder',
      skills: v.skills || [],
      zone: v.zone || '',
      available: Boolean(v.available),
      currentIncidentId: v.currentIncidentId || null,
      phone: v.phone || ''
    })),
    zones: state.zones,
    assignments: state.assignments,
    events: state.events.slice(0, 50)
  };
}

// --- Helper: Find Assignment by ID or Incident ID ---
function findAssignment(idParam) {
  let asg = state.assignments.find(a => a.id === idParam);
  if (!asg) {
    asg = state.assignments.find(a => a.incidentId === idParam && (a.status === 'pending' || a.status === 'accepted' || a.status === 'in_progress'));
  }
  return asg;
}

// --- HTTP Helpers ---
function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit for photo uploads
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function getAuth(req) {
  const authHeader = req.headers['authorization'] || '';
  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (req.headers['cookie']) {
    const match = req.headers['cookie'].match(/sahaaya_token=([^;]+)/);
    if (match) token = match[1];
  }
  if (!token) return null;

  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return session;
}

// --- Request Dispatcher ---
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  try {
    // -------------------------------------------------------------
    // 1. PUBLIC REALTIME SSE ENDPOINT
    // -------------------------------------------------------------
    if (pathname === '/api/events' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write(':\n\n');
      // Send initial state immediately
      res.write(`event: state\ndata: ${JSON.stringify(getSanitizedState())}\n\n`);
      sseClients.push(res);
      req.on('close', () => {
        sseClients = sseClients.filter(c => c !== res);
      });
      return;
    }

    // -------------------------------------------------------------
    // 2. AUTHENTICATION ENDPOINTS
    // -------------------------------------------------------------
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await readBody(req);
      const { username, password } = body;
      if (!username || !password) {
        return json(res, 400, { error: 'Username and password are required.' });
      }

      const user = state.users.find(u => u.username.toLowerCase() === String(username).trim().toLowerCase());
      if (!user || user.passwordHash !== hashPassword(password)) {
        logAudit('AUTH_FAILED', { username }, `Failed login attempt for user "${username}".`);
        return json(res, 401, { error: 'Invalid username or password.' });
      }

      // Generate session token (valid for 24 hours)
      const token = crypto.randomUUID();
      const session = {
        token,
        userId: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        skills: user.skills || [],
        zone: user.zone || '',
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
      };
      sessions.set(token, session);

      logAudit('AUTH_SUCCESS', user, `User "${user.name}" (${user.role}) logged in successfully.`);

      return json(res, 200, {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          skills: user.skills || [],
          zone: user.zone || '',
          phone: user.phone || ''
        }
      });
    }

    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      const auth = getAuth(req);
      if (auth) {
        sessions.delete(auth.token);
        logAudit('AUTH_LOGOUT', auth, `User "${auth.name}" logged out.`);
      }
      return json(res, 200, { success: true, message: 'Logged out successfully.' });
    }

    if (pathname === '/api/auth/me' && req.method === 'GET') {
      const auth = getAuth(req);
      if (!auth) {
        return json(res, 401, { error: 'Not authenticated.' });
      }
      const user = state.users.find(u => u.id === auth.userId) || auth;
      return json(res, 200, {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          skills: user.skills || [],
          zone: user.zone || '',
          available: user.available,
          phone: user.phone || ''
        }
      });
    }

    // -------------------------------------------------------------
    // 3. PUBLIC STATE / CONFIG / TRACKING ENDPOINTS
    // -------------------------------------------------------------
    if (pathname === '/api/state' && req.method === 'GET') {
      return json(res, 200, getSanitizedState());
    }

    if (pathname === '/api/zones' && req.method === 'GET') {
      return json(res, 200, { zones: state.zones });
    }

    // Public Civilian Tracking: /api/incidents/:id/track
    const trackMatch = pathname.match(/^\/api\/incidents\/([^/]+)\/track$/);
    if (trackMatch && req.method === 'GET') {
      const incident = state.incidents.find(i => i.id === trackMatch[1]);
      if (!incident) {
        return json(res, 404, { error: 'Incident not found' });
      }
      return json(res, 200, {
        id: incident.id,
        type: incident.type,
        zone: incident.zone,
        zoneName: incident.zoneName,
        priority: incident.priority,
        state: incident.state,
        reportCount: incident.reportCount || 1,
        createdAt: incident.createdAt,
        updatedAt: incident.updatedAt,
        responderAssigned: Boolean(incident.assignedVolunteerId),
        resolutionNote: incident.state === 'resolved' ? (incident.resolutionNote || 'Issue addressed by event responders.') : null,
        timeline: (incident.timeline || []).map(t => ({ at: t.at, text: t.text }))
      });
    }

    // -------------------------------------------------------------
    // 4. PUBLIC CIVILIAN EMERGENCY SUBMISSION
    // -------------------------------------------------------------
    if ((pathname === '/api/reports' || pathname === '/api/incidents') && req.method === 'POST') {
      const body = await readBody(req);
      const zoneCode = String(body.zone || '').trim().toUpperCase();
      const type = String(body.type || '').trim();

      if (!zoneCode || !type) {
        return json(res, 400, { error: 'Zone and incident type are mandatory.' });
      }

      // Check zone existence
      const knownZone = state.zones.find(z => z.code === zoneCode);
      const zoneName = body.zoneName || knownZone?.name || `Zone ${zoneCode}`;
      const note = String(body.note || body.description || '').slice(0, 1000);
      const callback = String(body.callback || '').slice(0, 30);
      const photo = body.photo || null;
      const calculatedPriority = calculatePriority(type, note);

      const reportData = {
        zone: zoneCode,
        zoneName,
        type,
        priority: calculatedPriority,
        note,
        callback,
        photo
      };

      // Check for Spatiotemporal Clustering
      const clusterResult = checkAndClusterIncident(reportData);
      if (clusterResult.clustered) {
        logAudit(
          'INCIDENT_CLUSTERED',
          { id: 'civilian', name: 'Civilian' },
          `Clustered report #${clusterResult.incident.reportCount} for ${type} at ${zoneCode}. Priority is ${clusterResult.incident.priority.toUpperCase()}.`,
          clusterResult.incident.id
        );
        save();
        return json(res, 200, { incident: clusterResult.incident, clustered: true });
      }

      // Create New Incident
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const incidentId = `INC-${dateStr}-${randomSeq}`;

      const newIncident = {
        id: incidentId,
        type,
        zone: zoneCode,
        zoneName,
        priority: calculatedPriority,
        state: 'reported',
        note,
        callback,
        photo,
        reportCount: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        assignedVolunteerId: null,
        assignmentId: null,
        resolvedAt: null,
        resolvedBy: null,
        resolutionNote: null,
        timeline: [
          { at: Date.now(), text: `Reported by civilian at ${zoneCode} (${zoneName})` },
          { at: Date.now(), text: `Priority calculated as ${calculatedPriority.toUpperCase()}` }
        ]
      };

      state.incidents.unshift(newIncident);
      logAudit(
        'INCIDENT_CREATED',
        { id: 'civilian', name: 'Civilian' },
        `New ${calculatedPriority.toUpperCase()}-priority ${type} report at ${zoneCode}.`,
        newIncident.id
      );
      save();
      return json(res, 201, { incident: newIncident, clustered: false });
    }

    // -------------------------------------------------------------
    // 5. PROTECTED DISPATCH & ORGANIZER OPERATIONS
    // -------------------------------------------------------------
    // Smart suggestions: /api/incidents/:id/suggestions
    const suggestMatch = pathname.match(/^\/api\/incidents\/([^/]+)\/suggestions$/);
    if (suggestMatch && req.method === 'GET') {
      const auth = getAuth(req);
      if (!auth || (auth.role !== 'ORGANIZER' && auth.role !== 'ADMIN')) {
        return json(res, 403, { error: 'Organizer authentication required.' });
      }
      const incident = state.incidents.find(i => i.id === suggestMatch[1]);
      if (!incident) return json(res, 404, { error: 'Incident not found.' });

      const suggestions = getRankedVolunteerSuggestions(incident);
      return json(res, 200, { suggestions });
    }

    // Assign Volunteer: /api/incidents/:id/assign
    const assignMatch = pathname.match(/^\/api\/incidents\/([^/]+)\/assign$/);
    if (assignMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth || (auth.role !== 'ORGANIZER' && auth.role !== 'ADMIN')) {
        return json(res, 403, { error: 'Organizer authentication required.' });
      }

      const body = await readBody(req);
      const incident = state.incidents.find(i => i.id === assignMatch[1]);
      if (!incident) return json(res, 404, { error: 'Incident not found.' });

      let volunteer = null;
      if (body.volunteerId) {
        volunteer = state.users.find(u => (u.id === body.volunteerId || u.username === body.volunteerId) && u.role === 'VOLUNTEER');
      } else {
        volunteer = chooseBestVolunteer(incident);
      }

      if (!volunteer) {
        return json(res, 409, { error: 'No available volunteer responders found.' });
      }

      // If reassigning, release previous assignment
      if (incident.assignmentId) {
        const oldAsg = state.assignments.find(a => a.id === incident.assignmentId);
        if (oldAsg && oldAsg.status === 'pending') {
          oldAsg.status = 'reassigned';
        }
        if (incident.assignedVolunteerId && incident.assignedVolunteerId !== volunteer.id) {
          const oldVol = state.users.find(u => u.id === incident.assignedVolunteerId);
          if (oldVol) {
            oldVol.available = true;
            oldVol.currentIncidentId = null;
          }
        }
      }

      // Create new Assignment with 30-Second Timer
      const assignmentId = 'ASG-' + crypto.randomUUID().slice(0, 8);
      const now = Date.now();
      const assignment = {
        id: assignmentId,
        incidentId: incident.id,
        volunteerId: volunteer.id,
        status: 'pending',
        assignedAt: now,
        expiresAt: now + 30000, // 30 seconds countdown
        acceptedAt: null,
        declinedAt: null,
        startedAt: null,
        completedAt: null
      };
      state.assignments.unshift(assignment);

      // Update Incident & Volunteer State
      incident.assignedVolunteerId = volunteer.id;
      incident.assignmentId = assignment.id;
      incident.state = 'assigned';
      incident.updatedAt = now;
      incident.timeline = incident.timeline || [];
      incident.timeline.push({
        at: now,
        text: `Assigned to ${volunteer.name} (${volunteer.skills?.join(', ') || 'General'}). 30-second acceptance timer started.`
      });

      volunteer.available = false;
      volunteer.currentIncidentId = incident.id;

      logAudit(
        'TASK_ASSIGNED',
        auth,
        `${volunteer.name} was assigned to ${incident.type} at ${incident.zone} by ${auth.name}. 30s timer started.`,
        incident.id
      );

      save();
      return json(res, 200, { incident, volunteer, assignment });
    }

    // Manual Status Update / Close: /api/incidents/:id/status
    const statusMatch = pathname.match(/^\/api\/incidents\/([^/]+)\/status$/);
    if (statusMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth) return json(res, 401, { error: 'Authentication required.' });

      const body = await readBody(req);
      const incident = state.incidents.find(i => i.id === statusMatch[1]);
      if (!incident) return json(res, 404, { error: 'Incident not found.' });

      const validStates = ['reported', 'assigned', 'accepted', 'in_progress', 'resolved', 'cancelled'];
      if (!validStates.includes(body.state)) {
        return json(res, 400, { error: 'Invalid state parameter.' });
      }

      const now = Date.now();
      incident.state = body.state;
      incident.updatedAt = now;

      if (body.priority) incident.priority = body.priority;
      if (body.note) incident.note = body.note;
      if (body.resolutionNote) incident.resolutionNote = body.resolutionNote;

      if (body.state === 'resolved' || body.state === 'cancelled') {
        incident.resolvedAt = now;
        incident.resolvedBy = auth.name;
        if (incident.assignedVolunteerId) {
          const vol = state.users.find(u => u.id === incident.assignedVolunteerId);
          if (vol) {
            vol.available = true;
            vol.currentIncidentId = null;
          }
        }
      }

      incident.timeline = incident.timeline || [];
      incident.timeline.push({
        at: now,
        text: `Status updated to ${body.state.toUpperCase()} by ${auth.name}.`
      });

      logAudit(
        'STATUS_CHANGE',
        auth,
        `Incident ${incident.id} (${incident.type} at ${incident.zone}) changed to ${body.state.toUpperCase()} by ${auth.name}.`,
        incident.id
      );

      save();
      return json(res, 200, { incident });
    }

    // -------------------------------------------------------------
    // 6. PROTECTED VOLUNTEER ASSIGNMENT ACTIONS
    // -------------------------------------------------------------
    // Volunteer Accept Task: /api/assignments/:id/accept
    const acceptMatch = pathname.match(/^\/api\/assignments\/([^/]+)\/accept$/);
    if (acceptMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth) return json(res, 401, { error: 'Authentication required.' });

      let asg = findAssignment(acceptMatch[1]);
      let incident = asg ? state.incidents.find(i => i.id === asg.incidentId) : state.incidents.find(i => i.id === acceptMatch[1]);
      
      if (!incident) return json(res, 404, { error: 'Incident / Assignment not found.' });

      if (!asg) {
        asg = {
          id: incident.assignmentId || ('ASG-' + incident.id),
          incidentId: incident.id,
          volunteerId: incident.assignedVolunteerId || auth.userId,
          status: 'pending',
          assignedAt: Date.now()
        };
        state.assignments.unshift(asg);
      }

      const volunteer = state.users.find(u => u.id === asg.volunteerId) || auth;
      const now = Date.now();

      asg.status = 'accepted';
      asg.acceptedAt = now;

      incident.state = 'accepted';
      incident.updatedAt = now;
      incident.timeline = incident.timeline || [];
      incident.timeline.push({
        at: now,
        text: `${volunteer.name} accepted the emergency task.`
      });

      logAudit(
        'TASK_ACCEPTED',
        auth,
        `${volunteer.name} ACCEPTED response for ${incident.type} at ${incident.zone}.`,
        incident.id
      );

      save();
      return json(res, 200, { assignment: asg, incident });
    }

    // Volunteer Decline Task: /api/assignments/:id/decline
    const declineMatch = pathname.match(/^\/api\/assignments\/([^/]+)\/decline$/);
    if (declineMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth) return json(res, 401, { error: 'Authentication required.' });

      const body = await readBody(req);
      let asg = findAssignment(declineMatch[1]);
      let incident = asg ? state.incidents.find(i => i.id === asg.incidentId) : state.incidents.find(i => i.id === declineMatch[1]);

      if (!incident) return json(res, 404, { error: 'Assignment not found.' });

      const volunteer = asg ? state.users.find(u => u.id === asg.volunteerId) : state.users.find(u => u.id === incident.assignedVolunteerId);
      const now = Date.now();

      if (asg) {
        asg.status = 'declined';
        asg.declinedAt = now;
        asg.declineReason = body.reason || 'Responder unavailable';
      }

      if (volunteer) {
        volunteer.available = true;
        volunteer.currentIncidentId = null;
      }

      incident.state = 'reported';
      incident.assignedVolunteerId = null;
      incident.assignmentId = null;
      incident.updatedAt = now;
      incident.timeline = incident.timeline || [];
      incident.timeline.push({
        at: now,
        text: `${volunteer?.name || 'Volunteer'} declined task (${body.reason || 'Unavailable'}). Escalated to Organizer.`
      });

      logAudit(
        'TASK_DECLINED',
        auth,
        `${volunteer?.name || auth.name} DECLINED task at ${incident.zone}: ${body.reason || 'Unavailable'}. Escalated to Organizer.`,
        incident.id
      );

      save();
      return json(res, 200, { success: true, message: 'Assignment declined and escalated.' });
    }

    // Volunteer Start Response: /api/assignments/:id/start
    const startMatch = pathname.match(/^\/api\/assignments\/([^/]+)\/start$/);
    if (startMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth) return json(res, 401, { error: 'Authentication required.' });

      let asg = findAssignment(startMatch[1]);
      let incident = asg ? state.incidents.find(i => i.id === asg.incidentId) : state.incidents.find(i => i.id === startMatch[1]);
      
      if (!incident) return json(res, 404, { error: 'Assignment not found.' });

      const volunteer = asg ? state.users.find(u => u.id === asg.volunteerId) : state.users.find(u => u.id === incident.assignedVolunteerId);
      const now = Date.now();

      if (asg) {
        asg.status = 'in_progress';
        asg.startedAt = now;
      }

      incident.state = 'in_progress';
      incident.updatedAt = now;
      incident.timeline = incident.timeline || [];
      incident.timeline.push({
        at: now,
        text: `${volunteer?.name || 'Volunteer'} arrived on scene. Response in progress.`
      });

      logAudit(
        'TASK_STARTED',
        auth,
        `${volunteer?.name || auth.name} started ON-SCENE response for ${incident.type} at ${incident.zone}.`,
        incident.id
      );

      save();
      return json(res, 200, { assignment: asg, incident });
    }

    // Volunteer Resolve Incident: /api/assignments/:id/resolve
    const resolveMatch = pathname.match(/^\/api\/assignments\/([^/]+)\/resolve$/);
    if (resolveMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth) return json(res, 401, { error: 'Authentication required.' });

      const body = await readBody(req);
      let asg = findAssignment(resolveMatch[1]);
      let incident = asg ? state.incidents.find(i => i.id === asg.incidentId) : state.incidents.find(i => i.id === resolveMatch[1]);

      if (!incident) return json(res, 404, { error: 'Assignment not found.' });

      const volunteer = asg ? state.users.find(u => u.id === asg.volunteerId) : state.users.find(u => u.id === incident.assignedVolunteerId);
      const now = Date.now();

      if (asg) {
        asg.status = 'completed';
        asg.completedAt = now;
      }

      if (volunteer) {
        volunteer.available = true;
        volunteer.currentIncidentId = null;
      }

      incident.state = 'resolved';
      incident.resolvedAt = now;
      incident.resolvedBy = volunteer?.name || auth.name;
      incident.resolutionNote = body.resolutionNote || 'Emergency situation resolved safely.';
      incident.updatedAt = now;
      incident.timeline = incident.timeline || [];
      incident.timeline.push({
        at: now,
        text: `Resolved by ${incident.resolvedBy}: "${incident.resolutionNote}"`
      });

      logAudit(
        'INCIDENT_RESOLVED',
        auth,
        `${incident.type} at ${incident.zone} RESOLVED by ${volunteer?.name || auth.name}. Note: ${incident.resolutionNote}`,
        incident.id
      );

      save();
      return json(res, 200, { assignment: asg, incident });
    }

    // Volunteer Timeout Endpoint (Immediate Client Expiration Notification)
    const timeoutMatch = pathname.match(/^\/api\/assignments\/([^/]+)\/timeout$/);
    if (timeoutMatch && req.method === 'POST') {
      let asg = findAssignment(timeoutMatch[1]);
      if (asg && asg.status === 'pending') {
        const now = Date.now();
        asg.status = 'expired';
        asg.expiredAt = now;

        const incident = state.incidents.find(i => i.id === asg.incidentId);
        const volunteer = state.users.find(u => u.id === asg.volunteerId);

        if (volunteer) {
          volunteer.available = true;
          volunteer.currentIncidentId = null;
        }

        if (incident && incident.state === 'assigned') {
          incident.state = 'reported';
          incident.assignedVolunteerId = null;
          incident.assignmentId = null;
          incident.timeline = incident.timeline || [];
          incident.timeline.push({
            at: now,
            text: `Assignment to ${volunteer?.name || 'volunteer'} expired after 30s timeout. Re-escalated to Command Center.`
          });
          logAudit(
            'TASK_EXPIRED',
            { id: 'system', name: 'Timeout Engine' },
            `30s acceptance timer expired for ${volunteer?.name || 'volunteer'} on incident ${incident.id}. Escalated to Organizer.`,
            incident.id
          );
        }
        save();
      }
      return json(res, 200, { success: true });
    }

    // Volunteer Toggle Availability: /api/volunteers/:id/availability
    const availMatch = pathname.match(/^\/api\/volunteers\/([^/]+)\/availability$/);
    if (availMatch && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth) return json(res, 401, { error: 'Authentication required.' });

      const body = await readBody(req);
      const volunteer = state.users.find(u => (u.id === availMatch[1] || u.username === availMatch[1]) && u.role === 'VOLUNTEER');
      if (!volunteer) return json(res, 404, { error: 'Volunteer not found.' });

      volunteer.available = Boolean(body.available);
      logAudit(
        'AVAILABILITY_CHANGE',
        auth,
        `${volunteer.name} is now ${volunteer.available ? 'AVAILABLE' : 'OFFLINE'}.`
      );

      save();
      return json(res, 200, { volunteer });
    }

    // -------------------------------------------------------------
    // 7. VOLUNTEER REGISTRATION & MANAGEMENT
    // -------------------------------------------------------------
    if (pathname === '/api/volunteers' && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth || (auth.role !== 'ORGANIZER' && auth.role !== 'ADMIN')) {
        return json(res, 403, { error: 'Organizer authorization required.' });
      }

      const body = await readBody(req);
      const name = String(body.name || '').trim();
      const username = String(body.username || '').trim().toLowerCase();
      const password = String(body.password || 'vol123').trim();
      const zone = String(body.zone || '').trim().toUpperCase();
      const phone = String(body.phone || '').trim();
      const skills = Array.isArray(body.skills) && body.skills.length ? body.skills : ['General'];

      if (!name || !username) {
        return json(res, 400, { error: 'Volunteer name and username are required.' });
      }

      if (state.users.find(u => u.username.toLowerCase() === username)) {
        return json(res, 409, { error: `Username "${username}" is already taken.` });
      }

      const newVol = {
        id: username,
        username,
        passwordHash: hashPassword(password),
        name,
        role: 'VOLUNTEER',
        skills,
        zone: zone || 'General',
        available: true,
        currentIncidentId: null,
        phone: phone || '+91 98765 00000',
        createdAt: Date.now()
      };

      state.users.push(newVol);
      logAudit(
        'VOLUNTEER_REGISTERED',
        auth,
        `New volunteer "${name}" (@${username}) registered in zone ${zone || 'General'} by ${auth.name}.`
      );
      save();
      return json(res, 201, { volunteer: newVol });
    }

    // -------------------------------------------------------------
    // 8. ZONES & AUDIT LOGS & ANALYTICS
    // -------------------------------------------------------------
    if (pathname === '/api/zones' && req.method === 'POST') {
      const auth = getAuth(req);
      if (!auth || (auth.role !== 'ORGANIZER' && auth.role !== 'ADMIN')) {
        return json(res, 403, { error: 'Organizer authorization required.' });
      }

      const body = await readBody(req);
      const code = String(body.code || '').trim().toUpperCase();
      const name = String(body.name || '').trim();
      const sector = String(body.sector || 'General').trim();
      const description = String(body.description || '').trim();

      if (!code || !name) {
        return json(res, 400, { error: 'Zone code and name are required.' });
      }

      if (state.zones.find(z => z.code === code)) {
        return json(res, 409, { error: `Zone with code "${code}" already exists.` });
      }

      const newZone = {
        id: `zone-${code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        code,
        name,
        sector,
        description,
        active: true,
        createdAt: Date.now()
      };

      state.zones.push(newZone);
      logAudit('ZONE_CREATED', auth, `New venue zone "${code} — ${name}" created by ${auth.name}.`);
      save();
      return json(res, 201, { zone: newZone });
    }

    if (pathname === '/api/audit-logs' && req.method === 'GET') {
      const auth = getAuth(req);
      if (!auth || (auth.role !== 'ORGANIZER' && auth.role !== 'ADMIN')) {
        return json(res, 403, { error: 'Organizer authorization required.' });
      }
      return json(res, 200, { events: state.events });
    }

    if (pathname === '/api/analytics' && req.method === 'GET') {
      const auth = getAuth(req);
      if (!auth || (auth.role !== 'ORGANIZER' && auth.role !== 'ADMIN')) {
        return json(res, 403, { error: 'Organizer authorization required.' });
      }

      const total = state.incidents.length;
      const resolved = state.incidents.filter(i => i.state === 'resolved').length;
      const active = total - resolved;

      // Breakdown by Type
      const byType = {};
      state.incidents.forEach(i => {
        byType[i.type] = (byType[i.type] || 0) + 1;
      });

      // Breakdown by Priority
      const byPriority = { critical: 0, high: 0, medium: 0, low: 0 };
      state.incidents.forEach(i => {
        byPriority[i.priority] = (byPriority[i.priority] || 0) + 1;
      });

      // Breakdown by Zone
      const byZone = {};
      state.incidents.forEach(i => {
        byZone[i.zone] = (byZone[i.zone] || 0) + 1;
      });

      // Response & Resolution Times
      let totalResponseTimeSec = 0, responseCount = 0;
      let totalResolutionTimeSec = 0, resolutionCount = 0;

      state.assignments.forEach(asg => {
        if (asg.acceptedAt && asg.assignedAt) {
          totalResponseTimeSec += Math.max(0, (asg.acceptedAt - asg.assignedAt) / 1000);
          responseCount++;
        }
        if (asg.completedAt && asg.acceptedAt) {
          totalResolutionTimeSec += Math.max(0, (asg.completedAt - asg.acceptedAt) / 1000);
          resolutionCount++;
        }
      });

      const avgResponseTimeSec = responseCount ? Math.round(totalResponseTimeSec / responseCount) : 22;
      const avgResolutionTimeSec = resolutionCount ? Math.round(totalResolutionTimeSec / resolutionCount) : 240;

      // Volunteer Leaderboard
      const volunteerStats = state.users.filter(u => u.role === 'VOLUNTEER').map(v => {
        const completed = state.assignments.filter(a => a.volunteerId === v.id && a.status === 'completed').length;
        const totalAssigned = state.assignments.filter(a => a.volunteerId === v.id).length;
        return {
          id: v.id,
          name: v.name,
          skills: v.skills || [],
          zone: v.zone || '',
          available: v.available,
          resolvedCount: completed,
          totalAssigned
        };
      });

      return json(res, 200, {
        total,
        resolved,
        active,
        byType,
        byPriority,
        byZone,
        avgResponseTimeSec,
        avgResolutionTimeSec,
        volunteerStats
      });
    }

    // -------------------------------------------------------------
    // 9. STATIC FILE SERVING
    // -------------------------------------------------------------
    let safePath = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
    // Alias /report to civilian.html
    if (safePath === 'report' || safePath.startsWith('report?')) {
      safePath = 'civilian.html';
    }
    const filePath = path.resolve(ROOT, safePath);
    if (!filePath.startsWith(ROOT)) {
      return json(res, 403, { error: 'Forbidden' });
    }

    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.ico': 'image/x-icon'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1><p>The requested Sahaaya Grid resource does not exist.</p>');
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        });
        res.end(data);
      }
    });
  } catch (error) {
    console.error('Server error processing request:', error);
    json(res, 500, { error: 'Internal server error', detail: error.message });
  }
});

// --- Start Server ---
server.listen(PORT, () => {
  const ip = Object.values(os.networkInterfaces())
    .flat()
    .find(x => x && x.family === 'IPv4' && !x.internal)?.address || 'localhost';
  console.log(`========================================================`);
  console.log(`  SAHAAYA GRID Emergency Response Platform Online`);
  console.log(`  Organizer Command Center: http://localhost:${PORT}/index.html`);
  console.log(`  Volunteer Console:        http://localhost:${PORT}/volunteer.html`);
  console.log(`  Civilian Emergency Page:  http://localhost:${PORT}/civilian.html?zone=FOOD-07`);
  console.log(`  Demo QR Generator:        http://localhost:${PORT}/demo-qr.html`);
  console.log(`  Mobile / LAN Access:      http://${ip}:${PORT}`);
  console.log(`========================================================`);
});
