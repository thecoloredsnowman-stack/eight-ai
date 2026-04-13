# eight.ai

**WhatsApp-first AI communication platform for SMEs.**

AI sits inside your WhatsApp and drafts every reply. You tap Approve, Edit, or Reject. That's the core loop. Everything else — appointments, contacts, follow-ups, analytics — wraps around that one interaction.

Phase 1 targets aesthetic clinics in Malaysia.

---

## Live

- **Website:** [witheightai.com](https://witheightai.com)
- **Demo app:** [`demo/`](./demo/) — functional frontend prototype (open in browser)

---

## How It Works

```
Customer sends WhatsApp message
        ↓
Meta Cloud API webhook → eight.ai backend
        ↓
AI reads message + knowledge base + contact history
        ↓
AI generates draft reply
        ↓
Draft appears in approve window
        ↓
Staff taps Approve → sends via Cloud API
     or Edit → modify → send
     or Reject → discard
```

---

## Stack

| Layer | Technology |
|-------|------------|
| WhatsApp Channel | Meta WhatsApp Cloud API (direct, no BSP) |
| Client onboarding | Meta Embedded Signup |
| AI drafting | Claude API (Anthropic) |
| Webhook backend | Node.js / Express |
| Frontend | Web dashboard (approve window) |
| Hosting | Cloudflare Workers |

---

## Operating Modes

- **Full Auto** — AI reads and sends automatically. Human reviews escalations only.
- **Approval** — Every draft requires one-tap approval before sending. Default for new users.
- **Pause** — Nothing goes out from eight.ai. Manual WhatsApp remains fully active.

---

## Repo Structure

```
eight-ai/
├── demo/                        # Functional frontend prototype
│   └── index.html
├── website/                     # witheightai.com landing page
│   ├── index.html
│   ├── privacy.html
│   └── terms.html
└── webhook-test/                # Webhook receiver (Meta Cloud API)
    ├── server.js
    ├── package.json
    └── .env.example
```

---

## Webhook Setup

```bash
cd webhook-test
cp .env.example .env
# Fill in your Meta credentials
npm install
node server.js
```

The server handles:
- `GET /webhook` — Meta verification handshake
- `POST /webhook` — Inbound message processing

---

## Meta Integration Status

- Meta Developer App registered (App ID live)
- WhatsApp Business Account (WABA) provisioned
- Webhook server built and verified
- Domain live: `witheightai.com`
- Business registration (SSM) filed
- Meta Embedded Signup — in progress

---

## Features (Phase 1 — Clinic)

- Approve / Edit / Reject window for every incoming message
- Knowledge base: services, pricing, FAQs, promotions, doctor schedule
- Contact management with enriched profiles (visit history, lapse risk)
- Appointment booking via chat with no-show risk scoring
- Follow-up queue for lapsed patient recovery
- Smart escalation: detects complaints, anger keywords, AI confidence threshold
- Analytics: message volume, AI resolution rate, response time, peak hours
- Multi-language: Bahasa Melayu, English, Mandarin, Manglish (auto-detect)

---

*Built by Muhsin Shah — Cyberjaya, Malaysia*
