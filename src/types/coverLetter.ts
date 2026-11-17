import type { LanguageCode } from './cv';

export type CoverLetterTemplateId =
  | 'cl-phnom-penh-clean'
  | 'cl-emerald-minimal'
  | 'cl-angkor-gold'
  | 'cl-creative-gradient'
  | 'cl-executive-navy'
  | 'cl-student-classic'
  | 'cl-framed-internship';

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
    id: 'cl-student-classic',
    nameEn: 'High School Student Classic',
    nameKm: 'សិស្សវិទ្យាល័យ បុរាណច្បាស់លាស់',
    descEn: 'Large prominent student name, two-column contact bar, ideal for first jobs & waitressing',
    descKm: 'រចនាបថឈ្មោះសិស្សលេចធ្លោ ព័ត៌មានទំនាក់ទំនង ២ ជួរ សម្រាប់សិស្សបាក់ឌុប & ការងារដំបូង',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#1e293b',
  },
  {
    id: 'cl-framed-internship',
    nameEn: 'Framed Internship Request',
    nameKm: 'លិខិតសុំកម្មសិក្សា មានស៊ុមប្រណីត',
    descEn: 'Neat executive border frame with centered title, perfect for university training & internships',
    descKm: 'រចនាបថមានស៊ុមបន្ទាត់ស្អាត និងចំណងជើងកណ្ដាល សម្រាប់លិខិតស្នើសុំកម្មសិក្សា',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#0f766e',
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
    nameKm: 'អង្គររាជធានី មាសប្រណីត',
    descEn: 'Royal gold borders and classic serif letterhead, perfect for embassies & scholarships',
    descKm: 'រចនាបថបុរាណមាសឆើតឆាយ ស័ក្តិសមសម្រាប់ស្ថានទូត អាហារូបករណ៍ និងស្ថាប័នជាន់ខ្ពស់',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#b45309',
  },
  {
    id: 'cl-creative-gradient',
    nameEn: 'Creative Studio Modern',
    nameKm: 'បែបច្នៃប្រឌិតយុវវ័យ',
    descEn: 'Modern gradient accents and sleek pills for marketing, design, media, and tech',
    descKm: 'រចនាបថបែបស្ទូឌីយោច្នៃប្រឌិត ពណ៌ស្រស់ សម្រាប់ទីផ្សារ រចនាក្រាហ្វិក & បច្ចេកវិទ្យា',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#7c3aed',
  },
  {
    id: 'cl-executive-navy',
    nameEn: 'Executive Navy Corporate',
    nameKm: 'សាជីវកម្ម នេវីប្រណីត',
    descEn: 'High-end corporate letterhead with recipient details card and signature seal',
    descKm: 'រចនាបថសាជីវកម្មលំដាប់ខ្ពស់ ប្រអប់ព័ត៌មានអ្នកទទួលច្បាស់លាស់ & បន្ទាត់ហត្ថលេខា',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#0f172a',
  },
];

export interface CoverLetterSample {
  id: string;
  nameEn: string;
  nameKm: string;
  category: string;
  templateId: CoverLetterTemplateId;
  data: CoverLetterData;
}

export const COVER_LETTER_SAMPLES: CoverLetterSample[] = [
  {
    id: 'sample-student-waitress',
    nameEn: 'High School Student / Waitress & F&B',
    nameKm: 'សិស្សវិទ្យាល័យ / បម្រើការងារភោជនីយដ្ឋាន & ហាង',
    category: 'High School & BacII',
    templateId: 'cl-student-classic',
    data: {
      sender: {
        fullName: 'Sok Dara',
        khmerName: 'សុខ តារា',
        jobTitle: 'Bolivar High School Student / BacII Graduate',
        email: 'sok.dara@liberatormail.org',
        phone: '(+855) 12 326-5228',
        location: 'Phnom Penh, Cambodia',
        linkedin: '',
        portfolio: 'www.riebcv.org/student',
      },
      recipient: {
        hiringManagerName: 'Manager of Business Operations',
        companyName: 'Hemingway’s Blue Water Café & Restaurant',
        department: 'Customer Service & Dining Team',
        companyAddress: 'Street 240, Daun Penh, Phnom Penh',
        jobTitleApplied: 'Serving & Waitress Position',
      },
      date: 'February 21, 2025',
      subject: 'Application for Serving Position as Waitress at Blue Water Café',
      salutation: 'Dear Manager of Business Operations,',
      openingParagraph:
        'Please consider me for your serving position as a waitress at Hemingway’s Blue Water Café. I learned about the opening from the restaurant’s website and community announcement. I am a recent high school graduate with a strong sense of responsibility, punctuality, and a friendly attitude. This job opportunity sparked my interest and I am excited about applying for it.',
      bodyParagraph1:
        'I recently graduated high school with an outstanding academic record (GPA 3.85) and completed dual-credit coursework in communication and algebra. I was actively involved in cross country, athletics, and youth leadership mentoring. My role as a student mentor was to serve peers by helping them understand complex tasks and organizing event schedules under tight deadlines.',
      bodyParagraph2:
        'My work experience includes babysitting, retail cashiering, and home organizing. Babysitting has been my job for four years; each year the number of families that I assist grows through word-of-mouth trust. My cleaning and cashier duties required extreme attention to detail, cash management, and warm hospitality. I am hardworking, dependable, and eager to learn your point-of-sale systems.',
      closingParagraph:
        'My resume and recommendation letters are enclosed. Please review my credentials and consider me for your waitress position. I can be reached at (+855) 12 326-5228. Thank you for this opportunity to apply at Hemingway’s Blue Water Café. I look forward to meeting you.',
      signOff: 'Sincerely,',
    },
  },
  {
    id: 'sample-software-dev',
    nameEn: 'Software Developer / Tech Specialist',
    nameKm: 'អ្នកបង្កើតកម្មវិធី / អ្នកបច្ចេកវិទ្យា (IT)',
    category: 'Technology & Engineering',
    templateId: 'cl-phnom-penh-clean',
    data: {
      sender: {
        fullName: 'Emily Thompson',
        khmerName: 'អិមមីលី ថមសុន',
        jobTitle: 'Full-Stack Software Developer',
        email: 'emily.thompson@email.com',
        phone: '(555) 123-4567',
        location: '45 Maple Street, Chicago, IL',
        linkedin: 'linkedin.com/in/emily-dev',
        portfolio: 'github.com/emily-tech',
      },
      recipient: {
        hiringManagerName: 'Mr. Robert Stevens',
        companyName: 'GreenTech Solutions',
        department: 'Engineering Department',
        companyAddress: '123 Innovation Drive, Chicago, IL 60601',
        jobTitleApplied: 'Software Developer Position',
      },
      date: 'September 24, 2024',
      subject: 'Application for Software Developer Position',
      salutation: 'Dear Mr. Stevens,',
      openingParagraph:
        'I am writing to apply for the Software Developer position at GreenTech Solutions, which was advertised on your company’s careers portal. With a strong background in modern software engineering, extensive experience in full-stack web development, and a passion for creating efficient and user-friendly applications, I believe I would be an excellent fit for your team.',
      body1:
        'In my previous role at Innovatech, I led the development of several key projects, including the creation of a customer management system that improved client satisfaction by 20%. My proficiency in languages such as TypeScript, React, Node.js, and Python, along with my experience in agile methodologies, allows me to collaborate effectively with cross-functional teams and deliver high-quality solutions on time.',
      body2:
        'I am excited about the opportunity to contribute to GreenTech Solutions’ innovative clean-tech projects and help the company achieve its sustainable mission. I bring strong automated test coverage discipline, fast code turnaround, and a dedication to writing maintainable, scalable web architecture.',
      closing:
        'I have attached my resume for your consideration and would appreciate the opportunity to further discuss my qualifications in an interview. Thank you for your time and consideration.',
      signOff: 'Yours sincerely,',
    } as any,
  },
  {
    id: 'sample-internship-framed',
    nameEn: 'Request Letter for Internship Training',
    nameKm: 'លិខិតស្នើសុំកម្មសិក្សា និងការបណ្ដុះបណ្ដាល (មានស៊ុម)',
    category: 'University & College Internship',
    templateId: 'cl-framed-internship',
    data: {
      sender: {
        fullName: 'Vannak Panha',
        khmerName: 'វណ្ណៈ បញ្ញា',
        jobTitle: 'Undergraduate Student / Business IT',
        email: 'panha.vannak@edu.kh',
        phone: '+855 98 765 432',
        location: 'Toul Kork, Phnom Penh',
        linkedin: 'linkedin.com/in/panhavannak',
        portfolio: '',
      },
      recipient: {
        hiringManagerName: 'Head of Human Capital Development',
        companyName: 'Smart Axiata Co., Ltd.',
        department: 'Digital Product & Innovation Division',
        companyAddress: 'Preah Monivong Blvd, Phnom Penh',
        jobTitleApplied: 'Internship Training Program 2025',
      },
      date: '15 March 2025',
      subject: 'Request Letter for Internship Training Program',
      salutation: 'Dear Hiring Committee & Internship Coordinator,',
      openingParagraph:
        'I am Vannak Panha, a regular and hardworking student currently enrolled in the third year of the Bachelor of Business Information Technology program. As part of my academic course requirement, I am seeking an internship opportunity where I can learn the operational roles and responsibilities of digital product management.',
      bodyParagraph1:
        'While listing potential leading organizations, I came across your company which perfectly aligns with the list of technical and business competencies I aspire to master. I am eager to learn from your esteemed mentors who have established top-tier digital communication services across Cambodia for years.',
      bodyParagraph2:
        'I am attaching my resume and academic transcripts detailing my GPA, completed coursework in database systems, business analytics, and agile development. In addition, I have attached a portfolio of student assignments and team projects completed throughout the semesters for your review.',
      closingParagraph:
        'I look forward to hearing from you regarding the possibility of an internship placement. I am prepared to begin the training program according to your corporate schedule. Thank you very much for your time and consideration.',
      signOff: 'Yours Sincerely,',
    },
  },
  {
    id: 'sample-teacher-internship',
    nameEn: 'Teacher / Academic Internship Program',
    nameKm: 'កម្មសិក្សាគរុកោសល្យ / ជំនួយការគ្រូបង្រៀន',
    category: 'Education & Academic',
    templateId: 'cl-emerald-minimal',
    data: {
      sender: {
        fullName: 'Mercia Wijaya',
        khmerName: 'មើសៀ វីចាយ៉ា',
        jobTitle: 'Applied Mathematics Student',
        email: 'mercia.wijaya@gmail.com',
        phone: '(+65) 9674 7482',
        location: 'Block 5 Level 6 #07-89, Singapore 123456',
        linkedin: '',
        portfolio: '',
      },
      recipient: {
        hiringManagerName: 'Director of Human Resource',
        companyName: 'Ministry of Education',
        department: 'Teacher Training & Internship Division',
        companyAddress: '1 North Buona Vista Drive, Singapore 138675',
        jobTitleApplied: 'Teacher Internship Program 2025',
      },
      date: '9 February 2025',
      subject: 'Application for Teacher Internship Program',
      salutation: 'Dear Sir/Madam,',
      openingParagraph:
        'I am writing to apply for the teacher internship program at the Ministry of Education. Through my undergraduate studies in Applied Mathematics, participation in academic competitions, and active co-curricular leadership, I believe that I am a suitable and passionate candidate for this program.',
      bodyParagraph1:
        'Since secondary school, mathematics has been a subject that I was deeply skilled in and dedicated to. This interest drove me to participate in and win several mathematics competitions. Moreover, my passion was further strengthened through my enrollment in the Applied Mathematics Degree Program at university. I discovered how enlightening teaching methods can inspire students who once felt intimidated by math.',
      bodyParagraph2:
        'Through my academic journey, I was taught that subject expertise alone is not enough. A teacher must also be a holistic mentor capable of educating students for life outside the classroom, instilling sound moral values like honesty, empathy, and active listening. I have honed public speaking skills through academic presentation series and community tutoring.',
      closingParagraph:
        'With your renowned curriculum and advancement opportunities, working with your educational programs has been my long-term ambition. I look forward to hearing your favorable reply. Do feel free to contact me at (+65) 9674 7482 or mercia.wijaya@gmail.com should you have any questions.',
      signOff: 'Yours Sincerely,',
    },
  },
  {
    id: 'sample-marketing-media',
    nameEn: 'Marketing & Media Internship',
    nameKm: 'កម្មសិក្សាផ្នែកទីផ្សារ & ប្រព័ន្ធផ្សព្វផ្សាយ',
    category: 'Marketing & Media',
    templateId: 'cl-creative-gradient',
    data: {
      sender: {
        fullName: 'Mary Smith',
        khmerName: 'ម៉ារី ស្មីត',
        jobTitle: 'Business Administration & Marketing Student',
        email: 'mary.smith@cumberland.edu',
        phone: '(615) 444-2560',
        location: '222 Maple Hill Drive, Nashville, TN',
        linkedin: 'linkedin.com/in/mary-smith-mkt',
        portfolio: '',
      },
      recipient: {
        hiringManagerName: 'Ms. Kelly Hodge',
        companyName: 'MTV Networks / Paramount Media',
        department: 'Human Resources & Talent Acquisition',
        companyAddress: '150 Music Drive, Nashville, TN 37210',
        jobTitleApplied: 'Marketing Internship Position',
      },
      date: 'September 5, 2024',
      subject: 'Application for Marketing Internship Position',
      salutation: 'Dear Ms. Hodge,',
      openingParagraph:
        'I am seeking a marketing internship position for the upcoming session at MTV Networks. I am a junior student at Cumberland University with a double major in Business Administration and Marketing. I was informed of your available internship through our Office of Career Services, and I am exceptionally motivated to apply.',
      bodyParagraph1:
        'Practical experience is very important to me and I recognize the value of a training opportunity in a significant corporate media setting. I have a strong interest in MTV because of the excellent reputation of the company. I feel my academic training in brand management, consumer psychology, and digital campaign planning has prepared me to deliver value to your team.',
      bodyParagraph2:
        'I would truly enjoy the opportunity to intern with you and earn academic credits for a successful experience. My background includes managing social media handles for student clubs, conducting audience research surveys, and drafting bilingual promotional copy that generated high student engagement.',
      closingParagraph:
        'I am currently available for an interview and would appreciate an opportunity to speak with you directly regarding the marketing internship. It would be helpful if I could meet with you prior to the registration deadline. Thank you for your time and consideration of my enclosed resume.',
      signOff: 'Sincerely,',
    },
  },
];

export const defaultCoverLetterDataEn: CoverLetterData = COVER_LETTER_SAMPLES[0].data;

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
  date: 'ថ្ងៃទី ០៧ ខែវិច្ឆិកា ឆ្នាំ២០២៥',
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
