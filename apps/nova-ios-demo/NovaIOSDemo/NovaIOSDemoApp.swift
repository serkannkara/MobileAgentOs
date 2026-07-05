import SwiftUI
import MobileAgentOS

@main
struct NovaIOSDemoApp: App {
    @StateObject private var agentState = AgentState(
        config: AgentConfig(
            name: "NOVA",
            userId: "demo-user"
        )
    )
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .agentProvider(agentState)
        }
    }
}