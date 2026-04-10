import { cn } from "@/lib/utils";
import {
  Banknote,
  Check,
  CircleAlert,
  CircleCheck,
  FileText,
  Flag,
} from "lucide-react";

export function FormStepper({
  activeStep,
  className,
}: {
  activeStep: number;
  className: string;
}) {
  const steppers = [
    {
      title: "Basic Information",
      icon: CircleAlert,
    },
    {
      title: "Financial Details",
      icon: Banknote,
    },
    {
      title: "Media & Documents",
      icon: FileText,
    },
    {
      title: "Project Milestones",
      icon: Flag,
    },
    {
      title: "Review & Publish",
      icon: Check,
    },
  ];
  return (
    <div className="w-full">
      <div className="px-3 sm:px-4 mt-4 sm:mt-6 mb-4 sm:mb-6 w-full">
        <h2 className="text-lg sm:text-xl font-bold">Create new investment</h2>
        <small className="text-gray-500 text-xs sm:text-sm">
          Step {activeStep < 5 ? activeStep : 5} of 5
        </small>
      </div>

      <div className={cn("space-y-3 sm:space-y-4 px-3 sm:px-4 w-full", className)}>
        {steppers.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steppers.length - 1;
          const stepCount = i + 1;
          const isCompleted = activeStep > stepCount;

          return (
            <div key={i} className="space-y-2 sm:space-y-3">
              <div
                className={cn(
                  "text-gray-400 flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-md transition-colors w-full",
                  activeStep === stepCount && "bg-green-900 text-white",
                  isCompleted && "bg-green-100 text-green-950"
                )}
              >
                <div
                  className={cn(
                    "bg-gray-50/20 p-2 sm:p-3 rounded-md transition-colors",
                    isCompleted && "bg-white"
                  )}
                >
                  {isCompleted ? <CircleCheck /> : <Icon className="" />}
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm">Step {i + 1}</span>
                  <p className="font-bold text-sm sm:text-base leading-snug">{step.title}</p>
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-1.5 rounded-md h-8 sm:h-10 bg-gray-100 mx-auto transition-colors",
                    isCompleted && "bg-green-700"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
