import { useState } from "react";
import type { ContractTemplate } from "./types/index.ts";
import { Home } from "./pages/Home.tsx";
import { Builder } from "./pages/Builder";
import { ExportPage } from "./pages/ExportPage";

type Step = "home" | "builder" | "export";

export default function App() {
  const [step, setStep] = useState<Step>("home");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ContractTemplate | null>(null);

  const [contractData, setContractData] = useState<Record<string, string>>({});

  const handleSelectTemplate = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setStep("builder");
  };

  const handleFinish = (data: Record<string, string>) => {
    setContractData(data);
    setStep("export");
  };

  if (step === "home") {
    return <Home onSelectTemplate={handleSelectTemplate} />;
  }

  if (step === "builder" && selectedTemplate) {
    return (
      <Builder
        template={selectedTemplate}
        onBack={() => setStep("home")}
        onFinish={handleFinish}
      />
    );
  }
  if (step === "export" && selectedTemplate) {
    return (
      <ExportPage
        template={selectedTemplate}
        formData={contractData}
        onBack={() => setStep("builder")}
        onNew={() => {
          setSelectedTemplate(null);
          setContractData({});
          setStep("home");
        }}
      />
    );
  }

  return null;
}
