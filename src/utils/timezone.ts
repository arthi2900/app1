/**
 * भारतीय मानक समय (IST) के लिए टाइमज़ोन उपयोगिताएँ
 * Timezone utilities for Indian Standard Time (IST)
 */

// IST is UTC+5:30
export const IST_OFFSET_HOURS = 5;
export const IST_OFFSET_MINUTES = 30;
export const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * वर्तमान IST समय प्राप्त करें
 * Get current time in IST
 */
export function getCurrentISTTime(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: IST_TIMEZONE }));
}

/**
 * UTC समय को IST में बदलें
 * Convert UTC time to IST
 */
export function convertToIST(utcDate: string | Date): Date {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  return new Date(date.toLocaleString('en-US', { timeZone: IST_TIMEZONE }));
}

/**
 * IST समय को UTC में बदलें
 * Convert IST time to UTC
 */
export function convertToUTC(istDate: Date): Date {
  const utcTime = istDate.getTime() - (IST_OFFSET_HOURS * 60 + IST_OFFSET_MINUTES) * 60 * 1000;
  return new Date(utcTime);
}

/**
 * दो समय के बीच सेकंड में अंतर प्राप्त करें
 * Get difference in seconds between two times
 */
export function getTimeDifferenceInSeconds(startTime: Date, endTime: Date): number {
  return Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
}

/**
 * सेकंड को समय प्रारूप में बदलें (HH:MM:SS)
 * Format seconds to time format (HH:MM:SS)
 */
export function formatSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * IST में तारीख और समय को प्रारूपित करें
 * Format date and time in IST
 */
export function formatISTDateTime(date: string | Date): string {
  const istDate = typeof date === 'string' ? convertToIST(date) : date;
  return istDate.toLocaleString('hi-IN', {
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
 * जांचें कि परीक्षा शुरू हो गई है या नहीं
 * Check if exam has started
 */
export function hasExamStarted(startTime: string | Date): boolean {
  const now = getCurrentISTTime();
  const start = convertToIST(startTime);
  return now >= start;
}

/**
 * जांचें कि परीक्षा समाप्त हो गई है या नहीं
 * Check if exam has ended
 */
export function hasExamEnded(endTime: string | Date): boolean {
  const now = getCurrentISTTime();
  const end = convertToIST(endTime);
  return now >= end;
}

/**
 * परीक्षा के लिए शेष समय प्राप्त करें (सेकंड में)
 * Get remaining time for exam in seconds
 */
export function getExamRemainingTime(
  startedAt: string | Date,
  durationMinutes: number
): number {
  const now = getCurrentISTTime();
  const started = convertToIST(startedAt);
  const elapsedSeconds = getTimeDifferenceInSeconds(started, now);
  const totalSeconds = durationMinutes * 60;
  return Math.max(0, totalSeconds - elapsedSeconds);
}
