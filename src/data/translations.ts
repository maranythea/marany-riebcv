import type { LanguageCode } from '../types/cv';

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  badgeBacII: string;
  exportPdf: string;
  exportImage: string;
  printCv: string;
  saveData: string;
  loadSample: string;
  resetForm: string;
  preview: string;
  edit: string;
  cvStrength: string;
  proBadge: string;
  freeBadge: string;
  unlockedBadge: string;
  lockedBadge: string;
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    myAccount: string;
    myResumes: string;
    emailLabel: string;
    passwordLabel: string;
    fullNameLabel: string;
    loginTitle: string;
    registerTitle: string;
    demoLoginStudent: string;
    demoLoginPro: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    orContinueWith: string;
    welcomeBack: string;
    loginSuccess: string;
    registerSuccess: string;
  };
  pricing: {
    unlockTitle: string;
    unlockSubtitle: string;
    singleUnlock: string;
    singleUnlockPrice: string;
    lifetimePro: string;
    lifetimeProPrice: string;
    lifetimeDesc: string;
    scanKhqr: string;
    khqrHint: string;
    simulatedPayBtn: string;
    paySuccessTitle: string;
    paySuccessDesc: string;
    featuresPro: string[];
    featureFree: string[];
    alreadyPro: string;
    currentPlan: string;
    upgradeNow: string;
  };
  resumes: {
    title: string;
    subtitle: string;
    createNew: string;
    emptyList: string;
    lastEdited: string;
    duplicate: string;
    deleteConfirm: string;
    currentCvBadge: string;
    loadCv: string;
  };
  tabs: {
    personal: string;
    objective: string;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    honors: string;
    references: string;
    design: string;
  };
  personal: {
    title: string;
    desc: string;
    fullName: string;
    khmerName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    telegram: string;
    linkedin: string;
    portfolio: string;
    dateOfBirth: string;
    gender: string;
    photo: string;
    uploadPhoto: string;
    removePhoto: string;
    photoShape: string;
    circle: string;
    rounded: string;
    square: string;
    hidePhoto: string;
  };
  objective: {
    title: string;
    desc: string;
    placeholder: string;
    aiSuggestBtn: string;
    quickStarters: string;
  };
  education: {
    title: string;
    desc: string;
    addBtn: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    isBacII: string;
    bacGrade: string;
    bacStream: string;
    startDate: string;
    endDate: string;
    current: string;
    scoreOrGpa: string;
    achievements: string;
    addAchievement: string;
    bacIiBadge: string;
    streamScience: string;
    streamSocial: string;
    streamGeneral: string;
  };
  experience: {
    title: string;
    desc: string;
    addBtn: string;
    role: string;
    org: string;
    type: string;
    typeJob: string;
    typeVolunteer: string;
    typeClub: string;
    typeInternship: string;
    typeProject: string;
    startDate: string;
    endDate: string;
    current: string;
    bullets: string;
    addBullet: string;
    bulletSuggestion: string;
    emptyNote: string;
  };
  skills: {
    title: string;
    desc: string;
    addBtn: string;
    skillName: string;
    category: string;
    catHard: string;
    catSoft: string;
    catDigital: string;
    catOther: string;
    quickAdd: string;
  };
  languages: {
    title: string;
    desc: string;
    addBtn: string;
    langName: string;
    proficiency: string;
    profNative: string;
    profFluent: string;
    profIntermediate: string;
    profBasic: string;
    quickAddKhmer: string;
    quickAddEnglish: string;
  };
  honors: {
    title: string;
    desc: string;
    addBtn: string;
    honorTitle: string;
    issuer: string;
    year: string;
    description: string;
  };
  references: {
    title: string;
    desc: string;
    addBtn: string;
    name: string;
    role: string;
    org: string;
    phone: string;
    email: string;
    relationship: string;
  };
  design: {
    title: string;
    desc: string;
    template: string;
    colorTheme: string;
    font: string;
    fontSize: string;
    sizeCompact: string;
    sizeNormal: string;
    sizeSpacious: string;
    fitOnePage: string;
    showIcons: string;
    unlockToUse: string;
  };
  templates: {
    phnomPenh: string;
    angkor: string;
    emerald: string;
    creative: string;
    tech: string;
  };
  tipsModal: {
    title: string;
    subtitle: string;
    close: string;
  };
  aiModal: {
    title: string;
    subtitle: string;
    selectRole: string;
    insertText: string;
  };
  sampleProfiles: {
    title: string;
    profile1: string;
    profile2: string;
    profile3: string;
  };
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'RiebCV',
    appTagline: 'Professional CV Builder for BacII & Fresh Graduates',
    badgeBacII: 'BacII Special',
    exportPdf: 'Download PDF',
    exportImage: 'Download PNG',
    printCv: 'Print CV',
    saveData: 'Save & Export',
    loadSample: 'Load Sample CV',
    resetForm: 'Clear All',
    preview: 'Live Preview',
    edit: 'Editor',
    cvStrength: 'CV Strength',
    proBadge: 'PRO 👑',
    freeBadge: 'FREE',
    unlockedBadge: 'UNLOCKED ✓',
    lockedBadge: 'LOCKED 🔒',
    auth: {
      signIn: 'Sign In',
      signUp: 'Create Account',
      signOut: 'Sign Out',
      myAccount: 'My Account',
      myResumes: 'My Resumes',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      fullNameLabel: 'Your Name',
      loginTitle: 'Welcome Back to RiebCV',
      registerTitle: 'Create Your Free Student Account',
      demoLoginStudent: '⚡ Quick Login: Student (Free)',
      demoLoginPro: '👑 Quick Login: Pro Member',
      dontHaveAccount: 'Don\'t have an account yet? Register here',
      alreadyHaveAccount: 'Already have an account? Sign in',
      orContinueWith: 'Or continue with demo profile:',
      welcomeBack: 'Welcome back',
      loginSuccess: 'Logged in successfully!',
      registerSuccess: 'Account created successfully!',
    },
    pricing: {
      unlockTitle: 'Unlock Premium Template',
      unlockSubtitle: 'Stand out from the crowd with executive typography, gold accents, and priority layout',
      singleUnlock: 'Unlock This Single Template',
      singleUnlockPrice: '$1.99 (8,000 KHR)',
      lifetimePro: 'Lifetime All-Access Pass',
      lifetimeProPrice: '$4.99 (20,000 KHR)',
      lifetimeDesc: 'Unlock ALL 5+ premium templates forever + unlimited saved resumes + high-res PDF exports',
      scanKhqr: 'Scan with KHQR (ABA Bank, Bakong, Wing, ACLEDA)',
      khqrHint: 'Open your banking app and scan this KHQR code to unlock instantly',
      simulatedPayBtn: '✓ Complete Payment & Unlock Now',
      paySuccessTitle: 'Payment Successful! 🎉',
      paySuccessDesc: 'Your premium template is now unlocked and ready to use.',
      featuresPro: [
        'Access to all 5+ Premium Templates (Angkor Classic, Creative Pro, Tech Pro)',
        'Unlimited Saved CVs in your Account',
        'Direct High-Res A4 PDF & PNG Exports',
        'AI Writing Assistant with Unlimited Action Bullets',
        'Khmer & English Dual-Language Support',
      ],
      featureFree: [
        '2 Clean Standard Templates (Phnom Penh Modern & Emerald Minimalist)',
        'Up to 2 Saved Resumes',
        'Standard PDF Export',
      ],
      alreadyPro: 'You have Active PRO Lifetime Membership! 👑',
      currentPlan: 'Current Plan',
      upgradeNow: 'Upgrade to PRO 👑',
    },
    resumes: {
      title: 'My Saved Resumes',
      subtitle: 'Manage and switch between different versions of your CV for different job applications',
      createNew: '+ Create New CV',
      emptyList: 'No saved resumes yet. Click Create New to start!',
      lastEdited: 'Last edited:',
      duplicate: 'Duplicate',
      deleteConfirm: 'Are you sure you want to delete this resume?',
      currentCvBadge: 'Active on Screen',
      loadCv: 'Open in Editor',
    },
    tabs: {
      personal: 'Personal Info',
      objective: 'Objective',
      education: 'Education & BacII',
      experience: 'Activities & Work',
      skills: 'Skills',
      languages: 'Languages',
      honors: 'Honors & Awards',
      references: 'References',
      design: 'Design & Style',
    },
    personal: {
      title: 'Personal Details',
      desc: 'Fill in your name, contact information, and professional photo.',
      fullName: 'Full Name (Latin / English)',
      khmerName: 'Khmer Name (Optional)',
      jobTitle: 'Desired Position / Profile Title',
      email: 'Email Address',
      phone: 'Phone Number (e.g. +855 12 345 678)',
      location: 'City / Province (e.g. Phnom Penh, Cambodia)',
      telegram: 'Telegram Username (@username)',
      linkedin: 'LinkedIn / Portfolio URL',
      portfolio: 'Facebook / Portfolio (Optional)',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender (Optional)',
      photo: 'Profile Photo',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove',
      photoShape: 'Photo Frame Style',
      circle: 'Circular',
      rounded: 'Rounded Square',
      square: 'Sharp Square',
      hidePhoto: 'Hide Photo on CV',
    },
    objective: {
      title: 'Career Objective / Summary',
      desc: 'Introduce yourself and state what value you bring to the employer.',
      placeholder: 'Enthusiastic and motivated BacII graduate with a strong academic background in Science. Eager to leverage strong communication, digital literacy, and teamwork skills in an entry-level position...',
      aiSuggestBtn: '✨ Suggest BacII Objectives',
      quickStarters: 'Quick Starter Ideas:',
    },
    education: {
      title: 'Education & BacII Exam Results',
      desc: 'Highlight your High School diploma (BacII grade & stream), university studies, or training courses.',
      addBtn: '+ Add Education',
      institution: 'School / University Name',
      degree: 'Degree / Certificate Level',
      fieldOfStudy: 'Field of Study / Stream',
      isBacII: 'This is my High School / BacII Diploma',
      bacGrade: 'BacII Grade (និទ្ទេស)',
      bacStream: 'Stream (ផ្នែក)',
      startDate: 'Start Year / Date',
      endDate: 'Graduation Year / Date',
      current: 'Currently Studying here',
      scoreOrGpa: 'GPA / Overall Score (Optional)',
      achievements: 'Notable Subjects / Achievements',
      addAchievement: '+ Add Highlight',
      bacIiBadge: 'BacII Diploma',
      streamScience: 'Science (វិទ្យាសាស្ត្រ)',
      streamSocial: 'Social Science (វិទ្យាសាស្ត្រសង្គម)',
      streamGeneral: 'General Education',
    },
    experience: {
      title: 'Experience, Clubs & Volunteering',
      desc: 'No formal job yet? Include school clubs, volunteer projects, tutoring, youth associations, or part-time gigs!',
      addBtn: '+ Add Experience / Activity',
      role: 'Role / Position Title',
      org: 'Organization / School / Business',
      type: 'Category',
      typeJob: 'Part-Time / Full-Time Work',
      typeVolunteer: 'Volunteer / Community Service',
      typeClub: 'High School Club / Leadership',
      typeInternship: 'Internship / Apprenticeship',
      typeProject: 'Academic / Group Project',
      startDate: 'Start Date',
      endDate: 'End Date',
      current: 'Currently ongoing',
      bullets: 'Key Responsibilities & Accomplishments',
      addBullet: '+ Add Bullet Point',
      bulletSuggestion: '✨ Insert Student Action Bullets',
      emptyNote: '💡 Tip for BacII students: Volunteering, class committee leadership, or helping at a family shop counts as valuable experience!',
    },
    skills: {
      title: 'Skills & Competencies',
      desc: 'Highlight digital tools (Microsoft Office, Canva, Social Media) and personal strengths.',
      addBtn: '+ Add Custom Skill',
      skillName: 'Skill Name',
      category: 'Category',
      catHard: 'Technical / Core',
      catSoft: 'Soft Skill / People Skill',
      catDigital: 'Digital & Software',
      catOther: 'Other Skill',
      quickAdd: 'One-Click Quick Add:',
    },
    languages: {
      title: 'Languages',
      desc: 'Employers in Cambodia love multilingual candidates (Khmer, English, Chinese, French, etc.)',
      addBtn: '+ Add Language',
      langName: 'Language',
      proficiency: 'Proficiency Level',
      profNative: 'Native / Mother Tongue',
      profFluent: 'Fluent / Advanced',
      profIntermediate: 'Intermediate (Good Working)',
      profBasic: 'Basic / Elementary',
      quickAddKhmer: '+ Khmer (Native)',
      quickAddEnglish: '+ English (Intermediate)',
    },
    honors: {
      title: 'Honors, Awards & Certificates',
      desc: 'Showcase high school competitions, outstanding student awards, debate prizes, or workshops.',
      addBtn: '+ Add Honor / Award',
      honorTitle: 'Award / Honor Name',
      issuer: 'Awarding Organization / School',
      year: 'Year / Date Received',
      description: 'Brief Description / Significance',
    },
    references: {
      title: 'References',
      desc: 'Add high school teachers, club mentors, or project supervisors who can vouch for your character.',
      addBtn: '+ Add Reference',
      name: 'Full Name',
      role: 'Role / Designation',
      org: 'School / Institution / Company',
      phone: 'Phone Number',
      email: 'Email Address',
      relationship: 'Relationship (e.g. Grade 12 Math Teacher / Club Mentor)',
    },
    design: {
      title: 'Design, Theme & Layout',
      desc: 'Select from modern designer templates, adjust color palettes, typography, and page sizing.',
      template: 'Choose CV Template',
      colorTheme: 'Accent Color',
      font: 'Typography Font',
      fontSize: 'Content Density & Spacing',
      sizeCompact: 'Compact (Fit 1 Page)',
      sizeNormal: 'Balanced (Standard)',
      sizeSpacious: 'Spacious (Clean)',
      fitOnePage: 'Auto-Fit to 1 A4 Page',
      showIcons: 'Show Section Icons',
      unlockToUse: '🔒 Unlock with PRO to use this design',
    },
    templates: {
      phnomPenh: 'Phnom Penh Modern (2-Column)',
      angkor: 'Angkor Classic Gold (VIP)',
      emerald: 'Emerald Minimalist (Clean ATS)',
      creative: 'Creative Gradient Pro (Vibrant)',
      tech: 'Tech & Compact Pro (Structured)',
    },
    tipsModal: {
      title: 'BacII Student Job & CV Guide',
      subtitle: 'Expert tips on landing your first job or internship after Grade 12 in Cambodia',
      close: 'Got it, let\'s build!',
    },
    aiModal: {
      title: 'Smart Assistant for BacII Students',
      subtitle: 'Pick high-impact, employer-ready action statements tailored for high school graduates',
      selectRole: 'Select Your Background or Target Field:',
      insertText: 'Insert into CV',
    },
    sampleProfiles: {
      title: 'Load Ready-Made Sample Profile',
      profile1: '☕ BacII Grad (Customer Service / F&B / Barista)',
      profile2: '💻 BacII Grad (Admin / Data Entry / IT Junior)',
      profile3: '🎓 Grade A BacII Graduate (University Scholarship)',
    },
  },
  km: {
    appName: 'រៀប CV (RiebCV)',
    appTagline: 'កម្មវិធីបង្កើតប្រវត្តិរូបសង្ខេប (CV) ទំនើបសម្រាប់សិស្សទើបចប់បាក់ឌុប និងនិស្សិត',
    badgeBacII: 'ពិសេសសម្រាប់បាក់ឌុប',
    exportPdf: 'ទាញយក PDF',
    exportImage: 'ទាញយក PNG',
    printCv: 'បោះពុម្ព (Print)',
    saveData: 'រក្សាទុក & នាំចេញ',
    loadSample: 'ផ្ទុកគំរូ CV',
    resetForm: 'សម្អាតទម្រង់',
    preview: 'មើលផ្ទាល់ (Preview)',
    edit: 'កែសម្រួល (Editor)',
    cvStrength: 'កម្រិតពេញលេញ CV',
    proBadge: 'PRO 👑',
    freeBadge: 'ឥតគិតថ្លៃ (FREE)',
    unlockedBadge: 'បានដោះសោរួច ✓',
    lockedBadge: 'ត្រូវដោះសោ 🔒',
    auth: {
      signIn: 'ចូលគណនី (Sign In)',
      signUp: 'ចុះឈ្មោះ (Sign Up)',
      signOut: 'ចាកចេញ (Sign Out)',
      myAccount: 'គណនីរបស់ខ្ញុំ',
      myResumes: 'CV របស់ខ្ញុំ',
      emailLabel: 'អាសយដ្ឋានអ៊ីមែល (Email)',
      passwordLabel: 'ពាក្យសម្ងាត់ (Password)',
      fullNameLabel: 'ឈ្មោះពេញរបស់អ្នក',
      loginTitle: 'សូមស្វាគមន៍មកកាន់ RiebCV',
      registerTitle: 'បង្កើតគណនីសិស្សឥតគិតថ្លៃ',
      demoLoginStudent: '⚡ ចូលសាកល្បង៖ គណនីសិស្ស (Free)',
      demoLoginPro: '👑 ចូលសាកល្បង៖ សមាជិក PRO',
      dontHaveAccount: 'មិនទាន់មានគណនី? ចុចទីនេះដើម្បីចុះឈ្មោះ',
      alreadyHaveAccount: 'មានគណនីរួចហើយ? ចូលគណនី',
      orContinueWith: 'ឬ ចូលគណនីសាកល្បងភ្លាមៗ៖',
      welcomeBack: 'ស្វាគមន៍ការត្រឡប់មកវិញ',
      loginSuccess: 'ចូលគណនីដោយជោគជ័យ!',
      registerSuccess: 'បានបង្កើតគណនីដោយជោគជ័យ!',
    },
    pricing: {
      unlockTitle: 'ដោះសោម៉ូដ CV ពិសេស (Premium Template)',
      unlockSubtitle: 'លេចធ្លោជាងគេក្នុងការដាក់ពាក្យជាមួយរចនាបថប្រណីត អក្សរច្បាស់ និងទម្រង់បែបស្តង់ដារ',
      singleUnlock: 'ដោះសោម៉ូដនេះ ១ គត់',
      singleUnlockPrice: '$1.99 (៨,០០០ រៀល)',
      lifetimePro: 'កញ្ចប់សមាជិក PRO ពេញមួយជីវិត',
      lifetimeProPrice: '$4.99 (២០,០០០ រៀល)',
      lifetimeDesc: 'ដោះសោរាល់ម៉ូដ CV ទាំងអស់រហូត + រក្សាទុក CV មិនកំណត់ + ទាញយក PDF កម្រិតច្បាស់ខ្ពស់',
      scanKhqr: 'ស្កេនទូទាត់តាម KHQR (ABA, Bakong, Wing, ACLEDA)',
      khqrHint: 'បើកកម្មវិធីធនាគាររបស់អ្នក ហើយស្កេន KHQR នេះដើម្បីដោះសោរហ័សទាន់ចិត្ត',
      simulatedPayBtn: '✓ បញ្ជាក់ការទូទាត់ & ដោះសោភ្លាមៗ',
      paySuccessTitle: 'ការទូទាត់ជោគជ័យ! 🎉',
      paySuccessDesc: 'ម៉ូដ CV ពិសេសរបស់អ្នកត្រូវបានដោះសោរួចរាល់សម្រាប់ប្រើប្រាស់។',
      featuresPro: [
        'ប្រើប្រាស់រាល់ម៉ូដ CV ពិសេសទាំងអស់ (Angkor Classic VIP, Creative Pro, Tech Pro)',
        'រក្សាទុក CV បានច្រើនក្នុងគណនីផ្ទាល់ខ្លួន',
        'ទាញយក PDF និង PNG កម្រិតច្បាស់ខ្ពស់ឥតកំណត់',
        'ជំនួយការសរសេរ AI ជាមួយឃ្លាពិពណ៌នាពេញលេញ',
        'គាំទ្រការប្តូរភាសា ខ្មែរ-អង់គ្លេស',
      ],
      featureFree: [
        'ម៉ូដស្តង់ដារឥតគិតថ្លៃចំនួន ២ (ភ្នំពេញសម័យថ្មី & អេមឺរ៉ាល់ ATS)',
        'រក្សាទុក CV បានចំនួន ២',
        'ទាញយក PDF ស្តង់ដារ A4',
      ],
      alreadyPro: 'អ្នកជាសមាជិក PRO ពេញមួយជីវិតរួចរាល់ហើយ! 👑',
      currentPlan: 'គម្រោងបច្ចុប្បន្ន',
      upgradeNow: 'ដំឡើងទៅ PRO 👑',
    },
    resumes: {
      title: 'បញ្ជី CV របស់ខ្ញុំ',
      subtitle: 'គ្រប់គ្រង និងប្តូររវាង CV ច្រើនប្រភេទសម្រាប់ដាក់ពាក្យការងារផ្សេងៗគ្នា',
      createNew: '+ បង្កើត CV ថ្មី',
      emptyList: 'មិនទាន់មាន CV នៅឡើយទេ។ ចុច "បង្កើត CV ថ្មី" ដើម្បីចាប់ផ្តើម!',
      lastEdited: 'កែប្រែចុងក្រោយ៖',
      duplicate: 'ចម្លងបង្កើតថ្មី (Duplicate)',
      deleteConfirm: 'តើអ្នកពិតជាចង់លុប CV នេះមែនទេ?',
      currentCvBadge: 'កំពុងកែសម្រួល',
      loadCv: 'បើកកែសម្រួល',
    },
    tabs: {
      personal: 'ព័ត៌មានផ្ទាល់ខ្លួន',
      objective: 'គោលបំណងការងារ',
      education: 'ការអប់រំ & បាក់ឌុប',
      experience: 'សកម្មភាព & បទពិសោធន៍',
      skills: 'ជំនាញ',
      languages: 'ភាសា',
      honors: 'ពានរង្វាន់ & សមិទ្ធផល',
      references: 'បុគ្គលយោង',
      design: 'ម៉ូដ & រចនាបថ',
    },
    personal: {
      title: 'ព័ត៌មានផ្ទាល់ខ្លួន',
      desc: 'បំពេញឈ្មោះ ព័ត៌មានទំនាក់ទំនង និងរូបថតដែលមានលក្ខណៈវិជ្ជាជីវៈ។',
      fullName: 'ឈ្មោះជាភាសាអង់គ្លេស (Full Name)',
      khmerName: 'ឈ្មោះជាភាសាខ្មែរ',
      jobTitle: 'តំណែង ឬ គោលដៅការងារដែលចង់បាន',
      email: 'អ៊ីមែល (Email)',
      phone: 'លេខទូរស័ព្ទ (ឧ. 012 345 678)',
      location: 'ទីកន្លែង / រាជធានី-ខេត្ត (ឧ. រាជធានីភ្នំពេញ)',
      telegram: 'តេឡេក្រាម (@username)',
      linkedin: 'LinkedIn / គេហទំព័រ',
      portfolio: 'Facebook / តំណភ្ជាប់បន្ថែម',
      dateOfBirth: 'ថ្ងៃខែឆ្នាំកំណើត',
      gender: 'ភេទ',
      photo: 'រូបថតផ្ទាល់ខ្លួន',
      uploadPhoto: 'បញ្ចូលរូបថត',
      removePhoto: 'លុបរូបថត',
      photoShape: 'ទម្រង់ស៊ុមរូបថត',
      circle: 'រង្វង់មូល',
      rounded: 'ជ្រុងមូល',
      square: 'ជ្រុងស្រួច',
      hidePhoto: 'លាក់រូបថតលើ CV',
    },
    objective: {
      title: 'គោលបំណងការងារ / សេចក្តីសង្ខេប',
      desc: 'ណែនាំអំពីខ្លួនឯង និងបង្ហាញពីសមត្ថភាព ឬឆន្ទៈក្នុងការចូលរួមជាមួយស្ថាប័ន។',
      placeholder: 'សិស្សទើបបញ្ចប់ការសិក្សាថ្នាក់ទី១២ (បាក់ឌុប) ផ្នែកវិទ្យាសាស្ត្រ ដែលមានភាពស្វាហាប់ និងរហ័សរហួនក្នុងការរៀនសូត្រ។ មានបំណងប្រើប្រាស់ជំនាញទំនាក់ទំនង ការប្រើប្រាស់កុំព្យូទ័រ និងការធ្វើការងារជាក្រុមក្នុងការបំពេញការងារ...',
      aiSuggestBtn: '✨ គំរូគោលបំណងសម្រាប់បាក់ឌុប',
      quickStarters: 'គំរូឆាប់រហ័ស៖',
    },
    education: {
      title: 'កម្រិតវប្បធម៌ & លទ្ធផលបាក់ឌុប (BacII)',
      desc: 'បញ្ជាក់អំពីសញ្ញាបត្របាក់ឌុប (និទ្ទេស & ផ្នែក) ការបន្តថ្នាក់បរិញ្ញាបត្រ ឬវគ្គបណ្តុះបណ្តាលខ្លីៗ។',
      addBtn: '+ បន្ថែមប្រវត្តិសិក្សា',
      institution: 'ឈ្មោះវិទ្យាល័យ / សាកលវិទ្យាល័យ',
      degree: 'កម្រិតសញ្ញាបត្រ / វគ្គសិក្សា',
      fieldOfStudy: 'ឯកទេស / ផ្នែកសិក្សា',
      isBacII: 'នេះជាសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប)',
      bacGrade: 'និទ្ទេសបាក់ឌុប',
      bacStream: 'ផ្នែកសិក្សា',
      startDate: 'ឆ្នាំចាប់ផ្តើម',
      endDate: 'ឆ្នាំបញ្ចប់',
      current: 'កំពុងសិក្សានៅទីនេះ',
      scoreOrGpa: 'ពិន្ទុសរុប / មធ្យមភាគ',
      achievements: 'មុខវិជ្ជាឆ្នើម / សមិទ្ធផល',
      addAchievement: '+ បន្ថែមចំណុចលេចធ្លោ',
      bacIiBadge: 'សញ្ញាបត្របាក់ឌុប',
      streamScience: 'វិទ្យាសាស្ត្រ',
      streamSocial: 'វិទ្យាសាស្ត្រសង្គម',
      streamGeneral: 'ចំណេះទូទៅ',
    },
    experience: {
      title: 'បទពិសោធន៍ សកម្មភាព & ការងារស្ម័គ្រចិត្ត',
      desc: 'មិនទាន់មានការងារផ្លូវការ? អ្នកអាចដាក់សកម្មភាពក្លឹបសាលា ការងារស្ម័គ្រចិត្ត ការបង្រៀន ឬការងារក្រៅម៉ោង!',
      addBtn: '+ បន្ថែមបទពិសោធន៍ / សកម្មភាព',
      role: 'តួនាទី / មុខតំណែង',
      org: 'ស្ថាប័ន / សាលា / អាជីវកម្ម',
      type: 'ប្រភេទសកម្មភាព',
      typeJob: 'ការងារពេញម៉ោង / ក្រៅម៉ោង',
      typeVolunteer: 'ការងារស្ម័គ្រចិត្ត / សង្គម',
      typeClub: 'ក្លឹបសិក្សា / ភាពជាអ្នកដឹកនាំ',
      typeInternship: 'កម្មសិក្សាការងារ (Internship)',
      typeProject: 'គម្រោងសិក្សា / ស្រាវជ្រាវ',
      startDate: 'កាលបរិច្ឆេទចាប់ផ្តើម',
      endDate: 'កាលបរិច្ឆេទបញ្ចប់',
      current: 'កំពុងបន្តបច្ចុប្បន្ន',
      bullets: 'ការទទួលខុសត្រូវ & សមិទ្ធផលសំខាន់ៗ',
      addBullet: '+ បន្ថែមចំណុចពិពណ៌នា',
      bulletSuggestion: '✨ គំរូឃ្លាពិពណ៌នាសម្រាប់សិស្ស',
      emptyNote: '💡 គន្លឹះសម្រាប់សិស្សបាក់ឌុប៖ ការងារស្ម័គ្រចិត្ត ការដឹកនាំក្រុមក្នុងថ្នាក់ ឬការជួយលក់ដូរនៅផ្ទះ សុទ្ធតែជាបទពិសោធន៍ដ៏ល្អ!',
    },
    skills: {
      title: 'ជំនាញ & សមត្ថភាព',
      desc: 'បង្ហាញជំនាញឌីជីថល (Microsoft Word, Excel, Canva, Social Media) និងជំនាញទំនាក់ទំនង។',
      addBtn: '+ បន្ថែមជំនាញថ្មី',
      skillName: 'ឈ្មោះជំនាញ',
      category: 'ប្រភេទជំនាញ',
      catHard: 'ជំនាញបច្ចេកទេស / ជំនាញផ្ទាល់',
      catSoft: 'ជំនាញទន់ (ទំនាក់ទំនង & ក្រុម)',
      catDigital: 'ជំនាញឌីជីថល & កុំព្យូទ័រ',
      catOther: 'ជំនាញផ្សេងៗ',
      quickAdd: 'ចុចបន្ថែមជំនាញរហ័ស៖',
    },
    languages: {
      title: 'ភាសាបរទេស & ភាសាជាតិ',
      desc: 'និយោជកនៅកម្ពុជាផ្តល់តម្លៃខ្ពស់ដល់បេក្ខជនដែលមានជំនាញភាសា (ខ្មែរ អង់គ្លេស ចិន បារាំង...)',
      addBtn: '+ បន្ថែមភាសា',
      langName: 'ភាសា',
      proficiency: 'កម្រិតសមត្ថភាព',
      profNative: 'ភាសាកំណើត (Mother Tongue)',
      profFluent: 'ស្ទាត់ជំនាញ (Fluent)',
      profIntermediate: 'មធ្យម (Intermediate)',
      profBasic: 'កម្រិតដំបូង (Basic)',
      quickAddKhmer: '+ ភាសាខ្មែរ (ភាសាកំណើត)',
      quickAddEnglish: '+ ភាសាអង់គ្លេស (កម្រិតមធ្យម)',
    },
    honors: {
      title: 'ពានរង្វាន់ លិខិតសរសើរ & វិញ្ញាបនបត្រ',
      desc: 'បង្ហាញការប្រកួតប្រជែងនៅវិទ្យាល័យ ពានសិស្សពូកែ ការប្រកួតតស៊ូមតិ ឬវគ្គបណ្តុះបណ្តាលនានា។',
      addBtn: '+ បន្ថែមពានរង្វាន់',
      honorTitle: 'ឈ្មោះពានរង្វាន់ / លិខិតសរសើរ',
      issuer: 'ស្ថាប័ន ឬ សាលាដែលផ្តល់ជូន',
      year: 'ឆ្នាំទទួល',
      description: 'ការពិពណ៌នាសង្ខេប',
    },
    references: {
      title: 'បុគ្គលយោង (References)',
      desc: 'លោកគ្រូ អ្នកគ្រូ ឬអ្នកគ្រប់គ្រងក្លឹប/ការងារស្ម័គ្រចិត្តដែលអាចធានាអត្តចរិត និងសមត្ថភាពរបស់អ្នក។',
      addBtn: '+ បន្ថែមបុគ្គលយោង',
      name: 'ឈ្មោះពេញ',
      role: 'តួនាទី / មុខតំណែង',
      org: 'សាលា / ស្ថាប័ន / ក្រុមហ៊ុន',
      phone: 'លេខទូរស័ព្ទ',
      email: 'អ៊ីមែល',
      relationship: 'ទំនាក់ទំនង (ឧ. លោកគ្រូបង្រៀនគណិតថ្នាក់ទី១២ / ប្រធានក្លឹប)',
    },
    design: {
      title: 'រចនាបថ ពណ៌ & ម៉ូដទំព័រ',
      desc: 'ជ្រើសរើសម៉ូដ CV ទំនើបៗ កែសម្រួលពណ៌ អក្សរ និងទំហំទំព័រ A4។',
      template: 'ជ្រើសរើសម៉ូដ CV',
      colorTheme: 'ពណ៌ចម្បង',
      font: 'ពុម្ពអក្សរ (Font)',
      fontSize: 'គម្លាត & ដង់ស៊ីតេអត្ថបទ',
      sizeCompact: 'បង្រួម (ងាយស្រួលដាក់ ១ ទំព័រ)',
      sizeNormal: 'ស្តង់ដារ',
      sizeSpacious: 'ទូលាយស្រឡះ',
      fitOnePage: 'កែតម្រូវស្វ័យប្រវត្តិកុំឱ្យលើស ១ ទំព័រ A4',
      showIcons: 'បង្ហាញរូបតំណាងមុខវិជ្ជា/ផ្នែក',
      unlockToUse: '🔒 ដោះសោជាមួយ PRO ដើម្បីប្រើម៉ូដនេះ',
    },
    templates: {
      phnomPenh: 'រចនាបថភ្នំពេញសម័យថ្មី (Phnom Penh Modern - 2 ជួរ)',
      angkor: 'រចនាបថអង្គរបុរាណ (Angkor Classic Gold - VIP)',
      emerald: 'អេមឺរ៉ាល់ ស្រទន់ (Emerald Minimalist - ATS Friendly)',
      creative: 'បែបច្នៃប្រឌិតយុវវ័យ (Creative Gradient Pro)',
      tech: 'បច្ចេកវិទ្យា & បង្រួម (Tech & Compact Pro)',
    },
    tipsModal: {
      title: 'សៀវភៅណែនាំរកការងារសម្រាប់សិស្សបាក់ឌុប',
      subtitle: 'គន្លឹះសំខាន់ៗក្នុងការដាក់ពាក្យ និងសម្ភាសន៍ការងារដំបូងនៅកម្ពុជា',
      close: 'យល់ហើយ ចាប់ផ្តើមរៀប CV!',
    },
    aiModal: {
      title: 'ជំនួយការសរសេរសម្រាប់សិស្សបាក់ឌុប',
      subtitle: 'ជ្រើសរើសឃ្លាពិពណ៌នាដែលមានឥទ្ធិពល និងត្រូវតាមស្តង់ដារនិយោជក',
      selectRole: 'ជ្រើសរើសជំនាញ ឬតួនាទីគោលដៅ៖',
      insertText: 'បញ្ចូលទៅក្នុង CV',
    },
    sampleProfiles: {
      title: 'ផ្ទុកទិន្នន័យគំរូ CV រួចជាស្រេច',
      profile1: '☕ សិស្សទើបចប់បាក់ឌុប (ផ្នែកសេវាកម្ម / បេឡា / Barista)',
      profile2: '💻 សិស្សទើបចប់បាក់ឌុប (ផ្នែករដ្ឋបាល / ជំនួយការ IT / បញ្ចូលទិន្នន័យ)',
      profile3: '🎓 សិស្សឆ្នើមនិទ្ទេស A (ដាក់អាហារូបករណ៍សាកលវិទ្យាល័យ)',
    },
  },
};
