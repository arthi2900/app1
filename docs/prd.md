# Online Exam App Requirements Document

## 1. Application Description

### 1.1 Application Name
Online Exam Management System

### 1.2 Application Purpose
A comprehensive online exam conducting and management system for educational institutions. Features include question paper creation, exam conduct, automatic evaluation, and detailed reporting.

## 2. User Roles\n
### 2.1 Admin
- Complete system administration
- User account creation and management
- New user approval management
- Role-based Access Control setup
- System configurations (exam duration, evaluation policy)
- Permission management\n- User profile editing and suspension management

### 2.2 Principal
- Teacher management
- Exam schedule approval
- Student report viewing
- Teacher performance monitoring
- Profile editing capability
\n### 2.3 Teacher
- Question creation\n- Question paper preparation
- Exam conduct\n- Student performance viewing
- Profile editing capability
\n### 2.4 Student
- Exam participation
- Result viewing
- Access to past exam reports
- Profile editing capability

### 2.5 User Profile Information
All users (Admin, Principal, Teacher, Student) will have the following profile information:
- User name
- Email address
- Role\n- School name (mandatory field)
- Contact number
- Profile picture (optional)
- Account status (Pending Approval/Active/Suspended)
\n## 3. Key Features

### 3.1 Question Bank
- Subject-wise question storage
- Question types:\n  - MCQ (Multiple Choice Questions)
  - True/False\n  - Short Answer
- For each question:\n  - Marks allocation
  - Difficulty level indication
  - Subject reference
\n### 3.2 Exam Paper Generation
- Automatic selection from question bank
- Manual question selection option
- Question paper preview feature
- Question paper approval process

### 3.3 Exam Conduct
- Exam time scheduling
- Student login system
- Exam writing interface
- Auto-submit after time expires
\n### 3.4 Student Report
- Automatic marks calculation
- Pass/Fail status display
- Detailed analysis:\n  - Subject-wise performance
  - Question-wise analysis
- School name displayed on report header

### 3.5 User Registration and Approval Workflow
- When a new user creates an account (signup), they will be assigned 'Pending Approval' status\n- New users with'Pending Approval' status will be displayed separately in'Pending Users' list (not in Active Users list)
- Admin must review and approve new user accounts
- Only after Admin approval, user status changes to 'Active' and they are moved to Active Users list
- This prevents unauthorized users from accessing the system
- Shorter term for 'new user waiting for approval': 'Pending Users' or 'Awaiting Approval'

### 3.6 Admin Functions
- Create user accounts for all roles
- Assign school name to each user during account creation
- Review and approve pending user registrations
- Role-based Access Control management
- System Settings control\n- View and manage users by status:\n  - Pending Users (awaiting approval)
  - Active Users (approved users)
  - Suspended Users (suspended accounts)
- Edit user profiles with Save button
- Suspend user accounts with Suspend button
- Approve pending users with Approve button
\n### 3.7 Principal Functions
- Exam schedule review and approval
- Student report access (filtered by school)
- Teacher performance monitoring (within their school)
- Edit own profile with Save button
\n### 3.8 Teacher Functions
- Question creation and management
- Question paper preparation
- Exam conduct and monitoring
- Student performance viewing (within their school)
- Edit own profile with Save button

### 3.9 Student Functions
- Exam writing\n- Result viewing
- Access to past exam reports
- View school name in profile
- Edit own profile with Save button

### 3.10 User Profile Management
- Edit button: Available for all users to modify their profile information
- Save button: Saves changes made to profile information
- Approve button: Available only for Admin role to approve pending user registrations
- Suspend button: Available only for Admin role to suspend user accounts
- User status categories:
  - Pending Approval: New users awaiting admin approval, cannot login
  - Active: Approved users with full system access
  - Suspended: Users whose accounts have been suspended, cannot login
- Each status displayed in separate tabs/views for easy management
- Admin can filter and manage users based on their status

## 4. Language Support

### 4.1 UI Language
- Default UI language: English
- Users can switch to Tamil based on their requirement
- Only one language will be displayed in the UI at any given time (not both simultaneously)
- Language preference will be saved for each user
- All buttons, menus, labels, and messages will be displayed in the selected language
- Language toggle option available in user settings

## 5. Future Scope Features

### 5.1 Audit Logs
- User activity logging
- Track who did what and when
\n### 5.2 Backup & Restore
- Question bank backup
- Exam data backup
- Restore functionality

### 5.3 Notifications
- Exam schedule notifications
- Result notifications
- New user registration notifications for Admin

### 5.4 Analytics Dashboard
- Student performance analysis
- Teacher performance analysis
- Subject-wise analysis
- School-wise performance comparison

## 6. Design Style

### 6.1 Color Scheme
- Primary color: Blue (#2563EB) - conveys trust and educational appearance
- Secondary color: Green (#10B981) - for success and positive actions
- Warning color: Red (#EF4444) - for errors and warnings
- Pending status color: Orange (#F59E0B) - for pending approval indication

### 6.2 Visual Details
- Soft rounded corners (8px radius) - modern and friendly appearance
- Subtle shadow effects - depth and hierarchy perception
- Clear borders - for content sections
\n### 6.3 Overall Layout
- Side panel navigation - fixed left sidebar (240px width) containing role-based menu items with icons and labels
- Card-based design - for information grouping in main content area
- Responsive grid layout - for various screen sizes
- Clear navigation menu - for easy access to all features
- Main content area adjusts dynamically based on side panel state (collapsed/expanded)
- Tab-based user management interface showing Pending Users, Active Users, and Suspended Users separately

## 7. Reference Images
1. screenshot.png - Admin dashboard with bilingual display (will be updated to show single language based on user preference)
2. screenshot-2.png - User management interface showing Active Users list with Edit and Suspend buttons