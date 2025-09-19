import { cn } from '@/lib/utils';

type PageHeadingProps = {
  text: string;
  className?: string;
};
const PageHeading = ({ text, className }: PageHeadingProps) => {
  return (
    <h1
      className={cn(
        'text-lg font-semibold tracking-tight text-secondary-900 md:text-xl lg:text-2xl',
        className,
      )}
    >
      {text}
    </h1>
  );
};

export default PageHeading;
