import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Mission Assigned',
      message: 'You have been assigned to Survey Project #4521',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      title: 'Report Approved',
      message: 'Your report for Lagos Urban Survey has been approved',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New features available in the dashboard',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <Bell className="h-5 w-5 text-[#6B7280]" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-[10px] font-semibold bg-red-500 border-2 border-white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white" align="end">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold text-[#111827]">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-0 text-xs text-primary-blue hover:underline hover:bg-transparent"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BellOff className="mb-2 h-12 w-12 text-[#9CA3AF]" />
              <p className="text-sm text-[#6B7280]">No notifications</p>
              <p className="mt-1 text-xs text-[#9CA3AF]">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full p-4 text-left transition-colors hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {notification.message}
                      </p>
                      <p className="text-muted-foreground mt-2 text-xs">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
