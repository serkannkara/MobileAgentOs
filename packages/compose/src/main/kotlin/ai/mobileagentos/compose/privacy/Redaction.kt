package ai.mobileagentos.compose.privacy

enum class RedactionType {
    EMAIL,
    PHONE,
    TOKEN,
    API_KEY,
    CREDIT_CARD,
    SSN
}

data class Redaction(
    val type: RedactionType,
    val original: String,
    val replacement: String,
    val position: IntRange
)

data class PrivacyResult(
    val redactedText: String,
    val redactions: List<Redaction>,
    val safe: Boolean
)