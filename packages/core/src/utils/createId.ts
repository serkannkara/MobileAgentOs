/**
 * Generates a unique ID safe for React Native/Hermes environments.
 * Not cryptographically secure - only for internal runtime IDs.
 */
export function createId(prefix = "id"): string {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${time}_${random}`;
}