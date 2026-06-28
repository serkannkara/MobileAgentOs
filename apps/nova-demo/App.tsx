import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { createMobileAgent, InMemoryStore, createDefaultPrivacyGuard, createDefaultActionRouter } from "@mobileagentos/core";
import { MobileAgentProvider } from "@mobileagentos/react-native";
import HomeScreen from "./src/screens/HomeScreen";
import AgentTimelineScreen from "./src/screens/AgentTimelineScreen";
import LocalMemoryScreen from "./src/screens/LocalMemoryScreen";
import ActionCenterScreen from "./src/screens/ActionCenterScreen";
import PrivacyModeScreen from "./src/screens/PrivacyModeScreen";
import ReadinessScoreScreen from "./src/screens/ReadinessScoreScreen";

type Screen = "home" | "timeline" | "memory" | "actions" | "privacy" | "readiness";

const agent = createMobileAgent({
  name: "NOVA",
  userId: "demo-user",
  memory: new InMemoryStore(),
  privacy: createDefaultPrivacyGuard(),
  actions: createDefaultActionRouter(),
  enableContext: true,
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "timeline":
        return <AgentTimelineScreen />;
      case "memory":
        return <LocalMemoryScreen />;
      case "actions":
        return <ActionCenterScreen />;
      case "privacy":
        return <PrivacyModeScreen />;
      case "readiness":
        return <ReadinessScoreScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <MobileAgentProvider agent={agent}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NOVA Demo</Text>
          {currentScreen !== "home" && (
            <TouchableOpacity onPress={() => setCurrentScreen("home")}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>
          {renderScreen()}
        </View>
      </SafeAreaView>
    </MobileAgentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
  },
  backButton: {
    fontSize: 16,
    color: "#0A84FF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
});