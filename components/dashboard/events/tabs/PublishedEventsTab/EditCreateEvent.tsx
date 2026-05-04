'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { EventFormSkeleton } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileImage,
  Send,
  Settings2,
  Type,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { useUploadMediaImage } from '@/hook/media-upload/useUploadMediaImage';
import { useRetrieveEventDetails, useUpdateEvent } from '@/hook/events';

const articleCategories = [
  'Market Analysis',
  'Investment Strategy',
  'Housing Crisis',
  'Technology',
  'Infrastructure',
  'Regulation',
] as const;

const statusOptions = ['published', 'pending', 'rejected'] as const;

const eventSchema = z.object({
  status: z.string().trim().min(1, 'Status is required'),
  title: z.string().trim().min(5, 'Title must be at least 5 characters'),
  categories: z.array(z.string().trim().min(1)).min(1, 'Category is required'),
  content: z.string().trim().min(1, 'Content is required'),
  excerpt: z.string(),
  imageUrl: z.string().trim().min(1, 'Image is required'),
  isFeatured: z.boolean(),
  isEditorsPick: z.boolean(),
});

type EventFormValues = z.infer<typeof eventSchema>;

const defaultEventValues: EventFormValues = {
  status: '',
  title: '',
  categories: [],
  content: '',
  excerpt: '',
  imageUrl: '',
  isFeatured: false,
  isEditorsPick: false,
};

function FieldShell({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="text-sm font-medium text-[#111111] sm:text-base">
            {label}
          </span>
          <span className="text-black">*</span>
        </div>
      </div>
      {children}
      {helper ? (
        <p className="text-sm leading-5 text-[#64748E]">{helper}</p>
      ) : null}
    </div>
  );
}

const EditCreateEvent = ({ id }: { id: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: event, isLoading: eventLoading } = useRetrieveEventDetails(id);
  const { updateEvent, isLoading } = useUpdateEvent();
  const { mutateAsync: uploadMediaImageFn, isPending: isUploadingImage } =
    useUploadMediaImage();
  const [flyerImagePreview, setFlyerImagePreview] = useState<string | null>(
    null,
  );
  const [step, setStep] = useState(1);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultEventValues,
  });

  const status = watch('status');
  const categories = watch('categories');
  const imageUrl = watch('imageUrl');
  const isFeatured = watch('isFeatured');
  const isEditorsPick = watch('isEditorsPick');
  const availableStatusOptions = useMemo(() => {
    if (
      !status ||
      statusOptions.includes(status as (typeof statusOptions)[number])
    ) {
      return statusOptions;
    }

    return [status, ...statusOptions] as const;
  }, [status]);

  const steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    fields: Array<keyof EventFormValues>;
  }> = [
    {
      id: 1,
      title: 'Basics',
      description: 'Status, title and content details',
      icon: Type,
      fields: ['status', 'title', 'content'],
    },
    {
      id: 2,
      title: 'Settings',
      description: 'Tags, categories and badges',
      icon: Settings2,
      fields: ['categories'],
    },
    {
      id: 3,
      title: 'Media',
      description: 'Upload image and publish',
      icon: FileImage,
      fields: ['imageUrl'],
    },
  ];

  const currentStep = steps.find((item) => item.id === step) ?? steps[0];
  const isLastStep = step === steps.length;

  useEffect(() => {
    if (!event?.data) {
      return;
    }

    reset({
      status: event.data.status ?? '',
      title: event.data.title ?? '',
      categories: event.data.categories ?? [],
      content: event.data.content ?? '',
      excerpt: event.data.excerpt ?? '',
      imageUrl: event.data.imageUrl ?? '',
      isFeatured: event.data.isFeatured ?? false,
      isEditorsPick: event.data.isEditorsPick ?? false,
    });
    setFlyerImagePreview(event.data.imageUrl ?? null);
  }, [event, reset]);

  useEffect(() => {
    return () => {
      if (flyerImagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(flyerImagePreview);
      }
    };
  }, [flyerImagePreview]);

  const activeBadges = useMemo(() => {
    const badges: string[] = [];

    if (isFeatured) {
      badges.push('FEATURED');
    }

    if (isEditorsPick) {
      badges.push("Editor's Pick");
    }

    return badges;
  }, [isEditorsPick, isFeatured]);

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    await updateEvent({ payload: data, id });
  };

  const handleNextStep = async (
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    const isValid = await trigger(currentStep.fields);

    if (!isValid) {
      return;
    }

    setStep((currentValue) => Math.min(currentValue + 1, steps.length));
  };

  const handleFeaturedImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setFlyerImagePreview((currentPreview) => {
      if (currentPreview?.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreview);
      }

      return previewUrl;
    });

    try {
      const response = await uploadMediaImageFn(file);
      const result = response.data?.file?.url ?? '';

      setValue('imageUrl', result, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setFlyerImagePreview(result);
    } catch {
      setValue('imageUrl', '', {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setFlyerImagePreview((currentPreview) => {
        if (currentPreview?.startsWith('blob:')) {
          URL.revokeObjectURL(currentPreview);
        }

        return null;
      });
    } finally {
      event.target.value = '';
    }
  };

  const displayedCoverImage = flyerImagePreview || imageUrl;

  if (eventLoading) {
    return <EventFormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-5">
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Edit Event Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Step {step} of {steps.length}: {currentStep.description}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {steps.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === step;
              const isCompleted = item.id < step;

              return (
                <div
                  key={item.id}
                  className={cn(
                    'rounded-lg border px-3 py-3 transition-colors',
                    isActive && 'border-slate-900 bg-slate-900 text-white',
                    isCompleted &&
                      'border-emerald-200 bg-emerald-50 text-emerald-900',
                    !isActive &&
                      !isCompleted &&
                      'border-slate-200 bg-white text-slate-500',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-md',
                        isActive && 'bg-white/15',
                        isCompleted && 'bg-white text-emerald-700',
                        !isActive && !isCompleted && 'bg-slate-100',
                      )}
                    >
                      {isCompleted ? (
                        <CircleCheck className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide opacity-80">
                        Step {item.id}
                      </p>
                      <p className="text-sm font-semibold">{item.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto pr-1">
          {step === 1 ? (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FieldShell
                  label="Status"
                  helper="Choose the current lifecycle state."
                >
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-10 p-3 text-sm">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {availableStatusOptions.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status ? (
                    <p className="text-xs text-red-600">
                      {errors.status.message}
                    </p>
                  ) : null}
                </FieldShell>

                <FieldShell
                  label="Title"
                  helper="Use a clear, keyword-rich headline."
                >
                  <Input
                    {...register('title')}
                    placeholder="Lagos real estate demand accelerates in Q2 2026"
                    className="border-input bg-surface h-10 w-full rounded-md border p-3 text-sm"
                  />
                  {errors.title ? (
                    <p className="text-xs text-red-600">
                      {errors.title.message}
                    </p>
                  ) : null}
                </FieldShell>

                <FieldShell
                  label="Excerpt"
                  helper="Keep it concise and informative for previews."
                >
                  <Textarea
                    {...register('excerpt')}
                    placeholder="Brief summary of the article or event update"
                    className="min-h-24 border-input bg-surface rounded-md border p-3 text-sm"
                  />
                  {errors.excerpt ? (
                    <p className="text-xs text-red-600">
                      {errors.excerpt.message}
                    </p>
                  ) : null}
                </FieldShell>

                <FieldShell
                  label="Content"
                  helper="Add the main article or event body."
                >
                  <Textarea
                    {...register('content')}
                    placeholder="Write the content here..."
                    className="min-h-36 border-input bg-surface rounded-md border p-3 text-sm"
                  />
                  {errors.content ? (
                    <p className="text-xs text-red-600">
                      {errors.content.message}
                    </p>
                  ) : null}
                </FieldShell>
              </CardContent>
            </Card>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Publication Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-base font-medium text-slate-900">
                          Featured Article
                        </p>
                        <Controller
                          name="isFeatured"
                          control={control}
                          render={({ field }) => (
                            <Switch
                              className="scale-125 origin-right"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <p className="text-sm text-slate-500">
                        Display prominently on homepage
                      </p>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-base font-medium text-slate-900">
                          Editor&apos;s Pick
                        </p>
                        <Controller
                          name="isEditorsPick"
                          control={control}
                          render={({ field }) => (
                            <Switch
                              className="scale-125 origin-right"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <p className="text-sm text-slate-500">
                        Curated editor selection
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">
                        Active Badges:
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeBadges.includes('FEATURED') ? (
                          <span className="inline-flex rounded-sm bg-amber-400 px-3 py-1 text-sm font-semibold text-black">
                            FEATURED
                          </span>
                        ) : null}
                        {activeBadges.includes("Editor's Pick") ? (
                          <span className="inline-flex rounded-md border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900">
                            Editor&apos;s Pick
                          </span>
                        ) : null}
                        {activeBadges.length === 0 ? (
                          <span className="text-xs text-slate-500">
                            No active badges selected.
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FieldShell label="Category">
                    <Controller
                      name="categories"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value[0] ?? ''}
                          onValueChange={(value) => field.onChange([value])}
                        >
                          <SelectTrigger className="h-10 p-3 text-sm">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {articleCategories.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.categories ? (
                      <p className="text-xs text-red-600">
                        {errors.categories.message}
                      </p>
                    ) : null}
                  </FieldShell>

                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm text-slate-600">
                      Selected category:{' '}
                      <span className="font-medium text-slate-900">
                        {categories[0] ?? 'None'}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Status preview:{' '}
                      <span className="font-medium capitalize text-slate-900">
                        {status}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Event Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-blue-600">
                    Recommended: 439x280px, landscape orientation
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageFileChange}
                  />

                  {displayedCoverImage ? (
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                      <Image
                        src={displayedCoverImage}
                        alt="Featured preview"
                        className="h-56 w-full object-cover"
                        width={439}
                        height={280}
                      />
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="flex min-h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-slate-400 hover:bg-slate-100"
                  >
                    <div className="space-y-3">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white text-slate-400">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {isUploadingImage
                            ? 'Uploading image...'
                            : 'Click to upload image'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    </div>
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    or paste URL
                  </p>
                  <Controller
                    name="imageUrl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        value={field.value}
                        onChange={(event) => {
                          setFlyerImagePreview((currentPreview) => {
                            if (currentPreview?.startsWith('blob:')) {
                              URL.revokeObjectURL(currentPreview);
                            }

                            return null;
                          });
                          field.onChange(event.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="border-input bg-surface h-10 w-full rounded-md border p-3 text-sm"
                      />
                    )}
                  />
                  {errors.imageUrl ? (
                    <p className="text-xs text-red-600">
                      {errors.imageUrl.message}
                    </p>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Ready to Publish
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>
                    This form now submits the exact payload shape required by
                    the API.
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap gap-2">
                      {activeBadges.length > 0 ? (
                        activeBadges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {badge}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">
                          No badges selected.
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setStep((currentValue) => Math.max(currentValue - 1, 1))
            }
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              key="save-event-button"
              type="submit"
              disabled={isLoading || isUploadingImage}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Save Event
            </Button>
          ) : (
            <Button
              key="continue-button"
              type="button"
              onClick={(event) => {
                void handleNextStep(event);
              }}
              className="flex items-center gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default EditCreateEvent;
