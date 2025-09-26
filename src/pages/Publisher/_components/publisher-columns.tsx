import { ChevronsUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import TableTextCell from '@/components/shared/TableTextCell';
import UserAvatar from '@/components/shared/UserAvatar';
import { Button } from '@/components/ui/button';

import ActionButton from './ActionButton';

import { Publisher } from '@/types';

import Localized from '@/i18n/Localized';

export const columns: ColumnDef<Publisher>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='publisher.name' />
      </Button>
    ),
    cell: ({ row }) => (
      <UserAvatar
        imageUrl={row.original.imageUrl ?? ''}
        name={row.original.name}
        nameAr={row.original.nameAr}
      />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='publisher.description' />
      </Button>
    ),
    cell: ({ row }) => (
      <TableTextCell
        textAr={row.original.descriptionAr}
        textEn={row.original.description}
      />
    ),
  },

  {
    accessorKey: 'actions',
    header: () => (
      <Button variant='ghost'>
        <Localized text='book.actions' />
        <ChevronsUpDown
          className='ml-2 h-4 w-4'
          color='#c0a871'
        />
      </Button>
    ),
    cell: ({ row }) => (
      <ActionButton
        publisher={row.original}
        key={row.original.id}
      />
    ),
  },
];
