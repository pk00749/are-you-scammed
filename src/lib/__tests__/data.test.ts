import { describe, it, expect } from 'vitest';
import {
  getAllScams,
  getScamBySlug,
  getScamsByCategory,
  getCategories,
  getCategoryBySlug,
  getHotScams,
  getAllTags,
  getScamsByTag
} from '@/lib/data';

describe('getAllScams', () => {
  it('should return all scams', () => {
    const allScams = getAllScams();
    expect(allScams.length).toBeGreaterThan(0);
  });
});

describe('getScamBySlug', () => {
  it('should return scam by slug', () => {
    const scam = getScamBySlug('pig-butchering');
    expect(scam).toBeDefined();
    expect(scam?.title).toBe('杀猪盘');
  });

  it('should return undefined for non-existent slug', () => {
    const scam = getScamBySlug('non-existent');
    expect(scam).toBeUndefined();
  });
});

describe('getScamsByCategory', () => {
  it('should return scams for a category', () => {
    const categoryScams = getScamsByCategory('job-scam');
    expect(categoryScams.length).toBeGreaterThan(0);
    categoryScams.forEach(scam => {
      expect(scam.categorySlug).toBe('job-scam');
    });
  });
});

describe('getCategories', () => {
  it('should return all categories', () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(10);
  });
});

describe('getCategoryBySlug', () => {
  it('should return category by slug', () => {
    const category = getCategoryBySlug('pig-butchering');
    expect(category).toBeDefined();
    expect(category?.name).toBe('杀猪盘诈骗');
  });

  it('should return undefined for non-existent slug', () => {
    const category = getCategoryBySlug('non-existent');
    expect(category).toBeUndefined();
  });
});

describe('getHotScams', () => {
  it('should return scams sorted by hot score', () => {
    const hotScams = getHotScams(5);
    expect(hotScams.length).toBeLessThanOrEqual(5);

    for (let i = 1; i < hotScams.length; i++) {
      expect(hotScams[i - 1].hotScore).toBeGreaterThanOrEqual(hotScams[i].hotScore);
    }
  });

  it('should return all scams if limit exceeds total', () => {
    const hotScams = getHotScams(100);
    const allScams = getAllScams();
    expect(hotScams.length).toBe(allScams.length);
  });
});

describe('getAllTags', () => {
  it('should return all unique tags', () => {
    const allTags = getAllTags();
    expect(allTags.length).toBeGreaterThan(0);

    const uniqueTags = new Set(allTags);
    expect(uniqueTags.size).toBe(allTags.length);
  });
});

describe('getScamsByTag', () => {
  it('should return scams containing the tag', () => {
    const tagScams = getScamsByTag('网恋');
    expect(tagScams.length).toBeGreaterThan(0);
    tagScams.forEach(scam => {
      expect(scam.tags).toContain('网恋');
    });
  });

  it('should return empty array for non-existent tag', () => {
    const tagScams = getScamsByTag('non-existent-tag');
    expect(tagScams.length).toBe(0);
  });
});
