import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import CustomInput from '@/components/shared/form/CustomInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { useForgetPassword } from '@/hooks/features/auth/useForgetPassword';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgetPassword = () => {
  const { forgetPassword, isLoading } = useForgetPassword();
  const { t } = useTranslations();
  const schema = z.object({
    email: z
      .string({ required_error: t('forms.errors.email.required') })
      .email({ message: t('forms.errors.email.invalid') }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await forgetPassword(data);
  };

  return (
    <div className='flex h-screen'>
      <div className='flex w-full items-center justify-center px-6 lg:w-1/2'>
        <Card className='bg-white shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl'>
              {t('pages.forgetPassword.title')}
            </CardTitle>
            <CardDescription>
              {t('pages.forgetPassword.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                  <CustomInput
                    fieldName='email'
                    placeholder={t('forms.placeholders.email')}
                    label={t('forms.labels.email')}
                  />

                  <Button
                    type='submit'
                    className='w-full text-white'
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : t('forms.buttonLabels.submit')}
                  </Button>
                  <Link
                    type='submit'
                    className='w-full text-center text-sm text-primary-500 hover:underline'
                    to='/signin'
                  >
                    {t('forms.buttonLabels.backLogin')}
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>{' '}
      </div>{' '}
      <div className='my-12 hidden w-1/2 items-center justify-center rounded-full bg-gray-50 shadow-[0_0_5px_5px_rgba(255,215,0,0.1)] lg:flex'>
        <img
          src='/images/bible.png'
          alt='bible book'
          className='max-h-full max-w-full object-contain'
        />
      </div>
    </div>
  );
};
export default ForgetPassword;
