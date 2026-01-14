# A Cube - Online Exam System Requirements Document (Updated)

## 1. Application Description

### 1.1 Application Name
A Cube - Online Exam System

### 1.2 Application Purpose
A comprehensive online exam management platform for educational institutions, focusing on NEET preparation and school-level assessments. The system enables schools to create, conduct, and analyze exams efficiently with features including school management, academic structure setup, teacher-subject-class-section mapping, question bank management with bulk upload capability, question paper preparation with question usage tracking, online exam creation with approval workflow, user management with school-based data isolation, student allocation tracking, detailed performance analytics, and real-time user login monitoring.

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
- Question Bank Management with Global, Users, and Pending to Add sections
- Create Question functionality - Admin can create questions directly\n- Create Question Bank functionality - Admin can view all user-created question banks not in Global and add them to Global
- Pending to Add section - Admin can view all user-created questions not yet in Global and add them to Global\n- **NEW: Login History Monitoring - Admin can view login history of all users across all schools**
- **NEW: Real-Time User Monitoring - Admin can monitor currently logged-in users in real-time with detailed information**

### 2.2 Principal
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
- **NEW: Login History Access - Principal can view login history of teachers and students in their assigned school**
- **NEW: Real-Time User Monitoring - Principal can monitor currently logged-in teachers and students from their school in real-time**
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
- Linked to specific school from school master list
- School-based isolation: Can only view and interact with students from their assigned sections
\n### 2.4 Student
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
- Role\n- School name (mandatory field, selected from dropdown list populated from School Master)\n- Contact number
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
- Mapping interface:
  - Student selection (dropdown or search from existing students in the school)
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
  - Phone Number\n  - Account Status (Active/Pending/Suspended)
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
  - Row View (table format)\n  - Card View (detailed card format)
- View all questions with lesson-level filtering
- Analytics dashboard for question bank performance
\n### 5.6 Question Paper History Card - Historical Paper Management
- Principal can access Question Paper History interface
- View all question papers created by teachers in their school
- Filter by teacher name, class, subject, date range, paper status
- Search by paper name or paper ID
- View detailed paper information\n- Actions available:
  - View paper details
  - Preview paper with print option
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
- Admin has access to Question Bank module with three main sections:
  - **Global Question Bank:** Contains questions available to all schools
  - **Users Question Bank:** Contains all questions created by users (teachers and principals) across all schools
  - **Pending to Add:** Contains all user-created questions not yet in Global Question Bank, ready to be added
- Admin can view, manage, and organize questions from all sections
- Admin can add questions from Users Question Bank to Global Question Bank
- Admin can add questions from Pending to Add section to Global Question Bank
- Admin can create questions directly\n- Admin can view all user-created question banks not in Global and add them to Global

#### 6.7.2 Admin Dashboard - Question Bank Card
- Add Question Bank card to Admin Dashboard
- Card displays:
  - Total Global Questions count
  - Total Users Questions count
  - Total Pending to Add Questions count
  - Quick action button to access Question Bank
\n#### 6.7.3 Admin Question Bank Interface
\n**Main Layout:**
- **Three-tab interface:**
  - Tab 1: Global Question Bank
  - Tab 2: Users Question Bank
  - Tab 3: Pending to Add
- Tab switcher at the top of the page
- Each tab has its own filter, search, and view options
- Create Question button prominently displayed at the top
- Create Question Bank button displayed in Users Question Bank tab

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
  - Actions (View, Edit, Delete, Remove from Global)
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
- Actions:
  - View: View full question details
  - Edit: Edit question details (updates global question)
  - Delete: Delete question from global bank (with confirmation)
  - Remove from Global: Remove question from global bank but keep in user's bank (sets is_global = false)
\n**Tab 2: Users Question Bank**
- Purpose: Display all questions created by users (teachers and principals) across all schools
- Display Columns (Row View):\n  - Checkbox (For bulk selection)
  - Question (truncated text with expand option)
  - Image Indicator
  - Class
  - Subject
  - Lesson
  - Question Type
  - Difficulty\n  - Marks
  - Minus Mark
  - Created By (user name)
  - School Name
  - Global Status (badge showing if question is already in global bank)
  - Actions (View, Add to Global)\n- Bulk Selection Functionality:
  - Checkbox column added as first column
  - Select All / Deselect All checkbox in header row
  - Individual checkboxes for each question row
  - Selected count display (e.g., '5 questions selected')
  - Copy to Global button appears when at least one question is selected
- Copy to Global Button Placement:
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
- Actions:\n  - View: View full question details (read-only)
  - Add to Global: Add single question to global bank (sets is_global = true, copies source_user_id)
  - Copy to Global (Bulk): Add multiple selected questions to global bank at once
- Create Question Bank button\n  - Opens Create Question Bank interface
  - Displays list of all user-created question banks not yet in Global Question Bank
  - Allows admin to select and add question banks to Global\n
**Tab 3: Pending to Add**
- Purpose: Display only questions created by all users that are not yet in Global Question Bank (is_global = false)
- Display Columns (Row View):\n  - Checkbox (For bulk selection)
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
  - Actions (View, Add to Global)
- Bulk Selection Functionality:
  - Checkbox column added as first column
  - Select All / Deselect All checkbox in header row
  - Individual checkboxes for each question row
  - Selected count display (e.g., '10 questions selected')
  - Add to Global button appears when at least one question is selected
- Add to Global Button Placement:
  - Button label: 'Add to Global'
  - Placement: Below filters, above table column headers
  - Button styling: Gradient button with green color (#10B981)
  - Button state: Disabled when no questions selected, enabled when at least one question selected\n  - Button behavior: Opens confirmation dialog showing selected questions count and list\n- Filter Options:
  - School filter (dropdown of all schools)\n  - Class filter
  - Subject filter
  - Lesson filter
  - Question Type filter
  - Difficulty filter
  - Created By filter (dropdown of all users)
- Search Functionality:
  - Text search by question text
  - Combined search and filter capability
- View Options:
  - Row View (table format)
  - Card View (detailed card format)
- Actions:
  - View: View full question details (read-only)\n  - Add to Global: Add single question to global bank (sets is_global = true, copies source_user_id)
  - Add to Global (Bulk): Add multiple selected questions to global bank at once\n- Key Difference from Users Question Bank Tab:
  - Pending to Add tab shows ONLY questions not in Global (is_global = false)
  - Users Question Bank tab shows ALL questions (both in Global and not in Global)
  - Pending to Add tab provides a focused view for admins to quickly identify and add pending questions

#### 6.7.4 Admin Create Question Functionality

**Create Question Button:**
- Location: Prominently displayed at the top of Admin Question Bank page (above tabs)
- Icon: Plus icon with text 'Create Question'\n- Styling: Primary button with gradient effect
- Tooltip: 'Create a new question'

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
- Question saved to question_bank table\n- If Add to Global is checked:\n  - is_global = true
  - source_user_id = Admin user ID
  - Question appears in Global Question Bank tab
- If Add to Global is unchecked:
  - is_global = false
  - Question appears in Users Question Bank tab and Pending to Add tab
- Success message displayed\n- Form cleared after successful save

**Access Control:**
- Only Admin role can access this functionality
- Admin can create questions for any school
- Backend validation ensures proper data isolation
\n#### 6.7.5 Admin Create Question Bank Functionality

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
- Display all user-created question banks that are not yet in Global Question Bank\n- Table/Grid Layout:
  - Columns:\n    - Question Bank Name (auto-generated bank_name)
    - Owner (User name who created the questions)
    - School Name
    - Total Questions (count of questions in this bank)
    - Created Date
    - Actions (Checkbox for selection, View Details button)
- Filter Options:
  - School filter (dropdown of all schools)
  - Owner filter (dropdown of all users)
  - Date range filter\n- Search Functionality:
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
\n**Add to Global Process:**
- On confirmation:
  - For each selected question bank:
    - Set is_global = true for all questions in the bank
    - Set source_user_id = created_by (to track original creator)
  - Show progress indicator during processing
  - Display success message with count: 'Successfully added X question banks (Y questions) to Global Question Bank!'
  - Update Global Status badges in Users Question Bank tab
  - Questions now appear in Global Question Bank tab
  - Questions removed from Pending to Add tab
- On cancel:
  - Close confirmation dialog
  - Return to question bank list

**Backend Logic:**
- Query to get user-created question banks not in Global:
  ```sql\n  SELECT DISTINCT bank_name, created_by, school_id, COUNT(*) as question_count, MIN(created_at) as created_date
  FROM question_bank\n  WHERE is_global = false
  GROUP BY bank_name, created_by, school_id
  ORDER BY created_date DESC
  ```
- Update query to add question bank to Global:
  ```sql\n  UPDATE question_bank
  SET is_global = true, source_user_id = created_by\n  WHERE bank_name = [selected_bank_name] AND created_by = [owner_user_id] AND school_id = [school_id]
  ```
\n**Access Control:**
- Only Admin role can access this functionality
- Admin can view and add question banks from all schools
- Backend validation ensures proper data isolation
- Audit log records all question bank additions to Global

**UI Components:**
- Modal Dialog:\n  - Large size with glassmorphism styling
  - Clear section separation
  - Responsive design
- Question Bank List Table:
  - Sortable columns\n  - Pagination for large lists
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
- Admin clicks 'Add to Global' button for a question in Users Question Bank or Pending to Add tab
- Confirmation dialog appears:\n  - Question preview\n  - Confirmation message: 'Add this question to Global Question Bank? It will be available to all schools.'
  - Confirm and Cancel buttons\n- On confirmation:
  - Set is_global = true for the question
  - Set source_user_id = created_by (to track original creator)
  - Show success message\n  - Update Global Status badge in Users Question Bank\n  - Question now appears in Global Question Bank tab\n  - Question removed from Pending to Add tab
\n**Bulk Add to Global (Enhanced):**
- Admin selects multiple questions using checkboxes in Users Question Bank or Pending to Add tab
- Copy to Global button (Users tab) or Add to Global button (Pending to Add tab) appears below filters, above column headers
- Button shows selected count (e.g., 'Copy to Global (5 selected)' or 'Add to Global (10 selected)')
- Clicking button opens confirmation dialog:\n  - List of selected questions with preview (first 5 shown, expandable to see all)
  - Confirmation message: 'Copy X selected questions to Global Question Bank? They will be available to all schools.' (Users tab) or 'Add X selected questions to Global Question Bank? They will be available to all schools.' (Pending to Add tab)
  - Confirm and Cancel buttons
- On confirmation:
  - Set is_global = true for all selected questions
  - Set source_user_id = created_by for each question
  - Show progress indicator during processing
  - Show success message with count: 'Successfully copied X questions to Global Question Bank!' (Users tab) or 'Successfully added X questions to Global Question Bank!' (Pending to Add tab)
  - Update Global Status badges\n  - Questions now appear in Global Question Bank tab
  - Questions removed from Pending to Add tab\n  - Clear checkbox selections
\n#### 6.7.7 Remove from Global Functionality

**Single Question Remove:**
- Admin clicks 'Remove from Global' button for a question in Global Question Bank\n- Confirmation dialog appears:
  - Question preview
  - Warning message: 'Remove this question from Global Question Bank? It will no longer be available to all schools, but will remain in the original user's question bank.'
  - Confirm and Cancel buttons
- On confirmation:
  - Set is_global = false for the question
  - Show success message
  - Question removed from Global Question Bank tab
  - Question remains in Users Question Bank with updated Global Status\n  - Question now appears in Pending to Add tab

#### 6.7.8 Global Question Bank Access for Schools

**Teacher and Principal Access:**
- When creating question papers or exams, teachers and principals can access:\n  - Their own school's question bank (school-specific questions)
  - Global Question Bank (questions marked as is_global = true)
- Question selection interface shows two sections:
  - Section 1: My School Questions\n  - Section 2: Global Questions
- Teachers and principals can select questions from both sections
- Global questions are read-only for teachers and principals (cannot edit or delete)
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
- Get Users Questions:
  ```sql
  SELECT * FROM question_bank WHERE created_by IS NOT NULL
  ```
- Get Pending to Add Questions:\n  ```sql
  SELECT * FROM question_bank WHERE is_global = false\n  ```
- Get Questions for Teacher/Principal (including global):
  ```sql
  SELECT * FROM question_bank \n  WHERE (school_id = [user_school_id] OR is_global = true)\n  ```

#### 6.7.10 Admin Question Bank UI Components

**Question Bank Card (Admin Dashboard):**
- Card title: 'Question Bank'
- Card content:
  - Global Questions count with icon
  - Users Questions count with icon
  - Pending to Add Questions count with icon
  - Quick action button: 'Manage Question Bank'
- Card styling: Glassmorphism with gradient effect
\n**Question Bank Page (Admin):**
- Page title: 'Question Bank Management'
- Create Question button at top (above tabs)
- Tab switcher: Global / Users / Pending to Add
- Filter panel on left (collapsible)
- Search bar at top
- View switcher: Row View / Card View
- Question list/grid in main area
- Pagination at bottom
- Create Question Bank button in Users tab
- Checkbox column in Users tab and Pending to Add tab for bulk selection
- Copy to Global button below filters in Users tab
- Add to Global button below filters in Pending to Add tab
\n**Global Question Bank Tab:**
- Table columns as specified above
- Action buttons: View, Edit, Delete, Remove from Global
- Bulk action: Select multiple and remove from global
- Export button: Export global questions as Excel/CSV
\n**Users Question Bank Tab:**\n- Checkbox column as first column
- Table columns as specified above
- Action buttons: View, Add to Global\n- Copy to Global button placement:\n  - Located below 'All Users' and 'All Banks' filter dropdowns
  - Located above 'Created By' and 'Action' column headers
  - Button label: 'Copy to Global'
  - Shows selected count when questions are selected
  - Disabled when no questions selected
  - Enabled and highlighted when at least one question selected
- Global Status badge: Green 'In Global' or Gray 'Not in Global'
- Export button: Export users questions as Excel/CSV
- Create Question Bank button\n\n**Pending to Add Tab:**
- Checkbox column as first column
- Table columns:\n  - Question (truncated text with expand option)
  - Image Indicator\n  - Class
  - Subject
  - Lesson
  - Question Type
  - Difficulty
  - Marks
  - Minus Mark
  - Created By (user name)
  - School Name
  - Actions (View, Add to Global)\n- Add to Global button placement:
  - Located below filter dropdowns
  - Located above table column headers
  - Button label: 'Add to Global'
  - Shows selected count when questions are selected (e.g., 'Add to Global (10 selected)')
  - Disabled when no questions selected
  - Enabled and highlighted when at least one question selected
- Filter Options:
  - School filter\n  - Class filter
  - Subject filter
  - Lesson filter
  - Question Type filter
  - Difficulty filter
  - Created By filter
- Search bar at top
- View switcher: Row View / Card View\n- Export button: Export pending questions as Excel/CSV
- Action buttons: View, Add to Global
- Bulk selection with checkboxes
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
- Location: Users Question Bank tab, next to filter panel
- Icon: Plus icon with text 'Create Question Bank'
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
- Modal dialog with glassmorphism styling\n- Question preview with formatted text
- Confirmation message\n- Confirm button (gradient, green)
- Cancel button (outlined)

**Copy to Global Confirmation Dialog:**
- Modal dialog with glassmorphism styling
- Title: 'Copy Questions to Global'
- Selected questions count display
- List of selected questions (first 5 shown, expandable)
- Confirmation message: 'Copy X selected questions to Global Question Bank? They will be available to all schools.'
- Confirm button (gradient, green) with text 'Copy to Global'
- Cancel button (outlined)\n- Progress indicator during processing

**Add to Global Confirmation Dialog (Pending to Add Tab):**
- Modal dialog with glassmorphism styling
- Title: 'Add Questions to Global'\n- Selected questions count display
- List of selected questions (first 5 shown, expandable)
- Confirmation message: 'Add X selected questions to Global Question Bank? They will be available to all schools.'
- Confirm button (gradient, green) with text 'Add to Global'
- Cancel button (outlined)\n- Progress indicator during processing

**Remove from Global Confirmation Dialog:**
- Modal dialog with glassmorphism styling
- Question preview with formatted text
- Warning message with icon
- Confirm button (gradient, red)
- Cancel button (outlined)\n
#### 6.7.11 Admin Question Bank Access Control

**Admin Permissions:**
- Full access to Global Question Bank:\n  - View all global questions
  - Edit global questions
  - Delete global questions\n  - Remove questions from global bank
- Full access to Users Question Bank:
  - View all questions created by users across all schools
  - Add questions to global bank (single or bulk)
  - Bulk copy multiple questions to global bank using checkboxes
  - Cannot edit or delete user questions (read-only)
- Full access to Pending to Add section:
  - View all user-created questions not yet in Global\n  - Add questions to global bank (single or bulk)
  - Bulk add multiple questions to global bank using checkboxes
  - Cannot edit or delete user questions (read-only)\n- Create questions directly\n  - Can create questions for any school
  - Can add created questions to Global immediately
- Create Question Bank functionality\n  - Can view all user-created question banks not in Global
  - Can add entire question banks to Global
- Cross-school visibility:\n  - Can view questions from all schools
  - Can filter by school
  - Can add questions from any school to global bank

**Teacher and Principal Permissions:**
- Can view and use global questions in question papers and exams
- Cannot edit or delete global questions
- Cannot add questions to global bank
- Can only edit and delete their own school-specific questions
\n**Data Isolation:**
- School-specific questions remain isolated to their school
- Global questions are accessible to all schools (read-only for teachers/principals)
- Admin has cross-school visibility for management purposes
- Backend validation ensures proper access control

#### 6.7.12 Admin Question Bank Notifications

**Admin Notifications:**
- Notification when question is added to global bank
- Notification when multiple questions are copied to global bank
- Notification when question is removed from global bank
- Notification when question bank is added to global bank
- Daily/weekly summary of global question bank activity
- Notification when questions are added from Pending to Add section

**Teacher/Principal Notifications:**
- Notification when new global questions are added (optional)
- Notification when their question is added to global bank (optional)
\n#### 6.7.13 Admin Question Bank Analytics

**Analytics Dashboard (Admin):**
- Overview Cards:
  - Total Global Questions
  - Total Users Questions
  - Total Pending to Add Questions
  - Questions Added to Global (this month)
  - Most Used Global Questions
- Charts:
  - Global questions by subject (pie chart)
  - Global questions by difficulty (bar chart)
  - Questions added to global over time (line chart)
  - Top contributors (users who created most global questions)
  - Pending to Add questions by school (bar chart)
- Detailed Statistics:
  - Global questions by class and subject (table)
  - Global questions by question type (table)
  - Usage statistics for global questions (table)
  - Pending to Add questions by school and subject (table)

#### 6.7.14 Admin Question Bank Help and Documentation

**Help Resources:**
- Help icon in Admin Question Bank page
- Opens help dialog with:\n  - Overview of Global, Users, and Pending to Add Question Banks
  - How to create questions as Admin
  - How to add questions to global bank
  - How to bulk copy questions to global bank using checkboxes
  - How to use Pending to Add section
  - How to bulk add questions from Pending to Add section
  - How to add question banks to global bank
  - How to remove questions from global bank
  - How teachers and principals can use global questions\n  - Best practices for managing global question bank
  - FAQ section

**FAQ Topics:**
- What is Global Question Bank?
- How to create questions as Admin?\n- How to add questions to Global Question Bank?
- How to bulk copy multiple questions to Global Question Bank?
- What is Pending to Add section?
- How to use Pending to Add section?
- How to bulk add questions from Pending to Add section?
- How to add question banks to Global Question Bank?
- Can I edit global questions?
- Can teachers edit global questions?
- How do teachers access global questions?
- Can I remove questions from global bank?
- What happens when I remove a question from global bank?
- Can I add questions from multiple schools to global bank?
\n**FAQ Answers:**
\nQ: What is Pending to Add section?
A: The Pending to Add section displays all questions created by users (teachers and principals) across all schools that are not yet in the Global Question Bank. This provides a focused view for admins to quickly identify and add high-quality questions to the Global Question Bank.

Q: How to use Pending to Add section?
A: Navigate to the Pending to Add tab in Admin Question Bank. You will see a list of all user-created questions not yet in Global. You can filter by school, class, subject, or other criteria. Select questions using checkboxes and click 'Add to Global' button to add them to Global Question Bank. You can also add individual questions by clicking 'Add to Global' action button for each question.

Q: How to bulk add questions from Pending to Add section?\nA: In the Pending to Add tab, use the checkboxes to select multiple questions. The 'Add to Global' button will appear below the filters. Click the button to open a confirmation dialog showing the selected questions count and list. Confirm to add all selected questions to Global Question Bank at once. This is much faster than adding questions one by one.

## 7. Question Paper Preparation Module

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
- Questions displayed from two sources:
  - My School Questions (school-specific questions)
  - Global Questions (questions from Global Question Bank)
- Enhanced Question Display with Usage Tracking\n  - Question list displayed in row format (with formatted text preview)
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
   - Link question_paper_id and question_id
2. If editing existing paper and questions are changed:
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
\n**Smart Recommendations:**
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

#### 8.2.3 Search Functionality\n- Text search bar
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
- Total Marks\n- Total Questions
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
  - Print functionality respects school-based data isolation\n  - Backend validation ensures proper access control

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
- Can create exams with entire class or specific student assignment
- Can select questions from school question bank and global question bank

#### 9.7.4 Admin Access Rules
- Has cross-school visibility\n- Can view all exams across all schools
- Can view student allocation list for any exam
- Can view individual student results for any exam
- Cannot create, edit, or delete exams
- Can force delete any exam with strict confirmation
\n#### 9.7.5 Data Isolation
- All exam data is school-scoped
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
- Question Bank Card
- User Management\n- School Management
- System Configuration
- **NEW: Login History Card**
- **NEW: Real-Time Users Card**
\n### 12.2 Admin Functions
- Create and manage schools
- User account management
- Force delete exams with student attempts
- Question Bank Management with Global, Users, and Pending to Add sections
- Create questions directly\n- Create Question Bank functionality - View and add user-created question banks to Global\n- Bulk copy multiple questions to Global using checkboxes
- Pending to Add section - View and add user-created questions not yet in Global
- **NEW: View login history of all users across all schools**
- **NEW: Monitor currently logged-in users in real-time with detailed information**
\n### 12.3 Admin Question Bank Card
- Card title: 'Question Bank'
- Card displays:
  - Total Global Questions count
  - Total Users Questions count
  - Total Pending to Add Questions count
  - Quick action button: 'Manage Question Bank'
- Clicking card navigates to Admin Question Bank page
\n### 12.4 NEW: Admin Login History Card
- Card title: 'Login History'
- Card displays:\n  - Total logins today count
  - Total unique users logged in today count
  - Quick action button: 'View Login History'
- Clicking card navigates to Login History page

### 12.5 NEW: Admin Real-Time Users Card
- Card title: 'Real-Time Users'
- Card displays:
  - Currently logged-in users count
  - Active sessions count
  - Quick action button: 'Monitor Users'
- Clicking card navigates to Real-Time User Monitoring page

## 13. Navigation and Side Panel Configuration

### 13.1 Admin Side Panel Menu
The side panel navigation for Admin role includes the following menu items (in order):
1. Dashboard (Home icon)
2. Schools (Building icon)
3. Users (Users icon)
4. Question Bank (Question mark icon)
5. **NEW: Login History (Clock icon)**
6. **NEW: Real-Time Users (Activity icon)**
7. System Settings (Settings icon)
8. Profile (User circle icon)
9. Logout (Sign out icon)

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
9. **NEW: Login History (Clock icon)**
10. **NEW: Real-Time Users (Activity icon)**\n11. Profile (User circle icon)
12. Logout (Sign out icon)

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
- Clicking 'Question Bank' menu item navigates to Question Bank page\n- For Admin: Opens Admin Question Bank page with Global, Users, and Pending to Add tabs
- For Principal/Teacher: Opens standard Question Bank page\n- **NEW: Clicking 'Login History' menu item navigates to Login History page**\n- **NEW: Clicking 'Real-Time Users' menu item navigates to Real-Time User Monitoring page**
- Active menu item remains highlighted
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
- Question Bank Management with Global, Users, and Pending to Add sections
- Add questions from Users Question Bank to Global Question Bank
- Add questions from Pending to Add section to Global Question Bank
- Remove questions from Global Question Bank
- Edit and delete questions in Global Question Bank
- Create questions directly\n- Create Question Bank functionality - View and add user-created question banks to Global
- Bulk copy multiple questions to Global using checkboxes
- Bulk add multiple questions from Pending to Add section to Global using checkboxes
- **NEW: View login history of all users across all schools**
- **NEW: Monitor currently logged-in users in real-time with detailed information**

### 14.4 Principal Functions
- Academic Management\n- Teacher Management
- Student Management
- Question Bank Management (with rich text editor, bulk upload, and access to global questions)
- Question Paper History Management (with preview and print functionality)\n- Online Exam Monitoring\n- **NEW: View login history of teachers and students in their assigned school**
- **NEW: Monitor currently logged-in teachers and students from their school in real-time**

### 14.5 Teacher Functions
- View assigned classes, sections, subjects
- View and manage students from assigned sections
- Question Bank Access (with rich text editor, bulk upload, and access to global questions)
- Question Paper Preparation (with question usage tracking and access to global questions)
- Question Paper History Management (with preview and print functionality)
- Online Exam Management (with student-level assignment option and access to global questions)
\n### 14.6 Student Functions
- View personal information\n- Profile editing
- Online Exam Functions (with formatted question text display)
\n### 14.7 User Profile Management
- Edit, Save, Approve, Suspend buttons
- Status-based navigation\n\n### 14.8 Principal Dashboard Features
- Total Teachers Card
- Total Students Card\n\n### 14.9 Admin Dashboard Features
- Total Users Card
- Total Schools Card
- Question Bank Card
- **NEW: Login History Card**
- **NEW: Real-Time Users Card**

### 14.10 Landing Page Features
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
- Data isolation based on teacher-section mapping
\n### 14.14 Rich Text Editor Integration Feature
- Integrated rich text editor (Quill, Draft.js, or TinyMCE) in question creation form
- Teachers and Principals can apply bold, underline, italic, and other formatting directly while typing questions
- Formatted text preserved and displayed correctly in all interfaces (exam, reports, exports)
- HTML sanitization to prevent XSS attacks
- Responsive design for mobile and desktop
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
- Question Paper History menu item added to Teacher side panel
- Question Bank menu item added to Admin side panel\n- **NEW: Login History menu item added to Admin and Principal side panels**
- **NEW: Real-Time Users menu item added to Admin and Principal side panels**
- Consistent navigation experience across roles
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
\n### 14.19 Question Usage Tracking Feature
- Display question usage count during question paper preparation
- Show list of question papers where each question was used
- Helps teachers make informed decisions about question reuse
- Enhances question paper quality and variety
- Improves question bank management
- Supports data-driven question selection

### 14.20 Admin Global Question Bank Feature
- Admin can manage Global Question Bank accessible to all schools
- Three-tab interface: Global Question Bank, Users Question Bank, and Pending to Add\n- Admin can add questions from Users Question Bank to Global Question Bank
- Admin can add questions from Pending to Add section to Global Question Bank
- Admin can edit and delete questions in Global Question Bank\n- Admin can remove questions from Global Question Bank
- Teachers and Principals can access global questions for question papers and exams
- Global questions are read-only for teachers and principals
- Enhances question sharing across schools
- Improves question quality through centralized management
- Supports standardized assessments across multiple schools

### 14.21 Admin Create Question Feature
- Admin can create questions directly from Admin Question Bank page
- Same question creation form as Teacher/Principal with additional School dropdown
- Admin can create questions for any school\n- Option to add created questions to Global Question Bank immediately
- Enhances admin control over question bank content
- Supports centralized question creation and management
\n### 14.22 Admin Create Question Bank Feature
- Admin can view all user-created question banks not yet in Global Question Bank
- List interface with filters and search functionality
- Admin can select and add entire question banks to Global Question Bank
- Bulk addition of questions from multiple question banks
- Preview functionality to review questions before adding to Global
- Streamlines process of curating high-quality questions for Global Question Bank
- Supports efficient management of large question repositories

### 14.23 Admin Bulk Copy to Global Feature
- Checkbox column added to Users Question Bank tab for bulk selection
- Copy to Global button placed below 'All Users' and 'All Banks' filters, above 'Created By' and 'Action' columns
- Admin can select multiple questions using checkboxes and copy them to Global in one action
- Button shows selected count and is enabled only when at least one question is selected
- Confirmation dialog displays selected questions count and list before copying
- Progress indicator during bulk copy process
- Success message with count after successful copy
- Significantly improves efficiency of adding multiple questions to Global Question Bank
- Reduces time and effort required for curating Global Question Bank

### 14.24 Admin Pending to Add Feature
- Pending to Add tab added to Admin Question Bank interface
- Displays only user-created questions not yet in Global Question Bank (is_global = false)
- Provides focused view for admins to quickly identify and add pending questions
- Checkbox column for bulk selection of questions
- Add to Global button for bulk adding multiple questions at once
- Filter and search functionality to find specific questions
- View and Add to Global actions for individual questions
- Streamlines workflow for curating Global Question Bank
- Reduces time spent searching through all user questions
- Improves efficiency of question bank management
- Supports data-driven decision making for question selection

### 14.25 NEW: Login History Monitoring Feature
- **Admin can view login history of all users across all schools**
- **Principal can view login history of teachers and students in their assigned school**
- **Comprehensive login tracking with detailed information**
- **Advanced filtering and search capabilities**
- **Export login history reports**
- **Analytics dashboard for login patterns**
- **Role-based access control for login history data**
- **School-based data isolation for Principal access**
\n### 14.26 NEW: Real-Time User Monitoring Feature
- **Admin can monitor currently logged-in users in real-time across all schools**
- **Principal can monitor currently logged-in teachers and students from their school in real-time**
- **Live user status display with auto-refresh**
- **Detailed user session information**
- **Filter and search active users**
- **Export active user reports**
- **Role-based access control for real-time monitoring**
- **School-based data isolation for Principal access**

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
  - Absent: Red (#EF4444)
  - In Progress: Orange (#F59E0B)
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
- Global Question Badge:
  - Global: Blue (#3B82F6)
  - My School: Purple (#8B5CF6)
- Global Status Badge (Admin):
  - In Global: Green (#10B981)\n  - Not in Global: Gray (#6B7280)
- Copy to Global Button:
  - Button color: Green (#10B981) with gradient effect
  - Disabled state: Gray (#6B7280)\n  - Hover state: Enhanced green glow
- Add to Global Button (Pending to Add Tab):
  - Button color: Green (#10B981) with gradient effect
  - Disabled state: Gray (#6B7280)\n  - Hover state: Enhanced green glow
- **NEW: Login Status Indicator:**
  - Online: Green (#10B981)
  - Offline: Gray (#6B7280)
  - Away: Orange (#F59E0B)
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
- Admin Question Bank Styling:
  - Three-tab interface with clear tab switcher
  - Global tab with blue accent
  - Users tab with purple accent
  - Pending to Add tab with teal accent
  - Global Status badge with color coding
  - Add to Global button with green gradient
  - Remove from Global button with red gradient
  - Edit button with blue gradient
  - Delete button with red gradient
  - Bulk action buttons with appropriate styling
  - Confirmation dialogs with glassmorphism effect
  - Source User column with user icon
  - Filter panel with collapsible sections
  - Checkbox column styling:\n    - Checkboxes aligned to left
    - Clear visual feedback for selected state
    - Select All checkbox in header row
    - Selected count badge displayed prominently
  - Copy to Global button styling (Users tab):
    - Gradient button with green color (#10B981)
    - Placement below 'All Users' and 'All Banks' filters
    - Placement above 'Created By' and 'Action' column headers
    - Button label: 'Copy to Global'
    - Shows selected count when questions are selected (e.g., 'Copy to Global (5)')
    - Disabled state: Gray color, no hover effect
    - Enabled state: Green gradient with glow effect
    - Hover state: Enhanced green glow
    - Loading state: Spinner icon during processing
  - Add to Global button styling (Pending to Add tab):
    - Gradient button with green color (#10B981)\n    - Placement below filter dropdowns
    - Placement above table column headers
    - Button label: 'Add to Global'
    - Shows selected count when questions are selected (e.g., 'Add to Global (10)')
    - Disabled state: Gray color, no hover effect\n    - Enabled state: Green gradient with glow effect
    - Hover state: Enhanced green glow
    - Loading state: Spinner icon during processing
- Create Question Button Styling:
  - Primary button with gradient effect (purple to blue)
  - Plus icon with text 'Create Question'
  - Prominent placement at top of page
  - Hover effect with enhanced glow
  - Tooltip on hover\n- Create Question Form Dialog Styling:
  - Large modal dialog with glassmorphism effect
  - School dropdown at top with clear label
  - Cascading dropdowns with smooth transitions
  - Rich text editor with consistent styling
  - Add to Global checkbox with clear label
  - Save button with gradient effect (green)\n  - Cancel button with outlined styling
- Create Question Bank Button Styling:
  - Secondary button with gradient effect (teal to indigo)
  - Plus icon with text 'Create Question Bank'
  - Placement in Users tab next to filter panel
  - Hover effect with subtle glow
  - Tooltip on hover
- Create Question Bank Dialog Styling:
  - Large modal dialog with glassmorphism effect\n  - Title with clear heading
  - Question bank list table with sortable columns
  - Checkbox selection with visual feedback
  - View Details button with icon
  - Add to Global button at bottom with gradient effect (green)
  - Close button in top-right corner
  - Filter and search panel with collapsible sections\n- Copy to Global Confirmation Dialog Styling:
  - Modal dialog with glassmorphism effect\n  - Title: 'Copy Questions to Global'
  - Selected questions count display with badge
  - List of selected questions (first 5 shown, expandable)
  - Confirmation message with clear text
  - Confirm button with green gradient and glow effect
  - Cancel button with outlined styling
  - Progress indicator during processing
  - Success message with checkmark icon
- Add to Global Confirmation Dialog Styling (Pending to Add Tab):
  - Modal dialog with glassmorphism effect
  - Title: 'Add Questions to Global'
  - Selected questions count display with badge
  - List of selected questions (first 5 shown, expandable)
  - Confirmation message with clear text
  - Confirm button with green gradient and glow effect
  - Cancel button with outlined styling
  - Progress indicator during processing
  - Success message with checkmark icon\n- **NEW: Login History Page Styling:**
  - Large table with glassmorphism effect
  - Sortable columns with clear headers
  - Filter panel on left (collapsible)
  - Search bar at top
  - Date range picker with calendar icon
  - Export button with download icon
  - Pagination at bottom
  - Login status badges with color coding
  - Device info icons (desktop, mobile, tablet)
  - IP address display with copy button
  - Timestamp display with relative time (e.g., '2 hours ago')
- **NEW: Real-Time User Monitoring Page Styling:**
  - Live user status cards with glassmorphism effect
  - Auto-refresh indicator with animated icon
  - Filter panel on left (collapsible)\n  - Search bar at top\n  - User status badges with color coding (Online, Offline, Away)
  - Session duration display with timer icon
  - Last activity timestamp with relative time
  - Device info icons (desktop, mobile, tablet)
  - IP address display with copy button
  - Export button with download icon
  - Refresh button with manual refresh option
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
  - Source User column in Admin Global Question Bank
  - Global Status badge column in Admin Users Question Bank
  - Checkbox column as first column in Admin Users Question Bank and Pending to Add tab
  - Copy to Global button placement (Users tab):
    - Located below filter dropdowns ('All Users', 'All Banks')
    - Located above table column headers ('Created By', 'Action')\n    - Horizontally centered or left-aligned with table
    - Clear visual separation from filters and table
  - Add to Global button placement (Pending to Add tab):
    - Located below filter dropdowns\n    - Located above table column headers
    - Horizontally centered or left-aligned with table
    - Clear visual separation from filters and table
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
  - Close button in top-right corner\n  - Optimized for print output
- Bulk Upload dialog layout:
  - Large modal dialog with clear sections
  - Template download section at top
  - File upload section in middle
  - Validation results section at bottom
  - Progress indicator during import
  - Import summary with statistics
- Admin Question Bank Layout:
  - Three-tab interface at top (Global / Users / Pending to Add)
  - Create Question button above tabs
  - Filter panel on left (collapsible)\n  - Search bar at top
  - View switcher: Row View / Card View
  - In Users Question Bank tab:
    - Checkbox column as first column in table
    - Copy to Global button below filters, above table headers
    - Clear visual hierarchy: Filters → Copy to Global button → Table headers → Table rows
  - In Pending to Add tab:\n    - Checkbox column as first column in table
    - Add to Global button below filters, above table headers
    - Clear visual hierarchy: Filters → Add to Global button → Table headers → Table rows
  - Question list/grid in main area
  - Pagination at bottom
  - Bulk action bar when questions selected
  - Create Question Bank button in Users tab
- Create Question Form Layout:
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
- Create Question Bank Dialog Layout:
  - Large modal dialog with clear sections
  - Title and description at top
  - Filter and search panel on left
  - Question bank list table in main area
  - Checkbox selection for each bank
  - View Details button for each bank
  - Add to Global button at bottom
  - Close button in top-right corner\n- **NEW: Login History Page Layout:**\n  - Page title: 'Login History'
  - Filter panel on left (collapsible):
    - Role filter (Admin only)
    - School filter (Admin only)
    - Date range filter\n    - Login status filter
    - Device type filter
  - Search bar at top
  - Export button at top-right
  - Main table area:\n    - Columns: User Name, Role, School, Login Time, Logout Time, Duration, Device, IP Address, Status
    - Sortable columns
    - Pagination at bottom
  - Analytics section (optional):
    - Login trends chart
    - Peak login times chart
    - Device distribution chart
- **NEW: Real-Time User Monitoring Page Layout:**
  - Page title: 'Real-Time Users'
  - Auto-refresh indicator at top-right (e.g., 'Auto-refresh: ON | Last updated: 2 seconds ago')
  - Manual refresh button at top-right
  - Filter panel on left (collapsible):
    - Role filter (Admin only)
    - School filter (Admin only)\n    - Status filter (Online, Offline, Away)
    - Device type filter
  - Search bar at top
  - Export button at top-right
  - Main content area:
    - User status cards in grid layout (desktop)
    - User status list (mobile)
    - Each card/row displays:\n      - User name and profile picture
      - Role badge
      - School name (if applicable)
      - Online status indicator
      - Session duration
      - Last activity timestamp
      - Device info\n      - IP address
  - Summary statistics at top:\n    - Total online users
    - Total active sessions
    - Peak concurrent users today
\n### 17.5 Website (Desktop View) Specific Design
\n#### 17.5.1 Header
- Logo: 'A Cube' with modern icon
- Navigation menu:\n  - Home
  - Exams
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

### 18.5 Admin Users Question Bank Checkbox and Copy to Global Button Reference
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

### 21.2 Backend Technologies
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
- Global question bank management logic
- Question visibility logic based on is_global flag
- Admin question creation logic with school selection
- Question bank addition logic for bulk adding to Global\n- Bulk copy to Global logic with checkbox selection
- Pending to Add section logic to filter questions with is_global = false
- Bulk add to Global logic from Pending to Add section
- **NEW: User session management and tracking**
- **NEW: Login history logging and storage**
- **NEW: Real-time user status monitoring**
- **NEW: WebSocket or Server-Sent Events for real-time updates**
\n### 21.3 Security\n- Encrypted passwords\n- Secure exam environment
- Activity logging\n- Data isolation\n- XSS prevention for rich text content
- File upload validation and sanitization
- Secure file storage for uploaded templates
- **NEW: Secure session management with token-based authentication**
- **NEW: IP address logging and validation**
- **NEW: Device fingerprinting for security**
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
- Efficient global question queries with proper indexing
- Caching of global question list for faster access
- Optimized bulk copy operations with batch processing
- Efficient Pending to Add queries with is_global = false filter
- Optimized bulk add operations from Pending to Add section
- **NEW: Efficient login history queries with pagination**
- **NEW: Real-time user status updates with minimal latency**
- **NEW: Optimized session tracking with minimal overhead**

### 21.5 Scalability
- Support for multiple schools
- Handle large number of concurrent users
- Efficient data storage\n- Cloud-based infrastructure
- Scalable file storage for bulk uploads
- Queue-based processing for bulk imports
- Efficient handling of large student lists
- Scalable junction table for question usage tracking
- Scalable global question bank accessible to all schools
- Efficient bulk copy operations for large question sets
- Scalable Pending to Add section for large question repositories
- **NEW: Scalable session management for thousands of concurrent users**
- **NEW: Efficient login history storage with archiving strategy**
- **NEW: Real-time monitoring scalable to large user bases**

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
\n## 23. NEW: Login History Module

### 23.1 Login History Overview
- Purpose: Track and monitor user login activity across the platform
- Access:\n  - Admin can view login history of all users across all schools
  - Principal can view login history of teachers and students in their assigned school
- Key Features:
  - Comprehensive login tracking with detailed information
  - Advanced filtering and search capabilities
  - Export login history reports
  - Analytics dashboard for login patterns
  - Role-based access control for login history data
  - School-based data isolation for Principal access

### 23.2 Login History Database Structure
\n#### 23.2.1 User Login History Table
Table name: user_login_history

Columns:
- id (UUID, Primary Key)
- user_id (Foreign Key → users.id, required)
- school_id (Foreign Key → schools.id, nullable)
- login_time (Timestamp with timezone, required)
- logout_time (Timestamp with timezone, nullable)
- session_duration (Integer, minutes, calculated)
- ip_address (Varchar(45), required)
- device_type (Enum: Desktop, Mobile, Tablet, required)
- device_info (JSON, optional)
  - Browser name and version
  - Operating system\n  - Device model (for mobile)
- login_status (Enum: Success, Failed, required)
- failure_reason (Text, nullable)
- location (Varchar(255), optional)
  - City, State, Country (derived from IP address)
- created_at (Timestamp)\n\n### 23.3 Login History Interface
\n#### 23.3.1 Login History Page Layout
- Page title: 'Login History'
- Filter panel on left (collapsible):
  - Role filter (Admin only)
  - School filter (Admin only)
  - Date range filter\n  - Login status filter (Success, Failed)
  - Device type filter (Desktop, Mobile, Tablet)
- Search bar at top
  - Search by user name, email, or IP address
- Export button at top-right
  - Export as Excel/CSV
- Main table area:\n  - Columns:\n    - User Name
    - Role
    - School (Admin only)
    - Login Time\n    - Logout Time
    - Duration
    - Device\n    - IP Address
    - Status
  - Sortable columns
  - Pagination at bottom
- Analytics section (optional):
  - Login trends chart (line chart showing logins over time)
  - Peak login times chart (bar chart showing hourly distribution)
  - Device distribution chart (pie chart showing device types)
\n#### 23.3.2 Login History Display Columns
- User Name: Display user's full name with profile picture (optional)
- Role: Display role badge (Admin, Principal, Teacher, Student)
- School: Display school name (Admin view only)
- Login Time: Display timestamp with relative time (e.g., '2 hours ago')
- Logout Time: Display timestamp or 'Still logged in' if session is active
- Duration: Display session duration in hours and minutes (e.g., '2h 30m')
- Device: Display device type icon (desktop, mobile, tablet) with device info tooltip
- IP Address: Display IP address with copy button\n- Status: Display status badge (Success: green, Failed: red)\n\n#### 23.3.3 Filter Options
- Role Filter (Admin only):
  - Dropdown with options: All, Admin, Principal, Teacher, Student
- School Filter (Admin only):
  - Dropdown populated with all schools
  - Multi-select capability
- Date Range Filter:
  - Date range picker with presets (Today, Yesterday, Last 7 days, Last 30 days, Custom)
- Login Status Filter:\n  - Dropdown with options: All, Success, Failed
- Device Type Filter:
  - Dropdown with options: All, Desktop, Mobile, Tablet

#### 23.3.4 Search Functionality
- Text search bar at top
- Search by:\n  - User name
  - Email address
  - IP address
- Real-time search with auto-suggestions
- Combined search and filter capability

#### 23.3.5 Export Functionality
- Export button at top-right
- Export formats: Excel (.xlsx), CSV (.csv)\n- Export options:
  - Export current page
  - Export all filtered results
  - Export all data (Admin only)
- Exported file includes all columns with proper formatting
- File name format: LoginHistory_[Date]_[Time].xlsx

#### 23.3.6 Analytics Dashboard (Optional)
- Login Trends Chart:
  - Line chart showing number of logins over time
  - X-axis: Date/Time
  - Y-axis: Number of logins
  - Filter by date range
- Peak Login Times Chart:
  - Bar chart showing hourly distribution of logins
  - X-axis: Hour of day (0-23)
  - Y-axis: Number of logins\n  - Helps identify peak usage times
- Device Distribution Chart:
  - Pie chart showing percentage of logins by device type
  - Segments: Desktop, Mobile, Tablet\n  - Helps understand user device preferences

### 23.4 Login History Access Control

#### 23.4.1 Admin Access Rules
- Can view login history of all users across all schools\n- Can filter by role and school
- Can export all login history data
- Can view analytics for all users
- Cross-school visibility

#### 23.4.2 Principal Access Rules\n- Can view login history of teachers and students in their assigned school only
- Cannot view login history of other principals or admins
- Can filter by role (Teacher, Student only)
- Cannot filter by school (automatically filtered to their school)
- Can export login history data for their school only
- Can view analytics for their school only
- School-based data isolation

#### 23.4.3 Teacher and Student Access Rules
- Cannot access Login History module
- No visibility into other users' login activity
\n#### 23.4.4 Data Isolation
- All login history data is school-scoped for Principal access
- Backend validation ensures Principal can only access data from their assigned school
- Admin has cross-school visibility
- Cross-school data access is prevented at database level for Principal

### 23.5 Login History Backend Logic

#### 23.5.1 Login Event Logging
- On successful login:
  - Create new record in user_login_history table\n  - Capture user_id, school_id, login_time, ip_address, device_type, device_info
  - Set login_status = 'Success'
- On failed login:
  - Create new record in user_login_history table
  - Capture attempted user_id (if available), ip_address, device_type, device_info
  - Set login_status = 'Failed'
  - Capture failure_reason (e.g., 'Invalid password', 'Account suspended')

#### 23.5.2 Logout Event Logging
- On user logout:
  - Update logout_time in user_login_history table
  - Calculate session_duration (logout_time - login_time)
- On session timeout:
  - Update logout_time with timeout timestamp
  - Calculate session_duration\n\n#### 23.5.3 Device and Location Detection
- Device Type Detection:
  - Parse User-Agent header to determine device type (Desktop, Mobile, Tablet)
  - Extract browser name and version
  - Extract operating system
- Location Detection (Optional):
  - Use IP geolocation service to determine city, state, country
  - Store location information in location field

#### 23.5.4 Query Logic
- Get login history for Admin:
  ```sql
  SELECT * FROM user_login_history
  WHERE [filters applied]
  ORDER BY login_time DESC
  ```
- Get login history for Principal:
  ```sql
  SELECT ulh.* FROM user_login_history ulh
  JOIN users u ON ulh.user_id = u.id
  WHERE u.school_id = [principal_school_id]
  AND u.role IN ('Teacher', 'Student')
  AND [filters applied]
  ORDER BY ulh.login_time DESC
  ```
\n### 23.6 Login History UI Components

#### 23.6.1 Login History Card (Admin Dashboard)
- Card title: 'Login History'
- Card content:
  - Total logins today count with icon
  - Total unique users logged in today count with icon
  - Quick action button: 'View Login History'
- Card styling: Glassmorphism with gradient effect
\n#### 23.6.2 Login History Card (Principal Dashboard)
- Card title: 'Login History'
- Card content:
  - Total logins today (school-specific) count with icon
  - Total unique users logged in today (school-specific) count with icon
  - Quick action button: 'View Login History'
- Card styling: Glassmorphism with gradient effect

#### 23.6.3 Login History Page\n- Page title: 'Login History'
- Filter panel on left (collapsible)\n- Search bar at top
- Export button at top-right
- Main table area with columns as specified\n- Pagination at bottom
- Analytics section (optional)
\n#### 23.6.4 Login History Table
- Responsive table with horizontal scroll
- Alternating row colors for readability
- Sortable columns with sort indicators
- Hover effects on rows
- Status badges with color coding
- Device info icons with tooltips
- IP address with copy button
- Timestamp with relative time display

#### 23.6.5 Filter Panel
- Collapsible panel on left
- Clear section separation
- Dropdown filters with multi-select capability
- Date range picker with calendar icon
- Apply Filters button
- Clear Filters button
\n#### 23.6.6 Export Dialog
- Modal dialog with glassmorphism styling
- Export format selection (Excel, CSV)
- Export scope selection (Current page, All filtered results, All data)
- Export button with download icon
- Cancel button

### 23.7 Login History Notifications

#### 23.7.1 Admin Notifications
- Daily summary of login activity (optional)
- Alert on suspicious login activity (e.g., multiple failed login attempts)
- Alert on login from unusual location or device
\n#### 23.7.2 Principal Notifications
- Daily summary of login activity for their school (optional)
- Alert on suspicious login activity for their school users

### 23.8 Login History Analytics

#### 23.8.1 Analytics Dashboard (Admin)
- Overview Cards:
  - Total logins today
  - Total unique users today
  - Average session duration
  - Failed login attempts today
- Charts:
  - Login trends over time (line chart)
  - Peak login times (bar chart)
  - Device distribution (pie chart)
  - Login success rate (gauge chart)
- Detailed Statistics:
  - Logins by role (table)
  - Logins by school (table)
  - Top active users (table)
\n#### 23.8.2 Analytics Dashboard (Principal)
- Overview Cards:
  - Total logins today (school-specific)
  - Total unique users today (school-specific)\n  - Average session duration (school-specific)
  - Failed login attempts today (school-specific)
- Charts:
  - Login trends over time (line chart, school-specific)
  - Peak login times (bar chart, school-specific)
  - Device distribution (pie chart, school-specific)
  - Login success rate (gauge chart, school-specific)
- Detailed Statistics:
  - Logins by role (table, school-specific)
  - Top active users (table, school-specific)

### 23.9 Login History Help and Documentation

#### 23.9.1 Help Resources
- Help icon in Login History page
- Opens help dialog with:
  - Overview of Login History module
  - How to filter login history
  - How to search login history
  - How to export login history
  - How to interpret analytics
  - FAQ section

#### 23.9.2 FAQ Topics
- What is Login History?
- How to view login history?
- How to filter login history by date range?
- How to search for specific user's login history?
- How to export login history?
- What does 'Still logged in' mean?
- How is session duration calculated?
- What is device type detection?
- How to identify suspicious login activity?
\n## 24. NEW: Real-Time User Monitoring Module

### 24.1 Real-Time User Monitoring Overview
- Purpose: Monitor currently logged-in users in real-time across the platform
- Access:
  - Admin can monitor all logged-in users across all schools
  - Principal can monitor logged-in teachers and students from their school
- Key Features:
  - Live user status display with auto-refresh
  - Detailed user session information
  - Filter and search active users
  - Export active user reports
  - Role-based access control for real-time monitoring
  - School-based data isolation for Principal access\n
### 24.2 Real-Time User Monitoring Database Structure

#### 24.2.1 Active User Sessions Table
Table name: active_user_sessions

Columns:
- id (UUID, Primary Key)
- user_id (Foreign Key → users.id, required)
- school_id (Foreign Key → schools.id, nullable)\n- session_token (Varchar(255), required, unique)
- login_time (Timestamp with timezone, required)
- last_activity_time (Timestamp with timezone, required)
- ip_address (Varchar(45), required)
- device_type (Enum: Desktop, Mobile, Tablet, required)\n- device_info (JSON, optional)
- status (Enum: Online, Away, required)
  - Online: User is actively using the system (last activity within 5 minutes)
  - Away: User is idle (last activity between 5-30 minutes)
- created_at (Timestamp)
- updated_at (Timestamp)

**Note:** This table stores only active sessions. When a user logs out or session expires, the record is deleted from this table and moved to user_login_history table.
\n### 24.3 Real-Time User Monitoring Interface

#### 24.3.1 Real-Time User Monitoring Page Layout
- Page title: 'Real-Time Users'
- Auto-refresh indicator at top-right (e.g., 'Auto-refresh: ON | Last updated: 2 seconds ago')
- Manual refresh button at top-right
- Filter panel on left (collapsible):
  - Role filter (Admin only)
  - School filter (Admin only)
  - Status filter (Online, Away)
  - Device type filter (Desktop, Mobile, Tablet)
- Search bar at top
  - Search by user name or email
- Export button at top-right
  - Export as Excel/CSV\n- Main content area:
  - User status cards in grid layout (desktop)
  - User status list (mobile)
  - Each card/row displays:
    - User name and profile picture
    - Role badge\n    - School name (if applicable)
    - Online status indicator (green dot for Online, orange dot for Away)
    - Session duration (e.g., '2h 30m')
    - Last activity timestamp (e.g., '2 minutes ago')
    - Device info (icon with tooltip)
    - IP address (with copy button)
- Summary statistics at top:\n  - Total online users
  - Total active sessions
  - Peak concurrent users today
\n#### 24.3.2 User Status Card/Row Display
- User Name: Display user's full name with profile picture\n- Role Badge: Display role badge (Admin, Principal, Teacher, Student)
- School Name: Display school name (Admin view only)
- Online Status Indicator: Display status badge (Online: green, Away: orange)
- Session Duration: Display time since login (e.g., '2h 30m')
- Last Activity: Display relative time (e.g., '2 minutes ago')
- Device Info: Display device type icon (desktop, mobile, tablet) with device info tooltip
- IP Address: Display IP address with copy button
\n#### 24.3.3 Filter Options
- Role Filter (Admin only):
  - Dropdown with options: All, Admin, Principal, Teacher, Student
- School Filter (Admin only):\n  - Dropdown populated with all schools
  - Multi-select capability
- Status Filter:\n  - Dropdown with options: All, Online, Away
- Device Type Filter:
  - Dropdown with options: All, Desktop, Mobile, Tablet

#### 24.3.4 Search Functionality
- Text search bar at top
- Search by:\n  - User name
  - Email address
- Real-time search with auto-suggestions
- Combined search and filter capability

#### 24.3.5 Auto-Refresh Functionality
- Auto-refresh enabled by default
- Refresh interval: 5 seconds
- Auto-refresh indicator at top-right showing last update time
- Manual refresh button to force immediate refresh
- Toggle button to enable/disable auto-refresh
\n#### 24.3.6 Export Functionality
- Export button at top-right
- Export formats: Excel (.xlsx), CSV (.csv)
- Export options:\n  - Export current snapshot of active users
- Exported file includes all columns with proper formatting
- File name format: ActiveUsers_[Date]_[Time].xlsx

### 24.4 Real-Time User Monitoring Access Control

#### 24.4.1 Admin Access Rules
- Can monitor all logged-in users across all schools
- Can filter by role and school
- Can export active user data
- Cross-school visibility

#### 24.4.2 Principal Access Rules
- Can monitor logged-in teachers and students from their school only
- Cannot monitor other principals or admins
- Can filter by role (Teacher, Student only)\n- Cannot filter by school (automatically filtered to their school)
- Can export active user data for their school only
- School-based data isolation

#### 24.4.3 Teacher and Student Access Rules
- Cannot access Real-Time User Monitoring module
- No visibility into other users' online status

#### 24.4.4 Data Isolation
- All active user data is school-scoped for Principal access\n- Backend validation ensures Principal can only access data from their assigned school
- Admin has cross-school visibility\n- Cross-school data access is prevented at database level for Principal

### 24.5 Real-Time User Monitoring Backend Logic

#### 24.5.1 Session Creation
- On successful login:
  - Create new record in active_user_sessions table
  - Generate unique session_token
  - Capture user_id, school_id, login_time, last_activity_time, ip_address, device_type, device_info
  - Set status = 'Online'
\n#### 24.5.2 Session Update
- On user activity (page navigation, API call, etc.):
  - Update last_activity_time in active_user_sessions table
  - Update status based on last_activity_time:\n    - If last_activity_time within 5 minutes: status = 'Online'
    - If last_activity_time between 5-30 minutes: status = 'Away'
\n#### 24.5.3 Session Deletion
- On user logout:
  - Delete record from active_user_sessions table
  - Update logout_time in user_login_history table
- On session timeout (last_activity_time > 30 minutes):
  - Delete record from active_user_sessions table
  - Update logout_time in user_login_history table with timeout timestamp

#### 24.5.4 Query Logic
- Get active users for Admin:
  ```sql\n  SELECT aus.*, u.name, u.email, u.role, s.school_name
  FROM active_user_sessions aus
  JOIN users u ON aus.user_id = u.id
  LEFT JOIN schools s ON aus.school_id = s.id
  WHERE [filters applied]
  ORDER BY aus.last_activity_time DESC\n  ```
- Get active users for Principal:
  ```sql
  SELECT aus.*, u.name, u.email, u.role\n  FROM active_user_sessions aus
  JOIN users u ON aus.user_id = u.id
  WHERE u.school_id = [principal_school_id]
  AND u.role IN ('Teacher', 'Student')
  AND [filters applied]\n  ORDER BY aus.last_activity_time DESC
  ```

#### 24.5.5 Real-Time Update Mechanism
- Use WebSocket or Server-Sent Events (SSE) for real-time updates
- Backend pushes updates to frontend every 5 seconds
- Frontend updates user status cards/rows without full page refresh
- Efficient delta updates (only changed data sent to frontend)

### 24.6 Real-Time User Monitoring UI Components

#### 24.6.1 Real-Time Users Card (Admin Dashboard)
- Card title: 'Real-Time Users'
- Card content:
  - Currently logged-in users count with icon
  - Active sessions count with icon
  - Quick action button: 'Monitor Users'
- Card styling: Glassmorphism with gradient effect\n
#### 24.6.2 Real-Time Users Card (Principal Dashboard)
- Card title: 'Real-Time Users'\n- Card content:
  - Currently logged-in users (school-specific) count with icon
  - Active sessions (school-specific) count with icon
  - Quick action button: 'Monitor Users'\n- Card styling: Glassmorphism with gradient effect
\n#### 24.6.3 Real-Time User Monitoring Page
- Page title: 'Real-Time Users'
- Auto-refresh indicator at top-right\n- Manual refresh button at top-right
- Filter panel on left (collapsible)
- Search bar at top
- Export button at top-right
- Main content area with user status cards/rows
- Summary statistics at top\n
#### 24.6.4 User Status Card (Desktop View)
- Glassmorphism card with gradient effect
- User profile picture at top
- User name and role badge
- School name (Admin view only)
- Online status indicator (green/orange dot)
- Session duration display
- Last activity timestamp
- Device info icon with tooltip
- IP address with copy button
- Hover effect with enhanced glow

#### 24.6.5 User Status Row (Mobile View)
- Compact row layout
- User profile picture on left
- User name and role badge\n- Online status indicator
- Session duration and last activity
- Device info icon
- Expandable to show full details

#### 24.6.6 Filter Panel\n- Collapsible panel on left
- Clear section separation\n- Dropdown filters with multi-select capability
- Apply Filters button
- Clear Filters button

#### 24.6.7 Auto-Refresh Indicator
- Display at top-right\n- Shows auto-refresh status (ON/OFF)
- Shows last update time (e.g., 'Last updated: 2 seconds ago')
- Toggle button to enable/disable auto-refresh
- Manual refresh button with icon

#### 24.6.8 Export Dialog
- Modal dialog with glassmorphism styling
- Export format selection (Excel, CSV)
- Export button with download icon
- Cancel button

### 24.7 Real-Time User Monitoring Notifications

#### 24.7.1 Admin Notifications
- Alert when concurrent users exceed threshold (optional)
- Alert on unusual activity patterns (optional)
\n#### 24.7.2 Principal Notifications
- Alert when concurrent users in their school exceed threshold (optional)
\n### 24.8 Real-Time User Monitoring Analytics

#### 24.8.1 Summary Statistics
- Total Online Users: Count of users with status = 'Online'
- Total Active Sessions: Count of all active sessions
- Peak Concurrent Users Today: Maximum number of concurrent users today
\n### 24.9 Real-Time User Monitoring Help and Documentation

#### 24.9.1 Help Resources
- Help icon in Real-Time User Monitoring page
- Opens help dialog with:
  - Overview of Real-Time User Monitoring module\n  - How to filter active users
  - How to search active users
  - How to export active user data
  - How to interpret user status (Online, Away)
  - FAQ section

#### 24.9.2 FAQ Topics\n- What is Real-Time User Monitoring?
- How to view currently logged-in users?
- How to filter active users?
- How to search for specific user?\n- How to export active user data?
- What does 'Online' status mean?
- What does 'Away' status mean?
- How is session duration calculated?
- How often does the page refresh?
- Can I disable auto-refresh?
\n## 25. Conclusion

A Cube - Online Exam System is a comprehensive platform designed for educational institutions to create, conduct, and analyze online exams efficiently. With its dark purple-blue gradient theme, glassmorphism design, and professional EdTech look, the system provides a modern and engaging user experience. The automatic passing marks calculation (35% of total marks), enhanced student exam interface with question palette and timer, rich text editor integration for question formatting, updated bulk upload functionality with three-sheet template structure (Option, Question, Reference) to separate dropdown values, data entry, and reference examples, preview and print functionality for question papers, real-time monitoring, comprehensive analytics, and robust security features make A Cube a smart, secure, and scalable solution for NEET preparation and school-level assessments. The addition of the Students card to the Teacher Dashboard with role-based access control, combined with the rich text editor functionality, improved bulk upload capability with cleaner data entry experience and better guidance through separate reference examples, and the new preview-print feature in Question Paper History, further enhances teacher productivity by allowing them to create well-formatted questions, import large question banks efficiently with reduced errors through dropdown selections and reference examples, manage students from their assigned sections effectively, and print question papers with all formatting preserved directly from the preview dialog. The updated side panel navigation for both Principal and Teacher roles now includes easy access to Question Paper History, streamlining the workflow and improving overall user experience. The newly added student-level exam assignment feature provides teachers and principals with the flexibility to assign exams to entire classes or specific individual students, enabling more targeted assessments and personalized learning experiences. The latest addition of question usage tracking during question paper preparation empowers teachers to make informed decisions about question reuse by displaying usage count and list of question papers where each question was used, thereby enhancing question paper quality, promoting variety, and supporting data-driven question selection for better assessment outcomes. The Admin Global Question Bank Management feature introduces a centralized repository of high-quality questions accessible to all schools, enabling administrators to curate and share questions across the platform. With three distinct sections—Global Question Bank, Users Question Bank, and the newly added Pending to Add section—admins can efficiently manage question visibility, add user-created questions to the global pool, edit and delete global questions, and remove questions as needed. The Pending to Add section provides a focused view of all user-created questions not yet in Global, streamlining the workflow for admins to quickly identify and add pending questions. Teachers and principals benefit from access to both school-specific and global questions when creating question papers and exams, significantly expanding their question selection options and promoting standardized assessments across multiple schools. This feature enhances collaboration, improves question quality through centralized curation, and supports consistent educational standards across the entire platform. The newest enhancements—Admin Create Question, Admin Create Question Bank functionalities, and the Pending to Add section—further empower administrators with direct question creation capabilities, streamlined bulk addition of user-created question banks to the Global Question Bank, and a focused view for managing pending questions. Admins can now create questions for any school directly from the Admin Question Bank page, with the option to add them to Global immediately. Additionally, the Create Question Bank feature allows admins to view all user-created question banks not yet in Global, select multiple banks, preview their contents, and add them to Global in bulk. The Pending to Add section displays only questions not yet in Global (is_global = false), providing a clean and efficient interface for admins to review and add pending questions without sifting through all user questions. The latest addition—Admin Bulk Copy to Global feature and Bulk Add to Global from Pending to Add section—introduces checkbox-based bulk selection in both the Users Question Bank tab and the Pending to Add tab, allowing admins to select multiple questions at once and copy or add them to Global Question Bank with a single click. The Copy to Global button (Users tab) and Add to Global button (Pending to Add tab) are strategically placed below the filter dropdowns and above the table headers for easy access, and display the selected count dynamically. **The newest addition—Login History Monitoring and Real-Time User Monitoring modules—provides comprehensive user activity tracking and real-time monitoring capabilities. Admins can view login history of all users across all schools and monitor currently logged-in users in real-time with detailed session information. Principals can view login history and monitor active users from their assigned school only, with school-based data isolation ensuring proper access control. These features enhance security, improve user management, support compliance requirements, and provide valuable insights into user behavior and platform usage patterns.** These features collectively enhance admin control over question bank content, support centralized question creation and management, streamline the process of curating high-quality questions for the Global Question Bank, reduce time and effort required for question bank management, improve security and user monitoring, and ultimately improve question quality, promote standardized assessments, support efficient management of large question repositories, enhance platform security, and provide comprehensive user activity insights across the entire platform.