package ai.mobileagentos.compose.feedback

import ai.mobileagentos.compose.utils.IdGenerator

enum class FeedbackEventType {
    USER_INTERACTION,
    PRIVACY_REDACTED,
    ACTION_EXECUTED,
    ERROR_OCCURRED,
    SESSION_COMPLETED,
    CUSTOM
}

data class FeedbackEvent(
    val id: String,
    val type: FeedbackEventType,
    val sessionId: String,
    val timestamp: String,
    val data: Map<String, Any>? = null
) {
    companion object {
        fun create(
            type: FeedbackEventType,
            sessionId: String,
            data: Map<String, Any>? = null
        ): FeedbackEvent {
            return FeedbackEvent(
                id = IdGenerator.generate("feedback"),
                type = type,
                sessionId = sessionId,
                timestamp = System.currentTimeMillis().toString(),
                data = data
            )
        }
    }
}