import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coptic Readers',
  description: 'Coptic Readers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
