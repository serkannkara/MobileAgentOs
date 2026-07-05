import Foundation

/// Privacy policy configuration
public struct PrivacyPolicy {
    public let enabledPIITypes: Set<PIIType>
    public let allowPartialRedaction: Bool
    
    public static let `default` = PrivacyPolicy(
        enabledPIITypes: Set(PIIType.allCases),
        allowPartialRedaction: false
    )
    
    public init(
        enabledPIITypes: Set<PIIType>,
        allowPartialRedaction: Bool = false
    ) {
        self.enabledPIITypes = enabledPIITypes
        self.allowPartialRedaction = allowPartialRedaction
    }
}