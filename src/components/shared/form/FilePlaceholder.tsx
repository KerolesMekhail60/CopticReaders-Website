import { CloudUpload, ImageUp } from 'lucide-react';

const FilePlaceholder = ({ isImages = false }: { isImages?: boolean }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center bg-neutral-10 p-8'>
      {isImages ? (
        <ImageUp className='mb-2 h-8 w-8 text-primary-500' />
      ) : (
        <CloudUpload className='mb-2 h-8 w-8 text-primary-500' />
      )}
      <p className='mb-1 text-sm text-primary-500 dark:text-primary-400'>
        <span className='font-semibold'>Click to upload</span>
        &nbsp; or drag 'n' drop
      </p>
      <p className='text-xs text-primary-500 dark:text-primary-400'>
        {isImages ? ' SVG, PNG, JPG or GIF' : 'PDF, DOC or DOCX'}
      </p>
    </div>
  );
};

export default FilePlaceholder;
