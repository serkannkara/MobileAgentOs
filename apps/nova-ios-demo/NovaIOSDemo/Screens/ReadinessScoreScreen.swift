import SwiftUI
import MobileAgentOS

struct ReadinessScoreScreen: View {
    @Environment(\.agentState) var agentState
    @State private var calculator = MobileAIReadiness()
    @State private var report: ReadinessReport?
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                VStack(spacing: 16) {
                    Text("Calculate AI Readiness")
                        .font(.headline)
                    
                    Button("Calculate Score") {
                        calculateScore()
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(12)
                
                if let report {
                    VStack(spacing: 20) {
                        VStack(spacing: 12) {
                            Text("\(report.overallScore)")
                                .font(.system(size: 72, weight: .bold))
                                .foregroundColor(colorForTier(report.tierColor))
                            
                            Text(report.tier)
                                .font(.title2)
                                .foregroundColor(colorForTier(report.tierColor))
                            
                            Text("out of 100")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(colorForTier(report.tierColor).opacity(0.1))
                        .cornerRadius(16)
                        
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Dimension Breakdown")
                                .font(.headline)
                            
                            ForEach(report.dimensionScores, id: \.dimension) { score in
                                VStack(spacing: 8) {
                                    HStack {
                                        Text(score.dimension.rawValue.capitalized.replacingOccurrences(of: "([a-z])([A-Z])", with: "$1 $2", options: .regularExpression))
                                            .font(.subheadline)
                                        
                                        Spacer()
                                        
                                        Text("\(score.score)")
                                            .font(.subheadline.bold())
                                            .foregroundColor(colorForScore(score.score))
                                    }
                                    
                                    GeometryReader { geometry in
                                        ZStack(alignment: .leading) {
                                            Rectangle()
                                                .fill(Color.secondary.opacity(0.2))
                                                .frame(height: 8)
                                                .cornerRadius(4)
                                            
                                            Rectangle()
                                                .fill(colorForScore(score.score))
                                                .frame(width: geometry.size.width * CGFloat(score.score) / 100, height: 8)
                                                .cornerRadius(4)
                                        }
                                    }
                                    .frame(height: 8)
                                    
                                    HStack {
                                        Text("Weight: \(Int(score.weight * 100))%")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        
                                        Spacer()
                                        
                                        Text("Contribution: \(String(format: "%.1f", score.weightedScore))")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                    }
                                }
                                .padding()
                                .background(Color.secondary.opacity(0.05))
                                .cornerRadius(8)
                            }
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Readiness Tiers")
                                .font(.headline)
                            
                            TierLegend(range: "86-100", tier: "Excellent", color: .blue, emoji: "🟦")
                            TierLegend(range: "71-85", tier: "Good", color: .green, emoji: "🟢")
                            TierLegend(range: "41-70", tier: "Needs Work", color: .yellow, emoji: "🟡")
                            TierLegend(range: "0-40", tier: "Not Ready", color: .red, emoji: "🔴")
                        }
                        .padding()
                        .background(Color.secondary.opacity(0.05))
                        .cornerRadius(12)
                    }
                } else {
                    VStack(spacing: 12) {
                        Image(systemName: "chart.bar.fill")
                            .font(.system(size: 60))
                            .foregroundColor(.secondary)
                        
                        Text("Calculate your readiness score")
                            .foregroundColor(.secondary)
                        
                        Text("7 dimensions • Context • Memory • Privacy • Actions • Offline • UX • App Store")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.top, 40)
                }
            }
            .padding()
        }
        .navigationTitle("Readiness Score")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func calculateScore() {
        let hasContext = agentState.output != nil
        let memoryCount = 3 // Demo value
        let privacyChecked = true
        let actionCount = agentState.output?.actions.count ?? 2
        
        report = calculator.generateReport(
            hasContext: hasContext,
            memoryCount: memoryCount,
            privacyChecked: privacyChecked,
            actionCount: actionCount
        )
    }
    
    private func colorForTier(_ tier: String) -> Color {
        switch tier {
        case "red": return .red
        case "yellow": return .yellow
        case "green": return .green
        case "blue": return .blue
        default: return .gray
        }
    }
    
    private func colorForScore(_ score: Int) -> Color {
        switch score {
        case 0...40: return .red
        case 41...70: return .yellow
        case 71...85: return .green
        case 86...100: return .blue
        default: return .gray
        }
    }
}

struct TierLegend: View {
    let range: String
    let tier: String
    let color: Color
    let emoji: String
    
    var body: some View {
        HStack {
            Text(emoji)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(tier)
                    .font(.subheadline.bold())
                
                Text(range)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
        .padding(.vertical, 4)
    }
}