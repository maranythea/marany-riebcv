import { useState, useEffect } from 'react';
import type { CvData, CvSettings, LanguageCode, TemplateId } from './types/cv';
import { sampleProfiles } from './data/sampleProfiles';
import { translations } from './data/translations';
import { exportCvToPdf } from './utils/pdfExport';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { TabNavigation } from './components/TabNavigation';
import type { ActiveTab } from './components/TabNavigation';
import { CvStrengthMeter } from './components/CvStrengthMeter';
import { PersonalInfoEditor } from './components/EditorForm/PersonalInfoEditor';
import { ObjectiveEditor } from './components/EditorForm/ObjectiveEditor';
import { EducationEditor } from './components/EditorForm/EducationEditor';
import { ExperienceEditor } from './components/EditorForm/ExperienceEditor';
import { SkillsEditor } from './components/EditorForm/SkillsEditor';
import { LanguagesEditor } from './components/EditorForm/LanguagesEditor';
import { HonorsReferencesEditor } from './components/EditorForm/HonorsReferencesEditor';
import { DesignCustomizer } from './components/EditorForm/DesignCustomizer';
import { CvPreview } from './components/Preview/CvPreview';
import { AiAssistantModal } from './components/Modals/AiAssistantModal';
import { TipsModal } from './components/Modals/TipsModal';
import { ImportExportModal } from './components/Modals/ImportExportModal';
import { AuthModal } from './components/Auth/AuthModal';
import { AccountModal } from './components/Account/AccountModal';
import { MyResumesModal } from './components/Account/MyResumesModal';
import { UpgradeModal } from './components/Pricing/UpgradeModal';
import { Edit3, Eye, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_DATA_KEY = 'marany_riebcv_data_v1';
const STORAGE_SETTINGS_KEY = 'marany_riebcv_settings_v1';
const STORAGE_THEME_KEY = 'marany_riebcv_theme_v1';

const defaultSettings: CvSettings = {
  templateId: 'phnom-penh-modern',
  primaryColor: '#1e40af',
  accentColor: '#3b82f6',
  fontFamily: 'Outfit',
  fontSize: 'normal',
  language: 'km',
  fitToOnePage: true,
  showSectionIcons: true,
};

function CvBuilderApp() {
  const { loadResume, saveResume, activeResumeId, setActiveResumeId } = useAuth();

  // Initialize from LocalStorage or default sample
  const [cvData, setCvData] = useState<CvData>(() => {
    const saved = localStorage.getItem(STORAGE_DATA_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved CV data:', e);
      }
    }
    return sampleProfiles.profile1.data;
  });

  const [settings, setSettings] = useState<CvSettings>(() => {
    const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved settings:', e);
      }
    }
    return defaultSettings;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('personal');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isResumesModalOpen, setIsResumesModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeTargetTemplate, setUpgradeTargetTemplate] = useState<TemplateId | undefined>();

  // Sync to theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }, [theme]);

  // Sync state to LocalStorage & auto-save to active resume
  useEffect(() => {
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(cvData));
    if (activeResumeId) {
      saveResume(cvData, settings, undefined, activeResumeId);
    }
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    if (activeResumeId) {
      saveResume(cvData, settings, undefined, activeResumeId);
    }
  }, [settings]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleUpdateLanguage = (lang: LanguageCode) => {
    setSettings((prev) => ({ ...prev, language: lang }));
  };

  const handleLoadSample = (sampleKey: string) => {
    const sample = sampleProfiles[sampleKey];
    if (sample) {
      setCvData(sample.data);
      if (sample.settings) {
        setSettings((prev) => ({ ...prev, ...sample.settings }));
      }
    }
  };

  const handleSelectResume = (resumeId: string) => {
    const resume = loadResume(resumeId);
    if (resume) {
      setCvData(resume.data);
      setSettings(resume.settings);
      setActiveResumeId(resumeId);
    }
  };

  const handleCreateNewResume = () => {
    const blankData: CvData = {
      personalInfo: {
        fullName: '',
        khmerName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: 'Phnom Penh, Cambodia',
        telegram: '',
        photoUrl: '',
        photoShape: 'circle',
        showPhoto: true,
      },
      objective: '',
      education: [],
      experiences: [],
      skills: [],
      languages: [
        { id: 'l-1', name: 'Khmer (ភាសាខ្មែរ)', proficiency: 'Native' },
        { id: 'l-2', name: 'English', proficiency: 'Intermediate' },
      ],
      honors: [],
      references: [],
      sectionOrder: ['education', 'experiences', 'skills', 'languages', 'honors', 'references'],
    };
    setCvData(blankData);
    saveResume(blankData, settings, 'New Blank Resume');
    setActiveTab('personal');
  };

  const handleReset = () => {
    handleCreateNewResume();
  };

  const handleDownloadPdf = async () => {
    const safeName = cvData.personalInfo.fullName.trim().replace(/\s+/g, '_') || 'My_BacII_CV';
    await exportCvToPdf('cv-a4-document', `${safeName}_CV.pdf`);
  };

  const t = translations[settings.language];
  const isKm = settings.language === 'km';

  const tabList: ActiveTab[] = [
    'personal',
    'objective',
    'education',
    'experience',
    'skills',
    'languages',
    'honors',
    'design',
  ];

  const currentTabIndex = tabList.indexOf(activeTab);
  const handleNextTab = () => {
    if (currentTabIndex < tabList.length - 1) {
      setActiveTab(tabList[currentTabIndex + 1]);
    }
  };
  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabList[currentTabIndex - 1]);
    }
  };

  const handleOpenUpgradeForTemplate = (templateId?: TemplateId) => {
    setUpgradeTargetTemplate(templateId);
    setIsUpgradeModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        data={cvData}
        settings={settings}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onUpdateLanguage={handleUpdateLanguage}
        onLoadSample={handleLoadSample}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenTipsModal={() => setIsTipsModalOpen(true)}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
        onOpenResumesModal={() => setIsResumesModalOpen(true)}
        onOpenUpgradeModal={() => handleOpenUpgradeForTemplate()}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* Mobile Toggle Bar */}
      <div className="mobile-view-tabs no-print">
        <button
          type="button"
          onClick={() => setMobileView('edit')}
          className={`btn btn-sm ${mobileView === 'edit' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1 }}
        >
          <Edit3 size={15} />
          <span>{t.edit}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`btn btn-sm ${mobileView === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1 }}
        >
          <Eye size={15} />
          <span>{t.preview}</span>
        </button>
      </div>

      {/* Main Workspace Area */}
      <div className="main-content">
        {/* Left Form Panel */}
        <div
          className="form-panel"
          style={{
            display: mobileView === 'preview' && window.innerWidth <= 1024 ? 'none' : 'flex',
          }}
        >
          {/* Sub Navigation Tabs */}
          <TabNavigation
            activeTab={activeTab}
            language={settings.language}
            onSelectTab={setActiveTab}
          />

          {/* Form Content Area */}
          <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* CV Strength Score Meter */}
            <CvStrengthMeter data={cvData} settings={settings} />

            {/* Active Tab Sub-Form */}
            {activeTab === 'personal' && (
              <PersonalInfoEditor
                data={cvData.personalInfo}
                language={settings.language}
                onChange={(updates) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, ...updates },
                  }))
                }
              />
            )}

            {activeTab === 'objective' && (
              <ObjectiveEditor
                value={cvData.objective}
                language={settings.language}
                onChange={(objective) => setCvData((prev) => ({ ...prev, objective }))}
                onOpenAiModal={() => setIsAiModalOpen(true)}
              />
            )}

            {activeTab === 'education' && (
              <EducationEditor
                items={cvData.education}
                language={settings.language}
                onChange={(education) => setCvData((prev) => ({ ...prev, education }))}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceEditor
                items={cvData.experiences}
                language={settings.language}
                onChange={(experiences) => setCvData((prev) => ({ ...prev, experiences }))}
                onOpenAiModal={() => setIsAiModalOpen(true)}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsEditor
                items={cvData.skills}
                language={settings.language}
                onChange={(skills) => setCvData((prev) => ({ ...prev, skills }))}
              />
            )}

            {activeTab === 'languages' && (
              <LanguagesEditor
                items={cvData.languages}
                language={settings.language}
                onChange={(languages) => setCvData((prev) => ({ ...prev, languages }))}
              />
            )}

            {activeTab === 'honors' && (
              <HonorsReferencesEditor
                honors={cvData.honors}
                references={cvData.references}
                language={settings.language}
                onChangeHonors={(honors) => setCvData((prev) => ({ ...prev, honors }))}
                onChangeReferences={(references) => setCvData((prev) => ({ ...prev, references }))}
              />
            )}

            {activeTab === 'design' && (
              <DesignCustomizer
                settings={settings}
                onChange={(updates) => setSettings((prev) => ({ ...prev, ...updates }))}
                onOpenUpgradeModal={handleOpenUpgradeForTemplate}
              />
            )}

            {/* Step-by-Step Wizard Previous / Next Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              <button
                type="button"
                onClick={handlePrevTab}
                disabled={currentTabIndex === 0}
                className="btn btn-secondary btn-sm"
                style={{ opacity: currentTabIndex === 0 ? 0.4 : 1 }}
              >
                <ArrowLeft size={14} />
                <span>{isKm ? 'ថយក្រោយ' : 'Previous'}</span>
              </button>

              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {currentTabIndex + 1} / {tabList.length}
              </span>

              {currentTabIndex < tabList.length - 1 ? (
                <button type="button" onClick={handleNextTab} className="btn btn-primary btn-sm">
                  <span>{isKm ? 'បន្ទាប់' : 'Next Step'}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button type="button" onClick={handleDownloadPdf} className="btn btn-accent btn-sm">
                  <Sparkles size={14} />
                  <span>{isKm ? 'ទាញយក PDF' : 'Download CV'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div
          className="preview-panel"
          style={{
            display: mobileView === 'edit' && window.innerWidth <= 1024 ? 'none' : 'flex',
          }}
        >
          <CvPreview
            data={cvData}
            settings={settings}
            onOpenUpgradeModal={handleOpenUpgradeForTemplate}
            onUpdateSettings={(updates) => setSettings((prev) => ({ ...prev, ...updates }))}
          />
        </div>
      </div>

      {/* Modals */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        language={settings.language}
        onClose={() => setIsAiModalOpen(false)}
        onInsertObjective={(text) => setCvData((prev) => ({ ...prev, objective: text }))}
        onInsertBullet={(text) => {
          if (cvData.experiences.length > 0) {
            const updated = cvData.experiences.map((exp, idx) =>
              idx === 0 ? { ...exp, bullets: [...exp.bullets, text] } : exp
            );
            setCvData((prev) => ({ ...prev, experiences: updated }));
          }
        }}
      />

      <TipsModal
        isOpen={isTipsModalOpen}
        language={settings.language}
        onClose={() => setIsTipsModalOpen(false)}
      />

      <ImportExportModal
        isOpen={isSaveModalOpen}
        language={settings.language}
        data={cvData}
        settings={settings}
        onClose={() => setIsSaveModalOpen(false)}
        onImport={(newData, newSettings) => {
          setCvData(newData);
          if (newSettings) setSettings((prev) => ({ ...prev, ...newSettings }));
        }}
        onReset={handleReset}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        language={settings.language}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        language={settings.language}
        onClose={() => setIsAccountModalOpen(false)}
        onOpenUpgrade={() => handleOpenUpgradeForTemplate()}
      />

      <MyResumesModal
        isOpen={isResumesModalOpen}
        language={settings.language}
        onClose={() => setIsResumesModalOpen(false)}
        onSelectResume={handleSelectResume}
        onCreateNewResume={handleCreateNewResume}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        language={settings.language}
        selectedTemplateId={upgradeTargetTemplate}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CvBuilderApp />
    </AuthProvider>
  );
}

export default App;
