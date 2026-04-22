import { Clock3, MapPin, Users, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EventEntity } from '@/interface';
import { dateAndTimeFormatter } from '@/utils/helpers';
import Image from 'next/image';
import EditCreateEvent from '../EditCreateEvent';

interface EventListCardProps {
  event: EventEntity;
}

export function EventPublishedListCard({ event }: EventListCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#E2E8F0]">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-xs text-[#111827]">
                {event.sourceType}
              </span>
              {event.categories && (
                <span className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-xs text-[#111827]">
                  {event.categories[0]}
                </span>
              )}
              {event.isFeatured && (
                <span
                  className={`rounded-sm px-2 py-0.5 text-xs border border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]`}
                >
                  Featured
                </span>
              )}
              {event.isEditorsPick && (
                <span
                  className={`rounded-sm px-2 py-0.5 text-xs bg-[#EEF2FF] text-[#3730A3]`}
                >
                  Editors pick
                </span>
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

          <div>
            <h4 className="text-2xl leading-[1.25] font-semibold text-[#0F172B]">
              {event.title}
            </h4>
            <p className="mt-1 text-base md:w-[90%] leading-6 text-[#4B5563] truncate">
              {event.excerpt}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-[#E5E7EB] py-3 md:grid-cols-4">
            <div>
              <p className="mb-1 inline-flex items-center gap-1 text-sm text-[#4B5563]">
                <Clock3 className="h-4 w-4" /> Time
              </p>
              {event.eventDateTime && (
                <p className="text-sm text-[#111827]">
                  {dateAndTimeFormatter(event.eventDateTime)}
                </p>
              )}
            </div>
            <div>
              <p className="mb-1 inline-flex items-center gap-1 text-sm text-[#4B5563]">
                <MapPin className="h-4 w-4" /> Location
              </p>
              <p className="text-sm text-[#111827]">{event.location}</p>
            </div>
            <div>
              <p className="mb-1 inline-flex items-center gap-1 text-sm text-[#4B5563]">
                <Users className="h-4 w-4" /> Attendees
              </p>
              <p className="text-sm text-[#0F172B]">
                {event.expectedAttendees}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-[#4B5563]">Price</p>
              <p className={`text-sm font-semibold text-[#00A63E]`}>
                {event.priceFrom}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {event.matchedKeywords &&
              event.matchedKeywords.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-[#EEF2F7] px-2 py-1 text-xs text-[#334155]"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
