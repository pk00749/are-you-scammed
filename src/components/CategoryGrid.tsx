import Link from 'next/link';
import { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const getCategoryIcon = (slug: string): string => {
    const icons: Record<string, string> = {
      'fake-customer-service': '👤',
      'pig-butchering': '💕',
      'fake-shopping': '🛒',
      'job-scam': '💼',
      'fake-police': '👮',
      'prepaid-trap': '💳',
      'online-loan-scam': '💰',
      'elderly-health-scam': '🧓',
      'marriage-scam': '💍',
      'life-service-trap': '🏠',
    };
    return icons[slug] || '📂';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="p-4 border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-md transition-all text-center"
        >
          <div className="text-3xl mb-2">{getCategoryIcon(category.slug)}</div>
          <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {category.keywords.slice(0, 2).join('、')}
          </p>
        </Link>
      ))}
    </div>
  );
}
