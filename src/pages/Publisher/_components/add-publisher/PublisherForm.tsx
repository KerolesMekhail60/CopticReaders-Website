import { useForm } from 'react-hook-form';
import * as z from 'zod';

import CustomImagesUploader from '@/components/shared/form/CustomImagesUploader';
import CustomInput from '@/components/shared/form/CustomInput';
import CustomTextarea from '@/components/shared/form/CustomTextarea';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { Publisher } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const PublisherForm = ({
  onClose,
  publisher,
}: {
  onClose: VoidFunction;
  publisher?: Publisher;
}) => {
  const { t } = useTranslations();

  const schema = z.object({
    image: publisher?.imageUrl
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
      .string({ required_error: t('Publisher Name is required') })
      .min(1, t('Publisher Name is required')),
    nameAr: z.string().optional(),
    description: z.string().optional(),
    descriptionAr: z.string().optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: publisher?.name || '',
      nameAr: publisher?.nameAr || '',
      description: publisher?.description || '',
      descriptionAr: publisher?.descriptionAr || '',
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
              label={t('Publisher Image')}
            />
          </div>

          <CustomInput
            fieldName='name'
            label={t('Publisher Name')}
            placeholder={t('Enter Publisher Name')}
          />
          <CustomInput
            fieldName='nameAr'
            label={t('Publisher Name Arabic')}
            placeholder={t('Enter Publisher Name in Arabic')}
            optional
          />

          <CustomTextarea
            fieldName='description'
            label={t('Publisher Description')}
            placeholder={t('Enter Publisher Description')}
            className='md:col-span-2'
            optional
          />
          <CustomTextarea
            fieldName='descriptionAr'
            label={t('Publisher Description Arabic')}
            placeholder={t('Enter Publisher Description in Arabic')}
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

export default PublisherForm;
