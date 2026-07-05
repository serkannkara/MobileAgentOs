import Foundation

/// A single context signal
public struct ContextSignal: Codable {
    public let type: ContextSignalType
    public let value: String
    public let timestamp: Date
    
    public init(type: ContextSignalType, value: String) {
        self.type = type
        self.value = value
        self.timestamp = Date()
    }
}