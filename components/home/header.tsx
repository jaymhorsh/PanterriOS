"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Logo from "@/assets/svg/logo.svg";

export function Header() {
  return (
    <div className="fixed w-full top-0">
      <header className="w-full py-4 border-b   border-gray-200">
        <div className="flex items-center px-4 sm:max-w-[95%] sm:px-8 justify-between">
          {/* Logo */}
          {/* <Link href={"/"}>
            <Image
              src={Logo}
              alt="PanterriOS Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-32"
            />
          </Link> */}

          {/* Right side buttons */}
          <div className="flex items-center self-end flex-1 justify-end gap-4">
            <Link href={"/login"}>
              <Button
                variant="ghost"
                size="lg"
                className="text-black font-medium shadow-md rounded-sm border flex items-center py-2 gap-2"
              >
                Login
                <MoveRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href={"/login"}>
              <Button
                variant={"destructive"}
                className="bg-red-600 hover:bg-red-700 rounded-sm   text-white font-medium py-2 px-6"
                size="lg"
              >
                Login to Build Core
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
