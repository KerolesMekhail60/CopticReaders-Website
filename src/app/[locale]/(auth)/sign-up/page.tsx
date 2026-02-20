import { unstable_setRequestLocale } from 'next-intl/server';

import SignUpFormSection from './_components/SignUpFormSection';

const SignUp = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  unstable_setRequestLocale(locale);

  return (
    <>
      <SignUpFormSection />
    </>
  );
};

export default SignUp;
