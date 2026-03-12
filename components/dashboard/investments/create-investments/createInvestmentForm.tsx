"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useCreateInvestment,
  useRetrieveInvestmentDetails,
  useUpdateInvestment,
} from "@/hook/investment-management";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  CircleCheck,
  FileText,
  Plus,
  Share,
  Trash2,
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import FormPreview from "./formPreview";
import { format } from "date-fns";
interface Prop {
  id?: number | string;
  step: number;
  setStep: (step: number) => void;
}

const milestoneStatusValues = ["completed", "in_progress", "upcoming"] as const;

const createInvestmentSchema = z.object({
  propertyName: z.string().min(1, "Property Name is required"),
  propertyType: z.string().min(1, "Select Property Type "),
  state: z.string().min(1, " Select State "),
  city: z.string().min(1, " City is required "),
  propertySize: z.number().min(1, " Size is required "),
  address: z.string().min(1, "Address is required"),
  units: z.number().min(1, "Units is required"),
  description: z.string().min(1, "description is required"),
  features: z.array(z.string()).min(1, "Input at least one features"),
  targetAmount: z.number().min(1, "Target Amount is required"),
  minimumInvestment: z.number().min(1, "Minimum Investment is required"),
  returnDistributionSchedule: z
    .string()
    .min(1, "Select Return Distribution Schedule "),
  duration: z.string().min(1, "Duration is Required"),
  expectedReturns: z.string().min(1, "Expected Returns is Required"),
  riskRating: z.string().min(1, "Select Risk Rating"),
  propertyValue: z.number().optional(),
  expectedROI: z.number().optional(),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Cover image must be less than 5MB",
    ),
  propertyImages: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => !files || files.every((file) => file.size <= 5 * 1024 * 1024),
      "Each file must be less than 5MB",
    ),
  legalDocuments: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => !files || files.every((file) => file.size <= 5 * 1024 * 1024),
      "Each file must be less than 5MB",
    ),
  projectMilestones: z
    .array(
      z.object({
        title: z.string().min(1, "Milestone title is required"),
        date: z.string().min(1, "Milestone date is required"),
        status: z.enum(milestoneStatusValues, {
          message:
            "Milestone status must be completed, in_progress, or upcoming",
        }),
        description: z.string().min(1, "Milestone description is required"),
      }),
    )
    .min(1, "Add at least one milestone"),
});

type CreateInvestmentFormData = z.infer<typeof createInvestmentSchema>;
type MilestoneItem = CreateInvestmentFormData["projectMilestones"][number];
type MilestoneInput = Omit<MilestoneItem, "status"> & {
  status: MilestoneItem["status"] | "";
};

const typeOptions = [
  { label: "Commercial", value: "commercial" },
  { label: "Industrial Space", value: "industrial_space" },
  { label: "Land", value: "land" },
  { label: "Office Block", value: "office_block" },
  { label: "Retail Mall", value: "retail_mall" },
  { label: "Residential", value: "residential" },
  { label: "Student Housing", value: "student_housing" },
];
const statesOption = [
  { label: "Lagos", value: "lagos" },
  { label: "Abuja", value: "abuja" },
  { label: "Port Harcourt", value: "port_harcourt" },
];
const schedulOption = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annual", value: "annual" },
  { label: "Bi annual", value: "bi_annual" },
  { label: "At Maturity", value: "at_maturity" },
];
const riskOption = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
const milestoneStatusOption = [
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "in_progress" },
  { label: "Up Coming", value: "upcoming" },
];
const requiredDoc = [
  "• Investment Prospectus",
  "• Property Valuation Report",
  "• Title Documents",
  "• Developer Information",
  "• Financial Projections",
];

const normalizeValue = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const mapToOptionValue = (
  rawValue: string,
  options: { value: string; label?: string }[],
  fallback = "",
) => {
  const normalized = normalizeValue(rawValue);
  const matched = options.find(
    (option) =>
      normalizeValue(option.value) === normalized ||
      normalizeValue(option.label ?? "") === normalized,
  );

  return matched?.value ?? fallback;
};

export function CreateInvestmentForm({ step, setStep, id }: Prop) {
  const investmentId = id ? Number(id) : undefined;
  const isEditMode = Boolean(investmentId);
  const [featureInput, setFeatureInput] = useState("");
  const [milestoneDate, setMilestoneDate] = useState<Date>();
  const [milestoneInput, setMilestoneInput] = useState<MilestoneInput>({
    title: "",
    date: "",
    status: "",
    description: "",
  });
  const [submitAction, setSubmitAction] = useState<
    "draft" | "published" | null
  >(null);
  const isLastStep = step === 5;
  const { data: editDetails, isLoading: isEditLoading } =
    useRetrieveInvestmentDetails(investmentId, isEditMode);
  const { mutateAsync: createInvestmentFn, isPending } = useCreateInvestment();
  const { mutateAsync: updateInvestmentFn, isPending: isUpdating } =
    useUpdateInvestment();

  const form = useForm<CreateInvestmentFormData>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      propertyName: "",
      propertyType: "",
      state: "",
      city: "",
      address: "",
      propertySize: 0,
      units: 0,
      description: "",
      features: [],
      targetAmount: 0,
      minimumInvestment: 0,
      returnDistributionSchedule: "quarterly",
      duration: "",
      expectedReturns: "",
      riskRating: "",
      propertyValue: 0,
      expectedROI: 0,
      coverImage: undefined,
      propertyImages: [],
      legalDocuments: [],
      projectMilestones: [],
    },
  });
  const milestones = useWatch({
    control: form.control,
    name: "projectMilestones",
  });

  useEffect(() => {
    if (!isEditMode || !editDetails) return;

    const mappedPropertyType = mapToOptionValue(
      editDetails.propertyDetails.propertyType,
      typeOptions,
    );
    const mappedState = mapToOptionValue(
      editDetails.propertyDetails.state,
      statesOption,
    );

    form.reset({
      propertyName: editDetails.propertyDetails.propertyName,
      propertyType: mappedPropertyType,
      state: mappedState,
      city: editDetails.propertyDetails.city,
      address: editDetails.propertyDetails.fullAddress,
      propertySize: editDetails.propertyDetails.propertySizeSqm,
      units:
        Number(editDetails.propertyDetails.propertyUnit) ||
        editDetails.propertyDetails.totalUnits ||
        0,
      description: editDetails.propertyDetails.description,
      features: editDetails.propertyDetails.keyHighlights ?? [],
      targetAmount: editDetails.financialDetails.targetAmount,
      minimumInvestment: editDetails.financialDetails.minimumInvestmentAmount,
      returnDistributionSchedule: mapToOptionValue(
        editDetails.financialDetails.returnDistributionSchedule,
        schedulOption,
        "monthly",
      ),
      duration: String(editDetails.financialDetails.durationMonths),
      expectedReturns: String(
        editDetails.financialDetails.expectedReturnsPercentage,
      ),
      riskRating: mapToOptionValue(
        editDetails.financialDetails.riskRating,
        riskOption,
      ),
      propertyValue: editDetails.financialDetails.propertyValue,
      expectedROI: editDetails.overview.expectedRoi,
      coverImage: undefined,
      propertyImages: [],
      legalDocuments: [],
      projectMilestones:
        editDetails.propertyDetails.milestones?.map((milestone) => ({
          title: milestone.title,
          date: milestone.date,
          status: normalizeValue(milestone.status) as MilestoneItem["status"],
          description: milestone.description,
        })) ?? [],
    });

    // Force these controlled select values after reset to avoid stale UI in Radix Select.
    form.setValue("propertyType", mappedPropertyType, { shouldValidate: true });
    form.setValue("state", mappedState, { shouldValidate: true });
  }, [editDetails, form, isEditMode]);

  const isSection1Valid = async () => {
    const result = await form.trigger([
      "propertyName",
      "propertyType",
      "state",
      "city",
      "address",
      "propertySize",
      "units",
      "description",
      "features",
    ]);

    return result;
  };
  const isSection2Valid = async () => {
    const result = await form.trigger([
      "targetAmount",
      "minimumInvestment",
      "returnDistributionSchedule",
      "duration",
      "expectedReturns",
      "riskRating",
    ]);

    return result;
  };
  const isSection3Valid = async () => {
    const result = await form.trigger([
      "coverImage",
      "propertyImages",
      "legalDocuments",
    ]);

    if (isEditMode) {
      return result;
    }

    const coverImage = form.getValues("coverImage");
    const propertyImages = form.getValues("propertyImages") || [];
    const legalDocuments = form.getValues("legalDocuments") || [];

    if (!coverImage) {
      form.setError("coverImage", {
        type: "manual",
        message: "Upload cover image",
      });
      return false;
    }

    if (!propertyImages.length) {
      form.setError("propertyImages", {
        type: "manual",
        message: "Upload at least one property image",
      });
      return false;
    }

    if (!legalDocuments.length) {
      form.setError("legalDocuments", {
        type: "manual",
        message: "Upload at least one Legal Documents",
      });
      return false;
    }

    return result;
  };

  const isSection4Valid = async () => {
    const milestones = form.getValues("projectMilestones");
    if (milestones.length === 0) {
      form.setError("projectMilestones", {
        type: "manual",
        message: "Add at least one milestone before continuing.",
      });
      return false;
    }
    form.clearErrors("projectMilestones");
    return true;
  };

  const handleAddMilestone = () => {
    if (
      !milestoneInput.title.trim() ||
      !milestoneInput.date ||
      !milestoneInput.status ||
      !milestoneInput.description.trim()
    ) {
      form.setError("projectMilestones", {
        type: "manual",
        message: "Please fill all milestone fields before adding.",
      });
      return;
    }

    const currentMilestones = form.getValues("projectMilestones");
    form.setValue(
      "projectMilestones",
      [
        ...currentMilestones,
        {
          ...milestoneInput,
          status: milestoneInput.status as MilestoneItem["status"],
        },
      ],
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
    form.clearErrors("projectMilestones");

    setMilestoneInput({
      title: "",
      date: "",
      status: "",
      description: "",
    });
    setMilestoneDate(undefined);
  };

  const handleDeleteMilestone = (indexToDelete: number) => {
    const currentMilestones = form.getValues("projectMilestones");
    const updatedMilestones = currentMilestones.filter(
      (_, index) => index !== indexToDelete,
    );

    form.setValue("projectMilestones", updatedMilestones, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (updatedMilestones.length === 0) {
      form.setError("projectMilestones", {
        type: "manual",
        message: "Add at least one milestone before continuing.",
      });
    }
  };

  const onSubmit = async (
    values: CreateInvestmentFormData,
    publicationStatus: "draft" | "published" = "published",
  ) => {
    try {
      setSubmitAction(publicationStatus);
      const allPropertyImages = [...(values.propertyImages || [])];

      const payload = {
        propertyName: values.propertyName,
        propertyType: values.propertyType,
        state: values.state,
        city: values.city,
        fullAddress: values.address,
        propertyDescription: values.description,
        targetAmount: values.targetAmount,
        minimumInvestmentAmount: values.minimumInvestment,
        returnDistributionSchedule: values.returnDistributionSchedule,
        duration: parseInt(values.duration),
        expectedReturnPercentage: parseFloat(values.expectedReturns),
        riskRating: values.riskRating,
        investmentPublicationStatus: publicationStatus,
        propertyValue: values.propertyValue,
        expectedRoi: values.expectedROI,
        propertySizeSqm: values.propertySize,
        propertyUnit: values.units.toString(),
        keyHighlights: values.features,
        projectMilestones: values.projectMilestones,
        coverImage: values.coverImage,
        propertyImages: allPropertyImages,
        propertyDocuments: values.legalDocuments,
      };

      if (isEditMode && investmentId) {
        await updateInvestmentFn({ id: investmentId, payload });
      } else {
        const createPayload = {
          ...payload,
          coverImage: values.coverImage as File,
          propertyImages: allPropertyImages,
          propertyDocuments: values.legalDocuments || [],
        };

        await createInvestmentFn(createPayload);
      }

      form.reset();
      setStep(1);
    } catch (error) {
      console.error(
        isEditMode
          ? "Failed to update investment:"
          : "Failed to create investment:",
        error,
      );
    } finally {
      setSubmitAction(null);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      const valid = await isSection1Valid();
      if (valid) setStep(2);
    }

    if (step === 2) {
      const valid = await isSection2Valid();
      if (valid) setStep(3);
    }

    if (step === 3) {
      const valid = await isSection3Valid();
      if (valid) setStep(4);
    }

    if (step === 4) {
      const valid = await isSection4Valid();
      if (valid) setStep(5);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  if (isEditMode && isEditLoading) {
    return <div className="p-6">Loading investment details...</div>;
  }

  return (
    <div className="space-y-6 pb-6 w-full">
      <Card className=" p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              onSubmit(values, "published"),
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && step !== 4) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            {step === 1 && (
              <>
                <div className=" items-center gap-4">
                  <h1 className="text-2xl font-semibold"> Basic Information</h1>
                  <p>
                    {isEditMode
                      ? "Update the fundamental details about the property"
                      : "Enter the fundamental details about the property"}
                  </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Property Name */}
                  <FormField
                    control={form.control}
                    name="propertyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Property Name</span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Victoria Island Office Complex"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Property Type */}
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Property Type</span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            key={`propertyType-${field.value}`}
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent position={"popper"}>
                              <SelectGroup>
                                {typeOptions.map((option, i) => (
                                  <SelectItem value={option.value} key={i}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  {/* state */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> State</span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            key={`state-${field.value}`}
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent position={"popper"}>
                              <SelectGroup>
                                {statesOption.map((option, i) => (
                                  <SelectItem value={option.value} key={i}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> City </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="e.g., Ikeja"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Street Address </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Full street address"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="propertySize"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> PropertySize (Sqm)</span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("propertySize", {
                              valueAsNumber: true,
                            })}
                            placeholder="2,500"
                            type="number"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="units"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold">Total Units</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("units", {
                              valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="24"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div></div>
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 ">
                        <span className="font-bold"> Property Description</span>{" "}
                        <p className="text-red-500">*</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Provide a detailed description of the property including key features, location advantages, target market, and investment highlights..."
                          className="border-input bg-surface h-32 w-full rounded-md border px-3 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 ">
                        <span className="font-bold"> Key Features</span>{" "}
                        <p className="text-red-500">*</p>
                      </FormLabel>

                      <div className="flex gap-4">
                        <Input
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          placeholder="Add feature "
                          className="w-65 lg:w-115 border"
                        />

                        <Button
                          type="button"
                          onClick={() => {
                            if (featureInput.trim()) {
                              field.onChange([...field.value, featureInput]);
                              setFeatureInput("");
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2 space-y-2">
                        {field.value.map((feature, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 bg-gray-100 rounded flex items-center gap-2"
                          >
                            <CircleCheck className="w-4 h-4 text-green-500" />
                            <span> {feature}</span>
                          </div>
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <div className=" items-center gap-4">
                  <h1 className="text-2xl font-semibold"> Financial Details</h1>
                  <p>Define the investment terms and expected returns</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="targetAmount"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Target Amount (₦) </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("targetAmount", {
                              valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="₦ 50,000,000"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minimumInvestment"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold">
                            {" "}
                            Minimum Investment (₦){" "}
                          </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("minimumInvestment", {
                              valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="₦ 100000"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="returnDistributionSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold">
                            {" "}
                            Return Distribution Schedule
                          </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select return schedule" />
                            </SelectTrigger>
                            <SelectContent position={"popper"}>
                              <SelectGroup>
                                {schedulOption.map((option, i) => (
                                  <SelectItem value={option.value} key={i}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Duration (Months) </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="24"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expectedReturns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold">
                            Expected Returns (%)
                          </span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="18"
                            className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="riskRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold">Risk Rating</span>{" "}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            key={`risk-${field.value}`}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select risk" />
                            </SelectTrigger>
                            <SelectContent position={"popper"}>
                              <SelectGroup>
                                {riskOption.map((option, i) => (
                                  <SelectItem value={option.value} key={i}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" bg-blue-50 border border-blue-200 space-y-4 px-4 py-2 rounded-md ">
                  <h2 className="text-lg font-bold">
                    Additional Financial Info (Optional)
                  </h2>
                  <div className="grid lg:grid-cols-2 gap-4 ">
                    <FormField
                      control={form.control}
                      name="propertyValue"
                      render={() => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 ">
                            <span className="font-bold">
                              Property Value (₦)
                            </span>{" "}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...form.register("propertyValue", {
                                valueAsNumber: true,
                              })}
                              type="number"
                              placeholder="10000000"
                              className="border-input bg-white h-10 w-full rounded-md border px-3 text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedROI"
                      render={() => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 ">
                            <span className="font-bold">Expected ROI (%)</span>{" "}
                            <p className="text-red-500">*</p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...form.register("expectedROI", {
                                valueAsNumber: true,
                              })}
                              type="number"
                              placeholder="18"
                              className="border-input bg-white h-10 w-full rounded-md border px-3 text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className=" bg-green-50 border border-green-200 space-y-4 px-4 py-2 rounded-md ">
                  <h2 className="text-lg font-bold">Investment summary</h2>
                  <div className="grid lg:grid-cols-4 gap-4 ">
                    <div className="">
                      <small>Target Amount</small>
                      <div>{formatPrice(form.getValues("targetAmount"))}</div>
                    </div>
                    <div className="">
                      <small>Min. Investment</small>
                      <div>
                        {formatPrice(form.getValues("minimumInvestment"))}
                      </div>
                    </div>
                    <div className="">
                      <small>Expected ROI</small>
                      <div className="text-green-500">
                        {form.getValues("expectedROI")}%
                      </div>
                    </div>
                    <div className="">
                      <small>Duration</small>
                      <div className="text-green-500">
                        {form.getValues("duration")} months
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className=" items-center gap-4">
                  <h1 className="text-2xl font-semibold">Media & Documents</h1>
                  <p>Define the investment terms and expected returns</p>
                </div>

                <div className=" grid lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Cover Image </span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value ? [field.value] : []}
                            onChange={(files) => field.onChange(files[0])}
                            placeholder="Upload the cover image"
                            single
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Property Images</span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Upload other property images"
                            enableDrag={true}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="legalDocuments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold">
                            Legal Documents
                          </span>{" "}
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Upload Legal Documents"
                            type="file"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="bg-orange-50 rounded-md border border-orange-100 p-4">
                    <div className="flex gap-2">
                      <FileText className=" text-orange-400" />
                      <span className="font-bold">Required Documents:</span>
                    </div>
                    <div className="space-y-2 flex flex-col px-4 py-3">
                      {requiredDoc.map((doc) => (
                        <small key={doc}>{doc}</small>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className=" items-center gap-4">
                  <h1 className="text-2xl font-semibold">Project Milestones</h1>
                  <p>Define key milestones for the project timeline</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 ">
                      <span className="font-bold"> Title </span>{" "}
                      <p className="text-red-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={milestoneInput.title}
                        onChange={(e) =>
                          setMilestoneInput((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="E.g Site Acquisition"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 ">
                      <span className="font-bold">Date</span>{" "}
                      <p className="text-red-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            data-empty={!milestoneInput.date}
                            className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                          >
                            <CalendarIcon />
                            {milestoneInput.date ? (
                              format(new Date(milestoneInput.date), "PPP")
                            ) : (
                              <span>dd / mm / yyyy</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={milestoneDate}
                            onSelect={(selectedDate) => {
                              if (!selectedDate) return;
                              setMilestoneDate(selectedDate);
                              setMilestoneInput((prev) => ({
                                ...prev,
                                date: format(selectedDate, "yyyy-MM-dd"),
                              }));
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 ">
                      <span className="font-bold">Status</span>{" "}
                      <p className="text-red-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={milestoneInput.status}
                        onValueChange={(value) =>
                          setMilestoneInput((prev) => ({
                            ...prev,
                            status: value as MilestoneItem["status"],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent position={"popper"}>
                          <SelectGroup>
                            {milestoneStatusOption.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </div>
                <FormItem>
                  <FormLabel className="flex items-center gap-2 ">
                    <span className="font-bold">
                      {" "}
                      Milestone Description
                    </span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      value={milestoneInput.description}
                      onChange={(e) =>
                        setMilestoneInput((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe this milestone..."
                      className="border-input bg-surface h-32 w-full rounded-md border px-3 text-sm"
                    />
                  </FormControl>
                </FormItem>
                <div className="flex justify-between items-center">
                  <div>Minimum 100 characters recommended</div>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={handleAddMilestone}
                  >
                    Add Milestone <Plus />
                  </Button>
                </div>
                {form.formState.errors.projectMilestones && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.projectMilestones.message}
                  </p>
                )}

                {milestones.length > 0 && (
                  <div className="space-y-3 max-w-lg rounded-2xl px-4 py-6">
                    <h3 className="text-lg font-semibold border-b p-2 ">
                      Milestones Preview ({milestones.length})
                    </h3>
                    {milestones.map((milestone, index) => {
                      const statusClass =
                        milestone.status === "completed"
                          ? "bg-green-50  text-green-700"
                          : milestone.status === "in_progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-50 text-gray-700";

                      return (
                        <div
                          key={`${milestone.title}-${index}`}
                          className={`border rounded-md p-4 ${statusClass}`}
                        >
                          <div className="flex justify-between items-center gap-3">
                            <h4 className="font-semibold text-black">
                              {milestone.title}
                            </h4>
                            <div className="flex items-center gap-3">
                              <span className="text-xs uppercase">
                                {milestone.status.replace("_", " ")}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-500"
                                onClick={() => handleDeleteMilestone(index)}
                                aria-label={`Delete milestone ${milestone.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm mt-2 text-gray-600">
                            {milestone.description}
                          </p>
                          <p className=" mt-1 capitalize text-xs text-gray-600">
                            {milestone.status.replace("_", " ")}-
                            {milestone.date}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {step === 5 && <FormPreview previewData={form.getValues()} />}

            {/* Buttons */}
            <div className="space-y-3 flex gap-4 justify-between w-full">
              <Button
                type="button"
                variant="outline"
                className=" font-medium p-4"
                onClick={handlePrev}
                disabled={step === 1}
              >
                Previous
              </Button>

              {isLastStep ? (
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      form.handleSubmit((values) => onSubmit(values, "draft"))()
                    }
                    disabled={isPending || isUpdating}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    {submitAction === "draft" && (isPending || isUpdating)
                      ? "Saving Draft..."
                      : isEditMode
                        ? "Save Changes"
                        : "Save as Draft"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending || isUpdating}
                    className="flex items-center gap-2"
                  >
                    {submitAction === "published" && (isPending || isUpdating)
                      ? isEditMode
                        ? "Updating..."
                        : "Publishing..."
                      : isEditMode
                        ? "Update Investment"
                        : "Publish Investment"}
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type={"button"}
                  onClick={isLastStep ? undefined : handleNext}
                  disabled={isPending || isUpdating}
                >
                  {isLastStep ? "Submit" : "Continue"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
