import { useForm } from 'react-hook-form';
import * as z from 'zod';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomTextarea from '@/components/shared/form/CustomTextarea';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { Category } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const CategoryForm = ({
  onClose,
  category,
}: {
  onClose: VoidFunction;
  category?: Category;
}) => {
  const { t } = useTranslations();

  const schema = z.object({
    name: z
      .string({ required_error: t('Category Name is required') })
      .min(1, t('Category Name is required')),
    nameAr: z.string().optional(),
    description: z.string().optional(),
    descriptionAr: z.string().optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name || '',
      nameAr: category?.nameAr || '',
      description: category?.description || '',
      descriptionAr: category?.descriptionAr || '',
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
          <CustomInput
            fieldName='name'
            label={t('Category Name')}
            placeholder={t('Enter Category Name')}
          />
          <CustomInput
            fieldName='nameAr'
            label={t('Category Name Arabic')}
            placeholder={t('Enter Category Name in Arabic')}
            optional
          />

          <CustomTextarea
            fieldName='description'
            label={t('Category Description')}
            placeholder={t('Enter Category Description')}
            className='md:col-span-2'
            optional
          />
          <CustomTextarea
            fieldName='descriptionAr'
            label={t('Category Description Arabic')}
            placeholder={t('Enter Category Description in Arabic')}
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

export default CategoryForm;
