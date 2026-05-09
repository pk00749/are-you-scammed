import { seedScams, categories } from '@/data/seed';
import { Scam, Category } from '@/types';

export function getAllScams(): Scam[] {
  return seedScams;
}

export function getScamBySlug(slug: string): Scam | undefined {
  return seedScams.find(s => s.slug === slug);
}

export function getScamsByCategory(categorySlug: string): Scam[] {
  return seedScams.filter(s => s.categorySlug === categorySlug);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getHotScams(limit: number = 5): Scam[] {
  return [...seedScams]
    .sort((a, b) => b.hotScore - a.hotScore)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  seedScams.forEach(scam => {
    scam.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

export function getScamsByTag(tag: string): Scam[] {
  return seedScams.filter(scam => scam.tags.includes(tag));
}
