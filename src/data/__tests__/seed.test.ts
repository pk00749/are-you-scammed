import { describe, it, expect } from 'vitest';
import { seedScams, categories } from '@/data/seed';

describe('seedScams', () => {
  it('should have at least one scam', () => {
    expect(seedScams.length).toBeGreaterThan(0);
  });

  it('each scam should have valid id, title, slug', () => {
    seedScams.forEach(scam => {
      expect(scam.id).toBeTruthy();
      expect(scam.title).toBeTruthy();
      expect(scam.slug).toBeTruthy();
    });
  });

  it('each scam should have valid severity', () => {
    const validSeverities = ['high', 'medium', 'low'];
    seedScams.forEach(scam => {
      expect(validSeverities).toContain(scam.severity);
    });
  });

  it('each scam should have redFlags with script and explanation', () => {
    seedScams.forEach(scam => {
      scam.redFlags.forEach(flag => {
        expect(flag.script).toBeTruthy();
        expect(flag.explanation).toBeTruthy();
      });
    });
  });

  it('each scam should have non-empty cases', () => {
    seedScams.forEach(scam => {
      expect(scam.cases.length).toBeGreaterThan(0);
      scam.cases.forEach(c => {
        expect(c.summary).toBeTruthy();
        expect(c.amount).toBeTruthy();
        expect(c.contributor).toBe('热心用户提供');
      });
    });
  });

  it('each scam should have actions', () => {
    seedScams.forEach(scam => {
      expect(scam.actions.length).toBeGreaterThan(0);
    });
  });

  it('each scam should have valid viewCount and hotScore', () => {
    seedScams.forEach(scam => {
      expect(scam.viewCount).toBeGreaterThanOrEqual(0);
      expect(scam.hotScore).toBeGreaterThanOrEqual(0);
      expect(scam.hotScore).toBeLessThanOrEqual(100);
    });
  });
});

describe('categories', () => {
  it('should have at least 10 categories', () => {
    expect(categories.length).toBeGreaterThanOrEqual(10);
  });

  it('each category should have required fields', () => {
    categories.forEach(cat => {
      expect(cat.id).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.slug).toBeTruthy();
      expect(cat.description).toBeTruthy();
      expect(cat.keywords.length).toBeGreaterThan(0);
    });
  });

  it('each category should have unique slug', () => {
    const slugs = categories.map(c => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('each category should have unique id', () => {
    const ids = categories.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
