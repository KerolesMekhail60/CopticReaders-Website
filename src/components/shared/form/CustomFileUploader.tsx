import { Paperclip } from 'lucide-react';
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

import FilePlaceholder from './FilePlaceholder';

type CustomFileUploaderProps = {
  fieldName: string;
  label: string;
  dropZoneConfig?: DropzoneOptions;
};

const CustomFileUploader = ({
  fieldName,
  label,
  dropZoneConfig = {
    accept: {
      'application/pdf': ['.pdf', '.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  },
}: CustomFileUploaderProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
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
                id='fileInput'
                className='outline-dashed outline-1 outline-slate-500'
              >
                <FilePlaceholder />
              </FileInput>

              <FileUploaderContent>
                {field.value &&
                  field.value.length > 0 &&
                  field.value.map((file: File, i: number) => (
                    <FileUploaderItem
                      key={i}
                      index={i}
                    >
                      <Paperclip className='h-4 w-4 stroke-current' />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFileUploader;
