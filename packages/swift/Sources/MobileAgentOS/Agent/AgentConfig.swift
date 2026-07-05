import Foundation

/// Configuration for agent runtime
public struct AgentConfig {
    public let name: String
    public let userId: String
    public let enableContext: Bool
    public let enableMemory: Bool
    public let enablePrivacy: Bool
    public let enableActions: Bool
    public let enableFeedback: Bool
    
    public init(
        name: String,
        userId: String,
        enableContext: Bool = true,
        enableMemory: Bool = true,
        enablePrivacy: Bool = true,
        enableActions: Bool = true,
        enableFeedback: Bool = true
    ) {
        self.name = name
        self.userId = userId
        self.enableContext = enableContext
        self.enableMemory = enableMemory
        self.enablePrivacy = enablePrivacy
        self.enableActions = enableActions
        self.enableFeedback = enableFeedback
    }
}