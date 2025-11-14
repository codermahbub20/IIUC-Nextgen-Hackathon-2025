// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/controllers/chat.controller.ts
// import { Request, Response } from 'express';
// import { getChatResponse } from './chat.service';


// export const chatController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { message } = req.body;

//     if (!message || typeof message !== 'string') {
//       res.status(400).json({ error: 'Message is required and must be a string' });
//       return;
//     }

//     const reply = await getChatResponse(message);
//     res.status(200).json({ reply });
//   } catch (error: any) {
//     console.error('Chat Controller Error:', error.message);
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// };