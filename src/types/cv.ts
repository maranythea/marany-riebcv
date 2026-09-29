export type LanguageCode = 'en' | 'km';

export type TemplateId = 
  | 'phnom-penh-modern'
  | 'angkor-classic'
  | 'emerald-minimal'
  | 'creative-gradient'
  | 'tech-compact';

export type PhotoShape = 'circle' | 'rounded' | 'square' | 'none';

export type FontSizeOption = 'compact' | 'normal' | 'spacious';

export interface PersonalInfo {
  fullName: string;
  khmerName?: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  telegram?: string;
  linkedin?: string;
  portfolio?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  photoUrl?: string;
  photoShape: PhotoShape;
  showPhoto: boolean;
}

export type BacGrade = 'A' | 'B' | 'C' | 'D' | 'E' | 'Pending' | 'None';
export type BacStream = 'Science' | 'Social Science' | 'General' | 'Other';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  isBacII?: boolean;
  bacGrade?: BacGrade;
  bacStream?: BacStream;
  startDate: string;
  endDate: string;
  current: boolean;
  scoreOrGpa?: string;
  location?: string;
  achievements?: string[];
}

export type ExperienceType = 'job' | 'volunteer' | 'club' | 'internship' | 'project';

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: ExperienceType;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'hard' | 'soft' | 'digital' | 'other';
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface HonorItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  phone?: string;
  email?: string;
  relationship?: string;
}

export interface CvData {
  personalInfo: PersonalInfo;
  objective: string;
  education: EducationItem[];
  experiences: ExperienceItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  honors: HonorItem[];
  references: ReferenceItem[];
  sectionOrder: string[];
}

export interface CvSettings {
  templateId: TemplateId;
  primaryColor: string;
  accentColor: string;
  fontFamily: 'Outfit' | 'Plus Jakarta Sans' | 'Kantumruy Pro' | 'Inter' | 'Playfair Display';
  fontSize: FontSizeOption;
  language: LanguageCode;
  fitToOnePage: boolean;
  showSectionIcons: boolean;
}
