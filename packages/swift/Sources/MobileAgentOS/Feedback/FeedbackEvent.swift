import Foundation

/// Event tracked by feedback loop
public struct FeedbackEvent: Codable, Identifiable {
    public let id: String
    public let type: String
    public let timestamp: Date
    public let metadata: [String: String]
    
    public init(
        type: String,
        metadata: [String: String] = [:]
    ) {
        self.id = UUID().uuidString
        self.type = type
        self.timestamp = Date()
        self.metadata = metadata
    }
}