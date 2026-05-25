'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { type InsightIntelligence } from '@/interface/analytics';
import { Button } from '@/components/ui/button';
import { dateAndTimeFormatter } from '@/utils/helpers';
import { LoaderCircle, SquarePen } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useUpdateStatusOnAnalyticsIntelligence } from '@/hook/analytics';

const insightColors = {
  Construction: {
    text: '#2563EB',
    soft: '#EFF6FF',
  },
  Hospitality: {
    text: '#7C3AED',
    soft: '#F5F3FF',
  },
  Housing: {
    text: '#16A34A',
    soft: '#ECFDF5',
  },
  Infrastructure: {
    text: '#F97316',
    soft: '#FFF7ED',
  },
  'Market Transparency': {
    text: '#0EA5E9',
    soft: '#E0F2FE',
  },
  Mortgages: {
    text: '#A855F7',
    soft: '#FAF5FF',
  },
  REITs: {
    text: '#22C55E',
    soft: '#F0FDF4',
  },
  Regulation: {
    text: '#DC2626',
    soft: '#FEF2F2',
  },
  default: {
    text: '#6B7280',
    soft: '#F3F4F6',
  },
};

const impactColors = {
  High: '#00A63E',
  Medium: '#DDA900',
  Low: '#BB2222',
};

type InsightType = keyof typeof insightColors;
type ImpactType = keyof typeof impactColors;

function getInsightStyles(type: InsightType) {
  return insightColors[type];
}

function getImpactColor(impact: ImpactType) {
  return impactColors[impact];
}

function resolveInsightStatus(status: string) {
  return status === 'publish' || status === 'published'
    ? 'published'
    : 'unpublished';
}

export default function InsightIntelligence({
  data,
}: {
  data: InsightIntelligence[];
}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const { mutateAsync: updateStatus, isPending } =
    useUpdateStatusOnAnalyticsIntelligence();

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStatusUpdate = async (id: string, nextStatus: string) => {
    await updateStatus({ id, status: nextStatus });
  };

  return (
    <section className="px-4 py-8 ">
      <div className="grid gap-5 md:grid-cols-2 items-start xl:grid-cols-3">
        {data.map((item, index) => {
          const itemKey = item._id ?? String(index);
          const isExpanded = Boolean(expandedItems[itemKey]);
          const insightStyle = getInsightStyles(
            item.insightCategory as InsightType,
          );
          const normalizedStatus = resolveInsightStatus(item.status);
          const isPublished = normalizedStatus === 'published';
          const impactColor = getImpactColor(item.impactLevel as ImpactType);

          return (
            <div
              key={index}
              className="flex flex-col rounded-xl border border-[#E7E6EB] bg-white p-5 "
            >
              {/* Top */}
              <div className="mb-5 flex items-center justify-between">
                <div
                  className="rounded-sm px-4 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: insightStyle.soft,
                    color: insightStyle.text,
                  }}
                >
                  {item.insightCategory.charAt(0) +
                    item.insightCategory.slice(1).toLowerCase()}
                </div>

                <div
                  className="text-sm font-normal"
                  style={{
                    color: impactColor,
                  }}
                >
                  {item.impactLevel.charAt(0) +
                    item.impactLevel.slice(1).toLowerCase()}{' '}
                  Impact
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col">
                <h3 className="mb-3 text-base h-[50px] font-archivo font-bold leading-[1.3] tracking-[-0.03em] text-[#111111]">
                  {item.title}
                </h3>

                <p
                  className={cn(
                    'text-sm font-normal leading-[1.35] text-[#8C8C92]',
                    isExpanded ? 'mb-3' : 'mb-2 max-h-[80px] overflow-hidden',
                  )}
                >
                  {item.description}
                </p>

                <button
                  type="button"
                  onClick={() => toggleExpanded(itemKey)}
                  className="mb-3 text-sm font-medium text-right text-[#222228] hover:underline"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>

                {/* Action */}
                <div
                  className="rounded-lg p-3 text-sm font-normal leading-5 text-[#333333]"
                  style={{
                    backgroundColor: insightStyle.soft,
                  }}
                >
                  {item.indication}
                </div>
              </div>
              <div className="bg-primary-blue/20 text-black p-2 flex justify-between mt-3 items-center ">
                <div className="gap-2">
                  <div
                    className={`text-xs font-semibold ${isPublished ? '' : 'text-primary-red'}`}
                  >
                    {isPublished ? 'Published' : 'Unpublished'}
                  </div>
                  <div className="text-sm">
                    {dateAndTimeFormatter(item.createdAt)}
                  </div>
                </div>
                {isPublished ? (
                  <div className="flex gap-3">
                    <Button
                      className=" bg-transparent border border-black flex gap-2 text-sm"
                      variant={'ghost'}
                    >
                      <SquarePen className="w-3" />
                      Edit
                    </Button>
                    <Button
                      className=" bg-transparent border border-black text-sm"
                      variant={'ghost'}
                      disabled={isPending}
                      onClick={() =>
                        handleStatusUpdate(item._id, 'unpublished')
                      }
                    >
                      {isPending ? (
                        <LoaderCircle className="w-4 animate-spin" />
                      ) : (
                        'Unpublish'
                      )}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm">Publish</div>
                    <Switch
                      checked={false}
                      disabled={isPending}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          void handleStatusUpdate(item._id, 'published');
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* {shouldShowToggle && (
        <div className="flex justify-center mt-5">
          <Button
            size="lg"
            variant={'outline'}
            onClick={() => setShowAllItems((prev) => !prev)}
            className={cn('hover:bg-[#fafafa] ')}
          >
            {showAllItems ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      )} */}
    </section>
  );
}
