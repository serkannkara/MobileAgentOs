package ai.mobileagentos.compose.ui

import ai.mobileagentos.compose.agent.MobileAgentRuntime
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf

val LocalMobileAgent = compositionLocalOf<MobileAgentRuntime?> { null }

@Composable
fun MobileAgentProvider(
    agent: MobileAgentRuntime,
    content: @Composable () -> Unit
) {
    CompositionLocalProvider(LocalMobileAgent provides agent) {
        content()
    }
}