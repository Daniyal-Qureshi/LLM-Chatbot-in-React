import { openai } from "./helper";

export default async function chat(prompt: string) {
  try {
    const res = await openai.completions.create({
      prompt,
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
    });

    return new Response(JSON.stringify({ choices: res.choices }), {
      status: 200, // 200 OK
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 400, // 400 Bad Request
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
