export interface AiBulletCategory {
  id: string;
  categoryNameEn: string;
  categoryNameKm: string;
  items: {
    en: string;
    km: string;
  }[];
}

export const aiObjectiveSuggestions = [
  {
    roleEn: 'Customer Service & Cafe Barista',
    roleKm: 'ផ្នែកសេវាកម្មអតិថិជន & Barista',
    textEn: 'Energetic and punctual BacII graduate with strong interpersonal communication in Khmer and English. Eager to deliver exceptional customer hospitality, efficient cashiering, and maintain a welcoming cafe atmosphere.',
    textKm: 'សិស្សទើបចប់បាក់ឌុបដែលមានភាពរួសរាយ រហ័សរហួន និងទៀងទាត់ពេលវេលា។ មានបំណងប្រើប្រាស់ជំនាញទំនាក់ទំនងល្អ (ខ្មែរ និងអង់គ្លេស) ដើម្បីផ្តល់សេវាកម្មប្រកបដោយការយកចិត្តទុកដាក់ និងគាំទ្រដល់ប្រតិបត្តិការហាងប្រចាំថ្ងៃ។',
  },
  {
    roleEn: 'Administrative & Office Assistant',
    roleKm: 'ផ្នែករដ្ឋបាល & ជំនួយការការិយាល័យ',
    textEn: 'Detail-oriented BacII graduate with strong skills in Microsoft Word, Excel, and fast Khmer Unicode typing. Seeking an entry-level Administrative Assistant role to support document processing, data entry, and schedule organization.',
    textKm: 'សិស្សទើបចប់បាក់ឌុបដែលមានការយកចិត្តទុកដាក់ខ្ពស់លើភាពត្រឹមត្រូវ និងច្បាស់លាស់ក្នុងការប្រើប្រាស់កុំព្យូទ័រ (Word, Excel) និងវាយអត្ថបទខ្មែរបានលឿន។ មានបំណងបំពេញការងារជាជំនួយការរដ្ឋបាល ដើម្បីគាំទ្រដល់ការរៀបចំឯកសារ និងទិន្នន័យ។',
  },
  {
    roleEn: 'Social Media & Marketing Junior',
    roleKm: 'ផ្នែកផ្សព្វផ្សាយ & គ្រប់គ្រង Social Media',
    textEn: 'Creative BacII graduate with strong passion for digital content creation, Canva graphic design, and social media trends (TikTok, Facebook, Telegram). Eager to support digital campaigns and engage online audiences.',
    textKm: 'សិស្សទើបចប់បាក់ឌុបដែលមានគំនិតច្នៃប្រឌិត និងចំណូលចិត្តលើការបង្កើតមាតិកាឌីជីថល (TikTok, Facebook) និងការរចនារូបភាពលើ Canva។ មានបំណងចូលរួមក្នុងក្រុមការងារផ្សព្វផ្សាយដើម្បីពង្រីកការយល់ដឹងអំពីម៉ាកយីហោ។',
  },
  {
    roleEn: 'University Scholarship & Academic',
    roleKm: 'ដាក់ពាក្យអាហារូបករណ៍សាកលវិទ្យាល័យ',
    textEn: 'High-achieving BacII graduate with deep academic curiosity and proven leadership in school STEM clubs and community volunteering. Aspiring to pursue undergraduate studies to create positive socio-economic impact in Cambodia.',
    textKm: 'សិស្សឆ្នើមទើបបញ្ចប់ការសិក្សាថ្នាក់ទី១២ ដែលមានលទ្ធផលសិក្សាល្អប្រសើរ និងសកម្មក្នុងក្លឹបសិក្សាព្រមទាំងការងារស្ម័គ្រចិត្ត។ មានបំណងបន្តការសិក្សាថ្នាក់ឧត្តមសិក្សាដើម្បីអភិវឌ្ឍសមត្ថភាព និងចូលរួមចំណែកកសាងសង្គមជាតិ។',
  },
  {
    roleEn: 'General Entry-Level / Fast Learner',
    roleKm: 'ទូទៅ / បេក្ខជនរហ័សរៀនសូត្រ',
    textEn: 'Motivated BacII graduate with strong work ethic, adaptability, and high enthusiasm to learn new skills. Seeking an entry-level position where I can contribute positively to team goals and grow professionally.',
    textKm: 'សិស្សទើបចប់បាក់ឌុបដែលមានការតស៊ូ ស្វាហាប់ និងរហ័សចាប់យកចំណេះដឹងថ្មីៗ។ មានបំណងចូលរួមបម្រើការងារក្នុងកម្រិតដំបូង ដើម្បីរួមចំណែកដល់ភាពជោគជ័យរបស់ស្ថាប័ន និងអភិវឌ្ឍខ្លួនឱ្យកាន់តែរីកចម្រើន។',
  },
];

export const aiBulletSuggestions: AiBulletCategory[] = [
  {
    id: 'customer-service',
    categoryNameEn: '☕ Customer Service, Retail & F&B',
    categoryNameKm: '☕ សេវាកម្មអតិថិជន, ហាង & ភោជនីយដ្ឋាន',
    items: [
      {
        en: 'Greeted 100+ daily customers warmly, provided menu recommendations, and maintained a clean, welcoming environment.',
        km: 'ស្វាគមន៍អតិថិជនជាង ១០០ នាក់ជារៀងរាល់ថ្ងៃ ណែនាំមុខទំនិញ/ភេសជ្ជៈ និងរក្សាអនាម័យបរិវេណហាងឱ្យបានស្អាតល្អ។',
      },
      {
        en: 'Processed customer transactions via POS system, cash, and ABA QR payments accurately with zero end-of-day discrepancies.',
        km: 'ទូទាត់ប្រាក់តាមប្រព័ន្ធ POS សាច់ប្រាក់ផ្ទាល់ និង ABA QR ដោយភាពត្រឹមត្រូវ និងផ្ទៀងផ្ទាត់បញ្ជីទូទាត់គ្មានកំហុស។',
      },
      {
        en: 'Handled customer feedback with active listening and resolved minor inquiries promptly and courteously.',
        km: 'ស្តាប់និងដោះស្រាយចម្ងល់ ឬសំណូមពររបស់អតិថិជនដោយភាពរួសរាយរាក់ទាក់ និងរហ័សទាន់ចិត្ត។',
      },
      {
        en: 'Collaborated with team of 6 staff members to ensure fast order preparation during peak rush hours.',
        km: 'សហការជាមួយសហការី ៦ នាក់ដើម្បីធានាការរៀបចំការកុម្ម៉ង់ទំនិញបានលឿនក្នុងម៉ោងមមាញឹក។',
      },
    ],
  },
  {
    id: 'admin-office',
    categoryNameEn: '📄 Admin, Office & Data Entry',
    categoryNameKm: '📄 រដ្ឋបាល, ការិយាល័យ & បញ្ចូលទិន្នន័យ',
    items: [
      {
        en: 'Drafted, formatted, and printed official class schedules, letters, and notices using Microsoft Word and Khmer Unicode.',
        km: 'រៀបចំទម្រង់ វាយអត្ថបទ និងបោះពុម្ពលិខិតផ្លូវការ និងកាលវិភាគដោយប្រើ Microsoft Word និងអក្សរខ្មែរយូនីកូដ។',
      },
      {
        en: 'Entered and organized student records in Microsoft Excel and Google Sheets with 100% data integrity.',
        km: 'បញ្ចូល និងរៀបចំទិន្នន័យលើ Microsoft Excel និង Google Sheets ដោយភាពត្រឹមត្រូវ និងមានរបៀបរៀបរយ។',
      },
      {
        en: 'Managed physical filing systems and digitized paper documents into structured cloud folders for easy retrieval.',
        km: 'គ្រប់គ្រងឯកសារផ្ទាល់ និងស្កេនរក្សាទុកក្នុង Google Drive ដើម្បីងាយស្រួលស្វែងរក។',
      },
      {
        en: 'Answered phone calls and Telegram messages professionally, forwarding inquiries to appropriate team leaders.',
        km: 'ទទួលការហៅទូរស័ព្ទ និងឆ្លើយតបសារ Telegram ប្រកបដោយវិជ្ជាជីវៈ និងបញ្ជូនបន្តទៅកាន់ផ្នែកពាក់ព័ន្ធ។',
      },
    ],
  },
  {
    id: 'volunteering',
    categoryNameEn: '🤝 Volunteering & Community Service',
    categoryNameKm: '🤝 ការងារស្ម័គ្រចិត្ត & សង្គម',
    items: [
      {
        en: 'Volunteered in Red Cross Youth initiatives, participating in community health awareness and blood donation campaigns.',
        km: 'ចូលរួមជាយុវជនកាកបាទក្រហម ក្នុងការផ្សព្វផ្សាយសុខភាពសហគមន៍ និងយុទ្ធនាការបរិច្ចាគឈាមសង្គ្រោះជីវិត។',
      },
      {
        en: 'Assisted in coordinating 300+ attendees at a charity book donation drive for rural primary schools.',
        km: 'ជួយសម្របសម្រួលអ្នកចូលរួមជាង ៣០០ នាក់ក្នុងកម្មវិធីរៃអង្គាសសៀវភៅសម្រាប់សាលាបឋមសិក្សានៅជនបទ។',
      },
      {
        en: 'Led a team of 10 student volunteers in the Clean City & Environment campaign across local public parks.',
        km: 'ដឹកនាំក្រុមយុវជនស្ម័គ្រចិត្ត ១០ នាក់ក្នុងយុទ្ធនាការបរិស្ថាន និងទីក្រុងស្អាតនៅសួនសាធារណៈ។',
      },
    ],
  },
  {
    id: 'leadership-clubs',
    categoryNameEn: '🏆 School Leadership, Clubs & Projects',
    categoryNameKm: '🏆 ភាពជាអ្នកដឹកនាំក្នុងសាលា & ក្លឹបសិក្សា',
    items: [
      {
        en: 'Elected as Class Representative / Secretary, acting as a bridge between 45 students and high school teachers.',
        km: 'ត្រូវបានជ្រើសរើសជាប្រធាន/លេខាថ្នាក់ ដែលជាស្ពានតភ្ជាប់រវាងសិស្ស ៤៥ នាក់ និងលោកគ្រូអ្នកគ្រូ។',
      },
      {
        en: 'Organized weekly STEM and science experiments for 25 high school club members, encouraging hands-on learning.',
        km: 'រៀបចំការពិសោធន៍វិទ្យាសាស្ត្រប្រចាំសប្តាហ៍សម្រាប់សមាជិកក្លឹប ២៥ នាក់ដើម្បីជំរុញការរៀនអនុវត្តជាក់ស្តែង។',
      },
      {
        en: 'Delivered an interactive PowerPoint presentation in front of 200+ high school students and faculty.',
        km: 'ធ្វើបទបង្ហាញ PowerPoint យ៉ាងទាក់ទាញនៅចំពោះមុខសិស្សានុសិស្ស និងលោកគ្រូអ្នកគ្រូជាង ២០០ នាក់។',
      },
    ],
  },
  {
    id: 'tutoring-education',
    categoryNameEn: '📚 Tutoring & Peer Mentoring',
    categoryNameKm: '📚 ការបង្រៀន & ជួយមិត្តភក្តិ',
    items: [
      {
        en: 'Conducted weekly study groups in Mathematics and Physics, assisting 8 classmates to prepare for the BacII national exam.',
        km: 'ដឹកនាំក្រុមកែលម្អការសិក្សាផ្នែកគណិតវិទ្យា និងរូបវិទ្យា ដោយជួយមិត្តរួមថ្នាក់ ៨ នាក់ត្រៀមប្រឡងបាក់ឌុប។',
      },
      {
        en: 'Created simplified summary notes and formula sheets for high school science subjects, shared with 50+ students.',
        km: 'រៀបចំសន្លឹកសង្ខេបរូបមន្ត និងមេរៀនសង្ខេបសម្រាប់ចែករំលែកដល់សិស្សជាង ៥០ នាក់។',
      },
    ],
  },
];

export const quickSkillsList = {
  digital: [
    'Microsoft Word',
    'Microsoft Excel',
    'Microsoft PowerPoint',
    'Khmer Unicode Typing',
    'Canva Graphic Design',
    'Google Sheets & Docs',
    'Telegram Business',
    'Social Media Management (TikTok, FB)',
    'POS System Operation',
    'Basic Photo Editing',
    'CapCut Video Editing',
  ],
  soft: [
    'Fast Learner & Adaptability',
    'Punctuality & Reliability',
    'Positive Attitude & Friendly',
    'Teamwork & Collaboration',
    'Active Listening & Communication',
    'Problem Solving',
    'Time Management',
    'Customer Hospitality',
    'Honesty & Integrity',
  ],
  hard: [
    'Cashiering & Cash Handling',
    'Document Filing & Archiving',
    'Inventory Tracking',
    'Event Coordination',
    'English Translation (Basic)',
    'Math & Calculation Accuracy',
  ],
};
