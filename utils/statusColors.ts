import { ca } from "date-fns/locale";

export function getStatusColor(status: string): {
  textColor: string;
  bgColor: string;
  dotColor: string;
  borderColor: string;
} {
  const normalizedStatus = status.toLowerCase();
  switch (normalizedStatus) {
    case "success":
    case "completed":
    case "approved":
    case "active":
    case "activated":
    case "balanced":
    case "funded":
    case "published":
    case "investment":
    case "paid":
    case "disbursed":
      return {
        textColor: "text-[#008236]",
        bgColor: "bg-[#F0FDF4]",
        dotColor: "bg-[#008236]",
        borderColor: "border border-[#B9F8CF]",
      };

    case "pending":
    case "draft":
    case "deposit":
    case "in progress":
      return {
        textColor: "text-[#BB4D00]",
        bgColor: "bg-[#FFFBEB]",
        dotColor: "bg-[#BB4D00]",
        borderColor: "border-[#FEE685]",
      };
    case "processing":
      return {
        textColor: "text-[#BB4D00]",
        bgColor: "bg-[#EFF6FF]",
        dotColor: "bg-[#1447E6]",
        borderColor: "border-[#BEDBFF]",
      };
    case "disbursed":
      return {
        textColor: "text-[#0369A1]",
        bgColor: "bg-[#F0F9FF]",
        dotColor: "bg-[#0369A1]",
        borderColor: "border-[#BAE6FD]",
      };

    case "rejected":
    case "failed":
    case "cancelled":
    case "error":
    case "suspended":
    case "deactivated":
    case "mismatch":
    case "flagged":
      return {
        textColor: "text-[#C10007]",
        bgColor: "bg-[#FEF2F2]",
        dotColor: "bg-[#C10007]",
        borderColor: "border-[#FFC9C9]",
      };

    default:
      return {
        textColor: "text-[#6B7280]",
        bgColor: "bg-[#F3F4F6]",
        dotColor: "bg-[#9CA3AF]",
        borderColor: "border-[#9CA3AF]",
      };
  }
}

/**
 * Status Badge Component Props
 */
export interface StatusBadgeProps {
  status: string;
  showDot?: boolean;
}

export function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}
