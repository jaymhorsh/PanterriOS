'use client';
import * as React from 'react';
import Image from 'next/image';
import logo from '@/assets/svg/icon.svg';


import { Card, CardContent } from '@/components/ui/card';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
interface AuthWrapperProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubTitle?: string;
  enableBackBtn?: boolean;
  cardClassName?: string;
}
export default function AuthWrapper({
  children,
  pageTitle,
  pageSubTitle,
  enableBackBtn,
  cardClassName,
}: AuthWrapperProps) {
  const date = new Date().getFullYear();
  return (
    <div className="bg-black p-6 text-white relative h-screen flex flex-col">
      <div
        className={cn(
          'flex  lg:flex-row flex-col lg:my-20 my-8 max-w-4xl mx-auto justify-center items-center ',
          enableBackBtn ? 'lg:gap-40 gap-3' : '',
        )}
      >
        {/* Image */}
        {enableBackBtn && (
          <Link href={'/login'}>
            <div className="flex gap-2 items-center text-white">
              <span className="bg-white text-black rounded-sm p-1">
                <ArrowLeft />{' '}
              </span>{' '}
              <span> Back to login</span>
            </div>
          </Link>
        )}
        <Link href={'/'}>
          <Image
            src={logo}
            alt="Logo"
            width={164}
            height={36}
            className="w-52"
            priority
          />
          <p className="text-gray-300 text-xs uppercase text-center">
            Admin Operating System
          </p>
        </Link>
        <div></div>
      </div>
      <div className="flex  items-center justify-center ">
        <div
          className={cn(
            'text-muted-foreground relative z-10 w-full max-w-md rounded-xl shadow',
            cardClassName,
          )}
        >
          {/* Form Card */}
          <Card className="rounded-lg ">
            <CardContent
              className="lg:px-8 px-4 py-4 space-y-4
             "
            >
              <div className=" ">
                <h1 className="text-2xl font-medium text-gray-800 ">
                  {pageTitle}
                </h1>
                <p className="text-sm">{pageSubTitle}</p>
              </div>

              {children}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="  items-center justify-between  pt-8 lg:text-sm text-xs md:flex-row text-center text-gray-300   -translate-x-1/2 left-1/2 bottom-5 absolute ">
        <p>&copy; {date} Panterrium. Secure admin infrastructure.</p>
      </div>
    </div>
  );
}
