import { useState, useCallback } from "react";
import type { ContractTemplate, TemplateField } from "../types";

// Agrupa os fields do template em etapas de até STEP_SIZE campos cada
const STEP_SIZE = 2;

export interface FormStep {
  title: string;
  fields: TemplateField[];
}

function buildSteps(template: ContractTemplate): FormStep[] {
  const fields = template.fields;
  const steps: FormStep[] = [];

  for (let i = 0; i < fields.length; i += STEP_SIZE) {
    const chunk = fields.slice(i, i + STEP_SIZE);
    // Título automático baseado nos campos da etapa
    const title = inferStepTitle(chunk, i);
    steps.push({ title, fields: chunk });
  }

  return steps;
}

function inferStepTitle(fields: TemplateField[], startIndex: number): string {
  const ids = fields.map((f) => f.id).join(" ");

  if (
    ids.includes("contratante") ||
    ids.includes("empresa") ||
    ids.includes("parceiro_a") ||
    ids.includes("parte_a")
  )
    return "Parte contratante";
  if (
    ids.includes("contratado") ||
    ids.includes("prestador") ||
    ids.includes("parceiro_b") ||
    ids.includes("parte_b")
  )
    return "Parte contratada";
  if (
    ids.includes("descricao") ||
    ids.includes("servico") ||
    ids.includes("objeto") ||
    ids.includes("finalidade")
  )
    return "Detalhes do serviço";
  if (
    ids.includes("valor") ||
    ids.includes("duracao") ||
    ids.includes("participacao")
  )
    return "Valores e prazo";
  if (ids.includes("data") || ids.includes("cidade") || ids.includes("prazo"))
    return "Datas e local";

  return `Etapa ${Math.floor(startIndex / STEP_SIZE) + 1}`;
}

export interface UseFormStepsReturn {
  steps: FormStep[];
  currentStep: number;
  currentFields: TemplateField[];
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (fieldId: string, value: string) => void;
  goNext: () => boolean; // retorna true se avançou
  goBack: () => void;
  goToStep: (index: number) => void;
  validateStep: (stepIndex: number) => boolean;
  isStepComplete: (stepIndex: number) => boolean;
}

export function useFormSteps(template: ContractTemplate): UseFormStepsReturn {
  const steps = buildSteps(template);
  const totalSteps = steps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentFields = steps[currentStep]?.fields ?? [];

  const handleChange = useCallback((fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    // Limpa o erro do campo ao digitar
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (stepIndex: number): boolean => {
      const stepFields = steps[stepIndex]?.fields ?? [];
      const newErrors: Record<string, string> = {};

      for (const field of stepFields) {
        const value = formData[field.id]?.trim() ?? "";
        if (field.required && !value) {
          newErrors[field.id] = "Campo obrigatório";
          continue;
        }
        if (value && field.mask === "cpf" && !isValidCPF(value)) {
          newErrors[field.id] = "CPF inválido";
        }
        if (value && field.mask === "cnpj" && !isValidCNPJ(value)) {
          newErrors[field.id] = "CNPJ inválido";
        }
        if (
          value &&
          field.type === "number" &&
          isNaN(Number(value.replace(",", ".")))
        ) {
          newErrors[field.id] = "Informe um número válido";
        }
      }

      setErrors((prev) => ({ ...prev, ...newErrors }));
      return Object.keys(newErrors).length === 0;
    },
    [steps, formData],
  );

  const isStepComplete = useCallback(
    (stepIndex: number): boolean => {
      const stepFields = steps[stepIndex]?.fields ?? [];
      return stepFields.every(
        (f) => !f.required || (formData[f.id]?.trim() ?? "") !== "",
      );
    },
    [steps, formData],
  );

  const goNext = useCallback((): boolean => {
    const valid = validateStep(currentStep);
    if (valid && currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      return true;
    }
    return valid;
  }, [currentStep, totalSteps, validateStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const goToStep = useCallback(
    (index: number) => {
      // Só permite ir para etapas anteriores ou a próxima se a atual estiver completa
      if (
        index < currentStep ||
        (index === currentStep + 1 && isStepComplete(currentStep))
      ) {
        setCurrentStep(index);
      }
    },
    [currentStep, isStepComplete],
  );

  return {
    steps,
    currentStep,
    currentFields,
    totalSteps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    progress:
      totalSteps === 0 ? 0 : Math.round(((currentStep + 1) / totalSteps) * 100),
    formData,
    errors,
    handleChange,
    goNext,
    goBack,
    goToStep,
    validateStep,
    isStepComplete,
  };
}

// ─── Validadores ──────────────────────────────────────────────────────────────

function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(digits[10]);
}

function isValidCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;
  const calc = (d: string, weights: number[]) =>
    weights.reduce((acc, w, i) => acc + parseInt(d[i]) * w, 0);
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const r1 = calc(digits, w1) % 11;
  const d1 = r1 < 2 ? 0 : 11 - r1;
  const r2 = calc(digits, w2) % 11;
  const d2 = r2 < 2 ? 0 : 11 - r2;
  return d1 === parseInt(digits[12]) && d2 === parseInt(digits[13]);
}
