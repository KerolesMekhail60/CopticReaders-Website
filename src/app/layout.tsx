import type { Metadata } from 'next';
import Script from 'next/script';

import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();
const GTM_ID = 'GTM-NL7QLWS3';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Coptic Readers',
    template: '%s | Coptic Readers',
  },
  description: 'Discover and read Coptic books online.',
  applicationName: 'Coptic Readers',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'Coptic Readers',
    title: 'Coptic Readers',
    description: 'Discover and read Coptic books online.',
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Script id='gtm-script' strategy='afterInteractive'>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
