import Foundation

/// Dimensions of mobile AI readiness
public enum ReadinessDimension: String, Codable, CaseIterable {
    case contextAwareness
    case memoryQuality
    case privacySafety
    case actionReliability
    case offlineResilience
    case uxContinuity
    case appStoreReadiness
    
    public var weight: Double {
        switch self {
        case .contextAwareness: return 0.15
        case .memoryQuality: return 0.15
        case .privacySafety: return 0.20
        case .actionReliability: return 0.20
        case .offlineResilience: return 0.10
        case .uxContinuity: return 0.10
        case .appStoreReadiness: return 0.10
        }
    }
}