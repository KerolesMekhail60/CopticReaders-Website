import { useTranslations } from 'next-intl';

import ProfileForm from './ProfileForm';

const ProfileFormSection = () => {
  const t = useTranslations('pages.profile');
  return (
    <section className='container mx-auto space-y-8 py-[80px]'>
      <h1 className='text-[32px] font-bold text-primary-500'>
        {t('pages.profile.title')}
      </h1>
      <div>
        <ProfileForm />
      </div>
    </section>
  );
};

export default ProfileFormSection;
