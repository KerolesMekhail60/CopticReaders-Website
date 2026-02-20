'use client';

import { useRef, useState } from 'react';

import { Edit2 } from 'lucide-react';
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

type CustomImageUploaderProps = {
  fieldName: string;
  label?: string;
  className?: string;
  avatarClassName?: string;
  disabled?: boolean;
  maxSizeMB?: number;
  defaultImageUrl?: string;
  getInitials?: (name: string) => string;
  avatarSize?: number;
};

function CustomImageUploader({
  fieldName,
  label,
  className = '',
  avatarClassName = '',
  disabled = false,
  maxSizeMB = 5,
  defaultImageUrl,
  getInitials,
}: CustomImageUploaderProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      // Update form value
      field.onChange(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleImageClick = () => {
    if (!disabled && !isSubmitting) {
      fileInputRef.current?.click();
    }
  };

  const getAvatarInitials = (name: string) => {
    return getInitials
      ? getInitials(name)
      : name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('group relative', className)}>
          <FormControl>
            <div className='flex flex-col items-center'>
              <div className='relative mb-4'>
                <Avatar className={cn(`h-[180px] w-[180px]`, avatarClassName)}>
                  <AvatarImage
                    src={
                      imagePreviewUrl ||
                      (defaultImageUrl ? defaultImageUrl : undefined) ||
                      (field.value?.name
                        ? URL.createObjectURL(field.value)
                        : undefined)
                    }
                    alt='Profile'
                  />
                  <AvatarFallback className='bg-primary-500 text-2xl font-semibold text-white'>
                    {field.value
                      ? getAvatarInitials(field.value.name || 'U')
                      : 'U'}
                  </AvatarFallback>
                </Avatar>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleImageChange(e, field)}
                  disabled={disabled || isSubmitting}
                />
                {!disabled && !isSubmitting && (
                  <button
                    type='button'
                    className='absolute bottom-0 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors'
                    onClick={handleImageClick}
                  >
                    <Edit2 className='h-5 w-5' />
                  </button>
                )}
              </div>
              {field.value && field.value.name && (
                <p className='text-xs text-muted-foreground'>
                  {field.value.name}
                </p>
              )}
            </div>
          </FormControl>
          {label && (
            <FormLabel className='text-center text-sm font-medium text-primary-500'>
              {label}
            </FormLabel>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomImageUploader;
