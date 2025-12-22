# Online School Management System Requirements Document

## 1. Application Description

### 1.1 Application Name
Online School Management System\n
### 1.2 Application Purpose
A comprehensive school management system for educational institutions. Features include school management, academic structure setup (class, section, subject, lesson), teacher-subject-class-section mapping, question bank management with lesson-level tracking, question paper preparation with shuffle functionality, question paper history tracking, user management with school-based data isolation.\n
## 2. User Roles\n
### 2.1 Admin\n- Complete system administration
- School management (create, edit, view schools)\n- User account creation and management
- New user approval management
- Role-based Access Control setup
- System configurations\n- Permission management
- User profile editing and suspension management
- **Cross-school visibility**: Admin can view and manage all schools and users across the entire system
- **Full management rights**: Create, edit, suspend, delete all users and schools

### 2.2 Principal
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
- Profile editing capability
- Linked to specific school from school master list
- **School-based isolation**: Can only view and manage users (teachers and students) from their assigned school
- **Visibility Rules**:
  - ✅ Can view: Teachers from their own school, Students from their own school, Question papers created by teachers in their school
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
  - View all question papers created by self\n  - Filter by class, subject, date range, status
  - View, edit, delete, export, print historical papers
  - Create new versions from existing papers
  - Track paper creation and modification history
- Profile editing capability
- Linked to specific school from school master list
- **School-based isolation**: Can only view and interact with students from their assigned sections
- **Visibility Rules**:
  - ✅ Can view: Students from their assigned sections, Own question papers\n  - ❌ Cannot view: Principal (even from the same school), Other teachers (even from the same school), Users from other schools, Question papers created by other teachers
\n### 2.4 Student
- View my class, section, subjects, and teachers
- Profile editing capability
- Linked to specific school from school master list
- **School-based isolation**: Can only view personal information from their assigned school
- **Visibility Rules**:
  - ✅ Can view: Only their own profile details, Personal information, and assigned content
  - ❌ Cannot view: Other students, Teachers, Principal, Admin\n
### 2.5 User Profile Information
All users (Admin, Principal, Teacher, Student) will have the following profile information:
- User name
- Email address
- Role\n- School name (mandatory field, selected from dropdown list populated from School Master)
- Contact number
- Profile picture (optional)\n- Account status (Pending Approval/Active/Suspended)
\n## 3. School Management Module

### 3.1 School Master\nAdmin can create and manage schools with the following details:
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
\n### 4.1 Isolation Principle
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
After Principal login, the dashboard displays five main cards:
- **Academic Management**: Manage academic structure (classes, sections, subjects, lessons, student mapping)
- **Teachers**: Manage teacher accounts and teacher-subject-class-section mapping\n- **Students**: View and manage students\n- **Question Bank**: Manage exam questions with lesson-level tracking and dual view options
- **Question Paper History**: View all question papers created by teachers in the school
\n**UI Language Requirement**: All card titles, labels, and UI text on Principal Dashboard must be displayed in English only. Card titles should be 'Academic Management', 'Teachers', 'Students', 'Question Bank', and 'Question Paper History' (not in Tamil or any other language).

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
- **Insert images/clip arts in questions**
- **Dual View Options**:
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

## 6. Question Bank Module

### 6.1 Question Bank Overview
- Centralized repository for exam questions
- Questions are organized by Class, Subject, and Lesson
- Support for multiple question types (Multiple Choice, True/False, Short Answer, Essay, Match the Following, Multiple Response MCQ)\n- Difficulty levels (Easy, Medium, Hard)\n- Marks allocation per question
- **Minus Mark (Negative Marking) support**: Questions can have negative marks for incorrect answers
- Lesson-level tracking for performance analytics
- **Image/Clip Art support**: Questions can include images or clip arts
- **Dual view display options**: Row View and Card View

### 6.2 Question Bank Table Structure

#### 6.2.1 Database Schema
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
- Default view: Row View
\n#### 6.4.2 Row View (Table Format)
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
**Card Layout**: Each question displayed as a card with question text, images, metadata, options, and action buttons.\n\n#### 6.4.4 Edit Functionality in Both Views
- Edit icon/button opens edit dialog with pre-filled form
- Image editing with local file selection
- Minus Mark editing with validation
\n## 7. Question Paper Preparation Module

### 7.1 Question Paper Preparation Overview
- **Purpose**: Enable teachers to create question papers from their own question bank
- **Access**: Available only to Teacher role\n- **Workflow**: Basic Details → Question Selection → Shuffle Options → Preview/Save/Generate
\n### 7.2 Question Paper Preparation Workflow

#### 7.2.1 Step 1: Basic Details
- Class Selection (Dropdown, required)
- Subject Selection (Dropdown, required)
\n#### 7.2.2 Step 2: Question Selection Source
- View All Questions or View Questions by Question Bank Name
- Question list displayed in row format

#### 7.2.3 Step 3: Shuffle Functionality
- **Shuffle Questions** (Checkbox)
- **Shuffle MCQ Options** (Checkbox)
- **Updated Shuffle Rules for Multiple Response MCQ**: Only Segment 3 (Answer Options) should be shuffled

#### 7.2.4 Step 4: Final Question Paper Output
- Preview Question Paper
- Save as Draft
- Generate Final Question Paper\n- Export as PDF
- Print Option

### 7.3 Question Paper Database Structure
**Table name**: question_papers

**Columns**:
- id (UUID, Primary Key)
- paper_name (Varchar, required)
- school_id (Foreign Key → schools.id)
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
\n### 7.4 Access Control & Data Isolation
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

#### 8.2.1 History List View
**Display Columns**:
- Paper Name
- Class
- Subject
- Created By (Teacher Name)
- Creation Date
- Last Modified Date\n- Paper Status (Draft/Final)
- Total Marks
- Total Questions
- Version Info (Original/Shuffled A/Shuffled B, etc.)
- Actions (View, Edit, Delete, Export PDF, Print, Create New Version)

#### 8.2.2 Filter Options\n- **Teacher Filter** (Principal only): Dropdown showing all teachers in the school
- **Class Filter**: Dropdown showing all classes\n- **Subject Filter**: Dropdown showing all subjects
- **Date Range Filter**: \n  - From Date (Date picker)
  - To Date (Date picker)
  - Quick select options: Today, Last 7 Days, Last 30 Days, Last 3 Months, Last Year
- **Paper Status Filter**: Dropdown with options (All, Draft, Final)
- **Version Type Filter**: Dropdown with options (All, Original, Shuffled Versions)
- **Clear All Filters** button to reset all filter criteria

#### 8.2.3 Search Functionality
- Text search bar for searching by:\n  - Paper name
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
  - Total Papers Created\n  - Papers Created This Month
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
  - My Papers by Subject (Bar chart)\n  - My Papers by Class (Bar chart)
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
  - Recent papers (last 5)\n  - Quick action button:'View All History'
- Click on card opens Question Paper History page

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

## 9. Teacher Dashboard and Functions

### 9.1 Teacher Login - Dashboard Overview
After Teacher login, the dashboard displays:
- Assigned classes, sections, and subjects
- Students of assigned sections
- Question Bank access
- Question Paper Preparation
- **Question Paper History** (new card)
\n### 9.2 Teacher Functions
- View assigned classes, sections, and subjects
- View students of assigned sections only
- Question Bank Access with image upload and minus mark field
- Question Paper Preparation with smart selection and shuffle features
- **Question Paper History Management**:\n  - View all own question papers
  - Filter by class, subject, date range, status
  - View, edit, delete, export, print papers
  - Create new versions from existing papers
  - Track paper creation and modification history
  - View personal analytics dashboard

## 10. Student Dashboard and Functions

### 10.1 Student Login - Dashboard Overview
After Student login, the dashboard displays my class, section, subjects, and teachers.

### 10.2 Student Functions
- View my class and section
- View my subjects\n- View my teachers
- Profile settings\n\n## 11. Key Features\n
### 11.1 User Registration and Approval Workflow
- New users assigned 'Pending Approval' status
- Admin must approve new accounts\n\n### 11.2 Password Reset/Recovery Feature
- Forgot Password link on login page
- Email-based password reset process
\n### 11.3 Admin Functions
- Create and manage schools
- User account management with status-based navigation
- Enhanced search and filter for Active Users
\n### 11.4 Principal Functions
- Academic Management\n- Teacher Management with enhanced search
- Student Management
- Question Bank Management
- **Question Paper History Management**:\n  - View all question papers created by teachers in school
  - Advanced filtering and search
  - School-wide analytics dashboard
  - Export and print capabilities

### 11.5 Teacher Functions
- View assigned classes, sections, subjects
- Question Bank Access\n- Question Paper Preparation with shuffle and auto-versioning
- **Question Paper History Management**:
  - View own paper history
  - Personal analytics dashboard
  - Version tracking and management
\n### 11.6 Student Functions
- View personal information
- Profile editing
\n### 11.7 User Profile Management
- Edit, Save, Approve, Suspend buttons
- Status-based navigation
\n### 11.8 Principal Dashboard - Total Teachers Card Feature
- Click to open Teachers Management page with tabbed interface
- Enhanced search and filter functionality
\n### 11.9 Principal Dashboard - Total Students Card Feature
- Click to open Students List page\n- Enhanced search with Class and Section filters

### 11.10 Admin Dashboard - Updated Card Display
- Display only Total Users and Total Schools cards
\n### 11.11 Landing Page - Updated Design
- Login and Register buttons removed from hero section
- Get Started section removed\n\n### 11.12 Question Paper History Feature
- Comprehensive tracking of all question papers
- Advanced filtering and search capabilities
- Paper versioning and relationship tracking
- Export and print functionality
- Analytics and reporting for both teachers and principals
- School-based data isolation and access control

## 12. Language Support

### 12.1 UI Language\n- **UI Language: English Only**
- All interface elements displayed in English
\n### 12.2 Chat/Communication Language
- Users can communicate in any language
\n### 12.3 Language Rule Summary
- **UI = Always English**
- **Chat/Communication = Any Language**
\n## 13. Future Scope Features
- Audit Logs
- Backup & Restore
- Notifications
- Analytics Dashboard with lesson-level performance and negative marking impact analysis
- Advanced question paper scheduling\n- Automated paper generation based on syllabus coverage
- Student performance tracking linked to question papers
\n## 14. Design Style\n
### 14.1 Color Scheme
- Primary color: Blue (#2563EB)
- Secondary color: Green (#10B981)
- Warning color: Red (#EF4444)
- Pending status color: Orange (#F59E0B)
- Match the Following badge color: Teal (#14B8A6)
- Multiple Response MCQ badge color: Indigo (#6366F1)
- Minus Mark color: Red (#EF4444) or Orange (#F59E0B)
- History/Archive color: Purple (#8B5CF6)

### 14.2 Visual Details
- Soft rounded corners (8px radius)
- Subtle shadow effects
- Clear borders\n- Status badges with appropriate colors
- Icon indicators for images and versions
\n### 14.3 Overall Layout
- Side panel navigation with collapsible toggle
- Card-based design\n- Responsive grid layout
- Status-based button navigation for Admin User Management
- Enhanced search and filter interfaces
- Question Bank dual view with image upload and minus mark support
- Question Paper Preparation with smart selection and auto-versioned shuffle
- **Question Paper History with advanced filtering, analytics, and version tracking**