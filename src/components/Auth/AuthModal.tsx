import React, { useState } from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { useAuth } from '../../context/AuthContext';
import {
  LogIn,
  UserPlus,
  X,
  Lock,
  Mail,
  User,
  Zap,
  Crown,
  Eye,
  EyeOff,
  ShieldCheck,
  Smartphone,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  language: LanguageCode;
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  language,
  initialMode = 'login',
  onClose,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { login, register, loginDemo, localAccounts, switchAccount } = useAuth();
  const t = translations[language].auth;
  const isKm = language === 'km';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'login') {
      if (!email) return;
      const res = login(email, password);
      if (res.success) {
        setSuccessMsg(isKm ? 'ចូលប្រើប្រាស់ជោគជ័យ!' : 'Signed in successfully!');
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        if (res.error === 'user_not_found') {
          setErrorMsg(
            isKm
              ? 'រកមិនឃើញគណនីជាមួយអ៊ីមែលនេះលើឧបករណ៍របស់អ្នកឡើយ។ សូមចុះឈ្មោះបង្កើតគណនីថ្មីខាងក្រោម។'
              : 'No account found on this device with this email. Please register below.'
          );
        } else if (res.error === 'invalid_password') {
          setErrorMsg(
            isKm
              ? 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវសម្រាប់គណនីលើឧបករណ៍នេះឡើយ។'
              : 'Incorrect password for this on-device account.'
          );
        } else {
          setErrorMsg(res.message || 'Login failed.');
        }
      }
    } else {
      if (!email || !name) return;
      const res = register(name, email, password);
      if (res.success) {
        setSuccessMsg(isKm ? 'បង្កើតគណនីលើឧបករណ៍នេះជោគជ័យ!' : 'Account created on this device!');
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        if (res.error === 'email_exists') {
          setErrorMsg(
            isKm
              ? 'អ៊ីមែលនេះមានគណនីលើឧបករណ៍នេះរួចហើយ។ សូមជ្រើសរើស "ចូលប្រើប្រាស់"។'
              : 'This email is already registered on this device. Please sign in.'
          );
        } else {
          setErrorMsg(res.message || 'Registration failed.');
        }
      }
    }
  };

  const handleSelectLocalAccount = (accEmail: string, accPassword?: string) => {
    setEmail(accEmail);
    if (accPassword) setPassword(accPassword);
    setErrorMsg(null);
  };

  const handleDirectSwitch = (userId: string) => {
    switchAccount(userId);
    setSuccessMsg(isKm ? 'បានប្តូរទៅគណនីនេះរួចរាល់!' : 'Switched account!');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleDemoStudent = () => {
    loginDemo('student');
    onClose();
  };

  const handleDemoPro = () => {
    loginDemo('pro');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '500px', maxHeight: '90vh' }}
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
            background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(139,92,246,0.08) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)',
              }}
            >
              {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {mode === 'login' ? t.loginTitle : t.registerTitle}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                {isKm
                  ? 'គណនី & CV របស់អ្នករក្សាទុកលើឧបករណ៍នេះ ១០០%'
                  : 'Your account & resumes are stored safely on this device'}
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

        {/* Form Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Privacy & On-Device Guarantee Badge */}
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong style={{ color: '#059669' }}>
                {isKm ? 'ឯកជនភាព ១០០% លើឧបករណ៍នេះ៖ ' : '100% On-Device Privacy: '}
              </strong>
              {isKm
                ? 'ទិន្នន័យ គណនី និងពាក្យសម្ងាត់របស់អ្នកត្រូវបានរក្សាទុកតែលើទូរស័ព្ទ/កុំព្យូទ័រនេះប៉ុណ្ណោះ គ្មានការផ្ញើទៅកាន់ Server ក្រៅឡើយ។'
                : 'Your credentials and CVs remain entirely in this device\'s local storage. Zero data leaves your browser.'}
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span>{errorMsg}</span>
                {mode === 'login' && errorMsg.includes('No account found') && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMsg(null);
                    }}
                    style={{
                      display: 'block',
                      marginTop: '4px',
                      background: 'none',
                      border: 'none',
                      color: '#b91c1c',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '0.8rem',
                      padding: 0,
                    }}
                  >
                    {isKm ? 'ចុចទីនេះដើម្បីបង្កើតគណនីឥឡូវនេះ ➔' : 'Click here to create an account now ➔'}
                  </button>
                )}
              </div>
            </div>
          )}

          {successMsg && (
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
              <CheckCircle size={16} color="#16a34a" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Existing Accounts On Device Quick Switch */}
          {localAccounts.length > 0 && mode === 'login' && (
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
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
                <span>{isKm ? 'គណនីលើឧបករណ៍នេះ (On This Device)' : 'Accounts On This Device'}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {localAccounts.map((acc) => (
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
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onClick={() => handleSelectLocalAccount(acc.email, acc.password)}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDirectSwitch(acc.id);
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                    >
                      {isKm ? 'ចូលប្រើ' : 'Switch'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mode === 'register' && (
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t.fullNameLabel} *</label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={15}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '12px' }}
                  />
                  <input
                    type="text"
                    required
                    className="form-input"
                    style={{ paddingLeft: '36px' }}
                    placeholder="e.g. Sok Dara / សុខ តារា"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">{t.emailLabel} *</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={15}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '12px', top: '12px' }}
                />
                <input
                  type="email"
                  required
                  className="form-input"
                  style={{ paddingLeft: '36px' }}
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                <span>{t.passwordLabel}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {mode === 'register' ? (isKm ? '(រក្សាទុកលើឧបករណ៍)' : '(Saved on device)') : ''}
                </span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={15}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '12px', top: '12px' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input"
                  style={{ paddingLeft: '36px', paddingRight: '36px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '4px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                padding: '11px',
                fontSize: '0.9rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              {mode === 'login' ? t.signIn : t.signUp}
            </button>
          </form>

          {/* Switch Mode Toggle */}
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {mode === 'login' ? t.dontHaveAccount : t.alreadyHaveAccount}
            </button>
          </div>

          {/* Quick 1-Click Demo Profiles */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              {t.orContinueWith}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={handleDemoStudent}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'center', fontSize: '0.78rem' }}
              >
                <Zap size={14} color="#f59e0b" />
                <span>Student Demo (Free)</span>
              </button>

              <button
                type="button"
                onClick={handleDemoPro}
                className="btn btn-secondary btn-sm"
                style={{
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  borderColor: 'rgba(234, 179, 8, 0.4)',
                  backgroundColor: 'rgba(234, 179, 8, 0.08)',
                }}
              >
                <Crown size={14} color="#eab308" />
                <span style={{ fontWeight: 700, color: '#ca8a04' }}>PRO Member 👑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
