# Exam Timer Fix - Testing Guide

## Quick Test Steps

### Step 1: Clean Up Old Data (Important!)

Before testing, you should delete any existing exam attempts and exams that were created before the fix, as they may have incorrect timestamps.

**Option A: Delete via Admin Panel**
1. Login as Admin
2. Go to Exams management
3. Delete all test exams

**Option B: Delete via Database** (if you have access)
```sql
-- Delete all exam attempts
DELETE FROM exam_attempts;

-- Delete all exams (optional, or just delete specific test exams)
DELETE FROM exams WHERE title LIKE '%Test%';
```

### Step 2: Create a New Test Exam

1. **Login as Teacher**
2. **Navigate to**: Create Exam page
3. **Fill in the form**:
   - Title: "Timezone Test Exam"
   - Select a question paper
   - Select class and subject
   - **Start Date**: Today's date
   - **Start Time**: Current time + 2 minutes (e.g., if it's 10:00 AM now, enter 10:02)
   - **End Date**: Today's date
   - **End Time**: Start time + 35 minutes (e.g., 10:37)
   - **Duration**: 30 minutes
   - **Passing Marks**: Any value
   - **Exam Type**: Practice (so it's published immediately)

4. **Click**: Create Exam

### Step 3: Wait and Start Exam

1. **Wait** until the start time arrives (2 minutes)
2. **Login as Student** (or switch to student account)
3. **Navigate to**: Available Exams
4. **Find**: "Timezone Test Exam"
5. **Click**: "Start Exam"

### Step 4: Verify Timer

**Expected Results:**
- ✅ Timer should display approximately **30:00** (30 minutes)
- ✅ Timer should **count down** (29:59, 29:58, etc.)
- ✅ You should be able to **answer questions**
- ✅ **NO** "Time Up!" message should appear immediately

**If you see:**
- ❌ Timer shows **00:00**
- ❌ "Time Up!" message appears immediately
- ❌ Exam auto-submits right away

**Then the issue is NOT fixed. Please check:**
1. Did you clear old exam data?
2. Did you create a NEW exam after the code fix?
3. Check browser console for any errors

### Step 5: Test Auto-Submit (Optional)

If you want to verify auto-submit works correctly:

1. **Create another test exam** with:
   - Duration: **2 minutes** (for quick testing)
   - Start time: Current time + 1 minute

2. **Start the exam** when available

3. **Wait** for the full 2 minutes

4. **Verify**:
   - ✅ Timer counts down from 02:00 to 00:00
   - ✅ "Time Up!" message appears ONLY when timer reaches 00:00
   - ✅ Exam auto-submits at the end

## Troubleshooting

### Issue: Timer still shows 00:00

**Possible Causes:**
1. **Old exam data**: You're testing with an exam created before the fix
   - **Solution**: Delete the exam and create a new one

2. **Browser cache**: Old JavaScript code is cached
   - **Solution**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

3. **Exam times are in the past**: The exam start/end times have already passed
   - **Solution**: Create a new exam with future times

### Issue: Exam says "Not started yet" or "Ended"

**Possible Causes:**
1. **System time mismatch**: Your computer's clock is not synchronized
   - **Solution**: Check your system time and timezone settings

2. **Exam times set incorrectly**: Start/end times don't match current time
   - **Solution**: Verify the exam times in the database or recreate the exam

### Issue: Timer shows wrong duration

**Possible Causes:**
1. **Duration mismatch**: The duration field doesn't match end_time - start_time
   - **Solution**: Ensure duration_minutes matches the time window

## Understanding the Fix

### What Was Wrong

The system was incorrectly handling timezones:
- Teacher enters "10:00 AM" thinking it's IST
- System stored it in the wrong timezone
- When student starts exam, time calculation was incorrect
- Timer showed 0 seconds immediately

### What Was Fixed

1. **Proper IST to UTC conversion**: When teacher enters times in IST, they're correctly converted to UTC for storage
2. **Consistent UTC usage**: All time comparisons use UTC
3. **Correct time calculations**: Remaining time is calculated accurately

### How It Works Now

```
Teacher Input (IST) → Convert to UTC → Store in Database
                                              ↓
Student Starts Exam → Get Current UTC → Calculate Remaining Time
                                              ↓
                                        Display Timer
```

## Need Help?

If the issue persists after following this guide:

1. **Check browser console** for error messages
2. **Verify exam data** in the database:
   ```sql
   SELECT id, title, start_time, end_time, duration_minutes 
   FROM exams 
   WHERE title = 'Timezone Test Exam';
   ```
3. **Check attempt data**:
   ```sql
   SELECT id, exam_id, started_at, status 
   FROM exam_attempts 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

4. **Review the TIMEZONE_FIX_README.md** for technical details
