import React from 'react';
import type { CvData, CvSettings } from '../../../types/cv';

interface TemplateProps {
  data: CvData;
  settings: CvSettings;
}

export const TechCompactTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo, objective, education, experiences, skills, languages, honors, references } = data;
  const primary = settings.primaryColor || '#0284c7';
  const isKm = settings.language === 'km';
  const textScale = settings.fontSize === 'compact' ? '0.80rem' : settings.fontSize === 'spacious' ? '0.92rem' : '0.85rem';

  return (
    <div
      className="cv-template tech-compact"
      style={{
        padding: '28px 32px',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Plus Jakarta Sans', monospace, sans-serif",
        minHeight: '297mm',
        lineHeight: 1.45,
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          padding: '18px 24px',
          borderRadius: '8px',
          marginBottom: '16px',
        }}
      >
        <div>
          {personalInfo.khmerName && (
            <div style={{ fontSize: '1.1rem', color: '#38bdf8', fontWeight: 600, fontFamily: 'Kantumruy Pro, sans-serif' }}>
              {personalInfo.khmerName}
            </div>
          )}
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '2px 0', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> {personalInfo.jobTitle || 'BacII Graduate / Junior Specialist'}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.74rem', color: '#cbd5e1', marginTop: '8px' }}>
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.telegram && <span>✈️ {personalInfo.telegram}</span>}
          </div>
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            style={{
              width: '85px',
              height: '85px',
              objectFit: 'cover',
              borderRadius: '6px',
              border: '2px solid #38bdf8',
            }}
          />
        )}
      </div>

      {/* Main Grid: 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '18px' }}>
        {/* Left Column: Summary, Experience, Education */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Summary */}
          {objective && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                // {isKm ? 'គោលបំណងការងារ' : 'Profile Overview'}
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: 1.5 }}>{objective}</p>
            </div>
          )}

          {/* Education & BacII */}
          {education.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                // {isKm ? 'កម្រិតវប្បធម៌ & បាក់ឌុប' : 'Education & Credentials'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ backgroundColor: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                    <div style={{ color: primary, fontSize: '0.78rem', fontWeight: 600 }}>{edu.institution}</div>
                    {edu.isBacII && edu.bacGrade && (
                      <div style={{ display: 'inline-block', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '0.68rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', marginTop: '2px' }}>
                        {isKm ? `និទ្ទេស ${edu.bacGrade}` : `BacII Grade: ${edu.bacGrade}`} ({edu.bacStream})
                      </div>
                    )}
                    {edu.achievements && (
                      <ul style={{ margin: '3px 0 0 14px', padding: 0, fontSize: '0.75rem', color: '#475569' }}>
                        {edu.achievements.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                // {isKm ? 'បទពិសោធន៍ & សកម្មភាព' : 'Experience & Projects'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{exp.role}</span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div style={{ color: primary, fontSize: '0.78rem', fontWeight: 600 }}>{exp.organization}</div>
                    {exp.bullets && (
                      <ul style={{ margin: '2px 0 0 14px', padding: 0, fontSize: '0.78rem', color: '#334155' }}>
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Skills, Languages, Honors, References */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                // {isKm ? 'ជំនាញ & បច្ចេកវិទ្យា' : 'Skills & Toolkit'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map((s) => (
                  <span
                    key={s.id}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.72rem',
                      backgroundColor: '#f1f5f9',
                      color: '#0f172a',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    [{s.name}]
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                // {isKm ? 'ភាសា' : 'Languages'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem' }}>
                {languages.map((l) => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 6px', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span>
                    <span style={{ color: primary, fontWeight: 700 }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Honors */}
          {honors.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                // {isKm ? 'ពានរង្វាន់' : 'Awards & Certs'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {honors.map((h) => (
                  <div key={h.id} style={{ fontSize: '0.76rem', backgroundColor: '#f0fdf4', padding: '5px 8px', borderRadius: '4px', borderLeft: '3px solid #22c55e' }}>
                    <div style={{ fontWeight: 700, color: '#15803d' }}>{h.title}</div>
                    <div style={{ color: '#166534', fontSize: '0.72rem' }}>{h.issuer} ({h.year})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                // {isKm ? 'បុគ្គលយោង' : 'References'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {references.map((r) => (
                  <div key={r.id} style={{ fontSize: '0.76rem', backgroundColor: '#f8fafc', padding: '6px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700 }}>{r.name}</div>
                    <div style={{ color: primary }}>{r.role}, {r.organization}</div>
                    {r.phone && <div>📞 {r.phone}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
