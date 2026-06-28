# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in MobileAgentOS, please report it to:

**security@mobileagentos.dev** (placeholder - update with real contact)

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix timeline: Varies by severity

## Security Best Practices

When using MobileAgentOS:

### Privacy

- Always enable PrivacyGuard in production
- Review privacy reports regularly
- Implement user consent flows
- Audit data flows to external services

### Actions

- Use ActionRouter for all agent actions
- Require confirmation for destructive actions
- Validate all action parameters
- Log action history for audit

### Memory

- Store sensitive data encrypted
- Implement memory expiration policies
- Use local-first storage where possible
- Clear memories on user logout

### App Store Compliance

- Disclose AI features clearly
- Update privacy policy for AI data handling
- Implement parental controls if targeting kids
- Test accessibility compliance

## Known Limitations (v0.1)

- In-memory storage only (no persistence)
- Basic PII redaction (regex-based)
- No encrypted storage
- No audit log export

These will be addressed in future versions.
