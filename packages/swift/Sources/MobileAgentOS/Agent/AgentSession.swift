import Foundation

/// Represents an active agent session
public struct AgentSession: Codable {
    public let id: String
    public let userId: String
    public let startedAt: Date
    public var events: [AgentEvent]
    public var completedAt: Date?
    
    public init(userId: String) {
        self.id = UUID().uuidString
        self.userId = userId
        self.startedAt = Date()
        self.events = []
        self.completedAt = nil
    }
    
    public mutating func addEvent(_ event: AgentEvent) {
        events.append(event)
    }
    
    public mutating func complete() {
        completedAt = Date()
    }
}