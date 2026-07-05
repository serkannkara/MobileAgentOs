import Foundation

// Detects and redacts personally identifiable information
public final class PrivacyGuard {
    private let policy: PrivacyPolicy
    
    public init(policy: PrivacyPolicy = .default) {
        self.policy = policy
    }
    
    public func check(text: String) -> PrivacyResult {
        var redactedText = text
        var redactions: [Redaction] = []
        
        // Process in order: more specific patterns first to avoid conflicts
        
        if policy.enabledPIITypes.contains(.email) {
            let emailPattern = #"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}"#
            redactedText = redact(
                text: redactedText,
                pattern: emailPattern,
                type: .email,
                replacement: "[REDACTED_EMAIL]",
                redactions: &redactions
            )
        }
        
        if policy.enabledPIITypes.contains(.apiKey) {
            let apiKeyPattern = #"(sk_live_|sk_test_|pk_live_|pk_test_)[a-zA-Z0-9]{20,}"#
            redactedText = redact(
                text: redactedText,
                pattern: apiKeyPattern,
                type: .apiKey,
                replacement: "[REDACTED_API_KEY]",
                redactions: &redactions
            )
        }
        
        if policy.enabledPIITypes.contains(.ssn) {
            let ssnPattern = #"\b\d{3}-\d{2}-\d{4}\b"#
            redactedText = redact(
                text: redactedText,
                pattern: ssnPattern,
                type: .ssn,
                replacement: "[REDACTED_SSN]",
                redactions: &redactions
            )
        }
        
        if policy.enabledPIITypes.contains(.creditCard) {
            let ccPattern = #"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b"#
            redactedText = redact(
                text: redactedText,
                pattern: ccPattern,
                type: .creditCard,
                replacement: "[REDACTED_CREDIT_CARD]",
                redactions: &redactions
            )
        }
        
        if policy.enabledPIITypes.contains(.phone) {
            let phonePattern = #"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"#
            redactedText = redact(
                text: redactedText,
                pattern: phonePattern,
                type: .phone,
                replacement: "[REDACTED_PHONE]",
                redactions: &redactions
            )
        }
        
        if policy.enabledPIITypes.contains(.token) {
            let tokenPattern = #"\b[A-Za-z0-9]{32,}\b"#
            redactedText = redact(
                text: redactedText,
                pattern: tokenPattern,
                type: .token,
                replacement: "[REDACTED_TOKEN]",
                redactions: &redactions
            )
        }
        
        return PrivacyResult(
            originalText: text,
            redactedText: redactedText,
            redactions: redactions
        )
    }
    
    private func redact(
        text: String,
        pattern: String,
        type: PIIType,
        replacement: String,
        redactions: inout [Redaction]
    ) -> String {
        guard let regex = try? NSRegularExpression(pattern: pattern, options: []) else {
            return text
        }
        
        let nsText = text as NSString
        let matches = regex.matches(in: text, range: NSRange(location: 0, length: nsText.length))
        
        var result = text
        for match in matches.reversed() {
            let original = nsText.substring(with: match.range)
            let redaction = Redaction(
                type: type,
                original: original,
                replacement: replacement,
                position: match.range.location
            )
            redactions.append(redaction)
            
            if let range = Range(match.range, in: result) {
                result.replaceSubrange(range, with: replacement)
            }
        }
        
        return result
    }
}