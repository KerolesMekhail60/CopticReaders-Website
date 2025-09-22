export const TOKEN = 'coptic-readers_token';
export const REFRESH_TOKEN = 'coptic-readers_refresh_token';
export const MILLION = 1_000_000;
export const EMPTY_ARRAY = [];

export enum BookingStatusEnum {
  Waiting = 'Waiting',
  CheckedIn = 'CheckedIn',
  Stay = 'Stay',
  CheckedOut = 'CheckedOut',
  Cancelled = 'Cancelled',
}

export const BOOKING_STATUS: Record<
  BookingStatusEnum,
  { nameEn: string; nameIt: string; color: string; backgroundColor: string }
> = {
  [BookingStatusEnum.Waiting]: {
    nameEn: 'Waiting',
    nameIt: 'In attesa',
    color: 'var(--info-600)',
    backgroundColor: 'var(--info-50)',
  },
  [BookingStatusEnum.CheckedIn]: {
    nameEn: 'Checked In',
    nameIt: 'Registrato',
    color: 'var(--success-600)',
    backgroundColor: 'var(--success-50)',
  },
  [BookingStatusEnum.Stay]: {
    nameEn: 'Stay',
    nameIt: 'Soggiorno',
    color: 'var(--success-600)',
    backgroundColor: 'var(--success-50)',
  },
  [BookingStatusEnum.CheckedOut]: {
    nameEn: 'Checked Out',
    nameIt: 'Partito',
    color: 'var(--neutral-600)',
    backgroundColor: 'var(--neutral-50)',
  },
  [BookingStatusEnum.Cancelled]: {
    nameEn: 'Cancelled',
    nameIt: 'Annullato',
    color: 'var(--error-600)',
    backgroundColor: 'var(--error-50)',
  },
};

export const AUTHORS = [
  { label: 'George Orwell', value: 'george-orwell' },
  { label: 'Jane Austen', value: 'jane-austen' },
  { label: 'Mark Twain', value: 'mark-twain' },
  { label: 'Agatha Christie', value: 'agatha-christie' },
  { label: 'J.K. Rowling', value: 'jk-rowling' },
  { label: 'Ernest Hemingway', value: 'ernest-hemingway' },
  { label: 'Leo Tolstoy', value: 'leo-tolstoy' },
  { label: 'Charles Dickens', value: 'charles-dickens' },
  { label: 'Stephen King', value: 'stephen-king' },
  { label: 'Gabriel García Márquez', value: 'gabriel-marquez' },
];

// Publishers
export const PUBLISHERS = [
  { label: 'Penguin Random House', value: 'penguin-random-house' },
  { label: 'HarperCollins', value: 'harpercollins' },
  { label: 'Simon & Schuster', value: 'simon-schuster' },
  { label: 'Hachette Livre', value: 'hachette-livre' },
  { label: 'Macmillan Publishers', value: 'macmillan-publishers' },
  { label: 'Oxford University Press', value: 'oxford-university-press' },
  { label: 'Cambridge University Press', value: 'cambridge-university-press' },
  { label: 'Scholastic', value: 'scholastic' },
  { label: 'Bloomsbury', value: 'bloomsbury' },
  { label: 'Wiley', value: 'wiley' },
];

export const bookCategories = [
  { label: 'Fiction', value: 'fiction' },
  { label: 'Non-Fiction', value: 'non-fiction' },
  { label: 'Science Fiction', value: 'science-fiction' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Mystery & Thriller', value: 'mystery-thriller' },
  { label: 'Romance', value: 'romance' },
  { label: 'Historical', value: 'historical' },
  { label: 'Biography', value: 'biography' },
  { label: 'Self-Help', value: 'self-help' },
  { label: "Children's Books", value: 'children' },
  { label: 'Young Adult', value: 'young-adult' },
  { label: 'Education', value: 'education' },
  { label: 'Science & Technology', value: 'science-technology' },
  { label: 'Philosophy', value: 'philosophy' },
  { label: 'Art & Photography', value: 'art-photography' },
  { label: 'Travel', value: 'travel' },
  { label: 'Health & Wellness', value: 'health-wellness' },
  { label: 'Poetry', value: 'poetry' },
  { label: 'Comics & Graphic Novels', value: 'comics-graphic' },
  { label: 'Religion & Spirituality', value: 'religion-spirituality' },
];
