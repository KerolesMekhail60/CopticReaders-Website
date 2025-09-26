import { useForm } from 'react-hook-form';
import * as z from 'zod';

import CustomImagesUploader from '@/components/shared/form/CustomImagesUploader';
import CustomInput from '@/components/shared/form/CustomInput';
import CustomTextarea from '@/components/shared/form/CustomTextarea';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { Author } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const AuthorForm = ({
  onClose,
  author,
}: {
  onClose: VoidFunction;
  author?: Author;
}) => {
  const { t } = useTranslations();

  const schema = z.object({
    image: author?.imageUrl
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
          .max(1, { message: t('You can upload a maximum of 1 image') }),

    name: z
      .string({ required_error: t('Author Name is required') })
      .min(1, t('Author Name is required')),
    nameAr: z.string().optional(),
    bio: z.string().optional(),
    bioAr: z.string().optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: author?.name || '',
      nameAr: author?.nameAr || '',
      bio: author?.bio || '',
      bioAr: author?.bioAr || '',
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
          <div className='col-span-2'>
            <CustomImagesUploader
              fieldName='image'
              label={t('Author Image')}
            />
          </div>

          <CustomInput
            fieldName='name'
            label={t('Author Name')}
            placeholder={t('Enter Author Name')}
          />
          <CustomInput
            fieldName='nameAr'
            label={t('Author Name (Arabic)')}
            placeholder={t('Enter Author Name in Arabic')}
            optional
          />

          <CustomTextarea
            fieldName='bio'
            label={t('Author Bio')}
            placeholder={t('Enter Author Bio')}
            className='md:col-span-2'
            optional
          />
          <CustomTextarea
            fieldName='bioAr'
            label={t('Author Bio Arabic')}
            placeholder={t('Enter Author Bio in Arabic')}
            className='md:col-span-2'
            optional
          />
        </div>

        <DialogFooter className='mt-6 flex w-full gap-4 border-t pt-4'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
              className='w-full rounded-xl'
              onClick={handleCancel}
            >
              {t('Cancel')}
            </Button>
          </DialogClose>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-lg bg-primary-500 font-medium text-white hover:bg-primary-600'
          >
            {isSubmitting ? <Spinner /> : t('Save')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AuthorForm;
