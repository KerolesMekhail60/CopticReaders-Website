import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { i18n } from './i18n.config';

export const routing = defineRouting(i18n);

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
