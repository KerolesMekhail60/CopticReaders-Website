'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { Heart, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';

import { useAuth } from '@/contexts/AuthContext';

import { useRouter } from '@/i18n/routing';
import { logoutApi } from '@/services/auth-api';

interface UserMenuProps {
  className?: string;
}

export default function UserMenu({ className }: UserMenuProps) {
  const { user, logout, token } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('userMenu');
  const isArabic = locale === 'ar';

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutApi(token);
      }
      logout();
      toast.success(t('logoutSuccess'));
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      logout();
      router.push('/');
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu dir={isArabic ? 'rtl' : 'ltr'}>
      <DropdownMenuTrigger
        asChild
        className={className}
        dir='ltr'
      >
        <Button
          variant='ghost'
          className='flex items-center gap-3 rounded-full'
        >
          <Avatar className='h-10 w-10 border-2 border-primary-200'>
            <AvatarImage
              src={user?.profilePictureUrl || undefined}
              alt={user?.fullName}
            />
            <AvatarFallback className='bg-primary-500 font-semibold text-white'>
              {user?.fullName ? getInitials(user.fullName) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col text-left'>
            <span className='text-sm font-semibold text-secondary-700'>
              {user?.fullName}
            </span>
            <span className='text-xs text-muted-foreground'>{user?.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isArabic ? 'start' : 'end'}
        className='w-56'
        sideOffset={8}
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.fullName}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/profile')}
          className='cursor-pointer gap-2'
        >
          <User className='mr-2 h-4 w-4' />
          {t('profile')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/favorites')}
          className='cursor-pointer gap-2'
        >
          <Heart className='mr-2 h-4 w-4' />
          {t('favorites')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className='cursor-pointer gap-2 text-destructive'
        >
          <LogOut className='mr-2 h-4 w-4' />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
