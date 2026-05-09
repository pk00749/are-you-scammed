import Link from 'next/link';
import { getAllScams } from '@/lib/data';
import ScamCard from '@/components/ScamCard';
import SearchBar from '@/components/SearchBar';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ q?: string; tag?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, tag } = await searchParams;
  const allScams = getAllScams();

  // Simple filtering - will be enhanced in Phase 3
  let results = allScams;
  if (q) {
    const query = q.toLowerCase();
    results = allScams.filter(scam =>
      scam.title.toLowerCase().includes(query) ||
      scam.scripts.some(s => s.toLowerCase().includes(query)) ||
      scam.tags.some(t => t.toLowerCase().includes(query))
    );
  }
  if (tag) {
    results = results.filter(scam => scam.tags.includes(tag));
  }

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

        <div className="mb-8">
          <SearchBar defaultValue={q || ''} />
        </div>

        {results.length > 0 ? (
          <>
            <p className="text-gray-500 mb-6">找到 {results.length} 个相关骗局</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((scam) => (
                <ScamCard key={scam.slug} scam={scam} />
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
    </main>
  );
}
