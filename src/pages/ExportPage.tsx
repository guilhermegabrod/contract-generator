import { useState, useMemo } from "react";
import type { ContractTemplate } from "../types";
import { renderTemplate } from "../utils/renderTemplate";
import { useExportPDF, type PDFOptions } from "../hooks/useExportPDF";

interface ExportPageProps {
  template: ContractTemplate;
  formData: Record<string, string>;
  onBack: () => void;
  onNew: () => void;
}

export function ExportPage({
  template,
  formData,
  onBack,
  onNew,
}: ExportPageProps) {
  const { contentRef, isExporting, progress, exportPDF, saveToHistory } =
    useExportPDF();

  const [options, setOptions] = useState<PDFOptions>({
    filename: slugify(template.name),
    margin: 15,
    fontSize: 11,
  });
  const [saved, setSaved] = useState(false);

  const rendered = useMemo(
    () => renderTemplate(template.body, formData, false),
    [template.body, formData],
  );

  const handleExport = async () => {
    await exportPDF(options);

    // Salva no histórico apenas na primeira exportação
    if (!saved) {
      saveToHistory(template.name, formData);
      setSaved(true);
    }
  };
  const marginPx = options.margin * 3.78;

  return (
    <div
      style={{
        height: "100vh",
        background: "#FAFAF8",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #E8E6DE",
          background: "#fff",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          height: "60px",
          flexShrink: 0,
          gap: "14px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "#5F5E5A",
            padding: "6px 10px",
            borderRadius: "8px",
            transition: "background .15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F1EFE8")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke="#5F5E5A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Editar
        </button>

        <div style={{ width: 1, height: 20, background: "#E8E6DE" }} />

        <span
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "#2C2C2A",
            flex: 1,
          }}
        >
          {template.name}
        </span>

        {/* Badge "salvo no histórico" */}
        {saved && (
          <span
            style={{
              fontSize: "12px",
              color: "#0F6E56",
              background: "#E1F5EE",
              padding: "3px 10px",
              borderRadius: "20px",
              fontWeight: 500,
            }}
          >
            ✓ Salvo no histórico
          </span>
        )}
      </header>

      {/* Layout: preview à esquerda, painel de export à direita */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          minHeight: 0,
          flex: 1,
        }}
      >
        {/* Coluna esquerda — contrato renderizado */}
        <div
          style={{
            overflowY: "auto",
            height: "calc(100vh - 60px)",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#EEECEA",
          }}
        >
          {/* Folha A4 simulada */}
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              background: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
              borderRadius: "4px",
            }}
          >
            {/* Cabeçalho da folha */}
            <div
              style={{
                borderBottom: "1px solid #E8E6DE",
                padding: "20px 40px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#2C2C2A",
                }}
              >
                Contrato<span style={{ color: "#0F6E56" }}>.</span>
              </span>
              <span style={{ fontSize: "11px", color: "#888780" }}>
                {new Date().toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Corpo do contrato — este div é passado para o html2pdf */}
            <div ref={contentRef} style={{ padding: `${marginPx}px` }}>
              <div
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: `${options.fontSize}pt`,
                  lineHeight: 1.9,
                  color: "#1a1a1a",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: rendered }}
              />
            </div>
          </div>
        </div>

        {/* Coluna direita — painel de opções + botão */}
        <div
          style={{
            height: "calc(100vh - 60px)",
            overflowY: "auto",
            borderLeft: "1px solid #E8E6DE",
            background: "#fff",
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Título do painel */}
          <div>
            <h3
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#2C2C2A",
                marginBottom: "6px",
              }}
            >
              Exportar PDF
            </h3>
            <p style={{ fontSize: "13px", color: "#5F5E5A", lineHeight: 1.5 }}>
              Configure e baixe o contrato em formato A4.
            </p>
          </div>

          {/* Opções */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Nome do arquivo */}
            <OptionField label="Nome do arquivo">
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={options.filename}
                  onChange={(e) =>
                    setOptions((o) => ({ ...o, filename: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#2C2C2A")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E6DE")}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "12px",
                    color: "#B4B2A9",
                    pointerEvents: "none",
                  }}
                >
                  .pdf
                </span>
              </div>
            </OptionField>

            {/* Margens */}
            <OptionField label={`Margens — ${options.margin} mm`}>
              <input
                type="range"
                min={8}
                max={30}
                step={1}
                value={options.margin}
                onChange={(e) =>
                  setOptions((o) => ({ ...o, margin: Number(e.target.value) }))
                }
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "#B4B2A9",
                  marginTop: "2px",
                }}
              >
                <span>Estreita (8)</span>
                <span>Larga (30)</span>
              </div>
            </OptionField>

            {/* Tamanho da fonte */}
            <OptionField label={`Tamanho da fonte — ${options.fontSize} pt`}>
              <input
                type="range"
                min={9}
                max={14}
                step={1}
                value={options.fontSize}
                onChange={(e) =>
                  setOptions((o) => ({
                    ...o,
                    fontSize: Number(e.target.value),
                  }))
                }
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "#B4B2A9",
                  marginTop: "2px",
                }}
              >
                <span>Menor (9)</span>
                <span>Maior (14)</span>
              </div>
            </OptionField>
          </div>

          {/* Resumo */}
          <div
            style={{
              background: "#FAFAF8",
              border: "1px solid #E8E6DE",
              borderRadius: "10px",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <SummaryRow label="Formato" value="A4 · Retrato" />
            <SummaryRow label="Qualidade" value="Alta (2×)" />
            <SummaryRow
              label="Campos preenchidos"
              value={`${countFilled(template, formData)} / ${countTotal(template)}`}
            />
          </div>

          {/* Botão exportar */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              onClick={handleExport}
              disabled={isExporting}
              style={{
                all: "unset",
                cursor: isExporting ? "not-allowed" : "pointer",
                background: isExporting ? "#B4B2A9" : "#0F6E56",
                color: "#fff",
                borderRadius: "10px",
                padding: "13px 20px",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "inherit",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background .15s",
              }}
              onMouseEnter={(e) => {
                if (!isExporting) e.currentTarget.style.background = "#085041";
              }}
              onMouseLeave={(e) => {
                if (!isExporting) e.currentTarget.style.background = "#0F6E56";
              }}
            >
              {isExporting ? (
                <>
                  {SpinnerIcon} {progress}
                </>
              ) : (
                <>{DownloadIcon} Baixar PDF</>
              )}
            </button>

            <button
              onClick={onNew}
              style={{
                all: "unset",
                cursor: "pointer",
                color: "#5F5E5A",
                borderRadius: "10px",
                padding: "11px 20px",
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "center",
                border: "1.5px solid #E8E6DE",
                transition: "border-color .15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#B4B2A9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E8E6DE")
              }
            >
              Novo contrato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function countFilled(
  template: ContractTemplate,
  data: Record<string, string>,
): number {
  return template.fields.filter((f) => data[f.id]?.trim()).length;
}

function countTotal(template: ContractTemplate): number {
  return template.fields.length;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 40px 9px 12px",
  border: "1.5px solid #E8E6DE",
  borderRadius: "8px",
  fontSize: "13px",
  color: "#2C2C2A",
  background: "#fff",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color .15s",
};

// ─── Sub-components ────────────────────────────────────────────────────────

function OptionField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <span style={{ fontSize: "12px", fontWeight: 500, color: "#5F5E5A" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "12px",
      }}
    >
      <span style={{ color: "#888780" }}>{label}</span>
      <span style={{ color: "#2C2C2A", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const DownloadIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 2v7M4 6l3 3 3-3M2 11h10"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SpinnerIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <circle
      cx="7"
      cy="7"
      r="5"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1.5"
    />
    <path
      d="M7 2a5 5 0 0 1 5 5"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </svg>
);
