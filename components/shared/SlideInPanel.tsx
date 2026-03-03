"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export interface SlideInPanelDrawerProps {
  trigger: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  contentClassName?: string;
  direction?: "left" | "right";
}

const drawerWidthClasses = {
  sm: "sm:min-w-[420px]",
  md: "sm:min-w-[520px]",
  lg: "sm:min-w-[640px]",
  xl: "sm:w-[760px]",
};

export function SlideInPanelDrawer({
  trigger,
  title,
  subtitle,
  children,
  width = "md",
  contentClassName,
  direction = "right",
}: SlideInPanelDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction={direction} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "w-full overflow-hidden overflow-y-auto ",
          drawerWidthClasses[width],
          contentClassName,
          
        )}
      >
        <DrawerHeader className="flex items-start justify-between border-b border-[#E5E7EB] flex-shrink-0">
          <div className="flex-1">
            <DrawerTitle className="text-lg font-semibold text-[#111827]">
              {title}
            </DrawerTitle>
            {subtitle && (
              <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>
            )}
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <X className="h-5 w-5 text-[#6B7280]" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
