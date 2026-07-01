package ai.mobileagentos.nova.navigation

sealed class Screen(val route: String, val title: String) {
    object Home : Screen("home", "NOVA Demo")
    object AgentTimeline : Screen("timeline", "Agent Timeline")
    object LocalMemory : Screen("memory", "Local Memory")
    object ActionCenter : Screen("actions", "Action Center")
    object PrivacyMode : Screen("privacy", "Privacy Mode")
    object ReadinessScore : Screen("readiness", "Readiness Score")
}