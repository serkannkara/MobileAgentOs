import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useReadinessScore } from "@mobileagentos/react-native";

export default function ReadinessScoreScreen() {
  const { calculateScore } = useReadinessScore();
  const [score, setScore] = useState<any>(null);

  useEffect(() => {
    const result = calculateScore({
      contextEnabled: true,
      memoryEnabled: true,
      privacyEnabled: true,
      actionsEnabled: true,
      offlineSupport: "partial",
      uxContinuity: "good",
      appStoreReadiness: "review_needed",
    });
    setScore(result);
  }, []);

  if (!score) return null;

  const getTierColor = (overall: number) => {
    if (overall >= 86) return "#14B8A6";
    if (overall >= 71) return "#10B981";
    if (overall >= 41) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Readiness Score</Text>
      <Text style={styles.subtitle}>
        Mobile AI Readiness Framework scoring
      </Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Overall Score</Text>
        <Text style={[styles.scoreValue, { color: getTierColor(score.overall) }]}>
          {score.overall}/100
        </Text>
        <Text style={styles.scoreTier}>
          {score.overall >= 86 ? "🟦 Excellent" :
           score.overall >= 71 ? "🟢 Good" :
           score.overall >= 41 ? "🟡 Needs Work" : "🔴 Not Ready"}
        </Text>
      </View>

      <View style={styles.dimensionsCard}>
        <Text style={styles.dimensionsTitle}>Dimensions</Text>
        {Object.entries(score.dimensions).map(([key, dim]: [string, any]) => (
          <View key={key} style={styles.dimensionItem}>
            <Text style={styles.dimensionName}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
            <Text style={styles.dimensionScore}>{dim.score}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: "#FFFFFF",
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 8,
  },
  scoreTier: {
    fontSize: 16,
    color: "#475569",
  },
  dimensionsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  dimensionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  dimensionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  dimensionName: {
    fontSize: 15,
    color: "#1E293B",
    textTransform: "capitalize",
  },
  dimensionScore: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A84FF",
  },
});
