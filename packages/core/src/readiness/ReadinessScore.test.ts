import { describe, it, expect } from "vitest";
import { MobileAIReadiness } from "./MobileAIReadiness";

describe("ReadinessScore", () => {
  it("should calculate overall score from dimensions", () => {
    const readiness = new MobileAIReadiness();
    const score = readiness.calculateReadiness({
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

  it("should have all 7 dimensions", () => {
    const readiness = new MobileAIReadiness();
    const score = readiness.calculateReadiness({
      contextEnabled: true,
      memoryEnabled: true,
      privacyEnabled: true,
      actionsEnabled: true,
      offlineSupport: "full",
      uxContinuity: "excellent",
      appStoreReadiness: "ready",
    });

    expect(score.dimensions.contextAwareness).toBeDefined();
    expect(score.dimensions.memoryQuality).toBeDefined();
    expect(score.dimensions.privacySafety).toBeDefined();
    expect(score.dimensions.actionReliability).toBeDefined();
    expect(score.dimensions.offlineResilience).toBeDefined();
    expect(score.dimensions.uxContinuity).toBeDefined();
    expect(score.dimensions.appStoreReadiness).toBeDefined();
  });

  it("should provide recommendations", () => {
    const readiness = new MobileAIReadiness();
    const score = readiness.calculateReadiness({
      contextEnabled: false,
      memoryEnabled: false,
      privacyEnabled: false,
      actionsEnabled: false,
      offlineSupport: "none",
      uxContinuity: "poor",
      appStoreReadiness: "not_ready",
    });

    expect(score.dimensions.contextAwareness.recommendations.length).toBeGreaterThan(0);
    expect(score.dimensions.privacySafety.recommendations.length).toBeGreaterThan(0);
  });

  it("should have higher score when all features enabled", () => {
    const readiness = new MobileAIReadiness();
    
    const lowScore = readiness.calculateReadiness({
      contextEnabled: false,
      memoryEnabled: false,
      privacyEnabled: false,
      actionsEnabled: false,
      offlineSupport: "none",
      uxContinuity: "poor",
      appStoreReadiness: "not_ready",
    });

    const highScore = readiness.calculateReadiness({
      contextEnabled: true,
      memoryEnabled: true,
      privacyEnabled: true,
      actionsEnabled: true,
      offlineSupport: "full",
      uxContinuity: "excellent",
      appStoreReadiness: "ready",
    });

    expect(highScore.overall).toBeGreaterThan(lowScore.overall);
  });
});
