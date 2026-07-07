export const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,20}$/;

export const USERNAME_RULE =
  "3–20 characters: letters, numbers, and underscores only.";

export function normalizeUsername(value: string): string {
  return value.trim();
}

export function isValidUsername(value: string): boolean {
  return USERNAME_PATTERN.test(value);
}
