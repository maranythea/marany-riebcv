import React from 'react';
import type { LanguageItem, LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { Globe, Plus, Trash2 } from 'lucide-react';

interface LanguagesEditorProps {
  items: LanguageItem[];
  language: LanguageCode;
  onChange: (items: LanguageItem[]) => void;
}

export const LanguagesEditor: React.FC<LanguagesEditorProps> = ({ items, language, onChange }) => {
  const t = translations[language].languages;
  const isKm = language === 'km';

  const handleAddItem = (name: string = '', proficiency: LanguageItem['proficiency'] = 'Intermediate') => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}-${Math.random()}`,
      name,
      proficiency,
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<LanguageItem>) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  };

  const handleDeleteItem = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} color="var(--primary)" />
            {t.title}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
        </div>

        <button type="button" onClick={() => handleAddItem()} className="btn btn-primary btn-sm">
          <Plus size={15} />
          <span>{t.addBtn}</span>
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => handleAddItem('Khmer (ភាសាខ្មែរ)', 'Native')}
          className="btn btn-secondary btn-sm"
        >
          {t.quickAddKhmer}
        </button>
        <button
          type="button"
          onClick={() => handleAddItem('English', 'Intermediate')}
          className="btn btn-secondary btn-sm"
        >
          {t.quickAddEnglish}
        </button>
        <button
          type="button"
          onClick={() => handleAddItem('Chinese (Mandarin)', 'Basic')}
          className="btn btn-secondary btn-sm"
        >
          + Chinese (Basic)
        </button>
        <button
          type="button"
          onClick={() => handleAddItem('French (Français)', 'Basic')}
          className="btn btn-secondary btn-sm"
        >
          + French (Basic)
        </button>
      </div>

      {/* Language List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((lang) => (
          <div
            key={lang.id}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              backgroundColor: 'var(--bg-app)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ flex: 1 }}>
              <input
                type="text"
                className="form-input"
                placeholder={isKm ? 'ឈ្មោះភាសា (ឧ. English)' : 'Language Name'}
                value={lang.name}
                onChange={(e) => handleUpdateItem(lang.id, { name: e.target.value })}
              />
            </div>

            <div style={{ width: '180px' }}>
              <select
                className="form-select"
                value={lang.proficiency}
                onChange={(e) => handleUpdateItem(lang.id, { proficiency: e.target.value as any })}
              >
                <option value="Native">{t.profNative}</option>
                <option value="Fluent">{t.profFluent}</option>
                <option value="Intermediate">{t.profIntermediate}</option>
                <option value="Basic">{t.profBasic}</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteItem(lang.id)}
              className="btn btn-secondary btn-sm"
              style={{ color: '#ef4444', padding: '8px' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
