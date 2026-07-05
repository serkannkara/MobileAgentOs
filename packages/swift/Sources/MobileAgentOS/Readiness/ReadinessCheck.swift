import Foundation

/// Individual readiness check
public protocol ReadinessCheck {
    var dimension: ReadinessDimension { get }
    func check() async -> Int
}