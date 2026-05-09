import Link from 'next/link';
import { Scam } from '@/types';
import { Flame } from 'lucide-react';

interface HotScamsProps {
  scams: Scam[];
}

export default function HotScams({ scams }: HotScamsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {scams.map((scam) => (
        <Link
          key={scam.slug}
          href={`/scam/${scam.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors"
        >
          <Flame className="w-4 h-4" />
          {scam.title}
        </Link>
      ))}
    </div>
  );
}
