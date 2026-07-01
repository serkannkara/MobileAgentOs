// # NOVA Compose Demo
//
// Native Android reference app for MobileAgentOS v0.2.
//
// ## What is this?
//
// NOVA Compose Demo showcases how to build AI-native mobile experiences with the MobileAgentOS Compose adapter.
//
// This is a **native Android app** built with Kotlin and Jetpack Compose. It does not use React Native or Expo.
//
// ## Features
//
// ### 1. Home Screen
//
// Overview of MobileAgentOS v0.2 and feature navigation.
//
// ### 2. Agent Timeline
//
// View the runtime pipeline in action:
// - Input received
// - Context captured
// - Memory retrieved
// - Privacy checked
// - Response generated
// - Readiness calculated
//
// ### 3. Local Memory
//
// Manage in-memory user memories:
// - Add memories with tags and importance
// - Retrieve memories by query
// - Clear all memories
//
// ### 4. Action Center
//
// Execute and track agent actions:
// - Register action handlers
// - Execute actions
// - View action results
// - Track execution history
//
// ### 5. Privacy Mode
//
// Test PII detection and redaction:
// - Input text with email, phone, tokens
// - See redaction in action
// - View redaction report
//
// ### 6. Readiness Score
//
// Calculate 7-dimension AI readiness:
// - Context Awareness (15%)
// - Memory Quality (15%)
// - Privacy Safety (20%)
// - Action Reliability (20%)
// - Offline Resilience (10%)
// - UX Continuity (10%)
// - App Store Readiness (10%)
//
// ## Build & Run
//
// ### Prerequisites
//
// - Android Studio Hedgehog or later
// - JDK 17
// - Android SDK 24+
//
// ### Build
//
// ```bash
// ./gradlew :apps:nova-compose-demo:assembleDebug
// ```
//
// ### Run
//
// Open in Android Studio and run on device/emulator, or:
//
// ```bash
// ./gradlew :apps:nova-compose-demo:installDebug
// ```
//
// ## Architecture
//
// - **MainActivity** — Entry point
// - **NovaComposeApp** — Root composable with MobileAgentProvider
// - **Navigation** — Simple Compose Navigation
// - **Theme** — Material 3 design system
// - **Screens** — Feature screens (Home, Timeline, Memory, Actions, Privacy, Readiness)
//
// ## Design System
//
// - **Colors:**
//   - Primary: Electric Blue (#0A84FF)
//   - Secondary: Teal (#14B8A6)
//   - Background: White (#FFFFFF)
//   - Surface: Light Gray (#F9FAFB)
//   - Text: Navy (#1E293B)
//
// - **Typography:** Material 3 defaults
// - **Shapes:** Rounded corners (8-16dp)
//
// ## Dependencies
//
// - `packages:compose` — MobileAgentOS Compose adapter
//
// ## License
//
// MIT License — see root LICENSE file for details.