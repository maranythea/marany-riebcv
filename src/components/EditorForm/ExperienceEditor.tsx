import React from 'react';
import type { ExperienceItem, LanguageCode, ExperienceType } from '../../types/cv';
import { translations } from '../../data/translations';
import { aiBulletSuggestions } from '../../data/aiSuggestions';
import { Briefcase, Plus, Trash2, Sparkles, Lightbulb } from 'lucide-react';

interface ExperienceEditorProps {
  items: ExperienceItem[];
  language: LanguageCode;
  onChange: (items: ExperienceItem[]) => void;
  onOpenAiModal?: () => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ items, language, onChange }) => {
  const t = translations[language].experience;
  const isKm = language === 'km';

  const handleAddItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      organization: '',
      type: 'volunteer',
      location: 'Phnom Penh',
      startDate: 'Jan 2024',
      endDate: 'Present',
      current: true,
      bullets: [''],
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<ExperienceItem>) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  };

  const handleDeleteItem = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  const handleAddBullet = (id: string) => {
    const item = items.find((it) => it.id === id);
    if (item) {
      handleUpdateItem(id, { bullets: [...item.bullets, ''] });
    }
  };

  const handleUpdateBullet = (itemId: string, index: number, text: string) => {
    const item = items.find((it) => it.id === itemId);
    if (item) {
      const newBullets = [...item.bullets];
      newBullets[index] = text;
      handleUpdateItem(itemId, { bullets: newBullets });
    }
  };

  const handleDeleteBullet = (itemId: string, index: number) => {
    const item = items.find((it) => it.id === itemId);
    if (item) {
      const newBullets = item.bullets.filter((_, i) => i !== index);
      handleUpdateItem(itemId, { bullets: newBullets });
    }
  };

  const handleInsertSuggestedBullet = (itemId: string, bulletText: string) => {
    const item = items.find((it) => it.id === itemId);
    if (item) {
      // If first bullet is empty, replace it, otherwise append
      if (item.bullets.length === 1 && item.bullets[0].trim() === '') {
        handleUpdateItem(itemId, { bullets: [bulletText] });
      } else {
        handleUpdateItem(itemId, { bullets: [...item.bullets, bulletText] });
      }
    }
  };

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={20} color="var(--primary)" />
            {t.title}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
        </div>

        <button type="button" onClick={handleAddItem} className="btn btn-primary btn-sm">
          <Plus size={15} />
          <span>{t.addBtn}</span>
        </button>
      </div>

      {/* Student Encouragement Banner */}
      <div
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
        }}
      >
        <Lightbulb size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span>{t.emptyNote}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((exp, index) => (
          <div
            key={exp.id}
            style={{
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Header & Delete */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                #{index + 1} {exp.role || (isKm ? 'សកម្មភាព / ការងារ' : 'Activity / Experience')}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteItem(exp.id)}
                className="btn btn-secondary btn-sm"
                style={{ color: '#ef4444', padding: '4px 8px' }}
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Role, Org & Category Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.role} *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ឧ. អ្នកស្ម័គ្រចិត្ត ឬ ជំនួយការលក់' : 'e.g. Volunteer / Cashier Assistant'}
                  value={exp.role}
                  onChange={(e) => handleUpdateItem(exp.id, { role: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.org} *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ឧ. កាកបាទក្រហមកម្ពុជា ឬ ហាងកាហ្វេ' : 'e.g. Cambodian Red Cross / Cafe'}
                  value={exp.organization}
                  onChange={(e) => handleUpdateItem(exp.id, { organization: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.type}</label>
                <select
                  className="form-select"
                  value={exp.type}
                  onChange={(e) => handleUpdateItem(exp.id, { type: e.target.value as ExperienceType })}
                >
                  <option value="volunteer">{t.typeVolunteer}</option>
                  <option value="club">{t.typeClub}</option>
                  <option value="job">{t.typeJob}</option>
                  <option value="internship">{t.typeInternship}</option>
                  <option value="project">{t.typeProject}</option>
                </select>
              </div>
            </div>

            {/* Dates Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.startDate}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jan 2024"
                  value={exp.startDate}
                  onChange={(e) => handleUpdateItem(exp.id, { startDate: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.endDate}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Present"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => handleUpdateItem(exp.id, { endDate: e.target.value })}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, paddingBottom: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    handleUpdateItem(exp.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : exp.endDate,
                    })
                  }
                />
                <span>{t.current}</span>
              </label>
            </div>

            {/* Bullets List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>{t.bullets}</label>
                <button
                  type="button"
                  onClick={() => handleAddBullet(exp.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                >
                  <Plus size={12} /> {t.addBullet}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                    <textarea
                      className="form-input"
                      rows={2}
                      style={{ fontSize: '0.8rem', padding: '6px 10px', resize: 'vertical' }}
                      placeholder={isKm ? 'ឧ. ស្វាគមន៍អតិថិជន និងរៀបចំបញ្ជីទូទាត់ប្រាក់យ៉ាងត្រឹមត្រូវ...' : 'e.g. Welcomed customers warmly and handled daily transactions...'}
                      value={bullet}
                      onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteBullet(exp.id, bIdx)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444', padding: '6px', marginTop: '4px' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick AI Bullet Suggestions for this item */}
              <div style={{ marginTop: '10px', backgroundColor: 'var(--bg-surface)', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> {t.bulletSuggestion}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {aiBulletSuggestions.flatMap((cat) => cat.items).slice(0, 3).map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleInsertSuggestedBullet(exp.id, isKm ? item.km : item.en)}
                      style={{
                        backgroundColor: 'var(--bg-app)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      + {isKm ? item.km.slice(0, 50) + '...' : item.en.slice(0, 50) + '...'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
