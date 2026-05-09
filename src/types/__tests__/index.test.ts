import { describe, it, expect } from 'vitest';
import type { Scam, Contribution, Category, RedFlag, Case } from '@/types';

describe('Scam type', () => {
  it('should accept valid scam object', () => {
    const scam: Scam = {
      id: '1',
      title: '杀猪盘',
      slug: 'pig-butchering',
      category: '杀猪盘诈骗',
      categorySlug: 'pig-butchering',
      tags: ['网恋', '投资'],
      severity: 'high',
      amountRange: '几万 - 几百万',
      scripts: ['脚本1', '脚本2'],
      redFlags: [
        { script: '骗子说', explanation: '这是红旗' }
      ],
      cases: [
        { summary: '案例', amount: '1万元', contributor: '热心用户提供' }
      ],
      actions: ['行动1', '行动2'],
      publishedAt: '2024-01-01',
      updatedAt: '2024-01-01',
      viewCount: 100,
      hotScore: 90,
    };

    expect(scam.id).toBe('1');
    expect(scam.severity).toBe('high');
  });

  it('should accept optional source fields', () => {
    const scam: Scam = {
      id: '1',
      title: '测试',
      slug: 'test',
      category: '测试',
      categorySlug: 'test',
      tags: [],
      severity: 'low',
      amountRange: '0',
      scripts: [],
      redFlags: [],
      cases: [],
      actions: [],
      publishedAt: '2024-01-01',
      updatedAt: '2024-01-01',
      viewCount: 0,
      hotScore: 0,
      sourceUrl: 'https://example.com',
      sourceName: '公安部',
    };

    expect(scam.sourceUrl).toBe('https://example.com');
    expect(scam.sourceName).toBe('公安部');
  });
});

describe('Contribution type', () => {
  it('should accept valid contribution', () => {
    const contribution: Contribution = {
      id: '1',
      category: '杀猪盘诈骗',
      scripts: '骗子说的话',
      amount: '1万元',
      status: 'pending',
      createdAt: '2024-01-01',
    };

    expect(contribution.status).toBe('pending');
  });

  it('should accept optional description', () => {
    const contribution: Contribution = {
      id: '1',
      category: '测试',
      scripts: '测试',
      amount: '0',
      status: 'approved',
      createdAt: '2024-01-01',
      description: '这是详细描述',
      reviewedAt: '2024-01-02',
    };

    expect(contribution.description).toBe('这是详细描述');
    expect(contribution.status).toBe('approved');
  });
});

describe('Category type', () => {
  it('should accept valid category', () => {
    const category: Category = {
      id: 1,
      name: '冒充客服诈骗',
      slug: 'fake-customer-service',
      description: '骗子冒充客服',
      keywords: ['客服', '退款'],
    };

    expect(category.id).toBe(1);
    expect(category.keywords).toHaveLength(2);
  });
});

describe('RedFlag interface', () => {
  it('should have script and explanation', () => {
    const redFlag: RedFlag = {
      script: '骗子说稳赚不赔',
      explanation: '这是诈骗',
    };

    expect(redFlag.script).toBe('骗子说稳赚不赔');
    expect(redFlag.explanation).toBe('这是诈骗');
  });
});

describe('Case interface', () => {
  it('should have summary, amount and contributor', () => {
    const caseItem: Case = {
      summary: '用户被骗了',
      amount: '5万元',
      contributor: '热心用户提供',
    };

    expect(caseItem.summary).toBe('用户被骗了');
    expect(caseItem.amount).toBe('5万元');
    expect(caseItem.contributor).toBe('热心用户提供');
  });
});
