import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

type Screen = "home" | "timeline" | "memory" | "actions" | "privacy" | "readiness";

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  const features = [
    { id: "timeline", title: "Agent Timeline", subtitle: "See the full runtime pipeline", icon: "⚡" },
    { id: "memory", title: "Local Memory", subtitle: "Context that persists offline", icon: "🧠" },
    { id: "actions", title: "Action Center", subtitle: "Execute safe native actions", icon: "⚙️" },
    { id: "privacy", title: "Privacy Mode", subtitle: "PII detection and redaction", icon: "🔒" },
    { id: "readiness", title: "Readiness Score", subtitle: "7-dimension quality framework", icon: "📊" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>NOVA Demo</Text>
        <Text style={styles.heroSubtitle}>
          AI-native mobile reference app powered by MobileAgentOS
        </Text>
      </View>

      <View style={styles.about}>
        <Text style={styles.aboutTitle}>MobileAgentOS</Text>
        <Text style={styles.aboutTagline}>
          The open-source architecture layer for AI-native mobile apps.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.aboutText}>
          Not another chatbot starter — a runtime, benchmark, and reference architecture for shipping AI-native mobile products.
        </Text>
        <Text style={styles.aboutHighlight}>
          The world has enough agent demos. MobileAgentOS is for shipping products.
        </Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Explore Features</Text>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.featureCard}
            onPress={() => onNavigate(feature.id as Screen)}
          >
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
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
  hero: {
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
  },
  about: {
    backgroundColor: "#F8FAFC",
    padding: 24,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
  },
  aboutTagline: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A84FF",
    marginBottom: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 12,
  },
  aboutHighlight: {
    fontSize: 14,
    fontWeight: "600",
    color: "#14B8A6",
    lineHeight: 22,
  },
  features: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    color: "#0A84FF",
    fontWeight: "700",
  },
});