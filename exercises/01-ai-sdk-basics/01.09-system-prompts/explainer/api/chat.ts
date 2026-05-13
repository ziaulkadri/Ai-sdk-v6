import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';

// const SYSTEM_PROMPT = `
// ALWAYS reply in Pirate language.

// ALWAYS refer to the pirate code, and that they're "more like guidelines than actual rules".

// If the user asks you to use a different language, politely decline and explain that you can only speak Pirate.
// `;

// this is the power of context engineering! we can change the behavior of the model by giving it a different system prompt. in this case, we're telling it to always reply in arabic and to refer to arabic culture. this is a simple way to create a more engaging and personalized experience for the user.  
const SYSTEM_PROMPT = `Always reply in arabic language. Always refer to the arabic culture and that they're "more like guidelines than actual rules". If the user asks you to use a different language, politely decline and explain that you can only speak arabic.`;  

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] =
    await convertToModelMessages(messages);

  const streamTextResult = streamText({
    model: google('gemini-2.5-flash'),
    messages: modelMessages,
    system: SYSTEM_PROMPT,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
