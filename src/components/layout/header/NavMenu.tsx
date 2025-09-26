import { useState } from 'react';

import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import LogOutMessage from './LogOutDialog';

import { useGlobalContext } from '@/context/useGlobalContext';

import { REFRESH_TOKEN, TOKEN } from '@/constants';

import avatar from '@/../public/images/man.png';

function NavMenu() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    queryClient.clear();
    navigate('/signin', { replace: true });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center gap-x-2 rounded-md p-2 hover:bg-primary-50 focus-visible:outline-none'>
            <Avatar className='size-12 rounded-full'>
              <AvatarImage
                src={user?.profilePicture || avatar}
                alt='Avatar Placeholder'
                className='object-cover'
              />
              <AvatarFallback className='rounded-lg'>
                {user?.fullName?.charAt(0) || 'PA'}
              </AvatarFallback>
            </Avatar>
            <div className='place-items-start'>
              <h1 className='text-start font-semibold text-primary-500'>
                {user?.fullName || 'Peter Awad  '}
              </h1>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-56 rounded-lg bg-white p-2 shadow-md'
        >
          <DropdownMenuItem
            onSelect={() => setIsDialogOpen(true)}
            className='w-full cursor-pointer rounded-sm px-2 py-2 text-sm text-red-600 transition hover:bg-red-600 hover:text-white'
          >
            <div className='flex items-center gap-2'>
              <LogOut className='h-4 w-4' />
              <span>Log out</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogOutMessage
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default NavMenu;
