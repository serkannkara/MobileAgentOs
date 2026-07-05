import XCTest
@testable import MobileAgentOS

final class PrivacyGuardTests: XCTestCase {
    var privacyGuard: PrivacyGuard!
    
    override func setUp() {
        super.setUp()
        privacyGuard = PrivacyGuard()
    }
    
    func testEmailRedaction() {
        let text = "Contact me at serkan@example.com for details"
        let result = privacyGuard.check(text: text)
        
        XCTAssertFalse(result.isSafe)
        XCTAssertEqual(result.redactions.count, 1)
        XCTAssertEqual(result.redactions.first?.type, .email)
        XCTAssertTrue(result.redactedText.contains("[REDACTED_EMAIL]"))
    }
    
    func testPhoneRedaction() {
        let text = "Call me at 555-123-4567"
        let result = privacyGuard.check(text: text)
        
        XCTAssertFalse(result.isSafe)
        XCTAssertEqual(result.redactions.count, 1)
        XCTAssertEqual(result.redactions.first?.type, .phone)
        XCTAssertTrue(result.redactedText.contains("[REDACTED_PHONE]"))
    }
    
    func testAPIKeyRedaction() {
        let text = "Use token sk_test_1234567890abcdefghij"
        let result = privacyGuard.check(text: text)
        
        XCTAssertFalse(result.isSafe)
        XCTAssertEqual(result.redactions.count, 1)
        XCTAssertEqual(result.redactions.first?.type, .apiKey)
        XCTAssertTrue(result.redactedText.contains("[REDACTED_API_KEY]"))
    }
    
    func testCreditCardRedaction() {
        let text = "Card number is 4111-1111-1111-1111"
        let result = privacyGuard.check(text: text)
        
        XCTAssertFalse(result.isSafe)
        XCTAssertEqual(result.redactions.count, 1)
        XCTAssertEqual(result.redactions.first?.type, .creditCard)
        XCTAssertTrue(result.redactedText.contains("[REDACTED_CREDIT_CARD]"))
    }
    
    func testSSNRedaction() {
        let text = "SSN: 123-45-6789"
        let result = privacyGuard.check(text: text)
        
        XCTAssertFalse(result.isSafe)
        XCTAssertEqual(result.redactions.count, 1)
        XCTAssertEqual(result.redactions.first?.type, .ssn)
        XCTAssertTrue(result.redactedText.contains("[REDACTED_SSN]"))
    }
    
    func testMultipleRedactions() {
        let text = "Email serkan@example.com or call 555-123-4567"
        let result = privacyGuard.check(text: text)
        
        XCTAssertFalse(result.isSafe)
        XCTAssertEqual(result.redactions.count, 2)
    }
    
    func testSafeText() {
        let text = "This is a safe message with no PII"
        let result = privacyGuard.check(text: text)
        
        XCTAssertTrue(result.isSafe)
        XCTAssertEqual(result.redactions.count, 0)
        XCTAssertEqual(result.redactedText, text)
    }
}