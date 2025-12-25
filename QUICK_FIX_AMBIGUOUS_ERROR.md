# Quick Fix: Ambiguous Column Error

## Problem
Student sees red error: "Error Saving Answer - Your answer may not have been saved."

Console shows:
```
❌ Failed to save answer: column reference "correct_answer" is ambiguous
```

## Solution Applied ✅

**Migration:** `00031_fix_ambiguous_column_error.sql`

**What was fixed:**
- Renamed database function variables to avoid conflicts
- Changed `is_correct` → `v_is_correct`
- Changed `marks_to_award` → `v_marks_to_award`
- Added explicit table qualifications

## Immediate Actions

### 1. Verify Fix is Applied
```sql
-- Run in Supabase SQL Editor
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'auto_grade_objective_questions';
-- Should show function with v_is_correct and v_marks_to_award
```

### 2. Test with Student Exam
1. Login as student
2. Start or continue exam
3. Answer a question
4. Check browser console (F12)
5. Look for: "✅ Answer saved successfully"

### 3. For AJIS C's Current Exam
**Status:** Exam in progress, ~59 minutes remaining

**Options:**
1. **Continue exam** (Recommended) - Fix is applied, can continue
2. **Re-select answer** - Click "A pair of Shoes" again to save
3. **Restart exam** - If student prefers fresh start

## Expected Results

### Before Fix:
```javascript
❌ Failed to save answer: {
  code: '42702',
  message: 'column reference "correct_answer" is ambiguous'
}
```

### After Fix:
```javascript
✅ Answer saved successfully: {
  id: "...",
  student_answer: "A pair of Shoes",
  created_at: "2025-12-26T..."
}
```

## Testing Checklist

- [ ] Run verification query (should show updated function)
- [ ] Test answer saving (should see success message)
- [ ] Check database (answer should be stored)
- [ ] Complete exam (should submit successfully)
- [ ] View results (should show all answers)

## If Issues Persist

### Check Console:
```javascript
// Should see this:
✅ Answer saved successfully

// Should NOT see:
❌ Failed to save answer: column reference "correct_answer" is ambiguous
```

### Check Database:
```sql
-- Verify function exists
SELECT COUNT(*) FROM pg_proc WHERE proname = 'auto_grade_objective_questions';
-- Should return: 1
```

### Manual Test:
```sql
-- Test the function directly
SELECT auto_grade_objective_questions('YOUR_ATTEMPT_ID');
-- Should return: {"success": true, "graded_count": X, ...}
```

## Support

**Documentation:**
- FIX_AMBIGUOUS_COLUMN_ERROR.md - Complete technical details
- FIX_NO_ANSWERS_FOUND.md - Previous RLS fix
- VERIFY_DATA_STORAGE.md - Verification procedures

**SQL Scripts:**
- verify_data_storage.sql - Diagnostic queries

**Migrations:**
- 00031_fix_ambiguous_column_error.sql - This fix
- 00030_fix_exam_answers_insert_policy.sql - RLS fix

---

**Status:** ✅ Fixed  
**Date:** December 26, 2025  
**Next Step:** Test with student exam
