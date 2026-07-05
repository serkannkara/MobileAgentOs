import Foundation

#if os(iOS)
import UIKit
#elseif os(macOS)
import AppKit
#endif

/// Captures device and user context
public final class ContextEngine {
    public init() {}
    
    public func captureSnapshot() -> ContextSnapshot {
        let platform: String
        let appVersion: String
        
        #if os(iOS)
        platform = "iOS \(UIDevice.current.systemVersion)"
        appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
        #elseif os(macOS)
        let osVersion = ProcessInfo.processInfo.operatingSystemVersion
        platform = "macOS \(osVersion.majorVersion).\(osVersion.minorVersion).\(osVersion.patchVersion)"
        appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
        #else
        platform = "Unknown"
        appVersion = "1.0.0"
        #endif
        
        let locale = Locale.current.identifier
        let timezone = TimeZone.current.identifier
        let sessionId = UUID().uuidString
        
        let signals: [ContextSignal] = [
            ContextSignal(type: .platform, value: platform),
            ContextSignal(type: .locale, value: locale),
            ContextSignal(type: .timezone, value: timezone),
            ContextSignal(type: .appVersion, value: appVersion),
            ContextSignal(type: .sessionId, value: sessionId),
            ContextSignal(type: .timestamp, value: ISO8601DateFormatter().string(from: Date()))
        ]
        
        return ContextSnapshot(
            platform: platform,
            locale: locale,
            timezone: timezone,
            appVersion: appVersion,
            sessionId: sessionId,
            signals: signals
        )
    }
}