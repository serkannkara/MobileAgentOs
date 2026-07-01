package ai.mobileagentos.compose.feedback

class FeedbackLoop(private val sessionId: String) {
    private val events: MutableList<FeedbackEvent> = mutableListOf()
    
    fun recordEvent(type: FeedbackEventType, data: Map<String, Any>? = null): FeedbackEvent {
        val event = FeedbackEvent.create(type, sessionId, data)
        events.add(event)
        return event
    }
    
    fun getEvents(): List<FeedbackEvent> = events.toList()
    
    fun getEventsByType(type: FeedbackEventType): List<FeedbackEvent> {
        return events.filter { it.type == type }
    }
    
    fun clearEvents() {
        events.clear()
    }
}