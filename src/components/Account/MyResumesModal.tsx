import React from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { useAuth } from '../../context/AuthContext';
import { FolderOpen, Plus, Copy, Trash2, Check, X, FileText, ArrowRight } from 'lucide-react';

interface MyResumesModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
  onSelectResume: (resumeId: string) => void;
  onCreateNewResume: () => void;
}

export const MyResumesModal: React.FC<MyResumesModalProps> = ({
  isOpen,
  language,
  onClose,
  onSelectResume,
  onCreateNewResume,
}) => {
  const { savedResumes, activeResumeId, duplicateResume, deleteResume } = useAuth();
  const t = translations[language].resumes;

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
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
              <FolderOpen size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{t.subtitle}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                onCreateNewResume();
                onClose();
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={14} />
              <span>{t.createNew}</span>
            </button>
            <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '999px', padding: '6px 8px' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Resumes List */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {savedResumes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
              <FileText size={40} style={{ opacity: 0.4, marginBottom: '8px' }} />
              <p style={{ margin: 0, fontSize: '0.88rem' }}>{t.emptyList}</p>
            </div>
          ) : (
            savedResumes.map((resume) => {
              const isActive = activeResumeId === resume.id;
              return (
                <div
                  key={resume.id}
                  style={{
                    backgroundColor: isActive ? 'var(--primary-light)' : 'var(--bg-app)',
                    border: `1.5px solid ${isActive ? 'var(--primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface)',
                        color: isActive ? '#ffffff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={18} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {resume.title}
                        </span>
                        {isActive && (
                          <span className="badge badge-blue" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                            <Check size={10} /> {t.currentCvBadge}
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {resume.data.personalInfo.fullName ? `${resume.data.personalInfo.fullName} • ` : ''}
                        {t.lastEdited} {resume.updatedAt}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {!isActive && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectResume(resume.id);
                          onClose();
                        }}
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.78rem', padding: '5px 10px' }}
                      >
                        <span>{t.loadCv}</span>
                        <ArrowRight size={13} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => duplicateResume(resume.id)}
                      className="btn btn-secondary btn-sm"
                      title={t.duplicate}
                      style={{ padding: '6px' }}
                    >
                      <Copy size={14} />
                    </button>

                    {savedResumes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(t.deleteConfirm)) {
                            deleteResume(resume.id);
                          }
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ef4444', padding: '6px' }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
