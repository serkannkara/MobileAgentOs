import Foundation

/// Input to the agent runtime
public struct AgentInput: Codable {
    public let text: String
    public let timestamp: Date
    public let metadata: [String: String]
    
    public init(
        text: String,
        metadata: [String: String] = [:]
    ) {
        self.text = text
        self.timestamp = Date()
        self.metadata = metadata
    }
}