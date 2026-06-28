export interface ActionResult {
  actionId: string;
  success: boolean;
  result?: unknown;
  error?: string;
  timestamp: string;
}

export function createActionResult(
  actionId: string,
  success: boolean,
  result?: unknown,
  error?: string
): ActionResult {
  return {
    actionId,
    success,
    result,
    error,
    timestamp: new Date().toISOString(),
  };
}
