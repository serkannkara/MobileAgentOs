package ai.mobileagentos.compose.context

data class ContextSnapshot(
    val userId: String,
    val timestamp: String,
    val signals: List<ContextSignal>
)