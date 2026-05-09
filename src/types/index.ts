export interface RedFlag {
  script: string;
  explanation: string;
}

export interface Case {
  summary: string;
  amount: string;
  contributor: string;
}

export interface Scam {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  tags: string[];
  severity: 'high' | 'medium' | 'low';
  amountRange: string;
  scripts: string[];
  redFlags: RedFlag[];
  cases: Case[];
  actions: string[];
  sourceUrl?: string;
  sourceName?: string;
  publishedAt: string;
  updatedAt: string;
  viewCount: number;
  hotScore: number;
}

export interface Contribution {
  id: string;
  category: string;
  scripts: string;
  amount: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
}
