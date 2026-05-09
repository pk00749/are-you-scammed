import Link from 'next/link';
import { Scam } from '@/types';
import { AlertTriangle, Eye } from 'lucide-react';

interface ScamCardProps {
  scam: Scam;
}

export default function ScamCard({ scam }: ScamCardProps) {
  const severityColors = {
    high: 'bg-red-600',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const severityLabels = {
    high: '高风险',
    medium: '中风险',
    low: '低风险',
  };

  return (
    <Link
      href={`/scam/${scam.slug}`}
      className="block p-5 border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-5 h-5 ${severityColors[scam.severity].replace('bg-', 'text-')}`} />
          <h3 className="font-bold text-gray-800">{scam.title}</h3>
        </div>
        <span className={`px-2 py-0.5 text-xs text-white rounded ${severityColors[scam.severity]}`}>
          {severityLabels[scam.severity]}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        分类：{scam.category}
      </p>

      <p className="text-sm text-gray-600 mb-3">
        涉案金额：{scam.amountRange}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {scam.scripts.slice(0, 2).map((script, idx) => (
          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded truncate max-w-[200px]">
            "{script.slice(0, 15)}..."
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {scam.viewCount} 次浏览
        </span>
        <span className="text-red-600 font-medium">查看详情 →</span>
      </div>
    </Link>
  );
}
