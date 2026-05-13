import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const model = google('gemini-2.5-flash');

const stream = streamText({
  model,
  prompt: 'Give me a sonnet about a cat called Steven.',
});


// toUIMessageStream() converts the stream of text into a stream of UI messages, which can be used to display the response in a user interface. Each chunk of text is wrapped in a UI message object that contains metadata about the message, such as its type and content.
for await (const chunk of stream.toUIMessageStream()) {
  console.log(chunk);
}
