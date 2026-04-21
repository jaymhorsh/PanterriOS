'use client';

import {
  PageHead,
  StatCard,
  StatCardSkeleton,
  TableSkeleton,
} from '@/components/shared';
import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';
import { Eye, Plus, Shield, SquarePen, User, Users, X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Link from 'next/link';
import { UsersDetialsPage } from '@/components/dashboard/users/page';
import EditCreateModal from '@/components/dashboard/users/modal/editCreateModal';
import { useRetrieveUsers } from '@/hook/user-management/useRetrieveUsers';

interface UsersRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export default function UsersPage() {
  const { data: usersRes, isLoading } = useRetrieveUsers({
    search: '',
    page: 1,
    limit: 20,
  });

  const tableData: UsersRow[] =
    usersRes?.data?.data.map((user, index) => ({
      id: user.id || index + 1,
      name: user.fullName,
      email: user.email,
      role: user.roles?.join(', ') || '-',
      status: user.status,
      lastLogin: user.lastLogin || '-',
    })) || [];

  const summary = [
    {
      label: 'Total Admin Users',
      value: usersRes?.data?.userStats?.totalUsers || 0,
      icon: Users,
      bgColor: 'text-blue-500 bg-blue-100 rounded-md p-2',
    },
    {
      label: 'Active Users',
      value: usersRes?.data?.userStats?.activeUsers || 0,
      icon: Shield,
      bgColor: 'text-green-500 bg-green-100 rounded-md p-2',
    },
    {
      label: 'Pending Users',
      value: usersRes?.data?.userStats?.pendingUsers || 0,
      icon: Shield,
      bgColor: 'text-orange-500 bg-orange-100 rounded-md p-2',
    },
  ];

  const columns: ColumnDef<UsersRow>[] = [
    {
      accessorKey: 'name',
      header: 'name',
      cell: ({ row }) => <p>{row.original.name}</p>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-gray-400">{row.original.email}</div>
      ),
    },

    {
      accessorKey: 'role',
      header: 'role',
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <div className="text-center capitalize bg-gray-50 text-gray-500 flex items-center gap-1.5 border border-gray-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <User className="w-3 h-3" />
            <span>{role.split('.').join(' ')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ' status',
      cell: ({ row }) => {
        const status = row.original.status;
        return status.toLowerCase() === 'active' ||
          status.toLowerCase() === 'activated' ? (
          <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <span> {status}</span>
          </div>
        ) : (
          <div className="text-center capitalize bg-gray-50 text-gray-500 flex  items-center gap-1.5 border border-gray-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <span> {status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'lastLogin',
      header: 'last login',
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.original.lastLogin}</div>
      ),
    },

    {
      accessorKey: 'action',
      header: 'action',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex gap-2">
            <>
              <div className="lg:flex hidden ">
                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button variant={'outline'}>
                      <Eye className="w-5 h-5" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent
                    className=" lg:data-[vaul-drawer-direction=left]:sm:max-w-xl
            lg:data-[vaul-drawer-direction=right]:sm:max-w-xl overflow-y-auto"
                  >
                    <DrawerHeader>
                      <DrawerTitle className="flex justify-between">
                        <div>
                          <div className="text-xl font-bold">User Profile </div>
                        </div>
                        <DrawerClose asChild>
                          <X />
                        </DrawerClose>
                      </DrawerTitle>
                      <DrawerDescription />
                      <UsersDetialsPage id={id} />
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </div>
              <Link href={'/users/' + id} className="flex lg:hidden">
                <Button variant={'outline'}>
                  <Eye className="w-5 h-5" />
                </Button>
              </Link>
            </>
            <EditCreateModal id={id}>
              <Button
                className="flex items-center gap-2 rounded-sm"
                variant={'outline'}
              >
                <SquarePen className="w-5 h-5" />
              </Button>
            </EditCreateModal>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHead
        pageTitle="Users & Roles"
        subTitle="Manage admin users and permissions (Super Admin only)"
      >
        <EditCreateModal>
          <Button className="flex items-center gap-2 rounded-sm">
            <Plus /> <span className="hidden lg:block"> Create New User</span>
          </Button>
        </EditCreateModal>
      </PageHead>
      <div className="grid lg:grid-cols-3 grid-cols-2 flex-wrap lg:gap-6 gap-3 my-8 ">
        {isLoading ? (
          <StatCardSkeleton count={3} />
        ) : (
          summary.map((user, i) => (
            <StatCard
              label={user.label}
              value={user.value}
              Icon={user.icon}
              bgColor={user.bgColor}
              key={i}
            />
          ))
        )}
      </div>

      {isLoading ? (
        <TableSkeleton rows={6} columns={6} />
      ) : (
        <ReUseAbleTable data={tableData} columns={columns} />
      )}
    </div>
  );
}
