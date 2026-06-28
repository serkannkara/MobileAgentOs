import { Redaction, RedactionResult, RedactionType } from "./Redaction";
import { PrivacyPolicyConfig, defaultPrivacyPolicy } from "./PrivacyPolicy";

const PATTERNS: Record<RedactionType, RegExp> = {
  email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2}/g,
  phone: /(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g,
  token: /[A-Za-z0-9_-]{20}/g,
  api_key: /(sk|pk)_[A-Za-z0-9_-]{20}/g,
  credit_card: /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g,
  ssn: /\d{3}-\d{2}-\d{4}/g,
};

const REPLACEMENTS: Record<RedactionType, string> = {
  email: "[REDACTED_EMAIL]",
  phone: "[REDACTED_PHONE]",
  token: "[REDACTED_TOKEN]",
  api_key: "[REDACTED_API_KEY]",
  credit_card: "[REDACTED_CREDIT_CARD]",
  ssn: "[REDACTED_SSN]",
};

export class PrivacyGuard {
  private policy: PrivacyPolicyConfig;
  private redactionLog: Redaction[];

  constructor(policy?: Partial<PrivacyPolicyConfig>) {
    this.policy = { ...defaultPrivacyPolicy, ...policy };
    this.redactionLog = [];
  }

  redact(text: string): RedactionResult {
    let redactedText = text;
    const redactions: Redaction[] = [];

    for (const type of this.policy.enabledRedactions) {
      const pattern = PATTERNS[type];
      const replacement = REPLACEMENTS[type];

      const matches = Array.from(text.matchAll(pattern));

      for (const match of matches) {
        if (match.index === undefined) continue;

        const redaction: Redaction = {
          type,
          original: match[0],
          replacement,
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
        };

        redactions.push(redaction);
        redactedText = redactedText.replace(match[0], replacement);
      }
    }

    if (this.policy.logRedactions) {
      this.redactionLog.push(...redactions);
    }

    return {
      redactedText,
      redactions,
      safe: redactions.length === 0,
    };
  }

  getRedactionLog(): Redaction[] {
    return [...this.redactionLog];
  }

  clearRedactionLog(): void {
    this.redactionLog = [];
  }
}

export function createDefaultPrivacyGuard(): PrivacyGuard {
  return new PrivacyGuard();
}
