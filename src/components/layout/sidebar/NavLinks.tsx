import { useState } from 'react';

import Cookies from 'js-cookie';
import { BookOpen, BookPlus, Building2, LogOut, PenTool } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import LanguageForm from '../header/LanguageForm';
import LogOutMessage from '../header/LogOutDialog';

import { useMediaQuery } from '@/hooks/use-media-query';

import { REFRESH_TOKEN, TOKEN } from '@/constants';

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

const NavLinks = ({ onClose }: { onClose?: VoidFunction }) => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isEnglish } = useLocale();

  const MAIN_NAVLINKS = [
    {
      label: isEnglish ? 'Book Management' : 'ادارة الكتب',
      icon: BookPlus,
      href: '/', // should go to home
    },
    {
      label: isEnglish ? 'Book Category' : 'فئة الكتاب',
      icon: BookOpen,
      href: '/category',
    },
    {
      label: isEnglish ? 'Authors' : 'المؤلفين',
      icon: PenTool,
      href: '/authors',
    },
    {
      label: isEnglish ? 'Publisher' : 'الناشر',
      icon: Building2,
      href: '/publisher',
    },
  ];

  const isActive = (href: string) => pathname === href;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleLogout() {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    queryClient.clear();
    navigate('/', { replace: true });
  }

  return (
    <>
      {MAIN_NAVLINKS.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          to={href} // now it already has "/" prefix
          className={cn(
            isMobile
              ? 'my-2 flex items-center gap-2 rounded-lg px-2 py-2'
              : 'my-2 flex w-fit flex-col items-center gap-2 rounded-lg px-2 py-2',
            'text-muted-foreground transition-colors hover:bg-primary-50',
            isActive(href) ? 'text-primary-500' : 'text-secondary--900',
          )}
          onClick={onClose}
        >
          <Icon className='shrink-0' />
          <span className={`text-center ${isMobile ? '' : 'text-xs'}`}>
            {label}
          </span>
        </Link>
      ))}

      {/* Language Switcher (mobile only) */}
      <div className='md:hidden'>
        <LanguageForm />
      </div>

      {/* Logout (mobile only) */}
      <div className='md:hidden'>
        <div
          onClick={() => setIsDialogOpen(true)}
          className='ml-3 mt-4 flex cursor-pointer items-center gap-2 rounded-sm text-[#EA2727] hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white'
        >
          <LogOut />
          <span>Log out</span>
        </div>
      </div>

      <LogOutMessage
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default NavLinks;
