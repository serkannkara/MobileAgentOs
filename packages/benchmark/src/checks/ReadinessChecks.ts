export interface ReadinessCheck {
  name: string;
  category: string;
  passed: boolean;
  message: string;
}

export function createReadinessCheck(
  name: string,
  category: string,
  passed: boolean,
  message: string
): ReadinessCheck {
  return { name, category, passed, message };
}
