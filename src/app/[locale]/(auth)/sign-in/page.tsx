import { unstable_setRequestLocale } from 'next-intl/server';

import LoginFormSection from './_components/LoginFormSection';

const SignIn = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  unstable_setRequestLocale(locale);

  return (
    <>
      <LoginFormSection />
    </>
  );
};

export default SignIn;
