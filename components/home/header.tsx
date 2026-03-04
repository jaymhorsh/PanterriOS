'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoveRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Logo from '@/assets/main-logo.png';
import Icon from '@/assets/icon.png';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 z-50 w-full ">
      <header className="bg-transparent w-full  py-3  ">
        <div className="max-w-7xl mx-auto bg-transparent ">
          <div className="flex  items-center justify-between lg:h-16">
            <Link href={'/'}>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={Logo}
                  alt="PanterriOS Logo"
                  width={300}
                  height={100}
                  priority
                  className="hidden h-auto w-58 lg:flex"
                />

                <Image
                  src={Icon}
                  alt="PanterriOS Logo"
                  width={30}
                  height={30}
                  priority
                  className="flex h-auto w-8 lg:hidden"
                />
              </div>
            </Link>

            <div className=" items-center gap-4 md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    className="flex items-center lg:py-6 py-3"
                  >
                    {' '}
                    <span> login</span> <MoveRight />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32 border-none shadow-lg space-y-6 flex flex-col justify-center items-center">
                  <Link href={'/login'}>
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      className="flex items-center py-6 px-2 w-fit bg-black text-white "
                    >
                      <span>To PanterriOS</span>
                    </Button>
                  </Link>
                  <Link href={''} type="_blank">
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      className="flex items-center py-6 px-2 w-fit bg-red-500 text-white "
                    >
                      {' '}
                      <span> To Build Core</span>
                    </Button>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 " />
              ) : (
                <Menu className="h-6 w-6 " />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <nav className="flex flex-col items-center justify-center gap-4  md:hidden transition-all absolute w-full bg-white z-30 -translate-x-1/2 left-1/2 ">
              <div className="flex flex-col gap-3 pt-4">
                <Button variant={'outline'}> login</Button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
}
