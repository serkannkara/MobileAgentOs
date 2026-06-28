import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { createMemoryItem, MemoryItem } from "@mobileagentos/core";

export default function LocalMemoryScreen() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    const memory = createMemoryItem("demo-user", input.trim(), [], 0.5);
    setMemories([memory, ...memories]);
    setInput("");
  };

  const handleClear = () => {
    setMemories([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Local Memory</Text>
      <Text style={styles.subtitle}>
        Add and retrieve memories using InMemoryStore
      </Text>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Add Memory</Text>
        <TextInput
          style={styles.input}
          placeholder="Try: I prefer morning workouts"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Save Memory</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>
          Stored Memories ({memories.length})
        </Text>
        
        {memories.length === 0 ? (
          <Text style={styles.emptyText}>No memories yet</Text>
        ) : (
          <View>
            {memories.map((item) => (
              <View key={item.id} style={styles.memoryItem}>
                <Text style={styles.memoryContent}>{item.content}</Text>
                <Text style={styles.memoryTime}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}

        {memories.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
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
    minHeight: 60,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0A84FF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 40,
  },
  memoryItem: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#14B8A6",
  },
  memoryContent: {
    fontSize: 16,
    color: "#1E293B",
    marginBottom: 8,
  },
  memoryTime: {
    fontSize: 14,
    color: "#64748B",
  },
  clearButton: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});