"use client";

import React, { useState } from "react";
import { FileText, X } from "lucide-react";
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
        <DrawerHeader className="relative flex justify-between border-b border-[#E5E7EB] ">
          <div className="flex-1 items-center flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBEAFE]">
              <FileText className="w-5 h-5 text-[#155DFC]" />
            </div>

            <div>
              <DrawerTitle className="text-lg font-semibold text-[#111827]">
                {title}
              </DrawerTitle>
              {subtitle && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
            </div>
          </div>
          <DrawerClose
            asChild
            className="absolute top-[25%] right-5 bg-gray-100 p-2 "
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
