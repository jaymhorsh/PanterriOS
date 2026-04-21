import { useMemo } from 'react';
import { CrawledQueueCard } from '.';
import { getCrawledQueueItems } from './dummy';
import { CrawlerArticlesResponse } from '@/interface';

interface ArticlesTabProps {
  article: CrawlerArticlesResponse;
}

export function CrawledQueue({ article }: ArticlesTabProps) {
  const articlsData = article.data;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-[#0F172A]">
          Crawled Articles Queue
        </h3>
        <p className="text-sm text-[#64748B]">
          Review and approve AI-discovered content from external sources
        </p>
      </div>

      {articlsData.length > 0 ? (
        articlsData.map((item) => (
          <CrawledQueueCard key={item._id} article={item} />
        ))
      ) : (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] p-8 text-center text-sm text-gray-500">
          No crawled articles found for this category.
        </div>
      )}
    </div>
  );
}
