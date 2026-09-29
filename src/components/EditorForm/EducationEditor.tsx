import React from 'react';
import type { EducationItem, LanguageCode, BacGrade, BacStream } from '../../types/cv';
import { translations } from '../../data/translations';
import { BookOpen, Plus, Trash2, Award } from 'lucide-react';

interface EducationEditorProps {
  items: EducationItem[];
  language: LanguageCode;
  onChange: (items: EducationItem[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ items, language, onChange }) => {
  const t = translations[language].education;
  const isKm = language === 'km';

  const handleAddItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      isBacII: false,
      bacGrade: 'B',
      bacStream: 'Science',
      startDate: '2021',
      endDate: '2024',
      current: false,
      scoreOrGpa: '',
      location: 'Phnom Penh',
      achievements: [],
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<EducationItem>) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  };

  const handleDeleteItem = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  const handleAddAchievement = (id: string) => {
    const item = items.find((it) => it.id === id);
    if (item) {
      const achievements = item.achievements || [];
      handleUpdateItem(id, { achievements: [...achievements, ''] });
    }
  };

  const handleUpdateAchievement = (itemId: string, index: number, text: string) => {
    const item = items.find((it) => it.id === itemId);
    if (item && item.achievements) {
      const newAch = [...item.achievements];
      newAch[index] = text;
      handleUpdateItem(itemId, { achievements: newAch });
    }
  };

  const handleDeleteAchievement = (itemId: string, index: number) => {
    const item = items.find((it) => it.id === itemId);
    if (item && item.achievements) {
      const newAch = item.achievements.filter((_, i) => i !== index);
      handleUpdateItem(itemId, { achievements: newAch });
    }
  };

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--primary)" />
            {t.title}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
        </div>

        <button type="button" onClick={handleAddItem} className="btn btn-primary btn-sm">
          <Plus size={15} />
          <span>{t.addBtn}</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((edu, index) => (
          <div
            key={edu.id}
            style={{
              backgroundColor: 'var(--bg-app)',
              border: edu.isBacII ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
            }}
          >
            {/* Header / Delete button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  #{index + 1} {edu.degree || (isKm ? 'ប្រវត្តិសិក្សា' : 'Education Item')}
                </span>
                {edu.isBacII && (
                  <span className="badge badge-bacii">
                    <Award size={12} /> {t.bacIiBadge}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDeleteItem(edu.id)}
                className="btn btn-secondary btn-sm"
                style={{ color: '#ef4444', padding: '4px 8px' }}
                title="Delete item"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Is BacII Toggle Card */}
            <div
              style={{
                backgroundColor: edu.isBacII ? 'var(--primary-light)' : 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                <input
                  type="checkbox"
                  checked={edu.isBacII || false}
                  onChange={(e) =>
                    handleUpdateItem(edu.id, {
                      isBacII: e.target.checked,
                      degree: e.target.checked && !edu.degree ? (isKm ? 'សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប)' : 'High School Diploma (BacII)') : edu.degree,
                    })
                  }
                />
                <span>{t.isBacII}</span>
              </label>

              {edu.isBacII && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {/* Grade Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{t.bacGrade}:</span>
                    <select
                      className="form-select"
                      style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto', fontWeight: 700 }}
                      value={edu.bacGrade || 'B'}
                      onChange={(e) => handleUpdateItem(edu.id, { bacGrade: e.target.value as BacGrade })}
                    >
                      <option value="A">Grade A (និទ្ទេស A)</option>
                      <option value="B">Grade B (និទ្ទេស B)</option>
                      <option value="C">Grade C (និទ្ទេស C)</option>
                      <option value="D">Grade D (និទ្ទេស D)</option>
                      <option value="E">Grade E (និទ្ទេស E)</option>
                      <option value="Pending">Pending / លទ្ធផលរង់ចាំ</option>
                    </select>
                  </div>

                  {/* Stream Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{t.bacStream}:</span>
                    <select
                      className="form-select"
                      style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                      value={edu.bacStream || 'Science'}
                      onChange={(e) => handleUpdateItem(edu.id, { bacStream: e.target.value as BacStream })}
                    >
                      <option value="Science">{t.streamScience}</option>
                      <option value="Social Science">{t.streamSocial}</option>
                      <option value="General">{t.streamGeneral}</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Institution & Degree fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.institution} *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ឧ. វិទ្យាល័យ ព្រះស៊ីសុវត្ថិ' : 'e.g. Sisowath High School'}
                  value={edu.institution}
                  onChange={(e) => handleUpdateItem(edu.id, { institution: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.degree} *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ឧ. សញ្ញាបត្របាក់ឌុប ឬ បរិញ្ញាបត្រ' : 'e.g. High School Diploma / Bachelor'}
                  value={edu.degree}
                  onChange={(e) => handleUpdateItem(edu.id, { degree: e.target.value })}
                />
              </div>
            </div>

            {/* Dates & Location Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.startDate}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2021"
                  value={edu.startDate}
                  onChange={(e) => handleUpdateItem(edu.id, { startDate: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.endDate}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2024"
                  value={edu.endDate}
                  disabled={edu.current}
                  onChange={(e) => handleUpdateItem(edu.id, { endDate: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.scoreOrGpa}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Top 10% / GPA 3.8"
                  value={edu.scoreOrGpa || ''}
                  onChange={(e) => handleUpdateItem(edu.id, { scoreOrGpa: e.target.value })}
                />
              </div>
            </div>

            {/* Achievements / Subjects */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>{t.achievements}</label>
                <button
                  type="button"
                  onClick={() => handleAddAchievement(edu.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '2px 6px' }}
                >
                  <Plus size={12} /> {t.addAchievement}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(edu.achievements || []).map((ach, aIdx) => (
                  <div key={aIdx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                      placeholder={isKm ? 'ឧ. និទ្ទេស A លើមុខវិជ្ជា គណិតវិទ្យា និង អង់គ្លេស' : 'e.g. Scored Grade A in Mathematics & English'}
                      value={ach}
                      onChange={(e) => handleUpdateAchievement(edu.id, aIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteAchievement(edu.id, aIdx)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444', padding: '6px' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
