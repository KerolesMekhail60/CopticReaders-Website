import { ImageUp } from 'lucide-react';
import { DropzoneOptions } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type CustomImagesUploaderProps = {
  fieldName: string;
  label: string;
  dropZoneConfig?: DropzoneOptions;
};

const CustomImagesUploader = ({
  fieldName,
  label,
  dropZoneConfig = {
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  },
}: CustomImagesUploaderProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={dropZoneConfig}
                className='relative rounded-lg bg-background p-2'
              >
                <FileInput
                  id='imageInput'
                  className='outline-dashed outline-1 outline-slate-500'
                >
                  <div className='flex w-full flex-col items-center justify-center p-8'>
                    <ImageUp className='h-10 w-10 text-gray-500' />
                    <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Click to upload</span>
                      &nbsp; or drag 'n' drop
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                </FileInput>

                <FileUploaderContent className='flex flex-row items-center gap-2'>
                  {field.value &&
                    field.value.length > 0 &&
                    field.value.map((file: File, i: number) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className='size-20 overflow-hidden rounded-md p-0'
                        aria-roledescription={`file ${i + 1} containing ${file.name}`}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          height={80}
                          width={80}
                          className='size-20 p-0'
                        />
                      </FileUploaderItem>
                    ))}
                </FileUploaderContent>
              </FileUploader>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomImagesUploader;
