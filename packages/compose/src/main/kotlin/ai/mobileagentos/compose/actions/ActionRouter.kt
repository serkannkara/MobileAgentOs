package ai.mobileagentos.compose.actions

class ActionRouter(
    private val policy: ActionPolicy = ActionPolicy()
) {
    private val handlers: MutableMap<String, suspend (AgentAction) -> Any> = mutableMapOf()
    private val actionHistory: MutableList<ActionResult> = mutableListOf()
    
    fun registerHandler(actionType: String, handler: suspend (AgentAction) -> Any) {
        handlers[actionType] = handler
    }
    
    suspend fun execute(action: AgentAction): ActionResult {
        if (!policy.isAllowed(action)) {
            val result = ActionResult(
                actionId = action.id,
                success = false,
                error = "Action not allowed by policy"
            )
            actionHistory.add(result)
            return result
        }
        
        if (policy.requiresConfirmation(action)) {
            val result = ActionResult(
                actionId = action.id,
                success = false,
                error = "Action requires confirmation"
            )
            actionHistory.add(result)
            return result
        }
        
        val handler = handlers[action.type]
        if (handler == null) {
            val result = ActionResult(
                actionId = action.id,
                success = false,
                error = "No handler registered for action type: ${action.type}"
            )
            actionHistory.add(result)
            return result
        }
        
        return try {
            val handlerResult = handler(action)
            val result = ActionResult(
                actionId = action.id,
                success = true,
                result = handlerResult
            )
            actionHistory.add(result)
            result
        } catch (e: Exception) {
            val result = ActionResult(
                actionId = action.id,
                success = false,
                error = e.message ?: "Unknown error"
            )
            actionHistory.add(result)
            result
        }
    }
    
    fun getHistory(): List<ActionResult> = actionHistory.toList()
    
    fun clearHistory() {
        actionHistory.clear()
    }
}