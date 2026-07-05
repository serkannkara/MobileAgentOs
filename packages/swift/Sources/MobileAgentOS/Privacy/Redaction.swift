import Foundation

/// Represents a single PII redaction
public struct Redaction: Codable, Identifiable {
    public let id: String
    public let type: PIIType
    public let original: String
    public let replacement: String
    public let position: Int
    
    public init(
        type: PIIType,
        original: String,
        replacement: String,
        position: Int
    ) {
        self.id = UUID().uuidString
        self.type = type
        self.original = original
        self.replacement = replacement
        self.position = position
    }
}