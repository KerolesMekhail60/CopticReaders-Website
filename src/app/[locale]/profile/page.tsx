import { unstable_setRequestLocale } from 'next-intl/server';

import ProfileFormSection from './_components/ProfileFormSection';

const Profile = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  unstable_setRequestLocale(locale);

  return (
    <>
      <ProfileFormSection />
    </>
  );
};

export default Profile;
