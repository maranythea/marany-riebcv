import React, { useState } from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { useAuth } from '../../context/AuthContext';
import { LogIn, UserPlus, X, Lock, Mail, User, Zap, Crown } from 'lucide-react';

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
  const [name, setName] = useState('');
  const { login, register, loginDemo } = useAuth();
  const t = translations[language].auth;
  const isKm = language === 'km';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email) return;
      login(email, name || 'Student User', false);
    } else {
      if (!email || !name) return;
      register(name, email);
    }
    onClose();
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
      <div className="modal-content animate-fade-in" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
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
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {mode === 'login' ? t.loginTitle : t.registerTitle}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                {isKm ? 'គ្រប់គ្រង និងរក្សាទុក CV របស់អ្នកបានគ្រប់ពេល' : 'Save, manage and download your student CVs anytime'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '999px', padding: '6px 8px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'register' && (
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">{t.fullNameLabel} *</label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
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
              <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
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
            <label className="form-label">{t.passwordLabel} *</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
            }}
          >
            {mode === 'login' ? t.signIn : t.signUp}
          </button>

          {/* Switch Mode Toggle */}
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
            >
              {mode === 'login' ? t.dontHaveAccount : t.alreadyHaveAccount}
            </button>
          </div>

          {/* Quick 1-Click Demo Profiles */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '4px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', textAlign: 'center' }}>
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
                <span>Student (Free)</span>
              </button>

              <button
                type="button"
                onClick={handleDemoPro}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'center', fontSize: '0.78rem', borderColor: 'rgba(234, 179, 8, 0.4)', backgroundColor: 'rgba(234, 179, 8, 0.08)' }}
              >
                <Crown size={14} color="#eab308" />
                <span style={{ fontWeight: 700, color: '#ca8a04' }}>PRO Member 👑</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
