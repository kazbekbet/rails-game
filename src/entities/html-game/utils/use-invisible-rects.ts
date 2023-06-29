import { RefObject, useEffect } from 'react';

interface Props {
  onSetRects: (svgRects: NodeListOf<SVGRectElement>) => unknown;
  ref: RefObject<HTMLObjectElement>;
}

export function useInvisibleRects({ onSetRects, ref }: Props) {
  useEffect(() => {
    if (ref.current) {
      ref.current.onload = () => {
        const rects = ref.current?.contentDocument?.querySelectorAll('rect');
        rects && onSetRects(rects);
      };
    }
  }, [ref.current]);
}
