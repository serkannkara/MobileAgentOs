package ai.mobileagentos.compose.ui.components

import ai.mobileagentos.compose.privacy.PrivacyGuard
import ai.mobileagentos.compose.privacy.PrivacyResult
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun PrivacyModeCard(
    privacyGuard: PrivacyGuard?,
    modifier: Modifier = Modifier
) {
    var inputText by remember { mutableStateOf("") }
    var result by remember { mutableStateOf<PrivacyResult?>(null) }
    
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color(0xFFF9FAFB)
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(
                    Icons.Default.Lock,
                    contentDescription = null,
                    tint = Color(0xFF14B8A6)
                )
                Text(
                    text = "Privacy Guard",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF1E293B)
                )
            }
            
            if (privacyGuard == null) {
                Text(
                    text = "Privacy guard not available",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            } else {
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    label = { Text("Test Text") },
                    placeholder = { Text("Enter text with PII (email, phone, etc.)") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 3
                )
                
                Button(
                    onClick = {
                        result = privacyGuard.redact(inputText)
                    },
                    modifier = Modifier.align(Alignment.End),
                    enabled = inputText.isNotBlank()
                ) {
                    Text("Check Privacy")
                }
                
                result?.let { privacyResult ->
                    Divider()
                    
                    // Status badge
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = if (privacyResult.safe) 
                            Color(0xFF10B981).copy(alpha = 0.1f)
                        else 
                            Color(0xFFEF4444).copy(alpha = 0.1f)
                    ) {
                        Text(
                            text = if (privacyResult.safe) "✓ Safe" else "⚠ ${privacyResult.redactions.size} Redaction(s)",
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = FontWeight.SemiBold,
                            color = if (privacyResult.safe) Color(0xFF10B981) else Color(0xFFEF4444),
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                    
                    // Redacted text
                    if (!privacyResult.safe) {
                        Card(
                            colors = CardDefaults.cardColors(
                                containerColor = MaterialTheme.colorScheme.surface
                            )
                        ) {
                            Column(
                                modifier = Modifier.padding(12.dp),
                                verticalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Text(
                                    text = "Redacted Text:",
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = FontWeight.SemiBold,
                                    color = Color(0xFF64748B)
                                )
                                Text(
                                    text = privacyResult.redactedText,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Color(0xFF1E293B)
                                )
                            }
                        }
                        
                        // Redaction details
                        privacyResult.redactions.forEach { redaction ->
                            Text(
                                text = "• ${redaction.type.name}: ${redaction.replacement}",
                                style = MaterialTheme.typography.bodySmall,
                                color = Color(0xFF64748B)
                            )
                        }
                    }
                }
            }
        }
    }
}