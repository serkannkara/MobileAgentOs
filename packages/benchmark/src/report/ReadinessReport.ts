import { ReadinessScore } from "@mobileagentos/core";

export interface ReadinessReport {
  name: string;
  score: ReadinessScore;
  recommendations: string[];
  timestamp: string;
}

export function createReadinessReport(
  name: string,
  score: ReadinessScore,
  recommendations: string[]
): ReadinessReport {
  return {
    name,
    score,
    recommendations,
    timestamp: new Date().toISOString(),
  };
}
