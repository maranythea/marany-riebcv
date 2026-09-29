import React from 'react';
import type { CvData, CvSettings } from '../../../types/cv';

interface TemplateProps {
  data: CvData;
  settings: CvSettings;
}

export const CreativeGradientTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo, objective, education, experiences, skills, languages, honors, references } = data;
  const primary = settings.primaryColor || '#6366f1';
  const accent = settings.accentColor || '#ec4899';
  const isKm = settings.language === 'km';
  const textScale = settings.fontSize === 'compact' ? '0.82rem' : settings.fontSize === 'spacious' ? '0.95rem' : '0.88rem';

  return (
    <div
      className="cv-template creative-gradient"
      style={{
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Outfit', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.48,
        position: 'relative',
      }}
    >
      {/* Vibrant Gradient Header Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
          color: '#ffffff',
          padding: '28px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div>
          {personalInfo.khmerName && (
            <div style={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.95, fontFamily: 'Kantumruy Pro, sans-serif' }}>
              {personalInfo.khmerName}
            </div>
          )}
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '2px 0 4px 0' }}>
            {personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(4px)',
              padding: '2px 10px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {personalInfo.jobTitle || 'BacII Graduate & Fast Learner'}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.76rem',
              marginTop: '12px',
              opacity: 0.95,
            }}
          >
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
              width: '95px',
              height: '95px',
              objectFit: 'cover',
              borderRadius: personalInfo.photoShape === 'circle' ? '999px' : '16px',
              border: '3px solid #ffffff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* Body Content */}
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Objective */}
        {objective && (
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderLeft: `4px solid ${primary}`,
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <div style={{ fontWeight: 700, color: primary, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '3px' }}>
              ✨ {isKm ? 'គោលបំណងការងារ' : 'About Me & Career Goal'}
            </div>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.83rem', lineHeight: 1.5 }}>{objective}</p>
          </div>
        )}

        {/* 2-Column Main Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: '20px' }}>
          {/* Left Column: Education & Experience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: primary,
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  🎓 {isKm ? 'ការអប់រំ & បាក់ឌុប' : 'Education & BacII'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.86rem' }}>{edu.degree}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2px 0' }}>
                        <span style={{ color: primary, fontWeight: 600, fontSize: '0.8rem' }}>{edu.institution}</span>
                        <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>
                      {edu.isBacII && edu.bacGrade && (
                        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${primary}, ${accent})`, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '1px 7px', borderRadius: '4px', marginTop: '2px' }}>
                          {isKm ? `និទ្ទេស ${edu.bacGrade}` : `BacII Grade ${edu.bacGrade}`} ({edu.bacStream || 'Science'})
                        </div>
                      )}
                      {edu.achievements && (
                        <ul style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '0.78rem', color: '#475569' }}>
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

            {/* Experiences */}
            {experiences.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: primary,
                    marginBottom: '8px',
                  }}
                >
                  💼 {isKm ? 'បទពិសោធន៍ & សកម្មភាព' : 'Experience & Projects'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.86rem' }}>{exp.role}</span>
                        <span style={{ fontSize: '0.74rem', color: '#64748b' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <div style={{ color: primary, fontWeight: 600, fontSize: '0.8rem' }}>{exp.organization}</div>
                      {exp.bullets && (
                        <ul style={{ margin: '2px 0 0 16px', padding: 0, fontSize: '0.8rem', color: '#334155' }}>
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

          {/* Right Column: Skills, Languages, Honors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: primary,
                    marginBottom: '8px',
                  }}
                >
                  ⚡ {isKm ? 'ជំនាញសំខាន់ៗ' : 'Key Skills'}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      style={{
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        color: '#1e293b',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        border: '1px solid #cbd5e1',
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: primary,
                    marginBottom: '8px',
                  }}
                >
                  🌐 {isKm ? 'ភាសា' : 'Languages'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.8rem' }}>
                  {languages.map((l) => (
                    <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#f8fafc', padding: '4px 8px', borderRadius: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{l.name}</span>
                      <span style={{ color: primary, fontWeight: 700, fontSize: '0.74rem' }}>{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Honors */}
            {honors.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: primary,
                    marginBottom: '8px',
                  }}
                >
                  🏆 {isKm ? 'ពានរង្វាន់' : 'Awards'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {honors.map((h) => (
                    <div key={h.id} style={{ fontSize: '0.78rem', background: '#fef2f2', padding: '5px 8px', borderRadius: '4px', borderLeft: `3px solid ${accent}` }}>
                      <div style={{ fontWeight: 700, color: '#991b1b' }}>{h.title}</div>
                      <div style={{ color: '#7f1d1d', fontSize: '0.72rem' }}>{h.issuer} ({h.year})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {references.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: primary,
                    marginBottom: '8px',
                  }}
                >
                  👥 {isKm ? 'បុគ្គលយោង' : 'References'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {references.map((r) => (
                    <div key={r.id} style={{ fontSize: '0.76rem', background: '#f8fafc', padding: '5px 8px', borderRadius: '4px' }}>
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
    </div>
  );
};
