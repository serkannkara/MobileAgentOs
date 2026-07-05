import Foundation

/// Types of personally identifiable information
public enum PIIType: String, Codable, CaseIterable {
    case email
    case phone
    case apiKey
    case token
    case creditCard
    case ssn
}