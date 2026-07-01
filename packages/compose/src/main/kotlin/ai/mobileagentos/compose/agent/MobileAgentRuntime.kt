package ai.mobileagentos.compose.agent

import ai.mobileagentos.compose.feedback.FeedbackLoop
import ai.mobileagentos.compose.feedback.FeedbackEventType
import ai.mobileagentos.compose.readiness.MobileAIReadiness
import ai.mobileagentos.compose.readiness.ReadinessInput

class MobileAgentRuntime(private val config: AgentConfig) {
    private val session: AgentSession = AgentSession.create(config.userId)
    private val feedback: FeedbackLoop = FeedbackLoop(session.id)
    private val readiness: MobileAIReadiness = MobileAIReadiness()
    
    suspend fun run(input: AgentInput): AgentOutput {
        // 1. Input received
        val event1 = AgentEvent.create(
            AgentEventType.INPUT_RECEIVED,
            session.id,
            input
        )
        session.events.add(event1)
        
        var processedInput = input.input
        var contextSnapshot: Any? = null
        var memories: List<Any>? = null
        var privacyResult: ai.mobileagentos.compose.privacy.PrivacyResult? = null
        
        // 2. Context snapshot
        if (config.context != null) {
            contextSnapshot = config.context.snapshot(config.userId)
            val event2 = AgentEvent.create(
                AgentEventType.CONTEXT_SNAPSHOT_CREATED,
                session.id,
                contextSnapshot
            )
            session.events.add(event2)
        }
        
        // 3. Memory retrieval
        if (config.memory != null) {
            val retrievedMemories = config.memory.retrieveMemories(
                config.userId,
                input.input,
                5
            )
            memories = retrievedMemories
            val event3 = AgentEvent.create(
                AgentEventType.MEMORY_RETRIEVED,
                session.id,
                mapOf("count" to retrievedMemories.size)
            )
            session.events.add(event3)
        }
        
        // 4. Privacy check
        if (config.privacy != null) {
            privacyResult = config.privacy.redact(input.input)
            processedInput = privacyResult.redactedText
            val event4 = AgentEvent.create(
                AgentEventType.PRIVACY_CHECKED,
                session.id,
                mapOf(
                    "safe" to privacyResult.safe,
                    "redactions" to privacyResult.redactions.size
                )
            )
            session.events.add(event4)
            
            if (!privacyResult.safe) {
                feedback.recordEvent(
                    FeedbackEventType.PRIVACY_REDACTED,
                    mapOf("redactions" to privacyResult.redactions.size)
                )
            }
        }
        
        // 5. Agent response (deterministic for v0.2)
        val response = "Processed: $processedInput"
        val event5 = AgentEvent.create(
            AgentEventType.AGENT_RESPONSE_GENERATED,
            session.id,
            mapOf("response" to response)
        )
        session.events.add(event5)
        
        // 6. Actions suggested (empty for v0.2)
        val actions = emptyList<ai.mobileagentos.compose.actions.AgentAction>()
        val event6 = AgentEvent.create(
            AgentEventType.ACTIONS_SUGGESTED,
            session.id,
            mapOf("actionCount" to actions.size)
        )
        session.events.add(event6)
        
        // 7. Readiness calculation
        val readinessScore = readiness.calculateReadiness(
            ReadinessInput(
                contextEnabled = config.context != null,
                memoryEnabled = config.memory != null,
                privacyEnabled = config.privacy != null,
                actionsEnabled = config.actions != null,
                offlineSupport = "partial",
                uxContinuity = "good",
                appStoreReadiness = "review_needed"
            )
        )
        val event7 = AgentEvent.create(
            AgentEventType.READINESS_CALCULATED,
            session.id,
            mapOf("score" to readinessScore.overall)
        )
        session.events.add(event7)
        
        // 8. Session completed
        val event8 = AgentEvent.create(
            AgentEventType.SESSION_COMPLETED,
            session.id,
            null
        )
        session.events.add(event8)
        
        feedback.recordEvent(FeedbackEventType.SESSION_COMPLETED)
        
        return AgentOutput(
            response = response,
            actions = actions,
            readinessScore = readinessScore.overall,
            session = session,
            events = session.events.toList(),
            privacyResult = privacyResult,
            retrievedMemories = memories as? List<ai.mobileagentos.compose.memory.MemoryItem>
        )
    }
    
    fun getSession(): AgentSession = session
    
    fun getFeedback(): FeedbackLoop = feedback
    
    fun getConfig(): AgentConfig = config
}