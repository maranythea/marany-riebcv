import React from 'react';
import type { PersonalInfo, LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { User, Upload, Trash2, Eye, EyeOff } from 'lucide-react';

interface PersonalInfoEditorProps {
  data: PersonalInfo;
  language: LanguageCode;
  onChange: (data: Partial<PersonalInfo>) => void;
}

export const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ data, language, onChange }) => {
  const t = translations[language].personal;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={20} color="var(--primary)" />
          {t.title}
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
      </div>

      {/* Profile Photo Uploader Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 16px',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ position: 'relative' }}>
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt="Avatar"
              style={{
                width: '68px',
                height: '68px',
                objectFit: 'cover',
                borderRadius: data.photoShape === 'circle' ? '999px' : data.photoShape === 'rounded' ? '10px' : '4px',
                border: '2px solid var(--primary)',
              }}
            />
          ) : (
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '999px',
                backgroundColor: 'var(--bg-surface)',
                border: '2px dashed var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <User size={30} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={14} />
              <span>{t.uploadPhoto}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            {data.photoUrl && (
              <button
                type="button"
                onClick={() => onChange({ photoUrl: '' })}
                className="btn btn-secondary btn-sm"
                style={{ color: '#ef4444' }}
              >
                <Trash2 size={14} />
                <span>{t.removePhoto}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onChange({ showPhoto: !data.showPhoto })}
              className="btn btn-secondary btn-sm"
            >
              {data.showPhoto ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>{data.showPhoto ? 'Showing' : 'Hidden'}</span>
            </button>
          </div>

          {/* Photo Shape Radios */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>{t.photoShape}:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="photoShape"
                checked={data.photoShape === 'circle'}
                onChange={() => onChange({ photoShape: 'circle' })}
              />
              {t.circle}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="photoShape"
                checked={data.photoShape === 'rounded'}
                onChange={() => onChange({ photoShape: 'rounded' })}
              />
              {t.rounded}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="photoShape"
                checked={data.photoShape === 'square'}
                onChange={() => onChange({ photoShape: 'square' })}
              />
              {t.square}
            </label>
          </div>
        </div>
      </div>

      {/* Name Fields Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="form-group">
          <label className="form-label">{t.fullName} *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. SOK DARA"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.khmerName}</label>
          <input
            type="text"
            className="form-input"
            placeholder="ឧ. សុខ តារា"
            value={data.khmerName || ''}
            onChange={(e) => onChange({ khmerName: e.target.value })}
          />
        </div>
      </div>

      {/* Job Title / Target Role */}
      <div className="form-group">
        <label className="form-label">{t.jobTitle} *</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. BacII Graduate | Seeking Customer Service / Admin Role"
          value={data.jobTitle}
          onChange={(e) => onChange({ jobTitle: e.target.value })}
        />
      </div>

      {/* Contact Grid: Phone & Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="form-group">
          <label className="form-label">{t.phone} *</label>
          <input
            type="text"
            className="form-input"
            placeholder="+855 12 345 678"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.email} *</label>
          <input
            type="email"
            className="form-input"
            placeholder="sok.dara@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
      </div>

      {/* Location & Telegram Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="form-group">
          <label className="form-label">{t.location}</label>
          <input
            type="text"
            className="form-input"
            placeholder="Phnom Penh, Cambodia"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.telegram}</label>
          <input
            type="text"
            className="form-input"
            placeholder="@username"
            value={data.telegram || ''}
            onChange={(e) => onChange({ telegram: e.target.value })}
          />
        </div>
      </div>

      {/* LinkedIn & Portfolio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="form-group">
          <label className="form-label">{t.linkedin}</label>
          <input
            type="text"
            className="form-input"
            placeholder="linkedin.com/in/username"
            value={data.linkedin || ''}
            onChange={(e) => onChange({ linkedin: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.portfolio}</label>
          <input
            type="text"
            className="form-input"
            placeholder="fb.com/profile or website"
            value={data.portfolio || ''}
            onChange={(e) => onChange({ portfolio: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
