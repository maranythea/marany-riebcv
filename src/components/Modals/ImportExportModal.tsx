import React, { useState } from 'react';
import type { CvData, CvSettings, LanguageCode } from '../../types/cv';
import type { CoverLetterData, CoverLetterSettings } from '../../types/coverLetter';
import { Upload, RotateCcw, X, Download, FileJson } from 'lucide-react';

interface ImportExportModalProps {
  isOpen: boolean;
  language: LanguageCode;
  data: CvData;
  settings: CvSettings;
  coverLetterData?: CoverLetterData;
  coverLetterSettings?: CoverLetterSettings;
  onClose: () => void;
  onImport: (data: CvData, settings?: Partial<CvSettings>) => void;
  onImportCoverLetter?: (data: CoverLetterData, settings?: Partial<CoverLetterSettings>) => void;
  onReset: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  language,
  data,
  settings,
  coverLetterData,
  coverLetterSettings,
  onClose,
  onImport,
  onImportCoverLetter,
  onReset,
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const isKm = language === 'km';

  if (!isOpen) return null;

  const handleDownloadJson = () => {
    const backup = {
      version: '1.2',
      timestamp: new Date().toISOString(),
      data,
      settings,
      coverLetterData,
      coverLetterSettings,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.fullName.replace(/\s+/g, '_') || 'cv'}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.coverLetterData && onImportCoverLetter) {
            onImportCoverLetter(parsed.coverLetterData, parsed.coverLetterSettings);
          }
          if (parsed.data && parsed.data.personalInfo) {
            onImport(parsed.data, parsed.settings);
            onClose();
          } else if (parsed.personalInfo) {
            onImport(parsed);
            onClose();
          } else {
            setErrorMsg(isKm ? 'ទម្រង់ឯកសារ JSON មិនត្រឹមត្រូវ' : 'Invalid JSON format');
          }
        } catch {
          setErrorMsg(isKm ? 'កំហុសក្នុងការអានឯកសារ' : 'Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasteImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.coverLetterData && onImportCoverLetter) {
        onImportCoverLetter(parsed.coverLetterData, parsed.coverLetterSettings);
      }
      if (parsed.data && parsed.data.personalInfo) {
        onImport(parsed.data, parsed.settings);
        onClose();
      } else if (parsed.personalInfo) {
        onImport(parsed);
        onClose();
      } else {
        setErrorMsg(isKm ? 'ទម្រង់ឯកសារមិនត្រឹមត្រូវ' : 'Invalid structure');
      }
    } catch {
      setErrorMsg(isKm ? 'កំហុសក្នុងការ parse JSON' : 'JSON Syntax Error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileJson size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {isKm ? 'រក្សាទុក & នាំចេញទិន្នន័យ (Backup / Restore)' : 'Save, Export & Restore CV Data'}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px 8px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Download JSON Backup */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                {isKm ? 'ទាញយកឯកសារបម្រុងទុក (JSON Backup)' : 'Download JSON Data File'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {isKm ? 'រក្សាទុកទិន្នន័យលើកុំព្យូទ័រដើម្បីយកមកកែប្រែពេលក្រោយបានគ្រប់ពេល' : 'Save your CV data locally to edit anytime without re-typing'}
              </div>
            </div>

            <button type="button" onClick={handleDownloadJson} className="btn btn-primary btn-sm">
              <Download size={14} />
              <span>{isKm ? 'ទាញយក JSON' : 'Export JSON'}</span>
            </button>
          </div>

          {/* Upload JSON file */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                {isKm ? 'ផ្ទុកឯកសារ JSON ឡើងវិញ' : 'Upload Existing JSON File'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {isKm ? 'ជ្រើសរើសឯកសារ JSON ដែលបានរក្សាទុកពីមុន' : 'Restore from a previously saved JSON file'}
              </div>
            </div>

            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={14} />
              <span>{isKm ? 'ជ្រើសរើសឯកសារ' : 'Upload File'}</span>
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Paste JSON text */}
          <div>
            <label className="form-label">{isKm ? 'ឬ បិទភ្ជាប់កូដ JSON (Paste JSON)' : 'Or Paste JSON Data:'}</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder='{"personalInfo": { ... }}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}
            />
            {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errorMsg}</div>}
            {jsonInput && (
              <button
                type="button"
                onClick={handlePasteImport}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '8px' }}
              >
                Import Pasted Data
              </button>
            )}
          </div>

          {/* Danger zone: Reset */}
          <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ef4444' }}>
                {isKm ? 'សម្អាតទិន្នន័យទាំងអស់ (Clear All)' : 'Reset & Start Fresh'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {isKm ? 'លុបទិន្នន័យទាំងអស់ដើម្បីចាប់ផ្តើមបំពេញពីដំបូង' : 'Erase all fields and start with blank form'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(isKm ? 'តើអ្នកពិតជាចង់សម្អាតទិន្នន័យទាំងអស់មែនទេ?' : 'Are you sure you want to reset all fields?')) {
                  onReset();
                  onClose();
                }
              }}
              className="btn btn-secondary btn-sm"
              style={{ color: '#ef4444', borderColor: '#fca5a5' }}
            >
              <RotateCcw size={14} />
              <span>{isKm ? 'សម្អាត' : 'Reset'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
