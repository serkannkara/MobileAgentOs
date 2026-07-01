package ai.mobileagentos.compose.agent

import ai.mobileagentos.compose.utils.IdGenerator

data class AgentEvent(
    val id: String,
    val type: AgentEventType,
    val sessionId: String,
    val timestamp: String,
    val data: Any? = null
) {
    companion object {
        fun create(
            type: AgentEventType,
            sessionId: String,
            data: Any? = null
        ): AgentEvent {
            return AgentEvent(
                id = IdGenerator.generate("event"),
                type = type,
                sessionId = sessionId,
                timestamp = System.currentTimeMillis().toString(),
                data = data
            )
        }
    }
}