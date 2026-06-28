import { RedactionType } from "./Redaction";

export interface PrivacyPolicyConfig {
  enabledRedactions: RedactionType[];
  logRedactions: boolean;
  strictMode: boolean;
}

export const defaultPrivacyPolicy: PrivacyPolicyConfig = {
  enabledRedactions: ["email", "phone", "token", "api_key", "credit_card", "ssn"],
  logRedactions: true,
  strictMode: true,
};
