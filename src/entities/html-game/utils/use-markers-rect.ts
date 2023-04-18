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
      onSetRects([
        {
          rect: refs.hr.current!.getBoundingClientRect(),
          uniqueId: MarkerTypes.Hr,
        },
        {
          rect: refs.marketing.current!.getBoundingClientRect(),
          uniqueId: MarkerTypes.Marketing,
        },
        {
          rect: refs.sw.current!.getBoundingClientRect(),
          uniqueId: MarkerTypes.Sw,
        },
        {
          rect: refs.teamlead.current!.getBoundingClientRect(),
          uniqueId: MarkerTypes.Teamlead,
        },
      ]);
    }
  }, currentRefs);
}
