import express from 'express';
import cors from 'cors';
import { readFileSync, existsSync } from 'fs';

// Load .env manually (no dotenv dependency needed)
function loadEnv() {
  const envPath = new URL('.env', import.meta.url).pathname;
  if (!existsSync(envPath)) {
    console.error('Missing .env file. Copy .env.example to .env and add your ANTHROPIC_API_KEY.');
    process.exit(1);
  }
  const content = readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    process.env[key.trim()] = rest.join('=').trim();
  }
}

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/optimize', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in .env' });
  }

  try {
    const { model, max_tokens, system, messages } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-4-20250514',
        max_tokens: max_tokens || 2000,
        system,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API proxy running at http://localhost:${PORT}`);
  console.log('Run "npm run dev" in another terminal for the frontend.');
});
