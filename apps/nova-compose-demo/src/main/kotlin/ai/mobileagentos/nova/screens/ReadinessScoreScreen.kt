package ai.mobileagentos.nova.screens

import ai.mobileagentos.compose.agent.AgentInput
import ai.mobileagentos.compose.ui.components.ReadinessBadge
import ai.mobileagentos.compose.ui.state.rememberAgentState
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun ReadinessScoreScreen() {
    val agentState = rememberAgentState()
    var hasRunAgent by remember { mutableStateOf(false) }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Mobile AI Readiness Framework",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF1E293B)
        )
        
        Text(
            text = "7-dimension quality measurement for AI-native mobile apps",
            style = MaterialTheme.typography.bodyMedium,
            color = Color(0xFF64748B)
        )
        
        if (!hasRunAgent) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFF0A84FF).copy(alpha = 0.1f)
                )
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        text = "Run the agent to calculate readiness score",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color(0xFF1E293B)
                    )
                    
                    Button(
                        onClick = {
                            agentState.run(AgentInput("Calculate readiness"))
                            hasRunAgent = true
                        },
                        enabled = !agentState.loading
                    ) {
                        Text("Calculate Readiness")
                    }
                }
            }
        }
        
        agentState.output?.let { output ->
            val readinessScore = ai.mobileagentos.compose.readiness.ReadinessScore(
                overall = output.readinessScore,
                dimensions = emptyMap(),
                timestamp = System.currentTimeMillis().toString()
            )
            
            ReadinessBadge(
                readinessScore = readinessScore,
                showDetails = true,
                modifier = Modifier.fillMaxWidth()
            )
            
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xFFF9FAFB)
                )
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = "Tier Labels",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text("🔴 0-40: Not Ready — critical gaps", style = MaterialTheme.typography.bodySmall)
                    Text("🟡 41-70: Needs Work — ship with caution", style = MaterialTheme.typography.bodySmall)
                    Text("🟢 71-85: Good — ready for beta", style = MaterialTheme.typography.bodySmall)
                    Text("🟦 86-100: Excellent — production-ready", style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}