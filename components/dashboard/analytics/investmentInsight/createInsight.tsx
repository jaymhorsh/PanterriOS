'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Eye, FileSpreadsheet, LoaderCircle, Plus, Upload } from 'lucide-react';

import { PageHead } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateAnalyticsInsightIntelligence } from '@/hook/analytics';
import { AnalyticsIntelligenceReq } from '@/interface';
import { toast } from 'sonner';

const insightTypeOptions = [
  'Opportunity',
  'Market Analysis',
  'Risk Alert',
  'Trend Watch',
] as const;

const impactLevelOptions = ['Low', 'Medium', 'High'] as const;

const createInsightSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters'),
  insightCategory: z.string().min(1, 'Select an insight type'),
  impactLevel: z.string().min(1, 'Select an impact level'),
  description: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters'),
  indication: z
    .string()
    .trim()
    .min(10, 'Investment indication must be at least 10 characters'),
});

type CreateInsightFormValues = z.infer<typeof createInsightSchema>;

const defaultValues: CreateInsightFormValues = {
  title: '',
  insightCategory: 'Opportunity',
  impactLevel: 'Low',
  description: '',
  indication: '',
};

function mapInsightPayload(
  values: CreateInsightFormValues,
): AnalyticsIntelligenceReq {
  return {
    title: values.title.trim(),
    insightCategory: values.insightCategory,
    impactLevel: values.impactLevel,
    description: values.description.trim(),
    indication: values.indication.trim(),
  };
}

export function CreateInsight() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutateAsync, isPending } = useCreateAnalyticsInsightIntelligence();

  const form = useForm<CreateInsightFormValues>({
    resolver: zodResolver(createInsightSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(mapInsightPayload(values));
    form.reset(defaultValues);
    setSelectedFile(null);
    router.push('/analytics');
  });

  const previewValues = form.watch();

  return (
    <div className="w-full space-y-6">
      <PageHead
        pageTitle="Add insight"
        subTitle="Create a new investment insight or market analysis"
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] lg:max-w-5xl">
        <Card className="overflow-hidden rounded-lg border-[#E4E7EC] py-0 shadow-none">
          <CardContent className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#101828]">
                  Create Investment Insight
                </h2>
                <p className=" text-[#667085]">
                  Add a new investment insight or market analysis
                </p>
              </div>

              <Form {...form}>
                <form className="space-y-6" onSubmit={onSubmit}>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className=" font-medium text-[#101828]">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Emerging Market: Lekki Peninsula"
                            className="h-14  border-[#D0D5DD] px-4  shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insightCategory"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className=" font-medium text-[#101828]">
                          Insight Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-14  border-[#D0D5DD] px-4  shadow-none">
                              <SelectValue placeholder="Select insight type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#E4E7EC] bg-white">
                            {insightTypeOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="impactLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className=" font-medium text-[#101828]">
                          Impact Level
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-14  border-[#D0D5DD] px-4  shadow-none">
                              <SelectValue placeholder="Select impact level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#E4E7EC] bg-white">
                            {impactLevelOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option} Impact
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className=" font-medium text-[#101828]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Detailed analysis of the market condition..."
                            className="min-h-[180px]  border-[#D0D5DD] px-4 py-4  shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="indication"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className=" font-medium text-[#101828]">
                          Investment Indication
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Indication of the market condition..."
                            className="min-h-[150px]  border-[#D0D5DD] px-4 py-4  shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-14 flex-1 "
                      onClick={() => {
                        form.reset(defaultValues);
                        setSelectedFile(null);
                      }}
                    >
                      Cancel
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="lg:h-14 flex-1 "
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl rounded-2xl border-[#E4E7EC] p-0">
                        <DialogHeader className="border-b border-[#EAECF0] px-6 py-5 text-left">
                          <DialogTitle className="text-xl text-[#101828]">
                            Insight Preview
                          </DialogTitle>
                          <DialogDescription className="text-sm text-[#667085]">
                            Review the insight before publishing it.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 px-6 py-6">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-[#667085]">
                              Title
                            </p>
                            <p className="text-2xl font-semibold text-[#101828]">
                              {previewValues.title || 'Untitled insight'}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <span className="rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-medium text-[#3538CD]">
                              {previewValues.insightCategory || 'No category'}
                            </span>
                            <span className="rounded-full bg-[#F2F4F7] px-4 py-2 text-sm font-medium text-[#344054]">
                              {previewValues.impactLevel || 'No impact level'}{' '}
                              Impact
                            </span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-[#667085]">
                              Description
                            </p>
                            <p className="whitespace-pre-wrap  leading-7 text-[#475467]">
                              {previewValues.description ||
                                'No description added yet.'}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-[#667085]">
                              Investment Indication
                            </p>
                            <p className="whitespace-pre-wrap  leading-7 text-[#475467]">
                              {previewValues.indication ||
                                'No investment indication added yet.'}
                            </p>
                          </div>
                        </div>
                        <DialogFooter className="border-t border-[#EAECF0] px-6 py-5">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className=" border-[#D0D5DD] shadow-none"
                            >
                              Continue editing
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      type="submit"
                      className="lg:h-14 flex-1 bg-[#101010]  "
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        'Publish Insight'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-lg border-[#E4E7EC] py-0 shadow-none">
            <CardContent className="space-y-5 px-5 py-6 sm:px-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#F2F4F7] text-[#101828]">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-semibold tracking-[-0.04em] text-[#101828]">
                      Bulk Upload
                    </div>
                  </div>
                  <p className=" text-sm text-[#475467]">
                    Click below to upload an Excel file and add your data in
                    bulk.
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setSelectedFile(file);
                  if (file) {
                    toast.success(`${file.name} selected for bulk upload`);
                  }
                }}
              />

              <Button
                type="button"
                className=" "
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="h-4 w-4" />
                Upload file
              </Button>

              {selectedFile ? (
                <div className="rounded-2xl border border-[#EAECF0] bg-[#FCFCFD] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5  bg-[#F2F4F7] p-2 text-[#344054]">
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#101828]">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-[#667085]">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
