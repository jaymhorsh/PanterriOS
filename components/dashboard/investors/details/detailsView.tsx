"use client";

import Image from "next/image";
import ProfilePic from "@/assets/images/ahmed.png";
import { CircleCheckBig } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AccountInfoAndSummary } from "./overviewTab";
import { InvestmentsTable } from "./investmentsTab";
import { Button } from "@/components/ui/button";
import { TransactionTable } from "./transactionsTab";
import { KycDetail } from "./kyc-detailTab";
import { StatCard } from "@/components/shared";

interface DetailsViewProp {
  id?: string | number;
}
export function DetailsView({ id }: DetailsViewProp) {
  // id is available if needed for future implementation
  const [tab, setTab] = useState("overview");
  const profile = {
    name: "Ahmed Faruq",
    email: "john.doe@example.com",
    id: "00001",
    profileImg: ProfilePic,
    subPage: [
      {
        holder: "Member Since",
        value: "Jan 15, 2023",
      },
      {
        holder: "Tier Level",
        value: "Platinum",
      },
      {
        holder: "Total Investments",
        value: "8 properties",
      },
    ],
    portfolio_overview: [
      {
        label: "Total Invested",
        currency: "NGN",
        value: 10000000,
        formatted: "₦10.0M",
        scope: "Lifetime",
      },
      {
        label: "Wallet Balance",
        currency: "NGN",
        value: 3000000,
        formatted: "₦3.0M",
        scope: "Available",
      },
      {
        label: "Returns Earned",
        currency: "NGN",
        value: 375000,
        formatted: "₦375,000",
        scope: "All time",
        color: "text-green-500 text-lg",
      },
      {
        label: "Avg ROI",
        value: 15,
        unit: "percent",
        formatted: "15%",
        scope: "Portfolio avg",
        color: "text-green-500",
      },
    ],
  };
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: <AccountInfoAndSummary />,
    },
    {
      title: "Investments",
      value: "investments",
      content: <InvestmentsTable />,
    },
    {
      title: "Transactions",
      value: "transactions",
      content: <TransactionTable />,
    },
    {
      title: "KYC Details",
      value: "kyc-details",
      content: <KycDetail />,
    },
  ];
  return (
    <div className="w-full space-y-4 px-0">
      {/* Profile Header Section */}
      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full">
              {profile.profileImg ? (
                <Image
                  src={profile.profileImg}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-black flex items-center justify-center uppercase text-xl sm:text-2xl w-full h-full text-white">
                  {profile.name.charAt(0)}{profile.name.split(' ')[1]?.charAt(0) || profile.name.charAt(1)}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-col gap-2 min-[430px]:flex-row min-[430px]:items-start min-[430px]:justify-between">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">{profile.name}</h2>
                <div className="text-sm space-y-0.5 mt-1">
                  <p className="text-gray-600 truncate">{profile.email}</p>
                  <p className="text-gray-600">Investor ID: <span className="font-medium text-gray-900">{profile.id}</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 min-[430px]:justify-end">
                <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 border border-green-300 rounded-md flex items-center gap-1 whitespace-nowrap h-fit">
                  <CircleCheckBig className="w-3 h-3" />
                  KYC Verified
                </div>
                <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 border border-green-300 rounded-md whitespace-nowrap h-fit">
                  Active
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 min-[430px]:grid-cols-3 gap-2 min-[430px]:gap-0">
                {profile.subPage.map((p, i) => (
                  <div key={i} className="flex flex-col min-[430px]:px-4 first:min-[430px]:pl-0 min-[430px]:border-r min-[430px]:last:border-r-0 border-gray-300">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{p.holder}</span>
                    <span className="text-sm sm:text-base font-semibold text-gray-900 mt-1">{p.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Overview Stats */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {profile.portfolio_overview.map((overView, i) => (
          <StatCard
            label={overView.label}
            value={overView.formatted}
            description={overView.scope}
            color={overView.color}
            key={i}
          />
        ))}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue={tab} className="w-full space-y-4">
        <div className="w-full">
          <TabsList className="grid w-full grid-cols-2 min-[430px]:grid-cols-4 bg-gray-100 p-1 rounded-lg h-auto gap-1">
            {tabs.map((tab, i) => (
              <TabsTrigger
                value={tab.value}
                key={i}
                onClick={() => setTab(tab.value)}
                className="text-xs sm:text-sm whitespace-nowrap px-2 py-1.5"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        {tabs.map((tab, i) => (
          <TabsContent value={tab.value} key={i} className="focus-visible:outline-none">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* Action Button */}
      <div className="flex justify-end pt-2 pb-1">
        <Button variant="destructive" className="w-full min-[430px]:w-auto">
          Suspend Account
        </Button>
      </div>
    </div>
  );
}
