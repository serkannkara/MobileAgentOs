import SwiftUI

/// Card for displaying privacy check results
public struct PrivacyModeCard: View {
    public let result: PrivacyResult?
    
    public init(result: PrivacyResult?) {
        self.result = result
    }
    
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: result?.isSafe ?? true ? "lock.fill" : "exclamationmark.triangle.fill")
                    .foregroundColor(result?.isSafe ?? true ? .green : .orange)
                
                Text(result?.isSafe ?? true ? "Privacy Safe" : "PII Detected")
                    .font(.headline)
            }
            
            if let result {
                if !result.redactions.isEmpty {
                    Text("Redactions:")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    
                    ForEach(result.redactions) { redaction in
                        HStack {
                            Text(redaction.type.rawValue.uppercased())
                                .font(.caption)
                                .padding(4)
                                .background(Color.orange.opacity(0.2))
                                .cornerRadius(4)
                            
                            Text("→")
                                .foregroundColor(.secondary)
                            
                            Text(redaction.replacement)
                                .font(.caption)
                        }
                    }
                }
                
                Divider()
                
                VStack(alignment: .leading, spacing: 8) {
                    Text("Redacted Text:")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text(result.redactedText)
                        .font(.body)
                        .padding(8)
                        .background(Color.secondary.opacity(0.1))
                        .cornerRadius(4)
                }
            }
        }
        .padding()
        .background(Color.secondary.opacity(0.1))
        .cornerRadius(12)
    }
}