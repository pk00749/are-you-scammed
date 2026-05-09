'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { categories } from '@/data/seed';

interface ContributeFormProps {
  onSubmit?: (data: ContributeFormData) => void;
}

export interface ContributeFormData {
  category: string;
  scripts: string;
  amount: string;
  description?: string;
}

export default function ContributeForm({ onSubmit }: ContributeFormProps) {
  const [formData, setFormData] = useState<ContributeFormData>({
    category: '',
    scripts: '',
    amount: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-2">投稿成功！</h3>
        <p className="text-gray-600">感谢您的投稿，审核结果将在3天内通知</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          * 骗局类型
        </label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
        >
          <option value="">请选择分类</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          * 骗子用了什么话术
        </label>
        <textarea
          required
          rows={4}
          placeholder="粘贴骗子说过的话，或描述骗子说了什么..."
          value={formData.scripts}
          onChange={(e) => setFormData({ ...formData, scripts: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          * 涉案金额或损失物品
        </label>
        <input
          type="text"
          required
          placeholder="例如：3万元、5张购物卡、一枚金戒指"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          大概经过（选填）
        </label>
        <textarea
          rows={4}
          placeholder="简单描述事情经过..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? '提交中...' : '提交投稿'}
      </button>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 font-medium mb-2">📌 投稿须知</p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>· 审核结果会在3天内通知</li>
          <li>· 通过后将显示"热心用户提供"，完全匿名</li>
          <li>· 杜撰内容会被删除</li>
        </ul>
      </div>
    </form>
  );
}
