import {
  Calendar,
  CheckCircle2,
  Eye,
  MapPin,
  Clock3,
  Building2,
  Monitor,
  Users,
  XCircle,
  Pencil,
  Trash2,
} from 'lucide-react';
import { EventEntity } from '@/interface';
import { SlideInPanelDrawer } from '@/components/shared/SlideInPanel';
import { useUpdateEvent } from '@/hook/events';
import { EventPreview } from './EventPreview';
import {
  dateAndTimeFormatter,
  formatCurrency,
  formatDate,
} from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EditCreateEvent from './PublishedEventsTab/EditCreateEvent';

interface ReviewEventCardProps {
  event: EventEntity;
}

const sourceClassMap: Record<string, string> = {
  EventBrite: 'border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]',
  Submitted: 'border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]',
  AI: 'border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]',
};

export function EventListCard({ event }: ReviewEventCardProps) {
  const sourceLabel = event.sourceType ?? event.source?.name ?? 'AI';
  const organizerValue = event.organizerFullName ?? event.author ?? '-';
  const displayDate = formatDate(event.eventDateTime ?? event.startDateTime);
  const displayTime = dateAndTimeFormatter(event.eventDateTime! ?? '-');
  const displayLocation = event.location ?? event.venueAddress ?? '-';
  const attendanceMode = event.attendanceMode ?? '';
  const displayCategory = event.eventTopic ?? event.eventType ?? '-';

  const { updateEvent, isLoading } = useUpdateEvent();

  const chipTone = [
    'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
    'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
    'border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]',
    'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]',
  ];
  const attendanceModeLabel = attendanceMode || 'Unknown';
  const attendanceIcon = attendanceModeLabel.toLowerCase().includes('virtual')
    ? Monitor
    : attendanceModeLabel.toLowerCase().includes('physical')
      ? Users
      : Building2;
  const AttendanceIcon = attendanceIcon;
  const attendanceTone = attendanceModeLabel.toLowerCase().includes('virtual')
    ? 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]'
    : attendanceModeLabel.toLowerCase().includes('hybrid')
      ? 'border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]'
      : 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]';

  const handleStatusUpdate = async (id: string, status: string) => {
    await updateEvent({ id, payload: { status } });
  };

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#E2E8F0]">
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <h4 className="line-clamp-2 text-base capitalize font-semibold text-[#111827]">
            {event.title}
          </h4>
        </div>
        <span
          className={`rounded-sm border capitalize px-2 py-0.5 text-xs ${sourceClassMap[sourceLabel] ?? 'border-[#E5E7EB] text-[#334155]'}`}
        >
          {sourceLabel}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-medium capitalize text-[#475569]">
          {displayCategory}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 text-sm text-[#334155] md:grid-cols-2">
        <div className="space-y-2">
          <p className="inline-flex items-start gap-1">
            <MapPin className="h-5 w-5 text-[#64748B]" /> {displayLocation}
          </p>
          <p className="inline-flex items-center  gap-1">
            <Clock3 className="h-4 w-4 text-[#64748B]" /> {displayTime}
          </p>
          <p>
            Organizer:
            <span className="text-[#475569]"> {organizerValue}</span>
          </p>
          <p className="inline-flex items-center gap-2">
            Mode:
            <span
              className={`inline-flex items-center gap-1 border p-1 rounded-sm text-xs font-medium ${attendanceTone}`}
            >
              <AttendanceIcon className="h-3.5 w-3.5" />
              {attendanceModeLabel}
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#64748B]" /> {displayDate}
          </p>
          <p>
            Price:{' '}
            <span className="text-[#475569]">
              {' '}
              {event.priceFrom === 0
                ? 'FREE'
                : event.priceFrom
                  ? formatCurrency(event.priceFrom, event.priceCurrency)
                  : 'unknown'}
            </span>
          </p>
          <p>
            Category:{' '}
            <span className="capitalize text-[#475569]">{displayCategory}</span>
          </p>
        </div>
      </div>

      {event?.matchedKeywords && event?.matchedKeywords.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {event.matchedKeywords.map((tag, index) => (
            <span
              key={tag}
              className={`rounded-md capitalize border px-2.5 py-1 text-xs font-medium ${chipTone[index % chipTone.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2">
          <SlideInPanelDrawer
            trigger={
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#111827]"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
            }
            title="Event Preview"
            subtitle="View event details"
            width="lg"
            contentClassName="mx-0"
          >
            <EventPreview id={event._id} />
          </SlideInPanelDrawer>

          {event.status === 'published' ? (
            <Button
              type="button"
              className="inline-flex items-center min-w-30 gap-2 cursor-pointer rounded-sm border border-[#FCA5A5] bg-white px-3 py-1.5 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2]"
              onClick={() => handleStatusUpdate(event._id, 'rejected')}
              disabled={isLoading}
            >
              <XCircle className="h-4 w-4" />
              {isLoading ? 'Rejecting...' : 'Reject'}
            </Button>
          ) : (
            <Button
              type="button"
              className="inline-flex items-center min-w-30 gap-2 cursor-pointer rounded-sm bg-[#0AA84F] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#098a42]"
              onClick={() => handleStatusUpdate(event._id, 'published')}
              disabled={isLoading}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isLoading ? 'Publishing...' : 'Approve & Publish'}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Dialog>
            <DialogTrigger
              className="border rounded-md px-4 py-2 bg-white"
              asChild
            >
              <button className="hover:text-[#111827]">
                <Pencil className="h-5 w-5 cursor-pointer text-[#111111]" />
              </button>
            </DialogTrigger>
            <DialogContent className="p-6 sm:max-w-3xl lg:max-w-5xl xl:max-w-5xl  ">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription className="  hidden" />
                <EditCreateEvent id={event._id} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <button className="hover:text-[#DC2626] cursor-pointer">
            <Trash2 className="h-5 w-5 text-[#E7000B]" />
          </button>
        </div>
      </div>
    </div>
  );
}
