import type { ContractTemplate, TemplateCategory } from "../types/index.ts";
import { categoryLabels } from "../data/templates.ts";

interface TemplateCardProps {
  template: ContractTemplate;
  isSelected: boolean;
  onSelect: (template: ContractTemplate) => void;
}

const categoryColors: Record<TemplateCategory, string> = {
  freelance: "#0F6E56",
  servicos: "#185FA5",
  confidencialidade: "#854F0B",
  parceria: "#712B13",
};

const categoryBg: Record<TemplateCategory, string> = {
  freelance: "#E1F5EE",
  servicos: "#E6F1FB",
  confidencialidade: "#FAEEDA",
  parceria: "#FAECE7",
};

export function TemplateCard({
  template,
  isSelected,
  onSelect,
}: TemplateCardProps) {
  const color = categoryColors[template.category];
  const bg = categoryBg[template.category];

  return (
    <button
      onClick={() => onSelect(template)}
      style={{
        all: "unset",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        background: isSelected ? "#FAFAF8" : "#fff",
        border: isSelected ? `2px solid ${color}` : "1.5px solid #E8E6DE",
        borderRadius: "14px",
        padding: "24px",
        textAlign: "left",
        transition: "all 0.18s ease",
        position: "relative",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (!isSelected)
          (e.currentTarget as HTMLElement).style.borderColor = "#B4B2A9";
      }}
      onMouseLeave={(e) => {
        if (!isSelected)
          (e.currentTarget as HTMLElement).style.borderColor = "#E8E6DE";
      }}
    >
      {isSelected && (
        <span
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path
              d="M1 4L4 7.5L10 1"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}

      <span
        style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color,
          background: bg,
          padding: "3px 10px",
          borderRadius: "20px",
          marginBottom: "14px",
          width: "fit-content",
        }}
      >
        {categoryLabels[template.category].toUpperCase()}
      </span>

      <span
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "#2C2C2A",
          lineHeight: 1.25,
          marginBottom: "10px",
          display: "block",
        }}
      >
        {template.name}
      </span>

      <span
        style={{
          fontSize: "13.5px",
          color: "#5F5E5A",
          lineHeight: 1.55,
          marginBottom: "20px",
          flex: 1,
          display: "block",
        }}
      >
        {template.description}
      </span>

      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        {template.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "11px",
              color: "#888780",
              background: "#F1EFE8",
              padding: "3px 9px",
              borderRadius: "6px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          paddingTop: "14px",
          borderTop: "1px solid #F1EFE8",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="#B4B2A9" strokeWidth="1" />
          <path
            d="M6.5 3.5V6.5L8.5 8"
            stroke="#B4B2A9"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <span style={{ fontSize: "12px", color: "#888780" }}>
          Leva cerca de {template.estimatedTime}
        </span>
        <span
          style={{ marginLeft: "auto", fontSize: "12px", color: "#888780" }}
        >
          {template.fields.length} campos
        </span>
      </div>
    </button>
  );
}
