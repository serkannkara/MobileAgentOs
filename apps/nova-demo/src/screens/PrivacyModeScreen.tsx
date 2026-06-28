import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { createDefaultPrivacyGuard } from "@mobileagentos/core";

const privacyGuard = createDefaultPrivacyGuard();

export default function PrivacyModeScreen() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleTest = () => {
    if (!input.trim()) return;
    const redactionResult = privacyGuard.redact(input);
    setResult(redactionResult);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Mode</Text>
      <Text style={styles.subtitle}>
        Test PII redaction with PrivacyGuard
      </Text>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Test Input</Text>
        <TextInput
          style={styles.input}
          placeholder="Try: My email is test@example.com and phone is 555-1234"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleTest}>
          <Text style={styles.buttonText}>Test Redaction</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Redacted Text</Text>
            <Text style={styles.resultText}>{result.redactedText}</Text>
          </View>

          <View style={[styles.statusCard, result.safe ? styles.safe : styles.unsafe]}>
            <Text style={styles.statusText}>
              {result.safe ? "✓ Safe" : "⚠ PII Detected"}
            </Text>
            <Text style={styles.statusSubtext}>
              {result.redactions.length} redaction(s)
            </Text>
          </View>
        </>
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: "#1E293B",
    lineHeight: 24,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  safe: {
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },
  unsafe: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 14,
    color: "#64748B",
  },
});
