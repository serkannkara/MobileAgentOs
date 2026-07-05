import Foundation

/// Manages memory storage and retrieval
public final class MemoryEngine {
    private let store: MemoryStore
    
    public init(store: MemoryStore) {
        self.store = store
    }
    
    public func add(_ item: MemoryItem) async {
        await store.add(item)
    }
    
    public func list() async -> [MemoryItem] {
        return await store.list()
    }
    
    public func retrieve(query: String, limit: Int = 5) async -> [MemoryItem] {
        return await store.retrieve(query: query, limit: limit)
    }
    
    public func clear() async {
        await store.clear()
    }
}