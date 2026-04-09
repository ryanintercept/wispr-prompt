import { CLAUDE_FORMATTER_SYSTEM_PROMPT } from './claude-formatter';
import { GPT_FORMATTER_SYSTEM_PROMPT } from './gpt-formatter';
import { GEMINI_FORMATTER_SYSTEM_PROMPT } from './gemini-formatter';
import { LLAMA_FORMATTER_SYSTEM_PROMPT } from './llama-formatter';
import { REASONING_FORMATTER_SYSTEM_PROMPT } from './reasoning-formatter';
import type { TargetModel } from '../types';

const FORMATTER_PROMPTS: Record<TargetModel, string> = {
  claude: CLAUDE_FORMATTER_SYSTEM_PROMPT,
  gpt: GPT_FORMATTER_SYSTEM_PROMPT,
  gemini: GEMINI_FORMATTER_SYSTEM_PROMPT,
  llama: LLAMA_FORMATTER_SYSTEM_PROMPT,
  reasoning: REASONING_FORMATTER_SYSTEM_PROMPT,
};

export function getQuickOptimizerPrompt(targetModel: TargetModel): string {
  const formatterRules = FORMATTER_PROMPTS[targetModel];

  return `You are an expert prompt engineering system. You perform two tasks in sequence:

1. ANALYZE the raw developer input (which may be messy, voice-dictated, or unstructured) and identify:
   - The task type (build, debug, refactor, explain, architect, review, test, or document)
   - The context, objective, tech stack, constraints, expected output, edge cases, and priority
   - Any ambiguities

2. FORMAT the analyzed components into an optimized prompt for the target model.

${formatterRules}

IMPORTANT: You must also return the extracted components as JSON.

Return your response in this exact format:

---COMPONENTS---
{"task_type": "...", "context": "...", "objective": "...", "tech_stack": [...], "constraints": [...], "expected_output": "...", "edge_cases": "...", "priority": "...", "ambiguities": [...]}
---PROMPT---
[The optimized prompt text here]`;
}
