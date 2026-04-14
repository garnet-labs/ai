---
'ai': patch
'@ai-sdk/workflow': patch
---

Add shared base callback event types (`AgentOnToolCallStartEvent`, `AgentOnToolCallFinishEvent`, `AgentOnStepStartEvent`) that define the minimal common surface between ToolLoopAgent and WorkflowAgent callbacks. This enables writing callbacks that work with either agent type.
