import React, { useState, useRef, useEffect } from 'react';
import type { CvData, CvSettings, TemplateId } from '../../types/cv';
import { TEMPLATES_CONFIG } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import { PhnomPenhModernTemplate } from './templates/PhnomPenhModernTemplate';
import { AngkorClassicTemplate } from './templates/AngkorClassicTemplate';
import { EmeraldMinimalTemplate } from './templates/EmeraldMinimalTemplate';
import { CreativeGradientTemplate } from './templates/CreativeGradientTemplate';
import { TechCompactTemplate } from './templates/TechCompactTemplate';
import { ZoomIn, ZoomOut, Download, Printer, CheckCircle, Lock, Crown } from 'lucide-react';
import { exportCvToPdf, printCv } from '../../utils/pdfExport';
import { translations } from '../../data/translations';

interface CvPreviewProps {
  data: CvData;
  settings: CvSettings;
  onOpenUpgradeModal: (templateId?: TemplateId) => void;
  onUpdateSettings?: (settings: Partial<CvSettings>) => void;
}

export const CvPreview: React.FC<CvPreviewProps> = ({
  data,
  settings,
  onOpenUpgradeModal,
}) => {
  const [zoom, setZoom] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const { isTemplateUnlocked } = useAuth();
  const t = translations[settings.language];
  const isKm = settings.language === 'km';

  const currentTplConfig = TEMPLATES_CONFIG.find((t) => t.id === settings.templateId) || TEMPLATES_CONFIG[0];
  const isUnlocked = isTemplateUnlocked(settings.templateId);

  // Auto fit zoom on mount for desktop
  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth - 48;
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
    if (currentTplConfig.isPro && !isUnlocked) {
      onOpenUpgradeModal(settings.templateId);
      return;
    }
    setIsExporting(true);
    const safeName = data.personalInfo.fullName.trim().replace(/\s+/g, '_') || 'My_BacII_CV';
    await exportCvToPdf('cv-a4-document', `${safeName}_CV.pdf`);
    setIsExporting(false);
  };

  const renderTemplate = () => {
    switch (settings.templateId) {
      case 'angkor-classic':
        return <AngkorClassicTemplate data={data} settings={settings} />;
      case 'emerald-minimal':
        return <EmeraldMinimalTemplate data={data} settings={settings} />;
      case 'creative-gradient':
        return <CreativeGradientTemplate data={data} settings={settings} />;
      case 'tech-compact':
        return <TechCompactTemplate data={data} settings={settings} />;
      case 'phnom-penh-modern':
      default:
        return <PhnomPenhModernTemplate data={data} settings={settings} />;
    }
  };

  return (
    <div
      ref={previewContainerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Top Floating Control Bar */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '794px',
          marginBottom: '12px',
          backgroundColor: 'var(--bg-surface)',
          padding: '10px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          gap: '12px',
          flexWrap: 'wrap',
          zIndex: 10,
        }}
      >
        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={handleZoomOut}
            className="btn btn-secondary btn-sm"
            title="Zoom Out"
            style={{ padding: '6px 8px' }}
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, minWidth: '45px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="btn btn-secondary btn-sm"
            title="Zoom In"
            style={{ padding: '6px 8px' }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleResetZoom}
            className="btn btn-secondary btn-sm"
            title="Reset Zoom"
            style={{ fontSize: '0.75rem', padding: '6px 10px' }}
          >
            Fit
          </button>
        </div>

        {/* Template Tier Indicator */}
        {currentTplConfig.isPro ? (
          isUnlocked ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#10b981',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <CheckCircle size={14} />
              <span>PRO Template Unlocked ✓</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenUpgradeModal(settings.templateId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#ca8a04',
                fontWeight: 700,
                background: 'rgba(245, 158, 11, 0.12)',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                cursor: 'pointer',
              }}
            >
              <Crown size={14} color="#f59e0b" />
              <span>{isKm ? 'ដោះសោដើម្បីទាញយក ($1.99)' : 'Locked PRO Template — Unlock ($1.99)'}</span>
            </button>
          )
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: '#059669',
              fontWeight: 600,
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <CheckCircle size={14} />
            <span>Free Template • A4 Ready</span>
          </div>
        )}

        {/* Export Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={printCv}
            className="btn btn-secondary btn-sm"
            title="Print CV directly"
          >
            <Printer size={15} />
            <span>{t.printCv}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="btn btn-primary btn-sm"
            style={{
              background: currentTplConfig.isPro && !isUnlocked
                ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            {isExporting ? (
              <span>Rendering PDF...</span>
            ) : currentTplConfig.isPro && !isUnlocked ? (
              <>
                <Lock size={14} />
                <span>{isKm ? 'ដោះសោ & ទាញយក' : 'Unlock & Export'}</span>
              </>
            ) : (
              <>
                <Download size={15} />
                <span>{t.exportPdf}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* A4 Canvas Page Wrapper */}
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out',
          marginBottom: '40px',
          position: 'relative',
        }}
      >
        <div id="cv-a4-document" className="a4-page-wrapper">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
