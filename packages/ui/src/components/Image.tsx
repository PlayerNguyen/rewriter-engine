import clsx from 'clsx';
import { forwardRef, type ImgHTMLAttributes, useCallback, useState } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  aspectRatio?: string;
  fallback?: React.ReactNode;
  skeleton?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'pill' | 'full' | 'none';
}

const radiusMap: Record<string, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  xxl: 'rounded-xxl',
  pill: 'rounded-pill',
  full: 'rounded-full',
  none: 'rounded-none',
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      loading = 'lazy',
      aspectRatio,
      fallback,
      skeleton = true,
      objectFit = 'cover',
      rounded = 'md',
      className,
      style,
      onError,
      onLoad,
      ..._rest
    },
    ref,
  ) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    const handleError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setStatus('error');
        onError?.(event);
      },
      [onError],
    );

    const handleLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setStatus('loaded');
        onLoad?.(event);
      },
      [onLoad],
    );

    return (
      <div
        className={clsx('relative overflow-hidden', radiusMap[rounded], className)}
        style={{ aspectRatio, ...style }}
      >
        {status === 'loading' && skeleton && (
          <div
            className={clsx('absolute inset-0 bg-surface-2 animate-pulse', radiusMap[rounded])}
            aria-hidden="true"
          />
        )}

        {status === 'error' ? (
          fallback || (
            <div
              className={clsx(
                'absolute inset-0 flex items-center justify-center bg-surface-2 text-ink-tertiary',
                radiusMap[rounded],
              )}
              role="img"
              aria-label={`Failed to load: ${alt}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )
        ) : (
          <img
            ref={ref}
            src={src}
            alt={alt}
            loading={loading}
            onError={handleError}
            onLoad={handleLoad}
            className={clsx(
              'w-full h-full',
              objectFit === 'contain' && 'object-contain',
              objectFit === 'cover' && 'object-cover',
              objectFit === 'fill' && 'object-fill',
              objectFit === 'none' && 'object-none',
              objectFit === 'scale-down' && 'object-scale-down',
              status === 'loading' && 'opacity-0',
              status === 'loaded' && 'opacity-100 transition-opacity duration-300',
              radiusMap[rounded],
            )}
          />
        )}
      </div>
    );
  },
);

Image.displayName = 'Image';
