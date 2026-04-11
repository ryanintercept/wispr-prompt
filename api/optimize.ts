export const config = {
  runtime: 'edge',
};

async function callAnthropic(apiKey: string, body: { model: string; max_tokens: number; system: string; messages: { role: string; content: string }[] }) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Anthropic error ${response.status}: ${await response.text()}`);
  const data = await response.json() as { content: { text: string }[] };
  return data.content[0].text;
}

async function callOpenAI(apiKey: string, body: { system: string; messages: { role: string; content: string }[]; max_tokens: number }) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: body.max_tokens,
      messages: [
        { role: 'system', content: body.system },
        ...body.messages,
      ],
    }),
  });
  if (!response.ok) throw new Error(`OpenAI error ${response.status}: ${await response.text()}`);
  const data = await response.json() as { choices: { message: { content: string } }[] };
  return data.choices[0].message.content;
}

async function callGemini(apiKey: string, body: { system: string; messages: { role: string; content: string }[]; max_tokens: number }) {
  const model = 'gemini-2.0-flash-001';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: body.system }] },
      contents: body.messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: body.max_tokens },
    }),
  });
  if (!response.ok) throw new Error(`Gemini error ${response.status}: ${await response.text()}`);
  const data = await response.json() as { candidates: { content: { parts: { text: string }[] } }[] };
  return data.candidates[0].content.parts[0].text;
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!anthropicKey && !openaiKey && !geminiKey) {
    return new Response(JSON.stringify({ error: 'No API key configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json() as { model: string; max_tokens: number; system: string; messages: { role: string; content: string }[] };
    const { model, max_tokens, system, messages } = body;

    let text: string;

    if (anthropicKey) {
      text = await callAnthropic(anthropicKey, { model: model || 'claude-sonnet-4-20250514', max_tokens: max_tokens || 2000, system, messages });
    } else if (openaiKey) {
      text = await callOpenAI(openaiKey, { system, messages, max_tokens: max_tokens || 2000 });
    } else {
      text = await callGemini(geminiKey!, { system, messages, max_tokens: max_tokens || 2000 });
    }

    return new Response(JSON.stringify({ content: [{ text }] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
