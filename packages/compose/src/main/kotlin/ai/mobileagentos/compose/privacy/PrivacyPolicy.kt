package ai.mobileagentos.compose.privacy

data class PrivacyPolicyConfig(
    val enabledRedactions: List<RedactionType>,
    val logRedactions: Boolean
)

val defaultPrivacyPolicy = PrivacyPolicyConfig(
    enabledRedactions = listOf(
        RedactionType.EMAIL,
        RedactionType.PHONE,
        RedactionType.TOKEN,
        RedactionType.API_KEY,
        RedactionType.CREDIT_CARD,
        RedactionType.SSN
    ),
    logRedactions = true
)