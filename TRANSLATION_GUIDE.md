# Translation System Quick Reference Guide

## For Developers: How to Add Translations to New Pages

### Step 1: Import the useLanguage Hook

```typescript
import { useLanguage } from '@/contexts/LanguageContext';
```

### Step 2: Use the Translation Function

```typescript
export default function MyPage() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('your.translation.key')}</h1>
    </div>
  );
}
```

### Step 3: Add Translation Keys

Edit `src/contexts/LanguageContext.tsx` and add your keys:

```typescript
const translations = {
  en: {
    'your.translation.key': 'English Text',
    'your.button.label': 'Click Me',
  },
  ta: {
    'your.translation.key': 'தமிழ் உரை',
    'your.button.label': 'என்னை கிளிக் செய்யவும்',
  },
};
```

## Common Translation Patterns

### 1. Page Titles
```typescript
<h1>{t('pageName.title')}</h1>
<p>{t('pageName.subtitle')}</p>
```

### 2. Form Labels
```typescript
<Label htmlFor="field">{t('form.fieldName')}</Label>
<Input placeholder={t('form.fieldPlaceholder')} />
```

### 3. Buttons
```typescript
<Button>{t('common.save')}</Button>
<Button>{t('common.cancel')}</Button>
```

### 4. Toast Notifications
```typescript
toast({
  title: t('common.success'),
  description: t('message.actionSuccess'),
});
```

### 5. Conditional Text
```typescript
{loading ? t('common.loading') : t('common.ready')}
```

## Available Translation Keys

### Authentication
- `auth.login` - Login
- `auth.register` - Register
- `auth.username` - Username
- `auth.password` - Password
- `auth.logout` - Logout

### Navigation
- `nav.dashboard` - Dashboard
- `nav.users` - Users
- `nav.questionBank` - Question Bank
- `nav.exams` - Exams
- `nav.results` - Results

### Common Actions
- `common.save` - Save
- `common.cancel` - Cancel
- `common.delete` - Delete
- `common.edit` - Edit
- `common.add` - Add
- `common.loading` - Loading...
- `common.success` - Success
- `common.error` - Error

### Roles
- `role.admin` - Admin
- `role.teacher` - Teacher
- `role.student` - Student
- `role.principal` - Principal

### Messages
- `message.loginSuccess` - Successfully logged in
- `message.loginFailed` - Login failed
- `message.allFieldsRequired` - All fields are required

## Best Practices

### 1. Use Descriptive Keys
✅ Good: `questions.addNew`
❌ Bad: `btn1`

### 2. Group Related Keys
```typescript
'questions.title': 'Question Bank',
'questions.subtitle': 'Manage questions',
'questions.addNew': 'Add New Question',
```

### 3. Keep Translations Consistent
Use the same terminology across the app:
- Always use "Dashboard" not "Home" or "Main"
- Always use "Question Bank" not "Questions" or "Q Bank"

### 4. Handle Plurals
```typescript
'exams.count': '{count} exams',
'exams.single': '1 exam',
```

### 5. Provide Context
Add comments in the translation file:
```typescript
// User profile section
'profile.name': 'Name',
'profile.email': 'Email',
```

## Testing Your Translations

### 1. Check Both Languages
- Switch to English: Click language toggle, select EN
- Switch to Tamil: Click language toggle, select த
- Verify all text displays correctly

### 2. Check for Missing Keys
- If you see a key name instead of text, the translation is missing
- Example: If you see `my.new.key` on screen, add it to translations

### 3. Test Edge Cases
- Long text in Tamil (may wrap differently)
- Special characters
- Numbers and dates

## Common Issues and Solutions

### Issue: Translation not showing
**Solution**: Check if the key exists in both `en` and `ta` objects

### Issue: Component not updating when language changes
**Solution**: Make sure you're using `t()` function, not storing translated text in state

### Issue: TypeScript error
**Solution**: The key might not exist. Add it to the translations object first

## Example: Complete Page Translation

```typescript
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ExamplePage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('example.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('example.description')}</p>
          <Button>{t('example.action')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

Then add to `LanguageContext.tsx`:
```typescript
en: {
  'example.title': 'Example Page',
  'example.description': 'This is an example',
  'example.action': 'Click Here',
},
ta: {
  'example.title': 'எடுத்துக்காட்டு பக்கம்',
  'example.description': 'இது ஒரு எடுத்துக்காட்டு',
  'example.action': 'இங்கே கிளிக் செய்யவும்',
}
```

## Need Help?

1. Check existing translations in `LanguageContext.tsx`
2. Look at `Login.tsx` and `Header.tsx` for examples
3. Refer to `LANGUAGE_SWITCHING.md` for user guide
4. Refer to `IMPLEMENTATION_SUMMARY.md` for technical details

---

**Remember**: Always add translations for both English and Tamil!
