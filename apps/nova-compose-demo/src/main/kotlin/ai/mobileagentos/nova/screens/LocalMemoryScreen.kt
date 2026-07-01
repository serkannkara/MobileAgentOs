package ai.mobileagentos.nova.screens

import ai.mobileagentos.compose.ui.LocalMobileAgent
import ai.mobileagentos.compose.ui.components.MemoryPanel
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun LocalMemoryScreen() {
    val agent = LocalMobileAgent.current
    val memoryEngine = agent?.getConfig()?.memory
    
    MemoryPanel(
        userId = "demo-user",
        memoryEngine = memoryEngine,
        modifier = Modifier.fillMaxSize()
    )
}