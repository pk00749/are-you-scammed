'use client';

import { useState } from 'react';
import { Share2, Link2, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareText = `遇到这种情况，先来这里查一查\n骗了吗 · 骗术一查就知道`;

  const handleWeChatShare = () => {
    alert('请截图分享到微信');
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleWeChatShare}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        微信
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        {copied ? '已复制' : '复制链接'}
      </button>

      <button
        onClick={() => alert('海报生成功能开发中')}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Copy className="w-4 h-4" />
        海报
      </button>
    </div>
  );
}
