import XCTest
@testable import MobileAgentOS

final class ReadinessScoreTests: XCTestCase {
    var calculator: MobileAIReadiness!
    
    override func setUp() {
        super.setUp()
        calculator = MobileAIReadiness()
    }
    
    func testCalculateWithFullFeatures() {
        let score = calculator.calculate(
            hasContext: true,
            memoryCount: 5,
            privacyChecked: true,
            actionCount: 3
        )
        
        XCTAssertGreaterThan(score, 70)
        XCTAssertLessThanOrEqual(score, 100)
    }
    
    func testCalculateWithMinimalFeatures() {
        let score = calculator.calculate(
            hasContext: false,
            memoryCount: 0,
            privacyChecked: false,
            actionCount: 0
        )
        
        XCTAssertGreaterThan(score, 0)
        XCTAssertLessThan(score, 50)
    }
    
    func testGenerateReport() {
        let report = calculator.generateReport(
            hasContext: true,
            memoryCount: 3,
            privacyChecked: true,
            actionCount: 2
        )
        
        XCTAssertEqual(report.dimensionScores.count, 7)
        XCTAssertGreaterThan(report.overallScore, 0)
        XCTAssertLessThanOrEqual(report.overallScore, 100)
        XCTAssertFalse(report.tier.isEmpty)
    }
    
    func testDimensionWeights() {
        let dimensions = ReadinessDimension.allCases
        let totalWeight = dimensions.reduce(0.0) { $0 + $1.weight }
        
        XCTAssertEqual(totalWeight, 1.0, accuracy: 0.01)
    }
}