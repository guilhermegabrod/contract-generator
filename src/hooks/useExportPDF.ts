import { useRef, useState, useCallback, type RefObject } from "react";

export interface PDFOptions {
  filename: string;
  margin: number; // mm
  fontSize: number; // pt
}

export interface UseExportPDFReturn {
  contentRef: RefObject<HTMLDivElement | null>;
  isExporting: boolean;
  progress: string;
  exportPDF: (options: PDFOptions) => Promise<void>;
  saveToHistory: (templateName: string, data: Record<string, string>) => void;
}
interface Html2PdfInstance {
  set: (opts: object) => Html2PdfInstance;
  from: (el: HTMLElement) => Html2PdfInstance;
  save: () => Promise<void>;
}

interface Html2PdfWindow extends Window {
  html2pdf: () => Html2PdfInstance;
}

export function useExportPDF(): UseExportPDFReturn {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState("");

  const exportPDF = useCallback(async (options: PDFOptions) => {
    if (!contentRef.current) return;

    // html2pdf.js é carregado via CDN no index.html
    // Declare o tipo para o TypeScript não reclamar
    const { html2pdf } = window as unknown as Html2PdfWindow;

    if (!html2pdf) {
      console.error(
        "html2pdf.js não encontrado. Adicione o script no index.html.",
      );
      return;
    }

    setIsExporting(true);
    setProgress("Preparando documento...");

    // Clona o elemento para não afetar o DOM original
    const element = contentRef.current.cloneNode(true) as HTMLElement;

    // Injeta estilos de impressão diretamente no clone
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      body { margin: 0; }
      .contract-print {
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: ${options.fontSize}pt;
        line-height: 1.9;
        color: #1a1a1a;
        white-space: pre-wrap;
        word-break: break-word;
      }
    `;
    element.prepend(styleEl);

    setProgress("Gerando PDF...");

    const pdfOptions = {
      margin: options.margin,
      filename: options.filename.endsWith(".pdf")
        ? options.filename
        : `${options.filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Alta resolução
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    try {
      await html2pdf().set(pdfOptions).from(element).save();
      setProgress("PDF salvo!");
    } catch (err) {
      console.error("Erro ao exportar PDF:", err);
      setProgress("Erro ao gerar PDF.");
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setProgress("");
      }, 1500);
    }
  }, []);

  // Salva o contrato no histórico do localStorage
  const saveToHistory = useCallback(
    (templateName: string, data: Record<string, string>) => {
      const KEY = "contract_history";
      const existing = JSON.parse(localStorage.getItem(KEY) ?? "[]");

      const entry = {
        id: crypto.randomUUID(),
        templateName,
        createdAt: new Date().toISOString(),
        data,
      };

      // Mantém no máximo 20 contratos no histórico
      const updated = [entry, ...existing].slice(0, 20);
      localStorage.setItem(KEY, JSON.stringify(updated));
    },
    [],
  );

  return { contentRef, isExporting, progress, exportPDF, saveToHistory };
}
