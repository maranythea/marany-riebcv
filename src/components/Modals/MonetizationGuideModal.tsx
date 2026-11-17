import React, { useState } from 'react';
import type { LanguageCode } from '../../types/cv';
import {
  TrendingUp,
  X,
  Users,
  DollarSign,
  Cpu,
  Target,
  ShieldCheck,
} from 'lucide-react';

interface MonetizationGuideModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
  onOpenUpgradeModal?: () => void;
}

export const MonetizationGuideModal: React.FC<MonetizationGuideModalProps> = ({
  isOpen,
  language,
  onClose,
  onOpenUpgradeModal,
}) => {
  const [activeTab, setActiveTab] = useState<'first10' | 'pricing' | 'costs'>('first10');
  const isKm = language === 'km';

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '680px', maxHeight: '90vh' }}
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
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(37,99,235,0.08) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {isKm ? 'យុទ្ធសាស្ត្ររកចំណូល & អតិថិជន ១០ នាក់ដំបូង' : 'Phase 3: Monetization & Customer Playbook'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {isKm
                  ? 'ផែនការប្រតិបត្តិជាក់ស្តែងសម្រាប់ទីផ្សារកម្ពុជា (Bakong KHQR, BacII Students)'
                  : 'Actionable playbook for Cambodia market, KHQR, and cost control'}
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

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            padding: '0 24px',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('first10')}
            style={{
              padding: '12px 14px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: activeTab === 'first10' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2.5px solid ${activeTab === 'first10' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Users size={15} />
            <span>{isKm ? 'អតិថិជន ១០ នាក់ដំបូង' : 'First 10 Customers'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            style={{
              padding: '12px 14px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: activeTab === 'pricing' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2.5px solid ${activeTab === 'pricing' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <DollarSign size={15} />
            <span>{isKm ? 'គំរូតម្លៃ & KHQR' : 'Pricing & KHQR'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('costs')}
            style={{
              padding: '12px 14px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: activeTab === 'costs' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: `2.5px solid ${activeTab === 'costs' ? 'var(--primary)' : 'transparent'}`,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Cpu size={15} />
            <span>{isKm ? 'ការគ្រប់គ្រងចំណាយ (AI & Hosting)' : 'AI & Hosting Costs'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '22px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'first10' && (
            <>
              <div
                style={{
                  backgroundColor: 'rgba(37, 99, 235, 0.06)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <Target size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {isKm ? 'ទិសដៅច្បាស់លាស់៖ ' : 'Core Objective: '}
                  </strong>
                  {isKm
                    ? 'នៅកម្ពុជា រៀងរាល់ឆ្នាំមានសិស្សបាក់ឌុបជាង ១០ ម៉ឺននាក់ និងនិស្សិតឆ្នាំទី១ រាប់ម៉ឺននាក់ត្រូវការ CV ជាលើកដំបូង។ ពួកគេមានទូរស័ព្ទដៃ និងគណនី ABA/Bakong រួចជាស្រេច!'
                    : 'Over 100,000 Cambodian high-school graduates (BacII) and freshmen enter universities yearly. They have smartphones and ABA/Bakong ready to scan.'}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '999px',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      1
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {isKm ? 'Facebook Groups សិស្សបាក់ឌុប & អាហារូបករណ៍' : 'Facebook Study & Scholarship Groups'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {isKm
                      ? 'បង្ហោះរូបភាពប្រៀបធៀប "CV ធម្មតា vs CV រៀបស្អាតតាម RiebCV" ក្នុងគ្រុបដូចជា "ត្រៀមប្រឡងបាក់ឌុប", "ចែករំលែកអាហារូបករណ៍", "ឱកាសការងារយុវជន"។ ផ្តល់កូដ Coupon ឬការរៀបឥតគិតថ្លៃសម្រាប់ ៥ នាក់ដំបូង។'
                      : 'Post side-by-side comparisons ("Boring Word CV vs Modern RiebCV") in high-traffic student groups. Offer a 50% discount or free review for the first 5 commenters.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '999px',
                        backgroundColor: '#7c3aed',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      2
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {isKm ? 'TikTok / Reels វីដេអូខ្លី ៣០ វិនាទី' : 'TikTok & Reels 30s Demonstration'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {isKm
                      ? 'ថតវីដេអូបង្ហាញពីការចុចបង្កើត CV លើទូរស័ព្ទក្នុងពេលត្រឹមតែ ២ នាទី ជ្រើសរើសនិទ្ទេសបាក់ឌុប ហើយចុចទាញយក PDF ដោយផ្ទាល់។ វីដេអូជាក់ស្តែងបែបនេះងាយទទួលបានការ Like និង Share ច្រើន។'
                      : 'Create quick screen recordings showing "How to make a professional BacII CV on your phone in under 2 minutes". This format converts exceptionally well on Cambodian TikTok.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '999px',
                        backgroundColor: '#10b981',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      3
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {isKm ? 'Telegram Channel និស្សិតសាកលវិទ្យាល័យ (RUPP, RULE, NUM, ITC)' : 'University Telegram Groups'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {isKm
                      ? 'ចែករំលែកតំណភ្ជាប់ PWA ទៅកាន់គ្រុប Telegram និស្សិតឆ្នាំទី១ ដែលកំពុងស្វែងរកការងារស្ម័គ្រចិត្ត ឬការងារ Part-time ដំបូង (Barista, Admin, Cashier)។'
                      : 'Share the PWA link with student batch channels seeking internships and part-time jobs. The free Cover Letter features build instant trust.'}
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'pricing' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1.5px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {isKm ? 'ម៉ូដែលទោល' : 'Single Template'}
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0' }}>
                    $1.99 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(8,000 ៛)</span>
                  </div>
                  <ul style={{ paddingLeft: '16px', margin: '10px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <li>{isKm ? 'តម្លៃសមរម្យសម្រាប់សិស្ស' : 'Impulse buy for students'}</li>
                    <li>{isKm ? 'ដោះសោម៉ូដដែលពេញចិត្តរហូត' : 'Unlocks selected CV style'}</li>
                    <li>{isKm ? 'ស្កេន KHQR ងាយស្រួល មិនបាច់កាត' : 'Instant scan via any bank app'}</li>
                  </ul>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    border: '1.5px solid #f59e0b',
                    borderRadius: '14px',
                    padding: '16px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '12px',
                      backgroundColor: '#f59e0b',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    BEST VALUE
                  </span>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#d97706' }}>
                    {isKm ? 'កញ្ចប់ពេញមួយជីវិត' : 'Lifetime PRO Pass'}
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0' }}>
                    $4.99 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(20,000 ៛)</span>
                  </div>
                  <ul style={{ paddingLeft: '16px', margin: '10px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <li>{isKm ? 'ដោះសោរគ្រប់ម៉ូដទាំងអស់' : 'Unlocks all current & future templates'}</li>
                    <li>{isKm ? 'គ្មាន Watermark និងទាញយកគ្មានដែនកំណត់' : 'Unlimited high-res PDF exports'}</li>
                    <li>{isKm ? 'សមរម្យបំផុតសម្រាប់យុវជន' : 'Higher average order value (AOV)'}</li>
                  </ul>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <ShieldCheck size={22} color="#10b981" />
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {isKm ? 'ការតភ្ជាប់ Bakong KHQR ពិតប្រាកដ៖ ' : 'Real Bakong KHQR Integration: '}
                  </strong>
                  {isKm
                    ? 'អ្នកអាចចុះឈ្មោះគណនី Bakong Merchant ឬប្រើ QR កូដបុគ្គលរបស់ ABA / Bakong ផ្ទាល់ ដើម្បីទទួលប្រាក់ភ្លាមៗដោយគ្មានកម្រៃជើងសារ (0% Fee)។'
                    : 'You can register a Bakong Merchant account or use personal ABA/Bakong dynamic QR codes to receive payments directly with zero merchant fees.'}
                </div>
              </div>
            </>
          )}

          {activeTab === 'costs' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      🌐 Web Hosting (Vercel / Netlify / Cloudflare Pages)
                    </span>
                    <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px' }}>
                      $0.00 / Month (FREE)
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {isKm
                      ? 'គម្រោង React/Vite នេះជា Static Client-Side App ទាំងស្រុង។ កញ្ចប់ Free Tier របស់ Vercel ផ្តល់កម្រិតបញ្ជូន (Bandwidth) រហូតដល់ 100GB/ខែ ដែលអាចទទួលអ្នកចូលមើលបានរាប់ម៉ឺននាក់ដោយមិនអស់ប្រាក់សូម្បីតែ ១ សេន។'
                      : 'Because RiebCV is a client-side Vite application, Vercel/Netlify free tiers include 100GB/mo bandwidth and unlimited deployments for $0.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      ✨ AI API Expenses (Google Gemini API)
                    </span>
                    <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px' }}>
                      $0.00 / Month (FREE TIER)
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {isKm
                      ? 'Gemini 1.5/2.5 Flash ផ្តល់ការប្រើប្រាស់រហូតដល់ 15 Requests ក្នុងមួយនាទីដោយឥតគិតថ្លៃ។ លើសពីនេះ ប្រព័ន្ធមាន Instant Smart Templates ជា Fallback ដែលមិនចំណាយ Token ឡើយ។'
                      : 'Gemini Flash models offer up to 15 RPM for free, and built-in smart template engines provide offline generation with zero API token consumption.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>
                      {isKm ? 'ផលចំណេញសុទ្ធ (Net Profit Margin)' : 'Estimated Net Profit Margin'}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                      98% - 100%
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {isKm
                      ? 'ត្រឹមអតិថិជនម្នាក់ដំបូង ($4.99) អ្នកនឹងចំណេញភ្លាមៗ!'
                      : 'Just 1 customer covers domain expenses; 10 customers yields ~$49 net profit!'}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-app)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {isKm ? 'គម្រោងត្រៀមរួចជាស្រេចសម្រាប់ការដាក់ដំណើរការ' : 'Ready for public launch on Vercel/Netlify'}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {onOpenUpgradeModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenUpgradeModal();
                }}
                className="btn btn-primary btn-sm"
              >
                <span>{isKm ? 'សាកល្បងបង់ប្រាក់ KHQR' : 'Test KHQR Payment'}</span>
              </button>
            )}
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              {isKm ? 'បិទ' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
