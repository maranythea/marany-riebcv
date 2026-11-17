import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const StudentClassicCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#1e293b';
  const textScale = settings.fontSize === 'compact' ? '0.86rem' : settings.fontSize === 'spacious' ? '1rem' : '0.92rem';

  return (
    <div
      className="cover-letter-template cl-student-classic"
      style={{
        padding: '52px 60px',
        backgroundColor: '#ffffff',
        color: '#111827',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.62,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Big Bold Student Name Header - Exactly like Image 3 */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0',
            letterSpacing: '-0.02em',
          }}
        >
          {sender.fullName || 'Student Name'}
        </h1>

        {sender.khmerName && (
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginTop: '2px', fontFamily: 'Kantumruy Pro, sans-serif' }}>
            {sender.khmerName}
          </div>
        )}

        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#475569', marginTop: '4px' }}>
          {sender.jobTitle || 'High School Student / BacII Graduate'}
        </div>
      </div>

      {/* Two Column Address / Contact / Date Block */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid #cbd5e1',
          paddingBottom: '16px',
          marginBottom: '26px',
          fontSize: '0.88rem',
          color: '#334155',
        }}
      >
        <div>
          <div>{sender.location || 'Phnom Penh, Cambodia'}</div>
          <div style={{ marginTop: '4px', fontWeight: 600 }}>{date}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          {sender.phone && <div>Phone: {sender.phone}</div>}
          {sender.email && <div>Email: {sender.email}</div>}
          {sender.portfolio && <div style={{ color: '#2563eb' }}>{sender.portfolio}</div>}
        </div>
      </div>

      {/* Recipient Details Block */}
      <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: '#0f172a' }}>{recipient.hiringManagerName}</div>
        {recipient.department && <div>{recipient.department}</div>}
        <div style={{ fontWeight: 600, color: primary }}>{recipient.companyName}</div>
        {recipient.companyAddress && <div>{recipient.companyAddress}</div>}
      </div>

      {/* Salutation */}
      <div style={{ fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
        {salutation}
      </div>

      {/* Subject Line (if provided) */}
      {subject && (
        <div style={{ fontWeight: 700, color: primary, marginBottom: '16px' }}>
          Subject: {subject}
        </div>
      )}

      {/* Letter Body Paragraphs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#1e293b', flex: 1, textAlign: 'justify' }}>
        {openingParagraph && <p style={{ margin: 0 }}>{openingParagraph}</p>}
        {bodyParagraph1 && <p style={{ margin: 0 }}>{bodyParagraph1}</p>}
        {bodyParagraph2 && <p style={{ margin: 0 }}>{bodyParagraph2}</p>}
        {closingParagraph && <p style={{ margin: 0 }}>{closingParagraph}</p>}
      </div>

      {/* Sign-off & Enclosures */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ marginBottom: '28px', color: '#334155' }}>{signOff}</div>
        {settings.showSignatureLine && (
          <div style={{ width: '180px', height: '1px', backgroundColor: '#94a3b8', marginBottom: '8px' }} />
        )}
        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{sender.fullName}</div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '12px', fontStyle: 'italic' }}>
          Enclosures: Resume, Academic Transcripts & Certificates
        </div>
      </div>
    </div>
  );
};

