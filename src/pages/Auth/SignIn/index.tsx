import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import CustomInput from '@/components/shared/form/CustomInput';
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
import { Form } from '@/components/ui/form';

import { useLogin } from '@/hooks/features/auth/useLogin';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema will be created inside component to access i18n messages

const SignIn = () => {
  const { t } = useTranslations();
  const { login, isLoading } = useLogin();

  const schema = z.object({
    email: z
      .string({ required_error: t('forms.errors.email.required') })
      .email({ message: t('forms.errors.email.invalid') }),
    password: z
      .string({ required_error: t('forms.errors.password.required') })
      .min(8, { message: t('forms.errors.password.minLength') }),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  type FormData = z.infer<typeof schema>;
  const onSubmit = async (data: FormData) => {
    await login(data);
  };

  return (
    <div className='flex h-screen'>
      {/* Left Side - Form */}
      <div className='flex w-full items-center justify-center px-6 lg:w-1/2'>
        <Card className='w-full max-w-md bg-white shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold'>
              {t('pages.login.title')}
            </CardTitle>
            <CardDescription>{t('pages.login.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <CustomInput
                  fieldName='email'
                  placeholder={t('forms.placeholders.email')}
                  label={t('forms.labels.email')}
                />
                <div>
                  <CustomPasswordInput
                    fieldName='password'
                    placeholder={t('forms.placeholders.password')}
                    label={t('forms.labels.password')}
                  />
                  <Link
                    to='/forget-password'
                    className='mt-1 block text-right text-sm text-primary hover:underline'
                  >
                    {t('pages.login.forgetPassword')}
                  </Link>
                </div>
                <Button
                  type='submit'
                  className='w-full text-white'
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : t('forms.buttonLabels.login')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Image */}
      <div className='my-12 hidden w-1/2 items-center justify-center bg-white lg:flex'>
        <img
          src='/images/church.png'
          alt='bible book'
          className='max-h-full max-w-full object-contain'
        />
      </div>
    </div>
  );
};

export default SignIn;
