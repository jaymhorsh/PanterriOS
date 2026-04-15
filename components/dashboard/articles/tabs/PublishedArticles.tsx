"use client";

import { useEffect, useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared";
import { articlesDashboardData } from "../data";
import { publishedArticleColumns } from "./articleColumns";

interface ArticlesTabProps {
  category: string;
}

const pageLimit = articlesDashboardData.pagination.limit;

export function PublishedArticles({ category }: ArticlesTabProps) {
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    if (category === "all") {
      return articlesDashboardData.publishedArticles;
    }

    return articlesDashboardData.publishedArticles.filter(
      (article) =>
        article.category.toLowerCase() === category ||
        article.tags.some((tag) => tag.toLowerCase() === category),
    );
  }, [category]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const paginatedArticles = filteredArticles.slice(
    (page - 1) * pageLimit,
    page * pageLimit,
  );

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
        data={paginatedArticles}
        columns={publishedArticleColumns}
        entityName="articles"
        pagination={{
          currentPage: page,
          totalPages: Math.max(1, Math.ceil(filteredArticles.length / pageLimit)),
          totalItems: filteredArticles.length,
          limit: pageLimit,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
