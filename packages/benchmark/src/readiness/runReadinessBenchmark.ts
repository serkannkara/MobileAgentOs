import {
  MobileAIReadiness,
  ReadinessInput,
  ReadinessScore,
} from "@mobileagentos/core";

export function runReadinessBenchmark(input: ReadinessInput): ReadinessScore {
  const readiness = new MobileAIReadiness();
  return readiness.calculateReadiness(input);
}
