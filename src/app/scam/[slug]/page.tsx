import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getScamBySlug, getScamsByCategory } from '@/lib/data';
import RedFlagTable from '@/components/RedFlagTable';
import CaseList from '@/components/CaseList';
import ShareButtons from '@/components/ShareButtons';
import ScamCard from '@/components/ScamCard';
import { ArrowLeft, Eye, AlertTriangle, ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ScamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const scam = getScamBySlug(slug);

  if (!scam) {
    notFound();
  }

  const relatedScams = getScamsByCategory(scam.categorySlug).filter(s => s.slug !== slug);

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
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {scam.viewCount} 次浏览
            </span>
            <span className={`px-2 py-0.5 text-xs text-white rounded ${severityColors[scam.severity]}`}>
              {severityLabels[scam.severity]}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scam.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title & Meta */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{scam.title}</h1>
        <p className="text-gray-500 mb-2">分类：{scam.category}</p>
        <p className="text-gray-500 mb-4">涉案金额：{scam.amountRange}</p>
        {scam.sourceName && (
          <p className="text-sm text-gray-400 mb-6">
            数据来源：{scam.sourceName}
          </p>
        )}

        {/* Red Flags */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            红旗预警
          </h2>
          <RedFlagTable redFlags={scam.redFlags} />
        </section>

        {/* Scripts */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎭 骗子话术
          </h2>
          <div className="space-y-2">
            {scam.scripts.map((script, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">"{script}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cases */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📖 真实案例
          </h2>
          <CaseList cases={scam.cases} />
        </section>

        {/* Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            ✅ 如果你正在经历
          </h2>
          <ul className="space-y-2">
            {scam.actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">{idx + 1}.</span>
                <span className="text-gray-700">{action}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Share */}
        <section className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔗 分享</h2>
          <ShareButtons title={scam.title} url={`/scam/${scam.slug}`} />
          <p className="mt-4 text-gray-500 text-sm">
            分享文案：遇到这种情况，先来这里查一查
            <br />
            骗了吗 · 骗术一查就知道
          </p>
        </section>

        {/* Related */}
        {relatedScams.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">相关骗局推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedScams.slice(0, 3).map((s) => (
                <ScamCard key={s.slug} scam={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
