// @ts-ignore
import html2pdf from 'html2pdf.js';
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
    });
  } catch (e) {
    console.error('Confetti error:', e);
  }
};

export const exportCvToPdf = async (
  elementId: string,
  fileName: string = 'My_BacII_CV.pdf'
): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found`);
    return false;
  }

  // Configuration for html2pdf
  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename: fileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2.5,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    element.classList.add('pdf-export-mode');
    await html2pdf().set(opt).from(element).save();
    element.classList.remove('pdf-export-mode');

    triggerConfetti();
    return true;
  } catch (err) {
    console.error('PDF export error, falling back to window.print():', err);
    element.classList.remove('pdf-export-mode');
    window.print();
    return false;
  }
};

export const printCv = () => {
  window.print();
};
