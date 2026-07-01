package ai.mobileagentos.compose.ui.components

import ai.mobileagentos.compose.actions.ActionRouter
import ai.mobileagentos.compose.actions.ActionResult
import ai.mobileagentos.compose.actions.AgentAction
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

@Composable
fun ActionCenter(
    actionRouter: ActionRouter?,
    modifier: Modifier = Modifier
) {
    var actionHistory by remember { mutableStateOf<List<ActionResult>>(emptyList()) }
    var showTestDialog by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    
    Column(modifier = modifier.fillMaxSize()) {
        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Action Center",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1E293B)
            )
            
            Button(
                onClick = { showTestDialog = true },
                enabled = actionRouter != null
            ) {
                Text("Test Action")
            }
        }
        
        if (actionRouter == null) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "Action router not available",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        } else if (actionHistory.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No actions executed yet",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
            ) {
                items(actionHistory) { result ->
                    ActionResultCard(result = result)
                }
            }
        }
    }
    
    if (showTestDialog) {
        TestActionDialog(
            onDismiss = { showTestDialog = false },
            onExecute = { actionType ->
                scope.launch {
                    val action = AgentAction.create(
                        type = actionType,
                        parameters = mapOf("test" to true)
                    )
                    actionRouter?.registerHandler(actionType) { 
                        "Action executed: $actionType"
                    }
                    val result = actionRouter?.execute(action)
                    if (result != null) {
                        actionHistory = actionRouter.getHistory()
                    }
                    showTestDialog = false
                }
            }
        )
    }
}

@Composable
private fun ActionResultCard(result: ActionResult) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (result.success) 
                Color(0xFF10B981).copy(alpha = 0.1f)
            else 
                Color(0xFFEF4444).copy(alpha = 0.1f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = if (result.success) Icons.Default.CheckCircle else Icons.Default.Close,
                contentDescription = null,
                tint = if (result.success) Color(0xFF10B981) else Color(0xFFEF4444)
            )
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (result.success) "Success" else "Failed",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF1E293B)
                )
                
                Spacer(modifier = Modifier.height(4.dp))
                
                Text(
                    text = result.result?.toString() ?: result.error ?: "Unknown",
                    style = MaterialTheme.typography.bodySmall,
                    color = Color(0xFF64748B)
                )
            }
        }
    }
}

@Composable
private fun TestActionDialog(
    onDismiss: () -> Unit,
    onExecute: (String) -> Unit
) {
    var actionType by remember { mutableStateOf("") }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Test Action") },
        text = {
            OutlinedTextField(
                value = actionType,
                onValueChange = { actionType = it },
                label = { Text("Action Type") },
                placeholder = { Text("e.g. send_notification") },
                modifier = Modifier.fillMaxWidth()
            )
        },
        confirmButton = {
            Button(
                onClick = { if (actionType.isNotBlank()) onExecute(actionType) }
            ) {
                Text("Execute")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}