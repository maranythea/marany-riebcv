import React, { useState, useRef, useEffect } from 'react';
import type { CoverLetterData, CoverLetterSettings, CoverLetterTemplateId } from '../../types/coverLetter';
import { COVER_LETTER_TEMPLATES_CONFIG } from '../../types/coverLetter';
import { useAuth } from '../../context/AuthContext';
import { PhnomPenhCleanCoverLetter } from './templates/PhnomPenhCleanCoverLetter';
import { EmeraldMinimalCoverLetter } from './templates/EmeraldMinimalCoverLetter';
import { AngkorGoldCoverLetter } from './templates/AngkorGoldCoverLetter';
import { CreativeGradientCoverLetter } from './templates/CreativeGradientCoverLetter';
import { ExecutiveNavyCoverLetter } from './templates/ExecutiveNavyCoverLetter';
import { ZoomIn, ZoomOut, Download, Printer, Lock, Crown } from 'lucide-react';
import { exportCvToPdf, printCv } from '../../utils/pdfExport';

interface CoverLetterPreviewProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
  onOpenUpgradeModal: (templateId?: CoverLetterTemplateId) => void;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  data,
  settings,
  onOpenUpgradeModal,
}) => {
  const [zoom, setZoom] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCoverLetterTemplateUnlocked } = useAuth();

  const isKm = settings.language === 'km';
  const currentConfig = COVER_LETTER_TEMPLATES_CONFIG.find((t) => t.id === settings.templateId) || COVER_LETTER_TEMPLATES_CONFIG[0];
  const isUnlocked = isCoverLetterTemplateUnlocked(settings.templateId);

  // Auto fit zoom for screen size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48;
        const a4WidthPx = 794;
        if (containerWidth < a4WidthPx) {
          const autoScale = Math.max(0.45, Math.min(1, containerWidth / a4WidthPx));
          setZoom(Number(autoScale.toFixed(2)));
        } else {
          setZoom(0.85);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.4, prev - 0.1));
  const handleResetZoom = () => setZoom(0.85);

  const handleDownloadPdf = async () => {
    if (currentConfig.isPro && !isUnlocked) {
      onOpenUpgradeModal(settings.templateId);
      return;
    }
    setIsExporting(true);
    const safeName = data.sender.fullName.trim().replace(/\s+/g, '_') || 'My_Cover_Letter';
    await exportCvToPdf('cover-letter-a4-document', `${safeName}_Cover_Letter.pdf`);
    setIsExporting(false);
  };

  const renderTemplate = () => {
    switch (settings.templateId) {
      case 'cl-emerald-minimal':
        return <EmeraldMinimalCoverLetter data={data} settings={settings} />;
      case 'cl-angkor-gold':
        return <AngkorGoldCoverLetter data={data} settings={settings} />;
      case 'cl-creative-gradient':
        return <CreativeGradientCoverLetter data={data} settings={settings} />;
      case 'cl-executive-navy':
        return <ExecutiveNavyCoverLetter data={data} settings={settings} />;
      case 'cl-phnom-penh-clean':
      default:
        return <PhnomPenhCleanCoverLetter data={data} settings={settings} />;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Floating Toolbar */}
      <div
        className="preview-toolbar no-print"
        style={{
          position: 'sticky',
          top: '12px',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '8px 16px',
          borderRadius: '999px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          color: '#ffffff',
          marginBottom: '20px',
        }}
      >
        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={handleZoomOut}
            className="btn btn-sm"
            style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>

          <span
            onClick={handleResetZoom}
            style={{ fontSize: '0.78rem', minWidth: '42px', textAlign: 'center', cursor: 'pointer', fontWeight: 600 }}
          >
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            className="btn btn-sm"
            style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Print & Download */}
        <button
          type="button"
          onClick={printCv}
          className="btn btn-sm"
          style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
        >
          <Printer size={14} />
          <span>{isKm ? 'ព្រីន' : 'Print'}</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="btn btn-sm btn-primary"
          style={{ padding: '6px 16px', fontWeight: 700 }}
        >
          {isExporting ? (
            <span>{isKm ? 'កំពុងទាញយក...' : 'Exporting...'}</span>
          ) : currentConfig.isPro && !isUnlocked ? (
            <>
              <Lock size={14} />
              <span>{isKm ? 'ដោះសោដើម្បីទាញយក' : 'Unlock PRO PDF'}</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>{isKm ? 'ទាញយក PDF' : 'Download PDF'}</span>
            </>
          )}
        </button>
      </div>

      {/* Lock Notice Banner for PRO templates */}
      {currentConfig.isPro && !isUnlocked && (
        <div
          onClick={() => onOpenUpgradeModal(settings.templateId)}
          style={{
            marginBottom: '16px',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '999px',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f59e0b',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Crown size={14} />
          <span>
            {isKm
              ? `ម៉ូដ "${currentConfig.nameKm}" គឺសម្រាប់សមាជិក PRO - ចុចដើម្បីដោះសោ`
              : `"${currentConfig.nameEn}" is a PRO theme - Click here to unlock`}
          </span>
        </div>
      )}

      {/* A4 Sheet Container */}
      <div
        id="cover-letter-a4-document"
        className="a4-page-wrapper"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          marginBottom: '40px',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
