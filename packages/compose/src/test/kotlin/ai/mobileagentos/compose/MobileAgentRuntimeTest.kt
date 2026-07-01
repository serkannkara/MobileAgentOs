package ai.mobileagentos.compose

import ai.mobileagentos.compose.agent.*
import ai.mobileagentos.compose.context.ContextEngine
import ai.mobileagentos.compose.memory.InMemoryStore
import ai.mobileagentos.compose.memory.MemoryEngine
import ai.mobileagentos.compose.privacy.PrivacyGuard
import kotlinx.coroutines.test.runTest
import org.junit.Assert.*
import org.junit.Test

class MobileAgentRuntimeTest {
    
    @Test
    fun `runtime processes input and generates events`() = runTest {
        val config = AgentConfig(
            name = "TestAgent",
            userId = "test-user",
            context = ContextEngine(),
            memory = MemoryEngine(InMemoryStore()),
            privacy = PrivacyGuard()
        )
        
        val runtime = MobileAgentRuntime(config)
        val output = runtime.run(AgentInput("Test input"))
        
        assertNotNull(output.response)
        assertTrue(output.response.contains("Test input"))
        assertTrue(output.events.isNotEmpty())
        assertTrue(output.readinessScore > 0)
    }
    
    @Test
    fun `runtime emits correct pipeline events`() = runTest {
        val config = AgentConfig(
            name = "TestAgent",
            userId = "test-user",
            context = ContextEngine(),
            memory = MemoryEngine(InMemoryStore()),
            privacy = PrivacyGuard()
        )
        
        val runtime = MobileAgentRuntime(config)
        val output = runtime.run(AgentInput("Test"))
        
        val eventTypes = output.events.map { it.type }
        
        assertTrue(eventTypes.contains(AgentEventType.INPUT_RECEIVED))
        assertTrue(eventTypes.contains(AgentEventType.CONTEXT_SNAPSHOT_CREATED))
        assertTrue(eventTypes.contains(AgentEventType.MEMORY_RETRIEVED))
        assertTrue(eventTypes.contains(AgentEventType.PRIVACY_CHECKED))
        assertTrue(eventTypes.contains(AgentEventType.AGENT_RESPONSE_GENERATED))
        assertTrue(eventTypes.contains(AgentEventType.SESSION_COMPLETED))
    }
    
    @Test
    fun `privacy redaction works in runtime`() = runTest {
        val config = AgentConfig(
            name = "TestAgent",
            userId = "test-user",
            privacy = PrivacyGuard()
        )
        
        val runtime = MobileAgentRuntime(config)
        val output = runtime.run(AgentInput("My email is test@example.com"))
        
        assertNotNull(output.privacyResult)
        assertFalse(output.privacyResult!!.safe)
        assertTrue(output.privacyResult!!.redactions.isNotEmpty())
        assertFalse(output.response.contains("test@example.com"))
    }
}