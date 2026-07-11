import type { ShowcaseProject } from "@/types/project";

export const projects: ShowcaseProject[] = [
  {
    id: 1,
    title: "AI Customer Support Agent",
    description:
      "Build a multilingual support assistant that handles FAQs, escalations, and live handoffs across channels.",
    difficulty: "Intermediate",
    technologies: ["OpenAI", "LangChain", "Supabase", "WhatsApp API"],
    icon: "Headphones",
  },
  {
    id: 2,
    title: "RAG Document Q&A System",
    description:
      "Create a private knowledge base that answers questions from uploaded PDFs and internal documents.",
    difficulty: "Advanced",
    technologies: ["Flowise", "Pinecone", "OpenAI"],
    icon: "FileSearch",
  },
  {
    id: 3,
    title: "AI Interview Chatbot",
    description:
      "Design an interactive mock-interview bot with role-specific questions and real-time feedback.",
    difficulty: "Beginner",
    technologies: ["Groq", "Next.js", "Supabase"],
    icon: "MessageSquare",
  },
  {
    id: 4,
    title: "Resume Screening System",
    description:
      "Automate resume parsing, skill extraction, and candidate ranking for hiring workflows.",
    difficulty: "Intermediate",
    technologies: ["Python", "OpenAI", "FastAPI"],
    icon: "FileText",
  },
  {
    id: 5,
    title: "Lead Generation Automation Agent",
    description:
      "Scrape, enrich, and qualify leads automatically with AI-powered outreach sequences.",
    difficulty: "Intermediate",
    technologies: ["n8n", "Google Sheets", "GPT"],
    icon: "Target",
  },
  {
    id: 6,
    title: "Social Media Content Generator",
    description:
      "Generate platform-ready posts, captions, and visuals for multi-channel social campaigns.",
    difficulty: "Beginner",
    technologies: ["Dify", "Canva", "OpenAI"],
    icon: "Share2",
  },
  {
    id: 7,
    title: "Multimodal Vision Classifier",
    description:
      "Classify images and video frames using CLIP embeddings with a production-ready API.",
    difficulty: "Advanced",
    technologies: ["Python", "CLIP", "FastAPI"],
    icon: "Eye",
  },
  {
    id: 8,
    title: "Voice AI Assistant",
    description:
      "Build a voice-first assistant with speech-to-text, reasoning, and natural voice responses.",
    difficulty: "Advanced",
    technologies: ["Whisper", "ElevenLabs", "OpenAI"],
    icon: "Mic",
  },
  {
    id: 9,
    title: "AI Sales Outreach Agent",
    description:
      "Orchestrate personalized email outreach with follow-ups and CRM integration.",
    difficulty: "Intermediate",
    technologies: ["LangGraph", "Gmail API", "OpenAI"],
    icon: "Mail",
  },
  {
    id: 10,
    title: "Multi-Agent Research Assistant",
    description:
      "Deploy collaborating agents that research, summarize, and synthesize complex topics.",
    difficulty: "Advanced",
    technologies: ["CrewAI", "LangChain", "OpenAI"],
    icon: "Network",
  },
];
