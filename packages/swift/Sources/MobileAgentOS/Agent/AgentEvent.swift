import Foundation

/// Event emitted during agent runtime pipeline
public struct AgentEvent: Codable, Identifiable {
    public let id: String
    public let type: AgentEventType
    public let timestamp: Date
    public let metadata: [String: String]
    
    public init(
        type: AgentEventType,
        metadata: [String: String] = [:]
    ) {
        self.id = UUID().uuidString
        self.type = type
        self.timestamp = Date()
        self.metadata = metadata
    }
}