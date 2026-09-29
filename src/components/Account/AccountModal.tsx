import React from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { TEMPLATES_CONFIG } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import { User, Crown, LogOut, CheckCircle, Sparkles, X, FileText, ShieldCheck } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
  onOpenUpgrade: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  language,
  onClose,
  onOpenUpgrade,
}) => {
  const { currentUser, savedResumes, logout, isTemplateUnlocked } = useAuth();
  const t = translations[language];
  const isKm = language === 'km';

  if (!isOpen || !currentUser) return null;

  const isPro = currentUser.isPro || currentUser.plan === 'pro_lifetime';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            background: isPro
              ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: isPro ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              {isPro ? <Crown size={22} /> : <User size={22} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {currentUser.name}
                {isPro && (
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#f59e0b', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    PRO 👑
                  </span>
                )}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{currentUser.email}</p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '999px', padding: '6px 8px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Membership Status Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-app)',
              border: `1.5px solid ${isPro ? '#f59e0b' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {t.pricing.currentPlan}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isPro ? '#d97706' : 'var(--text-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isPro ? (
                  <>
                    <Crown size={18} color="#f59e0b" />
                    <span>{isKm ? 'សមាជិក PRO ពេញមួយជីវិត' : 'PRO Lifetime Member'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} color="var(--primary)" />
                    <span>{isKm ? 'គម្រោងសិស្សឥតគិតថ្លៃ (Free)' : 'Student Free Plan'}</span>
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {isPro
                  ? isKm
                    ? 'អ្នកអាចប្រើប្រាស់ម៉ូដ CV ពិសេសទាំងអស់ និងរក្សាទុក CV មិនកំណត់'
                    : 'Unlimited access to all premium templates & saved resumes'
                  : isKm
                  ? 'គាំទ្រម៉ូដស្តង់ដារឥតគិតថ្លៃ ២'
                  : 'Includes standard free templates'}
              </div>
            </div>

            {!isPro && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenUpgrade();
                }}
                className="btn btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  color: '#ffffff',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                }}
              >
                <Sparkles size={14} />
                <span>{t.pricing.upgradeNow}</span>
              </button>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{savedResumes.length}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{isKm ? 'CV ដែលបានរក្សាទុក' : 'Saved Resumes'}</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="#10b981" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isPro ? TEMPLATES_CONFIG.length : TEMPLATES_CONFIG.filter((tpl) => isTemplateUnlocked(tpl.id)).length} / {TEMPLATES_CONFIG.length}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{isKm ? 'ម៉ូដ CV បានដោះសោ' : 'Unlocked Templates'}</div>
              </div>
            </div>
          </div>

          {/* Unlocked Templates List */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {isKm ? 'ស្ថានភាពម៉ូដ CV របស់អ្នក៖' : 'Template Access Status:'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {TEMPLATES_CONFIG.map((tpl) => {
                const unlocked = isTemplateUnlocked(tpl.id);
                return (
                  <div
                    key={tpl.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {isKm ? tpl.nameKm : tpl.nameEn}
                    </span>

                    {unlocked ? (
                      <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={13} /> {t.unlockedBadge}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenUpgrade();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f59e0b',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        {t.lockedBadge} — {isKm ? 'ដោះសោ' : 'Unlock ($1.99)'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sign Out Button */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="btn btn-secondary btn-sm"
              style={{ color: '#ef4444' }}
            >
              <LogOut size={14} />
              <span>{t.auth.signOut}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
