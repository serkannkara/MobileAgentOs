package ai.mobileagentos.nova.screens

import ai.mobileagentos.compose.ui.LocalMobileAgent
import ai.mobileagentos.compose.ui.components.ActionCenter
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun ActionCenterScreen() {
    val agent = LocalMobileAgent.current
    val actionRouter = agent?.getConfig()?.actions
    
    ActionCenter(
        actionRouter = actionRouter,
        modifier = Modifier.fillMaxSize()
    )
}