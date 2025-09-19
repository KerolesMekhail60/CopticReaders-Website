import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import NotificationItem from './NotificationItem';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Invoice Alert ',
    description:
      'Invoice #INV-103 remains unpaid for 15 days. Please follow up.',
    date: 'Now',
    type: 'invoice',
    href: '/financials',
    isRead: false,
  },
  {
    id: 2,
    title: 'Request Pending ',
    description:
      'Invoice #INV-103 remains unpaid for 15 days. Please follow up.',
    date: 'Now',
    type: 'request',
    href: '/trainee',
    isRead: false,
  },
  {
    id: 3,
    title: 'Invoice Alert ',
    description:
      'Invoice #INV-103 remains unpaid for 15 days. Please follow up.',
    date: 'March 5, 2024',
    type: 'invoice',
    href: '/financials',
    isRead: true,
  },
  {
    id: 4,
    title: 'Request Pending ',
    description:
      'Invoice #INV-103 remains unpaid for 15 days. Please follow up.',
    date: '11 May 2025',
    type: 'request',
    href: '/trainee',
    isRead: true,
  },
];

const Notifications = () => {
  const notification = true;

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          className='rounded-full hover:bg-primary-50'
        >
          <Icon
            name='notification'
            fill={notification ? '#EA5F27' : '#716762'}
            className='!size-6'
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={22}
        align='end'
        className='h-[504px] w-[438px] overflow-y-auto rounded-2xl border-none px-0 py-2'
      >
        <div className='flex items-center justify-between border-b border-secondary-50 px-0'>
          <h2 className='px-6 py-4 font-Sora text-lg font-semibold text-secondary-900'>
            Notifications
          </h2>

          <PopoverClose className='transition-colors duration-200 ease-out hover:text-primary-500'>
            <Icon name='close' />
          </PopoverClose>
        </div>
        <div className='flex flex-col divide-y'>
          {NOTIFICATIONS.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>

        {!NOTIFICATIONS && (
          <p className='text-sm text-secondary-500'>
            You have no notifications
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
