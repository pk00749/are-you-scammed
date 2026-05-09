import { describe, it, expect } from 'vitest';
import {
  validateContribution,
  saveContribution,
  getContributions,
  deleteContribution,
} from '@/lib/contributions';

describe('validateContribution', () => {
  it('should return valid for complete data', () => {
    const result = validateContribution({
      category: '杀猪盘诈骗',
      scripts: '这是一段很长的话术描述，至少超过十个字',
      amount: '1万元',
      description: '这是描述',
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should return error for missing category', () => {
    const result = validateContribution({
      category: '',
      scripts: '这是很长的一段话术描述，至少超过十个字',
      amount: '1万元',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('请选择骗局类型');
  });

  it('should return error for missing scripts', () => {
    const result = validateContribution({
      category: '杀猪盘诈骗',
      scripts: '',
      amount: '1万元',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('请填写骗子的话术');
  });

  it('should return error for short scripts', () => {
    const result = validateContribution({
      category: '杀猪盘诈骗',
      scripts: '太短',
      amount: '1万元',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('话术描述至少10个字');
  });

  it('should return error for missing amount', () => {
    const result = validateContribution({
      category: '杀猪盘诈骗',
      scripts: '这是一段很长的话术描述，至少超过十个字',
      amount: '',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('请填写涉案金额或损失物品');
  });

  it('should return multiple errors', () => {
    const result = validateContribution({
      category: '',
      scripts: '',
      amount: '',
    });

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});

describe('saveContribution', () => {
  it('should save a contribution with generated id and timestamp', () => {
    const data = {
      category: '杀猪盘诈骗',
      scripts: '骗子的话术描述',
      amount: '1万元',
      description: '详细描述',
    };

    const contribution = saveContribution(data);

    expect(contribution.id).toBeTruthy();
    expect(contribution.status).toBe('pending');
    expect(contribution.createdAt).toBeTruthy();
    expect(contribution.category).toBe(data.category);
    expect(contribution.scripts).toBe(data.scripts);
    expect(contribution.amount).toBe(data.amount);
    expect(contribution.description).toBe(data.description);
  });
});

describe('getContributions', () => {
  it('should return array of contributions', () => {
    const contributions = getContributions();
    expect(Array.isArray(contributions)).toBe(true);
  });
});

describe('deleteContribution', () => {
  it('should return false for non-existent id', () => {
    const result = deleteContribution('non-existent-id');
    expect(result).toBe(false);
  });
});
