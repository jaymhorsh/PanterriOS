import { cn } from "@/lib/utils";
import { getStatusColor, formatStatus } from "@/utils/statusColors";
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const { textColor, bgColor, borderColor } = getStatusColor(status);
  const normalizedStatus = status.toLowerCase();

  const isSuccess = ["success", "completed", "approved", "active"].includes(
    normalizedStatus,
  );
  const isWarning = ["pending", "in progress", "processing"].includes(
    normalizedStatus,
  );
  const isRejected = [
    "rejected",
    "failed",
    "cancelled",
    "error",
    "suspended",
  ].includes(normalizedStatus);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-xs font-medium",
        borderColor,
        bgColor,
        textColor,
        className,
      )}
    >
      {showDot && isSuccess && <CircleCheckBig className="h-3.5 w-3.5" />}
      {showDot && isWarning && <CircleAlert className="h-3.5 w-3.5" />}
      {showDot && isRejected && <CircleX className="h-3.5 w-3.5" />}
      {formatStatus(status)}
    </span>
  );
}
