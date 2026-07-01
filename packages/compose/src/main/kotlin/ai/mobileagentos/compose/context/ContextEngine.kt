package ai.mobileagentos.compose.context

class ContextEngine {
    private val signals: MutableMap<String, ContextSignal> = mutableMapOf()
    
    fun addSignal(signal: ContextSignal) {
        val key = "${signal.type}:${signal.key}"
        signals[key] = signal
    }
    
    fun getSignal(type: ContextSignalType, key: String): ContextSignal? {
        return signals["${type}:${key}"]
    }
    
    fun snapshot(userId: String): ContextSnapshot {
        return ContextSnapshot(
            userId = userId,
            timestamp = System.currentTimeMillis().toString(),
            signals = signals.values.toList()
        )
    }
    
    fun clear() {
        signals.clear()
    }
}