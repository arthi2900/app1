/**
 * Timezone utilities for Indian Standard Time (IST)
 */

// IST is UTC+5:30
export const IST_OFFSET_HOURS = 5;
export const IST_OFFSET_MINUTES = 30;
export const IST_OFFSET_MS = (IST_OFFSET_HOURS * 60 + IST_OFFSET_MINUTES) * 60 * 1000;
export const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Get current time in IST
 */
export function getCurrentISTTime(): Date {
  // Get current UTC time and add IST offset
  const now = new Date();
  return new Date(now.getTime() + IST_OFFSET_MS);
}

/**
 * Convert UTC time to IST
 */
export function convertToIST(utcDate: string | Date): Date {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  // Add IST offset to UTC time
  return new Date(date.getTime() + IST_OFFSET_MS);
}

/**
 * Convert IST time to UTC
 */
export function convertToUTC(istDate: Date): Date {
  // Subtract IST offset from IST time
  return new Date(istDate.getTime() - IST_OFFSET_MS);
}

/**
 * Get difference in seconds between two times
 */
export function getTimeDifferenceInSeconds(startTime: Date, endTime: Date): number {
  return Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
}

/**
 * Format seconds to time format (HH:MM:SS)
 */
export function formatSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format date and time in IST
 */
export function formatISTDateTime(date: string | Date): string {
  const utcDate = typeof date === 'string' ? new Date(date) : date;
  // Format using IST timezone
  return utcDate.toLocaleString('en-IN', {
    timeZone: IST_TIMEZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Check if exam has started
 */
export function hasExamStarted(startTime: string | Date): boolean {
  const now = new Date(); // Current UTC time
  const start = typeof startTime === 'string' ? new Date(startTime) : startTime;
  return now >= start;
}

/**
 * Check if exam has ended
 */
export function hasExamEnded(endTime: string | Date): boolean {
  const now = new Date(); // Current UTC time
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
  return now >= end;
}

/**
 * Get remaining time for exam in seconds
 */
export function getExamRemainingTime(
  startedAt: string | Date,
  durationMinutes: number
): number {
  const now = new Date(); // Current UTC time
  const started = typeof startedAt === 'string' ? new Date(startedAt) : startedAt;
  const elapsedSeconds = getTimeDifferenceInSeconds(started, now);
  const totalSeconds = durationMinutes * 60;
  return Math.max(0, totalSeconds - elapsedSeconds);
}
