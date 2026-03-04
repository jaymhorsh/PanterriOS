'use client';
import { PanelLeft, LogOut, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { usePathname, useRouter } from 'next/navigation';
import { ChildMenu, DashboardUser } from '@/interface/dashboard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Notification from './Notification';
import { AppBreadcrumbs } from '../AppBreadcrumbs';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';

interface DashboardHeaderProps {
  user: DashboardUser;
  accountMenuItems: ChildMenu[];
  onMenuClick: () => void;
  showMobileMenu?: boolean;
  isMobile: boolean;
  onCollapseClick?: () => void;
  onClose: () => void;
  isCollapsed?: boolean;
}

export function DashboardHeader({
  user,
  accountMenuItems,
  onMenuClick,
  showMobileMenu = true,
  onCollapseClick,
  isCollapsed = false,
}: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    await clearAuth();
    router.push('/login');
  };

  return (
    <header className="bg-white flex h-16 items-center justify-between border-b px-6 shadow-sm">
      {/* Left Section: Menu + Breadcrumbs */}
      <div className="flex items-center gap-4">
        {showMobileMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        )}
        {onCollapseClick && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 md:flex"
            onClick={onCollapseClick}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <PanelLeft className="h-5 w-5 text-[#6B7280]" />
          </Button>
        )}
        <AppBreadcrumbs specialLabels={{}} />
      </div>

      {/* Right Section: Search, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-4 pr-4 text-sm border  bg-[#F9FAFB] border-[#E5E7EB] rounded-sm focus-visible:ring-primary-blue"
            />
          </div>
        </div>

        {/* Notifications */}
        <Notification />

        {/* User Menu - Desktop only */}
        <div className="hidden lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-50">
                <span className="flex h-10 w-10 items-center justify-center bg-black text-white p-2 rounded-full  text-sm font-medium">
                  {user.initials}
                </span>
                <span className="hidden xl:block">
                  {`${user.firstName} ${user.lastName}`.trim()}
                </span>
                <ChevronDown className="h-4 w-4 text-[#6B7280]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {accountMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.link;
                return (
                  <DropdownMenuItem key={item.link} asChild>
                    <Link
                      href={item.link!}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'text-primary-blue font-medium'
                          : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
