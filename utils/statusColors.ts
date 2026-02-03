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
      return {
        textColor: "text-[#008236]",
        bgColor: "bg-[#F0FDF4]",
        dotColor: "bg-[#008236]",
        borderColor: "border border-[#B9F8CF]",
      };

    case "pending":
    case "in progress":
    case "processing":
      return {
        textColor: "text-[#BB4D00]",
        bgColor: "bg-[#FFFBEB]",
        dotColor: "bg-[#BB4D00]",
        borderColor: "border-[#FEE685]",
      };

    case "rejected":
    case "failed":
    case "cancelled":
    case "error":
    case "suspended":
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
