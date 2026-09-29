import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, SavedCv } from '../types/auth';
import type { TemplateId, CvData, CvSettings } from '../types/cv';
import { sampleProfiles } from '../data/sampleProfiles';
import { triggerConfetti } from '../utils/pdfExport';

interface AuthContextType {
  currentUser: User | null;
  savedResumes: SavedCv[];
  activeResumeId: string | null;
  login: (email: string, name?: string, isPro?: boolean) => void;
  loginDemo: (role: 'student' | 'pro') => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  isTemplateUnlocked: (templateId: TemplateId) => boolean;
  unlockSingleTemplate: (templateId: TemplateId) => void;
  upgradeToLifetimePro: () => void;
  saveResume: (data: CvData, settings: CvSettings, title?: string, idToUpdate?: string) => string;
  loadResume: (id: string) => SavedCv | undefined;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => void;
  setActiveResumeId: (id: string | null) => void;
}

const STORAGE_USER_KEY = 'riebcv_auth_user_v1';
const STORAGE_RESUMES_KEY = 'riebcv_saved_resumes_v1';

const defaultGuestUser: User = {
  id: 'guest-student',
  name: 'Sok Dara (Student)',
  email: 'student@example.com',
  isPro: false,
  unlockedTemplates: ['phnom-penh-modern', 'emerald-minimal'],
  plan: 'free',
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    // Default logged-in as guest student for great first-time onboarding
    return defaultGuestUser;
  });

  const [savedResumes, setSavedResumes] = useState<SavedCv[]>(() => {
    const saved = localStorage.getItem(STORAGE_RESUMES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved resumes:', e);
      }
    }
    // Default starter resume
    return [
      {
        id: 'cv-1',
        userId: 'guest-student',
        title: 'Customer Service & Cafe Resume',
        updatedAt: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString(),
        data: sampleProfiles.profile1.data,
        settings: {
          templateId: 'phnom-penh-modern',
          primaryColor: '#1e40af',
          accentColor: '#3b82f6',
          fontFamily: 'Outfit',
          fontSize: 'normal',
          language: 'km',
          fitToOnePage: true,
          showSectionIcons: true,
        },
      },
    ];
  });

  const [activeResumeId, setActiveResumeId] = useState<string | null>('cv-1');

  // Sync user to storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [currentUser]);

  // Sync resumes to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_RESUMES_KEY, JSON.stringify(savedResumes));
  }, [savedResumes]);

  const login = (email: string, name: string = 'Student User', isPro: boolean = false) => {
    const user: User = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      isPro,
      unlockedTemplates: isPro
        ? ['phnom-penh-modern', 'emerald-minimal', 'angkor-classic', 'creative-gradient', 'tech-compact']
        : ['phnom-penh-modern', 'emerald-minimal'],
      plan: isPro ? 'pro_lifetime' : 'free',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(user);
    triggerConfetti();
  };

  const loginDemo = (role: 'student' | 'pro') => {
    if (role === 'pro') {
      const proUser: User = {
        id: 'pro-member-1',
        name: 'Vannak Panha (PRO Member)',
        email: 'panha.pro@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        isPro: true,
        unlockedTemplates: [
          'phnom-penh-modern',
          'emerald-minimal',
          'angkor-classic',
          'creative-gradient',
          'tech-compact',
        ],
        plan: 'pro_lifetime',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(proUser);
    } else {
      setCurrentUser(defaultGuestUser);
    }
    triggerConfetti();
  };

  const register = (name: string, email: string) => {
    login(email, name, false);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isTemplateUnlocked = (templateId: TemplateId): boolean => {
    if (!currentUser) return ['phnom-penh-modern', 'emerald-minimal'].includes(templateId);
    if (currentUser.isPro || currentUser.plan === 'pro_lifetime') return true;
    return currentUser.unlockedTemplates.includes(templateId);
  };

  const unlockSingleTemplate = (templateId: TemplateId) => {
    if (!currentUser) {
      login('guest@riebcv.com', 'New Member', false);
    }
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const currentList = prev.unlockedTemplates || [];
      if (currentList.includes(templateId)) return prev;
      return {
        ...prev,
        unlockedTemplates: [...currentList, templateId],
      };
    });
    triggerConfetti();
  };

  const upgradeToLifetimePro = () => {
    if (!currentUser) {
      login('pro.user@riebcv.com', 'Pro Member', true);
    } else {
      setCurrentUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isPro: true,
          plan: 'pro_lifetime',
          unlockedTemplates: [
            'phnom-penh-modern',
            'emerald-minimal',
            'angkor-classic',
            'creative-gradient',
            'tech-compact',
          ],
        };
      });
    }
    triggerConfetti();
  };

  const saveResume = (
    data: CvData,
    settings: CvSettings,
    title?: string,
    idToUpdate?: string
  ): string => {
    const resumeTitle = title || data.personalInfo.jobTitle || 'My BacII CV';
    const now = new Date().toLocaleDateString();

    if (idToUpdate) {
      setSavedResumes((prev) =>
        prev.map((r) =>
          r.id === idToUpdate
            ? { ...r, title: resumeTitle, updatedAt: now, data, settings }
            : r
        )
      );
      return idToUpdate;
    } else {
      const newId = `cv-${Date.now()}`;
      const newCv: SavedCv = {
        id: newId,
        userId: currentUser?.id || 'guest',
        title: resumeTitle,
        updatedAt: now,
        createdAt: new Date().toISOString(),
        data,
        settings,
      };
      setSavedResumes((prev) => [newCv, ...prev]);
      setActiveResumeId(newId);
      return newId;
    }
  };

  const loadResume = (id: string): SavedCv | undefined => {
    return savedResumes.find((r) => r.id === id);
  };

  const deleteResume = (id: string) => {
    setSavedResumes((prev) => prev.filter((r) => r.id !== id));
    if (activeResumeId === id) {
      const remaining = savedResumes.filter((r) => r.id !== id);
      setActiveResumeId(remaining[0]?.id || null);
    }
  };

  const duplicateResume = (id: string) => {
    const original = savedResumes.find((r) => r.id === id);
    if (original) {
      const copy: SavedCv = {
        ...original,
        id: `cv-${Date.now()}`,
        title: `${original.title} (Copy)`,
        updatedAt: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString(),
      };
      setSavedResumes((prev) => [copy, ...prev]);
      setActiveResumeId(copy.id);
      triggerConfetti();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        savedResumes,
        activeResumeId,
        login,
        loginDemo,
        register,
        logout,
        isTemplateUnlocked,
        unlockSingleTemplate,
        upgradeToLifetimePro,
        saveResume,
        loadResume,
        deleteResume,
        duplicateResume,
        setActiveResumeId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
