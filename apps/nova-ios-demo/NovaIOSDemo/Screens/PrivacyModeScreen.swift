import SwiftUI
import MobileAgentOS

struct PrivacyModeScreen: View {
    @State private var privacyGuard = PrivacyGuard()
    @State private var inputText: String = ""
    @State private var result: PrivacyResult?
    
    let exampleTexts = [
        "Email me at serkan@example.com and use token sk_test_123",
        "Call 555-123-4567 or card 4111-1111-1111-1111",
        "SSN: 123-45-6789 and API key pk_live_abc123def456ghi789"
    ]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Test PII Detection")
                        .font(.headline)
                    
                    TextField("Enter text with PII...", text: $inputText, axis: .vertical)
                        .textFieldStyle(.roundedBorder)
                        .lineLimit(3...8)
                    
                    HStack {
                        Button("Check Privacy") {
                            checkPrivacy()
                        }
                        .buttonStyle(.borderedProminent)
                        .disabled(inputText.isEmpty)
                        
                        Spacer()
                        
                        Menu("Examples") {
                            ForEach(exampleTexts, id: \.self) { text in
                                Button(text) {
                                    inputText = text
                                }
                            }
                        }
                        .buttonStyle(.bordered)
                    }
                }
                .padding()
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(12)
                
                if let result {
                    VStack(alignment: .leading, spacing: 16) {
                        HStack {
                            Image(systemName: result.isSafe ? "lock.fill" : "exclamationmark.triangle.fill")
                                .font(.title)
                                .foregroundColor(result.isSafe ? .green : .orange)
                            
                            VStack(alignment: .leading) {
                                Text(result.isSafe ? "Privacy Safe" : "PII Detected")
                                    .font(.title2.bold())
                                
                                Text("\(result.redactions.count) redaction(s) made")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            
                            Spacer()
                        }
                        .padding()
                        .background(result.isSafe ? Color.green.opacity(0.1) : Color.orange.opacity(0.1))
                        .cornerRadius(12)
                        
                        if !result.redactions.isEmpty {
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Detected PII:")
                                    .font(.headline)
                                
                                ForEach(result.redactions) { redaction in
                                    HStack {
                                        Text(redaction.type.rawValue.uppercased())
                                            .font(.caption.bold())
                                            .padding(.horizontal, 8)
                                            .padding(.vertical, 4)
                                            .background(Color.orange)
                                            .foregroundColor(.white)
                                            .cornerRadius(6)
                                        
                                        Image(systemName: "arrow.right")
                                            .foregroundColor(.secondary)
                                        
                                        Text(redaction.replacement)
                                            .font(.caption)
                                            .padding(.horizontal, 8)
                                            .padding(.vertical, 4)
                                            .background(Color.green.opacity(0.2))
                                            .cornerRadius(6)
                                        
                                        Spacer()
                                    }
                                }
                            }
                            .padding()
                            .background(Color.secondary.opacity(0.1))
                            .cornerRadius(12)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Original Text:")
                                .font(.headline)
                            
                            Text(result.originalText)
                                .font(.body)
                                .padding()
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(Color.red.opacity(0.1))
                                .cornerRadius(8)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Redacted Text:")
                                .font(.headline)
                            
                            Text(result.redactedText)
                                .font(.body)
                                .padding()
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(Color.green.opacity(0.1))
                                .cornerRadius(8)
                        }
                    }
                } else {
                    VStack(spacing: 12) {
                        Image(systemName: "lock.shield")
                            .font(.system(size: 60))
                            .foregroundColor(.secondary)
                        
                        Text("Enter text to check for PII")
                            .foregroundColor(.secondary)
                        
                        Text("Supported: Email • Phone • API Key • Token • Credit Card • SSN")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.top, 40)
                }
            }
            .padding()
        }
        .navigationTitle("Privacy Mode")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func checkPrivacy() {
        result = privacyGuard.check(text: inputText)
    }
}