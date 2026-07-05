import Foundation

/// Output from the agent runtime
public struct AgentOutput: Codable {
    public let response: String
    public let actions: [AgentAction]
    public let readinessScore: Int
    public let events: [AgentEvent]
    public let sessionId: String
    
    public init(
        response: String,
        actions: [AgentAction],
        readinessScore: Int,
        events: [AgentEvent],
        sessionId: String
    ) {
        self.response = response
        self.actions = actions
        self.readinessScore = readinessScore
        self.events = events
        self.sessionId = sessionId
    }
}