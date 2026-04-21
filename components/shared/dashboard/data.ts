import { ChildMenu, MenuItem } from '@/interface';
import {
  Activity,
  ArrowLeftRight,
  Bot,
  Calendar,
  ChartColumn,
  FileSearchCorner,
  FileText,
  HandCoins,
  LayoutDashboard,
  MapPin,
  Scale,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users2,
  Wallet,
} from 'lucide-react';

export const USER_ROLES = [
  { value: 'Admin.Officer', title: 'Admin Officer' },
  { value: 'Real.Estate.Analyst', title: 'Real Estate Analyst' },
  { value: 'Content.Editor', title: 'Content Editor' },
];
export const ACCOUNT_STATUS = [
  { value: 'activated', title: 'Activated' },
  { value: 'deactivated', title: 'Deactivated' },
  { value: 'pending', title: 'Pending' },
  { value: 'banned', title: 'Banned' },
  { value: 'suspended', title: 'Suspended' },
];
export const DEPARTMENTS = [
  { value: 'Human.Resource', title: 'Human Resource/Admin' },
  { value: 'Real.Estate.Analyst', title: 'Real Estate Research' },
  { value: 'Information.Technology', title: 'Information Technology' },
];
export const APP_ACCESS = [
  { value: 'Panterrios', title: 'PantteriOs' },
  { value: 'Buildcore', title: 'BuildCore' },
  { value: 'All', title: 'All' },
];
export type Role = 'Admin.Officer' | 'Real.Estate.Analyst' | 'Content.Editor';

// | 'Community.Manager';

// Common menu items shared across all roles
export const COMMON_MENU: MenuItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
];

// Role-specific menu items
export const ROLE_SPECIFIC_MENUS: Record<Role, MenuItem[]> = {
  'Admin.Officer': [
    { name: 'Investors', icon: Users2, link: '/investors' },
    { name: 'Investments', icon: TrendingUp, link: '/investments' },
    {
      name: 'Wallet & Finance',
      icon: Wallet,
      children: [
        {
          name: 'Transactions',
          link: '/finance/transactions',
          icon: ArrowLeftRight,
        },
        {
          name: 'Withdrawal Request',
          link: '/finance/withdrawal-request',
          icon: HandCoins,
        },
        {
          name: 'Reconciliations',
          link: '/finance/reconciliations',
          icon: Scale,
        },
        {
          name: 'Yield Events',
          link: '/finance/yield-events',
          icon: Activity,
        },
        {
          name: 'Investors Wallet',
          link: '/finance/investors-wallet',
          icon: Wallet,
        },
      ],
    },
    { name: 'Market Data', icon: MapPin, link: '/market-data' },
    { name: 'Analytics', icon: ChartColumn, link: '/analytics' },
    { name: 'Articles', icon: FileText, link: '/articles' },
    { name: 'Events', icon: Calendar, link: '/events' },
    { name: 'Ai Agents', icon: Bot, link: '/ai-agents' },
    { name: 'Users & Roles', icon: Shield, link: '/users' },
    { name: 'Audit Log', icon: FileSearchCorner, link: '/audit-log' },
  ],
  'Real.Estate.Analyst': [
    { name: 'Market Data', icon: MapPin, link: '/market-data' },
    { name: 'Analytics', icon: ChartColumn, link: '/analytics' },
  ],
  'Content.Editor': [
    { name: 'Articles', icon: FileText, link: '/articles' },
    { name: 'Events', icon: Calendar, link: '/events' },
  ],
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
    name: 'Profile',
    link: '/profile',
    icon: User,
  },
  // {
  //   name: "Settings",
  //   link: "/settings",
  //   icon: Settings,
  // },
];
