package ai.mobileagentos.nova.navigation

import ai.mobileagentos.nova.screens.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable

@Composable
fun NavGraph(
    navController: NavHostController,
    onScreenChange: (Screen) -> Unit
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Home.route) {
            LaunchedEffect(Unit) { onScreenChange(Screen.Home) }
            HomeScreen(
                onNavigate = { screen ->
                    navController.navigate(screen.route)
                }
            )
        }
        
        composable(Screen.AgentTimeline.route) {
            LaunchedEffect(Unit) { onScreenChange(Screen.AgentTimeline) }
            AgentTimelineScreen()
        }
        
        composable(Screen.LocalMemory.route) {
            LaunchedEffect(Unit) { onScreenChange(Screen.LocalMemory) }
            LocalMemoryScreen()
        }
        
        composable(Screen.ActionCenter.route) {
            LaunchedEffect(Unit) { onScreenChange(Screen.ActionCenter) }
            ActionCenterScreen()
        }
        
        composable(Screen.PrivacyMode.route) {
            LaunchedEffect(Unit) { onScreenChange(Screen.PrivacyMode) }
            PrivacyModeScreen()
        }
        
        composable(Screen.ReadinessScore.route) {
            LaunchedEffect(Unit) { onScreenChange(Screen.ReadinessScore) }
            ReadinessScoreScreen()
        }
    }
}