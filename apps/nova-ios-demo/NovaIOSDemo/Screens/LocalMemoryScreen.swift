import SwiftUI
import MobileAgentOS

struct LocalMemoryScreen: View {
    @State private var memoryEngine = MemoryEngine(store: InMemoryStore())
    @State private var memories: [MemoryItem] = []
    @State private var newContent: String = ""
    @State private var newTags: String = ""
    @State private var importance: Double = 0.5
    
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Add Memory")
                        .font(.headline)
                    
                    TextField("Content", text: $newContent, axis: .vertical)
                        .textFieldStyle(.roundedBorder)
                        .lineLimit(2...5)
                    
                    TextField("Tags (comma-separated)", text: $newTags)
                        .textFieldStyle(.roundedBorder)
                    
                    HStack {
                        Text("Importance:")
                        Slider(value: $importance, in: 0...1)
                        Text(String(format: "%.1f", importance))
                            .frame(width: 40)
                    }
                    
                    HStack {
                        Button("Add Memory") {
                            addMemory()
                        }
                        .buttonStyle(.borderedProminent)
                        .disabled(newContent.isEmpty)
                        
                        Spacer()
                        
                        Button("Clear All") {
                            clearMemories()
                        }
                        .buttonStyle(.bordered)
                        .tint(.red)
                    }
                }
                .padding()
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(12)
                
                if memories.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "brain.head.profile")
                            .font(.system(size: 60))
                            .foregroundColor(.secondary)
                        
                        Text("No memories stored")
                            .foregroundColor(.secondary)
                    }
                    .padding(.top, 40)
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Stored Memories (\(memories.count))")
                            .font(.headline)
                        
                        ForEach(memories) { memory in
                            VStack(alignment: .leading, spacing: 8) {
                                Text(memory.content)
                                    .font(.body)
                                
                                if !memory.tags.isEmpty {
                                    HStack {
                                        ForEach(memory.tags, id: \.self) { tag in
                                            Text(tag)
                                                .font(.caption)
                                                .padding(.horizontal, 8)
                                                .padding(.vertical, 4)
                                                .background(Color.blue.opacity(0.2))
                                                .cornerRadius(8)
                                        }
                                    }
                                }
                                
                                HStack {
                                    Label(String(format: "%.1f", memory.importance), systemImage: "star.fill")
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                    
                                    Spacer()
                                    
                                    Text(memory.createdAt.formatted(date: .abbreviated, time: .shortened))
                                        .font(.caption)
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
            .padding()
        }
        .navigationTitle("Local Memory")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await loadMemories()
        }
    }
    
    private func addMemory() {
        let tags = newTags.split(separator: ",").map { $0.trimmingCharacters(in: .whitespaces) }
        let memory = MemoryItem(
            content: newContent,
            tags: tags,
            importance: importance
        )
        
        Task {
            await memoryEngine.add(memory)
            await loadMemories()
            
            newContent = ""
            newTags = ""
            importance = 0.5
        }
    }
    
    private func loadMemories() async {
        memories = await memoryEngine.list()
    }
    
    private func clearMemories() {
        Task {
            await memoryEngine.clear()
            await loadMemories()
        }
    }
}