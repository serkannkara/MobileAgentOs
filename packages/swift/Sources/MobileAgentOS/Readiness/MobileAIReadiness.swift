import Foundation

/// Calculates mobile AI readiness score
public final class MobileAIReadiness {
    public init() {}
    
    public func calculate(
        hasContext: Bool,
        memoryCount: Int,
        privacyChecked: Bool,
        actionCount: Int
    ) -> Int {
        var scores: [ReadinessScore] = []
        
        // Context Awareness (15%)
        let contextScore = hasContext ? 80 : 20
        scores.append(ReadinessScore(dimension: .contextAwareness, score: contextScore))
        
        // Memory Quality (15%)
        let memoryScore = min(100, 40 + (memoryCount * 10))
        scores.append(ReadinessScore(dimension: .memoryQuality, score: memoryScore))
        
        // Privacy Safety (20%)
        let privacyScore = privacyChecked ? 85 : 30
        scores.append(ReadinessScore(dimension: .privacySafety, score: privacyScore))
        
        // Action Reliability (20%)
        let actionScore = min(100, 50 + (actionCount * 15))
        scores.append(ReadinessScore(dimension: .actionReliability, score: actionScore))
        
        // Offline Resilience (10%)
        let offlineScore = 60 // Baseline for v0.3
        scores.append(ReadinessScore(dimension: .offlineResilience, score: offlineScore))
        
        // UX Continuity (10%)
        let uxScore = 70 // Baseline for v0.3
        scores.append(ReadinessScore(dimension: .uxContinuity, score: uxScore))
        
        // App Store Readiness (10%)
        let appStoreScore = 65 // Baseline for v0.3
        scores.append(ReadinessScore(dimension: .appStoreReadiness, score: appStoreScore))
        
        let totalWeightedScore = scores.reduce(0.0) { $0 + $1.weightedScore }
        let overallScore = Int(totalWeightedScore)
        
        return max(0, min(100, overallScore))
    }
    
    public func generateReport(
        hasContext: Bool,
        memoryCount: Int,
        privacyChecked: Bool,
        actionCount: Int
    ) -> ReadinessReport {
        var scores: [ReadinessScore] = []
        
        scores.append(ReadinessScore(dimension: .contextAwareness, score: hasContext ? 80 : 20))
        scores.append(ReadinessScore(dimension: .memoryQuality, score: min(100, 40 + (memoryCount * 10))))
        scores.append(ReadinessScore(dimension: .privacySafety, score: privacyChecked ? 85 : 30))
        scores.append(ReadinessScore(dimension: .actionReliability, score: min(100, 50 + (actionCount * 15))))
        scores.append(ReadinessScore(dimension: .offlineResilience, score: 60))
        scores.append(ReadinessScore(dimension: .uxContinuity, score: 70))
        scores.append(ReadinessScore(dimension: .appStoreReadiness, score: 65))
        
        let totalWeightedScore = scores.reduce(0.0) { $0 + $1.weightedScore }
        let overallScore = Int(totalWeightedScore)
        
        return ReadinessReport(
            overallScore: max(0, min(100, overallScore)),
            dimensionScores: scores
        )
    }
}