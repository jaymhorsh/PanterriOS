import type { StaticImageData } from "next/image";
import article1 from "@/assets/images/article/article1.jpg";
import article2 from "@/assets/images/article/article2.jpg";
import article3 from "@/assets/images/article/article3.jpg";
import article4 from "@/assets/images/article/article4.jpg";

export interface ArticlesSummary {
  totalArticles: number;
  publishedArticles: number;
  crawledQueue: number;
  editorsPicks: number;
  totalViews: number;
}

export interface ArticleRecord {
  id: number;
  title: string;
  author: string;
  category: string;
  source: string;
  publishedAt: string;
  views: number;
  badges: string[];
  tags: string[];
  status: "published" | "crawled" | "draft";
  coverImage?: StaticImageData | string;
  coverClassName?: string;
  readTime?: string;
  excerpt?: string;
  publisher?: string;
  publishedDate?: string;
}

export interface ArticlesDashboardData {
  summary: ArticlesSummary;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
  publishedArticles: ArticleRecord[];
  crawledQueue: ArticleRecord[];
  drafts: ArticleRecord[];
}

export const articlesDashboardData: ArticlesDashboardData = {
  summary: {
    totalArticles: 8,
    publishedArticles: 6,
    crawledQueue: 5,
    editorsPicks: 3,
    totalViews: 16764,
  },
  pagination: {
    currentPage: 1,
    totalPages: 2,
    totalItems: 8,
    limit: 6,
  },
  publishedArticles: [
    {
      id: 1,
      title: "Student Housing: The Overlooked Investment...",
      author: "Chidi Okonkwo",
      category: "Investment Strategy",
      source: "In-house",
      publishedAt: "05/02/26",
      views: 3245,
      badges: ["Featured", "Editor\'s"],
      tags: ["Student Housing", "ROI", "Education"],
      status: "published",
      coverImage: article4,
      readTime: "8 min",
      excerpt:
        "The Lagos property market experienced unprecedented growth in the final quarter of 2025, with total transaction volume reaching remarkable highs.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 12, 2026",
    },
    {
      id: 2,
      title: "Understanding Real Estate Investment Trusts...",
      author: "Chidi Okonkwo",
      category: "Market Analysis",
      source: "In-house",
      publishedAt: "05/02/26",
      views: 5103,
      badges: ["Featured", "Editor\'s"],
      tags: ["REITs", "Investment", "Guide"],
      status: "published",
      coverImage: article1,
      readTime: "6 min",
      excerpt:
        "REITs continue to offer one of the most accessible routes into real estate investing for retail and institutional participants.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 11, 2026",
    },
    {
      id: 3,
      title: "How to Diversify Your Property Portfolio Acro...",
      author: "Chidi Okonkwo",
      category: "Investment Strategy",
      source: "In-house",
      publishedAt: "05/02/26",
      views: 2892,
      badges: ["Featured", "Editor\'s"],
      tags: ["Portfolio", "Strategy", "Diversification"],
      status: "published",
      coverImage: article2,
      readTime: "7 min",
      excerpt:
        "A resilient property portfolio balances locations, asset classes, and risk appetite while preserving long-term cash flow strength.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 10, 2026",
    },
    {
      id: 4,
      title: "Luxury Real Estate Market Analysis: Lagos vs...",
      author: "Chidi Okonkwo",
      category: "Market Analysis",
      source: "Crawled",
      publishedAt: "05/02/26",
      views: 1567,
      badges: [],
      tags: ["Luxury", "Lagos", "Abuja"],
      status: "published",
      coverImage: article3,
      readTime: "5 min",
      excerpt:
        "Luxury demand in Lagos and Abuja reflects shifting buyer priorities across lifestyle, security, and long-term value retention.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 09, 2026",
    },
    {
      id: 5,
      title: "Commercial Real Estate: Office Space Trend...",
      author: "Chidi Okonkwo",
      category: "Market Analysis",
      source: "In-house",
      publishedAt: "05/02/26",
      views: 2134,
      badges: [],
      tags: ["Commercial", "Office Space", "Trends"],
      status: "published",
      coverImage: article1,
      readTime: "6 min",
      excerpt:
        "Commercial office demand is recalibrating around hybrid work, higher tenant expectations, and location-driven convenience.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 08, 2026",
    },
    {
      id: 6,
      title: "Affordable Housing Crisis: Challenges and Inve...",
      author: "Chidi Okonkwo",
      category: "Housing Crisis",
      source: "In-house",
      publishedAt: "05/02/26",
      views: 1823,
      badges: [],
      tags: ["Affordable Housing", "Social Impact", "Investment"],
      status: "published",
      coverImage: article3,
      readTime: "4 min",
      excerpt:
        "Affordable housing remains central to sustainable growth, requiring stronger financing models and policy support frameworks.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 07, 2026",
    },
    {
      id: 7,
      title: "Urban Growth and Investor Demand in 2026",
      author: "Chidi Okonkwo",
      category: "Market Analysis",
      source: "In-house",
      publishedAt: "05/02/26",
      views: 1176,
      badges: ["Featured"],
      tags: ["Urban Growth", "Demand", "2026"],
      status: "published",
      coverImage: article2,
      readTime: "5 min",
      excerpt:
        "Urban migration patterns in 2026 are shaping a new wave of demand concentration across growth corridors.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 06, 2026",
    },
    {
      id: 8,
      title: "Rental Yield Outlook for Prime Districts",
      author: "Chidi Okonkwo",
      category: "Investment Strategy",
      source: "Crawled",
      publishedAt: "05/02/26",
      views: 824,
      badges: [],
      tags: ["Rental Yield", "Prime Districts", "Outlook"],
      status: "published",
      coverImage: article4,
      readTime: "4 min",
      excerpt:
        "Prime districts still lead in rental yield consistency, though pricing pressure is reshaping near-term entry strategies.",
      publisher: "Vanguard Business",
      publishedDate: "Jan 05, 2026",
    },
  ],
  crawledQueue: [
    {
      id: 9,
      title: "Lagos Property Market Sees 15% Growth in Q1 2026",
      author: "Oluwaseun Adeyemi",
      category: "Market Analysis",
      source: "PropertyPro.ng",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Lagos", "Growth", "Q1 2026"],
      status: "crawled",
      coverImage: article2,
      readTime: "6 min",
      excerpt:
        "Lagos real estate market shows strong performance with residential properties leading growth across key districts.",
      publishedDate: "2026-02-18",
    },
    {
      id: 10,
      title: "New Infrastructure Projects Boost Lekki Property Values",
      author: "Chidinma Okafor",
      category: "Infrastructure",
      source: "BusinessDay Nigeria",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Lekki", "Infrastructure", "Development"],
      status: "crawled",
      coverImage: article1,
      readTime: "8 min",
      excerpt:
        "Major infrastructure developments in Lekki corridor are driving up property values significantly.",
      publishedDate: "2026-02-17",
    },
    {
      id: 11,
      title: "Foreign Investment in Nigerian Real Estate Reaches New High",
      author: "Akande Williams",
      category: "Investment Strategy",
      source: "The Guardian Nigeria",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Foreign Investment", "Trends", "Capital"],
      status: "crawled",
      coverImage: article3,
      readTime: "10 min",
      excerpt:
        "International investors show renewed confidence in Nigerian real estate market fundamentals.",
      publishedDate: "2026-02-16",
    },
    {
      id: 12,
      title: "Technology Transforming Property Management in Nigeria",
      author: "Ngozi Eze",
      category: "Technology",
      source: "PropTech Africa",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["PropTech", "Innovation", "Management"],
      status: "crawled",
      coverImage: article1,
      readTime: "7 min",
      excerpt:
        "PropTech startups are revolutionizing how properties are managed and invested in across Nigeria.",
      publishedDate: "2026-02-15",
    },
    {
      id: 13,
      title: "Regulatory Changes Impact Real Estate Investment Landscape",
      author: "Femi Adeleke",
      category: "Regulation",
      source: "Punch Newspapers",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Policy", "Regulation", "Legal"],
      status: "crawled",
      coverImage: article4,
      readTime: "9 min",
      excerpt:
        "New government policies are reshaping the investment framework for real estate development.",
      publishedDate: "2026-02-14",
    },
  ],
  drafts: [
    {
      id: 14,
      title: "Emerging Markets: Untapped Opportunities in Tier-2 Cities",
      author: "Kemi Adeleke",
      category: "Market Analysis",
      source: "Draft",
      publishedAt: "2026-02-17",
      views: 0,
      badges: ["Draft"],
      tags: ["Emerging Markets", "Tier-2 Cities", "Growth"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#E9D5FF_0%,#F5F3FF_100%)]",
      readTime: "8 min",
      publishedDate: "2026-02-17",
    },
    {
      id: 15,
      title: "Sustainability in Real Estate: Green Building Trends",
      author: "Adaobi Nnamdi",
      category: "Construction",
      source: "Draft",
      publishedAt: "2026-02-16",
      views: 0,
      badges: ["Draft"],
      tags: ["Sustainability", "Green Building", "Environment"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#BFDBFE_0%,#DBEAFE_100%)]",
      readTime: "7 min",
      publishedDate: "2026-02-16",
    },
    {
      id: 16,
      title: "Sustainability in Real Estate: Green Building Trends",
      author: "Adaobi Nnamdi",
      category: "Construction",
      source: "Draft",
      publishedAt: "2026-02-16",
      views: 0,
      badges: ["Draft"],
      tags: ["Sustainability", "Green Building", "Environment"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#FCD34D_0%,#FEF3C7_100%)]",
      readTime: "7 min",
      publishedDate: "2026-02-16",
    },
    {
      id: 17,
      title: "Sustainability in Real Estate: Green Building Trends",
      author: "Adaobi Nnamdi",
      category: "Construction",
      source: "Draft",
      publishedAt: "2026-02-16",
      views: 0,
      badges: ["Draft"],
      tags: ["Sustainability", "Green Building", "Environment"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#86EFAC_0%,#DCFCE7_100%)]",
      readTime: "7 min",
      publishedDate: "2026-02-16",
    },
  ],
};
