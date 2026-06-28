import { DimensionScore, ReadinessDimension } from "./ReadinessCheck";

export interface ReadinessScore {
  overall: number;
  dimensions: Record<ReadinessDimension, DimensionScore>;
  timestamp: string;
}

const DIMENSION_WEIGHTS: Record<ReadinessDimension, number> = {
  contextAwareness: 0.15,
  memoryQuality: 0.15,
  privacySafety: 0.2,
  actionReliability: 0.2,
  offlineResilience: 0.1,
  uxContinuity: 0.1,
  appStoreReadiness: 0.1,
};

export function calculateOverallScore(
  dimensions: Record<ReadinessDimension, DimensionScore>
): number {
  let weightedSum = 0;

  for (const dimension in dimensions) {
    const dim = dimension as ReadinessDimension;
    const weight = DIMENSION_WEIGHTS[dim];
    const score = dimensions[dim].score;
    weightedSum += weight * score;
  }

  return Math.round(weightedSum);
}

export function createReadinessScore(
  dimensions: Record<ReadinessDimension, DimensionScore>
): ReadinessScore {
  return {
    overall: calculateOverallScore(dimensions),
    dimensions,
    timestamp: new Date().toISOString(),
  };
}
