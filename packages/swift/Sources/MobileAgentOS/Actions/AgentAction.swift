import Foundation

/// An action that can be executed by the agent
public struct AgentAction: Codable, Identifiable {
    public let id: String
    public let type: String
    public let description: String
    public let payload: [String: String]
    public let requiresConfirmation: Bool
    
    public init(
        type: String,
        description: String,
        payload: [String: String] = [:],
        requiresConfirmation: Bool = false
    ) {
        self.id = UUID().uuidString
        self.type = type
        self.description = description
        self.payload = payload
        self.requiresConfirmation = requiresConfirmation
    }
}