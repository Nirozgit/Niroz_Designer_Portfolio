export interface ProjectGalleryItem {
  url: string;
  caption: string;
  aspect?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  client: string;
  role: string;
  duration: string;
  deliverables: string[];
  image: string;
  aspectRatio?: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string;
  gallery: ProjectGalleryItem[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  status: string;
  isAvailable: boolean;
  intro: string;
  email: string;
  portraitImage: string;
  aboutImage: string;
  experienceYears: string;
  focus: string;
  availability: string;
  socials: SocialLink[];
}
