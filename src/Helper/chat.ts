import { openai } from './helper';

export default async function chat(prompt: string) {
  try {
    // Update the endpoint to use the chat completion API
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4 if you're using that
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 512,
      temperature: 0,
    });

    return new Response(JSON.stringify({ choices: res.choices }), {
      status: 200, // 200 OK
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong!' }), {
      status: 400, // 400 Bad Request
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
