"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  CircleCheck,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import FormPreview from "../create-investments/formPreview";
import { formatPrice } from "@/utils/formatPrice";
import {
  useRetrieveInvestmentDetails,
  useUpdateInvestment,
} from "@/hook/investment-management";
import type { InvestmentDetails, InvestmentDocument } from "@/interface";

interface EditInvestmentFormProps {
  step: number;
  setStep: (step: number) => void;
  investmentId: number;
}

const milestoneStatusValues = ["completed", "in_progress", "upcoming"] as const;
const INPUT_CLASS =
  "border-input bg-surface h-10 w-full rounded-md border px-3 text-sm";

type EditInvestmentFormData = z.infer<typeof editInvestmentSchema>;
type MilestoneItem = EditInvestmentFormData["projectMilestones"][number];
type MilestoneInput = Omit<MilestoneItem, "status"> & {
  status: MilestoneItem["status"] | "";
};
type ExistingImage = InvestmentDetails["propertyDetails"]["images"][number];

const editInvestmentSchema = z.object({
  propertyName: z.string().min(1, "Property Name is required"),
  propertyType: z.string().min(1, "Select Property Type"),
  state: z.string().min(1, "Select State"),
  city: z.string().min(1, "City is required"),
  propertySize: z.number().min(1, "Size is required"),
  address: z.string().min(1, "Address is required"),
  units: z.number().min(1, "Units is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()).min(1, "Input at least one feature"),
  targetAmount: z.number().min(1, "Target Amount is required"),
  minimumInvestment: z.number().min(1, "Minimum Investment is required"),
  returnDistributionSchedule: z.string().min(1, "Select Return Distribution Schedule"),
  duration: z.string().min(1, "Duration is required"),
  expectedReturns: z.string().min(1, "Expected Returns is required"),
  riskRating: z.string().min(1, "Select Risk Rating"),
  propertyValue: z.number().optional(),
  expectedROI: z.number().optional(),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, "Cover image must be less than 5MB"),
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
        status: z.enum(milestoneStatusValues),
        description: z.string().min(1, "Milestone description is required"),
      }),
    )
    .min(1, "Add at least one milestone"),
});

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
const scheduleOption = [
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
  { label: "Upcoming", value: "upcoming" },
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

export function EditInvestmentForm({
  step,
  setStep,
  investmentId,
}: EditInvestmentFormProps) {
  const [featureInput, setFeatureInput] = useState("");
  const [milestoneDate, setMilestoneDate] = useState<Date>();
  const [milestoneInput, setMilestoneInput] = useState<MilestoneInput>({
    title: "",
    date: "",
    status: "",
    description: "",
  });
  const [existingCoverImage, setExistingCoverImage] = useState<ExistingImage | null>(null);
  const [existingPropertyImages, setExistingPropertyImages] = useState<ExistingImage[]>([]);
  const [existingDocuments, setExistingDocuments] = useState<InvestmentDocument[]>([]);
  const [isPrefilled, setIsPrefilled] = useState(false);

  const { data, isLoading } = useRetrieveInvestmentDetails(investmentId, true);
  const { mutateAsync: updateInvestmentFn, isPending: isUpdating } = useUpdateInvestment();

  const form = useForm<EditInvestmentFormData>({
    resolver: zodResolver(editInvestmentSchema),
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
      returnDistributionSchedule: "monthly",
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

  const milestones = useWatch({ control: form.control, name: "projectMilestones" });

  useEffect(() => {
    if (!data || isPrefilled) return;

    form.reset({
      propertyName: data.propertyDetails.propertyName,
      propertyType: mapToOptionValue(data.propertyDetails.propertyType, typeOptions),
      state: mapToOptionValue(data.propertyDetails.state, statesOption),
      city: data.propertyDetails.city,
      address: data.propertyDetails.fullAddress,
      propertySize: data.propertyDetails.propertySizeSqm,
      units:
        Number(data.propertyDetails.propertyUnit) ||
        data.propertyDetails.totalUnits ||
        0,
      description: data.propertyDetails.description,
      features: data.propertyDetails.keyHighlights ?? [],
      targetAmount: data.financialDetails.targetAmount,
      minimumInvestment: data.financialDetails.minimumInvestmentAmount,
      returnDistributionSchedule: mapToOptionValue(
        data.financialDetails.returnDistributionSchedule,
        scheduleOption,
        "monthly",
      ),
      duration: String(data.financialDetails.durationMonths),
      expectedReturns: String(data.financialDetails.expectedReturnsPercentage),
      riskRating: mapToOptionValue(data.financialDetails.riskRating, riskOption),
      propertyValue: data.financialDetails.propertyValue,
      expectedROI: data.overview.expectedRoi,
      coverImage: undefined,
      propertyImages: [],
      legalDocuments: [],
      projectMilestones:
        data.propertyDetails.milestones?.map((milestone) => ({
          title: milestone.title,
          date: milestone.date,
          status: normalizeValue(milestone.status) as MilestoneItem["status"],
          description: milestone.description,
        })) ?? [],
    });

    const incomingImages = data.propertyDetails.images ?? [];
    const [cover, ...others] = incomingImages;
    setExistingCoverImage(cover ?? null);
    setExistingPropertyImages(others);
    setExistingDocuments(data.documents ?? []);
    setIsPrefilled(true);
  }, [data, form, isPrefilled]);

  const isSection1Valid = async () =>
    form.trigger([
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

  const isSection2Valid = async () =>
    form.trigger([
      "targetAmount",
      "minimumInvestment",
      "returnDistributionSchedule",
      "duration",
      "expectedReturns",
      "riskRating",
    ]);

  const isSection3Valid = async () =>
    form.trigger(["coverImage", "propertyImages", "legalDocuments"]);

  const isSection4Valid = async () => {
    const currentMilestones = form.getValues("projectMilestones");
    if (!currentMilestones.length) {
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
      { shouldDirty: true, shouldValidate: true },
    );
    form.clearErrors("projectMilestones");
    setMilestoneInput({ title: "", date: "", status: "", description: "" });
    setMilestoneDate(undefined);
  };

  const handleDeleteMilestone = (indexToDelete: number) => {
    const currentMilestones = form.getValues("projectMilestones");
    form.setValue(
      "projectMilestones",
      currentMilestones.filter((_, index) => index !== indexToDelete),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleDeleteExistingCoverImage = (id: number) => {
    setExistingCoverImage((current) => (current?.id === id ? null : current));
  };

  const handleDeleteExistingPropertyImage = (id: number) => {
    setExistingPropertyImages((current) => current.filter((image) => image.id !== id));
  };

  const handleDeleteExistingDocument = (id: number) => {
    setExistingDocuments((current) => current.filter((doc) => doc.id !== id));
  };

  const handleUpdate = async (values: EditInvestmentFormData) => {
    const allPropertyImages = values.propertyImages ?? [];
    const publicationStatus = data?.header.investmentPublicationStatus ?? "draft";

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

    await updateInvestmentFn({ id: investmentId, payload });
  };

  const handleNext = async () => {
    if (step === 1 && (await isSection1Valid())) setStep(2);
    if (step === 2 && (await isSection2Valid())) setStep(3);
    if (step === 3 && (await isSection3Valid())) setStep(4);
    if (step === 4 && (await isSection4Valid())) setStep(5);
  };

  const coverExistingFiles = existingCoverImage
    ? [
        {
          id: existingCoverImage.id,
          name: existingCoverImage.fileName,
          url: existingCoverImage.url,
          type: existingCoverImage.mimeType,
        },
      ]
    : [];

  const propertyExistingFiles = existingPropertyImages.map((image) => ({
    id: image.id,
    name: image.fileName,
    url: image.url,
    type: image.mimeType,
  }));

  const existingDocumentFiles = existingDocuments.map((doc) => ({
    id: doc.id,
    name: doc.documentName,
    url: doc.fileUrl,
    type: doc.mimeType,
  }));

  if (isLoading) {
    return <div className="p-6">Loading investment details...</div>;
  }

  return (
    <div className="space-y-6 pb-6 w-full">
      <Card className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && step !== 4) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            {step === 1 && (
              <>
                <div className="items-center gap-4">
                  <h1 className="text-2xl font-semibold">Basic Information</h1>
                  <p>Update the fundamental details about the property</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Property Name</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className={INPUT_CLASS} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Property Type</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                {typeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">State</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                {statesOption.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">City</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className={INPUT_CLASS} />
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Street Address</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className={INPUT_CLASS} />
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Property Size (Sqm)</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("propertySize", { valueAsNumber: true })}
                            type="number"
                            className={INPUT_CLASS}
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Total Units</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("units", { valueAsNumber: true })}
                            type="number"
                            className={INPUT_CLASS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <span className="font-bold">Property Description</span>
                        <p className="text-red-500">*</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} className="border-input bg-surface h-32 w-full rounded-md border px-3 text-sm" />
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
                      <FormLabel className="flex items-center gap-2">
                        <span className="font-bold">Key Features</span>
                        <p className="text-red-500">*</p>
                      </FormLabel>
                      <div className="flex gap-4">
                        <Input
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          placeholder="Add feature"
                          className={`${INPUT_CLASS} w-65 lg:w-115`}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (featureInput.trim()) {
                              field.onChange([...(field.value ?? []), featureInput]);
                              setFeatureInput("");
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 space-y-2">
                        {(field.value ?? []).map((feature, index) => (
                          <div
                            key={`${feature}-${index}`}
                            className="px-3 py-2 bg-gray-100 rounded flex items-center gap-2"
                          >
                            <CircleCheck className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
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
                <div className="items-center gap-4">
                  <h1 className="text-2xl font-semibold">Financial Details</h1>
                  <p>Update the investment terms and expected returns</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="targetAmount"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Target Amount (NGN)</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...form.register("targetAmount", { valueAsNumber: true })} type="number" className={INPUT_CLASS} />
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Minimum Investment (NGN)</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...form.register("minimumInvestment", { valueAsNumber: true })} type="number" className={INPUT_CLASS} />
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Return Distribution Schedule</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select return schedule" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                {scheduleOption.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Duration (Months)</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className={INPUT_CLASS} />
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Expected Returns (%)</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className={INPUT_CLASS} />
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Risk Rating</span>
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select risk" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                {riskOption.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
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
                <div className="bg-green-50 border border-green-200 space-y-4 px-4 py-2 rounded-md">
                  <h2 className="text-lg font-bold">Investment summary</h2>
                  <div className="grid lg:grid-cols-4 gap-4">
                    <div><small>Target Amount</small><div>{formatPrice(form.getValues("targetAmount"))}</div></div>
                    <div><small>Min. Investment</small><div>{formatPrice(form.getValues("minimumInvestment"))}</div></div>
                    <div><small>Expected ROI</small><div className="text-green-500">{form.getValues("expectedROI")}%</div></div>
                    <div><small>Duration</small><div className="text-green-500">{form.getValues("duration")} months</div></div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="items-center gap-4">
                  <h1 className="text-2xl font-semibold">Media and Documents</h1>
                  <p>Review existing uploads and replace or remove them as needed</p>
                </div>
                <div className="space-y-4 rounded-md border border-gray-200 p-4">
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Cover Image</span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value ? [field.value] : []}
                            onChange={(files) => {
                              setExistingCoverImage(null);
                              field.onChange(files[0]);
                            }}
                            placeholder="Upload cover image"
                            single
                            existingFiles={field.value ? [] : coverExistingFiles}
                            onRemoveExisting={handleDeleteExistingCoverImage}
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
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Property Images</span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Upload property images"
                            enableDrag
                            existingFiles={propertyExistingFiles}
                            onRemoveExisting={handleDeleteExistingPropertyImage}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="legalDocuments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <span className="font-bold">Legal Documents</span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Upload legal documents"
                            type="file"
                            existingFiles={existingDocumentFiles}
                            onRemoveExisting={handleDeleteExistingDocument}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="items-center gap-4">
                  <h1 className="text-2xl font-semibold">Project Milestones</h1>
                  <p>Define key milestones for the project timeline</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <span className="font-bold">Title</span>
                      <p className="text-red-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={milestoneInput.title}
                        onChange={(e) =>
                          setMilestoneInput((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className={INPUT_CLASS}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <span className="font-bold">Date</span>
                      <p className="text-red-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button type="button" variant="outline" className="w-[280px] justify-start text-left font-normal">
                            <CalendarIcon />
                            {milestoneInput.date ? format(new Date(milestoneInput.date), "PPP") : <span>dd / mm / yyyy</span>}
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
                    <FormLabel className="flex items-center gap-2">
                      <span className="font-bold">Status</span>
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
                        <SelectContent position="popper">
                          <SelectGroup>
                            {milestoneStatusOption.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
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
                  <FormLabel className="flex items-center gap-2">
                    <span className="font-bold">Milestone Description</span>
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
                      className="border-input bg-surface h-32 w-full rounded-md border px-3 text-sm"
                    />
                  </FormControl>
                </FormItem>
                <div className="flex justify-between items-center">
                  <div>Minimum 100 characters recommended</div>
                  <Button type="button" variant="outline" onClick={handleAddMilestone}>
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
                    <h3 className="text-lg font-semibold border-b p-2">
                      Milestones Preview ({milestones.length})
                    </h3>
                    {milestones.map((milestone, index) => (
                      <div key={`${milestone.title}-${index}`} className="border rounded-md p-4 bg-gray-50 text-gray-700">
                        <div className="flex justify-between items-center gap-3">
                          <h4 className="font-semibold text-black">{milestone.title}</h4>
                          <div className="flex items-center gap-3">
                            <span className="text-xs uppercase">{milestone.status.replace("_", " ")}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500"
                              onClick={() => handleDeleteMilestone(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mt-2 text-gray-600">{milestone.description}</p>
                        <p className="mt-1 capitalize text-xs text-gray-600">
                          {milestone.status.replace("_", " ")} - {milestone.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 5 && <FormPreview previewData={form.getValues()} />}

            <div className="space-y-3 flex gap-4 justify-between w-full">
              <Button
                type="button"
                variant="outline"
                className="font-medium p-4"
                onClick={() => setStep(step - 1)}
                disabled={step === 1 || isUpdating}
              >
                Previous
              </Button>
              {step === 5 ? (
                <Button type="submit" disabled={isUpdating} className="flex items-center gap-2">
                  {isUpdating ? "Updating..." : "Update Investment"}
                </Button>
              ) : (
                <Button type="button" onClick={handleNext} disabled={isUpdating}>
                  Continue
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}