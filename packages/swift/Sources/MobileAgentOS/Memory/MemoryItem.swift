import Foundation

/// A single memory item
public struct MemoryItem: Codable, Identifiable {
    public let id: String
    public let content: String
    public let tags: [String]
    public let importance: Double
    public let createdAt: Date
    public var retrievedCount: Int
    
    public init(
        content: String,
        tags: [String] = [],
        importance: Double = 0.5
    ) {
        self.id = UUID().uuidString
        self.content = content
        self.tags = tags
        self.importance = importance
        self.createdAt = Date()
        self.retrievedCount = 0
    }
}