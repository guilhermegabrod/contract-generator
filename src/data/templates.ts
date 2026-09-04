import { type ContractTemplate } from "../types/index.ts";

export const templates: ContractTemplate[] = [
  {
    id: "freelance-desenvolvimento",
    name: "Contrato de Freela",
    category: "freelance",
    description:
      "Ideal para projetos de desenvolvimento, design ou consultoria. Cobre escopo, prazo, pagamento e propriedade intelectual.",
    tags: ["Dev", "Design", "Consultoria"],
    estimatedTime: "5 min",
    fields: [
      {
        id: "contratante_nome",
        label: "Nome do contratante",
        placeholder: "Ex: João Silva",
        type: "text",
        required: true,
      },
      {
        id: "contratante_cpf",
        label: "CPF do contratante",
        placeholder: "000.000.000-00",
        type: "text",
        required: true,
        mask: "cpf",
      },
      {
        id: "contratado_nome",
        label: "Seu nome completo",
        placeholder: "Ex: Maria Souza",
        type: "text",
        required: true,
      },
      {
        id: "contratado_cpf",
        label: "Seu CPF",
        placeholder: "000.000.000-00",
        type: "text",
        required: true,
        mask: "cpf",
      },
      {
        id: "descricao_servico",
        label: "Descrição do serviço",
        placeholder: "Ex: Desenvolvimento de landing page em React...",
        type: "textarea",
        required: true,
      },
      {
        id: "valor",
        label: "Valor total (R$)",
        placeholder: "0,00",
        type: "number",
        required: true,
        mask: "currency",
      },
      {
        id: "prazo_entrega",
        label: "Prazo de entrega",
        placeholder: "",
        type: "date",
        required: true,
      },
      {
        id: "data_inicio",
        label: "Data de início",
        placeholder: "",
        type: "date",
        required: true,
      },
      {
        id: "cidade",
        label: "Cidade",
        placeholder: "Ex: São Paulo - SP",
        type: "text",
        required: true,
      },
    ],
    body: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS FREELANCE

Pelo presente instrumento particular, as partes abaixo qualificadas celebram o presente Contrato de Prestação de Serviços Freelance, que se regerá pelas seguintes cláusulas e condições:

CONTRATANTE: {{contratante_nome}}, inscrito no CPF sob o nº {{contratante_cpf}}.

CONTRATADO: {{contratado_nome}}, inscrito no CPF sob o nº {{contratado_cpf}}.

CLÁUSULA 1 – DO OBJETO
O CONTRATADO se compromete a executar os seguintes serviços: {{descricao_servico}}.

CLÁUSULA 2 – DO PRAZO
Os serviços terão início em {{data_inicio}} e deverão ser entregues até {{prazo_entrega}}.

CLÁUSULA 3 – DO VALOR E PAGAMENTO
Pela execução dos serviços, o CONTRATANTE pagará ao CONTRATADO o valor total de R$ {{valor}}, conforme condições acordadas entre as partes.

CLÁUSULA 4 – DA PROPRIEDADE INTELECTUAL
Após a quitação integral do valor contratado, todos os direitos sobre os materiais produzidos serão transferidos ao CONTRATANTE.

CLÁUSULA 5 – DO FORO
As partes elegem o foro da comarca de {{cidade}} para dirimir quaisquer controvérsias decorrentes deste contrato.

{{cidade}}, {{data_inicio}}.

_______________________________          _______________________________
{{contratante_nome}}                              {{contratado_nome}}
CPF: {{contratante_cpf}}                          CPF: {{contratado_cpf}}`,
  },
  {
    id: "prestacao-servicos",
    name: "Prestação de Serviços",
    category: "servicos",
    description:
      "Para empresas e profissionais autônomos. Inclui cláusulas de rescisão, sigilo e responsabilidade civil.",
    tags: ["PJ", "Autônomo", "Recorrente"],
    estimatedTime: "7 min",
    fields: [
      {
        id: "empresa_nome",
        label: "Razão social da empresa",
        placeholder: "Ex: Tech Solutions Ltda",
        type: "text",
        required: true,
      },
      {
        id: "empresa_cnpj",
        label: "CNPJ da empresa",
        placeholder: "00.000.000/0000-00",
        type: "text",
        required: true,
        mask: "cnpj",
      },
      {
        id: "representante_nome",
        label: "Nome do representante",
        placeholder: "Ex: Carlos Mendes",
        type: "text",
        required: true,
      },
      {
        id: "prestador_nome",
        label: "Nome do prestador",
        placeholder: "Ex: Ana Lima",
        type: "text",
        required: true,
      },
      {
        id: "prestador_cpf",
        label: "CPF do prestador",
        placeholder: "000.000.000-00",
        type: "text",
        required: true,
        mask: "cpf",
      },
      {
        id: "servico",
        label: "Serviço contratado",
        placeholder: "Descreva o serviço...",
        type: "textarea",
        required: true,
      },
      {
        id: "valor_mensal",
        label: "Valor mensal (R$)",
        placeholder: "0,00",
        type: "number",
        required: true,
        mask: "currency",
      },
      {
        id: "duracao_meses",
        label: "Duração (meses)",
        placeholder: "12",
        type: "number",
        required: true,
      },
      {
        id: "data_inicio",
        label: "Data de início",
        placeholder: "",
        type: "date",
        required: true,
      },
      {
        id: "cidade",
        label: "Cidade",
        placeholder: "Ex: Campinas - SP",
        type: "text",
        required: true,
      },
    ],
    body: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

As partes abaixo qualificadas celebram o presente contrato:

CONTRATANTE: {{empresa_nome}}, inscrita no CNPJ nº {{empresa_cnpj}}, representada por {{representante_nome}}.

PRESTADOR: {{prestador_nome}}, CPF nº {{prestador_cpf}}.

CLÁUSULA 1 – DO OBJETO
O PRESTADOR se obriga a prestar os seguintes serviços: {{servico}}.

CLÁUSULA 2 – DO PRAZO
O contrato vigorará por {{duracao_meses}} meses, com início em {{data_inicio}}.

CLÁUSULA 3 – DA REMUNERAÇÃO
O CONTRATANTE pagará ao PRESTADOR o valor mensal de R$ {{valor_mensal}}, vencível no 5º dia útil de cada mês.

CLÁUSULA 4 – DA RESCISÃO
Qualquer das partes poderá rescindir o contrato mediante aviso prévio de 30 (trinta) dias.

CLÁUSULA 5 – DO SIGILO
O PRESTADOR se compromete a manter em sigilo todas as informações e dados obtidos no exercício de suas atividades.

{{cidade}}, {{data_inicio}}.

_______________________________          _______________________________
{{representante_nome}}                            {{prestador_nome}}
{{empresa_nome}}                                      CPF: {{prestador_cpf}}`,
  },
  {
    id: "nda",
    name: "Acordo de Confidencialidade",
    category: "confidencialidade",
    description:
      "NDA simples e eficaz para proteger informações sensíveis em reuniões, negociações e parcerias estratégicas.",
    tags: ["NDA", "Sigilo", "Negociação"],
    estimatedTime: "3 min",
    fields: [
      {
        id: "parte_a",
        label: "Nome/empresa (parte A)",
        placeholder: "Ex: Startup ABC",
        type: "text",
        required: true,
      },
      {
        id: "parte_b",
        label: "Nome/empresa (parte B)",
        placeholder: "Ex: João Silva",
        type: "text",
        required: true,
      },
      {
        id: "finalidade",
        label: "Finalidade da troca de informações",
        placeholder: "Ex: Avaliação de proposta de parceria comercial",
        type: "textarea",
        required: true,
      },
      {
        id: "duracao_anos",
        label: "Duração do sigilo (anos)",
        placeholder: "2",
        type: "number",
        required: true,
      },
      {
        id: "data_assinatura",
        label: "Data de assinatura",
        placeholder: "",
        type: "date",
        required: true,
      },
      {
        id: "cidade",
        label: "Cidade",
        placeholder: "Ex: São Paulo - SP",
        type: "text",
        required: true,
      },
    ],
    body: `ACORDO DE CONFIDENCIALIDADE E NÃO DIVULGAÇÃO (NDA)

As partes abaixo identificadas celebram o presente Acordo de Confidencialidade:

PARTE A: {{parte_a}}
PARTE B: {{parte_b}}

CLÁUSULA 1 – DA FINALIDADE
Este acordo é celebrado com o objetivo de: {{finalidade}}.

CLÁUSULA 2 – DAS INFORMAÇÕES CONFIDENCIAIS
Consideram-se confidenciais todas as informações técnicas, comerciais, financeiras e estratégicas trocadas entre as partes no âmbito da finalidade acima descrita.

CLÁUSULA 3 – DAS OBRIGAÇÕES
As partes se comprometem a não divulgar, reproduzir ou utilizar as informações recebidas para qualquer finalidade diversa da estabelecida neste acordo.

CLÁUSULA 4 – DA VIGÊNCIA
O presente acordo terá validade de {{duracao_anos}} anos a partir de {{data_assinatura}}.

CLÁUSULA 5 – DAS PENALIDADES
O descumprimento deste acordo sujeitará a parte infratora às sanções legais cabíveis, incluindo perdas e danos.

{{cidade}}, {{data_assinatura}}.

_______________________________          _______________________________
{{parte_a}}                                              {{parte_b}}`,
  },
  {
    id: "parceria",
    name: "Contrato de Parceria",
    category: "parceria",
    description:
      "Para formalizar acordos de co-criação, revenue share ou joint venture entre dois ou mais profissionais.",
    tags: ["Co-fundadores", "Revenue Share", "Joint Venture"],
    estimatedTime: "6 min",
    fields: [
      {
        id: "parceiro_a",
        label: "Nome do parceiro A",
        placeholder: "Ex: Bruno Costa",
        type: "text",
        required: true,
      },
      {
        id: "parceiro_a_cpf",
        label: "CPF do parceiro A",
        placeholder: "000.000.000-00",
        type: "text",
        required: true,
        mask: "cpf",
      },
      {
        id: "parceiro_b",
        label: "Nome do parceiro B",
        placeholder: "Ex: Fernanda Rocha",
        type: "text",
        required: true,
      },
      {
        id: "parceiro_b_cpf",
        label: "CPF do parceiro B",
        placeholder: "000.000.000-00",
        type: "text",
        required: true,
        mask: "cpf",
      },
      {
        id: "objeto_parceria",
        label: "Objeto da parceria",
        placeholder:
          "Ex: Desenvolvimento e comercialização de software SaaS...",
        type: "textarea",
        required: true,
      },
      {
        id: "participacao_a",
        label: "Participação do parceiro A (%)",
        placeholder: "50",
        type: "number",
        required: true,
      },
      {
        id: "participacao_b",
        label: "Participação do parceiro B (%)",
        placeholder: "50",
        type: "number",
        required: true,
      },
      {
        id: "data_inicio",
        label: "Data de início",
        placeholder: "",
        type: "date",
        required: true,
      },
      {
        id: "cidade",
        label: "Cidade",
        placeholder: "Ex: Rio de Janeiro - RJ",
        type: "text",
        required: true,
      },
    ],
    body: `CONTRATO DE PARCERIA EMPRESARIAL

As partes abaixo qualificadas estabelecem o presente Contrato de Parceria:

PARCEIRO A: {{parceiro_a}}, CPF nº {{parceiro_a_cpf}}.
PARCEIRO B: {{parceiro_b}}, CPF nº {{parceiro_b_cpf}}.

CLÁUSULA 1 – DO OBJETO
Os parceiros unem esforços para: {{objeto_parceria}}.

CLÁUSULA 2 – DA PARTICIPAÇÃO
Os resultados líquidos serão distribuídos na seguinte proporção:
- {{parceiro_a}}: {{participacao_a}}%
- {{parceiro_b}}: {{participacao_b}}%

CLÁUSULA 3 – DAS OBRIGAÇÕES
Cada parceiro se compromete a dedicar os esforços necessários para o sucesso do objeto desta parceria, agindo sempre com boa-fé e transparência.

CLÁUSULA 4 – DA VIGÊNCIA E RESCISÃO
A parceria inicia-se em {{data_inicio}} e vigorará por prazo indeterminado, podendo ser rescindida por qualquer das partes mediante aviso prévio de 60 dias.

CLÁUSULA 5 – DO FORO
Fica eleito o foro de {{cidade}} para dirimir eventuais conflitos.

{{cidade}}, {{data_inicio}}.

_______________________________          _______________________________
{{parceiro_a}}                                           {{parceiro_b}}
CPF: {{parceiro_a_cpf}}                              CPF: {{parceiro_b_cpf}}`,
  },
];

export const categoryLabels: Record<string, string> = {
  freelance: "Freelance",
  servicos: "Serviços",
  confidencialidade: "Confidencialidade",
  parceria: "Parceria",
};
