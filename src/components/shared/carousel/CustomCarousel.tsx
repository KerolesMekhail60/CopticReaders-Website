import { useEffect, useState } from 'react';

import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import { UseEmblaCarouselType } from 'embla-carousel-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { DotButton } from './EmblaCarouselDotButton';
import { useDotButton } from './useDotButtons';

import { cn } from '@/lib/utils';

interface CustomCarouselProps<T> extends React.ComponentPropsWithoutRef<'div'> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  CarouselClassName?: string;
  carouselItemClassName?: string;
  prevBtnClassName?: string;
  nextBtnClassName?: string;
  dotBtnsContainer?: string;
  dotBtnClassName?: string;
  nonActiveDotBtnClassName?: string;
  snapDisplayClassName?: string;
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  pagination?: boolean;
  snapDisplay?: boolean;
  selectedImageIndex?: number;
}

function CustomCarousel<T>({
  items,
  renderItem,
  CarouselClassName,
  carouselItemClassName,
  dotBtnsContainer,
  dotBtnClassName,
  nonActiveDotBtnClassName,
  options,
  plugins,
  pagination,
  selectedImageIndex,
}: CustomCarouselProps<T>) {
  const [emblaApi, setEmblaApi] = useState<UseEmblaCarouselType[1] | undefined>(
    undefined,
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (emblaApi && selectedImageIndex) emblaApi.scrollTo(selectedImageIndex);
  }, [emblaApi, selectedImageIndex]);

  return (
    <Carousel
      opts={options}
      plugins={plugins}
      setApi={(emblaApi) => setEmblaApi(emblaApi)}
      className={`w-full ${CarouselClassName || ''}`}
    >
      <CarouselContent>
        {items.length > 0 &&
          items?.map((item, index) => (
            <CarouselItem
              className={`${carouselItemClassName || ''}`}
              key={index}
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}
      </CarouselContent>

      {pagination && scrollSnaps.length > 1 && (
        <div
          className={cn(
            `absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1 ${dotBtnsContainer}`,
          )}
        >
          {scrollSnaps.map((_, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                `${index === selectedIndex ? 'scale-110 bg-primary' : `scale-90 ${nonActiveDotBtnClassName || 'bg-white'}`}`,
                'h-3 w-3 cursor-pointer touch-manipulation appearance-none rounded-full',
                dotBtnClassName,
              )}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}

export default CustomCarousel;
