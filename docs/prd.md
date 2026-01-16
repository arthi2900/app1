# A Cube - Online Exam System Requirements Document (Updated)

## 1. Application Description\n
### 1.1 Application Name
A Cube - Online Exam System

### 1.2 Application Purpose
A comprehensive online exam management platform for educational institutions, focusing on NEET preparation and school-level assessments. The system enables schools to create, conduct, and analyze exams efficiently with features including school management, academic structure setup, teacher-subject-class-section mapping, question bank management with bulk upload capability, question paper preparation with question usage tracking, online exam creation with approval workflow, user management with school-based data isolation, student allocation tracking, detailed performance analytics, real-time user login monitoring, and dynamic real-time storage monitoring for files and databases with user-wise tracking and server capacity comparison.

### 1.3 Tagline
Smart • Secure • Scalable Online Exams

---

## 8. Principal Dashboard - Question Bank Module (UPDATED)

### 8.1 Question Bank Overview (Principal Access)
- Purpose: Enable Principal to access and manage all question bank features available to Teachers within their school
- Access: Principal can view, create, edit, delete, and manage questions for their school
- Key Features:
  - Full access to all Teacher-level question bank functionalities
  - View all questions created by Teachers in their school
  - Create new questions with same capabilities as Teachers
  - Edit existing questions created by any Teacher in their school
  - Delete questions (with usage tracking validation)
  - Bulk upload questions using Excel template
  - Filter and search questions by subject, class, chapter, difficulty, etc.
  - Export question bank data\n  - Question usage tracking and analytics
  - Question approval workflow (if enabled)
\n### 8.2 Question Bank Interface (Principal Dashboard)
\n#### 8.2.1 Question Bank Page Layout
- Page title: 'Question Bank'
- Breadcrumb: Dashboard > Question Bank
- Filter panel on left (collapsible):
  - Subject filter (dropdown)
  - Class filter (dropdown)
  - Chapter filter (dropdown, dependent on subject)
  - Difficulty level filter (Easy, Medium, Hard)
  - Question type filter (MCQ, True/False, Fill in the Blanks, Short Answer, Long Answer)
  - Created by filter (dropdown showing all Teachers in school)
  - Date range filter (created date)\n  - Usage status filter (Used in papers, Not used)\n- Search bar at top
  - Search by question text, tags, or ID
- Action buttons at top-right:
  - Add Question button (gradient, purple-blue)
  - Bulk Upload button (outlined)\n  - Export button (outlined)
- Main question list area:\n  - Card-based layout with glassmorphism effect
  - Each card displays:
    - Question text (truncated with 'Read more' link)
    - Question type badge
    - Subject, Class, Chapter tags
    - Difficulty level badge (color-coded)
    - Created by (Teacher name)
    - Created date
    - Usage count (number of papers using this question)
    - Action buttons: Edit, Delete, View Details
  - Pagination at bottom
- Summary statistics at top:\n  - Total questions count
  - Questions by difficulty (Easy, Medium, Hard counts)
  - Questions by type (MCQ, True/False, etc. counts)
  - Most used questions count
\n#### 8.2.2 Add/Edit Question Dialog (UPDATED)
- Modal dialog with glassmorphism styling
- Title: 'Add Question' or 'Edit Question'
- Form fields:
  - **Subject:** Dropdown (required)
  - **Class:** Dropdown (required)
  - **Chapter:** Dropdown (required, dependent on subject)
  - **Question Type:** Dropdown (MCQ, True/False, Fill in the Blanks, Short Answer, Long Answer) (required)
  - **Difficulty Level:** Dropdown (Easy, Medium, Hard) (required)
  - **Question Text:** Rich text editor (required)
    - Supports formatting: bold, italic, underline, lists, tables\n    - Supports image upload\n    - Supports mathematical equations (LaTeX)
  - **Options:** (for MCQ and True/False)
    - **Option A:** Rich text editor with full formatting support
      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - Supports mathematical equations (LaTeX)
    - **Option B:** Rich text editor with full formatting support
      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - Supports mathematical equations (LaTeX)\n    - **Option C:** Rich text editor with full formatting support (MCQ only)
      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - Supports mathematical equations (LaTeX)\n    - **Option D:** Rich text editor with full formatting support (MCQ only)
      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - Supports mathematical equations (LaTeX)\n    - Correct Answer: Radio buttons to select correct option
  - **Answer:** (for Fill in the Blanks, Short Answer, Long Answer)
    - Text input or rich text editor
  - **Marks:** Number input (required)
  - **Tags:** Text input (comma-separated, optional)
  - **Explanation:** Rich text editor (optional)
    - Detailed explanation of the answer
- Save button (gradient, green)
- Cancel button (outlined)
- Validation messages

#### 8.2.3 Bulk Upload Questions\n- Same functionality as Teacher bulk upload
- Excel template with three sheets:
  - **Option Sheet:** Dropdown values for Subject, Class, Chapter, Question Type, Difficulty Level
  - **Question Sheet:** Data entry columns (Subject, Class, Chapter, Question Type, Difficulty Level, Question Text, Option A, Option B, Option C, Option D, Correct Answer, Marks, Tags, Explanation)
  - **Reference Sheet:** Example questions with filled data for reference
- Upload process:
  1. Principal clicks 'Bulk Upload' button\n  2. Download template link provided
  3. Principal fills template with question data
  4. Principal uploads filled template
  5. System validates data and shows preview
  6. Principal confirms upload
  7. Questions added to question bank with Principal as creator
- Validation rules:
  - All required fields must be filled
  - Subject, Class, Chapter must exist in system
  - Question Type and Difficulty Level must match dropdown values
  - Correct Answer must be one of the options (for MCQ/True-False)
  - Marks must be positive number
- Error handling:
  - Display row-wise errors if validation fails
  - Allow Principal to download error report
  - Allow Principal to fix errors and re-upload

#### 8.2.4 Question Details View
- Modal dialog or side panel\n- Display full question details:
  - Question text with formatting
  - Question type\n  - Subject, Class, Chapter
  - Difficulty level\n  - Options and correct answer (if applicable)
  - Answer (if applicable)
  - Marks\n  - Tags
  - Explanation
  - Created by (Teacher name)
  - Created date
  - Last modified date
  - Usage count with list of question papers using this question
- Action buttons:
  - Edit button\n  - Delete button
  - Close button
\n#### 8.2.5 Delete Question Validation
- Before deleting, system checks if question is used in any question paper
- If used:\n  - Display warning message: 'This question is used in X question paper(s). Deleting it will affect those papers. Are you sure you want to delete?'
  - List affected question papers
  - Require confirmation\n- If not used:
  - Display confirmation message: 'Are you sure you want to delete this question?'
  - Require confirmation
- After deletion:
  - Display success message\n  - Refresh question list

### 8.3 Question Bank Database Structure (Principal Access)

#### 8.3.1 Question Bank Table (No Changes)
- Existing table structure remains same
- Principal can create questions with their user_id as created_by
- Principal can edit/delete questions created by Teachers in their school
\n#### 8.3.2 Access Control Logic
- Principal can access all questions where:\n  - created_by is a Teacher in their school, OR
  - created_by is the Principal themselves
- Principal cannot access questions from other schools
- Principal has full CRUD permissions on accessible questions

### 8.4 Question Bank Backend Logic (Principal Access)

#### 8.4.1 Get Questions API (Principal)\n- **Endpoint:** GET /api/principal/question-bank
- **Query Parameters:**
  - subject_id (optional)\n  - class_id (optional)
  - chapter_id (optional)
  - difficulty_level (optional)
  - question_type (optional)
  - created_by (optional, Teacher user_id)
  - search (optional, search text)
  - page (optional, default: 1)
  - limit (optional, default: 20)
- **Response:**
  ```json
  {
    \"success\": true,
    \"data\": {\n      \"questions\": [\n        {
          \"id\": \"uuid\",
          \"subject_name\": \"Physics\",
          \"class_name\": \"Class 12\",
          \"chapter_name\": \"Electrostatics\",
          \"question_type\": \"MCQ\",
          \"difficulty_level\": \"Medium\",
          \"question_text\": \"What is the SI unit of electric charge?\",
          \"options\": [\"Ampere\", \"Coulomb\", \"Volt\", \"Ohm\"],
          \"correct_answer\": \"Coulomb\",\n          \"marks\": 4,
          \"tags\": [\"electric charge\", \"SI units\"],
          \"created_by_name\": \"John Doe\",
          \"created_at\": \"2026-01-10T10:00:00Z\",
          \"usage_count\": 5
        }
      ],
      \"total_count\": 150,
      \"page\": 1,
      \"limit\": 20,
      \"total_pages\": 8
    }
  }
  ```
- **Access Control:** Principal only, school-based data isolation
\n#### 8.4.2 Create Question API (Principal)
- **Endpoint:** POST /api/principal/question-bank
- **Request Body:** Same as Teacher create question API
- **Response:** Same as Teacher create question API
- **Access Control:** Principal only\n- **Logic:**
  - created_by set to Principal's user_id
  - school_id set to Principal's school_id
\n#### 8.4.3 Update Question API (Principal)
- **Endpoint:** PUT /api/principal/question-bank/:id
- **Request Body:** Same as Teacher update question API
- **Response:** Same as Teacher update question API
- **Access Control:** Principal only, can edit questions created by Teachers in their school
\n#### 8.4.4 Delete Question API (Principal)
- **Endpoint:** DELETE /api/principal/question-bank/:id
- **Response:** Same as Teacher delete question API
- **Access Control:** Principal only, can delete questions created by Teachers in their school
- **Validation:** Check if question is used in any question paper\n
#### 8.4.5 Bulk Upload Questions API (Principal)
- **Endpoint:** POST /api/principal/question-bank/bulk-upload
- **Request:** Multipart form data with Excel file\n- **Response:** Same as Teacher bulk upload API
- **Access Control:** Principal only
- **Logic:** Same as Teacher bulk upload, created_by set to Principal's user_id

#### 8.4.6 Export Questions API (Principal)
- **Endpoint:** GET /api/principal/question-bank/export
- **Query Parameters:** Same as Get Questions API filters
- **Response:** Excel file download\n- **Access Control:** Principal only
- **Logic:** Export all questions matching filters to Excel file

### 8.5 Question Bank UI Components (Principal Dashboard)

#### 8.5.1 Question Bank Card (Principal Dashboard)
- Card title: 'Question Bank'
- Card content:
  - Total questions count with icon
  - Quick action button: 'Manage Questions'
- Card styling: Glassmorphism with gradient effect
\n#### 8.5.2 Question Card (Question List)
- Glassmorphism card with hover effect
- Question text (truncated, max 2 lines)
- Question type badge (top-right corner)
- Subject, Class, Chapter tags (bottom)\n- Difficulty level badge (color-coded: Easy=green, Medium=orange, Hard=red)
- Created by (Teacher name with small profile picture)
- Created date (relative time, e.g., '2 days ago')
- Usage count badge (e.g., 'Used in 5 papers')\n- Action buttons (Edit, Delete, View Details) on hover

#### 8.5.3 Add/Edit Question Dialog (UPDATED)
- Modal dialog with glassmorphism styling
- Form layout with proper spacing
- Rich text editor with toolbar for Question Text
- **Rich text editor with toolbar for each Option (A, B, C, D)**
  - Full formatting support: bold, italic, underline, lists, tables
  - Image upload capability
  - LaTeX equation editor
- Image upload with preview
- LaTeX equation editor\n- Validation messages inline
- Save and Cancel buttons at bottom

#### 8.5.4 Bulk Upload Dialog\n- Modal dialog with glassmorphism styling
- Step-by-step upload process:\n  1. Download template
  2. Fill template\n  3. Upload filled template\n  4. Preview and validate
  5. Confirm upload
- Progress indicator for each step
- Error display with row-wise details
- Download error report button

#### 8.5.5 Question Details Panel
- Side panel or modal dialog
- Full question display with formatting
- All metadata displayed
- Usage list with question paper names
- Edit and Delete buttons at bottom

### 8.6 Question Bank Help and Documentation (Principal)

#### 8.6.1 Help Resources
- Help icon in Question Bank page
- Opens help dialog with:
  - Overview of Question Bank module
  - How to add questions manually
  - How to bulk upload questions
  - How to edit questions
  - How to delete questions
  - How to filter and search questions
  - How to export questions
  - Understanding question usage tracking
  - FAQ section

#### 8.6.2 FAQ Topics
- What is Question Bank?
- How to add a new question?
- How to bulk upload questions?
- What is the Excel template format?
- How to edit an existing question?
- Can I delete a question used in a question paper?
- How to search for specific questions?
- How to filter questions by subject/class/chapter?
- How to export question bank data?
- What is question usage tracking?
- Can I see which question papers use a specific question?
- How to use rich text editor for question formatting?
- How to add images to questions?
- How to add mathematical equations to questions?
- **How to format option text with rich text editor?**
- **Can I add images to option text?**
- **Can I add equations to option text?**
\n---

## 25. UPDATED: Real-Time Storage Monitoring Module\n
### 25.1 Real-Time Storage Monitoring Overview
- Purpose: Dynamically monitor file sizes and database sizes for all users in real-time across the platform with server capacity comparison
- Access:\n  - Admin can monitor storage usage of all users across all schools
- Key Features:
  - Dynamic real-time file storage monitoring with user-wise tracking
  - Dynamic real-time database storage monitoring with user-wise tracking
  - Display total file storage, total database storage, and combined total storage
  - Server capacity comparison: Display current usage vs. total server capacity
  - Real-time percentage calculation: (Current Usage / Server Capacity) × 100
  - Visual capacity indicators: Progress bars, gauges, and charts showing usage levels
  - Filter and search by user, school, role, or date range
  - Export storage usage reports
  - Analytics dashboard showing storage trends and top users by storage\n  - Real-time updates with auto-refresh (every 10 seconds)
  - Role-based access control (Admin only)\n  - Dynamic alerts for users exceeding storage thresholds
  - Server capacity alerts when total usage exceeds thresholds (e.g., 80%, 90%, 95%)
  - Storage optimization recommendations\n  - Predictive analytics: Estimate when server capacity will be reached based on current growth trends

### 25.2 Real-Time Storage Monitoring Database Structure

#### 25.2.1 User Storage Usage Table
Table name: user_storage_usage\n
Columns:
- id (UUID, Primary Key)
- user_id (Foreign Key → users.id, required)
- school_id (Foreign Key → schools.id, nullable)
- file_storage_bytes (BigInt, required)
  - Total size of all files uploaded by the user (in bytes)
  - Includes question images, profile pictures, uploaded documents, etc.
- database_storage_bytes (BigInt, required)\n  - Total size of database records associated with the user (in bytes)
  - Includes questions, question papers, exams, student attempts, etc.
- total_storage_bytes (BigInt, calculated)
  - Sum of file_storage_bytes and database_storage_bytes
- storage_status (Enum: Normal, Warning, Critical, required)
  - Normal: < 80% of user storage limit
  - Warning: 80-95% of user storage limit
  - Critical: > 95% of user storage limit
- last_calculated_at (Timestamp with timezone, required)
  - Timestamp of last storage calculation
- created_at (Timestamp)\n- updated_at (Timestamp)

**Note:** This table stores aggregated storage usage data for each user. Storage calculations are performed dynamically in real-time (every 10 seconds) and updated in this table.

#### 25.2.2 NEW: Server Capacity Configuration Table
Table name: server_capacity_config

Columns:
- id (UUID, Primary Key)\n- total_file_storage_capacity_bytes (BigInt, required)
  - Total file storage capacity of the server (in bytes)
  - Example: 1 TB = 1,099,511,627,776 bytes
- total_database_storage_capacity_bytes (BigInt, required)
  - Total database storage capacity of the server (in bytes)\n  - Example: 500 GB = 536,870,912,000 bytes
- total_storage_capacity_bytes (BigInt, calculated)
  - Sum of total_file_storage_capacity_bytes and total_database_storage_capacity_bytes
- alert_threshold_percentage (Decimal(5,2), required)
  - Percentage threshold for server capacity alerts (e.g., 80.00)\n- critical_threshold_percentage (Decimal(5,2), required)
  - Percentage threshold for critical server capacity alerts (e.g., 95.00)
- updated_by (Foreign Key → users.id, required)
- updated_at (Timestamp with timezone, required)
- created_at (Timestamp)

**Purpose:** This table stores server capacity configuration set by Admin. Admin can update these values to reflect actual server capacity.

#### 25.2.3 NEW: Server Storage Summary Table
Table name: server_storage_summary

Columns:
- id (UUID, Primary Key)
- total_file_storage_used_bytes (BigInt, required)\n  - Sum of all users' file_storage_bytes
- total_database_storage_used_bytes (BigInt, required)
  - Sum of all users' database_storage_bytes
- total_storage_used_bytes (BigInt, calculated)
  - Sum of total_file_storage_used_bytes and total_database_storage_used_bytes
- file_storage_usage_percentage (Decimal(5,2), calculated)
  - (total_file_storage_used_bytes / total_file_storage_capacity_bytes) × 100
- database_storage_usage_percentage (Decimal(5,2), calculated)
  - (total_database_storage_used_bytes / total_database_storage_capacity_bytes) × 100
- total_storage_usage_percentage (Decimal(5,2), calculated)\n  - (total_storage_used_bytes / total_storage_capacity_bytes) × 100\n- server_status (Enum: Normal, Warning, Critical, required)
  - Normal: total_storage_usage_percentage < alert_threshold_percentage
  - Warning: alert_threshold_percentage ≤ total_storage_usage_percentage < critical_threshold_percentage
  - Critical: total_storage_usage_percentage ≥ critical_threshold_percentage\n- last_calculated_at (Timestamp with timezone, required)
- created_at (Timestamp)
- updated_at (Timestamp)

**Purpose:** This table stores aggregated server-wide storage summary. Updated dynamically every 10 seconds.

#### 25.2.4 Storage Calculation Logic (UPDATED)
- **Dynamic File Storage Calculation:**
  - Real-time sum of all file sizes uploaded by the user
  - Query executed every 10 seconds:\n    ```sql
    SELECT SUM(file_size) FROM files WHERE user_id = [user_id]
    ```\n  - Includes:\n    - Question images (from question_bank table)
    - Profile pictures (from users table)
    - Uploaded documents (if any)
    - Bulk upload template files (if stored)\n\n- **Dynamic Database Storage Calculation:**
  - Real-time sum of estimated database record sizes for the user
  - Query executed every 10 seconds:
    ```sql
    SELECT \n      (SELECT COUNT(*) * [avg_question_size] FROM question_bank WHERE created_by = [user_id]) +
      (SELECT COUNT(*) * [avg_paper_size] FROM question_papers WHERE created_by = [user_id]) +
      (SELECT COUNT(*) * [avg_exam_size] FROM online_exams WHERE created_by = [user_id]) +
      (SELECT COUNT(*) * [avg_attempt_size] FROM student_exam_attempts WHERE student_id = [user_id]) +
      (SELECT COUNT(*) * [avg_login_size] FROM user_login_history WHERE user_id = [user_id])
    AS total_database_storage\n    ```
  - Note: Average record sizes are dynamically recalculated periodically based on actual data

- **Dynamic Total Storage Calculation:**
  - total_storage_bytes = file_storage_bytes + database_storage_bytes
  - Calculated in real-time for each user

- **Dynamic User Storage Status Calculation:**
  - Define storage limit per user (e.g., 1 GB = 1,073,741,824 bytes)
  - Calculate percentage: (total_storage_bytes / user_storage_limit) × 100
  - Set storage_status based on percentage:\n    - Normal: < 80%
    - Warning: 80-95%
    - Critical: > 95%
\n- **NEW: Dynamic Server Storage Summary Calculation:**
  - Aggregate all users' storage usage:\n    ```sql
    SELECT 
      SUM(file_storage_bytes) AS total_file_storage_used_bytes,
      SUM(database_storage_bytes) AS total_database_storage_used_bytes,
      SUM(total_storage_bytes) AS total_storage_used_bytes
    FROM user_storage_usage
    ```
  - Fetch server capacity from server_capacity_config table
  - Calculate usage percentages:\n    - file_storage_usage_percentage = (total_file_storage_used_bytes / total_file_storage_capacity_bytes) × 100\n    - database_storage_usage_percentage = (total_database_storage_used_bytes / total_database_storage_capacity_bytes) × 100
    - total_storage_usage_percentage = (total_storage_used_bytes / total_storage_capacity_bytes) × 100
  - Determine server_status based on total_storage_usage_percentage and thresholds
  - Update server_storage_summary table\n
### 25.3 Real-Time Storage Monitoring Interface (UPDATED)

#### 25.3.1 Real-Time Storage Monitoring Page Layout (UPDATED)
- Page title: 'Storage Monitoring'
- **NEW: Server Capacity Overview Section (Top of Page)**
  - Large glassmorphism card displaying:
    - **Total Server Capacity:** Display total storage capacity (e.g., '1.5 TB')
    - **Total Storage Used:** Display current total storage usage (e.g., '650 GB')
    - **Available Storage:** Display remaining storage (e.g., '850 GB')
    - **Usage Percentage:** Display percentage with large gauge chart (e.g., '43.3%')
    - **Server Status Badge:** Display status (Normal: green, Warning: orange, Critical: red)
    - **Visual Progress Bar:** Horizontal progress bar showing usage level with color coding
    - **File Storage Breakdown:**
      - Used: e.g., '400 GB'\n      - Capacity: e.g., '1 TB'
      - Percentage: e.g., '40%'
      - Mini progress bar\n    - **Database Storage Breakdown:**
      - Used: e.g., '250 GB'
      - Capacity: e.g., '500 GB'
      - Percentage: e.g., '50%'\n      - Mini progress bar
    - **Last Updated:** Display timestamp with relative time (e.g., '5 seconds ago')
- Auto-refresh indicator at top-right (e.g., 'Auto-refresh: ON | Last updated: 10 seconds ago')
- Manual refresh button at top-right
- **NEW: Configure Server Capacity Button** (Admin only)
  - Opens dialog to set/update server capacity values
- Filter panel on left (collapsible):
  - User filter (search by name or email)
  - School filter (Admin only)
  - Role filter (Admin only)
  - Storage status filter (Normal, Warning, Critical)\n  - Date range filter (for historical data)
- Search bar at top\n  - Search by user name or email
- Export button at top-right
  - Export as Excel/CSV
- Main table area:\n  - Columns:\n    - User Name
    - Role
    - School
    - File Storage\n    - Database Storage
    - Total Storage
    - **NEW: % of User Limit** (e.g., '65%')
    - Storage Status
    - Last Updated\n  - Sortable columns
  - Pagination at bottom
- **UPDATED: Summary statistics at top:**
  - Total file storage used (all users) with **percentage of server capacity** (e.g., '400 GB / 1 TB (40%)')
  - Total database storage used (all users) with **percentage of server capacity** (e.g., '250 GB / 500 GB (50%)')
  - Total storage used (files + database) with **percentage of server capacity** (e.g., '650 GB / 1.5 TB (43.3%)')
  - Average storage per user\n  - Users exceeding storage threshold count
- **UPDATED: Analytics section:**
  - **NEW: Server Capacity Gauge Chart:** Large circular gauge showing total storage usage percentage
  - Storage trend chart (line chart showing storage growth over time with **projected capacity exhaustion date**)
  - Top users by storage chart (bar chart showing users with highest storage usage)
  - Storage distribution by role chart (pie chart)\n  - Storage distribution by school chart (bar chart)
  - **NEW: Storage Growth Rate Chart:** Line chart showing daily/weekly storage growth rate
  - **NEW: Capacity Forecast Chart:** Predictive chart estimating when server capacity will be reached\n
#### 25.3.2 Storage Usage Display Columns (UPDATED)
- User Name: Display user's full name with profile picture
- Role: Display role badge (Admin, Principal, Teacher, Student)
- School: Display school name
- File Storage: Display file storage size with icon (e.g., '250 MB')
- Database Storage: Display database storage size with icon (e.g., '180 MB')
- Total Storage: Display total storage size with icon (e.g., '430 MB')
- **NEW: % of User Limit:** Display percentage of user's storage limit (e.g., '65%') with mini progress bar
- Storage Status: Display status badge (Normal: green, Warning: orange, Critical: red)
- Last Updated: Display timestamp with relative time (e.g., '10 seconds ago')
\n#### 25.3.3 NEW: Configure Server Capacity Dialog\n- Modal dialog with glassmorphism styling
- Title: 'Configure Server Capacity'\n- Form fields:
  - **Total File Storage Capacity:** Number input with unit selector (GB/TB)
  - **Total Database Storage Capacity:** Number input with unit selector (GB/TB)
  - **Alert Threshold Percentage:** Number input (e.g., 80)\n  - **Critical Threshold Percentage:** Number input (e.g., 95)
- Current values displayed with edit capability
- Save button with validation
- Cancel button
- Help text explaining each field

#### 25.3.4 Auto-Refresh Functionality (UPDATED)
- Auto-refresh enabled by default
- **Refresh interval: 10 seconds (configurable)**
- Auto-refresh indicator at top-right showing last update time
- Manual refresh button to force immediate refresh
- Toggle button to enable/disable auto-refresh
- **Real-time updates for:**
  - User storage usage table
  - Server capacity overview section
  - Summary statistics
  - Analytics charts

### 25.5 Real-Time Storage Monitoring Backend Logic (UPDATED)

#### 25.5.1 Dynamic Storage Calculation Process (UPDATED)
- **Real-Time Scheduled Job:**
  - Run storage calculation job **every 10 seconds** (configurable)
  - For each user:\n    - **Dynamically calculate file_storage_bytes** by querying file sizes in real-time
    - **Dynamically calculate database_storage_bytes** by querying record counts and sizes in real-time
    - Calculate total_storage_bytes\n    - Determine storage_status based on user storage limit\n    - Update user_storage_usage table
    - Set last_calculated_at to current timestamp
  - **Aggregate server-wide storage:**
    - Sum all users' file_storage_bytes → total_file_storage_used_bytes
    - Sum all users' database_storage_bytes → total_database_storage_used_bytes
    - Calculate total_storage_used_bytes
    - Fetch server capacity from server_capacity_config table
    - Calculate usage percentages
    - Determine server_status\n    - Update server_storage_summary table
    - Set last_calculated_at to current timestamp

#### 25.5.2 Dynamic File Storage Calculation (UPDATED)
- **Real-time query** all file records associated with the user:\n  ```sql
  SELECT SUM(file_size) FROM files WHERE user_id = [user_id]
  ```
- Include:
  - Question images
  - Profile pictures
  - Uploaded documents
  - Any other user-uploaded files
- **No static caching:** Always fetch latest data from database
\n#### 25.5.3 Dynamic Database Storage Calculation (UPDATED)
- **Real-time estimate** database record sizes for the user:
  ```sql
  SELECT 
    (SELECT COUNT(*) * [avg_question_size] FROM question_bank WHERE created_by = [user_id]) +
    (SELECT COUNT(*) * [avg_paper_size] FROM question_papers WHERE created_by = [user_id]) +
    (SELECT COUNT(*) * [avg_exam_size] FROM online_exams WHERE created_by = [user_id]) +
    (SELECT COUNT(*) * [avg_attempt_size] FROM student_exam_attempts WHERE student_id = [user_id]) +
    (SELECT COUNT(*) * [avg_login_size] FROM user_login_history WHERE user_id = [user_id])
  AS total_database_storage
  ```
- **Dynamic average record sizes:** Recalculate [avg_question_size], [avg_paper_size], etc. periodically (e.g., daily) based on actual data
- **No static constants:** Use dynamically calculated averages

#### 25.5.4 NEW: Server Capacity Configuration API\n- **Endpoint:** POST /api/admin/storage/configure-capacity
- **Request Body:**
  ```json
  {
    \"total_file_storage_capacity_gb\": 1024,
    \"total_database_storage_capacity_gb\": 512,
    \"alert_threshold_percentage\": 80,
    \"critical_threshold_percentage\": 95
  }
  ```
- **Response:**
  ```json
  {
    \"success\": true,
    \"message\": \"Server capacity configuration updated successfully\",
    \"data\": {
      \"total_file_storage_capacity_bytes\": 1099511627776,
      \"total_database_storage_capacity_bytes\": 549755813888,
      \"total_storage_capacity_bytes\": 1649267441664,
      \"alert_threshold_percentage\": 80,\n      \"critical_threshold_percentage\": 95
    }
  }
  ```
- **Access Control:** Admin only
- **Validation:**
  - Capacity values must be positive\n  - Alert threshold < Critical threshold
  - Thresholds must be between 0 and 100

#### 25.5.5 NEW: Server Storage Summary API
- **Endpoint:** GET /api/admin/storage/server-summary
- **Response:**
  ```json
  {
    \"success\": true,
    \"data\": {
      \"total_file_storage_used_bytes\": 429496729600,
      \"total_file_storage_used_gb\": 400,
      \"total_file_storage_capacity_bytes\": 1099511627776,\n      \"total_file_storage_capacity_gb\": 1024,
      \"file_storage_usage_percentage\": 39.06,
      \"total_database_storage_used_bytes\": 268435456000,
      \"total_database_storage_used_gb\": 250,
      \"total_database_storage_capacity_bytes\": 549755813888,
      \"total_database_storage_capacity_gb\": 512,
      \"database_storage_usage_percentage\": 48.83,
      \"total_storage_used_bytes\": 697932185600,
      \"total_storage_used_gb\": 650,
      \"total_storage_capacity_bytes\": 1649267441664,\n      \"total_storage_capacity_gb\": 1536,
      \"total_storage_usage_percentage\": 42.32,
      \"available_storage_bytes\": 951335256064,
      \"available_storage_gb\": 886,
      \"server_status\": \"Normal\",
      \"last_calculated_at\": \"2026-01-16T15:27:23Z\"
    }
  }
  ```
- **Access Control:** Admin only
- **Real-time data:** Fetched from server_storage_summary table (updated every 10 seconds)
\n#### 25.5.6 NEW: Predictive Analytics Logic
- **Storage Growth Rate Calculation:**
  - Calculate daily storage growth over past 30 days:\n    ```sql
    SELECT 
      DATE(last_calculated_at) AS date,
      SUM(total_storage_bytes) AS daily_total_storage\n    FROM user_storage_usage
    WHERE last_calculated_at >= NOW() - INTERVAL 30 DAY
    GROUP BY DATE(last_calculated_at)
    ORDER BY date ASC
    ```
  - Calculate average daily growth rate:\n    - growth_rate = (latest_total_storage - oldest_total_storage) / 30 days
\n- **Capacity Exhaustion Forecast:**
  - Calculate remaining capacity:\n    - remaining_capacity = total_storage_capacity_bytes - total_storage_used_bytes
  - Estimate days until capacity exhaustion:
    - days_until_exhaustion = remaining_capacity / average_daily_growth_rate
  - Projected exhaustion date:
    - exhaustion_date = current_date + days_until_exhaustion

- **Display Forecast:**
  - Show projected exhaustion date in analytics section
  - Display warning if exhaustion date is within 90 days
  - Display critical alert if exhaustion date is within 30 days

#### 25.5.7 Real-Time Update Mechanism (UPDATED)
- Use WebSocket or Server-Sent Events (SSE) for real-time updates
- Backend pushes updates to frontend **every 10 seconds**
- Frontend updates:\n  - Server capacity overview section
  - User storage usage table
  - Summary statistics
  - Analytics charts\n- **Efficient delta updates:** Only changed data sent to frontend
- **No full page refresh:** Seamless real-time experience

### 25.6 Real-Time Storage Monitoring UI Components (UPDATED)

#### 25.6.1 Storage Monitoring Card (Admin Dashboard) (UPDATED)
- Card title: 'Storage Monitoring'
- Card content:
  - **Total storage used with percentage** (e.g., '650 GB / 1.5 TB (43.3%)') with icon
  - **Server status badge** (Normal: green, Warning: orange, Critical: red)
  - **Mini progress bar** showing usage level
  - Quick action button: 'Monitor Storage'
- Card styling: Glassmorphism with gradient effect
\n#### 25.6.2 NEW: Server Capacity Overview Section\n- Large glassmorphism card at top of Storage Monitoring page
- Layout:
  - **Left side:**
    - Large circular gauge chart showing total storage usage percentage
    - Server status badge in center of gauge
  - **Right side:**
    - **Total Server Capacity:** Display with icon (e.g., '1.5 TB')
    - **Total Storage Used:** Display with icon (e.g., '650 GB')
    - **Available Storage:** Display with icon (e.g., '850 GB')
    - **Usage Percentage:** Display with large text (e.g., '43.3%')
    - **Horizontal progress bar** with color coding
  - **Bottom section:**
    - **File Storage Breakdown:**
      - Label: 'File Storage'
      - Used / Capacity (e.g., '400 GB / 1 TB')
      - Percentage (e.g., '40%')\n      - Mini horizontal progress bar
    - **Database Storage Breakdown:**
      - Label: 'Database Storage'
      - Used / Capacity (e.g., '250 GB / 500 GB')
      - Percentage (e.g., '50%')
      - Mini horizontal progress bar
  - **Last Updated:** Display timestamp with relative time\n  - **Configure Capacity Button:** Opens configuration dialog (Admin only)
- Styling: Glassmorphism with gradient effect, prominent placement

#### 25.6.3 Storage Usage Table (UPDATED)
- Responsive table with horizontal scroll
- Alternating row colors for readability
- Sortable columns with sort indicators
- Hover effects on rows
- Storage status badges with color coding (Normal: green, Warning: orange, Critical: red)
- **NEW: % of User Limit column** with mini progress bar
- File size display with icon\n- Database size display with icon\n- Total storage display with icon
- User profile picture and name
- Role badge\n- School name
- Last updated timestamp with relative time

#### 25.6.4 NEW: Configure Server Capacity Dialog
- Modal dialog with glassmorphism styling\n- Title: 'Configure Server Capacity'
- Form layout:
  - **Total File Storage Capacity:**
    - Number input field\n    - Unit selector dropdown (GB/TB)
    - Current value displayed
  - **Total Database Storage Capacity:**
    - Number input field
    - Unit selector dropdown (GB/TB)
    - Current value displayed
  - **Alert Threshold Percentage:**\n    - Number input field (0-100)
    - Current value displayed
  - **Critical Threshold Percentage:**
    - Number input field (0-100)\n    - Current value displayed
- Help text for each field
- Save button (gradient, green)\n- Cancel button (outlined)\n- Validation messages
\n#### 25.6.5 UPDATED: Summary Statistics Cards
- **Total File Storage Used:**
  - Display: '400 GB / 1 TB (40%)'
  - Icon: File icon
  - Color: Blue
  - Progress bar showing percentage
- **Total Database Storage Used:**
  - Display: '250 GB / 500 GB (50%)'
  - Icon: Database icon
  - Color: Purple
  - Progress bar showing percentage
- **Total Storage Used:**
  - Display: '650 GB / 1.5 TB (43.3%)'
  - Icon: Storage icon
  - Color: Teal
  - Progress bar showing percentage
- Average Storage Per User:
  - Display average storage usage per user
  - Icon: User icon
  - Color: Green
- Users Exceeding Threshold:
  - Display count of users with Warning or Critical status
  - Icon: Alert icon
  - Color: Orange/Red

#### 25.6.6 UPDATED: Analytics Section
- **NEW: Server Capacity Gauge Chart:**
  - Large circular gauge chart\n  - Display total storage usage percentage (e.g., '43.3%')
  - Color-coded segments (green < 80%, orange 80-95%, red > 95%)
  - Server status badge in center
- **Storage Trend Chart (UPDATED):**
  - Line chart showing storage growth over time
  - X-axis: Date/Time
  - Y-axis: Storage size (GB)
  - Multiple lines for file storage, database storage, and total storage
  - **NEW: Projected capacity exhaustion line** (dashed line showing forecast)
  - **NEW: Capacity limit line** (horizontal line showing server capacity)
  - Filter by date range
- Top Users by Storage Chart:\n  - Bar chart showing users with highest storage usage
  - X-axis: User names
  - Y-axis: Storage size (GB)
  - Color-coded bars based on storage status
- Storage Distribution by Role Chart:
  - Pie chart showing percentage of storage by role
  - Segments: Admin, Principal, Teacher, Student
- Storage Distribution by School Chart:
  - Bar chart showing storage usage by school
  - X-axis: School names
  - Y-axis: Storage size (GB)
- **NEW: Storage Growth Rate Chart:**
  - Line chart showing daily/weekly storage growth rate
  - X-axis: Date\n  - Y-axis: Growth rate (GB/day or GB/week)
  - Helps identify usage patterns and trends
- **NEW: Capacity Forecast Chart:**
  - Line chart showing projected storage usage
  - X-axis: Date (current date to projected exhaustion date)
  - Y-axis: Storage size (GB)
  - Current usage line
  - Projected usage line (dashed)
  - Capacity limit line (horizontal)
  - Shaded area showing safe zone
  - Display projected exhaustion date with warning badge

### 25.7 Real-Time Storage Monitoring Notifications (UPDATED)

#### 25.7.1 Admin Notifications (UPDATED)
- **Alert when user exceeds storage threshold** (Warning or Critical status)
- **NEW: Alert when server storage exceeds alert threshold** (e.g., 80%)
- **NEW: Critical alert when server storage exceeds critical threshold** (e.g., 95%)
- **NEW: Predictive alert when projected exhaustion date is within 90 days**
- **NEW: Critical predictive alert when projected exhaustion date is within 30 days**
- Daily summary of storage usage (optional)
- Alert on unusual storage growth patterns (optional)

### 25.8 Real-Time Storage Monitoring Analytics (UPDATED)

#### 25.8.1 Summary Statistics (UPDATED)
- **Total File Storage Used:** Sum of file_storage_bytes for all users **with percentage of server capacity**
- **Total Database Storage Used:** Sum of database_storage_bytes for all users **with percentage of server capacity**
- **Total Storage Used:** Sum of total_storage_bytes for all users **with percentage of server capacity**
- Average Storage Per User: Total storage / Number of users
- Users Exceeding Threshold: Count of users with Warning or Critical status\n- **NEW: Server Status:** Normal / Warning / Critical based on total_storage_usage_percentage
- **NEW: Available Storage:** Remaining server capacity (total_capacity - total_used)\n- **NEW: Projected Exhaustion Date:** Estimated date when server capacity will be reached
- **NEW: Days Until Exhaustion:** Number of days until projected exhaustion date

### 25.9 Real-Time Storage Monitoring Help and Documentation (UPDATED)

#### 25.9.1 Help Resources (UPDATED)
- Help icon in Storage Monitoring page
- Opens help dialog with:
  - Overview of Storage Monitoring module
  - **NEW: How to configure server capacity**
  - **NEW: How to interpret server capacity overview**
  - **NEW: Understanding usage percentages and server status**
  - How to filter storage usage data
  - How to search for specific user\n  - How to export storage usage reports
  - How to interpret storage status (Normal, Warning, Critical)
  - **NEW: Understanding predictive analytics and capacity forecasts**
  - How to optimize storage usage
  - FAQ section\n\n#### 25.9.2 FAQ Topics (UPDATED)
- What is Storage Monitoring?
- **NEW: How to configure server capacity?**
- **NEW: What is server capacity comparison?**
- **NEW: How is usage percentage calculated?**
- **NEW: What does server status mean?**
- How to view storage usage for all users?
- How to filter storage usage by school or role?
- How to search for specific user's storage usage?
- How to export storage usage reports?
- What does 'Normal' storage status mean?
- What does 'Warning' storage status mean?
- What does 'Critical' storage status mean?
- How is file storage calculated?
- How is database storage calculated?
- **NEW: How often is storage data updated?** (Answer: Every 10 seconds)
- Can I disable auto-refresh?
- How to optimize storage usage?
- What happens when a user exceeds storage limit?
- **NEW: What is predictive analytics?**
- **NEW: How is capacity exhaustion date calculated?**
- **NEW: What should I do when server capacity is running low?**
\n#### 25.9.3 Storage Optimization Recommendations (UPDATED)
- Delete unused questions from question bank
- Delete old question papers that are no longer needed
- Delete completed exams after archiving results
- Compress images before uploading
- Remove duplicate questions
- Archive old login history records
- Clean up draft exams that were never published
- **NEW: Monitor top users by storage and contact them for cleanup**
- **NEW: Set user storage limits to prevent excessive usage**
- **NEW: Implement automated cleanup policies for old data**
- **NEW: Consider upgrading server capacity if usage is consistently high**
- **NEW: Use predictive analytics to plan capacity upgrades in advance**

---

## 26. Conclusion (UPDATED)

A Cube - Online Exam System is a comprehensive platform designed for educational institutions to create, conduct, and analyze online exams efficiently. With its dark purple-blue gradient theme, glassmorphism design, and professional EdTech look, the system provides a modern and engaging user experience. The automatic passing marks calculation (35% of total marks), enhanced student exam interface with question palette and timer, rich text editor integration for question formatting with full formatting support for both question text and option text (including bold, italic, underline, lists, tables, image upload, and LaTeX equations), updated bulk upload functionality with three-sheet template structure (Option, Question, Reference) to separate dropdown values, data entry, and reference examples, preview and print functionality for question papers, real-time monitoring, comprehensive analytics, and robust security features make A Cube a smart, secure, and scalable solution for NEET preparation and school-level assessments. The latest enhancements include: (1) Full Question Bank access for Principals with all Teacher-level features including create, edit, delete, bulk upload, filter, search, export, and question usage tracking capabilities, enabling Principals to manage questions across their school efficiently; (2) Rich text editor support for option text in questions, allowing Teachers and Principals to format option text with bold, italic, underline, lists, tables, images, and mathematical equations, providing the same formatting flexibility for options as for question text; and (3) Dynamic Real-Time Storage Monitoring with Server Capacity Comparison—a powerful tool for administrators to monitor storage usage across the platform in real-time, compare current usage against total server capacity, receive dynamic alerts when thresholds are exceeded, and leverage predictive analytics to forecast capacity exhaustion dates. These features enable proactive server management, support capacity planning, improve resource allocation, identify storage bottlenecks, provide actionable insights for storage optimization, and ensure the platform can scale efficiently to meet growing demands. With dynamic calculations updated every 10 seconds, visual capacity indicators, server capacity configuration options, and comprehensive analytics dashboards, administrators have complete visibility and control over storage resources, enabling them to make informed decisions about server upgrades, data cleanup policies, and user storage limits.