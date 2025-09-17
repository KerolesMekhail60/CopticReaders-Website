import { useSearchParams } from 'react-router-dom';

const useTableSearchParams = () => {
  const [searchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('pageIndex')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const searchValue = searchParams.get('searchValue') || '';
  const amenityIds = searchParams.get('amenityIds') || '';
  const type = searchParams.get('type') || '';
  const buildingId = searchParams.get('buildingId') || '';
  const apartmentId = searchParams.get('ApartmentId') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const bookingStatus = searchParams.get('bookingStatus') || '';
  const paymentStatus = searchParams.get('paymentStatus') || '';
  const serviceRequestDate = searchParams.get('serviceRequestDate') || '';
  const status = searchParams.get('status') || '';

  return {
    pageIndex,
    pageSize,
    searchValue,
    amenityIds,
    type,
    buildingId,
    apartmentId,
    from,
    to,
    bookingStatus,
    paymentStatus,
    serviceRequestDate,
    status,
  };
};

export default useTableSearchParams;
