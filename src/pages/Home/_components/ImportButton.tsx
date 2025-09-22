import { useState } from 'react';

import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .nonempty('Please select at least one file')
    .refine(
      (files) => files.every((file) => file.size <= 4 * 1024 * 1024),
      'Each file must be less than 4MB',
    )
    .refine(
      (files) =>
        files.every((file) =>
          ['.xls', '.xlsx', '.csv'].some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        ),
      'Only Excel (.xls, .xlsx) and CSV files are allowed',
    ),
});

const ImportButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      files: [],
    },
  });

  const files = form.watch('files');
  const isPending = false;
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // if (!academyId) {
    //   form.setError('files', {
    //     message: 'Academy ID is missing',
    //   });
    //   return;
    // }
    // try {
    //   await importTrainee({
    //     data: data.files,
    //     academyId,
    //   });
    //   form.reset();
    //   setOpen(false);
    // } catch (error) {
    //   form.setError('files', {
    //     message: 'Failed to import trainees. Please try again.',
    //   });
    // }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
        className={className}
      >
        <Button className='h-12 gap-2'>
          <Upload className='h-4 w-4' />
          {t('Import  Books')}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('Import Books')}</DialogTitle>
          <DialogDescription>
            {t('Upload Excel or CSV file containing books data')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='files'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='space-y-2'>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        dropzoneOptions={{
                          accept: {
                            'application/vnd.ms-excel': ['.xls'],
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                              ['.xlsx'],
                            'text/csv': ['.csv'],
                          },
                          maxFiles: 1,
                          maxSize: 1024 * 1024 * 4, // 4MB
                          multiple: false,
                        }}
                      >
                        <FileInput>
                          <Button
                            type='button'
                            variant='outline'
                            className='w-full gap-2'
                          >
                            <Upload className='h-4 w-4' />
                            {files?.length
                              ? `${t('Change File')}`
                              : `${t('Select File')}`}
                          </Button>
                        </FileInput>
                        <FileUploaderContent>
                          {field.value?.map((file: File, index: number) => (
                            <FileUploaderItem
                              key={index}
                              index={index}
                            >
                              {file.name}
                            </FileUploaderItem>
                          ))}
                        </FileUploaderContent>
                      </FileUploader>
                      <p className='text-xs text-muted-foreground'>
                        {t('Supported formats')}
                      </p>
                      <div className='mt-2 rounded-md border border-yellow-400 bg-yellow-100 p-3 text-sm text-yellow-800'>
                        ⚠️
                        {t(
                          'Please upload the downloaded template file before proceeding',
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='submit'
                className='gap-2'
                disabled={!files?.length}
              >
                {isPending ? `${t('Importing')}` : `${t('Import Books')}`}
                <Upload className='h-4 w-4' />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportButton;
