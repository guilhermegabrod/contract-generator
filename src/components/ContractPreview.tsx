import { useMemo } from "react";
import type { ContractTemplate } from "../types";
import { renderTemplate, countMissingFields } from "../utils/renderTemplate";

interface ContractPreviewProps {
  template: ContractTemplate;
  formData: Record<string, string>;
}

export function ContractPreview({ template, formData }: ContractPreviewProps) {
  const rendered = useMemo(
    () => renderTemplate(template.body, formData, true),
    [template.body, formData],
  );

  const missing = useMemo(
    () => countMissingFields(template.body, formData),
    [template.body, formData],
  );

  const total = template.body.match(/\{\{(\w+)\}\}/g) ?? [];
  const uniqueTotal = [...new Set(total)].length;
  const filled = uniqueTotal - missing;
  const percent =
    uniqueTotal === 0 ? 100 : Math.round((filled / uniqueTotal) * 100);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Cabeçalho do preview */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#2C2C2A" }}>
          Preview do contrato
        </span>
        <span
          style={{
            fontSize: "12px",
            color: missing === 0 ? "#0F6E56" : "#854F0B",
            background: missing === 0 ? "#E1F5EE" : "#FAEEDA",
            padding: "3px 10px",
            borderRadius: "20px",
            fontWeight: 500,
          }}
        >
          {missing === 0 ? "✓ Completo" : `${filled}/${uniqueTotal} campos`}
        </span>
      </div>

      {/* Barra de progresso */}
      <div
        style={{
          height: "3px",
          background: "#F1EFE8",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: "#0F6E56",
            borderRadius: "2px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Corpo do contrato */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E8E6DE",
          borderRadius: "10px",
          padding: "28px 32px",
        }}
      >
        <style>{`
          .contract-body {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 13px;
            line-height: 1.9;
            color: #2C2C2A;
            white-space: pre-wrap;
            word-break: break-word;
          }
          .contract-body .placeholder {
            background: #FAEEDA;
            color: #854F0B;
            border-radius: 3px;
            padding: 1px 3px;
            font-style: italic;
          }
        `}</style>
        <div
          className="contract-body"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      </div>
    </div>
  );
}
