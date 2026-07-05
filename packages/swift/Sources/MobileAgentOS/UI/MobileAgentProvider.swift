import SwiftUI

// Environment key for agent state
struct AgentStateKey: EnvironmentKey {
    @MainActor
    static let defaultValue: AgentState = AgentState()
}

extension EnvironmentValues {
    public var agentState: AgentState {
        get { self[AgentStateKey.self] }
        set { self[AgentStateKey.self] = newValue }
    }
}

extension View {
    // Provides agent state to child views
    public func agentProvider(_ state: AgentState) -> some View {
        environment(\.agentState, state)
    }
}