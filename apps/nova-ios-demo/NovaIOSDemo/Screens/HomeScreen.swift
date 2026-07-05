import SwiftUI
import MobileAgentOS

struct HomeScreen: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Text("MobileAgentOS")
                        .font(.largeTitle.bold())
                    
                    Text("NOVA iOS Demo")
                        .font(.title2)
                        .foregroundColor(.secondary)
                    
                    Text("Native SwiftUI reference app for AI-native mobile architecture")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                .padding(.top, 40)
                
                VStack(spacing: 16) {
                    FeatureCard(
                        icon: "timeline.selection",
                        title: "Agent Timeline",
                        description: "Visualize the 8-event runtime pipeline",
                        destination: AnyView(AgentTimelineScreen())
                    )
                    
                    FeatureCard(
                        icon: "brain.head.profile",
                        title: "Local Memory",
                        description: "Store and retrieve user memories",
                        destination: AnyView(LocalMemoryScreen())
                    )
                    
                    FeatureCard(
                        icon: "bolt.circle",
                        title: "Action Center",
                        description: "Execute safe native actions",
                        destination: AnyView(ActionCenterScreen())
                    )
                    
                    FeatureCard(
                        icon: "lock.shield",
                        title: "Privacy Mode",
                        description: "Test PII detection and redaction",
                        destination: AnyView(PrivacyModeScreen())
                    )
                    
                    FeatureCard(
                        icon: "chart.bar.fill",
                        title: "Readiness Score",
                        description: "7-dimension AI quality measurement",
                        destination: AnyView(ReadinessScoreScreen())
                    )
                }
                .padding(.horizontal)
            }
            .padding(.bottom, 40)
        }
        .navigationTitle("NOVA")
    }
}

struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String
    let destination: AnyView
    
    var body: some View {
        NavigationLink(destination: destination) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.title)
                    .foregroundColor(.blue)
                    .frame(width: 50)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text(description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.secondary)
            }
            .padding()
            .background(Color.secondary.opacity(0.1))
            .cornerRadius(12)
        }
    }
}