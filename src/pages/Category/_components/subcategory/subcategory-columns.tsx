import { ChevronsUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import TableTextCell from '@/components/shared/TableTextCell';
import { Button } from '@/components/ui/button';

import ActionSubButton from './ActionSubButton';

import { Category } from '@/types';

import Localized from '@/i18n/Localized';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='author.name' />
      </Button>
    ),
    cell: ({ row }) => (
      <TableTextCell
        textEn={row.original.name}
        textAr={row.original.nameAr}
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
        <Localized text='category.description' />
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
        <Localized text='category.actions' />
        <ChevronsUpDown
          className='ml-2 h-4 w-4'
          color='#c0a871'
        />
      </Button>
    ),
    cell: ({ row }) => (
      <ActionSubButton
        category={row.original}
        key={row.original.id}
      />
    ),
  },
];
