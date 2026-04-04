# Wispr Prompt

**Voice-to-optimized-prompt tool for developers.**

Speak your messy, stream-of-consciousness prompt — Wispr Prompt restructures it into a clean, model-specific prompt for Claude or GPT. Built as a portfolio project and internship pitch for [Wispr Flow](https://wisprflow.ai).

🔗 **[Live Demo](https://wispr-prompt.vercel.app)**

---

## What it does

Raw developer prompts are messy. Wispr Prompt takes your unstructured voice or typed input and:

1. **Extracts** the key components — context, objective, tech stack, constraints, expected output
2. **Formats** them into the optimal structure for your target model:
   - **Claude** → XML tags (`<context>`, `<task>`, `<constraints>`, `<output_format>`)
   - **GPT** → System/User Markdown with headers
3. **Copies** clean to clipboard, ready to paste

## Modes

- **Quick Mode** — single-step: raw input → optimized prompt in one shot
- **Advanced Mode** — two-step: extract components → review/edit → reformat. Full control over every field before the final prompt is generated.

## Features

- 🎤 Voice input via Web Speech API
- ⚡ Demo mode with 4 pre-built examples (no API key required)
- 🔄 Auto-reformat when switching between Claude ↔ GPT
- 🧠 Auto task-type detection (build, debug, refactor, architect, etc.)
- 📋 One-click copy to clipboard
- ⌨️ Cmd+Enter keyboard shortcut

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v4** with custom Wispr-inspired theme
- **Claude API** (Anthropic) via Vercel Edge Functions
- **Web Speech API** for voice input
- **Lucide React** for icons

## Local Development

```bash
# Clone
git clone https://github.com/ryanintercept/wispr-prompt.git
cd wispr-prompt

# Install
npm install

# Set up env (optional — demo mode works without it)
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run
npm run dev
```

The app defaults to **demo mode** — no API key needed to try it out.

## Project Structure

```
src/
  components/
    Input/          # Voice input, text area, model selector, example cards
    Output/         # Optimized prompt display with copy/regen
    Advanced/       # Component editor for Advanced mode
    Layout/         # App shell, header, footer
    shared/         # Mode toggle, toast, etc.
  hooks/
    useOptimizer.ts # Central optimization logic (routes mock vs real)
    useVoiceInput.ts
  services/
    optimizer.ts     # Real Claude API calls
    mockOptimizer.ts # Demo mode with pre-built examples
    claude.ts        # API client
  data/
    examples.ts      # 4 pre-authored example prompts with full outputs
  prompts/
    quick-optimizer.ts # System prompt for Quick mode
  types/
    index.ts         # Shared TypeScript interfaces
api/
  optimize.ts        # Vercel Edge Function — proxies to Anthropic API
```

## Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryanintercept/wispr-prompt)

Add `ANTHROPIC_API_KEY` as an environment variable for real API calls. Without it, demo mode still works.

---

Built by [Ryan Guerville](https://github.com/ryanintercept) for Wispr Flow.
