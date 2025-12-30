# Question Bank Bulk Upload Guide

## Overview
The bulk upload feature allows teachers to upload multiple questions at once using an Excel template. The template includes dropdown menus to prevent input errors and ensure data consistency.

## Features

### 1. **Smart Template with Dropdown Menus**
The Excel template includes dropdown menus for the following fields:
- **Class Name**: Select from available classes in your system
- **Subject Name**: Select from available subjects in your system
- **Lesson Name**: Select from available lessons (optional)
- **Question Type**: Choose from 5 question types
  - `mcq` - Multiple Choice Questions
  - `true_false` - True/False Questions
  - `short_answer` - Short Answer Questions
  - `match_following` - Match the Following
  - `multiple_response` - Multiple Response Questions
- **Difficulty**: Choose from 3 difficulty levels
  - `easy`
  - `medium`
  - `hard`

### 2. **Two-Sheet Template Structure**
The template contains two sheets:

#### **Questions Sheet**
- Contains sample questions for all 5 question types
- All dropdown fields are pre-configured
- Simply click on a cell to see the dropdown arrow

#### **Options Sheet**
- Lists all available values for dropdown menus
- Shows all classes, subjects, lessons, question types, and difficulty levels
- Reference sheet - do not delete this sheet

## How to Use

### Step 1: Download the Template
1. Click the **"Bulk Upload"** button in the Question Bank page
2. Click **"Download Template"** button
3. The file `question_bank_template.xlsx` will be downloaded

### Step 2: Fill in Your Questions
1. Open the downloaded Excel file
2. Go to the **"Questions"** sheet
3. For each question row:
   - **Question Text**: Type your question
   - **Class Name**: Click the cell and select from dropdown
   - **Subject Name**: Click the cell and select from dropdown
   - **Lesson Name**: (Optional) Click the cell and select from dropdown
   - **Question Type**: Click the cell and select from dropdown
   - **Difficulty**: Click the cell and select from dropdown
   - **Marks**: Enter the marks for the question
   - **Negative Marks**: Enter negative marks (0 for no negative marking)
   - Fill in type-specific fields (see below)

### Step 3: Type-Specific Fields

#### For MCQ Questions
- Fill **Option A**, **Option B**, **Option C**, **Option D**
- Enter the correct answer text in **Correct Answer** (e.g., "Paris")

#### For True/False Questions
- Leave options blank
- Enter **"True"** or **"False"** in **Correct Answer**

#### For Short Answer Questions
- Leave options blank
- Enter sample/expected answer in **Correct Answer**

#### For Match Following Questions
- Leave options blank
- Fill **Match Left 1-4** and **Match Right 1-4** with pairs
- Leave **Correct Answer** blank

#### For Multiple Response Questions
- Fill **Option A**, **Option B**, **Option C**, **Option D**
- Enter correct answer letters in **Correct Answer** (e.g., "A,C")
- Fill **Answer Option 1-4** with answer choices (e.g., "A and C only")

### Step 4: Upload the File
1. Click **"Choose File"** or drag and drop your filled Excel file
2. The system will validate all questions
3. If there are errors, they will be displayed with row numbers
4. Fix any errors and upload again
5. Once validated, questions will be uploaded automatically

## Validation Rules

The system validates:
- ✅ All required fields are filled
- ✅ Class and Subject names exist in the system
- ✅ Question type is valid
- ✅ Difficulty level is valid
- ✅ Marks are greater than 0
- ✅ Type-specific requirements (e.g., MCQ has options)

## Tips for Success

1. **Use Dropdown Menus**: Always use the dropdown menus instead of typing manually to avoid spelling errors
2. **Check the Options Sheet**: Review the "Options" sheet to see all available values
3. **Start Small**: Test with a few questions first before uploading a large batch
4. **Keep Template Format**: Don't modify column headers or delete the Options sheet
5. **One File, All Types**: You can mix different question types in the same file

## Error Prevention

The dropdown menus prevent common errors:
- ❌ Typos in class names (e.g., "Class 10" vs "Class10")
- ❌ Typos in subject names (e.g., "Mathematics" vs "Maths")
- ❌ Invalid question types (e.g., "multiple_choice" instead of "mcq")
- ❌ Invalid difficulty levels (e.g., "normal" instead of "medium")

## Example Questions in Template

The template includes 5 sample questions demonstrating each question type:
1. MCQ question about world capitals
2. True/False question about astronomy
3. Short answer question about photosynthesis
4. Match following question about countries and capitals
5. Multiple response question about prime numbers

## Troubleshooting

### "No Data Available" Error
- **Cause**: No classes or subjects exist in the system
- **Solution**: Create classes and subjects first before downloading the template

### "Class not found in system" Error
- **Cause**: The class name doesn't match any existing class
- **Solution**: Use the dropdown menu to select the class name

### "Subject not found in system" Error
- **Cause**: The subject name doesn't match any existing subject
- **Solution**: Use the dropdown menu to select the subject name

### Dropdown Not Showing
- **Cause**: Excel file might be corrupted or opened in incompatible software
- **Solution**: Download the template again and open in Microsoft Excel or compatible software

## Support

If you encounter any issues:
1. Check the validation error messages - they include row numbers and specific issues
2. Verify that all dropdown selections are from the provided options
3. Ensure the "Options" sheet is not deleted or modified
4. Try downloading a fresh template if dropdowns are not working
