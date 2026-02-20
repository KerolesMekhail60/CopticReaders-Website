import { unstable_setRequestLocale } from 'next-intl/server';

import ForgetPasswordForm from './_components/ForgetPasswordForm';

const ForgetPassword = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  unstable_setRequestLocale(locale);

  return (
    <>
      <ForgetPasswordForm />
    </>
  );
};

export default ForgetPassword;
