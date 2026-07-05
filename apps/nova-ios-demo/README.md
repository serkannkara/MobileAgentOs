// # NOVA iOS Demo
// 
// Native iOS SwiftUI reference app for MobileAgentOS v0.3.
// 
// ## Overview
// 
// NOVA iOS Demo demonstrates the full MobileAgentOS architecture running natively on iOS with SwiftUI.
// 
// This is **NOT** a React Native app wrapped for iOS. It's a pure Swift/SwiftUI implementation of the same AI-native mobile patterns.
// 
// ## Features
// 
// ### 6 Screens
// 
// 1. **Home** — Overview and feature navigation
// 2. **Agent Timeline** — Visualize 8-event runtime pipeline
// 3. **Local Memory** — Add and retrieve memories with tags
// 4. **Action Center** — Execute safe native actions
// 5. **Privacy Mode** — Live PII detection with redaction
// 6. **Readiness Score** — 7-dimension AI quality measurement
// 
// ## Requirements
// 
// - iOS 16.0+
// - Xcode 15.0+
// - Swift 5.9+
// 
// ## Installation
// 
// \`\`\`bash
// cd apps/nova-ios-demo
// open NovaIOSDemo.xcodeproj
// \`\`\`
// 
// Build and run on iOS Simulator or device (Cmd+R).
// 
// ## Architecture
// 
// The app uses MobileAgentOS Swift package located at \`../../packages/swift\`.
// 
// No external dependencies beyond the Swift package.
// 
// ## Screens
// 
// ### Home
// 
// Entry point with cards linking to all features.
// 
// ### Agent Timeline
// 
// - Input field for user requests
// - "Run Agent" button to trigger pipeline
// - Displays 8 events with metadata
// - Shows agent response and readiness score
// 
// ### Local Memory
// 
// - Add memories with content, tags, and importance
// - List all stored memories
// - Clear all memories
// - In-memory storage (resets on app restart)
// 
// ### Action Center
// 
// - Generate actions from text input
// - Display suggested actions with icons
// - Execute actions and see results
// - Supports: focus plan, save note, copy summary, open URL, schedule block
// 
// ### Privacy Mode
// 
// - Test PII detection on custom text
// - Example texts for quick testing
// - Shows original vs redacted text
// - Displays redaction report with PII types
// - Supports: email, phone, API key, token, credit card, SSN
// 
// ### Readiness Score
// 
// - Calculate 7-dimension readiness score
// - Visual breakdown per dimension
// - Progress bars with weights
// - Tier classification (Not Ready → Excellent)
// 
// ## Known Limitations (v0.3)
// 
// - **In-memory only** — No CoreData/SwiftData persistence
// - **No real LLM** — Responses are deterministic
// - **Mock actions** — Safe demo actions only
// - **Basic context** — No location/calendar/motion yet
// 
// ## License
// 
// MIT — See LICENSE in root directory.