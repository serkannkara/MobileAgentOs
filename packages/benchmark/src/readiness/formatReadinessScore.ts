import { ReadinessScore } from "@mobileagentos/core";

export function formatReadinessScore(score: ReadinessScore): string {
  const tier =
    score.overall >= 86
      ? "🟦 Excellent — Production Ready"
      : score.overall >= 71
      ? "🟢 Good — Ready for Beta"
      : score.overall >= 41
      ? "🟡 Needs Work — Ship with Caution"
      : "🔴 Not Ready — Critical Gaps";

  let output = `\n=== Mobile AI Readiness Report ===\n\n`;
  output += `Overall Score: ${score.overall}/100 — ${tier}\n\n`;
  output += `Dimension Scores:\n`;

  for (const dimension in score.dimensions) {
    const dim = score.dimensions[dimension as keyof typeof score.dimensions];
    output += `  ${dimension}: ${dim.score}/100\n`;
  }

  output += `\nTimestamp: ${score.timestamp}\n`;
  output += `===================================\n`;

  return output;
}
