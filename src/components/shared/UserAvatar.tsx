import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';
// import SubscriptionDetail from '@/pages/Trainee/_components/subscriptions/SubscriptionDetail';

// const SUBSCRIPTION_DETIALS = [
//   { label: 'Package', value: 'Starter Kit' },
//   { label: 'Total Sessions', value: '20 Sessions' },
//   {
//     label: 'Remaining Sessions',
//     value: '5 Sessions',
//     color: '#1CA643 ',
//   },
//   { label: 'Amount Paid', value: '400 EGP' },
//   { label: 'Subscription Date', value: '3/3/2024' },
// ];

type UserAvatarProps = {
  name?: string;
  nameAr?: string;
  imageUrl?: string;
  desc?: string;
  time?: string;

  className?: string;
  avatarClassName?: string;
  descClassName?: string;
  nameClassName?: string;
};
const UserAvatar = ({
  name,
  nameAr,
  imageUrl,
  desc,
  time = '',
  avatarClassName,
  className,
  descClassName = '',
  nameClassName,
}: UserAvatarProps) => {
  const { isEnglish } = useLocale();
  name = isEnglish ? name : nameAr;
  const { dir } = useTranslations();
  return (
    <div className={cn('group flex items-center gap-x-2.5', className)}>
      <div className='relative'>
        <Avatar
          dir={dir}
          className={cn('size-12 rounded-full', avatarClassName)}
        >
          <AvatarImage
            src={imageUrl}
            alt={name}
          />
          <AvatarFallback className='rounded-lg'>
            {name?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className='flex flex-col items-start'>
        <div className='flex justify-between gap-10'>
          <h3 className={cn('text-secondary-900', nameClassName)}>{name}</h3>
          <p className='text-secondary-400'>{time}</p>
        </div>

        <p className={cn('text-sm text-secondary-900', descClassName)}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
