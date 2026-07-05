import Foundation

/// Snapshot of device and user context at a moment in time
public struct ContextSnapshot: Codable {
    public let platform: String
    public let locale: String
    public let timezone: String
    public let appVersion: String
    public let sessionId: String
    public let timestamp: Date
    public let signals: [ContextSignal]
    
    public init(
        platform: String,
        locale: String,
        timezone: String,
        appVersion: String,
        sessionId: String,
        signals: [ContextSignal] = []
    ) {
        self.platform = platform
        self.locale = locale
        self.timezone = timezone
        self.appVersion = appVersion
        self.sessionId = sessionId
        self.timestamp = Date()
        self.signals = signals
    }
}