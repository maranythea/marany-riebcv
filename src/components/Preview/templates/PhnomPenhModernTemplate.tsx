import React from 'react';
import type { CvData, CvSettings } from '../../../types/cv';
import { Mail, Phone, MapPin, Send, Globe, BookOpen, Briefcase, UserCheck, Star, Award } from 'lucide-react';

interface TemplateProps {
  data: CvData;
  settings: CvSettings;
}

export const PhnomPenhModernTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo, objective, education, experiences, skills, languages, honors, references } = data;
  const primary = settings.primaryColor || '#1e40af';
  const isKm = settings.language === 'km';

  const textScale = settings.fontSize === 'compact' ? '0.82rem' : settings.fontSize === 'spacious' ? '0.95rem' : '0.88rem';
  const titleScale = settings.fontSize === 'compact' ? '1.4rem' : settings.fontSize === 'spacious' ? '1.8rem' : '1.6rem';

  return (
    <div
      className="cv-template phnom-penh-modern"
      style={{
        display: 'flex',
        minHeight: '297mm',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontSize: textScale,
        fontFamily: settings.fontFamily || 'Outfit, Kantumruy Pro, sans-serif',
        lineHeight: 1.45,
      }}
    >
      {/* Left Sidebar (34% width) */}
      <div
        style={{
          width: '34%',
          backgroundColor: '#f8fafc',
          borderRight: `2px solid ${primary}20`,
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Photo Container */}
        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              style={{
                width: '110px',
                height: '110px',
                objectFit: 'cover',
                borderRadius:
                  personalInfo.photoShape === 'circle'
                    ? '999px'
                    : personalInfo.photoShape === 'rounded'
                    ? '14px'
                    : '4px',
                border: `3px solid ${primary}`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        )}

        {/* Contact Info */}
        <div>
          <h3
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: primary,
              borderBottom: `1.5px solid ${primary}40`,
              paddingBottom: '4px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MapPin size={14} />
            {isKm ? 'ទំនាក់ទំនង' : 'Contact'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            {personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
                <Phone size={13} color={primary} style={{ flexShrink: 0 }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
                <Mail size={13} color={primary} style={{ flexShrink: 0 }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={13} color={primary} style={{ flexShrink: 0 }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.telegram && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={13} color={primary} style={{ flexShrink: 0 }} />
                <span>{personalInfo.telegram}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
                <Globe size={13} color={primary} style={{ flexShrink: 0 }} />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
                <Globe size={13} color={primary} style={{ flexShrink: 0 }} />
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education & BacII in sidebar */}
        {education.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1.5px solid ${primary}40`,
                paddingBottom: '4px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <BookOpen size={14} />
              {isKm ? 'ការអប់រំ & បាក់ឌុប' : 'Education'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ color: primary, fontWeight: 600 }}>{edu.institution}</div>
                  
                  {/* BacII Grade Badge */}
                  {edu.isBacII && edu.bacGrade && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                      <span
                        style={{
                          backgroundColor: primary,
                          color: '#ffffff',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        {isKm ? `និទ្ទេស ${edu.bacGrade}` : `BacII Grade ${edu.bacGrade}`}
                      </span>
                      {edu.bacStream && (
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          ({edu.bacStream})
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {edu.startDate} – {edu.current ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : edu.endDate}
                  </div>
                  {edu.scoreOrGpa && !edu.isBacII && (
                    <div style={{ fontSize: '0.75rem', color: '#475569', fontStyle: 'italic' }}>
                      {edu.scoreOrGpa}
                    </div>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul style={{ margin: '4px 0 0 14px', padding: 0, fontSize: '0.75rem', color: '#475569' }}>
                      {edu.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1.5px solid ${primary}40`,
                paddingBottom: '4px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Star size={14} />
              {isKm ? 'ជំនាញ' : 'Skills'}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '3px 7px',
                    fontSize: '0.74rem',
                    color: '#334155',
                    fontWeight: 500,
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
            <h3
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: primary,
                borderBottom: `1.5px solid ${primary}40`,
                paddingBottom: '4px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Globe size={14} />
              {isKm ? 'ភាសា' : 'Languages'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{lang.name}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: primary,
                      backgroundColor: `${primary}15`,
                      padding: '1px 6px',
                      borderRadius: '3px',
                      fontWeight: 600,
                    }}
                  >
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (66% width) */}
      <div
        style={{
          width: '66%',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Name & Title Header */}
        <div style={{ borderBottom: `2px solid ${primary}20`, paddingBottom: '14px' }}>
          {personalInfo.khmerName && (
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: primary,
                fontFamily: 'Kantumruy Pro, sans-serif',
                marginBottom: '2px',
              }}
            >
              {personalInfo.khmerName}
            </div>
          )}
          <h1
            style={{
              fontSize: titleScale,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#0f172a',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: primary,
              marginTop: '4px',
            }}
          >
            {personalInfo.jobTitle || 'High School / BacII Graduate'}
          </div>
        </div>

        {/* Objective / Summary */}
        {objective && (
          <div>
            <h2
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: primary,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <Briefcase size={16} />
              {isKm ? 'គោលបំណងការងារ' : 'Career Objective'}
            </h2>
            <p
              style={{
                color: '#334155',
                fontSize: '0.84rem',
                lineHeight: 1.55,
                margin: 0,
                textAlign: 'justify',
              }}
            >
              {objective}
            </p>
          </div>
        )}

        {/* Experience & Student Activities */}
        {experiences.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: primary,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <Briefcase size={16} />
              {isKm ? 'បទពិសោធន៍ & សកម្មភាព' : 'Experience & Activities'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                      {exp.role}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                      {exp.startDate} – {exp.current ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : exp.endDate}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1px', marginBottom: '4px' }}>
                    <span style={{ color: primary, fontWeight: 600, fontSize: '0.82rem' }}>
                      {exp.organization}
                    </span>
                    {exp.location && (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>• {exp.location}</span>
                    )}
                    <span
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        fontSize: '0.7rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: '4px 0 0 16px', padding: 0, color: '#334155', fontSize: '0.82rem', lineHeight: 1.45 }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '3px' }}>
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

        {/* Honors & Awards */}
        {honors.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: primary,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <Award size={16} />
              {isKm ? 'ពានរង្វាន់ & សមិទ្ធផល' : 'Honors & Awards'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {honors.map((h) => (
                <div key={h.id} style={{ fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{h.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{h.year}</span>
                  </div>
                  <div style={{ color: primary, fontSize: '0.78rem', fontWeight: 600 }}>{h.issuer}</div>
                  {h.description && <div style={{ color: '#475569', fontSize: '0.78rem', marginTop: '1px' }}>{h.description}</div>}
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
                fontSize: '0.92rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: primary,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <UserCheck size={16} />
              {isKm ? 'បុគ្គលយោង' : 'References'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {references.map((ref) => (
                <div
                  key={ref.id}
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{ref.name}</div>
                  <div style={{ color: primary, fontWeight: 600 }}>{ref.role}</div>
                  <div style={{ color: '#64748b', fontSize: '0.74rem' }}>{ref.organization}</div>
                  {ref.phone && <div style={{ color: '#334155', marginTop: '3px' }}>📞 {ref.phone}</div>}
                  {ref.email && <div style={{ color: '#334155' }}>✉️ {ref.email}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
