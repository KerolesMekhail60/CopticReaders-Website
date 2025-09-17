import { Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { SheetTrigger } from '../ui/sheet';

import { cn } from '@/lib/utils';

const AddButton = ({
  buttonLabel,
  className,
}: {
  buttonLabel: string;
  className?: string;
}) => {
  return (
    <SheetTrigger asChild>
      <Button className={cn('h-12', className)}>
        <Plus /> {buttonLabel}
      </Button>
    </SheetTrigger>
  );
};

export default AddButton;
