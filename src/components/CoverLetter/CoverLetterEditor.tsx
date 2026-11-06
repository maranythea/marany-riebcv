import React, { useState } from 'react';
import type { CoverLetterData, CoverLetterSettings, CoverLetterTemplateId } from '../../types/coverLetter';
import { COVER_LETTER_TEMPLATES_CONFIG } from '../../types/coverLetter';
import type { CvData, LanguageCode } from '../../types/cv';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  RefreshCw,
  User,
  Building,
  FileText,
  Palette,
  Crown,
  Lock,
  Check,
  CheckCircle,
} from 'lucide-react';
import { triggerConfetti } from '../../utils/pdfExport';

interface CoverLetterEditorProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
  cvData: CvData;
  language: LanguageCode;
  onChangeData: (updater: (prev: CoverLetterData) => CoverLetterData) => void;
  onChangeSettings: (updater: (prev: CoverLetterSettings) => CoverLetterSettings) => void;
  onOpenAiModal: () => void;
  onOpenUpgradeModal: (templateId?: CoverLetterTemplateId) => void;
}

export const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({
  data,
  settings,
  cvData,
  language,
  onChangeData,
  onChangeSettings,
  onOpenAiModal,
  onOpenUpgradeModal,
}) => {
  const [activeSection, setActiveSection] = useState<'details' | 'body' | 'theme'>('details');
  const { isCoverLetterTemplateUnlocked } = useAuth();
  const isKm = language === 'km';

  const handleAutofillFromCv = () => {
    onChangeData((prev) => ({
      ...prev,
      sender: {
        fullName: cvData.personalInfo.fullName || prev.sender.fullName,
        khmerName: cvData.personalInfo.khmerName || prev.sender.khmerName,
        jobTitle: cvData.personalInfo.jobTitle || prev.sender.jobTitle,
        email: cvData.personalInfo.email || prev.sender.email,
        phone: cvData.personalInfo.phone || prev.sender.phone,
        location: cvData.personalInfo.location || prev.sender.location,
        linkedin: cvData.personalInfo.linkedin || prev.sender.linkedin,
        portfolio: cvData.personalInfo.portfolio || prev.sender.portfolio,
      },
    }));
    triggerConfetti();
  };

  const handleSelectTemplate = (templateId: CoverLetterTemplateId) => {
    const isUnlocked = isCoverLetterTemplateUnlocked(templateId);
    if (!isUnlocked) {
      onOpenUpgradeModal(templateId);
    }
    onChangeSettings((prev) => ({ ...prev, templateId }));
  };

  const colors = [
    { name: 'Royal Blue', value: '#2563eb' },
    { name: 'Navy', value: '#0f172a' },
    { name: 'Emerald', value: '#047857' },
    { name: 'Angkor Gold', value: '#b45309' },
    { name: 'Purple Gradient', value: '#7c3aed' },
    { name: 'Ruby Crimson', value: '#b91c1c' },
  ];

  const fonts: CoverLetterSettings['fontFamily'][] = [
    'Outfit',
    'Plus Jakarta Sans',
    'Kantumruy Pro',
    'Inter',
    'Playfair Display',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Action Header Bar */}
      <div
        style={{
          padding: '12px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {/* Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setActiveSection('details')}
            className={`btn btn-sm ${activeSection === 'details' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Building size={14} />
            <span>{isKm ? 'ព័ត៌មាន & ក្រុមហ៊ុន' : 'Details & Recipient'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('body')}
            className={`btn btn-sm ${activeSection === 'body' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <FileText size={14} />
            <span>{isKm ? 'ខ្លឹមសារលិខិត' : 'Letter Body'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('theme')}
            className={`btn btn-sm ${activeSection === 'theme' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Palette size={14} />
            <span>{isKm ? 'ម៉ូដ & ស្ទីល' : 'Style & Themes'}</span>
          </button>
        </div>

        {/* AI & Autofill Tools */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleAutofillFromCv}
            className="btn btn-secondary btn-sm"
            title="Autofill sender info from your active CV"
          >
            <RefreshCw size={13} />
            <span>{isKm ? 'ទាញពី CV' : 'Sync from CV'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAiModal}
            className="btn btn-accent btn-sm"
            style={{ fontWeight: 700 }}
          >
            <Sparkles size={14} />
            <span>{isKm ? '✨ AI ជួយសរសេរ' : '✨ AI Assistant'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="form-content-area">
        {/* SECTION 1: DETAILS & RECIPIENT */}
        {activeSection === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Sender Box */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} /> {isKm ? 'ព័ត៌មានបេក្ខជន (Sender)' : 'Applicant / Sender Details'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="field-label">{isKm ? 'ឈ្មោះពេញ (អង់គ្លេស)' : 'Full Name (Latin)'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.sender.fullName}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        sender: { ...prev.sender, fullName: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'ឈ្មោះជាភាសាខ្មែរ' : 'Khmer Name (Optional)'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.sender.khmerName || ''}
                    placeholder="ឧ. សុខ តារា"
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        sender: { ...prev.sender, khmerName: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'មុខតំណែង / ជំនាញ' : 'Job Title / Specialty'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.sender.jobTitle}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        sender: { ...prev.sender, jobTitle: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'លេខទូរស័ព្ទ' : 'Phone Number'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.sender.phone}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        sender: { ...prev.sender, phone: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={data.sender.email}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        sender: { ...prev.sender, email: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'ទីលំនៅ / រាជធានី-ខេត្ត' : 'Location'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.sender.location}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        sender: { ...prev.sender, location: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Recipient Box */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={16} /> {isKm ? 'ព័ត៌មានអ្នកទទួល & ក្រុមហ៊ុន (Recipient)' : 'Hiring Manager & Company'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="field-label">{isKm ? 'ឈ្មោះអ្នកទទួល / គណៈគ្រប់គ្រង' : 'Hiring Manager Name'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.recipient.hiringManagerName}
                    placeholder="e.g. Hiring Manager, Mr. Sopheap"
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        recipient: { ...prev.recipient, hiringManagerName: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'ឈ្មោះក្រុមហ៊ុន / ស្ថាប័ន' : 'Company Name'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.recipient.companyName}
                    placeholder="e.g. Brown Coffee, ABA Bank"
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        recipient: { ...prev.recipient, companyName: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'នាយកដ្ឋាន / ផ្នែក' : 'Department (Optional)'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.recipient.department || ''}
                    placeholder="e.g. Human Resources Department"
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        recipient: { ...prev.recipient, department: e.target.value },
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'អាសយដ្ឋានក្រុមហ៊ុន' : 'Company Address'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.recipient.companyAddress || ''}
                    placeholder="e.g. Phnom Penh, Cambodia"
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        recipient: { ...prev.recipient, companyAddress: e.target.value },
                      }))
                    }
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label className="field-label">{isKm ? 'កាលបរិច្ឆេទសរសេរលិខិត' : 'Letter Date'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.date}
                    placeholder="e.g. November 7, 2024"
                    onChange={(e) =>
                      onChangeData((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: LETTER BODY CONTENT */}
        {activeSection === 'body' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} /> {isKm ? 'ក្បាលលិខិត & ប្រធានបទ' : 'Subject & Salutation'}
                </h3>
                <button
                  type="button"
                  onClick={onOpenAiModal}
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--primary)', fontSize: '0.78rem' }}
                >
                  <Sparkles size={13} />
                  <span>{isKm ? 'AI ជួយសរសេរ' : 'Generate with AI'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="field-label">{isKm ? 'កម្មវត្ថុ / ប្រធានបទលិខិត' : 'Subject Line'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.subject}
                    placeholder="Application for Customer Service Position"
                    onChange={(e) => onChangeData((prev) => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'ពាក្យគួរសមផ្ដើម (Salutation)' : 'Salutation'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.salutation}
                    placeholder="Dear Hiring Manager,"
                    onChange={(e) => onChangeData((prev) => ({ ...prev, salutation: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="field-label" style={{ margin: 0 }}>
                      1. {isKm ? 'កថាខណ្ឌផ្ដើម (Introduction & Role Interest)' : 'Opening Paragraph (Why you are writing)'}
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    className="input-field"
                    value={data.openingParagraph}
                    onChange={(e) => onChangeData((prev) => ({ ...prev, openingParagraph: e.target.value }))}
                    placeholder="Express your enthusiasm, state the role you are applying for, and your top qualification..."
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="field-label" style={{ margin: 0 }}>
                      2. {isKm ? 'កថាខណ្ឌទី១៖ សមត្ថភាពបាក់ឌុប/ការសិក្សា និងជំនាញ' : 'Body Paragraph 1 (BacII Strengths & Skills)'}
                    </label>
                  </div>
                  <textarea
                    rows={5}
                    className="input-field"
                    value={data.bodyParagraph1}
                    onChange={(e) => onChangeData((prev) => ({ ...prev, bodyParagraph1: e.target.value }))}
                    placeholder="Highlight your high school achievements, BacII results, language skills, or extracurricular projects..."
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="field-label" style={{ margin: 0 }}>
                      3. {isKm ? 'កថាខណ្ឌទី២៖ ភាពស័ក្តិសម និងការចូលរួមចំណែកដល់ក្រុមហ៊ុន' : 'Body Paragraph 2 (Company Fit & Contribution)'}
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    className="input-field"
                    value={data.bodyParagraph2}
                    onChange={(e) => onChangeData((prev) => ({ ...prev, bodyParagraph2: e.target.value }))}
                    placeholder="Mention why you admire this company, your work ethic, and how you will help their goals..."
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="field-label" style={{ margin: 0 }}>
                      4. {isKm ? 'កថាខណ្ឌបញ្ចប់ និងការស្នើសុំសម្ភាសន៍ (Closing & CTA)' : 'Closing Paragraph (Interview request)'}
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    className="input-field"
                    value={data.closingParagraph}
                    onChange={(e) => onChangeData((prev) => ({ ...prev, closingParagraph: e.target.value }))}
                    placeholder="Thank the employer, politely request an interview, and express enthusiasm..."
                  />
                </div>

                <div>
                  <label className="field-label">{isKm ? 'ពាក្យបញ្ចប់ (Sign-off)' : 'Sign-Off'}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.signOff}
                    placeholder="Sincerely, / ដោយក្តីគោរពដ៏ខ្ពង់ខ្ពស់,"
                    onChange={(e) => onChangeData((prev) => ({ ...prev, signOff: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: STYLES & THEMES */}
        {activeSection === 'theme' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Template Selector */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                {isKm ? 'ជ្រើសរើសម៉ូដលិខិតអម (Cover Letter Templates)' : 'Choose Cover Letter Template'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {isKm ? 'ម៉ូដខ្លះបើកប្រើប្រាស់ឥតគិតថ្លៃ និងម៉ូដខ្លះជាម៉ូដពិសេស PRO' : 'Select from clean free styles or premium PRO executive themes'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {COVER_LETTER_TEMPLATES_CONFIG.map((tpl) => {
                  const isSelected = settings.templateId === tpl.id;
                  const isUnlocked = isCoverLetterTemplateUnlocked(tpl.id);

                  return (
                    <div
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-app)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            backgroundColor: tpl.previewColor,
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                              {isKm ? tpl.nameKm : tpl.nameEn}
                            </span>
                            {tpl.isPro ? (
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 800,
                                  backgroundColor: '#f59e0b',
                                  color: '#ffffff',
                                  padding: '2px 7px',
                                  borderRadius: '999px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                }}
                              >
                                <Crown size={10} /> PRO
                              </span>
                            ) : (
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  backgroundColor: '#10b981',
                                  color: '#ffffff',
                                  padding: '2px 7px',
                                  borderRadius: '999px',
                                }}
                              >
                                FREE
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            {isKm ? tpl.descKm : tpl.descEn}
                          </div>
                        </div>
                      </div>

                      <div>
                        {tpl.isPro && !isUnlocked ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
                            <Lock size={14} /> {isKm ? 'ដោះសោ' : 'Unlock ($1.99)'}
                          </span>
                        ) : isSelected ? (
                          <CheckCircle size={18} color="var(--primary)" />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Customizer */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>
                🎨 {isKm ? 'ពណ៌ចម្បង (Theme Color)' : 'Accent & Theme Color'}
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => onChangeSettings((prev) => ({ ...prev, primaryColor: c.value }))}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '999px',
                      backgroundColor: c.value,
                      border: settings.primaryColor === c.value ? '3px solid #ffffff' : '2px solid transparent',
                      boxShadow: settings.primaryColor === c.value ? '0 0 0 2px var(--primary)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                    title={c.name}
                  >
                    {settings.primaryColor === c.value && <Check size={16} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography & Spacing */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px' }}>
                🔤 {isKm ? 'ពុម្ពអក្សរ & ទំហំ (Typography)' : 'Font & Text Size'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="field-label">{isKm ? 'ពុម្ពអក្សរ (Font Family)' : 'Font Family'}</label>
                  <select
                    className="input-field"
                    value={settings.fontFamily}
                    onChange={(e) =>
                      onChangeSettings((prev) => ({
                        ...prev,
                        fontFamily: e.target.value as CoverLetterSettings['fontFamily'],
                      }))
                    }
                  >
                    {fonts.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="field-label">{isKm ? 'គម្លាតបន្ទាត់ & ទំហំ' : 'Text Density'}</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['compact', 'normal', 'spacious'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => onChangeSettings((prev) => ({ ...prev, fontSize: sz }))}
                        className={`btn btn-sm ${settings.fontSize === sz ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, textTransform: 'capitalize' }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
