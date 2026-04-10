'use client';

import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@/components/shared';
import { DashboardUser } from '@/interface/dashboard';
import { useAuthStore } from '@/store/authStore';
import { ProtectedRoute } from '@/hook/protectedRoute';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Ignore routes from dashboard layout
  const noDashboardRoutes = [
    '/',
    '/login',
    '/login/verify-2fa',
    '/login/set-up-2fa',
    '/create-password',
    '/forgot-password',
    '/forgot-password/reset-password',
    '/forgot-password/verify-otp',
    '/not-found',
  ];

  const isAuthRoute = noDashboardRoutes.includes(pathname);
  const { user } = useAuthStore();
  const loggedInUser = user?.data;
  const currentUser: DashboardUser = {
    email: loggedInUser?.email ?? '',
    firstName: loggedInUser?.firstName ?? '',
    lastName: loggedInUser?.lastName ?? '',
    role: loggedInUser?.roles ?? [],
    initials: `${loggedInUser?.firstName?.trim()?.charAt(0) || 'A'}${loggedInUser?.lastName?.charAt(0) || 'U'}`,
  };

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout currentUser={currentUser}>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
