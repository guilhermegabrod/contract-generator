import type { FormStep } from "../hooks/useFormSteps";

interface StepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
  isStepComplete: (index: number) => boolean;
  onStepClick: (index: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  isStepComplete,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}
    >
      {steps.map((step, i) => {
        const done = isStepComplete(i) && i < currentStep;
        const active = i === currentStep;
        const clickable =
          i < currentStep ||
          (i === currentStep + 1 && isStepComplete(currentStep));

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < steps.length - 1 ? 1 : "none",
            }}
          >
            {/* Bolinha */}
            <button
              onClick={() => onStepClick(i)}
              disabled={!clickable && !done && !active}
              title={step.title}
              style={{
                all: "unset",
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "inherit",
                cursor: clickable || done ? "pointer" : "default",
                flexShrink: 0,
                transition: "all 0.2s",
                background: done ? "#0F6E56" : active ? "#2C2C2A" : "#F1EFE8",
                color: done || active ? "#fff" : "#888780",
                border: active
                  ? "2px solid #2C2C2A"
                  : done
                    ? "2px solid #0F6E56"
                    : "2px solid #E8E6DE",
              }}
            >
              {done ? (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </button>

            {/* Linha conectora */}
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? "#0F6E56" : "#E8E6DE",
                  transition: "background 0.3s",
                  margin: "0 4px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
