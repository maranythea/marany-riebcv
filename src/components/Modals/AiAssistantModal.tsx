import React, { useState } from 'react';
import type { LanguageCode } from '../../types/cv';
import { translations } from '../../data/translations';
import { aiBulletSuggestions, aiObjectiveSuggestions } from '../../data/aiSuggestions';
import { Sparkles, X, Copy, Check, ArrowRight } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
  onInsertObjective?: (text: string) => void;
  onInsertBullet?: (text: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  language,
  onClose,
  onInsertObjective,
  onInsertBullet,
}) => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'bullets'>('objectives');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const isKm = language === 'km';
  const t = translations[language].aiModal;

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
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
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{t.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '999px', padding: '6px 8px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', padding: '12px 24px 0 24px', gap: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('objectives')}
            style={{
              padding: '8px 16px',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: activeTab === 'objectives' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2px solid ${activeTab === 'objectives' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            🎯 {isKm ? 'គោលបំណងការងារ (Objectives)' : 'Career Objectives'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bullets')}
            style={{
              padding: '8px 16px',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: activeTab === 'bullets' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2px solid ${activeTab === 'bullets' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            ⚡ {isKm ? 'ឃ្លាសកម្មភាពការងារ (Action Bullets)' : 'Student Action Bullets'}
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activeTab === 'objectives' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aiObjectiveSuggestions.map((item, idx) => {
                const text = isKm ? item.textKm : item.textEn;
                const id = `obj-${idx}`;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--bg-app)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {isKm ? item.roleKm : item.roleEn}
                      </span>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleCopy(text, id)}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                        >
                          {copiedIndex === id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                          <span>{copiedIndex === id ? 'Copied' : 'Copy'}</span>
                        </button>

                        {onInsertObjective && (
                          <button
                            type="button"
                            onClick={() => {
                              onInsertObjective(text);
                              onClose();
                            }}
                            className="btn btn-primary btn-sm"
                            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                          >
                            <ArrowRight size={13} />
                            <span>{t.insertText}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {aiBulletSuggestions.map((cat) => (
                <div key={cat.id}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {isKm ? cat.categoryNameKm : cat.categoryNameEn}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cat.items.map((bItem, bIdx) => {
                      const text = isKm ? bItem.km : bItem.en;
                      const id = `b-${cat.id}-${bIdx}`;
                      return (
                        <div
                          key={bIdx}
                          style={{
                            backgroundColor: 'var(--bg-app)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '10px 14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px',
                          }}
                        >
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                            • {text}
                          </span>

                          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                            <button
                              type="button"
                              onClick={() => handleCopy(text, id)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '4px 8px' }}
                            >
                              {copiedIndex === id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                            </button>
                            {onInsertBullet && (
                              <button
                                type="button"
                                onClick={() => {
                                  onInsertBullet(text);
                                  onClose();
                                }}
                                className="btn btn-primary btn-sm"
                                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              >
                                + Insert
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
