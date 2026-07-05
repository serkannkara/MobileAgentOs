import SwiftUI

/// Displays and executes agent actions
public struct ActionCenterView: View {
    public let actions: [AgentAction]
    public let onExecute: ((AgentAction) -> Void)?
    
    public init(
        actions: [AgentAction],
        onExecute: ((AgentAction) -> Void)? = nil
    ) {
        self.actions = actions
        self.onExecute = onExecute
    }
    
    public var body: some View {
        VStack(spacing: 12) {
            if actions.isEmpty {
                Text("No actions suggested")
                    .foregroundColor(.secondary)
                    .padding()
            } else {
                ForEach(actions) { action in
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(action.type)
                                .font(.headline)
                            
                            Text(action.description)
                                .font(.caption)
                                .foregroundColor(.secondary)
                            
                            if action.requiresConfirmation {
                                Text("⚠️ Requires confirmation")
                                    .font(.caption2)
                                    .foregroundColor(.orange)
                            }
                        }
                        
                        Spacer()
                        
                        if let onExecute {
                            Button("Execute") {
                                onExecute(action)
                            }
                            .buttonStyle(.borderedProminent)
                        }
                    }
                    .padding()
                    .background(Color.secondary.opacity(0.1))
                    .cornerRadius(8)
                }
            }
        }
        .padding()
    }
}