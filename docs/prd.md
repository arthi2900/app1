# A Cube - Online Exam System Requirements Document (Updated)

## 1. Application Description

### 1.1 Application Name
A Cube - Online Exam System

### 1.2 Application Purpose
A comprehensive online exam management platform for educational institutions, focusing on NEET preparation and school-level assessments. The system enables schools to create, conduct, and analyze exams efficiently with features including school management, academic structure setup, teacher-subject-class-section mapping, question bank management with bulk upload capability, question paper preparation with question usage tracking, online exam creation with approval workflow, user management with school-based data isolation, student allocation tracking, and detailed performance analytics.

### 1.3 Tagline
Smart • Secure • Scalable Online Exams

## 2. User Roles\n
### 2.1 Admin
- Complete system administration
- School management (create, edit, view schools)
- User account creation and management
- New user approval management
- Role-based Access Control setup
- System configurations\n- Permission management
- User profile editing and suspension management
- Cross-school visibility: Admin can view and manage all schools and users across the entire system
- Full management rights: Create, edit, suspend, delete all users and schools
- Force Delete Exam capability: Can permanently delete exams with student attempts after strict confirmation
- **Question Bank Management with Global and Users sections**
- **NEW: Create Question functionality - Admin can create questions directly**
- **NEW: Create Question Bank functionality - Admin can view all user-created question banks not in Global and add them to Global**
\n### 2.2 Principal
- Academic Management (within assigned school only):\n  - Class creation\n  - Section creation
  - Subject creation (class-wise)
  - Lesson creation (subject-wise)
  - Student class-section mapping
- Teacher Management (within assigned school only):
  - View teacher accounts
  - Teacher-subject-class-section mapping\n  - View class-section overview with assigned teachers per subject
  - Edit teacher profiles
- Student Management (within assigned school only):
  - View students list
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
\n### 2.3 Teacher
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
  - View question usage count and list of question papers where each question was used
  - Shuffle questions and MCQ options\n  - Preview, save as draft, generate final paper
  - Export as PDF and print\n  - Save shuffled papers with auto-versioned names (Shuffled A, Shuffled B, etc.)
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
  - Configure exam settings (duration, start/end time, negative marking)\n  - Note: Passing marks are automatically calculated as 35% of total marks
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
- Linked to specific school from school master list\n- School-based isolation: Can only view and interact with students from their assigned sections

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
- Profile picture (optional)\n- Account status (Pending Approval/Active/Suspended)
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
  - Academic Year (e.g., 2024-2025)
- Class list view with edit and delete options
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

### 5.3 Teachers Card - Teacher Management

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
  - Section selection (multi-select, filtered by selected class)
- One teacher can be assigned to multiple subject-class-section combinations
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
- Use rich text editor for question text formatting (bold, underline, italic, etc.)
- Dual View Options:
  - Row View (table format)
  - Card View (detailed card format)
- View all questions with lesson-level filtering
- Analytics dashboard for question bank performance
\n### 5.6 Question Paper History Card - Historical Paper Management
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
Principal can review and approve school-level exams submitted by teachers
\nApproval Dashboard Layout:
- Pending Approvals Section
- Exam Review Page
- Approval History Section
- Approval Statistics
- Notification System
\n## 6. Question Bank Module

### 6.1 Question Bank Overview\n- Centralized repository for exam questions
- Questions organized by Class, Subject, and Lesson
- Support for multiple question types\n- Difficulty levels (Easy, Medium, Hard)\n- Marks allocation per question
- Minus Mark (Negative Marking) support
- Lesson-level tracking for performance analytics
- Image/Clip Art support\n- Rich text editor integration for question text formatting
- Bulk upload functionality for efficient question import
- Dual view display options: Row View and Card View
- Question usage tracking for question paper preparation

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
- created_by (Foreign Key → users.id)\n- created_at (Timestamp)
- updated_at (Timestamp)
- is_global (Boolean, default false)
- source_user_id (Foreign Key → users.id, nullable)

### 6.3 Question Creation Form
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
  - Lists: Ordered list, Unordered list\n  - Insert: Link, Image (optional)\n  - Clear formatting button
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
\n**Updated Template File Format:** Excel (.xlsx) or CSV (.csv)\n
**Template Structure with Three Sheets:**

**Sheet 1: Option**
- Purpose: Contains dropdown values for data validation
- Columns:\n  1. Class Name (list of all classes from user's school)
  2. Subject Name (list of all subjects from user's school)
  3. Lesson Name (list of all lessons from user's school)
  4. Question Type (list: 'Multiple Choice', 'True/False', 'Short Answer', 'Essay', 'Match the Following', 'Multiple Response MCQ')
  5. Difficulty (list: 'Easy', 'Medium', 'Hard')
- This sheet serves as the data source for dropdown validations in the Question sheet
- Hidden from user view (optional)

**Sheet 2: Question**
- Purpose: Main data entry sheet with validated dropdowns, no sample data
- Column Headers (in order):
  1. Class (Dropdown validation linked to Option sheet, required)
  2. Subject (Dropdown validation linked to Option sheet, required)
  3. Lesson (Dropdown validation linked to Option sheet, required)
  4. Question Text (Text, required)
  5. Question Type (Dropdown validation linked to Option sheet, required)
  6. Marks (Number, required)
  7. Minus Mark (Number, optional)
  8. Difficulty (Dropdown validation linked to Option sheet, required)
  9. Option A (Text, conditional)
  10. Option B (Text, conditional)
  11. Option C (Text, conditional)
  12. Option D (Text, conditional)
  13. Option E (Text, conditional)
  14. Correct Answer (Text, required)
  15. Image Path (Text, optional)
- **Key Feature:** All dropdown columns have Excel data validation rules applied, referencing the Option sheet
- **No Sample Data:** This sheet contains only column headers and validation rules, no example questions
- Teachers fill in this sheet with their actual questions using the dropdown selections

**Sheet 3: Reference**
- Purpose: Contains sample questions as reference/examples for teachers
- Same column structure as Question sheet
- Includes sample data rows for each question type:\n  - Multiple Choice example
  - True/False example
  - Short Answer example\n  - Essay example
  - Match the Following example
  - Multiple Response MCQ example
- Shows proper formatting and data entry examples
- Teachers can refer to this sheet while filling the Question sheet
- This sheet is not processed during upload, it's purely for reference

**Template Generation Process:**
1. User clicks 'Download Template' button
2. Backend fetches all classes, subjects, and lessons from user's school
3. Backend generates Excel file with three sheets:\n   - **Option Sheet:** Populated with school-specific dropdown values (classes, subjects, lessons) and fixed values (question types, difficulty levels)
   - **Question Sheet:** Contains only column headers with data validation formulas referencing Option sheet, no sample data
   - **Reference Sheet:** Contains sample questions for each question type as examples
4. Excel data validation formulas applied to Question sheet columns (Class, Subject, Lesson, Question Type, Difficulty)
5. File downloaded to user's device
6. User opens file, sees three sheets:
   - Option sheet (can be hidden or visible)
   - Question sheet (empty, ready for data entry with dropdown arrows)
   - Reference sheet (contains examples for guidance)
7. User fills Question sheet using dropdown selections, referring to Reference sheet for examples
8. User uploads completed file

**Template Instructions:**
- Separate instructions section or sheet explaining:\n  - How to use the three-sheet structure
  - Option sheet contains dropdown values
  - Question sheet is for actual data entry (use dropdowns)\n  - Reference sheet contains examples (do not modify)
  - Column descriptions and data format requirements
  - Examples for each question type (refer to Reference sheet)
  - Common errors and how to avoid them
  - Validation rules\n  - How to use dropdown selections

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
- Downloads pre-formatted Excel file with:\n  - **Option Sheet:** Dropdown values (classes, subjects, lessons, question types, difficulty levels)
  - **Question Sheet:** Column headers with data validation, no sample data
  - **Reference Sheet:** Sample data rows for each question type as examples
  - Instructions sheet or section\n  - Data validation rules applied to Question sheet\n\nTemplate File Contents:
- Sheet 1: Option (dropdown values)
- Sheet 2: Question (headers + validations, no sample data)
- Sheet 3: Reference (sample questions for reference)
- Sheet 4 (Optional): Instructions and Examples

**Benefits of Three-Sheet Structure:**
- **Separation of Concerns:** Dropdown values, data entry, and examples are clearly separated
- **Cleaner Data Entry:** Question sheet is clean and ready for actual data, not cluttered with examples
- **Better Guidance:** Reference sheet provides clear examples without interfering with data entry
- **Reduced Errors:** Users can refer to examples while filling the Question sheet, reducing mistakes
- **Easier Validation:** Backend only needs to process Question sheet, ignoring Reference sheet
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
  - Parse file content (process only Question sheet, ignore Reference sheet)
  - Validate column headers\n  - Validate data types
  - Check for required fields
  - Validate Class names against user's school classes
  - Validate Subject names against user's school subjects
  - Validate Lesson names against user's school lessons
  - Validate question type specific fields
  - Check for duplicate questions
  - Validate Class, Subject, Lesson existence
\nStep 3: Validation Results Display
- Show validation summary:\n  - Total rows in file (from Question sheet only)
  - Valid rows\n  - Invalid rows
  - Error details for each invalid row
- Display validation errors in table format:\n  - Row Number
  - Error Type
  - Error Message\n  - Suggested Fix
- Allow user to download error report

Step 4: Import Confirmation
- If validation passes:\n  - Show import summary
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
- Invalid Class: 'Row X: Class [Class Name] does not exist in your school. Please select from dropdown in template.'
- Invalid Subject: 'Row X: Subject [Subject Name] does not exist for [Class Name]. Please select from dropdown in template.'\n- Invalid Lesson: 'Row X: Lesson [Lesson Name] does not exist for [Subject Name]'\n- Invalid Question Type: 'Row X: Question Type must be selected from dropdown: Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ'
- Invalid Marks: 'Row X: Marks must be a positive number'
- Invalid Difficulty: 'Row X: Difficulty must be selected from dropdown: Easy, Medium, or Hard'
- Missing Options: 'Row X: At least 2 options required for Multiple Choice questions'
- Invalid Correct Answer Format: 'Row X: Correct Answer format is invalid for [Question Type]'
- Duplicate Question: 'Row X: Question text already exists in question bank'
\n#### 6.4.8 Bulk Upload Access Control

Teacher Access:
- Can bulk upload questions for assigned subjects only
- Questions automatically linked to teacher's school
- Backend validation ensures teacher can only upload for assigned subjects
- Cannot upload questions for other teachers' subjects
- Template file contains only classes and subjects assigned to the teacher

Principal Access:
- Can bulk upload questions for all subjects in their school
- Questions automatically linked to principal's school
- No subject restriction\n- Can upload questions for any class and subject in their school
- Template file contains all classes and subjects from principal's school

Data Isolation:
- All uploaded questions are school-scoped\n- Backend validation ensures data isolation
- Cross-school upload prevented
- Questions visible only to users from same school
- Template file dynamically generated based on user's school and role

#### 6.4.9 Bulk Upload UI Components

Bulk Upload Button:
- Location: Question Bank page, next to 'Add Question' button
- Icon: Upload icon with text 'Bulk Upload'
- Styling: Secondary button with gradient effect
- Tooltip: 'Upload multiple questions from Excel/CSV file'
\nBulk Upload Dialog:
- Modal dialog with large size\n- Glassmorphism styling consistent with overall theme
- Three main sections:
  1. Template Download Section (top)
  2. File Upload Section (middle)
  3. Results Section (bottom, shown after upload)
\nTemplate Download Section:
- Heading: 'Step 1: Download Template'
- Description: 'Download the Excel template file with three sheets: Option (dropdown values), Question (data entry with validations), and Reference (sample questions for guidance)'
- Download Button: 'Download Template' with download icon
- Template file format info: 'Supports .xlsx and .csv formats'
- Info Badge: 'Template includes dropdown selections and reference examples for easy data entry'

File Upload Section:
- Heading: 'Step 2: Upload File'
- Description: 'Upload your completed template file with questions. Fill the Question sheet using dropdown selections. Refer to Reference sheet for examples.'
- File Picker: Drag-and-drop area or click to browse
- Accepted formats: .xlsx, .csv
- Max file size: 10MB
- Upload Button: 'Upload and Validate' with upload icon
\nValidation Results Section:
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
- How to use the three-sheet template structure?
- What is the purpose of Option, Question, and Reference sheets?
- How to use dropdown selections in Question sheet?
- How to refer to Reference sheet for examples?
- How to upload images with questions?
- What to do if validation fails?
- How to fix common errors?
- Can I upload questions for multiple classes in one file?
- Can I upload all question types in same file?
- Why should I use dropdown selections instead of typing?\n\n**Updated FAQ Answers:**
\nQ: How to use the three-sheet template structure?
A: The template contains three sheets:\n- **Option Sheet:** Contains dropdown values (classes, subjects, lessons, question types, difficulty levels). You don't need to modify this sheet.
- **Question Sheet:** This is where you enter your actual questions. Use the dropdown arrows in Class, Subject, Lesson, Question Type, and Difficulty columns to select values. This sheet is empty and ready for your data.
- **Reference Sheet:** Contains sample questions for each question type. Refer to this sheet for examples while filling the Question sheet. Do not modify or delete this sheet.

Q: Why should I use dropdown selections instead of typing?
A: Using dropdown selections in the Question sheet ensures data accuracy and prevents input errors. The dropdown lists are pre-populated with valid values from your school (classes, subjects, lessons) and fixed values (question types, difficulty levels), so you cannot enter invalid or misspelled names. This significantly reduces validation errors during upload and saves time.\n
Q: What is the purpose of the Reference sheet?
A: The Reference sheet contains sample questions for each question type (Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ). It serves as a guide to help you understand the correct format and data entry for each question type. You can refer to this sheet while filling the Question sheet, but you should not modify or delete it. During upload, only the Question sheet is processed.\n
### 6.5 Question Bank Dual View Display

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

### 6.7 Admin Question Bank Module

#### 6.7.1 Admin Question Bank Overview
- Admin has access to Question Bank module with two main sections:
  - **Global Question Bank:** Contains questions available to all schools
  - **Users Question Bank:** Contains all questions created by users (teachers and principals) across all schools
- Admin can view, manage, and organize questions from both sections
- Admin can add questions from Users Question Bank to Global Question Bank
- **NEW: Admin can create questions directly**
- **NEW: Admin can view all user-created question banks not in Global and add them to Global**

#### 6.7.2 Admin Dashboard - Question Bank Card
- Add Question Bank card to Admin Dashboard
- Card displays:
  - Total Global Questions count
  - Total Users Questions count
  - Quick action button to access Question Bank
\n#### 6.7.3 Admin Question Bank Interface
\n**Main Layout:**
- Two-tab interface:
  - Tab 1: Global Question Bank\n  - Tab 2: Users Question Bank
- Tab switcher at the top of the page
- Each tab has its own filter, search, and view options
- **NEW: Create Question button prominently displayed at the top**
- **NEW: Create Question Bank button displayed in Users Question Bank tab**

**Tab 1: Global Question Bank**
- Purpose: Display all questions marked as global (is_global = true)
- Display Columns (Row View):
  - Question (truncated text with expand option)
  - Image Indicator\n  - Class
  - Subject
  - Lesson\n  - Question Type
  - Difficulty
  - Marks
  - Minus Mark
  - Source User (name of user who originally created the question)
  - **Actions (View, Edit, Delete, Remove from Global)**
- Filter Options:
  - Class filter
  - Subject filter
  - Lesson filter
  - Question Type filter
  - Difficulty filter
  - Source User filter (dropdown of all users)
- Search Functionality:
  - Text search by question text
  - Combined search and filter capability
- View Options:
  - Row View (table format)
  - Card View (detailed card format)
- **Actions:**
  - **View: View full question details**
  - **Edit: Edit question details (updates global question)**
  - **Delete: Delete question from global bank (with confirmation)**
  - **Remove from Global: Remove question from global bank but keep in user's bank (sets is_global = false)**
\n**Tab 2: Users Question Bank**
- Purpose: Display all questions created by users (teachers and principals) across all schools
- Display Columns (Row View):\n  - **Checkbox (NEW: For bulk selection)**
  - Question (truncated text with expand option)
  - Image Indicator
  - Class
  - Subject
  - Lesson
  - Question Type
  - Difficulty
  - Marks
  - Minus Mark
  - Created By (user name)
  - School Name
  - Global Status (badge showing if question is already in global bank)
  - Actions (View, Add to Global)\n- **NEW: Bulk Selection Functionality:**
  - Checkbox column added as first column\n  - Select All / Deselect All checkbox in header row
  - Individual checkboxes for each question row
  - Selected count display (e.g., '5 questions selected')
  - Copy to Global button appears when at least one question is selected
- **NEW: Copy to Global Button Placement:**
  - Button label: 'Copy to Global'
  - Placement: Below 'All Users' and 'All Banks' filters, above 'Created By' and 'Action' columns
  - Button styling: Gradient button with green color (#10B981)
  - Button state: Disabled when no questions selected, enabled when at least one question selected\n  - Button behavior: Opens confirmation dialog showing selected questions count and list
- Filter Options:
  - School filter (dropdown of all schools)
  - Class filter
  - Subject filter
  - Lesson filter\n  - Question Type filter
  - Difficulty filter
  - Created By filter (dropdown of all users)
  - Global Status filter (All / In Global / Not in Global)
- Search Functionality:
  - Text search by question text
  - Combined search and filter capability
- View Options:
  - Row View (table format)
  - Card View (detailed card format)
- Actions:
  - View: View full question details (read-only)
  - Add to Global: Add single question to global bank (sets is_global = true, copies source_user_id)
  - **NEW: Copy to Global (Bulk): Add multiple selected questions to global bank at once**
- **NEW: Create Question Bank button**
  - Opens Create Question Bank interface
  - Displays list of all user-created question banks not yet in Global Question Bank
  - Allows admin to select and add question banks to Global\n\n#### 6.7.4 NEW: Admin Create Question Functionality
\n**Create Question Button:**
- Location: Prominently displayed at the top of Admin Question Bank page (above tabs)
- Icon: Plus icon with text 'Create Question'\n- Styling: Primary button with gradient effect
- Tooltip: 'Create a new question'\n
**Create Question Form:**
- Same form structure as Teacher/Principal question creation form (Section 6.3)
- Form Fields (in order):
  1. School (Dropdown, required) - Admin selects which school this question belongs to
  2. Class (Dropdown, required, filtered by selected school)
  3. Subject (Dropdown, required, filtered by selected class)
  4. Lesson (Dropdown, required, filtered by selected subject)
  5. Question (Rich Text Editor, required)
  6. Insert Images/Clip Arts (Image upload field, optional)
  7. Question Type (Dropdown, required)\n  8. Marks (Number input, required)
  9. Minus Mark (Number input, optional)
  10. Difficulty (Dropdown, required)
  11. Options (Dynamic fields, conditional)\n  12. Correct Answer (Text input, dropdown, or multi-select, required)
  13. Add to Global (Checkbox, optional) - If checked, question is added to Global Question Bank immediately
\n**Form Behavior:**
- Cascading Dropdowns: School → Class → Subject → Lesson\n- Auto-generation: bank_name field is auto-generated upon form submission
- Validation: All required fields must be filled before submission
- Rich Text Editor: Same functionality as Teacher/Principal form
- Add to Global Checkbox:\n  - If checked: Question is created with is_global = true\n  - If unchecked: Question is created with is_global = false (added to user's bank only)
- Created By: Set to Admin user ID
- School ID: Set to selected school from dropdown
\n**Save Behavior:**
- Question saved to question_bank table
- If Add to Global is checked:\n  - is_global = true
  - source_user_id = Admin user ID
  - Question appears in Global Question Bank tab
- If Add to Global is unchecked:
  - is_global = false
  - Question appears in Users Question Bank tab
- Success message displayed\n- Form cleared after successful save

**Access Control:**
- Only Admin role can access this functionality
- Admin can create questions for any school
- Backend validation ensures proper data isolation
\n#### 6.7.5 NEW: Admin Create Question Bank Functionality

**Create Question Bank Button:**
- Location: Displayed in Users Question Bank tab, next to filter panel
- Icon: Plus icon with text 'Create Question Bank'
- Styling: Secondary button with gradient effect
- Tooltip: 'View and add user question banks to Global'

**Create Question Bank Interface:**
- Opens a modal dialog or new page
- Title: 'Add Question Banks to Global'
- Description: 'Select user-created question banks to add to Global Question Bank. All questions in selected banks will be added to Global.'
\n**Question Bank List:**
- Display all user-created question banks that are not yet in Global Question Bank
- Table/Grid Layout:
  - Columns:\n    - Question Bank Name (auto-generated bank_name)
    - Owner (User name who created the questions)
    - School Name
    - Total Questions (count of questions in this bank)
    - Created Date
    - Actions (Checkbox for selection, View Details button)
- Filter Options:
  - School filter (dropdown of all schools)
  - Owner filter (dropdown of all users)
  - Date range filter
- Search Functionality:
  - Text search by question bank name or owner name
  - Combined search and filter capability
\n**Selection and Add to Global:**
- Checkbox Selection:
  - Each question bank row has a checkbox
  - Select All / Deselect All options\n  - Selected count display (e.g., '5 question banks selected')
- View Details Button:
  - Opens a preview dialog showing all questions in the selected bank
  - Displays question text, type, difficulty, marks, etc.
  - Allows admin to review questions before adding to Global
- Add to Global Button:
  - Prominently displayed at bottom of dialog
  - Enabled only when at least one question bank is selected
  - Confirmation dialog before adding:\n    - Shows list of selected question banks with question counts
    - Confirmation message: 'Add X question banks (total Y questions) to Global Question Bank? All questions will be available to all schools.'
    - Confirm and Cancel buttons

**Add to Global Process:**
- On confirmation:
  - For each selected question bank:
    - Set is_global = true for all questions in the bank
    - Set source_user_id = created_by (to track original creator)
  - Show progress indicator during processing
  - Display success message with count: 'Successfully added X question banks (Y questions) to Global Question Bank!'
  - Update Global Status badges in Users Question Bank tab
  - Questions now appear in Global Question Bank tab
- On cancel:
  - Close confirmation dialog
  - Return to question bank list

**Backend Logic:**
- Query to get user-created question banks not in Global:
  ```sql\n  SELECT DISTINCT bank_name, created_by, school_id, COUNT(*) as question_count, MIN(created_at) as created_date
  FROM question_bank\n  WHERE is_global = false
  GROUP BY bank_name, created_by, school_id
  ORDER BY created_date DESC
  ```\n- Update query to add question bank to Global:
  ```sql\n  UPDATE question_bank
  SET is_global = true, source_user_id = created_by\n  WHERE bank_name = [selected_bank_name] AND created_by = [owner_user_id] AND school_id = [school_id]
  ```

**Access Control:**
- Only Admin role can access this functionality
- Admin can view and add question banks from all schools
- Backend validation ensures proper data isolation
- Audit log records all question bank additions to Global

**UI Components:**
- Modal Dialog:\n  - Large size with glassmorphism styling
  - Clear section separation
  - Responsive design
- Question Bank List Table:
  - Sortable columns
  - Pagination for large lists
  - Hover effects on rows
- Checkbox Selection:
  - Clear visual feedback for selected items
  - Bulk selection controls
- View Details Dialog:
  - Nested modal or side panel
  - Question list with formatted text preview
  - Close button to return to main list
- Add to Global Button:\n  - Gradient styling with glow effect
  - Disabled state when no selection
  - Loading state during processing
- Confirmation Dialog:
  - Glassmorphism styling
  - Clear warning message
  - Confirm button (gradient, green)
  - Cancel button (outlined)\n
#### 6.7.6 Add to Global Functionality

**Single Question Add:**
- Admin clicks 'Add to Global' button for a question in Users Question Bank
- Confirmation dialog appears:\n  - Question preview\n  - Confirmation message: 'Add this question to Global Question Bank? It will be available to all schools.'
  - Confirm and Cancel buttons\n- On confirmation:
  - Set is_global = true for the question
  - Set source_user_id = created_by (to track original creator)
  - Show success message\n  - Update Global Status badge in Users Question Bank\n  - Question now appears in Global Question Bank tab
\n**Bulk Add to Global (NEW - Enhanced):**
- Admin selects multiple questions using checkboxes in Users Question Bank
- Copy to Global button appears below 'All Users' and 'All Banks' filters, above 'Created By' and 'Action' columns
- Button shows selected count (e.g., 'Copy to Global (5 selected)')
- Clicking Copy to Global button opens confirmation dialog:\n  - List of selected questions with preview (first 5 shown, expandable to see all)
  - Confirmation message: 'Copy X selected questions to Global Question Bank? They will be available to all schools.'\n  - Confirm and Cancel buttons
- On confirmation:
  - Set is_global = true for all selected questions
  - Set source_user_id = created_by for each question
  - Show progress indicator during processing
  - Show success message with count: 'Successfully copied X questions to Global Question Bank!'
  - Update Global Status badges\n  - Questions now appear in Global Question Bank tab
  - Clear checkbox selections
\n#### 6.7.7 Remove from Global Functionality

**Single Question Remove:**
- Admin clicks 'Remove from Global' button for a question in Global Question Bank
- Confirmation dialog appears:
  - Question preview\n  - Warning message: 'Remove this question from Global Question Bank? It will no longer be available to all schools, but will remain in the original user's question bank.'
  - Confirm and Cancel buttons
- On confirmation:
  - Set is_global = false for the question
  - Show success message
  - Question removed from Global Question Bank tab
  - Question remains in Users Question Bank with updated Global Status\n
#### 6.7.8 Global Question Bank Access for Schools

**Teacher and Principal Access:**
- When creating question papers or exams, teachers and principals can access:\n  - Their own school's question bank (school-specific questions)
  - Global Question Bank (questions marked as is_global = true)
- Question selection interface shows two sections:
  - Section 1: My School Questions\n  - Section 2: Global Questions
- Teachers and principals can select questions from both sections\n- Global questions are read-only for teachers and principals (cannot edit or delete)
- Global questions can be used in question papers and exams like school-specific questions

**Question Paper Preparation with Global Questions:**
- When selecting questions for question paper:\n  - Display school questions and global questions separately or with clear indicators
  - Global questions marked with 'Global' badge
  - Teachers can select questions from both sources
  - Question usage tracking applies to both school and global questions

**Exam Creation with Global Questions:**
- When creating exams:
  - Teachers and principals can select questions from school bank and global bank
  - Global questions treated same as school questions in exam interface
  - Students see no difference between school and global questions
\n#### 6.7.9 Admin Question Bank Database Changes

**Updated question_bank Table:**
- Add column: is_global (Boolean, default false)
  - true: Question is in Global Question Bank, available to all schools
  - false: Question is school-specific, available only to that school
- Add column: source_user_id (Foreign Key → users.id, nullable)
  - Stores the ID of the user who originally created the question
  - Used to track original creator when question is added to global bank
  - Displayed in Global Question Bank as 'Source User'
\n**Query Logic:**
- Get Global Questions:
  ```sql
  SELECT * FROM question_bank WHERE is_global = true
  ```
- Get Users Questions:\n  ```sql
  SELECT * FROM question_bank WHERE created_by IS NOT NULL
  ```
- Get Questions for Teacher/Principal (including global):
  ```sql
  SELECT * FROM question_bank \n  WHERE (school_id = [user_school_id] OR is_global = true)\n  ```

#### 6.7.10 Admin Question Bank UI Components

**Question Bank Card (Admin Dashboard):**
- Card title: 'Question Bank'
- Card content:
  - Global Questions count with icon
  - Users Questions count with icon
  - Quick action button: 'Manage Question Bank'
- Card styling: Glassmorphism with gradient effect
\n**Question Bank Page (Admin):**
- Page title: 'Question Bank Management'
- **NEW: Create Question button at top (above tabs)**
- Tab switcher: Global / Users\n- Filter panel on left (collapsible)
- Search bar at top
- View switcher: Row View / Card View
- Question list/grid in main area
- Pagination at bottom
- **NEW: Create Question Bank button in Users tab**
- **NEW: Checkbox column in Users tab for bulk selection**
- **NEW: Copy to Global button below filters in Users tab**
\n**Global Question Bank Tab:**
- Table columns as specified above
- **Action buttons: View, Edit, Delete, Remove from Global**
- Bulk action: Select multiple and remove from global
- Export button: Export global questions as Excel/CSV
\n**Users Question Bank Tab:**\n- **NEW: Checkbox column as first column**
- Table columns as specified above
- Action buttons: View, Add to Global\n- **NEW: Copy to Global button placement:**
  - Located below 'All Users' and 'All Banks' filter dropdowns
  - Located above 'Created By' and 'Action' column headers
  - Button label: 'Copy to Global'
  - Shows selected count when questions are selected
  - Disabled when no questions selected\n  - Enabled and highlighted when at least one question selected
- Global Status badge: Green 'In Global' or Gray 'Not in Global'
- Export button: Export users questions as Excel/CSV
- **NEW: Create Question Bank button**
\n**Create Question Button:**
- Location: Top of Admin Question Bank page (above tabs)
- Icon: Plus icon with text 'Create Question'\n- Styling: Primary button with gradient effect
- Opens Create Question form dialog

**Create Question Form Dialog:**
- Large modal dialog with glassmorphism styling
- Form fields as specified in Section 6.7.4
- School dropdown at top
- Cascading dropdowns for Class, Subject, Lesson
- Rich text editor for question text
- Add to Global checkbox at bottom
- Save and Cancel buttons

**Create Question Bank Button:**
- Location: Users Question Bank tab, next to filter panel\n- Icon: Plus icon with text 'Create Question Bank'
- Styling: Secondary button with gradient effect
- Opens Create Question Bank interface

**Create Question Bank Dialog:**
- Large modal dialog with glassmorphism styling
- Title: 'Add Question Banks to Global'
- Question bank list table with columns as specified
- Filter and search options\n- Checkbox selection for each bank
- View Details button for each bank
- Add to Global button at bottom
- Close button\n
**Add to Global Confirmation Dialog:**
- Modal dialog with glassmorphism styling
- Question preview with formatted text
- Confirmation message\n- Confirm button (gradient, green)
- Cancel button (outlined)

**Copy to Global Confirmation Dialog (NEW):**
- Modal dialog with glassmorphism styling\n- Title: 'Copy Questions to Global'
- Selected questions count display
- List of selected questions (first 5 shown, expandable)
- Confirmation message: 'Copy X selected questions to Global Question Bank? They will be available to all schools.'
- Confirm button (gradient, green) with text 'Copy to Global'
- Cancel button (outlined)
- Progress indicator during processing
\n**Remove from Global Confirmation Dialog:**
- Modal dialog with glassmorphism styling
- Question preview with formatted text
- Warning message with icon
- Confirm button (gradient, red)
- Cancel button (outlined)\n
#### 6.7.11 Admin Question Bank Access Control

**Admin Permissions:**
- Full access to Global Question Bank:\n  - View all global questions
  - **Edit global questions**
  - **Delete global questions**
  - Remove questions from global bank
- Full access to Users Question Bank:
  - View all questions created by users across all schools
  - Add questions to global bank (single or bulk)
  - **NEW: Bulk copy multiple questions to global bank using checkboxes**
  - Cannot edit or delete user questions (read-only)
- **NEW: Create questions directly**
  - Can create questions for any school
  - Can add created questions to Global immediately
- **NEW: Create Question Bank functionality**
  - Can view all user-created question banks not in Global
  - Can add entire question banks to Global
- Cross-school visibility:
  - Can view questions from all schools
  - Can filter by school
  - Can add questions from any school to global bank

**Teacher and Principal Permissions:**
- Can view and use global questions in question papers and exams
- Cannot edit or delete global questions
- Cannot add questions to global bank
- Can only edit and delete their own school-specific questions

**Data Isolation:**
- School-specific questions remain isolated to their school
- Global questions are accessible to all schools (read-only for teachers/principals)
- Admin has cross-school visibility for management purposes
- Backend validation ensures proper access control

#### 6.7.12 Admin Question Bank Notifications

**Admin Notifications:**
- Notification when question is added to global bank
- Notification when multiple questions are copied to global bank
- Notification when question is removed from global bank\n- Notification when question bank is added to global bank
- Daily/weekly summary of global question bank activity

**Teacher/Principal Notifications:**
- Notification when new global questions are added (optional)
- Notification when their question is added to global bank (optional)
\n#### 6.7.13 Admin Question Bank Analytics

**Analytics Dashboard (Admin):**
- Overview Cards:
  - Total Global Questions
  - Total Users Questions
  - Questions Added to Global (this month)
  - Most Used Global Questions
- Charts:
  - Global questions by subject (pie chart)
  - Global questions by difficulty (bar chart)
  - Questions added to global over time (line chart)
  - Top contributors (users who created most global questions)
- Detailed Statistics:
  - Global questions by class and subject (table)
  - Global questions by question type (table)
  - Usage statistics for global questions (table)
\n#### 6.7.14 Admin Question Bank Help and Documentation

**Help Resources:**
- Help icon in Admin Question Bank page
- Opens help dialog with:
  - Overview of Global and Users Question Banks
  - How to create questions as Admin
  - How to add questions to global bank
  - How to bulk copy questions to global bank using checkboxes
  - How to add question banks to global bank
  - How to remove questions from global bank
  - How teachers and principals can use global questions
  - Best practices for managing global question bank
  - FAQ section

**FAQ Topics:**
- What is Global Question Bank?
- How to create questions as Admin?
- How to add questions to Global Question Bank?
- How to bulk copy multiple questions to Global Question Bank?
- How to add question banks to Global Question Bank?
- Can I edit global questions?
- Can teachers edit global questions?
- How do teachers access global questions?
- Can I remove questions from global bank?
- What happens when I remove a question from global bank?
- Can I add questions from multiple schools to global bank?
\n## 7. Question Paper Preparation Module

### 7.1 Question Paper Preparation Overview
- Purpose: Enable teachers to create question papers from their own question bank and global question bank
- Access: Available only to Teacher role
- Workflow: Basic Details → Question Selection → Shuffle Options → Preview/Save/Generate
- Question text displayed with formatting in all stages
- Display question usage count and list of question papers where each question was used during question selection
\n### 7.2 Question Paper Preparation Workflow

#### 7.2.1 Step 1: Basic Details
- Class Selection (Dropdown, required)
- Subject Selection (Dropdown, required)
\n#### 7.2.2 Step 2: Question Selection Source
- View All Questions or View Questions by Question Bank Name
- **Questions displayed from two sources:**
  - My School Questions (school-specific questions)
  - Global Questions (questions from Global Question Bank)
- **Enhanced Question Display with Usage Tracking**\n  - Question list displayed in row format (with formatted text preview)
  - For each question, display:
    - Question Text (truncated with expand option)
    - Source Badge (My School / Global)
    - Usage Count: Number of times the question has been used in past question papers
    - Used In Papers: List of question paper names where the question was used (expandable/collapsible)
  - Display format: Question Text | Source | Usage Count | Used In Papers
  - Example: \"What is photosynthesis?\" | My School | Used 3 times | [Paper 1, Paper 2, Paper 3]
  - If question has never been used, display: Usage Count = 0, Used In Papers = \"Not used yet\"
  - Clickable paper names to view paper details (optional)
  - Helps teachers decide whether to reuse a question or select a new one

#### 7.2.3 Step 3: Shuffle Functionality
- Shuffle Questions (Checkbox)\n- Shuffle MCQ Options (Checkbox)
\n#### 7.2.4 Step 4: Final Question Paper Output
- Preview Question Paper (with formatted question text)
- Save as Draft\n- Generate Final Question Paper\n- Export as PDF (preserving text formatting)
- Print Option (preserving text formatting)

### 7.3 Question Paper Database Structure
Table name: question_papers

Columns:
- id (UUID, Primary Key)
- paper_name (Varchar, required)
- school_id (Foreign Key → schools.id)\n- class_id (Foreign Key → classes.id)
- subject_id (Foreign Key → subjects.id)
- created_by (Foreign Key → users.id)
- selected_questions (JSON array, includes formatted question text)
- shuffle_questions (Boolean)\n- shuffle_mcq_options (Boolean)
- paper_status (Enum: Draft, Final)\n- total_marks (Integer)
- total_questions (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)
- parent_paper_id (Foreign Key → question_papers.id, nullable)
- version_name (Varchar, optional)

### 7.4 Question Usage Tracking Implementation

#### 7.4.1 Database Structure for Usage Tracking

**Option 1: Junction Table (Recommended)**
Table name: question_paper_questions

Columns:
- id (UUID, Primary Key)
- question_paper_id (Foreign Key → question_papers.id, required)
- question_id (Foreign Key → question_bank.id, required)
- created_at (Timestamp)
\n**Purpose:** This junction table tracks which questions are used in which question papers. It enables efficient querying of usage count and paper list for each question.

**Query Logic:**
- To get usage count for a question:
  ```sql
  SELECT COUNT(*) FROM question_paper_questions WHERE question_id = [question_id]\n  ```
- To get list of papers where a question was used:
  ```sql
  SELECT qp.paper_name, qp.id \n  FROM question_papers qp\n  JOIN question_paper_questions qpq ON qp.id = qpq.question_paper_id
  WHERE qpq.question_id = [question_id]
  ORDER BY qp.created_at DESC
  ```

**Option 2: Denormalized Approach (Alternative)**
Add a column to question_bank table:
- usage_count (Integer, default 0)
- used_in_papers (JSON array, stores paper IDs)

**Note:** Option 1 (Junction Table) is recommended for better data integrity and easier querying.

#### 7.4.2 Backend Logic for Usage Tracking

**When Creating/Editing Question Paper:**
1. After teacher selects questions and saves/generates paper:
   - Insert records into question_paper_questions table for each selected question
   - Link question_paper_id and question_id\n2. If editing existing paper and questions are changed:
   - Delete old records from question_paper_questions for that paper
   - Insert new records for updated question selection

**When Fetching Questions for Selection:**
1. Query question_bank table for questions matching class and subject (including global questions)
2. For each question, perform a JOIN query to get:\n   - Usage count from question_paper_questions table
   - List of paper names from question_papers table
3. Return question data with usage_count and used_in_papers fields
4. Frontend displays this data alongside question text

**When Deleting Question Paper:**
1. Delete records from question_paper_questions table for that paper
2. This automatically updates usage count for affected questions

#### 7.4.3 Frontend UI for Usage Tracking

**Question Selection Interface:**
- Display questions in table or card format
- Add columns/fields:\n  - **Source Badge:** Display 'My School' or 'Global' badge
  - **Usage Count:** Display as badge or number (e.g., \"Used 3 times\")
  - **Used In Papers:** Display as expandable list or tooltip
    - If usage count > 0: Show paper names as clickable links or plain text
    - If usage count = 0: Show \"Not used yet\" in muted text
- Example Layout:
  ```\n  | Question Text                     | Source      | Usage Count | Used In Papers                  | Actions |
  |-----------------------------------|-------------|-------------|---------------------------------|---------|
  | What is photosynthesis?           | My School   | 3 times     | [Paper 1, Paper 2, Paper 3]     | Select  |
  | Define Newton's First Law         | Global      | 1 time      | [Physics Midterm]               | Select  |
  | Explain the water cycle           | My School   | 0 times     | Not used yet                    | Select  |
  ```

**Expandable Paper List:**
- If usage count > 3, show first 3 papers and \"+ X more\" link
- Clicking \"+ X more\" expands to show all papers
- Each paper name can be clickable to view paper details (optional)

**Visual Indicators:**
- Color-code usage count:\n  - Green: 0-1 times (fresh question)
  - Orange: 2-3 times (moderately used)
  - Red: 4+ times (heavily used)\n- Icon indicator for heavily used questions (e.g., warning icon)
\n#### 7.4.4 Performance Optimization

**Caching:**
- Cache usage count and paper list for frequently accessed questions
- Invalidate cache when question paper is created/edited/deleted

**Pagination:**
- Load questions in batches (e.g., 50 questions per page)
- Fetch usage data only for visible questions
\n**Indexing:**
- Add database index on question_paper_questions.question_id for faster queries
- Add index on question_papers.id for efficient JOIN operations

#### 7.4.5 Access Control for Usage Tracking

**Teacher Access:**
- Can view usage count and paper list for own questions and global questions
- Cannot view usage data for questions created by other teachers
- Backend validation ensures data isolation

**Principal Access:**
- Can view usage count and paper list for all questions in their school and global questions
- Can see which teachers created which papers
- Full visibility within school scope

#### 7.4.6 Additional Features (Optional)

**Usage Analytics:**
- Add analytics dashboard showing:
  - Most used questions
  - Least used questions
  - Questions never used\n  - Usage trends over time

**Smart Recommendations:**
- Suggest questions with low usage count
- Warn when selecting heavily used questions
- Recommend fresh questions for variety

**Bulk Actions:**
- Filter questions by usage count
- Sort questions by usage count (ascending/descending)
- Export usage report

### 7.5 Access Control & Data Isolation
- Teachers can access only their own question banks and global question bank
- Backend validation ensures data isolation
- Teachers can only view and manage question papers created by themselves
- Principal can view all question papers created by teachers in their school
- Usage tracking respects data isolation rules

### 7.6 Question Paper Management Interface
- Question Paper List with filters\n- Actions: View, Edit, Delete, Export PDF, Print, Shuffle and Save
- All actions preserve question text formatting
\n### 7.7 Enhanced Question Paper Features
- Multiple Question Paper Versions\n- Question Paper Templates
- Smart Question Selection
- Preview Enhancements (with formatted text rendering)
- Bulk Operations\n- Version History
- Shuffle and Save with Auto-Versioned Names
- Question usage tracking for informed question selection

## 8. Question Paper History Module

### 8.1 Question Paper History Overview\n- Purpose: Provide comprehensive tracking and management of all question papers created by teachers
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
- Total Marks
- Total Questions\n- Version Info
- Actions

#### 8.2.2 Filter Options
- Teacher Filter (Principal only)
- Class Filter\n- Subject Filter
- Date Range Filter
- Paper Status Filter
- Version Type Filter
- Clear All Filters button

#### 8.2.3 Search Functionality
- Text search bar
- Real-time search with auto-suggestions
- Combined search and filter capability

#### 8.2.4 Sorting Options
- Sort by Creation Date\n- Sort by Last Modified Date\n- Sort by Paper Name
- Sort by Class
- Sort by Total Marks
\n### 8.3 Question Paper Detail View

#### 8.3.1 Paper Information Section
- Paper Name
- Paper ID
- Class and Subject
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
- Edit Paper\n- Create New Version
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
\n#### 8.4.3 Print Access Control
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
- Charts and Graphs\n- Personal Statistics

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
\n#### 8.7.2 Principal Dashboard Integration
- Add 'Question Paper History' card to Principal Dashboard
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
- Access:
  - Teachers can create exams for assigned sections
  - Students can take assigned exams using individual login
  - Principal can create exams directly and approve teacher exams
- Key Features:
  - Create exams from question papers or question bank (including global questions)
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
  - Student-level exam assignment option
\n### 9.2 Online Exam Creation Workflow

#### 9.2.1 Step 1: Exam Basic Details
Form Fields:
- Exam Name (Text input, required)
- Exam Type (Radio buttons: Practice Exam / School-Level Exam)\n- Class (Dropdown, required)
- Subject (Dropdown, required)
- Student Selection Mode (Radio buttons: Entire Class / Specific Students)
  - **Entire Class:** Exam assigned to all students in selected sections
  - **Specific Students:** Exam assigned to selected individual students
- Section Selection (Multi-select checkbox, required when Student Selection Mode = Entire Class)
- Select Students (Multi-select dropdown, required when Student Selection Mode = Specific Students)
  - Dropdown list populated dynamically based on selected class
  - Shows student names from the selected class
  - Allows multiple student selection
  - Search functionality within dropdown for easy student lookup
  - Selected students displayed as tags/chips below dropdown
  - Remove individual students by clicking X on tag
  - Clear all selections button
- Exam Duration (Number input in minutes, required)
- Start Date and Time (Date-time picker, required)
- End Date and Time (Date-time picker, required)
- Passing Marks (Auto-calculated, read-only display)
  - Automatically calculated as 35% of total marks
  - Display format: 'Passing Marks: XX marks (35% of Total Marks)'
  - Updated dynamically when questions are selected/changed
- Instructions for Students (Rich text editor, optional)
\n**Student Selection Mode Behavior:**
- When user selects 'Entire Class':
  - Section Selection field becomes visible and required
  - Select Students field is hidden
  - Exam will be assigned to all students in selected sections
- When user selects 'Specific Students':
  - Section Selection field is hidden
  - Select Students dropdown becomes visible and required
  - Dropdown is populated with students from selected class
  - User can search and select individual students
  - Exam will be assigned only to selected students
\n**Select Students Dropdown Features:**
- Dynamic population based on selected class
- Real-time search/filter functionality
- Display student name, roll number (if available), and section
- Multi-select with checkboxes
- Select All / Deselect All options
- Selected count display (e.g., '5 students selected')
- Validation: At least one student must be selected
- Backend validation ensures selected students belong to selected class

#### 9.2.2 Step 2: Question Selection Method
Method A: Select from Existing Question Paper
- Question Paper Dropdown\n- Paper Preview (with formatted question text)
- Auto-Import\n- Modification Options\n
Method B: Select Questions from Question Bank
- Question Bank View (with formatted question text preview)
- **Questions displayed from two sources:**
  - My School Questions (school-specific questions)
  - Global Questions (questions from Global Question Bank)
- Filter Panel\n- Question Selection Interface
- Selected Questions Panel
- Smart Selection Tools
- Question Preview (with formatting)
\n#### 9.2.3 Step 3: Exam Settings Configuration
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
   - Display Student Selection Mode and count
   - If Entire Class: Show 'Assigned to: All students in [Section Names]'\n   - If Specific Students: Show 'Assigned to: [X] selected students' with expandable list
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
- approval_date (Timestamp, nullable)\n- school_id (Foreign Key → schools.id, required)
- class_id (Foreign Key → classes.id, required)
- subject_id (Foreign Key → subjects.id, required)
- created_by (Foreign Key → users.id, required)
- question_paper_id (Foreign Key → question_papers.id, nullable)
- selected_questions (JSON array, required, includes formatted question text)
- student_selection_mode (Enum: Entire Class, Specific Students, required)
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
- created_at (Timestamp)\n- updated_at (Timestamp)
- published_at (Timestamp, nullable)
- auto_publish (Boolean)
\n#### 9.3.2 Exam Section Mapping Table
Table name: exam_sections

Columns:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)\n- section_id (Foreign Key → sections.id, required)
- total_students (Integer, calculated)
- students_started (Integer, default 0)
- students_completed (Integer, default 0)
- created_at (Timestamp)
\n**Note:** This table is used only when student_selection_mode = 'Entire Class'

#### 9.3.3 Exam Student Mapping Table
Table name: exam_students

Columns:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)
- student_id (Foreign Key → users.id, required)
- assigned_at (Timestamp, default current timestamp)
- created_at (Timestamp)
\n**Purpose:** This table stores individual student assignments when student_selection_mode = 'Specific Students'

**Behavior:**
- When student_selection_mode = 'Entire Class': Records are created in exam_sections table
- When student_selection_mode = 'Specific Students': Records are created in exam_students table
- Backend logic determines which table to query based on student_selection_mode\n
#### 9.3.4 Student Exam Attempts Table
Table name: student_exam_attempts

Columns:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)
- student_id (Foreign Key → users.id, required)
- start_time (Timestamp, nullable)
- end_time (Timestamp, nullable)
- submission_time (Timestamp, nullable)\n- is_late_submission (Boolean)\n- time_taken (Integer, minutes, calculated)
- student_answers (JSON array, required)
- randomized_question_order (JSON array, nullable)
- randomized_mcq_options (JSON object, nullable)
- total_marks_obtained (Decimal(10,2), calculated)
- percentage (Decimal(5,2), calculated)
- pass_fail_status (Enum: Pass, Fail, Pending)
  - Pass: If total_marks_obtained >= passing_marks (35% of total marks)
  - Fail: If total_marks_obtained < passing_marks (35% of total marks)\n- attempt_status (Enum: Not Started, In Progress, Submitted, Graded)\n- auto_graded_marks (Decimal(10,2))
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
\n### 9.4 Student Exam Taking Interface

#### 9.4.1 Student Dashboard - My Exams Section
Dashboard Card: 'My Exams'\n- Display on student dashboard after login
- Shows count of exams by status\n\nMy Exams Page Layout:
- Three tabs: 'Upcoming' | 'Ongoing' | 'Completed'
\nUpcoming Exams Tab:
- List of scheduled exams not yet started
\nOngoing Exams Tab:\n- List of exams currently available\n
Completed Exams Tab:
- List of exams already submitted

**Note:** Students will see exams assigned to them through either:\n- Section-based assignment (when student_selection_mode = 'Entire Class')
- Individual assignment (when student_selection_mode = 'Specific Students')

#### 9.4.2 Exam Taking Interface\nPre-Exam Screen:
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
  - Display Student Selection Mode\n  - If Entire Class: Show total students from all assigned sections
  - If Specific Students: Show count of individually assigned students
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
- Section-wise Comparison (when applicable)
- Time Analysis
- Negative Marking Impact
- Suspicious Activity Report
- Export Options (preserving formatting)
- Print Options (preserving formatting)

#### 9.5.5 Student Allocation List with Attendance Status
Student Allocation List Interface:
- Page Layout
  - Display Student Selection Mode at top
  - If Entire Class: Show section-wise grouping
  - If Specific Students: Show flat list of assigned students
- Student List Table
  - Additional column for Section (when Specific Students mode)
- Attendance Status Logic
- Summary Statistics
  - Total assigned students count (regardless of mode)
- Filter and Sort Options
  - Filter by section (when Specific Students mode)
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
- Display Student Selection Mode badge for each exam
\nPending Approvals Tab:\n- List of school-level exams awaiting approval

Ongoing Exams Tab:
- List of exams currently active\n
Completed Exams Tab:
- List of exams past end datetime

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
- Can assign exams to entire class or specific students
- Can only select students from assigned classes
- Can select questions from school question bank and global question bank

#### 9.7.2 Student Access Rules
- Can view only assigned exams (section-based or individual assignment)
- Can take exam only during scheduled time
- Can take exam only once\n- Use individual login to access exam interface
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
- Can create exams with entire class or specific student assignment
- Can select questions from school question bank and global question bank

#### 9.7.4 Admin Access Rules
- Has cross-school visibility\n- Can view all exams across all schools
- Can view student allocation list for any exam
- Can view individual student results for any exam
- Cannot create, edit, or delete exams
- Can force delete any exam with strict confirmation
\n#### 9.7.5 Data Isolation\n- All exam data is school-scoped
- Backend validation ensures data isolation
- Cross-school access prevented
- Passing marks calculation (35% of total marks) is consistent across all roles
- Student selection respects class-teacher assignments
- Backend validation ensures selected students belong to selected class
- Global questions accessible to all schools for exam creation

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
\n### 9.9 Online Exam Security Features

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
- Time-based Access\n- Section-based Access or Individual Student Access
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

Force Delete Confirmation Dialog:
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
\n#### 9.10.7 Alternative: Archive Feature
- Archive instead of delete
- Preserve student data
- Can be restored if needed

### 9.11 Student-Level Exam Assignment Implementation Details

#### 9.11.1 Backend Logic
- When creating exam:\n  - If student_selection_mode = 'Entire Class': Insert records into exam_sections table
  - If student_selection_mode = 'Specific Students': Insert records into exam_students table
- When fetching assigned students:
  - Check student_selection_mode field
  - Query appropriate table (exam_sections or exam_students)
  - Return student list accordingly
- Validation:\n  - Ensure selected students belong to selected class
  - Prevent duplicate student assignments
  - Validate teacher has access to selected class

#### 9.11.2 Frontend UI Changes
- Exam Creation Form:
  - Add Student Selection Mode radio buttons
  - Show/hide Section Selection or Select Students dropdown based on mode
  - Implement dynamic student dropdown with search
  - Display selected students as removable tags
- Exam List View:
  - Display Student Selection Mode badge
  - Show assigned student count
- Exam Detail View:
  - Display Student Selection Mode\n  - Show list of assigned students (expandable if many)
- Student Allocation List:
  - Adapt layout based on Student Selection Mode
  - Show section grouping for Entire Class mode
  - Show flat list for Specific Students mode
\n#### 9.11.3 Database Queries
- Get assigned students for exam:
  ```sql
  IF student_selection_mode = 'Entire Class' THEN
    SELECT students FROM exam_sections JOIN sections JOIN students\n  ELSE IF student_selection_mode = 'Specific Students' THEN\n    SELECT students FROM exam_students JOIN students\n  ```
- Get exams for student:
  ```sql
  SELECT exams WHERE\n    (student_selection_mode = 'Entire Class' AND student.section_id IN exam_sections)\n    OR\n    (student_selection_mode = 'Specific Students' AND student.id IN exam_students)\n  ```

#### 9.11.4 Migration Plan
- Add student_selection_mode column to online_exams table
- Create exam_students table\n- Set default value 'Entire Class' for existing exams
- Update frontend components\n- Update backend API endpoints
- Test thoroughly before deployment

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
- Question Bank Access (with rich text editor for question creation, bulk upload capability, and access to global questions)
- Question Paper Preparation (with question usage tracking and access to global questions)
- Question Paper History Management (with preview and print functionality)
- Online Exam Management (with student-level assignment option and access to global questions)
\n### 10.3 Students Card - Student Management (Teacher Dashboard)
Note: This card is copied from Principal Dashboard with role-based access control for Teachers\n
- Teacher can view students from their assigned sections only
- Student list displays:
  - Student Name
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
- Profile settings\n\n## 12. Admin Dashboard and Functions

### 12.1 Admin Login - Dashboard Overview
After Admin login, the dashboard displays:
- Total Users Card
- Total Schools Card
- **Question Bank Card**
- User Management\n- School Management
- System Configuration
\n### 12.2 Admin Functions
- Create and manage schools
- User account management
- Force delete exams with student attempts
- **Question Bank Management with Global and Users sections**
- **NEW: Create questions directly**
- **NEW: Create Question Bank functionality - View and add user-created question banks to Global**
- **NEW: Bulk copy multiple questions to Global using checkboxes**
\n### 12.3 Admin Question Bank Card
- Card title: 'Question Bank'
- Card displays:
  - Total Global Questions count
  - Total Users Questions count
  - Quick action button: 'Manage Question Bank'
- Clicking card navigates to Admin Question Bank page
\n## 13. Navigation and Side Panel Configuration

### 13.1 Admin Side Panel Menu
The side panel navigation for Admin role includes the following menu items (in order):
1. Dashboard (Home icon)
2. Schools (Building icon)
3. Users (Users icon)
4. **Question Bank (Question mark icon)**
5. System Settings (Settings icon)
6. Profile (User circle icon)
7. Logout (Sign out icon)

### 13.2 Principal Side Panel Menu
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

### 13.3 Teacher Side Panel Menu
The side panel navigation for Teacher role includes the following menu items (in order):
1. Dashboard (Home icon)
2. My Classes (Book icon)
3. Students (User icon)
4. Question Bank (Question mark icon)
5. Question Paper Preparation (File text icon)
6. Question Paper History (Document icon)
7. Online Exams (Clipboard icon)\n8. Profile (User circle icon)
9. Logout (Sign out icon)

### 13.4 Side Panel Design Specifications
- Collapsible side panel with toggle button
- Glassmorphism styling with backdrop blur
- Active menu item highlighted with gradient background
- Hover effects with subtle glow
- Icons aligned to left with text labels
- Responsive design: Full panel on desktop, collapsed on mobile
- Smooth transition animations
- Consistent with overall dark purple-blue gradient theme

### 13.5 Navigation Behavior
- Clicking 'Question Bank' menu item navigates to Question Bank page\n- For Admin: Opens Admin Question Bank page with Global and Users tabs
- For Principal/Teacher: Opens standard Question Bank page\n- Active menu item remains highlighted
- Breadcrumb navigation updates accordingly
- Page title updates to 'Question Bank' or 'Question Bank Management' (Admin)\n- Access control enforced based on role

## 14. Key Features\n
### 14.1 User Registration and Approval Workflow
- New users assigned 'Pending Approval' status
- Admin must approve new accounts\n\n### 14.2 Password Reset/Recovery Feature
- Forgot Password link on login page
- Email-based password reset process
\n### 14.3 Admin Functions
- Create and manage schools
- User account management
- Force delete exams with student attempts
- **Question Bank Management with Global and Users sections**
- **Add questions from Users Question Bank to Global Question Bank**
- **Remove questions from Global Question Bank**
- **Edit and delete questions in Global Question Bank**
- **NEW: Create questions directly**
- **NEW: Create Question Bank functionality - View and add user-created question banks to Global**\n- **NEW: Bulk copy multiple questions to Global using checkboxes**

### 14.4 Principal Functions
- Academic Management\n- Teacher Management
- Student Management
- Question Bank Management (with rich text editor, bulk upload, and access to global questions)
- Question Paper History Management (with preview and print functionality)\n- Online Exam Monitoring
\n### 14.5 Teacher Functions
- View assigned classes, sections, subjects
- View and manage students from assigned sections
- Question Bank Access (with rich text editor, bulk upload, and access to global questions)
- Question Paper Preparation (with question usage tracking and access to global questions)
- Question Paper History Management (with preview and print functionality)
- Online Exam Management (with student-level assignment option and access to global questions)

### 14.6 Student Functions
- View personal information\n- Profile editing
- Online Exam Functions (with formatted question text display)
\n### 14.7 User Profile Management
- Edit, Save, Approve, Suspend buttons
- Status-based navigation\n\n### 14.8 Principal Dashboard Features
- Total Teachers Card
- Total Students Card\n\n### 14.9 Admin Dashboard Features
- Total Users Card
- Total Schools Card
- **Question Bank Card**
\n### 14.10 Landing Page Features
- Updated design without login/register buttons in hero section
\n### 14.11 Question Paper History Feature
- Comprehensive tracking\n- Advanced filtering
- Analytics and reporting
- Preview with print option
- Print directly from preview dialog
- Accessible via side panel menu for Principal and Teacher roles

### 14.12 Online Exam Feature
- Complete exam management system
- Automatic passing marks calculation: 35% of total marks
- Enhanced student interface
- Question text displayed with formatting
- Real-time monitoring
- Automatic and manual grading
- Comprehensive analytics
- Security features
- Deletion functionality
- Student-level exam assignment option
- Access to global questions for exam creation

### 14.13 Teacher Student Management Feature
- Students card added to Teacher Dashboard
- Role-based access control for viewing students from assigned sections only
- Enhanced search and filter functionality
- Data isolation based on teacher-section mapping\n\n### 14.14 Rich Text Editor Integration Feature
- Integrated rich text editor (Quill, Draft.js, or TinyMCE) in question creation form
- Teachers and Principals can apply bold, underline, italic, and other formatting directly while typing questions
- Formatted text preserved and displayed correctly in all interfaces (exam, reports, exports)
- HTML sanitization to prevent XSS attacks\n- Responsive design for mobile and desktop
- Accessibility support (ARIA labels, keyboard navigation)\n
### 14.15 Question Paper Preview and Print Feature
- Preview button in Question Paper History
- Preview dialog with formatted question text rendering
- Print button in preview dialog opens browser print dialog
- All formatting, images, and layout preserved in print output
- Role-based access control for preview and print functionality
- High-quality print output with proper page layout
\n### 14.16 Side Panel Navigation Enhancement
- Question Paper History menu item added to Principal side panel
- Question Paper History menu item added to Teacher side panel\n- **Question Bank menu item added to Admin side panel**\n- Consistent navigation experience across roles
- Easy access to historical question papers and question bank management
- Improved user workflow and productivity

### 14.17 Bulk Upload Questions Feature
- Bulk upload functionality for Question Bank
- Support for all question types in single file
- Updated: Three-sheet Excel template structure (Option, Question, Reference)
- Option Sheet: Contains dropdown values for data validation
- Question Sheet: Empty sheet with column headers and data validation, no sample data
- Reference Sheet: Contains sample questions as examples for teachers
- Comprehensive validation and error handling
- Role-based access control (Teacher and Principal)
- Efficient import process with progress tracking
- Detailed import summary and statistics
- Help documentation and FAQ

### 14.18 Student-Level Exam Assignment Feature
- Teachers and Principals can assign exams to entire class or specific students
- Student Selection Mode: Entire Class / Specific Students
- Dynamic student dropdown with search functionality
- Multi-select students from selected class
- Backend validation ensures data integrity
- Flexible exam assignment for targeted assessments
- Improved exam management workflow

### 14.19 Question Usage Tracking Feature
- Display question usage count during question paper preparation
- Show list of question papers where each question was used
- Helps teachers make informed decisions about question reuse
- Enhances question paper quality and variety
- Improves question bank management
- Supports data-driven question selection

### 14.20 Admin Global Question Bank Feature
- Admin can manage Global Question Bank accessible to all schools
- Two-tab interface: Global Question Bank and Users Question Bank
- Admin can add questions from Users Question Bank to Global Question Bank
- **Admin can edit and delete questions in Global Question Bank**
- Admin can remove questions from Global Question Bank
- Teachers and Principals can access global questions for question papers and exams
- Global questions are read-only for teachers and principals
- Enhances question sharing across schools
- Improves question quality through centralized management
- Supports standardized assessments across multiple schools

### 14.21 NEW: Admin Create Question Feature
- Admin can create questions directly from Admin Question Bank page
- Same question creation form as Teacher/Principal with additional School dropdown
- Admin can create questions for any school\n- Option to add created questions to Global Question Bank immediately
- Enhances admin control over question bank content
- Supports centralized question creation and management
\n### 14.22 NEW: Admin Create Question Bank Feature
- Admin can view all user-created question banks not yet in Global Question Bank
- List interface with filters and search functionality
- Admin can select and add entire question banks to Global Question Bank
- Bulk addition of questions from multiple question banks
- Preview functionality to review questions before adding to Global
- Streamlines process of curating high-quality questions for Global Question Bank
- Supports efficient management of large question repositories

### 14.23 NEW: Admin Bulk Copy to Global Feature
- **Checkbox column added to Users Question Bank tab for bulk selection**
- **Copy to Global button placed below 'All Users' and 'All Banks' filters, above 'Created By' and 'Action' columns**
- **Admin can select multiple questions using checkboxes and copy them to Global in one action**
- **Button shows selected count and is enabled only when at least one question is selected**
- **Confirmation dialog displays selected questions count and list before copying**
- **Progress indicator during bulk copy process**
- **Success message with count after successful copy**
- **Significantly improves efficiency of adding multiple questions to Global Question Bank**
- **Reduces time and effort required for curating Global Question Bank**

## 15. Language Support

### 15.1 UI Language\n- UI Language: English Only
\n### 15.2 Chat/Communication Language
- Users can communicate in any language
\n### 15.3 Language Rule Summary
- UI = Always English
- Chat/Communication = Any Language
\n## 16. Future Scope Features
- Audit Logs
- Backup & Restore
- Notifications
- Analytics Dashboard
- Advanced question paper scheduling
- Automated paper generation
- Student performance tracking
- Advanced proctoring features
- Adaptive testing
- Question bank sharing (enhanced with Global Question Bank)
- Parent portal\n- Exam archive feature
\n## 17. Design Style\n
### 17.1 Overall Theme
- Dark purple-blue gradient theme
- Glassmorphism cards with soft glow effects
- Smooth gradients throughout the interface
- Rounded corners (8px radius)
- Elegant shadows for depth
- Clean sans-serif typography
- Professional EdTech look
- NEET and school-focused design
- Consistent colors across all screens

### 17.2 Color Scheme
- Primary gradient: Dark purple (#6B46C1) to blue (#3B82F6)
- Background: Deep purple-blue gradient (#1E1B4B to #312E81)
- Card background: Semi-transparent glassmorphism with backdrop blur
- Accent colors:\n  - Success/Active: Green (#10B981)
  - Warning/Pending: Orange (#F59E0B)
  - Error/Danger: Red (#EF4444)\n  - Info: Blue (#3B82F6)
  - Purple accent: (#8B5CF6)
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
  - Cancelled: Red (#EF4444)
  - Rejected: Red (#EF4444)\n- Exam type badges:
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
- Question Usage Indicator Colors:
  - Fresh (0-1 times): Green (#10B981)
  - Moderately Used (2-3 times): Orange (#F59E0B)
  - Heavily Used (4+ times): Red (#EF4444)
- **Global Question Badge:**
  - Global: Blue (#3B82F6)
  - My School: Purple (#8B5CF6)
- **Global Status Badge (Admin):**
  - In Global: Green (#10B981)
  - Not in Global: Gray (#6B7280)
- **Copy to Global Button:**
  - Button color: Green (#10B981) with gradient effect
  - Disabled state: Gray (#6B7280)\n  - Hover state: Enhanced green glow
\n### 17.3 Visual Details
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
  - Info badge highlighting three-sheet structure
  - Drag-and-drop upload area with hover effect
  - Validation results table with color-coded rows
  - Progress bar for import process
  - Success/error messages with appropriate icons
- Student Selection Dropdown Styling:
  - Multi-select dropdown with search bar
  - Checkboxes for each student
  - Selected students displayed as removable tags/chips
  - Tag styling with glassmorphism effect
  - Remove button (X) on each tag with hover effect
  - Clear all button with subtle styling
  - Selected count badge\n  - Dropdown max-height with scroll\n- Question Usage Display Styling:
  - Usage count displayed as badge with color coding
  - Green badge for fresh questions (0-1 times)
  - Orange badge for moderately used questions (2-3 times)
  - Red badge for heavily used questions (4+ times)
  - Paper list displayed as expandable/collapsible section
  - Paper names as clickable links (optional)
  - Tooltip on hover showing full paper details
  - Icon indicator for heavily used questions (warning icon)
  - Clean, readable layout in question selection table
- **Admin Question Bank Styling:**
  - Two-tab interface with clear tab switcher
  - Global tab with blue accent
  - Users tab with purple accent
  - Global Status badge with color coding
  - Add to Global button with green gradient
  - Remove from Global button with red gradient
  - **Edit button with blue gradient**
  - **Delete button with red gradient**
  - Bulk action buttons with appropriate styling
  - Confirmation dialogs with glassmorphism effect
  - Source User column with user icon
  - Filter panel with collapsible sections
  - **NEW: Checkbox column styling:**
    - Checkboxes aligned to left
    - Clear visual feedback for selected state
    - Select All checkbox in header row
    - Selected count badge displayed prominently
  - **NEW: Copy to Global button styling:**
    - Gradient button with green color (#10B981)
    - Placement below 'All Users' and 'All Banks' filters
    - Placement above 'Created By' and 'Action' column headers
    - Button label: 'Copy to Global'
    - Shows selected count when questions are selected (e.g., 'Copy to Global (5)')
    - Disabled state: Gray color, no hover effect
    - Enabled state: Green gradient with glow effect
    - Hover state: Enhanced green glow
    - Loading state: Spinner icon during processing
- **NEW: Create Question Button Styling:**
  - Primary button with gradient effect (purple to blue)
  - Plus icon with text 'Create Question'
  - Prominent placement at top of page
  - Hover effect with enhanced glow
  - Tooltip on hover\n- **NEW: Create Question Form Dialog Styling:**
  - Large modal dialog with glassmorphism effect
  - School dropdown at top with clear label
  - Cascading dropdowns with smooth transitions
  - Rich text editor with consistent styling
  - Add to Global checkbox with clear label
  - Save button with gradient effect (green)\n  - Cancel button with outlined styling
- **NEW: Create Question Bank Button Styling:**
  - Secondary button with gradient effect (teal to indigo)
  - Plus icon with text 'Create Question Bank'
  - Placement in Users tab next to filter panel
  - Hover effect with subtle glow
  - Tooltip on hover
- **NEW: Create Question Bank Dialog Styling:**
  - Large modal dialog with glassmorphism effect
  - Title with clear heading
  - Question bank list table with sortable columns
  - Checkbox selection with visual feedback
  - View Details button with icon
  - Add to Global button at bottom with gradient effect (green)
  - Close button in top-right corner
  - Filter and search panel with collapsible sections
- **NEW: Copy to Global Confirmation Dialog Styling:**
  - Modal dialog with glassmorphism effect\n  - Title: 'Copy Questions to Global'
  - Selected questions count display with badge
  - List of selected questions (first 5 shown, expandable)
  - Confirmation message with clear text
  - Confirm button with green gradient and glow effect
  - Cancel button with outlined styling
  - Progress indicator during processing
  - Success message with checkmark icon
\n### 17.4 Overall Layout
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
  - Student Selection Mode radio buttons with clear labels
  - Conditional display of Section Selection or Select Students dropdown
- Table layouts:
  - Responsive tables with horizontal scroll
  - Alternating row colors for readability
  - Action buttons aligned to right
  - Additional columns for usage count and paper list in question selection table
  - **Source User column in Admin Global Question Bank**
  - **Global Status badge column in Admin Users Question Bank**
  - **NEW: Checkbox column as first column in Admin Users Question Bank**
  - **NEW: Copy to Global button placement:**
    - Located below filter dropdowns ('All Users', 'All Banks')
    - Located above table column headers ('Created By', 'Action')\n    - Horizontally centered or left-aligned with table
    - Clear visual separation from filters and table
- Modal dialogs:
  - Centered overlay with backdrop blur
  - Glassmorphism card styling
  - Clear action buttons\n- Exam interface:
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
  - Close button in top-right corner\n  - Optimized for print output
- Bulk Upload dialog layout:
  - Large modal dialog with clear sections
  - Template download section at top
  - File upload section in middle
  - Validation results section at bottom
  - Progress indicator during import
  - Import summary with statistics
- **Admin Question Bank Layout:**
  - Two-tab interface at top
  - **NEW: Create Question button above tabs**
  - Filter panel on left (collapsible)
  - Search bar at top
  - View switcher: Row View / Card View
  - **NEW: In Users Question Bank tab:**
    - Checkbox column as first column in table
    - Copy to Global button below filters, above table headers
    - Clear visual hierarchy: Filters → Copy to Global button → Table headers → Table rows
  - Question list/grid in main area
  - Pagination at bottom
  - Bulk action bar when questions selected
  - **NEW: Create Question Bank button in Users tab**
- **NEW: Create Question Form Layout:**
  - Large modal dialog with clear sections
  - School dropdown at top
  - Cascading dropdowns for Class, Subject, Lesson
  - Rich text editor for question text
  - Image upload field
  - Question type and difficulty dropdowns
  - Marks and minus mark inputs
  - Options fields (conditional)
  - Correct answer field
  - Add to Global checkbox at bottom
  - Save and Cancel buttons
- **NEW: Create Question Bank Dialog Layout:**
  - Large modal dialog with clear sections
  - Title and description at top
  - Filter and search panel on left
  - Question bank list table in main area
  - Checkbox selection for each bank
  - View Details button for each bank
  - Add to Global button at bottom
  - Close button in top-right corner\n\n### 17.5 Website (Desktop View) Specific Design
\n#### 17.5.1 Header
- Logo: 'A Cube' with modern icon
- Navigation menu:\n  - Home\n  - Exams
  - Question Bank
  - Analytics
  - Login
- Glassmorphism header with backdrop blur
- Sticky header on scroll
\n#### 17.5.2 Hero Section
- Large heading: 'A Cube – Online Exam System'
- Subheading: 'Smart • Secure • Scalable Online Exams'
- Description: 'Create, conduct & analyse exams – all in one place'
- Primary buttons:\n  - Create Exam (gradient button with glow)
  - View Results (outlined button)
- Background: Dark purple-blue gradient with subtle pattern

#### 17.5.3 Feature Cards Section
- Four glassmorphism cards:\n  - Create Exam (with calendar icon)
  - Question Bank (with question mark icon)
  - User Management (with users icon)
  - Reports & Analytics (with chart icon)
- Each card with:
  - Icon at top
  - Title
  - Brief description
  - Hover effect with enhanced glow
\n#### 17.5.4 Why Choose Us Section
- Four benefit cards:
  - Fast Evaluation
  - Secure Exams
  - Mobile Friendly
  - Time Saving
- Each card with icon and description
- Grid layout with consistent spacing

#### 17.5.5 Statistics Section
- Four stat cards with large numbers:\n  - 1200+ Students
  - 350+ Exams Conducted
  - 15,000+ Questions\n  - 25+ Schools
- Animated counters on scroll
- Icons for each statistic

#### 17.5.6 Website Login Page
- Centered login card with glassmorphism\n- Title: 'Welcome to A Cube'
- Subtitle: 'Login to Exam System'
- Form fields:
  - User ID / Email (text input)
  - Password (password input)
  - Keep me signed in (checkbox)
- Sign In button (gradient with glow)
- Forgot password link
- Background: Dark purple-blue gradient

### 17.6 Mobile App (Phone View) Specific Design

#### 17.6.1 Home Screen
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

#### 17.6.2 Mobile Login Screen
- Title: 'Welcome to A Cube'
- Subtitle: 'Login to Exam System'
- Form fields:
  - User ID / Email (text input)
  - Password (password input)
- Sign In button (full-width gradient button)
- Forgot password link\n- Background: Dark purple-blue gradient

### 17.7 Presentation Style
- Product showcase style:
  - Website displayed on laptop screen mockup
  - Mobile app displayed on smartphone screen mockups
  - Same theme and branding across all devices
- Ultra-high resolution:\n  - Sharp, crisp visuals
  - High-quality mockups
- Realistic lighting:\n  - Soft shadows\n  - Ambient lighting effects
  - Screen glow effects
- No watermark\n- No extra text\n- Clean, professional presentation

## 18. Reference Images

### 18.1 Question Edit Form Layout
The uploaded image (screenshot.png) shows the question edit form with the following layout issue:

Current Issue: In the Edit Question dialog, the 'Question Text' field, 'Image/Clip Art (Optional)' field, 'Question Type' dropdown, 'Difficulty' dropdown, 'Marks' input, and 'Negative Marks' input are positioned below the 'Match Pairs' section.\n
Required Fix: These fields should be moved above the 'Match Pairs' section to maintain the correct form field order as specified in Section 6.3.1.

Additional Requirement: Replace the 'Question Text' field with a rich text editor (Quill, Draft.js, or TinyMCE) to enable formatting (bold, underline, italic, etc.) directly while typing.

### 18.2 Design Reference
The uploaded image (image.png) shows the current dashboard design. The new design should follow the dark purple-blue gradient theme with glassmorphism cards as specified in Section 17.\n
### 18.3 Teacher Dashboard Students Card Reference
The uploaded image (screenshot.png) shows the Principal Dashboard with the Students card highlighted. This card's JSX structure and functionality should be copied to the Teacher Dashboard with appropriate role-based access control modifications.

### 18.4 Question Paper History Print Button Reference
The uploaded image (screenshot.png) shows the Question Paper History interface with a Print button highlighted. This button should trigger a preview dialog, and from the preview dialog, users can open the browser print dialog to print the question paper with all formatting preserved.

### 18.5 NEW: Admin Users Question Bank Checkbox and Copy to Global Button Reference
The uploaded image (screenshot.png) shows the Admin Users Question Bank interface with the following highlighted elements:
- **Checkbox column:** Added as the first column in the table for bulk selection of questions
- **Copy to Global button:** Placed below 'All Users' and 'All Banks' filter dropdowns, above 'Created By' and 'Action' column headers
- **Button placement:** Clearly visible between filters and table headers, providing easy access for bulk copying questions to Global Question Bank

## 19. Updated Requirement: Automatic Passing Marks Calculation

### 19.1 Passing Marks Calculation Logic
- Passing marks are automatically calculated as 35% of the total marks
- Formula: Passing Marks = Total Marks × 0.35
- Example: If total marks = 75, then passing marks = 26.25 marks
- Pass/Fail status determined by comparing obtained marks with passing marks

### 19.2 Implementation Changes
\n#### 19.2.1 Database Changes
- online_exams table: passing_marks field auto-calculated
- Data type: Decimal(10,2)\n- Database trigger ensures passing_marks = total_marks × 0.35\n
#### 19.2.2 Exam Creation Form Changes
- Remove manual passing marks input
- Add read-only passing marks display
- Update dynamically when questions selected

#### 19.2.3 Exam Display Changes
- All exam cards display passing marks (35% of total)
- Exam details page displays passing marks
- Student pre-exam screen displays passing marks

#### 19.2.4 Results Display Changes
- Student results page displays passing marks
- Pass/Fail status badge based on 35% threshold
- Analytics displays pass rate based on 35% threshold
\n#### 19.2.5 Grading and Pass/Fail Determination
- After grading: Calculate total marks obtained
- Compare with passing marks (35% of total)
- Determine Pass/Fail status
\n### 19.3 User Interface Updates
- Remove manual passing marks input
- Add read-only display with clear formatting
- Show calculation formula\n- Update dynamically\n
### 19.4 Validation and Error Handling
- Ensure correct calculation\n- Handle edge cases\n- Display errors if calculation fails
\n### 19.5 Migration Plan
- Recalculate passing marks for existing exams
- Update pass/fail status for all attempts
- Run migration script\n- Notify users\n
### 19.6 Documentation Updates
- Update user documentation
- Add help text\n- Update training materials
- Add FAQ section

### 19.7 Testing Requirements
- Test calculation for various values
- Test pass/fail determination
- Test real-time updates
- Test display in all interfaces
- Test migration\n- Test edge cases

## 20. Branding and Naming

### 20.1 Application Name
- Primary name: A Cube
- Full name: A Cube - Online Exam System\n- Tagline: Smart • Secure • Scalable Online Exams

### 20.2 Logo
- Logo text: 'A Cube'
- Modern, minimalist icon design
- Consistent with dark purple-blue gradient theme

### 20.3 Branding Consistency
- Use 'A Cube' consistently across all screens
- Maintain same theme and branding everywhere
- Professional EdTech look
- NEET and school-focused positioning

## 21. Technical Specifications

### 21.1 Frontend Technologies
- Modern JavaScript framework (React, Vue, or Angular)
- Responsive CSS framework\n- Glassmorphism CSS effects
- Smooth animations and transitions
- Rich text editor library (Quill, Draft.js, or TinyMCE)\n- Print CSS styles for optimized print output
- Excel/CSV parsing library for bulk upload (e.g., SheetJS, PapaParse)
- Excel library with data validation support (e.g., ExcelJS, SheetJS with custom validation)
- Multi-select dropdown component with search functionality
\n### 21.2 Backend Technologies
- RESTful API architecture
- Database with foreign key constraints
- Authentication and authorization\n- Role-based access control
- HTML sanitization library for rich text content
- File upload handling for bulk import
- Excel/CSV processing library (e.g., Apache POI, OpenCSV)
- Batch processing for large file imports
- Dynamic Excel template generation with data validation
- School-specific data population for dropdown lists
- Student assignment logic for both section-based and individual assignment
- Question usage tracking logic with junction table
- **Global question bank management logic**
- **Question visibility logic based on is_global flag**
- **NEW: Admin question creation logic with school selection**
- **NEW: Question bank addition logic for bulk adding to Global**
- **NEW: Bulk copy to Global logic with checkbox selection**
\n### 21.3 Security\n- Encrypted passwords\n- Secure exam environment
- Activity logging\n- Data isolation\n- XSS prevention for rich text content
- File upload validation and sanitization
- Secure file storage for uploaded templates
\n### 21.4 Performance
- Fast page load times
- Optimized database queries
- Efficient caching\n- Real-time updates
- Optimized rich text rendering
- Optimized print preview generation
- Asynchronous file processing for bulk uploads
- Progress tracking for long-running imports
- Efficient template generation with cached school data
- Optimized student list queries for large classes
- Efficient usage count queries with database indexing
- Caching of usage data for frequently accessed questions
- **Efficient global question queries with proper indexing**
- **Caching of global question list for faster access**
- **Optimized bulk copy operations with batch processing**

### 21.5 Scalability
- Support for multiple schools
- Handle large number of concurrent users
- Efficient data storage\n- Cloud-based infrastructure
- Scalable file storage for bulk uploads
- Queue-based processing for bulk imports
- Efficient handling of large student lists
- Scalable junction table for question usage tracking
- **Scalable global question bank accessible to all schools**
- **Efficient bulk copy operations for large question sets**

## 22. Deployment and Maintenance

### 22.1 Deployment\n- Cloud hosting (AWS, Azure, or Google Cloud)
- Continuous integration/deployment
- Automated testing\n- Staging and production environments
\n### 22.2 Maintenance
- Regular backups
- Security updates
- Performance monitoring
- Bug fixes and improvements
\n### 22.3 Support
- User documentation
- Training materials
- Help desk support
- FAQ section
\n## 23. Conclusion\n
A Cube - Online Exam System is a comprehensive platform designed for educational institutions to create, conduct, and analyze online exams efficiently. With its dark purple-blue gradient theme, glassmorphism design, and professional EdTech look, the system provides a modern and engaging user experience. The automatic passing marks calculation (35% of total marks), enhanced student exam interface with question palette and timer, rich text editor integration for question formatting, updated bulk upload functionality with three-sheet template structure (Option, Question, Reference) to separate dropdown values, data entry, and reference examples, preview and print functionality for question papers, real-time monitoring, comprehensive analytics, and robust security features make A Cube a smart, secure, and scalable solution for NEET preparation and school-level assessments. The addition of the Students card to the Teacher Dashboard with role-based access control, combined with the rich text editor functionality, improved bulk upload capability with cleaner data entry experience and better guidance through separate reference examples, and the new preview-print feature in Question Paper History, further enhances teacher productivity by allowing them to create well-formatted questions, import large question banks efficiently with reduced errors through dropdown selections and reference examples, manage students from their assigned sections effectively, and print question papers with all formatting preserved directly from the preview dialog. The updated side panel navigation for both Principal and Teacher roles now includes easy access to Question Paper History, streamlining the workflow and improving overall user experience. The newly added student-level exam assignment feature provides teachers and principals with the flexibility to assign exams to entire classes or specific individual students, enabling more targeted assessments and personalized learning experiences. The latest addition of question usage tracking during question paper preparation empowers teachers to make informed decisions about question reuse by displaying usage count and list of question papers where each question was used, thereby enhancing question paper quality, promoting variety, and supporting data-driven question selection for better assessment outcomes. The Admin Global Question Bank Management feature introduces a centralized repository of high-quality questions accessible to all schools, enabling administrators to curate and share questions across the platform. With two distinct sections—Global Question Bank and Users Question Bank—admins can efficiently manage question visibility, add user-created questions to the global pool, edit and delete global questions, and remove questions as needed. Teachers and principals benefit from access to both school-specific and global questions when creating question papers and exams, significantly expanding their question selection options and promoting standardized assessments across multiple schools. This feature enhances collaboration, improves question quality through centralized curation, and supports consistent educational standards across the entire platform. **The newest enhancements—Admin Create Question and Admin Create Question Bank functionalities—further empower administrators with direct question creation capabilities and streamlined bulk addition of user-created question banks to the Global Question Bank. Admins can now create questions for any school directly from the Admin Question Bank page, with the option to add them to Global immediately. Additionally, the Create Question Bank feature allows admins to view all user-created question banks not yet in Global, select multiple banks, preview their contents, and add them to Global in bulk. The latest addition—Admin Bulk Copy to Global feature—introduces checkbox-based bulk selection in the Users Question Bank tab, allowing admins to select multiple questions at once and copy them to Global Question Bank with a single click. The Copy to Global button is strategically placed below the filter dropdowns and above the table headers for easy access, and displays the selected count dynamically. This feature significantly improves efficiency by reducing the time and effort required to curate the Global Question Bank, enabling admins to quickly add multiple high-quality questions from various users and schools. These features collectively enhance admin control over question bank content, support centralized question creation and management, streamline the process of curating high-quality questions for the Global Question Bank, and ultimately improve question quality, promote standardized assessments, and support efficient management of large question repositories across the entire platform.**