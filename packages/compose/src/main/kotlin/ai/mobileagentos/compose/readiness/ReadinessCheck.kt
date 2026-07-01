package ai.mobileagentos.compose.readiness

data class ReadinessInput(
    val contextEnabled: Boolean,
    val memoryEnabled: Boolean,
    val privacyEnabled: Boolean,
    val actionsEnabled: Boolean,
    val offlineSupport: String = "none",
    val uxContinuity: String = "basic",
    val appStoreReadiness: String = "not_ready"
)