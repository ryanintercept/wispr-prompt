import { callClaude } from './claude';
import { getQuickOptimizerPrompt } from '../prompts/quick-optimizer';
import { EXTRACTOR_SYSTEM_PROMPT } from '../prompts/extractor';
import { CLAUDE_FORMATTER_SYSTEM_PROMPT } from '../prompts/claude-formatter';
import { GPT_FORMATTER_SYSTEM_PROMPT } from '../prompts/gpt-formatter';
import { GEMINI_FORMATTER_SYSTEM_PROMPT } from '../prompts/gemini-formatter';
import { LLAMA_FORMATTER_SYSTEM_PROMPT } from '../prompts/llama-formatter';
import { REASONING_FORMATTER_SYSTEM_PROMPT } from '../prompts/reasoning-formatter';
import type { ExtractedComponents, OptimizationResult, TargetModel, TaskType } from '../types';

const FORMATTER_PROMPTS: Record<TargetModel, string> = {
  claude: CLAUDE_FORMATTER_SYSTEM_PROMPT,
  gpt: GPT_FORMATTER_SYSTEM_PROMPT,
  gemini: GEMINI_FORMATTER_SYSTEM_PROMPT,
  llama: LLAMA_FORMATTER_SYSTEM_PROMPT,
  reasoning: REASONING_FORMATTER_SYSTEM_PROMPT,
};

function parseQuickResponse(responseText: string): { components: ExtractedComponents; prompt: string } {
  const componentsSplit = responseText.split('---COMPONENTS---');
  const afterComponents = componentsSplit[1] || responseText;
  const promptSplit = afterComponents.split('---PROMPT---');

  const componentsJson = promptSplit[0].trim();
  const prompt = promptSplit[1]?.trim() || '';

  const components = JSON.parse(componentsJson) as ExtractedComponents;
  return { components, prompt };
}

export async function optimizeQuick(
  rawInput: string,
  targetModel: TargetModel,
  taskTypeOverride?: TaskType,
): Promise<OptimizationResult> {
  const systemPrompt = getQuickOptimizerPrompt(targetModel);
  const userMessage = taskTypeOverride
    ? `Raw developer input:\n\n${rawInput}\n\nTask type override: ${taskTypeOverride}`
    : `Raw developer input:\n\n${rawInput}`;

  const response = await callClaude({ system: systemPrompt, userMessage });
  const { components, prompt } = parseQuickResponse(response.content);

  return {
    optimizedPrompt: prompt,
    components,
    targetModel,
    taskType: taskTypeOverride || components.task_type,
  };
}

export async function extractComponents(rawInput: string): Promise<ExtractedComponents> {
  const response = await callClaude({
    system: EXTRACTOR_SYSTEM_PROMPT,
    userMessage: rawInput,
  });
  return JSON.parse(response.content) as ExtractedComponents;
}

export async function formatComponents(
  components: ExtractedComponents,
  targetModel: TargetModel,
): Promise<string> {
  const systemPrompt = FORMATTER_PROMPTS[targetModel];

  const response = await callClaude({
    system: systemPrompt,
    userMessage: JSON.stringify(components, null, 2),
  });

  return response.content;
}
