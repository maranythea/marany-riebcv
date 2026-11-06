export interface AiRolePreset {
  id: string;
  titleEn: string;
  titleKm: string;
  category: 'f&b' | 'admin' | 'banking' | 'tech' | 'marketing' | 'ngo' | 'education' | 'general';
  defaultCompanyEn: string;
  defaultCompanyKm: string;
  contentEn: {
    subject: string;
    salutation: string;
    opening: string;
    body1: string;
    body2: string;
    closing: string;
    signOff: string;
  };
  contentKm: {
    subject: string;
    salutation: string;
    opening: string;
    body1: string;
    body2: string;
    closing: string;
    signOff: string;
  };
}

export const AI_ROLE_PRESETS: AiRolePreset[] = [
  {
    id: 'customer-service-fnb',
    titleEn: 'Customer Service & Barista / Cafe Staff',
    titleKm: 'បុគ្គលិកបម្រើអតិថិជន & ផ្នែកកាហ្វេ/ភោជនីយដ្ឋាន',
    category: 'f&b',
    defaultCompanyEn: 'Brown Coffee and Bakery',
    defaultCompanyKm: 'Brown Coffee and Bakery',
    contentEn: {
      subject: 'Application for Customer Service & Barista Assistant Position',
      salutation: 'Dear Hiring Manager,',
      opening:
        'I am writing to express my strong enthusiasm and interest in the Customer Service & Barista Assistant position at {company}. As a recent BacII graduate with a friendly attitude and dedication to exceptional hospitality, I am excited about the opportunity to contribute to your team.',
      body1:
        'Throughout my high school years, I developed strong discipline, active listening, and problem-solving skills. Complementing my studies with English language practice, I can comfortably communicate with diverse guests. My participation in student activities has equipped me to remain calm, welcoming, and attentive even during high-rush peak hours.',
      body2:
        'I have always admired {company}’s commitment to premium quality, warm Cambodian hospitality, and uplifting community environment. I am eager to bring my punctuality, strong work ethic, and eagerness to learn drink preparation and point-of-sale customer service to ensure every patron leaves delighted.',
      closing:
        'Thank you very much for your time and consideration. I would welcome the opportunity to discuss in an interview how my positive energy and dedication can support the team at {company}. I look forward to hearing from you.',
      signOff: 'Sincerely,',
    },
    contentKm: {
      subject: 'ពាក្យស្នើសុំបម្រើការងារជា បុគ្គលិកបម្រើអតិថិជន & ជំនួយការឆុងកាហ្វេ',
      salutation: 'គោរពជូន គណៈគ្រប់គ្រងផ្នែកជ្រើសរើសបុគ្គលិក {company},',
      opening:
        'ខ្ញុំបាទ/នាងខ្ញុំមានកិត្តិយស និងក្តីសោមនស្សរីករាយយ៉ាងក្រៃលែងក្នុងការសរសេរលិខិតនេះ ដើម្បីដាក់ពាក្យស្នើសុំបម្រើការងារក្នុងតួនាទីជា បុគ្គលិកបម្រើអតិថិជន & ជំនួយការឆុងកាហ្វេ នៅ {company}។ ក្នុងនាមជាសិស្សទើបបញ្ចប់ការប្រឡងបាក់ឌុប ដែលមានភាពរួសរាយរាក់ទាក់ និងស្មារតីទទួលខុសត្រូវខ្ពស់ ខ្ញុំបាទ/នាងខ្ញុំមានបំណងប្រាថ្នាយ៉ាងមុតមាំក្នុងការចូលរួមចំណែកផ្ដល់សេវាកម្មដ៏ល្អឥតខ្ចោះជូនអតិថិជន។',
      body1:
        'កំឡុងពេលសិក្សានៅវិទ្យាល័យ ខ្ញុំបាទ/នាងខ្ញុំបានបណ្តុះនូវវិន័យផ្ទាល់ខ្លួន ការគ្រប់គ្រងពេលវេលា និងការធ្វើការងារជាក្រុមបានយ៉ាងល្អប្រសើរ។ ទន្ទឹមនឹងការសិក្សា ខ្ញុំបាទ/នាងខ្ញុំក៏បានពង្រឹងសមត្ថភាពភាសាអង់គ្លេស ដែលអនុញ្ញាតឱ្យខ្ញុំបាទ/នាងខ្ញុំអាចប្រាស្រ័យទាក់ទងយ៉ាងរលូនជាមួយអតិថិជនទាំងជាតិ និងអន្តរជាតិ។ លើសពីនេះ បទពិសោធន៍នៃការងារស្ម័គ្រចិត្តបានជួយឱ្យខ្ញុំបាទ/នាងខ្ញុំមានភាពរហ័សរហួន និងអាចដោះស្រាយបញ្ហាចំពោះមុខបានយ៉ាងមានប្រសិទ្ធភាព។',
      body2:
        'ខ្ញុំបាទ/នាងខ្ញុំតែងតែពេញចិត្ត និងកោតសរសើរចំពោះបរិយាកាសការងារប្រកបដោយវិជ្ជាជីវៈ និងការបម្រើសេវាកម្មយ៉ាងកក់ក្តៅរបស់ {company}។ ខ្ញុំបាទ/នាងខ្ញុំត្រៀមខ្លួនជាស្រេចក្នុងការនាំយកនូវភាពស្មោះត្រង់ ភាពឧស្សាហ៍ព្យាយាម និងឆន្ទៈក្នុងការរៀនសូត្រពីការឆុងកាហ្វេ និងការគ្រប់គ្រងការងារប្រចាំថ្ងៃ ដើម្បីជួយឱ្យហាងកាន់តែរីកចម្រើន។',
      closing:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះពេលវេលា និងការពិចារណារបស់លោក/លោកស្រី។ ខ្ញុំបាទ/នាងខ្ញុំសង្ឃឹមយ៉ាងមុតមាំថានឹងទទួលបានឱកាសជួបសម្ភាសន៍ដោយផ្ទាល់ ដើម្បីបង្ហាញលម្អិតបន្ថែមអំពីសមត្ថភាព និងឆន្ទៈរបស់ខ្ញុំបាទ/នាងខ្ញុំ។',
      signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
    },
  },
  {
    id: 'bank-teller-finance',
    titleEn: 'Bank Teller / Financial Services Assistant',
    titleKm: 'បេឡាធិការធនាគារ / បុគ្គលិកសេវាកម្មហិរញ្ញវត្ថុ',
    category: 'banking',
    defaultCompanyEn: 'ABA Bank',
    defaultCompanyKm: 'ធនាគារ អេប៊ីអេ (ABA Bank)',
    contentEn: {
      subject: 'Application for Junior Bank Teller / Customer Service Officer',
      salutation: 'Dear Hiring Committee,',
      opening:
        'I am writing to formally submit my application for the Junior Bank Teller position at {company}. With a strong foundation in mathematics from my BacII Science stream, high attention to detail, and a deep interest in modern Cambodian banking technologies, I am eager to start my banking career with your institution.',
      body1:
        'Throughout my academic journey, I achieved distinguished results in Mathematics and analytical subjects. I have developed high precision in calculations, cash handling discipline, and ethical responsibility. Furthermore, my proficiency in Microsoft Excel and bilingual fluency allows me to execute data entry tasks accurately while assisting clients with banking services professionally.',
      body2:
        '{company} has set the benchmark for digital banking and financial inclusion across Cambodia. Joining your frontline team would give me the ideal environment to apply my mathematical aptitude, maintain rigorous compliance standards, and deliver trust-inspiring assistance to each account holder.',
      closing:
        'Thank you for reviewing my application. I would be privileged to meet for an interview to demonstrate my enthusiasm and readiness to contribute to {company}’s operational excellence.',
      signOff: 'Respectfully yours,',
    },
    contentKm: {
      subject: 'ពាក្យស្នើសុំបម្រើការងារជា បេឡាធិការ / បុគ្គលិកសេវាអតិថិជនធនាគារ',
      salutation: 'គោរពជូន គណៈកម្មការជ្រើសរើសបុគ្គលិក {company},',
      opening:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមគោរពដាក់ពាក្យស្នើសុំបម្រើការងារក្នុងមុខតំណែងជា បេឡាធិការ (Bank Teller) នៅ {company}។ ដោយមានមូលដ្ឋានគ្រឹះរឹងមាំផ្នែកគណិតវិទ្យាពីថ្នាក់បាក់ឌុប ភាពហ្មត់ចត់ខ្ពស់ចំពោះតួលេខ និងចំណាប់អារម្មណ៍យ៉ាងខ្លាំងលើវិស័យធនាគារឌីជីថល ខ្ញុំបាទ/នាងខ្ញុំមានបំណងប្រាថ្នាយ៉ាងខ្លាំងក្នុងការចាប់ផ្តើមអាជីពជាមួយស្ថាប័នរបស់លោកអ្នក។',
      body1:
        'ក្នុងអំឡុងពេលសិក្សា ខ្ញុំបាទ/នាងខ្ញុំតែងតែទទួលបានលទ្ធផលល្អប្រសើរលើមុខវិជ្ជាគណិតវិទ្យា និងការវិភាគ។ ខ្ញុំបាទ/នាងខ្ញុំបានកសាងនូវទម្លាប់ធ្វើការងារយ៉ាងម៉ត់ចត់ ស្មោះត្រង់ និងមានស្មារតីទទួលខុសត្រូវខ្ពស់។ ក្រៅពីនេះ ខ្ញុំបាទ/នាងខ្ញុំចេះប្រើប្រាស់កម្មវិធីកុំព្យូទ័ររដ្ឋបាល (Microsoft Word, Excel) បានយ៉ាងស្ទាត់ជំនាញ និងមានសមត្ថភាពទំនាក់ទំនងភាសាអង់គ្លេសបានយ៉ាងល្អប្រសើរ។',
      body2:
        '{company} គឺជាធនាគារឈានមុខគេដែលទទួលបានការជឿទុកចិត្តខ្ពស់បំផុតទូទាំងប្រទេស។ ការចូលរួមជាមួយក្រុមការងារជួរមុខរបស់លោកអ្នក នឹងផ្ដល់ឱកាសឱ្យខ្ញុំបាទ/នាងខ្ញុំបានបញ្ចេញសមត្ថភាព ការប្រុងប្រយ័ត្នខ្ពស់ក្នុងការគ្រប់គ្រងសាច់ប្រាក់ និងការផ្ដល់សេវាកម្មប្រកបដោយទំនុកចិត្តជូនអតិថិជន។',
      closing:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងស្មោះអស់ពីដួងចិត្តចំពោះការពិនិត្យពាក្យស្នើសុំនេះ។ ខ្ញុំបាទ/នាងខ្ញុំទន្ទឹងរង់ចាំការកោះហៅសម្ភាសន៍ ដើម្បីបញ្ជាក់បន្ថែមពីការប្តេជ្ញាចិត្តរបស់ខ្ញុំបាទ/នាងខ្ញុំ។',
      signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
    },
  },
  {
    id: 'admin-assistant',
    titleEn: 'Administrative Assistant / Office Clerk',
    titleKm: 'ជំនួយការរដ្ឋបាល / បុគ្គលិកការិយាល័យ',
    category: 'admin',
    defaultCompanyEn: 'Smart Axiata Co., Ltd.',
    defaultCompanyKm: 'ក្រុមហ៊ុន ស្មាត អាស្យាតា (Smart Axiata)',
    contentEn: {
      subject: 'Application for Administrative Assistant Position',
      salutation: 'Dear Hiring Manager,',
      opening:
        'Please accept this letter as my enthusiastic application for the Administrative Assistant position at {company}. As an organized, tech-savvy candidate with strong communication abilities in Khmer and English, I am eager to provide top-notch organizational support to your office operations.',
      body1:
        'My academic achievements and coursework have honed my capabilities in document preparation, scheduling, correspondence management, and data recordkeeping. I am proficient in Google Workspace and Microsoft Office, typing rapidly and formatting business letters neatly. In addition, my proactive attitude ensures that routine tasks and inquiries are handled promptly and professionally.',
      body2:
        'I have long admired {company}’s innovative culture and dynamic work environment. I am confident that my strong work discipline, quick learning curve, and dedication to maintaining structured workflows will make me a dependable asset to your administrative department.',
      closing:
        'I appreciate your time and consideration of my candidacy. I look forward to the chance to speak with you in an interview and discuss how I can support the day-to-day productivity of {company}.',
      signOff: 'Sincerely,',
    },
    contentKm: {
      subject: 'ពាក្យស្នើសុំបម្រើការងារជា ជំនួយការរដ្ឋបាល (Administrative Assistant)',
      salutation: 'គោរពជូន លោក/លោកស្រី អ្នកគ្រប់គ្រងផ្នែកធនធានមនុស្ស {company},',
      opening:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមគោរពដាក់ពាក្យស្នើសុំបម្រើការងារក្នុងតួនាទីជា ជំនួយការរដ្ឋបាល នៅ {company}។ ដោយមានភាពរៀបរយ ជំនាញកុំព្យូទ័រការិយាល័យច្បាស់លាស់ និងសមត្ថភាពទំនាក់ទំនងបានទាំងភាសាខ្មែរ និងអង់គ្លេស ខ្ញុំបាទ/នាងខ្ញុំជឿជាក់ថានឹងអាចជួយសម្រួលដល់កិច្ចការរដ្ឋបាលប្រចាំថ្ងៃរបស់ស្ថាប័នលោកអ្នកបានយ៉ាងរលូន។',
      body1:
        'ខ្ញុំបាទ/នាងខ្ញុំមានជំនាញក្នុងការរៀបចំឯកសារ ការវាយអត្ថបទរហ័ស ទាំងភាសាខ្មែរ និងអង់គ្លេស ការរៀបចំទុកដាក់សំណុំលិខិតស្នាម និងការគ្រប់គ្រងទិន្នន័យលើ Microsoft Word, Excel និង Google Workspace។ លើសពីនេះ ខ្ញុំបាទ/នាងខ្ញុំជាមនុស្សចូលចិត្តការរៀនសូត្ររហ័ស មានភាពម៉ឺងម៉ាត់ និងយកចិត្តទុកដាក់ខ្ពស់លើការបំពេញភារកិច្ចឱ្យបានទាន់ពេលវេលា។',
      body2:
        '{company} គឺជាស្ថាប័នដែលមានកេរ្តិ៍ឈ្មោះល្បីល្បាញ និងមានបរិយាកាសការងារប្រកបដោយប្រសិទ្ធភាពខ្ពស់។ ខ្ញុំបាទ/នាងខ្ញុំមានឆន្ទៈខ្ពស់ក្នុងការចូលរួមចំណែកសម្របសម្រួលការងារការិយាល័យ និងផ្ដល់ការគាំទ្រដល់ក្រុមការងារដើម្បីសម្រេចបាននូវគោលដៅរួម។',
      closing:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណចំពោះការចំណាយពេលវេលាដ៏មានតម្លៃក្នុងការពិនិត្យលិខិតនេះ។ ខ្ញុំបាទ/នាងខ្ញុំរីករាយស្វាគមន៍ចំពោះការជួបសម្ភាសន៍ដោយផ្ទាល់នៅពេលដែលលោកអ្នកងាយស្រួល។',
      signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
    },
  },
  {
    id: 'junior-marketing',
    titleEn: 'Digital Marketing & Social Media Assistant',
    titleKm: 'ជំនួយការទីផ្សារឌីជីថល & បណ្ដាញសង្គម',
    category: 'marketing',
    defaultCompanyEn: 'Chip Mong Group',
    defaultCompanyKm: 'ក្រុមហ៊ុន ជីប ម៉ុង (Chip Mong Group)',
    contentEn: {
      subject: 'Application for Junior Digital Marketing Assistant',
      salutation: 'Dear Marketing Team & Hiring Manager,',
      opening:
        'I am excited to submit my application for the Junior Digital Marketing Assistant opening at {company}. As a creative, socially connected youth with a keen pulse on Cambodian social media trends and consumer engagement, I am enthusiastic about supporting your brand outreach.',
      body1:
        'I possess hands-on familiarity with Facebook, TikTok, Telegram channels, and Instagram campaign dynamics, paired with foundational graphic design skills in Canva and CapCut video editing. My strengths lie in drafting engaging bilingual copy, conceptualizing short-form video content, and analyzing basic page reach analytics to improve user engagement.',
      body2:
        'I have closely followed {company}’s compelling campaigns and admire how your brand connects with consumers across the Kingdom. I am eager to channel my energy, creative eye, and storytelling skills to amplify your digital presence and engage target audiences.',
      closing:
        'Thank you for reviewing my profile and portfolio. I would love the chance to discuss during an interview how my fresh perspective and creative drive can support your upcoming campaigns.',
      signOff: 'Best regards,',
    },
    contentKm: {
      subject: 'ពាក្យស្នើសុំបម្រើការងារជា ជំនួយការទីផ្សារឌីជីថល (Digital Marketing Assistant)',
      salutation: 'គោរពជូន ក្រុមការងារទីផ្សារ និងធនធានមនុស្ស {company},',
      opening:
        'ខ្ញុំបាទ/នាងខ្ញុំមានសេចក្តីរំភើបរីករាយក្នុងការដាក់ពាក្យស្នើសុំបម្រើការងារជា ជំនួយការទីផ្សារឌីជីថល នៅ {company}។ ក្នុងនាមជាយុវជនជំនាន់ក្រោយដែលមានគំនិតច្នៃប្រឌិត និងតាមដានយ៉ាងសកម្មនូវនិន្នាការបណ្ដាញសង្គមនៅកម្ពុជា ខ្ញុំបាទ/នាងខ្ញុំមានបំណងចូលរួមពង្រីកការផ្សព្វផ្សាយម៉ាកយីហោរបស់លោកអ្នកឱ្យកាន់តែទាក់ទាញ។',
      body1:
        'ខ្ញុំបាទ/នាងខ្ញុំចេះប្រើប្រាស់យ៉ាងស្ទាត់នូវបណ្ដាញសង្គមដូចជា Facebook, TikTok, Telegram និង Instagram រួមជាមួយជំនាញរចនាក្រាហ្វិកមូលដ្ឋានលើ Canva និងការកាត់តវីដេអូខ្លីលើ CapCut។ ខ្ញុំបាទ/នាងខ្ញុំមានសមត្ថភាពសរសេរ Caption បែបច្នៃប្រឌិតទាំងខ្មែរ និងអង់គ្លេស និងមានការយល់ដឹងពីរបៀបទាក់ទាញអន្តរកម្មពីសំណាក់ទស្សនិកជន។',
      body2:
        '{company} តែងតែមានយុទ្ធនាការផ្សព្វផ្សាយប្រកបដោយភាពច្នៃប្រឌិត និងមានឥទ្ធិពលខ្លាំងក្នុងទីផ្សារ។ ខ្ញុំបាទ/នាងខ្ញុំពិតជាចង់នាំយកថាមពលយុវវ័យ គំនិតប្លែកៗ និងការប្តេជ្ញាចិត្តខ្ពស់មកជួយជម្រុញការផ្សព្វផ្សាយផលិតផល និងសេវាកម្មរបស់ក្រុមហ៊ុនឱ្យកាន់តែលេចធ្លោ។',
      closing:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការពិចារណាពាក្យស្នើសុំនេះ ហើយខ្ញុំបាទ/នាងខ្ញុំសង្ឃឹមថានឹងទទួលបានការកោះហៅសម្ភាសន៍ដើម្បីបង្ហាញពីគំនិតបន្ថែម។',
      signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
    },
  },
  {
    id: 'junior-it-web',
    titleEn: 'Junior Web Developer / IT Support Assistant',
    titleKm: 'អ្នកបង្កើតគេហទំព័រដំបូង / ជំនួយការផ្នែកព័ត៌មានវិទ្យា (IT)',
    category: 'tech',
    defaultCompanyEn: 'Tech Innovation Labs',
    defaultCompanyKm: 'ក្រុមហ៊ុន បច្ចេកវិទ្យាព័ត៌មានវិទ្យា',
    contentEn: {
      subject: 'Application for Junior Web Developer / IT Support',
      salutation: 'Dear Engineering Lead & Hiring Team,',
      opening:
        'I am writing to express my strong interest in the Junior Web Developer / IT Support role at {company}. With a passionate curiosity for software development, hands-on self-taught projects, and logical problem-solving rigor from my BacII Science background, I am eager to contribute to your technical initiatives.',
      body1:
        'My foundational technical stack encompasses HTML5, CSS3, JavaScript, TypeScript, and modern component frameworks like React. I have built functional web interfaces, practiced Git version control, and developed good debugging intuition. In addition, I have hands-on familiarity with hardware troubleshooting, operating system configurations, and local network setups.',
      body2:
        '{company}’s reputation for building impactful digital solutions makes it the ideal place for an enthusiastic junior technologist. I bring a hungry appetite for continuous code learning, clean documentation discipline, and relentless determination to solve technical bottlenecks.',
      closing:
        'Thank you for your time and consideration. I would welcome an interview or technical evaluation to demonstrate my coding projects and passion for software craft.',
      signOff: 'Sincerely,',
    },
    contentKm: {
      subject: 'ពាក្យស្នើសុំបម្រើការងារជា អ្នកបង្កើតគេហទំព័រដំបូង / ជំនួយការផ្នែក IT',
      salutation: 'គោរពជូន ប្រធានផ្នែកបច្ចេកវិទ្យា និងធនធានមនុស្ស {company},',
      opening:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមគោរពដាក់ពាក្យស្នើសុំបម្រើការងារក្នុងតួនាទីជា Junior Web Developer / IT Support នៅ {company}។ ដោយមានចិត្តស្រឡាញ់យ៉ាងជ្រាលជ្រៅលើបច្ចេកវិទ្យាព័ត៌មានវិទ្យា ជំនាញដោះស្រាយបញ្ហាបែបតក្កវិជ្ជាពីថ្នាក់វិទ្យាសាស្ត្រ និងការអនុវត្តបង្កើតគម្រោងផ្ទាល់ខ្លួន ខ្ញុំបាទ/នាងខ្ញុំមានបំណងចូលរួមអភិវឌ្ឍប្រព័ន្ធជាមួយក្រុមហ៊ុន។',
      body1:
        'ខ្ញុំបាទ/នាងខ្ញុំមានមូលដ្ឋានគ្រឹះក្នុងការសរសេរកូដ HTML5, CSS3, JavaScript, TypeScript និង React ព្រមទាំងការប្រើប្រាស់ Git/GitHub ក្នុងការគ្រប់គ្រងកូដ។ ក្រៅពីនេះ ខ្ញុំបាទ/នាងខ្ញុំក៏មានការយល់ដឹងលើការដំឡើងប្រព័ន្ធកុំព្យូទ័រ ការជួសជុលបញ្ហាបច្ចេកទេសទូទៅ (Hardware & Software) និងការតភ្ជាប់ប្រព័ន្ធអ៊ីនធឺណិត Network ផងដែរ។',
      body2:
        '{company} គឺជាស្ថាប័នបច្ចេកវិទ្យាដែលមានការរីកចម្រើនគួរឱ្យកត់សម្គាល់។ ខ្ញុំបាទ/នាងខ្ញុំមានឆន្ទៈខ្ពស់ក្នុងការរៀនសូត្របច្ចេកវិទ្យាថ្មីៗពីសមាជិកជាន់ខ្ពស់ និងប្តេជ្ញាខិតខំប្រឹងប្រែងដើម្បីជួយឱ្យប្រព័ន្ធដំណើរការបានយ៉ាងរលូន។',
      closing:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការពិចារណាពាក្យស្នើសុំនេះ ហើយខ្ញុំបាទ/នាងខ្ញុំរីករាយនឹងចូលរួមការធ្វើតេស្តបច្ចេកទេស ឬការសម្ភាសន៍ដោយផ្ទាល់។',
      signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
    },
  },
  {
    id: 'ngo-project-volunteer',
    titleEn: 'NGO Project Assistant / Youth Coordinator',
    titleKm: 'ជំនួយការគម្រោងអង្គការក្រៅរដ្ឋាភិបាល / អ្នកសម្របសម្រួលយុវជន',
    category: 'ngo',
    defaultCompanyEn: 'Youth for Development Organization',
    defaultCompanyKm: 'អង្គការអភិវឌ្ឍន៍យុវជន និងសហគមន៍',
    contentEn: {
      subject: 'Application for Project Assistant / Youth Coordinator Position',
      salutation: 'Dear Program Director & Recruitment Team,',
      opening:
        'I am writing to enthusiastically apply for the Project Assistant position at {company}. Driven by a deep commitment to community development, educational empowerment, and youth advocacy in Cambodia, I am eager to support your impactful field programs.',
      body1:
        'During my high school and community involvement, I actively organized educational workshops, volunteer campaigns, and youth outreach initiatives. These experiences cultivated my abilities in stakeholder coordination, public speaking in both Khmer and English, field logistics management, and report writing. I thrive in collaborative community-oriented settings.',
      body2:
        '{company}’s dedication to grassroots community upliftment resonates deeply with my personal values. I am excited to contribute my empathy, organizing discipline, cultural sensitivity, and strong communication skills to empower your beneficiaries and advance your mission.',
      closing:
        'Thank you very much for your thoughtful consideration. I look forward to the possibility of discussing how my grassroots commitment and energetic work ethic can support {company}’s programs.',
      signOff: 'With warm regards,',
    },
    contentKm: {
      subject: 'ពាក្យស្នើសុំបម្រើការងារជា ជំនួយការគម្រោង / អ្នកសម្របសម្រួលយុវជន',
      salutation: 'គោរពជូន នាយកកម្មវិធី និងគណៈគ្រប់គ្រងជ្រើសរើសបុគ្គលិក {company},',
      opening:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមគោរពដាក់ពាក្យស្នើសុំបម្រើការងារជា ជំនួយការគម្រោង នៅ {company}។ ដោយមានចិត្តស្រឡាញ់ និងការប្តេជ្ញាចិត្តខ្ពស់ក្នុងការចូលរួមចំណែកអភិវឌ្ឍសហគមន៍ និងការលើកកម្ពស់វិស័យអប់រំនៅកម្ពុជា ខ្ញុំបាទ/នាងខ្ញុំពិតជាមានបំណងប្រាថ្នាយ៉ាងខ្លាំងក្នុងការចូលរួមជួយដល់គម្រោងរបស់អង្គការ។',
      body1:
        'កន្លងមក ខ្ញុំបាទ/នាងខ្ញុំធ្លាប់បានចូលរួមយ៉ាងសកម្មក្នុងសកម្មភាពស្ម័គ្រចិត្ត និងការរៀបចំកម្មវិធីយុវជននានាក្នុងសហគមន៍។ បទពិសោធន៍ទាំងនេះបានបណ្តុះនូវសមត្ថភាពសម្របសម្រួល ការទំនាក់ទំនងជាមួយប្រជាពលរដ្ឋ និងយុវជន ការរៀបចំកិច្ចការភស្តុភារ និងការសរសេររបាយការណ៍សង្ខេប។ ខ្ញុំបាទ/នាងខ្ញុំមានភាពរួសរាយ រហ័សរហួន និងចេះយល់ចិត្តអ្នកដទៃ។',
      body2:
        'បេសកកម្មដ៏មានតម្លៃរបស់ {company} ក្នុងការជួយដល់សហគមន៍មូលដ្ឋានគឺជាការលើកទឹកចិត្តយ៉ាងធំធេងសម្រាប់ខ្ញុំបាទ/នាងខ្ញុំ។ ខ្ញុំបាទ/នាងខ្ញុំត្រៀមខ្លួនជាស្រេចក្នុងការចុះបំពេញការងារដោយផ្ទាល់ជាមួយសហគមន៍ ដោយកម្លាំងកាយចិត្ត និងភាពស្មោះត្រង់។',
      closing:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការពិនិត្យពាក្យស្នើសុំនេះ ហើយខ្ញុំបាទ/នាងខ្ញុំសង្ឃឹមថានឹងទទួលបានឱកាសជួបពិភាក្សាលម្អិតក្នុងការសម្ភាសន៍។',
      signOff: 'ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,',
    },
  },
];

export const AI_QUICK_PARAGRAPHS = {
  openings: [
    {
      labelEn: 'BacII Fresh Graduate High Score Angle',
      labelKm: 'បែបសិស្សបាក់ឌុបទើបចប់ (ពិន្ទុល្អ & វិន័យខ្ពស់)',
      textEn:
        'As a motivated recent BacII graduate with a strong academic track record and a passion for continuous learning, I am eager to apply my discipline and enthusiasm to the {role} position at {company}.',
      textKm:
        'ក្នុងនាមជាសិស្សទើបបញ្ចប់ការប្រឡងបាក់ឌុបដែលមានលទ្ធផលល្អប្រសើរ និងមានឆន្ទៈខ្ពស់ក្នុងការរៀនសូត្រ ខ្ញុំបាទ/នាងខ្ញុំមានបំណងប្រាថ្នាយ៉ាងមុតមាំក្នុងការនាំយកនូវវិន័យ និងភាពសកម្មមកចូលរួមបំពេញការងារក្នុងតួនាទីជា {role} នៅ {company}។',
    },
    {
      labelEn: 'Energetic & Customer First Angle',
      labelKm: 'បែបយុវវ័យរួសរាយ & ផ្ដោតលើអតិថិជន',
      textEn:
        'With a warm personality, exceptional bilingual communication skills, and a genuine joy in helping others, I am thrilled to apply for the {role} opportunity at {company}.',
      textKm:
        'ដោយមានភាពរួសរាយរាក់ទាក់ សមត្ថភាពប្រាស្រ័យទាក់ទងបានល្អទាំងពីរភាសា និងចិត្តស្រឡាញ់ការជួយអ្នកដទៃ ខ្ញុំបាទ/នាងខ្ញុំមានក្តីសោមនស្សរីករាយក្នុងការដាក់ពាក្យស្នើសុំបម្រើការងារជា {role} នៅ {company}។',
    },
    {
      labelEn: 'Structured & Career-Driven Angle',
      labelKm: 'បែបមានគោលដៅអាជីពច្បាស់លាស់ & វិជ្ជាជីវៈ',
      textEn:
        'I am writing to formally express my interest in joining {company} as a {role}. My strong work ethic, rapid learning ability, and commitment to quality make me confident in delivering immediate value to your daily operations.',
      textKm:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមគោរពដាក់ពាក្យស្នើសុំចូលរួមជាមួយ {company} ក្នុងមុខតំណែងជា {role}។ ក្រមសីលធម៌ការងារដ៏រឹងមាំ សមត្ថភាពរៀនសូត្ររហ័ស និងការយកចិត្តទុកដាក់លើគុណភាព ធ្វើឱ្យខ្ញុំបាទ/នាងខ្ញុំមានទំនុកចិត្តថានឹងអាចផ្ដល់តម្លៃបន្ថែមដល់ប្រតិបត្តិការរបស់លោកអ្នក។',
    },
  ],
  closings: [
    {
      labelEn: 'Confident & Respectful Interview Request',
      labelKm: 'សំណើសុំសម្ភាសន៍ប្រកបដោយទំនុកចិត្ត & គួរសម',
      textEn:
        'Thank you very much for your valuable time and consideration. I would welcome the opportunity to discuss in an interview how my skills, positive attitude, and eagerness to learn can support {company}. I look forward to hearing from you.',
      textKm:
        'ខ្ញុំបាទ/នាងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះពេលវេលា និងការពិចារណារបស់លោក/លោកស្រី។ ខ្ញុំបាទ/នាងខ្ញុំទន្ទឹងរង់ចាំឱកាសជួបសម្ភាសន៍ ដើម្បីពិភាក្សាបន្ថែមពីរបៀបដែលភាពឧស្សាហ៍ និងឆន្ទៈរបស់ខ្ញុំអាចជួយដល់ {company}។',
    },
    {
      labelEn: 'Action-Oriented Follow Up',
      labelKm: 'បែបសកម្ម និងត្រៀមខ្លួនជាស្រេចក្នុងការចាប់ផ្ដើម',
      textEn:
        'I am genuinely excited about the prospect of contributing to {company}’s continued growth. I am available at your earliest convenience for an interview and am prepared to commence work immediately.',
      textKm:
        'ខ្ញុំបាទ/នាងខ្ញុំពិតជាមានសេចក្តីរំភើបចំពោះឱកាសក្នុងការចូលរួមចំណែកដល់ការរីកចម្រើនរបស់ {company}។ ខ្ញុំបាទ/នាងខ្ញុំត្រៀមខ្លួនជាស្រេចក្នុងការចូលរួមការសម្ភាសន៍ និងអាចចាប់ផ្តើមបំពេញការងារបានភ្លាមៗ។',
    },
  ],
};
