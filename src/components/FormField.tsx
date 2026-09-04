import type { TemplateField } from "../types";
import { applyMask } from "../utils/masks";

interface FormFieldProps {
  field: TemplateField;
  value: string;
  error?: string;
  onChange: (id: string, value: string) => void;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #E8E6DE",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#2C2C2A",
  background: "#fff",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

export function FormField({ field, value, error, onChange }: FormFieldProps) {
  const handleChange = (raw: string) => {
    const masked = applyMask(raw, field.mask);
    onChange(field.id, masked);
  };

  const borderColor = error ? "#E24B4A" : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#2C2C2A",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {field.label}
        {field.required && (
          <span style={{ color: "#E24B4A", fontSize: "11px" }}>*</span>
        )}
      </label>

      {field.type === "textarea" ? (
        <textarea
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => handleChange(e.target.value)}
          rows={3}
          style={{
            ...inputBase,
            borderColor,
            resize: "vertical",
            lineHeight: 1.5,
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = "#2C2C2A";
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = "#E8E6DE";
          }}
        />
      ) : field.type === "date" ? (
        <input
          type="date"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          style={{ ...inputBase, borderColor }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = "#2C2C2A";
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = "#E8E6DE";
          }}
        />
      ) : (
        <input
          type="text"
          inputMode={field.type === "number" ? "numeric" : "text"}
          value={value}
          placeholder={field.mask === "currency" ? "0,00" : field.placeholder}
          onChange={(e) => handleChange(e.target.value)}
          style={{ ...inputBase, borderColor }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = "#2C2C2A";
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = "#E8E6DE";
          }}
        />
      )}

      {error && (
        <span
          style={{
            fontSize: "12px",
            color: "#E24B4A",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#E24B4A" strokeWidth="1" />
            <path
              d="M6 4v3M6 8.5v.5"
              stroke="#E24B4A"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
