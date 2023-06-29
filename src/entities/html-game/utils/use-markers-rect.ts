import { RefObject, useEffect } from 'react';
import {MarkerTypes, ObstacleTypes, Obstacle} from '../interfaces';

interface Props {
  onSetRects: (rectMap: Obstacle<DOMRect>[]) => unknown;
  refs: Record<MarkerTypes, RefObject<HTMLObjectElement>>;
}

export function useMarkersRect({ refs, onSetRects }: Props) {
  const currentRefs = Object.values(refs).map(ref => ref.current);

  useEffect(() => {
    const isRefsReceived = Object.values(refs)
      .map(ref => ref.current)
      .every(ref => ref);

    if (isRefsReceived) {
      const mappedRefsToRect: Obstacle<DOMRect>[] = Object.entries(refs).map(([key, ref]) => ({
        uniqueId: key,
        rect: ref.current!.getBoundingClientRect(),
        type: ObstacleTypes.Marker,
      }));

      onSetRects(mappedRefsToRect);
    }
  }, currentRefs);
}
