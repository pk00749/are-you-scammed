'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ArrowUpDown } from 'lucide-react';

type SortType = 'hotScore' | 'recent' | 'relevance';

interface SearchResultsProps {
  initialQuery: string;
  initialSort: SortType;
}

export default function SearchResults({ initialQuery, initialSort }: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortType>(initialSort);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (sortBy !== 'relevance') params.set('sort', sortBy);

        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error('Search failed:', err);
        setResults([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query, sortBy]);

  const handleSortChange = (newSort: SortType) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams.toString());
    if (newSort !== 'relevance') {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }
    router.push(`/search?${params.toString()}`);
  };

  const sortLabels: Record<SortType, string> = {
    hotScore: '热度',
    recent: '最新',
    relevance: '相关度',
  };

  return (
    <div>
      {/* Sorting */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-500 flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          排序：
        </span>
        <div className="flex gap-2">
          {(Object.keys(sortLabels) as SortType[]).map((sort) => (
            <button
              key={sort}
              onClick={() => handleSortChange(sort)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                sortBy === sort
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sortLabels[sort]}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">搜索中...</div>
      ) : results.length > 0 ? (
        <>
          <p className="text-gray-500 mb-6">找到 {results.length} 个相关骗局</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item: any) => (
              <div key={item.scam.slug} className="relative">
                <ScamCardWithHighlight scam={item.scam} query={query} />
                {item.matchScore > 0 && query && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                    匹配度: {item.matchScore}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">找不到你要的？</p>
          <p className="text-gray-600 mb-6">
            你遇到的骗局我们还没收录？投稿帮助我们补充
          </p>
          <Link
            href="/contribute"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            去投稿 →
          </Link>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import ScamCard from '@/components/ScamCard';
import { highlightText } from '@/lib/search';

interface ScamCardWithHighlightProps {
  scam: any;
  query: string;
}

function ScamCardWithHighlight({ scam, query }: ScamCardWithHighlightProps) {
  return (
    <Link
      href={`/scam/${scam.slug}`}
      className="block p-5 border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3
          className="font-bold text-gray-800"
          dangerouslySetInnerHTML={{
            __html: query ? highlightText(scam.title, query) : scam.title,
          }}
        />
      </div>
      <p className="text-sm text-gray-500 mb-3">分类：{scam.category}</p>
      <p className="text-sm text-gray-600 mb-3">涉案金额：{scam.amountRange}</p>
    </Link>
  );
}
