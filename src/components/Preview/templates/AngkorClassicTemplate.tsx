import React from 'react';
import type { CvData, CvSettings } from '../../../types/cv';

interface TemplateProps {
  data: CvData;
  settings: CvSettings;
}

export const AngkorClassicTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo, objective, education, experiences, skills, languages, honors, references } = data;
  const primary = settings.primaryColor || '#7c2d12'; // Angkor Crimson/Amber
  const isKm = settings.language === 'km';

  const textScale = settings.fontSize === 'compact' ? '0.82rem' : settings.fontSize === 'spacious' ? '0.95rem' : '0.88rem';

  return (
    <div
      className="cv-template angkor-classic"
      style={{
        padding: '36px 36px',
        backgroundColor: '#ffffff',
        color: '#1c1917',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Playfair Display', 'Kantumruy Pro', serif",
        minHeight: '297mm',
        lineHeight: 1.5,
      }}
    >
      {/* Header Container */}
      <div style={{ textAlign: 'center', borderBottom: `2px double ${primary}`, paddingBottom: '16px', marginBottom: '16px' }}>
        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              style={{
                width: '95px',
                height: '95px',
                objectFit: 'cover',
                borderRadius: personalInfo.photoShape === 'circle' ? '999px' : personalInfo.photoShape === 'rounded' ? '12px' : '2px',
                border: `2px solid ${primary}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            />
          </div>
        )}

        {personalInfo.khmerName && (
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: primary, fontFamily: 'Kantumruy Pro, sans-serif' }}>
            {personalInfo.khmerName}
          </div>
        )}

        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#0c0a09',
            margin: '2px 0',
          }}
        >
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>

        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: primary, letterSpacing: '0.04em' }}>
          {personalInfo.jobTitle || 'BacII Graduate / Entry-Level Candidate'}
        </div>

        {/* Horizontal Contact Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#44403c',
            marginTop: '10px',
            fontFamily: 'Kantumruy Pro, sans-serif',
          }}
        >
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.telegram && <span>✈️ {personalInfo.telegram}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Main Single Column Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Objective */}
        {objective && (
          <div>
            <h2
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1px solid ${primary}40`,
                paddingBottom: '3px',
                marginBottom: '6px',
              }}
            >
              {isKm ? 'គោលបំណងការងារ' : 'Career Objective'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#292524', textAlign: 'justify', lineHeight: 1.55 }}>
              {objective}
            </p>
          </div>
        )}

        {/* Education & BacII Section */}
        {education.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1px solid ${primary}40`,
                paddingBottom: '3px',
                marginBottom: '8px',
              }}
            >
              {isKm ? 'កម្រិតវប្បធម៌ & លទ្ធផលបាក់ឌុប' : 'Education & BacII Examination'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: '#0c0a09', fontSize: '0.88rem' }}>
                      {edu.degree} {edu.fieldOfStudy ? `— ${edu.fieldOfStudy}` : ''}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#57534e', fontStyle: 'italic' }}>
                      {edu.startDate} – {edu.current ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : edu.endDate}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1px' }}>
                    <span style={{ color: primary, fontWeight: 600, fontSize: '0.82rem' }}>{edu.institution}</span>
                    {edu.location && <span style={{ color: '#78716c', fontSize: '0.75rem' }}>({edu.location})</span>}
                    {edu.isBacII && edu.bacGrade && (
                      <span
                        style={{
                          backgroundColor: `${primary}18`,
                          color: primary,
                          border: `1px solid ${primary}40`,
                          padding: '1px 6px',
                          borderRadius: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        {isKm ? `និទ្ទេស ${edu.bacGrade}` : `BacII Grade: ${edu.bacGrade}`}
                      </span>
                    )}
                  </div>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul style={{ margin: '3px 0 0 16px', padding: 0, fontSize: '0.8rem', color: '#44403c' }}>
                      {edu.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience & Activities */}
        {experiences.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1px solid ${primary}40`,
                paddingBottom: '3px',
                marginBottom: '8px',
              }}
            >
              {isKm ? 'បទពិសោធន៍ការងារ & សកម្មភាពសង្គម' : 'Experience & Leadership Activities'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: '#0c0a09', fontSize: '0.88rem' }}>
                      {exp.role} <span style={{ fontWeight: 400, color: '#78716c' }}>({exp.type})</span>
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#57534e', fontStyle: 'italic' }}>
                      {exp.startDate} – {exp.current ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : exp.endDate}
                    </span>
                  </div>

                  <div style={{ color: primary, fontWeight: 600, fontSize: '0.82rem', marginBottom: '3px' }}>
                    {exp.organization} {exp.location ? `• ${exp.location}` : ''}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: '2px 0 0 16px', padding: 0, fontSize: '0.81rem', color: '#292524' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '2px' }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: primary,
                  borderBottom: `1px solid ${primary}40`,
                  paddingBottom: '3px',
                  marginBottom: '8px',
                }}
              >
                {isKm ? 'ជំនាញ & សមត្ថភាព' : 'Core Skills'}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      backgroundColor: '#f5f5f4',
                      border: '1px solid #d6d3d1',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#1c1917',
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: primary,
                  borderBottom: `1px solid ${primary}40`,
                  paddingBottom: '3px',
                  marginBottom: '8px',
                }}
              >
                {isKm ? 'ភាសា' : 'Languages'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
                {languages.map((l) => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span>
                    <span style={{ color: '#57534e', fontStyle: 'italic' }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Honors & Awards */}
        {honors.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1px solid ${primary}40`,
                paddingBottom: '3px',
                marginBottom: '8px',
              }}
            >
              {isKm ? 'ពានរង្វាន់ & លិខិតសរសើរ' : 'Honors & Achievements'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {honors.map((h) => (
                <div key={h.id} style={{ fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700 }}>{h.title}</span>
                    <span style={{ color: '#78716c' }}>{h.year}</span>
                  </div>
                  <div style={{ color: primary, fontSize: '0.76rem' }}>{h.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1px solid ${primary}40`,
                paddingBottom: '3px',
                marginBottom: '8px',
              }}
            >
              {isKm ? 'បុគ្គលយោង' : 'References'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' }}>
              {references.map((r) => (
                <div key={r.id} style={{ fontSize: '0.78rem', background: '#fafaf9', padding: '6px 8px', borderRadius: '4px', border: '1px solid #e7e5e4' }}>
                  <div style={{ fontWeight: 700 }}>{r.name}</div>
                  <div style={{ color: primary }}>{r.role}, {r.organization}</div>
                  {r.phone && <div>📞 {r.phone}</div>}
                  {r.email && <div>✉️ {r.email}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
