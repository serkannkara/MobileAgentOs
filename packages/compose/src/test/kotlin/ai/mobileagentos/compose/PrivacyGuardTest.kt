package ai.mobileagentos.compose

import ai.mobileagentos.compose.privacy.PrivacyGuard
import ai.mobileagentos.compose.privacy.RedactionType
import org.junit.Assert.*
import org.junit.Test

class PrivacyGuardTest {
    
    @Test
    fun `redact email addresses`() {
        val guard = PrivacyGuard()
        val text = "Contact me at john.doe@example.com for details"
        val result = guard.redact(text)
        
        assertFalse(result.safe)
        assertEquals(1, result.redactions.size)
        assertEquals(RedactionType.EMAIL, result.redactions[0].type)
        assertTrue(result.redactedText.contains("[REDACTED_EMAIL]"))
        assertFalse(result.redactedText.contains("john.doe@example.com"))
    }
    
    @Test
    fun `redact phone numbers`() {
        val guard = PrivacyGuard()
        val text = "Call me at 555-123-4567"
        val result = guard.redact(text)
        
        assertFalse(result.safe)
        assertEquals(1, result.redactions.size)
        assertEquals(RedactionType.PHONE, result.redactions[0].type)
        assertTrue(result.redactedText.contains("[REDACTED_PHONE]"))
    }
    
    @Test
    fun `safe text returns no redactions`() {
        val guard = PrivacyGuard()
        val text = "This is a safe message with no PII"
        val result = guard.redact(text)
        
        assertTrue(result.safe)
        assertEquals(0, result.redactions.size)
        assertEquals(text, result.redactedText)
    }
    
    @Test
    fun `redact multiple PII types`() {
        val guard = PrivacyGuard()
        val text = "Email: test@example.com, Phone: 555-0000"
        val result = guard.redact(text)
        
        assertFalse(result.safe)
        assertTrue(result.redactions.size >= 2)
        assertFalse(result.redactedText.contains("test@example.com"))
        assertFalse(result.redactedText.contains("555-0000"))
    }
}