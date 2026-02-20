'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import CustomInput from '@/components/shared/customs/CustomInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { cn } from '@/lib/utils';
import { forgotPasswordApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgetPasswordForm = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string({ required_error: t('forms.errors.email.required') })
      .email(t('forms.errors.email.format')),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await forgotPasswordApi({ email: values.email });

      if (res.isError) {
        throw new Error(res.message);
      }

      router.push(`/${locale}/otp?email=${values.email}&type=reset-password`);
      toast.success(t('forms.toasts.forgetPasswordSuccess'));
      form.reset();
    } catch (err: any) {
      toast.error(err.message || t('forms.toasts.somethingWentWrong'));
    }
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'container mx-auto mb-32 mt-14 max-w-xl space-y-7 max-md:mx-auto',
          )}
        >
          <h3 className='font-bold text-neutral-800 md:text-lg xl:text-xl'>
            {t('pages.forgotPassword.enterRegisteredEmail')}
          </h3>
          <CustomInput
            fieldName='email'
            placeholder={t('forms.placeholders.email')}
          />

          <Button
            className='!mt-8 w-full rounded-lg px-4 py-2 text-center capitalize max-sm:text-sm xl:text-lg'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner />
            ) : (
              t('forms.buttonsLabels.resetPassword')
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ForgetPasswordForm;
