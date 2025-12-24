# Online School Management System Requirements Document

## 1. Application Description

### 1.1 Application Name
Online School Management System

### 1.2 Application Purpose
A comprehensive school management system for educational institutions. Features include school management, academic structure setup (class, section, subject, lesson), teacher-subject-class-section mapping, question bank management with lesson-level tracking, question paper preparation with shuffle functionality, question paper history tracking, online exam creation and management with approval workflow, user management with school-based data isolation.\n
## 2. User Roles\n
### 2.1 Admin\n- Complete system administration\n- School management (create, edit, view schools)\n- User account creation and management
- New user approval management
- Role-based Access Control setup
- System configurations\n- Permission management
- User profile editing and suspension management
- **Cross-school visibility**: Admin can view and manage all schools and users across the entire system
- **Full management rights**: Create, edit, suspend, delete all users and schools
\n### 2.2 Principal
- **Academic Management** (within assigned school only):
  - Class creation\n  - Section creation
  - Subject creation (class-wise)
  - Lesson creation (subject-wise)
  - Student class-section mapping
- **Teacher Management** (within assigned school only):
  - View teacher accounts
  - Teacher-subject-class-section mapping\n  - View class-section overview with assigned teachers per subject
  - Edit teacher profiles
- **Student Management** (within assigned school only):
  - View students list
  - View student class-section assignments
- **Question Bank Management** (within assigned school only):
  - Create and manage questions with lesson-level tracking
  - Insert images/clip arts in questions
  - View question bank analytics
  - Switch between Row View and Card View
  - Edit questions in both views
- **Question Paper History Access** (within assigned school only):\n  - View all question papers created by teachers in their school
  - Filter and search question paper history
  - Export and print historical question papers
- **Online Exam Management** (within assigned school only):\n  - **Approve school-level exams created by teachers**
  - **Create exams directly without approval requirement**
  - **Create exams from school question bank without approval**
  - View all online exams (practice and school-level) created by teachers
  - Monitor exam status and student participation
  - Access exam analytics and reports
  - **Delete exams created by self (with restrictions)**
- Profile editing capability
- Linked to specific school from school master list
- **School-based isolation**: Can only view and manage users (teachers and students) from their assigned school
- **Visibility Rules**:
  - ✅ Can view: Teachers from their own school, Students from their own school, Question papers created by teachers in their school, Online exams created by teachers in their school
  - ❌ Cannot view: Users from other schools\n\n### 2.3 Teacher
- View assigned classes, sections, and subjects
- View students of assigned sections only
- **Question Bank Access**:
  - Create questions for assigned subjects and lessons
  - Insert images/clip arts in questions
  - View questions filtered by assigned subjects\n  - Switch between Row View and Card View
  - Edit own questions in both views
- **Question Paper Preparation**:
  - Create question papers from own question bank
  - Select questions by class and subject
  - Shuffle questions and MCQ options
  - Preview, save as draft, generate final paper
  - Export as PDF and print
  - **Save shuffled papers with auto-versioned names (Shuffled A, Shuffled B, etc.)**
- **Question Paper History**:
  - View all question papers created by self
  - Filter by class, subject, date range, status
  - View, edit, delete, export, print historical papers
  - Create new versions from existing papers
  - Track paper creation and modification history
- **Online Exam Management**:
  - **Create practice exams (no approval required) to assess student understanding**
  - **Create school-level exams (requires Principal approval before scheduling)**
  - Configure exam settings (duration, start/end time, passing marks, negative marking)
  - Publish practice exams directly to assigned sections
  - Submit school-level exams for Principal approval
  - Monitor student participation in real-time
  - View submitted answers and auto-graded results
  - Manually grade subjective questions (Short Answer, Essay)\n  - Generate exam reports and analytics
  - Export exam results\n  - **Delete own exams (with restrictions)**
- Profile editing capability
- Linked to specific school from school master list
- **School-based isolation**: Can only view and interact with students from their assigned sections
- **Visibility Rules**:
  - ✅ Can view: Students from their assigned sections, Own question papers, Own online exams
  - ❌ Cannot view: Principal (even from the same school), Other teachers (even from the same school), Users from other schools, Question papers created by other teachers, Online exams created by other teachers\n
### 2.4 Student
- View my class, section, subjects, and teachers
- **Online Exam Access**:
  - **Login with individual student account**
  - View assigned online exams (practice and school-level)
  - **Take online exams with exam interface including question palette panel and timer**
  - Submit answers before deadline
  - **View auto-evaluated results for objective questions**
  - View exam results and feedback (after teacher publishes results)
  - **View detailed performance analysis**
  - Review correct answers (if enabled by teacher)
- Profile editing capability
- Linked to specific school from school master list
- **School-based isolation**: Can only view personal information from their assigned school
- **Visibility Rules**:
  - ✅ Can view: Only their own profile details, Personal information, Assigned content, Assigned online exams, Own exam results
  - ❌ Cannot view: Other students, Teachers, Principal, Admin\n
### 2.5 User Profile Information
All users (Admin, Principal, Teacher, Student) will have the following profile information:
- User name
- Email address
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
- **Admin**: Can view all users from all schools
- **Principal**: Can only view teachers and students from assigned school, and question papers created by teachers in their school\n- **Teacher**: Can only view students from assigned sections and own question papers (cannot view Principal or other teachers)
- **Student**: Can only view their own profile and personal information (cannot view other students, teachers, or Principal)

#### 4.2.2 Search and Filter
- All user lists are automatically filtered by school and role-based visibility rules
- Search functionality respects school-based isolation and role permissions
- Dropdown lists and selection options show only school-relevant and role-appropriate data

### 4.3 School Group Interconnection
- All users within same school are interconnected based on role-specific visibility\n- Principal oversees all teachers and students in their school
- Teachers can view student lists within their assigned sections (but not Principal or other teachers)
- Students can only access their own information\n- Communication and notifications are school-scoped and role-appropriate

## 5. Principal Dashboard - Academic Management Module

### 5.1 Principal Dashboard Overview
After Principal login, the dashboard displays seven main cards:
- **Academic Management**: Manage academic structure (classes, sections, subjects, lessons, student mapping)
- **Teachers**: Manage teacher accounts and teacher-subject-class-section mapping\n- **Students**: View and manage students\n- **Question Bank**: Manage exam questions with lesson-level tracking and dual view options
- **Question Paper History**: View all question papers created by teachers in the school
- **Online Exams**: View and monitor all online exams created by teachers in the school
- **Exam Approvals**: Review and approve school-level exams submitted by teachers
\n**UI Language Requirement**: All card titles, labels, and UI text on Principal Dashboard must be displayed in English only. Card titles should be 'Academic Management', 'Teachers', 'Students', 'Question Bank', 'Question Paper History', 'Online Exams', and 'Exam Approvals' (not in Tamil or any other language).

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
- **Database Structure**:
  - Table name: lessons
  - Columns:\n    - id (UUID, Primary Key)
    - subject_id (Foreign Key → subjects.id)
    - lesson_name (Text, required)
    - lesson_code (Varchar, optional)
    - created_at (Timestamp)\n    - updated_at (Timestamp)
\n#### 5.2.5 Student Class-Section Mapping
- Principal can assign students to specific class and section
- **Note**: Student accounts are already created via Sign-Up process, only class-section assignment is done here
- Mapping interface:
  - Student selection (dropdown or search from existing students in the school)
  - Class selection (dropdown)\n  - Section selection (dropdown, filtered by selected class)
  - Academic Year\n- Bulk assignment option for multiple students
- View current class-section assignments with edit and reassign options
- Students without class-section assignment are listed separately for easy identification

### 5.3 Teachers Card - Teacher Management

#### 5.3.1 Teacher Accounts
- **Note**: Teacher accounts are already created via Sign-Up process and mapped to school by Admin
- Principal can view all teachers in their assigned school
- Teacher list displays:
  - Teacher Name
  - Subject specialization
  - Phone Number
  - Account Status (Active/Pending/Suspended)
  - **Edit Action**: Edit button or pencil icon for each teacher row to enable profile editing
- **Enhanced Search and Filter Functionality**:
  - Text search bar for searching by teacher name, phone number, or email
  - Additional dropdown filters:\n    - Subject filter (dropdown showing all subjects in the school)
    - Status filter (dropdown with options: All, Active, Pending, Suspended)
- Combined search capability (text search + subject filter + status filter)
  - Real-time filtering as user types or selects filter options
  - Clear filters button to reset all search and filter criteria

#### 5.3.2 Teacher-Subject-Class-Section Mapping (Heart of the System)
- Principal assigns teachers to specific subjects, classes, and sections
- Mapping interface:
  - Teacher selection (dropdown from school teachers)
  - Subject selection (dropdown from school subjects)
  - Class selection (dropdown from school classes)
  - Section selection (multi-select, filtered by selected class)
- One teacher can be assigned to multiple subject-class-section combinations
- View current teacher assignments with edit and delete options
- **This mapping is the core of the system**: It determines which students a teacher can view\n
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
  - Account Status (Active/Pending/Suspended)\n- **Enhanced Search Functionality**: \n  - Text search bar for searching by name, phone, or email
  - Additional dropdown filters for Class and Section
  - Combined search capability (text search + class filter + section filter)
- Filter and search options by class, section, or name
- Click on student to view detailed profile and academic records
\n### 5.5 Question Bank Card - Question Management
- Principal can access Question Bank management interface
- Create, edit, and delete questions for exam preparation
- **Insert images/clip arts in questions**\n- **Dual View Options**:
  - Row View (table format)
  - Card View (detailed card format)
- View all questions with lesson-level filtering
- Analytics dashboard for question bank performance
\n### 5.6 Question Paper History Card - Historical Paper Management
- Principal can access Question Paper History interface
- View all question papers created by teachers in their school
- Filter by teacher name, class, subject, date range, paper status
- Search by paper name or paper ID
- View detailed paper information including:
  - Paper name
  - Created by (teacher name)
  - Class and Subject
  - Creation date and last modified date
  - Paper status (Draft/Final)\n  - Total marks
  - Number of questions
- Actions available:
  - View paper details
  - Export as PDF
  - Print paper
- Analytics dashboard showing:
  - Total papers created per teacher
  - Papers created per subject
  - Papers created per class
  - Monthly paper creation trends

### 5.7 Online Exams Card - Exam Monitoring and Management
- Principal can access Online Exams interface
- View all online exams (practice and school-level) created by teachers in their school
- Filter by teacher name, class, subject, exam status, exam type (practice/school-level), date range
- Search by exam name or exam ID
- View exam overview including:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Approval status (for school-level exams: Pending/Approved/Rejected)\n  - Created by (teacher name)
  - Class and Subject
  - Exam duration
  - Start and end date/time
  - Exam status (Draft/Scheduled/Ongoing/Completed/Cancelled)
  - Total students assigned\n  - Students completed
  - Average score
- Actions available:
  - View exam details
  - View student participation report
  - Export exam results
  - View exam analytics
  - **Delete exam (for self-created exams only, with restrictions)**
- Analytics dashboard showing:
  - Total exams conducted per teacher
  - Exams conducted per subject
  - Exams conducted per class
  - Student participation rate
  - Average scores by subject/class

### 5.8 Exam Approvals Card - School-Level Exam Approval Management
**New Feature**: Principal can review and approve school-level exams submitted by teachers
\n**Approval Dashboard Layout**:
\n**Pending Approvals Section**:
- List of school-level exams awaiting approval\n- Each exam card shows:
  - Exam name
  - Created by (Teacher name with profile link)
  - Class and Subject\n  - Sections (with student count)
  - Exam duration
  - Requested start date/time
  - Requested end date/time
  - Total marks
  - Total questions
  - Submission date (when teacher submitted for approval)
  - Status badge:'Pending Approval' (orange)
  - Action buttons:\n    - 'Review': Open detailed exam review page
    - 'Quick Approve': Approve without detailed review (with confirmation)
    - 'Reject': Reject with reason (opens dialog)
- Sort options: Submission Date (Recent First/Oldest First), Start Date (Nearest First)\n- Filter: By Teacher, By Class, By Subject\n- Search: By exam name\n\n**Exam Review Page**:
- Display complete exam details:\n  - Exam Information: Name, Class, Subject, Sections, Duration, Start/End DateTime, Passing Marks, Instructions
  - Exam Settings: Negative Marking, Show Results Immediately, Allow Answer Review, Randomization settings, Late Submission settings, Security settings
  - Question List: All questions with marks, difficulty, question type, correct answers\n  - Teacher's Notes (optional): Any additional information provided by teacher
- Preview exam as student would see it
- Action buttons:
  - 'Approve Exam': Approve and allow teacher to schedule\n    - Confirmation dialog:'Are you sure you want to approve this exam? Teacher will be able to schedule it immediately.'
    - On approval: Exam status changes to 'Approved', teacher receives notification
  - 'Approve with Modifications': Approve but request changes
    - Opens dialog to specify required modifications
    - Teacher receives notification with modification requests
    - Exam returns to teacher for editing
  - 'Reject Exam': Reject with reason
    - Opens dialog to enter rejection reason (required)
    - Exam status changes to 'Rejected'\n    - Teacher receives notification with rejection reason
    - Teacher can edit and resubmit
  - 'Request More Information': Ask teacher for clarification
    - Opens dialog to enter questions/requests
    - Teacher receives notification\n    - Exam remains in 'Pending Approval' status
  - 'Back to Approvals': Return to approval dashboard
\n**Approval History Section**:
- List of all approved and rejected exams
- Each exam card shows:
  - Exam name
  - Created by (Teacher name)\n  - Class and Subject
  - Approval status badge (Approved/Rejected)
  - Approval date
  - Approved/Rejected by (Principal name)
  - Rejection reason (if rejected)
  - Current exam status (Scheduled/Ongoing/Completed/Cancelled)
  - Action buttons:\n    - 'View Details': Open exam details page
    - 'View Analytics': Open analytics (for completed exams)
- Filter: By Status (Approved/Rejected), By Teacher, By Class, By Subject, By Date Range
- Sort: Approval Date (Recent First/Oldest First)
\n**Approval Statistics**:
- Overview cards:\n  - Pending Approvals: X exams
  - Approved This Month: Y exams
  - Rejected This Month: Z exams
  - Average Approval Time: W hours
- Charts:
  - Approvals Over Time (line chart)
  - Approvals by Teacher (bar chart)
  - Approvals by Subject (bar chart)
\n**Notification System**:
- Principal receives notification when teacher submits exam for approval
- Teacher receives notification when exam is approved/rejected/requires modification
- Reminder notification to Principal if approval pending for more than 48 hours
\n## 6. Question Bank Module

### 6.1 Question Bank Overview
- Centralized repository for exam questions
- Questions are organized by Class, Subject, and Lesson
- Support for multiple question types (Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ)\n- Difficulty levels (Easy, Medium, Hard)
- Marks allocation per question
- **Minus Mark (Negative Marking) support**: Questions can have negative marks for incorrect answers
- Lesson-level tracking for performance analytics
- **Image/Clip Art support**: Questions can include images or clip arts
- **Dual view display options**: Row View and Card View

### 6.2 Question Bank Table Structure
\n#### 6.2.1 Database Schema
**Table name**: question_bank

**Columns**:
- id (UUID, Primary Key)
- school_id (Foreign Key → schools.id)
- class_id (Foreign Key → classes.id)
- subject_id (Foreign Key → subjects.id)
- lesson_id (Foreign Key → lessons.id)
- bank_name (Varchar, auto-generated)
  - Format: Class_Subject (e.g., 'Class10_English', 'Class6_Mathematics')
  - Auto-generated by combining selected Class name and Subject name
- question_text (Text, required)
- question_type (Enum: Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ)
- marks (Integer, required)
- **minus_mark (Decimal, optional)**
  - Stores negative marks for incorrect answers
  - Format: Decimal value (e.g., 0.25, 0.5, 1.0)
  - Default value: 0 (no negative marking)
  - Can be null or zero if no negative marking is applied
- difficulty (Enum: Easy, Medium, Hard)
- options (JSON array, required for Multiple Choice, True/False, Match the Following, and Multiple Response MCQ)
- correct_answer (Text or JSON array, required)\n  - For Multiple Choice and True/False: Text (single correct answer)
  - For Short Answer and Essay: Text\n  - For Match the Following: JSON array storing correct pairs
  - For Multiple Response MCQ: JSON array storing multiple correct answers
- **question_images (JSON array, optional)**
  - Stores array of image URLs or file paths
  - Format: [{url: 'path/to/image1.jpg', caption: 'Image description'}, {url: 'path/to/image2.png', caption: 'Diagram'}]
  - Supports multiple images per question
- created_by (Foreign Key → users.id)
- created_at (Timestamp)
- updated_at (Timestamp)\n\n#### 6.2.2 Foreign Key Relationships
- school_id → schools.id (CASCADE on delete)
- class_id → classes.id (CASCADE on delete)
- subject_id → subjects.id (CASCADE on delete)
- lesson_id → lessons.id (CASCADE on delete)
- created_by → users.id (SET NULL on delete)
\n### 6.3 Question Creation Form

#### 6.3.1 Form Field Order
The question creation form displays fields in the following order:
1. **Class** (Dropdown, required)
2. **Subject** (Dropdown, required)
3. **Lesson** (Dropdown, required)
4. **Question** (Text area, required)
5. **Insert Images/Clip Arts** (Image upload field, optional)
6. **Question Type** (Dropdown, required)\n7. **Marks** (Number input, required)
8. **Minus Mark** (Number input, optional)
9. **Difficulty** (Dropdown, required)
10. **Options** (Dynamic fields, conditional)\n11. **Correct Answer** (Text input, dropdown, or multi-select, required)
\n#### 6.3.2 Form Behavior
- **Cascading Dropdowns**: Class → Subject → Lesson\n- **Auto-generation**: bank_name field is auto-generated upon form submission
- **Validation**: All required fields must be filled before submission
- **Form Persistence Issue Fix**: After submitting a question, the form should clear all fields except Class and Subject

### 6.4 Question Bank Dual View Display

#### 6.4.1 View Toggle Control
- **View Switcher**: Toggle button or tab control at the top of Question Bank page
- User can switch between views with single click
- Default view: Row View\n\n#### 6.4.2 Row View (Table Format)
**Display Columns**:
- Question (truncated text with expand option)
- **Image Indicator** (icon showing if question has images)
- Class\n- Subject
- Lesson
- Question Type
- Difficulty
- Marks
- **Minus Mark** (displays negative marking value)
- Actions (Edit, Delete)

#### 6.4.3 Card View (Detailed Card Format)
**Card Layout**: Each question displayed as a card with question text, images, metadata, options, and action buttons.\n
#### 6.4.4 Edit Functionality in Both Views
- Edit icon/button opens edit dialog with pre-filled form
- Image editing with local file selection
- Minus Mark editing with validation
\n## 7. Question Paper Preparation Module

### 7.1 Question Paper Preparation Overview
- **Purpose**: Enable teachers to create question papers from their own question bank
- **Access**: Available only to Teacher role
- **Workflow**: Basic Details → Question Selection → Shuffle Options → Preview/Save/Generate
\n### 7.2 Question Paper Preparation Workflow

#### 7.2.1 Step 1: Basic Details
- Class Selection (Dropdown, required)
- Subject Selection (Dropdown, required)
\n#### 7.2.2 Step 2: Question Selection Source
- View All Questions or View Questions by Question Bank Name
- Question list displayed in row format

#### 7.2.3 Step 3: Shuffle Functionality
- **Shuffle Questions** (Checkbox)\n- **Shuffle MCQ Options** (Checkbox)
- **Updated Shuffle Rules for Multiple Response MCQ**: Only Segment 3 (Answer Options) should be shuffled

#### 7.2.4 Step 4: Final Question Paper Output
- Preview Question Paper
- Save as Draft
- Generate Final Question Paper
- Export as PDF
- Print Option

### 7.3 Question Paper Database Structure
**Table name**: question_papers

**Columns**:
- id (UUID, Primary Key)
- paper_name (Varchar, required)\n- school_id (Foreign Key → schools.id)
- class_id (Foreign Key → classes.id)
- subject_id (Foreign Key → subjects.id)
- created_by (Foreign Key → users.id)
- selected_questions (JSON array, stores question IDs and order)
- shuffle_questions (Boolean, default false)
- shuffle_mcq_options (Boolean, default false)
- paper_status (Enum: Draft, Final)\n- total_marks (Integer, calculated)\n- total_questions (Integer, calculated)
- created_at (Timestamp)\n- updated_at (Timestamp)
- parent_paper_id (Foreign Key → question_papers.id, nullable)
  - Used for tracking shuffled versions
  - Original paper has null value
  - Shuffled versions reference original paper ID
- version_name (Varchar, optional)
  - Stores version identifier (e.g., 'Shuffled A', 'Shuffled B')
  - Original paper has null or'Original' value
\n**Foreign Key Relationships**:
- school_id → schools.id (CASCADE on delete)
- class_id → classes.id (CASCADE on delete)
- subject_id → subjects.id (CASCADE on delete)
- created_by → users.id (SET NULL on delete)
- parent_paper_id → question_papers.id (SET NULL on delete)

### 7.4 Access Control & Data Isolation
- Teachers can access only their own question banks
- Backend validation ensures data isolation
- Teachers can only view and manage question papers created by themselves
- Principal can view all question papers created by teachers in their school
\n### 7.5 Question Paper Management Interface
- Question Paper List with filters
- Actions: View, Edit, Delete, Export PDF, Print, **Shuffle and Save**
\n### 7.6 Enhanced Question Paper Features
\n#### 7.6.1 Multiple Question Paper Versions
- Generate2-5 versions with different shuffled options
- Auto-generate answer keys for each version
\n#### 7.6.2 Question Paper Templates
- Save frequently used configurations as reusable templates
\n#### 7.6.3 Smart Question Selection
- Auto-suggest by difficulty distribution
- Lesson coverage indicator
- Real-time marks calculation

#### 7.6.4 Preview Enhancements
- Side-by-side preview of original vs shuffled versions
- Print preview with actual paper formatting
- Student view vs answer key view toggle

#### 7.6.5 Bulk Operations
- Select all questions from specific lesson
- Select questions by difficulty level
- Batch shuffle multiple question papers

#### 7.6.6 Version History
- Track all generated question papers with timestamps
- Reuse or modify previously created papers
- Compare different versions\n
#### 7.6.7 Shuffle and Save with Auto-Versioned Names
- **Purpose**: Create multiple shuffled versions with automatically incremented version identifiers (Shuffled A, Shuffled B, etc.)
- **Auto-Versioning Logic**: System extracts base name and increments version letter
- **Workflow**: Click'Shuffle and Save' → System auto-generates new name → Create shuffled version

## 8. Question Paper History Module

### 8.1 Question Paper History Overview\n- **Purpose**: Provide comprehensive tracking and management of all question papers created by teachers
- **Access**: \n  - Teachers can view only their own question paper history
  - Principal can view all question papers created by teachers in their school
- **Key Features**:
  - Complete historical record of all question papers
  - Advanced filtering and search capabilities
  - Paper versioning and relationship tracking
  - Export and print functionality
  - Analytics and reporting

### 8.2 Question Paper History Interface
\n#### 8.2.1 History List View
**Display Columns**:
- Paper Name
- Class
- Subject
- Created By (Teacher Name)
- Creation Date
- Last Modified Date
- Paper Status (Draft/Final)
- Total Marks
- Total Questions\n- Version Info (Original/Shuffled A/Shuffled B, etc.)
- Actions (View, Edit, Delete, Export PDF, Print, Create New Version)

#### 8.2.2 Filter Options\n- **Teacher Filter** (Principal only): Dropdown showing all teachers in the school
- **Class Filter**: Dropdown showing all classes\n- **Subject Filter**: Dropdown showing all subjects
- **Date Range Filter**: \n  - From Date (Date picker)
  - To Date (Date picker)
  - Quick select options: Today, Last 7 Days, Last 30 Days, Last 3 Months, Last Year
- **Paper Status Filter**: Dropdown with options (All, Draft, Final)
- **Version Type Filter**: Dropdown with options (All, Original, Shuffled Versions)
- **Clear All Filters** button to reset all filter criteria

#### 8.2.3 Search Functionality\n- Text search bar for searching by:\n  - Paper name
  - Paper ID
  - Teacher name (Principal only)
- Real-time search with auto-suggestions
- Combined search and filter capability

#### 8.2.4 Sorting Options
- Sort by Creation Date (Newest First/Oldest First)
- Sort by Last Modified Date (Newest First/Oldest First)
- Sort by Paper Name (A-Z/Z-A)
- Sort by Class (Ascending/Descending)
- Sort by Total Marks (High to Low/Low to High)
\n### 8.3 Question Paper Detail View

#### 8.3.1 Paper Information Section
- Paper Name
- Paper ID (System-generated unique identifier)
- Class and Subject
- Created By (Teacher Name with profile link)
- Creation Date and Time
- Last Modified Date and Time
- Paper Status (Draft/Final with status badge)
- Total Marks
- Total Questions
- Version Information:\n  - Version Type (Original/Shuffled)
  - Parent Paper (if shuffled version, link to original paper)
  - Related Versions (list of all shuffled versions with links)
\n#### 8.3.2 Question List Section
- Display all questions in the paper with:
  - Question number
  - Question text (with images if present)
  - Question type
  - Marks
  - Minus marks (if applicable)
  - Difficulty level
  - Correct answer (for teacher/principal view)
- Questions displayed in paper order
- Option to expand/collapse question details

#### 8.3.3 Paper Settings Section
- Shuffle Questions: Yes/No
- Shuffle MCQ Options: Yes/No
- Paper Configuration Details\n\n#### 8.3.4 Action Buttons
- **Edit Paper**: Open paper in edit mode
- **Create New Version**: Create a new shuffled version from this paper
- **Export as PDF**: Download paper in PDF format
- **Print**: Open print dialog\n- **Delete Paper**: Delete paper with confirmation dialog
- **Duplicate Paper**: Create a copy of the paper with new name

### 8.4 Question Paper History Analytics

#### 8.4.1 Analytics Dashboard (Principal View)
- **Overview Cards**:
  - Total Papers Created
  - Papers Created This Month
  - Total Teachers Contributing
  - Average Papers per Teacher
- **Charts and Graphs**:
  - Papers Created Over Time (Line chart showing monthly trends)
  - Papers by Subject (Bar chart)
  - Papers by Class (Bar chart)
  - Papers by Teacher (Bar chart, top 10teachers)
  - Paper Status Distribution (Pie chart: Draft vs Final)
  - Version Type Distribution (Pie chart: Original vs Shuffled)
- **Detailed Statistics**:
  - Most Active Teachers (table with paper count)
  - Most Popular Subjects (table with paper count)
  - Average Questions per Paper
  - Average Marks per Paper
\n#### 8.4.2 Analytics Dashboard (Teacher View)
- **Overview Cards**:
  - My Total Papers
  - Papers Created This Month
  - Total Shuffled Versions
  - Average Questions per Paper
- **Charts and Graphs**:
  - My Papers Over Time (Line chart)
  - My Papers by Subject (Bar chart)
  - My Papers by Class (Bar chart)
  - Paper Status Distribution (Pie chart)\n- **Personal Statistics**:
  - Most Used Question Types
  - Average Paper Difficulty
  - Total Questions Created
\n### 8.5 Question Paper History Access Control

#### 8.5.1 Teacher Access Rules
- Can view only own question paper history
- Can edit only own papers
- Can delete only own papers
- Can create new versions from own papers
- Cannot view papers created by other teachers

#### 8.5.2 Principal Access Rules
- Can view all question papers created by teachers in their school
- Can filter by teacher name
- Can view detailed analytics for all teachers
- Can export and print any paper
- Cannot edit or delete papers created by teachers
- Can view paper details and question content

#### 8.5.3 Data Isolation
- All question paper history data is school-scoped
- Backend validation ensures teachers can only access own papers
- Principal can only access papers from their assigned school
- Cross-school data access is prevented at database level

### 8.6 Question Paper History Navigation

#### 8.6.1 Teacher Dashboard Integration
- Add 'Question Paper History' card to Teacher Dashboard
- Card displays:
  - Total papers created
  - Recent papers (last 5)\n  - Quick action button:'View All History'\n- Click on card opens Question Paper History page

#### 8.6.2 Principal Dashboard Integration\n- Add 'Question Paper History' card to Principal Dashboard
- Card displays:
  - Total papers in school
  - Papers created this month
  - Most active teacher
  - Quick action button: 'View All History'
- Click on card opens Question Paper History page with school-wide view

#### 8.6.3 Navigation Menu
- Add 'Question Paper History' menu item under 'Manage Exams' section
- Available for both Teacher and Principal roles
- Menu item badge shows count of papers created in last 7 days

### 8.7 Question Paper History Export and Print

#### 8.7.1 Export Options\n- **Export Single Paper**:
  - Export as PDF with formatting
  - Include/exclude answer key (toggle option)
  - Include/exclude question images
  - Custom header and footer options
- **Bulk Export**:
  - Select multiple papers from history list
  - Export as single PDF or separate PDFs
  - Zip file download for multiple papers

#### 8.7.2 Print Options
- **Print Single Paper**:
  - Print preview with actual paper formatting
  - Page setup options (A4, Letter, etc.)
  - Include/exclude answer key
  - Print with or without images
- **Bulk Print**:
  - Select multiple papers for batch printing
  - Print queue management
\n### 8.8 Question Paper History Notifications

#### 8.8.1 Teacher Notifications
- Notification when paper is successfully created
- Notification when shuffled version is generated
- Reminder for draft papers older than 30 days
\n#### 8.8.2 Principal Notifications
- Daily/weekly summary of papers created by teachers
- Notification when teacher creates new paper
- Monthly analytics report

## 9. Online Exam Module - Detailed Specifications

### 9.1 Online Exam Overview
- **Purpose**: Enable teachers to create, publish, and manage online exams for students with comprehensive monitoring, auto-grading, and analytics capabilities
- **Exam Types**:
  - **Practice Exams**: Created by teachers to assess student understanding, no approval required, can be scheduled immediately
  - **School-Level Exams**: Created by teachers for formal assessment, requires Principal approval before scheduling
  - **Principal-Created Exams**: Created directly by Principal or from school question bank, no approval required
- **Access**: \n  - Teachers can create practice and school-level exams for their assigned sections
  - Students can take assigned online exams using individual login with exam interface including question palette panel and timer
  - Principal can create exams directly, approve school-level exams, and monitor all exams in their school
- **Key Features**:
  - Create exams from existing question papers or directly from question bank
  - Configure detailed exam settings (duration, scheduling, passing criteria, negative marking)
  - Approval workflow for school-level exams\n  - Publish exams to specific sections with automatic notifications
  - **Enhanced student exam interface with question palette panel and timer**
- Real-time exam monitoring with live student status tracking
  - **Automatic grading for objective questions** (MCQ, True/False, Multiple Response, Match the Following)
  - Manual grading interface for subjective questions (Short Answer, Essay)\n  - **Comprehensive exam analytics with detailed performance analysis**
  - Secure exam environment with anti-cheating measures
  - Export and reporting capabilities
  - **Delete exam functionality with restrictions**

### 9.2 Online Exam Creation Workflow

#### 9.2.1 Step 1: Exam Basic Details
**Form Fields**:
- **Exam Name** (Text input, required)
  - Validation: 3-100 characters
  - Example: 'Class 10 Science Mid-Term Exam 2025'
- **Exam Type** (Radio buttons, required)
  - Options:\n    - **Practice Exam**: For assessing student understanding, no approval required\n    - **School-Level Exam**: For formal assessment, requires Principal approval
  - Default: Practice Exam
  - Helper text:\n    - Practice Exam: 'Can be scheduled immediately after creation'
    - School-Level Exam: 'Requires Principal approval before scheduling'
- **Class** (Dropdown, required)
  - Populated from teacher's assigned classes (for teachers) or all classes (for principal)
  - Cascading filter for Subject and Section
- **Subject** (Dropdown, required)
  - Filtered by selected Class
  - Shows only subjects assigned to teacher (for teachers) or all subjects (for principal)
- **Section Selection** (Multi-select checkbox, required)
  - Teacher can select one or multiple sections from their assigned sections
  - Principal can select any sections\n  - Display format: 'Section A (30 students)', 'Section B (28 students)'
  - Total student count displayed: 'Total: 58 students'
- **Exam Duration** (Number input in minutes, required)
  - Validation: 10-300 minutes
  - Helper text: 'Recommended: 60-90 minutes for standard exams'
- **Start Date and Time** (Date-time picker, required)
  - Validation: Must be future date/time
  - Time zone display: System timezone
  - Format: 'YYYY-MM-DD HH:MM AM/PM'
- **End Date and Time** (Date-time picker, required)
  - Validation: Must be after Start Date/Time
  - Auto-calculate based on duration if needed
  - Warning if exam window is too short for all students
- **Passing Marks** (Number input, optional)
  - Validation: 0 to Total Marks
  - Percentage display: Auto-calculate and show percentage
  - Example: '40marks (40%)'\n- **Instructions for Students** (Rich text editor, optional)
  - Support for formatted text, bullet points, numbered lists
  - Character limit: 2000 characters
  - Preview option available
  - Example instructions template provided
\n**UI Layout**:
- Two-column layout for better space utilization
- Left column: Exam Name, Exam Type, Class, Subject, Section Selection\n- Right column: Duration, Start/End DateTime, Passing Marks\n- Full-width: Instructions for Students
- Progress indicator:'Step 1 of 4'\n- Action buttons: 'Cancel', 'Save as Draft', 'Next'\n
#### 9.2.2 Step 2: Question Selection Method
Teacher/Principal can choose one of two methods:
\n**Method A: Select from Existing Question Paper**
- **Question Paper Dropdown**:
  - Shows teacher's own question papers (for teachers) or all question papers (for principal) filtered by selected class and subject
  - Display format: 'Paper Name (Total Marks: XX, Questions: YY, Status: Draft/Final)'
  - Sort options: Recent, Name A-Z, Total Marks\n  - Search functionality with real-time filtering
- **Paper Preview**:
  - Click'Preview' button to view full question paper
  - Shows all questions with marks, difficulty, question type\n  - Display total marks and question count
- **Auto-Import**:
  - All questions from selected paper are automatically added to exam
  - Question order preserved from paper
  - Shuffle settings inherited from paper (can be modified in Step 3)
  - Total marks auto-calculated\n- **Modification Options**:
  - Option to remove specific questions after import
  - Option to add additional questions from question bank
  - Reorder questions via drag-and-drop
\n**Method B: Select Questions from Question Bank**
- **Question Bank View**:
  - Display all questions from teacher's question bank (for teachers) or school question bank (for principal)
  - Filtered by selected class and subject
  - View options: List view or Card view
- **Filter Panel**:
  - Lesson filter (multi-select dropdown)
  - Question type filter (multi-select: MCQ, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ)
  - Difficulty filter (multi-select: Easy, Medium, Hard)
  - Marks range filter (slider: 1-10marks)
  - Clear all filters button
- **Question Selection Interface**:
  - Checkbox for each question
  - 'Select All' and 'Deselect All' buttons
  - Selected questions counter: 'Selected: 15questions (Total: 75 marks)'
  - Bulk actions: 'Add Selected', 'Remove Selected'\n- **Selected Questions Panel**:
  - Right sidebar showing selected questions
  - Drag-and-drop to reorder questions
  - Remove button for each question
  - Real-time total marks calculation
  - Difficulty distribution indicator (pie chart)
  - Question type distribution indicator (bar chart)
- **Smart Selection Tools**:
  - 'Auto-select by Difficulty': Specify number of Easy/Medium/Hard questions\n  - 'Auto-select by Lesson': Ensure coverage of all lessons
  - 'Auto-select by Marks': Specify target total marks, system suggests questions
- **Question Preview**:
  - Click on question to view full details
  - Shows question text, images, options, correct answer, marks, difficulty
  - Edit button to modify question (opens in new tab)
\n**UI Layout**:
- Method selection tabs at top: 'From Question Paper' | 'From Question Bank'\n- Method A: Single column with dropdown and preview
- Method B: Three-column layout\n  - Left: Filter panel (20% width)
  - Center: Question list (50% width)
  - Right: Selected questions panel (30% width)
- Progress indicator: 'Step 2 of 4'
- Action buttons: 'Back', 'Save as Draft', 'Next'

#### 9.2.3 Step 3: Exam Settings Configuration
**Settings Panel**:
\n**1. Negative Marking Settings**
- **Enable Negative Marking** (Toggle switch)
  - Default: ON (if questions have minus marks defined)
  - If enabled: Use minus marks defined in questions
  - If disabled: No negative marking applied, all incorrect answers get 0 marks
- **Negative Marking Summary** (Read-only display)
  - Shows list of questions with negative marks
  - Format: 'Question 5 (MCQ): -0.25 marks for incorrect answer'
  - Total possible negative marks displayed
\n**2. Result Display Settings**
- **Show Results Immediately** (Toggle switch)
  - Default: OFF
  - If enabled: Students see results immediately after submission
  - If disabled: Results shown only after teacher publishes them
  - Warning message: 'Students will see their scores immediately. Manual grading for subjective questions will still be required.'
- **Allow Review of Answers** (Toggle switch)
  - Default: OFF
  - If enabled: Students can review correct answers after exam
  - If disabled: Students only see their total score and pass/fail status
  - Dependency: Only available if 'Show Results Immediately' is enabled

**3. Question Randomization Settings**
- **Randomize Question Order for Each Student** (Toggle switch)
  - Default: OFF
  - If enabled: Each student gets questions in different random order
  - Warning: 'Question numbers will be different for each student'
  - Preview option:'Preview Sample Randomization'
- **Randomize MCQ Options for Each Student** (Toggle switch)\n  - Default: OFF
  - If enabled: MCQ options (A, B, C, D) are shuffled differently for each student
  - Applies to: Multiple Choice, True/False, Multiple Response MCQ
  - Does not apply to: Match the Following (pairs remain intact)

**4. Late Submission Settings**
- **Allow Late Submission** (Toggle switch)
  - Default: OFF
  - If enabled: Students can submit after end time with penalty
- **Grace Period** (Number input in minutes, conditional)
  - Validation: 5-60 minutes
  - Only shown if 'Allow Late Submission' is enabled
  - Example: '10 minutes after exam end time'
- **Late Submission Penalty** (Number input in percentage, conditional)
  - Validation: 0-50%
  - Only shown if 'Allow Late Submission' is enabled
  - Example: '10% marks deduction'\n  - Calculation display: 'If student scores 80/100, final score will be 72/100 (10% penalty)'

**5. Exam Security Settings**
- **Browser Lock Mode** (Toggle switch, optional)
  - Default: OFF\n  - If enabled: Prevent students from switching tabs or windows during exam
  - Warning: 'Requires browser permission. May not work on all devices.'
- **Disable Copy-Paste** (Toggle switch, optional)
  - Default: OFF\n  - If enabled: Disable copy-paste in answer fields
- **Require Exam Password** (Toggle switch, optional)
  - Default: OFF
  - If enabled: Students must enter password to start exam
  - Password input field (conditional): 6-20 characters
  -'Generate Random Password' button
\n**6. Exam Monitoring Settings**
- **Track Student Activity** (Toggle switch)\n  - Default: ON
  - Tracks: Time spent per question, tab switches, answer changes
  - Activity log available to teacher after exam
- **Enable Proctoring** (Toggle switch, optional)
  - Default: OFF
  - If enabled: Requires webcam access (future feature)
  - Warning: 'Students will be notified about webcam monitoring'
\n**UI Layout**:
- Single column layout with collapsible sections
- Each setting group in a card with clear heading
- Toggle switches with descriptive labels and helper text
- Conditional fields appear with smooth animation
- Warning messages in yellow alert boxes
- Progress indicator: 'Step 3 of 4'
- Action buttons: 'Back', 'Save as Draft', 'Next'

#### 9.2.4 Step 4: Preview and Publish
**Preview Section**:
\n**1. Exam Summary Card**
- Exam Name\n- **Exam Type**: Practice Exam or School-Level Exam (badge)
- Class and Subject
- Sections: List of selected sections with student count
- Total Students: Aggregate count\n- Exam Duration: In minutes and hours
- Start Date/Time: Formatted display
- End Date/Time: Formatted display
- Exam Window: Duration between start and end (e.g., '3 days')
- Total Marks: Sum of all question marks
- Passing Marks: Value and percentage
- Total Questions: Count by type (e.g., '10 MCQ, 5 Short Answer, 2 Essay')
\n**2. Settings Summary Card**
- Negative Marking: Enabled/Disabled
- Show Results Immediately: Yes/No
- Allow Answer Review: Yes/No
- Randomize Questions: Yes/No
- Randomize MCQ Options: Yes/No
- Allow Late Submission: Yes/No (with grace period and penalty if enabled)
- Browser Lock Mode: Enabled/Disabled
- Exam Password: Set/Not Set
\n**3. Question List Preview**
- Display all questions in exam order
- For each question show:
  - Question number
  - Question text (truncated with'Read More')
  - Question type badge
  - Marks
  - Minus marks (if applicable)
  - Difficulty badge
- Expand/collapse all questions button
- Edit question button (opens question in edit mode)
- Remove question button\n- Reorder questions (drag-and-drop)
\n**4. Student View Preview**
- 'Preview as Student' button
- Opens modal showing exam interface as students will see it
- **Includes question palette panel, timer, question navigation, answer fields**
- Sample questions with randomization applied (if enabled)
- Close preview button

**5. Validation Checks**
- Automatic validation before publish:\n  - At least one question selected
  - Start date/time is in future
  - End date/time is after start date/time
  - At least one section selected
  - All required fields filled
- Validation errors displayed in red alert box
- Warnings displayed in yellow alert box (e.g., 'Exam window is very short')

**Action Buttons**:
- **Back**: Return to Step 3
- **Save as Draft**: Save exam without publishing
  - Confirmation message: 'Exam saved as draft. You can edit and publish it later.'
  - Redirect to Teacher/Principal Dashboard
- **For Practice Exams**:
  - **Schedule Exam**: Set exam to auto-publish at start time
    - Confirmation dialog: 'Exam will be automatically published on [Start Date/Time]. Students will be notified.'
    - Status changes to 'Scheduled'
  - **Publish Now**: Make exam immediately available to students
    - Confirmation dialog: 'Are you sure you want to publish this exam? Students will be able to access it immediately.'
    - Final validation check\n    - On success: 'Exam published successfully. Students have been notified.'
    - Status changes to 'Ongoing' (if within exam window) or 'Scheduled' (if before start time)
- **For School-Level Exams (Teacher only)**:
  - **Submit for Approval**: Submit exam to Principal for approval
    - Confirmation dialog: 'Are you sure you want to submit this exam for Principal approval? You will not be able to edit it until approval decision is made.'
    - Final validation check
    - On success: 'Exam submitted for approval. You will be notified when Principal reviews it.'
    - Status changes to 'Pending Approval'
    - Principal receives notification
- **For School-Level Exams (Principal only)**:
  - **Schedule Exam**: Set exam to auto-publish at start time (no approval needed)
  - **Publish Now**: Make exam immediately available to students (no approval needed)
\n**UI Layout**:
- Single column layout with cards\n- Summary cards at top\n- Question list in middle
- Action buttons at bottom (sticky footer)
- Progress indicator: 'Step 4 of 4 - Review & Publish'
\n### 9.3 Online Exam Database Structure

#### 9.3.1 Exams Table
**Table name**: online_exams

**Columns**:
- id (UUID, Primary Key)
- exam_name (Varchar(100), required)
- **exam_type (Enum: Practice, School-Level, default'Practice')**
  - Practice: No approval required
  - School-Level: Requires Principal approval (for teacher-created exams)
- **approval_status (Enum: Not Required, Pending, Approved, Rejected, default 'Not Required')**
  - Not Required: For practice exams and principal-created exams
  - Pending: School-level exam submitted by teacher, awaiting approval
  - Approved: School-level exam approved by principal
  - Rejected: School-level exam rejected by principal
- **approval_notes (Text, nullable)**
  - Stores rejection reason or modification requests from principal
- **approved_by (Foreign Key → users.id, principal, nullable)**
  - Principal who approved/rejected the exam
- **approval_date (Timestamp, nullable)**
  - Date and time when exam was approved/rejected\n- school_id (Foreign Key → schools.id, required)
- class_id (Foreign Key → classes.id, required)
- subject_id (Foreign Key → subjects.id, required)
- created_by (Foreign Key → users.id, teacher or principal, required)
- question_paper_id (Foreign Key → question_papers.id, nullable)
  - If exam created from question paper, stores paper ID
  - If exam created from question bank, null
- selected_questions (JSON array, required)
  - Stores question IDs and order
  - Format: [{question_id: 'uuid', order: 1, marks: 5}, ...]
- exam_duration (Integer, minutes, required)
- start_datetime (Timestamp with timezone, required)
- end_datetime (Timestamp with timezone, required)
- passing_marks (Integer, optional)
- instructions (Text, optional)
- negative_marking_enabled (Boolean, default true)
- show_results_immediately (Boolean, default false)
- allow_answer_review (Boolean, default false)
- randomize_questions (Boolean, default false)
- randomize_mcq_options (Boolean, default false)
- allow_late_submission (Boolean, default false)
- late_submission_grace_period (Integer, minutes, nullable)
- late_submission_penalty (Decimal(5,2), percentage, nullable)
- browser_lock_enabled (Boolean, default false)
- copy_paste_disabled (Boolean, default false)
- exam_password (Varchar(100), nullable, encrypted)
- track_student_activity (Boolean, default true)
- proctoring_enabled (Boolean, default false)
- exam_status (Enum: Draft, Pending Approval, Approved, Scheduled, Ongoing, Completed, Cancelled, Rejected, default 'Draft')\n- total_marks (Integer, calculated, required)
- total_questions (Integer, calculated, required)
- created_at (Timestamp, default CURRENT_TIMESTAMP)
- updated_at (Timestamp, default CURRENT_TIMESTAMP, on update CURRENT_TIMESTAMP)
- published_at (Timestamp, nullable)\n- auto_publish (Boolean, default false)
  - If true, exam auto-publishes at start_datetime
\n**Indexes**:
- idx_school_id (school_id)
- idx_created_by (created_by)
- idx_exam_status (exam_status)
- idx_exam_type (exam_type)
- idx_approval_status (approval_status)
- idx_start_datetime (start_datetime)
- idx_class_subject (class_id, subject_id)
\n**Foreign Key Relationships**:
- school_id → schools.id (CASCADE on delete)
- class_id → classes.id (CASCADE on delete)\n- subject_id → subjects.id (CASCADE on delete)
- created_by → users.id (SET NULL on delete)
- approved_by → users.id (SET NULL on delete)
- question_paper_id → question_papers.id (SET NULL on delete)
\n#### 9.3.2Exam Section Mapping Table
**Table name**: exam_sections

**Columns**:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)
- section_id (Foreign Key → sections.id, required)
- total_students (Integer, calculated)
  - Count of students in section at time of exam creation
- students_started (Integer, default 0)
- students_completed (Integer, default 0)
- created_at (Timestamp, default CURRENT_TIMESTAMP)
\n**Indexes**:
- idx_exam_id (exam_id)
- idx_section_id (section_id)
- unique_exam_section (exam_id, section_id) UNIQUE

**Foreign Key Relationships**:
- exam_id → online_exams.id (CASCADE on delete)
- section_id → sections.id (CASCADE on delete)

#### 9.3.3 Student Exam Attempts Table
**Table name**: student_exam_attempts

**Columns**:
- id (UUID, Primary Key)
- exam_id (Foreign Key → online_exams.id, required)
- student_id (Foreign Key → users.id, required)
- start_time (Timestamp, nullable)
  - When student clicked 'Start Exam'
- end_time (Timestamp, nullable)
  - When student clicked 'Submit' or time expired
- submission_time (Timestamp, nullable)\n  - Actual submission timestamp
- is_late_submission (Boolean, default false)
- time_taken (Integer, minutes, calculated)
  - Difference between start_time and submission_time
- student_answers (JSON array, required)
  - Format: [{question_id: 'uuid', answer: 'text or array', is_correct: true/false/null, marks_awarded: 5, time_spent: 120}]
- randomized_question_order (JSON array, nullable)
  - Stores question order for this student if randomization enabled
  - Format: ['uuid1', 'uuid2', 'uuid3', ...]
- randomized_mcq_options (JSON object, nullable)
  - Stores shuffled options for each MCQ if randomization enabled
  - Format: {question_id: {A: 'option2', B: 'option1', C: 'option4', D: 'option3'}}
- total_marks_obtained (Decimal(10,2), calculated)
- percentage (Decimal(5,2), calculated)
- pass_fail_status (Enum: Pass, Fail, Pending, default 'Pending')
- attempt_status (Enum: Not Started, In Progress, Submitted, Graded, default 'Not Started')
- auto_graded_marks (Decimal(10,2), default 0)
  - Marks from auto-graded questions (MCQ, True/False, Multiple Response, Match the Following)
- manual_graded_marks (Decimal(10,2), default 0)
  - Marks from manually graded questions (Short Answer, Essay)\n- pending_manual_grading (Boolean, default false)
  - True if exam has subjective questions not yet graded
- teacher_feedback (Text, optional)
- graded_by (Foreign Key → users.id, teacher, nullable)
- graded_at (Timestamp, nullable)
- ip_address (Varchar(45), nullable)
  - Student's IP address at exam start
- device_info (JSON, nullable)
  - Browser, OS, device type
- activity_log (JSON array, nullable)
  - Tracks: tab switches, answer changes, time per question
  - Format: [{timestamp: '2025-01-15 10:30:00', action: 'tab_switch', details: 'Switched to another tab'}]
- suspicious_activity_count (Integer, default 0)
- Count of suspicious activities (tab switches, long inactivity, etc.)
- created_at (Timestamp, default CURRENT_TIMESTAMP)
- updated_at (Timestamp, default CURRENT_TIMESTAMP, on update CURRENT_TIMESTAMP)
\n**Indexes**:
- idx_exam_id (exam_id)
- idx_student_id (student_id)
- idx_attempt_status (attempt_status)
- unique_student_exam (exam_id, student_id) UNIQUE
  - Ensures one attempt per student per exam

**Foreign Key Relationships**:
- exam_id → online_exams.id (CASCADE on delete)
- student_id → users.id (CASCADE on delete)
- graded_by → users.id (SET NULL on delete)
\n### 9.4 Student Exam Taking Interface

#### 9.4.1 Student Dashboard - My Exams Section
**Dashboard Card:'My Exams'**
- Display on student dashboard after login
- Shows count of exams by status:\n  - Upcoming: X exams
  - Ongoing: Y exams
  - Completed: Z exams
- Click card to open'My Exams' page
\n**My Exams Page Layout**:
- Three tabs:'Upcoming' | 'Ongoing' | 'Completed'
- Default tab: 'Ongoing' (if any ongoing exams), else 'Upcoming'
\n**Upcoming Exams Tab**:
- List of scheduled exams not yet started
- Each exam card shows:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Subject
  - Class and Section
  - Start date and time (with countdown: 'Starts in 2 days5 hours')
  - End date and time\n  - Duration
  - Total marks
  - Status badge: 'Upcoming' (blue)\n  - Instructions button (opens modal with exam instructions)
  - 'Set Reminder' button (optional feature)
- Sort options: Start Date (Nearest First/Farthest First), Subject A-Z\n- Filter: By Subject, By Exam Type\n\n**Ongoing Exams Tab**:
- List of exams currently available (between start and end datetime)
- Each exam card shows:\n  - Exam name
  - Exam type badge (Practice/School-Level)
  - Subject
  - Class and Section
  - Time remaining (countdown: 'Ends in 1 day 3 hours')
  - Duration
  - Total marks
  - Status badge: 'Ongoing' (green) or 'In Progress' (orange if student has started)
  - Progress indicator: 'Answered: 10/20questions'
  - Action button:\n    - 'Start Exam' (if not started)
    - 'Resume Exam' (if in progress)
    - 'View Results' (if submitted and results published)
- Prominent display for exams ending soon (within 24 hours)
- Sort options: End Date (Nearest First), Subject A-Z
- Filter: By Subject, By Exam Type, By Status (Not Started/In Progress/Submitted)\n
**Completed Exams Tab**:
- List of exams already submitted or past end datetime
- Each exam card shows:\n  - Exam name
  - Exam type badge (Practice/School-Level)
  - Subject
  - Class and Section
  - Submission date and time
  - Duration taken
  - Total marks
  - Marks obtained (if results published)
  - Percentage (if results published)
  - Pass/Fail status badge (if results published)
  - Status badge: 'Completed' (purple)\n  - Action button:
    - 'View Results' (if results published)
    - 'Awaiting Results' (if results not published, disabled button)
- Sort options: Submission Date (Recent First/Oldest First), Subject A-Z
- Filter: By Subject, By Exam Type, By Result (Pass/Fail/Awaiting)

#### 9.4.2 Exam Taking Interface\n**Pre-Exam Screen**:
- Display before student starts exam
- Shows:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Subject
  - Duration
  - Total marks
  - Passing marks
  - Instructions (if provided by teacher)
  - Important notes:\n    - 'You have only one attempt for this exam'
    - 'Exam will auto-submit when time expires'
    - 'Make sure you have stable internet connection'
    - 'Do not close browser or switch tabs' (if browser lock enabled)
  - Exam password input (if required)
  - Checkbox: 'I have read and understood the instructions'
  - 'Start Exam' button (enabled only after checkbox is checked)

**Enhanced Exam Interface Layout**:
\n**Header Section** (Sticky at top):
- Exam name\n- Subject
- **Timer (countdown showing remaining time)**
  - Large, prominent display
  - Color coding:\n    - Green: More than 10 minutes remaining
    - Orange: 5-10 minutes remaining
    - Red: Less than 5 minutes remaining
  - Warning at5 minutes: 'Only 5 minutes remaining!'
  - Blinking animation when less than 1 minute\n- 'Submit Exam' button (always visible)
\n**Left Sidebar - Question Palette Panel** (Collapsible):
- **Question navigation panel with visual status indicators**
- Display all question numbers in grid format (e.g., 5x4grid for 20 questions)
- Each question number is a clickable button
- **Color-coded status indicators**:
  - **Green**: Answered\n  - **Red**: Not Answered
  - **Orange**: Marked for Review
  - **Gray**: Not Visited
- **Legend showing color meanings**
- **Summary counts**:
  - Answered: X\n  - Not Answered: Y
  - Marked for Review: Z
  - Not Visited: W\n- 'Collapse' button to hide sidebar and maximize question area
- 'Expand' button to show sidebar when collapsed

**Main Content Area**:
- Question display section
- Question number and total (e.g., 'Question 5 of 20')
- Question text (with proper formatting)
- Question images (if present, with zoom functionality)
- Marks for question (e.g., '5 marks')
- Negative marks warning (if applicable, e.g., 'Incorrect answer: -0.25marks')
\n**Answer Input Section** (Based on question type):
\n**Multiple Choice Questions**:
- Radio buttons for options (A, B, C, D)\n- Option text with proper formatting
- Option images (if present)
- Only one option can be selected
- Selected option highlighted\n\n**Multiple Response MCQ**:
- Checkboxes for options (A, B, C, D)\n- Option text with proper formatting\n- Multiple options can be selected
- Selected options highlighted
- Instruction: 'Select all correct answers'

**True/False Questions**:
- Two radio buttons: 'True' and 'False'
- Large, clear buttons
\n**Short Answer Questions**:
- Text input field (single line)
- Character limit: 500 characters
- Character counter displayed
- Placeholder: 'Type your answer here'\n\n**Essay Questions**:
- Text area (multi-line)
- Character limit: 2000 characters
- Character counter displayed
- Placeholder: 'Write your essay here'
- Basic formatting options: Bold, Italic, Underline (optional)

**Match the Following Questions**:
- Two columns: Left (items) and Right (options)
- Drag-and-drop interface or dropdown selection
- Visual feedback for matched pairs
- 'Clear All Matches' button

**Action Buttons** (Below answer section):
- 'Mark for Review' button\n  - Marks question for later review
  - Changes status to 'Marked for Review' (orange in palette)
- 'Clear Answer' button
  - Clears current answer
  - Confirmation dialog: 'Are you sure you want to clear your answer?'
- 'Previous' button
  - Navigate to previous question
  - Saves current answer automatically
- 'Next' button
  - Navigate to next question
  - Saves current answer automatically
  - If last question, button text changes to 'Review Answers'

**Auto-Save Functionality**:
- Answers auto-saved every 30 seconds
- Visual indicator: 'Last saved: 10 seconds ago'
- Save on navigation (Previous/Next)\n- Save on 'Mark for Review'\n\n**Browser Lock Mode** (If enabled):
- Detect tab switches and window focus loss
- Warning message on first tab switch: 'Warning: Switching tabs is not allowed. This activity has been logged.'
- Count tab switches and log in activity log
- After 3 tab switches, show warning: 'Multiple tab switches detected. Your exam may be flagged for review.'

**Activity Tracking**:
- Track time spent on each question
- Track answer changes
- Track tab switches (if browser lock enabled)
- Track long periods of inactivity (more than 5 minutes)
- All activity logged in database

#### 9.4.3 Exam Submission\n**Submit Button Click**:
- Open'Submit Exam' confirmation dialog
\n**Submit Confirmation Dialog**:
- Title: 'Submit Exam?'
- Summary display:
  - Total Questions: 20
  - Answered: 15 (green)
  - Not Answered: 3 (red)
  - Marked for Review: 2 (orange)
- Warning messages:
  - If unanswered questions: 'You have 3 unanswered questions. Are you sure you want to submit?'\n  - If marked for review: 'You have 2 questions marked for review. Do you want to review them before submitting?'
- Action buttons:
  - 'Review Answers': Close dialog and return to exam
  - 'Submit Exam': Confirm submission
  - 'Cancel': Close dialog
\n**Submission Process**:
- Show loading spinner: 'Submitting your exam...'
- Save all answers to database
- Calculate submission time
- Check if late submission\n- Apply late submission penalty if applicable
- **Trigger auto-grading for objective questions**
- Update attempt status to 'Submitted'
- Show success message: 'Exam submitted successfully!'
- Redirect based on settings:\n  - If 'Show Results Immediately' enabled: Redirect to Results page
  - If disabled: Redirect to 'My Exams' page with message: 'Your exam has been submitted. Results will be published by your teacher.'

**Auto-Submission** (When time expires):
- 5-minute warning: Alert message: 'Only 5 minutes remaining!'
- 1-minute warning: Alert message: 'Only 1 minute remaining! Your exam will auto-submit when time expires.'
- At time expiry:\n  - Automatically submit exam
  - Save all current answers
  - Show message: 'Time expired. Your exam has been auto-submitted.'
  - Redirect to 'My Exams' page

**Late Submission** (If enabled):
- After end time, show message: 'Exam time has expired. You have X minutes grace period to submit with Y% penalty.'
- Display countdown for grace period
- 'Submit with Penalty' button
- After grace period expires:
  - Automatically submit exam
  - Apply maximum penalty\n  - Show message: 'Grace period expired. Your exam has been auto-submitted with penalty.'
\n#### 9.4.4 Exam Results View (Student)
**Results Page Layout**:\n\n**Results Summary Card** (Top section):
- Exam name\n- Exam type badge (Practice/School-Level)
- Subject
- Submission date and time
- Time taken (e.g., '1 hour 25 minutes')
- Total marks: XX\n- Marks obtained: YY
- Percentage: ZZ%
- Pass/Fail status badge:\n  - Green badge: 'Passed' (if marks >= passing marks)
  - Red badge: 'Failed' (if marks < passing marks)
- Rank in class (optional, if enabled by teacher)
  - Display:'Your Rank: 5out of 30 students'
- Late submission indicator (if applicable):
  - Orange badge: 'Late Submission'\n  - Penalty applied: 'X% penalty applied'
\n**Performance Analysis Card** (If enabled):
- **Detailed performance breakdown**:
  - Marks breakdown by question type:\n    - Multiple Choice: X/Y marks
    - True/False: X/Y marks\n    - Short Answer: X/Y marks
    - Essay: X/Y marks
    - Match the Following: X/Y marks
    - Multiple Response MCQ: X/Y marks
  - Difficulty-wise performance:
    - Easy questions: X/Y correct
    - Medium questions: X/Y correct
    - Hard questions: X/Y correct
  - Negative marks deducted: X marks (if applicable)
  - **Performance charts**:
    - Bar chart showing marks by question type
    - Pie chart showing difficulty distribution
    - Line chart showing time spent per question
\n**Teacher Feedback Section** (If provided):
- Display teacher's overall feedback
- Format: Text with proper line breaks
- Feedback date and time
\n**Question-wise Results Section** (If 'Allow Answer Review' enabled):
- Display all questions with student's answers and correct answers
- For each question show:
  - Question number
  - Question text (with images if present)
  - Question type badge
  - Marks allocated
  - Student's answer:\n    - Highlighted in green if correct
    - Highlighted in red if incorrect
    - For subjective questions: Display student's answer with marks awarded and teacher's feedback
  - Correct answer (for objective questions):
    - Display correct option(s)
    - Explanation (if provided by teacher, future feature)
  - Marks obtained:\n    - Green badge: '+X marks' (if correct)
    - Red badge: '-X marks' (if negative marking applied)
    - Orange badge: 'X/Y marks' (for partially correct or manually graded)
- Filter options:
  - Show All Questions\n  - Show Correct Answers Only
  - Show Incorrect Answers Only
  - Show Subjective Questions Only
- Expand/collapse all questions button

**Action Buttons**:
- 'Download Result as PDF' button
- 'Back to My Exams' button
\n**Results Not Published View** (If results not yet published):
- Display message: 'Your exam has been submitted successfully. Results will be published by your teacher soon.'
- Show submission details:\n  - Exam name
  - Subject
  - Submission date and time
  - Time taken\n-'Back to My Exams' button\n
### 9.5 Teacher Exam Management Interface

#### 9.5.1 Teacher Dashboard - My Exams Section
**Dashboard Card: 'Online Exams'**
- Display on teacher dashboard after login
- Shows count of exams by status:
  - Draft: X exams
  - Pending Approval: Y exams (school-level exams awaiting principal approval)
  - Scheduled: Z exams\n  - Ongoing: W exams
  - Completed: V exams
- Click card to open 'My Exams' page
\n**My Exams Page Layout**:
- Five tabs: 'Draft' | 'Pending Approval' | 'Scheduled' | 'Ongoing' | 'Completed'
- Default tab: 'Ongoing' (if any ongoing exams), else 'Scheduled'
-'Create New Exam' button (top right, always visible)

**Draft Exams Tab**:
- List of unpublished exams
- Each exam card shows:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Class and Subject
  - Sections (count)
  - Total marks
  - Total questions
  - Created date
  - Last modified date
  - Status badge: 'Draft' (gray)
  - Action buttons:
    - 'Edit': Open exam in edit mode
    - 'Duplicate': Create a copy of the exam
    - **'Delete': Delete exam with confirmation**
    - 'Publish': Publish exam (opens Step 4preview)
- Sort options: Last Modified (Recent First/Oldest First), Name A-Z
- Search: By exam name\n\n**Pending Approval Tab** (New):
- List of school-level exams submitted for principal approval
- Each exam card shows:
  - Exam name\n  - Exam type badge: 'School-Level' (blue)
  - Class and Subject
  - Sections with student count
  - Requested start date/time
  - Requested end date/time
  - Total marks
  - Submission date
  - Status badge: 'Pending Approval' (orange)
  - Action buttons:
    - 'View Details': Open exam details page (read-only)
    - 'Withdraw': Withdraw exam from approval process (returns to draft)
- Sort options: Submission Date (Recent First/Oldest First), Start Date (Nearest First)
- Filter: By Class, By Subject\n- Note: 'Exams in this tab are awaiting Principal approval. You will be notified when approval decision is made.'

**Scheduled Exams Tab**:
- List of published exams not yet started (before start datetime)
- Includes both practice exams and approved school-level exams
- Each exam card shows:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Class and Subject
  - Sections with student count (e.g., 'Section A (30), Section B (28)')
  - Start date and time (with countdown: 'Starts in 2 days5 hours')
  - End date and time\n  - Duration
  - Total marks
  - Status badge: 'Scheduled' (blue)
  - Approval badge (for school-level exams): 'Approved by [Principal Name]'
  - Action buttons:\n    - 'View Details': Open exam details page\n    - 'Edit': Edit exam settings (limited editing allowed)
    - 'Cancel Exam': Cancel scheduled exam with confirmation
    - **'Delete': Delete exam with confirmation (only if no students have started)**
    - 'Notify Students': Send reminder notification to students
- Sort options: Start Date (Nearest First/Farthest First), Name A-Z
- Filter: By Class, By Subject, By Exam Type

**Ongoing Exams Tab**:
- List of exams currently active (between start and end datetime)
- Each exam card shows:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Class and Subject\n  - Sections with student count
  - Time remaining (countdown: 'Ends in 1 day 3 hours')
  - Duration
  - Total marks
  - Student participation:\n    - Total students: 58
    - Started: 45 (green)
    - In Progress: 30 (orange)
    - Completed: 15 (purple)
    - Not Started: 13 (gray)
  - Progress bar showing completion percentage
  - Status badge: 'Ongoing' (green)
  - Action buttons:
    - 'Monitor Live': Open real-time monitoring dashboard
    - 'View Details': Open exam details page
    - 'Extend Time': Extend exam end time (with confirmation)
    - 'End Exam Early': End exam before scheduled time (with confirmation)
- Auto-refresh every 30 seconds to show live updates
- Sort options: End Date (Nearest First), Name A-Z
- Filter: By Class, By Subject, By Exam Type
- **Note**: Delete button not available for ongoing exams
\n**Completed Exams Tab**:
- List of exams past end datetime or manually ended
- Each exam card shows:\n  - Exam name
  - Exam type badge (Practice/School-Level)
  - Class and Subject
  - Sections with student count
  - End date and time
  - Duration
  - Total marks
  - Student participation:
    - Total students: 58
    - Completed: 55 (purple)
    - Not Attempted: 3 (gray)
  - Grading status:
    - Auto-graded: 55 students
    - Pending manual grading: 20 students (if subjective questions present)
    - Fully graded: 35 students
  - Average score: XX%
  - Pass rate: YY%
  - Status badge: 'Completed' (purple)
  - Action buttons:
    - 'View Results': Open results and analytics page
    - 'Grade Answers': Open manual grading interface (if pending)
    - 'Publish Results': Publish results to students (if not published)\n    - 'Export Results': Download results as Excel/CSV
    - 'View Analytics': Open detailed analytics dashboard
    - **'Delete': Delete exam with confirmation (only if no students have attempted or after results are published and archived)**
- Sort options: End Date (Recent First/Oldest First), Name A-Z
- Filter: By Class, By Subject, By Exam Type, By Grading Status (Fully Graded/Pending Grading)

#### 9.5.2 Exam Monitoring Interface
**Real-time Monitoring Dashboard**:
- Accessible from 'Monitor Live' button on ongoing exams
- Auto-refresh every 10 seconds
\n**Dashboard Layout**:
\n**Overview Cards** (Top section):
- Total Students Assigned: 58
- Students Started: 45 (77%)
  - Green progress bar\n- Students In Progress: 30 (52%)
  - Orange progress bar
- Students Completed: 15 (26%)
  - Purple progress bar
- Students Not Started: 13 (22%)
  - Gray progress bar
- Average Time Taken: 45 minutes (for completed students)
- Average Score: 72% (for completed students, if auto-graded)
\n**Live Student Status Table**:
- Columns:\n  - Student Name
  - Section
  - Status (Not Started/In Progress/Completed)\n    - Color-coded badges
  - Start Time
  - Time Elapsed (for in-progress students)
    - Real-time countdown
  - Questions Answered (e.g., '15/20')
  - Current Question (for in-progress students)
  - Submission Time (for completed students)
  - Score (for completed students, if auto-graded)
  - Suspicious Activity (icon with count, if any)
- Sort options: Name A-Z, Status, Start Time, Score
- Filter options: By Section, By Status\n- Search: By student name\n- Refresh button (manual refresh)

**Student Detail View** (Click on student row):
- Opens modal or side panel\n- Shows:
  - Student name and photo
  - Section
  - Current status
  - Start time
  - Time elapsed
  - Questions answered: X/Y
  - Current question number (if in progress)
  - Answer summary:\n    - Answered: X (green)
    - Not Answered: Y (red)
    - Marked for Review: Z (orange)
  - Activity log:
    - List of activities with timestamps
    - Tab switches, answer changes, long inactivity periods
  - Suspicious activity count\n  - IP address\n  - Device info (browser, OS)\n- Action buttons:
  - 'View Full Activity Log': Open detailed activity log
  - 'Flag for Review': Mark student for manual review
  - 'Send Message': Send message to student (future feature)
  - 'Close'\n\n**Live Updates**:
- Dashboard refreshes automatically every 10 seconds
- Visual notification when student starts exam
- Visual notification when student submits exam
- Sound notification option (toggle on/off)
\n**Export Options**:
- 'Export Current Status': Download current monitoring data as Excel/CSV
- Includes: Student name, section, status, start time, time elapsed, questions answered, submission time, score\n\n#### 9.5.3 Exam Grading Interface\n**Grading Dashboard**:\n- Accessible from 'Grade Answers' button on completed exams
- Only shown if exam has subjective questions (Short Answer, Essay)\n\n**Dashboard Layout**:

**Grading Overview Cards** (Top section):
- Total Students: 58
- Auto-graded: 58 (100%)
  - All objective questions graded automatically
- Pending Manual Grading: 20 students (34%)
  - Students with subjective questions not yet graded
- Fully Graded: 38 students (66%)
  - All questions graded (objective + subjective)
- Average Score (Auto-graded): 65%
- Average Score (Fully Graded): 72%\n
**Grading Mode Selection**:
- Two modes available:
  - **Student-wise Grading**: Grade all questions for one student at a time
  - **Question-wise Grading**: Grade same question for all students in sequence
- Toggle switch to select mode
\n**Student-wise Grading Mode**:
\n**Student List** (Left panel,30% width):
- List of students with pending manual grading
- Each student row shows:
  - Student name\n  - Section
  - Auto-graded marks: X/Y
  - Pending questions: Z
  - Grading status:\n    - Red badge: 'Not Graded'
    - Orange badge: 'Partially Graded'
    - Green badge: 'Fully Graded'\n- Click on student to load their answers in grading panel
- Filter: By Section, By Grading Status
- Sort: Name A-Z, Auto-graded Marks (High to Low)\n
**Grading Panel** (Right panel, 70% width):
- Display selected student's subjective answers
- For each subjective question show:
  - Question number and text
  - Question images (if present)
  - Marks allocated: X marks
  - Student's answer:\n    - Display in read-only text area
    - Word count\n  - Marks input field:\n    - Number input (0 to maximum marks)
    - Validation: Cannot exceed maximum marks
    - Decimal marks allowed (e.g., 3.5 out of 5)
  - Feedback text area (optional):
    - Teacher can provide specific feedback for this answer
    - Character limit: 500 characters
  - 'Save Marks' button (for this question)\n- Navigation buttons:
  - 'Previous Question': Move to previous subjective question
  - 'Next Question': Move to next subjective question
  - 'Previous Student': Move to previous student in list
  - 'Next Student': Move to next student in list
-'Save and Next Student' button:\n  - Saves all marks and feedback for current student
  - Moves to next student with pending grading
- Progress indicator: 'Grading Question2 of 3 for Student 5of 20'

**Question-wise Grading Mode**:\n
**Question Selection** (Top section):
- Dropdown to select subjective question
- Shows:'Question X: [Question text truncated] (Y marks)'
- Display total students with this question: Z students
\n**Student Answer List** (Scrollable):
- Display all students' answers for selected question
- Each answer card shows:
  - Student name and section
  - Student's answer (in read-only text area)
  - Word count
  - Marks input field (0 to maximum marks)
  - Feedback text area (optional)\n  - 'Save Marks' button\n- Cards arranged in grid (2-3 columns)
- Filter: By Section, By Grading Status (Graded/Not Graded)
- Sort: Name A-Z, Section\n
**Bulk Grading Tools**:
- 'Assign Same Marks to All' button:\n  - Opens dialog to enter marks\n  - Applies same marks to all ungraded answers for this question
  - Confirmation required
- 'Copy Feedback to All' button:
  - Copies feedback from one answer to all answers\n  - Useful for common feedback
\n**Grading Progress**:
- Progress bar showing grading completion\n- 'Graded: X/Y students for this question'\n\n**Auto-grading Logic**:
- **Triggered immediately after student submits exam**
- For each objective question:
  - **Multiple Choice**: Compare student's answer with correct_answer
    - If match: Award full marks\n    - If no match: Award 0 marks or apply negative marking
  - **True/False**: Same as Multiple Choice
  - **Multiple Response MCQ**: Compare student's selected options with correct_answer array
    - If all correct options selected and no incorrect options selected: Award full marks
    - If partially correct: Award partial marks (proportional to correct selections)
    - If all incorrect: Award 0 marks or apply negative marking
  - **Match the Following**: Compare student's pairs with correct_answer array
    - Award marks proportionally based on correct pairs
    - Example: 4 pairs, 1 mark each, student gets 3 correct = 3 marks
- Calculate auto_graded_marks\n- Update attempt_status to 'Submitted'
- If exam has no subjective questions:\n  - Calculate total_marks_obtained
  - Determine pass_fail_status
  - Update attempt_status to 'Graded'
  - If'Show Results Immediately' enabled: Make results visible to student
- If exam has subjective questions:
  - Set pending_manual_grading to true
  - Wait for teacher to manually grade
\n**Manual Grading Workflow**:
- Teacher opens grading interface
- Selects grading mode (Student-wise or Question-wise)
- For each subjective answer:
  - Review student's answer
  - Assign marks (0 to maximum)
  - Optionally provide feedback
  - Click 'Save Marks'\n- System updates manual_graded_marks\n- When all subjective questions graded for a student:
  - Calculate total_marks_obtained = auto_graded_marks + manual_graded_marks
  - Apply late submission penalty if applicable
  - Calculate percentage
  - Determine pass_fail_status
  - Update attempt_status to 'Graded'
  - Set pending_manual_grading to false
- Teacher can publish results after grading\n
**Publish Results**:
- 'Publish Results' button (available after grading)
- Options:
  - Publish results for all graded students
  - Publish results for selected students
- Confirmation dialog: 'Are you sure you want to publish results? Students will be able to view their scores and feedback.'
- On publish:
  - Results become visible to students
  - Students receive notification
  - Cannot unpublish (one-way action)

#### 9.5.4 Exam Analytics and Reports
**Analytics Dashboard**:
- Accessible from 'View Analytics' button on completed exams
\n**Dashboard Layout**:
\n**Overview Section** (Top cards):
- Total Students: 58
- Students Completed: 55 (95%)
- Students Not Attempted: 3 (5%)\n- Average Score: 72.5%
- Highest Score: 95%
- Lowest Score: 35%
- Pass Rate: 85% (based on passing marks)
- Average Time Taken: 52 minutes
\n**Score Distribution Chart**:
- Histogram showing score ranges
- X-axis: Score ranges (0-10%, 10-20%, ..., 90-100%)
- Y-axis: Number of students
- Color-coded bars:\n  - Red: Below passing marks\n  - Green: Above passing marks
\n**Performance by Question Type**:
- Table showing average performance for each question type
- Columns:
  - Question Type
  - Total Questions
  - Average Marks Obtained
  - Average Marks Allocated
  - Success Rate (%)
- Example:\n  - Multiple Choice: 10 questions, Avg7.5/10, 75%
  - Short Answer: 5 questions, Avg 3.2/5, 64%
  - Essay: 2 questions, Avg 6.8/10, 68%

**Performance by Difficulty**:
- Table showing average performance by difficulty level
- Columns:\n  - Difficulty\n  - Total Questions
  - Average Marks Obtained
  - Average Marks Allocated\n  - Success Rate (%)\n- Example:
  - Easy: 8 questions, Avg 6.5/8, 81%
  - Medium: 10 questions, Avg 6.2/10, 62%
  - Hard: 5 questions, Avg 2.1/5, 42%

**Question-wise Analysis**:
- Table showing performance for each question
- Columns:
  - Question Number
  - Question Type
  - Difficulty\n  - Marks\n  - Students Answered Correctly
  - Students Answered Incorrectly
  - Success Rate (%)
  - Average Marks Obtained
- Sort options: Question Number, Success Rate (High to Low/Low to High)
- Highlight:\n  - Green row: Questions with >80% success rate
  - Red row: Questions with <40% success rate
- Click on question to view detailed analysis:\n  - Question text
  - Correct answer
  - Distribution of student answers (for MCQ)
  - Common mistakes
  - List of students who answered incorrectly

**Student Performance Table**:
- List of all students with their scores
- Columns:
  - Rank
  - Student Name
  - Section
  - Marks Obtained
  - Total Marks
  - Percentage
  - Pass/Fail Status
  - Time Taken
  - Submission Status (On Time/Late)
- Sort options: Rank, Name A-Z, Marks (High to Low), Time Taken
- Filter: By Section, By Pass/Fail Status, By Submission Status
- Search: By student name
- Click on student to view detailed performance:\n  - Question-wise marks
  - Strengths and weaknesses
  - Comparison with class average
\n**Section-wise Comparison** (If multiple sections):
- Table comparing performance across sections
- Columns:
  - Section
  - Total Students
  - Average Score
  - Pass Rate
  - Highest Score
  - Lowest Score
- Bar chart showing average scores by section

**Time Analysis**:
- Average time taken by students\n- Time distribution chart (histogram)
- Students who took longest/shortest time
- Correlation between time taken and score (scatter plot)

**Negative Marking Impact** (If enabled):
- Total negative marks deducted across all students
- Average negative marks per student
- Students most affected by negative marking
- Comparison: Scores with vs without negative marking

**Suspicious Activity Report** (If activity tracking enabled):
- List of students with suspicious activities
- Columns:
  - Student Name
  - Section
  - Tab Switches
  - Long Inactivity Periods
  - Rapid Answer Changes
  - Total Suspicious Activities
- Flag students with high suspicious activity count
- Detailed activity log for each student

**Export Options**:
- 'Export Full Report as PDF': Comprehensive report with all analytics
- 'Export Student Results as Excel': Detailed student-wise results
- 'Export Question Analysis as Excel': Question-wise performance data
- 'Export Class Summary as PDF': Summary report for class records

**Print Options**:
- 'Print Analytics Dashboard': Print-friendly version of dashboard
- 'Print Student Results': Print student performance table
\n### 9.6 Principal Exam Monitoring Interface
\n#### 9.6.1 Principal Dashboard - Online Exams Overview
**Dashboard Card:'Online Exams'**\n- Display on principal dashboard after login
- Shows school-wide exam statistics:\n  - Total Exams This Month: X
  - Exams Ongoing: Y
  - Exams Scheduled: Z
  - Pending Approvals: W (school-level exams awaiting approval)
  - Average Participation Rate: V%
- Click card to open'Online Exams' page

**Online Exams Page Layout**:
- Four tabs: 'All Exams' | 'Pending Approvals' | 'Ongoing' | 'Completed'
- Default tab: 'Pending Approvals' (if any pending), else 'Ongoing'
\n**All Exams Tab**:
- List of all exams created by teachers and principal in school
- Each exam card shows:\n  - Exam name
  - Exam type badge (Practice/School-Level)\n  - Created by (Teacher/Principal name)
  - Class and Subject
  - Sections
  - Start and end date/time
  - Status badge (Draft/Pending Approval/Approved/Scheduled/Ongoing/Completed/Cancelled/Rejected)
  - Approval status (for school-level exams created by teachers)
  - Total students
  - Participation rate (for ongoing/completed exams)
  - Average score (for completed exams)
  - Action buttons:\n    - 'View Details': Open exam details page
    - 'View Analytics': Open analytics dashboard (for completed exams)
    - **'Delete': Delete exam (for self-created exams only, with restrictions)**
- Filter options:\n  - By Teacher (dropdown showing all teachers)
  - By Class (dropdown)\n  - By Subject (dropdown)\n  - By Exam Type (dropdown: All, Practice, School-Level)
  - By Status (dropdown: All, Draft, Pending Approval, Approved, Scheduled, Ongoing, Completed, Cancelled, Rejected)\n  - By Date Range (date picker: From Date, To Date)
- Search: By exam name or exam ID
- Sort options: Creation Date (Recent First/Oldest First), Start Date, Teacher Name A-Z\n
**Pending Approvals Tab**:
- Displays content from Section 5.8 (Exam Approvals Card)
- List of school-level exams awaiting approval\n- Approval workflow interface\n- Quick approve, review, reject options
- Approval history\n
**Ongoing Exams Tab**:
- List of exams currently active\n- Each exam card shows:
  - Exam name
  - Exam type badge (Practice/School-Level)
  - Created by (Teacher/Principal name)
  - Class and Subject
  - Sections
  - Time remaining (countdown)\n  - Total students
  - Student participation:\n    - Started: X (Y%)
    - In Progress: X (Y%)
    - Completed: X (Y%)
- Not Started: X (Y%)
  - Progress bar
  - Status badge:'Ongoing' (green)
  - Action buttons:
    - 'Monitor Live': Open real-time monitoring dashboard (read-only)
    - 'View Details': Open exam details page
- Auto-refresh every 30 seconds
- Filter: By Teacher, By Class, By Subject, By Exam Type\n- Sort: End Date (Nearest First), Teacher Name A-Z
- **Note**: Delete button not available for ongoing exams

**Completed Exams Tab**:
- List of exams past end datetime
- Each exam card shows:\n  - Exam name
  - Exam type badge (Practice/School-Level)
  - Created by (Teacher/Principal name)\n  - Class and Subject
  - Sections
  - End date and time
  - Total students\n  - Participation rate: X% (Y students completed)
  - Average score: Z%
  - Pass rate: W%
  - Status badge: 'Completed' (purple)
  - Action buttons:
    - 'View Results': Open results summary\n    - 'View Analytics': Open detailed analytics dashboard
    - 'Export Results': Download results as Excel/CSV
    - **'Delete': Delete exam (for self-created exams only, with restrictions)**
- Filter: By Teacher, By Class, By Subject, By Exam Type, By Date Range
- Sort: End Date (Recent First/Oldest First), Average Score (High to Low), Teacher Name A-Z
\n**Exam Details Page** (Principal view):
- Read-only view of exam configuration
- Sections:
  - Exam Information: Name, Exam Type, Class, Subject, Sections, Duration, Start/End DateTime, Passing Marks, Instructions
  - Approval Information (for school-level exams): Approval status, Approved by, Approval date, Approval notes
  - Exam Settings: Negative Marking, Show Results Immediately, Allow Answer Review, Randomization settings, Late Submission settings, Security settings
  - Question List: All questions with marks, difficulty, question type\n  - Student Participation: List of students with status (Not Started/In Progress/Completed)
  - Results Summary (for completed exams): Average score, pass rate, score distribution
- Action buttons:
  - 'View Analytics': Open analytics dashboard
  - 'Export Results': Download results\n  - 'Back to Exams'\n
#### 9.6.2 School-wide Exam Analytics
**Analytics Dashboard** (Principal view):
- Accessible from Principal Dashboard or Online Exams page
- Shows aggregated analytics for all exams in school
\n**Dashboard Layout**:

**Overview Cards** (Top section):
- Total Exams Conducted: X (this month/this year)
- Practice Exams: Y\n- School-Level Exams: Z
- Total Students Participated: W
- Average Exam Score: V% (across all exams)
- Average Pass Rate: U%
- Most Active Teacher: [Teacher Name] (X exams created)
- Most Exams by Subject: [Subject Name] (Y exams)\n\n**Charts and Graphs**:
\n**1. Exams Conducted Over Time**:
- Line chart showing number of exams per month
- X-axis: Months (last 12 months)
- Y-axis: Number of exams\n- Separate lines for Practice and School-Level exams

**2. Exams by Type**:
- Pie chart showing distribution of Practice vs School-Level exams
\n**3. Exams by Subject**:
- Bar chart showing number of exams per subject
- X-axis: Subjects\n- Y-axis: Number of exams
- Color-coded bars\n
**4. Exams by Class**:
- Bar chart showing number of exams per class
- X-axis: Classes
- Y-axis: Number of exams
\n**5. Student Participation Rate**:
- Pie chart showing:\n  - Students who attempted exams: X%
  - Students who did not attempt: Y%
- Drill-down option to see class-wise or section-wise participation

**6. Average Scores by Subject**:
- Bar chart showing average scores for each subject
- X-axis: Subjects
- Y-axis: Average score (%)
- Color-coded bars (green for >75%, orange for 50-75%, red for <50%)

**7. Average Scores by Class**:
- Bar chart showing average scores for each class
- X-axis: Classes
- Y-axis: Average score (%)
\n**8. Pass Rate by Subject**:
- Bar chart showing pass rate for each subject
- X-axis: Subjects
- Y-axis: Pass rate (%)\n\n**9. Pass Rate by Class**:
- Bar chart showing pass rate for each class\n- X-axis: Classes\n- Y-axis: Pass rate (%)

**Teacher Performance Table**:
- List of teachers with exam statistics
- Columns:
  - Teacher Name
  - Total Exams Created
  - Practice Exams
  - School-Level Exams
  - Total Students Participated
  - Average Student Score (%)
  - Average Pass Rate (%)
  - Average Participation Rate (%)
- Sort options: Name A-Z, Exams Created (High to Low), Average Score (High to Low)
- Click on teacher to view detailed teacher-specific analytics

**Subject Performance Table**:
- List of subjects with exam statistics
- Columns:\n  - Subject Name
  - Total Exams Conducted
  - Total Students Participated
  - Average Score (%)
  - Pass Rate (%)
  - Highest Score\n  - Lowest Score
- Sort options: Subject Name A-Z, Exams Conducted (High to Low), Average Score (High to Low)
\n**Class Performance Table**:
- List of classes with exam statistics\n- Columns:
  - Class Name
  - Total Exams Conducted
  - Total Students Participated
  - Average Score (%)
  - Pass Rate (%)
  - Highest Score
  - Lowest Score
- Sort options: Class Name, Exams Conducted (High to Low), Average Score (High to Low)

**Monthly Trends**:
- Table showing month-wise exam statistics
- Columns:
  - Month
  - Exams Conducted
  - Students Participated
  - Average Score (%)
  - Pass Rate (%)
- Line chart showing trends over time

**Export Options**:
- 'Export School Analytics as PDF': Comprehensive school-wide report
- 'Export Teacher Performance as Excel': Teacher-wise statistics
- 'Export Subject Performance as Excel': Subject-wise statistics\n- 'Export Class Performance as Excel': Class-wise statistics
\n**Filter Options** (Apply to all charts and tables):
- Date Range: From Date, To Date (default: Last 3 months)
- Class: Multi-select dropdown
- Subject: Multi-select dropdown
- Teacher: Multi-select dropdown
- Exam Type: Multi-select dropdown (Practice/School-Level)
- 'Apply Filters' button
- 'Clear Filters' button\n
### 9.7 Online Exam Access Control and Data Isolation

#### 9.7.1 Teacher Access Rules
- Can create practice exams and school-level exams only for classes and subjects assigned to them
- Can select only sections assigned to them
- Practice exams can be published immediately without approval
- School-level exams must be submitted for Principal approval before scheduling
- Can view and manage only own exams (created by them)
- Can view student attempts only for own exams
- Can grade only own exams
- Cannot view exams created by other teachers or principal
- Cannot view students from sections not assigned to them
- Cannot edit or delete exams after students have started attempting\n- Can extend exam time or end exam early for own exams
- Cannot edit school-level exams while in'Pending Approval' status\n- **Can delete own exams with following restrictions**:
  - **Draft exams**: Can be deleted anytime
  - **Scheduled exams**: Can be deleted only if no students have started\n  - **Ongoing exams**: Cannot be deleted
  - **Completed exams**: Can be deleted only after results are published and archived (after 30 days)
  - **Pending Approval exams**: Can be withdrawn (returns to draft) but not deleted
\n#### 9.7.2 Student Access Rules
- Can view only exams assigned to their section (both practice and school-level)
- Can take exam only during scheduled time window (start to end datetime)
- Can take exam only once (no retakes)
- **Use individual student login to access exam interface**
- **Exam interface includes question palette panel with color-coded status indicators and timer**
- Can view results only if teacher has published them
- Can review answers only if teacher has enabled 'Allow Answer Review'
- Cannot view other students' attempts or results
- Cannot access exam before start time
- Cannot access exam after end time (unless late submission enabled)
\n#### 9.7.3 Principal Access Rules
- Can create exams directly for any class and subject without approval requirement
- Can create exams from school question bank without approval\n- Can approve or reject school-level exams submitted by teachers
- Can view all exams (practice and school-level) created by teachers and self in their school
- Can view exam details, settings, and questions
- Can view student participation and results
- Can view exam analytics and reports
- Can export exam results and analytics
- Cannot edit or delete exams created by teachers
- Cannot grade exams created by teachers
- Cannot publish or unpublish results for teacher-created exams
- Cannot extend exam time or end exam early for teacher-created exams
- Read-only access to teacher-created exam data
- Full control over self-created exams\n- **Can delete self-created exams with following restrictions**:
  - **Draft exams**: Can be deleted anytime
  - **Scheduled exams**: Can be deleted only if no students have started
  - **Ongoing exams**: Cannot be deleted
  - **Completed exams**: Can be deleted only after results are published and archived (after 30 days)
\n#### 9.7.4 Data Isolation\n- All exam data is school-scoped\n- Backend validation ensures:\n  - Teachers can only access own exams
  - Students can only access exams assigned to their section
  - Principal can only access exams from their assigned school
- Cross-school data access is prevented at database level
- Foreign key constraints enforce school-based isolation
- API endpoints validate user's school_id before returning data
- Student attempts are linked to specific exam and student, ensuring one attempt per student per exam
- Approval workflow ensures school-level exams are reviewed before scheduling

### 9.8 Online Exam Notifications\n
#### 9.8.1 Student Notifications
**Notification Types**:
- **Exam Assigned**: When teacher publishes new exam
  - Message: 'New [Practice/School-Level] exam assigned: [Exam Name] for [Subject]. Starts on [Date] at [Time].'
  - Action: 'View Exam Details'\n- **Exam Reminder (24 hours before)**: 24 hours before exam start time
  - Message: 'Reminder: [Exam Name] starts tomorrow at [Time]. Duration: [X] minutes.'
  - Action: 'View Exam Details'
- **Exam Reminder (1 hour before)**: 1 hour before exam start time
  - Message: 'Reminder: [Exam Name] starts in 1 hour. Make sure you are ready.'
  - Action: 'Start Exam'
- **Exam Started**: When exam start time arrives
  - Message: '[Exam Name] is now available. You have until [End Time] to complete it.'
  - Action: 'Start Exam'
- **Exam Ending Soon**: 24 hours before exam end time (if not yet attempted)
  - Message: 'Reminder: [Exam Name] ends tomorrow at [Time]. Don\\'t forget to attempt it.'
  - Action: 'Start Exam'
- **Results Published**: When teacher publishes results
  - Message: 'Results published for [Exam Name]. You scored [X]% ([Pass/Fail]).'
  - Action: 'View Results'
- **Feedback Added**: When teacher adds feedback to student's answers
  - Message: 'Your teacher has added feedback for [Exam Name].'
  - Action: 'View Feedback'
\n**Notification Delivery**:
- In-app notifications (bell icon in header)
- Email notifications (if email configured)
- Push notifications (if mobile app, future feature)
\n#### 9.8.2 Teacher Notifications
**Notification Types**:
- **Exam Approved**: When principal approves school-level exam
  - Message: 'Your school-level exam [Exam Name] has been approved by [Principal Name]. You can now schedule it.'
  - Action: 'Schedule Exam'
- **Exam Rejected**: When principal rejects school-level exam
  - Message: 'Your school-level exam [Exam Name] has been rejected by [Principal Name]. Reason: [Rejection Reason]'
  - Action: 'View Details'
- **Modification Requested**: When principal requests modifications\n  - Message: 'Principal has requested modifications for [Exam Name]. Please review and resubmit.'
  - Action: 'View Requests'
- **Student Submitted Exam**: When student submits exam\n  - Message: '[Student Name] has submitted [Exam Name].'
  - Action: 'View Submission'
- **All Students Completed**: When all students have completed exam
  - Message: 'All students have completed [Exam Name]. You can now grade and publish results.'
  - Action: 'View Results'
- **Pending Manual Grading**: Reminder for pending manual grading (daily)
  - Message: 'You have [X] students with pending manual grading for [Exam Name].'
  - Action: 'Grade Now'
- **Exam Auto-Published**: When scheduled exam auto-publishes at start time
  - Message: '[Exam Name] has been automatically published. Students can now access it.'
  - Action: 'Monitor Exam'
- **Exam Ending Soon**: 1 hour before exam end time
  - Message: '[Exam Name] ends in 1 hour. [X] students have not yet completed.'
  - Action: 'Monitor Exam'
- **Suspicious Activity Detected**: When student has high suspicious activity count
  - Message: 'Suspicious activity detected for [Student Name] in [Exam Name]. [X] tab switches logged.'
  - Action: 'View Activity Log'

**Notification Delivery**:
- In-app notifications\n- Email notifications (daily digest option)
\n#### 9.8.3 Principal Notifications
**Notification Types**:
- **New Exam Submitted for Approval**: When teacher submits school-level exam
  - Message: '[Teacher Name] has submitted school-level exam [Exam Name] for approval.'
  - Action: 'Review Exam'
- **Pending Approvals Reminder**: Daily reminder for pending approvals
  - Message: 'You have [X] school-level exams pending approval.'
  - Action: 'View Approvals'
- **Daily Exam Summary**: Daily summary of exams conducted (sent at end of day)
  - Message:'Daily Summary: [X] exams conducted today. [Y] students participated. Average score: [Z]%.'
  - Action: 'View Analytics'
- **Weekly Participation Report**: Weekly summary of student participation rates (sent every Monday)
  - Message: 'Weekly Report: [X] exams conducted this week. Participation rate: [Y]%. [Z] students did not attempt any exam.'
  - Action: 'View Report'
- **Monthly Analytics Report**: Monthly summary of exam analytics (sent on1st of each month)
  - Message: 'Monthly Report: [X] exams conducted in [Month]. Average score: [Y]%. Pass rate: [Z]%.'
  - Action: 'View Analytics'\n- **Low Participation Alert**: When exam has low participation rate (below 70%)
  - Message: 'Low participation alert: [Exam Name] by [Teacher Name] has only [X]% participation.'
  - Action: 'View Exam Details'
\n**Notification Delivery**:\n- In-app notifications
- Email notifications (weekly/monthly digest)

### 9.9 Online Exam Security Features

#### 9.9.1 Exam Integrity\n**Single Attempt Enforcement**:
- Database constraint: Unique index on (exam_id, student_id) in student_exam_attempts table
- Backend validation: Check if student has existing attempt before allowing exam start
- Frontend validation: Disable'Start Exam' button if attempt exists
- Error message: 'You have already attempted this exam. Only one attempt is allowed.'

**Browser Lock Mode** (Optional):
- JavaScript-based tab/window focus detection
- Event listeners for:\n  - visibilitychange (tab switch)
  - blur (window focus loss)
  - beforeunload (browser close attempt)
- On first tab switch:\n  - Show warning modal: 'Warning: Switching tabs is not allowed. This activity has been logged.'
  - Log activity in database
- On subsequent tab switches:
  - Increment suspicious activity count
  - Log each occurrence
- After 3 tab switches:
  - Show warning: 'Multiple tab switches detected. Your exam may be flagged for review.'
- Limitations:
  - Cannot prevent tab switches, only detect and log\n  - May not work on all browsers
  - Student can still use another device

**Copy-Paste Prevention** (Optional):
- Disable copy-paste in answer input fields
- JavaScript event listeners:\n  - oncopy: Prevent copy
  - onpaste: Prevent paste
  - oncut: Prevent cut
- Context menu (right-click) disabled on answer fields
- Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+X) disabled
- Limitations:
  - Can be bypassed by disabling JavaScript
  - Does not prevent typing from another source
\n**Screenshot Prevention** (Optional):
- Browser-level screenshot prevention (limited support)
- CSS property: -webkit-user-select: none (prevents text selection)
- Watermark overlay with student name and timestamp (future feature)
- Limitations:
  - Cannot fully prevent screenshots
  - Can be bypassed using external camera

**IP Address Logging**:
- Capture student's IP address at exam start
- Store in student_exam_attempts table
- Compare IP addresses if multiple attempts detected
- Use for identifying suspicious activity

**Device Fingerprinting**:
- Capture device information at exam start:\n  - Browser name and version
  - Operating system
  - Screen resolution
  - User agent string
- Store in student_exam_attempts table (device_info JSON field)
- Use for identifying if student switched devices

#### 9.9.2 Anti-Cheating Measures
**Randomized Questions**:
- If'Randomize Question Order' enabled:
  - Generate random question order for each student at exam start
  - Store in randomized_question_order JSON array
  - Display questions in randomized order
  - Question numbers remain sequential (1, 2, 3, ...) but content is different
- Algorithm: Fisher-Yates shuffle
- Ensures each student gets same questions but in different order

**Randomized MCQ Options**:
- If 'Randomize MCQ Options' enabled:\n  - Shuffle options (A, B, C, D) for each MCQ for each student
  - Store shuffled mapping in randomized_mcq_options JSON object
  - Display options in shuffled order
  - Correct answer mapping updated accordingly
- Algorithm: Fisher-Yates shuffle
- Applies to: Multiple Choice, True/False, Multiple Response MCQ
- Does not apply to: Match the Following (pairs remain intact)

**Time Tracking**:
- Track time spent on each question
- Store in student_answers JSON array (time_spent field)
- Calculate:\n  - Total time taken
  - Average time per question
  - Time spent on each question
- Use for:\n  - Identifying unusually fast answers (possible cheating)
  - Identifying questions that took too long (possible difficulty)\n  - Analytics and reporting

**Suspicious Activity Detection**:
- Automatically detect and log suspicious activities:
  - **Multiple Tab Switches**: More than 3 tab switches\n  - **Extended Inactivity**: No activity for more than 5 minutes
  - **Rapid Answer Changes**: Changing answer multiple times in short period
  - **Unusual Answer Patterns**: All answers submitted in last 5 minutes
  - **Too Fast Completion**: Completing exam in less than 25% of allocated time
- Increment suspicious_activity_count for each occurrence
- Flag students with high suspicious activity count (>5) for manual review
- Teacher can view detailed activity log\n
**Activity Log**:
- Detailed log of student actions during exam
- Logged activities:\n  - Exam start time
  - Each question viewed (timestamp)
  - Each answer submitted (timestamp)
  - Each answer changed (timestamp, old answer, new answer)
  - Tab switches (timestamp)
  - Long inactivity periods (timestamp, duration)
  - Exam submission time\n- Stored in activity_log JSON array
- Format: [{timestamp: '2025-01-1510:30:00', action: 'question_viewed', details: 'Question5'}, ...]
- Teacher can view full activity log for each student
- Principal can view aggregated suspicious activity reports

#### 9.9.3 Exam Access Control
**Time-based Access**:
- Exam accessible only between start_datetime and end_datetime
- Backend validation:\n  - Check current time against start_datetime and end_datetime
  - Return error if outside exam window
- Frontend validation:
  - Disable 'Start Exam' button if before start time
  - Show countdown: 'Exam starts in X hours Y minutes'
  - Disable 'Start Exam' button if after end time (unless late submission enabled)
  - Show message: 'Exam has ended. You can no longer attempt this exam.'
\n**Section-based Access**:
- Only students from assigned sections can access exam
- Backend validation:
  - Check if student's section_id is in exam_sections table for this exam
  - Return error if student not in assigned sections
- Frontend validation:
  - Exam not shown in student's 'My Exams' list if not assigned\n\n**One-time Access Link** (Optional, future feature):
- Generate unique access token for each student
- Token valid only for exam duration\n- Token can be used only once
- Prevents sharing of exam link

**Password Protection** (Optional):
- If 'Require Exam Password' enabled:
  - Student must enter password to start exam
  - Password input field on pre-exam screen
  - Backend validation: Compare entered password with stored exam_password
  - Error message: 'Incorrect password. Please try again.'
  - After 3 failed attempts: Lock exam for 10 minutes
- Password stored encrypted in database
- Teacher can share password via separate channel (email, SMS, in-class)
\n### 9.10 Exam Deletion Feature

#### 9.10.1 Delete Button Placement
**Teacher Interface**:
- Delete button available in following locations:
  - **Draft Exams Tab**: Delete button for each exam card
  - **Scheduled Exams Tab**: Delete button for each exam card (with restrictions)
  - **Completed Exams Tab**: Delete button for each exam card (with restrictions)
  - **Exam Details Page**: Delete button in action buttons section
- Delete button styling:
  - Red color to indicate destructive action
  - Icon: Trash/Delete icon
  - Text: 'Delete' or 'Delete Exam'
\n**Principal Interface**:
- Delete button available in following locations:
  - **All Exams Tab**: Delete button for self-created exams only
  - **Completed Exams Tab**: Delete button for self-created exams only (with restrictions)
  - **Exam Details Page**: Delete button for self-created exams only
- Delete button styling: Same as teacher interface

#### 9.10.2 Delete Restrictions and Validation
\n**For Teachers**:
- **Draft Exams**:
  - Can be deleted anytime
  - No restrictions\n  - Confirmation dialog required
- **Pending Approval Exams**:
  - Cannot be deleted directly
  - Must withdraw exam first (returns to draft status)
  - Then can be deleted as draft exam
- **Scheduled Exams**:
  - Can be deleted only if:\n    - No students have started the exam
    - Exam has not yet reached start time
  - Validation check:\n    - Query student_exam_attempts table for this exam_id
    - If any student has attempt_status != 'Not Started', prevent deletion
  - Error message: 'Cannot delete exam. Some students have already started this exam.'
  - Confirmation dialog required with warning
- **Ongoing Exams**:
  - Cannot be deleted
  - Delete button disabled or hidden
  - Tooltip: 'Cannot delete ongoing exam. Please wait until exam is completed.'
- **Completed Exams**:\n  - Can be deleted only if:
    - Results have been published
    - Exam has been archived (30 days after completion)
  - Validation check:
    - Check if results published\n    - Check if 30 days have passed since end_datetime
  - Error message: 'Cannot delete exam. Results must be published and exam must be archived (30 days after completion).'
  - Confirmation dialog required with strong warning

**For Principal**:
- Same restrictions as teachers for self-created exams
- Cannot delete exams created by teachers
- Delete button not shown for teacher-created exams
\n#### 9.10.3 Delete Confirmation Dialog
**Dialog Layout**:
- Title: 'Delete Exam?'
- Warning icon (red exclamation mark)
- Message:\n  - For Draft: 'Are you sure you want to delete this exam? This action cannot be undone.'
  - For Scheduled: 'Are you sure you want to delete this scheduled exam? Students will no longer be able to access it. This action cannot be undone.'\n  - For Completed: 'Are you sure you want to delete this completed exam? All student attempts, results, and analytics data will be permanently deleted. This action cannot be undone.'
- Exam details summary:\n  - Exam name
  - Class and Subject
  - Total students (for scheduled/completed)\n  - Students attempted (for completed)
- Checkbox: 'I understand that this action is permanent and cannot be undone'\n- Action buttons:
  - 'Cancel': Close dialog without deleting
  - 'Delete Exam': Confirm deletion (enabled only after checkbox is checked)
    - Red color to indicate destructive action
\n#### 9.10.4 Delete Process
**Backend Workflow**:
1. Validate user permissions:\n   - Check if user is creator of exam\n   - Check if user has delete permission\n2. Validate exam status and restrictions:
   - Check exam_status\n   - Check student attempts (for scheduled exams)
   - Check results published and archive status (for completed exams)
3. If validation passes:
   - Delete related records in cascading order:\n     - student_exam_attempts (all attempts for this exam)
     - exam_sections (section mappings)\n     - online_exams (exam record)
   - Log deletion action in audit log (future feature)
4. Return success response
5. If validation fails:
   - Return error response with specific reason
\n**Frontend Workflow**:
1. User clicks 'Delete' button
2. Show confirmation dialog
3. User checks confirmation checkbox
4. User clicks 'Delete Exam' button
5. Show loading spinner: 'Deleting exam...'
6. Send delete request to backend
7. On success:
   - Show success message: 'Exam deleted successfully.'
   - Remove exam from list
   - Redirect to exams list page
8. On error:
   - Show error message with reason
   - Close dialog\n
#### 9.10.5 Cascade Deletion
**Database Cascade Rules**:
- When exam is deleted from online_exams table:
  - All records in exam_sections table with matching exam_id are automatically deleted (CASCADE)
  - All records in student_exam_attempts table with matching exam_id are automatically deleted (CASCADE)\n- Foreign key constraints ensure referential integrity
\n**Data Loss Warning**:
- Deletion is permanent and irreversible
- All student attempts, answers, and results are permanently deleted
- All exam analytics and reports are permanently deleted
- Confirmation dialog must clearly communicate this\n
#### 9.10.6 Alternative to Deletion: Archive Feature (Future Enhancement)
**Archive Functionality**:
- Instead of permanent deletion, exams can be archived
- Archived exams:\n  - Not shown in active exams list
  - Moved to 'Archived Exams' section
  - Can be restored if needed
  - Student data preserved
- Archive button available for completed exams
- Archived exams can be permanently deleted after extended period (e.g., 1 year)
\n## 10. Teacher Dashboard and Functions

### 10.1 Teacher Login - Dashboard Overview
After Teacher login, the dashboard displays:
- Assigned classes, sections, and subjects
- Students of assigned sections
- Question Bank access
- Question Paper Preparation
- Question Paper History
- **Online Exams** (with practice and school-level exam creation)
\n### 10.2 Teacher Functions
- View assigned classes, sections, and subjects
- View students of assigned sections only
- Question Bank Access with image upload and minus mark field
- Question Paper Preparation with smart selection and shuffle features
- Question Paper History Management:\n  - View all own question papers
  - Filter by class, subject, date range, status
  - View, edit, delete, export, print papers
  - Create new versions from existing papers
  - Track paper creation and modification history
  - View personal analytics dashboard
- **Online Exam Management**:
  - **Create practice exams (no approval required) to assess student understanding**
  - **Create school-level exams (requires Principal approval before scheduling)**
  - Configure exam settings (duration, start/end time, passing marks, negative marking)
  - Publish practice exams directly to assigned sections
  - Submit school-level exams for Principal approval
  - Monitor student participation in real-time
  - View submitted answers and auto-graded results
  - Manually grade subjective questions (Short Answer, Essay)\n  - Generate exam reports and analytics
  - Export exam results\n  - **Delete own exams (with restrictions based on exam status)**
\n## 11. Student Dashboard and Functions\n
### 11.1 Student Login - Dashboard Overview
After Student login, the dashboard displays:
- My class, section, subjects, and teachers
- **My Exams** (practice and school-level exams)
\n### 11.2 Student Functions
- View my class and section
- View my subjects\n- View my teachers
- **Online Exam Functions**:
  - **Login with individual student account**
  - View assigned online exams (practice and school-level)
  - **Take online exams with enhanced interface including question palette panel and timer**
  - Submit answers before deadline
  - **View auto-evaluated results for objective questions**
  - View exam results and feedback (after teacher publishes results)
  - **View detailed performance analysis**
  - Review correct answers (if enabled by teacher)
- Profile settings\n\n## 12. Key Features\n
### 12.1 User Registration and Approval Workflow
- New users assigned 'Pending Approval' status
- Admin must approve new accounts\n\n### 12.2 Password Reset/Recovery Feature
- Forgot Password link on login page
- Email-based password reset process
\n### 12.3 Admin Functions
- Create and manage schools
- User account management with status-based navigation
- Enhanced search and filter for Active Users
\n### 12.4 Principal Functions
- Academic Management\n- Teacher Management with enhanced search
- Student Management\n- Question Bank Management
- Question Paper History Management:\n  - View all question papers created by teachers in school
  - Advanced filtering and search\n  - School-wide analytics dashboard
  - Export and print capabilities
- **Online Exam Monitoring**:
  - **Approve school-level exams created by teachers**
  - **Create exams directly without approval requirement**
  - **Create exams from school question bank without approval**
  - View all online exams (practice and school-level) created by teachers in school
  - Monitor exam status and student participation
  - Access exam analytics and reports
  - **Delete self-created exams (with restrictions)**

### 12.5 Teacher Functions
- View assigned classes, sections, subjects
- Question Bank Access\n- Question Paper Preparation with shuffle and auto-versioning
- Question Paper History Management:
  - View own paper history
  - Personal analytics dashboard
  - Version tracking and management
- **Online Exam Management**:
  - **Create practice exams (no approval required)**
  - **Create school-level exams (requires Principal approval)**
  - Real-time monitoring\n  - **Auto-grading for objective questions**
  - Manual grading for subjective questions
  - **Detailed exam analytics and performance reports**
  - **Delete own exams (with restrictions)**

### 12.6 Student Functions
- View personal information
- Profile editing
- **Online Exam Functions**:
  - **Individual login to access exams**
  - **Enhanced exam interface with question palette panel and timer**
  - Take assigned online exams (practice and school-level)
  - **View auto-evaluated results for objective questions**
  - **View detailed performance analysis**
  - Review correct answers (if enabled)\n\n### 12.7 User Profile Management
- Edit, Save, Approve, Suspend buttons
- Status-based navigation
\n### 12.8 Principal Dashboard - Total Teachers Card Feature
- Click to open Teachers Management page with tabbed interface
- Enhanced search and filter functionality
\n### 12.9 Principal Dashboard - Total Students Card Feature
- Click to open Students List page\n- Enhanced search with Class and Section filters

### 12.10 Admin Dashboard - Updated Card Display
- Display only Total Users and Total Schools cards
\n### 12.11 Landing Page - Updated Design
- Login and Register buttons removed from hero section
- Get Started section removed\n\n### 12.12 Question Paper History Feature
- Comprehensive tracking of all question papers\n- Advanced filtering and search capabilities
- Paper versioning and relationship tracking
- Export and print functionality
- Analytics and reporting for both teachers and principals
- School-based data isolation and access control

### 12.13 Online Exam Feature
- **Complete online exam creation and management system with approval workflow**
- **Practice exams (no approval) and school-level exams (requires approval)**
- **Principal can create exams directly without approval**
- **Enhanced student exam interface with question palette panel and timer**
- Real-time exam monitoring and student participation tracking
- **Automatic grading for objective questions (MCQ, True/False, Multiple Response, Match the Following)**
- Manual grading for subjective questions
- **Comprehensive exam analytics with detailed performance analysis**
- Security features and anti-cheating measures
- School-based data isolation and role-based access control
- **Exam deletion functionality with restrictions based on exam status and user role**

## 13. Language Support

### 13.1 UI Language\n- **UI Language: English Only**
- All interface elements displayed in English
\n### 13.2 Chat/Communication Language
- Users can communicate in any language
\n### 13.3 Language Rule Summary
- **UI = Always English**
- **Chat/Communication = Any Language**
\n## 14. Future Scope Features
- Audit Logs\n- Backup & Restore
- Notifications\n- Analytics Dashboard with lesson-level performance and negative marking impact analysis
- Advanced question paper scheduling\n- Automated paper generation based on syllabus coverage
- Student performance tracking linked to question papers
- **Advanced proctoring features** (webcam monitoring, screen recording)\n- **Adaptive testing** (difficulty adjusts based on student performance)
- **Question bank sharing** between teachers\n- **Parent portal** for viewing student exam results
- **Exam archive feature** (alternative to permanent deletion)
\n## 15. Design Style\n
### 15.1 Color Scheme
- Primary color: Blue (#2563EB)
- Secondary color: Green (#10B981)
- Warning color: Red (#EF4444)
- Pending status color: Orange (#F59E0B)
- Match the Following badge color: Teal (#14B8A6)
- Multiple Response MCQ badge color: Indigo (#6366F1)
- Minus Mark color: Red (#EF4444) or Orange (#F59E0B)
- History/Archive color: Purple (#8B5CF6)
- **Exam status colors**:
  - Draft: Gray (#6B7280)
  - Pending Approval: Orange (#F59E0B)
  - Approved: Green (#10B981)
  - Scheduled: Blue (#3B82F6)
  - Ongoing: Green (#10B981)
  - Completed: Purple (#8B5CF6)
- Cancelled: Red (#EF4444)\n  - Rejected: Red (#EF4444)\n- **Exam type badges**:
  - Practice: Green (#10B981)
  - School-Level: Blue (#3B82F6)
- **Delete button color**: Red (#EF4444)\n\n### 15.2 Visual Details
- Soft rounded corners (8px radius)
- Subtle shadow effects
- Clear borders\n- Status badges with appropriate colors
- Icon indicators for images and versions
- **Timer display with color coding** (green >10min, orange 5-10min, red <5min)
- **Progress indicators** for exam completion
- **Real-time status updates** with smooth animations
- **Question palette panel with color-coded status indicators** (green: answered, red: not answered, orange: marked for review, gray: not visited)
- **Delete button with destructive styling** (red color, trash icon)
\n### 15.3 Overall Layout
- Side panel navigation with collapsible toggle
- Card-based design\n- Responsive grid layout
- Status-based button navigation for Admin User Management
- Enhanced search and filter interfaces
- Question Bank dual view with image upload and minus mark support
- Question Paper Preparation with smart selection and auto-versioned shuffle
- Question Paper History with advanced filtering, analytics, and version tracking
- **Online Exam interface with clean, distraction-free design**
- **Enhanced student exam interface with question palette panel (left sidebar) and timer (header)**
- **Real-time monitoring dashboard with live updates**
- **Exam analytics with interactive charts and graphs**
- **Approval workflow interface for Principal**
- **Delete confirmation dialogs with clear warnings**
\n## 16. Reference Image

### 16.1 Question Edit Form Layout
The uploaded image (screenshot.png) shows the question edit form with the following layout issue:
\n**Current Issue**: In the Edit Question dialog, the 'Question Text' field,'Image/Clip Art (Optional)' field, 'Question Type' dropdown, 'Difficulty' dropdown, 'Marks' input, and 'Negative Marks' input are positioned below the 'Match Pairs' section.\n
**Required Fix**: These fields should be moved above the 'Match Pairs' section to maintain the correct form field order as specified in Section 6.3.1.

**Correct Field Order**:
1. Class (Dropdown)
2. Subject (Dropdown)
3. Lesson (Dropdown)
4. **Question Text** (Text area)← Should be here
5. **Image/Clip Art (Optional)** (Image upload field) ← Should be here
6. **Question Type** (Dropdown) ← Should be here
7. **Marks** (Number input) ← Should be here\n8. **Minus Mark** (Number input) ← Should be here\n9. **Difficulty** (Dropdown) ← Should be here
10. Options/Match Pairs (Dynamic fields based on question type) ← Should be here
11. Correct Answer (Dynamic field based on question type)\n\nThis layout fix ensures consistency across all question types and improves user experience by maintaining a logical form flow.