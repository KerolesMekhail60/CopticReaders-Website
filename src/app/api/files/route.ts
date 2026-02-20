import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { decryptTokenToUrl } from '@/lib/secure-link';

// Streams a PDF (or any binary file) from the backend without exposing the origin URL.
// Supports Range requests required by pdf.js. Disables caching.

// Ensure this route runs on Node.js runtime (not Edge) to maximize compatibility
// with upstream servers and allow full header control and streaming.
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const path = searchParams.get('path');

    const isProd = process.env.NODE_ENV === 'production';

    if (!path && !token) {
      return new NextResponse('Missing parameter', {
        status: 400,
      });
    }

    // In production require encrypted token to avoid exposing sensitive URLs
    if (isProd && !token) {
      return new NextResponse('Token required', { status: 403 });
    }

    const resolvedPath = token ? decryptTokenToUrl(token) : (path as string);
    const isAbsoluteUrl = /^https?:\/\//i.test(resolvedPath);

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;

    // Build absolute URL to backend resource. Ensure no duplicate slashes.
    const targetUrl = isAbsoluteUrl
      ? resolvedPath
      : (() => {
          if (!apiBaseUrl) throw new Error('API base URL is not configured');
          return `${apiBaseUrl.replace(/\/$/, '')}/${resolvedPath.replace(/^\//, '')}`;
        })();

    const range = req.headers.get('range') || undefined;

    // Optional: add auth to backend if needed (e.g., bearer token)
    const backendHeaders: HeadersInit = {};
    if (range) backendHeaders['Range'] = range;
    if (process.env.API_BEARER_TOKEN) {
      backendHeaders['Authorization'] =
        `Bearer ${process.env.API_BEARER_TOKEN}`;
    }

    // Hint the upstream we expect a PDF/binary; some hosts return HTML without this.
    backendHeaders['Accept'] =
      'application/pdf, application/octet-stream;q=0.9, */*;q=0.8';
    // Use a browser-like User-Agent; some hosts block default fetch UA.
    backendHeaders['User-Agent'] =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

    // Provide a Referer matching the upstream origin if requesting absolute URL.
    try {
      if (isAbsoluteUrl) {
        const upstreamUrl = new URL(targetUrl);
        backendHeaders['Referer'] = `${upstreamUrl.origin}/`;
      }
    } catch {}

    const backendRes = await fetch(targetUrl, {
      method: 'GET',
      headers: backendHeaders,
      // Important to allow streaming
      cache: 'no-store',
    });

    if (!backendRes.ok && backendRes.status !== 206) {
      return new NextResponse(`Upstream error: ${backendRes.status}`, {
        status: backendRes.status,
      });
    }

    // Create a passthrough stream of the body
    const body = backendRes.body;
    if (!body) {
      return new NextResponse('Empty upstream body', { status: 502 });
    }

    // Preserve essential headers for range requests and content type/length.
    const resHeaders = new Headers();
    const copyHeader = (name: string) => {
      const v = backendRes.headers.get(name);
      if (v) resHeaders.set(name, v);
    };

    copyHeader('content-type');
    copyHeader('content-length');
    copyHeader('content-range');
    copyHeader('accept-ranges');
    copyHeader('content-disposition');
    // Preserve compression header so the browser can decode if upstream was compressed
    copyHeader('content-encoding');

    // Prevent caching of protected files.
    resHeaders.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    resHeaders.set('Pragma', 'no-cache');
    resHeaders.set('Expires', '0');

    // If upstream did not send a PDF content-type (or sent text/html), coerce to PDF
    const upstreamCt = backendRes.headers.get('content-type') || '';
    if (!/application\/pdf/i.test(upstreamCt)) {
      // Only coerce when the URL looks like a PDF to avoid breaking other file types
      if (/\.pdf($|\?)/i.test(targetUrl)) {
        resHeaders.set('content-type', 'application/pdf');
      }
    }

    // Pass through status 200 or 206 depending on upstream
    const status = backendRes.status === 206 ? 206 : 200;

    return new NextResponse(body, { status, headers: resHeaders });
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
