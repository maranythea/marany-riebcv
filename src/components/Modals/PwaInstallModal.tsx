import React, { useState, useEffect } from 'react';
import type { LanguageCode } from '../../types/cv';
import { Smartphone, Download, X, Share2, PlusSquare, MoreVertical, Monitor, CheckCircle } from 'lucide-react';
import { triggerConfetti } from '../../utils/pdfExport';

interface PwaInstallModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android' | 'desktop'>('ios');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const isKm = language === 'km';

  // Detect platform automatically
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setActivePlatform('ios');
    } else if (/android/i.test(userAgent)) {
      setActivePlatform('android');
    } else {
      setActivePlatform('desktop');
    }

    // Capture beforeinstallprompt if browser supports it
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        triggerConfetti();
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 10px rgba(37,99,235,0.3)',
              }}
            >
              <Smartphone size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {isKm ? 'ដំឡើងកម្មវិធី RiebCV (PWA)' : 'Install RiebCV App (PWA)'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {isKm ? 'ប្រើប្រាស់ដូចកម្មវិធីទូរស័ព្ទពិតៗ ដំណើរការរហ័ស និងមិនបាច់ទាញយកពី App Store' : 'Install directly to your Home Screen for fast, offline-ready access'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '999px', padding: '6px 8px' }}>
            <X size={16} />
          </button>
        </div>

        {/* 1-Click Install Button if supported */}
        {deferredPrompt && (
          <div style={{ padding: '16px 24px 0 24px' }}>
            <button
              type="button"
              onClick={handleInstallClick}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontWeight: 800, fontSize: '0.95rem' }}
            >
              <Download size={18} />
              <span>{isKm ? '📲 ចុចដំឡើងកម្មវិធីឥឡូវនេះ (1-Click Install)' : '📲 Click to Install App Now'}</span>
            </button>
          </div>
        )}

        {/* Platform Tabs */}
        <div style={{ display: 'flex', padding: '16px 24px 0 24px', gap: '8px', borderBottom: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setActivePlatform('ios')}
            className={`btn btn-sm ${activePlatform === 'ios' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '8px', borderRadius: '8px 8px 0 0' }}
          >
            🍎 iPhone / iPad
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform('android')}
            className={`btn btn-sm ${activePlatform === 'android' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '8px', borderRadius: '8px 8px 0 0' }}
          >
            🤖 Android
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform('desktop')}
            className={`btn btn-sm ${activePlatform === 'desktop' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '8px', borderRadius: '8px 8px 0 0' }}
          >
            💻 PC / Mac
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isInstalled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#047857', fontWeight: 700, fontSize: '0.85rem' }}>
              <CheckCircle size={18} />
              <span>{isKm ? 'កម្មវិធីត្រូវបានដំឡើងរួចរាល់លើឧបករណ៍របស់អ្នក!' : 'RiebCV is already installed on your device!'}</span>
            </div>
          )}

          {activePlatform === 'ios' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {isKm ? 'បើក RiebCV ក្នុង Safari' : 'Open RiebCV in Safari'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {isKm ? 'ត្រូវប្រាកដថាអ្នកកំពុងបើកក្នុងកម្មវិធី Safari (មិនមែនក្នុង Chrome ឬ Facebook Browser ទេ)' : 'Make sure you are using Safari browser on your iOS device'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isKm ? 'ចុចប៊ូតុងចែករំលែក' : 'Tap the Share Button'} <Share2 size={15} color="var(--primary)" />
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {isKm ? 'ប៊ូតុងរាងការ៉េមានព្រួញចង្អុលឡើងលើ នៅចំកណ្ដាលរបារខាងក្រោមនៃអេក្រង់' : 'Located at the bottom of the Safari screen (square with arrow pointing up)'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isKm ? 'ជ្រើសរើស "Add to Home Screen"' : 'Select "Add to Home Screen"'} <PlusSquare size={15} color="var(--primary)" />
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {isKm ? 'អូសចុះក្រោមបន្តិច រួចចុចពាក្យ "បន្ថែមទៅអេក្រង់ដើម" (Add to Home Screen)' : 'Scroll down the share sheet and tap "Add to Home Screen"'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  4
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {isKm ? 'ចុច "Add" (បន្ថែម) នៅជ្រុងខាងស្ដាំលើ' : 'Tap "Add" at the top-right corner'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {isKm ? 'Icon កម្មវិធី RiebCV នឹងបង្ហាញលើអេក្រង់ទូរស័ព្ទរបស់អ្នកភ្លាមៗ!' : 'RiebCV will now appear directly on your Home Screen as an app!'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePlatform === 'android' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isKm ? 'ចុចសញ្ញាចុច ៣ (Menu)' : 'Tap the three-dots menu (⋮)'} <MoreVertical size={15} color="var(--primary)" />
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {isKm ? 'នៅជ្រុងខាងស្ដាំលើនៃកម្មវិធី Google Chrome ឬ Brave' : 'Located in the top-right corner of Google Chrome or your Android browser'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isKm ? 'ជ្រើសរើស "Install app" ឬ "Add to Home screen"' : 'Select "Install app" or "Add to Home screen"'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {isKm ? 'ចុច "ដំឡើងកម្មវិធី" ដើម្បីឱ្យប្រព័ន្ធបន្ថែម App ដោយស្វ័យប្រវត្តិ' : 'Tap Install and confirm the system dialog'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePlatform === 'desktop' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  <Monitor size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {isKm ? 'ដំឡើងលើកុំព្យូទ័រ Chrome ឬ Edge' : 'Install on Chrome or Edge'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px', lineHeight: 1.5 }}>
                    {isKm
                      ? 'មើលទៅរបារអាសយដ្ឋាន URL ខាងស្ដាំ រួចចុច Icon កុំព្យូទ័រដែលមានសញ្ញាព្រួញចុះក្រោម (Install) ដើម្បីបើកជាផ្ទាំង App ផ្ទាល់ខ្លួន។'
                      : 'Look at the right side of your browser address bar and click the Install icon (computer screen with a down arrow).'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

