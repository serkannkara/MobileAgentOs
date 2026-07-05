// # MobileAgentOS Swift Adapter Guide
// 
// Native iOS Swift implementation for v0.3.
// 
// ## Overview
// 
// The Swift adapter brings the same MobileAgentOS architecture to native iOS with Swift and SwiftUI.
// 
// **This is NOT:**
// - A React Native bridge
// - An Expo wrapper
// - A Kotlin/Compose port
// 
// **This IS:**
// - A Swift-first native iOS implementation
// - The same AI-native mobile patterns
// - Platform-agnostic architecture proven on RN and Android
// 
// ## Architecture
// 
// ### Core Pipeline
// 
// Every agent run executes 8 events:
// 
// 1. \`inputReceived\` — User input captured
// 2. \`contextSnapshotCreated\` — Device/user context captured
// 3. \`memoryRetrieved\` — Relevant memories retrieved
// 4. \`privacyChecked\` — PII detected and redacted
// 5. \`agentResponseGenerated\` — Response created
// 6. \`actionsSuggested\` — Actions prepared
// 7. \`readinessCalculated\` — Quality score computed
// 8. \`sessionCompleted\` — Pipeline finished
// 
// ### Modules
// 
// The Swift package is organized into 8 modules:
// 
// - **Agent** — Runtime orchestration
// - **Context** — Device/user context capture
// - **Memory** — Local storage and retrieval
// - **Privacy** — PII detection and redaction
// - **Actions** — Native action execution
// - **Feedback** — Event tracking
// - **Readiness** — Quality scoring
// - **UI** — SwiftUI components
// 
// ## Installation
// 
// ### Swift Package
// 
// \`\`\`swift
// dependencies: [
//     .package(path: "../packages/swift")
// ]
// \`\`\`
// 
// ### Import
// 
// \`\`\`swift
// import MobileAgentOS
// \`\`\`
// 
// ## Usage
// 
// ### Basic Runtime
// 
// \`\`\`swift
// import MobileAgentOS
// 
// let config = AgentConfig(
//     name: "MyAgent",
//     userId: "user-123"
// )
// 
// let runtime = MobileAgentRuntime(config: config)
// 
// Task {
//     let output = await runtime.run(
//         AgentInput(text: "Help me focus")
//     )
//     
//     print(output.response)
//     print(output.readinessScore)
//     print(output.events.count) // 8
// }
// \`\`\`
// 
// ### SwiftUI Integration
// 
// \`\`\`swift
// import SwiftUI
// import MobileAgentOS
// 
// @MainActor
// struct ContentView: View {
//     @StateObject private var agentState = AgentState()
//     
//     var body: some View {
//         VStack {
//             if let output = agentState.output {
//                 Text(output.response)
//                 ReadinessBadge(score: output.readinessScore)
//             }
//             
//             Button("Run") {
//                 Task {
//                     await agentState.run(
//                         AgentInput(text: "Test")
//                     )
//                 }
//             }
//         }
//     }
// }
// \`\`\`
// 
// ### Memory Management
// 
// \`\`\`swift
// let store = InMemoryStore()
// let engine = MemoryEngine(store: store)
// 
// // Add memory
// await engine.add(MemoryItem(
//     content: "User prefers short tasks",
//     tags: ["preference"],
//     importance: 0.8
// ))
// 
// // Retrieve
// let memories = await engine.retrieve(
//     query: "task preferences",
//     limit: 5
// )
// \`\`\`
// 
// ### Privacy Guard
// 
// \`\`\`swift
// let guard = PrivacyGuard()
// let result = guard.check(text: "Email: user@example.com")
// 
// print(result.isSafe) // false
// print(result.redactedText) // "Email: [REDACTED_EMAIL]"
// print(result.redactions.count) // 1
// \`\`\`
// 
// ### Action Router
// 
// \`\`\`swift
// let router = ActionRouter()
// 
// // Suggest actions
// let actions = await router.suggestActions(
//     input: "Help me focus",
//     context: nil
// )
// 
// // Execute action
// if let action = actions.first {
//     let result = await router.execute(action)
//     print(result.success)
//     print(result.message)
// }
// \`\`\`
// 
// ### Readiness Score
// 
// \`\`\`swift
// let calculator = MobileAIReadiness()
// 
// let report = calculator.generateReport(
//     hasContext: true,
//     memoryCount: 5,
//     privacyChecked: true,
//     actionCount: 3
// )
// 
// print(report.overallScore) // 0-100
// print(report.tier) // "Good", "Excellent", etc.
// print(report.dimensionScores) // 7 dimensions
// \`\`\`
// 
// ## SwiftUI Components
// 
// ### AgentTimelineView
// 
// \`\`\`swift
// AgentTimelineView(events: output.events)
// \`\`\`
// 
// ### MemoryPanelView
// 
// \`\`\`swift
// MemoryPanelView(
//     memories: memories,
//     onAdd: { content, tags, importance in
//         // Handle add
//     }
// )
// \`\`\`
// 
// ### ActionCenterView
// 
// \`\`\`swift
// ActionCenterView(
//     actions: actions,
//     onExecute: { action in
//         // Handle execute
//     }
// )
// \`\`\`
// 
// ### PrivacyModeCard
// 
// \`\`\`swift
// PrivacyModeCard(result: privacyResult)
// \`\`\`
// 
// ### ReadinessBadge
// 
// \`\`\`swift
// ReadinessBadge(score: 72)
// \`\`\`
// 
// ## Testing
// 
// \`\`\`bash
// cd packages/swift
// swift test
// \`\`\`
// 
// Tests cover:
// - Privacy Guard (email, phone, API key, token, CC, SSN)
// - InMemoryStore (add, list, retrieve, clear)
// - ActionRouter (suggest, execute, policy)
// - ReadinessScore (calculation, dimensions, weights)
// - MobileAgentRuntime (8 events, pipeline, session)
// 
// ## Known Limitations (v0.3)
// 
// - **No persistence** — InMemoryStore only (no CoreData/SwiftData)
// - **No real LLM** — Deterministic responses
// - **No streaming** — Full response only
// - **Basic context** — No location/calendar/motion
// - **Mock actions** — Safe demo actions only
// - **No cloud sync** — Local only
// 
// ## Roadmap
// 
// v0.4+ planned:
// - CoreData/SwiftData persistence
// - Real LLM provider integrations
// - Streaming responses
// - Advanced context signals
// - Real iOS action permissions
// - Keychain secure storage
// - Background tasks
// - CloudKit sync
// 
// ## Comparison with v0.1 & v0.2
// 
// | Feature | v0.1 (React Native) | v0.2 (Android Compose) | v0.3 (iOS Swift) |
// |---------|---------------------|------------------------|------------------|
// | Language | TypeScript | Kotlin | Swift |
// | UI | React Native | Jetpack Compose | SwiftUI |
// | Memory | InMemoryStore | InMemoryStore (actor) | InMemoryStore (actor) |
// | Privacy | PrivacyGuard | PrivacyGuard | PrivacyGuard |
// | Actions | ActionRouter | ActionRouter | ActionRouter |
// | Readiness | 7 dimensions | 7 dimensions | 7 dimensions |
// | Pipeline | 8 events | 8 events | 8 events |
// 
// All three share the same architecture concepts, but each is native to its platform.
// 
// ## License
// 
// MIT — See LICENSE in root directory.