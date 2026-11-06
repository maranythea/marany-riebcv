import type { CvData, CvSettings, TemplateId } from './cv';
import type { CoverLetterTemplateId } from './coverLetter';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPro: boolean;
  unlockedTemplates: TemplateId[];
  unlockedCoverLetterTemplates?: CoverLetterTemplateId[];
  plan: 'free' | 'pro_lifetime' | 'pro_single';
  createdAt: string;
}

export interface SavedCv {
  id: string;
  userId: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  data: CvData;
  settings: CvSettings;
}

export interface TemplateMetadata {
  id: TemplateId;
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

export const TEMPLATES_CONFIG: TemplateMetadata[] = [
  {
    id: 'phnom-penh-modern',
    nameEn: 'Phnom Penh Modern',
    nameKm: 'ម៉ូដភ្នំពេញសម័យថ្មី',
    descEn: 'Popular 2-column sidebar layout, structured for high school graduates',
    descKm: 'រចនាបថ ២ ជួរពេញនិយម មានរបៀបរៀបរយ និងច្បាស់លាស់',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#1e40af',
  },
  {
    id: 'emerald-minimal',
    nameEn: 'Emerald Minimalist',
    nameKm: 'អេមឺរ៉ាល់ ស្រទន់ (ATS)',
    descEn: 'Ultra clean, minimal borders, high ATS readability for corporate & admin roles',
    descKm: 'រចនាបថស្រទន់ ស្អាតស្អំ ងាយស្រួលអាន (ATS-Friendly)',
    isPro: false,
    priceUsd: 0,
    priceKhr: 0,
    badgeTag: 'FREE',
    previewColor: '#047857',
  },
  {
    id: 'angkor-classic',
    nameEn: 'Angkor Classic Gold',
    nameKm: 'រចនាបថអង្គរបុរាណ (VIP)',
    descEn: 'High-end elegant single column with serif typography for university scholarships',
    descKm: 'រចនាបថបុរាណ ឆើតឆាយ ស័ក្តិសមសម្រាប់ដាក់អាហារូបករណ៍',
    isPro: true,
    priceUsd: 1.99,
    priceKhr: 8000,
    badgeTag: 'PRO 👑',
    previewColor: '#7c2d12',
  },
  {
    id: 'creative-gradient',
    nameEn: 'Creative Gradient Pro',
    nameKm: 'បែបច្នៃប្រឌិតយុវវ័យ (Pro)',
    descEn: 'Vibrant modern gradient styling for creative, media, marketing, and F&B jobs',
    descKm: 'រចនាបថបែបយុវវ័យ ពណ៌ស្រស់ ស័ក្តិសមសម្រាប់ផ្នែកច្នៃប្រឌិត/សេវាកម្ម',
    isPro: true,
    priceUsd: 1.99,
    priceKhr: 8000,
    badgeTag: 'PRO 👑',
    previewColor: '#6366f1',
  },
  {
    id: 'tech-compact',
    nameEn: 'Tech & Compact Pro',
    nameKm: 'បច្ចេកវិទ្យា & បង្រួម (Pro)',
    descEn: 'High density structured technical layout for junior IT & clerk applicants',
    descKm: 'រចនាបថបច្ចេកវិទ្យា បង្រួមដង់ស៊ីតេទិន្នន័យបានល្អ',
    isPro: true,
    priceUsd: 1.99,
    priceKhr: 8000,
    badgeTag: 'PRO 👑',
    previewColor: '#0284c7',
  },
];
