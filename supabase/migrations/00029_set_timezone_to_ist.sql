/*
# Set Database Timezone to Indian Standard Time

## Changes
1. Set default timezone to Asia/Kolkata (IST)
2. Update can_student_take_exam function to use IST
3. Ensure all time comparisons use IST

## Purpose
- All exam timing should be based on Indian Standard Time
- Automatic submission should happen based on IST
- Time displays should show IST
*/

-- Set database timezone to IST
ALTER DATABASE postgres SET timezone TO 'Asia/Kolkata';

-- Update the can_student_take_exam function to explicitly use IST
CREATE OR REPLACE FUNCTION can_student_take_exam(exam_uuid uuid, student_uuid uuid)
RETURNS jsonb AS $$
DECLARE
  exam_record RECORD;
  attempt_record RECORD;
  current_time_ist timestamptz;
  result jsonb;
BEGIN
  -- Get current time in IST
  current_time_ist := now() AT TIME ZONE 'Asia/Kolkata';
  
  -- Get exam details
  SELECT * INTO exam_record FROM exams WHERE id = exam_uuid;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('can_take', false, 'reason', 'தேர்வு கிடைக்கவில்லை');
  END IF;
  
  -- Check if exam is published
  IF exam_record.status != 'published' THEN
    RETURN jsonb_build_object('can_take', false, 'reason', 'தேர்வு வெளியிடப்படவில்லை');
  END IF;
  
  -- Check if exam has started (compare in IST)
  IF (exam_record.start_time AT TIME ZONE 'Asia/Kolkata') > current_time_ist THEN
    RETURN jsonb_build_object('can_take', false, 'reason', 'தேர்வு இன்னும் தொடங்கவில்லை');
  END IF;
  
  -- Check if exam has ended (compare in IST)
  IF (exam_record.end_time AT TIME ZONE 'Asia/Kolkata') < current_time_ist THEN
    RETURN jsonb_build_object('can_take', false, 'reason', 'தேர்வு முடிந்துவிட்டது');
  END IF;
  
  -- Check if student already has an attempt
  SELECT * INTO attempt_record FROM exam_attempts 
  WHERE exam_id = exam_uuid AND student_id = student_uuid;
  
  IF FOUND THEN
    IF attempt_record.status = 'submitted' OR attempt_record.status = 'evaluated' THEN
      RETURN jsonb_build_object('can_take', false, 'reason', 'நீங்கள் ஏற்கனவே இந்த தேர்வை சமர்ப்பித்துவிட்டீர்கள்');
    ELSIF attempt_record.status = 'in_progress' THEN
      RETURN jsonb_build_object('can_take', true, 'reason', 'உங்கள் தேர்வைத் தொடரவும்', 'attempt_id', attempt_record.id);
    END IF;
  END IF;
  
  RETURN jsonb_build_object('can_take', true, 'reason', 'நீங்கள் தேர்வைத் தொடங்கலாம்');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;