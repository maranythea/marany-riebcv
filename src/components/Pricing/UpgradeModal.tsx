import React, { useState } from 'react';
import type { LanguageCode, TemplateId } from '../../types/cv';
import { translations } from '../../data/translations';
import { TEMPLATES_CONFIG } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import { Crown, Sparkles, X, Check, QrCode, CreditCard, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  language: LanguageCode;
  selectedTemplateId?: TemplateId;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  language,
  selectedTemplateId,
  onClose,
}) => {
  const { unlockSingleTemplate, upgradeToLifetimePro } = useAuth();
  const [purchaseType, setPurchaseType] = useState<'lifetime' | 'single'>('lifetime');
  const [paymentMethod, setPaymentMethod] = useState<'khqr' | 'card'>('khqr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = translations[language].pricing;
  const isKm = language === 'km';

  if (!isOpen) return null;

  const targetTemplate = TEMPLATES_CONFIG.find((t) => t.id === selectedTemplateId) || TEMPLATES_CONFIG[2];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (purchaseType === 'lifetime') {
        upgradeToLifetimePro();
      } else {
        unlockSingleTemplate(targetTemplate.id);
      }
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(234,179,8,0.06) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              }}
            >
              <Crown size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.unlockTitle}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{t.unlockSubtitle}</p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '999px', padding: '6px 8px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '999px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                }}
              >
                <Check size={36} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                {t.paySuccessTitle}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                {t.paySuccessDesc}
              </p>
            </div>
          ) : (
            <>
              {/* Option Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                {/* Lifetime Pass Card (Recommended) */}
                <div
                  onClick={() => setPurchaseType('lifetime')}
                  style={{
                    backgroundColor: purchaseType === 'lifetime' ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-app)',
                    border: `2px solid ${purchaseType === 'lifetime' ? '#f59e0b' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '12px',
                      backgroundColor: '#f59e0b',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    BEST VALUE 👑
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Crown size={16} color="#d97706" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309' }}>
                      {t.lifetimePro}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0' }}>
                    $4.99 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>(20,000 ៛)</span>
                  </div>

                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {t.lifetimeDesc}
                  </div>
                </div>

                {/* Single Template Unlock */}
                <div
                  onClick={() => setPurchaseType('single')}
                  style={{
                    backgroundColor: purchaseType === 'single' ? 'var(--primary-light)' : 'var(--bg-app)',
                    border: `2px solid ${purchaseType === 'single' ? 'var(--primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Zap size={16} color="var(--primary)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {isKm ? `ដោះសោ ${targetTemplate.nameKm}` : targetTemplate.nameEn}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0' }}>
                    $1.99 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>(8,000 ៛)</span>
                  </div>

                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    {isKm ? 'ប្រើប្រាស់ម៉ូដដែលបានជ្រើសរើសនេះរហូត' : 'Unlock this specific template forever'}
                  </div>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('khqr')}
                    className={`btn btn-sm ${paymentMethod === 'khqr' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                  >
                    <QrCode size={15} />
                    <span>🇰🇭 KHQR (ABA, Bakong, Wing)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`btn btn-sm ${paymentMethod === 'card' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                  >
                    <CreditCard size={15} />
                    <span>Visa / Mastercard</span>
                  </button>
                </div>

                {/* KHQR Presentation Box */}
                {paymentMethod === 'khqr' ? (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      border: '2px solid #e11d48',
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    {/* Simulated KHQR Visual */}
                    <div
                      style={{
                        width: '130px',
                        height: '130px',
                        backgroundColor: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#e11d48',
                          color: '#ffffff',
                          fontWeight: 900,
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                          marginBottom: '4px',
                        }}
                      >
                        KHQR
                      </div>
                      {/* Stylized QR representation */}
                      <div style={{ width: '80px', height: '80px', backgroundColor: '#0f172a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem', textAlign: 'center', padding: '4px' }}>
                        SCAN WITH BANK APP
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ backgroundColor: '#e11d48', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          BAKONG
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                          Marany RiebCV (Official)
                        </span>
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#e11d48', margin: '4px 0' }}>
                        {purchaseType === 'lifetime' ? '$4.99 (20,000 KHR)' : '$1.99 (8,000 KHR)'}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569', lineHeight: 1.4 }}>
                        {t.khqrHint}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="Card Number (•••• •••• •••• ••••)" defaultValue="4242 •••• •••• 4242" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input type="text" className="form-input" placeholder="MM / YY" defaultValue="12/28" />
                      <input type="text" className="form-input" placeholder="CVC" defaultValue="123" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  padding: '12px',
                  boxShadow: '0 6px 18px rgba(245, 158, 11, 0.35)',
                  border: 'none',
                }}
              >
                {isProcessing ? (
                  <span>Processing KHQR Verification...</span>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>{t.simulatedPayBtn}</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
