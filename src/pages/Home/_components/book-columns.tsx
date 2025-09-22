import { ChevronsUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import TableDateLng from '@/components/shared/TableDateLng';
import { Button } from '@/components/ui/button';

import ActionButton from './add-book/ActionButton';

import { BookType } from '@/types';

import Localized from '@/i18n/Localized';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<BookType>[] = [
  {
    accessorKey: 'bookId',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.id' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.bookId}</p>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.name' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: 'publisherYear',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.publishYear' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.publisherYear}</p>,
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.authors' />
      </Button>
    ),
    cell: ({ row }) =>
      row.original.author?.map((a) => a.name).join(', ') || 'N/A',
  },
  {
    accessorKey: 'bookCatogray',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.category' />
      </Button>
    ),
    cell: ({ row }) =>
      row.original.bookCatogray?.map((c) => c.name).join(', ') || 'N/A',
  },
  {
    accessorKey: 'publisher',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.publisher' />
      </Button>
    ),
    cell: ({ row }) => row.original.publisher?.name || 'N/A',
  },
  {
    accessorKey: 'addedDate',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.addedDate' />
      </Button>
    ),
    cell: ({ row }) =>
      row.original.addDate ? (
        <TableDateLng date={row.original.addDate} />
      ) : (
        <p>N/A</p>
      ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.status' />
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          'font-medium',
          row.original.status ? 'text-green-600' : 'text-red-600',
        )}
      >
        {row.original.status ? 'Active' : 'Inactive'}
      </span>
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
        book={row.original}
        key={row.original.id}
      />
    ),
  },
];
