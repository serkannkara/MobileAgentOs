package ai.mobileagentos.compose.agent

import ai.mobileagentos.compose.actions.ActionRouter
import ai.mobileagentos.compose.context.ContextEngine
import ai.mobileagentos.compose.memory.MemoryEngine
import ai.mobileagentos.compose.privacy.PrivacyGuard

data class AgentConfig(
    val name: String,
    val userId: String,
    val context: ContextEngine? = null,
    val memory: MemoryEngine? = null,
    val privacy: PrivacyGuard? = null,
    val actions: ActionRouter? = null
)