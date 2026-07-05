import Foundation

/// Result of privacy check
public struct PrivacyResult: Codable {
    public let originalText: String
    public let redactedText: String
    public let redactions: [Redaction]
    public let isSafe: Bool
    
    public init(
        originalText: String,
        redactedText: String,
        redactions: [Redaction]
    ) {
        self.originalText = originalText
        self.redactedText = redactedText
        self.redactions = redactions
        self.isSafe = redactions.isEmpty
    }
}