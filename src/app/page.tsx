import { getAllScams, getCategories, getHotScams, getAllTags } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';
import HotScams from '@/components/HotScams';
import TagCloud from '@/components/TagCloud';
import ScamCard from '@/components/ScamCard';
import Link from 'next/link';

export default function HomePage() {
  const categories = getCategories();
  const hotScams = getHotScams(5);
  const allTags = getAllTags();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <h1 className="text-xl font-bold text-gray-800">骗了吗</h1>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            骗了吗
          </h2>
          <p className="text-center text-gray-500 mb-8">
            粘贴骗子的原话，三秒判断你是不是正在被骗
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📂 分类浏览
          </h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Hot Scams */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            🔥 今日热骗
          </h2>
          <HotScams scams={hotScams} />
        </div>
      </section>

      {/* Tag Cloud */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            🏷️ 热门标签
          </h2>
          <TagCloud tags={allTags} />
        </div>
      </section>

      {/* All Scams */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📚 骗局列表
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllScams().map((scam) => (
              <ScamCard key={scam.slug} scam={scam} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">本平台仅供参考，不构成法律建议</p>
          <p>骗了吗 · 骗术一查就知道</p>
        </div>
      </footer>
    </main>
  );
}
