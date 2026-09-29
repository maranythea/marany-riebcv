import React from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { aiObjectiveSuggestions } from '../../data/aiSuggestions';
import { Sparkles, FileText, ArrowRight } from 'lucide-react';

interface ObjectiveEditorProps {
  value: string;
  language: LanguageCode;
  onChange: (value: string) => void;
  onOpenAiModal?: () => void;
}

export const ObjectiveEditor: React.FC<ObjectiveEditorProps> = ({ value, language, onChange, onOpenAiModal }) => {
  const t = translations[language].objective;
  const isKm = language === 'km';

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--primary)" />
            {t.title}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
        </div>

        {onOpenAiModal && (
          <button type="button" onClick={onOpenAiModal} className="btn btn-accent btn-sm">
            <Sparkles size={14} />
            <span>{isKm ? 'ជំនួយការសរសេរ' : 'AI Writer'}</span>
          </button>
        )}
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          style={{ minHeight: '130px', lineHeight: 1.6 }}
          placeholder={t.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>{isKm ? 'គន្លឹះ៖ សរសេរប្រហែល ៣-៥ បន្ទាត់ដើម្បីឱ្យស្អាតលើ ១ ទំព័រ A4' : 'Tip: 3-5 lines look best for a clean 1-page A4 layout.'}</span>
          <span>{value.length} characters</span>
        </div>
      </div>

      {/* 1-Click Starter Suggestions */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#f59e0b" />
          <span>{t.quickStarters}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {aiObjectiveSuggestions.map((sug, idx) => (
            <div
              key={idx}
              onClick={() => onChange(isKm ? sug.textKm : sug.textEn)}
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.backgroundColor = 'var(--bg-app)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {isKm ? sug.roleKm : sug.roleEn}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {isKm ? 'ចុចប្រើ' : 'Use this'} <ArrowRight size={12} />
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {isKm ? sug.textKm : sug.textEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
