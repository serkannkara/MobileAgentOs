import XCTest
@testable import MobileAgentOS

@MainActor
final class MobileAgentRuntimeTests: XCTestCase {
    var runtime: MobileAgentRuntime!
    
    override func setUp() {
        super.setUp()
        let config = AgentConfig(name: "TestAgent", userId: "test-user")
        runtime = MobileAgentRuntime(config: config)
    }
    
    func testRuntimeEmitsAllEvents() async {
        let input = AgentInput(text: "Help me focus today")
        let output = await runtime.run(input)
        
        XCTAssertEqual(output.events.count, 8)
        
        let eventTypes = output.events.map { $0.type }
        XCTAssertTrue(eventTypes.contains(.inputReceived))
        XCTAssertTrue(eventTypes.contains(.contextSnapshotCreated))
        XCTAssertTrue(eventTypes.contains(.memoryRetrieved))
        XCTAssertTrue(eventTypes.contains(.privacyChecked))
        XCTAssertTrue(eventTypes.contains(.agentResponseGenerated))
        XCTAssertTrue(eventTypes.contains(.actionsSuggested))
        XCTAssertTrue(eventTypes.contains(.readinessCalculated))
        XCTAssertTrue(eventTypes.contains(.sessionCompleted))
    }
    
    func testRuntimeGeneratesResponse() async {
        let input = AgentInput(text: "Test input")
        let output = await runtime.run(input)
        
        XCTAssertFalse(output.response.isEmpty)
        XCTAssertTrue(output.response.contains("Processed"))
    }
    
    func testRuntimeCalculatesReadiness() async {
        let input = AgentInput(text: "Help me focus")
        let output = await runtime.run(input)
        
        XCTAssertGreaterThan(output.readinessScore, 0)
        XCTAssertLessThanOrEqual(output.readinessScore, 100)
    }
    
    func testRuntimeSuggestsActions() async {
        let input = AgentInput(text: "Help me focus for the next hour")
        let output = await runtime.run(input)
        
        XCTAssertGreaterThan(output.actions.count, 0)
    }
    
    func testSessionTracking() async {
        let input = AgentInput(text: "Test")
        _ = await runtime.run(input)
        
        let session = runtime.getSession()
        XCTAssertNotNil(session)
        XCTAssertEqual(session?.events.count, 8)
        XCTAssertNotNil(session?.completedAt)
    }
}