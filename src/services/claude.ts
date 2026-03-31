interface ClaudeRequest {
  system: string;
  userMessage: string;
  maxTokens?: number;
}

interface ClaudeResponse {
  content: string;
}

export async function callClaude({ system, userMessage, maxTokens = 2000 }: ClaudeRequest): Promise<ClaudeResponse> {
  const response = await fetch('/api/optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} — ${errorText}`);
  }

  const data = await response.json();
  return { content: data.content[0].text };
}
