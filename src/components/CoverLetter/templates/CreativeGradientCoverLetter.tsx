import React from 'react';
import type { CoverLetterData, CoverLetterSettings } from '../../../types/coverLetter';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface CoverLetterTemplateProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export const CreativeGradientCoverLetter: React.FC<CoverLetterTemplateProps> = ({ data, settings }) => {
  const { sender, recipient, date, subject, salutation, openingParagraph, bodyParagraph1, bodyParagraph2, closingParagraph, signOff } = data;
  const primary = settings.primaryColor || '#7c3aed';
  const accent = settings.accentColor || '#ec4899';
  const textScale = settings.fontSize === 'compact' ? '0.88rem' : settings.fontSize === 'spacious' ? '1.02rem' : '0.94rem';

  return (
    <div
      className="cover-letter-template cl-creative-gradient"
      style={{
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontSize: textScale,
        fontFamily: settings.fontFamily || "'Outfit', 'Kantumruy Pro', sans-serif",
        minHeight: '297mm',
        lineHeight: 1.65,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Gradient Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
          padding: '36px 52px 32px 52px',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {sender.khmerName && (
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fdf2f8', fontFamily: 'Kantumruy Pro, sans-serif' }}>
                {sender.khmerName}
              </div>
            )}
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '2px 0 0 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {sender.fullName || 'YOUR FULL NAME'}
            </h1>
            <div style={{ fontSize: '1.05rem', fontWeight: 500, color: '#e9d5ff', marginTop: '2px' }}>
              {sender.jobTitle}
            </div>
          </div>
        </div>

        {/* Contact info badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', marginTop: '16px' }}>
          {sender.phone && (
            <span style={{ backgroundColor: 'rgba(255,255,255,0.18)', padding: '3px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Phone size={12} /> {sender.phone}
            </span>
          )}
          {sender.email && (
            <span style={{ backgroundColor: 'rgba(255,255,255,0.18)', padding: '3px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Mail size={12} /> {sender.email}
            </span>
          )}
          {sender.location && (
            <span style={{ backgroundColor: 'rgba(255,255,255,0.18)', padding: '3px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={12} /> {sender.location}
            </span>
          )}
          {sender.linkedin && (
            <span style={{ backgroundColor: 'rgba(255,255,255,0.18)', padding: '3px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={12} /> {sender.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Main Body Container */}
      <div style={{ padding: '36px 52px 48px 52px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Recipient Details & Date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>{recipient.hiringManagerName}</div>
            {recipient.department && <div style={{ color: '#64748b' }}>{recipient.department}</div>}
            <div style={{ fontWeight: 600, color: primary }}>{recipient.companyName}</div>
            {recipient.companyAddress && <div style={{ color: '#64748b' }}>{recipient.companyAddress}</div>}
          </div>

          <div style={{ fontSize: '0.86rem', color: '#64748b', fontWeight: 600 }}>
            {date}
          </div>
        </div>

        {/* Subject */}
        {subject && (
          <div
            style={{
              fontWeight: 800,
              fontSize: '1.02rem',
              color: '#0f172a',
              marginBottom: '20px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#f5f3ff',
              borderLeft: `4px solid ${primary}`,
            }}
          >
            {subject}
          </div>
        )}

        {/* Salutation */}
        <div style={{ fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
          {salutation}
        </div>

        {/* Letter Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#334155', flex: 1 }}>
          {openingParagraph && <p style={{ margin: 0 }}>{openingParagraph}</p>}
          {bodyParagraph1 && <p style={{ margin: 0 }}>{bodyParagraph1}</p>}
          {bodyParagraph2 && <p style={{ margin: 0 }}>{bodyParagraph2}</p>}
          {closingParagraph && <p style={{ margin: 0 }}>{closingParagraph}</p>}
        </div>

        {/* Sign-off */}
        <div style={{ marginTop: '36px' }}>
          <div style={{ color: '#334155', marginBottom: '24px' }}>{signOff}</div>
          {settings.showSignatureLine && (
            <div style={{ width: '180px', height: '2px', background: `linear-gradient(to right, ${primary}, ${accent})`, marginBottom: '8px' }} />
          )}
          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{sender.fullName}</div>
          {sender.khmerName && <div style={{ fontSize: '0.86rem', color: '#7c3aed' }}>{sender.khmerName}</div>}
        </div>
      </div>
    </div>
  );
};

