import { Case } from '@/types';
import { MessageCircle } from 'lucide-react';

interface CaseListProps {
  cases: Case[];
}

export default function CaseList({ cases }: CaseListProps) {
  if (cases.length === 0) return null;

  return (
    <div className="space-y-4">
      {cases.map((caseItem, idx) => (
        <div key={idx} className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">热心用户提供</span>
            {caseItem.amount && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                涉案金额：{caseItem.amount}
              </span>
            )}
          </div>
          <p className="text-gray-700">{caseItem.summary}</p>
        </div>
      ))}
    </div>
  );
}
