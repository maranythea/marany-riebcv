import React from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { BookOpen, X, Send, Camera, Briefcase } from 'lucide-react';

interface TipsModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({ isOpen, language, onClose }) => {
  const isKm = language === 'km';
  const t = translations[language].tipsModal;

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(37,99,235,0.1) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <BookOpen size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{t.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '999px', padding: '6px 8px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Tip 1: No Experience */}
          <div
            style={{
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Briefcase size={18} color="var(--primary)" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {isKm ? '១. គ្មានបទពិសោធន៍ការងារផ្លូវការ តើត្រូវដាក់អ្វីខ្លះ?' : '1. What to put when you have ZERO formal experience?'}
              </h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {isKm
                ? 'និយោជកយល់ច្បាស់ថាសិស្សទើបចប់បាក់ឌុបមិនទាន់មានការងារការិយាល័យទេ។ អ្វីដែលគេចង់ឃើញគឺ៖ (១) លទ្ធផលបាក់ឌុប និងមុខវិជ្ជាឆ្នើម (២) សកម្មភាពក្លឹបសាលា ភាពជាប្រធាន/លេខាថ្នាក់ (៣) ការងារស្ម័គ្រចិត្ត (កាកបាទក្រហម យុទ្ធនាការសង្គម) (៤) ការជួយលក់ដូរនៅផ្ទះ ឬការបង្រៀនប្អូនៗ!'
                : 'Employers understand high school graduates are fresh. They look for: (1) BacII grade and strong subjects, (2) School club involvement or class representative duties, (3) Volunteer community activities (Red Cross, clean-up drives), (4) Helping at family retail/business or tutoring younger peers!'}
            </p>
          </div>

          {/* Tip 2: Photo Advice */}
          <div
            style={{
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Camera size={18} color="#10b981" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {isKm ? '២. គន្លឹះរូបថតលើ CV សម្រាប់ទីផ្សារការងារកម្ពុជា' : '2. Photo best practices for Cambodian job market'}
              </h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {isKm
                ? 'រូបថតគួរតែ៖ ពាក់អាវស ឬអាវមានក ផ្ទៃខាងក្រោយពណ៌ភ្លឺស្រឡះ (ស ឬខៀវស្រាល) ញញឹមដោយភាពរួសរាយ និងមើលត្រង់ទៅកាមេរ៉ា។ ចៀសវាងរូប Selfie ឬរូបពាក់វ៉ែនតាខ្មៅ។'
                : 'Use a neat passport-style or professional photo with a collared shirt, clean bright background, and a friendly confident smile. Avoid casual selfie crops or sunglasses.'}
            </p>
          </div>

          {/* Tip 3: Telegram & Email Etiquette */}
          <div
            style={{
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Send size={18} color="#0284c7" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {isKm ? '៣. របៀបផ្ញើសារដាក់ពាក្យតាម Telegram & Email' : '3. Telegram & Email application message sample'}
              </h4>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', fontSize: '0.78rem', color: 'var(--text-primary)', fontFamily: 'monospace', marginTop: '6px' }}>
              {isKm ? (
                <>
                  <div><strong>ជម្រាបសួរលោក/លោកស្រី [ឈ្មោះស្ថាប័ន],</strong></div>
                  <div style={{ marginTop: '4px' }}>
                    ខ្ញុំបាទ/នាងខ្ញុំឈ្មោះ [ឈ្មោះរបស់អ្នក] ជាសិស្សទើបបញ្ចប់ការសិក្សាថ្នាក់ទី១២ (បាក់ឌុប)។ ខ្ញុំមានចំណាប់អារម្មណ៍យ៉ាងខ្លាំងចំពោះតំណែង [ឈ្មោះតំណែង ឧ. Cashier / Admin Assistant]។ ខ្ញុំសូមផ្ញើជូននូវប្រវត្តិរូបសង្ខេប (CV) របស់ខ្ញុំនៅក្នុងឯកសារ PDF ភ្ជាប់មកជាមួយនេះ។ សូមអរគុណ!
                  </div>
                </>
              ) : (
                <>
                  <div><strong>Dear Hiring Team,</strong></div>
                  <div style={{ marginTop: '4px' }}>
                    My name is [Your Name], a recent BacII graduate. I am writing to express my strong interest in the [Role Title] position. Please find attached my CV in PDF format for your consideration. Thank you!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn-primary">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
