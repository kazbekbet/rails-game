import { RefObject, useEffect } from 'react';

interface Props {
  onSetRects: (svgRects: NodeListOf<SVGRectElement>) => unknown;
  wallsRef: RefObject<HTMLObjectElement>;
}

export function useWallsRects({ onSetRects, wallsRef }: Props) {
  useEffect(() => {
    if (wallsRef.current) {
      wallsRef.current.onload = () => {
        const rects = wallsRef.current?.contentDocument?.querySelectorAll('rect');
        rects && onSetRects(rects);
      };
    }
  }, [wallsRef.current]);
}
