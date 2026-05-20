import { UserRoles } from '@/types';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  roles: UserRoles[];
  children?: NavigationItem[];
}

export interface AccountMenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardConfig {
  navigationItems: NavigationItem[];
  accountMenuItems: AccountMenuItem[];
  baseRoute: string;
}
