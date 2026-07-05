import Foundation

/// Routes and executes agent actions
public final class ActionRouter {
    private let policy: ActionPolicy
    
    public init(policy: ActionPolicy = .default) {
        self.policy = policy
    }
    
    public func suggestActions(input: String, context: ContextSnapshot?) async -> [AgentAction] {
        var actions: [AgentAction] = []
        
        let inputLower = input.lowercased()
        
        if inputLower.contains("focus") {
            actions.append(AgentAction(
                type: "createFocusPlan",
                description: "Create a focus plan for the next 45 minutes",
                payload: ["duration": "45"]
            ))
        }
        
        if inputLower.contains("note") || inputLower.contains("remember") {
            actions.append(AgentAction(
                type: "saveNote",
                description: "Save this as a note",
                payload: ["content": input]
            ))
        }
        
        if inputLower.contains("copy") || inputLower.contains("summary") {
            actions.append(AgentAction(
                type: "copySummary",
                description: "Copy summary to clipboard",
                payload: ["text": input]
            ))
        }
        
        return actions.filter { policy.allowedActionTypes.contains($0.type) }
    }
    
    public func execute(_ action: AgentAction) async -> ActionResult {
        guard policy.allowedActionTypes.contains(action.type) else {
            return ActionResult(
                actionId: action.id,
                success: false,
                message: "Action type '\(action.type)' not allowed by policy"
            )
        }
        
        // Deterministic execution for v0.3
        switch action.type {
        case "createFocusPlan":
            return ActionResult(
                actionId: action.id,
                success: true,
                message: "Focus plan created for \(action.payload["duration"] ?? "45") minutes"
            )
        case "saveNote":
            return ActionResult(
                actionId: action.id,
                success: true,
                message: "Note saved successfully"
            )
        case "copySummary":
            return ActionResult(
                actionId: action.id,
                success: true,
                message: "Summary copied to clipboard"
            )
        case "openURL":
            return ActionResult(
                actionId: action.id,
                success: true,
                message: "URL opened"
            )
        case "scheduleFocusBlock":
            return ActionResult(
                actionId: action.id,
                success: true,
                message: "Focus block scheduled"
            )
        default:
            return ActionResult(
                actionId: action.id,
                success: false,
                message: "Unknown action type"
            )
        }
    }
}