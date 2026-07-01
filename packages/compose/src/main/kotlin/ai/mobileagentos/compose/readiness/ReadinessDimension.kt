package ai.mobileagentos.compose.readiness

enum class ReadinessDimension {
    CONTEXT_AWARENESS,
    MEMORY_QUALITY,
    PRIVACY_SAFETY,
    ACTION_RELIABILITY,
    OFFLINE_RESILIENCE,
    UX_CONTINUITY,
    APP_STORE_READINESS
}

data class DimensionScore(
    val score: Int,
    val notes: String? = null
)