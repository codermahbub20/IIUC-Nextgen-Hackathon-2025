// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/services/chat.service.ts - Using Groq API (FREE!)
// import fetch from 'node-fetch';

// interface GroqResponse {
//   choices: Array<{
//     message: {
//       content: string;
//       role: string;
//     };
//     finish_reason: string;
//   }>;
//   error?: {
//     message: string;
//     type: string;
//   };
// }

// export const getChatResponse = async (message: string): Promise<string> => {
//   try {
//     console.log('🔵 Sending request to Groq...');
//     console.log('🔑 API Key present:', !!process.env.GROQ_API_KEY);
//     console.log('📝 Message:', message);

//     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'llama-3.3-70b-versatile', // Fast and free!
//         messages: [{ role: 'user', content: message }],
//         max_tokens: 1024,
//         temperature: 0.7,
//       }),
//     });

//     console.log('📡 Response status:', response.status);

//     if (!response.ok) {
//       const errorData = (await response.json()) as GroqResponse;
//       console.error('❌ Groq API Error:', errorData);
//       throw new Error(
//         errorData.error?.message || `Groq API error: ${response.status}`
//       );
//     }

//     const data = (await response.json()) as GroqResponse;
//     console.log('✅ Groq Response received');

//     if (!data?.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
//       console.error('❌ Invalid response structure:', data);
//       throw new Error('Invalid API response structure');
//     }

//     if (!data.choices[0]?.message?.content) {
//       console.error('❌ Missing message content:', data);
//       throw new Error('No content in API response');
//     }

//     return data.choices[0].message.content;
//   } catch (error: any) {
//     console.error('❌ Chat Service Error:', error.message);
//     console.error('Full error:', error);
//     throw new Error(`Failed to fetch response from Groq API: ${error.message}`);
//   }
// };