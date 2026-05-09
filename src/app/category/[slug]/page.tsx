import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getScamsByCategory, getCategoryBySlug } from '@/lib/data';
import ScamCard from '@/components/ScamCard';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const scams = getScamsByCategory(slug);

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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h1>
        <p className="text-gray-500 mb-6">{category.description}</p>

        {scams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scams.map((scam) => (
              <ScamCard key={scam.slug} scam={scam} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>暂无该分类的骗局数据</p>
          </div>
        )}
      </div>
    </main>
  );
}
