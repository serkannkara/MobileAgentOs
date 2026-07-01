package ai.mobileagentos.compose

import ai.mobileagentos.compose.readiness.*
import org.junit.Assert.*
import org.junit.Test

class ReadinessScoreTest {
    
    @Test
    fun `calculate readiness score`() {
        val dimensions = mapOf(
            ReadinessDimension.CONTEXT_AWARENESS to DimensionScore(80),
            ReadinessDimension.MEMORY_QUALITY to DimensionScore(75),
            ReadinessDimension.PRIVACY_SAFETY to DimensionScore(85),
            ReadinessDimension.ACTION_RELIABILITY to DimensionScore(70),
            ReadinessDimension.OFFLINE_RESILIENCE to DimensionScore(60),
            ReadinessDimension.UX_CONTINUITY to DimensionScore(75),
            ReadinessDimension.APP_STORE_READINESS to DimensionScore(60)
        )
        
        val score = ReadinessScore.calculate(dimensions)
        
        assertTrue(score.overall > 0)
        assertTrue(score.overall <= 100)
        assertEquals(dimensions.size, score.dimensions.size)
    }
    
    @Test
    fun `readiness tier classification`() {
        val notReady = ReadinessScore(35, emptyMap(), "")
        assertEquals(ReadinessTier.NOT_READY, notReady.tier)
        
        val needsWork = ReadinessScore(55, emptyMap(), "")
        assertEquals(ReadinessTier.NEEDS_WORK, needsWork.tier)
        
        val good = ReadinessScore(75, emptyMap(), "")
        assertEquals(ReadinessTier.GOOD, good.tier)
        
        val excellent = ReadinessScore(90, emptyMap(), "")
        assertEquals(ReadinessTier.EXCELLENT, excellent.tier)
    }
    
    @Test
    fun `MobileAIReadiness calculates correctly`() {
        val readiness = MobileAIReadiness()
        
        val input = ReadinessInput(
            contextEnabled = true,
            memoryEnabled = true,
            privacyEnabled = true,
            actionsEnabled = true
        )
        
        val score = readiness.calculateReadiness(input)
        
        assertTrue(score.overall > 50)
        assertEquals(7, score.dimensions.size)
    }
}