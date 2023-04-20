import { RefObject, useEffect } from 'react';
import { MarkerTypes, MayBeUnique } from '../interfaces';

interface Props {
  onSetRects: (rectMap: MayBeUnique<DOMRect>[]) => unknown;
  refs: Record<MarkerTypes, RefObject<HTMLImageElement>>;
}

export function useMarkersRect({ refs, onSetRects }: Props) {
  const currentRefs = Object.values(refs).map(ref => ref.current);

  useEffect(() => {
    const isRefsReceived = Object.values(refs)
      .map(ref => ref.current)
      .every(ref => ref);

    if (isRefsReceived) {
      const mappedRefsToRect: MayBeUnique<DOMRect>[] = Object.entries(refs).map(([key, ref]) => ({
        uniqueId: key,
        rect: ref.current!.getBoundingClientRect(),
      }));

      onSetRects(mappedRefsToRect);
    }
  }, currentRefs);
}
