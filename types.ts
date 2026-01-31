
export interface ProjectSection {
  type: 'text' | 'code' | 'image' | 'list' | 'flow' | 'video' | 'slideshow';
  title?: string;
  content?: string;
  code?: string;
  language?: string;
  imageUrl?: string;
  videoUrl?: string;
  images?: string[];
  caption?: string;
  items?: string[];
  flow?: { step: string; label: string; details: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  content?: string;
  imageUrl?: string;
  sections?: ProjectSection[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  category: 'Cybersecurity' | 'OT/ICS' | 'AI & Machine Learning' | 'Other Training';
  logo?: string;
  imageUrl?: string;
  featured?: boolean;
  description?: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  bullets: string[];
}

export interface CtfChallengeImage {
  url: string;
  caption?: string;
}

export interface CtfChallenge {
  id: string;
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  description: string;
  writeup: string;
  flag?: string;
  images?: CtfChallengeImage[];
}

export interface CtfEvent {
  id: string;
  name: string;
  date: string;
  summary?: string;
  coverImages?: string[];
  challenges: CtfChallenge[];
}

export type Page = 'home' | 'projects' | 'ctf' | 'certifications' | 'experience' | 'contact' | 'admin';
