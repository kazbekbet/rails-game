import { RefObject, useEffect } from 'react';
import { MarkerRectMap, MarkerTypes } from '../interfaces';

interface Props {
  onSetRects: (rectMap: MarkerRectMap) => unknown;
  refs: Record<MarkerTypes, RefObject<HTMLImageElement>>;
}

export function useMarkersRect({ refs, onSetRects }: Props) {
  const currentRefs = Object.values(refs).map(ref => ref.current);

  useEffect(() => {
    const isRefsReceived = Object.values(refs)
      .map(ref => ref.current)
      .every(ref => ref);

    if (isRefsReceived) {
      const markerRefs = new Map([
        [MarkerTypes.Hr, refs.hr.current!.getBoundingClientRect()],
        [MarkerTypes.Marketing, refs.marketing.current!.getBoundingClientRect()],
        [MarkerTypes.Sw, refs.sw.current!.getBoundingClientRect()],
        [MarkerTypes.Teamlead, refs.teamlead.current!.getBoundingClientRect()],
      ]);

      onSetRects(markerRefs as MarkerRectMap);
    }
  }, currentRefs);
}
