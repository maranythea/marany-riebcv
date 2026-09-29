import React, { useState } from 'react';
import type { SkillItem, LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { quickSkillsList } from '../../data/aiSuggestions';
import { Star, Plus, Trash2, Zap } from 'lucide-react';

interface SkillsEditorProps {
  items: SkillItem[];
  language: LanguageCode;
  onChange: (items: SkillItem[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ items, language, onChange }) => {
  const t = translations[language].skills;
  const isKm = language === 'km';
  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillCat, setNewSkillCat] = useState<'hard' | 'soft' | 'digital' | 'other'>('digital');

  const handleAddCustomSkill = () => {
    if (!newSkillText.trim()) return;
    const newItem: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newSkillText.trim(),
      category: newSkillCat,
      level: 'Advanced',
    };
    onChange([...items, newItem]);
    setNewSkillText('');
  };

  const handleQuickAdd = (skillName: string, category: 'hard' | 'soft' | 'digital' | 'other') => {
    if (items.some((it) => it.name.toLowerCase() === skillName.toLowerCase())) return;
    const newItem: SkillItem = {
      id: `skill-${Date.now()}-${Math.random()}`,
      name: skillName,
      category,
      level: 'Advanced',
    };
    onChange([...items, newItem]);
  };

  const handleDeleteSkill = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Star size={20} color="var(--primary)" />
          {t.title}
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
      </div>

      {/* Quick 1-Click Skill Tags */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} color="#f59e0b" />
          <span>{t.quickAdd}</span>
        </div>

        {/* Digital Skills */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            💻 {t.catDigital}:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {quickSkillsList.digital.map((s, i) => {
              const exists = items.some((item) => item.name === s);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickAdd(s, 'digital')}
                  style={{
                    backgroundColor: exists ? 'var(--primary-light)' : 'var(--bg-app)',
                    border: `1px solid ${exists ? 'var(--primary)' : 'var(--border-color)'}`,
                    color: exists ? 'var(--primary)' : 'var(--text-primary)',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    cursor: exists ? 'default' : 'pointer',
                    fontWeight: 500,
                  }}
                >
                  {exists ? '✓ ' : '+ '} {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#10b981', textTransform: 'uppercase' }}>
            🤝 {t.catSoft}:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {quickSkillsList.soft.map((s, i) => {
              const exists = items.some((item) => item.name === s);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickAdd(s, 'soft')}
                  style={{
                    backgroundColor: exists ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-app)',
                    border: `1px solid ${exists ? '#10b981' : 'var(--border-color)'}`,
                    color: exists ? '#059669' : 'var(--text-primary)',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    cursor: exists ? 'default' : 'pointer',
                    fontWeight: 500,
                  }}
                >
                  {exists ? '✓ ' : '+ '} {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Custom Skill Input */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <input
          type="text"
          className="form-input"
          style={{ flex: 1 }}
          placeholder={isKm ? 'វាយបញ្ចូលឈ្មោះជំនាញ (ឧ. ការប្រើប្រាស់ ABA POS)...' : 'Type skill name (e.g. Canva, Excel)...'}
          value={newSkillText}
          onChange={(e) => setNewSkillText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
        />
        <select
          className="form-select"
          style={{ width: 'auto', fontSize: '0.8rem' }}
          value={newSkillCat}
          onChange={(e) => setNewSkillCat(e.target.value as any)}
        >
          <option value="digital">{t.catDigital}</option>
          <option value="soft">{t.catSoft}</option>
          <option value="hard">{t.catHard}</option>
          <option value="other">{t.catOther}</option>
        </select>
        <button type="button" onClick={handleAddCustomSkill} className="btn btn-primary btn-sm">
          <Plus size={15} />
          <span>Add</span>
        </button>
      </div>

      {/* Selected Skills Pills */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          {isKm ? `ជំនាញដែលបានជ្រើសរើស (${items.length})` : `Selected Skills on CV (${items.length}):`}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {items.map((skill) => (
            <div
              key={skill.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Remove skill"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
