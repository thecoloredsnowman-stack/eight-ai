require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// ─── GET /webhook — Meta verification handshake ───────────────────────────────
app.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('✅ Webhook verified by Meta!');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed — token mismatch');
    res.sendStatus(403);
  }
});

// ─── POST /webhook — incoming messages from WhatsApp ─────────────────────────
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    const entry    = body.entry?.[0];
    const changes  = entry?.changes?.[0];
    const value    = changes?.value;
    const messages = value?.messages;

    if (messages && messages.length > 0) {
      const msg    = messages[0];
      const from   = msg.from;       // sender's phone number
      const text   = msg.text?.body; // message text
      const msgId  = msg.id;

      console.log('─────────────────────────────────');
      console.log('📩 New WhatsApp message received!');
      console.log(`   From   : ${from}`);
      console.log(`   Message: ${text}`);
      console.log(`   Msg ID : ${msgId}`);
      console.log('─────────────────────────────────');
    }

    // Always return 200 — Meta will retry if you don't
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 eight.ai webhook server running on port ${PORT}`);
  console.log(`   Waiting for Meta to verify...`);
});
