import {
  CalendarDays,
  Clock,
  ExternalLink,
  Globe,
  Gauge,
  MapPin,
  Bookmark,
  UserRound,
} from "lucide-react";
import { useRetrieveEventDetails } from "@/hook/events";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";
import Image from "next/image";

export function EventPreview({ id }: { id: string }) {
  const { data: eventDetails, isLoading } = useRetrieveEventDetails(id);
  const event = eventDetails?.data;

  const chips = Array.from(
    new Set(
      [
        ...(event?.categories ?? []),
        ...(event?.highlights ?? []),
        ...(event?.matchedKeywords ?? []),
      ]
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ).slice(0, 10);

  const chipTone = [
    "border-[#C7D2FE] bg-[#EEF2FF] text-[#3730A3]",
    "border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46]",
    "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]",
    "border-[#FED7AA] bg-[#FFF7ED] text-[#C2410C]",
  ];

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-[#64748B]">Loading event details...</div>
    );
  }

  if (!event) {
    return (
      <div className="p-4 text-sm text-[#64748B]">
        No event details available.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 pb-8">
      <div className="rounded-xl border border-[#D4D4D8] bg-white p-4 sm:p-5">
        <div className="relative overflow-hidden rounded-lg bg-[#E2E8F0]">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              className="h-[220px] w-full object-cover sm:h-[320px]"
              width={600}
              height={400}
            />
          ) : (
            <div className="h-[220px] w-full sm:h-[320px]" />
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111827]/70 to-transparent p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-white/90 px-2.5 py-1 text-xs font-medium text-[#111827]">
                {event.sourceType ?? "AI"}
              </span>
              <span className="rounded-sm bg-[#111827]/75 px-2.5 py-1 text-xs font-medium text-white">
                {event.eventType ?? "Event"}
              </span>
              {event.isFeatured ? (
                <span className="rounded-sm bg-[#F59E0B] px-2.5 py-1 text-xs font-semibold text-white">
                  Featured
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-black px-3 py-1.5 text-sm font-normal text-white">
            {event.eventTopic ?? event.eventType ?? "Event"}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-[#64748B]">
            <Clock className="h-4 w-4" />
            {event.attendanceMode ?? "Unknown"}
          </span>
          {event.source?.name ? (
            <span className="rounded-sm border border-[#E2E8F0] bg-white px-3 py-1 text-sm font-medium text-[#334155]">
              {event.source.name}
            </span>
          ) : null}
          {event.isEditorsPick ? (
            <span className="rounded-sm border border-[#C4B5FD] bg-[#F5F3FF] px-3 py-1 text-sm font-medium text-[#6D28D9]">
              Editors Pick
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-[1.3] text-[#0F172A] sm:text-3xl">
          {event.title}
        </h3>

        <p className="mt-4 text-sm italic leading-7 text-[#475569] sm:text-lg sm:leading-9">
          {event.excerpt ?? event.about ?? "No summary available."}
        </p>

        <div className="mt-5 grid gap-2 text-sm text-[#111827] sm:grid-cols-2 sm:text-base">
          <span className="inline-flex items-center gap-2 rounded-md bg-[#F8FAFC] px-3 py-2">
            <UserRound className="h-4 w-4" />
            {event.organizerFullName ?? event.author ?? "Unknown organizer"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-[#F8FAFC] px-3 py-2">
            <CalendarDays className="h-4 w-4" />
            {formatDate(event.eventDateTime ?? event.startDateTime)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-[#F8FAFC] px-3 py-2">
            <MapPin className="h-4 w-4" />
            {event.location ?? event.venueAddress ?? "No location"}
          </span>
          <span className="rounded-md bg-[#F8FAFC] px-3 py-2 text-[#45556C]">
            Status:{" "}
            <span className="font-medium uppercase">{event.status ?? "-"}</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-[#F8FAFC] px-3 py-2 text-[#45556C]">
            <Gauge className="h-4 w-4" />
            Relevance Score: {event.relevanceScore ?? "-"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-[#F8FAFC] px-3 py-2 text-[#45556C]">
            <Bookmark className="h-4 w-4" />
            Venue: {event.venueName ?? "N/A"}
          </span>
        </div>

        {event.url ? (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#475569]">
            <Globe className="h-4 w-4" />
            <Link
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="truncate hover:text-[#1D4ED8]"
            >
              {event.url}
            </Link>
          </p>
        ) : null}

        {event.registrationUrl ? (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#475569]">
            <ExternalLink className="h-4 w-4" />
            <Link
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate font-medium hover:text-[#1D4ED8]"
            >
              Registration Link
            </Link>
          </p>
        ) : null}

        {chips.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <span
                key={`${chip}-${index}`}
                className={`rounded-md capitalize border px-3 py-1 text-xs font-medium sm:text-sm ${chipTone[index % chipTone.length]}`}
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {event.detailsUrl && (
        <a
          href={event.detailsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 px-4 text-sm font-medium text-[#111827] transition hover:text-[#1D4ED8] sm:text-base"
        >
          <ExternalLink className="h-5 w-5" />
          View Full event
        </a>
      )}
    </div>
  );
}
