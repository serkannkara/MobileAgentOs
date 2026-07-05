import Foundation

/// Types of context signals
public enum ContextSignalType: String, Codable {
    case platform
    case locale
    case timezone
    case appVersion
    case sessionId
    case timestamp
}