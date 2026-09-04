import { useState, useMemo } from "react";
import type { ContractTemplate, TemplateCategory } from "../types/index.ts";
import { templates, categoryLabels } from "../data/templates.ts";
import { TemplateCard } from "../components/TemplateCard.tsx";

interface HomeProps {
  onSelectTemplate: (template: ContractTemplate) => void;
}

const ALL = "all";
type FilterValue = TemplateCategory | typeof ALL;

export function Home({ onSelectTemplate }: HomeProps) {
  const [selected, setSelected] = useState<ContractTemplate | null>(null);
  const [filter, setFilter] = useState<FilterValue>(ALL);
  const [search, setSearch] = useState("");

  const categories: FilterValue[] = [
    ALL,
    "freelance",
    "servicos",
    "confidencialidade",
    "parceria",
  ];

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCat = filter === ALL || t.category === filter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  const handleSelect = (template: ContractTemplate) => {
    setSelected((prev) => (prev?.id === template.id ? null : template));
  };

  const handleContinue = () => {
    if (selected) onSelectTemplate(selected);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #E8E6DE",
          background: "#fff",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          height: "60px",
          gap: "10px",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect
            x="3"
            y="2"
            width="12"
            height="16"
            rx="2"
            stroke="#2C2C2A"
            strokeWidth="1.5"
          />
          <path
            d="M7 7h6M7 10h6M7 13h4"
            stroke="#2C2C2A"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M15 14l4 4"
            stroke="#2C2C2A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "17px",
            fontWeight: 600,
            color: "#2C2C2A",
            letterSpacing: "-0.02em",
          }}
        >
          Contrato<span style={{ color: "#0F6E56" }}>.</span>
        </span>
      </header>

      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "48px 24px 120px",
        }}
      >
        {/* Hero */}
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "#888780",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Passo 1 de 3
          </p>
          <h1
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 700,
              color: "#2C2C2A",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "14px",
            }}
          >
            Escolha o tipo
            <br />
            de contrato
          </h1>
          <p style={{ fontSize: "15px", color: "#5F5E5A", lineHeight: 1.6 }}>
            Selecione um modelo e preencha os dados. Seu contrato em PDF estará
            pronto em minutos.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "28px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <svg
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5"
                stroke="#B4B2A9"
                strokeWidth="1.2"
              />
              <path
                d="M11 11l2.5 2.5"
                stroke="#B4B2A9"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar template..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                paddingLeft: "36px",
                paddingRight: "14px",
                border: "1.5px solid #E8E6DE",
                borderRadius: "10px",
                background: "#fff",
                fontSize: "14px",
                color: "#2C2C2A",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: filter === cat ? 500 : 400,
                  background: filter === cat ? "#2C2C2A" : "#fff",
                  color: filter === cat ? "#fff" : "#5F5E5A",
                  border:
                    filter === cat
                      ? "1.5px solid #2C2C2A"
                      : "1.5px solid #E8E6DE",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {cat === ALL ? "Todos" : categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#888780" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ marginBottom: "12px", opacity: 0.4 }}
            >
              <circle
                cx="18"
                cy="18"
                r="12"
                stroke="#888780"
                strokeWidth="1.5"
              />
              <path
                d="M28 28l6 6"
                stroke="#888780"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p style={{ fontSize: "15px" }}>
              Nenhum template encontrado para "{search}"
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "14px",
            }}
          >
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selected?.id === template.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom CTA bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #E8E6DE",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          zIndex: 10,
        }}
      >
        <div>
          {selected ? (
            <span style={{ fontSize: "14px", color: "#2C2C2A" }}>
              <span style={{ color: "#0F6E56", fontWeight: 500 }}>✓</span>{" "}
              <strong style={{ fontWeight: 500 }}>{selected.name}</strong>{" "}
              selecionado
            </span>
          ) : (
            <span style={{ fontSize: "14px", color: "#888780" }}>
              Selecione um template para continuar
            </span>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected}
          style={{
            all: "unset",
            cursor: selected ? "pointer" : "not-allowed",
            background: selected ? "#2C2C2A" : "#D3D1C7",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            transition: "background 0.15s",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Preencher dados
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
