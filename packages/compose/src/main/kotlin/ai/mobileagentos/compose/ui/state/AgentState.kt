package ai.mobileagentos.compose.ui.state

import ai.mobileagentos.compose.agent.AgentInput
import ai.mobileagentos.compose.agent.AgentOutput
import ai.mobileagentos.compose.ui.LocalMobileAgent
import androidx.compose.runtime.*
import kotlinx.coroutines.launch

data class AgentState(
    val loading: Boolean,
    val error: Throwable?,
    val output: AgentOutput?,
    val run: (AgentInput) -> Unit,
    val reset: () -> Unit
)

@Composable
fun rememberAgentState(): AgentState {
    val agent = LocalMobileAgent.current 
        ?: error("MobileAgentProvider must be used to provide MobileAgentRuntime")
    
    val scope = rememberCoroutineScope()
    var loading by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<Throwable?>(null) }
    var output by remember { mutableStateOf<AgentOutput?>(null) }
    
    val run: (AgentInput) -> Unit = { input ->
        scope.launch {
            loading = true
            error = null
            try {
                output = agent.run(input)
            } catch (e: Exception) {
                error = e
            } finally {
                loading = false
            }
        }
    }
    
    val reset: () -> Unit = {
        loading = false
        error = null
        output = null
    }
    
    return AgentState(
        loading = loading,
        error = error,
        output = output,
        run = run,
        reset = reset
    )
}