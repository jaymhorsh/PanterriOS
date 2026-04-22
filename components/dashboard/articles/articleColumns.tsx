export function BadgePill({
  label,
  tone = 'default',
}: {
  label: string;
  tone?: 'default' | 'blue' | 'purple' | 'amber';
}) {
  const toneClasses = {
    default: 'border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]',
    blue: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]',
    purple: 'border-[#E9D5FF] bg-[#F3E8FF] text-[#8B5CF6]',
    amber: 'border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]',
  };

  return (
    <span
      className={`inline-flex rounded-md border px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
