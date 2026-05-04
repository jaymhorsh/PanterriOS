'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHead } from '@/components/shared';
import { Button } from '@/components/ui/button';
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
import { ArticleEditor } from './articleEditor';
import { Eye, Save, Send, Upload } from 'lucide-react';
import Image from 'next/image';
import { useCreateArticle } from '@/hook/articles/useCreateArticle';
import { useUploadMediaImage } from '@/hook/media-upload/useUploadMediaImage';

const articleCategories = [
  'Market Analysis',
  'Investment Strategy',
  'Housing Crisis',
  'Technology',
  'Infrastructure',
  'Regulation',
] as const;

const articleSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters'),
  summary: z.string().trim().min(20, 'Summary must be at least 20 characters'),
  content: z.string().trim().min(1, 'Article content is required'),
  coverImage: z.string().trim().min(1, 'Featured image is required'),
  category: z.array(z.string().trim().min(1)).min(1, 'Category is required'),
  author: z.string().trim().min(2, 'Author name is required'),
  readTime: z.string().trim().min(1, 'Reading time is required'),
  tags: z.string().min(1, 'Add at least one tag'),
  featureOnHomepage: z.boolean(),
  editorsPick: z.boolean(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const defaultArticleState: ArticleFormValues = {
  title: '',
  summary: '',
  content: '',
  coverImage: '',
  category: [],
  author: '',
  readTime: '',
  tags: '',
  featureOnHomepage: false,
  editorsPick: false,
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
          <span className="text-base font-medium text-[#111111]">{label}</span>
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

const CreateArticleForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: createArticleFn, isPending: isLoading } =
    useCreateArticle();
  const {
    mutateAsync: uploadMediaImageFn,
    isPending: isUploadingImage,
    data: uploadedImg,
  } = useUploadMediaImage();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: defaultArticleState,
  });

  const featureOnHomepage = watch('featureOnHomepage');
  const editorsPick = watch('editorsPick');
  const coverImage = watch('coverImage');

  useEffect(() => {
    return () => {
      if (coverImagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(coverImagePreview);
      }
    };
  }, [coverImagePreview]);

  const activeBadges = useMemo(() => {
    const badges: string[] = [];

    if (featureOnHomepage) {
      badges.push('FEATURED');
    }

    if (editorsPick) {
      badges.push("Editor's Pick");
    }

    return badges;
  }, [featureOnHomepage, editorsPick]);

  const onSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    const payload = {
      categories: data.category,
      content: data.content,
      excerpt: data.summary,
      imageUrl: data.coverImage,
      isEditorsPick: data.editorsPick,
      isFeatured: data.featureOnHomepage,
      readingTime: data.readTime,
      tags: data.tags,
      title: data.title,
    };
    await createArticleFn(payload);
  };

  const handleFeaturedImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setCoverImagePreview((currentPreview) => {
      if (currentPreview?.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreview);
      }

      return previewUrl;
    });

    try {
      const response = await uploadMediaImageFn(file);
      const result = response.data?.file?.url ?? '';

      setValue('coverImage', result, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setCoverImagePreview(result);
    } catch {
      setValue('coverImage', '', {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setCoverImagePreview((currentPreview) => {
        if (currentPreview?.startsWith('blob:')) {
          URL.revokeObjectURL(currentPreview);
        }

        return null;
      });
    } finally {
      event.target.value = '';
    }
  };

  const displayedCoverImage = coverImagePreview || coverImage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 px-0 pb-10"
    >
      <PageHead
        pageTitle="Create New Article"
        subTitle="Write and publish content for the platform"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          {/* <Button
            variant="outline"
            size="sm"
            type="button"
            className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm"
          >
            <Save className="h-4 w-4" />
            <span>Save Draft</span>
          </Button> */}
          <Button
            size="sm"
            type="submit"
            disabled={isLoading || isUploadingImage}
            className="flex h-9 items-center gap-2 rounded-sm px-3 text-xs sm:h-10 sm:text-sm"
          >
            <Send className="h-4 w-4" />
            <span>Publish Article</span>
          </Button>
        </div>
      </PageHead>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.8fr)]">
        <div className="space-y-6 rounded-xl border border-border p-4 sm:p-5">
          <div className="overflow-hidden">
            <h2 className="text-lg font-semibold text-slate-900">
              Article Information
            </h2>
            <div className="space-y-5 pt-6">
              <FieldShell
                label="Article Title"
                helper="Use a clear, keyword-rich headline."
              >
                <Input
                  {...register('title')}
                  placeholder="Lagos real estate demand accelerates in Q2 2026"
                  className="border-input bg-surface h-9 w-full rounded-md border p-2 text-xs sm:h-10 sm:p-3 sm:text-sm"
                />
                {errors.title ? (
                  <p className="text-xs text-red-600">{errors.title.message}</p>
                ) : null}
              </FieldShell>

              <FieldShell
                label="Article Summary"
                helper="This will be used in cards, previews, and search listings."
              >
                <Textarea
                  {...register('summary')}
                  placeholder="Write a concise summary that explains the angle of the article in two short sentences."
                  className="border-input bg-surface min-h-28 w-full rounded-md border p-2 text-xs sm:min-h-32 sm:p-3 sm:text-sm"
                />
                {errors.summary ? (
                  <p className="text-xs text-red-600">
                    {errors.summary.message}
                  </p>
                ) : null}
              </FieldShell>
            </div>
          </div>

          <div className="overflow-hidden">
            <h2 className="pb-2 text-lg font-semibold text-slate-900">
              Article Content
            </h2>
            <CardContent className="rounded-md border-t border-border p-0">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <ArticleEditor
                    fullWidth
                    value={field.value}
                    onChange={(html) => {
                      field.onChange(html);
                    }}
                  />
                )}
              />
            </CardContent>
            {errors.content ? (
              <p className="pt-2 text-xs text-red-600">
                {errors.content.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-6 sm:sticky lg:top-6 sm:self-start">
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
                      name="featureOnHomepage"
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
                      name="editorsPick"
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
              <FieldShell label="Author Name">
                <Input
                  {...register('author')}
                  placeholder="Your name"
                  className="border-input bg-surface h-9 w-full rounded-md border p-2 text-xs sm:h-10 sm:p-3 sm:text-sm"
                />
                {errors.author ? (
                  <p className="text-xs text-red-600">
                    {errors.author.message}
                  </p>
                ) : null}
              </FieldShell>

              <FieldShell label="Category">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value[0] ?? ''}
                      onValueChange={(value) => field.onChange([value])}
                    >
                      <SelectTrigger className="h-9 p-2 text-xs sm:h-10 sm:p-3 sm:text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {articleCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category ? (
                  <p className="text-xs text-red-600">
                    {errors.category.message}
                  </p>
                ) : null}
              </FieldShell>

              <FieldShell
                label="Tags"
                helper="Comma separated (3-5 tags recommended)"
              >
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                      placeholder="Student Housing, ROI, Education"
                      className="border-input bg-surface h-9 w-full rounded-md border p-2 text-xs sm:h-10 sm:p-3 sm:text-sm"
                    />
                  )}
                />
                {errors.tags ? (
                  <p className="text-xs text-red-600">{errors.tags.message}</p>
                ) : null}
              </FieldShell>

              <FieldShell
                label="Reading Time"
                helper="Estimated reading duration"
              >
                <Input
                  {...register('readTime')}
                  placeholder="e.g., 8 min"
                  className="border-input bg-surface h-9 w-full rounded-md border p-2 text-xs sm:h-10 sm:p-3 sm:text-sm"
                />
                {errors.readTime ? (
                  <p className="text-xs text-red-600">
                    {errors.readTime.message}
                  </p>
                ) : null}
              </FieldShell>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className=" ">
              <CardTitle className="text-lg font-semibold text-slate-900">
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <p className="mb-4 text-sm text-blue-600">
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

              <p className="text-center text-xs text-slate-500">or paste URL</p>
              <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    value={field.value}
                    onChange={(event) => {
                      setCoverImagePreview((currentPreview) => {
                        if (currentPreview?.startsWith('blob:')) {
                          URL.revokeObjectURL(currentPreview);
                        }

                        return null;
                      });
                      field.onChange(event.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="border-input bg-surface h-9 w-full rounded-md border p-2 text-xs sm:h-10 sm:p-3 sm:text-sm"
                  />
                )}
              />
              {errors.coverImage ? (
                <p className="text-xs text-red-600">
                  {errors.coverImage.message}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 shadow-sm">
            <CardContent className="space-y-3 text-sm text-slate-700">
              <ul className="list-inside list-disc space-y-2 text-sm text-blue-900">
                <li>Use clear, engaging headlines</li>
                <li>Keep paragraphs short and scannable</li>
                <li>Include relevant data and examples</li>
                <li>Add 3-5 descriptive tags</li>
                <li>Use high-quality featured images</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default CreateArticleForm;
