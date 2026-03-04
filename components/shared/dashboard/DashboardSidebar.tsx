"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dashboardLogo from "@/assets/logo.png";
import collapsLogo from "@/assets/icon.png";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { ChildMenu, MenuItem } from "@/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardSidebarProps {
  navigationItems: MenuItem[];
  accountMenuItems?: ChildMenu[];

  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
}

export function DashboardSidebar({
  navigationItems,
  isOpen,
  onClose,
  isMobile = false,
  isCollapsed = false,
  accountMenuItems,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { clearAuth } = useAuthStore();

  // Initialize open items based on active routes
  useEffect(() => {
    // Check if any child is active to keep parent open
    const isParentActive = (item: MenuItem) => {
      if (!item.children) return false;
      return item.children.some(
        (child) =>
          child.link &&
          (pathname === child.link || pathname.startsWith(child.link + "/")),
      );
    };

    const activeParents = navigationItems
      .filter((item) => item.children && isParentActive(item))
      .map((item) => item.name);
    setOpenItems(activeParents);
  }, [pathname, navigationItems]);

  const toggleItem = (title: string) => {
    if (isCollapsed && !isMobile) return;
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const handleLogout = async () => {
    await clearAuth();
    router.push("/login");
  };

  const NavItem = ({ item, level = 0 }: { item: MenuItem; level?: number }) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.includes(item.name);
    const isActive = item.link
      ? pathname === item.link || pathname.startsWith(item.link + "/")
      : false;

    // Check if this parent has any active children
    const hasActiveChild =
      hasChildren &&
      item.children?.some(
        (child) =>
          child.link &&
          (pathname === child.link || pathname.startsWith(child.link + "/")),
      );

    if (hasChildren) {
      return (
        <Collapsible open={isOpen} onOpenChange={() => toggleItem(item.name)}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                hasActiveChild
                  ? "text-primary-blue font-medium"
                  : "text-[#6B7280] hover:bg-accent",
                isCollapsed && !isMobile && "justify-center px-2",
              )}
              title={isCollapsed && !isMobile ? item.name : undefined}
            >
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              {(!isCollapsed || isMobile) && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                </>
              )}
            </button>
          </CollapsibleTrigger>
          {(!isCollapsed || isMobile) && (
            <CollapsibleContent className="space-y-1 pt-1">
              {item.children?.map((child) => (
                <NavItem key={child.name} item={child} level={level + 1} />
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    // Child item (level > 0) - no icon
    if (level > 0) {
      return (
        <Link
          href={item.link || "#"}
          onClick={isMobile ? onClose : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg p-3 pl-9 transition-colors text-sm",
            isActive
              ? "text-primary-blue font-medium"
              : "text-[#6B7280] hover:text-foreground",
          )}
        >
          <span>{item.name}</span>
        </Link>
      );
    }

    // Single item (no children, level 0)
    return (
      <Link
        href={item.link || "#"}
        onClick={isMobile ? onClose : undefined}
        className={cn(
          "flex items-center gap-3 rounded-md p-3 transition-colors relative overflow-hidden",
          level > 0 && "pl-9",
          isActive
            ? "bg-blue-100   py-4 text-[#155DFC] font-bold"
            : "text-gray-500 hover:bg-blue-50",
          isCollapsed && !isMobile && level === 0 && "justify-center px-2",
        )}
        title={isCollapsed && !isMobile && level === 0 ? item.name : undefined}
      >
        {isActive && (
          <span
            className={cn(
              "h-[80%] rounded-2xl w-4 -left-2 absolute bg-[#155DFC] py-4",
            )}
          ></span>
        )}
        {Icon && (
          <Icon
            className={`h-5 w-5 shrink-0 ${isActive ? "text-[#155DFC] font-bold" : "text-icon"} `}
          />
        )}
        {(!isCollapsed || isMobile || level > 0) && (
          <span className="font-sans text-sm font-normal">{item.name}</span>
        )}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div
        className={cn(
          "mx-4 flex h-16 items-center px-4 py-8 pt-12 border-b",
          isCollapsed && !isMobile ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed || isMobile ? (
          <Link href="/" className="cursor-pointer text-lg font-bold">
            <Image
              src={dashboardLogo}
              alt="PanterriOS Logo"
              width={100}
              height={100}
              className="w-32"
            />
          </Link>
        ) : (
          <Link
            href="/"
            className="cursor-pointer text-lg font-bold"
            title="PanterriOS"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <Image
                src={collapsLogo}
                alt="PanterriOS Logo"
                width={24}
                height={24}
              />
            </div>
          </Link>
        )}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation Items - Scrollable */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </nav>

      {/* Account Menu Items - Always Visible at Bottom */}
      <div className="p-3 pb-6 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-[#6B7280] hover:bg-accent",
                isCollapsed && !isMobile && "justify-center px-2",
              )}
              title={isCollapsed && !isMobile ? "My Account" : undefined}
            >
              <span className="text-lg rounded-full border-2 p-2">AH</span>
              {(!isCollapsed || isMobile) && (
                <>
                  <span className="flex-1 text-left">Ahmed Hakimi</span>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isCollapsed && !isMobile ? "end" : "start"}
            side={isCollapsed && !isMobile ? "right" : "top"}
            className="w-56 border-none shadow-lg"
          >
            {accountMenuItems &&
              accountMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.link;
                return (
                  <DropdownMenuItem key={item.link} asChild>
                    <Link
                      href={item.link!}
                      onClick={isMobile ? onClose : undefined}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary-blue font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={onClose}
            />
            <aside className="fixed inset-y-0 left-0 z-50  transform transition-transform md:hidden bg-white">
              <SidebarContent />
            </aside>
          </>
        )}
      </>
    );
  }

  return (
    <aside className="hidden md:flex md:shrink-0">
      <div
        className={cn(
          "flex flex-col border rounded-lg bg-white transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent />
      </div>
    </aside>
  );
}
