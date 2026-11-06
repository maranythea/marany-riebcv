import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const EmeraldMinimalCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#047857';
  const textScale = settings.fontSize === 'compact' ? '0.86rem' : settings.fontSize === 'spacious' ? '1rem' : '0.92rem';

  return (
    <div
      className="cover-letter-template cl-emerald-minimal"
      style={{
        padding: '52px 56px',
        backgroundColor: '#ffffff',
        color: '#1f2937',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.68,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal Top Block */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
          {sender.fullName || 'YOUR FULL NAME'}
        </h1>
        {sender.khmerName && (
          <div style={{ fontSize: '1rem', color: primary, fontWeight: 600, fontFamily: 'Kantumruy Pro, sans-serif' }}>
            {sender.khmerName}
          </div>
        )}
        <div style={{ fontSize: '0.86rem', color: '#6b7280', marginTop: '4px' }}>
          {[sender.jobTitle, sender.location, sender.phone, sender.email].filter(Boolean).join(' • ')}
        </div>
        <div style={{ height: '1.5px', backgroundColor: primary, width: '48px', marginTop: '12px' }} />
      </div>

      {/* Date */}
      <div style={{ fontSize: '0.88rem', color: '#4b5563', marginBottom: '20px' }}>
        {date}
      </div>

      {/* Recipient Information */}
      <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '28px', lineHeight: 1.5 }}>
        <div style={{ fontWeight: 600, color: '#111827' }}>{recipient.hiringManagerName}</div>
        {recipient.department && <div>{recipient.department}</div>}
        <div style={{ fontWeight: 600, color: primary }}>{recipient.companyName}</div>
        {recipient.companyAddress && <div style={{ color: '#6b7280' }}>{recipient.companyAddress}</div>}
      </div>

      {/* Subject */}
      {subject && (
        <div style={{ fontWeight: 700, fontSize: '0.96rem', color: '#111827', marginBottom: '20px' }}>
          Subject: <span style={{ color: primary }}>{subject}</span>
        </div>
      )}

      {/* Salutation */}
      <div style={{ fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
        {salutation}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#374151', flex: 1 }}>
        {openingParagraph && <p style={{ margin: 0 }}>{openingParagraph}</p>}
        {bodyParagraph1 && <p style={{ margin: 0 }}>{bodyParagraph1}</p>}
        {bodyParagraph2 && <p style={{ margin: 0 }}>{bodyParagraph2}</p>}
        {closingParagraph && <p style={{ margin: 0 }}>{closingParagraph}</p>}
      </div>

      {/* Sign-off */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ color: '#374151', marginBottom: '28px' }}>{signOff}</div>
        {settings.showSignatureLine && (
          <div style={{ width: '160px', height: '1px', backgroundColor: '#9ca3af', marginBottom: '8px' }} />
        )}
        <div style={{ fontWeight: 700, color: '#111827' }}>{sender.fullName}</div>
      </div>
    </div>
  );
};

