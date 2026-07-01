package ai.mobileagentos.compose.actions

import ai.mobileagentos.compose.utils.IdGenerator

data class AgentAction(
    val id: String,
    val type: String,
    val parameters: Map<String, Any>,
    val requiresConfirmation: Boolean = false
) {
    companion object {
        fun create(
            type: String,
            parameters: Map<String, Any> = emptyMap(),
            requiresConfirmation: Boolean = false
        ): AgentAction {
            return AgentAction(
                id = IdGenerator.generate("action"),
                type = type,
                parameters = parameters,
                requiresConfirmation = requiresConfirmation
            )
        }
    }
}