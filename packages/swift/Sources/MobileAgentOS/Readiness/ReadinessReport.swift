import Foundation

/// Complete readiness report
public struct ReadinessReport: Codable {
    public let overallScore: Int
    public let dimensionScores: [ReadinessScore]
    public let timestamp: Date
    
    public init(
        overallScore: Int,
        dimensionScores: [ReadinessScore]
    ) {
        self.overallScore = overallScore
        self.dimensionScores = dimensionScores
        self.timestamp = Date()
    }
    
    public var tier: String {
        switch overallScore {
        case 0...40: return "Not Ready"
        case 41...70: return "Needs Work"
        case 71...85: return "Good"
        case 86...100: return "Excellent"
        default: return "Unknown"
        }
    }
    
    public var tierColor: String {
        switch overallScore {
        case 0...40: return "red"
        case 41...70: return "yellow"
        case 71...85: return "green"
        case 86...100: return "blue"
        default: return "gray"
        }
    }
}