import XCTest
@testable import MobileAgentOS

final class InMemoryStoreTests: XCTestCase {
    var store: InMemoryStore!
    
    override func setUp() async throws {
        try await super.setUp()
        store = InMemoryStore()
    }
    
    func testAddAndList() async {
        let memory = MemoryItem(content: "Test memory", tags: ["test"], importance: 0.8)
        await store.add(memory)
        
        let memories = await store.list()
        XCTAssertEqual(memories.count, 1)
        XCTAssertEqual(memories.first?.content, "Test memory")
    }
    
    func testRetrieveByQuery() async {
        let memory1 = MemoryItem(content: "Focus on productivity", tags: ["focus"], importance: 0.8)
        let memory2 = MemoryItem(content: "Take a break", tags: ["rest"], importance: 0.5)
        let memory3 = MemoryItem(content: "Focus deeply", tags: ["focus"], importance: 0.9)
        
        await store.add(memory1)
        await store.add(memory2)
        await store.add(memory3)
        
        let results = await store.retrieve(query: "focus", limit: 5)
        XCTAssertGreaterThanOrEqual(results.count, 2)
        XCTAssertTrue(results.contains { $0.content.contains("Focus") })
    }
    
    func testClear() async {
        let memory = MemoryItem(content: "Test memory", tags: [], importance: 0.5)
        await store.add(memory)
        
        var memories = await store.list()
        XCTAssertEqual(memories.count, 1)
        
        await store.clear()
        
        memories = await store.list()
        XCTAssertEqual(memories.count, 0)
    }
}