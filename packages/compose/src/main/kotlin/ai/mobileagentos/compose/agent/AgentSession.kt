package ai.mobileagentos.compose.agent

import ai.mobileagentos.compose.utils.IdGenerator

data class AgentSession(
    val id: String,
    val userId: String,
    val createdAt: String,
    val events: MutableList<AgentEvent> = mutableListOf()
) {
    companion object {
        fun create(userId: String): AgentSession {
            return AgentSession(
                id = IdGenerator.generate("session"),
                userId = userId,
                createdAt = System.currentTimeMillis().toString()
            )
        }
    }
}