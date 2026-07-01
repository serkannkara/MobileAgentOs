package ai.mobileagentos.compose.memory

import ai.mobileagentos.compose.utils.IdGenerator

data class MemoryItem(
    val id: String,
    val userId: String,
    val content: String,
    val tags: List<String>,
    val importance: Float,
    val timestamp: String
) {
    companion object {
        fun create(
            userId: String,
            content: String,
            tags: List<String> = emptyList(),
            importance: Float = 0.5f
        ): MemoryItem {
            return MemoryItem(
                id = IdGenerator.generate("memory"),
                userId = userId,
                content = content,
                tags = tags,
                importance = importance.coerceIn(0f, 1f),
                timestamp = System.currentTimeMillis().toString()
            )
        }
    }
}