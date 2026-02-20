import type { ReactNode } from 'react';

type TemplateProps = {
  children: ReactNode;
  params: Promise<{ locale: string } | undefined>;
};

export default async function LocaleTemplate({ children }: TemplateProps) {
  return <>{children}</>;
}
