import { ChildMenu, MenuItem } from "@/interface";
import {
  Bot,
  Calendar,
  ChartColumn,
  FileSearchCorner,
  FileText,
  LayoutDashboard,
  MapPin,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users2,
  Wallet,
} from "lucide-react";

export const USER_ROLES = [
  { value: "Admin.Officer", title: "Admin Officer" },
  { value: "Real.Estate.Analyst", title: "Real Estate Analyst" },
  { value: "Content.Editor", title: "Content Editor" },
];
export const ACCOUNT_STATUS = [
  { value: "activated", title: "Activated" },
  { value: "deactivated", title: "Deactivated" },
  { value: "pending", title: "Pending" },
  { value: "banned", title: "Banned" },
  { value: "suspended", title: "Suspended" },
];
export const DEPARTMENTS = [
  { value: "Human.Resource", title: "Human Resource/Admin" },
];
export type Role = "Admin.Officer" | "Real.Estate.Analyst" | "Content.Editor";

// | 'Community.Manager';

// Common menu items shared across all roles
export const COMMON_MENU: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
];

// Role-specific menu items
export const ROLE_SPECIFIC_MENUS: Record<Role, MenuItem[]> = {
  "Admin.Officer": [
    { name: "Investors", icon: Users2, link: "/investors" },
    { name: "Investments", icon: TrendingUp, link: "/investments" },
    {
      name: "Wallet & Finance",
      icon: Wallet,
      link: "/finance",
      // children: [
      //   { name: "Transactions", link: "/finance/transactions", icon: FileText },
      //   {
      //     name: "Withdrawal Request",
      //     link: "/finance/withdrawal-request",
      //     icon: FileText,
      //   },
      //   {
      //     name: "Reconciliation",
      //     link: "/finance/reconciliation",
      //     icon: FileText,
      //   },
      //   {
      //     name: "Yield Events",
      //     link: "/finance/yield-events",
      //     icon: FileText,
      //   },
      //   {
      //     name: "Investor Wallet",
      //     link: "/finance/investor-wallet",
      //     icon: FileText,
      //   },
      // ],
    },
    { name: "Market Data", icon: MapPin, link: "/market-data" },
    { name: "Analytics", icon: ChartColumn, link: "/analytics" },
    { name: "Articles", icon: FileText, link: "/articles" },
    { name: "Events", icon: Calendar, link: "/events" },
    { name: "Ai Agents", icon: Bot, link: "/ai-agents" },
    { name: "Users & Roles", icon: Shield, link: "/users" },
    { name: "Audit Log", icon: FileSearchCorner, link: "/audit-log" },
  ],
  "Real.Estate.Analyst": [],
  "Content.Editor": [],
};

// Function to generate the final menu for each role
export const SIDE_BAR_MENU: Record<Role, MenuItem[]> = Object.keys(
  ROLE_SPECIFIC_MENUS,
).reduce(
  (acc, role) => {
    acc[role as Role] = [...COMMON_MENU, ...ROLE_SPECIFIC_MENUS[role as Role]];
    return acc;
  },
  {} as Record<Role, MenuItem[]>,
);

export const MOBILE_SIDE_BAR_MENU: Record<Role, MenuItem[]> = Object.keys(
  ROLE_SPECIFIC_MENUS,
).reduce(
  (acc, role) => {
    acc[role as Role] = [...ROLE_SPECIFIC_MENUS[role as Role]];
    return acc;
  },
  {} as Record<Role, MenuItem[]>,
);

export const accountMenu: ChildMenu[] = [
  {
    name: "Profile",
    link: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: Settings,
  },
];
