package ai.mobileagentos.compose.context

data class ContextSignal(
    val type: ContextSignalType,
    val key: String,
    val value: Any,
    val timestamp: String = System.currentTimeMillis().toString()
)