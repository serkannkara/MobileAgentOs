import SwiftUI

/// Badge displaying readiness score
public struct ReadinessBadge: View {
    public let score: Int
    
    public init(score: Int) {
        self.score = score
    }
    
    public var body: some View {
        HStack(spacing: 8) {
            Circle()
                .fill(tierColor)
                .frame(width: 12, height: 12)
            
            Text("\(score)")
                .font(.title.bold())
            
            Text(tier)
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(tierColor.opacity(0.1))
        .cornerRadius(12)
    }
    
    private var tier: String {
        switch score {
        case 0...40: return "Not Ready"
        case 41...70: return "Needs Work"
        case 71...85: return "Good"
        case 86...100: return "Excellent"
        default: return "Unknown"
        }
    }
    
    private var tierColor: Color {
        switch score {
        case 0...40: return .red
        case 41...70: return .yellow
        case 71...85: return .green
        case 86...100: return .blue
        default: return .gray
        }
    }
}