import { runReadinessBenchmark } from "@mobileagentos/benchmark";
import { ReadinessInput } from "@mobileagentos/core";

export function useReadinessScore() {
  const calculateScore = (input: ReadinessInput) => {
    return runReadinessBenchmark(input);
  };

  return {
    calculateScore,
  };
}
