import React from 'react';
import type { LanguageCode } from '../types/cv';
import { translations } from '../data/translations';
import {
  User,
  FileText,
  BookOpen,
  Briefcase,
  Star,
  Globe,
  Award,
  Palette,
} from 'lucide-react';

export type ActiveTab =
  | 'personal'
  | 'objective'
  | 'education'
  | 'experience'
  | 'skills'
  | 'languages'
  | 'honors'
  | 'design';

interface TabNavigationProps {
  activeTab: ActiveTab;
  language: LanguageCode;
  onSelectTab: (tab: ActiveTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, language, onSelectTab }) => {
  const t = translations[language].tabs;

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; isSpecial?: boolean }[] = [
    { id: 'personal', label: t.personal, icon: <User size={16} /> },
    { id: 'objective', label: t.objective, icon: <FileText size={16} /> },
    { id: 'education', label: t.education, icon: <BookOpen size={16} />, isSpecial: true },
    { id: 'experience', label: t.experience, icon: <Briefcase size={16} /> },
    { id: 'skills', label: t.skills, icon: <Star size={16} /> },
    { id: 'languages', label: t.languages, icon: <Globe size={16} /> },
    { id: 'honors', label: t.honors, icon: <Award size={16} /> },
    { id: 'design', label: t.design, icon: <Palette size={16} /> },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        padding: '12px 18px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        whiteSpace: 'nowrap',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              fontWeight: isActive ? 700 : 500,
              border: `1px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
              backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              flexShrink: 0,
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.isSpecial && (
              <span
                style={{
                  fontSize: '0.65rem',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  fontWeight: 700,
                }}
              >
                BacII
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
