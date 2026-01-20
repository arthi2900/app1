# Exam Issue Investigation Report
## Exam: Series 1_1 - Student: Janani D

---

## PROBLEM SUMMARY

**Issue**: Janani D answered only 16 out of 20 questions but received 100% score instead of 80%.

**Expected Result**: 
- Marks Obtained: 16/20
- Percentage: 80%
- Status: Pass (passing marks = 7)

**Actual Result**:
- Marks Obtained: 16/20
- Percentage: 100% ❌ (INCORRECT)
- Status: Pass

---

## INVESTIGATION FINDINGS

### 1. Exam Details
- **Exam ID**: c4cb04b8-d9c7-4e7e-a6e4-2e9a32fb8d53
- **Exam Name**: Series 1_1
- **Total Questions**: 20
- **Total Marks**: 20 (1 mark per question)
- **Passing Marks**: 7
- **Duration**: 20 minutes
- **Start Time**: Jan 20, 2026, 05:05 PM
- **End Time**: Jan 20, 2026, 05:59 PM

### 2. Student Performance
- **Student**: Janani D (username: janani_irula)
- **Attempt ID**: cd14a123-26b0-4cd5-9e1e-71c0e8ad474a
- **Questions Answered**: 16 out of 20
- **Correct Answers**: 16 (all answered questions were correct)
- **Incorrect Answers**: 0
- **Unanswered Questions**: 4

### 3. Missing Questions (Not Answered by Janani)

| Display Order | Original Serial # | Question Text | Marks |
|--------------|-------------------|---------------|-------|
| 2 | 006 | Synonyms - ascending | 1 |
| 18 | 046 | Antonyms - plunge | 1 |
| 19 | 049 | Antonyms - gruffly | 1 |
| 20 | 050 | Antonyms - mockingly | 1 |

**Total Missing Marks**: 4 marks

### 4. Questions Answered by Janani (All Correct)

1. Synonyms - devour → eat ✓
2. Synonyms - brink → edge ✓
3. Synonyms - preening → cleaning ✓
4. Synonyms - swooped → move quickly ✓
5. Synonyms - gnaw → chew ✓
6. Synonyms - cackled → laughed ✓
7. Synonyms - afraid → fear ✓
8. Synonyms - exhausted → tired ✓
9. Synonyms - seized → caught ✓
10. Antonyms - blazing → cooling ✓
11. Antonyms - plaintively → cheerfully ✓
12. Antonyms - afraid → brave ✓
13. Antonyms - eagerly → unwillingly ✓
14. Antonyms - floating → sinking ✓
15. Antonyms - forgot → remembered ✓
16. Antonyms - gradually → suddenly ✓

---

## ROOT CAUSE ANALYSIS

### The Bug in the System

The percentage calculation is performed by the database function `evaluate_exam_attempt()`. 

**Current (Incorrect) Logic**:
```sql
SELECT 
  COALESCE(SUM(marks_obtained), 0),
  COALESCE(SUM(marks_allocated), 0)
INTO total_obtained, total_possible
FROM exam_answers
WHERE attempt_id = attempt_uuid;

IF total_possible > 0 THEN
  calc_percentage := (total_obtained / total_possible) * 100;
END IF;
```

**Problem**: 
- The function calculates `total_possible` by summing `marks_allocated` from the `exam_answers` table
- This only includes questions that the student answered
- For Janani: total_obtained = 16, total_possible = 16 (only answered questions)
- Result: (16/16) × 100 = 100% ❌

**Correct Logic Should Be**:
- `total_obtained` = Sum of marks from answered questions (16)
- `total_possible` = Total marks of the exam from `exams` table (20)
- Result: (16/20) × 100 = 80% ✓

---

## WHAT HAPPENED DURING THE EXAM

Based on the data:

1. **Janani started the exam** at the scheduled time
2. **She answered 16 questions** correctly in sequence
3. **She did NOT answer 4 questions**:
   - Question #2 (Synonyms - ascending)
   - Question #18 (Antonyms - plunge)
   - Question #19 (Antonyms - gruffly)
   - Question #20 (Antonyms - mockingly)
4. **She submitted the exam** at 05:10:03 PM (about 5 minutes after start)
5. **The system auto-evaluated** her answers (all MCQ questions)
6. **The system calculated percentage incorrectly** as 100% instead of 80%

**Possible Reasons for Missing Questions**:
- Time constraint (only 5 minutes used out of 20 minutes available)
- Questions may have been skipped intentionally or accidentally
- UI/UX issue where questions were not visible or accessible
- Student may have thought they completed all questions

---

## IMPACT ASSESSMENT

### Affected Students
This bug affects **ALL students** who:
- Do not answer all questions in an exam
- Submit the exam with some questions unanswered

### Current Impact
- **Janani's case**: Shows 100% instead of 80% (20% inflation)
- **Other students**: Need to check if they have similar issues

### Data Integrity
- The marks obtained (16) is correct
- The percentage calculation (100%) is incorrect
- The pass/fail status (pass) is correct (16 > 7 passing marks)

---

## PROPOSED SOLUTION

### Fix the `evaluate_exam_attempt()` Function

**Change Required**:
Instead of calculating `total_possible` from `exam_answers`, fetch it from the `exams` table.

**Modified SQL Logic**:
```sql
-- Get exam total marks
SELECT e.total_marks INTO total_possible
FROM exams e
JOIN exam_attempts ea ON ea.exam_id = e.id
WHERE ea.id = attempt_uuid;

-- Calculate marks obtained from answers
SELECT COALESCE(SUM(marks_obtained), 0)
INTO total_obtained
FROM exam_answers
WHERE attempt_id = attempt_uuid;

-- Calculate percentage based on exam total marks
IF total_possible > 0 THEN
  calc_percentage := (total_obtained / total_possible) * 100;
ELSE
  calc_percentage := 0;
END IF;
```

### Steps to Implement Fix

1. **Update the database function** `evaluate_exam_attempt()`
2. **Re-evaluate all existing exam attempts** to correct historical data
3. **Verify the fix** with test cases
4. **Update Janani's record** to show correct 80% percentage

---

## RECOMMENDATION

### Immediate Actions
1. ✅ **Approve this fix** to proceed with implementation
2. ✅ **Identify all affected students** across all exams
3. ✅ **Re-calculate percentages** for all affected attempts
4. ✅ **Notify affected students** if their results change

### Preventive Measures
1. Add validation to ensure all questions are answered before submission
2. Add a warning message when students skip questions
3. Show question navigation panel with answered/unanswered status
4. Add comprehensive test cases for percentage calculation

---

## AWAITING YOUR APPROVAL

**Please confirm if you want me to proceed with:**
1. ✅ Fixing the `evaluate_exam_attempt()` function
2. ✅ Re-evaluating Janani's exam attempt (and all other affected attempts)
3. ✅ Updating the percentage from 100% to 80%

**Type "APPROVED" to proceed with the fix.**

---

*Report Generated: 2026-01-20*
*Investigation by: AI Assistant*
