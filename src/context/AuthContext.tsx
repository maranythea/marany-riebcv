import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, SavedCv } from '../types/auth';
import type { TemplateId, CvData, CvSettings } from '../types/cv';
import type { CoverLetterTemplateId } from '../types/coverLetter';
import { sampleProfiles } from '../data/sampleProfiles';
import { triggerConfetti } from '../utils/pdfExport';

export interface AuthResponse {
  success: boolean;
  error?: 'invalid_password' | 'user_not_found' | 'email_exists' | 'missing_fields';
  message?: string;
  user?: User;
}

interface AuthContextType {
  currentUser: User | null;
  savedResumes: SavedCv[];
  activeResumeId: string | null;
  localAccounts: User[];
  login: (email: string, password?: string) => AuthResponse;
  register: (name: string, email: string, password?: string) => AuthResponse;
  loginDemo: (role: 'student' | 'pro') => void;
  switchAccount: (userId: string) => void;
  deleteAccount: (userId: string) => void;
  logout: () => void;
  isTemplateUnlocked: (templateId: TemplateId) => boolean;
  unlockSingleTemplate: (templateId: TemplateId) => void;
  isCoverLetterTemplateUnlocked: (templateId: CoverLetterTemplateId) => boolean;
  unlockSingleCoverLetterTemplate: (templateId: CoverLetterTemplateId) => void;
  upgradeToLifetimePro: () => void;
  saveResume: (data: CvData, settings: CvSettings, title?: string, idToUpdate?: string) => string;
  loadResume: (id: string) => SavedCv | undefined;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => void;
  setActiveResumeId: (id: string | null) => void;
  exportAllDataJson: () => string;
  importAllDataJson: (json: string) => boolean;
}

const STORAGE_ACCOUNTS_KEY = 'riebcv_device_accounts_v2';
const STORAGE_ACTIVE_USER_ID_KEY = 'riebcv_active_user_id_v2';
const LEGACY_STORAGE_USER_KEY = 'riebcv_auth_user_v1';
const LEGACY_STORAGE_RESUMES_KEY = 'riebcv_saved_resumes_v1';

const getResumesKey = (userId: string) => `riebcv_user_resumes_v2_${userId}`;

// Seed default on-device accounts for great first-time onboarding
const seedDefaultAccounts: User[] = [
  {
    id: 'guest-student',
    name: 'Sok Dara (Student)',
    email: 'student@example.com',
    password: 'password123',
    isPro: false,
    unlockedTemplates: ['phnom-penh-modern', 'emerald-minimal'],
    unlockedCoverLetterTemplates: ['cl-phnom-penh-clean', 'cl-emerald-minimal'],
    plan: 'free',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'pro-member-1',
    name: 'Vannak Panha (PRO Member)',
    email: 'panha.pro@example.com',
    password: 'pro123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    isPro: true,
    unlockedTemplates: [
      'phnom-penh-modern',
      'emerald-minimal',
      'angkor-classic',
      'creative-gradient',
      'tech-compact',
    ],
    unlockedCoverLetterTemplates: [
      'cl-phnom-penh-clean',
      'cl-emerald-minimal',
      'cl-angkor-gold',
      'cl-creative-gradient',
      'cl-executive-navy',
    ],
    plan: 'pro_lifetime',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  },
];

const createStarterResume = (userId: string, title = 'Customer Service & Cafe Resume'): SavedCv => ({
  id: `cv-${Date.now()}`,
  userId,
  title,
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
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Load on-device accounts
  const [localAccounts, setLocalAccounts] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse local device accounts:', e);
      }
    }
    // Check legacy single user
    const legacyUser = localStorage.getItem(LEGACY_STORAGE_USER_KEY);
    if (legacyUser) {
      try {
        const user = JSON.parse(legacyUser);
        return [user, seedDefaultAccounts[1]];
      } catch {
        // fallback
      }
    }
    return seedDefaultAccounts;
  });

  // 2. Active User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const activeId = localStorage.getItem(STORAGE_ACTIVE_USER_ID_KEY);
    if (activeId) {
      const found = localAccounts.find((a) => a.id === activeId);
      if (found) return found;
    }
    return localAccounts[0] || null;
  });

  // 3. User's Resumes
  const [savedResumes, setSavedResumes] = useState<SavedCv[]>(() => {
    const userId = currentUser?.id || 'guest-student';
    const saved = localStorage.getItem(getResumesKey(userId));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse user resumes:', e);
      }
    }
    // Check legacy saved resumes
    const legacyResumes = localStorage.getItem(LEGACY_STORAGE_RESUMES_KEY);
    if (legacyResumes) {
      try {
        const parsed = JSON.parse(legacyResumes);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return [createStarterResume(userId)];
  });

  const [activeResumeId, setActiveResumeId] = useState<string | null>(() => savedResumes[0]?.id || null);

  // Sync local accounts registry to device storage
  useEffect(() => {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(localAccounts));
  }, [localAccounts]);

  // Sync active user ID to device storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_ACTIVE_USER_ID_KEY, currentUser.id);
    } else {
      localStorage.removeItem(STORAGE_ACTIVE_USER_ID_KEY);
    }
  }, [currentUser]);

  // Sync current user's resumes to device storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(getResumesKey(currentUser.id), JSON.stringify(savedResumes));
    }
  }, [savedResumes, currentUser]);

  // Helper to load resumes for a specific user
  const loadResumesForUser = (userId: string): SavedCv[] => {
    const saved = localStorage.getItem(getResumesKey(userId));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse resumes for user', userId, e);
      }
    }
    return [createStarterResume(userId)];
  };

  // Login with on-device account verification
  const login = (email: string, password?: string): AuthResponse => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password?.trim() || '';

    const found = localAccounts.find((acc) => acc.email.toLowerCase() === cleanEmail);
    if (!found) {
      return {
        success: false,
        error: 'user_not_found',
        message: 'No account found with this email on this device.',
      };
    }

    // Verify password if account has a password
    if (found.password && cleanPassword && found.password !== cleanPassword) {
      return {
        success: false,
        error: 'invalid_password',
        message: 'Incorrect password for this on-device account.',
      };
    }

    const updatedUser: User = {
      ...found,
      lastLoginAt: new Date().toISOString(),
    };

    // Update in local accounts
    setLocalAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedUser.id ? updatedUser : acc))
    );

    setCurrentUser(updatedUser);
    const resumes = loadResumesForUser(updatedUser.id);
    setSavedResumes(resumes);
    setActiveResumeId(resumes[0]?.id || null);

    triggerConfetti();
    return { success: true, user: updatedUser };
  };

  // Register a new on-device account
  const register = (name: string, email: string, password?: string): AuthResponse => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPassword = password?.trim() || '';

    if (!cleanEmail || !cleanName) {
      return { success: false, error: 'missing_fields', message: 'Name and email are required.' };
    }

    const exists = localAccounts.some((acc) => acc.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: false,
        error: 'email_exists',
        message: 'This email is already registered on this device. Please sign in instead.',
      };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword || undefined,
      isPro: false,
      unlockedTemplates: ['phnom-penh-modern', 'emerald-minimal'],
      unlockedCoverLetterTemplates: ['cl-phnom-penh-clean', 'cl-emerald-minimal'],
      plan: 'free',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const initialResumes = [createStarterResume(newUser.id, `${cleanName}'s BacII Resume`)];
    localStorage.setItem(getResumesKey(newUser.id), JSON.stringify(initialResumes));

    setLocalAccounts((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setSavedResumes(initialResumes);
    setActiveResumeId(initialResumes[0].id);

    triggerConfetti();
    return { success: true, user: newUser };
  };

  // Demo accounts
  const loginDemo = (role: 'student' | 'pro') => {
    if (role === 'pro') {
      const proUser = localAccounts.find((a) => a.id === 'pro-member-1') || seedDefaultAccounts[1];
      setCurrentUser(proUser);
      const resumes = loadResumesForUser(proUser.id);
      setSavedResumes(resumes);
      setActiveResumeId(resumes[0]?.id || null);
    } else {
      const studentUser = localAccounts.find((a) => a.id === 'guest-student') || seedDefaultAccounts[0];
      setCurrentUser(studentUser);
      const resumes = loadResumesForUser(studentUser.id);
      setSavedResumes(resumes);
      setActiveResumeId(resumes[0]?.id || null);
    }
    triggerConfetti();
  };

  // Switch between existing on-device accounts
  const switchAccount = (userId: string) => {
    const target = localAccounts.find((acc) => acc.id === userId);
    if (!target) return;

    setCurrentUser(target);
    const resumes = loadResumesForUser(target.id);
    setSavedResumes(resumes);
    setActiveResumeId(resumes[0]?.id || null);
    triggerConfetti();
  };

  // Delete an on-device account and its local data
  const deleteAccount = (userId: string) => {
    localStorage.removeItem(getResumesKey(userId));
    setLocalAccounts((prev) => {
      const filtered = prev.filter((acc) => acc.id !== userId);
      return filtered.length > 0 ? filtered : seedDefaultAccounts;
    });

    if (currentUser?.id === userId) {
      const nextUser = localAccounts.find((acc) => acc.id !== userId) || seedDefaultAccounts[0];
      setCurrentUser(nextUser);
      const resumes = loadResumesForUser(nextUser.id);
      setSavedResumes(resumes);
      setActiveResumeId(resumes[0]?.id || null);
    }
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
    if (!currentUser) return;
    const currentList = currentUser.unlockedTemplates || [];
    if (currentList.includes(templateId)) return;

    const updatedUser: User = {
      ...currentUser,
      unlockedTemplates: [...currentList, templateId],
    };

    setCurrentUser(updatedUser);
    setLocalAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedUser.id ? updatedUser : acc))
    );
    triggerConfetti();
  };

  const isCoverLetterTemplateUnlocked = (_templateId: CoverLetterTemplateId): boolean => {
    return true; // All Cover Letter templates are free!
  };

  const unlockSingleCoverLetterTemplate = (templateId: CoverLetterTemplateId) => {
    if (!currentUser) return;
    const currentList = currentUser.unlockedCoverLetterTemplates || [];
    if (currentList.includes(templateId)) return;

    const updatedUser: User = {
      ...currentUser,
      unlockedCoverLetterTemplates: [...currentList, templateId],
    };

    setCurrentUser(updatedUser);
    setLocalAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedUser.id ? updatedUser : acc))
    );
    triggerConfetti();
  };

  const upgradeToLifetimePro = () => {
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      isPro: true,
      plan: 'pro_lifetime',
      unlockedTemplates: [
        'phnom-penh-modern',
        'emerald-minimal',
        'angkor-classic',
        'creative-gradient',
        'tech-compact',
      ],
      unlockedCoverLetterTemplates: [
        'cl-phnom-penh-clean',
        'cl-emerald-minimal',
        'cl-angkor-gold',
        'cl-creative-gradient',
        'cl-executive-navy',
      ],
    };

    setCurrentUser(updatedUser);
    setLocalAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedUser.id ? updatedUser : acc))
    );
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

  // Full backup of device accounts and resumes
  const exportAllDataJson = (): string => {
    const exportBundle = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      accounts: localAccounts,
      activeUserId: currentUser?.id,
      resumesByUserId: localAccounts.reduce((acc, user) => {
        const userResumes = localStorage.getItem(getResumesKey(user.id));
        if (userResumes) {
          try {
            acc[user.id] = JSON.parse(userResumes);
          } catch {
            // ignore
          }
        }
        return acc;
      }, {} as Record<string, SavedCv[]>),
    };
    return JSON.stringify(exportBundle, null, 2);
  };

  // Import backup into this device
  const importAllDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.accounts)) {
        setLocalAccounts(parsed.accounts);
        localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(parsed.accounts));

        if (parsed.resumesByUserId && typeof parsed.resumesByUserId === 'object') {
          Object.entries(parsed.resumesByUserId).forEach(([userId, resumes]) => {
            localStorage.setItem(getResumesKey(userId), JSON.stringify(resumes));
          });
        }

        const restoredActiveUser = parsed.accounts.find((a: User) => a.id === parsed.activeUserId) || parsed.accounts[0];
        if (restoredActiveUser) {
          setCurrentUser(restoredActiveUser);
          const resumes = loadResumesForUser(restoredActiveUser.id);
          setSavedResumes(resumes);
          setActiveResumeId(resumes[0]?.id || null);
        }
        triggerConfetti();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import backup JSON:', e);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        savedResumes,
        activeResumeId,
        localAccounts,
        login,
        register,
        loginDemo,
        switchAccount,
        deleteAccount,
        logout,
        isTemplateUnlocked,
        unlockSingleTemplate,
        isCoverLetterTemplateUnlocked,
        unlockSingleCoverLetterTemplate,
        upgradeToLifetimePro,
        saveResume,
        loadResume,
        deleteResume,
        duplicateResume,
        setActiveResumeId,
        exportAllDataJson,
        importAllDataJson,
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
