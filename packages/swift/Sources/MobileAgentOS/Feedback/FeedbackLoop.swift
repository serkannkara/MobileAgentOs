import Foundation

/// Tracks events and user feedback
public final class FeedbackLoop {
    private var events: [FeedbackEvent] = []
    
    public init() {}
    
    public func trackEvent(_ agentEvent: AgentEvent) {
        let feedbackEvent = FeedbackEvent(
            type: agentEvent.type.rawValue,
            metadata: agentEvent.metadata
        )
        events.append(feedbackEvent)
    }
    
    public func trackCustom(type: String, metadata: [String: String] = [:]) {
        let event = FeedbackEvent(type: type, metadata: metadata)
        events.append(event)
    }
    
    public func getEvents() -> [FeedbackEvent] {
        return events
    }
    
    public func clear() {
        events.removeAll()
    }
}