import React from 'react';
import type { HonorItem, ReferenceItem, LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { Award, UserCheck, Plus, Trash2 } from 'lucide-react';

interface HonorsReferencesEditorProps {
  honors: HonorItem[];
  references: ReferenceItem[];
  language: LanguageCode;
  onChangeHonors: (items: HonorItem[]) => void;
  onChangeReferences: (items: ReferenceItem[]) => void;
}

export const HonorsReferencesEditor: React.FC<HonorsReferencesEditorProps> = ({
  honors,
  references,
  language,
  onChangeHonors,
  onChangeReferences,
}) => {
  const tHonors = translations[language].honors;
  const tRef = translations[language].references;
  const isKm = language === 'km';

  // Honors handlers
  const handleAddHonor = () => {
    const newItem: HonorItem = {
      id: `hon-${Date.now()}`,
      title: '',
      issuer: '',
      year: '2024',
      description: '',
    };
    onChangeHonors([...honors, newItem]);
  };

  const handleUpdateHonor = (id: string, updates: Partial<HonorItem>) => {
    onChangeHonors(honors.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  };

  const handleDeleteHonor = (id: string) => {
    onChangeHonors(honors.filter((h) => h.id !== id));
  };

  // References handlers
  const handleAddReference = () => {
    const newItem: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: '',
      role: isKm ? 'លោកគ្រូបន្ទុកថ្នាក់ទី១២' : 'Grade 12 Head Teacher',
      organization: isKm ? 'វិទ្យាល័យ...' : 'High School...',
      phone: '',
      email: '',
      relationship: isKm ? 'លោកគ្រូប្រចាំថ្នាក់' : 'Academic Advisor',
    };
    onChangeReferences([...references, newItem]);
  };

  const handleUpdateReference = (id: string, updates: Partial<ReferenceItem>) => {
    onChangeReferences(references.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const handleDeleteReference = (id: string) => {
    onChangeReferences(references.filter((r) => r.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Honors Section */}
      <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--primary)" />
              {tHonors.title}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tHonors.desc}</p>
          </div>

          <button type="button" onClick={handleAddHonor} className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>{tHonors.addBtn}</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {honors.map((honor) => (
            <div
              key={honor.id}
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {honor.title || (isKm ? 'ពានរង្វាន់ / លិខិតសរសើរ' : 'Honor / Award')}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteHonor(honor.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#ef4444', padding: '4px 6px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ឈ្មោះពានរង្វាន់ (ឧ. សិស្សពូកែគណិតវិទ្យា)' : 'Award Title'}
                  value={honor.title}
                  onChange={(e) => handleUpdateHonor(honor.id, { title: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ស្ថាប័ន ឬ សាលា' : 'Issuer / Organization'}
                  value={honor.issuer}
                  onChange={(e) => handleUpdateHonor(honor.id, { issuer: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Year (e.g. 2024)"
                  value={honor.year}
                  onChange={(e) => handleUpdateHonor(honor.id, { year: e.target.value })}
                />
              </div>

              <input
                type="text"
                className="form-input"
                placeholder={isKm ? 'ការពិពណ៌នាសង្ខេប (ស្រេចចិត្ត)' : 'Brief Description (Optional)'}
                value={honor.description || ''}
                onChange={(e) => handleUpdateHonor(honor.id, { description: e.target.value })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* References Section */}
      <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={20} color="var(--primary)" />
              {tRef.title}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tRef.desc}</p>
          </div>

          <button type="button" onClick={handleAddReference} className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>{tRef.addBtn}</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {references.map((ref) => (
            <div
              key={ref.id}
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {ref.name || (isKm ? 'បុគ្គលយោង' : 'Reference Contact')}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteReference(ref.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#ef4444', padding: '4px 6px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'ឈ្មោះពេញ (ឧ. លោកគ្រូ ហេង វិសាល)' : 'Full Name'}
                  value={ref.name}
                  onChange={(e) => handleUpdateReference(ref.id, { name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'តួនាទី (ឧ. លោកគ្រូបន្ទុកថ្នាក់ទី១២)' : 'Role / Title'}
                  value={ref.role}
                  onChange={(e) => handleUpdateReference(ref.id, { role: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={isKm ? 'សាលា / ស្ថាប័ន' : 'School / Organization'}
                  value={ref.organization}
                  onChange={(e) => handleUpdateReference(ref.id, { organization: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Phone (e.g. +855 12 345 678)"
                  value={ref.phone || ''}
                  onChange={(e) => handleUpdateReference(ref.id, { phone: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Email (Optional)"
                  value={ref.email || ''}
                  onChange={(e) => handleUpdateReference(ref.id, { email: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
