import type { LanguageCode } from './cv';

export type CoverLetterTemplateId =
  | 'cl-phnom-penh-clean'
  | 'cl-emerald-minimal'
  | 'cl-angkor-gold'
  | 'cl-creative-gradient'
  | 'cl-executive-navy';

export interface CoverLetterSender {
  fullName: string;
  khmerName?: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
}

export interface CoverLetterRecipient {
  hiringManagerName: string;
  companyName: string;
  department?: string;
  companyAddress?: string;
  jobTitleApplied: string;
}

export interface CoverLetterData {
  sender: CoverLetterSender;
  recipient: CoverLetterRecipient;
  date: string;
  subject: string;
  salutation: string;
  openingParagraph: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  closingParagraph: string;
  signOff: string;
}

export interface CoverLetterSettings {
  templateId: CoverLetterTemplateId;
  primaryColor: string;
  accentColor: string;
  fontFamily: 'Outfit' | 'Plus Jakarta Sans' | 'Kantumruy Pro' | 'Inter' | 'Playfair Display';
  fontSize: 'compact' | 'normal' | 'spacious';
  language: LanguageCode;
  showSignatureLine: boolean;
}

export interface CoverLetterTemplateMetadata {
  id: CoverLetterTemplateId;
  nameEn: string;
  nameKm: string;
  descEn: string;
  descKm: string;
  isPro: boolean;
  priceUsd: number;
  priceKhr: number;
  badgeTag?: string;
  previewColor: string;
}

export const COVER_LETTER_TEMPLATES_CONFIG: CoverLetterTemplateMetadata[] = [
  {
    id: 'cl-phnom-penh-clean',
    nameEn: 'Phnom Penh Clean',
    nameKm: 'ភ្នំពេញ ស្អាតសម័យថ្មី',
    descEn: 'Modern clean header bar with crisp typography, ideal for all student & entry roles',
    descKm: 'រចនាបថស្អាតសម័យថ្មី ក្បាលទំព័រច្បាស់លាស់ ស័ក្តិសមសម្រាប់សិស្ស & ការងារដំបូង',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#2563eb',
  },
  {
    id: 'cl-emerald-minimal',
    nameEn: 'Emerald ATS Minimal',
    nameKm: 'អេមឺរ៉ាល់ ATS ផ្លូវការ',
    descEn: 'ATS-friendly, left-aligned formal letterhead for banking, admin, and corporate roles',
    descKm: 'រចនាបថផ្លូវការ ATS-Friendly សម្រាប់ធនាគារ រដ្ឋបាល និងស្ថាប័នធំៗ',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#047857',
  },
  {
    id: 'cl-angkor-gold',
    nameEn: 'Angkor Heritage Gold',
    nameKm: 'អង្គររាជធានី មាសប្រណីត (VIP)',
    descEn: 'Royal gold borders and classic serif letterhead, perfect for embassies & scholarships',
    descKm: 'រចនាបថបុរាណមាសឆើតឆាយ ស័ក្តិសមសម្រាប់ស្ថានទូត អាហារូបករណ៍ និងស្ថាប័នជាន់ខ្ពស់',
    isPro: true,
    priceUsd: 1.99,
    priceKhr: 8000,
    badgeTag: 'PRO 👑',
    previewColor: '#b45309',
  },
  {
    id: 'cl-creative-gradient',
    nameEn: 'Creative Studio Pro',
    nameKm: 'បែបច្នៃប្រឌិតយុវវ័យ (Pro)',
    descEn: 'Modern gradient accents and sleek pills for marketing, design, media, and tech',
    descKm: 'រចនាបថបែបស្ទូឌីយោច្នៃប្រឌិត ពណ៌ស្រស់ សម្រាប់ទីផ្សារ រចនាក្រាហ្វិក & បច្ចេកវិទ្យា',
    isPro: true,
    priceUsd: 1.99,
    priceKhr: 8000,
    badgeTag: 'PRO 👑',
    previewColor: '#7c3aed',
  },
  {
    id: 'cl-executive-navy',
    nameEn: 'Executive Navy Corporate',
    nameKm: 'សាជីវកម្ម នេវីប្រណីត (Pro)',
    descEn: 'High-end corporate letterhead with recipient details card and signature seal',
    descKm: 'រចនាបថសាជីវកម្មលំដាប់ខ្ពស់ ប្រអប់ព័ត៌មានអ្នកទទួលច្បាស់លាស់ & បន្ទាត់ហត្ថលេខា',
    isPro: true,
    priceUsd: 1.99,
    priceKhr: 8000,
    badgeTag: 'PRO 👑',
    previewColor: '#0f172a',
  },
];

export const defaultCoverLetterDataEn: CoverLetterData = {
  sender: {
    fullName: 'Sok Dara',
    khmerName: 'សុខ តារា',
    jobTitle: 'Customer Service & F&B Assistant',
    email: 'sok.dara@example.com',
    phone: '+855 12 889 900',
    location: 'Phnom Penh, Cambodia',
    linkedin: 'linkedin.com/in/darasok',
    portfolio: '',
  },
  recipient: {
    hiringManagerName: 'Hiring Manager',
    companyName: 'Brown Coffee and Bakery',
    department: 'Human Resources Department',
    companyAddress: 'Street 51, BKK1, Phnom Penh',
    jobTitleApplied: 'Customer Service & Barista Assistant',
  },
  date: 'November 7, 2024',
  subject: 'Application for Customer Service & Barista Assistant Position',
  salutation: 'Dear Hiring Manager,',
  openingParagraph:
    'I am writing to express my strong enthusiasm and interest in the Customer Service & Barista Assistant position at Brown Coffee and Bakery. As a recent BacII graduate (Grade B) with a warm personality and dedication to exceptional customer care, I am excited about the opportunity to contribute to your team.',
  bodyParagraph1:
    'During my high school years at Sisowath High School, I developed strong discipline, active listening, and problem-solving skills. Alongside my academic studies, I completed upper-intermediate English courses at the Australian Centre for Education (ACE), which enables me to communicate comfortably and professionally with both Cambodian and international customers. My volunteer experience in organizing school events taught me how to work efficiently in high-energy, fast-paced environments.',
  bodyParagraph2:
    'I have always admired Brown Coffee’s commitment to premium quality, warm Cambodian hospitality, and community atmosphere. I am eager to bring my punctuality, positive work ethic, and eagerness to learn coffee preparation techniques and point-of-sale operations to elevate every guest experience.',
  closingParagraph:
    'Thank you very much for your time and consideration. I would welcome the opportunity to discuss in an interview how my positive attitude and enthusiasm can support the ongoing success of Brown Coffee and Bakery. I look forward to speaking with you.',
  signOff: 'Sincerely,',
};

export const defaultCoverLetterDataKm: CoverLetterData = {
  sender: {
    fullName: 'Sok Dara',
    khmerName: 'សុខ តារា',
    jobTitle: 'បុគ្គលិកបម្រើអតិថិជន & ផ្នែកកាហ្វេ',
    email: 'sok.dara@example.com',
    phone: '+855 12 889 900',
    location: 'រាជធានីភ្នំពេញ កម្ពុជា',
    linkedin: 'linkedin.com/in/darasok',
    portfolio: '',
  },
  recipient: {
    hiringManagerName: 'គណៈគ្រប់គ្រងផ្នែកធនធានមនុស្ស',
    companyName: 'Brown Coffee and Bakery',
    department: 'នាយកដ្ឋានធនធានមនុស្ស',
    companyAddress: 'ផ្លូវលេខ ៥១ សង្កាត់បឹងកេងកង១ រាជធានីភ្នំពេញ',
    jobTitleApplied: 'បុគ្គលិកបម្រើអតិថិជន & ជំនួយការឆុងកាហ្វេ',
  },
  date: 'ថ្ងៃទី ០៧ ខែវិច្ឆិកា ឆ្នាំ២០២៤',
  subject: 'ពាក្យស្នើសុំបម្រើការងារជា បុគ្គលិកបម្រើអតិថិជន & ជំនួយការឆុងកាហ្វេ',
  salutation: 'គោរពជូន លោក/លោកស្រី គណៈគ្រប់គ្រងផ្នែកជ្រើសរើសបុគ្គលិក,',
  openingParagraph:
    'ខ្ញុំបាទមានកិត្តិយស និងក្តីសោមនស្សរីករាយយ៉ាងក្រៃលែងក្នុងការសរសេរលិខិតនេះ ដើម្បីដាក់ពាក្យស្នើសុំបម្រើការងារក្នុងតួនាទីជា បុគ្គលិកបម្រើអតិថិជន & ជំនួយការឆុងកាហ្វេ នៅ Brown Coffee and Bakery។ ក្នុងនាមជាសិស្សទើបបញ្ចប់ការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប និទ្ទេស B) ដែលមានភាពរួសរាយរាក់ទាក់ និងស្មារតីទទួលខុសត្រូវខ្ពស់ ខ្ញុំបាទមានបំណងប្រាថ្នាយ៉ាងមុតមាំក្នុងការចូលរួមចំណែកផ្ដល់សេវាកម្មដ៏ល្អឥតខ្ចោះជូនអតិថិជន។',
  bodyParagraph1:
    'កំឡុងពេលសិក្សានៅវិទ្យាល័យព្រះស៊ីសុវត្ថិ ខ្ញុំបាទបានបណ្តុះនូវវិន័យផ្ទាល់ខ្លួន ការគ្រប់គ្រងពេលវេលា និងការធ្វើការងារជាក្រុមបានយ៉ាងល្អប្រសើរ។ ទន្ទឹមនឹងការសិក្សា ខ្ញុំបាទក៏បានពង្រឹងសមត្ថភាពភាសាអង់គ្លេសកម្រិតមធ្យមនៅ ACE ដែលអនុញ្ញាតឱ្យខ្ញុំបាទអាចប្រាស្រ័យទាក់ទងយ៉ាងរលូនជាមួយអតិថិជនទាំងជាតិ និងអន្តរជាតិ។ លើសពីនេះ បទពិសោធន៍នៃការងារស្ម័គ្រចិត្តក្នុងសាលាបានជួយឱ្យខ្ញុំបាទមានភាពរហ័សរហួន និងអាចដោះស្រាយបញ្ហាចំពោះមុខបានយ៉ាងមានប្រសិទ្ធភាព។',
  bodyParagraph2:
    'ខ្ញុំបាទតែងតែពេញចិត្ត និងកោតសរសើរចំពោះបរិយាកាសការងារប្រកបដោយវិជ្ជាជីវៈ និងការបម្រើសេវាកម្មយ៉ាងកក់ក្តៅរបស់ Brown Coffee។ ខ្ញុំបាទត្រៀមខ្លួនជាស្រេចក្នុងការនាំយកនូវភាពស្មោះត្រង់ ភាពឧស្សាហ៍ព្យាយាម និងឆន្ទៈក្នុងការរៀនសូត្រពីការឆុងកាហ្វេ និងការគ្រប់គ្រងការងារប្រចាំថ្ងៃ ដើម្បីជួយឱ្យហាងកាន់តែរីកចម្រើន។',
  closingParagraph:
    'ខ្ញុំបាទសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះពេលវេលា និងការពិចារណារបស់លោក/លោកស្រី។ ខ្ញុំបាទសង្ឃឹមយ៉ាងមុតមាំថានឹងទទួលបានឱកាសជួបសម្ភាសន៍ដោយផ្ទាល់ ដើម្បីបង្ហាញលម្អិតបន្ថែមអំពីសមត្ថភាព និងឆន្ទៈរបស់ខ្ញុំបាទ។',
  signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
};

export const defaultCoverLetterSettings: CoverLetterSettings = {
  templateId: 'cl-phnom-penh-clean',
  primaryColor: '#2563eb',
  accentColor: '#3b82f6',
  fontFamily: 'Outfit',
  fontSize: 'normal',
  language: 'km',
  showSignatureLine: true,
};

