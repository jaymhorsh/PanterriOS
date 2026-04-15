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
  coverClassName: string;
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
      coverClassName: "bg-[linear-gradient(135deg,#0F172A_0%,#64748B_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#94A3B8_0%,#E2E8F0_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#334155_0%,#CBD5E1_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#93C5FD_0%,#DBEAFE_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#A8A29E_0%,#E7E5E4_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#D6B48C_0%,#F5E6D3_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#818CF8_0%,#E0E7FF_100%)]",
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
      coverClassName: "bg-[linear-gradient(135deg,#FBBF24_0%,#FEF3C7_100%)]",
    },
  ],
  crawledQueue: [
    {
      id: 9,
      title: "New crawled story from tech feed",
      author: "Auto Fetch",
      category: "Technology",
      source: "AI discovered",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Technology", "Automation"],
      status: "crawled",
      coverClassName: "bg-[linear-gradient(135deg,#BBF7D0_0%,#DCFCE7_100%)]",
    },
    {
      id: 10,
      title: "Market trends summary draft",
      author: "Auto Fetch",
      category: "Finance",
      source: "AI discovered",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Finance", "Market"],
      status: "crawled",
      coverClassName: "bg-[linear-gradient(135deg,#FDE68A_0%,#FEF9C3_100%)]",
    },
    {
      id: 11,
      title: "Business leadership article crawl",
      author: "Editor Bot",
      category: "Business",
      source: "External source",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Leadership", "Business"],
      status: "crawled",
      coverClassName: "bg-[linear-gradient(135deg,#FDBA74_0%,#FFEDD5_100%)]",
    },
    {
      id: 12,
      title: "Residential design insights from partner feed",
      author: "Auto Fetch",
      category: "Design",
      source: "AI discovered",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Residential", "Design"],
      status: "crawled",
      coverClassName: "bg-[linear-gradient(135deg,#C4B5FD_0%,#EDE9FE_100%)]",
    },
    {
      id: 13,
      title: "Real estate policy update from news crawl",
      author: "Auto Fetch",
      category: "Policy",
      source: "External source",
      publishedAt: "Awaiting review",
      views: 0,
      badges: ["Queued"],
      tags: ["Policy", "Regulation"],
      status: "crawled",
      coverClassName: "bg-[linear-gradient(135deg,#BFDBFE_0%,#EFF6FF_100%)]",
    },
  ],
  drafts: [
    {
      id: 14,
      title: "Editorial draft: content trends for Q2",
      author: "Editorial Team",
      category: "Business",
      source: "Draft",
      publishedAt: "2 hours ago",
      views: 0,
      badges: ["Draft"],
      tags: ["Content Trends", "Q2"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#E9D5FF_0%,#F5F3FF_100%)]",
    },
    {
      id: 15,
      title: "Social media publishing checklist",
      author: "Editorial Team",
      category: "Technology",
      source: "Draft",
      publishedAt: "Today",
      views: 0,
      badges: ["Draft"],
      tags: ["Social Media", "Checklist"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#BFDBFE_0%,#DBEAFE_100%)]",
    },
    {
      id: 16,
      title: "Weekly finance digest outline",
      author: "Editorial Team",
      category: "Finance",
      source: "Draft",
      publishedAt: "Yesterday",
      views: 0,
      badges: ["Draft"],
      tags: ["Finance", "Digest"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#FCD34D_0%,#FEF3C7_100%)]",
    },
    {
      id: 17,
      title: "Audience engagement ideas for the blog",
      author: "Editorial Team",
      category: "Growth",
      source: "Draft",
      publishedAt: "Yesterday",
      views: 0,
      badges: ["Draft"],
      tags: ["Audience", "Engagement"],
      status: "draft",
      coverClassName: "bg-[linear-gradient(135deg,#86EFAC_0%,#DCFCE7_100%)]",
    },
  ],
};
