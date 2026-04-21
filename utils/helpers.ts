/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Mask email address showing first 2 characters and domain
 */
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;

  const visibleChars = Math.min(3, localPart.length);
  const masked = localPart.slice(0, visibleChars) + '***';

  return `${masked}@${domain}`;
}
/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Debounce function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function generatePassword(length: number = 12): string {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  const allChars = lower + upper + numbers + symbols;

  const getRandom = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  let password = [
    getRandom(lower),
    getRandom(upper),
    getRandom(numbers),
    getRandom(symbols),
  ];

  for (let i = password.length; i < length; i++) {
    password.push(getRandom(allChars));
  }

  // shuffle password
  password = password.sort(() => Math.random() - 0.5);
  return password.join('');
}

export const formatDisplayValue = (value: string): string => {
  return value
    .replace(/_/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const dateAndTimeFormatter = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
