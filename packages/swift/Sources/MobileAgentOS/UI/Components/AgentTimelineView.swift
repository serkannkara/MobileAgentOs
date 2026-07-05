import SwiftUI

/// Displays agent pipeline events as a timeline
public struct AgentTimelineView: View {
    public let events: [AgentEvent]
    
    public init(events: [AgentEvent]) {
        self.events = events
    }
    
    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                ForEach(events) { event in
                    HStack(alignment: .top, spacing: 12) {
                        Circle()
                            .fill(eventColor(for: event.type))
                            .frame(width: 12, height: 12)
                            .padding(.top, 4)
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text(event.type.rawValue)
                                .font(.headline)
                            
                            if !event.metadata.isEmpty {
                                ForEach(Array(event.metadata.keys.sorted()), id: \.self) { key in
                                    if let value = event.metadata[key] {
                                        Text("\(key): \(value)")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                    }
                                }
                            }
                            
                            Text(event.timestamp.formatted())
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                        
                        Spacer()
                    }
                    .padding()
                    .background(Color.secondary.opacity(0.1))
                    .cornerRadius(8)
                }
            }
            .padding()
        }
    }
    
    private func eventColor(for type: AgentEventType) -> Color {
        switch type {
        case .inputReceived: return .blue
        case .contextSnapshotCreated: return .green
        case .memoryRetrieved: return .purple
        case .privacyChecked: return .orange
        case .agentResponseGenerated: return .pink
        case .actionsSuggested: return .cyan
        case .readinessCalculated: return .indigo
        case .sessionCompleted: return .gray
        }
    }
}