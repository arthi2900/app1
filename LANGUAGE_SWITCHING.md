# மொழி மாற்றும் அம்சம் / Language Switching Feature

## கண்ணோட்டம் / Overview

இந்த பயன்பாடு **ஆங்கிலம் (English)** மற்றும் **தமிழ் (Tamil)** மொழிகளுக்கு இடையே மாறும் வசதியுடன் வடிவமைக்கப்பட்டுள்ளது.

The application now features a **language switching system** that allows users to toggle between **English** and **Tamil** languages.

## முக்கிய அம்சங்கள் / Key Features

### 1. இயல்புநிலை மொழி / Default Language
- **English** is the default language
- **ஆங்கிலம்** இயல்புநிலை மொழியாக அமைக்கப்பட்டுள்ளது

### 2. மொழி மாற்றி பொத்தான் / Language Toggle Button
- Located in the header (top-right corner)
- தலைப்பில் (மேல் வலது மூலையில்) அமைந்துள்ளது
- Shows current language: **EN** (English) or **த** (Tamil)
- தற்போதைய மொழியை காட்டுகிறது: **EN** (ஆங்கிலம்) அல்லது **த** (தமிழ்)
- Click to switch between languages instantly
- மொழிகளுக்கு இடையே உடனடியாக மாற கிளிக் செய்யவும்

### 3. நிரந்தர விருப்பம் / Persistent Preference
- Language preference is saved in browser localStorage
- மொழி விருப்பம் உலாவி localStorage இல் சேமிக்கப்படுகிறது
- Your choice persists across sessions
- உங்கள் தேர்வு அமர்வுகள் முழுவதும் நீடிக்கும்

### 4. முழுமையான மொழிபெயர்ப்பு / Complete Translation
All UI elements are translated including:
அனைத்து UI கூறுகளும் மொழிபெயர்க்கப்பட்டுள்ளன:

- ✅ Navigation menus / வழிசெலுத்தல் மெனுக்கள்
- ✅ Form labels and placeholders / படிவ லேபிள்கள் மற்றும் placeholder கள்
- ✅ Buttons and actions / பொத்தான்கள் மற்றும் செயல்கள்
- ✅ Error and success messages / பிழை மற்றும் வெற்றி செய்திகள்
- ✅ Toast notifications / Toast அறிவிப்புகள்
- ✅ Table headers and content / அட்டவணை தலைப்புகள் மற்றும் உள்ளடக்கம்
- ✅ Dashboard statistics / டாஷ்போர்டு புள்ளிவிவரங்கள்
- ✅ Role names / பாத்திர பெயர்கள்

## பயன்படுத்துதல் / Usage

### மொழியை மாற்றுவது எப்படி / How to Switch Language

1. **தலைப்பில் மொழி பொத்தானை கண்டறியவும்**
   Look for the language button in the header (top-right)

2. **பொத்தானை கிளிக் செய்யவும்**
   Click the button showing **EN** or **த**

3. **மொழி உடனடியாக மாறும்**
   The language will switch instantly

4. **உங்கள் தேர்வு சேமிக்கப்படும்**
   Your preference is automatically saved

### எடுத்துக்காட்டுகள் / Examples

#### ஆங்கிலத்தில் / In English:
- Login → உள்நுழைக
- Dashboard → டாஷ்போர்டு
- Question Bank → வினாவங்கி
- Success → வெற்றி

#### தமிழில் / In Tamil:
- உள்நுழைக → Login
- டாஷ்போர்டு → Dashboard
- வினாவங்கி → Question Bank
- வெற்றி → Success

## தொழில்நுட்ப விவரங்கள் / Technical Details

### கட்டமைப்பு / Architecture

1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)
   - Manages language state
   - Provides translation function `t()`
   - Stores preference in localStorage

2. **LanguageToggle Component** (`src/components/common/LanguageToggle.tsx`)
   - Toggle button in header
   - Shows current language
   - Switches between EN and TA

3. **Translation Keys**
   - Organized by feature/module
   - Examples: `auth.login`, `nav.dashboard`, `message.success`

### மொழிபெயர்ப்பு சேர்ப்பது / Adding Translations

To add new translations, update `src/contexts/LanguageContext.tsx`:

```typescript
const translations = {
  en: {
    'your.key': 'English Text',
  },
  ta: {
    'your.key': 'தமிழ் உரை',
  },
};
```

### கூறுகளில் பயன்படுத்துதல் / Using in Components

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('your.key')}</h1>
    </div>
  );
}
```

## ஆதரிக்கப்படும் பக்கங்கள் / Supported Pages

✅ Login / உள்நுழைவு
✅ Register / பதிவு
✅ Admin Dashboard / நிர்வாக டாஷ்போர்டு
✅ User Management / பயனர் மேலாண்மை
✅ Question Bank / வினாவங்கி
✅ Student Exams / மாணவர் தேர்வுகள்
✅ Header Navigation / தலைப்பு வழிசெலுத்தல்
✅ All Toast Messages / அனைத்து Toast செய்திகள்

## எதிர்கால மேம்பாடுகள் / Future Enhancements

1. **கூடுதல் மொழிகள் / Additional Languages**
   - Hindi / हिंदी
   - Telugu / తెలుగు
   - Malayalam / മലയാളം

2. **RTL ஆதரவு / RTL Support**
   - Right-to-left language support
   - வலமிருந்து இடமாக மொழி ஆதரவு

3. **மொழி கண்டறிதல் / Language Detection**
   - Auto-detect browser language
   - உலாவி மொழியை தானாக கண்டறிதல்

4. **மொழி விருப்பங்கள் / Language Preferences**
   - User profile language setting
   - பயனர் சுயவிவர மொழி அமைப்பு

## சிக்கல் தீர்வு / Troubleshooting

### மொழி மாறவில்லை / Language Not Changing
1. Clear browser cache / உலாவி cache ஐ அழிக்கவும்
2. Check localStorage is enabled / localStorage செயல்படுத்தப்பட்டுள்ளதா என சரிபார்க்கவும்
3. Refresh the page / பக்கத்தை புதுப்பிக்கவும்

### மொழிபெயர்ப்பு காணவில்லை / Missing Translation
- If a translation key is missing, the key itself will be displayed
- மொழிபெயர்ப்பு key காணவில்லை என்றால், key தானே காட்டப்படும்
- Report missing translations to the development team
- காணாமல் போன மொழிபெயர்ப்புகளை மேம்பாட்டு குழுவிடம் தெரிவிக்கவும்

---

**குறிப்பு**: இந்த அம்சம் பயனர் அனுபவத்தை மேம்படுத்துவதற்காக வடிவமைக்கப்பட்டுள்ளது மற்றும் தமிழ்நாடு கல்வி நிறுவனங்களுக்கு ஏற்றது.

**Note**: This feature is designed to enhance user experience and is suitable for Tamil Nadu educational institutions.
