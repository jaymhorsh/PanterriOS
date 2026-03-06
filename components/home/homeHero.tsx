"use client";

import Link from "next/link";
import Image from "next/image";
import landingSvg from "@/assets/images/landingPageSvg.png";
import logo from "@/assets/svg/logo.svg";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Poppins } from "next/font/google";
// Font loader must be called at module scope
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
import {
  Shield,
  Users,
  FileText,
  Wallet,
  BarChart3,
  TrendingUp,
  Bot,
  Calendar,
  LayoutDashboard,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    title: "Document Management",
    description:
      "Centralized document storage with secure access and version control",
    icon: FileText,
    color: "text-[#FFC633]",
    border: "border-[#FFC633]",
  },

  {
    id: 2,
    title: "Events",
    description:
      "Curate and list real estate events, conferences, and industry activities",
    icon: Calendar,
    color: "text-[#8A38F5]",
    border: "border-[#8A38F5]",
  },
  {
    id: 3,
    title: "AI Agents",
    description:
      "Predictive analytics, insights and intelligent article curation for review",
    icon: Bot,
    color: "text-[#155DFC]",
    border: "border-[#155DFC]",
  },
  {
    id: 4,
    title: "Performance Metrics",
    description: "Track key performance indicators and optimize  operations",
    icon: TrendingUp,
    color: "text-[#009D69]",
    border: "border-[#009D69]",
  },
  {
    id: 5,
    title: "Analytics & Inisghts",
    description: "Real-time data visualization and business intelligence ",
    icon: BarChart3,
    color: "text-[#EF4444]",
    border: "border-[#EF4444]",
  },

  {
    id: 6,
    title: "Financial Management",
    description:
      "Comprehensive financial tracking, reporting and transaction management",
    icon: Wallet,
    color: "text-[#155DFC]",
    border: "border-[#155DFC]",
  },
  {
    id: 7,
    title: "Investor Management",
    description:
      "Manage profiles, track portfolios, and maintain comprehensive investor records",
    icon: Users,
    color: "text-[#009D69]",
    border: "border-[#009D69]",
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
    { left: 289, top: 260 },
    { left: 192, top: 370 },
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

  // someone who flirts, or fornicate or like women a lot

  return (
    <div
      className={`${poppins.className} min-h-screen flex justify-between items-center md:mx-36 gap-20`}
    >
      {/* LEFT SECTION */}
      <div className="space-y-8 pt-5 font-poppins">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={40}
          className="object-fit"
        />

        <h1 className="flex flex-col space-y-3 text-[45px] font-semibold leading-tight">
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
            <button className="bg-black flex cursor-pointer items-center justify-center w-xs text-white rounded-sm py-4  ">
              Login to PanterriOS
            </button>
          </Link>

          <div className="flex items-center gap-2 pt-2 text-[#E7000B]">
            <Shield className="w-5 h-5" />
            <p>Authorized users only</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (circular layout) */}

      <div
        className={`relative md:mr-36 mt-10 ${poppins.className}  flex items-center`}
      >
        <div
          ref={circleRef}
          className="relative w-96 h-96 flex items-center justify-center"
        >
          {/* SVG connectors behind icons */}
          <Image src={landingSvg} alt="connectors" fill className="" />
          <div
            style={{
              left: `${50}%`,
              top: `${-40}px`,
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
            className={`flex items-center justify-center h-15 w-25 rounded-2xl  bg-[#FAFAFA]  border border-border  transition-all duration-500 cursor-pointer shadow-md p-2 `}
          >
            <Shield className={`w-8 h-8 text-black`} />
          </div>

          <div className="absolute left-1/2 top-[41%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-21 w-26 rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <LayoutDashboard className="text-white h-16 w-16" strokeWidth='1' />
            </div>
          </div>

          {/* Tooltip */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const active = index === activeIndex;
            const designSize = 384; // original design reference
            const scale = Math.min(circleSize.w, circleSize.h) / designSize;
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
                      `flex items-center justify-center h-21 w-40 rounded-2xl bg-[#FAFAFA] border transition-all duration-500 cursor-pointer shadow-lg p-2 ` +
                      (active
                        ? `border-2 ${feature.border} shadow-[${feature.color}] scale-110`
                        : `border-white/60`)
                    }
                  >
                    <Icon
                      className={`w-14 h-14 ${feature.color}`}
                      strokeWidth={1}
                    />
                  </div>
                </TooltipTrigger>

                <TooltipContent
                  className={`bg-white w-[230px]  max-w-sm text-black rounded-xl p-3 shadow-2xl whitespace-normal break-words`}
                >
                  <p className="font-semibold text-base text-center break-words">
                    {feature.title}
                  </p>
                  <p className="text-sm text-left text-[#45556C] mt-2 ">
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
