export interface Lead {
  id: string;
  email: string;
  name: string | null;
  source: 'quiz' | 'report' | 'newsletter' | 'tool' | 'contact';
  tool_used: string | null;
  business_name: string | null;
  tags: string[];
  consent_marketing: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
  consent_marketing: boolean;
  created_at: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  readingTime: string;
  image: string;
  content: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  date: string;
  image: string;
  content: string;
}
