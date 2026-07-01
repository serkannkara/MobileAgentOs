package ai.mobileagentos.compose

import ai.mobileagentos.compose.actions.ActionRouter
import ai.mobileagentos.compose.actions.AgentAction
import kotlinx.coroutines.test.runTest
import org.junit.Assert.*
import org.junit.Test

class ActionRouterTest {
    
    @Test
    fun `execute action with handler`() = runTest {
        val router = ActionRouter()
        router.registerHandler("test_action") { action ->
            "Action ${action.type} executed"
        }
        
        val action = AgentAction.create("test_action")
        val result = router.execute(action)
        
        assertTrue(result.success)
        assertNotNull(result.result)
        assertTrue(result.result.toString().contains("test_action"))
    }
    
    @Test
    fun `execute action without handler fails`() = runTest {
        val router = ActionRouter()
        
        val action = AgentAction.create("unknown_action")
        val result = router.execute(action)
        
        assertFalse(result.success)
        assertNotNull(result.error)
        assertTrue(result.error!!.contains("No handler"))
    }
    
    @Test
    fun `action history is tracked`() = runTest {
        val router = ActionRouter()
        router.registerHandler("action1") { "Result 1" }
        router.registerHandler("action2") { "Result 2" }
        
        router.execute(AgentAction.create("action1"))
        router.execute(AgentAction.create("action2"))
        
        val history = router.getHistory()
        assertEquals(2, history.size)
    }
    
    @Test
    fun `clear history works`() = runTest {
        val router = ActionRouter()
        router.registerHandler("test") { "Result" }
        
        router.execute(AgentAction.create("test"))
        assertEquals(1, router.getHistory().size)
        
        router.clearHistory()
        assertEquals(0, router.getHistory().size)
    }
}