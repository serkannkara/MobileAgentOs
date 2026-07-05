import Foundation

/// Result of action execution
public struct ActionResult: Codable {
    public let actionId: String
    public let success: Bool
    public let message: String
    public let timestamp: Date
    
    public init(
        actionId: String,
        success: Bool,
        message: String
    ) {
        self.actionId = actionId
        self.success = success
        self.message = message
        self.timestamp = Date()
    }
}