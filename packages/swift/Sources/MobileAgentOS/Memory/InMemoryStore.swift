import Foundation

/// Thread-safe in-memory storage for memories
public actor InMemoryStore: MemoryStore {
    private var memories: [MemoryItem] = []
    
    public init() {}
    
    public func add(_ item: MemoryItem) async {
        memories.append(item)
    }
    
    public func list() async -> [MemoryItem] {
        return memories
    }
    
    public func retrieve(query: String, limit: Int) async -> [MemoryItem] {
        let queryLowercased = query.lowercased()
        
        let scored = memories.map { memory -> (MemoryItem, Double) in
            var score = 0.0
            
            // Content match
            if memory.content.lowercased().contains(queryLowercased) {
                score += 0.5
            }
            
            // Tag match
            for tag in memory.tags {
                if queryLowercased.contains(tag.lowercased()) {
                    score += 0.3
                }
            }
            
            // Importance
            score += memory.importance * 0.2
            
            return (memory, score)
        }
        
        let sorted = scored
            .filter { $0.1 > 0 }
            .sorted { $0.1 > $1.1 }
            .prefix(limit)
            .map { $0.0 }
        
        return Array(sorted)
    }
    
    public func clear() async {
        memories.removeAll()
    }
}