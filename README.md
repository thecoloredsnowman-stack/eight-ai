# eight.ai

WhatsApp-first AI communication platform for SMEs.

Incoming WhatsApp messages are processed by an AI backend that drafts replies based on a clinic's knowledge base, contact history, and conversation context. Staff review each draft in a web dashboard and tap Approve, Edit, or Reject before anything is sent. Built for aesthetic clinics in Malaysia as Phase 1.

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
Draft appears in staff dashboard
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
| AI drafting | Claude API (Anthropic) |
| Webhook backend | Node.js / Express |
| Frontend | Web dashboard (approval interface) |
| Database | Supabase |
| Hosting | Cloudflare Workers |

---

## Operating Modes

- **Full Auto** — AI sends automatically. Human reviews escalations only.
- **Approval** — Every draft requires one-tap approval before sending. Default.
- **Pause** — AI paused. Manual WhatsApp remains fully active.

---

## Repo Structure

```
eight-ai/
├── docs/                        # Functional frontend prototype (GitHub Pages)
│   └── index.html
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

Handles:
- `GET /webhook` — Meta verification handshake
- `POST /webhook` — Inbound message processing

---

## Features (Phase 1 — Clinic)

- Approve / Edit / Reject window for every incoming message
- Knowledge base: services, pricing, FAQs, promotions, doctor schedule
- Contact management with enriched profiles (visit history, lapse risk)
- Appointment booking via chat with no-show risk scoring
- Follow-up queue for lapsed patient recovery
- Smart escalation: complaints, anger keywords, AI confidence threshold
- Analytics: message volume, AI resolution rate, response time, peak hours
- Multi-language: Bahasa Melayu, English, Mandarin, Manglish (auto-detect)
