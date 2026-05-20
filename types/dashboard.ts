import { LucideIcon } from 'lucide-react';

export interface DashboardUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string | string[];
  avatar?: string;
  initials: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  navigationItems: MenuItem[];
  accountMenuItems: ChildMenu[];
  currentUser: DashboardUser;
  baseRoute: string;
}

export interface ChildMenu {
  name: string;
  icon: LucideIcon;
  link?: string;
}
export interface MenuItem {
  name: string;
  icon: LucideIcon;
  link?: string;
  children?: ChildMenu[];
}
