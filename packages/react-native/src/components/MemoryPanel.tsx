import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { MemoryItem } from "@mobileagentos/core";

export interface MemoryPanelProps {
  memories: MemoryItem[];
  onAddMemory: (content: string, tags: string[]) => void;
  onClearMemories: () => void;
}

export function MemoryPanel({
  memories,
  onAddMemory,
  onClearMemories,
}: MemoryPanelProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAddMemory(input.trim(), []);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a memory..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={memories}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No memories yet</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.memoryCard}>
            <Text style={styles.memoryContent}>{item.content}</Text>
            <Text style={styles.memoryTime}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      />

      {memories.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClearMemories}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#0A84FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 20,
  },
  memoryCard: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  memoryContent: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 4,
  },
  memoryTime: {
    fontSize: 12,
    color: "#64748B",
  },
  clearButton: {
    backgroundColor: "#EF4444",
    padding: 12,
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