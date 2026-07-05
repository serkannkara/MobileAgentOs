import Foundation

/// Individual dimension score
public struct ReadinessScore: Codable {
    public let dimension: ReadinessDimension
    public let score: Int
    public let weight: Double
    public let weightedScore: Double
    
    public init(dimension: ReadinessDimension, score: Int) {
        self.dimension = dimension
        self.score = max(0, min(100, score))
        self.weight = dimension.weight
        self.weightedScore = Double(self.score) * weight
    }
}