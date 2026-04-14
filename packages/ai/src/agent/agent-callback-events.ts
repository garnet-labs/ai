import type { ModelMessage, ToolSet } from '@ai-sdk/provider-utils';
import type { StepResult } from '../generate-text/step-result';

/**
 * Minimal event shape shared by all agent onToolCallStart callbacks.
 * Agent implementations may extend this with additional properties.
 */
export interface AgentOnToolCallStartEvent {
  /** The tool call being executed */
  readonly toolCall: {
    type: 'tool-call';
    toolCallId: string;
    toolName: string;
    input: unknown;
  };
  /** The current step number (0-based) */
  readonly stepNumber: number;
}

/**
 * Minimal event shape shared by all agent onToolCallFinish callbacks.
 * Uses a discriminated union: check `success` to determine whether
 * `output` or `error` is available.
 *
 * Agent implementations may extend this with additional properties.
 */
export type AgentOnToolCallFinishEvent =
  | {
      /** The tool call that was executed */
      readonly toolCall: {
        type: 'tool-call';
        toolCallId: string;
        toolName: string;
        input: unknown;
      };
      /** The current step number (0-based) */
      readonly stepNumber: number;
      /** Execution time in milliseconds */
      readonly durationMs: number;
      /** Whether the tool call succeeded */
      readonly success: true;
      /** The tool result */
      readonly output: unknown;
      readonly error?: never;
    }
  | {
      /** The tool call that was executed */
      readonly toolCall: {
        type: 'tool-call';
        toolCallId: string;
        toolName: string;
        input: unknown;
      };
      /** The current step number (0-based) */
      readonly stepNumber: number;
      /** Execution time in milliseconds */
      readonly durationMs: number;
      /** Whether the tool call succeeded */
      readonly success: false;
      /** The error that occurred */
      readonly error: unknown;
      readonly output?: never;
    };

/**
 * Minimal event shape shared by all agent onStepStart callbacks.
 * Agent implementations may extend this with additional properties.
 */
export interface AgentOnStepStartEvent<TTools extends ToolSet = ToolSet> {
  /** The current step number (0-based) */
  readonly stepNumber: number;
  /** The messages being sent for this step */
  readonly messages: ModelMessage[] | ReadonlyArray<ModelMessage>;
  /** Results from all previously finished steps */
  readonly steps: ReadonlyArray<StepResult<TTools, any>>;
}
