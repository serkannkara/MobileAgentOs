package ai.mobileagentos.nova

import ai.mobileagentos.compose.actions.ActionRouter
import ai.mobileagentos.compose.agent.AgentConfig
import ai.mobileagentos.compose.agent.MobileAgentRuntime
import ai.mobileagentos.compose.context.ContextEngine
import ai.mobileagentos.compose.memory.InMemoryStore
import ai.mobileagentos.compose.memory.MemoryEngine
import ai.mobileagentos.compose.privacy.PrivacyGuard
import ai.mobileagentos.compose.ui.MobileAgentProvider
import ai.mobileagentos.nova.navigation.NavGraph
import ai.mobileagentos.nova.navigation.Screen
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.navigation.compose.rememberNavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NovaComposeApp() {
    val navController = rememberNavController()
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Home) }
    
    // Create MobileAgentRuntime
    val agent = remember {
        val config = AgentConfig(
            name = "NOVA",
            userId = "demo-user",
            context = ContextEngine(),
            memory = MemoryEngine(InMemoryStore()),
            privacy = PrivacyGuard(),
            actions = ActionRouter()
        )
        MobileAgentRuntime(config)
    }
    
    MobileAgentProvider(agent = agent) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text(
                            text = currentScreen.title,
                            fontWeight = FontWeight.Bold
                        )
                    },
                    navigationIcon = {
                        if (currentScreen != Screen.Home) {
                            IconButton(onClick = { navController.navigateUp() }) {
                                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                            }
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color.White,
                        titleContentColor = Color(0xFF1E293B)
                    )
                )
            }
        ) { paddingValues ->
            Box(modifier = Modifier.padding(paddingValues)) {
                NavGraph(
                    navController = navController,
                    onScreenChange = { currentScreen = it }
                )
            }
        }
    }
}