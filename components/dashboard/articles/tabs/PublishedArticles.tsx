'use client';

import { useMemo, useState } from 'react';
import { ReUseAbleTable, SlideInPanelDrawer } from '@/components/shared';
import { articlesDashboardData } from '../data';
import { BadgePill } from '../articleColumns';
import { CrawlerArticlesResponse, CrwalerArticle } from '@/interface';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { dateAndTimeFormatter } from '@/utils/helpers';
import { Eye, Trash2 } from 'lucide-react';
import { ArticlePreview } from './ArticlePreview';
import { extractAltOrText } from '@/utils/articles.helper';

interface ArticlesTabProps {
  article: CrawlerArticlesResponse;
  category?: string;
}

const pageLimit = articlesDashboardData.pagination.limit;

export function PublishedArticles({ article, category }: ArticlesTabProps) {
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    if (category === 'all') {
      return articlesDashboardData.publishedArticles;
    }

    return articlesDashboardData.publishedArticles.filter(
      (article) =>
        article.category.toLowerCase() === category ||
        article.tags.some((tag) => tag.toLowerCase() === category),
    );
  }, [category]);
  const publishedArticleColumns: ColumnDef<CrwalerArticle>[] = [
    {
      accessorKey: 'title',
      header: 'Article',
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#E2E8F0]">
            {row.original.imageUrl ? (
              <Image
                src={row.original.imageUrl}
                alt={row.original.title}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="max-w-[360px] truncate text-base font-semibold text-[#0F172B]">
              {row.original.title}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {row.original.matchedKeywords.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-[#F1F5F9] px-3 py-1 text-sm font-medium text-[#45556C]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => (
        <span className="text-base text-[#111111]">
          {extractAltOrText(row.original.author)}
        </span>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <>
          {row.original.categories.length > 0 && (
            <BadgePill label={row.original.categories[0]} tone="blue" />
          )}
        </>
      ),
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => {
        const tone =
          row.original.source.name === 'Crawled' ? 'amber' : 'purple';
        return <BadgePill label={row.original.source.name} tone={tone} />;
      },
    },
    {
      accessorKey: 'publishedAt',
      header: 'Published',
      cell: ({ row }) => (
        <span className="text-base text-[#45556C]">
          {dateAndTimeFormatter(row.original.publishedAt)}
        </span>
      ),
    },
    {
      accessorKey: 'views',
      header: 'Views',
      cell: ({ row }) => (
        <span className="text-base font-medium text-[#111111]">
          {row.original.viewCount.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'badges',
      header: 'Badges',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.isFeatured ? (
            <BadgePill label={'Featured'} />
          ) : row.original.isEditorsPick ? (
            <BadgePill label={'Editors pick'} />
          ) : (
            <span className="text-sm text-transparent">-</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-3 text-gray-500">
          <SlideInPanelDrawer
            trigger={
              <button
                type="button"
                className="transition hover:text-gray-900"
                aria-label="View article"
              >
                <Eye className="h-5 w-5" />
              </button>
            }
            title="Article Preview"
            subtitle="View article details"
            width="lg"
            contentClassName="mx-0"
          >
            <ArticlePreview article={row.original} />
          </SlideInPanelDrawer>
          <button
            type="button"
            className="transition hover:text-red-600"
            aria-label="Delete article"
          >
            <Trash2 className="h-5 w-5 text-red-600" />
          </button>
        </div>
      ),
    },
  ];
  // const paginatedArticles = filteredArticles.slice(
  //   (page - 1) * pageLimit,
  //   page * pageLimit,
  // );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          All Published Articles
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {filteredArticles.length} articles
        </p>
      </div>

      <ReUseAbleTable
        data={article.data}
        columns={publishedArticleColumns}
        entityName="articles"
        pagination={{
          currentPage: page,
          totalPages: Math.max(
            1,
            Math.ceil(filteredArticles.length / pageLimit),
          ),
          totalItems: filteredArticles.length,
          limit: pageLimit,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
