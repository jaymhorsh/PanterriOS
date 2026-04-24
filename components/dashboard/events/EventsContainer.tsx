"use client";

import { useEffect, useState } from "react";
import { CalendarDays, UsersRound, Star, Bot } from "lucide-react";
import Link from "next/link";
import { PageHead, StatCard, StatCardSkeleton } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRetrieveEventStats } from "@/hook/events";
import {
  AIDiscoveredEventsTab,
  EventsTabContent,
  SubmittedEventsTab,
} from "./tabs";
import { useRetrievePublishedEvents } from "@/hook/events/useRetrievePublishedEvents";

export default function EventsContainer() {
  const [activeTab, setActiveTab] = useState<"ai-discovered" | "published">(
    "published",
  );
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data: eventStatsResponse, isLoading } = useRetrieveEventStats();
  const { data: publishedEvents, isLoading: isPublished } =
    useRetrievePublishedEvents(
      debouncedSearchTerm
        ? {
            search: debouncedSearchTerm,
          }
        : {},
    );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);
  const eventStats = eventStatsResponse?.data;

  const tabs: Array<{
    label: string;
    value: "ai-discovered" | "published";
    count: number;
  }> = [
    {
      label: "Published Events",
      value: "published",
      count: publishedEvents?.meta.pagination?.total_count ?? 0,
    },
    {
      label: "AI-Discovered",
      value: "ai-discovered",
      count: eventStats?.aiDiscovered ?? 0,
    },

    // {
    //   label: 'Submissions',
    //   value: 'submitted',
    //   count: eventStats?.submitted ?? 0,
    // },
  ];

  const stats = [
    {
      label: "Total Events (this month)",
      value: eventStats?.totalEvents ?? 0,
      description: "Published events",
      icon: CalendarDays,
      color: "text-gray-900",
      iconColor: "text-[#155DFC]",
      bgColor: "bg-[#DBEAFE]",
    },
    {
      label: "AI Discovered",
      value: eventStats?.aiDiscovered ?? 0,
      description: "Awaiting review",
      icon: Bot,
      color: "text-gray-900",
      iconColor: "text-[#F54900]",
      bgColor: "bg-[#FFEDD4]",
    },
    {
      label: "Submitted Events",
      value: eventStats?.submitted ?? 0,
      description: "External submissions",
      icon: UsersRound,
      color: "text-gray-900",
      iconColor: "text-[#D08700]",
      bgColor: "bg-[#FEF9C2]",
    },
    {
      label: "Expected Attendees",
      value: eventStats?.expectedAttendees ?? 0,
      description: "Projected attendance",
      icon: Star,
      color: "text-gray-900",
      iconColor: "text-[#9810FA]",
      bgColor: "bg-[#E9D4FF]",
    },
  ];

  return (
    <div className="w-full space-y-6 px-0">
      <PageHead
        pageTitle="Nigerian Real Estate Events"
        subTitle="Manage and publish real estate events across Nigeria"
      >
        <div className="flex items-center gap-2">
          <Link href="/events/records">
            <Button
              variant="outline"
              className="h-9 rounded-sm px-3 text-sm sm:h-10"
            >
              View events record
            </Button>
          </Link>
        </div>
      </PageHead>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {isLoading || isPublished ? (
          <StatCardSkeleton />
        ) : (
          stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              Icon={stat.icon}
              iconColor={stat.iconColor}
              bgColor={stat.bgColor}
              color={stat.color}
            />
          ))
        )}
      </div>

      <div className="rounded-2xl  bg-white p-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "ai-discovered" | "published")
          }
          className="w-full"
        >
          <TabsList className="inline-flex h-auto w-fit justify-start gap-3 rounded-none bg-slate-100 p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-md px-4 py-3 text-sm font-medium text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
              >
                <span>{tab.label}</span>
                {tab.count > 0 ? (
                  <span className="ml-2 inline-flex h-6  min-w-6 items-center justify-center rounded-full bg-[#2563EB] px-2 text-xs font-medium text-white data-[state=active]:bg-white data-[state=active]:text-black">
                    {tab.count}
                  </span>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="published" className="pt-6">
            {publishedEvents?.data && (
              <EventsTabContent
                events={publishedEvents?.data}
                search={search}
                onSearchChange={setSearch}
              />
            )}
          </TabsContent>

          <TabsContent value="ai-discovered" className="pt-6">
            <AIDiscoveredEventsTab />
          </TabsContent>

          <TabsContent value="submitted" className="pt-6">
            <SubmittedEventsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
