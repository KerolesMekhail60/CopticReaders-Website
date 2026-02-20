import { unstable_setRequestLocale } from 'next-intl/server';

import ChangePasswordForm from './_components/ChangePasswordForm';

const ChangePassword = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  unstable_setRequestLocale(locale);

  return (
    <>
      <ChangePasswordForm />
    </>
  );
};

export default ChangePassword;
