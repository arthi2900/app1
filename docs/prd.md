# A Cube - Online Exam System Requirements Document (Final Version)

## 1. Application Description

### 1.1 Application Name
A Cube - Online Exam System

### 1.2 Application Purpose
A comprehensive online exam management platform for educational institutions, focusing on NEET preparation and school-level assessments. The system enables schools to create, conduct, and analyze exams efficiently with features including school management, academic structure setup, teacher-subject-class-section mapping, question bank management with bulk upload capability, question paper preparation with question usage tracking, online exam creation with approval workflow, user management with school-based data isolation, student allocation tracking, detailed performance analytics, real-time user login monitoring, and dynamic real-time storage monitoring for files and databases with user-wise tracking and server capacity comparison.

### 1.3 Tagline
Smart • Secure • Scalable Online Exams

---

## 2. Key Features Summary

### 2.1 Core Modules
1. **School Management:** Multi-school support with data isolation\n2. **Academic Structure:** Class, section, subject, and chapter management
3. **User Management:** Role-based access control (Admin, Principal, Teacher, Student)
4. **Teacher-Subject-Class-Section Mapping:** Flexible assignment system
5. **Question Bank:** Rich text editor with LaTeX support, bulk upload, serial numbers
6. **Question Paper Creation:** Smart selection, real-time statistics, preview and print
7. **Online Exam Management:** Exam creation, scheduling, approval workflow
8. **Student Exam Interface:** Question palette, timer, navigation, auto-submit
9. **Performance Analytics:** Detailed reports, charts, and insights
10. **Real-Time Login Monitoring:** Track active users and login history
11. **Real-Time Storage Monitoring:** Dynamic file and database storage tracking with server capacity comparison

### 2.2 Enhanced Features
- **Serial Number System:** Auto-generated unique serial numbers for all questions in Question Bank
- **Original Serial Number Maintenance:** Display Original Serial Numbers during question selection for question papers
- **Re-sequencing:** Automatically re-sequence selected questions as 1, 2, 3, etc. in final question paper
- **Live Rendered Output:** Real-time display of formatted text, equations, and images in question editor
- **Comprehensive Symbol Library:** Quick access to square root (√), division (÷), and 100+ mathematical and science symbols
- **Smart Selection:** Balanced distribution, even lesson coverage, easy question only
- **Predictive Analytics:** Forecast server capacity exhaustion dates
- **Server Capacity Comparison:** Real-time monitoring of storage usage vs. server capacity
\n---

## 3. Serial Number System (Question Bank)

### 3.1 Overview
- Every question in the Question Bank is assigned a unique, auto-generated serial number
- Serial numbers are formatted as zero-padded 3-digit numbers (e.g., #001, #002, #003)
- Serial numbers are unique within each school\n- Serial numbers are displayed prominently in question cards, question details, and question editor
\n### 3.2 Serial Number Generation Logic
- When creating a new question, the system finds the highest serial_number in the school\n- Increments by 1 and assigns to the new question
- Format: LPAD(next_number, 3, '0')
- Example: If highest serial_number is 025, next question gets 026

### 3.3 Serial Number Display
- **Question Bank Page:** Serial number displayed prominently at top-left corner of each question card (e.g., #001)\n- **Question Details Panel:** Serial number displayed at top (e.g., Question #001)
- **Add/Edit Question Dialog:** Serial number displayed as read-only field at top (e.g., #001)
- **Bulk Upload:** Serial numbers auto-generated during upload if not provided

### 3.4 Serial Number Rules
- Serial numbers are auto-generated during question creation and bulk upload
- Serial numbers remain unchanged during question edits
- Serial numbers are NOT re-sequenced when questions are deleted (gaps are allowed)
- Serial numbers can be used for filtering, searching, and sorting

### 3.5 Serial Number in Database
- **Table:** question_bank\n- **Column:** serial_number (String, unique within school, required)
- **Format:** Zero-padded 3-digit number (e.g., 001, 002, 003)\n- **Display Format:** #001, #002, #003 in UI
\n---

## 4. Original Serial Number Maintenance and Re-sequencing (Create Question Paper)

### 4.1 Overview
When creating a question paper, the system maintains Original Serial Numbers from the Question Bank during the selection process, then re-sequences selected questions for display in the final question paper.
\n### 4.2 Original Serial Number (During Selection)
- **Definition:** The serial number of the question from the Question Bank (e.g., #002, #005, #010)
- **Display Location:** Question selection table, filters, search, sorting, question details modal
- **Purpose:** Allows users to easily identify and select questions based on their Original Serial Numbers
- **Behavior:** Original Serial Numbers are displayed throughout the entire selection process

### 4.3 Re-sequenced Question Number (After Selection)
- **Definition:** The sequential question number in the question paper (e.g., 1, 2, 3, 4, etc.)
- **Display Location:** Question paper preview, final question paper output\n- **Purpose:** Provides clean, sequential numbering in the final question paper
- **Behavior:** Selected questions are automatically re-sequenced starting from 1

### 4.4 Example Workflow
1. **Selection Phase:**
   - User selects questions with Original Serial Numbers: #002, #005, #010
   - Question selection table displays: #002, #005, #010
   - User can filter, search, and sort by Original Serial Number
\n2. **Preview Phase:**
   - Selected questions are re-sequenced as: Question 1, Question 2, Question 3\n   - Question 1 corresponds to Original Serial Number #002
   - Question 2 corresponds to Original Serial Number #005
   - Question 3 corresponds to Original Serial Number #010

3. **Final Output:**
   - Question paper displays: Question 1, Question 2, Question 3
   - Backend stores both original_serial_number and paper_question_number
\n### 4.5 Database Structure
**Table:** question_paper_questions
\n**Columns:**
- id (UUID, Primary Key)
- paper_id (Foreign Key → question_papers.id, required)
- question_id (Foreign Key → question_bank.id, required)
- **original_serial_number (String, required)**
  - The serial number of the question from Question Bank (e.g., 001, 002, 010)
  - This is the question's original serial number and remains unchanged
- **paper_question_number (Integer, required)**
  - The re-sequenced question number in the question paper (e.g., 1, 2, 3, 4, etc.)
  - This is the display order in the question paper
- marks (Integer, required)
- created_at (Timestamp)\n- updated_at (Timestamp)
\n### 4.6 Benefits\n- **Traceability:** Maintain link to original Question Bank during selection
- **Professional Presentation:** Clean, sequential numbering in final question paper
- **Data Integrity:** Store both original and re-sequenced numbers for future analysis
- **Cross-referencing:** Enable question reuse tracking and analysis across question papers

---
\n## 5. Question Bank Module (Consolidated)

### 5.1 Overview
- Purpose: Enable Teachers and Principals to create, manage, and organize questions
- Access: Teachers can manage their own questions; Principals can manage all questions in their school
- Key Features:
  - Create questions with rich text editor and LaTeX support
  - Bulk upload questions using Excel template
  - Filter, search, and sort questions by various criteria
  - View question details with rendered output
  - Edit and delete questions with usage tracking validation
  - Export question bank data\n  - Serial number system for unique question identification

### 5.2 Question Bank Interface
\n#### 5.2.1 Question Bank Page Layout
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
  - Search by question text, tags, serial number, or ID
- Action buttons at top-right:
  - Add Question button (gradient, purple-blue)
  - Bulk Upload button (outlined)\n  - Export button (outlined)\n- Main question list area:\n  - Card-based layout with glassmorphism effect
  - Each card displays:\n    - **Serial Number (displayed prominently at top-left corner of card, e.g., #001, #002, #003)**
    - **Question text (rendered output with full formatting, equations, and images displayed directly)**
    - Question type badge\n    - Subject, Class, Chapter tags
    - Difficulty level badge (color-coded)
    - **Options (rendered output with full formatting, equations, and images displayed directly for MCQ/True-False)**
    - **Correct Answer (rendered output with full formatting, equations, and images displayed directly)**
    - Created by (Teacher name)
    - Created date
    - Usage count (number of papers using this question)
    - Action buttons: Edit, Delete, View Details\n  - Pagination at bottom
- Summary statistics at top:\n  - Total questions count
  - Questions by difficulty (Easy, Medium, Hard counts)
  - Questions by type (MCQ, True/False, etc. counts)
  - Most used questions count
\n#### 5.2.2 Add/Edit Question Dialog
- Modal dialog with glassmorphism styling
- Title: 'Add Question' or 'Edit Question'
- Form fields:
  - **Serial Number:** Auto-generated, displayed as read-only field (e.g., #001, #002, #003)
  - **Subject:** Dropdown (required)
  - **Class:** Dropdown (required)
  - **Chapter:** Dropdown (required, dependent on subject)
  - **Question Type:** Dropdown (MCQ, True/False, Fill in the Blanks, Short Answer, Long Answer) (required)
  - **Difficulty Level:** Dropdown (Easy, Medium, Hard) (required)
  - **Question Text:** Rich text editor with live rendered output (required)
    - Editor area with toolbar at top
    - **Live rendered output displayed directly below editor as user types**
    - Supports formatting: bold, italic, underline, lists, tables\n    - Supports image upload\n    - **Supports mathematical equations (LaTeX) with comprehensive symbol library including:**
      - **Square root (√) symbol**
      - **Division (÷) symbol**
      - **All basic mathematical operators:** +, −, ×, ÷, =, ≠, <, >, ≤, ≥
      - **Fractions and exponents**
      - **Greek letters:** α, β, γ, δ, θ, λ, μ, π, σ, ω, etc.
      - **Mathematical symbols:** ∑, ∫, ∂, ∞, √, ∛, ∜, ±, ∓, ×, ÷, ≈, ≡, ∝, ∠, ⊥, ∥, °\n      - **Set theory symbols:** ∈, ∉, ⊂, ⊃, ∪, ∩, ∅\n      - **Logic symbols:** ∧, ∨, ¬, ⇒, ⇔, ∀, ∃\n      - **Science symbols:** Å, ℃, ℉, Ω, μ, ℓ, mol, etc.
      - **Chemistry symbols:** →, ⇌, ↑, ↓, Δ, etc.
      - **Physics symbols:** ℏ, ε₀, μ₀, c, g, etc.
    - **Enhanced equation editor toolbar with quick access buttons for:**
      - Square root button (√)
      - Division button (÷)
      - Fraction button (a/b)
      - Exponent button (x²)
      - Subscript button (x₁)\n      - Symbol palette dropdown with categorized symbols:\n        - Basic Math\n        - Greek Letters
        - Operators\n        - Relations
        - Arrows
        - Set Theory
        - Logic
        - Geometry
        - Science & Chemistry
        - Physics
    - **Rendered output area shows formatted text, equations, and images in real-time**
  - **Options:** (for MCQ and True/False)\n    - **Option A:** Rich text editor with live rendered output
      - Editor area with toolbar\n      - **Live rendered output displayed directly below editor**
      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - **Supports mathematical equations (LaTeX) with comprehensive symbol library**
      - **Enhanced equation editor toolbar with quick access to all symbols**
    - **Option B:** Rich text editor with live rendered output
      - Editor area with toolbar
      - **Live rendered output displayed directly below editor**
      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - **Supports mathematical equations (LaTeX) with comprehensive symbol library**\n      - **Enhanced equation editor toolbar with quick access to all symbols**\n    - **Option C:** Rich text editor with live rendered output (MCQ only)
      - Editor area with toolbar
      - **Live rendered output displayed directly below editor**\n      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - **Supports mathematical equations (LaTeX) with comprehensive symbol library**
      - **Enhanced equation editor toolbar with quick access to all symbols**
    - **Option D:** Rich text editor with live rendered output (MCQ only)
      - Editor area with toolbar
      - **Live rendered output displayed directly below editor**\n      - Supports formatting: bold, italic, underline, lists, tables
      - Supports image upload
      - **Supports mathematical equations (LaTeX) with comprehensive symbol library**
      - **Enhanced equation editor toolbar with quick access to all symbols**
    - **Correct Answer:** Radio buttons to select correct option
      - **Selected correct answer displayed with rendered output below radio buttons**
  - **Answer:** (for Fill in the Blanks, Short Answer, Long Answer)
    - Rich text editor with live rendered output
    - **Live rendered output displayed directly below editor**
    - **Supports mathematical equations (LaTeX) with comprehensive symbol library**
    - **Enhanced equation editor toolbar with quick access to all symbols**
  - **Marks:** Number input (required)
  - **Tags:** Text input (comma-separated, optional)
  - **Explanation:** Rich text editor with live rendered output (optional)
    - Detailed explanation of the answer
    - **Live rendered output displayed directly below editor**
    - **Supports mathematical equations (LaTeX) with comprehensive symbol library**\n    - **Enhanced equation editor toolbar with quick access to all symbols**\n- Save button (gradient, green)
- Cancel button (outlined)
- Validation messages\n\n#### 5.2.3 Bulk Upload Questions
- Excel template with three sheets:
  - **Option Sheet:** Dropdown values for Subject, Class, Chapter, Question Type, Difficulty Level\n  - **Question Sheet:** Data entry columns (Serial Number, Subject, Class, Chapter, Question Type, Difficulty Level, Question Text, Option A, Option B, Option C, Option D, Correct Answer, Marks, Tags, Explanation)
  - **Reference Sheet:** Example questions with filled data for reference
- Upload process:
  1. User clicks 'Bulk Upload' button\n  2. Download template link provided
  3. User fills template with question data (Serial Number auto-generated during upload if not provided)
  4. User uploads filled template
  5. System validates data and shows preview
  6. User confirms upload
  7. Questions added to question bank with user as creator and auto-generated serial numbers
- Validation rules:
  - All required fields must be filled
  - Subject, Class, Chapter must exist in system
  - Question Type and Difficulty Level must match dropdown values
  - Correct Answer must be one of the options (for MCQ/True-False)
  - Marks must be positive number
  - Serial Number auto-generated if not provided
- Error handling:
  - Display row-wise errors if validation fails
  - Allow user to download error report
  - Allow user to fix errors and re-upload

#### 5.2.4 Question Details View
- Modal dialog or side panel\n- Display full question details:\n  - **Serial Number (displayed prominently at top, e.g., Question #001)**
  - **Question text (rendered output with full formatting, equations, and images)**
  - Question type\n  - Subject, Class, Chapter\n  - Difficulty level
  - **Options (rendered output with full formatting, equations, and images for MCQ/True-False)**\n  - **Correct answer (rendered output with full formatting, equations, and images)**
  - **Answer (rendered output with full formatting, equations, and images for other question types)**
  - Marks
  - Tags
  - **Explanation (rendered output with full formatting, equations, and images)**
  - Created by (Teacher name)
  - Created date
  - Last modified date
  - Usage count with list of question papers using this question
- Action buttons:
  - Edit button\n  - Delete button
  - Close button\n\n#### 5.2.5 Delete Question Validation
- Before deleting, system checks if question is used in any question paper
- If used:\n  - Display warning message: 'This question is used in X question paper(s). Deleting it will affect those papers. Are you sure you want to delete?'
  - List affected question papers
  - Require confirmation\n- If not used:
  - Display confirmation message: 'Are you sure you want to delete this question?'
  - Require confirmation
- After deletion:
  - Display success message\n  - Refresh question list
\n### 5.3 Question Bank Database Structure

#### 5.3.1 Question Bank Table
- Table name: question_bank
- Columns:
  - id (UUID, Primary Key)
  - **serial_number (String, unique within school, required)**
    - Format: Zero-padded 3-digit number (e.g., 001, 002, 003)
    - Auto-generated sequentially within each school
    - Displayed as #001, #002, #003 in UI
  - school_id (Foreign Key → schools.id, required)
  - subject_id (Foreign Key → subjects.id, required)
  - class_id (Foreign Key → classes.id, required)
  - chapter_id (Foreign Key → chapters.id, required)
  - question_type (Enum: MCQ, True/False, Fill in the Blanks, Short Answer, Long Answer, required)
  - difficulty_level (Enum: Easy, Medium, Hard, required)
  - question_text (Text, required)
  - question_text_rendered (Text, required)
  - options (JSON, nullable)
  - options_rendered (JSON, nullable)
  - correct_answer (Text, nullable)
  - correct_answer_rendered (Text, nullable)\n  - answer (Text, nullable)
  - answer_rendered (Text, nullable)\n  - marks (Integer, required)
  - tags (JSON, nullable)
  - explanation (Text, nullable)
  - explanation_rendered (Text, nullable)\n  - created_by (Foreign Key → users.id, required)\n  - created_at (Timestamp)
  - updated_at (Timestamp)
  - usage_count (Integer, default: 0)

### 5.4 Question Bank Backend Logic

#### 5.4.1 Get Questions API
- **Endpoint:** GET /api/question-bank\n- **Query Parameters:**
  - subject_id (optional)
  - class_id (optional)
  - chapter_id (optional)
  - difficulty_level (optional)\n  - question_type (optional)
  - created_by (optional, Teacher user_id)
  - search (optional, search text including serial number)
  - page (optional, default: 1)
  - limit (optional, default: 20)
- **Response:**
  ```json
  {\n    \"success\": true,
    \"data\": {\n      \"questions\": [\n        {
          \"id\": \"uuid\",
          \"serial_number\": \"001\",
          \"subject_name\": \"Physics\",
          \"class_name\": \"Class 12\",
          \"chapter_name\": \"Electrostatics\",
          \"question_type\": \"MCQ\",
          \"difficulty_level\": \"Medium\",\n          \"question_text\": \"What is the SI unit of electric charge?\",
          \"question_text_rendered\": \"<p>What is the SI unit of electric charge?</p>\",\n          \"options\": [\"Ampere\", \"Coulomb\", \"Volt\", \"Ohm\"],
          \"options_rendered\": [\"<p>Ampere</p>\", \"<p>Coulomb</p>\", \"<p>Volt</p>\", \"<p>Ohm</p>\"],
          \"correct_answer\": \"Coulomb\",
          \"correct_answer_rendered\": \"<p>Coulomb</p>\",
          \"marks\": 4,
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
- **Access Control:** Teachers and Principals only, school-based data isolation
\n#### 5.4.2 Create Question API
- **Endpoint:** POST /api/question-bank
- **Request Body:**
  ```json
  {
    \"subject_id\": \"uuid\",
    \"class_id\": \"uuid\",\n    \"chapter_id\": \"uuid\",
    \"question_type\": \"MCQ\",
    \"difficulty_level\": \"Medium\",\n    \"question_text\": \"What is the SI unit of electric charge?\",
    \"options\": [\"Ampere\", \"Coulomb\", \"Volt\", \"Ohm\"],
    \"correct_answer\": \"Coulomb\",
    \"marks\": 4,
    \"tags\": [\"electric charge\", \"SI units\"],
    \"explanation\": \"The SI unit of electric charge is Coulomb (C).\"\n  }
  ```\n- **Response:**
  ```json
  {
    \"success\": true,\n    \"message\": \"Question created successfully\",
    \"data\": {
      \"id\": \"uuid\",\n      \"serial_number\": \"001\",
      \"subject_name\": \"Physics\",
      \"class_name\": \"Class 12\",
      \"chapter_name\": \"Electrostatics\",
      \"question_type\": \"MCQ\",
      \"difficulty_level\": \"Medium\",\n      \"question_text\": \"What is the SI unit of electric charge?\",
      \"question_text_rendered\": \"<p>What is the SI unit of electric charge?</p>\",\n      \"options\": [\"Ampere\", \"Coulomb\", \"Volt\", \"Ohm\"],
      \"options_rendered\": [\"<p>Ampere</p>\", \"<p>Coulomb</p>\", \"<p>Volt</p>\", \"<p>Ohm</p>\"],
      \"correct_answer\": \"Coulomb\",
      \"correct_answer_rendered\": \"<p>Coulomb</p>\",
      \"marks\": 4,
      \"tags\": [\"electric charge\", \"SI units\"],
      \"explanation\": \"The SI unit of electric charge is Coulomb (C).\",
      \"explanation_rendered\": \"<p>The SI unit of electric charge is Coulomb (C).</p>\",
      \"created_at\": \"2026-01-20T15:21:23Z\"\n    }
  }\n  ```
- **Access Control:** Teachers and Principals only\n- **Logic:**
  - created_by set to user's user_id
  - school_id set to user's school_id
  - **serial_number auto-generated sequentially within school**
  - **Backend renders question_text, options, correct_answer, and explanation to HTML and stores both raw and rendered versions**

#### 5.4.3 Update Question API
- **Endpoint:** PUT /api/question-bank/:id
- **Request Body:** Same as Create Question API
- **Response:** Same as Create Question API
- **Access Control:** Teachers can edit their own questions; Principals can edit all questions in their school
- **Logic:**
  - **serial_number remains unchanged during edit**
  - **Backend re-renders question_text, options, correct_answer, and explanation to HTML and updates both raw and rendered versions**

#### 5.4.4 Delete Question API
- **Endpoint:** DELETE /api/question-bank/:id
- **Response:**
  ```json
  {
    \"success\": true,
    \"message\": \"Question deleted successfully\"\n  }
  ```\n- **Access Control:** Teachers can delete their own questions; Principals can delete all questions in their school
- **Validation:** Check if question is used in any question paper\n- **Logic:**
  - **Serial numbers of remaining questions remain unchanged (no re-sequencing)**
\n#### 5.4.5 Bulk Upload Questions API
- **Endpoint:** POST /api/question-bank/bulk-upload
- **Request:** Multipart form data with Excel file
- **Response:**
  ```json
  {\n    \"success\": true,
    \"message\": \"25 questions uploaded successfully\",
    \"data\": {\n      \"total_uploaded\": 25,
      \"errors\": []
    }
  }
  ```
- **Access Control:** Teachers and Principals only
- **Logic:**
  - Parse Excel file and validate data
  - **Serial numbers auto-generated sequentially for all uploaded questions**
  - **Backend renders all question_text, options, correct_answer, and explanation fields to HTML during bulk upload**
  - Create question_bank records\n  - Return success message with count

#### 5.4.6 Export Questions API
- **Endpoint:** GET /api/question-bank/export
- **Query Parameters:** Same as Get Questions API filters
- **Response:** Excel file download with serial_number column included
- **Access Control:** Teachers and Principals only
- **Logic:** Export all questions matching filters to Excel file
\n---

## 6. Create Question Paper Module (Consolidated)

### 6.1 Overview
- Purpose: Enable Teachers and Principals to create question papers by selecting questions from the question bank
- Access: Teachers and Principals can create question papers for their school
- Key Features:
  - Select questions from question bank
  - **Display Original Serial Number from Question Bank for each question in the Select Questions interface**
  - **Filter and search questions by Original Serial Number**
  - **Sort questions by Original Serial Number**
  - **Maintain Original Serial Numbers throughout the selection process**
  - **Re-sequence selected questions as 1, 2, 3, etc. after selection is completed**
  - Filter questions by subject, class, chapter, difficulty, question type\n  - View question details before selection
  - Real-time statistics showing total marks, question count, difficulty distribution
  - Smart selection features (balanced distribution, even lesson coverage, easy question only)
  - Preview and print question paper
  - Save question paper as draft or publish
  - Question usage tracking

### 6.2 Create Question Paper Interface

#### 6.2.1 Create Question Paper Page Layout
- Page title: 'Create Question Paper'
- Breadcrumb: Dashboard > Question Paper History > Create Question Paper
- Multi-step wizard:
  - Step 1: Basic Details (paper name, subject, class, total marks, duration)
  - Step 2: Select Questions\n  - Step 3: Preview & Save
\n#### 6.2.2 Step 2: Select Questions Interface
- Section title: 'Select Questions'
- Subtitle: 'Choose questions from your question bank'
- Two view modes:
  - **View All Questions:** Display all available questions in a table
  - **View by Question Bank:** Display questions grouped by question bank (if applicable)
- **Filter panel on left (collapsible):**
  - All Difficulty dropdown (Easy, Medium, Hard)
  - All Lessons dropdown (filter by chapter/lesson)
  - **Original Serial Number filter (text input for exact match or range, e.g., 001 or 001-010)**
  - Subject filter (auto-filled from Step 1)
  - Class filter (auto-filled from Step 1)
  - Chapter filter (dropdown)\n  - Question type filter (MCQ, True/False, Fill in the Blanks, Short Answer, Long Answer)
  - Difficulty level filter (Easy, Medium, Hard)
  - Created by filter (dropdown showing all Teachers in school)
- **Quick filter buttons:**
  - Select All\n  - Select Easy
  - Select Medium
  - Select Hard
  - Clear\n- **Search bar at top:**
  - Search by question text, tags, **Original Serial Number**, or ID
  - Placeholder: 'Search by question text, tags, original serial number, or ID'
- **Main question selection table:**
  - Columns:\n    - **Select (Checkbox)**
    - **Original Serial Number (e.g., #001, #002, #003) - Sortable column**
    - **Question (truncated text with 'View Details' link)**
    - **Type (MCQ, True/False, etc.)**
    - **Difficulty (Easy, Medium, Hard badge)**
    - **Marks**
  - **Original Serial Number column displayed prominently as the second column (after Select checkbox)**
  - **Original Serial Number is sortable (ascending/descending)**
  - **IMPORTANT: Original Serial Number always displays the question's serial number from the Question Bank (e.g., if a question is #002 in Question Bank, it displays as #002 here)**
  - Each row displays:\n    - Checkbox for selection
    - **Original Serial Number (e.g., #002) with badge styling - this is the question's serial number from Question Bank**
    - Question text (truncated, with tooltip showing full text on hover)
    - Question type badge
    - Difficulty level badge (color-coded)
    - Marks
  - Click on question text or 'View Details' link to open question details modal
  - Pagination at bottom\n- **Real-time Statistics Panel (Right side):**
  - Card title: 'Real-time Statistics'
  - Card subtitle: 'Current selection analysis'
  - Statistics displayed:
    - **Total Marks:** Display total marks of selected questions with large number and icon
    - **Questions Selected:** Display count of selected questions (e.g., '0 / 123')
    - **Difficulty Distribution:**
      - Easy: count and percentage (e.g., '0 (0%)')
      - Medium: count and percentage\n      - Hard: count and percentage
    - **Lesson Coverage:** Display percentage of lessons covered (e.g., '0 / 8' with '0% of lessons covered')
  - **Smart Selection Section:**
    - Card title: 'Smart Selection'
    - Card subtitle: 'Auto-select questions based on criteria'
    - Buttons:
      - **Balanced Distribution:** Auto-select questions with balanced difficulty distribution
      - **Even Lesson Coverage:** Auto-select questions covering all lessons evenly
      - **Easy Question Only:** Auto-select only easy questions
\n#### 6.2.3 Question Details Modal (in Select Questions step)
- Modal dialog with glassmorphism styling
- Title: 'Question Details'
- Display full question details:
  - **Original Serial Number (displayed prominently at top, e.g., Question #002 - this is the question's serial number from Question Bank)**
  - **Question text (rendered output with full formatting, equations, and images)**
  - Question type\n  - Subject, Class, Chapter\n  - Difficulty level
  - **Options (rendered output with full formatting, equations, and images for MCQ/True-False)**
  - **Correct answer (rendered output with full formatting, equations, and images)**
  - **Answer (rendered output with full formatting, equations, and images for other question types)**
  - Marks
  - Tags
  - **Explanation (rendered output with full formatting, equations, and images)**
  - Created by (Teacher name)
  - Created date
  - Usage count with list of question papers using this question
- Action buttons:
  - **Select Question button (if not already selected)**
  - **Deselect Question button (if already selected)**
  - Close button
\n#### 6.2.4 Step 3: Preview & Save\n- Section title: 'Preview & Save'\n- Preview area:
  - Display question paper in formatted layout
  - Show paper name, subject, class, total marks, duration at top
  - **Display questions with Re-sequenced Serial Numbers (1, 2, 3, 4, etc.)**
  - **IMPORTANT: After selection is completed, questions are re-sequenced starting from 1**
  - **Example: If selected questions have Original Serial Numbers #002, #005, #010 in Question Bank, they will be displayed as Question 1, Question 2, Question 3 in the preview**
  - Display questions grouped by section (if applicable)
  - Display question text, options, marks for each question
  - Print button to print question paper
- Save options:
  - Save as Draft button
  - Publish button
- Validation:
  - Ensure at least one question is selected
  - Ensure total marks match the target total marks (if specified in Step 1)
\n### 6.3 Create Question Paper Backend Logic

#### 6.3.1 Get Available Questions API
- **Endpoint:** GET /api/question-paper/available-questions
- **Query Parameters:**
  - subject_id (required)
  - class_id (required)
  - chapter_id (optional)
  - difficulty_level (optional)
  - question_type (optional)
  - created_by (optional)\n  - **serial_number (optional, exact match or range, e.g., 001 or 001-010)**
  - search (optional, search text including serial number)
  - sort_by (optional, e.g., 'serial_number', 'created_at', 'difficulty_level')
  - sort_order (optional, 'asc' or 'desc')\n  - page (optional, default: 1)
  - limit (optional, default: 20)
- **Response:**
  ```json
  {\n    \"success\": true,
    \"data\": {\n      \"questions\": [\n        {
          \"id\": \"uuid\",
          \"serial_number\": \"001\",
          \"subject_name\": \"Physics\",
          \"class_name\": \"Class 12\",
          \"chapter_name\": \"Electrostatics\",
          \"question_type\": \"MCQ\",
          \"difficulty_level\": \"Medium\",
          \"question_text\": \"What is the SI unit of electric charge?\",
          \"question_text_rendered\": \"<p>What is the SI unit of electric charge?</p>\",
          \"options\": [\"Ampere\", \"Coulomb\", \"Volt\", \"Ohm\"],\n          \"options_rendered\": [\"<p>Ampere</p>\", \"<p>Coulomb</p>\", \"<p>Volt</p>\", \"<p>Ohm</p>\"],
          \"correct_answer\": \"Coulomb\",
          \"correct_answer_rendered\": \"<p>Coulomb</p>\",
          \"marks\": 4,
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
- **Access Control:** Teachers and Principals only, school-based data isolation
- **Logic:**
  - Fetch questions matching filters from question_bank table
  - **Support filtering by serial_number (exact match or range)**
  - **Support sorting by serial_number (ascending/descending)**
  - **Include serial_number in response for each question - this is the Original Serial Number from Question Bank**
  - Return paginated results\n
#### 6.3.2 Create Question Paper API\n- **Endpoint:** POST /api/question-paper/create
- **Request Body:**
  ```json
  {
    \"paper_name\": \"Physics Mid-Term Exam\",
    \"subject_id\": \"uuid\",
    \"class_id\": \"uuid\",\n    \"total_marks\": 100,
    \"duration_minutes\": 180,
    \"question_ids\": [\"uuid1\", \"uuid2\", \"uuid3\"],
    \"status\": \"draft\"\n  }
  ```\n- **Response:**
  ```json
  {
    \"success\": true,\n    \"message\": \"Question paper created successfully\",
    \"data\": {
      \"paper_id\": \"uuid\",
      \"paper_name\": \"Physics Mid-Term Exam\",
      \"subject_name\": \"Physics\",
      \"class_name\": \"Class 12\",
      \"total_marks\": 100,
      \"duration_minutes\": 180,
      \"question_count\": 25,
      \"status\": \"draft\",
      \"created_at\": \"2026-01-20T15:21:23Z\"\n    }
  }\n  ```
- **Access Control:** Teachers and Principals only\n- **Validation:**
  - Ensure all question_ids exist and belong to the same school
  - Ensure total marks match sum of selected questions' marks (if strict validation enabled)
  - Ensure at least one question is selected
- **Logic:**
  - Create question_papers record
  - **Create question_paper_questions records linking paper to questions with re-sequenced order (1, 2, 3, etc.)**
  - **Store both original_serial_number (from Question Bank) and paper_question_number (re-sequenced 1, 2, 3, etc.) in question_paper_questions table**
  - Update usage_count for each selected question
  - Return created paper details

---

## 7. Real-Time Storage Monitoring Module (Consolidated)

### 7.1 Overview
- Purpose: Dynamically monitor file sizes and database sizes for all users in real-time across the platform with server capacity comparison
- Access: Admin can monitor storage usage of all users across all schools
- Key Features:\n  - Dynamic real-time file storage monitoring with user-wise tracking
  - Dynamic real-time database storage monitoring with user-wise tracking
  - Display total file storage, total database storage, and combined total storage
  - Server capacity comparison: Display current usage vs. total server capacity
  - Real-time percentage calculation: (Current Usage / Server Capacity) × 100
  - Visual capacity indicators: Progress bars, gauges, and charts showing usage levels
  - Filter and search by user, school, role, or date range
  - Export storage usage reports\n  - Analytics dashboard showing storage trends and top users by storage\n  - Real-time updates with auto-refresh (every 10 seconds)
  - Role-based access control (Admin only)
  - Dynamic alerts for users exceeding storage thresholds
  - Server capacity alerts when total usage exceeds thresholds (e.g., 80%, 90%, 95%)
  - Storage optimization recommendations
  - Predictive analytics: Estimate when server capacity will be reached based on current growth trends

### 7.2 Real-Time Storage Monitoring Database Structure

#### 7.2.1 User Storage Usage Table
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

#### 7.2.2 Server Capacity Configuration Table
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

#### 7.2.3 Server Storage Summary Table
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
  - Critical: total_storage_usage_percentage ≥ critical_threshold_percentage
- last_calculated_at (Timestamp with timezone, required)
- created_at (Timestamp)
- updated_at (Timestamp)

### 7.3 Storage Calculation Logic

#### 7.3.1 Dynamic File Storage Calculation
- Real-time sum of all file sizes uploaded by the user
- Query executed every 10 seconds:\n  ```sql
  SELECT SUM(file_size) FROM files WHERE user_id = [user_id]\n  ```
- Includes:
  - Question images (from question_bank table)
  - Profile pictures (from users table)
  - Uploaded documents (if any)
  - Bulk upload template files (if stored)\n\n#### 7.3.2 Dynamic Database Storage Calculation
- Real-time sum of estimated database record sizes for the user
- Query executed every 10 seconds:
  ```sql
  SELECT \n    (SELECT COUNT(*) * [avg_question_size] FROM question_bank WHERE created_by = [user_id]) +
    (SELECT COUNT(*) * [avg_paper_size] FROM question_papers WHERE created_by = [user_id]) +
    (SELECT COUNT(*) * [avg_exam_size] FROM online_exams WHERE created_by = [user_id]) +
    (SELECT COUNT(*) * [avg_attempt_size] FROM student_exam_attempts WHERE student_id = [user_id]) +
    (SELECT COUNT(*) * [avg_login_size] FROM user_login_history WHERE user_id = [user_id])
  AS total_database_storage\n  ```
- Note: Average record sizes are dynamically recalculated periodically based on actual data

#### 7.3.3 Dynamic Total Storage Calculation
- total_storage_bytes = file_storage_bytes + database_storage_bytes
- Calculated in real-time for each user\n
#### 7.3.4 Dynamic User Storage Status Calculation
- Define storage limit per user (e.g., 1 GB = 1,073,741,824 bytes)
- Calculate percentage: (total_storage_bytes / user_storage_limit) × 100
- Set storage_status based on percentage:
  - Normal: < 80%
  - Warning: 80-95%
  - Critical: > 95%
\n#### 7.3.5 Dynamic Server Storage Summary Calculation
- Aggregate all users' storage usage:\n  ```sql
  SELECT 
    SUM(file_storage_bytes) AS total_file_storage_used_bytes,
    SUM(database_storage_bytes) AS total_database_storage_used_bytes,
    SUM(total_storage_bytes) AS total_storage_used_bytes
  FROM user_storage_usage
  ```
- Fetch server capacity from server_capacity_config table
- Calculate usage percentages:
  - file_storage_usage_percentage = (total_file_storage_used_bytes / total_file_storage_capacity_bytes) × 100
  - database_storage_usage_percentage = (total_database_storage_used_bytes / total_database_storage_capacity_bytes) × 100
  - total_storage_usage_percentage = (total_storage_used_bytes / total_storage_capacity_bytes) × 100
- Determine server_status based on total_storage_usage_percentage and thresholds
- Update server_storage_summary table
\n### 7.4 Real-Time Storage Monitoring Interface

#### 7.4.1 Storage Monitoring Page Layout
- Page title: 'Storage Monitoring'
- **Server Capacity Overview Section (Top of Page)**
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
- **Configure Server Capacity Button** (Admin only)
  - Opens dialog to set/update server capacity values
- Filter panel on left (collapsible):
  - User filter (search by name or email)
  - School filter (Admin only)
  - Role filter (Admin only)
  - Storage status filter (Normal, Warning, Critical)
  - Date range filter (for historical data)
- Search bar at top\n  - Search by user name or email
- Export button at top-right
  - Export as Excel/CSV
- Main table area:
  - Columns:\n    - User Name
    - Role
    - School
    - File Storage\n    - Database Storage
    - Total Storage
    - **% of User Limit** (e.g., '65%')
    - Storage Status
    - Last Updated\n  - Sortable columns
  - Pagination at bottom
- **Summary statistics at top:**
  - Total file storage used (all users) with **percentage of server capacity** (e.g., '400 GB / 1 TB (40%)')
  - Total database storage used (all users) with **percentage of server capacity** (e.g., '250 GB / 500 GB (50%)')
  - Total storage used (files + database) with **percentage of server capacity** (e.g., '650 GB / 1.5 TB (43.3%)')
  - Average storage per user\n  - Users exceeding storage threshold count
- **Analytics section:**
  - **Server Capacity Gauge Chart:** Large circular gauge showing total storage usage percentage
  - Storage trend chart (line chart showing storage growth over time with **projected capacity exhaustion date**)
  - Top users by storage chart (bar chart showing users with highest storage usage)
  - Storage distribution by role chart (pie chart)\n  - Storage distribution by school chart (bar chart)
  - **Storage Growth Rate Chart:** Line chart showing daily/weekly storage growth rate
  - **Capacity Forecast Chart:** Predictive chart estimating when server capacity will be reached
\n#### 7.4.2 Configure Server Capacity Dialog
- Modal dialog with glassmorphism styling
- Title: 'Configure Server Capacity'\n- Form fields:
  - **Total File Storage Capacity:** Number input with unit selector (GB/TB)
  - **Total Database Storage Capacity:** Number input with unit selector (GB/TB)
  - **Alert Threshold Percentage:** Number input (e.g., 80)\n  - **Critical Threshold Percentage:** Number input (e.g., 95)
- Current values displayed with edit capability
- Save button with validation
- Cancel button
- Help text explaining each field
\n#### 7.4.3 Auto-Refresh Functionality
- Auto-refresh enabled by default
- **Refresh interval: 10 seconds (configurable)**
- Auto-refresh indicator at top-right showing last update time
- Manual refresh button to force immediate refresh
- Toggle button to enable/disable auto-refresh\n- **Real-time updates for:**
  - User storage usage table
  - Server capacity overview section
  - Summary statistics
  - Analytics charts

### 7.5 Real-Time Storage Monitoring Backend Logic

#### 7.5.1 Dynamic Storage Calculation Process
- **Real-Time Scheduled Job:**
  - Run storage calculation job **every 10 seconds** (configurable)
  - For each user:\n    - **Dynamically calculate file_storage_bytes** by querying file sizes in real-time
    - **Dynamically calculate database_storage_bytes** by querying record counts and sizes in real-time
    - Calculate total_storage_bytes\n    - Determine storage_status based on user storage limit
    - Update user_storage_usage table
    - Set last_calculated_at to current timestamp
  - **Aggregate server-wide storage:**
    - Sum all users' file_storage_bytes → total_file_storage_used_bytes
    - Sum all users' database_storage_bytes → total_database_storage_used_bytes
    - Calculate total_storage_used_bytes
    - Fetch server capacity from server_capacity_config table
    - Calculate usage percentages
    - Determine server_status
    - Update server_storage_summary table
    - Set last_calculated_at to current timestamp
\n#### 7.5.2 Server Capacity Configuration API
- **Endpoint:** POST /api/admin/storage/configure-capacity
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

#### 7.5.3 Server Storage Summary API
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
      \"last_calculated_at\": \"2026-01-20T15:21:23Z\"
    }
  }
  ```
- **Access Control:** Admin only
- **Real-time data:** Fetched from server_storage_summary table (updated every 10 seconds)
\n#### 7.5.4 Predictive Analytics Logic
- **Storage Growth Rate Calculation:**
  - Calculate daily storage growth over past 30 days:\n    ```sql
    SELECT 
      DATE(last_calculated_at) AS date,
      SUM(total_storage_bytes) AS daily_total_storage\n    FROM user_storage_usage
    WHERE last_calculated_at >= NOW() - INTERVAL 30 DAY
    GROUP BY DATE(last_calculated_at)
    ORDER BY date ASC
    ```
  - Calculate average daily growth rate:
    - growth_rate = (latest_total_storage - oldest_total_storage) / 30 days
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

#### 7.5.5 Real-Time Update Mechanism
- Use WebSocket or Server-Sent Events (SSE) for real-time updates
- Backend pushes updates to frontend **every 10 seconds**
- Frontend updates:\n  - Server capacity overview section
  - User storage usage table
  - Summary statistics
  - Analytics charts\n- **Efficient delta updates:** Only changed data sent to frontend
- **No full page refresh:** Seamless real-time experience

### 7.6 Storage Optimization Recommendations
- Delete unused questions from question bank
- Delete old question papers that are no longer needed
- Delete completed exams after archiving results
- Compress images before uploading
- Remove duplicate questions\n- Archive old login history records
- Clean up draft exams that were never published
- Monitor top users by storage and contact them for cleanup
- Set user storage limits to prevent excessive usage
- Implement automated cleanup policies for old data
- Consider upgrading server capacity if usage is consistently high
- Use predictive analytics to plan capacity upgrades in advance

---

## 8. Design and User Experience

### 8.1 Theme and Styling
- **Color Scheme:** Dark purple-blue gradient theme
- **Design Style:** Glassmorphism with frosted glass effects
- **Typography:** Modern, clean, and professional EdTech fonts
- **Icons:** Consistent icon set throughout the application
- **Animations:** Smooth transitions and hover effects\n\n### 8.2 Responsive Design
- Mobile-first approach\n- Responsive layouts for desktop, tablet, and mobile devices
- Touch-friendly interface elements
- Optimized for various screen sizes

### 8.3 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility\n- High contrast mode support
- Alt text for images
\n---

## 9. Security and Data Privacy

### 9.1 Authentication and Authorization
- Secure user authentication with password hashing
- Role-based access control (RBAC)\n- Session management with secure tokens
- Multi-factor authentication (optional)

### 9.2 Data Isolation
- School-based data isolation
- Users can only access data from their own school
- Admin has cross-school access for platform management
\n### 9.3 Data Encryption
- Data encryption at rest and in transit
- HTTPS/TLS for all communications
- Secure storage of sensitive information

### 9.4 Audit Logging
- Comprehensive audit logs for all user actions
- Track login history, question creation, exam attempts, etc.
- Admin access to audit logs for compliance and security monitoring

---

## 10. Performance and Scalability

### 10.1 Performance Optimization
- Database query optimization with indexing
- Caching strategies for frequently accessed data
- Lazy loading for large datasets
- Image optimization and compression
\n### 10.2 Scalability\n- Horizontal scaling support for increased load
- Load balancing for distributed traffic
- Database sharding for large-scale deployments
- Cloud-based infrastructure for elastic scaling

### 10.3 Real-Time Updates
- WebSocket or Server-Sent Events (SSE) for real-time data updates
- Efficient delta updates to minimize bandwidth usage
- Auto-refresh functionality with configurable intervals

---

## 11. Conclusion

A Cube - Online Exam System is a comprehensive, feature-rich platform designed to meet the needs of educational institutions for creating, conducting, and analyzing online exams. With its modern design, robust functionality, and focus on user experience, A Cube provides a smart, secure, and scalable solution for NEET preparation and school-level assessments.

**Key Highlights:**
1. **Serial Number System:** Unique identification for all questions in Question Bank
2. **Original Serial Number Maintenance:** Display Original Serial Numbers during question selection
3. **Re-sequencing:** Automatic re-sequencing of selected questions in question papers
4. **Live Rendered Output:** Real-time display of formatted content in question editor
5. **Comprehensive Symbol Library:** 100+ mathematical and science symbols with quick access
6. **Smart Selection:** Balanced distribution, even lesson coverage, easy question only
7. **Real-Time Storage Monitoring:** Dynamic tracking with server capacity comparison
8. **Predictive Analytics:** Forecast server capacity exhaustion dates
9. **Professional Design:** Dark purple-blue gradient theme with glassmorphism\n10. **Scalable Architecture:** Built for growth and high performance

This consolidated requirements document provides a complete overview of all features, enhancements, and technical specifications for the A Cube - Online Exam System, ensuring clarity and consistency across all modules.\n\n---

## Reference Files
1. User-provided image: formula.jpg
2. User-provided screenshot: screenshot.png