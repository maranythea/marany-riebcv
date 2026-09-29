import React from 'react';
import type { CvData, CvSettings } from '../../../types/cv';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

interface TemplateProps {
  data: CvData;
  settings: CvSettings;
}

export const EmeraldMinimalTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo, objective, education, experiences, skills, languages, honors, references } = data;
  const primary = settings.primaryColor || '#047857';
  const isKm = settings.language === 'km';
  const textScale = settings.fontSize === 'compact' ? '0.82rem' : settings.fontSize === 'spacious' ? '0.95rem' : '0.88rem';

  return (
    <div
      className="cv-template emerald-minimal"
      style={{
        padding: '32px 36px',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.48,
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2.5px solid ${primary}`, paddingBottom: '16px', marginBottom: '18px' }}>
        <div>
          {personalInfo.khmerName && (
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: primary, fontFamily: 'Kantumruy Pro, sans-serif' }}>
              {personalInfo.khmerName}
            </div>
          )}
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            {personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: primary, marginTop: '2px' }}>
            {personalInfo.jobTitle || 'BacII Graduate'}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
            {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} color={primary} />{personalInfo.phone}</span>}
            {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} color={primary} />{personalInfo.email}</span>}
            {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} color={primary} />{personalInfo.location}</span>}
            {personalInfo.telegram && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Send size={12} color={primary} />{personalInfo.telegram}</span>}
            {personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} color={primary} />{personalInfo.linkedin}</span>}
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
              borderRadius: personalInfo.photoShape === 'circle' ? '999px' : personalInfo.photoShape === 'rounded' ? '12px' : '4px',
              border: `2px solid ${primary}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          />
        )}
      </div>

      {/* Main Content Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Objective */}
        {objective && (
          <div>
            <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '6px' }}>
              {isKm ? 'គោលបំណងការងារ' : 'Professional Summary'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#334155', lineHeight: 1.55 }}>
              {objective}
            </p>
          </div>
        )}

        {/* Education & BacII */}
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '8px' }}>
              {isKm ? 'កម្រិតវប្បធម៌ & លទ្ធផលបាក់ឌុប' : 'Education'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>{edu.degree}</span>
                      {edu.fieldOfStudy && <span style={{ color: '#475569', fontSize: '0.84rem' }}> — {edu.fieldOfStudy}</span>}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {edu.startDate} – {edu.current ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : edu.endDate}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ color: primary, fontWeight: 600, fontSize: '0.82rem' }}>{edu.institution}</span>
                    {edu.location && <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({edu.location})</span>}
                    {edu.isBacII && edu.bacGrade && (
                      <span style={{ backgroundColor: `${primary}15`, color: primary, padding: '1px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {isKm ? `និទ្ទេស ${edu.bacGrade}` : `BacII Grade: ${edu.bacGrade}`}
                      </span>
                    )}
                  </div>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul style={{ margin: '3px 0 0 16px', padding: 0, fontSize: '0.8rem', color: '#475569' }}>
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

        {/* Experiences */}
        {experiences.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '8px' }}>
              {isKm ? 'បទពិសោធន៍ & សកម្មភាពសង្គម' : 'Experience & Activities'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>{exp.role}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {exp.startDate} – {exp.current ? (isKm ? 'បច្ចុប្បន្ន' : 'Present') : exp.endDate}
                    </span>
                  </div>
                  <div style={{ color: primary, fontWeight: 600, fontSize: '0.82rem', marginBottom: '3px' }}>
                    {exp.organization} {exp.location ? `• ${exp.location}` : ''} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({exp.type})</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: '2px 0 0 16px', padding: 0, fontSize: '0.81rem', color: '#334155' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages in Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '18px' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '8px' }}>
                {isKm ? 'ជំនាញ' : 'Skills & Tools'}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.map((s) => (
                  <span key={s.id} style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#1e293b', padding: '3px 8px', borderRadius: '4px', fontSize: '0.76rem', fontWeight: 500 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '8px' }}>
                {isKm ? 'ភាសា' : 'Languages'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
                {languages.map((l) => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span>
                    <span style={{ color: primary, fontSize: '0.74rem', fontWeight: 600 }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Honors & References */}
        <div style={{ display: 'grid', gridTemplateColumns: honors.length > 0 && references.length > 0 ? '1fr 1fr' : '1fr', gap: '18px' }}>
          {honors.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '8px' }}>
                {isKm ? 'ពានរង្វាន់' : 'Honors & Awards'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {honors.map((h) => (
                  <div key={h.id} style={{ fontSize: '0.78rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{h.title} ({h.year})</div>
                    <div style={{ color: primary, fontSize: '0.75rem' }}>{h.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {references.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderLeft: `3px solid ${primary}`, paddingLeft: '8px', marginBottom: '8px' }}>
                {isKm ? 'បុគ្គលយោង' : 'References'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {references.map((r) => (
                  <div key={r.id} style={{ fontSize: '0.78rem', backgroundColor: '#f8fafc', padding: '6px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
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
