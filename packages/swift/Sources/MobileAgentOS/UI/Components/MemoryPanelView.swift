import SwiftUI

/// Panel for displaying and managing memories
public struct MemoryPanelView: View {
    public let memories: [MemoryItem]
    public let onAdd: ((String, [String], Double) -> Void)?
    
    @State private var newContent: String = ""
    @State private var newTags: String = ""
    @State private var importance: Double = 0.5
    
    public init(
        memories: [MemoryItem],
        onAdd: ((String, [String], Double) -> Void)? = nil
    ) {
        self.memories = memories
        self.onAdd = onAdd
    }
    
    public var body: some View {
        VStack(spacing: 16) {
            if let onAdd {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Add Memory")
                        .font(.headline)
                    
                    TextField("Content", text: $newContent)
                        .textFieldStyle(.roundedBorder)
                    
                    TextField("Tags (comma-separated)", text: $newTags)
                        .textFieldStyle(.roundedBorder)
                    
                    HStack {
                        Text("Importance:")
                        Slider(value: $importance, in: 0...1)
                        Text(String(format: "%.1f", importance))
                            .frame(width: 40)
                    }
                    
                    Button("Add") {
                        let tags = newTags.split(separator: ",").map { $0.trimmingCharacters(in: .whitespaces) }
                        onAdd(newContent, tags, importance)
                        newContent = ""
                        newTags = ""
                        importance = 0.5
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(newContent.isEmpty)
                }
                .padding()
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(8)
            }
            
            if memories.isEmpty {
                Text("No memories stored")
                    .foregroundColor(.secondary)
                    .padding()
            } else {
                ScrollView {
                    VStack(spacing: 8) {
                        ForEach(memories) { memory in
                            VStack(alignment: .leading, spacing: 4) {
                                Text(memory.content)
                                    .font(.body)
                                
                                if !memory.tags.isEmpty {
                                    Text("Tags: \(memory.tags.joined(separator: ", "))")
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                }
                                
                                HStack {
                                    Text("Importance: \(String(format: "%.1f", memory.importance))")
                                        .font(.caption2)
                                        .foregroundColor(.secondary)
                                    
                                    Spacer()
                                    
                                    Text(memory.createdAt.formatted(date: .abbreviated, time: .shortened))
                                        .font(.caption2)
                                        .foregroundColor(.secondary)
                                }
                            }
                            .padding()
                            .background(Color.secondary.opacity(0.1))
                            .cornerRadius(8)
                        }
                    }
                }
            }
        }
        .padding()
    }
}