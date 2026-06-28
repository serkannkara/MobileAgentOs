import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface ReadinessBadgeProps {
  score: number;
}

export function ReadinessBadge({ score }: ReadinessBadgeProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 86) return "#10B981";
    if (score >= 71) return "#3B82F6";
    if (score >= 41) return "#F59E0B";
    return "#EF4444";
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 86) return "Excellent";
    if (score >= 71) return "Good";
    if (score >= 41) return "Needs Work";
    return "Not Ready";
  };

  const getScoreEmoji = (score: number): string => {
    if (score >= 86) return "🟦";
    if (score >= 71) return "🟢";
    if (score >= 41) return "🟡";
    return "🔴";
  };

  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const emoji = getScoreEmoji(score);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.score, { color }]}>{score}/100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 2,
  },
  score: {
    fontSize: 24,
    fontWeight: "700",
  },
});