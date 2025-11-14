// // src/routes/chat.route.ts
// import express from 'express';
// import fetch from 'node-fetch';



// const router = express.Router();

// const CAREER_SYSTEM_PROMPT = `You are CareerBot, a friendly and knowledgeable career mentor assistant focused on helping students... (keep your full text here)`;

// // --- POST /api/career-chat --- //
// router.post('/career-chat', async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || typeof message !== 'string' || !message.trim()) {
//       return res.status(400).json({
//         error: 'Message is required and must be a non-empty string',
//       });
//     }

//     const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
//     if (!LOVABLE_API_KEY) {
//       return res.status(500).json({ error: 'AI configuration missing' });
//     }

//     const response = await fetch(
//       'https://ai.gateway.lovable.dev/v1/chat/completions',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${LOVABLE_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'google/gemini-2.5-flash',
//           messages: [
//             { role: 'system', content: CAREER_SYSTEM_PROMPT },
//             { role: 'user', content: message.trim() },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     const reply = data?.choices?.[0]?.message?.content;
//     if (!reply) {
//       return res.status(500).json({ error: 'No response generated' });
//     }

//     return res.json({ reply });
//   } catch (err) {
//     console.error('Career chat error:', err);
//     return res.status(500).json({
//       error: err instanceof Error ? err.message : 'Unknown error',
//     });
//   }
// });

// export const chatRoutes = router;
