import { Contribution } from '@/types';

const CONTRIBUTIONS_KEY = 'pianlema_contributions';

// Get all contributions from localStorage
export function getContributions(): Contribution[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(CONTRIBUTIONS_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Save a new contribution
export function saveContribution(data: Omit<Contribution, 'id' | 'createdAt' | 'status'>): Contribution {
  const contribution: Contribution = {
    ...data,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const contributions = getContributions();
  contributions.unshift(contribution); // Add to beginning

  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(contributions));
  }

  return contribution;
}

// Get contribution by ID
export function getContributionById(id: string): Contribution | undefined {
  const contributions = getContributions();
  return contributions.find(c => c.id === id);
}

// Update contribution status (admin function)
export function updateContributionStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected'
): boolean {
  const contributions = getContributions();
  const index = contributions.findIndex(c => c.id === id);

  if (index === -1) return false;

  contributions[index].status = status;
  contributions[index].reviewedAt = new Date().toISOString();

  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(contributions));
  }

  return true;
}

// Delete contribution
export function deleteContribution(id: string): boolean {
  const contributions = getContributions();
  const filtered = contributions.filter(c => c.id !== id);

  if (filtered.length === contributions.length) return false;

  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(filtered));
  }

  return true;
}

// Get pending contributions count
export function getPendingCount(): number {
  return getContributions().filter(c => c.status === 'pending').length;
}

// Validate contribution data
export function validateContribution(data: {
  category?: string;
  scripts?: string;
  amount?: string;
  description?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.category?.trim()) {
    errors.push('请选择骗局类型');
  }

  if (!data.scripts?.trim()) {
    errors.push('请填写骗子的话术');
  } else if (data.scripts.trim().length < 10) {
    errors.push('话术描述至少10个字');
  }

  if (!data.amount?.trim()) {
    errors.push('请填写涉案金额或损失物品');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
