package ai.mobileagentos.compose.agent

import ai.mobileagentos.compose.actions.AgentAction
import ai.mobileagentos.compose.memory.MemoryItem
import ai.mobileagentos.compose.privacy.PrivacyResult

data class AgentOutput(
    val response: String,
    val actions: List<AgentAction>,
    val readinessScore: Int,
    val session: AgentSession,
    val events: List<AgentEvent>,
    val privacyResult: PrivacyResult? = null,
    val retrievedMemories: List<MemoryItem>? = null
)