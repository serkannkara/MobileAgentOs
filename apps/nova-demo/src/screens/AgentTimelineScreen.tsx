import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useAgent } from "@mobileagentos/react-native";

export default function AgentTimelineScreen() {
  const { run, loading, error, getSession } = useAgent();
  const [input, setInput] = useState("");
  const [hasRun, setHasRun] = useState(false);

  const handleRun = async () => {
    if (!input.trim()) return;
    await run({ input: input.trim() });
    setHasRun(true);
  };

  const session = getSession();
  const events = session?.events || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agent Timeline</Text>
      <Text style={styles.subtitle}>
        Run an agent session and see the full pipeline
      </Text>

      <View style={styles.inputCard}>
        <Text style={styles.label}>User Input</Text>
        <TextInput
          style={styles.input}
          placeholder="Try: Remember that I prefer morning workouts"
          value={input}
          onChangeText={setInput}
          multiline
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRun}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Run Agent</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      )}

      {hasRun && events.length > 0 && (
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Pipeline Events</Text>
          {events.map((event, index) => (
            <View key={event.id} style={styles.eventItem}>
              <View style={styles.eventDot} />
              <View style={styles.eventContent}>
                <Text style={styles.eventType}>{event.type}</Text>
                <Text style={styles.eventTime}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {hasRun && events.length === 0 && !loading && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No events yet</Text>
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
    lineHeight: 24,
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1E293B",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0A84FF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorCard: {
    backgroundColor: "#FEE2E2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#991B1B",
    fontSize: 14,
  },
  timelineCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  eventDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#14B8A6",
    marginRight: 12,
    marginTop: 4,
  },
  eventContent: {
    flex: 1,
  },
  eventType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: "#64748B",
  },
  emptyCard: {
    backgroundColor: "#F8FAFC",
    padding: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
  },
});
