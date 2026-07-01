 # Compose Adapter Guide

 MobileAgentOS v0.2 introduces a native Android Jetpack Compose adapter.

 ## What is the Compose Adapter?

 The Compose adapter is a **Kotlin-first native Android library** that brings MobileAgentOS runtime concepts to Android apps using Jetpack Compose.

 ### What it is NOT

 - **NOT** a React Native Fabric bridge
 - **NOT** Compose inside React Native
 - **NOT** JSI/TurboModules
 - **NOT** using the old React Native bridge

 ### What it IS

 - Pure Kotlin implementation
 - Native Jetpack Compose UI
 - Material 3 design system
 - Coroutines for async operations
 - Zero React Native dependency

 ## Architecture Mapping

 The Compose adapter mirrors v0.1 TypeScript concepts in native Kotlin:

 | TypeScript (v0.1) | Kotlin (v0.2) |
 |-------------------|---------------|
 | `AgentRuntime` class | `MobileAgentRuntime` class |
 | `ContextEngine` class | `ContextEngine` class |
 | `MemoryStore` interface | `MemoryStore` interface |
 | `InMemoryStore` class | `InMemoryStore` class |
 | `PrivacyGuard` class | `PrivacyGuard` class |
 | `ActionRouter` class | `ActionRouter` class |
 | `FeedbackLoop` class | `FeedbackLoop` class |
 | `ReadinessScore` type | `ReadinessScore` data class |
 | `useState` | `remember { mutableStateOf() }` |
 | `useEffect` | `LaunchedEffect` |
 | `useContext` | `CompositionLocal` |
 | Promise-based async | Coroutines (`suspend fun`) |

 ## Runtime Pipeline

 The same pipeline from v0.1 works in v0.2:

 ```
 User Input
   ↓
 Context Snapshot (ContextEngine)
   ↓
 Memory Retrieval (MemoryEngine)
   ↓
 Privacy Guard (PrivacyGuard)
   ↓
 Agent Runtime (MobileAgentRuntime)
   ↓
 Action Router (ActionRouter)
   ↓
 Feedback Loop (FeedbackLoop)
   ↓
 Readiness Score (MobileAIReadiness)
 ```

 ## Quick Start

 ### 1. Add dependency

 In your `build.gradle.kts`:

 ```kotlin
 dependencies {
     implementation(project(":packages:compose"))
 }
 ```

 ### 2. Create agent

 ```kotlin
 val agent = MobileAgentRuntime(
     AgentConfig(
         name = "MyAgent",
         userId = "user-123",
         context = ContextEngine(),
         memory = MemoryEngine(InMemoryStore()),
         privacy = PrivacyGuard(),
         actions = ActionRouter()
     )
 )
 ```

 ### 3. Provide agent

 ```kotlin
 @Composable
 fun App() {
     MobileAgentProvider(agent = agent) {
         MyScreen()
     }
 }
 ```

 ### 4. Use agent state

 ```kotlin
 @Composable
 fun MyScreen() {
     val agentState = rememberAgentState()
     
     Button(onClick = {
         agentState.run(AgentInput("Hello"))
     }) {
         Text("Run Agent")
     }
     
     if (agentState.loading) {
         CircularProgressIndicator()
     }
     
     agentState.output?.let { output ->
         Text("Response: ${output.response}")
         Text("Score: ${output.readinessScore}")
     }
 }
 ```

 ## UI Components

 ### AgentTimeline

 ```kotlin
 @Composable
 fun TimelineScreen() {
     val agent = LocalMobileAgent.current
     val events = agent?.getSession()?.events ?: emptyList()
     
     AgentTimeline(events = events)
 }
 ```

 ### MemoryPanel

 ```kotlin
 @Composable
 fun MemoryScreen() {
     val agent = LocalMobileAgent.current
     val memoryEngine = agent?.getConfig()?.memory
     
     MemoryPanel(
         userId = "user-123",
         memoryEngine = memoryEngine
     )
 }
 ```

 ### ActionCenter

 ```kotlin
 @Composable
 fun ActionsScreen() {
     val agent = LocalMobileAgent.current
     val actionRouter = agent?.getConfig()?.actions
     
     ActionCenter(actionRouter = actionRouter)
 }
 ```

 ### PrivacyModeCard

 ```kotlin
 @Composable
 fun PrivacyScreen() {
     val privacyGuard = remember { PrivacyGuard() }
     
     PrivacyModeCard(privacyGuard = privacyGuard)
 }
 ```

 ### ReadinessBadge

 ```kotlin
 @Composable
 fun ScoreScreen() {
     val readinessScore = remember {
         ReadinessScore(
             overall = 75,
             dimensions = myDimensions,
             timestamp = System.currentTimeMillis().toString()
         )
     }
     
     ReadinessBadge(
         readinessScore = readinessScore,
         showDetails = true
     )
 }
 ```

 ## Testing

 Run unit tests:

 ```bash
 ./gradlew :packages:compose:test
 ```

 Example test:

 ```kotlin
 @Test
 fun `privacy guard redacts email`() = runTest {
     val guard = PrivacyGuard()
     val result = guard.redact("Email: test@example.com")
     
     assertFalse(result.safe)
     assertTrue(result.redactedText.contains("[REDACTED_EMAIL]"))
 }
 ```

 ## State Management

 The Compose adapter uses:

 - **CompositionLocal** for dependency injection
 - **remember + mutableStateOf** for local state
 - **Coroutines** for async operations
 - **StateFlow** where appropriate

 Example:

 ```kotlin
 @Composable
 fun rememberAgentState(): AgentState {
     val agent = LocalMobileAgent.current 
         ?: error("MobileAgentProvider required")
     
     val scope = rememberCoroutineScope()
     var loading by remember { mutableStateOf(false) }
     var output by remember { mutableStateOf<AgentOutput?>(null) }
     
     val run: (AgentInput) -> Unit = { input ->
         scope.launch {
             loading = true
             output = agent.run(input)
             loading = false
         }
     }
     
     return AgentState(loading, output, run)
 }
 ```

 ## Design System

 The Compose adapter uses Material 3 with MobileAgentOS colors:

 ```kotlin
 private val LightColorScheme = lightColorScheme(
     primary = Color(0xFF0A84FF),        // Electric Blue
     secondary = Color(0xFF14B8A6),      // Teal
     background = Color(0xFFFFFFFF),     // White
     surface = Color(0xFFF9FAFB),        // Light Gray
     onBackground = Color(0xFF1E293B)    // Navy
 )
 ```

 ## Comparison: React Native vs Compose

 ### React Native (v0.1)

 ```typescript
 const agent = createMobileAgent({
   name: "NOVA",
   userId: "demo-user",
   memory: new InMemoryStore(),
   privacy: createDefaultPrivacyGuard()
 });

 export default function App() {
   return (
     <MobileAgentProvider agent={agent}>
       <HomeScreen />
     </MobileAgentProvider>
   );
 }
 ```

 ### Compose (v0.2)

 ```kotlin
 val agent = MobileAgentRuntime(
     AgentConfig(
         name = "NOVA",
         userId = "demo-user",
         memory = MemoryEngine(InMemoryStore()),
         privacy = PrivacyGuard()
     )
 )

 @Composable
 fun App() {
     MobileAgentProvider(agent = agent) {
         HomeScreen()
     }
 }
 ```

 ## Migration from v0.1

 If you're coming from React Native v0.1:

 1. **Runtime concepts are the same** — just in Kotlin
 2. **Replace hooks with Compose state** — `useState` → `remember`
 3. **Replace promises with coroutines** — `async/await` → `suspend fun`
 4. **Replace Context API with CompositionLocal** — similar pattern
 5. **UI components match 1:1** — same names, Compose syntax

 ## Limitations (v0.2)

 - No real LLM provider (deterministic responses)
 - In-memory storage only (no Room/DataStore)
 - No DI framework (Hilt/Dagger)
 - No network layer

 These will be addressed in future versions.

 ## Next Steps

 - Explore the NOVA Compose Demo app
 - Read the `packages/compose/README.md`
 - Run unit tests: `./gradlew :packages:compose:test`
 - Build demo: `./gradlew :apps:nova-compose-demo:assembleDebug`

 ## Resources

 - [Jetpack Compose Docs](https://developer.android.com/jetpack/compose)
 - [Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)
 - [Material 3 for Compose](https://m3.material.io/)
