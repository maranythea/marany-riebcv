import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';
import { Award } from 'lucide-react';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const FramedInternshipCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#0f766e';
  const textScale = settings.fontSize === 'compact' ? '0.86rem' : settings.fontSize === 'spacious' ? '1rem' : '0.92rem';

  return (
    <div
      className="cover-letter-template cl-framed-internship"
      style={{
        padding: '36px',
        backgroundColor: '#ffffff',
        minHeight: '297mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Outer Border Frame - Exactly like Image 4 */}
      <div
        style={{
          border: `2px solid ${primary}`,
          borderRadius: '4px',
          padding: '40px 48px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          color: '#1e293b',
          fontSize: textScale,
          fontFamily: settings.fontFamily || "'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif",
          lineHeight: 1.62,
        }}
      >
        {/* Centered Document Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: primary,
              margin: '0 0 6px 0',
              letterSpacing: '-0.01em',
            }}
          >
            {subject || 'Request Letter for Internship Training'}
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: primary, margin: '0 auto' }} />
        </div>

        {/* Sender Info & Date Block */}
        <div style={{ marginBottom: '22px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: '#0f172a' }}>{sender.fullName}</div>
          {sender.khmerName && <div style={{ color: primary, fontWeight: 600 }}>{sender.khmerName}</div>}
          <div>{sender.jobTitle}</div>
          <div>{sender.location}</div>
          <div>{sender.email} | {sender.phone}</div>

          <div style={{ marginTop: '14px', fontWeight: 600, color: '#0f172a' }}>
            Date: {date}
          </div>
        </div>

        {/* Recipient Block */}
        <div style={{ marginBottom: '22px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: '#0f172a' }}>{recipient.hiringManagerName}</div>
          <div>{recipient.jobTitleApplied || 'Internship Coordinator'}</div>
          <div style={{ fontWeight: 600, color: primary }}>{recipient.companyName}</div>
          {recipient.department && <div>{recipient.department}</div>}
          {recipient.companyAddress && <div>{recipient.companyAddress}</div>}
        </div>

        {/* Salutation */}
        <div style={{ fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
          {salutation}
        </div>

        {/* Letter Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#1e293b', flex: 1, textAlign: 'justify' }}>
          {openingParagraph && <p style={{ margin: 0 }}>{openingParagraph}</p>}
          {bodyParagraph1 && <p style={{ margin: 0 }}>{bodyParagraph1}</p>}
          {bodyParagraph2 && <p style={{ margin: 0 }}>{bodyParagraph2}</p>}
          {closingParagraph && <p style={{ margin: 0 }}>{closingParagraph}</p>}
        </div>

        {/* Sign-off & Footer Branding */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '24px', color: '#334155' }}>{signOff}</div>
            {settings.showSignatureLine && (
              <div style={{ width: '160px', height: '1px', backgroundColor: '#94a3b8', marginBottom: '8px' }} />
            )}
            <div style={{ fontWeight: 800, color: '#0f172a' }}>{sender.fullName}</div>
          </div>

          {/* Bottom Right Verified Badge / Seal like in Image 4 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: primary, opacity: 0.85 }}>
            <Award size={28} />
            <div style={{ fontSize: '0.72rem', lineHeight: 1.2, fontWeight: 700, textTransform: 'uppercase' }}>
              Academic & Career<br />Internship Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

