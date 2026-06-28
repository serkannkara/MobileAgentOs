export type ReadinessDimension =
  | "contextAwareness"
  | "memoryQuality"
  | "privacySafety"
  | "actionReliability"
  | "offlineResilience"
  | "uxContinuity"
  | "appStoreReadiness";

export interface DimensionScore {
  dimension: ReadinessDimension;
  score: number;
  checks: string[];
  recommendations: string[];
}
