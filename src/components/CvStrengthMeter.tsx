import React from 'react';
import type { CvData, CvSettings } from '../types/cv';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { triggerConfetti } from '../utils/pdfExport';

interface CvStrengthMeterProps {
  data: CvData;
  settings: CvSettings;
}

export const CvStrengthMeter: React.FC<CvStrengthMeterProps> = ({ data, settings }) => {
  const isKm = settings.language === 'km';
  const { personalInfo, objective, education, experiences, skills, languages } = data;

  // Criteria calculations
  const hasName = Boolean(personalInfo.fullName.trim());
  const hasContact = Boolean(personalInfo.email.trim() && personalInfo.phone.trim());
  const hasPhoto = personalInfo.showPhoto ? Boolean(personalInfo.photoUrl) : true;
  const hasObjective = objective.trim().length > 30;
  const hasBacII = education.some((e) => e.isBacII && e.bacGrade);
  const hasEducation = education.length > 0;
  const hasExperience = experiences.length > 0;
  const hasSkills = skills.length >= 3;
  const hasLanguages = languages.length >= 1;

  let score = 0;
  if (hasName) score += 15;
  if (hasContact) score += 15;
  if (hasPhoto) score += 10;
  if (hasObjective) score += 15;
  if (hasBacII || hasEducation) score += 15;
  if (hasExperience) score += 15;
  if (hasSkills) score += 10;
  if (hasLanguages) score += 5;

  const prevScoreRef = React.useRef(score);
  React.useEffect(() => {
    if (score === 100 && prevScoreRef.current < 100) {
      triggerConfetti();
    }
    prevScoreRef.current = score;
  }, [score]);

  // Suggestions for BacII students
  const getSuggestions = () => {
    const list: string[] = [];
    if (!hasName) list.push(isKm ? 'បំពេញឈ្មោះពេញរបស់អ្នក' : 'Add your full name');
    if (!hasContact) list.push(isKm ? 'បំពេញលេខទូរស័ព្ទ និងអ៊ីមែល' : 'Add phone number and email');
    if (!hasObjective) list.push(isKm ? 'សរសេរគោលបំណងការងារយ៉ាងតិច ២-៣ ឃ្លា' : 'Write a 2-3 sentence career objective');
    if (!hasBacII) list.push(isKm ? 'បញ្ជាក់និទ្ទេស និងផ្នែកបាក់ឌុបរបស់អ្នក' : 'Add your BacII grade and stream');
    if (!hasExperience) list.push(isKm ? 'បន្ថែមសកម្មភាពក្លឹប ការងារស្ម័គ្រចិត្ត ឬការងារក្រៅម៉ោង' : 'Add volunteer work, school club, or part-time experience');
    if (!hasSkills) list.push(isKm ? 'ជ្រើសរើសជំនាញយ៉ាងតិច ៣ (កុំព្យូទ័រ/ទំនាក់ទំនង)' : 'Add at least 3 skills (digital/soft skills)');
    return list;
  };

  const suggestions = getSuggestions();

  const getScoreColor = () => {
    if (score >= 85) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '14px 16px',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={17} color={getScoreColor()} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isKm ? 'កម្រិតភាពទាក់ទាញរបស់ CV (CV Score)' : 'CV Strength Meter'}
          </span>
        </div>
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 800,
            color: getScoreColor(),
          }}
        >
          {score}%
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--bg-app)',
          borderRadius: '999px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: '100%',
            backgroundColor: getScoreColor(),
            borderRadius: '999px',
            transition: 'width 0.4s ease, background-color 0.3s ease',
          }}
        />
      </div>

      {/* Actionable Tips for BacII students */}
      {suggestions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={13} color="#f59e0b" />
            <span>{isKm ? 'គន្លឹះដើម្បីឱ្យ CV កាន់តែទាក់ទាញ៖' : 'Next steps to reach 100%:'}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
            {suggestions.slice(0, 2).map((sug, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.74rem',
                }}
              >
                • {sug}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
          <CheckCircle size={14} />
          <span>{isKm ? 'CV របស់អ្នកពេញលេញ និងត្រៀមរួចរាល់សម្រាប់ដាក់ពាក្យ!' : 'Outstanding! Your CV is complete and ready to submit to employers!'}</span>
        </div>
      )}
    </div>
  );
};
