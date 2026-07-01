package ai.mobileagentos.nova.screens

import ai.mobileagentos.compose.privacy.PrivacyGuard
import ai.mobileagentos.compose.ui.components.PrivacyModeCard
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun PrivacyModeScreen() {
    val privacyGuard = remember { PrivacyGuard() }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        PrivacyModeCard(
            privacyGuard = privacyGuard,
            modifier = Modifier.fillMaxWidth()
        )
    }
}