export type TaskType = 'build' | 'debug' | 'refactor' | 'explain' | 'architect' | 'review' | 'test' | 'document';

export type TargetModel = 'claude' | 'gpt' | 'gemini' | 'llama' | 'reasoning';

export const MODEL_LABELS: Record<TargetModel, string> = {
  claude: 'Claude',
  gpt: 'GPT',
  gemini: 'Gemini',
  llama: 'Llama',
  reasoning: 'o1 / o3',
};

export const MODEL_DESCRIPTIONS: Record<TargetModel, string> = {
  claude: 'Anthropic — XML-tagged, structured',
  gpt: 'OpenAI — System/user, markdown',
  gemini: 'Google — Conversational, structured',
  llama: 'Meta — Instruction-tuned, direct',
  reasoning: 'OpenAI reasoning — Goal-focused',
};

export type AppMode = 'quick' | 'advanced';

export interface ExtractedComponents {
  task_type: TaskType;
  context: string | null;
  objective: string;
  tech_stack: string[];
  constraints: string[];
  expected_output: string | null;
  edge_cases: string | null;
  priority: string | null;
  ambiguities: string[];
}

export interface OptimizationResult {
  optimizedPrompt: string;
  components: ExtractedComponents;
  targetModel: TargetModel;
  taskType: TaskType;
}

export interface AppState {
  rawInput: string;
  isRecording: boolean;
  targetModel: TargetModel;
  taskType: TaskType | 'auto';
  mode: AppMode;
  components: ExtractedComponents | null;
  optimizedPrompt: string;
  isOptimizing: boolean;
  isExtracting: boolean;
  error: string | null;
}

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  build: 'Build',
  debug: 'Debug',
  refactor: 'Refactor',
  explain: 'Explain',
  architect: 'Architect',
  review: 'Review',
  test: 'Test',
  document: 'Document',
};
