import Foundation

/// Types of events emitted during agent runtime pipeline
public enum AgentEventType: String, Codable, CaseIterable {
    case inputReceived = "INPUT_RECEIVED"
    case contextSnapshotCreated = "CONTEXT_SNAPSHOT_CREATED"
    case memoryRetrieved = "MEMORY_RETRIEVED"
    case privacyChecked = "PRIVACY_CHECKED"
    case agentResponseGenerated = "AGENT_RESPONSE_GENERATED"
    case actionsSuggested = "ACTIONS_SUGGESTED"
    case readinessCalculated = "READINESS_CALCULATED"
    case sessionCompleted = "SESSION_COMPLETED"
}