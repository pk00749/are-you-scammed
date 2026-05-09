import { Scam } from '@/types';

export interface SearchOptions {
  query: string;
  sortBy?: 'hotScore' | 'recent' | 'relevance';
}

export interface SearchResult {
  scam: Scam;
  matchScore: number;
  matchedFields: string[];
}

// Calculate relevance score based on keyword matches
function calculateMatchScore(scam: Scam, query: string): { score: number; matchedFields: string[] } {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  const matchedFields: string[] = [];

  // Title match (highest weight)
  if (scam.title.toLowerCase().includes(lowerQuery)) {
    score += 30;
    matchedFields.push('title');
  }

  // Tag match
  if (scam.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
    score += 20;
    matchedFields.push('tags');
  }

  // Scripts match (high weight - core content)
  const matchingScripts = scam.scripts.filter(s => s.toLowerCase().includes(lowerQuery));
  if (matchingScripts.length > 0) {
    score += 25 * Math.min(matchingScripts.length, 3); // Cap at 3 matches
    matchedFields.push('scripts');
  }

  // Category match
  if (scam.category.toLowerCase().includes(lowerQuery)) {
    score += 15;
    matchedFields.push('category');
  }

  // Red flags match
  const matchingRedFlags = scam.redFlags.filter(
    rf => rf.script.toLowerCase().includes(lowerQuery) ||
          rf.explanation.toLowerCase().includes(lowerQuery)
  );
  if (matchingRedFlags.length > 0) {
    score += 10 * Math.min(matchingRedFlags.length, 3);
    matchedFields.push('redFlags');
  }

  // Case summary match
  if (scam.cases.some(c => c.summary.toLowerCase().includes(lowerQuery))) {
    score += 5;
    matchedFields.push('cases');
  }

  return { score, matchedFields };
}

// Highlight matched text
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return `${before}<mark class="bg-yellow-200">${match}</mark>${after}`;
}

// Main search function
export function searchScams(scams: Scam[], options: SearchOptions): SearchResult[] {
  const { query, sortBy = 'relevance' } = options;

  const results: SearchResult[] = [];

  if (!query.trim()) {
    // Return all scams
    for (const scam of scams) {
      results.push({
        scam,
        matchScore: scam.hotScore,
        matchedFields: [],
      });
    }
  } else {
    // Search and filter
    for (const scam of scams) {
      const { score, matchedFields } = calculateMatchScore(scam, query);

      if (score > 0) {
        results.push({ scam, matchScore: score, matchedFields });
      }
    }
  }

  // Sort results
  switch (sortBy) {
    case 'hotScore':
      results.sort((a, b) => b.scam.hotScore - a.scam.hotScore);
      break;
    case 'recent':
      results.sort((a, b) =>
        new Date(b.scam.publishedAt).getTime() - new Date(a.scam.publishedAt).getTime()
      );
      break;
    case 'relevance':
    default:
      // For relevance, keep original order if scores are equal
      if (query.trim()) {
        results.sort((a, b) => b.matchScore - a.matchScore);
      }
      break;
  }

  return results;
}

// Get search suggestions based on partial query
export function getSearchSuggestions(scams: Scam[], query: string, limit: number = 5): string[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  for (const scam of scams) {
    // Add title if matches
    if (scam.title.toLowerCase().includes(lowerQuery)) {
      suggestions.add(scam.title);
    }

    // Add matching tags
    for (const tag of scam.tags) {
      if (tag.toLowerCase().includes(lowerQuery)) {
        suggestions.add(tag);
      }
    }

    // Add matching scripts (truncated)
    for (const script of scam.scripts) {
      if (script.toLowerCase().includes(lowerQuery)) {
        suggestions.add(script.slice(0, 30) + (script.length > 30 ? '...' : ''));
      }
    }
  }

  return Array.from(suggestions).slice(0, limit);
}
