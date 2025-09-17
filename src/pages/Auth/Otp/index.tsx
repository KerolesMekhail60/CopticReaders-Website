import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import * as z from 'zod';

import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import ResendOtp from './_components/ResendOtp';

import { useOtp } from '@/hooks/features/auth/useOtp';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const Otp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const { t } = useTranslations();

  const { otp, isLoading } = useOtp();

  const schema = z.object({
    otp: z
      .string({
        required_error: t('forms.errors.otp'),
      })
      .min(4, {
        message: t('forms.errors.otp'),
      }),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    await otp({ otp: data.otp, email });
  };

  return (
    <div className='flex h-dvh flex-col place-content-center'>
      <Card className='mx-auto w-full max-w-md bg-white shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl'>{t('pages.otp.title')}</CardTitle>
          <CardDescription>{t('pages.otp.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-4 text-center'>
                <FormField
                  control={form.control}
                  name='otp'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          maxLength={4}
                          {...field}
                        >
                          <InputOTPGroup className='mx-auto flex items-center justify-center gap-3'>
                            {[...Array(4)].map((_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className='h-12 w-12 rounded-md border text-center text-2xl font-bold text-primary-500'
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ResendOtp />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : t('forms.buttonLabels.send')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Otp;
