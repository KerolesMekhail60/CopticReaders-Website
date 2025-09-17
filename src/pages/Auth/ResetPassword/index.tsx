import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import * as z from 'zod';

import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Link } from 'react-router-dom';
import { Form } from '@/components/ui/form';

import { useResetPassword } from '@/hooks/features/auth/useResetPassword';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';
  const { t } = useTranslations();

  const schema = z
    .object({
      password: z
        .string({ required_error: t('forms.errors.newPassword.required') })
        .min(8, { message: t('forms.errors.newPassword.invalid') }),
      confirmPassword: z
        .string({
          required_error: t('forms.errors.confirmNewPassword.required'),
        })
        .min(8, {
          message: t('forms.errors.confirmNewPassword.invalid'),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('forms.errors.confirmNewPassword.match'),
      path: ['confirmPassword'],
    });

  const { resetPassword, isLoading } = useResetPassword();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    await resetPassword({ password: data.password, otp, email });
  };

  return (
    <div className='flex h-dvh flex-col place-content-center'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('pages.resetPassword.title')}
          </CardTitle>
          <CardDescription>
            {t('pages.resetPassword.description')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-4'>
                <CustomPasswordInput
                  fieldName='password'
                  placeholder={t('forms.placeholders.newPassword')}
                  label={t('forms.labels.newPassword')}
                />
                <CustomPasswordInput
                  fieldName='confirmPassword'
                  placeholder={t('forms.placeholders.confirmNewPassword')}
                  label={t('forms.labels.confirmNewPassword')}
                />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : t('forms.buttonLabels.reset')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default ResetPassword;
