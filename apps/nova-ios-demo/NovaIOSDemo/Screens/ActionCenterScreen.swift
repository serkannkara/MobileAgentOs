import SwiftUI
import MobileAgentOS

struct ActionCenterScreen: View {
    @State private var router = ActionRouter()
    @State private var actions: [AgentAction] = []
    @State private var results: [ActionResult] = []
    @State private var inputText: String = ""
    
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Generate Actions")
                        .font(.headline)
                    
                    TextField("e.g., Help me focus and take notes", text: $inputText, axis: .vertical)
                        .textFieldStyle(.roundedBorder)
                        .lineLimit(2...4)
                    
                    Button("Generate Actions") {
                        generateActions()
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(inputText.isEmpty)
                }
                .padding()
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(12)
                
                if actions.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "bolt.circle")
                            .font(.system(size: 60))
                            .foregroundColor(.secondary)
                        
                        Text("No actions suggested yet")
                            .foregroundColor(.secondary)
                    }
                    .padding(.top, 40)
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Suggested Actions (\(actions.count))")
                            .font(.headline)
                        
                        ForEach(actions) { action in
                            HStack {
                                VStack(alignment: .leading, spacing: 6) {
                                    HStack {
                                        Image(systemName: iconForAction(action.type))
                                            .foregroundColor(.blue)
                                        
                                        Text(action.type)
                                            .font(.headline)
                                    }
                                    
                                    Text(action.description)
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                    
                                    if action.requiresConfirmation {
                                        Label("Requires confirmation", systemImage: "exclamationmark.triangle")
                                            .font(.caption2)
                                            .foregroundColor(.orange)
                                    }
                                }
                                
                                Spacer()
                                
                                Button("Execute") {
                                    executeAction(action)
                                }
                                .buttonStyle(.borderedProminent)
                                .controlSize(.small)
                            }
                            .padding()
                            .background(Color.secondary.opacity(0.1))
                            .cornerRadius(8)
                        }
                    }
                }
                
                if !results.isEmpty {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Execution Results")
                            .font(.headline)
                        
                        ForEach(results, id: \.actionId) { result in
                            HStack {
                                Image(systemName: result.success ? "checkmark.circle.fill" : "xmark.circle.fill")
                                    .foregroundColor(result.success ? .green : .red)
                                
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(result.message)
                                        .font(.body)
                                    
                                    Text(result.timestamp.formatted(date: .omitted, time: .shortened))
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                }
                                
                                Spacer()
                            }
                            .padding()
                            .background(result.success ? Color.green.opacity(0.1) : Color.red.opacity(0.1))
                            .cornerRadius(8)
                        }
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Action Center")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func generateActions() {
        Task {
            actions = await router.suggestActions(input: inputText, context: nil)
        }
    }
    
    private func executeAction(_ action: AgentAction) {
        Task {
            let result = await router.execute(action)
            results.insert(result, at: 0)
        }
    }
    
    private func iconForAction(_ type: String) -> String {
        switch type {
        case "createFocusPlan": return "brain"
        case "saveNote": return "note.text"
        case "copySummary": return "doc.on.clipboard"
        case "openURL": return "link"
        case "scheduleFocusBlock": return "calendar"
        default: return "bolt.fill"
        }
    }
}