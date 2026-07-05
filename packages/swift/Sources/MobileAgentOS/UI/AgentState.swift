import Foundation
import SwiftUI

// Observable state for agent runtime in SwiftUI
@MainActor
public final class AgentState: ObservableObject {
    @Published public var output: AgentOutput?
    @Published public var isLoading: Bool = false
    @Published public var error: String?
    
    private let runtime: MobileAgentRuntime
    
    public init(config: AgentConfig = AgentConfig(name: "DefaultAgent", userId: "user-default")) {
        self.runtime = MobileAgentRuntime(config: config)
    }
    
    public func run(_ input: AgentInput) async {
        isLoading = true
        error = nil
        
        let result = await runtime.run(input)
        output = result
        isLoading = false
    }
    
    public func getSession() -> AgentSession? {
        return runtime.getSession()
    }
}