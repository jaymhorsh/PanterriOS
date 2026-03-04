'use client';

import Image from 'next/image';
import Banner from '@/assets/svg/profile-header.svg';
import ProfilePic from '@/assets/images/ahmed.png';
import { Calendar, Camera, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { useMyProfileDetails } from '@/hook/user-management/useMyProfileDetails';
import { useUploadMyProfilePicture } from '@/hook/user-management/useUploadMyProfilePicture';

export function ProfileDetails() {
  const { data: profile } = useMyProfileDetails();
  const { mutateAsync: uploadProfilePicture, isPending: isUploading } =
    useUploadMyProfilePicture();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fullName = useMemo(() => {
    if (!profile) return 'Administrator';
    return `${profile.firstName} ${profile.lastName}`.trim();
  }, [profile]);

  const userDetails = useMemo(
    () => [
      {
        holder: 'Email Address',
        details: profile?.email || '-',
        icon: Mail,
      },
      {
        holder: 'Phone Number',
        details: profile?.phoneNumber || '-',
        icon: Phone,
      },
      {
        holder: 'Gender',
        details: profile?.gender || '-',
        icon: User,
      },
      {
        holder: 'Member Since',
        details: profile?.joinedAt
          ? new Date(profile.joinedAt).toLocaleDateString()
          : '-',
        icon: Calendar,
      },
    ],
    [profile],
  );

  const handleSavePhoto = async () => {
    if (!selectedFile) return;
    await uploadProfilePicture(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className=" lg:my-10 my-5 relative container mx-auto shadow h-fit ">
      <Image
        src={Banner}
        alt=""
        width={100}
        height={100}
        className=" w-full  h-auto absolute mt-0 -z-10"
      />
      <div className=" m-8 lg:pt-14 pt-6 mb-8 flex justify-between  items-center">
        <div className="flex lg:flex-row flex-col gap-2 justify-between w-full lg:items-end items-center ">
          <div className=" flex items-end gap-6 ">
            <div className=" w-35 h-35  object-cover object-center items-center rounded-md overflow-hidden">
              {profile?.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  width={140}
                  height={140}
                  className="object-center w-full h-full"
                />
              ) : (
                <Image
                  src={ProfilePic}
                  alt=""
                  width={100}
                  height={100}
                  className="object-center w-full"
                />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="lg:text-3xl text-xl font-bold ">{fullName}</h2>
              <p className="bg-black text-white px-4 rounded-sm whitespace-nowrap w-fit">
                {profile?.roles?.[0] || 'Admin.Officer'}
              </p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger className="border rounded-md px-4 py-2 bg-white">
              Edit Profile
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile Photo</DialogTitle>
                <DialogDescription className=" space-y-4 items-center">
                  <div className=" flex gap-4 bg-gray-100 p-2">
                    {profile?.profileImage ? (
                      <Image
                        src={profile.profileImage}
                        alt="Profile Preview"
                        width={96}
                        height={96}
                        className=" w-24 h-24 object-cover object-center items-center rounded-md "
                      />
                    ) : (
                      <Image
                        src={ProfilePic}
                        alt=""
                        width={100}
                        height={100}
                        className=" w-24 h-24 object-cover object-center items-center rounded-md "
                      />
                    )}
                    <div className="space-y-1">
                      <div className="text-xl font-bold">Profile Picture</div>
                      <p className="text-gray-500">JPG, JPEG or PNG. Max 12MB.</p>
                      <div className="relative">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition relative">
                          <Camera className=" w-4 h-4" />
                          <span>Change Photo</span>
                          <Input
                            type="file"
                            placeholder="Choose photo"
                            accept="image/png, image/jpeg, image/jpg"
                            className="opacity-0 absolute w-full h-10 top-0"
                            onChange={(e) =>
                              setSelectedFile(e.target.files?.[0] || null)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex gap-4 ">
                    <DialogClose>
                      <Button className="" variant={'outline'}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="flex bg-blue-500 text-white gap-1.5 items-center"
                      onClick={handleSavePhoto}
                      disabled={!selectedFile || isUploading}
                    >
                      Save Change
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full px-8 justify-between border-t flex flex-wrap gap-2 py-3 ">
        {userDetails.map((user, i) => {
          const Icon = user.icon;
          return (
            <div key={i} className=" space-y-1.5">
              <div className=" uppercase text-gray-500 lg:text-md text-xs font-semibold">
                {user.holder}
              </div>
              <div className="flex gap-2 justify-between items-center lg:text-md text-xs ">
                <Icon className="w-4 h-4" />
                <span> {user.details}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
