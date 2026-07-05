// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MobileAgentOS",
    platforms: [
        .iOS(.v16),
        .macOS(.v13)
    ],
    products: [
        .library(
            name: "MobileAgentOS",
            targets: ["MobileAgentOS"]
        )
    ],
    targets: [
        .target(
            name: "MobileAgentOS",
            path: "Sources/MobileAgentOS"
        ),
        .testTarget(
            name: "MobileAgentOSTests",
            dependencies: ["MobileAgentOS"],
            path: "Tests/MobileAgentOSTests"
        )
    ]
)