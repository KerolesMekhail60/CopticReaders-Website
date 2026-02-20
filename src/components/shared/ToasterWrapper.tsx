'use client';

import { Toaster } from 'sonner';

export default function ToasterWrapper() {
  return (
    <Toaster
      richColors={true}
      position={'top-right'}
      duration={5000}
      closeButton
    />
  );
}
