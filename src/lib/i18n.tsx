"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

export type Lang = "pt" | "en";

type StatWithValue = { value: string; label: string };
type StatWithHighlight = { highlight: string; items: string[] };
export type Stat = StatWithValue | StatWithHighlight;

interface NavLink { label: string; href: string }

interface CareerDeliver { label: string; description: string }

interface Translations {
  nav: { links: NavLink[]; cta: string };
  hero: {
    greeting: string;
    name: string;
    role: string;
    specialty: string;
    stats: Stat[];
    companiesTitle: string;
    companies: string[];
  };
  work: {
    title: string;
  };
  career: {
    title: string;
    cvButton: string;
    bioTitle: string;
    bio: string;
    deliversTitle: string;
    delivers: CareerDeliver[];
    numbersTitle: string;
    numbers: string[];
    certsTitle: string;
    certsCaption: string;
  };
  modals: {
    close: string;
    rotate: { title: string; subtitle: string };
    contact: {
      title: string;
      subtitle: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      successTitle: string;
      successText: string;
      errors: { name: string; email: string; emailInvalid: string; message: string };
      sendError: string;
    };
    booking: {
      tabLabel: string;
      title: string;
      subtitle: string;
      steps: { date: string; time: string; form: string };
      noSlots: string;
      chooseAnother: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      confirm: string;
      doneTitle: string;
      doneText: string;
      openMeet: string;
      months: string[];
      days: string[];
    };
    cases: {
      projectChallenge: string;
      designStrategy: string;
      resultsTitle: string;
      designToolkit: string;
      projectImpact: string;
      startJourneyAsIs: string;
      startJourneyToBe: string;
      bradesco: { strategyTitle: string; keyPainPoints: string; discoveryFootnote: string };
      nio: { strategyTitle: string };
    };
  };
}

const translations: Record<Lang, Translations> = {
  pt: {
    nav: {
      links: [
        { label: "Sobre Mim",      href: "#sobre" },
        { label: "Trabalho",       href: "#trabalho" },
        { label: "Carreira",       href: "#carreira" },
        { label: "Certificações",  href: "#certificacoes" },
      ],
      cta: "Vamos Conversar",
    },
    hero: {
      greeting: "Muito prazer!",
      name: "Eu sou Sergio Prando",
      role: "Senior Product Designer & Design Engineer",
      specialty: "Especialista em Transformação Digital com IA",
      stats: [
        { value: "10+", label: "Anos de\nExperiência" },
        { value: "20+", label: "Projetos\nEnterprise" },
        { highlight: "+20% reversão de cancelamentos\n-20% de Retrabalho (Design Ops)", items: ["Eficiência e Impacto real"] },
      ],
      companiesTitle: "Empresas que eu trabalhei",
      companies: [
        "Soluções Complexas em setores Financeiros e Telecom. AI Builder",
        "Customer Experience em Telecom com Zero UI",
        "Inovação e Transformação digital no setor de Seguros",
      ],
    },
    work: {
      title: "Trabalho",
    },
    career: {
      title: "Carreira",
      cvButton: "Meu Currículo",
      bioTitle: "Minha caminhada até aqui:",
      bio: "Estou na estrada de Inovação Digital e Design há mais de 10 anos. Nesse meio tempo eu tive grandes oportunidades e muitas dores de cabeça, mas em todas elas eu consegui gerar muito impacto com o meu trabalho e transformar a vida das pessoas. Meu trabalho circula entre mais de uma área profissional: UX Strategy, Research, UI Design e mais recentemente a famosa área de Design Engineering.",
      deliversTitle: "O que entrego:",
      delivers: [
        { label: "Agente UX & Zero UI:", description: "Projeto experiências para agentes autônomos e interfaces invisíveis, utilizando IA Generativa para reduzir fricção e proativar decisões complexas." },
        { label: "Design Engineering:", description: "Domínio do MCP (Model Context Protocol) e Design Tokens/Systems, garantindo que o UI design seja um sistema codificável e escalável, totalmente integrado ao desenvolvimento." },
        { label: "Modernização de Legados:", description: "Expertise em extrair valor de plataformas robustas como PEGA, Salesforce e HubSpot, unificando jornadas em ambientes de alta criticidade e baixa tolerância à falhas." },
      ],
      numbersTitle: "Alguns números que me orgulho:",
      numbers: [
        "Redução de 20% de retrabalho através de Design Ops e Systems.",
        "Otimização de fluxos críticos de D+7 para D+0 (aumento de 20% em conversão).",
        "Redução de 25% no volume de chamados via automação inteligente (Nível 1).",
      ],
      certsTitle: "Certificações",
      certsCaption: "Design e Experiência do Usuário",
    },
    modals: {
      close: "Fechar",
      rotate: {
        title: "Vire o seu celular na horizontal",
        subtitle: "para uma melhor visualização",
      },
      contact: {
        title: "Vamos Conversar",
        subtitle: "Fico feliz pelo seu interesse no meu trabalho, como eu posso te ajudar hoje?",
        namePlaceholder: "Seu nome",
        emailPlaceholder: "Seu email",
        messagePlaceholder: "Sua mensagem",
        send: "Enviar mensagem",
        sending: "Enviando…",
        successTitle: "Email enviado com sucesso!",
        successText: "Sua mensagem foi enviada com sucesso, logo vamos conversar sobre como podemos trabalhar juntos.",
        errors: {
          name: "Você não preencheu o campo de nome.",
          email: "Você não preencheu o campo de e-mail.",
          emailInvalid: "Preciso que você coloque um e-mail válido para que eu possa respondê-lo.",
          message: "Você não preencheu o campo de mensagem.",
        },
        sendError: "Erro ao enviar. Tente novamente.",
      },
      booking: {
        tabLabel: "Agendar reunião",
        title: "Agendar uma reunião",
        subtitle: "30 min · Google Meet · Grátis",
        steps: { date: "Escolha a data", time: "Escolha o horário", form: "Seus dados" },
        noSlots: "Sem horários disponíveis",
        chooseAnother: "Escolha outra data.",
        namePlaceholder: "Nome completo",
        emailPlaceholder: "E-mail",
        subjectPlaceholder: "Assunto da reunião (opcional)",
        confirm: "Confirmar agendamento",
        doneTitle: "Reunião agendada!",
        doneText: "Confira seu e-mail para o link do Google Meet.",
        openMeet: "Abrir Google Meet",
        months: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        days: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
      },
      cases: {
        projectChallenge: "Desafio do Projeto",
        designStrategy: "Estratégia de Design e Execução",
        resultsTitle: "Resultado e Entrega de Valor",
        designToolkit: "Design Toolkit",
        projectImpact: "Impacto do Projeto",
        startJourneyAsIs: "Iniciar Jornada As Is",
        startJourneyToBe: "Iniciar Jornada To Be",
        bradesco: {
          strategyTitle: "Estratégia de Design focada em Valor e Viabilidade",
          keyPainPoints: "Principais Dores Mapeadas:",
          discoveryFootnote: "Entrevista em profundidade | 16 pessoas | Tempo Médio 30min",
        },
        nio: { strategyTitle: "Pilares do Design Engineering no Projeto" },
      },
    },
  },
  en: {
    nav: {
      links: [
        { label: "About Me",       href: "#sobre" },
        { label: "Work",           href: "#trabalho" },
        { label: "Career",         href: "#carreira" },
        { label: "Certifications", href: "#certificacoes" },
      ],
      cta: "Let's Talk",
    },
    hero: {
      greeting: "Nice to meet you!",
      name: "I'm Sergio Prando",
      role: "Senior Product Designer & Design Engineer",
      specialty: "Digital Transformation Specialist with AI",
      stats: [
        { value: "10+", label: "Years of\nExperience" },
        { value: "20+", label: "Enterprise\nProjects" },
        { highlight: "+35% Revenue Growth\n-20% Rework (Design Ops)", items: ["Efficiency & Real Impact"] },
      ],
      companiesTitle: "Companies I've worked with",
      companies: [
        "Complex Solutions in Financial and Telecom sectors. AI Builder",
        "Customer Experience in Telecom with Zero UI",
        "Innovation and Digital Transformation in Insurance",
      ],
    },
    work: {
      title: "Work",
    },
    career: {
      title: "Career",
      cvButton: "My Resume",
      bioTitle: "My journey so far:",
      bio: "I've been on the road of Digital Innovation and Design for over 10 years. Along the way I've had great opportunities and plenty of headaches, but in every single one I managed to create real impact through my work and transform people's lives. My work spans more than one professional area: UX Strategy, Research, UI Design and, more recently, the exciting field of Design Engineering.",
      deliversTitle: "What I deliver:",
      delivers: [
        { label: "UX Agent & Zero UI:", description: "I design experiences for autonomous agents and invisible interfaces, using Generative AI to reduce friction and proactively enable complex decisions." },
        { label: "Design Engineering:", description: "Mastery of MCP (Model Context Protocol) and Design Tokens/Systems, ensuring UI design is a codeable, scalable system fully integrated into development." },
        { label: "Legacy Modernisation:", description: "Expertise in extracting value from robust platforms such as PEGA, Salesforce and HubSpot, unifying journeys in high-criticality, low-fault-tolerance environments." },
      ],
      numbersTitle: "Numbers I'm proud of:",
      numbers: [
        "20% reduction in rework through Design Ops and Systems.",
        "Optimisation of critical flows from D+7 to D+0 (20% increase in conversion).",
        "25% reduction in support tickets through intelligent automation (Level 1).",
      ],
      certsTitle: "Certifications",
      certsCaption: "Design and User Experience",
    },
    modals: {
      close: "Close",
      rotate: {
        title: "Rotate your phone to landscape",
        subtitle: "for a better viewing experience",
      },
      contact: {
        title: "Let's Talk",
        subtitle: "I'm glad you're interested in my work — how can I help you today?",
        namePlaceholder: "Your name",
        emailPlaceholder: "Your email",
        messagePlaceholder: "Your message",
        send: "Send message",
        sending: "Sending…",
        successTitle: "Email sent successfully!",
        successText: "Your message was sent successfully — we'll soon be talking about how we can work together.",
        errors: {
          name: "Please fill in the name field.",
          email: "Please fill in the email field.",
          emailInvalid: "Please enter a valid email address so I can reply to you.",
          message: "Please fill in the message field.",
        },
        sendError: "Failed to send. Please try again.",
      },
      booking: {
        tabLabel: "Schedule a meeting",
        title: "Schedule a meeting",
        subtitle: "30 min · Google Meet · Free",
        steps: { date: "Choose a date", time: "Choose a time", form: "Your details" },
        noSlots: "No available slots",
        chooseAnother: "Please choose another date.",
        namePlaceholder: "Full name",
        emailPlaceholder: "Email",
        subjectPlaceholder: "Meeting subject (optional)",
        confirm: "Confirm booking",
        doneTitle: "Meeting booked!",
        doneText: "Check your email for the Google Meet link.",
        openMeet: "Open Google Meet",
        months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      },
      cases: {
        projectChallenge: "Project Challenge",
        designStrategy: "Design Strategy & Execution",
        resultsTitle: "Results & Value Delivery",
        designToolkit: "Design Toolkit",
        projectImpact: "Project Impact",
        startJourneyAsIs: "Start As Is Journey",
        startJourneyToBe: "Start To Be Journey",
        bradesco: {
          strategyTitle: "Design Strategy focused on Value and Feasibility",
          keyPainPoints: "Key Pain Points Mapped:",
          discoveryFootnote: "In-depth interview | 16 people | Average time 30 min",
        },
        nio: { strategyTitle: "Design Engineering Pillars in the Project" },
      },
    },
  },
};

interface LangContextType {
  lang: Lang;
  switching: boolean;
  switchLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [switching, setSwitching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const browserLang = (navigator.language || "").toLowerCase();
    setLang(browserLang.startsWith("pt") ? "pt" : "en");
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const switchLang = (newLang: Lang) => {
    if (newLang === lang) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSwitching(true);
    timeoutRef.current = setTimeout(() => {
      setLang(newLang);
      setSwitching(false);
    }, 300);
  };

  return (
    <LangContext.Provider value={{ lang, switching, switchLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
