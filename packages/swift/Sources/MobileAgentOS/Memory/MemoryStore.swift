import Foundation

/// Protocol for memory storage
public protocol MemoryStore {
    func add(_ item: MemoryItem) async
    func list() async -> [MemoryItem]
    func retrieve(query: String, limit: Int) async -> [MemoryItem]
    func clear() async
}