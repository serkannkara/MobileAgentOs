package ai.mobileagentos.compose

import ai.mobileagentos.compose.memory.InMemoryStore
import ai.mobileagentos.compose.memory.MemoryItem
import kotlinx.coroutines.test.runTest
import org.junit.Assert.*
import org.junit.Test

class InMemoryStoreTest {
    
    @Test
    fun `add and list memories`() = runTest {
        val store = InMemoryStore()
        val userId = "test-user"
        
        val memory1 = MemoryItem.create(userId, "First memory", listOf("tag1"))
        val memory2 = MemoryItem.create(userId, "Second memory", listOf("tag2"))
        
        store.add(memory1)
        store.add(memory2)
        
        val memories = store.list(userId)
        assertEquals(2, memories.size)
    }
    
    @Test
    fun `retrieve memories by query`() = runTest {
        val store = InMemoryStore()
        val userId = "test-user"
        
        store.add(MemoryItem.create(userId, "I love pizza", listOf("food")))
        store.add(MemoryItem.create(userId, "I prefer short tasks", listOf("work")))
        
        val results = store.retrieve(userId, "pizza", 5)
        assertEquals(1, results.size)
        assertTrue(results[0].content.contains("pizza"))
    }
    
    @Test
    fun `clear user memories`() = runTest {
        val store = InMemoryStore()
        val userId = "test-user"
        
        store.add(MemoryItem.create(userId, "Memory 1"))
        store.add(MemoryItem.create(userId, "Memory 2"))
        
        store.clear(userId)
        
        val memories = store.list(userId)
        assertEquals(0, memories.size)
    }
    
    @Test
    fun `retrieve respects limit`() = runTest {
        val store = InMemoryStore()
        val userId = "test-user"
        
        repeat(10) {
            store.add(MemoryItem.create(userId, "Memory $it", listOf("test")))
        }
        
        val results = store.retrieve(userId, "Memory", 5)
        assertEquals(5, results.size)
    }
}