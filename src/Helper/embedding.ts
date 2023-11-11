import { openai } from './helper';

export async function embeddings(text: string) {
  try {
    const result = await openai.embeddings.create({
      input: text,
      model: 'text-embedding-ada-002',
    });
    const { embedding } = result.data[0];
    const token = result.usage.total_tokens;

    return new Response(JSON.stringify({ embedding: normalizeVector(embedding), token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, // Set the desired status code
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function normalizeVector(vector: number[]) {
  // Calculate the Euclidean norm (magnitude) of the vector
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));

  // Normalize each component of the vector by dividing it by the norm
  const normalizedVector = vector.map(val => val / norm);

  return normalizedVector;
}