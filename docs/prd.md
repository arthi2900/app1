# A Cube - Online Exam System Requirements Document

## 1. Application Description

### 1.1 Application Name
A Cube - Online Exam System

### 1.2 Application Purpose
A comprehensive online exam management platform for educational institutions, focusing on NEET preparation and school-level assessments. The system enables schools to create, conduct, and analyze exams efficiently with features including school management, academic structure setup, teacher-subject-class-section mapping, question bank management with bulk upload capability, question paper preparation, online exam creation with approval workflow, user management with school-based data isolation, student allocation tracking, and detailed performance analytics.

### 1.3 Tagline
Smart • Secure • Scalable Online Exams

## 2. User Roles\n
### 2.1 Admin\n- Complete system administration
- School management (create, edit, view schools)
- User account creation and management
- New user approval management
- Role-based Access Control setup
- System configurations\n- Permission management
- User profile editing and suspension management
- Cross-school visibility: Admin can view and manage all schools and users across the entire system
- Full management rights: Create, edit, suspend, delete all users and schools
- Force Delete Exam capability: Can permanently delete exams with student attempts after strict confirmation

### 2.2 Principal
- Academic Management (within assigned school only):\n  - Class creation\n  - Section creation
  - Subject creation (class-wise)
  - Lesson creation (subject-wise)
  - Student class-section mapping
- Teacher Management (within assigned school only):
  - View teacher accounts
  - Teacher-subject-class-section mapping\n  - View class-section overview with assigned teachers per subject
  - Edit teacher profiles
- Student Management (within assigned school only):\n  - View students list
  - View student class-section assignments
- Question Bank Management (within assigned school only):
  - Create and manage questions with lesson-level tracking
  - Bulk upload questions from Excel/CSV template
  - Insert images/clip arts in questions
  - Use rich text editor for question text formatting (bold, underline, italic, etc.)
  - View question bank analytics
  - Switch between Row View and Card View
  - Edit questions in both views
- Question Paper History Access (within assigned school only):
  - View all question papers created by teachers in their school
  - Filter and search question paper history
  - Export and print historical question papers
  - Preview question papers before printing
  - Print directly from preview dialog
- Online Exam Management (within assigned school only):
  - Approve school-level exams created by teachers
  - Create exams directly without approval requirement
  - Create exams from school question bank without approval
  - View all online exams (practice and school-level) created by teachers
  - View student allocation list with attendance status for each exam
  - Monitor exam status and student participation
  - Access exam analytics and reports
  - View individual student exam results with question-wise performance
  - Delete exams created by self (with restrictions)
  - Force Delete Exam capability: Can permanently delete exams with student attempts after strict confirmation
- Profile editing capability\n- Linked to specific school from school master list
- School-based isolation: Can only view and manage users (teachers and students) from their assigned school

### 2.3 Teacher
- View assigned classes, sections, and subjects
- View students of assigned sections only
- Student Management (within assigned sections only):
  - View students list with enhanced search and filter functionality
  - Search by student name, phone number, or email
  - Filter by class and section
  - View student details including name, class, section, phone number, and account status
- Question Bank Access:\n  - Create questions for assigned subjects and lessons
  - Bulk upload questions from Excel/CSV template
  - Insert images/clip arts in questions
  - Use rich text editor for question text formatting (bold, underline, italic, etc.)
  - View questions filtered by assigned subjects\n  - Switch between Row View and Card View
  - Edit own questions in both views
- Question Paper Preparation:
  - Create question papers from own question bank
  - Select questions by class and subject
  - Shuffle questions and MCQ options
  - Preview, save as draft, generate final paper
  - Export as PDF and print
  - Save shuffled papers with auto-versioned names (Shuffled A, Shuffled B, etc.)
- Question Paper History:\n  - View all question papers created by self
  - Filter by class, subject, date range, status
  - View, edit, delete, export, print historical papers
  - Preview question papers before printing
  - Print directly from preview dialog
  - Create new versions from existing papers
  - Track paper creation and modification history
- Online Exam Management:
  - Create practice exams (no approval required) to assess student understanding
  - Create school-level exams (requires Principal approval before scheduling)
  - Configure exam settings (duration, start/end time, negative marking)
  - Note: Passing marks are automatically calculated as 35% of total marks
  - Publish practice exams directly to assigned sections
  - Submit school-level exams for Principal approval
  - View student allocation list with attendance status for own exams
  - Monitor student participation in real-time
  - View submitted answers and auto-graded results
  - View individual student exam results with question-wise performance analysis
  - Identify which students answered correctly and which answered incorrectly for each question
  - Manually grade subjective questions (Short Answer, Essay)\n  - Generate exam reports and analytics
  - Export exam results\n  - Delete own exams (with restrictions, cannot force delete exams with student attempts)
- Profile editing capability
- Linked to specific school from school master list
- School-based isolation: Can only view and interact with students from their assigned sections

### 2.4 Student
- View my class, section, subjects, and teachers
- Online Exam Access:
  - Login with individual student account
  - View assigned online exams (practice and school-level)
  - Take online exams with exam interface including question palette panel and timer
  - Submit answers before deadline
  - View auto-evaluated results for objective questions
  - View exam results and feedback (after teacher publishes results)
  - View pass/fail status based on 35% passing threshold
  - View detailed performance analysis
  - Review correct answers (if enabled by teacher)
- Profile editing capability
- Linked to specific school from school master list
- School-based isolation: Can only view personal information from their assigned school

### 2.5 User Profile Information
All users (Admin, Principal, Teacher, Student) will have the following profile information:
- User name\n- Email address
- Role\n- School name (mandatory field, selected from dropdown list populated from School Master)
- Contact number
- Profile picture (optional)
- Account status (Pending Approval/Active/Suspended)
\n## 3. School Management Module

### 3.1 School Master
Admin can create and manage schools with the following details:
\n#### 3.1.1 School Information Fields
- School Name (unique, mandatory)
- Assignment (optional, selected from existing School Name)\n- School Address (mandatory)
- Contact Number (mandatory)
- Email Address (mandatory)
- School Code/ID (unique identifier, auto-generated by system)
- Affiliation/Board (mandatory, e.g., State Board, CBSE, ICSE, etc.)
- Class Range (mandatory):\n  - Class From (e.g., 1, 6, 9)\n  - Class To (e.g., 5, 10, 12)
- Subjects (mandatory, list of subjects offered by the school)
- Principal Name (mandatory, selected from existing user list with Principal role)
\n#### 3.1.2 School Management Features
- Create new school with all mandatory fields
- Edit existing school information
- View complete school list\n- Search and filter schools by name, code, or affiliation
- Auto-generate unique School Code/ID upon school creation
- Link Principal from existing user database (dropdown selection)
- Define subject list for each school
- Assign school to another school via Assignment field (optional)
\n#### 3.1.3 School-User Relationship
- When creating/editing user accounts, Admin selects school from dropdown (populated from School Master)
- Principal, Teacher, and Student roles must be linked to a school
- Admin role is not linked to any specific school
- One Principal can be assigned to only one school
- Multiple Teachers and Students can be assigned to same school

## 4. School-Based Data Isolation

### 4.1 Isolation Principle
- Users from same school form an isolated group
- Within each school group, Principal, Teachers, and Students can only see and interact with users based on their role-specific visibility rules
- Admin has cross-school visibility and can manage all schools\n
### 4.2 Isolation Implementation
\n#### 4.2.1 User Visibility Rules
- Admin: Can view all users from all schools
- Principal: Can only view teachers and students from assigned school, and question papers created by teachers in their school
- Teacher: Can only view students from assigned sections and own question papers (cannot view Principal or other teachers)\n- Student: Can only view their own profile and personal information (cannot view other students, teachers, or Principal)

#### 4.2.2 Search and Filter\n- All user lists are automatically filtered by school and role-based visibility rules
- Search functionality respects school-based isolation and role permissions
- Dropdown lists and selection options show only school-relevant and role-appropriate data

### 4.3 School Group Interconnection
- All users within same school are interconnected based on role-specific visibility\n- Principal oversees all teachers and students in their school
- Teachers can view student lists within their assigned sections (but not Principal or other teachers)
- Students can only access their own information\n- Communication and notifications are school-scoped and role-appropriate

## 5. Principal Dashboard - Academic Management Module

### 5.1 Principal Dashboard Overview
After Principal login, the dashboard displays seven main cards:
- Academic Management: Manage academic structure (classes, sections, subjects, lessons, student mapping)
- Teachers: Manage teacher accounts and teacher-subject-class-section mapping\n- Students: View and manage students\n- Question Bank: Manage exam questions with lesson-level tracking, bulk upload, and dual view options
- Question Paper History: View all question papers created by teachers in the school
- Online Exams: View and monitor all online exams created by teachers in the school
- Exam Approvals: Review and approve school-level exams submitted by teachers
\nUI Language Requirement: All card titles, labels, and UI text on Principal Dashboard must be displayed in English only.

### 5.2 Academic Card - Academic Structure Management

#### 5.2.1 Class Creation
- Principal can create classes for their assigned school
- Class information fields:\n  - Class Name (e.g., Class 6, Class 7, Class 8, etc.)
  - Class Code (auto-generated or manual entry)
  - Academic Year (e.g., 2024-2025)\n- Class list view with edit and delete options
- Classes are school-specific and isolated\n
#### 5.2.2 Section Creation
- Principal can create sections for each class
- Section information fields:\n  - Section Name (e.g., Section A, Section B, Section C)
  - Class (dropdown selection from created classes)
  - Maximum Students (optional)
- Section list view with class-wise filtering
- Sections are linked to specific classes within the school

#### 5.2.3 Subject Creation (Class-wise)
- Principal can create subjects for each class
- Subject information fields:
  - Subject Name (e.g., Mathematics, Science, English)\n  - Class (dropdown selection from created classes)
  - Subject Code (auto-generated or manual entry)
  - Subject Type (Core/Elective/Optional)
- Subject list view with class-wise filtering
- Subjects are class-specific and school-specific

#### 5.2.4 Lesson Creation (Subject-wise)
- Principal can create lessons for each subject
- Lesson information fields:
  - Lesson Name (mandatory, e.g., 'Algebra Basics', 'Photosynthesis', 'Shakespeare Introduction')
  - Subject (dropdown selection from created subjects)
  - Lesson Code (optional, e.g., 'MATH-L01', 'SCI-L05')
- Lesson list view with subject-wise filtering
- Lessons are subject-specific and school-specific

#### 5.2.5 Student Class-Section Mapping
- Principal can assign students to specific class and section
- Note: Student accounts are already created via Sign-Up process, only class-section assignment is done here
- Mapping interface:\n  - Student selection (dropdown or search from existing students in the school)
  - Class selection (dropdown)\n  - Section selection (dropdown, filtered by selected class)
  - Academic Year\n- Bulk assignment option for multiple students
- View current class-section assignments with edit and reassign options
- Students without class-section assignment are listed separately for easy identification

### 5.3 Teachers Card - Teacher Management\n
#### 5.3.1 Teacher Accounts
- Note: Teacher accounts are already created via Sign-Up process and mapped to school by Admin
- Principal can view all teachers in their assigned school
- Teacher list displays:
  - Teacher Name
  - Subject specialization
  - Phone Number
  - Account Status (Active/Pending/Suspended)
  - Edit Action: Edit button or pencil icon for each teacher row to enable profile editing
- Enhanced Search and Filter Functionality:
  - Text search bar for searching by teacher name, phone number, or email
  - Additional dropdown filters:\n    - Subject filter (dropdown showing all subjects in the school)
    - Status filter (dropdown with options: All, Active, Pending, Suspended)
- Combined search capability (text search + subject filter + status filter)
  - Real-time filtering as user types or selects filter options
  - Clear filters button to reset all search and filter criteria

#### 5.3.2 Teacher-Subject-Class-Section Mapping\n- Principal assigns teachers to specific subjects, classes, and sections
- Mapping interface:
  - Teacher selection (dropdown from school teachers)
  - Subject selection (dropdown from school subjects)
  - Class selection (dropdown from school classes)
  - Section selection (multi-select, filtered by selected class)\n- One teacher can be assigned to multiple subject-class-section combinations
- View current teacher assignments with edit and delete options
- This mapping determines which students a teacher can view\n
#### 5.3.3 Class-Section Overview
- Principal can view class-section overview showing:
  - Class and Section name
  - Assigned Teachers per Subject
  - Students List in that section
- Detailed view with subject-wise teacher assignments
- Student count per section
- Quick access to edit teacher assignments or student mappings

### 5.4 Students Card - Student Management
- Principal can view all students in their assigned school
- Student list displays:
  - Student Name
  - Class and Section
  - Phone Number
  - Account Status (Active/Pending/Suspended)
- Enhanced Search Functionality:
  - Text search bar for searching by name, phone, or email
  - Additional dropdown filters for Class and Section
  - Combined search capability (text search + class filter + section filter)
- Filter and search options by class, section, or name
- Click on student to view detailed profile and academic records
\n### 5.5 Question Bank Card - Question Management
- Principal can access Question Bank management interface
- Create, edit, and delete questions for exam preparation
- Bulk upload questions from Excel/CSV template file
- Insert images/clip arts in questions
- Use rich text editor for question text formatting (bold, underline, italic, etc.)\n- Dual View Options:
  - Row View (table format)\n  - Card View (detailed card format)
- View all questions with lesson-level filtering
- Analytics dashboard for question bank performance

### 5.6 Question Paper History Card - Historical Paper Management
- Principal can access Question Paper History interface
- View all question papers created by teachers in their school
- Filter by teacher name, class, subject, date range, paper status
- Search by paper name or paper ID
- View detailed paper information\n- Actions available:
  - View paper details\n  - Preview paper with print option
  - Export as PDF
  - Print paper directly from preview dialog
- Analytics dashboard showing paper creation trends

### 5.7 Online Exams Card - Exam Monitoring and Management
- Principal can access Online Exams interface
- View all online exams (practice and school-level) created by teachers and self in their school
- Filter by teacher name, class, subject, exam status, exam type, date range
- Search by exam name or exam ID
- View exam overview including:\n  - Exam name
  - Exam type badge (Practice/School-Level)
  - Approval status (for school-level exams)
  - Created by (teacher name)
  - Class and Subject
  - Exam duration
  - Start and end date/time
  - Exam status\n  - Total marks and passing marks (35% of total marks)
  - Total students assigned
  - Students completed
  - Average score
- Actions available:
  - View exam details
  - View student allocation list with attendance status
  - View individual student exam results
  - View student participation report
  - Export exam results
  - View exam analytics
  - Delete exam (for self-created exams only, with restrictions)
  - Force Delete exam (for self-created exams with student attempts, requires strict confirmation)

### 5.8 Exam Approvals Card - School-Level Exam Approval Management
Principal can review and approve school-level exams submitted by teachers\n\nApproval Dashboard Layout:
- Pending Approvals Section
- Exam Review Page
- Approval History Section
- Approval Statistics
- Notification System
\n## 6. Question Bank Module

### 6.1 Question Bank Overview
- Centralized repository for exam questions
- Questions organized by Class, Subject, and Lesson
- Support for multiple question types\n- Difficulty levels (Easy, Medium, Hard)\n- Marks allocation per question
- Minus Mark (Negative Marking) support
- Lesson-level tracking for performance analytics
- Image/Clip Art support\n- Rich text editor integration for question text formatting
- Bulk upload functionality for efficient question import
- Dual view display options: Row View and Card View

### 6.2 Question Bank Table Structure
Table name: question_bank

Columns:
- id (UUID, Primary Key)
- school_id (Foreign Key → schools.id)
- class_id (Foreign Key → classes.id)\n- subject_id (Foreign Key → subjects.id)
- lesson_id (Foreign Key → lessons.id)
- bank_name (Varchar, auto-generated)
- question_text (Text, required, supports rich text HTML formatting)
- question_type (Enum: Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ)\n- marks (Integer, required)
- minus_mark (Decimal, optional)
- difficulty (Enum: Easy, Medium, Hard)\n- options (JSON array)\n- correct_answer (Text or JSON array)\n- question_images (JSON array, optional)
- created_by (Foreign Key → users.id)
- created_at (Timestamp)
- updated_at (Timestamp)
\n### 6.3 Question Creation Form
\n#### 6.3.1 Form Field Order
1. Class (Dropdown, required)
2. Subject (Dropdown, required)
3. Lesson (Dropdown, required)
4. Question (Rich Text Editor, required)
   - Integrated rich text editor (Quill, Draft.js, or TinyMCE)
   - Toolbar options: Bold, Italic, Underline, Strikethrough, Font Size, Font Color, Highlight, Alignment, Lists, Links, etc.
   - Support for formatted text input with real-time preview
5. Insert Images/Clip Arts (Image upload field, optional)
6. Question Type (Dropdown, required)
7. Marks (Number input, required)
8. Minus Mark (Number input, optional)
9. Difficulty (Dropdown, required)
10. Options (Dynamic fields, conditional)\n11. Correct Answer (Text input, dropdown, or multi-select, required)
\n#### 6.3.2 Form Behavior
- Cascading Dropdowns: Class → Subject → Lesson\n- Auto-generation: bank_name field is auto-generated upon form submission
- Validation: All required fields must be filled before submission
- Form Persistence Issue Fix: After submitting a question, the form should clear all fields except Class and Subject
- Rich Text Editor Behavior:\n  - Toolbar appears above the question text input area
  - Real-time formatting preview as user types
  - HTML content saved to database
  - Sanitization of HTML to prevent XSS attacks
\n#### 6.3.3 Rich Text Editor Integration Details
- Editor Library Options:
  - Quill (Recommended): Lightweight, modern, easy to integrate
  - Draft.js: React-based, highly customizable
  - TinyMCE: Feature-rich, enterprise-grade
- Toolbar Configuration:
  - Basic formatting: Bold, Italic, Underline, Strikethrough
  - Text styling: Font size, Font family, Text color, Background color
  - Alignment: Left, Center, Right, Justify
  - Lists: Ordered list, Unordered list\n  - Insert: Link, Image (optional)
  - Clear formatting button
- Implementation Requirements:
  - Responsive design for mobile and desktop
  - Accessibility support (ARIA labels, keyboard navigation)\n  - HTML sanitization to prevent malicious code injection
  - Save formatted content as HTML in database
  - Display formatted content correctly in question preview, exam interface, and reports

### 6.4 Bulk Upload Questions Feature

#### 6.4.1 Bulk Upload Overview
- Purpose: Enable teachers and principals to upload multiple questions at once from Excel/CSV file
- Supported Question Types: All question types (Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ) can be uploaded in the same file
- Access: Available to both Teacher and Principal roles
- Key Benefits:
  - Save time by importing large number of questions
  - Reduce manual data entry errors
  - Standardize question format\n  - Easy migration from existing question banks
\n#### 6.4.2 Bulk Upload Interface
\nInterface Layout:
- Bulk Upload Button: Prominently displayed on Question Bank page
- Upload Dialog: Modal dialog with following sections:
  1. Download Template Section
  2. Upload File Section
  3. Validation Results Section
  4. Import Summary Section
\n#### 6.4.3 Template File Structure
\nTemplate File Format: Excel (.xlsx) or CSV (.csv)\n
Template Columns (in order):
1. Class (Text, required) - e.g., 'Class 6', 'Class 7'
2. Subject (Text, required) - e.g., 'Mathematics', 'Science'
3. Lesson (Text, required) - e.g., 'Algebra Basics', 'Photosynthesis'
4. Question Text (Text, required) - Plain text or basic HTML formatting
5. Question Type (Text, required) - Options: 'Multiple Choice', 'True/False', 'Short Answer', 'Essay', 'Match the Following', 'Multiple Response MCQ'\n6. Marks (Number, required) - e.g., 1, 2, 5
7. Minus Mark (Number, optional) - e.g., 0.25, 0.5, 1\n8. Difficulty (Text, required) - Options: 'Easy', 'Medium', 'Hard'
9. Option A (Text, conditional) - Required for MCQ types
10. Option B (Text, conditional) - Required for MCQ types
11. Option C (Text, conditional) - Optional for MCQ types
12. Option D (Text, conditional) - Optional for MCQ types
13. Option E (Text, conditional) - Optional for MCQ types
14. Correct Answer (Text, required) - Format varies by question type
15. Image Path (Text, optional) - Path to image file or URL
\nTemplate Instructions Sheet:
- Separate sheet in Excel file with detailed instructions\n- Column descriptions and data format requirements
- Examples for each question type
- Common errors and how to avoid them
- Validation rules\n
#### 6.4.4 Question Type Specific Format

**Multiple Choice Questions:**
- Question Type: 'Multiple Choice'
- Options: Fill Option A, Option B, and optionally Option C, Option D, Option E
- Correct Answer: Single letter (A, B, C, D, or E)
- Example: Correct Answer = 'B'
\n**Multiple Response MCQ:**
- Question Type: 'Multiple Response MCQ'
- Options: Fill Option A, Option B, and optionally Option C, Option D, Option E
- Correct Answer: Multiple letters separated by comma (e.g., 'A,C,D')
- Example: Correct Answer = 'A,B,D'

**True/False Questions:**
- Question Type: 'True/False'\n- Options: Leave blank or fill 'True' and 'False'
- Correct Answer: 'True' or 'False'
- Example: Correct Answer = 'True'

**Short Answer Questions:**
- Question Type: 'Short Answer'
- Options: Leave blank\n- Correct Answer: Expected answer text or keywords
- Example: Correct Answer = 'Photosynthesis'

**Essay Questions:**
- Question Type: 'Essay'
- Options: Leave blank
- Correct Answer: Leave blank or provide sample answer
- Example: Correct Answer = 'Sample essay answer...'

**Match the Following:**
- Question Type: 'Match the Following'
- Options: Use Option A, Option B, Option C, Option D for left column items
- Correct Answer: Matching pairs in format 'A-1,B-2,C-3,D-4'
- Example: Correct Answer = 'A-2,B-1,C-4,D-3'

#### 6.4.5 Template Download Feature

Download Template Button:
- Prominently displayed in Bulk Upload dialog
- Downloads pre-formatted Excel file with:\n  - Column headers\n  - Sample data rows for each question type
  - Instructions sheet
  - Data validation rules (dropdowns for Question Type, Difficulty)\n\nTemplate File Contents:
- Sheet 1: Question Data (with sample rows)
- Sheet 2: Instructions and Examples
- Sheet 3: Valid Values Reference (Question Types, Difficulty Levels)
\n#### 6.4.6 File Upload Process

Step 1: File Selection
- User clicks 'Upload File' button
- File picker opens (accepts .xlsx, .csv)\n- User selects file from local system
- File name displayed in upload dialog

Step 2: File Validation
- Frontend validation:\n  - Check file format (.xlsx or .csv)
  - Check file size (max 10MB)
  - Check if file is not empty
- Backend validation:
  - Parse file content
  - Validate column headers
  - Validate data types
  - Check for required fields
  - Validate question type specific fields
  - Check for duplicate questions
  - Validate Class, Subject, Lesson existence

Step 3: Validation Results Display
- Show validation summary:\n  - Total rows in file
  - Valid rows
  - Invalid rows\n  - Error details for each invalid row
- Display validation errors in table format:\n  - Row Number
  - Error Type
  - Error Message\n  - Suggested Fix
- Allow user to download error report

Step 4: Import Confirmation
- If validation passes:
  - Show import summary
  - Display preview of questions to be imported
  - Confirm button to proceed with import
- If validation fails:\n  - Show error details
  - Option to download corrected template
  - Cancel and fix errors

Step 5: Import Execution
- Import valid questions to database
- Auto-generate bank_name for each question
- Link questions to school, class, subject, lesson
- Set created_by to current user
- Handle image uploads if image paths provided
- Show progress indicator during import

Step 6: Import Results
- Display import summary:\n  - Total questions imported
  - Questions by question type
  - Questions by difficulty level
  - Questions by class and subject
- Success message\n- Option to view imported questions
- Option to upload another file

#### 6.4.7 Error Handling and Validation Rules

Validation Rules:
1. Required Fields: Class, Subject, Lesson, Question Text, Question Type, Marks, Difficulty, Correct Answer
2. Class Validation: Must exist in school's class list
3. Subject Validation: Must exist in school's subject list for selected class
4. Lesson Validation: Must exist in subject's lesson list\n5. Question Type Validation: Must be one of valid question types
6. Marks Validation: Must be positive number
7. Minus Mark Validation: Must be non-negative number, less than marks
8. Difficulty Validation: Must be 'Easy', 'Medium', or 'Hard'
9. Options Validation: Required for MCQ types, at least 2 options
10. Correct Answer Validation: Format must match question type
11. Image Path Validation: If provided, must be valid file path or URL

Common Errors and Messages:
- Missing Required Field: 'Row X: [Field Name] is required'
- Invalid Class: 'Row X: Class [Class Name] does not exist in your school'
- Invalid Subject: 'Row X: Subject [Subject Name] does not exist for [Class Name]'
- Invalid Lesson: 'Row X: Lesson [Lesson Name] does not exist for [Subject Name]'
- Invalid Question Type: 'Row X: Question Type must be one of: Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ'
- Invalid Marks: 'Row X: Marks must be a positive number'
- Invalid Difficulty: 'Row X: Difficulty must be Easy, Medium, or Hard'
- Missing Options: 'Row X: At least 2 options required for Multiple Choice questions'
- Invalid Correct Answer Format: 'Row X: Correct Answer format is invalid for [Question Type]'
- Duplicate Question: 'Row X: Question text already exists in question bank'
\n#### 6.4.8 Bulk Upload Access Control

Teacher Access:
- Can bulk upload questions for assigned subjects only
- Questions automatically linked to teacher's school
- Backend validation ensures teacher can only upload for assigned subjects
- Cannot upload questions for other teachers' subjects

Principal Access:
- Can bulk upload questions for all subjects in their school
- Questions automatically linked to principal's school
- No subject restriction\n- Can upload questions for any class and subject in their school

Data Isolation:
- All uploaded questions are school-scoped
- Backend validation ensures data isolation
- Cross-school upload prevented
- Questions visible only to users from same school

#### 6.4.9 Bulk Upload UI Components

Bulk Upload Button:
- Location: Question Bank page, next to 'Add Question' button
- Icon: Upload icon with text 'Bulk Upload'
- Styling: Secondary button with gradient effect
- Tooltip: 'Upload multiple questions from Excel/CSV file'

Bulk Upload Dialog:
- Modal dialog with large size
- Glassmorphism styling consistent with overall theme
- Three main sections:
  1. Template Download Section (top)
  2. File Upload Section (middle)
  3. Results Section (bottom, shown after upload)
\nTemplate Download Section:
- Heading: 'Step 1: Download Template'
- Description: 'Download the Excel template file with sample data and instructions'
- Download Button: 'Download Template' with download icon
- Template file format info: 'Supports .xlsx and .csv formats'

File Upload Section:\n- Heading: 'Step 2: Upload File'
- Description: 'Upload your completed template file with questions'
- File Picker: Drag-and-drop area or click to browse
- Accepted formats: .xlsx, .csv
- Max file size: 10MB
- Upload Button: 'Upload and Validate' with upload icon

Validation Results Section:
- Shown after file upload and validation
- Summary Cards:\n  - Total Rows\n  - Valid Rows (green)
  - Invalid Rows (red)
- Error Table (if errors exist):
  - Columns: Row Number, Error Type, Error Message, Suggested Fix
  - Sortable and filterable
  - Export errors button
- Preview Table (if validation passes):
  - Shows first 10 questions to be imported
  - Columns: Question Text, Type, Class, Subject, Marks, Difficulty\n\nImport Confirmation Section:
- Shown after successful validation
- Import Summary:
  - Total questions to import
  - Breakdown by question type
  - Breakdown by difficulty\n- Confirm Button: 'Import Questions' with check icon
- Cancel Button: 'Cancel' with X icon
\nImport Results Section:
- Shown after successful import
- Success message with checkmark icon
- Import Statistics:
  - Total questions imported\n  - Questions by type (chart)
  - Questions by difficulty (chart)
  - Questions by class and subject (table)
- Action Buttons:
  - View Imported Questions
  - Upload Another File
  - Close Dialog

#### 6.4.10 Bulk Upload Performance Optimization

Performance Considerations:
- Batch processing for large files (process in chunks of 100 rows)
- Progress indicator showing percentage completed
- Asynchronous processing to prevent UI blocking
- Database transaction for atomic import (all or nothing)
- Rollback mechanism if import fails midway
- Caching of validation results\n- Optimized database queries for bulk insert

File Size Limits:
- Maximum file size: 10MB
- Maximum rows per file: 1000 questions
- If file exceeds limits, show error message and suggest splitting file

#### 6.4.11 Bulk Upload Notifications

Notifications:
- Upload Started: 'Uploading file...'
- Validation In Progress: 'Validating questions...'
- Validation Complete: 'Validation complete. X valid, Y invalid rows.'
- Import In Progress: 'Importing questions... X% complete'\n- Import Complete: 'Successfully imported X questions!'
- Import Failed: 'Import failed. Please check errors and try again.'

Email Notifications (Optional):
- Send email to user after bulk import completes
- Include import summary and statistics
- Attach error report if any errors occurred
\n#### 6.4.12 Bulk Upload Help and Documentation

Help Resources:
- Help icon next to Bulk Upload button
- Opens help dialog with:
  - Step-by-step guide
  - Video tutorial (optional)
  - FAQ section
  - Sample template download
  - Contact support link

FAQ Topics:
- How to format questions in template?\n- What question types are supported?
- How to upload images with questions?
- What to do if validation fails?
- How to fix common errors?
- Can I upload questions for multiple classes in one file?
- Can I upload all question types in same file?
\n### 6.5 Question Bank Dual View Display

#### 6.5.1 View Toggle Control
- View Switcher: Toggle button or tab control at the top of Question Bank page
- User can switch between views with single click
- Default view: Row View\n\n#### 6.5.2 Row View (Table Format)
Display Columns:
- Question (truncated text with expand option, displays formatted text preview)
- Image Indicator (icon showing if question has images)
- Class\n- Subject
- Lesson
- Question Type
- Difficulty
- Marks
- Minus Mark
- Actions (Edit, Delete)

#### 6.5.3 Card View (Detailed Card Format)
Card Layout: Each question displayed as a card with question text (rendered with formatting), images, metadata, options, and action buttons.

#### 6.5.4 Edit Functionality in Both Views
- Edit icon/button opens edit dialog with pre-filled form
- Rich text editor pre-populated with existing formatted content
- Image editing with local file selection
- Minus Mark editing with validation
\n### 6.6 Question Display in Exams and Reports
- All question text displayed with proper HTML rendering
- Formatting preserved in:\n  - Student exam interface
  - Question paper preview
  - Exam results and analytics
  - Exported PDFs and printed papers
- Consistent styling across all views

## 7. Question Paper Preparation Module

### 7.1 Question Paper Preparation Overview
- Purpose: Enable teachers to create question papers from their own question bank
- Access: Available only to Teacher role
- Workflow: Basic Details → Question Selection → Shuffle Options → Preview/Save/Generate
- Question text displayed with formatting in all stages

### 7.2 Question Paper Preparation Workflow

#### 7.2.1 Step 1: Basic Details
- Class Selection (Dropdown, required)
- Subject Selection (Dropdown, required)
\n#### 7.2.2 Step 2: Question Selection Source
- View All Questions or View Questions by Question Bank Name
- Question list displayed in row format (with formatted text preview)

#### 7.2.3 Step 3: Shuffle Functionality
- Shuffle Questions (Checkbox)
- Shuffle MCQ Options (Checkbox)
\n#### 7.2.4 Step 4: Final Question Paper Output
- Preview Question Paper (with formatted question text)
- Save as Draft\n- Generate Final Question Paper\n- Export as PDF (preserving text formatting)
- Print Option (preserving text formatting)

### 7.3 Question Paper Database Structure
Table name: question_papers

Columns:
- id (UUID, Primary Key)
- paper_name (Varchar, required)
- school_id (Foreign Key → schools.id)
- class_id (Foreign Key → classes.id)\n- subject_id (Foreign Key → subjects.id)
- created_by (Foreign Key → users.id)
- selected_questions (JSON array, includes formatted question text)
- shuffle_questions (Boolean)\n- shuffle_mcq_options (Boolean)
- paper_status (Enum: Draft, Final)\n- total_marks (Integer)
- total_questions (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)
- parent_paper_id (Foreign Key → question_papers.id, nullable)
- version_name (Varchar, optional)

### 7.4 Access Control & Data Isolation
- Teachers can access only their own question banks
- Backend validation ensures data isolation
- Teachers can only view and manage question papers created by themselves
- Principal can view all question papers created by teachers in their school

### 7.5 Question Paper Management Interface
- Question Paper List with filters\n- Actions: View, Edit, Delete, Export PDF, Print, Shuffle and Save
- All actions preserve question text formatting
\n### 7.6 Enhanced Question Paper Features
- Multiple Question Paper Versions
- Question Paper Templates
- Smart Question Selection
- Preview Enhancements (with formatted text rendering)
- Bulk Operations\n- Version History
- Shuffle and Save with Auto-Versioned Names

## 8. Question Paper History Module

### 8.1 Question Paper History Overview
- Purpose: Provide comprehensive tracking and management of all question papers created by teachers
- Access:\n  - Teachers can view only their own question paper history
  - Principal can view all question papers created by teachers in their school
- Key Features:
  - Complete historical record of all question papers
  - Advanced filtering and search capabilities
  - Paper versioning and relationship tracking
  - Export and print functionality (preserving formatting)
  - Preview with print option
  - Analytics and reporting

### 8.2 Question Paper History Interface

#### 8.2.1 History List View
Display Columns:
- Paper Name
- Class
- Subject
- Created By (Teacher Name)
- Creation Date
- Last Modified Date
- Paper Status (Draft/Final)
- Total Marks\n- Total Questions
- Version Info
- Actions\n
#### 8.2.2 Filter Options
- Teacher Filter (Principal only)
- Class Filter\n- Subject Filter
- Date Range Filter
- Paper Status Filter
- Version Type Filter
- Clear All Filters button

#### 8.2.3 Search Functionality\n- Text search bar
- Real-time search with auto-suggestions
- Combined search and filter capability

#### 8.2.4 Sorting Options
- Sort by Creation Date\n- Sort by Last Modified Date\n- Sort by Paper Name
- Sort by Class
- Sort by Total Marks
\n### 8.3 Question Paper Detail View
\n#### 8.3.1 Paper Information Section
- Paper Name\n- Paper ID\n- Class and Subject
- Created By
- Creation Date and Time
- Last Modified Date and Time
- Paper Status
- Total Marks
- Total Questions
- Version Information
\n#### 8.3.2 Question List Section
- Display all questions in the paper (with formatted text rendering)
- Question details with expand/collapse\n\n#### 8.3.3 Paper Settings Section
- Shuffle Questions: Yes/No
- Shuffle MCQ Options: Yes/No
- Paper Configuration Details

#### 8.3.4 Action Buttons
- Edit Paper
- Create New Version
- Preview Paper (opens preview dialog with print option)
- Export as PDF (preserving formatting)
- Print (opens print dialog from preview)
- Delete Paper
- Duplicate Paper
\n### 8.4 Question Paper Preview and Print Feature

#### 8.4.1 Preview Dialog
- Preview Button: Available in Question Paper History list and detail view
- Preview Dialog Layout:
  - Modal dialog with full-screen or large size
  - Paper header with paper name, class, subject, total marks
  - Question list with formatted text rendering
  - All questions displayed with proper formatting
  - Images and clip arts displayed correctly
  - MCQ options displayed with proper formatting
  - Page layout optimized for print
- Preview Dialog Actions:
  - Print Button: Opens browser print dialog
  - Close Button: Closes preview dialog
  - Export PDF Button (optional): Exports paper as PDF
\n#### 8.4.2 Print Functionality
- Print Button Behavior:
  - Clicking Print button in preview dialog opens browser print dialog
  - Print dialog shows paper with proper formatting
  - All questions, images, and formatting preserved
  - Page breaks handled correctly
  - Header and footer with paper details
- Print Settings:
  - Paper size: A4 (default)
  - Orientation: Portrait (default)
  - Margins: Standard\n  - Print background graphics: Enabled
- Print Preview:
  - Browser print preview shows paper exactly as it will be printed
  - All formatting, images, and layout preserved
  - Page numbers displayed

#### 8.4.3 Print Access Control
- Teacher Access:
  - Can preview and print own question papers
  - Cannot preview or print papers created by other teachers
- Principal Access:
  - Can preview and print all question papers created by teachers in their school
  - Cannot edit papers created by teachers\n- Data Isolation:
  - Print functionality respects school-based data isolation
  - Backend validation ensures proper access control

#### 8.4.4 Print Quality and Formatting
- High-quality print output:\n  - Clear, readable text
  - Proper font sizes and styles
  - Images printed with good resolution
  - Formatting preserved (bold, italic, underline, etc.)
- Page layout:
  - Proper margins and spacing
  - Page breaks at appropriate places
  - Header with paper name and details
  - Footer with page numbers
- Print optimization:
  - CSS print styles applied
  - Unnecessary UI elements hidden in print view
  - Content optimized for paper size

### 8.5 Question Paper History Analytics

#### 8.5.1 Analytics Dashboard (Principal View)
- Overview Cards\n- Charts and Graphs
- Detailed Statistics
\n#### 8.5.2 Analytics Dashboard (Teacher View)
- Overview Cards
- Charts and Graphs
- Personal Statistics

### 8.6 Question Paper History Access Control

#### 8.6.1 Teacher Access Rules
- Can view only own question paper history
- Can edit only own papers
- Can delete only own papers
- Can create new versions from own papers
- Cannot view papers created by other teachers
- Can preview and print own papers

#### 8.6.2 Principal Access Rules
- Can view all question papers created by teachers in their school
- Can filter by teacher name
- Can view detailed analytics for all teachers
- Can export and print any paper
- Cannot edit or delete papers created by teachers
- Can view paper details and question content (with formatting)
- Can preview and print all papers from their school

#### 8.6.3 Data Isolation
- All question paper history data is school-scoped
- Backend validation ensures teachers can only access own papers
- Principal can only access papers from their assigned school
- Cross-school data access is prevented at database level

### 8.7 Question Paper History Navigation

#### 8.7.1 Teacher Dashboard Integration
- Add 'Question Paper History' card to Teacher Dashboard
- Card displays recent papers and quick action button

#### 8.7.2 Principal Dashboard Integration\n- Add 'Question Paper History' card to Principal Dashboard
- Card displays school-wide statistics and quick action button

#### 8.7.3 Navigation Menu
- Add 'Question Paper History' menu item\n- Available for both Teacher and Principal roles

### 8.8 Question Paper History Export and Print

#### 8.8.1 Export Options
- Export Single Paper (preserving formatting)
- Bulk Export (preserving formatting)
\n#### 8.8.2 Print Options
- Print Single Paper (via preview dialog)
- Print directly from preview with browser print dialog
- All formatting preserved in print output
- Bulk Print (preserving formatting)

### 8.9 Question Paper History Notifications

#### 8.9.1 Teacher Notifications
- Notification when paper is successfully created
- Notification when shuffled version is generated
- Reminder for draft papers older than 30 days

#### 8.9.2 Principal Notifications
- Daily/weekly summary of papers created by teachers
- Notification when teacher creates new paper
- Monthly analytics report

## 9. Online Exam Module - Detailed Specifications

### 9.1 Online Exam Overview
- Purpose: Enable teachers to create, publish, and manage online exams for students
- Exam Types:
  - Practice Exams: No approval required
  - School-Level Exams: Requires Principal approval
  - Principal-Created Exams: No approval required
- Access:\n  - Teachers can create exams for assigned sections
  - Students can take assigned exams using individual login
  - Principal can create exams directly and approve teacher exams
- Key Features:
  - Create exams from question papers or question bank
  - Automatic passing marks calculation: 35% of total marks
  - Configure exam settings\n  - Approval workflow for school-level exams
  - Publish exams with automatic notifications
  - Enhanced student exam interface with question palette and timer
  - Question text displayed with formatting in exam interface
  - Real-time exam monitoring\n  - Automatic grading for objective questions
  - Manual grading for subjective questions
  - Comprehensive exam analytics
  - Student allocation list with attendance tracking
  - Individual student result details with question-wise analysis
  - Secure exam environment\n  - Export and reporting capabilities (preserving formatting)
  - Delete exam functionality with restrictions
  - Force Delete for Principal/Admin with strict confirmation

### 9.2 Online Exam Creation Workflow

#### 9.2.1 Step 1: Exam Basic Details
Form Fields:
- Exam Name (Text input, required)
- Exam Type (Radio buttons: Practice Exam / School-Level Exam)\n- Class (Dropdown, required)
- Subject (Dropdown, required)
- Section Selection (Multi-select checkbox, required)
- Exam Duration (Number input in minutes, required)
- Start Date and Time (Date-time picker, required)
- End Date and Time (Date-time picker, required)\n- Passing Marks (Auto-calculated, read-only display)
  - Automatically calculated as 35% of total marks
  - Display format: 'Passing Marks: XX marks (35% of Total Marks)'
  - Updated dynamically when questions are selected/changed
- Instructions for Students (Rich text editor, optional)
\n#### 9.2.2 Step 2: Question Selection Method
Method A: Select from Existing Question Paper
- Question Paper Dropdown\n- Paper Preview (with formatted question text)
- Auto-Import\n- Modification Options

Method B: Select Questions from Question Bank
- Question Bank View (with formatted question text preview)
- Filter Panel
- Question Selection Interface
- Selected Questions Panel
- Smart Selection Tools
- Question Preview (with formatting)

#### 9.2.3 Step 3: Exam Settings Configuration
Settings Panel:
1. Negative Marking Settings
2. Result Display Settings
3. Question Randomization Settings
4. Late Submission Settings
5. Exam Security Settings
6. Exam Monitoring Settings
\n#### 9.2.4 Step 4: Preview and Publish
Preview Section:
1. Exam Summary Card
2. Settings Summary Card
3. Question List Preview (with formatted text)
4. Student View Preview (with formatted text)
5. Validation Checks
\nAction Buttons:
- Back\n- Save as Draft
- For Practice Exams: Schedule Exam / Publish Now
- For School-Level Exams (Teacher): Submit for Approval
- For School-Level Exams (Principal): Schedule Exam / Publish Now
\n### 9.3 Online Exam Database Structure

#### 9.3.1 Exams Table
Table name: online_exams

Columns:
- id (UUID, Primary Key)
- exam_name (Varchar(100), required)
- exam_type (Enum: Practice, School-Level)\n- approval_status (Enum: Not Required, Pending, Approved, Rejected)
- approval_notes (Text, nullable)
- approved_by (Foreign Key → users.id, nullable)
- approval_date (Timestamp, nullable)
- school_id (Foreign Key → schools.id, required)
- class_id (Foreign Key → classes.id, required)
- subject_id (Foreign Key → subjects.id, required)
- created_by (Foreign Key → users.id, required)
- question_paper_id (Foreign Key → question_papers.id, nullable)
- selected_questions (JSON array, required, includes formatted question text)
- exam_duration (Integer, minutes, required)
- start_datetime (Timestamp with timezone, required)
- end_datetime (Timestamp with timezone, required)
- passing_marks (Decimal(10,2), auto-calculated, required)
  - Automatically calculated as 35% of total_marks
  - Formula: passing_marks = total_marks * 0.35
- instructions (Text, optional)
- negative_marking_enabled (Boolean)\n- show_results_immediately (Boolean)
- allow_answer_review (Boolean)
- randomize_questions (Boolean)
- randomize_mcq_options (Boolean)
- allow_late_submission (Boolean)
- late_submission_grace_period (Integer, minutes, nullable)
- late_submission_penalty (Decimal(5,2), percentage, nullable)
- browser_lock_enabled (Boolean)
- copy_paste_disabled (Boolean)
- exam_password (Varchar(100), nullable, encrypted)
- track_student_activity (Boolean)
- proctoring_enabled (Boolean)
- exam_status (Enum: Draft, Pending Approval, Approved, Scheduled, Ongoing, Completed, Cancelled, Rejected)
- total_marks (Integer, calculated, required)
- total_questions (Integer, calculated, required)
- created_at (Timestamp)
- updated_at (Timestamp)\n- published_at (Timestamp, nullable)
- auto_publish (Boolean)
\n#### 9.3.2 Exam Section Mapping Table
Table name: exam_sections

Columns:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)
- section_id (Foreign Key → sections.id, required)
- total_students (Integer, calculated)
- students_started (Integer, default 0)
- students_completed (Integer, default 0)
- created_at (Timestamp)
\n#### 9.3.3 Student Exam Attempts Table
Table name: student_exam_attempts

Columns:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)
- student_id (Foreign Key → users.id, required)
- start_time (Timestamp, nullable)
- end_time (Timestamp, nullable)
- submission_time (Timestamp, nullable)\n- is_late_submission (Boolean)
- time_taken (Integer, minutes, calculated)
- student_answers (JSON array, required)
- randomized_question_order (JSON array, nullable)
- randomized_mcq_options (JSON object, nullable)
- total_marks_obtained (Decimal(10,2), calculated)
- percentage (Decimal(5,2), calculated)
- pass_fail_status (Enum: Pass, Fail, Pending)
- Pass: If total_marks_obtained >= passing_marks (35% of total marks)
  - Fail: If total_marks_obtained < passing_marks (35% of total marks)
- attempt_status (Enum: Not Started, In Progress, Submitted, Graded)\n- auto_graded_marks (Decimal(10,2))
- manual_graded_marks (Decimal(10,2))
- pending_manual_grading (Boolean)
- teacher_feedback (Text, optional)
- graded_by (Foreign Key → users.id, nullable)
- graded_at (Timestamp, nullable)
- ip_address (Varchar(45), nullable)
- device_info (JSON, nullable)
- activity_log (JSON array, nullable)
- suspicious_activity_count (Integer)\n- created_at (Timestamp)
- updated_at (Timestamp)

### 9.4 Student Exam Taking Interface

#### 9.4.1 Student Dashboard - My Exams Section
Dashboard Card: 'My Exams'
- Display on student dashboard after login
- Shows count of exams by status\n\nMy Exams Page Layout:
- Three tabs: 'Upcoming' | 'Ongoing' | 'Completed'
\nUpcoming Exams Tab:
- List of scheduled exams not yet started
\nOngoing Exams Tab:\n- List of exams currently available\n
Completed Exams Tab:
- List of exams already submitted

#### 9.4.2 Exam Taking Interface
Pre-Exam Screen:
- Display before student starts exam
\nEnhanced Exam Interface Layout:
- Header Section (Sticky at top)
- Left Sidebar - Question Palette Panel (Collapsible)
- Main Content Area (displays question text with formatting)
- Answer Input Section\n- Action Buttons\n- Auto-Save Functionality
- Browser Lock Mode (If enabled)
- Activity Tracking
\n#### 9.4.3 Exam Submission\nSubmit Button Click:
- Open 'Submit Exam' confirmation dialog
\nSubmission Process:
- Save all answers\n- Calculate submission time
- Trigger auto-grading\n- Calculate pass/fail status based on 35% passing threshold
- Update attempt status
- Show success message
\nAuto-Submission (When time expires):
- Automatically submit exam\n\nLate Submission (If enabled):
- Allow submission with penalty
\n#### 9.4.4 Exam Results View (Student)
Results Page Layout:
- Results Summary Card
- Performance Analysis Card
- Teacher Feedback Section
- Question-wise Results Section (with formatted question text)
- Action Buttons
\n### 9.5 Teacher Exam Management Interface

#### 9.5.1 Teacher Dashboard - My Exams Section
Dashboard Card: 'Online Exams'
\nMy Exams Page Layout:
- Five tabs: 'Draft' | 'Pending Approval' | 'Scheduled' | 'Ongoing' | 'Completed'

Draft Exams Tab:
- List of unpublished exams

Pending Approval Tab:
- List of school-level exams submitted for approval

Scheduled Exams Tab:
- List of published exams not yet started

Ongoing Exams Tab:
- List of exams currently active

Completed Exams Tab:
- List of exams past end datetime

#### 9.5.2 Exam Monitoring Interface
Real-time Monitoring Dashboard:
- Overview Cards
- Live Student Status Table
- Student Detail View
- Live Updates
- Export Options (preserving formatting)

#### 9.5.3 Exam Grading Interface
Grading Dashboard:
- Grading Overview Cards
- Grading Mode Selection
- Student-wise Grading Mode
- Question-wise Grading Mode (with formatted question text)
- Auto-grading Logic
- Manual Grading Workflow
- Publish Results
\n#### 9.5.4 Exam Analytics and Reports
Analytics Dashboard:
- Overview Section
- Score Distribution Chart
- Performance by Question Type
- Performance by Difficulty\n- Question-wise Analysis (with formatted question text)
- Student Performance Table
- Section-wise Comparison
- Time Analysis
- Negative Marking Impact
- Suspicious Activity Report
- Export Options (preserving formatting)
- Print Options (preserving formatting)

#### 9.5.5 Student Allocation List with Attendance Status
Student Allocation List Interface:
- Page Layout
- Student List Table
- Attendance Status Logic
- Summary Statistics
- Filter and Sort Options
- Export Options (preserving formatting)
- Real-time Updates
- Access Control

#### 9.5.6 Individual Student Exam Result Details
Individual Student Result Details Page:
- Page Layout
- Student Information Card
- Exam Performance Summary Card
- Performance Breakdown Card
- Teacher Feedback Section
- Question-wise Performance Section (with formatted question text)
- Filter and Sort Options
- Performance Charts
- Activity Log Section
- Export and Print Options (preserving formatting)
- Action Buttons
- Access Control

### 9.6 Principal Exam Monitoring Interface

#### 9.6.1 Principal Dashboard - Online Exams Overview
Dashboard Card: 'Online Exams'

Online Exams Page Layout:
- Four tabs: 'All Exams' | 'Pending Approvals' | 'Ongoing' | 'Completed'

All Exams Tab:\n- List of all exams created by teachers and principal

Pending Approvals Tab:
- List of school-level exams awaiting approval

Ongoing Exams Tab:
- List of exams currently active
\nCompleted Exams Tab:\n- List of exams past end datetime

#### 9.6.2 School-wide Exam Analytics
Analytics Dashboard (Principal view):
- Overview Cards
- Charts and Graphs
- Teacher Performance Table
- Subject Performance Table
- Class Performance Table
- Monthly Trends
- Export Options (preserving formatting)
- Filter Options

### 9.7 Online Exam Access Control and Data Isolation

#### 9.7.1 Teacher Access Rules
- Can create exams for assigned classes and sections
- Practice exams can be published immediately
- School-level exams require Principal approval
- Can view and manage only own exams
- Can view student allocation list for own exams
- Can view individual student results for own exams
- Can delete own exams with restrictions
- Cannot force delete exams with student attempts

#### 9.7.2 Student Access Rules
- Can view only assigned exams
- Can take exam only during scheduled time
- Can take exam only once
- Use individual login to access exam interface
- Can view pass/fail status based on 35% passing threshold
- Can review answers if enabled (with formatted question text)
\n#### 9.7.3 Principal Access Rules
- Can create exams directly without approval
- Can approve or reject teacher exams
- Can view all exams in their school
- Can view student allocation list for all exams
- Can view individual student results for all exams\n- Can view exam analytics\n- Cannot edit or delete teacher exams
- Can delete self-created exams with restrictions
- Can force delete self-created exams with strict confirmation

#### 9.7.4 Admin Access Rules
- Has cross-school visibility
- Can view all exams across all schools
- Can view student allocation list for any exam
- Can view individual student results for any exam
- Cannot create, edit, or delete exams
- Can force delete any exam with strict confirmation

#### 9.7.5 Data Isolation
- All exam data is school-scoped
- Backend validation ensures data isolation
- Cross-school access prevented
- Passing marks calculation (35% of total marks) is consistent across all roles

### 9.8 Online Exam Notifications\n
#### 9.8.1 Student Notifications
- Exam Assigned\n- Exam Reminder (24 hours before)
- Exam Reminder (1 hour before)
- Exam Started
- Exam Ending Soon
- Results Published
- Feedback Added
\n#### 9.8.2 Teacher Notifications
- Exam Approved
- Exam Rejected\n- Modification Requested
- Student Submitted Exam
- All Students Completed
- Pending Manual Grading
- Exam Auto-Published
- Exam Ending Soon
- Suspicious Activity Detected

#### 9.8.3 Principal Notifications
- New Exam Submitted for Approval
- Pending Approvals Reminder
- Daily Exam Summary
- Weekly Participation Report
- Monthly Analytics Report
- Low Participation Alert

### 9.9 Online Exam Security Features

#### 9.9.1 Exam Integrity
- Single Attempt Enforcement
- Browser Lock Mode (Optional)
- Copy-Paste Prevention (Optional)
- Screenshot Prevention (Optional)
- IP Address Logging\n- Device Fingerprinting
\n#### 9.9.2 Anti-Cheating Measures
- Randomized Questions
- Randomized MCQ Options
- Time Tracking
- Suspicious Activity Detection\n- Activity Log\n\n#### 9.9.3 Exam Access Control
- Time-based Access\n- Section-based Access
- One-time Access Link (Optional)
- Password Protection (Optional)
\n### 9.10 Exam Deletion Feature

#### 9.10.1 Delete Button Placement
Teacher Interface:
- Delete button in Draft, Scheduled, Completed tabs
\nPrincipal Interface:
- Delete button for self-created exams
- Force Delete button for self-created exams with student attempts

Admin Interface:
- Force Delete button for any exam with student attempts

#### 9.10.2 Delete Restrictions and Validation
For Teachers:
- Draft Exams: Can be deleted anytime
- Pending Approval Exams: Must withdraw first
- Scheduled Exams: Can delete if no students started
- Ongoing Exams: Cannot be deleted
- Completed Exams: Can delete after results published and archived
- Cannot force delete exams with student attempts

For Principal:
- Same restrictions as teachers for self-created exams
- Cannot delete teacher-created exams
- Can force delete self-created exams with student attempts

For Admin:
- Can force delete any exam with student attempts\n\n#### 9.10.3 Delete Confirmation Dialog
Standard Delete Confirmation Dialog:
- Warning message\n- Exam details summary
- Checkbox confirmation
- Action buttons
\nForce Delete Confirmation Dialog:
- Strong warning message
- Exam details with student attempt count
- Type DELETE to confirm
- Action buttons\n
#### 9.10.4 Delete Process
Standard Delete Workflow:
- Validate permissions
- Validate restrictions
- Delete related records
- Return response
\nForce Delete Workflow:
- Validate permissions
- Validate confirmation
- Delete with transaction\n- Log action
- Return response

#### 9.10.5 Cascade Deletion
- Automatic deletion of related records
- Foreign key constraints ensure integrity
\n#### 9.10.6 Force Delete Access Control
- Role-based access\n- Backend validation
- Audit log

#### 9.10.7 Alternative: Archive Feature
- Archive instead of delete
- Preserve student data
- Can be restored if needed

## 10. Teacher Dashboard and Functions

### 10.1 Teacher Login - Dashboard Overview
After Teacher login, the dashboard displays:
- Assigned classes, sections, and subjects
- Students: View and manage students from assigned sections
- Question Bank access
- Question Paper Preparation
- Question Paper History
- Online Exams
\n### 10.2 Teacher Functions
- View assigned classes, sections, subjects
- View students of assigned sections with enhanced search and filter functionality
- Question Bank Access (with rich text editor for question creation and bulk upload capability)
- Question Paper Preparation\n- Question Paper History Management (with preview and print functionality)
- Online Exam Management\n\n### 10.3 Students Card - Student Management (Teacher Dashboard)
Note: This card is copied from Principal Dashboard with role-based access control for Teachers\n
- Teacher can view students from their assigned sections only
- Student list displays:\n  - Student Name
  - Class and Section
  - Phone Number
  - Account Status (Active/Pending/Suspended)
- Enhanced Search Functionality:\n  - Text search bar for searching by name, phone, or email
  - Additional dropdown filters for Class and Section (filtered by teacher's assigned sections)
  - Combined search capability (text search + class filter + section filter)
- Filter and search options by class, section, or name (limited to assigned sections)
- Click on student to view detailed profile and academic records
- Access Control:
  - Teachers can only view students from sections they are assigned to teach
  - Backend validation ensures data isolation based on teacher-section mapping
  - Search and filter results are automatically scoped to assigned sections
  - Cannot view students from other sections or other teachers' sections

## 11. Student Dashboard and Functions

### 11.1 Student Login - Dashboard Overview
After Student login, the dashboard displays:
- My class, section, subjects, teachers
- My Exams\n\n### 11.2 Student Functions
- View my class and section
- View my subjects\n- View my teachers
- Online Exam Functions (with formatted question text display)
- Profile settings\n\n## 12. Navigation and Side Panel Configuration

### 12.1 Principal Side Panel Menu
The side panel navigation for Principal role includes the following menu items (in order):
1. Dashboard (Home icon)
2. Academic Management (Book icon)
3. Teachers (Users icon)
4. Students (User icon)
5. Question Bank (Question mark icon)
6. Question Paper History (Document icon)
7. Online Exams (Clipboard icon)
8. Exam Approvals (Check circle icon)
9. Profile (User circle icon)
10. Logout (Sign out icon)
\n### 12.2 Teacher Side Panel Menu
The side panel navigation for Teacher role includes the following menu items (in order):
1. Dashboard (Home icon)
2. My Classes (Book icon)
3. Students (User icon)
4. Question Bank (Question mark icon)
5. Question Paper Preparation (File text icon)
6. Question Paper History (Document icon)
7. Online Exams (Clipboard icon)\n8. Profile (User circle icon)
9. Logout (Sign out icon)

### 12.3 Side Panel Design Specifications
- Collapsible side panel with toggle button
- Glassmorphism styling with backdrop blur
- Active menu item highlighted with gradient background
- Hover effects with subtle glow
- Icons aligned to left with text labels
- Responsive design: Full panel on desktop, collapsed on mobile
- Smooth transition animations
- Consistent with overall dark purple-blue gradient theme

### 12.4 Navigation Behavior
- Clicking 'Question Paper History' menu item navigates to Question Paper History page
- Active menu item remains highlighted
- Breadcrumb navigation updates accordingly
- Page title updates to 'Question Paper History'
- Access control enforced: Teachers see only own papers, Principal sees all papers from their school

## 13. Key Features\n
### 13.1 User Registration and Approval Workflow
- New users assigned 'Pending Approval' status
- Admin must approve new accounts\n\n### 13.2 Password Reset/Recovery Feature
- Forgot Password link on login page
- Email-based password reset process
\n### 13.3 Admin Functions
- Create and manage schools
- User account management
- Force delete exams with student attempts
\n### 13.4 Principal Functions
- Academic Management\n- Teacher Management
- Student Management
- Question Bank Management (with rich text editor and bulk upload)
- Question Paper History Management (with preview and print functionality)
- Online Exam Monitoring
\n### 13.5 Teacher Functions
- View assigned classes, sections, subjects
- View and manage students from assigned sections
- Question Bank Access (with rich text editor and bulk upload)\n- Question Paper Preparation
- Question Paper History Management (with preview and print functionality)
- Online Exam Management

### 13.6 Student Functions
- View personal information\n- Profile editing
- Online Exam Functions (with formatted question text display)
\n### 13.7 User Profile Management
- Edit, Save, Approve, Suspend buttons
- Status-based navigation\n\n### 13.8 Principal Dashboard Features
- Total Teachers Card
- Total Students Card
\n### 13.9 Admin Dashboard Features
- Total Users Card
- Total Schools Card
\n### 13.10 Landing Page Features
- Updated design without login/register buttons in hero section
\n### 13.11 Question Paper History Feature
- Comprehensive tracking\n- Advanced filtering
- Analytics and reporting
- Preview with print option
- Print directly from preview dialog
- Accessible via side panel menu for Principal and Teacher roles

### 13.12 Online Exam Feature
- Complete exam management system
- Automatic passing marks calculation: 35% of total marks
- Enhanced student interface
- Question text displayed with formatting
- Real-time monitoring
- Automatic and manual grading
- Comprehensive analytics
- Security features
- Deletion functionality

### 13.13 Teacher Student Management Feature
- Students card added to Teacher Dashboard
- Role-based access control for viewing students from assigned sections only
- Enhanced search and filter functionality
- Data isolation based on teacher-section mapping\n\n### 13.14 Rich Text Editor Integration Feature
- Integrated rich text editor (Quill, Draft.js, or TinyMCE) in question creation form
- Teachers and Principals can apply bold, underline, italic, and other formatting directly while typing questions
- Formatted text preserved and displayed correctly in all interfaces (exam, reports, exports)
- HTML sanitization to prevent XSS attacks\n- Responsive design for mobile and desktop
- Accessibility support (ARIA labels, keyboard navigation)\n
### 13.15 Question Paper Preview and Print Feature
- Preview button in Question Paper History
- Preview dialog with formatted question text rendering
- Print button in preview dialog opens browser print dialog
- All formatting, images, and layout preserved in print output
- Role-based access control for preview and print functionality
- High-quality print output with proper page layout
\n### 13.16 Side Panel Navigation Enhancement
- Question Paper History menu item added to Principal side panel
- Question Paper History menu item added to Teacher side panel
- Consistent navigation experience across roles
- Easy access to historical question papers
- Improved user workflow and productivity

### 13.17 Bulk Upload Questions Feature
- Bulk upload functionality for Question Bank
- Support for all question types in single file
- Excel/CSV template file provided for download
- Comprehensive validation and error handling
- Role-based access control (Teacher and Principal)
- Efficient import process with progress tracking
- Detailed import summary and statistics
- Help documentation and FAQ

## 14. Language Support\n
### 14.1 UI Language\n- UI Language: English Only
\n### 14.2 Chat/Communication Language
- Users can communicate in any language
\n### 14.3 Language Rule Summary
- UI = Always English
- Chat/Communication = Any Language
\n## 15. Future Scope Features
- Audit Logs
- Backup & Restore
- Notifications
- Analytics Dashboard
- Advanced question paper scheduling
- Automated paper generation
- Student performance tracking
- Advanced proctoring features
- Adaptive testing
- Question bank sharing
- Parent portal\n- Exam archive feature
\n## 16. Design Style\n
### 16.1 Overall Theme
- Dark purple-blue gradient theme
- Glassmorphism cards with soft glow effects
- Smooth gradients throughout the interface
- Rounded corners (8px radius)
- Elegant shadows for depth
- Clean sans-serif typography
- Professional EdTech look
- NEET and school-focused design
- Consistent colors across all screens

### 16.2 Color Scheme
- Primary gradient: Dark purple (#6B46C1) to blue (#3B82F6)
- Background: Deep purple-blue gradient (#1E1B4B to #312E81)
- Card background: Semi-transparent glassmorphism with backdrop blur
- Accent colors:\n  - Success/Active: Green (#10B981)
  - Warning/Pending: Orange (#F59E0B)
  - Error/Danger: Red (#EF4444)\n  - Info: Blue (#3B82F6)\n  - Purple accent: (#8B5CF6)
  - Teal accent: (#14B8A6)
  - Indigo accent: (#6366F1)
- Text colors:\n  - Primary text: White (#FFFFFF)
  - Secondary text: Light gray (#E5E7EB)
  - Muted text: Gray (#9CA3AF)
- Status colors:
  - Draft: Gray (#6B7280)
  - Pending Approval: Orange (#F59E0B)
  - Approved: Green (#10B981)
  - Scheduled: Blue (#3B82F6)
  - Ongoing: Green (#10B981)
  - Completed: Purple (#8B5CF6)
  - Cancelled: Red (#EF4444)\n  - Rejected: Red (#EF4444)\n- Exam type badges:
  - Practice: Green (#10B981)
  - School-Level: Blue (#3B82F6)
- Delete button: Red (#EF4444)
- Force Delete button: Dark Red (#DC2626) with bold styling
- Attendance status:\n  - Present: Green (#10B981)
  - Absent: Red (#EF4444)\n  - In Progress: Orange (#F59E0B)
  - Completed: Purple (#8B5CF6)
- Answer status:
  - Correct: Green (#10B981)
  - Incorrect: Red (#EF4444)
  - Partially Correct: Orange (#F59E0B)
  - Not Answered: Gray (#6B7280)
- Pass/Fail status:
  - Pass: Green (#10B981)
  - Fail: Red (#EF4444)
\n### 16.3 Visual Details
- Glassmorphism cards:\n  - Semi-transparent background with backdrop blur
  - Soft border with subtle glow
  - Smooth shadow effects
  - Rounded corners (12px-16px radius)
- Soft glow effects:
  - Subtle glow around cards and buttons
  - Color-matched glow for different card types
  - Hover effects with enhanced glow
- Smooth gradients:
  - Background gradients from dark purple to blue
  - Card gradients with transparency
  - Button gradients for primary actions
- Typography:
  - Clean sans-serif font family (Inter, Poppins, or similar)
  - Clear hierarchy with varying font weights
  - Proper line spacing for readability
- Icons:
  - Modern, rounded icon style
  - Consistent icon set throughout
  - Color-coded icons for different actions
- Status badges:
  - Rounded pill-shaped badges
  - Color-coded with appropriate background and text
  - Subtle shadow for depth
- Progress indicators:
  - Smooth animated progress bars
  - Color-coded based on status
  - Percentage display with visual feedback
- Interactive elements:
  - Smooth hover transitions
  - Click feedback with subtle animations
  - Focus states with glow effects
- Timer display:
  - Large, prominent countdown timer
  - Color coding (green >10min, orange 5-10min, red <5min)
  - Blinking animation when time is critical
- Question palette panel:
  - Color-coded status indicators
  - Grid layout for easy navigation
  - Collapsible sidebar\n- Delete confirmation:\n  - Clear warning icons and messages
  - Destructive action styling (red color)
  - Strong confirmation for force delete
- Clickable elements:
  - Underline on hover for links
  - Pointer cursor for interactive elements
  - Visual feedback on click
- Rich Text Editor Styling:
  - Clean, modern toolbar design
  - Consistent with overall theme
  - Toolbar icons with hover effects
  - Real-time preview of formatted text
  - Formatted text displayed with proper styling in all views
- Preview Dialog Styling:
  - Large modal dialog with glassmorphism effect
  - Full-screen or large size for better readability
  - Print button prominently displayed
  - Close button in top-right corner
  - Formatted question text rendered correctly
  - Images and clip arts displayed with proper sizing
  - Page layout optimized for print
- Side Panel Styling:
  - Glassmorphism effect with backdrop blur
  - Smooth slide-in/out animation
  - Active menu item with gradient highlight
  - Hover effects with subtle glow
  - Consistent icon and text alignment
- Bulk Upload Dialog Styling:
  - Large modal dialog with glassmorphism effect
  - Clear section separation with headings
  - Download template button with gradient effect
  - Drag-and-drop upload area with hover effect
  - Validation results table with color-coded rows
  - Progress bar for import process
  - Success/error messages with appropriate icons
\n### 16.4 Overall Layout
- Responsive design:\n  - Desktop view with side navigation
  - Mobile view with bottom navigation
  - Tablet view with optimized layout
- Navigation:
  - Side panel navigation with collapsible toggle (desktop)
  - Bottom navigation bar (mobile)
  - Breadcrumb navigation for deep pages
- Card-based design:
  - Glassmorphism cards for content sections
  - Grid layout for card arrangement
  - Consistent spacing and alignment
- Dashboard layout:
  - Overview cards at top
  - Feature cards in grid below
  - Statistics section with visual charts
- Form layouts:
  - Two-column layout for better space utilization
  - Clear field labels and helper text
  - Validation feedback with color coding
  - Rich text editor integrated seamlessly in question creation form
- Table layouts:
  - Responsive tables with horizontal scroll
  - Alternating row colors for readability
  - Action buttons aligned to right
- Modal dialogs:
  - Centered overlay with backdrop blur
  - Glassmorphism card styling
  - Clear action buttons
- Exam interface:
  - Clean, distraction-free design
  - Question palette panel on left (collapsible)
  - Timer in header (sticky)
  - Main content area for questions (with formatted text rendering)
  - Action buttons at bottom
- Analytics dashboards:
  - Overview cards at top
  - Interactive charts and graphs
  - Filterable data tables
  - Export options\n- Preview dialog layout:
  - Full-screen or large modal dialog
  - Paper header with paper details
  - Question list with formatted text
  - Print button prominently displayed
  - Close button in top-right corner
  - Optimized for print output
- Bulk Upload dialog layout:
  - Large modal dialog with clear sections
  - Template download section at top
  - File upload section in middle
  - Validation results section at bottom
  - Progress indicator during import
  - Import summary with statistics
\n### 16.5 Website (Desktop View) Specific Design
\n#### 16.5.1 Header
- Logo: 'A Cube' with modern icon
- Navigation menu:\n  - Home\n  - Exams
  - Question Bank
  - Analytics
  - Login\n- Glassmorphism header with backdrop blur
- Sticky header on scroll
\n#### 16.5.2 Hero Section
- Large heading: 'A Cube – Online Exam System'
- Subheading: 'Smart • Secure • Scalable Online Exams'
- Description: 'Create, conduct & analyse exams – all in one place'
- Primary buttons:\n  - Create Exam (gradient button with glow)
  - View Results (outlined button)
- Background: Dark purple-blue gradient with subtle pattern

#### 16.5.3 Feature Cards Section
- Four glassmorphism cards:\n  - Create Exam (with calendar icon)
  - Question Bank (with question mark icon)
  - User Management (with users icon)
  - Reports & Analytics (with chart icon)
- Each card with:\n  - Icon at top
  - Title
  - Brief description
  - Hover effect with enhanced glow

#### 16.5.4 Why Choose Us Section
- Four benefit cards:
  - Fast Evaluation
  - Secure Exams
  - Mobile Friendly
  - Time Saving
- Each card with icon and description
- Grid layout with consistent spacing

#### 16.5.5 Statistics Section
- Four stat cards with large numbers:\n  - 1200+ Students
  - 350+ Exams Conducted
  - 15,000+ Questions\n  - 25+ Schools
- Animated counters on scroll
- Icons for each statistic

#### 16.5.6 Website Login Page
- Centered login card with glassmorphism
- Title: 'Welcome to A Cube'
- Subtitle: 'Login to Exam System'
- Form fields:
  - User ID / Email (text input)
  - Password (password input)
  - Keep me signed in (checkbox)
- Sign In button (gradient with glow)
- Forgot password link
- Background: Dark purple-blue gradient

### 16.6 Mobile App (Phone View) Specific Design

#### 16.6.1 Home Screen
- Greeting: 'Hello, Student'\n- Subtitle: 'Your exam overview'
- Stats cards:
  - Exams Taken (with count)
  - Accuracy % (with percentage)
  - Progress chart (circular progress)
- Action buttons:
  - Create Exam (gradient button)\n  - View Results (outlined button)
- Recent activity list:\n  - List of recent exams with status
  - Swipeable cards\n- Bottom navigation:
  - Home (house icon)
  - Exams (clipboard icon)
  - Analytics (chart icon)
  - Profile (user icon)
\n#### 16.6.2 Mobile Login Screen
- Title: 'Welcome to A Cube'
- Subtitle: 'Login to Exam System'
- Form fields:
  - User ID / Email (text input)
  - Password (password input)
- Sign In button (full-width gradient button)
- Forgot password link\n- Background: Dark purple-blue gradient

### 16.7 Presentation Style
- Product showcase style:
  - Website displayed on laptop screen mockup
  - Mobile app displayed on smartphone screen mockups
  - Same theme and branding across all devices
- Ultra-high resolution:\n  - Sharp, crisp visuals
  - High-quality mockups
- Realistic lighting:\n  - Soft shadows\n  - Ambient lighting effects
  - Screen glow effects
- No watermark\n- No extra text
- Clean, professional presentation

## 17. Reference Images

### 17.1 Question Edit Form Layout
The uploaded image (screenshot.png) shows the question edit form with the following layout issue:
\nCurrent Issue: In the Edit Question dialog, the 'Question Text' field, 'Image/Clip Art (Optional)' field, 'Question Type' dropdown, 'Difficulty' dropdown, 'Marks' input, and 'Negative Marks' input are positioned below the 'Match Pairs' section.\n
Required Fix: These fields should be moved above the 'Match Pairs' section to maintain the correct form field order as specified in Section 6.3.1.

Additional Requirement: Replace the 'Question Text' field with a rich text editor (Quill, Draft.js, or TinyMCE) to enable formatting (bold, underline, italic, etc.) directly while typing.\n
### 17.2 Design Reference\nThe uploaded image (image.png) shows the current dashboard design. The new design should follow the dark purple-blue gradient theme with glassmorphism cards as specified in Section 15.\n
### 17.3 Teacher Dashboard Students Card Reference
The uploaded image (screenshot.png) shows the Principal Dashboard with the Students card highlighted. This card's JSX structure and functionality should be copied to the Teacher Dashboard with appropriate role-based access control modifications.

### 17.4 Question Paper History Print Button Reference
The uploaded image (screenshot.png) shows the Question Paper History interface with a Print button highlighted. This button should trigger a preview dialog, and from the preview dialog, users can open the browser print dialog to print the question paper with all formatting preserved.

## 18. Updated Requirement: Automatic Passing Marks Calculation

### 18.1 Passing Marks Calculation Logic
- Passing marks are automatically calculated as 35% of the total marks
- Formula: Passing Marks = Total Marks × 0.35
- Example: If total marks = 75, then passing marks = 26.25 marks
- Pass/Fail status determined by comparing obtained marks with passing marks

### 18.2 Implementation Changes
\n#### 18.2.1 Database Changes
- online_exams table: passing_marks field auto-calculated
- Data type: Decimal(10,2)\n- Database trigger ensures passing_marks = total_marks × 0.35\n
#### 18.2.2 Exam Creation Form Changes
- Remove manual passing marks input
- Add read-only passing marks display
- Update dynamically when questions selected

#### 18.2.3 Exam Display Changes
- All exam cards display passing marks (35% of total)
- Exam details page displays passing marks
- Student pre-exam screen displays passing marks

#### 18.2.4 Results Display Changes
- Student results page displays passing marks
- Pass/Fail status badge based on 35% threshold
- Analytics displays pass rate based on 35% threshold
\n#### 18.2.5 Grading and Pass/Fail Determination
- After grading: Calculate total marks obtained
- Compare with passing marks (35% of total)
- Determine Pass/Fail status

### 18.3 User Interface Updates
- Remove manual passing marks input
- Add read-only display with clear formatting
- Show calculation formula\n- Update dynamically\n
### 18.4 Validation and Error Handling
- Ensure correct calculation\n- Handle edge cases\n- Display errors if calculation fails
\n### 18.5 Migration Plan
- Recalculate passing marks for existing exams
- Update pass/fail status for all attempts
- Run migration script\n- Notify users\n
### 18.6 Documentation Updates
- Update user documentation
- Add help text\n- Update training materials
- Add FAQ section

### 18.7 Testing Requirements
- Test calculation for various values
- Test pass/fail determination
- Test real-time updates
- Test display in all interfaces
- Test migration\n- Test edge cases

## 19. Branding and Naming

### 19.1 Application Name
- Primary name: A Cube
- Full name: A Cube - Online Exam System
- Tagline: Smart • Secure • Scalable Online Exams
\n### 19.2 Logo
- Logo text: 'A Cube'
- Modern, minimalist icon design
- Consistent with dark purple-blue gradient theme
\n### 19.3 Branding Consistency
- Use 'A Cube' consistently across all screens
- Maintain same theme and branding everywhere
- Professional EdTech look
- NEET and school-focused positioning

## 20. Technical Specifications

### 20.1 Frontend Technologies
- Modern JavaScript framework (React, Vue, or Angular)
- Responsive CSS framework\n- Glassmorphism CSS effects
- Smooth animations and transitions
- Rich text editor library (Quill, Draft.js, or TinyMCE)\n- Print CSS styles for optimized print output
- Excel/CSV parsing library for bulk upload (e.g., SheetJS, PapaParse)

### 20.2 Backend Technologies\n- RESTful API architecture
- Database with foreign key constraints
- Authentication and authorization
- Role-based access control
- HTML sanitization library for rich text content
- File upload handling for bulk import
- Excel/CSV processing library (e.g., Apache POI, OpenCSV)
- Batch processing for large file imports

### 20.3 Security\n- Encrypted passwords\n- Secure exam environment
- Activity logging\n- Data isolation
- XSS prevention for rich text content
- File upload validation and sanitization
- Secure file storage for uploaded templates

### 20.4 Performance
- Fast page load times
- Optimized database queries
- Efficient caching\n- Real-time updates
- Optimized rich text rendering
- Optimized print preview generation
- Asynchronous file processing for bulk uploads
- Progress tracking for long-running imports

### 20.5 Scalability
- Support for multiple schools
- Handle large number of concurrent users
- Efficient data storage\n- Cloud-based infrastructure
- Scalable file storage for bulk uploads
- Queue-based processing for bulk imports

## 21. Deployment and Maintenance

### 21.1 Deployment\n- Cloud hosting (AWS, Azure, or Google Cloud)
- Continuous integration/deployment
- Automated testing\n- Staging and production environments
\n### 21.2 Maintenance
- Regular backups
- Security updates
- Performance monitoring
- Bug fixes and improvements
\n### 21.3 Support
- User documentation
- Training materials
- Help desk support
- FAQ section
\n## 22. Conclusion\n
A Cube - Online Exam System is a comprehensive platform designed for educational institutions to create, conduct, and analyze online exams efficiently. With its dark purple-blue gradient theme, glassmorphism design, and professional EdTech look, the system provides a modern and engaging user experience. The automatic passing marks calculation (35% of total marks), enhanced student exam interface with question palette and timer, rich text editor integration for question formatting, bulk upload functionality for efficient question import, preview and print functionality for question papers, real-time monitoring, comprehensive analytics, and robust security features make A Cube a smart, secure, and scalable solution for NEET preparation and school-level assessments. The addition of the Students card to the Teacher Dashboard with role-based access control, combined with the rich text editor functionality, bulk upload capability, and the new preview-print feature in Question Paper History, further enhances teacher productivity by allowing them to create well-formatted questions, import large question banks efficiently, manage students from their assigned sections effectively, and print question papers with all formatting preserved directly from the preview dialog. The updated side panel navigation for both Principal and Teacher roles now includes easy access to Question Paper History, streamlining the workflow and improving overall user experience.