import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const AngkorGoldCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#b45309';
  const textScale = settings.fontSize === 'compact' ? '0.88rem' : settings.fontSize === 'spacious' ? '1.02rem' : '0.94rem';

  return (
    <div
      className="cover-letter-template cl-angkor-gold"
      style={{
        padding: '48px 52px',
        backgroundColor: '#fffdf9',
        color: '#292524',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Playfair Display', 'Kantumruy Pro', serif",
        minHeight: '297mm',
        lineHeight: 1.7,
        border: '1px solid #fde68a',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Decorative Gold Inner Border Frame */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          bottom: '16px',
          border: '1px solid rgba(217, 119, 6, 0.25)',
          pointerEvents: 'none',
        }}
      />

      {/* Royal Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px double #d97706', paddingBottom: '22px', marginBottom: '26px' }}>
        <div style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, fontWeight: 700, marginBottom: '4px' }}>
          ✦ Kingdom of Cambodia ✦
        </div>

        {sender.khmerName && (
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#78350f', fontFamily: 'Kantumruy Pro, sans-serif' }}>
            {sender.khmerName}
          </div>
        )}

        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#1c1917', margin: '2px 0 4px 0', letterSpacing: '-0.01em' }}>
          {sender.fullName || 'YOUR FULL NAME'}
        </h1>

        <div style={{ fontSize: '1rem', fontStyle: 'italic', color: primary }}>
          {sender.jobTitle}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: '#57534e', marginTop: '10px' }}>
          {[sender.phone, sender.email, sender.location, sender.linkedin].filter(Boolean).map((info, idx) => (
            <span key={idx}>
              {idx > 0 && <span style={{ marginRight: '14px', color: '#d97706' }}>•</span>}
              {info}
            </span>
          ))}
        </div>
      </div>

      {/* Date & Recipient Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.92rem', color: '#44403c', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: '#1c1917' }}>{recipient.hiringManagerName}</div>
          {recipient.department && <div>{recipient.department}</div>}
          <div style={{ fontWeight: 700, color: primary }}>{recipient.companyName}</div>
          {recipient.companyAddress && <div style={{ color: '#78716c' }}>{recipient.companyAddress}</div>}
        </div>

        <div style={{ fontSize: '0.9rem', color: '#78716c', fontStyle: 'italic' }}>
          {date}
        </div>
      </div>

      {/* Subject */}
      {subject && (
        <div
          style={{
            fontWeight: 800,
            fontSize: '1.02rem',
            color: '#1c1917',
            marginBottom: '20px',
            padding: '8px 14px',
            backgroundColor: 'rgba(251, 191, 36, 0.12)',
            borderLeft: `4px solid ${primary}`,
          }}
        >
          {subject}
        </div>
      )}

      {/* Salutation */}
      <div style={{ fontWeight: 700, marginBottom: '16px', color: '#1c1917' }}>
        {salutation}
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#292524', flex: 1 }}>
        {openingParagraph && <p style={{ margin: 0, textIndent: '1.5em' }}>{openingParagraph}</p>}
        {bodyParagraph1 && <p style={{ margin: 0, textIndent: '1.5em' }}>{bodyParagraph1}</p>}
        {bodyParagraph2 && <p style={{ margin: 0, textIndent: '1.5em' }}>{bodyParagraph2}</p>}
        {closingParagraph && <p style={{ margin: 0, textIndent: '1.5em' }}>{closingParagraph}</p>}
      </div>

      {/* Sign-off */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ color: '#44403c', marginBottom: '32px' }}>{signOff}</div>
        {settings.showSignatureLine && (
          <div style={{ width: '190px', height: '1px', backgroundColor: '#d97706', marginBottom: '8px' }} />
        )}
        <div style={{ fontWeight: 800, color: '#1c1917' }}>{sender.fullName}</div>
        {sender.khmerName && <div style={{ fontSize: '0.88rem', color: '#78350f' }}>{sender.khmerName}</div>}
      </div>
    </div>
  );
};

