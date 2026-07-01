package ai.mobileagentos.compose.actions

data class ActionResult(
    val actionId: String,
    val success: Boolean,
    val result: Any? = null,
    val error: String? = null
)