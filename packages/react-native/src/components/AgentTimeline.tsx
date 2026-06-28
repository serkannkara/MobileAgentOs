import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { AgentEvent } from "@mobileagentos/core";

export interface AgentTimelineProps {
  events: AgentEvent[];
}

export function AgentTimeline({ events }: AgentTimelineProps) {
  if (events.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No events yet</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {events.map((event) => {
        const dataText = event.data ? JSON.stringify(event.data) : null;
        
        return (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventType}>{event.type}</Text>
            <Text style={styles.eventTime}>
              {new Date(event.timestamp).toLocaleTimeString()}
            </Text>
            {dataText && (
              <Text style={styles.eventData} numberOfLines={2}>
                {dataText}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0A84FF",
  },
  eventType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  eventData: {
    fontSize: 12,
    color: "#475569",
  },
});