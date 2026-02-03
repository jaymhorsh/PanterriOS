import { cn } from '@/lib/utils';

export interface PageHeadProp {
  pageTitle: string;
  subTitle: string;
  children?: React.ReactNode;
  className?: string;
}
export function PageHead({
  pageTitle,
  subTitle,
  children,
  className,
}: PageHeadProp) {
  return (
    <div className=" flex justify-between items-center container mx-auto">
      <div className={cn('', className)}>
        <h2 className="lg:text-2xl text-2xl text-black font-bold">{pageTitle}</h2>
        <p className=" lg:not-only:text-base text-[#45556C] mt-0.5 text-xs ">{subTitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
