import { Copy } from 'lucide-react';

import Spinner from '../shared/loaders/Spinner';

const DuplicateButton = ({
  onDuplicate,
  isDuplication,
}: {
  onDuplicate: () => void;
  isDuplication: boolean;
}) => {
  return (
    <button
      onClick={onDuplicate}
      className='flex items-center justify-center rounded-sm text-primary-500'
    >
      {isDuplication ? <Spinner /> : <Copy size={20} />}
    </button>
  );
};

export default DuplicateButton;
