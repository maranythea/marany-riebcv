import React, { useState, useRef, useEffect } from 'react';
import type { CvData, CvSettings, LanguageCode } from '../types/cv';
import { translations } from '../data/translations';
import { useAuth } from '../context/AuthContext';
import {
  Download,
  Sparkles,
  BookOpen,
  Save,
  Moon,
  Sun,
  ChevronDown,
  Layers,
  GraduationCap,
  User,
  Crown,
  FolderOpen,
  LogIn,
} from 'lucide-react';

interface NavbarProps {
  data: CvData;
  settings: CvSettings;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onUpdateLanguage: (lang: LanguageCode) => void;
  onLoadSample: (sampleKey: string) => void;
  onOpenAiModal: () => void;
  onOpenTipsModal: () => void;
  onOpenSaveModal: () => void;
  onOpenAuthModal: () => void;
  onOpenAccountModal: () => void;
  onOpenResumesModal: () => void;
  onOpenUpgradeModal: () => void;
  onDownloadPdf: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  theme,
  onToggleTheme,
  onUpdateLanguage,
  onLoadSample,
  onOpenAiModal,
  onOpenTipsModal,
  onOpenSaveModal,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenResumesModal,
  onOpenUpgradeModal,
  onDownloadPdf,
}) => {
  const [sampleDropdownOpen, setSampleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { currentUser, savedResumes, logout } = useAuth();

  const t = translations[settings.language];
  const isKm = settings.language === 'km';
  const isPro = currentUser?.isPro || currentUser?.plan === 'pro_lifetime';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSampleDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="app-header no-print"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 50,
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Brand & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.35)',
          }}
        >
          <GraduationCap size={20} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              RiebCV <span style={{ fontFamily: 'Kantumruy Pro, sans-serif', color: 'var(--primary)', fontWeight: 700 }}>(រៀប CV)</span>
            </span>

            <span className="badge badge-bacii" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
              {t.badgeBacII}
            </span>

            {isPro && (
              <span
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
                }}
              >
                <Crown size={11} /> PRO
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {isKm ? 'រៀបចំ CV ស្អាតកម្រិតវិជ្ជាជីវៈ សម្រាប់សិស្សបាក់ឌុប & ការងារដំបូង' : 'Smart CV Builder for Cambodian BacII & Entry-Level Job Seekers'}
          </div>
        </div>
      </div>

      {/* Center Actions / Shortcuts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {/* My Resumes Drawer Button */}
        <button
          type="button"
          onClick={onOpenResumesModal}
          className="btn btn-secondary btn-sm"
          style={{ fontWeight: 600 }}
        >
          <FolderOpen size={14} color="var(--primary)" />
          <span>{t.auth.myResumes} ({savedResumes.length})</span>
        </button>

        {/* Sample Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setSampleDropdownOpen((prev) => !prev)}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: 600 }}
          >
            <Layers size={14} />
            <span>{t.loadSample}</span>
            <ChevronDown size={13} />
          </button>

          {sampleDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '6px',
                width: '320px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-xl)',
                padding: '6px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
                {t.sampleProfiles.title}
              </div>

              <button
                type="button"
                onClick={() => {
                  onLoadSample('profile1');
                  setSampleDropdownOpen(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', textAlign: 'left', border: 'none', padding: '8px 10px' }}
              >
                {t.sampleProfiles.profile1}
              </button>

              <button
                type="button"
                onClick={() => {
                  onLoadSample('profile2');
                  setSampleDropdownOpen(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', textAlign: 'left', border: 'none', padding: '8px 10px' }}
              >
                {t.sampleProfiles.profile2}
              </button>

              <button
                type="button"
                onClick={() => {
                  onLoadSample('profile3');
                  setSampleDropdownOpen(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', textAlign: 'left', border: 'none', padding: '8px 10px' }}
              >
                {t.sampleProfiles.profile3}
              </button>
            </div>
          )}
        </div>

        {/* AI Assistant Button */}
        <button
          type="button"
          onClick={onOpenAiModal}
          className="btn btn-accent btn-sm"
        >
          <Sparkles size={14} />
          <span>{isKm ? 'ជំនួយការ AI' : 'AI Assistant'}</span>
        </button>

        {/* Student Job Handbook */}
        <button
          type="button"
          onClick={onOpenTipsModal}
          className="btn btn-secondary btn-sm"
        >
          <BookOpen size={14} color="#10b981" />
          <span>{isKm ? 'សៀវភៅណែនាំ' : 'Student Tips'}</span>
        </button>

        {/* Save / Backup Button */}
        <button
          type="button"
          onClick={onOpenSaveModal}
          className="btn btn-secondary btn-sm"
        >
          <Save size={14} />
          <span>{t.saveData}</span>
        </button>

        {/* Upgrade / Unlock Button if not pro */}
        {!isPro && (
          <button
            type="button"
            onClick={onOpenUpgradeModal}
            className="btn btn-sm"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#ffffff',
              fontWeight: 700,
              boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)',
            }}
          >
            <Crown size={14} />
            <span>PRO ($4.99)</span>
          </button>
        )}
      </div>

      {/* Right Controls: User Profile, Language, Theme, Download */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* User Account / Profile Button */}
        {currentUser ? (
          <div style={{ position: 'relative' }} ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen((prev) => !prev)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: isPro ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '999px',
                  backgroundColor: isPro ? '#f59e0b' : 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                }}
              >
                {isPro ? <Crown size={12} /> : currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser.name}
              </span>
              <ChevronDown size={12} />
            </button>

            {userDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  width: '220px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '6px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {currentUser.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {currentUser.email}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onOpenAccountModal();
                    setUserDropdownOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', border: 'none', padding: '6px 10px' }}
                >
                  <User size={14} />
                  <span>{t.auth.myAccount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenResumesModal();
                    setUserDropdownOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', border: 'none', padding: '6px 10px' }}
                >
                  <FolderOpen size={14} />
                  <span>{t.auth.myResumes}</span>
                </button>

                {!isPro && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenUpgradeModal();
                      setUserDropdownOpen(false);
                    }}
                    className="btn btn-sm"
                    style={{
                      justifyContent: 'flex-start',
                      background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                      color: '#ffffff',
                      fontWeight: 700,
                      padding: '6px 10px',
                      margin: '2px 0',
                    }}
                  >
                    <Crown size={14} />
                    <span>{t.pricing.upgradeNow}</span>
                  </button>
                )}

                <div style={{ borderTop: '1px solid var(--border-color)', margin: '2px 0' }} />

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', border: 'none', color: '#ef4444', padding: '6px 10px' }}
                >
                  <span>{t.auth.signOut}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: 600 }}
          >
            <LogIn size={14} color="var(--primary)" />
            <span>{t.auth.signIn}</span>
          </button>
        )}

        {/* Language Switcher */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '999px', padding: '2px' }}>
          <button
            type="button"
            onClick={() => onUpdateLanguage('km')}
            style={{
              padding: '4px 8px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'Kantumruy Pro, sans-serif',
              border: 'none',
              cursor: 'pointer',
              background: settings.language === 'km' ? 'var(--primary)' : 'transparent',
              color: settings.language === 'km' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            🇰🇭 ខ្មែរ
          </button>
          <button
            type="button"
            onClick={() => onUpdateLanguage('en')}
            style={{
              padding: '4px 8px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              background: settings.language === 'en' ? 'var(--primary)' : 'transparent',
              color: settings.language === 'en' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            🇬🇧 EN
          </button>
        </div>

        {/* Dark/Light Mode Switcher */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="btn btn-secondary btn-sm"
          style={{ borderRadius: '999px', padding: '6px 8px' }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
        </button>

        {/* Quick Download PDF */}
        <button
          type="button"
          onClick={onDownloadPdf}
          className="btn btn-primary btn-sm"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            border: 'none',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
          }}
        >
          <Download size={14} />
          <span>{t.exportPdf}</span>
        </button>
      </div>
    </header>
  );
};
