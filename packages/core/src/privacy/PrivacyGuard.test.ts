import { describe, it, expect } from "vitest";
import { PrivacyGuard } from "./PrivacyGuard";

describe("PrivacyGuard", () => {
  it("should redact email addresses", () => {
    const guard = new PrivacyGuard();
    const result = guard.redact("My email is test@example.com");

    expect(result.redactedText).toContain("[REDACTED_EMAIL]");
    expect(result.safe).toBe(false);
    expect(result.redactions.length).toBe(1);
    expect(result.redactions[0].type).toBe("email");
  });

  it("should redact phone numbers", () => {
    const guard = new PrivacyGuard();
    const result = guard.redact("Call me at 555-123-4567");

    expect(result.redactedText).toContain("[REDACTED_PHONE]");
    expect(result.safe).toBe(false);
  });

  it("should return safe for clean text", () => {
    const guard = new PrivacyGuard();
    const result = guard.redact("This is a clean message");

    expect(result.safe).toBe(true);
    expect(result.redactions.length).toBe(0);
  });

  it("should handle multiple redactions", () => {
    const guard = new PrivacyGuard();
    const result = guard.redact(
      "Contact: email@test.com, phone: 555-1234"
    );

    expect(result.redactions.length).toBeGreaterThan(0);
  });

  it("should log redactions when enabled", () => {
    const guard = new PrivacyGuard({ logRedactions: true });
    guard.redact("test@example.com");

    const log = guard.getRedactionLog();
    expect(log.length).toBe(1);
  });
});
