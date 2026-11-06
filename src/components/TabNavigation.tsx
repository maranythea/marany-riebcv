import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  ChevronLeft,
  ChevronRight,
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
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key in ActiveTab]?: HTMLButtonElement | null }>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs: { id: ActiveTab; label: string; icon: (active: boolean) => React.ReactNode; isSpecial?: boolean }[] = [
    { id: 'personal', label: t.personal, icon: (active) => <User size={16} strokeWidth={active ? 2.2 : 1.8} /> },
    { id: 'objective', label: t.objective, icon: (active) => <FileText size={16} strokeWidth={active ? 2.2 : 1.8} /> },
    { id: 'education', label: t.education, icon: (active) => <BookOpen size={16} strokeWidth={active ? 2.2 : 1.8} />, isSpecial: true },
    { id: 'experience', label: t.experience, icon: (active) => <Briefcase size={16} strokeWidth={active ? 2.2 : 1.8} /> },
    { id: 'skills', label: t.skills, icon: (active) => <Star size={16} strokeWidth={active ? 2.2 : 1.8} /> },
    { id: 'languages', label: t.languages, icon: (active) => <Globe size={16} strokeWidth={active ? 2.2 : 1.8} /> },
    { id: 'honors', label: t.honors, icon: (active) => <Award size={16} strokeWidth={active ? 2.2 : 1.8} /> },
    { id: 'design', label: t.design, icon: (active) => <Palette size={16} strokeWidth={active ? 2.2 : 1.8} /> },
  ];

  const checkScrollability = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = trackRef.current;
    if (!el) return;

    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);
    el.addEventListener('scroll', checkScrollability);

    return () => {
      window.removeEventListener('resize', handleResize);
      el.removeEventListener('scroll', checkScrollability);
    };
  }, [checkScrollability]);

  // Smooth scroll active tab into view whenever activeTab changes
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    const timer = setTimeout(checkScrollability, 350);
    return () => clearTimeout(timer);
  }, [activeTab, checkScrollability]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -180 : 180;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <nav className="tab-nav-wrapper" aria-label="Resume Sections Navigation">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="tab-nav-scroll-btn left"
          aria-label="Scroll tabs left"
        >
          <span className="tab-nav-scroll-icon">
            <ChevronLeft size={14} />
          </span>
        </button>
      )}

      <div ref={trackRef} className="tab-nav-track" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab.id)}
              className={`tab-nav-btn ${isActive ? 'active' : ''}`}
            >
              {tab.icon(isActive)}
              <span>{tab.label}</span>
              {tab.isSpecial && <span className="tab-nav-badge">BacII</span>}
            </button>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="tab-nav-scroll-btn right"
          aria-label="Scroll tabs right"
        >
          <span className="tab-nav-scroll-icon">
            <ChevronRight size={14} />
          </span>
        </button>
      )}
    </nav>
  );
};
