import { Card } from '@/components/ui/card';

export function CreateUserFormSkeleton({
  isEditMode,
}: {
  isEditMode: boolean;
}) {
  return (
    <div className="space-y-6 pb-6 w-full animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-8 w-56 rounded bg-gray-200" />
      </div>

      <Card className="col-span-2 p-6">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`create-user-form-skeleton-input-${index}`}
                className={index > 1 ? 'space-y-2 md:col-span-2' : 'space-y-2'}
              >
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-md bg-gray-200" />
              </div>
            ))}

            <div className="mx-auto w-44 space-y-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-md bg-gray-200" />
            </div>

            {Array.from({ length: isEditMode ? 4 : 5 }).map((_, index) => (
              <div
                key={`create-user-form-skeleton-select-${index}`}
                className="space-y-2"
              >
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-md bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <div className="h-10 w-24 rounded-md bg-gray-200" />
            <div className="h-10 w-36 rounded-md bg-gray-200" />
          </div>
        </div>
      </Card>
    </div>
  );
}
