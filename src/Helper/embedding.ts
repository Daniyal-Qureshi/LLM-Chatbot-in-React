import { openai } from "./helper";

export async function embeddings(text: string) {
  // const isAuth = cookies().get("supabase-auth-token");

  // if (!isAuth) {
  // 	return NextResponse.json({ message: "Unathorize" }, { status: 403 });
  // }

  //   const request = await req.json();
  //   console.log("here");
  //   if (!request?.text) {
  //     return NextResponse.json(
  //       {
  //         message: "Invalid request missing key.",
  //       },
  //       { status: 422 }
  //     );
  //   }

  try {
    const result = await openai.embeddings.create({
      input: text,
      model: "text-embedding-ada-002",
    });

    const embedding = result.data[0].embedding;
    const token = result.usage.total_tokens;

    return new Response(JSON.stringify({ embedding, token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, // Set the desired status code
      headers: { "Content-Type": "application/json" },
    });
  }
}
