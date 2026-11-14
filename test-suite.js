/* ==========================================================================
   SAHAAYA GRID — Comprehensive Automated End-to-End Test Suite
   Verifies: Auth, Volunteer Registration, Civilian Reporting, Dispatch,
             Precision 30s Timers & Timeout API, Clustering, Analytics, Audit Logs
   ========================================================================== */

const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    if (body) {
      reqOptions.headers['Content-Type'] = 'application/json';
    }

    const req = http.request(url, reqOptions, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch {}
        resolve({ status: res.statusCode, headers: res.headers, data: json || data });
      });
    });

    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('  STARTING SAHAAYA GRID AUTOMATED TEST SUITE');
  console.log('======================================================\n');

  try {
    // ----------------------------------------------------
    // TEST 1: Public state endpoint
    // ----------------------------------------------------
    console.log('1. Public State & Health Check:');
    const stateRes = await request('/api/state');
    assert(stateRes.status === 200, 'GET /api/state returns HTTP 200');
    assert(Array.isArray(stateRes.data.zones), 'State contains zones array');
    assert(Array.isArray(stateRes.data.volunteers), 'State contains volunteers array');

    // ----------------------------------------------------
    // TEST 2: Authentication
    // ----------------------------------------------------
    console.log('\n2. Security & Authentication:');
    // Reject invalid credentials
    const badLogin = await request('/api/auth/login', { method: 'POST' }, { username: 'admin', password: 'wrongpassword' });
    assert(badLogin.status === 401, 'Rejects invalid password with HTTP 401');

    // Login as Organizer
    const adminLogin = await request('/api/auth/login', { method: 'POST' }, { username: 'admin', password: 'admin123' });
    assert(adminLogin.status === 200, 'Organizer login succeeds with HTTP 200');
    assert(Boolean(adminLogin.data.token), 'Returns session token');
    assert(adminLogin.data.user.role === 'ORGANIZER', 'User role is ORGANIZER');
    const adminToken = adminLogin.data.token;

    // Login as Volunteer
    const volLogin = await request('/api/auth/login', { method: 'POST' }, { username: 'anjali', password: 'vol123' });
    assert(volLogin.status === 200, 'Volunteer login succeeds with HTTP 200');
    assert(volLogin.data.user.role === 'VOLUNTEER', 'User role is VOLUNTEER');
    const volToken = volLogin.data.token;

    // Validate Auth Me
    const meRes = await request('/api/auth/me', { headers: { 'Authorization': `Bearer ${adminToken}` } });
    assert(meRes.status === 200 && meRes.data.user.username === 'admin', 'GET /api/auth/me returns authenticated user profile');

    // Reject protected endpoint without auth
    const unauthAudit = await request('/api/audit-logs');
    assert(unauthAudit.status === 403, 'Protected endpoint /api/audit-logs rejects unauthenticated access with HTTP 403');

    // ----------------------------------------------------
    // TEST 3: Volunteer Registration (Organizer Feature)
    // ----------------------------------------------------
    console.log('\n3. Volunteer Registration:');
    const newVolUsername = `kiran_${Date.now().toString().slice(-4)}`;
    const regVolRes = await request('/api/volunteers', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    }, {
      name: 'Kiran Varma',
      username: newVolUsername,
      password: 'vol123',
      zone: 'STAGE-01',
      phone: '+91 98765 00099',
      skills: ['Medical', 'First aid', 'Crowd control']
    });
    assert(regVolRes.status === 201, 'POST /api/volunteers creates new volunteer');
    assert(regVolRes.data.volunteer.username === newVolUsername, 'Volunteer profile saved with correct username');

    // Verify newly registered volunteer can log in
    const newVolLogin = await request('/api/auth/login', { method: 'POST' }, {
      username: newVolUsername,
      password: 'vol123'
    });
    assert(newVolLogin.status === 200, 'Newly registered volunteer can log in successfully');
    assert(newVolLogin.data.user.name === 'Kiran Varma', 'Login returns new volunteer details');

    // ----------------------------------------------------
    // TEST 4: Civilian Reporting & Tracking (Public Zero-Install)
    // ----------------------------------------------------
    console.log('\n4. Civilian Public Reporting & Public-Safe Tracking:');
    const reportRes = await request('/api/reports', { method: 'POST' }, {
      zone: 'FOOD-07',
      zoneName: 'Food Court East',
      type: 'Medical',
      note: 'Attendee collapsed near juice stall.',
      callback: '+91 98765 43210'
    });
    assert(reportRes.status === 201, 'Civilian submit emergency returns HTTP 201');
    assert(Boolean(reportRes.data.incident.id), 'Generated incident ID: ' + reportRes.data.incident.id);
    assert(reportRes.data.incident.priority === 'high', 'Medical emergency priority evaluated as HIGH');
    const incidentId = reportRes.data.incident.id;

    // Public Safe Tracking
    const trackRes = await request(`/api/incidents/${incidentId}/track`);
    assert(trackRes.status === 200, 'GET /api/incidents/:id/track returns HTTP 200');
    assert(trackRes.data.state === 'reported', 'Initial public status is "reported"');
    assert(trackRes.data.responderPhone === undefined, 'Does not expose sensitive responder PII to public tracking');

    // ----------------------------------------------------
    // TEST 5: Smart Dispatch & Volunteer Assignment
    // ----------------------------------------------------
    console.log('\n5. Smart Dispatch & Volunteer Assignment:');
    const suggRes = await request(`/api/incidents/${incidentId}/suggestions`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(suggRes.status === 200, 'GET /api/incidents/:id/suggestions returns HTTP 200');
    assert(suggRes.data.suggestions.length > 0, 'Returns ranked volunteer suggestions');
    assert(suggRes.data.suggestions[0].skills.includes('Medical'), 'Top suggested volunteer has Medical skill');

    // Assign Anjali
    const assignRes = await request(`/api/incidents/${incidentId}/assign`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    }, { volunteerId: 'anjali' });
    assert(assignRes.status === 200, 'POST /api/incidents/:id/assign returns HTTP 200');
    assert(assignRes.data.assignment.status === 'pending', 'Assignment created with status "pending"');
    assert(Boolean(assignRes.data.assignment.expiresAt), '30-second acceptance timer attached');
    const assignmentId = assignRes.data.assignment.id;

    // ----------------------------------------------------
    // TEST 6: Volunteer Response Lifecycle
    // ----------------------------------------------------
    console.log('\n6. Volunteer Response Lifecycle:');
    // Volunteer Accepts
    const acceptRes = await request(`/api/assignments/${assignmentId}/accept`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${volToken}` }
    }, {});
    assert(acceptRes.status === 200, 'POST /api/assignments/:id/accept returns HTTP 200');
    assert(acceptRes.data.incident.state === 'accepted', 'Incident state updated to "accepted"');

    // Volunteer Starts Response (On Scene)
    const startRes = await request(`/api/assignments/${assignmentId}/start`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${volToken}` }
    }, {});
    assert(startRes.status === 200, 'POST /api/assignments/:id/start returns HTTP 200');
    assert(startRes.data.incident.state === 'in_progress', 'Incident state updated to "in_progress"');

    // Volunteer Resolves Incident with Notes
    const resolveRes = await request(`/api/assignments/${assignmentId}/resolve`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${volToken}` }
    }, { resolutionNote: 'Patient safely treated with ORS packet and resting.' });
    assert(resolveRes.status === 200, 'POST /api/assignments/:id/resolve returns HTTP 200');
    assert(resolveRes.data.incident.state === 'resolved', 'Incident state updated to "resolved"');
    assert(resolveRes.data.incident.resolutionNote.includes('safely treated'), 'Resolution note stored correctly');

    // Verify Public Safe Tracking reflects resolution
    const trackAfter = await request(`/api/incidents/${incidentId}/track`);
    assert(trackAfter.data.state === 'resolved', 'Public tracker reflects RESOLVED state');
    assert(trackAfter.data.resolutionNote.includes('safely treated'), 'Public tracker displays safe resolution message');

    // ----------------------------------------------------
    // TEST 7: 30s Timeout Notification API
    // ----------------------------------------------------
    console.log('\n7. Precision Timeout Notification API:');
    const repTimeout = await request('/api/reports', { method: 'POST' }, {
      zone: 'GATE-01',
      zoneName: 'Main Entrance Gate',
      type: 'Security',
      note: 'Minor argument at gate 1.'
    });
    const incTimeoutId = repTimeout.data.incident.id;
    const assignTimeoutRes = await request(`/api/incidents/${incTimeoutId}/assign`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    }, { volunteerId: 'arun' });
    const asgTimeoutId = assignTimeoutRes.data.assignment.id;

    // Trigger timeout endpoint
    const timeoutRes = await request(`/api/assignments/${asgTimeoutId}/timeout`, { method: 'POST' });
    assert(timeoutRes.status === 200, 'POST /api/assignments/:id/timeout returns HTTP 200');

    // ----------------------------------------------------
    // TEST 8: Spatiotemporal Clustering
    // ----------------------------------------------------
    console.log('\n8. Spatiotemporal Clustering Engine:');
    const clusterZone = 'PARK-03';
    const rep1 = await request('/api/reports', { method: 'POST' }, {
      zone: clusterZone,
      zoneName: 'East Parking',
      type: 'Crowding',
      note: 'Gate blocked by cars'
    });
    const rep2 = await request('/api/reports', { method: 'POST' }, {
      zone: clusterZone,
      zoneName: 'East Parking',
      type: 'Crowding',
      note: 'Congestion growing'
    });
    const rep3 = await request('/api/reports', { method: 'POST' }, {
      zone: clusterZone,
      zoneName: 'East Parking',
      type: 'Crowding',
      note: 'Complete blockage'
    });

    assert(rep1.data.clustered === false, 'First report creates base incident');
    assert(rep2.data.clustered === true, 'Second report in same zone within 5m is clustered');
    assert(rep3.data.clustered === true, 'Third report is clustered');
    assert(rep3.data.incident.reportCount === 3, 'Report count incremented to 3');
    assert(rep3.data.incident.priority === 'high', 'Priority escalated to HIGH due to repeated crowding reports');

    // ----------------------------------------------------
    // TEST 9: Analytics & Audit Logs
    // ----------------------------------------------------
    console.log('\n9. Analytics & Audit Logs:');
    const analyticsRes = await request('/api/analytics', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(analyticsRes.status === 200, 'GET /api/analytics returns HTTP 200');
    assert(analyticsRes.data.total > 0, 'Analytics total reports > 0');
    assert(typeof analyticsRes.data.byPriority === 'object', 'Analytics contains priority breakdown');

    const auditRes = await request('/api/audit-logs', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(auditRes.status === 200, 'GET /api/audit-logs returns HTTP 200');
    assert(auditRes.data.events.length > 0, 'Audit logs contain recorded event stream');

    console.log('\n======================================================');
    console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('======================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

runTests();
