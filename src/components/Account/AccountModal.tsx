import React, { useRef, useState } from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { TEMPLATES_CONFIG } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Crown,
  LogOut,
  CheckCircle,
  Sparkles,
  X,
  FileText,
  ShieldCheck,
  Download,
  Upload,
  Smartphone,
  Trash2,
  AlertCircle,
} from 'lucide-react';

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
  const {
    currentUser,
    savedResumes,
    logout,
    isTemplateUnlocked,
    localAccounts,
    switchAccount,
    deleteAccount,
    exportAllDataJson,
    importAllDataJson,
  } = useAuth();

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];
  const isKm = language === 'km';

  if (!isOpen || !currentUser) return null;

  const isPro = currentUser.isPro || currentUser.plan === 'pro_lifetime';
  const otherAccounts = localAccounts.filter((acc) => acc.id !== currentUser.id);

  const handleExportBackup = () => {
    const jsonStr = exportAllDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `riebcv_device_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importAllDataJson(content);
        if (success) {
          setImportStatus(isKm ? 'បានស្ដារទិន្នន័យដោយជោគជ័យ!' : 'Backup restored successfully!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus(isKm ? 'ឯកសារមិនត្រឹមត្រូវ' : 'Invalid backup JSON file.');
          setTimeout(() => setImportStatus(null), 3000);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteCurrentAccount = () => {
    const confirmText = isKm
      ? `តើអ្នកពិតជាចង់លុបគណនី "${currentUser.name}" និង CV ទាំងអស់ចេញពីឧបករណ៍នេះមែនទេ?`
      : `Are you sure you want to remove account "${currentUser.name}" and its resumes from this device?`;
    if (window.confirm(confirmText)) {
      deleteAccount(currentUser.id);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '580px', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
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
                background: isPro
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: isPro ? '0 4px 12px rgba(245, 158, 11, 0.3)' : '0 4px 10px rgba(37, 99, 235, 0.25)',
              }}
            >
              {isPro ? <Crown size={22} /> : <User size={22} />}
            </div>
            <div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {currentUser.name}
                {isPro && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      backgroundColor: '#f59e0b',
                      color: '#fff',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                  >
                    PRO 👑
                  </span>
                )}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '999px', padding: '6px 8px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* On-Device Privacy Banner */}
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#10b981" />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: '#059669' }}>
                  {isKm ? 'ទីតាំងផ្ទុកទិន្នន័យ៖ ' : 'Storage Location: '}
                </strong>
                {isKm ? 'ឧបករណ៍នេះ (LocalStorage)' : 'This Device (LocalStorage)'}
              </div>
            </div>
            <span
              style={{
                fontSize: '0.68rem',
                backgroundColor: '#10b981',
                color: '#fff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              100% PRIVATE
            </span>
          </div>

          {importStatus && (
            <div
              style={{
                backgroundColor: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} color="#16a34a" />
              <span>{importStatus}</span>
            </div>
          )}

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
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {t.pricing.currentPlan}
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: isPro ? '#d97706' : 'var(--text-primary)',
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
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
                  ? 'គាំទ្រម៉ូដស្តង់ដារឥតគិតថ្លៃ និងលិខិតអមឥតគិតថ្លៃទាំងអស់'
                  : 'Includes free standard templates & free Cover Letter tools'}
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
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <FileText size={20} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {savedResumes.length}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  {isKm ? 'CV ដែលបានរក្សាទុក' : 'Saved Resumes'}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <CheckCircle size={20} color="#10b981" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isPro
                    ? TEMPLATES_CONFIG.length
                    : TEMPLATES_CONFIG.filter((tpl) => isTemplateUnlocked(tpl.id)).length}{' '}
                  / {TEMPLATES_CONFIG.length}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  {isKm ? 'ម៉ូដ CV បានដោះសោ' : 'Unlocked Templates'}
                </div>
              </div>
            </div>
          </div>

          {/* Other Profiles On This Device */}
          {otherAccounts.length > 0 && (
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Smartphone size={13} />
                <span>{isKm ? 'ប្តូរទៅគណនីផ្សេងលើឧបករណ៍នេះ' : 'Switch To Another Account On This Device'}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {otherAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '999px',
                          backgroundColor: acc.isPro ? '#f59e0b' : 'var(--primary)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                        }}
                      >
                        {acc.isPro ? <Crown size={13} /> : acc.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {acc.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {acc.email}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => switchAccount(acc.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                    >
                      {isKm ? 'ប្តូរ' : 'Switch'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backup & Restore Tools */}
          <div
            style={{
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {isKm ? 'ការបម្រុងទុក & ស្ដារទិន្នន័យ (Device Backup)' : 'Device Backup & Restore (JSON)'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={handleExportBackup}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'center', fontSize: '0.78rem' }}
              >
                <Download size={14} />
                <span>{isKm ? 'ទាញយក Backup (JSON)' : 'Export Backup'}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'center', fontSize: '0.78rem' }}
              >
                <Upload size={14} />
                <span>{isKm ? 'ស្ដារទិន្នន័យ (Restore)' : 'Import Backup'}</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Danger Zone: Sign Out & Delete */}
          <div
            style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={handleDeleteCurrentAccount}
              className="btn btn-secondary btn-sm"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', fontSize: '0.75rem' }}
              title="Delete account and resumes from this device"
            >
              <Trash2 size={13} />
              <span>{isKm ? 'លុបគណនីពីឧបករណ៍' : 'Delete From Device'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--text-secondary)' }}
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
