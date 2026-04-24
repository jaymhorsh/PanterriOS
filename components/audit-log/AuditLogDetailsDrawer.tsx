"use client";

import {
  Activity,
  CalendarDays,
  ExternalLink,
  MapPin,
  MoreVertical,
  Printer,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideInPanelDrawer } from "@/components/shared";
import { useRetrieveAuditLogRecord } from "@/hook/audit-log";
import type { AuditLogRecord } from "@/interface";
import { ActionBadge } from "./auditLogColumns";

interface AuditLogDetailsDrawerProps {
  row: AuditLogRecord;
}

function AuditLogDetailsSkeleton() {
  return (
    <div className="space-y-5 p-4">
      <div className="h-28 animate-pulse rounded-lg border bg-[#F8FAFC]" />
      <div className="h-24 animate-pulse rounded-lg border bg-[#F8FAFC]" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-16 animate-pulse rounded-lg border bg-[#F8FAFC]" />
        <div className="h-16 animate-pulse rounded-lg border bg-[#F8FAFC]" />
        <div className="h-16 animate-pulse rounded-lg border bg-[#F8FAFC]" />
        <div className="h-16 animate-pulse rounded-lg border bg-[#F8FAFC]" />
      </div>
      <div className="h-20 animate-pulse rounded-lg border bg-[#F8FAFC]" />
    </div>
  );
}

function formatDateTime(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const dateText = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeText = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateText}, ${timeText}`;
}

function formatDeviceInfo(deviceInfo?: string | Record<string, unknown> | null) {
  if (!deviceInfo) return "-";
  if (typeof deviceInfo === "string") return deviceInfo;

  const city = typeof deviceInfo.city === "string" ? deviceInfo.city : "";
  const state = typeof deviceInfo.state === "string" ? deviceInfo.state : "";
  const ip = typeof deviceInfo.ip === "string" ? deviceInfo.ip : "";
  const location = [city, state].filter(Boolean).join(", ");

  if (location && ip) return `${location} (${ip})`;
  if (location) return location;
  if (ip) return ip;

  return JSON.stringify(deviceInfo);
}

function formatChangeValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "-";
    return value.join(", ");
  }

  return JSON.stringify(value);
}

function formatFieldLabel(field: string) {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function buildFieldsToDisplay(
  changedFields: string[],
  before?: Record<string, unknown> | null,
  after?: Record<string, unknown> | null,
) {
  if (changedFields.length > 0) return changedFields;

  const beforeKeys = before ? Object.keys(before) : [];
  const afterKeys = after ? Object.keys(after) : [];

  return Array.from(new Set([...beforeKeys, ...afterKeys])).slice(0, 12);
}

export function AuditLogDetailsDrawer({ row }: AuditLogDetailsDrawerProps) {
  const requestId = row.reference || String(row.id);
  const {
    data: detailsData,
    isPending,
    isLoading,
    refetch,
  } = useRetrieveAuditLogRecord(requestId, false);

  const details = detailsData?.data?.data;
  const changes = details?.changes;
  const changedFields = changes?.changedFields ?? [];
  const beforeState = changes?.before;
  const afterState = changes?.after;
  const fieldsToDisplay = buildFieldsToDisplay(changedFields, beforeState, afterState);
  const shouldShowChanges =
    Boolean(changes) &&
    (fieldsToDisplay.length > 0 || Boolean(beforeState) || Boolean(afterState));

  return (
    <SlideInPanelDrawer
      trigger={
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#111827]"
          aria-label="View audit log details"
          onClick={() => {
            void refetch();
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      }
      title="Record Details"
      subtitle={`Audit Reference: ${requestId}`}
      width="lg"
      contentClassName="mx-0"
    >
      {(setOpen) =>
        isLoading || isPending ? (
          <AuditLogDetailsSkeleton />
        ) : (
          <div className="space-y-5 p-4">
            <div className="rounded-lg border border-[#DCE3EE] bg-[#F8FAFC] p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#DBEAFE]">
                  <Activity className="h-6 w-6 text-[#2563EB]" />
                </span>
                <div>
                  <p className="text-3xl font-semibold text-[#111827]">
                    Audit Status: Verified
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#2563EB]">
                    <ShieldCheck className="h-4 w-4" />
                    Digital integrity confirmed
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                Activity Description
              </p>
              <div className="rounded-lg border border-[#DCE3EE] bg-[#F8FAFC] p-4 text-[#334155]">
                {details?.description ?? row.description}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                  Administrator
                </p>
                <p className="inline-flex items-center gap-2 text-[#111827]">
                  <User className="h-4 w-4 text-[#64748B]" />
                  {details?.actor?.name ?? row.actor?.name ?? "-"}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                  Action Type
                </p>
                <ActionBadge action={details?.action ?? row.action} />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                  Login Location
                </p>
                <p className="inline-flex items-center gap-2 text-[#111827]">
                  <MapPin className="h-4 w-4 text-[#64748B]" />
                  {formatDeviceInfo(details?.deviceInfo ?? row.deviceInfo)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                  Timestamp
                </p>
                <p className="inline-flex items-center gap-2 text-[#111827]">
                  <CalendarDays className="h-4 w-4 text-[#64748B]" />
                  {formatDateTime(details?.occurredAt ?? row.occurredAt)}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                Asset Information
              </p>
              <div className="flex items-center justify-between rounded-lg border border-[#DCE3EE] bg-[#F8FAFC] p-4">
                <div>
                  <p className="text-sm text-[#64748B]">Target Object</p>
                  <p className="font-semibold text-[#111827]">
                    {details?.entityName ?? row.entityName}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-[#94A3B8]" />
              </div>
            </div>

            {shouldShowChanges ? (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">
                  Change Details
                </p>

                <div className="space-y-3 rounded-lg border border-[#DCE3EE] bg-[#F8FAFC] p-4">
                  {changedFields.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {changedFields.map((field) => (
                        <span
                          key={field}
                          className="rounded-sm border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-0.5 text-xs font-medium text-[#1D4ED8]"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {fieldsToDisplay.length > 0 ? (
                    <div className="overflow-hidden rounded-md border border-[#E2E8F0] bg-white">
                      <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#64748B]">
                        <span>Field</span>
                        <span>Before</span>
                        <span>After</span>
                      </div>

                      {fieldsToDisplay.map((field) => {
                        const beforeValue = beforeState?.[field];
                        const afterValue = afterState?.[field];

                        return (
                          <div
                            key={field}
                            className="grid grid-cols-[1fr_1fr_1fr] items-start border-b border-[#F1F5F9] px-3 py-2 text-sm last:border-b-0"
                          >
                            <p className="pr-2 font-medium text-[#1E293B]">
                              {formatFieldLabel(field)}
                            </p>
                            <p className="pr-2 text-[#64748B]">
                              {formatChangeValue(beforeValue)}
                            </p>
                            <p className="text-[#0F172A]">
                              {formatChangeValue(afterValue)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
              <Button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm bg-black px-4 py-2 text-white hover:bg-black/90"
              >
                Print Report
                <Printer className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                type="button"
                className="rounded-sm"
                onClick={() => setOpen(false)}
              >
                Dismiss
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      }
    </SlideInPanelDrawer>
  );
}
