import React, { useState } from 'react';
import type { LanguageCode } from '../../types/cv';
import type { CoverLetterData } from '../../types/coverLetter';
import { AI_ROLE_PRESETS, AI_QUICK_PARAGRAPHS } from '../../data/aiCoverLetterSuggestions';
import { Sparkles, X, Copy, Check, ArrowRight, Wand2, RefreshCw, FileText } from 'lucide-react';
import { triggerConfetti } from '../../utils/pdfExport';

interface AiCoverLetterModalProps {
  isOpen: boolean;
  language: LanguageCode;
  senderName: string;
  senderKhmerName?: string;
  onClose: () => void;
  onApplyCoverLetter: (data: Partial<CoverLetterData>) => void;
}

export const AiCoverLetterModal: React.FC<AiCoverLetterModalProps> = ({
  isOpen,
  language,
  senderName,
  senderKhmerName,
  onClose,
  onApplyCoverLetter,
}) => {
  const [activeTab, setActiveTab] = useState<'full' | 'snippets'>('full');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(AI_ROLE_PRESETS[0].id);
  const [targetCompany, setTargetCompany] = useState<string>('Brown Coffee and Bakery');
  const [recipientName, setRecipientName] = useState<string>('Hiring Manager');
  const [applicantAngle, setApplicantAngle] = useState<'bacii' | 'student' | 'entry'>('bacii');
  const [aiLang, setAiLang] = useState<LanguageCode>(language);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generatedLetter, setGeneratedLetter] = useState<{
    subject: string;
    salutation: string;
    opening: string;
    body1: string;
    body2: string;
    closing: string;
    signOff: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const isKm = aiLang === 'km';
  const selectedPreset = AI_ROLE_PRESETS.find((p) => p.id === selectedPresetId) || AI_ROLE_PRESETS[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep(isKm ? 'កំពុងវិភាគតួនាទី និងស្ថាប័ន...' : 'Analyzing target job and company...');

    setTimeout(() => {
      setGenerationStep(isKm ? 'កំពុងតាក់តែងកថាខណ្ឌណែនាំខ្លួន និងលទ្ធផលបាក់ឌុប...' : 'Drafting introduction and BacII strengths...');
    }, 500);

    setTimeout(() => {
      setGenerationStep(isKm ? 'កំពុងសម្រិតសម្រាំងពាក្យពេចន៍ និងក្រមសីលធម៌ការងារ...' : 'Polishing business etiquette and call to action...');
    }, 1000);

    setTimeout(() => {
      const template = isKm ? selectedPreset.contentKm : selectedPreset.contentEn;
      const comp = targetCompany.trim() || (isKm ? selectedPreset.defaultCompanyKm : selectedPreset.defaultCompanyEn);
      
      let openingText = template.opening.replace(/{company}/g, comp);
      let body1Text = template.body1.replace(/{company}/g, comp);
      let body2Text = template.body2.replace(/{company}/g, comp);
      let closingText = template.closing.replace(/{company}/g, comp);

      // Adjust slightly according to applicant angle
      if (applicantAngle === 'student') {
        if (!isKm) {
          openingText = openingText.replace('recent BacII graduate', 'dedicated university student and BacII graduate');
        } else {
          openingText = openingText.replace('សិស្សទើបបញ្ចប់ការប្រឡងបាក់ឌុប', 'និស្សិតសាកលវិទ្យាល័យ និងជាសិស្សទើបបញ្ចប់បាក់ឌុប');
        }
      }

      setGeneratedLetter({
        subject: template.subject,
        salutation: template.salutation.replace(/{company}/g, comp),
        opening: openingText,
        body1: body1Text,
        body2: body2Text,
        closing: closingText,
        signOff: template.signOff,
      });

      setIsGenerating(false);
      setGenerationStep('');
      triggerConfetti();
    }, 1500);
  };

  const handleApply = () => {
    if (!generatedLetter) return;
    onApplyCoverLetter({
      recipient: {
        hiringManagerName: recipientName.trim() || (isKm ? 'គណៈគ្រប់គ្រងផ្នែកជ្រើសរើសបុគ្គលិក' : 'Hiring Manager'),
        companyName: targetCompany.trim() || (isKm ? selectedPreset.defaultCompanyKm : selectedPreset.defaultCompanyEn),
        department: isKm ? 'នាយកដ្ឋានធនធានមនុស្ស' : 'Human Resources Department',
        jobTitleApplied: isKm ? selectedPreset.titleKm : selectedPreset.titleEn,
      },
      subject: generatedLetter.subject,
      salutation: generatedLetter.salutation,
      openingParagraph: generatedLetter.opening,
      bodyParagraph1: generatedLetter.body1,
      bodyParagraph2: generatedLetter.body2,
      closingParagraph: generatedLetter.closing,
      signOff: generatedLetter.signOff,
    });
    onClose();
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    const fullText = [
      generatedLetter.subject ? `Subject: ${generatedLetter.subject}\n` : '',
      generatedLetter.salutation,
      '\n',
      generatedLetter.opening,
      '\n',
      generatedLetter.body1,
      '\n',
      generatedLetter.body2,
      '\n',
      generatedLetter.closing,
      '\n',
      generatedLetter.signOff,
      senderName,
    ].join('\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(139,92,246,0.08) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {isKm ? 'ជំនួយការ AI សរសេរលិខិតអម (Cover Letter AI)' : 'AI Cover Letter Generator'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {isKm ? 'តាក់តែងលិខិតអមការងារកម្រិតវិជ្ជាជីវៈក្នុងរយៈពេលប៉ុន្មានវិនាទី' : 'Generate persuasive, tailored cover letters in seconds'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '999px', padding: '6px 8px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', padding: '12px 24px 0 24px', gap: '16px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('full')}
            style={{
              padding: '8px 12px',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: activeTab === 'full' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2px solid ${activeTab === 'full' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            ✍️ {isKm ? 'បង្កើតលិខិតពេញលេញ (Full Letter)' : 'Full Letter Generator'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('snippets')}
            style={{
              padding: '8px 12px',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: activeTab === 'snippets' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2px solid ${activeTab === 'snippets' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            ⚡ {isKm ? 'កថាខណ្ឌគំរូ & ជំនួយសរសេរ' : 'Quick Paragraph Starters'}
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', maxHeight: '72vh', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {activeTab === 'full' ? (
            <>
              {/* Form Controls Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    🎯 {isKm ? 'មុខតំណែងដែលចង់ដាក់ពាក្យ' : 'Target Position / Role'}
                  </label>
                  <select
                    value={selectedPresetId}
                    onChange={(e) => {
                      setSelectedPresetId(e.target.value);
                      const p = AI_ROLE_PRESETS.find((x) => x.id === e.target.value);
                      if (p) setTargetCompany(isKm ? p.defaultCompanyKm : p.defaultCompanyEn);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.84rem',
                    }}
                  >
                    {AI_ROLE_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {isKm ? preset.titleKm : preset.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    🏢 {isKm ? 'ឈ្មោះក្រុមហ៊ុន / ស្ថាប័ន' : 'Target Company Name'}
                  </label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Brown Coffee, ABA Bank, Smart"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.84rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    👤 {isKm ? 'អ្នកទទួល / គណៈគ្រប់គ្រង' : 'Recipient / Hiring Manager'}
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder={isKm ? 'គណៈគ្រប់គ្រងផ្នែកធនធានមនុស្ស' : 'Hiring Manager'}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.84rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    🎓 {isKm ? 'កម្រិត & មូលដ្ឋានបេក្ខជន' : 'Applicant Background'}
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setApplicantAngle('bacii')}
                      className={`btn btn-sm ${applicantAngle === 'bacii' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, fontSize: '0.75rem', padding: '6px' }}
                    >
                      {isKm ? 'សិស្សបាក់ឌុប' : 'BacII Graduate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplicantAngle('student')}
                      className={`btn btn-sm ${applicantAngle === 'student' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, fontSize: '0.75rem', padding: '6px' }}
                    >
                      {isKm ? 'និស្សិត/កម្មសិក្សា' : 'Student/Intern'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplicantAngle('entry')}
                      className={`btn btn-sm ${applicantAngle === 'entry' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, fontSize: '0.75rem', padding: '6px' }}
                    >
                      {isKm ? 'ទូទៅ' : 'Entry-level'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  🌐 {isKm ? 'ភាសានៃលិខិតអម:' : 'Cover Letter Output Language:'}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setAiLang('km')}
                    className={`btn btn-sm ${aiLang === 'km' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    🇰🇭 ភាសាខ្មែរ (Khmer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiLang('en')}
                    className={`btn btn-sm ${aiLang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              {/* Generate Trigger Button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn btn-accent"
                style={{ padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700 }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>{generationStep || (isKm ? 'កំពុងបង្កើតលិខិត...' : 'Generating with AI...')}</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    <span>{isKm ? '✨ បង្កើតលិខិតអមការងារដោយ AI (Generate)' : '✨ Generate Tailored Cover Letter with AI'}</span>
                  </>
                )}
              </button>

              {/* Generated Result Box */}
              {generatedLetter && (
                <div
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={16} /> {isKm ? 'លទ្ធផលលិខិតដែលបានបង្កើត' : 'Generated Cover Letter'}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button type="button" onClick={handleCopy} className="btn btn-secondary btn-sm">
                        {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copied ? (isKm ? 'បានចម្លង' : 'Copied!') : (isKm ? 'ចម្លង' : 'Copy')}</span>
                      </button>
                      <button type="button" onClick={handleApply} className="btn btn-primary btn-sm">
                        <span>{isKm ? '🚀 ដាក់បញ្ចូលក្នុងលិខិត' : '🚀 Apply to Cover Letter'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, maxHeight: '260px', overflowY: 'auto', paddingRight: '6px' }}>
                    <div style={{ fontWeight: 700, marginBottom: '8px' }}>RE: {generatedLetter.subject}</div>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>{generatedLetter.salutation}</div>
                    <p style={{ marginBottom: '10px' }}>{generatedLetter.opening}</p>
                    <p style={{ marginBottom: '10px' }}>{generatedLetter.body1}</p>
                    <p style={{ marginBottom: '10px' }}>{generatedLetter.body2}</p>
                    <p style={{ marginBottom: '10px' }}>{generatedLetter.closing}</p>
                    <div style={{ fontWeight: 600 }}>{generatedLetter.signOff}</div>
                    <div>{senderKhmerName || senderName}</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Snippets & Starters */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>
                  🎯 {isKm ? 'កថាខណ្ឌណែនាំខ្លួនគួរឱ្យចាប់អារម្មណ៍ (Powerful Openings)' : 'Powerful Opening Paragraphs'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {AI_QUICK_PARAGRAPHS.openings.map((item, idx) => {
                    const text = isKm
                      ? item.textKm.replace(/{role}/g, selectedPreset.titleKm).replace(/{company}/g, targetCompany)
                      : item.textEn.replace(/{role}/g, selectedPreset.titleEn).replace(/{company}/g, targetCompany);

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 14px',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-app)',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          {isKm ? item.labelKm : item.labelEn}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                          {text}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            onApplyCoverLetter({ openingParagraph: text });
                            onClose();
                          }}
                          className="btn btn-secondary btn-sm"
                        >
                          <span>{isKm ? 'បញ្ចូលទៅកថាខណ្ឌផ្ដើម' : 'Insert into Opening'}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>
                  🤝 {isKm ? 'កថាខណ្ឌបញ្ចប់ និងការស្នើសុំសម្ភាសន៍ (Closings & Call-to-Action)' : 'Closing Paragraphs & Call-to-Action'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {AI_QUICK_PARAGRAPHS.closings.map((item, idx) => {
                    const text = isKm
                      ? item.textKm.replace(/{company}/g, targetCompany)
                      : item.textEn.replace(/{company}/g, targetCompany);

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 14px',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-app)',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          {isKm ? item.labelKm : item.labelEn}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                          {text}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            onApplyCoverLetter({ closingParagraph: text });
                            onClose();
                          }}
                          className="btn btn-secondary btn-sm"
                        >
                          <span>{isKm ? 'បញ្ចូលទៅកថាខណ្ឌបញ្ចប់' : 'Insert into Closing'}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
