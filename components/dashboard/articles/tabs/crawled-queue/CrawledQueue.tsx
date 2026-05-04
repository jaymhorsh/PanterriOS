import { CrawledQueueCard } from '.';
import { CrawlerArticlesResponse } from '@/interface';
import { PaginationControls } from '@/components/shared/PaginationControls';

interface ArticlesTabProps {
  article: CrawlerArticlesResponse;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export function CrawledQueue({
  article,
  currentPage,
  setCurrentPage,
}: ArticlesTabProps) {
  const articlsData = article.data;
  const pagination = article.meta.pagination;

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
      <PaginationControls
        currentPage={currentPage}
        totalItems={pagination.total_count}
        itemsPerPage={pagination.per_page}
        onPageChange={setCurrentPage}
        entityName="crawled-articles"
      />
    </div>
  );
}
