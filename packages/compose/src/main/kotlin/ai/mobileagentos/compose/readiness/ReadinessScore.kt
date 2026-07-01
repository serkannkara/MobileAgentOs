package ai.mobileagentos.compose.readiness

data class ReadinessScore(
    val overall: Int,
    val dimensions: Map<ReadinessDimension, DimensionScore>,
    val timestamp: String
) {
    val tier: ReadinessTier
        get() = when {
            overall < 41 -> ReadinessTier.NOT_READY
            overall < 71 -> ReadinessTier.NEEDS_WORK
            overall < 86 -> ReadinessTier.GOOD
            else -> ReadinessTier.EXCELLENT
        }
    
    companion object {
        private val DIMENSION_WEIGHTS = mapOf(
            ReadinessDimension.CONTEXT_AWARENESS to 0.15f,
            ReadinessDimension.MEMORY_QUALITY to 0.15f,
            ReadinessDimension.PRIVACY_SAFETY to 0.20f,
            ReadinessDimension.ACTION_RELIABILITY to 0.20f,
            ReadinessDimension.OFFLINE_RESILIENCE to 0.10f,
            ReadinessDimension.UX_CONTINUITY to 0.10f,
            ReadinessDimension.APP_STORE_READINESS to 0.10f
        )
        
        fun calculate(dimensions: Map<ReadinessDimension, DimensionScore>): ReadinessScore {
            var weightedSum = 0f
            
            dimensions.forEach { (dimension, dimensionScore) ->
                val weight = DIMENSION_WEIGHTS[dimension] ?: 0f
                weightedSum += weight * dimensionScore.score
            }
            
            return ReadinessScore(
                overall = weightedSum.toInt(),
                dimensions = dimensions,
                timestamp = System.currentTimeMillis().toString()
            )
        }
    }
}

enum class ReadinessTier(val label: String, val color: String) {
    NOT_READY("Not Ready", "#EF4444"),
    NEEDS_WORK("Needs Work", "#F59E0B"),
    GOOD("Good", "#10B981"),
    EXCELLENT("Excellent", "#3B82F6")
}