import { MoveRight, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HomeHero() {
  return (
    <div className="text-white bg-transparent grid lg:grid-cols-2 gap-8 pt-40 max-w-7xl mx-auto relative">
      <div className=" space-y-8">
        <h1 className="lg:text-8xl text-6xl font-bold line-clamp-6 gap-2 flex flex-col">
          <span> Where </span> <span>Panterrium</span>
          <span className="text-gray-500"> Operates</span>
        </h1>
        <p className="text-gray-500 text-xl">
          The command center for Africa's most intelligent real estate
          investment platform.
        </p>
        <Link href={'/login'}>
          <Button
            variant={'outline'}
            className="flex items-center text-black  py-6"
            size={'lg'}
          >
            {' '}
            Login to PanterriOS <MoveRight />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-red-500 mt-4">
          <Shield className=" w-5 h-5" />
          <span>Authorized access only</span>
        </div>
      </div>
      <div className=" bg-radial from-white/40 via-black-10 to-black "></div>
    </div>
  );
}
