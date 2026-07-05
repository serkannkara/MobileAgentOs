import SwiftUI
import MobileAgentOS

struct AgentTimelineScreen: View {
    @Environment(\.agentState) var agentState
    @State private var inputText: String = ""
    
    var body: some View {
        VStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 12) {
                Text("Enter your request:")
                    .font(.headline)
                
                TextField("e.g., Help me focus for the next 45 minutes", text: $inputText, axis: .vertical)
                    .textFieldStyle(.roundedBorder)
                    .lineLimit(3...6)
                
                Button(action: runAgent) {
                    if agentState.isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle())
                    } else {
                        Label("Run Agent", systemImage: "play.fill")
                    }
                }
                .buttonStyle(.borderedProminent)
                .disabled(inputText.isEmpty || agentState.isLoading)
            }
            .padding()
            .background(Color.secondary.opacity(0.1))
            .cornerRadius(12)
            
            if let output = agentState.output {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Response:")
                        .font(.headline)
                    
                    Text(output.response)
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(8)
                }
                .padding()
                
                Text("Pipeline Events")
                    .font(.title2.bold())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                
                AgentTimelineView(events: output.events)
            } else {
                Spacer()
                Text("Enter a request and run the agent to see the pipeline")
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                Spacer()
            }
        }
        .padding()
        .navigationTitle("Agent Timeline")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func runAgent() {
        Task {
            await agentState.run(AgentInput(text: inputText))
        }
    }
}