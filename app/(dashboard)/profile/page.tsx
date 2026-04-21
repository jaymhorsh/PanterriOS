'use client';
import {
  ActiveSessions,
  ChangePassword,
  ProfileDetails,
  TwoFaBar,
} from '@/components/dashboard';

import { PageHead, ProfilePageSkeleton } from '@/components/shared/';
import { Calendar } from 'lucide-react';
import { useMyProfileDetails } from '@/hook/user-management/useMyProfileDetails';

export default function ProfilePage() {
  const { data: profile, isLoading } = useMyProfileDetails();

  if (isLoading) return <ProfilePageSkeleton />;

  return (
    <div>
      <PageHead
        pageTitle="Administrator Profile"
        subTitle="Manage your personal information and security settings."
      >
        <div className="flex items-center gap-2">
          <Calendar />{' '}
          <span>Last Login: {profile?.data?.lastLogin || '-'}</span>
        </div>
      </PageHead>
      {/* profile head */}
      <ProfileDetails />
      {/* change password */}
      <div className=" my-8 flex  flex-col lg:flex-row lg:gap-8 ">
        <div className="lg:w-3/4 space-y-8">
          <ChangePassword />
          <div className="hidden">
            <ActiveSessions />
          </div>
        </div>
        <div className="lg:w-2/4 space-y-8">
          <TwoFaBar />
        </div>
      </div>
    </div>
  );
}
