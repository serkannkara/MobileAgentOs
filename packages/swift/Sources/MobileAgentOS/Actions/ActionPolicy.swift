import Foundation

/// Policy for action execution
public struct ActionPolicy {
    public let allowedActionTypes: Set<String>
    public let requireConfirmationForAll: Bool
    
    public static let `default` = ActionPolicy(
        allowedActionTypes: [
            "createFocusPlan",
            "saveNote",
            "copySummary",
            "openURL",
            "scheduleFocusBlock"
        ],
        requireConfirmationForAll: false
    )
    
    public init(
        allowedActionTypes: Set<String>,
        requireConfirmationForAll: Bool = false
    ) {
        self.allowedActionTypes = allowedActionTypes
        self.requireConfirmationForAll = requireConfirmationForAll
    }
}