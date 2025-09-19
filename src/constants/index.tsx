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
