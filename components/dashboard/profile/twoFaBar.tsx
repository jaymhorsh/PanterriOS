'use client';

import { Button } from '@/components/ui/button';
import { Shield, Smartphone } from 'lucide-react';
import { useMyProfileDetails } from '@/hook/user-management/useMyProfileDetails';

export function TwoFaBar() {
  const { data: profile } = useMyProfileDetails();

  const isTwoFactorEnabled = Boolean(profile?.data?.isTwoEnabled);

  return (
    <div className=" space-y-4 lg:space-y-12">
      <div className="rounded-xl shadow p-4">
        <div className="flex justify-between">
          <div className=" flex gap-3 items-center">
            <Smartphone className=" text-blue-700" />
            <span className="text-xl font-semibold">2FA Verification</span>
          </div>
          <small
            className={`text-xs p-2 ${
              isTwoFactorEnabled
                ? 'text-green-500 bg-green-50'
                : 'text-gray-500 bg-gray-50'
            }`}
          >
            {isTwoFactorEnabled ? 'Active' : 'Inactive'}
          </small>
        </div>
        <div className="p-2 space-y-4 mt-4">
          <div className="flex gap-4 w-full shadow rounded-lg p-2 bg-green-50 ">
            <div className="bg-white w-10 h-10 items-center justify-center flex rounded-sm  ">
              <Shield className="w-7 h-7 text-green-500" />
            </div>
            <div className="w-full flex flex-col space-y-2">
              <div className=" gap-2 ">
                <div className=" font-semibold">Google Authenticator</div>

                <small className="text-xs h-fit">
                  Securing your account via OTP
                </small>
              </div>

              {isTwoFactorEnabled ? (
                <Button
                  variant={'outline'}
                  className="text-red-500 border-red-400 w-fit"
                  disabled
                >
                  Disable
                </Button>
              ) : (
                <Button variant={'outline'} className="w-fit" disabled>
                  Enable
                </Button>
              )}
            </div>
          </div>

          <div className=" gap-4 w-full shadow rounded-lg p-2 bg-blue-50 space-y-3 ">
            <div className="font-bold"> About 2FA</div>
            <small className="">
              Two-factor authentication adds an extra layer of security to your
              account by requiring a second verification step when logging in.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
