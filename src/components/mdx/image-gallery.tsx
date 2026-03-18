import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3;
  className?: string;
}

export function ImageGallery({ images, columns = 2, className }: ImageGalleryProps) {
  return (
    <div
      className={cn(
        'not-prose grid gap-4',
        columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {images.map((image) => (
        <div key={image.src} className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
