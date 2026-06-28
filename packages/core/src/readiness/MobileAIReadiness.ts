import { DimensionScore, ReadinessDimension } from "./ReadinessCheck";
import { ReadinessScore, createReadinessScore } from "./ReadinessScore";

export interface ReadinessInput {
  contextEnabled: boolean;
  memoryEnabled: boolean;
  privacyEnabled: boolean;
  actionsEnabled: boolean;
  offlineSupport: "none" | "partial" | "full";
  uxContinuity: "poor" | "fair" | "good" | "excellent";
  appStoreReadiness: "not_ready" | "review_needed" | "ready";
}

export class MobileAIReadiness {
  calculateReadiness(input: ReadinessInput): ReadinessScore {
    const dimensions: Record<ReadinessDimension, DimensionScore> = {
      contextAwareness: this.calculateContextAwareness(input),
      memoryQuality: this.calculateMemoryQuality(input),
      privacySafety: this.calculatePrivacySafety(input),
      actionReliability: this.calculateActionReliability(input),
      offlineResilience: this.calculateOfflineResilience(input),
      uxContinuity: this.calculateUXContinuity(input),
      appStoreReadiness: this.calculateAppStoreReadiness(input),
    };

    return createReadinessScore(dimensions);
  }

  private calculateContextAwareness(input: ReadinessInput): DimensionScore {
    const score = input.contextEnabled ? 78 : 30;
    const checks = input.contextEnabled
      ? ["Context engine enabled"]
      : ["Context engine disabled"];
    const recommendations = input.contextEnabled
      ? ["Add more context signals"]
      : ["Enable context engine"];

    return {
      dimension: "contextAwareness",
      score,
      checks,
      recommendations,
    };
  }

  private calculateMemoryQuality(input: ReadinessInput): DimensionScore {
    const score = input.memoryEnabled ? 84 : 20;
    const checks = input.memoryEnabled
      ? ["Memory engine enabled"]
      : ["Memory engine disabled"];
    const recommendations = input.memoryEnabled
      ? ["Implement persistence"]
      : ["Enable memory engine"];

    return {
      dimension: "memoryQuality",
      score,
      checks,
      recommendations,
    };
  }

  private calculatePrivacySafety(input: ReadinessInput): DimensionScore {
    const score = input.privacyEnabled ? 91 : 10;
    const checks = input.privacyEnabled
      ? ["Privacy guard enabled"]
      : ["Privacy guard disabled"];
    const recommendations = input.privacyEnabled
      ? ["Add consent flows"]
      : ["Enable privacy guard immediately"];

    return {
      dimension: "privacySafety",
      score,
      checks,
      recommendations,
    };
  }

  private calculateActionReliability(input: ReadinessInput): DimensionScore {
    const score = input.actionsEnabled ? 76 : 25;
    const checks = input.actionsEnabled
      ? ["Action router enabled"]
      : ["Action router disabled"];
    const recommendations = input.actionsEnabled
      ? ["Add confirmation flows"]
      : ["Enable action router"];

    return {
      dimension: "actionReliability",
      score,
      checks,
      recommendations,
    };
  }

  private calculateOfflineResilience(input: ReadinessInput): DimensionScore {
    const scoreMap = { none: 20, partial: 70, full: 95 };
    const score = scoreMap[input.offlineSupport];
    const checks = [`Offline support: ${input.offlineSupport}`];
    const recommendations =
      input.offlineSupport === "full"
        ? ["Maintain offline-first architecture"]
        : ["Improve offline support"];

    return {
      dimension: "offlineResilience",
      score,
      checks,
      recommendations,
    };
  }

  private calculateUXContinuity(input: ReadinessInput): DimensionScore {
    const scoreMap = { poor: 30, fair: 55, good: 88, excellent: 98 };
    const score = scoreMap[input.uxContinuity];
    const checks = [`UX continuity: ${input.uxContinuity}`];
    const recommendations =
      input.uxContinuity === "excellent"
        ? ["Maintain consistency"]
        : ["Improve UX consistency"];

    return {
      dimension: "uxContinuity",
      score,
      checks,
      recommendations,
    };
  }

  private calculateAppStoreReadiness(input: ReadinessInput): DimensionScore {
    const scoreMap = { not_ready: 15, review_needed: 60, ready: 95 };
    const score = scoreMap[input.appStoreReadiness];
    const checks = [`App Store readiness: ${input.appStoreReadiness}`];
    const recommendations =
      input.appStoreReadiness === "ready"
        ? ["Ready to submit"]
        : ["Review App Store guidelines"];

    return {
      dimension: "appStoreReadiness",
      score,
      checks,
      recommendations,
    };
  }
}

export function createMobileAIReadiness(): MobileAIReadiness {
  return new MobileAIReadiness();
}
