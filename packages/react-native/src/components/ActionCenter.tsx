import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { AgentAction } from "@mobileagentos/core";

export interface ActionCenterProps {
  actions: AgentAction[];
  onExecuteAction: (action: AgentAction) => void;
}

export function ActionCenter({ actions, onExecuteAction }: ActionCenterProps) {
  return (
    <FlatList
      data={actions}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No actions available</Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.actionCard,
            item.destructive && styles.actionCardDestructive,
          ]}
          onPress={() => onExecuteAction(item)}
        >
          <View style={styles.actionHeader}>
            <Text style={styles.actionName}>{item.name}</Text>
            {item.requiresConfirmation && (
              <View style={styles.confirmationBadge}>
                <Text style={styles.confirmationText}>Requires Confirmation</Text>
              </View>
            )}
          </View>
          <Text style={styles.actionDescription}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 20,
  },
  actionCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0A84FF",
  },
  actionCardDestructive: {
    borderLeftColor: "#EF4444",
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  actionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  confirmationBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  confirmationText: {
    fontSize: 10,
    color: "#92400E",
    fontWeight: "600",
  },
  actionDescription: {
    fontSize: 14,
    color: "#64748B",
  },
});