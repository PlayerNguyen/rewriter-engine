import { useCallback, useEffect, useRef } from 'react';

export type LiveRegionPoliteness = 'polite' | 'assertive';

export function useLiveRegion(politeness: LiveRegionPoliteness = 'polite') {
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const region = document.createElement('div');
    region.setAttribute('aria-live', politeness);
    region.setAttribute('aria-atomic', 'true');
    region.setAttribute('role', 'status');
    region.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    document.body.appendChild(region);
    regionRef.current = region;

    return () => {
      document.body.removeChild(region);
    };
  }, [politeness]);

  const announce = useCallback((message: string) => {
    if (regionRef.current) {
      regionRef.current.textContent = '';
      requestAnimationFrame(() => {
        if (regionRef.current) {
          regionRef.current.textContent = message;
        }
      });
    }
  }, []);

  return announce;
}
