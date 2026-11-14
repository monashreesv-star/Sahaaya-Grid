# SAHAAYA GRID — Emergency Response & Dispatch Platform

Sahaaya Grid is a zero-install, QR-based emergency reporting, dispatch, and response coordination platform designed for crowded venues, festivals, and large-scale public events.

---

## Architecture & Security Tiers

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              SAHAAYA GRID                              │
├───────────────────┬────────────────────────────┬───────────────────────┤
│    CIVILIAN       │         ORGANIZER          │       VOLUNTEER       │
│  (Public Tier)    │   (Admin/Command Tier)     │   (Field Responder)   │
├───────────────────┼────────────────────────────┼───────────────────────┤
│ • Zero-install    │ • Mandatory Secure Login   │ • Mandatory Login     │
│ • No account req. │ • Role: ORGANIZER / ADMIN  │ • Role: VOLUNTEER     │
│ • QR-based zone   │ • Full dispatch & control  │ • Assigned tasks only │
│ • Public tracking │ • Zone & volunteer mgmt    │ • Availability toggle │
│ • PII-masked      │ • Audit log & analytics    │ • Response updates    │
└───────────────────┴────────────────────────────┴───────────────────────┘
```

1. **Civilian (Public Tier)**:
   - Zero-install, zero-login, instant QR-based reporting (< 5s submission).
   - Real-time privacy-safe status tracking (`REPORTED` → `ASSIGNED` → `IN PROGRESS` → `RESOLVED`).
   - Bilingual support: **English** and **தமிழ் (Tamil)**.

2. **Organizer (Command Center Tier)**:
   - Mandatory secure authentication (`admin` / `admin123`).
   - Live incident queue with filters, smart dispatch suggestions (skill & proximity matching).
   - Interactive venue map grid, volunteer roster management, dynamic QR code suite, analytics charts, and full audit logs.

3. **Volunteer (Field Responder Tier)**:
   - Mandatory secure authentication (`anjali` / `vol123`, `arun` / `vol123`, etc.).
   - Loud visual incident alerts with **30-second acceptance countdown timer**.
   - Lifecycle state progression (`Accept` → `Start Response / On Scene` → `Resolve with Notes`).
   - Availability toggle (`AVAILABLE` / `OFFLINE`).

---

## Pre-configured Demo Accounts

| Role | Username | Password | Full Name | Sector / Assigned Skills |
| :--- | :--- | :--- | :--- | :--- |
| **Lead Organizer** | `admin` | `admin123` | Control Room Lead (Arun K.) | All Command & Dispatch Ops |
| **Volunteer 1** | `anjali` | `vol123` | Anjali Menon | `AUD-01` · Medical, Missing Person |
| **Volunteer 2** | `arun` | `vol123` | Arun Kumar | `GATE-01` · Security, Crowd Control |
| **Volunteer 3** | `bala` | `vol123` | Bala Murugan | `STAGE-01` · Fire Response, General |
| **Volunteer 4** | `divya` | `vol123` | Divya Ramesh | `PARK-03` · General, Crowding |
| **Volunteer 5** | `ravi` | `vol123` | Ravi Prakash | `FOOD-05` · Crowding, Infrastructure |
| **Volunteer 6** | `meera` | `vol123` | Meera Nair | `ENT-02` · Infrastructure, Safety |

---

## How to Run

Zero external NPM dependencies are required — uses built-in Node.js runtime (`http`, `crypto`, `fs`, `path`, `os`):

```powershell
node server.js
```

### Application URLs:
- **Organizer Command Center**: `https://sahaaya-grid.onrender.com/civilian.html`
- **Volunteer Responder Console**: `https://sahaaya-grid.onrender.com/volunteer.html`
- **Civilian Emergency Report**: `https://sahaaya-grid.onrender.com/civilian.html?zone=FOOD-07`
- **Demo Multi-Zone QR Generator**: `https://sahaaya-grid.onrender.com/demo-qr.html`

---

## End-to-End Demonstration Flow

```text
1. [Civilian]
   Open https://sahaaya-grid.onrender.com/civilian.html?zone=FOOD-07 (or scan QR from demo-qr.html).
   Select "Medical Emergency", add details, and click "SUBMIT EMERGENCY REPORT".
   Incident ID (e.g. INC-20260819-0042) is generated and public live tracking loads.

2. [Organizer]
   Open https://sahaaya-grid.onrender.com/index.html and sign in with admin / admin123.
   Incident appears in real time under "Needs Attention" with HIGH priority.
   Click "SMART ASSIGN" -> System ranks Anjali (Medical match). Click "Dispatch Now".

3. [Volunteer]
   Open https://sahaaya-grid.onrender.com/volunteer.html and sign in with anjali / vol123.
   30-second countdown timer alert pops up with incident details.
   Click "ACCEPT ASSIGNMENT" -> Status updates to ACCEPTED across all screens.
   Click "START RESPONSE" -> Status updates to ON SCENE (IN PROGRESS).
   Click "MARK RESOLVED" -> Enter resolution note and submit.

4. [Verification]
   Civilian tracking screen and Organizer Command Center instantly update to RESOLVED.
   Organizer checks Analytics and Audit Logs to view full recorded history.
```

---

## Running the Automated Test Suite

```powershell
node test-suite.js
```
