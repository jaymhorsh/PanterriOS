'use client';

import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

import { DashboardUser, MenuItem } from '@/types/dashboard';
import { accountMenu, SIDE_BAR_MENU } from './data';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentUser: DashboardUser;
}

export function DashboardLayout({
  children,
  currentUser,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function getMenuByRoles(roles: string | string[] | undefined): MenuItem[] {
    const normalizedRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];

    if (normalizedRoles.length === 0) {
      console.warn('Invalid or missing roles:', roles);
      return [];
    }

    const menuSet = new Set<MenuItem>();

    normalizedRoles.forEach((role) => {
      if (role in SIDE_BAR_MENU) {
        SIDE_BAR_MENU[role as keyof typeof SIDE_BAR_MENU].forEach((menu) =>
          menuSet.add(menu),
        );
      }
    });

    return Array.from(menuSet);
  }

  const getInitialMenuOptions = (): MenuItem[] => {
    try {
      return getMenuByRoles(currentUser.role);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return [];
    }
  };

  const [menuOptions] = useState<MenuItem[]>(getInitialMenuOptions());

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="bg-dashboard-layout flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <DashboardSidebar
        navigationItems={menuOptions}
        isOpen={true}
        onClose={() => {}}
        isMobile={false}
        isCollapsed={sidebarCollapsed}
      />
      {/* Mobile Sidebar */}
      <DashboardSidebar
        navigationItems={menuOptions}
        accountMenuItems={accountMenu}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={true}
        isCollapsed={false}
      />

      {/* Main content */}
      <div className=" flex flex-1 flex-col overflow-hidden rounded-lg">
        <DashboardHeader
          user={currentUser}
          accountMenuItems={accountMenu}
          onMenuClick={toggleSidebar}
          onCollapseClick={toggleSidebarCollapse}
          isCollapsed={sidebarCollapsed}
          isMobile={true}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page content */}
        <main className="bg-dashboard-sidebar flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
