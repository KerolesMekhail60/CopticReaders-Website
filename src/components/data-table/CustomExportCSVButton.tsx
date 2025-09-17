import { FolderInput } from 'lucide-react';

import useTranslations from '@/i18n/useTranslations';

const CustomExportCSVButton = ({ headers, data = [], fileName = '' }: any) => {
  const { t } = useTranslations('');

  const handleDownloadReports = () => {
    const csvRows = [headers.join(','), ...data];
    const csvContent = `\uFEFF${csvRows.join('\n')}`;
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button
      className='flex cursor-pointer items-center gap-2 text-primary'
      onClick={handleDownloadReports}
    >
      {t('forms.buttonLabels.export')}

      <FolderInput
        className='size-6'
        aria-hidden='true'
      />
    </button>
  );
};

export default CustomExportCSVButton;
