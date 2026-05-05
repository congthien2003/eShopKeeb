/**
 * Utilities for formatting Date/Time and Amounts for Vietnamese locale only (vi-VN).
 *
 * These helpers are thin wrappers around Intl APIs with sensible defaults
 * for Vietnam. All functions are null/undefined/invalid-safe and return
 * a fallback string (default: '-') when the input cannot be formatted.
 */

const VI_LOCALE = 'vi-VN' as const;

/** Safely coerce input to a valid Date or return null */
function toDate(input: Date | string | number | null | undefined): Date | null {
  if (input == null) return null;
  if (input instanceof Date && !isNaN(input.getTime())) return input;
  const d = new Date(input as any);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Format a date as DD/MM/YYYY (vi-VN default) with optional timezone.
 */
export function formatDate(
  input: Date | string | number | null | undefined,
  options?: {
    timeZone?: string; // e.g., 'Asia/Ho_Chi_Minh'
    fallback?: string;
  }
): string {
  const { timeZone, fallback = '-' } = options || {};
  const date = toDate(input);
  if (!date) return fallback;

  return new Intl.DateTimeFormat(VI_LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone,
  }).format(date);
}

/**
 * Format a time (HH:mm or HH:mm:ss) in vi-VN.
 */
export function formatTime(
  input: Date | string | number | null | undefined,
  options?: {
    includeSeconds?: boolean;
    timeZone?: string;
    fallback?: string;
  }
): string {
  const { includeSeconds = false, timeZone, fallback = '-' } = options || {};
  const date = toDate(input);
  if (!date) return fallback;

  return new Intl.DateTimeFormat(VI_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: false,
    timeZone,
  }).format(date);
}

/**
 * Format date & time in vi-VN, default: DD/MM/YYYY, HH:mm.
 */
export function formatDateTime(
  input: Date | string | number | null | undefined,
  options?: {
    includeSeconds?: boolean;
    timeZone?: string; // e.g., 'Asia/Ho_Chi_Minh'
    fallback?: string;
  }
): string {
  const { includeSeconds = false, timeZone, fallback = '-' } = options || {};
  const date = toDate(input);
  if (!date) return fallback;

  return new Intl.DateTimeFormat(VI_LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: false,
    timeZone,
  }).format(date);
}

/**
 * Try to parse a numeric string that may contain thousand separators or
 * different decimal separators. This favors vi-VN input patterns but
 * accepts common variants.
 */
function normalizeNumber(
  value: number | string | null | undefined
): number | null {
  if (value == null) return null;
  if (typeof value === 'number') return isFinite(value) ? value : null;

  const raw = value.trim();
  if (!raw) return null;

  // Detect decimal separator by last occurrence of ',' or '.'
  const lastComma = raw.lastIndexOf(',');
  const lastDot = raw.lastIndexOf('.');

  if (lastComma === -1 && lastDot === -1) {
    // No separators, just remove spaces
    const digits = raw.replace(/\s+/g, '');
    const n = Number(digits);
    return isFinite(n) ? n : null;
  }

  let normalized = raw;
  if (lastComma > lastDot) {
    // Assume comma is decimal separator (vi-VN typical)
    normalized = raw
      .replace(/\./g, '') // remove thousand dots
      .replace(/,/g, '.'); // convert decimal comma to dot
  } else {
    // Assume dot is decimal separator, remove commas as thousand sep
    normalized = raw.replace(/,/g, '');
  }

  const n = Number(normalized.replace(/\s+/g, ''));
  return isFinite(n) ? n : null;
}

/** Common options for currency/number formatting */
type CommonNumberOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  signDisplay?: 'auto' | 'always' | 'never' | 'exceptZero';
  compact?: boolean; // use compact notation (e.g., 1,2 Triệu)
  fallback?: string;
};

/**
 * Format a monetary amount for Vietnamese locale.
 * Defaults to VND and 0 fraction digits as per currency standard.
 */
export function formatAmount(
  value: number | string | null | undefined,
  options?: {
    currency?: string; // default 'VND'
  } & CommonNumberOptions
): string {
  const {
    currency = 'VND',
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
    compact = false,
    fallback = '-',
  } = options || {};

  const n = normalizeNumber(value);
  if (n == null) return fallback;

  // For VND, default to 0 fraction digits unless overridden
  const hasCustomDigits =
    minimumFractionDigits != null || maximumFractionDigits != null;

  const formatter = new Intl.NumberFormat(VI_LOCALE, {
    style: 'currency',
    currency,
    minimumFractionDigits: hasCustomDigits
      ? minimumFractionDigits
      : currency.toUpperCase() === 'VND'
        ? 0
        : undefined,
    maximumFractionDigits: hasCustomDigits
      ? maximumFractionDigits
      : currency.toUpperCase() === 'VND'
        ? 0
        : undefined,
    signDisplay,
    notation: compact ? 'compact' : 'standard',
  } as Intl.NumberFormatOptions);

  return formatter.format(n);
}

/**
 * Format a plain number with vi-VN grouping, optional fraction digits,
 * optional compact notation.
 */
export function formatNumber(
  value: number | string | null | undefined,
  options?: CommonNumberOptions
): string {
  const {
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
    compact = false,
    fallback = '-',
  } = options || {};

  const n = normalizeNumber(value);
  if (n == null) return fallback;

  const formatter = new Intl.NumberFormat(VI_LOCALE, {
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
    notation: compact ? 'compact' : 'standard',
  });

  return formatter.format(n);
}

export const viFormat = {
  date: formatDate,
  time: formatTime,
  dateTime: formatDateTime,
  amount: formatAmount,
  number: formatNumber,
};
