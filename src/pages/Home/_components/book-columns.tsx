import { ColumnDef } from '@tanstack/react-table';

import TableDateLng from '@/components/shared/TableDateLng';
import { Button } from '@/components/ui/button';

import { Book } from '@/types';

import Localized from '@/i18n/Localized';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.id' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableHiding: false,
  },
  {
    accessorKey: 'bookName',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.name' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.bookName}</p>,
  },
  {
    accessorKey: 'publishYear',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.publishYear' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.publishYear}</p>,
  },
  {
    accessorKey: 'authors',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.authors' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.authors}</p>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <Localized text='book.category' />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.category}</p>,
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
      row.original.addedDate ? (
        <TableDateLng date={row.original.addedDate} />
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
          row.original.status === 'Active' ? 'text-green-600' : 'text-red-600',
        )}
      >
        {row.original.status}
      </span>
    ),
  },
];
