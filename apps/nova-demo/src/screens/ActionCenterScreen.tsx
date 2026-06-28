import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { createAgentAction, AgentAction } from "@mobileagentos/core";

const availableActions: AgentAction[] = [
  createAgentAction(
    "create_plan",
    "Create Plan",
    "Create a new action plan for your goals",
    {},
    false,
    false
  ),
  createAgentAction(
    "save_memory",
    "Save Memory",
    "Save important information to local memory",
    {},
    false,
    false
  ),
  createAgentAction(
    "open_screen",
    "Open Screen",
    "Navigate to a different screen",
    {},
    false,
    false
  ),
  createAgentAction(
    "export_summary",
    "Export Summary",
    "Export a summary of the current session",
    {},
    false,
    false
  ),
  createAgentAction(
    "request_confirmation",
    "Request Confirmation",
    "Ask user to confirm a critical action",
    {},
    true,
    false
  ),
];

export default function ActionCenterScreen() {
  const [executedActions, setExecutedActions] = useState<string[]>([]);

  const handleExecute = (action: AgentAction) => {
    if (action.requiresConfirmation) {
      Alert.alert(
        "Confirmation Required",
        `Execute action: ${action.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Confirm",
            onPress: () => {
              setExecutedActions([...executedActions, action.name]);
            },
          },
        ]
      );
    } else {
      setExecutedActions([...executedActions, action.name]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Action Center</Text>
      <Text style={styles.subtitle}>
        Execute safe actions through ActionRouter
      </Text>

      <View style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Available Actions</Text>
        {availableActions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.actionItem,
              item.requiresConfirmation && styles.actionItemWarning,
            ]}
            onPress={() => handleExecute(item)}
          >
            <View style={styles.actionHeader}>
              <Text style={styles.actionName}>{item.name}</Text>
              {item.requiresConfirmation && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Requires Confirmation</Text>
                </View>
              )}
            </View>
            <Text style={styles.actionDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {executedActions.length > 0 && (
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>
            Execution History ({executedActions.length})
          </Text>
          {executedActions.slice(-3).reverse().map((name, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDot}>✓</Text>
              <Text style={styles.historyText}>{name}</Text>
            </View>
          ))}
        </View>
      )}
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
  actionsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  actionItem: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#0A84FF",
  },
  actionItemWarning: {
    borderLeftColor: "#F59E0B",
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  actionName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  badge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: "#92400E",
    fontWeight: "600",
  },
  actionDescription: {
    fontSize: 14,
    color: "#64748B",
  },
  historyCard: {
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#065F46",
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  historyDot: {
    fontSize: 16,
    marginRight: 8,
    color: "#10B981",
  },
  historyText: {
    fontSize: 14,
    color: "#064E3B",
  },
});