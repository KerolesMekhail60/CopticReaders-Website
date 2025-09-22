import { useForm } from 'react-hook-form';
import * as z from 'zod';

import CustomFileUploader from '@/components/shared/form/CustomFileUploader';
import CustomImagesUploader from '@/components/shared/form/CustomImagesUploader';
import CustomInput from '@/components/shared/form/CustomInput';
import CustomMultiSelector from '@/components/shared/form/CustomMultiSelector';
import CustomSelect from '@/components/shared/form/CustomSelect';
import CustomSwitch from '@/components/shared/form/CustomSwitch';
import CustomTextarea from '@/components/shared/form/CustomTextarea';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { BookType } from '@/types';

import { AUTHORS, bookCategories, PUBLISHERS } from '@/constants';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const BookForm = ({
  onClose,
  book,
}: {
  onClose: VoidFunction;
  book?: BookType;
}) => {
  const { t } = useTranslations();

  const schema = z.object({
    image: book?.image
      ? z
          .array(
            z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
              message: t('File size must be less than 4MB'),
            }),
          )
          .optional()
      : z
          .array(
            z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
              message: t('File size must be less than 4MB'),
            }),
          )
          .max(1, { message: t('You can upload a maximum of 1 images') }),
    file: book?.file
      ? z
          .array(
            z
              .instanceof(File)
              .refine((file) => file.size < 1000 * 1024 * 1024, {
                message: t('File size must be less than 4MB'),
              }),
          )
          .optional()
      : z
          .array(
            z
              .instanceof(File)
              .refine((file) => file.size < 1000 * 1024 * 1024, {
                message: t('File size must be less than 4MB'),
              }),
          )
          .max(1, { message: t('You can upload a maximum of 1 files') }),
    bookId: z
      .string({ required_error: 'Book Id is required' })
      .min(1, 'Book Id is required'),
    name: z
      .string({ required_error: 'Book Name is required' })
      .min(1, 'Book Name is required'),
    nameAr: z
      .string({ required_error: 'Book Name is required' })
      .min(1, 'Book Name is required'),
    description: z
      .string({ required_error: 'Book Description is required' })
      .min(1, 'Book Description is required'),
    descriptionAr: z
      .string({ required_error: 'Book Description is required' })
      .min(1, 'Book Description is required'),
    author: z
      .array(
        z
          .string({ required_error: 'Author is required' })
          .min(1, 'Author is required'),
      )
      .min(1, 'Author is required'),
    bookCatogray: z
      .array(
        z
          .string({ required_error: 'Book Category is required' })
          .min(1, 'Book Category is required'),
      )
      .min(1, 'Book Category is required'),
    publisher: z
      .string({ required_error: 'Publisher is required' })
      .min(1, 'Publisher is required'),
    publisherYear: z.number({ required_error: 'Publisher Year is required' }),
    status: z.boolean({ required_error: 'Status is required' }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      bookId: book?.bookId || '',
      name: book?.name || '',
      nameAr: book?.nameAr || '',
      description: book?.description || '',
      descriptionAr: book?.descriptionAr || '',
      author: book?.author.map((author) => author.name) || [],
      bookCatogray: book?.bookCatogray.map((author) => author.name) || [],
      publisher: book?.publisher.id || '',
      publisherYear: book?.publisherYear,
      status: book?.status || false,
      image: book?.image || [],
      file: book?.file || [],
    },
  });

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid max-h-[500px] grid-cols-1 gap-6 overflow-y-auto p-2 md:grid-cols-2'>
          {/* Upload Section */}
          <div className='col-span-1 grid gap-4 md:col-span-2 md:grid-cols-2'>
            <CustomImagesUploader
              fieldName='image'
              label='Book Image'
            />
            <CustomFileUploader
              fieldName='file'
              label='Book File'
            />
          </div>

          <CustomInput
            fieldName='name'
            label='Book Name'
            placeholder='Enter your Book Name'
          />
          <CustomInput
            fieldName='nameAr'
            label='Book Name Arabic'
            placeholder='Enter your Book Name Arabic'
          />

          <CustomTextarea
            fieldName='description'
            label='Book Description'
            placeholder='Enter your Book Description'
            className='md:col-span-2'
          />
          <CustomTextarea
            fieldName='descriptionAr'
            label='Book Description Arabic'
            placeholder='Enter your Book Description Arabic'
            className='md:col-span-2'
          />

          <CustomMultiSelector
            fieldName='author'
            label='Authors'
            placeholder='Select Authors'
            items={AUTHORS}
          />
          <CustomMultiSelector
            fieldName='bookCatogray'
            label='Book Category'
            placeholder='Select Book Categories'
            items={bookCategories}
            className='w-full'
          />

          <CustomSelect
            fieldName='publisher'
            label='Publisher'
            placeholder='Select Publisher'
            items={PUBLISHERS}
          />
          <CustomInput
            fieldName='publisherYear'
            label='Publisher Year'
            placeholder='Enter Publisher Year'
            type='number'
          />
          <div className='md:col-span-2'>
            <CustomSwitch
              fieldName='status'
              label='Status'
            />
          </div>
        </div>

        <DialogFooter className='mt-6 flex w-full gap-4 border-t pt-4'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
              className='w-full rounded-xl'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-lg bg-primary-500 font-medium text-white hover:bg-primary-600'
          >
            {isSubmitting ? <Spinner /> : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default BookForm;
