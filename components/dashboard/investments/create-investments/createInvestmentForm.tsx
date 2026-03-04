'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { CircleCheck, FileText, Share } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import FormPreview from './formPreview';
interface Prop {
  id?: number | string;
  step: number;
  setStep: (step: number) => void;
}

const createInvestmentSchema = z.object({
  propertyName: z.string().min(1, 'Property Name is required'),
  propertyType: z.string().min(1, 'Select Property Type '),
  state: z.string().min(1, ' Select State '),
  city: z.string().min(7, ' City is required '),
  propertySize: z.number().min(1, ' Size is required '),
  address: z.string().min(1, 'Address is required'),
  units: z.number().min(1, 'Units is required'),
  description: z.string().min(1, 'description is required'),
  features: z.array(z.string()).min(1, 'Input at least one features'),
  targetAmount: z.number().min(1, 'Target Amount is required'),
  minimumInvestment: z.number().min(1, 'Minimum Investment is required'),
  returnDistributionSchedule: z
    .string()
    .min(1, 'Select Return Distribution Schedule '),
  duration: z.string().min(1, 'Duration is Required'),
  expectedReturns: z.string().min(1, 'Expected Returns is Required'),
  riskRating: z.string().min(1, 'Select Risk Rating'),
  propertyValue: z.number().optional(),
  expectedROI: z.number().optional(),
  coverimage: z
    .array(z.instanceof(File))
    .min(1, 'Upload cover image')
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      'Each file must be less than 5MB',
    ),
  propertyImages: z
    .array(z.instanceof(File))
    .min(1, 'Upload at least one property image')
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      'Each file must be less than 5MB',
    ),
  legalDocuments: z
    .array(z.instanceof(File))
    .min(1, 'Upload at least one Legal Documents')
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      'Each file must be less than 5MB',
    ),
});

type CreateInvestmentFormData = z.infer<typeof createInvestmentSchema>;

const typeOptions = [
  { label: 'Commercial', value: 'commercial' },
  { label: 'Industrial Space', value: 'industrial space' },
  { label: ' Land', value: ' land' },
  { label: 'Office Block', value: 'office block' },
  { label: 'Retail Mall', value: 'retail mall' },
  { label: 'Residential', value: 'residential' },
  { label: 'Student Housing', value: 'student housing' },
];
const statesOption = [
  { label: 'Lagos', value: 'lagos' },
  { label: 'Abuja', value: 'abuja' },
  { label: 'Port Harcourt', value: 'port harcourt' },
];
const schedulOption = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Annual', value: 'annual' },
  { label: 'Bi annual', value: 'bi annual' },
  { label: 'At Maturity', value: 'at maturity' },
];
const riskOption = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];
const requiredDoc = [
  '• Investment Prospectus',
  '• Property Valuation Report',
  '• Title Documents',
  '• Developer Information',
  '• Financial Projections',
];

export function CreateInvestmentForm({ step, setStep }: Prop) {
  const [featureInput, setFeatureInput] = useState('');
  const isLastStep = step === 5;

  const form = useForm<CreateInvestmentFormData>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      propertyName: '',
      propertyType: '',
      state: '',
      city: '',
      propertySize: 0,
      units: 0,
      description: '',
      features: [],
      targetAmount: 0,
      minimumInvestment: 0,
      returnDistributionSchedule: 'quarterly',
      duration: '',
      expectedReturns: '',
      riskRating: '',
      propertyValue: 0,
      expectedROI: 0,
      coverimage: [],
      propertyImages: [],
      legalDocuments: [],
    },
  });

  const isSection1Valid = async () => {
    const result = await form.trigger([
      'propertyName',
      'propertyType',
      'state',
      'city',
      'address',
      'propertySize',
      'units',
      'description',
      'features',
    ]);

    return result;
  };
  const isSection2Valid = async () => {
    const result = await form.trigger([
      'targetAmount',
      'minimumInvestment',
      'returnDistributionSchedule',
      'duration',
      'expectedReturns',
      'riskRating',
    ]);

    return result;
  };
  const isSection3Valid = async () => {
    const result = await form.trigger([
      'coverimage',
      'propertyImages',
      'legalDocuments',
    ]);

    return result;
  };

  const onSubmit = async (values: CreateInvestmentFormData) => {
    console.log(values);
    // setStep(1);
    // 🔥 Call your create user mutation here
    // await createUserFn(values)
    form.reset();
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
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div className="space-y-6 pb-6 w-full">
      <Card className=" p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && step !== 4) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            {step === 1 && (
              <>
                <div className=" items-center gap-4">
                  <h1 className="text-2xl font-semibold"> Basic Information</h1>
                  <p>Enter the fundamental details about the property</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Property Name */}
                  <FormField
                    control={form.control}
                    name="propertyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Property Name</span>{' '}
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
                          <span className="font-bold"> Property Type</span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent position={'popper'}>
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
                          <span className="font-bold"> State</span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent position={'popper'}>
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
                          <span className="font-bold"> City </span>{' '}
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
                          <span className="font-bold"> Street Address </span>{' '}
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
                          <span className="font-bold"> PropertySize (Sqm)</span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register('propertySize', {
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
                            {...form.register('units', {
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
                        <span className="font-bold"> Property Description</span>{' '}
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
                        <span className="font-bold"> Key Features</span>{' '}
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
                              setFeatureInput('');
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
                          <span className="font-bold"> Target Amount (₦) </span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register('targetAmount', {
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
                            {' '}
                            Minimum Investment (₦){' '}
                          </span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...form.register('minimumInvestment', {
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
                            {' '}
                            Return Distribution Schedule
                          </span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select return schedule" />
                            </SelectTrigger>
                            <SelectContent position={'popper'}>
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
                          <span className="font-bold"> Duration (Months) </span>{' '}
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
                          </span>{' '}
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
                          <span className="font-bold">Risk Rating</span>{' '}
                          <p className="text-red-500">*</p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select risk" />
                            </SelectTrigger>
                            <SelectContent position={'popper'}>
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
                            </span>{' '}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...form.register('propertyValue', {
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
                            <span className="font-bold">Expected ROI (%)</span>{' '}
                            <p className="text-red-500">*</p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...form.register('expectedROI', {
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
                      <div>{formatPrice(form.getValues('targetAmount'))}</div>
                    </div>
                    <div className="">
                      <small>Min. Investment</small>
                      <div>
                        {formatPrice(form.getValues('minimumInvestment'))}
                      </div>
                    </div>
                    <div className="">
                      <small>Expected ROI</small>
                      <div className="text-green-500">
                        {form.getValues('expectedROI')}%
                      </div>
                    </div>
                    <div className="">
                      <small>Duration</small>
                      <div className="text-green-500">
                        {form.getValues('duration')} months
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
                    name="coverimage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 ">
                          <span className="font-bold"> Cover Image </span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Upload the cover image"
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
                          </span>{' '}
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
            {step === 4 && <FormPreview previewData={form.getValues()} />}

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
                <Button type={'submit'} className="flex items-center">
                  Publish Investment <Share />
                </Button>
              ) : (
                <Button
                  type={'button'}
                  onClick={isLastStep ? undefined : handleNext}
                >
                  {isLastStep ? 'Submit' : 'Continue'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
