// # @mobileagentos/compose
//
// Native Android Jetpack Compose adapter for MobileAgentOS.
//
// ## What is this?
//
// `@mobileagentos/compose` is a Kotlin-first Android library that brings MobileAgentOS runtime concepts to native Android applications using Jetpack Compose.
//
// This is **NOT** a React Native Fabric bridge. This is a standalone native Android implementation.
//
// ## Core Concepts
//
// The Compose adapter mirrors the same runtime concepts from MobileAgentOS v0.1:
//
// - **MobileAgentRuntime** — Orchestrates the agent pipeline
// - **ContextEngine** — Captures user and device context
// - **MemoryEngine** — Manages in-memory user memories
// - **PrivacyGuard** — Detects and redacts PII (email, phone, tokens, etc.)
// - **ActionRouter** — Routes and executes agent actions
// - **FeedbackLoop** — Tracks runtime events and feedback
// - **ReadinessScore** — 7-dimension quality measurement
//
// ## Installation
//
// ### Gradle (Kotlin DSL)
//
// ```kotlin
// dependencies {
//     implementation(project(":packages:compose"))
// }
// ```
//
// ## Usage
//
// ### 1. Create MobileAgentRuntime
//
// ```kotlin
// val agent = MobileAgentRuntime(
//     AgentConfig(
//         name = "MyAgent",
//         userId = "user-123",
//         context = ContextEngine(),
//         memory = MemoryEngine(InMemoryStore()),
//         privacy = PrivacyGuard(),
//         actions = ActionRouter()
//     )
// )
// ```
//
// ### 2. Wrap your Compose app with MobileAgentProvider
//
// ```kotlin
// @Composable
// fun MyApp() {
//     MobileAgentProvider(agent = agent) {
//         // Your app content
//         MyScreen()
//     }
// }
// ```
//
// ### 3. Use agent state in your composables
//
// ```kotlin
// @Composable
// fun MyScreen() {
//     val agentState = rememberAgentState()
//     
//     Button(
//         onClick = {
//             agentState.run(AgentInput("Hello, agent!"))
//         }
//     ) {
//         Text("Run Agent")
//     }
//     
//     agentState.output?.let { output ->
//         Text("Response: ${output.response}")
//         Text("Readiness: ${output.readinessScore}")
//     }
// }
// ```
//
// ### 4. Use UI Components
//
// ```kotlin
// @Composable
// fun MyFeatureScreen() {
//     val agent = LocalMobileAgent.current
//     
//     Column {
//         // Agent timeline
//         AgentTimeline(events = agent.getSession().events)
//         
//         // Memory panel
//         MemoryPanel(
//             userId = "user-123",
//             memoryEngine = agent.getConfig().memory
//         )
//         
//         // Privacy card
//         PrivacyModeCard(
//             privacyGuard = agent.getConfig().privacy
//         )
//         
//         // Readiness badge
//         ReadinessBadge(
//             readinessScore = myReadinessScore,
//             showDetails = true
//         )
//     }
// }
// ```
//
// ## Components
//
// - `AgentTimeline` — Visualizes runtime pipeline events
// - `MemoryPanel` — Lists and manages memory items
// - `ActionCenter` — Executes and tracks actions
// - `PrivacyModeCard` — Tests PII detection and redaction
// - `ReadinessBadge` — Displays readiness score and tier
//
// ## Testing
//
// Run unit tests:
//
// ```bash
// ./gradlew :packages:compose:test
// ```
//
// ## Dependencies
//
// - Kotlin 1.9.20
// - Jetpack Compose (Material 3)
// - Coroutines 1.7.3
// - AndroidX Core
//
// ## Architecture
//
// This package follows the same runtime pipeline as v0.1:
//
// ```
// User Input
//   ↓
// Context Snapshot
//   ↓
// Memory Retrieval
//   ↓
// Privacy Guard
//   ↓
// Agent Runtime
//   ↓
// Action Router
//   ↓
// Feedback Loop
//   ↓
// Readiness Score
// ```
//
// ## Limitations (v0.2)
//
// - No real LLM provider (deterministic responses only)
// - In-memory storage only (no Room/DataStore persistence)
// - No network layer
// - No dependency injection framework
//
// ## License
//
// MIT License — see root LICENSE file for details.