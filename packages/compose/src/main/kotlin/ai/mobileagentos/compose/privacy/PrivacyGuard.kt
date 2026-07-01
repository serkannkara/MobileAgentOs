package ai.mobileagentos.compose.privacy

class PrivacyGuard(
    policy: PrivacyPolicyConfig = defaultPrivacyPolicy
) {
    private val policy: PrivacyPolicyConfig = policy
    private val redactionLog: MutableList<Redaction> = mutableListOf()
    
    private val patterns = mapOf(
        RedactionType.EMAIL to Regex("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"),
        RedactionType.PHONE to Regex("(\\+?1?\\s?)?(\\(?\\d{3}\\)?[\\s.-]?)?\\d{3}[\\s.-]?\\d{4}"),
        RedactionType.TOKEN to Regex("[A-Za-z0-9_-]{20,}"),
        RedactionType.API_KEY to Regex("(sk|pk)_[A-Za-z0-9_-]{20,}"),
        RedactionType.CREDIT_CARD to Regex("\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}"),
        RedactionType.SSN to Regex("\\d{3}-\\d{2}-\\d{4}")
    )
    
    private val replacements = mapOf(
        RedactionType.EMAIL to "[REDACTED_EMAIL]",
        RedactionType.PHONE to "[REDACTED_PHONE]",
        RedactionType.TOKEN to "[REDACTED_TOKEN]",
        RedactionType.API_KEY to "[REDACTED_API_KEY]",
        RedactionType.CREDIT_CARD to "[REDACTED_CREDIT_CARD]",
        RedactionType.SSN to "[REDACTED_SSN]"
    )
    
    fun redact(text: String): PrivacyResult {
        var redactedText = text
        val redactions = mutableListOf<Redaction>()
        
        for (type in policy.enabledRedactions) {
            val pattern = patterns[type] ?: continue
            val replacement = replacements[type] ?: continue
            
            pattern.findAll(text).forEach { match ->
                val redaction = Redaction(
                    type = type,
                    original = match.value,
                    replacement = replacement,
                    position = match.range
                )
                redactions.add(redaction)
                redactedText = redactedText.replace(match.value, replacement)
            }
        }
        
        if (policy.logRedactions) {
            redactionLog.addAll(redactions)
        }
        
        return PrivacyResult(
            redactedText = redactedText,
            redactions = redactions,
            safe = redactions.isEmpty()
        )
    }
    
    fun getRedactionLog(): List<Redaction> = redactionLog.toList()
    
    fun clearRedactionLog() {
        redactionLog.clear()
    }
}