import { ReadinessInput } from "@mobileagentos/core";
import { runReadinessBenchmark } from "./runReadinessBenchmark";
import { ReadinessReport, createReadinessReport } from "../report/ReadinessReport";

export function createBenchmarkReport(input: ReadinessInput): ReadinessReport {
  const score = runReadinessBenchmark(input);
  
  const recommendations: string[] = [];
  for (const dimension in score.dimensions) {
    const dim = score.dimensions[dimension as keyof typeof score.dimensions];
    recommendations.push(...dim.recommendations);
  }

  return createReadinessReport(
    "Mobile AI Readiness Report",
    score,
    recommendations
  );
}
