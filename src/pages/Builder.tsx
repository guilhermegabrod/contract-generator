import type { ContractTemplate } from "../types";
import { useFormSteps } from "../hooks/useFormSteps";
import { StepIndicator } from "../components/StepIndicator";
import { FormField } from "../components/FormField";
import { ContractPreview } from "../components/ContractPreview";

interface BuilderProps {
  template: ContractTemplate;
  onBack: () => void;
  onFinish: (data: Record<string, string>) => void;
}

export function Builder({ template, onBack, onFinish }: BuilderProps) {
  const {
    steps,
    currentStep,
    currentFields,
    totalSteps,
    isFirstStep,
    isLastStep,
    progress,
    formData,
    errors,
    handleChange,
    goNext,
    goBack,
    goToStep,
    isStepComplete,
  } = useFormSteps(template);

  const handleNext = () => {
    const advanced = goNext();
    if (advanced && isLastStep) {
      onFinish(formData);
    }
  };

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
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={isFirstStep ? onBack : goBack}
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
            transition: "background 0.15s",
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
          Voltar
        </button>

        <div style={{ width: "1px", height: "20px", background: "#E8E6DE" }} />

        {/* Título + badge do template */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#2C2C2A",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {template.name}
          </span>
        </div>

        {/* Progresso no header */}
        <span style={{ fontSize: "13px", color: "#888780", flexShrink: 0 }}>
          Etapa {currentStep + 1} de {totalSteps}
        </span>
      </header>

      {/* Barra de progresso */}
      <div style={{ height: "3px", background: "#F1EFE8", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#0F6E56",
            transition: "width 0.35s ease",
          }}
        />
      </div>

      {/* Layout de duas colunas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 0,
          flex: 1,
        }}
      >
        {/* Coluna esquerda — formulário */}
        <div
          style={{
            overflowY: "auto",
            height: "calc(100vh - 63px)",
            padding: "40px 40px 60px",
            borderRight: "1px solid #E8E6DE",
          }}
        >
          {/* Step indicator */}
          <div style={{ marginBottom: "32px" }}>
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              isStepComplete={isStepComplete}
              onStepClick={goToStep}
            />
          </div>

          {/* Título da etapa */}
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "#888780",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Passo {currentStep + 1}
            </p>
            <h2
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "#2C2C2A",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {steps[currentStep]?.title}
            </h2>
          </div>

          {/* Campos da etapa atual */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {currentFields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id] ?? ""}
                error={errors[field.id]}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Botões de navegação */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "36px",
            }}
          >
            {!isFirstStep && (
              <button
                onClick={goBack}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "1.5px solid #E8E6DE",
                  color: "#5F5E5A",
                  background: "#fff",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#B4B2A9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#E8E6DE")
                }
              >
                Anterior
              </button>
            )}

            <button
              onClick={handleNext}
              style={{
                all: "unset",
                cursor: "pointer",
                flex: 1,
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 500,
                background: "#2C2C2A",
                color: "#fff",
                fontFamily: "inherit",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#444441")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#2C2C2A")
              }
            >
              {isLastStep ? (
                <>
                  Gerar contrato
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Próximo
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Coluna direita — preview ao vivo */}
        <div
          style={{
            height: "calc(100vh - 63px)",
            overflowY: "auto",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            background: "#FAFAF8",
          }}
        >
          <ContractPreview template={template} formData={formData} />
        </div>
      </div>
    </div>
  );
}
