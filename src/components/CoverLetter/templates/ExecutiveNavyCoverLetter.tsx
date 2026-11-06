import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';
import { Mail, Phone, MapPin, Globe, Award } from 'lucide-react';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const ExecutiveNavyCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#0f172a';
  const textScale = settings.fontSize === 'compact' ? '0.88rem' : settings.fontSize === 'spacious' ? '1.02rem' : '0.94rem';

  return (
    <div
      className="cover-letter-template cl-executive-navy"
      style={{
        padding: '50px 54px',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Plus Jakarta Sans', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.68,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Executive Letterhead Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${primary}`, paddingBottom: '22px', marginBottom: '26px' }}>
        <div>
          {sender.khmerName && (
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e40af', fontFamily: 'Kantumruy Pro, sans-serif' }}>
              {sender.khmerName}
            </div>
          )}
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0', letterSpacing: '-0.02em' }}>
            {sender.fullName || 'YOUR FULL NAME'}
          </h1>
          <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '2px' }}>
            {sender.jobTitle}
          </div>
        </div>

        {/* Executive Monogram Badge */}
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: primary,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(15,23,42,0.25)',
          }}
        >
          <Award size={24} color="#60a5fa" />
        </div>
      </div>

      {/* Contact Line */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '18px',
          fontSize: '0.82rem',
          color: '#475569',
          padding: '8px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginBottom: '26px',
        }}
      >
        {sender.phone && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Phone size={13} color="#2563eb" /> {sender.phone}
          </span>
        )}
        {sender.email && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Mail size={13} color="#2563eb" /> {sender.email}
          </span>
        )}
        {sender.location && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={13} color="#2563eb" /> {sender.location}
          </span>
        )}
        {sender.linkedin && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Globe size={13} color="#2563eb" /> {sender.linkedin}
          </span>
        )}
      </div>

      {/* Recipient Details & Date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.96rem' }}>{recipient.hiringManagerName}</div>
          {recipient.department && <div style={{ color: '#64748b' }}>{recipient.department}</div>}
          <div style={{ fontWeight: 700, color: '#1e40af' }}>{recipient.companyName}</div>
          {recipient.companyAddress && <div style={{ color: '#64748b' }}>{recipient.companyAddress}</div>}
        </div>

        <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
          {date}
        </div>
      </div>

      {/* Subject Line */}
      {subject && (
        <div
          style={{
            fontWeight: 800,
            fontSize: '1rem',
            color: '#0f172a',
            marginBottom: '20px',
            paddingBottom: '8px',
            borderBottom: '2px solid #e2e8f0',
          }}
        >
          {subject}
        </div>
      )}

      {/* Salutation */}
      <div style={{ fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
        {salutation}
      </div>

      {/* Letter Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#334155', flex: 1 }}>
        {openingParagraph && <p style={{ margin: 0 }}>{openingParagraph}</p>}
        {bodyParagraph1 && <p style={{ margin: 0 }}>{bodyParagraph1}</p>}
        {bodyParagraph2 && <p style={{ margin: 0 }}>{bodyParagraph2}</p>}
        {closingParagraph && <p style={{ margin: 0 }}>{closingParagraph}</p>}
      </div>

      {/* Sign-off & Seal */}
      <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ color: '#334155', marginBottom: '24px' }}>{signOff}</div>
          {settings.showSignatureLine && (
            <div style={{ width: '180px', height: '1.5px', backgroundColor: '#0f172a', marginBottom: '8px' }} />
          )}
          <div style={{ fontWeight: 800, color: '#0f172a' }}>{sender.fullName}</div>
          {sender.khmerName && <div style={{ fontSize: '0.86rem', color: '#475569' }}>{sender.khmerName}</div>}
        </div>

        <div style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'right', fontStyle: 'italic' }}>
          Official Application Document
        </div>
      </div>
    </div>
  );
};
