package ai.mobileagentos.compose.utils

import kotlin.random.Random

object IdGenerator {
    private val charPool = ('a'..'z') + ('A'..'Z') + ('0'..'9')
    
    fun generate(prefix: String = "", length: Int = 16): String {
        val timestamp = System.currentTimeMillis()
        val randomSuffix = (1..length)
            .map { Random.nextInt(0, charPool.size) }
            .map(charPool::get)
            .joinToString("")
        
        return if (prefix.isNotEmpty()) {
            "${prefix}_${timestamp}_$randomSuffix"
        } else {
            "${timestamp}_$randomSuffix"
        }
    }
}