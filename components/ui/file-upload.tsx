'use client';

import { useRef, useState } from 'react';
import { FileText, GripVertical, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

interface FileUploadProps {
  value?: File[];
  onChange: (files: File[]) => void;
  error?: string;
  type?: 'image' | 'video' | 'file';
  placeholder?: string;
  max?: number; // MB
  showPreview?: boolean;
  enableDrag?: boolean;
  single?: boolean;
}

/* ================= SORTABLE ITEM ================= */

function SortableItem({
  file,
  index,
  onRemove,
  enableDrag,
}: {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  enableDrag: boolean;
}) {
  const id = file.name + index;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isImage = file.type.startsWith('image/');

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm w-40"
    >
      <div className="relative rounded-lg overflow-hidden ">
        {isImage ? (
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={100}
            height={100}
            className="h-40 w-full object-cover rounded-md"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center bg-white">
            <FileText className="h-8 w-8 text-red-600" />
          </div>
        )}

        {/* Drag Handle */}
        {enableDrag && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 cursor-grab active:cursor-grabbing z-10 bg-white/80 backdrop-blur rounded p-1"
          >
            <GripVertical className="h-4 w-4 text-gray-600" />
          </div>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur p-1 cursor-pointer z-10"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
      <div className="w-full">
        <p className="text-xs font-medium truncate">{file.name}</p>
        <small className="text-xs text-gray-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </small>
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

export function FileUpload({
  value = [],
  onChange,
  error,
  type = 'image',
  placeholder,
  max = 5,
  showPreview = true,
  enableDrag = false,
  single = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const maxSize = max * 1024 * 1024;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        toast.warning(`${file.name} exceeds ${max}MB`);
      }
    });

    if (single) {
      onChange(validFiles.length > 0 ? [validFiles[0]] : []);
      return;
    }

    onChange([...value, ...validFiles]);
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    console.log('delete');

    onChange(updated);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = value.findIndex((file, i) => file.name + i === active.id);
    const newIndex = value.findIndex((file, i) => file.name + i === over.id);

    onChange(arrayMove(value, oldIndex, newIndex));
  };

  return (
    <div className="w-full space-y-3 ">
      {/* ================= UPLOAD AREA ================= */}

      <div
        className={cn(
          'border-2 border-dashed flex flex-col items-center justify-center rounded-lg px-8 py-6 transition-colors ',
          isDragging ? 'border-primary-brand bg-blue-50' : 'border-gray-300',
          error && 'border-destructive',
          value.length > 0 && 'border-green-500',
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <Upload className="mb-2 h-5 w-5 text-gray-400" />

        <p className="text-center text-sm font-medium">
          {placeholder ?? 'Drop files or browse'}
        </p>

        <p className="text-muted-foreground text-center text-xs">
          Max {max}MB per file
        </p>

        {value.length > 0 && (
          <span className="text-xs text-gray-600">
            {value.length} files selected
          </span>
        )}

        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2"
          size="sm"
          variant="outline"
        >
          Choose File
        </Button>
      </div>

      {/* ================= INPUT ================= */}

      <input
        ref={fileInputRef}
        type="file"
        multiple={!single}
        accept={
          type === 'video'
            ? 'video/mp4'
            : type === 'file'
              ? '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
              : 'image/png,image/jpeg,image/jpg,image/gif'
        }
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      {/* ================= PREVIEW ================= */}

      {showPreview && value.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((file, i) => file.name + i)}
            strategy={rectSortingStrategy}
          >
            <div className="flex flex-wrap gap-4 ">
              {value.map((file, index) => (
                <SortableItem
                  key={file.name + index}
                  file={file}
                  index={index}
                  onRemove={handleRemove}
                  enableDrag={enableDrag}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
