import XCTest
@testable import MobileAgentOS

final class ActionRouterTests: XCTestCase {
    var router: ActionRouter!
    
    override func setUp() {
        super.setUp()
        router = ActionRouter()
    }
    
    func testSuggestActionsForFocus() async {
        let actions = await router.suggestActions(input: "Help me focus", context: nil)
        
        XCTAssertGreaterThan(actions.count, 0)
        XCTAssertTrue(actions.contains { $0.type == "createFocusPlan" })
    }
    
    func testSuggestActionsForNote() async {
        let actions = await router.suggestActions(input: "Remember this note", context: nil)
        
        XCTAssertGreaterThan(actions.count, 0)
        XCTAssertTrue(actions.contains { $0.type == "saveNote" })
    }
    
    func testExecuteAction() async {
        let action = AgentAction(
            type: "createFocusPlan",
            description: "Test action",
            payload: ["duration": "45"]
        )
        
        let result = await router.execute(action)
        
        XCTAssertTrue(result.success)
        XCTAssertTrue(result.message.contains("Focus plan created"))
    }
    
    func testExecuteDisallowedAction() async {
        let policy = ActionPolicy(allowedActionTypes: [], requireConfirmationForAll: false)
        let router = ActionRouter(policy: policy)
        
        let action = AgentAction(
            type: "createFocusPlan",
            description: "Test action",
            payload: [:]
        )
        
        let result = await router.execute(action)
        
        XCTAssertFalse(result.success)
        XCTAssertTrue(result.message.contains("not allowed"))
    }
}