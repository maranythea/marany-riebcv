import React from 'react';
import type { CvSettings, FontSizeOption, TemplateId } from '../../types/cv';
import { translations } from '../../data/translations';
import { TEMPLATES_CONFIG } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import { Palette, Check, Layout, Type, Sliders, Lock } from 'lucide-react';

interface DesignCustomizerProps {
  settings: CvSettings;
  onChange: (settings: Partial<CvSettings>) => void;
  onOpenUpgradeModal: (templateId?: TemplateId) => void;
}

const colorPresets = [
  { name: 'Royal Blue', primary: '#1e40af', accent: '#3b82f6' },
  { name: 'Angkor Crimson', primary: '#7c2d12', accent: '#ea580c' },
  { name: 'Emerald Green', primary: '#047857', accent: '#10b981' },
  { name: 'Modern Indigo', primary: '#4338ca', accent: '#6366f1' },
  { name: 'Classic Slate', primary: '#1e293b', accent: '#475569' },
  { name: 'Amber Gold', primary: '#b45309', accent: '#f59e0b' },
  { name: 'Vibrant Berry', primary: '#9d174d', accent: '#ec4899' },
  { name: 'Cyan Wave', primary: '#0369a1', accent: '#06b6d4' },
];

const fontOptions: CvSettings['fontFamily'][] = [
  'Outfit',
  'Plus Jakarta Sans',
  'Kantumruy Pro',
  'Inter',
  'Playfair Display',
];

export const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  settings,
  onChange,
  onOpenUpgradeModal,
}) => {
  const { isTemplateUnlocked } = useAuth();
  const t = translations[settings.language].design;
  const isKm = settings.language === 'km';

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette size={20} color="var(--primary)" />
          {t.title}
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</p>
      </div>

      {/* Template Chooser with Free / PRO Badges */}
      <div>
        <label className="form-label" style={{ marginBottom: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layout size={15} /> {t.template}
          </span>
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          {TEMPLATES_CONFIG.map((tpl) => {
            const isSelected = settings.templateId === tpl.id;
            const isUnlocked = isTemplateUnlocked(tpl.id);

            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onChange({ templateId: tpl.id });
                }}
                style={{
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-app)',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                      {isKm ? tpl.nameKm : tpl.nameEn}
                    </span>

                    {tpl.isPro ? (
                      isUnlocked ? (
                        <span style={{ fontSize: '0.68rem', backgroundColor: '#10b981', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          UNLOCKED ✓
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.68rem', backgroundColor: '#f59e0b', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          PRO 👑 ($1.99)
                        </span>
                      )
                    ) : (
                      <span style={{ fontSize: '0.68rem', backgroundColor: '#64748b', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        FREE
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    {isKm ? tpl.descKm : tpl.descEn}
                  </div>
                </div>

                {/* Right Status / Unlock CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {tpl.isPro && !isUnlocked && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange({ templateId: tpl.id });
                        onOpenUpgradeModal(tpl.id);
                      }}
                      className="btn btn-sm"
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        border: 'none',
                        fontWeight: 700,
                      }}
                    >
                      <Lock size={12} />
                      <span>{isKm ? 'ដោះសោ' : 'Unlock'}</span>
                    </button>
                  )}

                  {isSelected && (
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '999px',
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <label className="form-label" style={{ marginBottom: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Palette size={15} /> {t.colorTheme}
          </span>
        </label>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {colorPresets.map((clr, i) => {
            const isSelected = settings.primaryColor === clr.primary;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onChange({ primaryColor: clr.primary, accentColor: clr.accent })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--bg-app)',
                  border: `2px solid ${isSelected ? clr.primary : 'var(--border-color)'}`,
                  padding: '6px 12px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '999px',
                    backgroundColor: clr.primary,
                    display: 'inline-block',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isSelected ? clr.primary : 'var(--text-primary)' }}>
                  {clr.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font & Spacing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Font Family */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Type size={15} /> {t.font}
            </span>
          </label>
          <select
            className="form-select"
            value={settings.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value as any })}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Content Density */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={15} /> {t.fontSize}
            </span>
          </label>
          <select
            className="form-select"
            value={settings.fontSize}
            onChange={(e) => onChange({ fontSize: e.target.value as FontSizeOption })}
          >
            <option value="compact">{t.sizeCompact}</option>
            <option value="normal">{t.sizeNormal}</option>
            <option value="spacious">{t.sizeSpacious}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
