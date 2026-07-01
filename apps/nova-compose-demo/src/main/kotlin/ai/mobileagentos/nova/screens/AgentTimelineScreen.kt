package ai.mobileagentos.nova.screens

import ai.mobileagentos.compose.agent.AgentInput
import ai.mobileagentos.compose.ui.LocalMobileAgent
import ai.mobileagentos.compose.ui.components.AgentTimeline
import ai.mobileagentos.compose.ui.state.rememberAgentState
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun AgentTimelineScreen() {
    val agent = LocalMobileAgent.current
    val agentState = rememberAgentState()
    var inputText by remember { mutableStateOf("") }
    
    Column(modifier = Modifier.fillMaxSize()) {
        // Input section
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    label = { Text("Test Input") },
                    placeholder = { Text("Enter a message to process...") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Button(
                    onClick = {
                        agentState.run(AgentInput(inputText))
                        inputText = ""
                    },
                    modifier = Modifier.fillMaxWidth(),
                    enabled = inputText.isNotBlank() && !agentState.loading
                ) {
                    if (agentState.loading) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(20.dp),
                            color = MaterialTheme.colorScheme.onPrimary
                        )
                    } else {
                        Text("Process with Agent")
                    }
                }
            }
        }
        
        // Timeline
        val events = agentState.output?.events ?: emptyList()
        AgentTimeline(
            events = events,
            modifier = Modifier.weight(1f)
        )
    }
}