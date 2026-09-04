export type TemplateCategory =
  | "freelance"
  | "servicos"
  | "confidencialidade"
  | "parceria";

export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "date" | "number" | "textarea";
  required: boolean;
  mask?: "currency" | "cpf" | "cnpj";
}

export interface ContractTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  tags: string[];
  estimatedTime: string;
  fields: TemplateField[];
  body: string; // texto do contrato com {{placeholders}}
}

export interface Contract {
  id: string;
  templateId: string;
  templateName: string;
  createdAt: string;
  data: Record<string, string>;
}
