import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const PhnomPenhCleanCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#2563eb';
  const textScale = settings.fontSize === 'compact' ? '0.88rem' : settings.fontSize === 'spacious' ? '1.02rem' : '0.94rem';

  return (
    <div
      className="cover-letter-template cl-phnom-penh"
      style={{
        padding: '48px 52px',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.65,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header */}
      <div style={{ borderBottom: `3px solid ${primary}`, paddingBottom: '20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {sender.khmerName && (
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: primary, fontFamily: 'Kantumruy Pro, sans-serif' }}>
                {sender.khmerName}
              </div>
            )}
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '2px 0 0 0' }}>
              {sender.fullName || 'YOUR FULL NAME'}
            </h1>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: primary, marginTop: '2px' }}>
              {sender.jobTitle || 'Job Applicant'}
            </div>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: '#64748b', marginTop: '14px' }}>
          {sender.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Phone size={13} color={primary} />
              {sender.phone}
            </span>
          )}
          {sender.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Mail size={13} color={primary} />
              {sender.email}
            </span>
          )}
          {sender.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={13} color={primary} />
              {sender.location}
            </span>
          )}
          {sender.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={13} color={primary} />
              {sender.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Date & Recipient Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>{recipient.hiringManagerName}</div>
          {recipient.department && <div style={{ color: '#64748b' }}>{recipient.department}</div>}
          <div style={{ fontWeight: 600, color: primary }}>{recipient.companyName}</div>
          {recipient.companyAddress && <div style={{ color: '#64748b' }}>{recipient.companyAddress}</div>}
        </div>

        <div style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: 500, textAlign: 'right' }}>
          {date}
        </div>
      </div>

      {/* Subject Line */}
      {subject && (
        <div
          style={{
            fontWeight: 700,
            fontSize: '1rem',
            color: '#0f172a',
            marginBottom: '20px',
            paddingBottom: '6px',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <span style={{ color: primary, marginRight: '6px' }}>RE:</span>
          {subject}
        </div>
      )}

      {/* Salutation */}
      <div style={{ fontWeight: 600, marginBottom: '16px', color: '#0f172a' }}>
        {salutation}
      </div>

      {/* Letter Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#334155', flex: 1 }}>
        {openingParagraph && <p style={{ margin: 0 }}>{openingParagraph}</p>}
        {bodyParagraph1 && <p style={{ margin: 0 }}>{bodyParagraph1}</p>}
        {bodyParagraph2 && <p style={{ margin: 0 }}>{bodyParagraph2}</p>}
        {closingParagraph && <p style={{ margin: 0 }}>{closingParagraph}</p>}
      </div>

      {/* Sign-off & Signature Line */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ color: '#334155', marginBottom: '24px' }}>{signOff}</div>
        {settings.showSignatureLine && (
          <div style={{ width: '180px', height: '1px', backgroundColor: '#cbd5e1', marginBottom: '8px' }} />
        )}
        <div style={{ fontWeight: 700, color: '#0f172a' }}>{sender.fullName}</div>
        {sender.khmerName && <div style={{ fontSize: '0.86rem', color: '#64748b' }}>{sender.khmerName}</div>}
      </div>
    </div>
  );
};
