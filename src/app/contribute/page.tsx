import Link from 'next/link';
import ContributeForm from '@/components/ContributeForm';
import { ArrowLeft } from 'lucide-react';

export default function ContributePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">我要投稿</h1>
        <p className="text-gray-500 mb-8">
          你遇到的骗局，我们可能还没收录。填完下面的信息，帮助更多人不上当。
        </p>

        <ContributeForm />
      </div>
    </main>
  );
}
