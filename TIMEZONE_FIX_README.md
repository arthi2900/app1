# Timezone Fix - Exam Timer Issue Resolution

## Problem Summary

The exam timer was showing 0 seconds and auto-submitting immediately when students tried to take exams. This was caused by incorrect timezone handling throughout the application.

## Root Causes Identified

### 1. Incorrect Timezone Conversion Functions
The original `getCurrentISTTime()` and `convertToIST()` functions were using `toLocaleString()` which created a double timezone conversion problem:
- Converted time to IST string format
- Parsed that string as if it were in the local timezone
- This resulted in incorrect time calculations

### 2. Exam Creation Timezone Issue
When teachers created exams:
- They entered date/time thinking it was IST (as indicated by UI labels)
- The code used `new Date('2025-12-25T10:00')` which creates a date in the **browser's local timezone**
- If the browser wasn't in IST, this stored the wrong UTC time in the database

## Fixes Implemented

### 1. Timezone Utility Functions (`src/utils/timezone.ts`)

**Fixed Functions:**
- `getCurrentISTTime()`: Now correctly adds IST offset to current UTC time
- `convertToIST()`: Now correctly adds IST offset to UTC timestamps
- `hasExamStarted()`: Now compares UTC times directly
- `hasExamEnded()`: Now compares UTC times directly
- `getExamRemainingTime()`: Now calculates based on UTC timestamps

**New Function:**
- `convertISTInputToUTC()`: Properly converts IST date/time input to UTC for storage
  - Example: "2025-12-25" + "10:00" (IST) → "2025-12-25T04:30:00.000Z" (UTC)

### 2. CreateExam Component (`src/pages/teacher/CreateExam.tsx`)

**Changes:**
- Added import for `convertISTInputToUTC`
- Updated `handleSubmit` to properly convert IST input to UTC before storing
- Now correctly handles timezone conversion regardless of browser's timezone

### 3. TakeExam Component (`src/pages/student/TakeExam.tsx`)

**Changes:**
- Changed exam attempt creation to use `new Date().toISOString()` (UTC)
- Removed unnecessary `getCurrentISTTime()` import
- Simplified time handling to work with UTC consistently

### 4. StudentExams Component (`src/pages/student/StudentExams.tsx`)

**Changes:**
- Removed unused `getCurrentISTTime` import

## Key Principles

The fix is based on these principles:

1. **Store times in UTC**: All timestamps in the database are stored in UTC (Supabase default)
2. **Compare times in UTC**: All time comparisons use UTC timestamps directly
3. **Convert to IST only for display**: Only convert to IST when showing times to users
4. **Explicit IST input conversion**: When users enter times in IST, explicitly convert to UTC

## Testing Instructions

### For Existing Exams

**IMPORTANT**: Any exams created before this fix may have incorrect start/end times. You should:

1. **Delete old test exams** and create new ones
2. **Or manually update** existing exam times in the database

### Creating a New Test Exam

1. **Login as Teacher**
2. **Create a new exam** with:
   - Start time: Current time + 2 minutes (in IST)
   - Duration: 30 minutes
   - End time: Start time + 35 minutes

3. **Wait until start time**

4. **Login as Student**

5. **Start the exam**

6. **Verify**:
   - Timer should show approximately 30:00 (30 minutes)
   - Timer should count down normally
   - Exam should NOT auto-submit immediately

### Expected Behavior

**Before Fix:**
- ❌ Timer shows 00:00:00 immediately
- ❌ "Time Up!" message appears right away
- ❌ Exam auto-submits before student can answer

**After Fix:**
- ✅ Timer shows full duration (e.g., 30:00)
- ✅ Timer counts down correctly
- ✅ Student can take the full exam
- ✅ Auto-submit only happens when time actually expires

## Technical Details

### Time Calculation Flow

1. **Teacher creates exam (IST input)**:
   ```typescript
   Input: "2025-12-25" + "10:00" (IST)
   ↓ convertISTInputToUTC()
   Stored: "2025-12-25T04:30:00.000Z" (UTC)
   ```

2. **Student starts exam**:
   ```typescript
   started_at: new Date().toISOString() // Current UTC time
   ```

3. **Calculate remaining time**:
   ```typescript
   now = new Date() // Current UTC
   started = new Date(attempt.started_at) // Parse UTC timestamp
   elapsed = (now - started) / 1000 // Seconds elapsed
   remaining = (duration * 60) - elapsed // Seconds remaining
   ```

4. **Display to user**:
   ```typescript
   formatISTDateTime(utcTimestamp) // Converts UTC to IST for display
   ```

### Example Calculation

- **Exam Duration**: 30 minutes
- **Started At**: 2025-12-24T16:00:00.000Z (UTC)
- **Current Time**: 2025-12-24T16:02:00.000Z (UTC)
- **Elapsed**: 120 seconds (2 minutes)
- **Remaining**: 1680 seconds (28 minutes)
- **Display**: "28:00" on timer

## Files Modified

1. `src/utils/timezone.ts` - Complete rewrite of timezone functions
2. `src/pages/teacher/CreateExam.tsx` - Fixed exam creation with IST input
3. `src/pages/student/TakeExam.tsx` - Fixed exam attempt timestamp
4. `src/pages/student/StudentExams.tsx` - Cleaned up imports

## Verification

All code quality checks pass:
- ✅ TypeScript compilation (110 files)
- ✅ Biome lint checks
- ✅ Custom rule checks
- ✅ Tailwind CSS validation
- ✅ Build test

## Notes

- The fix maintains backward compatibility for display functions
- All existing timezone display logic continues to work
- The system now correctly handles UTC timestamps regardless of user's browser timezone
- IST (UTC+5:30) is properly handled for both input and display
