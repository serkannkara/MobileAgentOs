import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createDefaultPrivacyGuard } from "@mobileagentos/core";

export function PrivacyModeCard() {
  const [input, setInput] = useState("");
  const [redacted, setRedacted] = useState<string | null>(null);
  const [redactionCount, setRedactionCount] = useState(0);

  const privacyGuard = createDefaultPrivacyGuard();

  const handleCheck = () => {
    const result = privacyGuard.redact(input);
    setRedacted(result.redactedText);
    setRedactionCount(result.redactions.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Guard Test</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter text to check for PII..."
        value={input}
        onChangeText={setInput}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCheck}>
        <Text style={styles.buttonText}>Check Privacy</Text>
      </TouchableOpacity>

      {redacted !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Redacted Output:</Text>
          <Text style={styles.resultText}>{redacted}</Text>
          
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {redactionCount === 0
                ? "✅ No sensitive data detected"
                : `⚠️ ${redactionCount} redaction${redactionCount > 1 ? "s" : ""} applied`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#0A84FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  resultContainer: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 12,
  },
  statsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
  },
  statsText: {
    fontSize: 12,
    color: "#64748B",
  },
});