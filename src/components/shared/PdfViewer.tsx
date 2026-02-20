'use client';

import { useEffect, useRef, useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';

import MainLoader from './loaders/MainLoader';
import Spinner from './loaders/Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = {
  file?: string;
  token?: string;
};

export default function PdfViewer({ file, token }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(600);
  const [pageInput, setPageInput] = useState<string>('');

  // ✅ Update page width automatically on screen resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const calculatedWidth = Math.min(containerWidth * 0.95, 800);
        setWidth(calculatedWidth);
      }
    };
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    let loadedUrl: string | null = null;

    const fetchPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let url = '/api/files';
        if (token) url += `?token=${encodeURIComponent(token)}`;
        else if (file) url += `?path=${encodeURIComponent(file)}`;
        else {
          setError('لم يتم تحديد ملف للعرض');
          setIsLoading(false);
          return;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`PDF fetch failed: ${res.status}`);

        if (!active) return;

        const blob = await res.blob();
        const pdfUrl = URL.createObjectURL(blob);
        loadedUrl = pdfUrl;
        setBlobUrl(pdfUrl);
      } catch (err: unknown) {
        if (!active) return;
        console.error('PDF Load Error:', err);
        setError('فشل تحميل ملف الـ PDF');
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchPdf();

    return () => {
      active = false;
      if (loadedUrl) URL.revokeObjectURL(loadedUrl);
    };
  }, [file, token]);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPageInput('1');
  };

  const changePage = (offset: number) => {
    const newPage = Math.min(Math.max(pageNumber + offset, 1), numPages);
    setPageNumber(newPage);
    setPageInput(newPage.toString());
  };

  const goToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    } else {
      setPageInput(pageNumber.toString());
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  // Zoom controls removed

  if (isLoading)
    return (
      <div className='flex h-fit flex-col items-center justify-center'>
        <Spinner />
        <p className='mt-2 text-sm text-gray-600'>جاري تحميل الملف...</p>
      </div>
    );

  if (error)
    return (
      <div className='flex h-64 items-center justify-center text-red-500'>
        {error}
      </div>
    );

  if (!blobUrl)
    return (
      <div className='flex h-64 items-center justify-center'>
        <p>لا يوجد ملف للعرض</p>
      </div>
    );

  return (
    <div className='flex w-full flex-col items-center px-2 sm:px-4'>
      {/* PDF Viewer Container */}
      <div
        ref={containerRef}
        className='flex w-full justify-center overflow-auto rounded-lg border border-gray-300 bg-white p-2 shadow-sm sm:p-4'
        style={{ maxHeight: '75vh', minHeight: '300px' }}
      >
        <div className='flex w-full justify-center'>
          <Document
            file={blobUrl}
            onLoadSuccess={onLoadSuccess}
            onLoadError={(err) => setError(err.message)}
            loading={<MainLoader />}
            className='flex justify-center'
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(width, 800)} // ✅ prevent over-expanding on large screens
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* Controls Container */}
      <div className='mt-4 flex w-full max-w-4xl flex-wrap justify-center gap-2 sm:gap-4'>
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className='rounded bg-gray-200 px-3 py-2 text-sm transition hover:bg-gray-300 disabled:opacity-50'
        >
          <span className='hidden sm:inline'>الصفحة السابقة</span>
          <span className='sm:hidden'>السابق</span>
        </button>

        <form
          onSubmit={goToPage}
          className='flex items-center gap-1'
        >
          <input
            type='text'
            value={pageInput}
            onChange={handlePageInputChange}
            className='w-12 rounded border border-gray-300 px-2 py-1 text-center text-sm sm:w-16'
          />
          <span className='text-sm text-gray-600'>/ {numPages}</span>
        </form>

        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className='rounded bg-gray-200 px-3 py-2 text-sm transition hover:bg-gray-300 disabled:opacity-50'
        >
          <span className='hidden sm:inline'>الصفحة التالية</span>
          <span className='sm:hidden'>التالي</span>
        </button>
      </div>
    </div>
  );
}
