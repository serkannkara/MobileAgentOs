<div align="center">
 
 # MobileAgentOS
 
 **The open-source architecture layer for AI-native mobile apps**
 
 [![Status](https://img.shields.io/badge/status-v0.3-blue)](https://github.com/serkannkara/mobileagentos)
 [![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
 [![Mobile First](https://img.shields.io/badge/mobile-first-0A84FF)]()
 [![AI Native](https://img.shields.io/badge/AI-native-14B8A6)]()
 
 MobileAgentOS turns repeated AI-native mobile patterns into reusable architecture.  
 Build context-aware, memory-enabled, privacy-safe agent experiences for React Native, Android Compose, and iOS SwiftUI.
 
 > **Not another chatbot starter template.**  
 > A production-oriented runtime, benchmark framework, and reference architecture for shipping AI-native mobile products.
 
 [Quick Start](#-quick-start) · [Demo Apps](#-demo-apps) · [Roadmap](#-roadmap) · [Documentation](#-documentation)
 
 </div>
 
 <p align="center">
   <img src="./docs/assets/mobileagentos-architecture.png" alt="MobileAgentOS architecture overview" width="900" />
 </p>
 
 ---
 
 ## 🎯 Why MobileAgentOS
 
 Most AI mobile apps start as chatbot shells with a text input and LLM output.
 
 But **real AI-native mobile products** need:
 
 - 🧠 **Context awareness** — understanding the user, device state, and situation
 - 💾 **Local memory** — retaining and retrieving what matters across sessions
 - 🔒 **Privacy boundaries** — protecting PII before it leaves the device
 - ⚡ **Native actions** — executing real tasks, not just generating text
 - 📡 **Offline resilience** — working reliably without constant connectivity
 - 🎨 **UX continuity** — delivering consistent experiences across platforms
 - 📊 **Readiness measurement** — knowing when you're production-ready
 
 **MobileAgentOS** provides these patterns as reusable architecture, not one-off implementations.
 
 ---
 
 ## ✨ What It Provides
 
 MobileAgentOS delivers a **platform-agnostic runtime pipeline** with native implementations for React Native, Android Compose, and iOS SwiftUI:
 
 - **Runtime Pipeline** — 8-event orchestration from input to completion
 - **Local Memory** — In-memory storage with relevance-based retrieval
 - **Privacy Guard** — Regex-based PII detection (6 types)
 - **Action Router** — Policy-enforced native action execution
 - **Feedback Loop** — Event tracking across the pipeline
 - **Readiness Scoring** — 7-dimension quality measurement (0-100)
 - **Platform Adapters** — Native implementations for RN, Android, iOS
 - **Demo Apps** — NOVA reference apps for each platform
 
 ---
 
 ## 🏗️ Architecture Pipeline
 
 Every agent run executes an 8-event pipeline:
 
 \`\`\`
 User Input
   ↓
 Context Snapshot    → Device state, user preferences, app context
   ↓
 Memory Retrieval    → Search and rank relevant local memories
   ↓
 Privacy Guard       → PII detection and redaction (6 types)
   ↓
 Agent Runtime       → Orchestrates the full pipeline
   ↓
 Action Router       → Executes native actions with policy enforcement
   ↓
 Feedback Loop       → Tracks events and user feedback
   ↓
 Readiness Score     → 7-dimension quality measurement (0-100)
 \`\`\`
 
 ### Pipeline Events
 
 1. **\`INPUT_RECEIVED\`** — User input captured
 2. **\`CONTEXT_SNAPSHOT_CREATED\`** — Device and user context captured
 3. **\`MEMORY_RETRIEVED\`** — Relevant memories retrieved
 4. **\`PRIVACY_CHECKED\`** — PII detected and redacted
 5. **\`AGENT_RESPONSE_GENERATED\`** — Response created
 6. **\`ACTIONS_SUGGESTED\`** — Actions prepared for execution
 7. **\`READINESS_CALCULATED\`** — Quality score computed
 8. **\`SESSION_COMPLETED\`** — Full pipeline finished
 
 ---
 
 ## 🗂️ Platform Implementations
 
 MobileAgentOS proves the same architecture can be implemented across major mobile platforms without forcing the native adapters through a shared cross-platform bridge.
 
 | Feature | React Native v0.1 | Android Compose v0.2 | iOS SwiftUI v0.3 |
 |---------|-------------------|----------------------|------------------|
 | **Language** | TypeScript | Kotlin | Swift |
 | **UI** | React Native | Jetpack Compose | SwiftUI |
 | **Concurrency** | Promises | Coroutines | async/await |
 | **Package** | pnpm workspace | Gradle | Swift Package Manager |
 | **Tests** | Vitest | JUnit | XCTest |
 | **Memory** | InMemoryStore | Thread-safe InMemoryStore | Actor-based InMemoryStore |
 | **Demo** | NOVA RN | NOVA Compose | NOVA iOS |
 | **Events** | 8 | 8 | 8 |
 | **Dimensions** | 7 | 7 | 7 |
 | **PII Types** | 6 | 6 | 6 |
 
 **Key Point:** v0.2 and v0.3 are **NOT** React Native bridges. They are native platform implementations proving the architecture is platform-agnostic.
 
 ---
 
 ## 📱 NOVA Demo Apps
 
 **NOVA** is the reference mobile app demonstrating how the runtime pipeline, local memory, privacy checks, safe actions, feedback loop, and readiness scoring compose into an AI-native mobile product experience.
 
 <p align="center">
   <img src="./docs/assets/nova-demo-home.png" alt="NOVA Demo running on Android emulator" width="360" />
 </p>
 
 <p align="center">
   <em>NOVA Demo running on Android development build.</em>
 </p>
 
 ### NOVA React Native (v0.1)
 
 Built with **React Native + Expo**, showcasing the full MobileAgentOS architecture.
 
 **Features:**
 - 🎬 **Agent Timeline** — Visualize the 8-event runtime pipeline
 - 💾 **Local Memory** — Store and retrieve user memories with tags
 - ⚡ **Action Center** — Execute safe actions with policy enforcement
 - 🔒 **Privacy Mode** — Test PII detection on email, phone, tokens, etc.
 - 📊 **Readiness Score** — 7-dimension AI quality measurement
 
 \`\`\`bash
 cd apps/nova-demo
 pnpm start --clear
 \`\`\`
 
 **For development builds:**
 
 \`\`\`bash
 cd apps/nova-demo
 
 # iOS
 npx expo run:ios
 
 # Android
 npx expo run:android
 
 # Start Metro for the installed development build
 pnpm start --dev-client --clear
 \`\`\`
 
 ### NOVA Compose (v0.2)
 
 Native Android app with identical features, built with **Jetpack Compose + Material 3**.
 
 \`\`\`bash
 ./gradlew :apps:nova-compose-demo:assembleDebug
 ./gradlew :apps:nova-compose-demo:installDebug
 \`\`\`
 
 ### NOVA iOS (v0.3)
 
 Native iOS app built with **SwiftUI**, demonstrating the same architecture patterns.
 
 \`\`\`bash
 cd apps/nova-ios-demo
 open NovaIOSDemo.xcodeproj
 # Build and run in Xcode (Cmd+R)
 \`\`\`
 
 ---
 
 ## 🚀 Quick Start
 
 ### Prerequisites
 
 **For React Native (v0.1):**
 - Node.js 20 or 22 LTS
 - pnpm 9+
 - Expo CLI (installed automatically)
 - iOS Simulator (Mac) or Android Emulator
 
 **For Android Compose (v0.2):**
 - JDK 17+
 - Android SDK 24+
 - Gradle 8.7 (included via wrapper)
 
 **For iOS Swift (v0.3):**
 - Xcode 15.0+
 - Swift 5.9+
 - iOS 16.0+ / macOS 13.0+
 
 ### Installation
 
 \`\`\`bash
 # Clone the repo
 git clone https://github.com/serkannkara/mobileagentos.git
 cd mobileagentos
 \`\`\`
 
 ### React Native + Expo
 
 \`\`\`bash
 # Install dependencies
 pnpm install
 
 # Build TypeScript packages
 pnpm build
 
 # Run tests
 pnpm test
 
 # Run NOVA Demo
 cd apps/nova-demo
 pnpm start --clear
 \`\`\`
 
 **For development builds:**
 
 \`\`\`bash
 cd apps/nova-demo
 
 # iOS
 npx expo run:ios
 
 # Android
 npx expo run:android
 
 # Start Metro for the installed development build
 pnpm start --dev-client --clear
 \`\`\`
 
 > **Note:** Development builds are recommended over Expo Go for full feature compatibility.
 
 ### Native Android Compose
 
 \`\`\`bash
 # Test Compose runtime
 ./gradlew :packages:compose:test
 
 # Build demo app
 ./gradlew :apps:nova-compose-demo:assembleDebug
 
 # Install on device/emulator
 ./gradlew :apps:nova-compose-demo:installDebug
 \`\`\`
 
 ### Native iOS SwiftUI
 
 \`\`\`bash
 # Test Swift package
 cd packages/swift
 swift test
 
 # Open iOS demo app
 cd ../../apps/nova-ios-demo
 open NovaIOSDemo.xcodeproj
 # Build and run in Xcode (Cmd+R)
 \`\`\`
 
 ---
 
 ## 💻 Usage Examples
 
 ### TypeScript (React Native)
 
 \`\`\`typescript
 import {
   createMobileAgent,
   InMemoryStore,
   createDefaultPrivacyGuard,
   createDefaultActionRouter,
 } from "@mobileagentos/core";
 
 const agent = createMobileAgent({
   name: "ProductivityAgent",
   userId: "user-123",
   memory: new InMemoryStore(),
   privacy: createDefaultPrivacyGuard(),
   actions: createDefaultActionRouter(),
   enableContext: true,
 });
 
 const result = await agent.run({
   input: "Create a launch plan. I prefer short daily tasks.",
 });
 
 console.log(result.response);        // "Processed: Create a launch plan..."
 console.log(result.readinessScore);  // 72 (out of 100)
 console.log(result.session.events);  // [input_received, ...]
 \`\`\`
 
 ### Kotlin (Native Android)
 
 \`\`\`kotlin
 import ai.mobileagentos.compose.agent.*
 import ai.mobileagentos.compose.memory.*
 
 val agent = MobileAgentRuntime(
     AgentConfig(
         name = "ProductivityAgent",
         userId = "user-123",
         context = ContextEngine(),
         memory = MemoryEngine(InMemoryStore()),
         privacy = PrivacyGuard(),
         actions = ActionRouter()
     )
 )
 
 val result = agent.run(
     AgentInput("Create a launch plan. I prefer short daily tasks.")
 )
 
 println(result.response)           // "Processed: Create a launch plan..."
 println(result.readinessScore)     // 72
 println(result.events)             // listOf(INPUT_RECEIVED, ...)
 \`\`\`
 
 ### Swift (Native iOS)
 
 \`\`\`swift
 import MobileAgentOS
 
 let config = AgentConfig(
     name: "ProductivityAgent",
     userId: "user-123"
 )
 
 let runtime = MobileAgentRuntime(config: config)
 
 Task {
     let output = await runtime.run(
         AgentInput(text: "Create a launch plan. I prefer short daily tasks.")
     )
     
     print(output.response)         // "Processed: Create a launch plan..."
     print(output.readinessScore)   // 72
     print(output.events.count)     // 8
 }
 \`\`\`
 
 ### React Native Hooks
 
 \`\`\`typescript
 import { useAgent, useAgentMemory } from "@mobileagentos/react-native";
 
 function MyScreen() {
   const { run, loading, getSession } = useAgent();
   const { addMemory, listMemories } = useAgentMemory();
 
   const handleSubmit = async () => {
     await run({ input: "Help me focus today" });
     const session = getSession();
     console.log(session.events); // 8 pipeline events
   };
 
   return <AgentTimeline events={getSession()?.events || []} />;
 }
 \`\`\`
 
 ---
 
 ## 📊 Mobile AI Readiness Framework
 
 MobileAgentOS includes a **7-dimension readiness framework** to measure mobile AI readiness:
 
 | Dimension | Weight | What It Measures |
 |-----------|--------|------------------|
 | **Context Awareness** | 15% | Understanding user, device state, and situation |
 | **Memory Quality** | 15% | Retaining and retrieving what matters |
 | **Privacy Safety** | 20% | Protecting PII and user data |
 | **Action Reliability** | 20% | Completing tasks accurately and safely |
 | **Offline Resilience** | 10% | Working without constant connectivity |
 | **UX Continuity** | 10% | Consistent experience across sessions |
 | **App Store Readiness** | 10% | Meeting store policies and quality bars |
 
 ### Readiness Tiers
 
 - 🔴 **0-40:** Not ready — critical gaps exist
 - 🟡 **41-70:** Needs work — ship with caution
 - 🟢 **71-85:** Good — ready for beta testing
 - 🟦 **86-100:** Excellent — production-ready
 
 \`\`\`typescript
 const result = await agent.run({ input: "..." });
 console.log(result.readinessScore); // 72 → Good (ready for beta)
 \`\`\`
 
 ---
 
 ## ⚠️ Current Limitations
 
 MobileAgentOS v0.3 is a **foundation release**. These limitations are intentional and will be addressed in future versions:
 
 - ❌ **No real LLM provider integration** — Responses are deterministic ("Processed: {input}")
 - ❌ **In-memory storage only** — No Room/DataStore/CoreData/SwiftData persistence yet
 - ❌ **No streaming responses** — Full response only
 - ❌ **No cloud sync** — Memories are local and session-scoped
 - ❌ **Limited context signals** — Basic device/user context only (platform, locale, timezone)
 - ❌ **No multi-agent coordination** — Single agent per runtime
 - ❌ **Regex-based PII detection** — Pattern-matching only, not ML-based
 
 See [Roadmap](#-roadmap) for planned enhancements.
 
 ---
 
 ## 🗺️ Roadmap
 
 ### ✅ v0.1 — React Native + Expo (Shipped)
 
 - ✅ Core runtime architecture
 - ✅ Context engine with signal capture
 - ✅ In-memory memory store with relevance-based retrieval
 - ✅ Privacy guard with 6 PII types (email, phone, token, API key, credit card, SSN)
 - ✅ Action router with policy enforcement
 - ✅ Feedback loop with event tracking
 - ✅ 7-dimension readiness framework
 - ✅ NOVA Demo app (6 screens)
 - ✅ React Native hooks and components
 - ✅ Unit tests and documentation
 
 ### ✅ v0.2 — Native Android Compose Adapter (Shipped)
 
 - ✅ Kotlin runtime implementation
 - ✅ Jetpack Compose UI adapter
 - ✅ Material 3 design system
 - ✅ NOVA Compose Demo (6 screens)
 - ✅ Thread-safe InMemoryStore with Coroutines
 - ✅ Unit tests (PrivacyGuard, InMemoryStore, ActionRouter, ReadinessScore, MobileAgentRuntime)
 - ✅ Documentation and migration guide
 - ✅ **Zero React Native / Expo / Fabric dependency**
 
 **Note:** v0.2 is not a React Native Fabric bridge. It's a native Android implementation proving the architecture is platform-agnostic.
 
 ### ✅ v0.3 — Native iOS Swift Adapter (Shipped)
 
 - ✅ Swift Package Manager implementation
 - ✅ SwiftUI components and state management
 - ✅ NOVA iOS Demo (6 screens)
 - ✅ Actor-based thread-safe InMemoryStore
 - ✅ async/await runtime
 - ✅ Unit tests (PrivacyGuard, InMemoryStore, ActionRouter, ReadinessScore, MobileAgentRuntime)
 - ✅ Complete documentation
 - ✅ **Zero dependency on React Native, Expo, or Android**
 
 **Result:** The same AI-native mobile architecture now runs natively on React Native, Android Compose, and iOS SwiftUI.
 
 ### 🔮 v0.4 — Production Enhancements (Planned)
 
 - [ ] Persistent storage adapters (Room, DataStore, CoreData, SwiftData)
 - [ ] Real LLM provider integrations (OpenAI, Anthropic, local models)
 - [ ] Streaming responses
 - [ ] Multi-agent coordination
 - [ ] Advanced context signals (location, activity, calendar)
 - [ ] Cloud sync for memories
 - [ ] Analytics and observability dashboard
 
 ---
 
 ## 🔧 Troubleshooting
 
 ### React Native Issues
 
 **Problem:** \`pnpm build\` fails  
 **Solution:** Ensure Node.js 20 or 22 is installed: \`node --version\`
 
 **Problem:** Expo app crashes on startup  
 **Solution:** Clear cache: \`cd apps/nova-demo && pnpm start --clear\`
 
 **Problem:** Module not found errors  
 **Solution:** Rebuild packages: \`pnpm clean && pnpm install && pnpm build\`
 
 **Problem:** Android development build fails  
 **Solution:** Ensure Android SDK is configured: Check \`local.properties\` or set \`ANDROID_HOME\`
 
 ### Android Compose Issues
 
 **Problem:** \`SDK location not found\`  
 **Solution:** Create \`local.properties\` with: \`sdk.dir=/path/to/Android/sdk\`
 
 **Problem:** Gradle daemon errors  
 **Solution:** Kill daemons: \`./gradlew --stop\` then rebuild
 
 **Problem:** Compilation errors in Compose  
 **Solution:** Ensure JDK 17 is active: \`java -version\`
 
 ### iOS Swift Issues
 
 **Problem:** Swift package build fails  
 **Solution:** Ensure Xcode 15.0+ is installed and active
 
 **Problem:** Swift concurrency warnings  
 **Solution:** Check actor isolation annotations and ensure Xcode 15+ / Swift 5.9+ is active
 
 **Problem:** iOS Simulator not opening  
 **Solution:** Open Xcode > Preferences > Locations and verify Command Line Tools
 
 ### General Issues
 
 For more help, see [GitHub Issues](https://github.com/serkannkara/mobileagentos/issues).
 
 ---
 
 ## 🛡️ Security & Privacy
 
 ### Privacy Guard Capabilities
 
 MobileAgentOS includes client-side PII detection using regex patterns:
 
 - ✅ **Email addresses** — \`john@example.com\` → \`[REDACTED_EMAIL]\`
 - ✅ **Phone numbers** — \`555-123-4567\` → \`[REDACTED_PHONE]\`
 - ✅ **API keys** — \`sk_test_123...\` → \`[REDACTED_API_KEY]\`
 - ✅ **Tokens** — Long alphanumeric strings → \`[REDACTED_TOKEN]\`
 - ✅ **Credit cards** — \`4111-1111-1111-1111\` → \`[REDACTED_CREDIT_CARD]\`
 - ✅ **SSN** — \`123-45-6789\` → \`[REDACTED_SSN]\`
 
 ### Limitations
 
 - **Regex-based detection** — May miss edge cases or sophisticated PII
 - **No ML-based detection** — Currently pattern-matching only
 - **Client-side only** — No server-side validation
 - **Best effort** — Not a replacement for comprehensive data protection policies
 
 **Recommendation:** Use PrivacyGuard as a first line of defense, not the only line.
 
 ---
 
 ## 📚 Documentation
 
 - **Compose Adapter Guide** — [docs/compose-adapter.md](./docs/compose-adapter.md)
 - **Swift Adapter Guide** — [docs/swift-adapter.md](./docs/swift-adapter.md)
 - **v0.3 Implementation Report** — [docs/v0.3-implementation-report.md](./docs/v0.3-implementation-report.md)
 
 ---
 
 ## 🤝 Contributing
 
 We welcome contributions from mobile engineers building AI-native products!
 
 **Ways to contribute:**
 - 🐛 Report bugs and issues
 - 💡 Propose new features or improvements
 - 📝 Improve documentation
 - 🧪 Add tests
 - 🎨 Build new UI components
 - 🔌 Create new platform adapters
 
 ---
 
 ## 📄 License
 
 MIT License — see [LICENSE](./LICENSE) for details.
 
 ---
 
 ## 🌍 Community
 
 MobileAgentOS is built for:
 
 - 📱 **Mobile product builders** shipping AI-native apps
 - 🏗️ **Platform engineers** building reusable AI infrastructure
 - 🚀 **Startup founders** moving fast without reinventing patterns
 - 🎓 **Researchers** exploring agentic mobile UX
 
 **The world has enough agent demos.**  
 **MobileAgentOS is for shipping AI-native mobile products.**
 
 ---
 
 <div align="center">
 
 Made with ❤️ by mobile engineers building the future of AI-native apps
 
 [⭐ Star on GitHub](https://github.com/serkannk