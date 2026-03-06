"use client";

import Link from "next/link";
import Image from "next/image";
import landingSvg from "@/assets/images/landingPageSvg.png";
import logo from "@/assets/svg/logo.svg";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  MoveRight,
  Shield,
  Users,
  FileText,
  Wallet,
  BarChart3,
  TrendingUp,
  Cpu,
  Calendar,
  LayoutGrid,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { logout } from "@/services/auth";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  border: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Investor Management",
    description:
      "Manage profiles, track portfolios, and maintain comprehensive investor records",
    icon: Users,
    color: "text-teal-500",
    border: "border-teal-500",
  },
  {
    id: 2,
    title: "Document Management",
    description:
      "Centralized document storage with secure access and version control",
    icon: FileText,
    color: "text-yellow-500",
    border: "border-yellow-500",
  },
  {
    id: 3,
    title: "Financial Management",
    description:
      "Comprehensive financial tracking, reporting and transaction management",
    icon: Wallet,
    color: "text-blue-500",
    border: "border-blue-500",
  },
  {
    id: 4,
    title: "Analytics & Inisghts",
    description: "Real-time data visualization and business intelligence ",
    icon: BarChart3,
    color: "text-red-500",
    border: "border-red-500",
  },
  {
    id: 5,
    title: "Performance Metrics",
    description: "Track key performance indicators and optimize  operations",
    icon: TrendingUp,
    color: "text-teal-500",
    border: "border-teal-500",
  },
  {
    id: 6,
    title: "AI Agents",
    description:
      "Predictive analytics, insights and intelligent article curation for review",
    icon: Cpu,
    color: "text-blue-500",
    border: "border-blue-500",
  },
  {
    id: 7,
    title: "Events",
    description:
      "Curate and list real estate events, conferences, and industry activities",
    icon: Calendar,
    color: "text-purple-500",
    border: "border-purple-500",
  },
];

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const circleRef = useRef<HTMLDivElement | null>(null);
  const [circleSize, setCircleSize] = useState({ w: 384, h: 384 });

  // design pixel positions (absolute values taken from your list)
  const designPositions = [
    { left: 295, top: 50 },
    { left: 375, top: 157 },
    { left: 300, top: 260 },
    { left: 195, top: 370 },
    { left: 100, top: 260 },
    { left: 10, top: 155 },
    { left: 90, top: 50 },
  ];

  useLayoutEffect(() => {
    function update() {
      const node = circleRef.current;
      if (!node) return;
      setCircleSize({
        w: node.clientWidth || 384,
        h: node.clientHeight || 384,
      });
    }

    update();
    const ro = new ResizeObserver(update);
    if (circleRef.current) ro.observe(circleRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex justify-between items-center mx-20 px-6">
      {/* LEFT SECTION */}

      <div className="space-y-8">
       <Image src={logo} alt="connectors" width={100} height={40} className="object-fit" />

        <h1 className="flex flex-col text-5xl font-semibold leading-tight">
          <span className="text-[#000000E5] letter-spacing-wide">
            Real Estate Data
          </span>
          <span className="text-[#00000099]">Investor Management</span>
          <span className="text-[#0000004D]">Financial Operations</span>
        </h1>

        <p className="text-base  font-semibold text-black">
          One command centre
        </p>

        <div className="space-y-4 pt-16">
          <Link href="/login">
            <button className="bg-black flex items-center justify-center px-3 text-white rounded-sm py-3  ">
              Login to PanterriOS
            </button>
          </Link>

          <div className="flex items-center gap-2 pt-2 text-red-500">
            <Shield className="w-5 h-5" />
            <p>Authorized users only</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (circular layout) */}

      <div className="relative  flex items-center mr-20">
        <div
          ref={circleRef}
          className="relative w-96 h-96 flex items-center justify-center"
        >
          {/* SVG connectors behind icons */}
          {/* real image placed using fill so width/height aren't required */}
          <Image src={landingSvg} alt="connectors" fill className="" />

          {/* center badge (dark tile) */}
          <div className="absolute left-1/2 top-[41%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-21 w-40 rounded-2xl bg-black flex items-center justify-center shadow-2xl">
              <LayoutGrid className="text-white h-16 w-16" />
            </div>
          </div>

          {/* Tooltip */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const active = index === activeIndex;
            const designSize = 384; // original design reference
            const scale = Math.min(circleSize.w, circleSize.h) / designSize;

            // Use fixed design positions (provided absolute px values) and scale them
            const pos = designPositions[index] ?? { left: 0, top: 0 };
            const x = pos.left * scale;
            const y = pos.top * scale;

            return (
              <Tooltip key={feature.id}>
                <TooltipTrigger asChild>
                  <div
                    style={
                      {
                        left: `${x}px`,
                        top: `${y}px`,
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                      } as any
                    }
                    className={
                      `flex items-center justify-center h-21 w-40 rounded-2xl bg-white border transition-all duration-500 cursor-pointer shadow-2xl p-2 ` +
                      (active
                        ? `border-2 ${feature.border} scale-110`
                        : `border-white/60`)
                    }
                  >
                    <Icon className={`w-10 h-10 ${feature.color}`} />
                  </div>
                </TooltipTrigger>

                <TooltipContent className="bg-white w-[230px] max-w-sm text-black rounded-xl p-3 shadow-2xl whitespace-normal break-words">
                  <p className="font-semibold text-base text-center break-words">
                    {feature.title}
                  </p>
                  <p className="text-sm text-justify text-gray-600 mt-2 break-words">
                    {feature.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
