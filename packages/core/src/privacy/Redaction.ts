export type RedactionType =
  | "email"
  | "phone"
  | "token"
  | "api_key"
  | "credit_card"
  | "ssn";

export interface Redaction {
  type: RedactionType;
  original: string;
  replacement: string;
  position: {
    start: number;
    end: number;
  };
}

export interface RedactionResult {
  redactedText: string;
  redactions: Redaction[];
  safe: boolean;
}
