import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CustomPasswordInput from '@/components/shared/customs/PasswordInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { useEditPassword } from '@/hooks/features/auth/useEditPassword';

import { passwordSchema } from '@/lib/regex';
import { zodResolver } from '@hookform/resolvers/zod';

type NewPasswordSettingProps = {
  trigger?: React.ReactNode;
};

const NewPasswordSetting = ({ trigger }: NewPasswordSettingProps = {}) => {
  const { editPassword } = useEditPassword();
  const t = useTranslations('forms');
  const [open, setOpen] = useState(false);

  const defaultTrigger = (
    <Button
      variant='link'
      className='mt-6 w-fit justify-start pl-0'
      type='button'
    >
      {t('buttonsLabels.updatePassword')}
    </Button>
  );

  const formSchema = z
    .object({
      currentPassword: passwordSchema,
      newPassword: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('errors.passwordsMustMatch'),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
      path: ['newPassword'],
      message: t('errors.newPasswordSameAsCurrent'),
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      form.reset();
      setOpen(false);
    } catch (_error) {
      // Error is already handled in the hook with toast
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] sm:rounded-2xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold text-primary-500'>
                {t('buttonsLabels.updatePassword')}
              </DialogTitle>
            </DialogHeader>
            <div className='space-y-6 py-4'>
              <CustomPasswordInput
                form={form}
                fieldName='currentPassword'
                label={t('labels.currentPassword')}
                placeholder={t('placeholders.currentPassword')}
              />

              <CustomPasswordInput
                form={form}
                fieldName='newPassword'
                label={t('labels.newPassword')}
                placeholder={t('placeholders.newPassword')}
              />

              <CustomPasswordInput
                form={form}
                fieldName='confirmPassword'
                label={t('labels.confirmNewPassword')}
                placeholder={t('placeholders.confirmNewPassword')}
              />
            </div>
            <DialogFooter>
              <Button
                type='submit'
                className='w-full'
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : t('buttonsLabels.saveChanges')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPasswordSetting;
