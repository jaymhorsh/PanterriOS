"use client";

import {
  CreateInvestmentForm,
  FormStepper,
} from "@/components/dashboard/investments";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function InvestmentByIdPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const investmentId = Number(params.id);
  const isEditMode = searchParams.get("edit") === "true" || searchParams.has("edit");

  const isValidId = useMemo(() => Number.isFinite(investmentId), [investmentId]);

  if (!isValidId || !isEditMode) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-700">
        Invalid edit route. Use <code>/investments/[id]?edit=true</code>.
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden">
      <aside className="hidden lg:block lg:w-1/3 xl:w-1/4 overflow-y-auto border-r border-gray-200 pr-4">
        <div className="sticky top-0">
          <FormStepper activeStep={step} className="" />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pr-2">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-1 text-blue-700 cursor-pointer mb-4"
        >
          <p>Back</p>
          <ChevronLeft className="w-4 h-4" />
        </div>
        <CreateInvestmentForm
          id={investmentId}
          step={step}
          setStep={(nextStep) => setStep(nextStep)}
        />
      </main>
    </div>
  );
}
