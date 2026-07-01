package ai.mobileagentos.compose.ui.components

import ai.mobileagentos.compose.readiness.ReadinessScore
import ai.mobileagentos.compose.readiness.ReadinessTier
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun ReadinessBadge(
    readinessScore: ReadinessScore?,
    showDetails: Boolean = false,
    modifier: Modifier = Modifier
) {
    if (readinessScore == null) {
        Card(
            modifier = modifier,
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFF9FAFB)
            )
        ) {
            Box(
                modifier = Modifier.padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No readiness data",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
        return
    }
    
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = getTierColor(readinessScore.tier).copy(alpha = 0.1f)
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Readiness Score",
                        style = MaterialTheme.typography.labelMedium,
                        color = Color(0xFF64748B)
                    )
                    Text(
                        text = "${readinessScore.overall}/100",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                        color = getTierColor(readinessScore.tier)
                    )
                }
                
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = getTierColor(readinessScore.tier)
                ) {
                    Text(
                        text = readinessScore.tier.label,
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.White,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                    )
                }
            }
            
            if (showDetails) {
                Divider()
                
                readinessScore.dimensions.forEach { (dimension, score) ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = dimension.name.replace("_", " ").lowercase()
                                .replaceFirstChar { it.uppercase() },
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFF64748B)
                        )
                        Text(
                            text = "${score.score}",
                            style = MaterialTheme.typography.bodySmall,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(0xFF1E293B)
                        )
                    }
                }
            }
        }
    }
}

private fun getTierColor(tier: ReadinessTier): Color {
    return when (tier) {
        ReadinessTier.NOT_READY -> Color(0xFFEF4444)
        ReadinessTier.NEEDS_WORK -> Color(0xFFF59E0B)
        ReadinessTier.GOOD -> Color(0xFF10B981)
        ReadinessTier.EXCELLENT -> Color(0xFF3B82F6)
    }
}