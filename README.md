// # MobileAgentOS
// 
// ![Status](https://img.shields.io/badge/status-v0.1-blue)
// ![License](https://img.shields.io/badge/license-MIT-green)
// ![Mobile First](https://img.shields.io/badge/mobile-first-0A84FF)
// ![AI Native](https://img.shields.io/badge/AI-native-14B8A6)
// 
// **The open-source architecture layer for AI-native mobile apps.**
// 
// MobileAgentOS helps mobile teams build agentic product experiences with context awareness, local memory, privacy guardrails, action routing, feedback loops, and readiness benchmarking.
// 
// > **Not another chatbot starter** — a runtime, benchmark, and reference architecture for AI-native mobile products.
// 
// **The world has enough agent demos. MobileAgentOS is for shipping AI-native mobile products.**
// 
// ---
// 
// ## Why
// 
// Most AI mobile apps start as chatbots.
// 
// But real AI-native mobile products need more than prompt input and model output.
// 
// They need **context**, **memory**, **privacy boundaries**, **native actions**, **offline resilience**, **UX continuity**, and a way to **measure readiness** before shipping.
// 
// MobileAgentOS turns these repeated product patterns into reusable architecture.
// 
// ---
// 
// ## Requirements
// 
// - **Node.js** 20 or 22 LTS (recommended: 22)
// - **pnpm** 9+
// - **Expo Go** for running the NOVA demo on iOS/Android
// 
// ---
// 
// ## Architecture
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
// ---
// 
// ## Packages
// 
// - **`@mobileagentos/core`** — runtime primitives for context, memory, actions, privacy, feedback, and readiness.
// - **`@mobileagentos/react-native`** — React Native hooks and components for mobile agent experiences.
// - **`@mobileagentos/benchmark`** — readiness scoring and benchmark reports for AI-native mobile apps.
// 
// ---
// 
// ## Quick Start
// 
// ```bash
// # Clone and install
// git clone https://github.com/serkannkara/mobileagentos.git
// cd mobileagentos
// 
// # Use recommended Node version
// nvm use
// 
// # Install dependencies
// pnpm install
// 
// # Build packages
// pnpm build
// 
// # Run tests
// pnpm test
// 
// # Run NOVA Demo
// cd apps/nova-demo
// pnpm start --clear
// ```
// 
// ### Example Usage
// 
// ```typescript
// import {
//   createMobileAgent,
//   InMemoryStore,
//   createDefaultPrivacyGuard,
//   createDefaultActionRouter,
// } from "@mobileagentos/core";
// 
// const agent = createMobileAgent({
//   name: "NOVA",
//   userId: "local-user",
//   memory: new InMemoryStore(),
//   privacy: createDefaultPrivacyGuard(),
//   actions: createDefaultActionRouter(),
//   enableContext: true,
// });
// 
// const result = await agent.run({
//   input: "Create a launch plan and remember that I prefer short daily tasks.",
// });
// 
// console.log(result.response);
// console.log(result.actions);
// console.log(result.readinessScore);
// ```
// 
// ---
// 
// ## Mobile AI Readiness Framework
// 
// MobileAgentOS includes a **7-dimension readiness framework** to help you ship AI-native mobile products with confidence:
// 
// 1. **Context Awareness** (15%) — Understanding the user and situation
// 2. **Memory Quality** (15%) — Retaining and retrieving what matters
// 3. **Privacy Safety** (20%) — Protecting user data and permissions
// 4. **Action Reliability** (20%) — Completing tasks accurately and safely
// 5. **Offline Resilience** (10%) — Working reliably without connectivity
// 6. **UX Continuity** (10%) — Delivering consistent user experience
// 7. **App Store Readiness** (10%) — Meeting store policies and quality bars
// 
// **Readiness Tiers:**
// - 🔴 **0-40:** Not ready — critical gaps
// - 🟡 **41-70:** Needs work — ship with caution
// - 🟢 **71-85:** Good — ready for beta
// - 🟦 **86-100:** Excellent — production-ready
// 
// ---
// 
// ## NOVA Demo
// 
// NOVA Demo is a reference React Native app showing how MobileAgentOS powers an AI-native mobile experience:
// 
// - **Agent Timeline** — Full runtime pipeline visualization
// - **Local Memory** — In-memory user context for the demo
// - **Action Center** — Safe native action execution
// - **Privacy Mode** — PII detection and redaction
// - **Readiness Score** — 7-dimension quality measurement
// 
// Run the demo:
// 
// ```bash
// cd apps/nova-demo
// pnpm start --clear
// ```
// 
// Then open Expo Go on iOS/Android and scan the QR code, or press `i` to open the iOS simulator.
// 
// ---
// 
// ## Roadmap
// 
// ### v0.1 — React Native + Expo ✓
// 
// - Core runtime
// - Context engine
// - In-memory memory store
// - Privacy guard
// - Action router
// - Feedback loop
// - Readiness score
// - NOVA demo app
// 
// ### v0.2 — Compose Adapter
// 
// - Kotlin adapter
// - Android reference app
// - Offline memory persistence
// - Benchmark CLI
// 
// ### v0.3 — Swift Adapter
// 
// - Swift package
// - iOS-native reference app
// - CoreML/local model hooks
// - App Store readiness checks
// 
// ---
// 
// ## Contributing
// 
// We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
// 
// For questions, ideas, or bug reports, open an issue on GitHub.
// 
// ---
// 
// ## License
// 
// MIT License - see [LICENSE](./LICENSE) for details.
// 
// ---
// 
// ## Community
// 
// MobileAgentOS is built for mobile product builders, AI-native engineers, and teams turning agentic patterns into shippable mobile products.
// 
// **The world has enough agent demos.**  
// **MobileAgentOS is for shipping AI-native mobile products.**