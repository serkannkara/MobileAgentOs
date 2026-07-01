package ai.mobileagentos.compose.actions

class ActionPolicy(
    private val allowedActions: Set<String> = emptySet(),
    private val actionsRequiringConfirmation: Set<String> = emptySet()
) {
    fun isAllowed(action: AgentAction): Boolean {
        return allowedActions.isEmpty() || action.type in allowedActions
    }
    
    fun requiresConfirmation(action: AgentAction): Boolean {
        return action.requiresConfirmation || action.type in actionsRequiringConfirmation
    }
}