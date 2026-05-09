import { RedFlag } from '@/types';
import { Flag } from 'lucide-react';

interface RedFlagTableProps {
  redFlags: RedFlag[];
}

export default function RedFlagTable({ redFlags }: RedFlagTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-red-50">
            <th className="px-4 py-3 text-left font-semibold text-red-800">
              <Flag className="w-4 h-4 inline mr-2" />
              骗子说
            </th>
            <th className="px-4 py-3 text-left font-semibold text-red-800">
              <Flag className="w-4 h-4 inline mr-2" />
              这是红旗
            </th>
          </tr>
        </thead>
        <tbody>
          {redFlags.map((flag, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">
                "{flag.script}"
              </td>
              <td className="px-4 py-3 text-gray-600">
                {flag.explanation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
