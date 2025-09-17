import { PencilLine } from 'lucide-react';

import { Button } from '../ui/button';
import { SheetTrigger } from '../ui/sheet';

const EditButton = ({
  buttonLabel,
  className,
  isIcon = true,
}: {
  buttonLabel?: string;
  className?: string;
  isIcon?: boolean;
}) => {
  return (
    <SheetTrigger asChild>
      {isIcon ? (
        <PencilLine
          size={22}
          className={`cursor-pointer text-primary ${className}`}
        />
      ) : (
        <Button
          className={`flex items-center justify-center rounded-sm bg-primary-500 text-white hover:bg-primary-300 ${className}`}
        >
          <PencilLine size={18} /> {buttonLabel}
        </Button>
      )}
    </SheetTrigger>
  );
};

export default EditButton;
