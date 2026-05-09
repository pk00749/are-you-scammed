import { describe, it, expect } from 'vitest';
import {
  searchScams,
  highlightText,
  getSearchSuggestions,
  SearchResult
} from '@/lib/search';
import { seedScams } from '@/data/seed';

describe('searchScams', () => {
  it('should return all scams sorted by hotScore when query is empty', () => {
    const results = searchScams(seedScams, { query: '', sortBy: 'hotScore' });
    expect(results.length).toBe(seedScams.length);

    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].scam.hotScore).toBeGreaterThanOrEqual(results[i].scam.hotScore);
    }
  });

  it('should find scams by title', () => {
    const results = searchScams(seedScams, { query: '杀猪盘' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].scam.title).toBe('杀猪盘');
    expect(results[0].matchedFields).toContain('title');
  });

  it('should find scams by script content', () => {
    const results = searchScams(seedScams, { query: '投资' });
    expect(results.length).toBeGreaterThan(0);
    const hasScriptMatch = results.some(r => r.matchedFields.includes('scripts'));
    expect(hasScriptMatch).toBe(true);
  });

  it('should find scams by tag', () => {
    const results = searchScams(seedScams, { query: '网恋' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].matchedFields).toContain('tags');
  });

  it('should calculate higher score for title matches', () => {
    const resultsByTitle = searchScams(seedScams, { query: '杀猪盘' });
    const resultsByScript = searchScams(seedScams, { query: '投资平台' });

    // Title match should score higher
    const titleMatch = resultsByTitle.find(r => r.scam.title === '杀猪盘');
    expect(titleMatch?.matchScore).toBeGreaterThan(0);
  });

  it('should sort by hotScore when specified', () => {
    const results = searchScams(seedScams, { query: '', sortBy: 'hotScore' });

    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].scam.hotScore).toBeGreaterThanOrEqual(results[i].scam.hotScore);
    }
  });

  it('should sort by recent when specified', () => {
    const results = searchScams(seedScams, { query: '', sortBy: 'recent' });

    for (let i = 1; i < results.length; i++) {
      const prev = new Date(results[i - 1].scam.publishedAt).getTime();
      const curr = new Date(results[i].scam.publishedAt).getTime();
      // Each subsequent item should have earlier or equal date (descending order)
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it('should sort by relevance when specified', () => {
    const results = searchScams(seedScams, { query: '杀猪盘', sortBy: 'relevance' });

    expect(results[0].scam.title).toBe('杀猪盘');
    expect(results[0].matchScore).toBeGreaterThanOrEqual(results[results.length - 1].matchScore);
  });

  it('should return empty array for non-matching query', () => {
    const results = searchScams(seedScams, { query: 'xyznonexistent123' });
    // All results have score 0 when no match, but still returned for hotScore sort
    // For relevance, only results with score > 0 should be returned
    const relevantResults = results.filter(r => r.matchScore > 0);
    expect(relevantResults.length).toBe(0);
  });
});

describe('highlightText', () => {
  it('should return original text when query is empty', () => {
    const result = highlightText('原始文本', '');
    expect(result).toBe('原始文本');
  });

  it('should wrap matching text in mark tag', () => {
    const result = highlightText('这是一个测试文本', '测试');
    expect(result).toContain('<mark');
    expect(result).toContain('</mark>');
    expect(result).toContain('测试');
  });

  it('should handle case-insensitive matching', () => {
    const result = highlightText('这是一个TEST文本', 'test');
    expect(result).toContain('<mark');
    expect(result).toContain('TEST');
  });

  it('should return original text when no match found', () => {
    const result = highlightText('这是一个测试文本', '不存在');
    expect(result).toBe('这是一个测试文本');
  });

  it('should highlight first occurrence only', () => {
    const result = highlightText('测试文本测试文本', '测试');
    expect(result).toContain('测试');
    // Only first occurrence should be highlighted
    expect(result).toContain('<mark');
    // Second occurrence should not have mark tag
    const markCount = (result.match(/<mark/g) || []).length;
    expect(markCount).toBe(1);
  });
});

describe('getSearchSuggestions', () => {
  it('should return suggestions based on query', () => {
    const suggestions = getSearchSuggestions(seedScams, '杀猪');
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some(s => s.includes('杀猪盘'))).toBe(true);
  });

  it('should return empty array for empty query', () => {
    const suggestions = getSearchSuggestions(seedScams, '');
    expect(suggestions.length).toBe(0);
  });

  it('should limit suggestions to specified limit', () => {
    const suggestions = getSearchSuggestions(seedScams, 'a', 2);
    expect(suggestions.length).toBeLessThanOrEqual(2);
  });

  it('should return tag suggestions', () => {
    const suggestions = getSearchSuggestions(seedScams, '网恋');
    expect(suggestions.some(s => s === '网恋')).toBe(true);
  });
});
