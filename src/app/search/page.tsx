import Link from 'next/link';
import { getAllScams } from '@/lib/data';
import SearchResults from './SearchResults';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ q?: string; tag?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, tag, sort } = await searchParams;
  const sortBy = (sort as 'hotScore' | 'recent' | 'relevance') || 'relevance';

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {q ? `搜索 "${q}"` : tag ? `标签 #${tag}` : '搜索结果'}
        </h1>

        <SearchResults initialQuery={q || ''} initialSort={sortBy} />
      </div>
    </main>
  );
}
