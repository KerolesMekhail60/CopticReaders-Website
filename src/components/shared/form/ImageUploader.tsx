import { useState } from 'react';

import { Upload } from 'lucide-react';
import { DropzoneOptions } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { FileInput, FileUploader } from '@/components/ui/file-upload';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import FilePlaceholder from './FilePlaceholder';

type ImageUploaderProps = {
  fieldName: string;
  label: string;
  imageUrl?: string;
  dropZoneConfig?: DropzoneOptions;
  isIcon?: boolean;
  iconName?: string;
};

const ImageUploader = ({
  fieldName,
  label,
  imageUrl,
  dropZoneConfig = {
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.svg'] },
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  },
  isIcon = false,
  iconName = '',
}: ImageUploaderProps) => {
  const form = useFormContext();
  const { setValue } = form;
  const [previewImage, setPreviewImage] = useState(imageUrl || '');
  const [previewImageName, setPreviewImageName] = useState(iconName || '');
  console.log('🚀 ~ previewImage:', previewImage);

  const handleRemoveImage = () => {
    setValue(fieldName, []);
    setPreviewImage(imageUrl || '');
    setPreviewImageName(iconName || '');
  };

  const handleImageChange = (newFile: File[] | null) => {
    if (newFile) {
      console.log('🚀 ~ handleImageChange ~ newFile:', newFile);
      setPreviewImage(URL.createObjectURL(newFile[0]));
      setPreviewImageName(newFile[0].name);
    }
  };

  function handleView() {
    if (isIcon)
      return (
        <div className='relative flex h-[53px] w-full items-center rounded-md bg-neutral-10 px-3 py-2 text-sm text-neutral-400 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
          <p className='pe-5 text-neutral-400'>
            {previewImage ? previewImageName : 'Upload Icon'}
          </p>
          <div className='absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-10 px-1'>
            <Upload
              strokeWidth={1.3}
              size={16}
            />
          </div>
        </div>
      );
    else {
      return (
        <div className='rounded-md'>
          {previewImage ? (
            <img
              src={previewImage}
              className='h-36 w-full object-contain py-4'
            />
          ) : (
            <FilePlaceholder isImages />
          )}
        </div>
      );
    }
  }
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-semibold text-neutral-900'>
            {label}
          </FormLabel>

          <FormControl>
            <FileUploader
              value={field.value}
              defaultValue={field.value}
              onClick={handleRemoveImage}
              onValueChange={(file) => {
                field.onChange(file);
                handleImageChange(file);
              }}
              dropzoneOptions={dropZoneConfig}
              className='relative rounded-md border border-neutral-100 bg-neutral-10'
            >
              <FileInput id='imageInput'>{handleView()}</FileInput>
            </FileUploader>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploader;
