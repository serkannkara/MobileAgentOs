import Foundation

/// Main runtime that orchestrates the agent pipeline
@MainActor
public final class MobileAgentRuntime {
    private let config: AgentConfig
    private let contextEngine: ContextEngine
    private let memoryEngine: MemoryEngine
    private let privacyGuard: PrivacyGuard
    private let actionRouter: ActionRouter
    private let feedbackLoop: FeedbackLoop
    private let readinessCalculator: MobileAIReadiness
    
    private var currentSession: AgentSession?
    
    public init(config: AgentConfig) {
        self.config = config
        self.contextEngine = ContextEngine()
        self.memoryEngine = MemoryEngine(store: InMemoryStore())
        self.privacyGuard = PrivacyGuard()
        self.actionRouter = ActionRouter()
        self.feedbackLoop = FeedbackLoop()
        self.readinessCalculator = MobileAIReadiness()
    }
    
    public func run(_ input: AgentInput) async -> AgentOutput {
        var session = AgentSession(userId: config.userId)
        currentSession = session
        
        // Event 1: Input received
        let inputEvent = AgentEvent(type: .inputReceived, metadata: ["text": input.text])
        session.addEvent(inputEvent)
        feedbackLoop.trackEvent(inputEvent)
        
        // Event 2: Context snapshot
        let context = config.enableContext ? contextEngine.captureSnapshot() : nil
        let contextEvent = AgentEvent(type: .contextSnapshotCreated, metadata: [
            "platform": context?.platform ?? "unknown"
        ])
        session.addEvent(contextEvent)
        feedbackLoop.trackEvent(contextEvent)
        
        // Event 3: Memory retrieval
        var memories: [MemoryItem] = []
        if config.enableMemory {
            memories = await memoryEngine.retrieve(query: input.text, limit: 5)
        }
        let memoryEvent = AgentEvent(type: .memoryRetrieved, metadata: [
            "count": "\(memories.count)"
        ])
        session.addEvent(memoryEvent)
        feedbackLoop.trackEvent(memoryEvent)
        
        // Event 4: Privacy check
        var finalText = input.text
        var privacyResult: PrivacyResult?
        if config.enablePrivacy {
            privacyResult = privacyGuard.check(text: input.text)
            finalText = privacyResult?.redactedText ?? input.text
        }
        let privacyEvent = AgentEvent(type: .privacyChecked, metadata: [
            "redactions": "\(privacyResult?.redactions.count ?? 0)",
            "isSafe": "\(privacyResult?.isSafe ?? true)"
        ])
        session.addEvent(privacyEvent)
        feedbackLoop.trackEvent(privacyEvent)
        
        // Event 5: Generate response (deterministic for v0.3)
        let response = "Processed: \(finalText)"
        let responseEvent = AgentEvent(type: .agentResponseGenerated, metadata: [
            "length": "\(response.count)"
        ])
        session.addEvent(responseEvent)
        feedbackLoop.trackEvent(responseEvent)
        
        // Event 6: Actions suggested
        var actions: [AgentAction] = []
        if config.enableActions {
            actions = await actionRouter.suggestActions(input: finalText, context: context)
        }
        let actionsEvent = AgentEvent(type: .actionsSuggested, metadata: [
            "count": "\(actions.count)"
        ])
        session.addEvent(actionsEvent)
        feedbackLoop.trackEvent(actionsEvent)
        
        // Event 7: Calculate readiness
        let readinessScore = readinessCalculator.calculate(
            hasContext: context != nil,
            memoryCount: memories.count,
            privacyChecked: privacyResult != nil,
            actionCount: actions.count
        )
        let readinessEvent = AgentEvent(type: .readinessCalculated, metadata: [
            "score": "\(readinessScore)"
        ])
        session.addEvent(readinessEvent)
        feedbackLoop.trackEvent(readinessEvent)
        
        // Event 8: Session completed
        session.complete()
        let completedEvent = AgentEvent(type: .sessionCompleted, metadata: [:])
        session.addEvent(completedEvent)
        feedbackLoop.trackEvent(completedEvent)
        
        currentSession = session
        
        return AgentOutput(
            response: response,
            actions: actions,
            readinessScore: readinessScore,
            events: session.events,
            sessionId: session.id
        )
    }
    
    public func getSession() -> AgentSession? {
        return currentSession
    }
}