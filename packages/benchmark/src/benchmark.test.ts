import { describe, it, expect } from "vitest";
import { runReadinessBenchmark } from "./readiness/runReadinessBenchmark";

describe("Benchmark", () => {
  it("should run readiness benchmark", () => {
    const score = runReadinessBenchmark({
      contextEnabled: true,
      memoryEnabled: true,
      privacyEnabled: true,
      actionsEnabled: true,
      offlineSupport: "partial",
      uxContinuity: "good",
      appStoreReadiness: "review_needed",
    });

    expect(score.overall).toBeGreaterThan(0);
    expect(score.overall).toBeLessThanOrEqual(100);
  });
});
