import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  description: string;
  coverImage: string;
  tags: string[];
}

export interface WorkFrontmatter {
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  outcome: string;
  coverImage: string;
  date: string;
}

export function getBlogPosts(): BlogFrontmatter[] {
  const dir = path.join(CONTENT_DIR, 'blog');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data } = matter(raw);
      return data as BlogFrontmatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(
  slug: string
): { frontmatter: BlogFrontmatter; content: string } | null {
  const dir = path.join(CONTENT_DIR, 'blog');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return { frontmatter: data as BlogFrontmatter, content };
    }
  }

  return null;
}

export function getCaseStudies(): WorkFrontmatter[] {
  const dir = path.join(CONTENT_DIR, 'work');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data } = matter(raw);
      return data as WorkFrontmatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudy(
  slug: string
): { frontmatter: WorkFrontmatter; content: string } | null {
  const dir = path.join(CONTENT_DIR, 'work');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return { frontmatter: data as WorkFrontmatter, content };
    }
  }

  return null;
}
