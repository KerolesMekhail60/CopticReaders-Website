'use client';

import React from 'react';

import { Share2Icon } from 'lucide-react';

interface ShareButtonProps {
  bookTitle: string;
  bookUrl: string;
  shareLabel: string;
  locale: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  bookTitle,
  bookUrl,
  shareLabel,
  locale,
}) => {
  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: bookTitle,
          url: bookUrl,
        });
      } catch (error) {
        // User cancelled sharing or there was an error
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(bookUrl);
        // You could add a toast notification here
        alert(locale === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className='flex items-center gap-2 w-fit rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-400'
      aria-label={shareLabel}
    >
      <Share2Icon className='h-4 w-4' />
      <span>{shareLabel}</span>
    </button>
  );
};

export default ShareButton;
